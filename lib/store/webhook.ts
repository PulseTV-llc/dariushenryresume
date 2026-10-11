import type Stripe from 'stripe';
import { SESSION_SOURCE } from './checkout';

/**
 * What the Stripe webhook does with an event, after its signature was verified.
 * Kept apart from the route so it can be tested without Stripe or a database.
 */
export const WEBHOOK_EVENTS = [
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'charge.refunded',
] as const;

export interface OrderItem {
  product_id: string | null; variant_id: string | null; name: string; variant_title: string | null; sku: string | null; unit_cents: number; quantity: number;
  base_cents: number | null; tier_min: number | null; tier_max: number | null;
}
export interface WebhookDeps {
  lineItems(sessionId: string): Promise<Stripe.LineItem[]>;
  recordOrder(eventId: string, eventType: string, session: Record<string, unknown>, items: OrderItem[]): Promise<{ number: number; duplicate: boolean; oversold?: boolean }>;
  refund(eventId: string, paymentIntent: string, full: boolean): Promise<unknown>;
  log?(message: string, data?: Record<string, unknown>): void;
}
export type Outcome = { handled: 'recorded' | 'duplicate' | 'refunded'; number?: number } | { ignored: string };

const id = (v: string | { id: string } | null | undefined) => (typeof v === 'string' ? v : v?.id ?? null);

const int = (v: string | undefined) => (v && /^\d+$/.test(v) ? Number(v) : null);

export function orderItems(lines: Stripe.LineItem[]): OrderItem[] {
  return lines.map((l) => {
    const product = l.price?.product;
    const meta = (product && typeof product === 'object' && 'metadata' in product ? product.metadata : {}) as Record<string, string>;
    const quantity = l.quantity ?? 1;
    return {
      product_id: meta.product_id || null, variant_id: meta.variant_id || null, name: meta.name || l.description || 'Item',
      variant_title: meta.variant_title || null, sku: meta.sku || null,
      unit_cents: l.price?.unit_amount ?? Math.round((l.amount_subtotal ?? 0) / Math.max(quantity, 1)), quantity,
      base_cents: int(meta.base_cents), tier_min: int(meta.tier_min), tier_max: int(meta.tier_max),
    };
  });
}

/** The parts of a Checkout session the order needs. Shipping moved in newer Stripe API versions: both places are read. */
export function sessionSummary(s: Stripe.Checkout.Session): Record<string, unknown> {
  const anyS = s as unknown as { shipping_details?: unknown; collected_information?: { shipping_details?: unknown } };
  return {
    id: s.id, payment_intent: id(s.payment_intent as string | { id: string } | null), payment_status: s.payment_status,
    email: s.customer_details?.email ?? s.customer_email ?? null, name: s.customer_details?.name ?? null, phone: s.customer_details?.phone ?? null,
    shipping: anyS.collected_information?.shipping_details ?? anyS.shipping_details ?? (s.customer_details?.address ? { name: s.customer_details.name, address: s.customer_details.address } : null),
    currency: s.currency, subtotal_cents: s.amount_subtotal ?? 0, shipping_cents: s.total_details?.amount_shipping ?? 0, tax_cents: s.total_details?.amount_tax ?? 0,
    total_cents: s.amount_total ?? 0, livemode: s.livemode, locale: s.metadata?.locale ?? null,
  };
}

export async function handleStripeEvent(event: Stripe.Event, deps: WebhookDeps): Promise<Outcome> {
  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const s = event.data.object as Stripe.Checkout.Session;
      if (s.metadata?.source !== SESSION_SOURCE) return { ignored: 'not a store session' };
      // delayed payment methods complete first and are paid later: the order is recorded when the money arrives
      if (s.payment_status !== 'paid' && s.payment_status !== 'no_payment_required') return { ignored: 'not paid yet' };
      const items = orderItems(await deps.lineItems(s.id));
      const r = await deps.recordOrder(event.id, event.type, sessionSummary(s), items);
      if (r.oversold) deps.log?.('store.oversold', { order: r.number });
      return { handled: r.duplicate ? 'duplicate' : 'recorded', number: r.number };
    }
    case 'checkout.session.async_payment_failed': {
      const s = event.data.object as Stripe.Checkout.Session;
      deps.log?.('store.payment_failed', { session: s.id });
      return { ignored: 'payment failed; no order was recorded' };
    }
    case 'charge.refunded': {
      const c = event.data.object as Stripe.Charge;
      const intent = id(c.payment_intent as string | { id: string } | null);
      if (!intent) return { ignored: 'refund without a payment intent' };
      await deps.refund(event.id, intent, c.refunded === true);
      return { handled: 'refunded' };
    }
    default:
      return { ignored: `unhandled event ${event.type}` };
  }
}
