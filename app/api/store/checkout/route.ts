import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/config';
import { parseCart, quoteItems } from '@/lib/store/cart';
import { checkoutBlock, shipCountries } from '@/lib/store/config';
import { sessionParams } from '@/lib/store/checkout';
import { StoreError, rpc } from '@/lib/store/supabase';
import type { Quote } from '@/lib/store/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Start a Stripe Checkout session.
 * The browser sends only product ids and quantities. Prices, names and
 * availability are read from the database (public.store_quote) right here.
 */
export async function POST(req: Request) {
  const blocked = checkoutBlock();
  if (blocked) return NextResponse.json({ error: 'contact_to_order', reason: blocked }, { status: 503 });

  let body: { items?: unknown; locale?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_request' }, { status: 400 }); }
  const items = parseCart(body.items);
  const locale = typeof body.locale === 'string' && isLocale(body.locale) ? body.locale : DEFAULT_LOCALE;
  if (items.length === 0) return NextResponse.json({ error: 'empty_cart' }, { status: 400 });

  let quote: Quote;
  try {
    quote = await rpc<Quote>('store_quote', { p_items: quoteItems(items) });
  } catch (e) {
    // P0001 carries a sentence for the shopper ("Bracket is out of stock in that quantity.")
    if (e instanceof StoreError && e.readable) return NextResponse.json({ error: 'cart_changed', message: e.message }, { status: 409 });
    console.error('store.checkout.quote_failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const session = await stripe.checkout.sessions.create(sessionParams(quote, locale, new URL(req.url).origin, shipCountries()));
    if (!session.url) throw new Error('Stripe returned no URL');
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('store.checkout.stripe_failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  }
}
