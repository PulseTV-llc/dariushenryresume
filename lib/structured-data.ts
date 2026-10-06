/**
 * JSON-LD structured data for vexaos.io, emitted site-wide from app/layout.tsx.
 * Only facts: no ratings, reviews, prices or customer counts.
 */

import { ADDRESS, CONTACT_EMAIL, DESCRIPTION, SITE_URL } from './site';

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'VexaOs',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/android-chrome-512x512.png` },
  image: `${SITE_URL}/opengraph-image`,
  slogan: 'Monitor anything, anywhere.',
  description: DESCRIPTION,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ['English'],
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'VexaOs',
  description: DESCRIPTION,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
};

export const siteSchemas = [organizationSchema, websiteSchema];
