import { LOCALE_INFO, type Locale } from './config';

/** Locale-aware formatting. Always go through these; never hand-format. */
export const formatNumber = (locale: Locale, n: number, opts?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(LOCALE_INFO[locale].intl, opts).format(n);

export const formatCurrency = (locale: Locale, amount: number, currency = LOCALE_INFO[locale].currency) =>
  new Intl.NumberFormat(LOCALE_INFO[locale].intl, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

export const formatDate = (locale: Locale, date: Date, opts: Intl.DateTimeFormatOptions = { dateStyle: 'long' }) =>
  new Intl.DateTimeFormat(LOCALE_INFO[locale].intl, opts).format(date);

/** Gregorian year in the locale's digits (Thai would otherwise show the Buddhist year). */
export const formatYear = (locale: Locale, date = new Date()) =>
  new Intl.DateTimeFormat(LOCALE_INFO[locale].intl, { year: 'numeric', calendar: 'gregory' }).format(date);

export const formatList = (locale: Locale, items: string[]) =>
  new Intl.ListFormat(LOCALE_INFO[locale].intl, { style: 'long', type: 'conjunction' }).format(items);
