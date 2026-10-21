import { describe, expect, it } from 'vitest';
import vector from './manifest-vector.json';
import { canonicalManifest, parseReleaseFiles } from './manifest';

describe('canonical manifest', () => {
  it('is byte-identical to the gateway (Python) and the backend (pinned vector)', () => {
    expect(new TextDecoder().decode(canonicalManifest(vector.manifest as Record<string, unknown>))).toBe(vector.canonical);
  });
  it('sorts keys at every level and escapes non-ASCII', () => {
    expect(new TextDecoder().decode(canonicalManifest({ b: 1, a: { d: [2, { z: 1, y: 'é' }], c: null } }))).toBe('vexa-release/1\n{"a":{"c":null,"d":[2,{"y":"\\u00e9","z":1}]},"b":1}');
    expect(() => canonicalManifest({ x: 1.5 })).toThrow();
  });
});

describe('parseReleaseFiles', () => {
  const m = JSON.stringify(vector.manifest);
  const sig = JSON.stringify({ keyId: 'A'.repeat(22), signature: 'B'.repeat(86) });
  it('accepts what sign-release.py writes', () => expect(parseReleaseFiles(m, sig, 'vexa-edge-0.7.0.tar.gz').problems).toEqual([]));
  it('names every problem', () => {
    expect(parseReleaseFiles('nope', '{}', null).problems.length).toBeGreaterThan(2);
    expect(parseReleaseFiles(m, sig, 'other.tar.gz').problems[0]).toMatch(/manifest names vexa-edge-0.7.0.tar.gz/);
  });
});
