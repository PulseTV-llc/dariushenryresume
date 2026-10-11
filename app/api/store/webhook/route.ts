import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { rpc } from '@/lib/store/supabase';
import { handleStripeEvent, type WebhookDeps } from '@/lib/store/webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Stripe webhook: POST https://<site>/api/store/webhook
 * Subscribe to: checkout.session.completed, checkout.session.async_payment_succeeded,
 *               checkout.session.async_payment_failed, charge.refunded
 *
 * Nothing is trusted until the signature is verified against STRIPE_WEBHOOK_SECRET
 * using the raw request body. A database failure answers 500 so Stripe retries;
 * recording is idempotent, so a retry can never create a second order.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET, key = process.env.STRIPE_SECRET_KEY, service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !key || !service) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const signature = req.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'missing_signature' }, { status: 400 });
  const raw = await req.text();
  const stripe = new Stripe(key);
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, signature, secret);
  } catch {
    return NextResponse.json({ error: 'bad_signature' }, { status: 400 });
  }

  const deps: WebhookDeps = {
    lineItems: async (id) => (await stripe.checkout.sessions.listLineItems(id, { limit: 100, expand: ['data.price.product'] })).data,
    recordOrder: (eventId, type, session, items) =>
      rpc('store_record_order', { p_event_id: eventId, p_event_type: type, p_session: session, p_items: items }, { token: service }),
    refund: (eventId, intent, full) => rpc('store_order_refund', { p_event_id: eventId, p_payment_intent: intent, p_full: full }, { token: service }),
    log: (message, data) => console.warn(message, data ?? {}),
  };
  try {
    const outcome = await handleStripeEvent(event, deps);
    return NextResponse.json({ received: true, ...outcome });
  } catch (e) {
    console.error('store.webhook.failed', event.type, e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'processing_failed' }, { status: 500 });
  }
}
