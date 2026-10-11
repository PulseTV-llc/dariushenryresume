import type { Metadata } from 'next';
import { OG_IMAGES, SITE_URL } from '@/lib/site';
import { DEFAULT_LOCALE, LOCALES, LOCALE_INFO, localePath, type Locale } from '@/lib/i18n/config';
import { getContent } from '@/lib/i18n/content';

/**
 * Set to false to keep machine-draft translations out of search engines until
 * a native speaker has reviewed them (they stay reachable and linked).
 */
export const INDEX_MACHINE_DRAFTS = true;

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', th: 'th_TH', vi: 'vi_VN', id: 'id_ID', fil: 'fil_PH' };

/** hreflang map for one path: every locale plus x-default (English). */
export function languageAlternates(path: string): Record<string, string> {
  const abs = (l: Locale) => `${SITE_URL}${localePath(l, path) === '/' ? '' : localePath(l, path)}`;
  return {
    ...Object.fromEntries(LOCALES.map((l) => [LOCALE_INFO[l].tag, abs(l)])),
    'x-default': abs(DEFAULT_LOCALE),
  };
}

/** Site-wide defaults for a locale (app/[locale]/layout.tsx). */
export function baseMetadata(locale: Locale): Metadata {
  const c = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.pages.home.meta.title, template: '%s · VexaOs' },
    description: c.common.description,
    applicationName: 'VexaOs',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'VexaOs', url: SITE_URL }],
    creator: 'VexaOs',
    publisher: 'VexaOs',
    formatDetection: { email: true, address: false, telephone: false },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon-16x16.png',
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/site.webmanifest',
    category: 'technology',
  };
}

/** Per-page metadata: own canonical, hreflang alternates and social card. */
export function pageMeta(locale: Locale, path: string, meta: { title: string; description: string }, absoluteTitle = false): Metadata {
  const languages = languageAlternates(path);
  const url = languages[LOCALE_INFO[locale].tag];
  const draft = LOCALE_INFO[locale].reviewStatus === 'machine-draft';
  const social = absoluteTitle ? meta.title : `${meta.title} · VexaOs`;
  return {
    title: absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: url, languages },
    robots: draft && !INDEX_MACHINE_DRAFTS ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: 'VexaOs',
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      title: social,
      description: meta.description,
      url,
      images: OG_IMAGES,
    },
    twitter: { card: 'summary_large_image', title: social, description: meta.description },
  };
}
