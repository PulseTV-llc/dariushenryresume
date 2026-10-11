/**
 * Store configuration. Public values only in this file's top half; the
 * secret keys are read where they are used and never leave the server.
 *
 * Environment (see docs/STORE.md):
 *   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY   public; catalog and admin sign-in
 *   STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY     Stripe (test keys)
 *   STRIPE_WEBHOOK_SECRET                                     verifies Stripe's webhook calls
 *   SUPABASE_SERVICE_ROLE_KEY                                 lets the webhook record orders
 *   STORE_SHIP_COUNTRIES   optional, comma separated ISO codes (default US)
 *   STORE_SHIPS_FROM       optional ISO code; shows "Ships from …" on the store (unset: no origin claim)
 *   STORE_LIVE_PAYMENTS    optional; "on" allows live Stripe keys (default: test keys only)
 */
export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
export const IMAGE_BUCKET = 'store-images';

export const storeConfigured = () => SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';
export const imageUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${IMAGE_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`;

export type CheckoutBlock = 'stripe_keys' | 'webhook_secret' | 'order_recording' | 'live_key' | 'catalog';
/**
 * Why online checkout is off, or null when it is on. SERVER ONLY.
 * Payments are only taken when the order can also be recorded: all four keys must be present.
 * Until then the store shows "Contact to order".
 */
export function checkoutBlock(env: Record<string, string | undefined> = process.env): CheckoutBlock | null {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return 'catalog';
  const key = env.STRIPE_SECRET_KEY ?? '';
  if (!key || !env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) return 'stripe_keys';
  if (!/^(sk|rk)_test_/.test(key) && env.STORE_LIVE_PAYMENTS !== 'on') return 'live_key';
  if (!env.STRIPE_WEBHOOK_SECRET) return 'webhook_secret';
  if (!env.SUPABASE_SERVICE_ROLE_KEY) return 'order_recording';
  return null;
}
export const checkoutEnabled = (env?: Record<string, string | undefined>) => checkoutBlock(env) === null;

const ISO2 = /^[A-Z]{2}$/;
export function shipCountries(env: Record<string, string | undefined> = process.env): string[] {
  const list = (env.STORE_SHIP_COUNTRIES ?? 'US').split(',').map((c) => c.trim().toUpperCase()).filter((c) => ISO2.test(c));
  return list.length ? Array.from(new Set(list)) : ['US'];
}

/**
 * Where orders ship from, as an ISO country code (STORE_SHIPS_FROM, for example US). Unset by default: the store
 * then says where it ships TO (from STORE_SHIP_COUNTRIES) and makes no claim about the origin.
 */
export function shipsFrom(env: Record<string, string | undefined> = process.env): string | null {
  const c = (env.STORE_SHIPS_FROM ?? '').trim().toUpperCase();
  return ISO2.test(c) ? c : null;
}
