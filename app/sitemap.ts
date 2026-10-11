import { MetadataRoute } from 'next';
import { PATHS } from '@/lib/site';
import { LOCALES, LOCALE_INFO } from '@/lib/i18n/config';
import { INDEX_MACHINE_DRAFTS, languageAlternates } from './metadata';
import { getCatalog } from '@/lib/store/catalog';

/** One entry per page per language, each listing all its language alternates (hreflang). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const locales = LOCALES.filter((l) => INDEX_MACHINE_DRAFTS || LOCALE_INFO[l].status !== 'machine-draft');
  // store pages are listed only while something is on sale
  const { products } = await getCatalog();
  const paths = [...PATHS, ...(products.length ? [{ path: '/store', priority: 0.7 }, ...products.map((p) => ({ path: `/store/${p.slug}`, priority: 0.6 }))] : [])];
  return paths.flatMap(({ path, priority }) => {
    const languages = languageAlternates(path);
    return locales.map((l) => ({
      url: languages[LOCALE_INFO[l].tag],
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: l === 'en' ? priority : Math.round(priority * 80) / 100,
      alternates: { languages },
    }));
  });
}
