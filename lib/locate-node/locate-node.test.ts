import { describe, expect, it } from 'vitest';
import { LOCALES } from '@/lib/i18n/config';
import { STORE_STRINGS } from '@/lib/store/strings';
import type { StoreProduct } from '@/lib/store/types';
import { LOCATE_NODE_STRINGS } from './strings';
import { buyView, words } from './view';

const flat = (o: unknown, path = ''): [string, string | number][] =>
  Array.isArray(o) ? o.flatMap((v, i) => flat(v, `${path}[${i}]`))
  : o && typeof o === 'object' ? Object.entries(o).flatMap(([k, v]) => flat(v, path ? `${path}.${k}` : k))
  : [[path, o as string | number]];
const en = LOCATE_NODE_STRINGS.en;
const product = (o: Partial<StoreProduct> = {}) => ({ status: 'coming_soon', from_cents: 14900, currency: 'usd', expected_text: 'Winter 2026', notify_enabled: true, available: false, price_varies: false, ...o }) as StoreProduct;

describe('Locate Node page copy', () => {
  it('every language has the same structure: same keys, same list lengths, same numbers', () => {
    const shape = flat(en).map(([k, v]) => (typeof v === 'number' ? `${k}=${v}` : k));
    for (const l of LOCALES) expect(flat(LOCATE_NODE_STRINGS[l]).map(([k, v]) => (typeof v === 'number' ? `${k}=${v}` : k)), l).toEqual(shape);
  });
  it('nothing is left empty, and placeholders survive translation', () => {
    for (const l of LOCALES) {
      const mine = flat(LOCATE_NODE_STRINGS[l]);
      flat(en).forEach(([k, src], i) => {
        const [, value] = mine[i];
        if (typeof src !== 'string') return;
        if (src === '') { expect(value, `${l} ${k}`).toBe(''); return; }
        expect(String(value).trim().length, `${l} ${k}`).toBeGreaterThan(0);
        expect((String(value).match(/\{[a-z]+\}/g) ?? []).sort(), `${l} ${k}`).toEqual((src.match(/\{[a-z]+\}/g) ?? []).sort());
      });
    }
  });
  it('brand and technology names are never translated or misspelled', () => {
    const NAMES = ['VexaOs', 'Locate Node', 'MQTT', 'HTTP/HTTPS', 'USB-C', 'Bluetooth', 'Edge Gateway', 'Open Integration', 'GPS', 'iOS', 'Android'];
    for (const l of LOCALES) {
      const mine = flat(LOCATE_NODE_STRINGS[l]);
      flat(en).forEach(([k, src], i) => {
        const value = String(mine[i][1]);
        expect(value, `${l} ${k}`).not.toMatch(/VexaOS|Vexaos|VEXAOS|Raspberry|MOKO|Moko/);
        if (typeof src === 'string') for (const n of NAMES) if (src.includes(n)) expect(value, `${l} ${k}: ${n}`).toContain(n);
      });
    }
  });
  it('unknown specifications are shown as unknown in every language, never filled in', () => {
    const unknown = en.specs.rows.map(([, v], i) => (v === '—' ? i : -1)).filter((i) => i >= 0);
    expect(unknown).toHaveLength(5);
    for (const l of LOCALES) expect(LOCATE_NODE_STRINGS[l].specs.rows.map(([, v], i) => (v === '—' ? i : -1)).filter((i) => i >= 0), l).toEqual(unknown);
  });
  it('makes no claim the product data does not support', () => {
    const text = flat(en).map(([, v]) => String(v)).join(' \n ');
    // no measured performance, awards, ratings, certifications held, or the Edge Gateway's behaviour
    for (const banned of [/\b\d+\s?(m|meters|metres|ft|feet|hours|days|years|ms|seconds|%|mAh|dBm)\b/i, /award/i, /\bstars?\b/i, /review/i, /certified/i, /best[- ]in[- ]class/i, /#1|number one/i,
      /no data loss|never loses?/i, /self-healing|watchdog/i, /under (a|one|1) second|sub-second/i, /battery life/i, /IP6\d/i, /waterproof|weatherproof/i]) {
      expect(text, String(banned)).not.toMatch(banned);
    }
    // the limits the product itself states are on the page
    expect(text).toMatch(/does not provide GPS or guaranteed precise indoor positioning/);
    expect(text).toMatch(/in development/i);
    expect(text).toMatch(/separate software subscription/);
    // the only numerals are the three counts taken from the product description
    expect(en.stats.items.map((x) => x.value)).toEqual([4, 3, 1]);
    expect([en.compat.sensors.length, en.compat.connect.length]).toEqual([4, 3]);
  });
});

describe('what the page offers to do follows the product in the store', () => {
  const view = (o: Partial<StoreProduct> = {}, l: (typeof LOCALES)[number] = 'en') => buyView(product(o), LOCATE_NODE_STRINGS[l], STORE_STRINGS[l].from, l);
  it('coming soon with sign-ups: Notify me, with the real price and the expected text', () => {
    expect(view()).toEqual({ price: '$149.00', status: 'Coming soon · Expected Winter 2026', action: 'notify', label: 'Notify me' });
    expect(view({ expected_text: null }).status).toBe('Coming soon');
    expect(view({}, 'th').label).toBe('แจ้งเตือนฉัน');
  });
  it('no price is "Price TBA"; no sign-ups sends people to the store page', () => {
    expect(view({ from_cents: null }).price).toBe('Price TBA');
    expect(view({ notify_enabled: false })).toMatchObject({ action: 'view', label: 'View in store' });
  });
  it('on sale: Buy; on sale but unavailable or unpriced: not offered as buyable', () => {
    expect(view({ status: 'active', available: true })).toEqual({ price: '$149.00', status: 'Available now', action: 'buy', label: 'Buy' });
    expect(view({ status: 'active', available: true, price_varies: true }).price).toBe('From $149.00');
    expect(view({ status: 'active', available: false }).action).toBe('view');
    expect(view({ status: 'active', available: true, from_cents: null })).toMatchObject({ action: 'view', price: 'Price TBA' });
  });
  it('splits the statement into words without losing any text', () => {
    expect(words('Every space is full of signals.')).toEqual(['Every ', 'space ', 'is ', 'full ', 'of ', 'signals.']);
    for (const l of LOCALES) expect(words(LOCATE_NODE_STRINGS[l].statement).join(''), l).toBe(LOCATE_NODE_STRINGS[l].statement);
  });
});
