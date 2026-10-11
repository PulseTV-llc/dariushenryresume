import { DEFAULT_LOCALE, type Locale } from './config';
import { NON_TEXT_KEYS } from './types';
import { common as enCommon } from '@/content/en/common';
import { catalog as enCatalog } from '@/content/en/catalog';
import { pagesMain as enMain } from '@/content/en/pages-main';
import { pagesProducts as enProducts } from '@/content/en/pages-products';
import * as th from '@/content/th';
import * as vi from '@/content/vi';
import * as id from '@/content/id';
import * as fil from '@/content/fil';

const en = { common: enCommon, catalog: enCatalog, pages: enMain, products: enProducts };
export type Content = typeof en;

/** Register a new locale's content here. */
const TRANSLATIONS: Record<Exclude<Locale, 'en'>, unknown> = { th, vi, id, fil };

/**
 * Overlay a translation on the English source.
 *  - Structure always comes from English, so a translation cannot add,
 *    remove or reorder anything.
 *  - Keys in NON_TEXT_KEYS (links, icons, status, layout) always come from English.
 *  - A missing or empty translated string falls back to English.
 */
function overlay<T>(source: T, translated: unknown, key?: string): T {
  if (typeof source === 'string') {
    if (key && NON_TEXT_KEYS.has(key)) return source;
    return (typeof translated === 'string' && translated.trim() ? translated : source) as T;
  }
  if (Array.isArray(source)) {
    const t = Array.isArray(translated) ? translated : [];
    return source.map((item, i) => overlay(item, t[i], key)) as T;
  }
  if (source && typeof source === 'object') {
    const t = (translated && typeof translated === 'object' ? translated : {}) as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(source)) out[k] = overlay(v, t[k], k);
    return out as T;
  }
  return source;
}

const cache = new Map<Locale, Content>();

export function getContent(locale: Locale): Content {
  if (locale === DEFAULT_LOCALE) return en;
  let c = cache.get(locale);
  if (!c) {
    const t = TRANSLATIONS[locale] as { common?: unknown; catalog?: unknown; pagesMain?: unknown; pagesProducts?: unknown };
    c = overlay(en, { common: t.common, catalog: t.catalog, pages: t.pagesMain, products: t.pagesProducts });
    cache.set(locale, c);
  }
  return c;
}

export { en as sourceContent, overlay };
