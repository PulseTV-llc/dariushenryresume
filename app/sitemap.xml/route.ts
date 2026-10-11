import { SITE_URL } from '@/lib/site';
import { sitemapIndexXml, sitemapLocales } from '@/lib/i18n/sitemap';
import { INDEX_MACHINE_DRAFTS } from '../metadata';

export const revalidate = 3600;

/** The sitemap index: one sitemap per language. */
export function GET() {
  return new Response(sitemapIndexXml(SITE_URL, sitemapLocales(INDEX_MACHINE_DRAFTS), new Date()), { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
