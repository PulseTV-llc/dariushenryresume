import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { LOCALES } from '@/lib/i18n/config';
import { MOBILE_GATEWAY_STRINGS } from './strings';
import { SPEC_ROWS } from './config';
import { VENDOR_NAMES, withVendor } from './vendor';
import { allStrings, findClaims } from './claims';

const ROOT = path.resolve(__dirname, '..', '..');
const sources = (dir: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = path.join(dir, f);
  return statSync(p).isDirectory() ? sources(p) : /\.(tsx?|css)$/.test(f) ? [p] : [];
});

describe('the Mobile Gateway page makes no banned claims', () => {
  it('in any language: every string, in every locale', () => {
    for (const l of LOCALES) {
      const found = allStrings(MOBILE_GATEWAY_STRINGS[l]).flatMap(findClaims);
      expect(found.map((v) => `${v.rule}: "${v.match}" in "${v.text}"`), l).toEqual([]);
    }
  });

  it('in the specifications as rendered (vendor names off by default)', () => {
    for (const l of LOCALES) {
      const rows = MOBILE_GATEWAY_STRINGS[l].specs.groups.flatMap((g, gi) => g.rows.map(([label, value], ri) => `${label} ${withVendor(value, SPEC_ROWS[gi][ri].vendor)}`));
      expect(rows.flatMap(findClaims), l).toEqual([]);
    }
  });

  it('in the page code: components, routes and the page library (the vendor flag file is the one exception)', () => {
    const files = [...sources(path.join(ROOT, 'components', 'mobile-gateway')), ...sources(path.join(ROOT, 'app', '[locale]', 'products', 'mobile-gateway')),
      ...sources(path.join(ROOT, 'app', 'api', 'launch-list')), ...sources(path.join(ROOT, 'lib', 'mobile-gateway'))]
      .filter((f) => !/vendor\.ts$|claims(\.test)?\.ts$|\/i18n\//.test(f));
    expect(files.length).toBeGreaterThan(10);
    for (const f of files) {
      const code = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');   // comments may discuss the rules
      expect(findClaims(code).filter((v) => ['Raspberry', 'Waveshare', 'FDA', '5G', 'IP rating', 'MIL-STD', 'HIPAA compliant'].includes(v.rule)).map((v) => v.match), f).toEqual([]);
    }
  });

  it('vendor names live only in vendor.ts and appear only when the flag is switched on', () => {
    expect(withVendor('ESP32-S3 + LTE Cat-1 modem development platform', 'cellular')).not.toMatch(/Waveshare/);
    expect(withVendor('ESP32-S3 + LTE Cat-1 modem development platform', 'cellular', true)).toContain('Waveshare ESP32-S3 + SIM7670G');
    expect(withVendor('Linux edge compute module', 'linux', true)).toContain('Raspberry Pi');
    expect(withVendor('Planned', undefined, true)).toBe('Planned');
    expect(Object.values(VENDOR_NAMES).join(' ')).toMatch(/Waveshare.*Raspberry|Raspberry.*Waveshare/);
  });
});

describe('the claims checker itself', () => {
  it('fails on deliberately bad strings', () => {
    const bad = [
      'The first gateway of its kind.', 'The only device you need.', 'Best-in-class coverage.', 'The fastest uplink.', 'The most accurate tracker.',
      'The most secure gateway.', 'Certified for cold chain.', 'IP67 rated.', 'Sealed to IP6x.', 'Rated IPxx.', 'Tested to MIL-STD-810.',
      '30 days of battery.', 'Weeks of battery life.', 'Multi-day runtime.', '5G ready.', 'Unlimited range.', 'Guaranteed delivery.', 'FDA cleared.',
      'HIPAA compliant storage.', 'Built on Raspberry Pi.', 'Powered by Waveshare.',
    ];
    for (const s of bad) expect(findClaims(s).length, s).toBeGreaterThan(0);
  });
  it('lets honest negations and architecture names through', () => {
    const good = [
      'Not yet certified', 'Not a certified medical monitoring or life-support device.', 'The product is not currently certified or represented as suitable.',
      'A planned workflow, not a certified safety system.', 'It is for monitoring, not certified control.', 'The gateway is not intended to imply unlimited coverage.',
      'No coverage is guaranteed.', 'Medical-device certification: Not claimed', 'Wi-Fi-only gateway', 'Cellular-only tracker', '4G LTE Cat-1', 'Wi-Fi 2.4 GHz',
    ];
    for (const s of good) expect(findClaims(s), s).toEqual([]);
  });
});
