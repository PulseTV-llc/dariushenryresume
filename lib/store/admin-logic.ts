import { minorUnit } from './format';
import { rangeLabel } from './pricing';
import type { InventoryMode, PriceTier, ProductStatus, ProductText, StoreOption, StoreProduct } from './types';

/** Admin form rules. Pure, so they are tested without a browser. */
/** `key` identifies a variant inside the form (its id once saved), so bulk prices stay attached while it is renamed. */
export interface VariantForm { key: string; id?: string; title: string; sku: string; price: string; inventory: string; active: boolean; option_values: Record<string, string> }
export interface ProductForm {
  id?: string; name: string; slug: string; slugTouched: boolean; summary: string; description: string; status: ProductStatus; category_id: string;
  price: string; compareAt: string; currency: string; inventory_mode: InventoryMode; inventory: string; leadTime: string;
  options: { name: string; values: string }[]; variants: VariantForm[]; seo_title: string; seo_description: string;
  translations: Record<string, ProductText>; images: { id: string; path: string; alt: string }[];
  /** bulk prices; scope '' = the product's own price, else a variant's key */
  tiers: TierForm[]; maxQuantity: string; bulkContact: boolean;
}
export interface TierForm { scope: string; min: string; max: string; price: string }

export const slugify = (s: string) => s.replace(/[đĐ]/g, 'd').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

/** "18", "18.5", "1,234.50" -> minor units; '' -> null; anything else -> an error. */
export function parseMoney(text: string, currency = 'usd'): { cents: number | null } | { error: string } {
  const t = text.trim().replace(/[\s,]/g, '');
  if (t === '') return { cents: null };
  if (!/^\d+(\.\d{1,2})?$/.test(t)) return { error: 'Enter an amount like 18 or 18.50.' };
  const unit = minorUnit(currency);
  if (unit === 1 && t.includes('.')) return { error: 'This currency has no decimals.' };
  const cents = Math.round(Number(t) * unit);
  return cents > 100_000_000 ? { error: 'That amount is too large.' } : { cents };
}
export const moneyInput = (cents: number | null | undefined, currency = 'usd') => (cents == null ? '' : (cents / minorUnit(currency)).toFixed(minorUnit(currency) === 1 ? 0 : 2));

const parseCount = (text: string, max: number): number | null | 'bad' => {
  const t = text.trim();
  if (t === '') return null;
  return /^\d+$/.test(t) && Number(t) <= max ? Number(t) : 'bad';
};

export const parseOptions = (options: ProductForm['options']): StoreOption[] =>
  options.map((o) => ({ name: o.name.trim(), values: Array.from(new Set(o.values.split(',').map((v) => v.trim()).filter(Boolean))) })).filter((o) => o.name && o.values.length);

/** Every combination of the option values, keeping what was already entered for a variant with the same name. */
let counter = 0;
export const newKey = () => `new-${Date.now().toString(36)}-${counter++}`;

export function variantsFromOptions(options: StoreOption[], existing: VariantForm[]): VariantForm[] {
  if (options.length === 0) return existing;
  let combos: Record<string, string>[] = [{}];
  for (const o of options) combos = combos.flatMap((c) => o.values.map((v) => ({ ...c, [o.name]: v })));
  return combos.slice(0, 100).map((values) => {
    const title = options.map((o) => values[o.name]).join(' / ');
    const had = existing.find((e) => e.title === title);
    return had ? { ...had, option_values: values } : { key: newKey(), title, sku: '', price: '', inventory: '0', active: true, option_values: values };
  });
}

export function move<T>(list: T[], index: number, delta: number): T[] {
  const to = index + delta;
  if (to < 0 || to >= list.length) return list;
  const out = [...list];
  [out[index], out[to]] = [out[to], out[index]];
  return out;
}

export function formFromProduct(p: StoreProduct): ProductForm {
  return {
    id: p.id, name: p.name, slug: p.slug, slugTouched: true, summary: p.summary, description: p.description, status: p.status, category_id: p.category?.id ?? '',
    price: moneyInput(p.price_cents, p.currency), compareAt: moneyInput(p.compare_at_cents, p.currency), currency: p.currency, inventory_mode: p.inventory_mode,
    inventory: String(p.inventory ?? 0), leadTime: p.lead_time_days == null ? '' : String(p.lead_time_days),
    options: p.options.map((o) => ({ name: o.name, values: o.values.join(', ') })),
    variants: p.variants.map((v) => ({ key: v.id, id: v.id, title: v.title, sku: v.sku ?? '', price: moneyInput(v.own_price_cents, p.currency), inventory: String(v.inventory ?? 0), active: v.active ?? true, option_values: v.option_values })),
    seo_title: p.seo_title ?? '', seo_description: p.seo_description ?? '', translations: p.translations ?? {}, images: p.images.map((i) => ({ id: i.id, path: i.path, alt: i.alt })),
    tiers: (p.price_tiers ?? []).map((x) => ({ scope: x.variant_id ?? '', min: String(x.min_qty), max: x.max_qty == null ? '' : String(x.max_qty), price: moneyInput(x.unit_cents, p.currency) })),
    maxQuantity: String(p.order_limit ?? 10), bulkContact: p.bulk_contact ?? false,
  };
}
export const emptyForm = (): ProductForm => ({
  name: '', slug: '', slugTouched: false, summary: '', description: '', status: 'draft', category_id: '', price: '', compareAt: '', currency: 'usd',
  inventory_mode: 'tracked', inventory: '0', leadTime: '', options: [], variants: [], seo_title: '', seo_description: '', translations: {}, images: [],
  tiers: [], maxQuantity: '10', bulkContact: false,
});

/** The form as public.store_admin_product_save expects it, or the first problem in plain words. */
export function productPayload(f: ProductForm): { payload: Record<string, unknown> } | { error: string } {
  const name = f.name.trim(), slug = (f.slug || slugify(f.name)).trim();
  if (!name) return { error: 'Give the product a name.' };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return { error: 'The web address may only use lowercase letters, numbers and dashes.' };
  const price = parseMoney(f.price, f.currency), compare = parseMoney(f.compareAt, f.currency);
  if ('error' in price) return { error: `Price: ${price.error}` };
  if ('error' in compare) return { error: `Compare-at price: ${compare.error}` };
  if (compare.cents != null && price.cents != null && compare.cents <= price.cents) return { error: 'The compare-at price should be higher than the price (or leave it empty).' };
  const inventory = parseCount(f.inventory, 1_000_000), lead = parseCount(f.leadTime, 365);
  if (inventory === 'bad') return { error: 'Stock must be a whole number.' };
  if (lead === 'bad') return { error: 'Lead time must be a number of days (up to 365).' };
  const variants: Record<string, unknown>[] = [];
  for (const v of f.variants) {
    if (!v.title.trim()) return { error: 'Every variant needs a name.' };
    const vp = parseMoney(v.price, f.currency), vi = parseCount(v.inventory, 1_000_000);
    if ('error' in vp) return { error: `${v.title}: ${vp.error}` };
    if (vi === 'bad') return { error: `${v.title}: stock must be a whole number.` };
    variants.push({ id: v.id, title: v.title.trim(), sku: v.sku.trim(), price_cents: vp.cents, inventory: vi ?? 0, active: v.active, option_values: v.option_values });
  }
  if (new Set(variants.map((v) => String(v.title).toLowerCase())).size !== variants.length) return { error: 'Two variants have the same name.' };
  const maxQuantity = parseCount(f.maxQuantity, 10000);
  if (maxQuantity === 'bad' || maxQuantity === null || maxQuantity < 1) return { error: 'The largest order must be a whole number from 1 to 10,000.' };
  const price_tiers: Record<string, unknown>[] = [];
  for (const scope of tierScopes(f)) {
    const owner = scope === '' ? null : f.variants.find((v) => v.key === scope);
    if (scope !== '' && !owner) continue;   // the variant was removed: its ranges go with it
    const parsed = parseTiers(f.tiers.filter((x) => x.scope === scope), f.currency);
    const label = owner ? `${owner.title || 'Variant'}: ` : '';
    if ('error' in parsed) return { error: `Bulk pricing: ${label}${parsed.error}` };
    const base = owner ? (parseMoney(owner.price, f.currency) as { cents: number | null }).cents ?? price.cents : price.cents;
    const check = tierProblems(parsed.tiers, base, maxQuantity);
    if (check.errors.length) return { error: `Bulk pricing: ${label}${check.errors[0]}` };
    for (const x of parsed.tiers) price_tiers.push({ ...x, variant_id: undefined, variant_title: owner ? owner.title.trim() : undefined });
  }
  if (f.status === 'active') {
    const sellable = variants.filter((v) => v.active);
    if (sellable.length ? sellable.some((v) => v.price_cents == null && price.cents == null) : price.cents == null) {
      return { error: 'Set a price before making the product active.' };
    }
  }
  const translations = Object.fromEntries(Object.entries(f.translations)
    .map(([l, t]) => [l, Object.fromEntries(Object.entries(t).filter(([, v]) => typeof v === 'string' && v.trim()))])
    .filter(([, t]) => Object.keys(t as object).length));
  return { payload: {
    id: f.id, name, slug, summary: f.summary.trim(), description: f.description.trim(), status: f.status, category_id: f.category_id || null,
    price_cents: price.cents, compare_at_cents: compare.cents, currency: f.currency, inventory_mode: f.inventory_mode, inventory: inventory ?? 0, lead_time_days: lead,
    options: parseOptions(f.options), variants, seo_title: f.seo_title.trim(), seo_description: f.seo_description.trim(), translations,
    images: f.images.map((i) => ({ id: i.id, alt: i.alt })), price_tiers, max_quantity: maxQuantity, bulk_contact: f.bulkContact,
  } };
}

/** What is still missing before a product can go on sale: shown next to the status control. */
export function readiness(f: ProductForm): string[] {
  const missing: string[] = [];
  const priced = f.variants.filter((v) => v.active).length ? f.variants.filter((v) => v.active).every((v) => v.price.trim() || f.price.trim()) : !!f.price.trim();
  if (!priced) missing.push('a price');
  if (f.images.length === 0) missing.push('at least one photo');
  if (!f.summary.trim()) missing.push('a short summary');
  return missing;
}

/** The product as a shopper would see it with the form as it is now (the live preview). */
export function previewProduct(f: ProductForm, categories: { id: string; slug: string; name: string }[]): StoreProduct {
  const cents = (text: string) => { const r = parseMoney(text, f.currency); return 'cents' in r ? r.cents : null; };
  const base = cents(f.price);
  const made = f.inventory_mode === 'made_to_order';
  const stock = (text: string) => Math.max(0, Math.floor(Number(text)) || 0);
  const limit = Math.max(1, Math.min(10000, stock(f.maxQuantity) || 10));
  const variants = f.variants.filter((v) => v.active).map((v, i) => {
    const price = cents(v.price) ?? base;
    return { id: v.key, title: v.title, option_values: v.option_values, price_cents: price, own_price: cents(v.price) != null, available: price != null && (made || stock(v.inventory) > 0), max_quantity: made ? limit : Math.min(stock(v.inventory), limit) };
  });
  const prices = (variants.length ? variants.map((v) => v.price_cents) : [base]).filter((c): c is number => c != null);
  return {
    id: f.id ?? 'preview', slug: f.slug || slugify(f.name) || 'preview', name: f.name || 'Product name', summary: f.summary, description: f.description, status: f.status,
    category: categories.find((c) => c.id === f.category_id) ?? null, currency: f.currency, price_cents: base, compare_at_cents: cents(f.compareAt),
    from_cents: prices.length ? Math.min(...prices) : null, price_varies: new Set(prices).size > 1, inventory_mode: f.inventory_mode,
    lead_time_days: /^\d+$/.test(f.leadTime.trim()) ? Number(f.leadTime) : null,
    available: variants.length ? variants.some((v) => v.available) : base != null && (made || stock(f.inventory) > 0),
    max_quantity: made ? limit : Math.min(stock(f.inventory), limit), order_limit: limit, bulk_contact: f.bulkContact,
    price_tiers: tierScopes(f).flatMap((scope) => { const r = parseTiers(f.tiers.filter((x) => x.scope === scope), f.currency); return 'tiers' in r ? r.tiers.map((x) => ({ ...x, variant_id: scope || null })) : []; }),
    options: parseOptions(f.options), seo_title: f.seo_title || null, seo_description: f.seo_description || null,
    translations: f.translations, updated_at: '', published_at: null, images: f.images.map((i) => ({ ...i, width: null, height: null })), variants,
  };
}

// ------------------------------------------------------------------------------------------ bulk pricing

type Tier = Pick<PriceTier, 'min_qty' | 'max_qty' | 'unit_cents'>;
/** The price lists in the form: the product's own ('') and each variant that has rows. */
export const tierScopes = (f: Pick<ProductForm, 'tiers'>) => Array.from(new Set(f.tiers.map((x) => x.scope)));

/** Rows as typed -> ranges in order, or what is wrong with a row. An empty "to" means "and up". */
export function parseTiers(rows: TierForm[], currency = 'usd'): { tiers: Tier[] } | { error: string } {
  const out: Tier[] = [];
  for (const r of rows) {
    if (!/^\d+$/.test(r.min.trim())) return { error: 'Each range needs a starting quantity.' };
    if (r.max.trim() !== '' && !/^\d+$/.test(r.max.trim())) return { error: 'The end of a range must be a whole number, or empty for "and up".' };
    const price = parseMoney(r.price, currency);
    if ('error' in price) return { error: price.error };
    if (price.cents == null) return { error: 'Every range needs a price.' };
    out.push({ min_qty: Number(r.min), max_qty: r.max.trim() === '' ? null : Number(r.max), unit_cents: price.cents });
  }
  return { tiers: out.sort((a, b) => a.min_qty - b.min_qty) };
}

/**
 * The same rules the database enforces (errors), plus things worth a second look (warnings):
 * a range that costs more than the one before it, or no less than the base price.
 */
export function tierProblems(tiers: Tier[], baseCents: number | null, maxQuantity: number): { errors: string[]; warnings: string[] } {
  const errors: string[] = [], warnings: string[] = [];
  if (tiers.length === 0) return { errors, warnings };
  if (baseCents == null) errors.push('Set the price for one item first: bulk prices are compared with it.');
  tiers.forEach((x, i) => {
    const label = rangeLabel(x.min_qty, x.max_qty);
    if (x.min_qty < 2) errors.push('The first range starts at 2 or more (quantity 1 is the normal price).');
    if (x.max_qty != null && x.max_qty < x.min_qty) errors.push(`The range ${x.min_qty}–${x.max_qty} ends before it starts.`);
    const prev = tiers[i - 1];
    if (prev) {
      if (prev.max_qty == null) errors.push('Only the last range can be open-ended ("and up").');
      else if (x.min_qty <= prev.max_qty) errors.push(`The ranges ${rangeLabel(prev.min_qty, prev.max_qty)} and ${label} overlap.`);
      else if (x.min_qty !== prev.max_qty + 1) errors.push(`There is a gap between ${prev.max_qty} and ${x.min_qty}: the next range must start at ${prev.max_qty + 1}.`);
      if (x.unit_cents > prev.unit_cents) warnings.push(`${label} costs more per unit than ${rangeLabel(prev.min_qty, prev.max_qty)}.`);
    }
    if (baseCents != null && x.unit_cents >= baseCents) warnings.push(`${label} is not cheaper than the normal price.`);
    if (x.min_qty > maxQuantity) errors.push(`The range ${label} starts above the largest order (${maxQuantity}). Raise the largest order or remove the range.`);
  });
  const last = tiers[tiers.length - 1];
  if (last.max_qty != null && last.max_qty < maxQuantity) {
    errors.push(`The largest order (${maxQuantity}) is beyond your last range. Extend the last range, leave its end empty, or lower the largest order.`);
  }
  return { errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}

/** A new row that continues where the last one ends (an open-ended last row is closed first). */
export function addTierRow(rows: TierForm[], scope: string): TierForm[] {
  const mine = rows.filter((r) => r.scope === scope).sort((a, b) => Number(a.min) - Number(b.min));
  const last = mine[mine.length - 1];
  if (!last) return [...rows, { scope, min: '2', max: '10', price: '' }];
  const lastMin = Number(last.min) || 2;
  const lastMax = last.max.trim() === '' ? lastMin + 9 : Number(last.max) || lastMin;
  return [...rows.map((r) => (r === last ? { ...r, max: String(lastMax) } : r)), { scope, min: String(lastMax + 1), max: '', price: '' }];
}

/** "Each range N% cheaper than the one before", starting from the normal price. */
export function applyStepDiscount(rows: TierForm[], scope: string, baseCents: number | null, percent: number, currency = 'usd'): TierForm[] {
  if (baseCents == null || !(percent > 0 && percent < 100)) return rows;
  const order = rows.filter((r) => r.scope === scope).sort((a, b) => Number(a.min) - Number(b.min));
  return rows.map((r) => {
    const step = order.indexOf(r);
    return step < 0 ? r : { ...r, price: moneyInput(Math.round(baseCents * (1 - percent / 100) ** (step + 1)), currency) };
  });
}

/** The largest order that fits the ranges: at least the end of a closed last range; 100 for an open-ended one that was still at the default. */
export function suggestMaxQuantity(current: number, tiers: Tier[]): number {
  if (tiers.length === 0) return current;
  const last = tiers[tiers.length - 1];
  if (last.max_qty != null) return last.max_qty;
  return Math.max(current, last.min_qty, current <= 10 ? 100 : current);
}

/** "1: $18.00 · 2–10: $16.00 each (11% off) · 31+: $12.00 each (33% off)" */
export function tierSummary(tiers: Tier[], baseCents: number | null, fmt: (cents: number) => string): string {
  if (baseCents == null || tiers.length === 0) return '';
  const first = `${rangeLabel(1, tiers[0].min_qty - 1)}: ${fmt(baseCents)}`;
  return [first, ...tiers.map((x) => {
    const pct = baseCents > 0 ? Math.round(((baseCents - x.unit_cents) / baseCents) * 100) : 0;
    return `${rangeLabel(x.min_qty, x.max_qty)}: ${fmt(x.unit_cents)} each${pct > 0 ? ` (${pct}% off)` : ''}`;
  })].join(' · ');
}
