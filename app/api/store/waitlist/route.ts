import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { isLocale } from '@/lib/i18n/config';
import { StoreError, rpc } from '@/lib/store/supabase';
import { UUID, cleanEmail } from '@/lib/store/waitlist';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * "Notify me when available": adds an email to a coming-soon product's waitlist. Nothing is emailed from here.
 * The database validates again, accepts only coming-soon products with the form switched on, and rate limits
 * (per caller, per product, per day). The caller is identified by a one-way hash of the IP address, used only
 * for that limit. A filled "website" field is a bot: it gets the same answer and nothing is stored.
 */
export async function POST(req: Request) {
  let body: { product_id?: unknown; email?: unknown; locale?: unknown; website?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_request' }, { status: 400 }); }
  if (typeof body.website === 'string' && body.website.trim() !== '') return NextResponse.json({ ok: true });
  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  if (typeof body.product_id !== 'string' || !UUID.test(body.product_id)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  const client = createHash('sha256').update(`vexaos-waitlist:${ip}`).digest('hex').slice(0, 32);
  try {
    await rpc('store_waitlist_join', { p_product: body.product_id, p_email: email, p_locale: typeof body.locale === 'string' && isLocale(body.locale) ? body.locale : null, p_client: client });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof StoreError && e.readable) {
      const kind = /valid email/.test(e.message) ? ['invalid_email', 400] as const : /Too many/.test(e.message) ? ['rate_limited', 429] as const : ['unavailable', 409] as const;
      return NextResponse.json({ error: kind[0] }, { status: kind[1] });
    }
    console.error('store.waitlist.failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'failed' }, { status: 502 });
  }
}
