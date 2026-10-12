import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

let POST: (req: Request) => Promise<Response>;
const ID = '11111111-1111-4111-8111-111111111111';
const post = (body: unknown, ip = '203.0.113.7') => new Request('https://www.vexaos.io/api/store/waitlist', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `${ip}, 10.0.0.1` }, body: typeof body === 'string' ? body : JSON.stringify(body) });
const calls: { url: string; body: Record<string, unknown> }[] = [];
const answer = (status: number, body: unknown) => vi.spyOn(globalThis, 'fetch').mockImplementation(async (url, init) => { calls.push({ url: String(url), body: JSON.parse(String(init?.body)) }); return new Response(JSON.stringify(body), { status }); });

beforeAll(async () => {
  Object.assign(process.env, { NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon' });
  ({ POST } = await import('./route'));
});
afterEach(() => { vi.restoreAllMocks(); calls.length = 0; });

describe('POST /api/store/waitlist', () => {
  it('stores a valid sign-up through the database function, without passing the IP address on', async () => {
    answer(200, { ok: true });
    const res = await POST(post({ product_id: ID, email: ' Pat@Example.com ', locale: 'th' }));
    expect([res.status, await res.json()]).toEqual([200, { ok: true }]);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://example.supabase.co/rest/v1/rpc/store_waitlist_join');
    expect(calls[0].body).toMatchObject({ p_product: ID, p_email: 'pat@example.com', p_locale: 'th' });
    expect(calls[0].body.p_client).toMatch(/^[0-9a-f]{32}$/);
    expect(JSON.stringify(calls[0].body)).not.toContain('203.0.113.7');
    // the same visitor gets the same key (so the limit works); another visitor a different one
    await POST(post({ product_id: ID, email: 'b@example.com', locale: 'xx' }));
    await POST(post({ product_id: ID, email: 'c@example.com' }, '198.51.100.9'));
    expect([calls[1].body.p_client === calls[0].body.p_client, calls[2].body.p_client === calls[0].body.p_client, calls[1].body.p_locale]).toEqual([true, false, null]);
  });
  it('refuses bad input before anything reaches the database', async () => {
    answer(200, { ok: true });
    for (const body of [{ product_id: ID, email: 'nope' }, { product_id: ID }, { product_id: 'x', email: 'a@example.com' }, { email: 'a@example.com' }, 'not json']) {
      expect((await POST(post(body))).status, JSON.stringify(body)).toBe(400);
    }
    expect(calls).toEqual([]);
  });
  it('a bot that fills the hidden field is told "ok" and nothing is stored', async () => {
    answer(200, { ok: true });
    const res = await POST(post({ product_id: ID, email: 'bot@example.com', website: 'http://spam.example' }));
    expect([res.status, await res.json(), calls.length]).toEqual([200, { ok: true }, 0]);
  });
  it('passes on the database\'s refusals: rate limit, not taking sign-ups, and failures', async () => {
    answer(400, { code: 'P0001', message: 'Too many sign-ups right now. Please try again later.' });
    expect((await POST(post({ product_id: ID, email: 'a@example.com' }))).status).toBe(429);
    vi.restoreAllMocks();
    answer(400, { code: 'P0001', message: 'This product is not taking sign-ups.' });
    expect([(await POST(post({ product_id: ID, email: 'a@example.com' }))).status]).toEqual([409]);
    vi.restoreAllMocks();
    answer(500, { message: 'down' });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect((await POST(post({ product_id: ID, email: 'a@example.com' }))).status).toBe(502);
  });
});
