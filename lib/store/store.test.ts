import { describe, expect, it } from 'vitest';
import Stripe from 'stripe';
import { LOCALES } from '@/lib/i18n/config';
import { addItem, cartCount, parseCart, quoteItems, removeItem, setQuantity } from './cart';
import { checkoutBlock, checkoutEnabled, shipCountries, shipsFrom } from './config';
import { countryName, heroChips } from './hero';
import { SESSION_SOURCE, sessionParams } from './checkout';
import { minorUnit, money, priceLabel, productText } from './format';
import { productSchema, storeListSchema } from './jsonld';
import { STORE_STRINGS } from './strings';
import { WEBHOOK_EVENTS, handleStripeEvent, orderItems, sessionSummary, type WebhookDeps } from './webhook';
import {
  addTierRow, applyStepDiscount, parseTiers, suggestMaxQuantity, tierProblems, tierSummary,
  emptyForm, formFromProduct, move, moneyInput, parseMoney, parseOptions, previewProduct, productPayload, readiness, slugify, variantsFromOptions,
} from './admin-logic';
import { activeRow, lineSavings, rangeLabel, tierRows, tiersFor, unitPrice } from './pricing';
import { FIT, clampView, swipeDirection, wrap, zoomAt } from './zoom';
import type { Quote, StoreProduct } from './types';

const A = '11111111-1111-4111-8111-111111111111', B = '22222222-2222-4222-8222-222222222222', V = '33333333-3333-4333-8333-333333333333';
const product = (o: Partial<StoreProduct> = {}): StoreProduct => ({
  id: A, slug: 'bracket', name: 'Bracket', summary: 'A steel bracket.', description: 'Line one.\n\nLine two.', status: 'active', category: { id: 'c', slug: 'mounts', name: 'Mounts' },
  currency: 'usd', price_cents: 1800, compare_at_cents: null, from_cents: 1800, price_varies: false, inventory_mode: 'tracked', lead_time_days: null, available: true, max_quantity: 5,
  options: [], seo_title: null, seo_description: null, translations: { th: { name: 'ขายึด' } }, updated_at: '2026-10-10T00:00:00Z', published_at: '2026-10-10T00:00:00Z',
  images: [{ id: 'i1', path: 'products/a/front view.webp', alt: 'Front', width: 1200, height: 900 }], variants: [], ...o,
});

describe('cart', () => {
  it('adds, merges, limits and removes', () => {
    let c = addItem([], A, null, 2);
    c = addItem(c, A, null, 3);
    c = addItem(c, A, V, 1);
    expect(c).toEqual([{ productId: A, variantId: null, quantity: 5 }, { productId: A, variantId: V, quantity: 1 }]);
    expect(addItem(c, A, null, 50)[0].quantity).toBe(55);
    expect(addItem(c, A, null, 50, 30)[0].quantity).toBe(30);
    expect(addItem(c, A, null, 99999)[0].quantity).toBe(10000);
    expect(addItem([], A, null, 9, 3)[0].quantity).toBe(3);
    expect(setQuantity(c, A, V, 4)[1].quantity).toBe(4);
    expect(setQuantity(c, A, V, 0)).toHaveLength(1);
    expect(cartCount(removeItem(c, A, null))).toBe(1);
    expect(quoteItems(c)[1]).toEqual({ product_id: A, variant_id: V, quantity: 1 });
  });
  it('trusts nothing it reads back', () => {
    expect(parseCart('not json')).toEqual([]);
    expect(parseCart({})).toEqual([]);
    expect(parseCart(JSON.stringify([{ productId: A, quantity: 2, price_cents: 1 }, { productId: 'x', quantity: 1 }, { productId: B, variantId: 'nope', quantity: 1 },
      { product_id: B, variant_id: null, quantity: 99 }, { productId: A, quantity: -1 }])))
      .toEqual([{ productId: A, variantId: null, quantity: 2 }, { productId: B, variantId: null, quantity: 99 }]);
  });
});

describe('checkout is open only when a payment can also be recorded', () => {
  const base = { NEXT_PUBLIC_SUPABASE_URL: 'https://x.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon' };
  const full = { ...base, STRIPE_SECRET_KEY: 'sk_test_1', NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_1', STRIPE_WEBHOOK_SECRET: 'whsec_1', SUPABASE_SERVICE_ROLE_KEY: 'svc' };
  it('says what is missing, in order', () => {
    expect(checkoutBlock({})).toBe('catalog');
    expect(checkoutBlock(base)).toBe('stripe_keys');
    expect(checkoutBlock({ ...base, STRIPE_SECRET_KEY: 'sk_test_1' })).toBe('stripe_keys');
    expect(checkoutBlock({ ...full, STRIPE_WEBHOOK_SECRET: '' })).toBe('webhook_secret');
    expect(checkoutBlock({ ...full, SUPABASE_SERVICE_ROLE_KEY: undefined })).toBe('order_recording');
    expect(checkoutEnabled(full)).toBe(true);
  });
  it('refuses live keys unless live payments are switched on', () => {
    expect(checkoutBlock({ ...full, STRIPE_SECRET_KEY: 'sk_live_1' })).toBe('live_key');
    expect(checkoutBlock({ ...full, STRIPE_SECRET_KEY: 'sk_live_1', STORE_LIVE_PAYMENTS: 'on' })).toBeNull();
  });
  it('ships to the US unless told otherwise', () => {
    expect(shipCountries({})).toEqual(['US']);
    expect(shipCountries({ STORE_SHIP_COUNTRIES: 'us, ca ,PH,zz9,' })).toEqual(['US', 'CA', 'PH']);
  });
});

describe('formatting', () => {
  it('formats money per locale and currency', () => {
    expect(money(1800, 'usd', 'en')).toBe('$18.00');
    expect(money(null, 'usd')).toBe('');
    expect(minorUnit('vnd')).toBe(1);
    expect(money(250000, 'vnd', 'vi')).toMatch(/250\.000/);
    expect(money(1800, 'usd', 'th')).toContain('18.00');
    expect(priceLabel(product({ price_varies: true }), 'en', 'From {price}')).toBe('From $18.00');
    expect(priceLabel(product({ from_cents: null }), 'en', 'From {price}')).toBeNull();
  });
  it('uses a product translation where one exists, else English', () => {
    expect(productText(product(), 'th')).toEqual({ name: 'ขายึด', summary: 'A steel bracket.', description: 'Line one.\n\nLine two.' });
    expect(productText(product(), 'vi').name).toBe('Bracket');
  });
});

describe('interface strings', () => {
  const keys = (o: object, p = ''): string[] => Object.entries(o).flatMap(([k, v]) => (typeof v === 'object' ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
  const flat = (o: object): string[] => Object.values(o).flatMap((v) => (typeof v === 'object' ? flat(v) : [String(v)]));
  it('every language has every string, with the same placeholders and markers', () => {
    const en = STORE_STRINGS.en;
    for (const l of LOCALES) {
      expect(keys(STORE_STRINGS[l]), l).toEqual(keys(en));
      flat(STORE_STRINGS[l]).forEach((s, i) => {
        const src = flat(en)[i];
        expect(s.trim().length, `${l} #${i}`).toBeGreaterThan(0);
        expect((s.match(/\{[a-z]+\}/g) ?? []).sort(), `${l}: ${s}`).toEqual((src.match(/\{[a-z]+\}/g) ?? []).sort());
        expect(s.includes('[['), `${l}: ${s}`).toBe(src.includes('[['));
        if (src.includes('VexaOs')) expect(s, l).toContain('VexaOs');
        if (src.includes('Stripe')) expect(s, l).toContain('Stripe');
        expect(s).not.toMatch(/VexaOS|Vexaos/);
      });
    }
  });
  it('the honesty labels are translated, not left in English', () => {
    for (const l of LOCALES.filter((x) => x !== 'en')) {
      for (const k of ['outOfStock', 'madeToOrder', 'contactToOrder', 'testMode', 'contactNote'] as const) expect(STORE_STRINGS[l][k], `${l}.${k}`).not.toBe(STORE_STRINGS.en[k]);
    }
  });
});

describe('Stripe Checkout session', () => {
  const quote: Quote = { currency: 'usd', subtotal_cents: 4050, lines: [
    { product_id: A, variant_id: null, slug: 'bracket', name: 'Bracket', variant_title: null, sku: null, unit_cents: 1800, quantity: 2, image: 'products/a/x y.webp', made_to_order: false },
    { product_id: B, variant_id: V, slug: 'clip', name: 'Clip', variant_title: 'Large', sku: 'CL-L', unit_cents: 450, quantity: 12, image: null, made_to_order: false, base_cents: 600, tier_min: 11, tier_max: 30 }] };
  it('is built only from the database quote', () => {
    const p = sessionParams(quote, 'th', 'https://www.vexaos.io', ['US', 'TH']);
    expect(p.mode).toBe('payment');
    expect(p.locale).toBe('th');
    expect(p.metadata).toEqual({ source: SESSION_SOURCE, locale: 'th' });
    expect(p.success_url).toBe('https://www.vexaos.io/th/store/success?session_id={CHECKOUT_SESSION_ID}');
    expect(p.cancel_url).toBe('https://www.vexaos.io/th/store/cancel');
    expect(sessionParams(quote, 'en', 'https://x', ['US']).success_url).toBe('https://x/store/success?session_id={CHECKOUT_SESSION_ID}');
    expect(p.shipping_address_collection?.allowed_countries).toEqual(['US', 'TH']);
    const [a, b] = p.line_items!;
    expect([a.quantity, a.price_data?.unit_amount, a.price_data?.currency, a.price_data?.product_data?.name]).toEqual([2, 1800, 'usd', 'Bracket']);
    expect(a.price_data?.product_data?.images?.[0]).toMatch(/store-images\/products\/a\/x%20y\.webp$/);
    expect(b.price_data?.product_data?.name).toBe('Clip (Large)');
    expect(b.price_data?.product_data?.images).toBeUndefined();
    // the bulk price is the unit amount; what it was measured against travels in the metadata for the order record
    expect([b.quantity, b.price_data?.unit_amount]).toEqual([12, 450]);
    expect(b.price_data?.product_data?.metadata).toEqual({ product_id: B, variant_id: V, sku: 'CL-L', name: 'Clip', variant_title: 'Large', base_cents: '600', tier_min: '11', tier_max: '30' });
    expect(a.price_data?.product_data?.metadata).toMatchObject({ base_cents: '', tier_min: '', tier_max: '' });
  });
});

describe('webhook', () => {
  const session = (o: Record<string, unknown> = {}) => ({ id: 'cs_test_1', object: 'checkout.session', payment_intent: 'pi_1', payment_status: 'paid', currency: 'usd', amount_subtotal: 3600, amount_total: 4100,
    total_details: { amount_shipping: 500, amount_tax: 0, amount_discount: 0 }, livemode: false, metadata: { source: SESSION_SOURCE, locale: 'vi' },
    customer_details: { email: 'buyer@example.com', name: 'Pat Buyer', phone: '+15550100', address: { country: 'US' } },
    collected_information: { shipping_details: { name: 'Pat Buyer', address: { line1: '1 Main St', country: 'US' } } }, ...o });
  const event = (type: string, object: unknown, id = 'evt_1') => ({ id, type, data: { object } }) as unknown as Stripe.Event;
  const lines = [{ quantity: 2, amount_subtotal: 3600, description: 'Bracket', price: { unit_amount: 1800, product: { id: 'prod_1', metadata: { product_id: A, variant_id: '', name: 'Bracket', sku: '', variant_title: '' } } } },
    { quantity: 12, amount_subtotal: 5400, description: 'Clip (Large)', price: { unit_amount: 450, product: { id: 'prod_2', metadata: { product_id: B, variant_id: V, name: 'Clip', sku: 'CL-L', variant_title: 'Large', base_cents: '600', tier_min: '31', tier_max: '' } } } }] as unknown as Stripe.LineItem[];
  const deps = () => {
    const calls: unknown[][] = [];
    const d: WebhookDeps = {
      lineItems: async (id) => { calls.push(['lineItems', id]); return lines; },
      recordOrder: async (...a) => { calls.push(['recordOrder', ...a]); return { number: 1001, duplicate: false }; },
      refund: async (...a) => { calls.push(['refund', ...a]); return {}; },
    };
    return { d, calls };
  };
  it('subscribes to exactly the events it handles', () => {
    expect([...WEBHOOK_EVENTS]).toEqual(['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed', 'charge.refunded']);
  });
  it('records a paid session with the items Stripe charged for', async () => {
    const { d, calls } = deps();
    expect(await handleStripeEvent(event('checkout.session.completed', session()), d)).toEqual({ handled: 'recorded', number: 1001 });
    const [, eventId, type, summary, items] = calls[1] as [string, string, string, Record<string, unknown>, unknown[]];
    expect([eventId, type]).toEqual(['evt_1', 'checkout.session.completed']);
    expect(summary).toMatchObject({ id: 'cs_test_1', payment_intent: 'pi_1', email: 'buyer@example.com', currency: 'usd', subtotal_cents: 3600, shipping_cents: 500, total_cents: 4100, livemode: false, locale: 'vi' });
    expect((summary.shipping as { address: { line1: string } }).address.line1).toBe('1 Main St');
    expect(items).toEqual([{ product_id: A, variant_id: null, name: 'Bracket', variant_title: null, sku: null, unit_cents: 1800, quantity: 2, base_cents: null, tier_min: null, tier_max: null },
      { product_id: B, variant_id: V, name: 'Clip', variant_title: 'Large', sku: 'CL-L', unit_cents: 450, quantity: 12, base_cents: 600, tier_min: 31, tier_max: null }]);
  });
  it('reads shipping from the older place too', () => {
    const s = session({ collected_information: undefined, shipping_details: { name: 'Old', address: { line1: '2 Side St' } } });
    expect((sessionSummary(s as unknown as Stripe.Checkout.Session).shipping as { name: string }).name).toBe('Old');
    expect(orderItems([{ quantity: 3, amount_subtotal: 900, description: 'Loose item', price: null }] as unknown as Stripe.LineItem[])[0]).toMatchObject({ name: 'Loose item', unit_cents: 300, product_id: null });
  });
  it('waits for the money, ignores other sessions, and reports duplicates', async () => {
    let x = deps();
    expect(await handleStripeEvent(event('checkout.session.completed', session({ payment_status: 'unpaid' })), x.d)).toEqual({ ignored: 'not paid yet' });
    expect(await handleStripeEvent(event('checkout.session.completed', session({ metadata: {} })), x.d)).toEqual({ ignored: 'not a store session' });
    expect(await handleStripeEvent(event('checkout.session.async_payment_failed', session()), x.d)).toMatchObject({ ignored: expect.stringContaining('no order') });
    expect(await handleStripeEvent(event('payment_intent.created', {}), x.d)).toMatchObject({ ignored: expect.stringContaining('unhandled') });
    expect(x.calls).toEqual([]);
    x = deps();
    x.d.recordOrder = async () => ({ number: 1001, duplicate: true });
    expect(await handleStripeEvent(event('checkout.session.async_payment_succeeded', session()), x.d)).toEqual({ handled: 'duplicate', number: 1001 });
  });
  it('marks refunds, full or partial', async () => {
    const { d, calls } = deps();
    expect(await handleStripeEvent(event('charge.refunded', { id: 'ch_1', payment_intent: 'pi_1', refunded: true }, 'evt_9'), d)).toEqual({ handled: 'refunded' });
    await handleStripeEvent(event('charge.refunded', { id: 'ch_1', payment_intent: { id: 'pi_2' }, refunded: false }, 'evt_10'), d);
    expect(calls).toEqual([['refund', 'evt_9', 'pi_1', true], ['refund', 'evt_10', 'pi_2', false]]);
    expect(await handleStripeEvent(event('charge.refunded', { id: 'ch_2', payment_intent: null }), d)).toMatchObject({ ignored: expect.any(String) });
  });
  it('a database failure is not swallowed (Stripe will retry)', async () => {
    const { d } = deps();
    d.recordOrder = async () => { throw new Error('db down'); };
    await expect(handleStripeEvent(event('checkout.session.completed', session()), d)).rejects.toThrow('db down');
  });
});

describe('JSON-LD', () => {
  it('describes a priced product with an honest availability', () => {
    const s = productSchema(product(), 'en') as Record<string, any>;
    expect([s['@type'], s.name, s.url, s.brand.name, s.category]).toEqual(['Product', 'Bracket', 'https://www.vexaos.io/store/bracket', 'VexaOs', 'Mounts']);
    expect(s.offers).toMatchObject({ '@type': 'Offer', price: '18.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock' });
    expect(s.image[0]).toMatch(/front%20view\.webp$/);
    expect(JSON.stringify(s)).not.toMatch(/rating|review/i);
    expect((productSchema(product({ inventory_mode: 'made_to_order' }), 'en') as any).offers.availability).toBe('https://schema.org/MadeToOrder');
    expect((productSchema(product({ available: false }), 'en') as any).offers.availability).toBe('https://schema.org/OutOfStock');
  });
  it('has no offer without a price, a range for variants, and localized names and URLs', () => {
    expect('offers' in productSchema(product({ from_cents: null, price_cents: null }), 'en')).toBe(false);
    const v = (id: string, cents: number) => ({ id, title: id, option_values: {}, price_cents: cents, available: true, max_quantity: 3 });
    expect((productSchema(product({ variants: [v('a', 1800), v('b', 2400)], price_varies: true }), 'en') as any).offers).toMatchObject({ '@type': 'AggregateOffer', lowPrice: '18.00', highPrice: '24.00', offerCount: 2 });
    const th = productSchema(product(), 'th') as Record<string, any>;
    expect([th.name, th.url, th.inLanguage]).toEqual(['ขายึด', 'https://www.vexaos.io/th/store/bracket', 'th']);
    expect((storeListSchema([product()], 'vi') as any).itemListElement[0]).toEqual({ '@type': 'ListItem', position: 1, url: 'https://www.vexaos.io/vi/store/bracket', name: 'Bracket' });
  });
});

describe('admin form', () => {
  it('makes web addresses and reads money', () => {
    expect(slugify('  Wall Mount for Ruuvi sensors! ')).toBe('wall-mount-for-ruuvi-sensors');
    expect(slugify('Giá đỡ cảm biến')).toBe('gia-do-cam-bien');
    expect(parseMoney('18')).toEqual({ cents: 1800 });
    expect(parseMoney(' 1,234.50 ')).toEqual({ cents: 123450 });
    expect(parseMoney('')).toEqual({ cents: null });
    expect(parseMoney('18.999')).toHaveProperty('error');
    expect(parseMoney('abc')).toHaveProperty('error');
    expect(parseMoney('250000', 'vnd')).toEqual({ cents: 250000 });
    expect(parseMoney('2.5', 'vnd')).toHaveProperty('error');
    expect([moneyInput(1800), moneyInput(null), moneyInput(250000, 'vnd')]).toEqual(['18.00', '', '250000']);
  });
  it('builds variants from options and keeps what was entered', () => {
    const options = parseOptions([{ name: ' Color ', values: 'Black, White, Black' }, { name: 'Size', values: 'S,L' }, { name: '', values: 'x' }]);
    expect(options).toEqual([{ name: 'Color', values: ['Black', 'White'] }, { name: 'Size', values: ['S', 'L'] }]);
    const made = variantsFromOptions(options, [{ key: 'k1', title: 'Black / L', sku: 'B-L', price: '20', inventory: '4', active: true, option_values: {} }]);
    expect(made.map((v) => v.title)).toEqual(['Black / S', 'Black / L', 'White / S', 'White / L']);
    expect(made[1]).toMatchObject({ sku: 'B-L', price: '20', inventory: '4', option_values: { Color: 'Black', Size: 'L' } });
    expect(move(['a', 'b', 'c'], 2, -1)).toEqual(['a', 'c', 'b']);
    expect(move(['a', 'b'], 0, -1)).toEqual(['a', 'b']);
  });
  it('checks the form before it is sent', () => {
    const f = { ...emptyForm(), name: 'Wall Mount for Ruuvi sensors', slug: 'wall-mount-for-ruuvi-sensors' };
    expect(readiness(f)).toEqual(['a price', 'at least one photo', 'a short summary']);
    expect(productPayload({ ...f, name: ' ' })).toEqual({ error: 'Give the product a name.' });
    expect(productPayload({ ...f, slug: 'Bad Slug' })).toHaveProperty('error');
    expect(productPayload({ ...f, status: 'active' })).toEqual({ error: 'Set a price before making the product active.' });
    expect(productPayload({ ...f, price: '10', compareAt: '8' })).toHaveProperty('error');
    expect(productPayload({ ...f, inventory: '1.5' })).toEqual({ error: 'Stock must be a whole number.' });
    expect(productPayload({ ...f, variants: [{ key: 'a', title: 'A', sku: '', price: '', inventory: '0', active: true, option_values: {} }, { key: 'b', title: 'a', sku: '', price: '', inventory: '0', active: true, option_values: {} }] })).toEqual({ error: 'Two variants have the same name.' });
    const ok = productPayload({ ...f, status: 'active', price: '18', inventory: '5', summary: ' Holds a sensor. ', translations: { th: { name: 'ขายึด', summary: ' ' }, vi: {} },
      variants: [{ key: 'bk', title: 'Black', sku: ' BK ', price: '', inventory: '3', active: true, option_values: { Color: 'Black' } }] });
    expect(ok).toEqual({ payload: expect.objectContaining({ status: 'active', price_cents: 1800, inventory: 5, summary: 'Holds a sensor.', category_id: null, lead_time_days: null,
      translations: { th: { name: 'ขายึด' } }, variants: [{ id: undefined, title: 'Black', sku: 'BK', price_cents: null, inventory: 3, active: true, option_values: { Color: 'Black' } }] }) });
  });
  it('round-trips a product and previews it as a shopper would see it', () => {
    const p = product({ inventory: 5, variants: [{ id: V, title: 'Black', option_values: { Color: 'Black' }, price_cents: 2000, own_price_cents: 2000, inventory: 0, active: true, sku: 'BK', available: false, max_quantity: 0 }] });
    const f = formFromProduct(p);
    expect([f.price, f.variants[0].price, f.inventory, f.slugTouched]).toEqual(['18.00', '20.00', '5', true]);
    const pv = previewProduct(f, [{ id: 'c', slug: 'mounts', name: 'Mounts' }]);
    expect([pv.from_cents, pv.available, pv.variants[0].available, pv.category?.name]).toEqual([2000, false, false, 'Mounts']);
    const draft = previewProduct({ ...emptyForm(), name: 'Wall Mount for Ruuvi sensors' }, []);
    expect([draft.from_cents, draft.available, draft.slug]).toEqual([null, false, 'wall-mount-for-ruuvi-sensors']);
    expect(previewProduct({ ...emptyForm(), name: 'X', price: '9', inventory_mode: 'made_to_order', leadTime: '7' }, [])).toMatchObject({ available: true, lead_time_days: 7, max_quantity: 10 });
  });
});

describe('store hero: chips only say what the settings make true', () => {
  const t = STORE_STRINGS.en;
  const base = { checkoutOpen: false, shipFrom: null, shipTo: ['US'], locale: 'en' as const, t };
  it('with nothing on sale: what it is for, how to order, where it ships to', () => {
    expect(heroChips({ ...base, products: [] })).toEqual(['Built for sensors on VexaOs', 'Order by message', 'Ships to the United States']);
    expect(heroChips({ ...base, products: [], checkoutOpen: true })[1]).toBe('Secure checkout by Stripe');
  });
  it('says "Made to order" or "In stock" only when that holds for everything on sale', () => {
    const made = product({ inventory_mode: 'made_to_order' }), stocked = product({ id: B }), soldOut = product({ id: V, available: false });
    expect(heroChips({ ...base, products: [made] })[1]).toBe('Made to order');
    expect(heroChips({ ...base, products: [stocked] })[1]).toBe('In stock');
    expect(heroChips({ ...base, products: [made, stocked] })[1]).toBe('Order by message');
    expect(heroChips({ ...base, products: [stocked, soldOut], checkoutOpen: true })[1]).toBe('Secure checkout by Stripe');
    expect(heroChips({ ...base, products: [product({ from_cents: null, price_cents: null })] })[1]).toBe('Order by message');
  });
  it('claims an origin only when STORE_SHIPS_FROM is set; otherwise names the destinations', () => {
    expect([shipsFrom({}), shipsFrom({ STORE_SHIPS_FROM: ' us ' }), shipsFrom({ STORE_SHIPS_FROM: 'Michigan' })]).toEqual([null, 'US', null]);
    expect(heroChips({ ...base, products: [], shipFrom: 'US' })[2]).toBe('Ships from the United States');
    expect(heroChips({ ...base, products: [], shipTo: ['US', 'CA', 'PH'] })[2]).toBe('Ships to 3 countries');
    expect(heroChips({ ...base, products: [], shipTo: ['CA'] })[2]).toBe('Ships to Canada');
    expect(heroChips({ ...base, products: [], locale: 'th', t: STORE_STRINGS.th })[2]).toBe('จัดส่งไปยังสหรัฐอเมริกา');
    expect([countryName('US', 'vi'), countryName('PH', 'en'), countryName('PH', 'fil')]).toEqual(['Hoa Kỳ', 'the Philippines', 'Pilipinas']);
  });
});

describe('photo viewer: zoom, pan and swipe', () => {
  const image = { width: 800, height: 600 }, stage = { width: 1000, height: 700 };
  it('zooms around the point under the cursor and stays between 1x and 4x', () => {
    const v = zoomAt(FIT, 2, 100, 50, image, stage);
    expect(v).toEqual({ scale: 2, x: -100, y: -50 });          // the point (100, 50) has not moved: (100 - x) / 2 = 100
    expect(zoomAt(v, 99, 0, 0, image, stage).scale).toBe(4);
    expect(zoomAt(v, 0.2, 0, 0, image, stage)).toEqual(FIT);
    expect(zoomAt(FIT, 2.5, 0, 0, image, stage)).toEqual({ scale: 2.5, x: 0, y: 0 });
  });
  it('lets the picture be dragged only as far as its own edges', () => {
    expect(clampView({ scale: 2, x: 9999, y: -9999 }, image, stage)).toEqual({ scale: 2, x: 300, y: -250 });
    expect(clampView({ scale: 1.2, x: 50, y: 50 }, image, stage)).toEqual({ scale: 1.2, x: 0, y: 10 });   // still narrower than the stage: no sideways pan
    expect(clampView({ scale: 1, x: 40, y: 40 }, image, stage)).toEqual(FIT);
  });
  it('a sideways flick turns the page; a short or mostly vertical one does not', () => {
    expect([swipeDirection(-80, 5), swipeDirection(90, -10), swipeDirection(-30, 0), swipeDirection(-80, 90), swipeDirection(0, 0)]).toEqual([1, -1, 0, 0, 0]);
    expect([wrap(5, 5), wrap(-1, 5), wrap(2, 5), wrap(0, 1)]).toEqual([0, 4, 2, 0]);
  });
});

describe('bulk prices on the storefront (display only; the database charges)', () => {
  const tier = (min_qty: number, max_qty: number | null, unit_cents: number, variant_id: string | null = null) => ({ variant_id, min_qty, max_qty, unit_cents });
  const variant = (id: string, price_cents: number, own_price: boolean) => ({ id, title: id, option_values: {}, price_cents, own_price, available: true, max_quantity: 100 });
  const p = product({ price_tiers: [tier(31, null, 1200), tier(2, 10, 1600), tier(11, 30, 1400), tier(2, null, 8000, 'gold')],
    variants: [variant('black', 1800, false), variant('steel', 3000, true), variant('gold', 9000, true)] });
  it('finds the price at every boundary', () => {
    expect([1, 2, 10, 11, 30, 31, 500].map((n) => unitPrice(p, null, n).unit_cents)).toEqual([1800, 1600, 1600, 1400, 1400, 1200, 1200]);
    expect(unitPrice(p, null, 11)).toMatchObject({ base_cents: 1800, tier: { min_qty: 11, max_qty: 30 } });
    expect(unitPrice(p, null, 1).tier).toBeNull();
  });
  it('a variant uses the product\'s ranges, keeps its own price, or uses its own ranges', () => {
    const [black, steel, gold] = p.variants;
    expect([unitPrice(p, black, 11).unit_cents, unitPrice(p, steel, 50).unit_cents, unitPrice(p, gold, 1).unit_cents, unitPrice(p, gold, 2).unit_cents]).toEqual([1400, 3000, 9000, 8000]);
    expect([tiersFor(p, black).length, tiersFor(p, steel).length, tiersFor(p, gold).length]).toEqual([3, 0, 1]);
  });
  it('lists every range with its saving, and marks the one a quantity falls in', () => {
    const rows = tierRows(p);
    expect(rows.map((r) => [rangeLabel(r.min, r.max), r.unit_cents, r.savePct, r.base])).toEqual([['1', 1800, 0, true], ['2–10', 1600, 11, false], ['11–30', 1400, 22, false], ['31+', 1200, 33, false]]);
    expect([1, 10, 11, 31].map((n) => activeRow(rows, n))).toEqual([0, 1, 2, 3]);
    expect(tierRows(product())).toEqual([]);
    expect(tierRows(product({ price_cents: null, price_tiers: [tier(2, null, 100)] }))).toEqual([]);
    expect(rangeLabel(1, 4)).toBe('1–4');
    expect([lineSavings(1800, 1400, 12), lineSavings(1800, 1800, 5), lineSavings(null, 1400, 3), lineSavings(1000, 1200, 3)]).toEqual([4800, 0, 0, 0]);
  });
});

describe('bulk pricing in the admin form', () => {
  const row = (min: string, max: string, price: string, scope = '') => ({ scope, min, max, price });
  const good = [{ min_qty: 2, max_qty: 10, unit_cents: 1600 }, { min_qty: 11, max_qty: 30, unit_cents: 1400 }, { min_qty: 31, max_qty: null, unit_cents: 1200 }];
  it('reads the rows as typed', () => {
    expect(parseTiers([row('11', '30', '14'), row('2', '10', '16.00'), row('31', '', '12')])).toEqual({ tiers: good });
    expect(parseTiers([row('', '10', '16')])).toHaveProperty('error');
    expect(parseTiers([row('2', 'ten', '16')])).toHaveProperty('error');
    expect(parseTiers([row('2', '10', '')])).toEqual({ error: 'Every range needs a price.' });
    expect(parseTiers([row('2', '10', '1.999')])).toHaveProperty('error');
  });
  it('finds gaps, overlaps, misplaced open ends and ranges the largest order cannot reach', () => {
    expect(tierProblems(good, 1800, 500)).toEqual({ errors: [], warnings: [] });
    expect(tierProblems([], null, 10)).toEqual({ errors: [], warnings: [] });
    const first = (tiers: typeof good, base: number | null = 1800, max = 500) => tierProblems(tiers, base, max).errors[0];
    expect(first([good[0], { min_qty: 12, max_qty: 30, unit_cents: 1400 }])).toMatch(/gap between 10 and 12.*start at 11/);
    expect(first([good[0], { min_qty: 10, max_qty: 30, unit_cents: 1400 }])).toMatch(/2–10 and 10–30 overlap/);
    expect(first([{ min_qty: 2, max_qty: null, unit_cents: 1600 }, good[1]])).toMatch(/Only the last range/);
    expect(first([{ min_qty: 1, max_qty: 10, unit_cents: 1600 }])).toMatch(/starts at 2 or more/);
    expect(first([{ min_qty: 5, max_qty: 3, unit_cents: 1600 }], 1800, 3)).toMatch(/ends before it starts/);
    expect(first([good[0], good[1]], 1800, 50)).toMatch(/largest order \(50\) is beyond your last range/);
    expect(first(good, 1800, 20)).toMatch(/31\+ starts above the largest order \(20\)/);
    expect(first(good, null)).toMatch(/Set the price for one item first/);
  });
  it('warns, without refusing, when a bigger quantity costs more or nothing is saved', () => {
    const r = tierProblems([{ min_qty: 2, max_qty: 10, unit_cents: 1800 }, { min_qty: 11, max_qty: null, unit_cents: 1900 }], 1800, 100);
    expect(r.errors).toEqual([]);
    expect(r.warnings).toEqual(['2–10 is not cheaper than the normal price.', '11+ costs more per unit than 2–10.', '11+ is not cheaper than the normal price.']);
  });
  it('adds rows that continue the list, fills prices by a percentage, and suggests a largest order', () => {
    let rows = addTierRow([], '');
    expect(rows).toEqual([row('2', '10', '')]);
    rows = addTierRow(rows, '');
    expect(rows.map((r) => [r.min, r.max])).toEqual([['2', '10'], ['11', '']]);
    rows = addTierRow(rows, '');                       // the open-ended row is closed, the new one carries on
    expect(rows.map((r) => [r.min, r.max])).toEqual([['2', '10'], ['11', '20'], ['21', '']]);
    expect(addTierRow(rows, 'v1').filter((r) => r.scope === 'v1')).toEqual([row('2', '10', '', 'v1')]);
    expect(applyStepDiscount(rows, '', 2000, 10).map((r) => r.price)).toEqual(['18.00', '16.20', '14.58']);
    expect(applyStepDiscount(rows, '', null, 10)).toBe(rows);
    expect(applyStepDiscount(rows, '', 2000, 0)).toBe(rows);
    expect([suggestMaxQuantity(10, good), suggestMaxQuantity(250, good), suggestMaxQuantity(10, good.slice(0, 2)), suggestMaxQuantity(10, [])]).toEqual([100, 250, 30, 10]);
    expect(tierSummary(good, 1800, (c) => `$${(c / 100).toFixed(2)}`)).toBe('1: $18.00 · 2–10: $16.00 each (11% off) · 11–30: $14.00 each (22% off) · 31+: $12.00 each (33% off)');
  });
  it('sends the ranges with the product, named by variant, and refuses a form the database would refuse', () => {
    const f = { ...emptyForm(), name: 'Bracket', slug: 'bracket', price: '18', maxQuantity: '100', bulkContact: true,
      variants: [{ key: 'k-gold', title: 'Gold', sku: '', price: '90', inventory: '0', active: true, option_values: {} }],
      tiers: [row('2', '10', '16'), row('11', '', '14'), row('2', '', '80', 'k-gold'), row('2', '', '1', 'k-removed')] };
    const ok = productPayload(f);
    expect(ok).toEqual({ payload: expect.objectContaining({ max_quantity: 100, bulk_contact: true, price_tiers: [
      { min_qty: 2, max_qty: 10, unit_cents: 1600, variant_id: undefined, variant_title: undefined }, { min_qty: 11, max_qty: null, unit_cents: 1400, variant_id: undefined, variant_title: undefined },
      { min_qty: 2, max_qty: null, unit_cents: 8000, variant_id: undefined, variant_title: 'Gold' }] }) });
    expect(productPayload({ ...f, tiers: [row('2', '10', '16'), row('12', '', '14')] })).toEqual({ error: expect.stringMatching(/^Bulk pricing: There is a gap/) });
    expect(productPayload({ ...f, tiers: [row('2', '', '80', 'k-gold'), row('2', '5', '70', 'k-gold')] })).toEqual({ error: expect.stringMatching(/^Bulk pricing: Gold: /) });
    expect(productPayload({ ...f, maxQuantity: '0' })).toEqual({ error: expect.stringMatching(/largest order/) });
    expect(productPayload({ ...f, maxQuantity: '10' })).toEqual({ error: expect.stringMatching(/starts above the largest order \(10\)/) });
    // the preview shows shoppers the same list
    const pv = previewProduct(f, []);
    expect([pv.order_limit, pv.bulk_contact, pv.variants[0].own_price, tierRows(pv).length, unitPrice(pv, pv.variants[0], 2).unit_cents]).toEqual([100, true, true, 3, 8000]);
    const back = formFromProduct(product({ price_tiers: [{ variant_id: null, min_qty: 2, max_qty: null, unit_cents: 1650 }], order_limit: 40, bulk_contact: true }));
    expect([back.tiers, back.maxQuantity, back.bulkContact]).toEqual([[row('2', '', '16.50')], '40', true]);
  });
});
