import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { LOCALES } from '@/lib/i18n/config';
import { PATHS, PRODUCTS } from '@/lib/site';
import { MOBILE_GATEWAY_PATH, MOBILE_GATEWAY_STRINGS } from './strings';
import { DETAILS, ECOSYSTEM, LIGHTS, POWER_SEQUENCE, SCENARIOS, SPEC_ROWS, STORIES } from './config';
import { IMAGES, fileFor, srcSet } from './images';
import { INDUSTRY_KEYS, MONITOR_KEYS, SIZE_KEYS, TOKEN, launchListCsv, unsubscribePath, validateLaunchForm, type LaunchEntry } from './launch-list';

const flat = (o: unknown, p = ''): [string, unknown][] =>
  Array.isArray(o) ? o.flatMap((v, i) => flat(v, `${p}[${i}]`)) : o && typeof o === 'object' ? Object.entries(o).flatMap(([k, v]) => flat(v, p ? `${p}.${k}` : k)) : [[p, o]];
const en = MOBILE_GATEWAY_STRINGS.en;

describe('Mobile Gateway copy in five languages', () => {
  it('every language has exactly the English structure, and nothing is empty', () => {
    const shape = flat(en).map(([k]) => k);
    for (const l of LOCALES) {
      const mine = flat(MOBILE_GATEWAY_STRINGS[l]);
      expect(mine.map(([k]) => k), l).toEqual(shape);
      for (const [k, v] of mine) expect(typeof v === 'string' && v.trim().length > 0, `${l} ${k}`).toBe(true);
    }
  });
  it('brand and technology names are kept, and the brand is always written "VexaOs"', () => {
    const NAMES = ['VexaOs', 'Mobile Gateway', 'Locate Node', 'LoRaWAN', 'BLE', 'Wi-Fi', 'LTE', 'GNSS', 'USB-C', 'ESP32-S3', 'PoE', 'Nano SIM'];
    for (const l of LOCALES) {
      const mine = flat(MOBILE_GATEWAY_STRINGS[l]);
      flat(en).forEach(([k, src], i) => {
        const v = String(mine[i][1]);
        expect(v, `${l} ${k}`).not.toMatch(/VexaOS|VEXAOS|Vexaos/);
        for (const n of NAMES) if (String(src).includes(n)) expect(v, `${l} ${k}: ${n}`).toContain(n);
      });
    }
  });
  it('demo values are the same in every language and always labelled', () => {
    for (const l of LOCALES) {
      const s = MOBILE_GATEWAY_STRINGS[l].industries;
      expect([s.trip.temperatureValue, s.trip.humidityValue, s.field.soilValue, s.field.tankValue, s.field.airValue], l).toEqual(['3.8°C', '62%', '28%', '74%', '24°C']);
      expect(s.trip.label && s.field.label && s.medical.label, l).toBeTruthy();
    }
    expect(en.meta.title).toBe('VexaOs Mobile Gateway | Portable Industrial IoT Connectivity — Coming Soon');
    expect(en.industries.medical.disclosure).toBe('Conceptual application. Not a certified medical monitoring or life-support device.');
    expect(en.early.form.success.title).toBe('You’re on the list.');
    expect(JSON.stringify(en.early.form.success)).not.toMatch(/email|inbox|sent/i);
  });
  it('the structure lists line up with the copy', () => {
    expect(STORIES).toHaveLength(en.industries.stories.length);
    expect(STORIES.map((s) => s.id)).toEqual(['trucking', 'agriculture', 'medical', 'cold-chain', 'industrial', 'construction', 'utilities', 'warehousing', 'energy']);
    expect(SCENARIOS).toHaveLength(en.scenarios.tabs.length);
    expect(SPEC_ROWS.map((r) => r.length)).toEqual(en.specs.groups.map((g) => g.rows.length));
    expect(DETAILS).toHaveLength(en.design.details.length);
    expect(LIGHTS).toHaveLength(en.design.light.length);
    expect(ECOSYSTEM).toHaveLength(en.ecosystem.items.length);
    expect(POWER_SEQUENCE).toHaveLength(en.power.sequence.length);
    expect(INDUSTRY_KEYS).toHaveLength(en.early.form.industries.length);
    expect(SIZE_KEYS).toHaveLength(en.early.form.quantities.length);
    expect(MONITOR_KEYS).toHaveLength(en.early.form.monitorOptions.length);
    expect(en.networks.items.map((n) => n.tab)).toEqual(['BLE', 'LoRaWAN', 'Wi-Fi', '4G LTE']);
    expect(en.faq.items).toHaveLength(14);
    // the medical concept always carries its disclosure; every other environment is an illustration
    expect(STORIES.filter((s) => s.concept).map((s) => s.slot.photo?.key)).toEqual(['medical']);
    for (const s of [...STORIES, ...SCENARIOS]) expect(['truck', 'field', 'dock', 'warehouse', 'excavator', 'water', 'solar', 'factory', 'case']).toContain(s.slot.illustration);
  });
  it('is a public page in the sitemap, and the generic product page no longer renders it', () => {
    expect(MOBILE_GATEWAY_PATH).toBe('/products/mobile-gateway');
    expect(PATHS.map((p) => p.path)).toContain(MOBILE_GATEWAY_PATH);
    expect(PRODUCTS.find((p) => p.slug === 'mobile-gateway')?.status).toBe('soon');
  });
});

describe('images', () => {
  it('every variant the page can ask for exists in public/', () => {
    for (const [key, im] of Object.entries(IMAGES)) {
      for (const ext of ['avif', 'webp'] as const) for (const w of im.widths) expect(existsSync(path.join('public', fileFor(im, w, ext))), `${key} ${w} ${ext}`).toBe(true);
      const fb = im.alpha ? [im.widths[0]] : im.widths;
      for (const w of fb) expect(existsSync(path.join('public', fileFor(im, w, im.alpha ? 'png' : 'jpg'))), `${key} ${w} fallback`).toBe(true);
    }
    expect(srcSet(IMAGES.studio, 'avif')).toBe('/mobile-gateway/studio-640.avif 640w, /mobile-gateway/studio-960.avif 960w, /mobile-gateway/studio-1280.avif 1280w, /mobile-gateway/studio-1448.avif 1448w');
    expect(existsSync('public/mobile-gateway/og.jpg')).toBe(true);
  });
});

describe('launch list rules', () => {
  const ok = { full_name: '  Pat   Driver ', email: ' Pat@Example.com ', company: 'Example Freight', industry: 'cold_chain', consent: true };
  it('accepts a complete request and cleans it', () => {
    const r = validateLaunchForm({ ...ok, country: 'us', monitor: ['temperature', 'temperature', 'nope'], deployment_size: '6-25', request_type: 'consultation', message: ' hi\r\n there ' });
    expect(r).toEqual({ ok: true, value: { full_name: 'Pat Driver', email: 'pat@example.com', company: 'Example Freight', industry: 'cold_chain', use_case: '', message: 'hi\n there',
      country: 'US', monitor: ['temperature'], deployment_size: '6-25', request_type: 'consultation', consent: true } });
  });
  it('refuses missing or bad fields with one message per field', () => {
    const r = validateLaunchForm({ email: 'nope', industry: 'mining', consent: 'yes', message: 'x'.repeat(2001) });
    expect(r).toEqual({ ok: false, errors: { full_name: 'name', email: 'email', company: 'company', industry: 'industry', consent: 'consent', message: 'tooLong' } });
    const r2 = validateLaunchForm({ ...ok, country: 'XX', deployment_size: 'lots', request_type: 'buy' });
    expect(r2.ok && [r2.value.country, r2.value.deployment_size, r2.value.request_type]).toEqual([null, null, 'launch_list']);
  });
  it('unsubscribe links carry the token in the fragment', () => {
    const tk = 'a'.repeat(43);
    expect(TOKEN.test(tk)).toBe(true);
    expect(unsubscribePath(tk)).toBe(`/products/mobile-gateway/unsubscribe#t=${tk}`);
  });
  it('the CSV export defuses spreadsheet formulas and keeps non-Latin names', () => {
    const e = { id: '1', product: 'mobile-gateway', email: 'a@example.com', full_name: '=HYPERLINK("x")', company: 'บริษัท, จำกัด', industry: 'other', use_case: '@sum', monitor: ['temperature', 'location'],
      country: 'TH', deployment_size: '1-5', message: 'line1\nline2', request_type: 'launch_list', consent_version: '2026-10-14', consented_at: '2026-10-14T10:00:00.000Z', source: '/products/mobile-gateway',
      locale: 'th', status: 'subscribed', unsubscribed_at: null, submissions: 1, created_at: '2026-10-14T10:00:00.000Z', updated_at: '2026-10-14T10:00:00.000Z' } as LaunchEntry;
    const csv = launchListCsv([e]);
    expect(csv.startsWith('﻿Signed up (UTC),')).toBe(true);
    expect(csv).toContain(`"'=HYPERLINK(""x"")"`);
    expect(csv).toContain(`"'@sum"`);
    expect(csv).toContain('"บริษัท, จำกัด"');
    expect(csv).toContain('temperature; location');
    expect(csv).toContain('"line1\nline2"');
  });
});
