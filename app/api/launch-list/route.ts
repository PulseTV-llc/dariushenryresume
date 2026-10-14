import { NextResponse } from 'next/server';
import { isLocale, DEFAULT_LOCALE } from '@/lib/i18n/config';
import { StoreError, rpc } from '@/lib/store/supabase';
import { CONSENT_VERSION, PRODUCT, unsubscribePath, validateLaunchForm } from '@/lib/mobile-gateway/launch-list';
import { callerHash, callerIp, newToken, sendLaunchConfirmation, tokenHash, verifyTurnstile } from '@/lib/mobile-gateway/server';
import { mobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import { SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Mobile Gateway launch list. Validates (the database checks again), drops bots (honeypot "website", optional
 * Turnstile), and stores through public.marketing_launch_join, which rate limits per caller and per address and
 * updates an existing address instead of duplicating it. Every valid request gets the same answer, whether or not
 * the address was already on the list. The consent sentence stored is the one this site shows in that language,
 * never text sent by the browser. Nothing is emailed (see sendLaunchConfirmation).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_request' }, { status: 400 }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const locale = typeof body.locale === 'string' && isLocale(body.locale) ? body.locale : DEFAULT_LOCALE;
  const token = newToken();
  // a filled hidden field is a bot: the same answer as a person gets, and nothing is stored
  if (typeof body.website === 'string' && body.website.trim() !== '') return NextResponse.json({ ok: true, emailed: false, unsubscribe: unsubscribePath(token) });

  const checked = validateLaunchForm(body);
  if (!checked.ok) return NextResponse.json({ error: 'invalid', fields: checked.errors }, { status: 400 });
  const ip = callerIp(req);
  if (!(await verifyTurnstile(body.turnstile, ip))) return NextResponse.json({ error: 'verification' }, { status: 403 });

  const v = checked.value;
  const source = typeof body.source === 'string' ? body.source.slice(0, 200) : null;
  try {
    await rpc('marketing_launch_join', {
      p: { ...v, product: PRODUCT, consent_text: mobileGatewayStrings(locale).early.form.consent, consent_version: CONSENT_VERSION, locale, source },
      p_client: callerHash(ip),
      p_token_hash: tokenHash(token),
    });
  } catch (e) {
    if (e instanceof StoreError && e.readable) {
      if (/Too many/.test(e.message)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    if (e instanceof StoreError && e.status === 503) return NextResponse.json({ error: 'unavailable' }, { status: 503 });
    console.error('launch_list.failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'failed' }, { status: 502 });
  }
  const path = unsubscribePath(token);
  const mail = await sendLaunchConfirmation({ email: v.email, name: v.full_name, locale, unsubscribeUrl: `${SITE_URL}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${path}` });
  return NextResponse.json({ ok: true, emailed: mail.sent, unsubscribe: path });
}
