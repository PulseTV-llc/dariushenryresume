import { NextResponse } from 'next/server';
import { checkoutBlock, shipCountries } from '@/lib/store/config';
import { rpc } from '@/lib/store/supabase';
import { WEBHOOK_EVENTS } from '@/lib/store/webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** For the admin's Settings tab: whether checkout is open and what is missing. Never returns a key, only yes/no. */
export async function GET(req: Request) {
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  try {
    if (!token || !(await rpc('store_admin_me', {}, { token }))) return NextResponse.json({ error: 'not_allowed' }, { status: 403 });
  } catch { return NextResponse.json({ error: 'not_allowed' }, { status: 403 }); }
  const key = process.env.STRIPE_SECRET_KEY ?? '';
  return NextResponse.json({
    checkout: checkoutBlock(),
    mode: !key ? null : /^(sk|rk)_test_/.test(key) ? 'test' : 'live',
    has: {
      stripe_secret: !!key, stripe_publishable: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET, service_role: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    webhook_url: `${new URL(req.url).origin}/api/store/webhook`,
    webhook_events: WEBHOOK_EVENTS,
    ship_countries: shipCountries(),
  });
}
