import type Stripe from 'stripe';
import { localePath, type Locale } from '@/lib/i18n/config';
import { imageUrl } from './config';
import type { Quote } from './types';

/** Marks the sessions this site created, so the webhook ignores anything else on the same Stripe account. */
export const SESSION_SOURCE = 'vexaos-store';
const STRIPE_LOCALE: Record<Locale, Stripe.Checkout.SessionCreateParams.Locale> = { en: 'en', th: 'th', vi: 'vi', id: 'id', fil: 'fil' };

/**
 * The Stripe Checkout session for a quote. Every amount comes from the quote,
 * which comes from the database: nothing here is taken from the browser.
 */
export function sessionParams(quote: Quote, locale: Locale, origin: string, countries: string[]): Stripe.Checkout.SessionCreateParams {
  return {
    mode: 'payment',
    locale: STRIPE_LOCALE[locale],
    line_items: quote.lines.map((l) => ({
      quantity: l.quantity,
      price_data: {
        currency: quote.currency,
        unit_amount: l.unit_cents,
        product_data: {
          name: l.variant_title ? `${l.name} (${l.variant_title})` : l.name,
          ...(l.image ? { images: [imageUrl(l.image)] } : {}),
          metadata: { product_id: l.product_id, variant_id: l.variant_id ?? '', sku: l.sku ?? '', name: l.name, variant_title: l.variant_title ?? '' },
        },
      },
    })),
    shipping_address_collection: { allowed_countries: countries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] },
    phone_number_collection: { enabled: true },
    success_url: `${origin}${localePath(locale, '/store/success')}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${localePath(locale, '/store/cancel')}`,
    metadata: { source: SESSION_SOURCE, locale },
  };
}
