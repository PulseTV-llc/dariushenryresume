import { NextResponse } from 'next/server';
import { checkRelease } from '@/lib/fleet/verify';
import { FleetServerError, asService, asUser, serviceKey } from '@/lib/fleet/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * POST /api/admin/fleet/releases/verify  {id}  (Authorization: Bearer <the person's Supabase token>)
 * The server's own check of a registered release, before anyone may approve it:
 *   1. the person may create releases (asked of the database with THEIR token)
 *   2. the artifact in the private bucket has exactly the signed size and SHA-256 (streamed, never stored here)
 *   3. the Ed25519 signature over the canonical manifest is valid for the registered public key
 * Only then the database marks it VERIFIED (a function only the service role may call). The private signing key is
 * never involved: it stays offline with the owner.
 */
export async function POST(req: Request) {
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  let id = '';
  try { id = String((await req.json()).id ?? ''); } catch { /* bad body */ }
  if (!token || !/^[0-9a-f-]{36}$/.test(id)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  if (!serviceKey()) return NextResponse.json({ error: 'not_configured', message: 'SUPABASE_SERVICE_ROLE_KEY is not set on this deployment.' }, { status: 503 });
  let rel: { artifact_path: string; manifest: Record<string, unknown>; signature: string; public_key: string | null; key_id: string; status: string };
  try {
    rel = await asUser('fleet_release_can_verify', { p_id: id }, token);
  } catch (e) {
    const status = e instanceof FleetServerError ? e.status : 500;
    return NextResponse.json({ error: 'not_allowed', message: e instanceof Error ? e.message : 'not allowed' }, { status: status === 403 ? 403 : status });
  }
  const result = await checkRelease(rel);
  try {
    await asService('vexa_fleet_release_verified', { p_id: id, p_ok: result.ok, p_error: result.ok ? null : result.error });
  } catch (e) {
    return NextResponse.json({ error: 'record_failed', message: e instanceof Error ? e.message : 'could not record' }, { status: 500 });
  }
  return NextResponse.json(result, { status: result.ok ? 200 : 422 });
}
