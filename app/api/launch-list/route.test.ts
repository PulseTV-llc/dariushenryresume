import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { createHash } from 'node:crypto';

let POST: (req: Request) => Promise<Response>;
let UNSUB: (req: Request) => Promise<Response>;
const req = (url: string, body: unknown, ip = '203.0.113.7') => new Request(`https://www.vexaos.io${url}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `${ip}, 10.0.0.1` }, body: typeof body === 'string' ? body : JSON.stringify(body) });
const join = (b: unknown, ip?: string) => POST(req('/api/launch-list', b, ip));
const calls: { url: string; body: Record<string, any> }[] = [];
const answer = (status: number, body: unknown) => vi.spyOn(globalThis, 'fetch').mockImplementation(async (url, init) => {
  calls.push({ url: String(url), body: typeof init?.body === 'string' ? JSON.parse(init.body) : Object.fromEntries(init?.body as URLSearchParams) });
  return new Response(JSON.stringify(body), { status });
});
const ok = { full_name: 'Pat Driver', email: 'Pat@Example.com', company: 'Example Freight', industry: 'trucking_fleet', consent: true, locale: 'th', monitor: ['temperature'], source: '/products/mobile-gateway' };

beforeAll(async () => {
  Object.assign(process.env, { NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon' });
  delete process.env.TURNSTILE_SECRET_KEY;
  ({ POST } = await import('./route'));
  ({ POST: UNSUB } = await import('./unsubscribe/route'));
});
afterEach(() => { vi.restoreAllMocks(); calls.length = 0; delete process.env.TURNSTILE_SECRET_KEY; });

describe('POST /api/launch-list', () => {
  it('stores a valid sign-up through the database function with the consent this site shows, a token hash and no IP address', async () => {
    answer(200, { ok: true });
    const res = await join(ok);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body).toMatchObject({ ok: true, emailed: false });
    expect(body.unsubscribe).toMatch(/^\/products\/mobile-gateway\/unsubscribe#t=[A-Za-z0-9_-]{43}$/);
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('https://example.supabase.co/rest/v1/rpc/marketing_launch_join');
    const { p, p_client, p_token_hash } = calls[0].body;
    expect(p).toMatchObject({ email: 'pat@example.com', industry: 'trucking_fleet', product: 'mobile-gateway', locale: 'th', consent: true, consent_version: '2026-10-14', monitor: ['temperature'] });
    const { th } = await import('@/lib/mobile-gateway/i18n/th');
    expect(p.consent_text).toBe(th.early.form.consent);
    const token = body.unsubscribe.split('#t=')[1];
    expect(p_token_hash).toBe(createHash('sha256').update(token).digest('hex'));
    expect(p_client).toMatch(/^[0-9a-f]{32}$/);
    expect(JSON.stringify(calls[0].body)).not.toContain('203.0.113.7');
    expect(JSON.stringify(calls[0].body)).not.toContain(token);
  });
  it('the consent sentence cannot be supplied by the browser', async () => {
    answer(200, { ok: true });
    await join({ ...ok, locale: 'en', consent_text: 'I agree to nothing' });
    const { en } = await import('@/lib/mobile-gateway/i18n/en');
    expect(calls[0].body.p.consent_text).toBe(en.early.form.consent);
  });
  it('refuses bad input before anything reaches the database', async () => {
    answer(200, { ok: true });
    for (const b of [{ ...ok, email: 'nope' }, { ...ok, consent: false }, { ...ok, industry: 'mining' }, { ...ok, full_name: '' }, 'not json', '[]']) {
      expect((await join(b)).status, JSON.stringify(b)).toBe(400);
    }
    const res = await join({ ...ok, email: 'x', consent: false });
    expect((await res.json()).fields).toEqual({ email: 'email', consent: 'consent' });
    expect(calls).toEqual([]);
  });
  it('a bot that fills the hidden field gets the same answer and nothing is stored', async () => {
    answer(200, { ok: true });
    const res = await join({ ...ok, website: 'http://spam.example' });
    expect([res.status, (await res.json()).ok, calls.length]).toEqual([200, true, 0]);
  });
  it('requires Turnstile when its secret is configured, and verifies the token with Cloudflare', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'test-secret';
    answer(200, { success: false });
    expect((await join(ok)).status).toBe(403);   // no token
    expect(calls).toHaveLength(0);
    expect((await join({ ...ok, turnstile: 'tok' })).status).toBe(403);
    expect(calls[0].url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    expect(calls[0].body).toMatchObject({ response: 'tok', remoteip: '203.0.113.7' });
    vi.restoreAllMocks(); calls.length = 0;
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => new Response(JSON.stringify(String(url).includes('turnstile') ? { success: true } : { ok: true }), { status: 200 }));
    expect((await join({ ...ok, turnstile: 'tok' })).status).toBe(200);
  });
  it('passes on the database refusals: rate limit, invalid, unavailable, failure', async () => {
    answer(400, { code: 'P0001', message: 'Too many requests right now. Please try again later.' });
    expect((await join(ok)).status).toBe(429);
    vi.restoreAllMocks();
    answer(400, { code: 'P0001', message: 'Choose an industry.' });
    expect((await join(ok)).status).toBe(400);
    vi.restoreAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    answer(500, { message: 'down' });
    expect((await join(ok)).status).toBe(502);
  });
});

describe('POST /api/launch-list/unsubscribe', () => {
  const token = 'A'.repeat(43);
  it('sends only the token hash, and reports whether it matched', async () => {
    answer(200, { ok: true, found: true });
    const res = await UNSUB(req('/api/launch-list/unsubscribe', { token }));
    expect(await res.json()).toEqual({ ok: true, found: true });
    expect(calls[0].url).toBe('https://example.supabase.co/rest/v1/rpc/marketing_launch_unsubscribe');
    expect(calls[0].body).toEqual({ p_token_hash: createHash('sha256').update(token).digest('hex') });
  });
  it('a malformed token never reaches the database', async () => {
    answer(200, { ok: true, found: true });
    expect(await (await UNSUB(req('/api/launch-list/unsubscribe', { token: 'short' }))).json()).toEqual({ ok: true, found: false });
    expect(calls).toEqual([]);
  });
});
