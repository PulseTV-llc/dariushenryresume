import { LOCALE_INFO, type Locale } from '@/lib/i18n/config';
import type { ProductText, StoreProduct } from './types';

/** Minor units per major unit for a currency (USD 100, JPY 1, VND 1 ...), from Intl. */
export function minorUnit(currency: string): number {
  try {
    return 10 ** (new Intl.NumberFormat('en', { style: 'currency', currency: currency.toUpperCase() }).resolvedOptions().maximumFractionDigits ?? 2);
  } catch { return 100; }
}
/** Money in the visitor's number format; the currency is the product's, never converted. */
export function money(cents: number | null | undefined, currency: string, locale: Locale = 'en'): string {
  if (cents == null) return '';
  try {
    return new Intl.NumberFormat(LOCALE_INFO[locale].intl, { style: 'currency', currency: currency.toUpperCase() }).format(cents / minorUnit(currency));
  } catch { return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`; }
}
/** A product's words in a language: its own translation where one was entered, else the English. */
export function productText(p: Pick<StoreProduct, 'name' | 'summary' | 'description' | 'translations'>, locale: Locale): Required<ProductText> {
  const t = (locale !== 'en' && p.translations?.[locale]) || {};
  const pick = (a: string | undefined, b: string) => (a && a.trim() ? a : b);
  return { name: pick(t.name, p.name), summary: pick(t.summary, p.summary), description: pick(t.description, p.description) };
}
/** "From $18.00" when variants differ, else the price; null when nothing is priced. */
export function priceLabel(p: Pick<StoreProduct, 'from_cents' | 'price_varies' | 'currency'>, locale: Locale, from: string): string | null {
  if (p.from_cents == null) return null;
  const m = money(p.from_cents, p.currency, locale);
  return p.price_varies ? from.replace('{price}', m) : m;
}
