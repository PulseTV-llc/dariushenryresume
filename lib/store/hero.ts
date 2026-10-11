import { LOCALE_INFO, type Locale } from '@/lib/i18n/config';
import type { StoreStrings } from './strings';
import type { StoreProduct } from './types';

/** A country's name in the visitor's language ("United States", "สหรัฐอเมริกา"). */
export function countryName(code: string, locale: Locale): string {
  try {
    const name = new Intl.DisplayNames([LOCALE_INFO[locale].intl], { type: 'region' }).of(code) ?? code;
    // English says "the United States", "the Philippines" ...
    return locale === 'en' && THE.has(code) ? `the ${name}` : name;
  } catch { return code; }
}
const THE = new Set(['US', 'GB', 'PH', 'NL', 'AE', 'BS', 'DO', 'CZ', 'MV', 'SC']);

/** The product shown inside the hero: the first one on sale that has a photo, else the first on sale. */
export const spotlightProduct = (products: StoreProduct[]): StoreProduct | null => products.find((p) => p.images.length > 0) ?? products[0] ?? null;

/**
 * The three chips under the hero's buttons. Each one states only what the
 * store's settings and catalog make true right now:
 *  1. what the hardware is for (always);
 *  2. how it is sold: made to order or in stock when everything on sale is,
 *     else how you pay (Stripe when checkout is open, by message when it is not);
 *  3. shipping: the origin only if STORE_SHIPS_FROM is set, else the destinations.
 */
export function heroChips(o: { products: StoreProduct[]; checkoutOpen: boolean; shipFrom: string | null; shipTo: string[]; locale: Locale; t: StoreStrings }): string[] {
  const { products, checkoutOpen, shipFrom, shipTo, locale, t } = o;
  const sellable = products.filter((p) => p.from_cents != null);
  const second = sellable.length > 0 && sellable.every((p) => p.inventory_mode === 'made_to_order') ? t.madeToOrder
    : sellable.length > 0 && sellable.every((p) => p.inventory_mode === 'tracked' && p.available) ? t.inStock
    : checkoutOpen ? t.hero.chipStripe : t.hero.chipMessage;
  const third = shipFrom ? t.hero.chipShipsFrom.replace('{place}', countryName(shipFrom, locale))
    : shipTo.length === 1 ? t.hero.chipShipsTo.replace('{place}', countryName(shipTo[0], locale))
    : t.hero.chipShipsToMany.replace('{count}', String(shipTo.length));
  return [t.hero.chipBuiltFor, second, third];
}
