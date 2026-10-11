import { DEFAULT_LOCALE, LOCALES, LOCALE_INFO, localePath, type Locale } from './config';

/**
 * Sitemaps: one per language (/sitemaps/<locale>.xml) plus an index at
 * /sitemap.xml. Every URL lists all its language versions (hreflang), with
 * English as x-default.
 */
export interface SitePath { path: string; priority: number }
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const absoluteUrl = (site: string, locale: Locale, path: string) => `${site}${localePath(locale, path) === '/' ? '' : localePath(locale, path)}`;

/** Languages that get a sitemap. Machine drafts can be left out until they are reviewed. */
export const sitemapLocales = (includeDrafts: boolean): Locale[] => LOCALES.filter((l) => includeDrafts || LOCALE_INFO[l].reviewStatus !== 'machine-draft');

export function sitemapIndexXml(site: string, locales: Locale[], lastModified: Date): string {
  const items = locales.map((l) => `  <sitemap><loc>${esc(`${site}/sitemaps/${l}.xml`)}</loc><lastmod>${lastModified.toISOString()}</lastmod></sitemap>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join('\n')}\n</sitemapindex>\n`;
}

export function localeSitemapXml(site: string, locale: Locale, paths: SitePath[], alternates: Locale[], lastModified: Date): string {
  const urls = paths.map(({ path, priority }) => {
    const links = [
      ...alternates.map((l) => `    <xhtml:link rel="alternate" hreflang="${LOCALE_INFO[l].tag}" href="${esc(absoluteUrl(site, l, path))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(site, DEFAULT_LOCALE, path))}"/>`,
    ];
    const p = locale === DEFAULT_LOCALE ? priority : Math.round(priority * 80) / 100;
    return `  <url>\n    <loc>${esc(absoluteUrl(site, locale, path))}</loc>\n    <lastmod>${lastModified.toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p.toFixed(2)}</priority>\n${links.join('\n')}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}
