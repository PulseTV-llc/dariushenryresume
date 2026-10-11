/**
 * JSON-LD structured data for vexaos.io, emitted from app/[locale]/layout.tsx.
 * Only facts: no ratings, reviews, prices or customer counts.
 */
import { ADDRESS, CONTACT_EMAIL, SITE_URL } from './site';
import { LOCALE_INFO, localePath, type Locale } from './i18n/config';

const ORG_ID = `${SITE_URL}/#organization`;

export function siteSchemas(locale: Locale, description: string, tagline: string) {
  const home = `${SITE_URL}${localePath(locale, '/') === '/' ? '' : localePath(locale, '/')}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'VexaOs',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/android-chrome-512x512.png` },
      image: `${SITE_URL}/opengraph-image`,
      slogan: tagline,
      description,
      email: CONTACT_EMAIL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.region,
        postalCode: ADDRESS.postalCode,
        addressCountry: ADDRESS.country,
      },
      contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: CONTACT_EMAIL, url: `${home}/contact`, availableLanguage: ['English'] }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${home}/#website`,
      url: home,
      name: 'VexaOs',
      description,
      publisher: { '@id': ORG_ID },
      inLanguage: LOCALE_INFO[locale].tag,
    },
  ];
}
