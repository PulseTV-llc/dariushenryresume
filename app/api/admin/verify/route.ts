import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, isFirebaseAdminReady } from '@/lib/firebase-admin';
import { isAuthorizedAdmin } from '@/lib/admin-config';

export const dynamic = 'force-dynamic';

/**
 * Server-side authorization check for the private admin area.
 * The client sends its Firebase ID token; we verify it with the Admin SDK and
 * confirm the email matches the single authorized admin. This runs on the
 * server, so the authorized-email rule cannot be bypassed from the browser.
 */
export async function POST(request: NextRequest) {
  try {
    if (!isFirebaseAdminReady() || !adminAuth) {
      return NextResponse.json(
        { authorized: false, error: 'Server auth not configured.' },
        { status: 503 },
      );
    }

    const { idToken } = await request.json().catch(() => ({ idToken: null }));
    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json({ authorized: false, error: 'Missing token.' }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    const authorized = isAuthorizedAdmin(decoded.email);

    return NextResponse.json({ authorized }, { status: authorized ? 200 : 403 });
  } catch {
    return NextResponse.json({ authorized: false, error: 'Invalid token.' }, { status: 401 });
  }
}
