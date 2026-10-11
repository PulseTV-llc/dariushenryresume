/**
 * Locale registry. To add a language (for example Swahili, French or Hausa
 * for African markets): add it here, add content/<code>/, and register it in
 * lib/i18n/content.ts. See docs/LOCALIZATION.md.
 */

export const LOCALES = ['en', 'th', 'vi', 'id', 'fil'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Cookie that remembers the visitor's choice. */
export const LOCALE_COOKIE = 'vx_locale';
/** Short-lived cookie: a locale suggested from the visitor's country. */
export const SUGGEST_COOKIE = 'vx_suggest';

export type TranslationStatus = 'source' | 'machine-draft' | 'reviewed';

export interface LocaleInfo {
  /** Name in its own language, shown in the switcher. */
  name: string;
  /** Name in English, for docs and aria labels. */
  english: string;
  /** BCP 47 tag for <html lang> and hreflang. */
  tag: string;
  /** Locale for Intl formatting. Thai uses the Gregorian calendar on this site. */
  intl: string;
  currency: string;
  /** ISO 3166-1 countries this locale is suggested for. */
  countries: string[];
  /** Primary language subtags in Accept-Language that map here. */
  accept: string[];
  status: TranslationStatus;
  /** Shown in the suggestion banner, in the locale's own language. */
  suggest: string;
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  en: {
    name: 'English',
    english: 'English',
    tag: 'en',
    intl: 'en-US',
    currency: 'USD',
    countries: [],
    accept: ['en'],
    status: 'source',
    suggest: 'Read this site in English?',
  },
  th: {
    name: 'ไทย',
    english: 'Thai',
    tag: 'th',
    intl: 'th-TH-u-ca-gregory',
    currency: 'THB',
    countries: ['TH'],
    accept: ['th'],
    status: 'machine-draft',
    suggest: 'อ่านเว็บไซต์นี้เป็นภาษาไทยไหม',
  },
  vi: {
    name: 'Tiếng Việt',
    english: 'Vietnamese',
    tag: 'vi',
    intl: 'vi-VN',
    currency: 'VND',
    countries: ['VN'],
    accept: ['vi'],
    status: 'machine-draft',
    suggest: 'Đọc trang này bằng tiếng Việt?',
  },
  id: {
    name: 'Bahasa Indonesia',
    english: 'Indonesian',
    tag: 'id',
    intl: 'id-ID',
    currency: 'IDR',
    countries: ['ID'],
    accept: ['id', 'in'],
    status: 'machine-draft',
    suggest: 'Baca situs ini dalam Bahasa Indonesia?',
  },
  fil: {
    name: 'Filipino',
    english: 'Filipino',
    tag: 'fil',
    intl: 'fil-PH',
    currency: 'PHP',
    countries: ['PH'],
    accept: ['fil', 'tl'],
    status: 'machine-draft',
    suggest: 'Basahin ang site na ito sa Filipino?',
  },
};

export const isLocale = (v: string | undefined | null): v is Locale =>
  !!v && (LOCALES as readonly string[]).includes(v);

/** English lives at the root; every other locale is prefixed. */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path; // external, mailto, hash
  if (locale === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** Remove a locale prefix: '/th/platform' -> '/platform'. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const seg = pathname.split('/')[1];
  if (isLocale(seg)) {
    const rest = pathname.slice(seg.length + 1);
    return { locale: seg, path: rest === '' ? '/' : rest };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || '/' };
}

/** Best supported locale for an Accept-Language header, or null if none match. */
export function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q.slice(2)) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang, q } of ranked) {
    if (q <= 0) continue;
    const hit = LOCALES.find((l) => LOCALE_INFO[l].accept.includes(lang));
    if (hit) return hit;
  }
  return null;
}

export function fromCountry(country: string | null): Locale | null {
  if (!country) return null;
  return LOCALES.find((l) => LOCALE_INFO[l].countries.includes(country.toUpperCase())) ?? null;
}
