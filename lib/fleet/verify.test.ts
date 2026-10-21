import { describe, expect, it, vi } from 'vitest';
import { createHash, generateKeyPairSync, sign } from 'node:crypto';

vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key');
const { checkRelease: check } = await import('@/lib/fleet/verify');
const { canonicalManifest } = await import('@/lib/fleet/manifest');

function release(bytes: Buffer, over: Record<string, unknown> = {}) {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');   // a THROWAWAY key, for this test only
  const x = (publicKey.export({ format: 'jwk' }) as { x: string }).x;
  const manifest = { format: 'vexa-release/1', category: 'app', version: '0.7.0', hardwareFamily: 'vexaos-edge-gateway',
    artifact: { name: 'a.tar.gz', sha256: createHash('sha256').update(bytes).digest('hex'), size: bytes.length }, ...over };
  const signature = sign(null, Buffer.from(canonicalManifest(manifest)), privateKey).toString('base64url');
  return { artifact_path: 'releases/00000000-0000-0000-0000-000000000000/a.tar.gz', manifest, signature, public_key: x };
}
const serve = (bytes: Buffer) => (async () => new Response(new Blob([new Uint8Array(bytes)]).stream(), { status: 200 })) as unknown as typeof fetch;

describe('server-side release check', () => {
  const bytes = Buffer.from('artifact bytes '.repeat(1000));
  it('accepts a correctly signed, matching artifact', async () => {
    expect(await check(release(bytes), serve(bytes))).toMatchObject({ ok: true, size: bytes.length });
  });
  it('refuses a changed artifact, a changed manifest, a wrong key, a missing file', async () => {
    const r = release(bytes);
    expect(await check(r, serve(Buffer.concat([bytes, Buffer.from('x')])))).toMatchObject({ ok: false, error: expect.stringMatching(/larger than the signed size/) });
    const tampered = Buffer.from(bytes); tampered[0] = 0;
    expect(await check(r, serve(tampered))).toMatchObject({ ok: false, error: expect.stringMatching(/SHA-256/) });
    expect(await check({ ...r, manifest: { ...r.manifest, allowDowngrade: true } }, serve(bytes))).toMatchObject({ ok: false, error: expect.stringMatching(/bad signature/) });
    expect(await check({ ...r, public_key: release(bytes).public_key }, serve(bytes))).toMatchObject({ ok: false, error: expect.stringMatching(/bad signature/) });
    expect(await check({ ...r, public_key: null }, serve(bytes))).toMatchObject({ ok: false });
    expect(await check(r, (async () => new Response(null, { status: 404 })) as unknown as typeof fetch)).toMatchObject({ ok: false, error: expect.stringMatching(/404/) });
  });
});
