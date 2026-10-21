/**
 * Release manifest canonical form: the exact bytes a release signature covers (platform repository:
 * docs/fleet/release-signing.md). MUST match vexa-edge/vexa_edge/fleet/signing.py and supabase/functions/_shared/fleetManifest.ts;
 * manifest-vector.json is a copy of the platform's shared/fleet/manifest-vector.json and the test pins all three.
 */
export const MANIFEST_FORMAT = 'vexa-release/1';

function sortValue(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortValue);
  if (v !== null && typeof v === 'object') {
    return Object.fromEntries(Object.keys(v as Record<string, unknown>).sort().map((k) => [k, sortValue((v as Record<string, unknown>)[k])]));
  }
  if (typeof v === 'number' && !Number.isInteger(v)) throw new Error('manifest numbers must be whole numbers');
  return v;
}

export function canonicalManifest(manifest: Record<string, unknown>): Uint8Array {
  const json = JSON.stringify(sortValue(manifest)).replace(/[\u007f-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
  return new TextEncoder().encode(`${MANIFEST_FORMAT}\n${json}`);
}

export interface ParsedRelease { manifest: Record<string, unknown>; keyId: string; signature: string; problems: string[] }

/** What the admin pastes: the .manifest.json and the .sig file made by sign-release.py. Checked before anything is sent. */
export function parseReleaseFiles(manifestText: string, sigText: string, fileName: string | null): ParsedRelease {
  const problems: string[] = [];
  let manifest: Record<string, unknown> = {};
  let keyId = '', signature = '';
  try { manifest = JSON.parse(manifestText); } catch { problems.push('The manifest is not valid JSON.'); }
  try { const s = JSON.parse(sigText); keyId = String(s.keyId ?? ''); signature = String(s.signature ?? ''); } catch { problems.push('The signature file is not valid JSON ({"keyId", "signature"}).'); }
  if (manifest.format !== MANIFEST_FORMAT) problems.push(`The manifest format must be ${MANIFEST_FORMAT}.`);
  if (!['app', 'agent', 'os', 'bootloader', 'peripheral'].includes(String(manifest.category))) problems.push('Unknown category.');
  if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(String(manifest.version ?? ''))) problems.push('The version must be semantic (1.2.3).');
  const a = manifest.artifact as { name?: string; sha256?: string; size?: number } | undefined;
  if (!a || !/^[0-9a-f]{64}$/.test(String(a.sha256)) || !Number.isInteger(a.size)) problems.push('The manifest has no valid artifact {name, sha256, size}.');
  else if (fileName && a.name !== fileName) problems.push(`The chosen file is ${fileName}, the manifest names ${a.name}.`);
  if (!/^[A-Za-z0-9_-]{22}$/.test(keyId)) problems.push('The signature file has no key id.');
  if (!/^[A-Za-z0-9_-]{86}$/.test(signature)) problems.push('The signature file has no Ed25519 signature.');
  return { manifest, keyId, signature, problems };
}
