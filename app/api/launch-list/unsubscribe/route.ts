import { NextResponse } from 'next/server';
import { StoreError, rpc } from '@/lib/store/supabase';
import { TOKEN } from '@/lib/mobile-gateway/launch-list';
import { tokenHash } from '@/lib/mobile-gateway/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Unsubscribe from the Mobile Gateway launch list with the token from the link. POST only, so link scanners cannot do it. */
export async function POST(req: Request) {
  let body: { token?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_request' }, { status: 400 }); }
  if (typeof body.token !== 'string' || !TOKEN.test(body.token)) return NextResponse.json({ ok: true, found: false });
  try {
    const r = await rpc<{ ok: boolean; found: boolean }>('marketing_launch_unsubscribe', { p_token_hash: tokenHash(body.token) });
    return NextResponse.json({ ok: true, found: !!r?.found });
  } catch (e) {
    if (e instanceof StoreError && e.status === 503) return NextResponse.json({ error: 'unavailable' }, { status: 503 });
    console.error('launch_list.unsubscribe_failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'failed' }, { status: 502 });
  }
}
