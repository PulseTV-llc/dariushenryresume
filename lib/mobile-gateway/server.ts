/**
 * Server-only helpers for the launch list: Cloudflare Turnstile, caller hashing, tokens, and the
 * (not yet wired) confirmation email. SERVER ONLY: reads secret environment variables.
 *
 * Environment:
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY   optional; when set, the form shows the Turnstile widget
 *   TURNSTILE_SECRET_KEY             optional; when set, every sign-up must pass Turnstile (checked here)
 *   (Supabase: the store's NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, see lib/store/config.ts)
 */
import { createHash, randomBytes } from 'node:crypto';
import type { Locale } from '@/lib/i18n/config';

export const turnstileRequired = (env: Record<string, string | undefined> = process.env) => !!env.TURNSTILE_SECRET_KEY;

/** Verify a Turnstile token with Cloudflare. Returns true when Turnstile is not configured. */
export async function verifyTurnstile(token: unknown, ip: string | null, opts: { env?: Record<string, string | undefined>; fetch?: typeof fetch } = {}): Promise<boolean> {
  const secret = (opts.env ?? process.env).TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const res = await (opts.fetch ?? fetch)('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body, cache: 'no-store' });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const callerIp = (req: Request) => (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || null;
/** A one-way key for the caller, only for rate limiting; the IP address itself is never stored or passed on. */
export const callerHash = (ip: string | null) => createHash('sha256').update(`vexaos-launch-list:${ip ?? 'unknown'}`).digest('hex').slice(0, 32);
export const newToken = () => randomBytes(32).toString('base64url');
export const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

/**
 * HOOK: the confirmation email. Not sent today (no email provider is configured for the website yet), so the page
 * never says an email was sent. To add it later (for example with Resend): send the confirmation with the
 * unsubscribe link (absolute URL of unsubscribePath(token)) in the person's language, return { sent: true } only
 * after the provider accepted it, and only then let the page mention an email.
 */
export async function sendLaunchConfirmation(_to: { email: string; name: string; locale: Locale; unsubscribeUrl: string }): Promise<{ sent: boolean }> {
  return { sent: false };
}
