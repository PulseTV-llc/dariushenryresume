import { PATHS, SITE_URL } from '@/lib/site';
import { isLocale } from '@/lib/i18n/config';
import { localeSitemapXml, sitemapLocales } from '@/lib/i18n/sitemap';
import { getCatalog } from '@/lib/store/catalog';
import { LOCATE_NODE_PATH, LOCATE_NODE_SLUG } from '@/lib/locate-node/strings';
import { INDEX_MACHINE_DRAFTS } from '../../metadata';

export const revalidate = 3600;
export const generateStaticParams = () => sitemapLocales(INDEX_MACHINE_DRAFTS).map((l) => ({ file: `${l}.xml` }));

/** /sitemaps/<locale>.xml: every page in that language, each with its hreflang alternates. */
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const locale = params.file.replace(/\.xml$/, '');
  const locales = sitemapLocales(INDEX_MACHINE_DRAFTS);
  if (!params.file.endsWith('.xml') || !isLocale(locale) || !locales.includes(locale)) return new Response('Not found', { status: 404 });
  // store pages are listed only while something is on sale
  const { products } = await getCatalog();
  const paths = [...PATHS, ...(products.length ? [{ path: '/store', priority: 0.7 }, ...products.map((p) => ({ path: `/store/${p.slug}`, priority: 0.6 }))] : []),
    // the Locate Node page exists while its product is public
    ...(products.some((p) => p.slug === LOCATE_NODE_SLUG) ? [{ path: LOCATE_NODE_PATH, priority: 0.8 }] : [])];
  return new Response(localeSitemapXml(SITE_URL, locale, paths, locales, new Date()), { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
