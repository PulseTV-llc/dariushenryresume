import { describe, expect, it } from 'vitest';
import { LOCALES } from '@/lib/i18n/config';
import { emptyForm, formFromProduct, previewProduct, productPayload, readiness } from './admin-logic';
import { heroChips } from './hero';
import { productSchema } from './jsonld';
import { STORE_STRINGS } from './strings';
import { cleanEmail, waitlistCsv, waitlistCsvName } from './waitlist';
import type { StoreProduct } from './types';

const product = (o: Partial<StoreProduct> = {}): StoreProduct => ({
  id: '11111111-1111-4111-8111-111111111111', slug: 'bracket', name: 'Bracket', summary: 'A steel bracket.', description: '', status: 'active', category: null,
  currency: 'usd', price_cents: 1800, compare_at_cents: null, from_cents: 1800, price_varies: false, inventory_mode: 'tracked', lead_time_days: null, available: true, max_quantity: 5,
  options: [], seo_title: null, seo_description: null, translations: {}, updated_at: '', published_at: null, images: [], variants: [], ...o,
});
const soon = (o: Partial<StoreProduct> = {}) => product({ status: 'coming_soon', available: false, expected_text: 'Spring 2027', notify_enabled: true, ...o });

describe('coming soon', () => {
  it('is announced in structured data as not yet for sale, and makes no offer without a price', () => {
    expect((productSchema(soon(), 'en') as any).offers.availability).toBe('https://schema.org/PreOrder');
    expect('offers' in productSchema(soon({ from_cents: null, price_cents: null }), 'en')).toBe(false);
    expect((productSchema(product({ available: false }), 'en') as any).offers.availability).toBe('https://schema.org/OutOfStock');
  });
  it('does not count as something on sale in the hero chips', () => {
    const base = { checkoutOpen: false, shipFrom: null, shipTo: ['US'], locale: 'en' as const, t: STORE_STRINGS.en };
    expect(heroChips({ ...base, products: [soon({ inventory_mode: 'made_to_order' })] })[1]).toBe('Order by message');
    expect(heroChips({ ...base, products: [soon(), product()] })[1]).toBe('In stock');
  });
  it('says "Coming soon", "Price TBA" and the expected time in every language', () => {
    for (const l of LOCALES) {
      const s = STORE_STRINGS[l].soon;
      expect(s.expected.replace('{when}', 'Spring 2027'), l).toContain('Spring 2027');
      if (l !== 'en') for (const k of ['badge', 'priceTba', 'notifyTitle', 'notifyDone', 'notifyInvalid'] as const) expect(s[k], `${l}.${k}`).not.toBe(STORE_STRINGS.en.soon[k]);
    }
  });
  it('the admin form sends the expected text and the notify switch, which only counts while coming soon', () => {
    const f = { ...emptyForm(), name: 'Solar bracket', slug: 'solar-bracket', status: 'coming_soon' as const, expected: '  Spring 2027 ', notify: true };
    expect(productPayload(f)).toEqual({ payload: expect.objectContaining({ status: 'coming_soon', price_cents: null, expected_text: 'Spring 2027', notify_enabled: true }) });
    expect(productPayload({ ...f, status: 'active', price: '10' })).toEqual({ payload: expect.objectContaining({ notify_enabled: false }) });
    expect(readiness(f)).toEqual(['a photo (recommended)']);
    const pv = previewProduct({ ...f, price: '25', inventory: '9' }, []);
    expect([pv.status, pv.available, pv.expected_text, pv.notify_enabled, pv.from_cents]).toEqual(['coming_soon', false, 'Spring 2027', true, 2500]);
    const back = formFromProduct(soon());
    expect([back.status, back.expected, back.notify]).toEqual(['coming_soon', 'Spring 2027', true]);
  });
});

describe('waitlist', () => {
  it('accepts real addresses and nothing else', () => {
    expect(cleanEmail('  Pat.Buyer+store@Example.co.th ')).toBe('pat.buyer+store@example.co.th');
    for (const bad of ['', 'nope', 'a@b', 'a b@example.com', 'a@@example.com', 'a..b@example.com', '<x>@example.com', `${'x'.repeat(250)}@example.com`, null, 42, {}]) expect(cleanEmail(bad), String(bad)).toBeNull();
  });
  it('exports a CSV that a spreadsheet cannot be tricked into running', () => {
    const csv = waitlistCsv('Bracket, "large"', [{ email: 'one@example.com', locale: 'vi', created_at: '2026-10-11T09:30:15.123Z' }, { email: '=cmd@example.com', locale: null, created_at: '2026-10-10T00:00:00Z' }]);
    expect(csv.split('\r\n')).toEqual(['Product,Email,Language,Signed up (UTC)', '"Bracket, ""large""",one@example.com,vi,2026-10-11 09:30:15', `"Bracket, ""large""","'=cmd@example.com",,2026-10-10 00:00:00`, '']);
    expect(waitlistCsvName('solar-bracket', '2026-10-11')).toBe('vexaos-waitlist-solar-bracket-2026-10-11.csv');
  });
});
