import { NextRequest, NextResponse } from 'next/server';
import { renderQuotePdfFromHtml, sanitizeFilename } from '@/lib/renderQuotePdf';
import { adminAuth, isFirebaseAdminReady } from '@/lib/firebase-admin';
import { isAuthorizedAdmin } from '@/lib/admin-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// PDF rendering (chromium cold start) can take several seconds; give it headroom.
export const maxDuration = 60;

interface Body {
  idToken?: string;
  html?: string;
  filenameBase?: string;
}

/**
 * ONE-CLICK PDF DOWNLOAD.
 *
 * The client posts the exact rendered QuoteDocument markup it is displaying; the
 * server wraps it in the shared print CSS and renders a pixel-consistent
 * US-Letter PDF with headless Chromium (@sparticuz/chromium on Vercel, local
 * Chrome in dev), streamed back as an attachment — no print dialog. Admin-gated
 * with the same Firebase ID-token check as the rest of the tool.
 */
export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // --- Admin authorization (same posture as the rest of the admin tool) ---
  if (!isFirebaseAdminReady() || !adminAuth) {
    return NextResponse.json({ error: 'Server auth not configured.' }, { status: 503 });
  }
  try {
    if (!body.idToken) throw new Error('missing token');
    const decoded = await adminAuth.verifyIdToken(body.idToken);
    if (!isAuthorizedAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid or missing token.' }, { status: 401 });
  }

  if (!body.html || typeof body.html !== 'string' || !body.html.includes('qd-root')) {
    return NextResponse.json({ error: 'Missing or invalid quote markup.' }, { status: 400 });
  }

  try {
    const pdf = await renderQuotePdfFromHtml(body.html);
    const filename = `VexaOS-Quote-${sanitizeFilename(body.filenameBase || 'client')}.pdf`;
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'PDF generation failed.', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
