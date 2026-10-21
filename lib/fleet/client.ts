'use client';

import { adminClient } from '@/lib/store/admin-client';

/**
 * The fleet admin talks to the database only through public.fleet_* functions, as the signed-in person (their own
 * token, never a service key). Every permission is checked inside those functions (docs/fleet/security.md in the
 * platform repository); the browser only hides what the person cannot do.
 */
export class FleetError extends Error {
  constructor(message: string, readonly code?: string) { super(message); }
  /** The database asked for the password again (high-impact action, sign-in older than 15 minutes). */
  get stepUp() { return /step_up_required/.test(this.message); }
  get forbidden() { return this.code === '42501'; }
}

export async function fleetCall<T>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  if (!/^fleet_[a-z_]+$/.test(fn)) throw new FleetError(`not a fleet function: ${fn}`);
  const { data, error } = await adminClient().rpc(fn, args);
  if (error) {
    const msg = error.message || 'Something went wrong.';
    throw new FleetError(msg.replace(/^step_up_required: /, 'step_up_required: '), error.code);
  }
  return data as T;
}

/** Confirm the password again (step-up). Signing in refreshes the sign-in time the database checks. */
export async function confirmPassword(password: string): Promise<string | null> {
  const c = adminClient();
  const { data } = await c.auth.getSession();
  const email = data.session?.user.email;
  if (!email) return 'You are signed out.';
  const { error } = await c.auth.signInWithPassword({ email, password });
  return error ? (error.message === 'Invalid login credentials' ? 'That password is not right.' : error.message) : null;
}

export async function accessToken(): Promise<string> {
  return (await adminClient().auth.getSession()).data.session?.access_token ?? '';
}
