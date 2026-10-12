import { SITE_URL } from '@/lib/site';
import { LOCALE_INFO, localePath, type Locale } from '@/lib/i18n/config';
import { imageUrl } from './config';
import { minorUnit, productText } from './format';
import type { StoreProduct } from './types';

const abs = (locale: Locale, path: string) => `${SITE_URL}${localePath(locale, path)}`;
const amount = (cents: number, currency: string) => (cents / minorUnit(currency)).toFixed(minorUnit(currency) === 1 ? 0 : 2);

/**
 * schema.org Product for a product page. Facts only: no ratings or reviews.
 * An offer is included only when the product has a price; availability says
 * honestly whether it is in stock, made to order or sold out.
 */
export function productSchema(p: StoreProduct, locale: Locale) {
  const t = productText(p, locale);
  const url = abs(locale, `/store/${p.slug}`);
  // coming soon: announced, not yet for sale (PreOrder is the closest schema.org value); otherwise the honest stock state
  const availability = p.status === 'coming_soon' ? 'PreOrder' : !p.available ? 'OutOfStock' : p.inventory_mode === 'made_to_order' ? 'MadeToOrder' : 'InStock';
  const priced = p.variants.filter((v) => v.price_cents != null);
  const offer = (cents: number, extra: Record<string, unknown> = {}) => ({
    '@type': 'Offer', url, priceCurrency: p.currency.toUpperCase(), price: amount(cents, p.currency), itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': `${SITE_URL}/#organization` }, ...extra,
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: t.name,
    description: t.summary || t.description || undefined,
    url,
    inLanguage: LOCALE_INFO[locale].tag,
    brand: { '@type': 'Brand', name: 'VexaOs' },
    ...(p.category ? { category: p.category.name } : {}),
    ...(p.images.length ? { image: p.images.map((i) => imageUrl(i.path)) } : {}),
    ...(p.from_cents == null ? {} : priced.length > 1
      ? { offers: { '@type': 'AggregateOffer', priceCurrency: p.currency.toUpperCase(), lowPrice: amount(p.from_cents, p.currency),
            highPrice: amount(Math.max(...priced.map((v) => v.price_cents!)), p.currency), offerCount: priced.length,
            availability: `https://schema.org/${availability}`, url } }
      : { offers: offer(p.from_cents, { availability: `https://schema.org/${availability}` }) }),
  };
}

export function storeListSchema(products: StoreProduct[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(locale, `/store/${p.slug}`), name: productText(p, locale).name })),
  };
}
