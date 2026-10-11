import { describe, expect, it } from 'vitest';
import Stripe from 'stripe';
import { LOCALES } from '@/lib/i18n/config';
import { addItem, cartCount, parseCart, quoteItems, removeItem, setQuantity } from './cart';
import { checkoutBlock, checkoutEnabled, shipCountries, shipsFrom } from './config';
import { countryName, heroChips, spotlightProduct } from './hero';
import { SESSION_SOURCE, sessionParams } from './checkout';
import { minorUnit, money, priceLabel, productText } from './format';
import { productSchema, storeListSchema } from './jsonld';
import { STORE_STRINGS } from './strings';
import { WEBHOOK_EVENTS, handleStripeEvent, orderItems, sessionSummary, type WebhookDeps } from './webhook';
import {
  emptyForm, formFromProduct, move, moneyInput, parseMoney, parseOptions, previewProduct, productPayload, readiness, slugify, variantsFromOptions,
} from './admin-logic';
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
    expect(addItem(c, A, null, 50)[0].quantity).toBe(10);
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
      .toEqual([{ productId: A, variantId: null, quantity: 2 }, { productId: B, variantId: null, quantity: 10 }]);
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
    { product_id: B, variant_id: V, slug: 'clip', name: 'Clip', variant_title: 'Large', sku: 'CL-L', unit_cents: 450, quantity: 1, image: null, made_to_order: false }] };
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
    expect(b.price_data?.product_data?.metadata).toEqual({ product_id: B, variant_id: V, sku: 'CL-L', name: 'Clip', variant_title: 'Large' });
  });
});

describe('webhook', () => {
  const session = (o: Record<string, unknown> = {}) => ({ id: 'cs_test_1', object: 'checkout.session', payment_intent: 'pi_1', payment_status: 'paid', currency: 'usd', amount_subtotal: 3600, amount_total: 4100,
    total_details: { amount_shipping: 500, amount_tax: 0, amount_discount: 0 }, livemode: false, metadata: { source: SESSION_SOURCE, locale: 'vi' },
    customer_details: { email: 'buyer@example.com', name: 'Pat Buyer', phone: '+15550100', address: { country: 'US' } },
    collected_information: { shipping_details: { name: 'Pat Buyer', address: { line1: '1 Main St', country: 'US' } } }, ...o });
  const event = (type: string, object: unknown, id = 'evt_1') => ({ id, type, data: { object } }) as unknown as Stripe.Event;
  const lines = [{ quantity: 2, amount_subtotal: 3600, description: 'Bracket', price: { unit_amount: 1800, product: { id: 'prod_1', metadata: { product_id: A, variant_id: '', name: 'Bracket', sku: '', variant_title: '' } } } },
    { quantity: 1, amount_subtotal: 450, description: 'Clip (Large)', price: { unit_amount: 450, product: { id: 'prod_2', metadata: { product_id: B, variant_id: V, name: 'Clip', sku: 'CL-L', variant_title: 'Large' } } } }] as unknown as Stripe.LineItem[];
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
    expect(items).toEqual([{ product_id: A, variant_id: null, name: 'Bracket', variant_title: null, sku: null, unit_cents: 1800, quantity: 2 },
      { product_id: B, variant_id: V, name: 'Clip', variant_title: 'Large', sku: 'CL-L', unit_cents: 450, quantity: 1 }]);
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
    const made = variantsFromOptions(options, [{ title: 'Black / L', sku: 'B-L', price: '20', inventory: '4', active: true, option_values: {} }]);
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
    expect(productPayload({ ...f, variants: [{ title: 'A', sku: '', price: '', inventory: '0', active: true, option_values: {} }, { title: 'a', sku: '', price: '', inventory: '0', active: true, option_values: {} }] })).toEqual({ error: 'Two variants have the same name.' });
    const ok = productPayload({ ...f, status: 'active', price: '18', inventory: '5', summary: ' Holds a sensor. ', translations: { th: { name: 'ขายึด', summary: ' ' }, vi: {} },
      variants: [{ title: 'Black', sku: ' BK ', price: '', inventory: '3', active: true, option_values: { Color: 'Black' } }] });
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
  it('features a product on sale that has a photo, else the first one, else none', () => {
    const bare = product({ id: B, images: [] });
    expect([spotlightProduct([bare, product()])?.id, spotlightProduct([bare])?.id, spotlightProduct([])]).toEqual([A, B, null]);
  });
});
