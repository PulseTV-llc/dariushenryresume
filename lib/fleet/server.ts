/**
 * SERVER ONLY. Calls to the fleet's database functions from the website's own API routes.
 *   asUser: with the signed-in person's token (their fleet role is checked by the database)
 *   asService: with the service role key, only for functions granted to service_role alone (e.g. marking a release
 *              verified after this server checked it). The key never leaves the server.
 */
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/store/config';

export class FleetServerError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

async function call<T>(fn: string, args: Record<string, unknown>, token: string, apikey: string): Promise<T> {
  if (!/^(fleet_|vexa_fleet_)[a-z_]+$/.test(fn)) throw new FleetServerError(`not a fleet function: ${fn}`, 500);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST', cache: 'no-store',
    headers: { 'content-type': 'application/json', apikey, authorization: `Bearer ${token}` },
    body: JSON.stringify(args),
  });
  const text = await res.text();
  if (!res.ok) {
    let msg = `fleet request failed (${res.status})`;
    try { msg = JSON.parse(text).message || msg; } catch { /* not JSON */ }
    throw new FleetServerError(msg, res.status === 401 || /fleet staff only|does not allow/.test(msg) ? 403 : res.status);
  }
  return (text ? JSON.parse(text) : null) as T;
}

export const asUser = <T>(fn: string, args: Record<string, unknown>, userToken: string) => call<T>(fn, args, userToken, SUPABASE_ANON_KEY);

export function serviceKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}
export function asService<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const key = serviceKey();
  if (!key) throw new FleetServerError('SUPABASE_SERVICE_ROLE_KEY is not set on this deployment', 503);
  return call<T>(fn, args, key, key);
}
