import { beforeAll, describe, expect, it, vi } from 'vitest';
import Stripe from 'stripe';

// Made-up values: these tests never reach Stripe or a database.
const SECRET = 'whsec_test_only_not_a_real_secret';
let POST: (req: Request) => Promise<Response>;
const stripe = new Stripe('sk_test_not_a_real_key');
const signed = (payload: string, secret = SECRET) =>
  new Request('https://www.vexaos.io/api/store/webhook', { method: 'POST', body: payload, headers: { 'stripe-signature': stripe.webhooks.generateTestHeaderString({ payload, secret }) } });

beforeAll(async () => {
  Object.assign(process.env, { NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon', STRIPE_SECRET_KEY: 'sk_test_not_a_real_key',
    STRIPE_WEBHOOK_SECRET: SECRET, SUPABASE_SERVICE_ROLE_KEY: 'service' });
  ({ POST } = await import('./route'));
});

describe('POST /api/store/webhook', () => {
  it('refuses a call without a signature, with a wrong one, or with a changed body', async () => {
    const payload = JSON.stringify({ id: 'evt_1', object: 'event', type: 'payment_intent.created', data: { object: {} } });
    expect((await POST(new Request('https://x/api/store/webhook', { method: 'POST', body: payload }))).status).toBe(400);
    expect((await POST(signed(payload, 'whsec_someone_elses'))).status).toBe(400);
    const good = signed(payload);
    const tampered = new Request(good.url, { method: 'POST', body: payload.replace('evt_1', 'evt_2'), headers: good.headers });
    const res = await POST(tampered);
    expect([res.status, await res.json()]).toEqual([400, { error: 'bad_signature' }]);
  });
  it('accepts a correctly signed event and ignores types it does not handle', async () => {
    const res = await POST(signed(JSON.stringify({ id: 'evt_1', object: 'event', type: 'payment_intent.created', data: { object: {} } })));
    expect([res.status, await res.json()]).toEqual([200, { received: true, ignored: 'unhandled event payment_intent.created' }]);
  });
  it('records a refund through the service role, and answers 500 when the database fails so Stripe retries', async () => {
    const payload = JSON.stringify({ id: 'evt_7', object: 'event', type: 'charge.refunded', data: { object: { id: 'ch_1', object: 'charge', payment_intent: 'pi_1', refunded: true } } });
    const calls: { url: string; auth: string | null; body: unknown }[] = [];
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url, init) => {
      calls.push({ url: String(url), auth: new Headers(init?.headers).get('authorization'), body: JSON.parse(String(init?.body)) });
      return new Response('{"order_id":null,"number":null}', { status: 200 });
    });
    expect((await POST(signed(payload))).status).toBe(200);
    expect(calls).toEqual([{ url: 'https://example.supabase.co/rest/v1/rpc/store_order_refund', auth: 'Bearer service', body: { p_event_id: 'evt_7', p_payment_intent: 'pi_1', p_full: true } }]);
    fetchMock.mockImplementation(async () => new Response('{"message":"down"}', { status: 500 }));
    expect((await POST(signed(payload))).status).toBe(500);
    fetchMock.mockRestore();
  });
  it('answers 503 until it is configured', async () => {
    const keep = process.env.STRIPE_WEBHOOK_SECRET;
    delete process.env.STRIPE_WEBHOOK_SECRET;
    expect((await POST(signed('{}'))).status).toBe(503);
    process.env.STRIPE_WEBHOOK_SECRET = keep;
  });
});
