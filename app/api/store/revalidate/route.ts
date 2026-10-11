import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { STORE_TAG } from '@/lib/store/catalog';
import { rpc } from '@/lib/store/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Called by the admin dashboard after a change so the storefront and the nav update at once. Store admins only. */
export async function POST(req: Request) {
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!token) return NextResponse.json({ error: 'not_signed_in' }, { status: 401 });
  try {
    const me = await rpc<{ role: string } | null>('store_admin_me', {}, { token });
    if (!me) return NextResponse.json({ error: 'not_allowed' }, { status: 403 });
  } catch {
    return NextResponse.json({ error: 'not_allowed' }, { status: 403 });
  }
  revalidateTag(STORE_TAG);
  return NextResponse.json({ revalidated: true });
}
