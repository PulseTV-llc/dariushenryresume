import { createHash, createPublicKey, verify as edVerify } from 'node:crypto';
import { SUPABASE_URL } from '@/lib/store/config';
import { canonicalManifest } from './manifest';
import { serviceKey } from './server';

/** SERVER ONLY: the private Storage bucket for release artifacts. */
export const ARTIFACT_BUCKET = 'fleet-artifacts';

/** Signature first (cheap), then the artifact streamed from Storage: exact size and SHA-256 of the signed manifest. */
export async function checkRelease(rel: { artifact_path: string; manifest: Record<string, unknown>; signature: string; public_key: string | null },
                            fetchImpl: typeof fetch = fetch): Promise<{ ok: true; sha256: string; size: number } | { ok: false; error: string }> {
  if (!rel.public_key) return { ok: false, error: 'the signing key is unknown or revoked' };
  const art = rel.manifest.artifact as { sha256: string; size: number };
  // 1) signature (cheap) first
  let sigOk = false;
  try {
    const key = createPublicKey({ key: { kty: 'OKP', crv: 'Ed25519', x: rel.public_key }, format: 'jwk' });
    sigOk = edVerify(null, Buffer.from(canonicalManifest(rel.manifest)), key, Buffer.from(rel.signature, 'base64url'));
  } catch { sigOk = false; }
  if (!sigOk) return { ok: false, error: 'bad signature: the manifest was not signed by this key (or was changed after signing)' };
  // 2) the artifact, streamed
  const url = `${SUPABASE_URL}/storage/v1/object/${ARTIFACT_BUCKET}/${rel.artifact_path.split('/').map(encodeURIComponent).join('/')}`;
  const res = await fetchImpl(url, { headers: { authorization: `Bearer ${serviceKey()}`, apikey: serviceKey() ?? '' }, cache: 'no-store' });
  if (!res.ok || !res.body) return { ok: false, error: `the artifact could not be read from storage (${res.status})` };
  const hash = createHash('sha256');
  let size = 0;
  const reader = res.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > art.size) { await reader.cancel(); return { ok: false, error: 'the uploaded artifact is larger than the signed size' }; }
    hash.update(value);
  }
  const digest = hash.digest('hex');
  if (size !== art.size) return { ok: false, error: `size ${size} does not match the signed size ${art.size}` };
  if (digest !== art.sha256) return { ok: false, error: 'SHA-256 does not match the signed manifest' };
  return { ok: true, sha256: digest, size };
}
