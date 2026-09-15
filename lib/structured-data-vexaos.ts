/**
 * JSON-LD structured data for vexaos.io.
 *
 * Positioning: VexaOS is a custom business operating system company — a
 * professional service that designs and builds software systems, not a SaaS
 * price list. Engagement offers are expressed as "starting from" price
 * specifications; no per-seat or per-location subscription offers are emitted.
 *
 * Emitted site-wide from app/layout.tsx: organization, website, service, and
 * industries. FAQ schema is page-scoped (see faqPageSchema).
 */

import { SITE_URL, CONTACT_EMAIL } from './vexaos';
import { ENGAGEMENT_TIERS } from './marketing/pricing';
import { INDUSTRIES } from './marketing/industries';
import { FOUNDER } from './founder';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const SERVICE_ID = `${SITE_URL}/#service`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'VexaOS',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/vexaos-logo.png` },
  image: `${SITE_URL}/opengraph-image`,
  slogan: 'Built around the way your company actually works.',
  description:
    'VexaOS designs and builds custom business operating systems — connected web, mobile, workforce, commerce, inventory, analytics, and hardware systems built on one proven architecture — for multi-location and operationally complex organizations worldwide.',
  email: CONTACT_EMAIL,
  address: { '@type': 'PostalAddress', addressCountry: 'US' },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Custom business software development',
    'Business operating systems',
    'Workforce management software',
    'POS system development',
    'Inventory management systems',
    'iOS and Android business app development',
    'Kiosk and touchscreen systems',
    'Multi-location business software',
    'Business process automation',
  ],
  founder: {
    '@type': 'Person',
    name: FOUNDER.name,
    jobTitle: FOUNDER.role,
    url: `${SITE_URL}/about/founder`,
    sameAs: [FOUNDER.linkedin, FOUNDER.github],
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  ],
  sameAs: [FOUNDER.linkedin, FOUNDER.github],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'VexaOS',
  description: 'Custom business operating systems — built around the way your company actually works.',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
};

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': SERVICE_ID,
  name: 'VexaOS — Custom Business Operating Systems',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  description:
    'Design and development of custom business operating systems: web control centers, iOS and Android apps, POS and kitchen systems, workforce and scheduling, inventory, CRM and loyalty, kiosks, IoT and NFC integrations, analytics, and managed platform support.',
  provider: { '@id': ORG_ID },
  areaServed: 'Worldwide',
  serviceType: 'Custom business software development',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'VexaOS engagements',
    url: `${SITE_URL}/pricing`,
    itemListElement: ENGAGEMENT_TIERS.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      description: t.summary,
      url: `${SITE_URL}/pricing`,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        minPrice: t.from,
      },
    })),
  },
};

export const industriesItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/industries#list`,
  name: 'Industries VexaOS builds business systems for',
  url: `${SITE_URL}/industries`,
  itemListElement: INDUSTRIES.map((ind, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: ind.name,
    url: `${SITE_URL}/industries/${ind.slug}`,
  })),
};

/** Page-scoped FAQ schema built from the same Q&A the page renders. */
export function faqPageSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export const vexaosSchemas = [organizationSchema, websiteSchema, serviceSchema, industriesItemListSchema];
