import { notFound } from 'next/navigation';
import LocateNodePage from '@/components/locate-node/LocateNodePage';
import { pageMeta } from '../../metadata';
import { isLocale } from '@/lib/i18n/config';
import { LOCATE_NODE_PATH, LOCATE_NODE_SLUG, locateNodeStrings } from '@/lib/locate-node/strings';
import { getProduct } from '@/lib/store/catalog';
import { imageUrl } from '@/lib/store/config';
import { productSchema } from '@/lib/store/jsonld';
import { storeStrings } from '@/lib/store/strings';
import { SITE_URL } from '@/lib/site';
import { localePath } from '@/lib/i18n/config';

// The product (status, price, photos) comes from the store, so the page follows it: refreshed when the admin saves.
export const revalidate = 300;

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  const product = await getProduct(LOCATE_NODE_SLUG);
  if (!product) return {};
  const t = locateNodeStrings(params.locale);
  const meta = pageMeta(params.locale, LOCATE_NODE_PATH, t.meta, true);
  const photo = product.images[0];
  return { ...meta, openGraph: { ...meta.openGraph, ...(photo ? { images: [{ url: imageUrl(photo.path), width: photo.width ?? undefined, height: photo.height ?? undefined, alt: t.hero.imageAlt }] } : {}) } };
}

/** /locate-node: exists only while the product is public in the store (on sale or coming soon). */
export default async function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const product = await getProduct(LOCATE_NODE_SLUG);
  if (!product) notFound();
  const locale = params.locale;
  const t = locateNodeStrings(locale);
  // the same facts as the store's product page, described on this URL, in this page's words
  const schema = { ...productSchema(product, locale), name: t.name, description: t.meta.description, url: `${SITE_URL}${localePath(locale, LOCATE_NODE_PATH)}` };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LocateNodePage locale={locale} t={t} s={storeStrings(locale)} product={product} />
    </>
  );
}
