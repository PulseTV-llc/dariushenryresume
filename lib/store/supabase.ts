import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

/** A database function refused the request with a message meant for the person (errcode P0001). */
export class StoreError extends Error {
  constructor(message: string, public readonly status: number, public readonly code?: string) { super(message); }
  get readable() { return this.code === 'P0001'; }
}

export interface RpcOptions {
  /** A member's access token (admin calls) or the service role key (webhook). Default: anonymous. */
  token?: string;
  /** Next.js cache settings for server-side reads. Default: never cached. */
  next?: { revalidate?: number; tags?: string[] };
  fetch?: typeof fetch;
}

/** Call a public.store_* (or public.marketing_*) function over Supabase's REST API. Works on the server and in the browser. */
export async function rpc<T>(fn: string, args: Record<string, unknown> = {}, opts: RpcOptions = {}): Promise<T> {
  if (!/^(store|marketing)_[a-z_]+$/.test(fn)) throw new Error(`not a store or marketing function: ${fn}`);
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new StoreError('The store is not configured.', 503);
  const serviceKey = opts.token && !opts.token.includes('.') ? opts.token : null;   // new-style secret keys are not JWTs
  const init: RequestInit & { next?: RpcOptions['next'] } = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      apikey: serviceKey ?? (opts.token && isServiceJwt(opts.token) ? opts.token : SUPABASE_ANON_KEY),
      authorization: `Bearer ${opts.token ?? SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(args),
  };
  if (opts.next) init.next = opts.next; else init.cache = 'no-store';
  const res = await (opts.fetch ?? fetch)(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, init);
  if (!res.ok) {
    let body: { message?: string; code?: string } = {};
    try { body = await res.json(); } catch { /* not JSON */ }
    throw new StoreError(body.message || `Store request failed (${res.status}).`, res.status, body.code);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

function isServiceJwt(token: string): boolean {
  try {
    const payload = JSON.parse(atob((token.split('.')[1] ?? '').replace(/-/g, '+').replace(/_/g, '/')));
    return payload?.role === 'service_role';
  } catch { return false; }
}
