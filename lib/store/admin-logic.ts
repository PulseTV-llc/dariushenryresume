import { minorUnit } from './format';
import type { InventoryMode, ProductStatus, ProductText, StoreOption, StoreProduct } from './types';

/** Admin form rules. Pure, so they are tested without a browser. */
export interface VariantForm { id?: string; title: string; sku: string; price: string; inventory: string; active: boolean; option_values: Record<string, string> }
export interface ProductForm {
  id?: string; name: string; slug: string; slugTouched: boolean; summary: string; description: string; status: ProductStatus; category_id: string;
  price: string; compareAt: string; currency: string; inventory_mode: InventoryMode; inventory: string; leadTime: string;
  options: { name: string; values: string }[]; variants: VariantForm[]; seo_title: string; seo_description: string;
  translations: Record<string, ProductText>; images: { id: string; path: string; alt: string }[];
}

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
export function variantsFromOptions(options: StoreOption[], existing: VariantForm[]): VariantForm[] {
  if (options.length === 0) return existing;
  let combos: Record<string, string>[] = [{}];
  for (const o of options) combos = combos.flatMap((c) => o.values.map((v) => ({ ...c, [o.name]: v })));
  return combos.slice(0, 100).map((values) => {
    const title = options.map((o) => values[o.name]).join(' / ');
    const had = existing.find((e) => e.title === title);
    return had ? { ...had, option_values: values } : { title, sku: '', price: '', inventory: '0', active: true, option_values: values };
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
    variants: p.variants.map((v) => ({ id: v.id, title: v.title, sku: v.sku ?? '', price: moneyInput(v.own_price_cents, p.currency), inventory: String(v.inventory ?? 0), active: v.active ?? true, option_values: v.option_values })),
    seo_title: p.seo_title ?? '', seo_description: p.seo_description ?? '', translations: p.translations ?? {}, images: p.images.map((i) => ({ id: i.id, path: i.path, alt: i.alt })),
  };
}
export const emptyForm = (): ProductForm => ({
  name: '', slug: '', slugTouched: false, summary: '', description: '', status: 'draft', category_id: '', price: '', compareAt: '', currency: 'usd',
  inventory_mode: 'tracked', inventory: '0', leadTime: '', options: [], variants: [], seo_title: '', seo_description: '', translations: {}, images: [],
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
    images: f.images.map((i) => ({ id: i.id, alt: i.alt })),
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
  const variants = f.variants.filter((v) => v.active).map((v, i) => {
    const price = cents(v.price) ?? base;
    return { id: v.id ?? `new-${i}`, title: v.title, option_values: v.option_values, price_cents: price, available: price != null && (made || stock(v.inventory) > 0), max_quantity: made ? 10 : Math.min(stock(v.inventory), 10) };
  });
  const prices = (variants.length ? variants.map((v) => v.price_cents) : [base]).filter((c): c is number => c != null);
  return {
    id: f.id ?? 'preview', slug: f.slug || slugify(f.name) || 'preview', name: f.name || 'Product name', summary: f.summary, description: f.description, status: f.status,
    category: categories.find((c) => c.id === f.category_id) ?? null, currency: f.currency, price_cents: base, compare_at_cents: cents(f.compareAt),
    from_cents: prices.length ? Math.min(...prices) : null, price_varies: new Set(prices).size > 1, inventory_mode: f.inventory_mode,
    lead_time_days: /^\d+$/.test(f.leadTime.trim()) ? Number(f.leadTime) : null,
    available: variants.length ? variants.some((v) => v.available) : base != null && (made || stock(f.inventory) > 0),
    max_quantity: made ? 10 : Math.min(stock(f.inventory), 10), options: parseOptions(f.options), seo_title: f.seo_title || null, seo_description: f.seo_description || null,
    translations: f.translations, updated_at: '', published_at: null, images: f.images.map((i) => ({ ...i, width: null, height: null })), variants,
  };
}
