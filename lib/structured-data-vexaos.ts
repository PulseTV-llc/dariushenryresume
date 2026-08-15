/**
 * JSON-LD structured data for the VexaOS company + product marketing site.
 *
 * Replaces the previous `lib/structured-data.ts`, which described the site as a
 * private-AI consulting practice. That file is left in place (unused by the
 * layout) so nothing is lost — see /ai-solutions for the legacy positioning.
 */

import { PRODUCTS, VERTICALS, PRODUCT_PRICING, SITE_URL, CONTACT_EMAIL } from './vexaos';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'VexaOS',
  legalName: 'VexaOS',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/vexaos-logo.png`,
  },
  image: `${SITE_URL}/og-vexaos.png`,
  description:
    'VexaOS is one operating system for the whole business — connecting workforce, commerce, inventory, customer experiences, and business hardware through a single platform.',
  email: CONTACT_EMAIL,
  founder: {
    '@type': 'Person',
    name: 'Darius Henry',
    jobTitle: 'Founder & Chief Architect',
    url: `${SITE_URL}/about/founder`,
    sameAs: [
      'https://www.linkedin.com/in/darius-henry-292b21373/',
      'https://github.com/PulseTV-llc',
    ],
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/darius-henry-292b21373/',
    'https://github.com/PulseTV-llc',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'VexaOS',
  description:
    'One operating system for your entire business: workforce, commerce, inventory, customer experiences, and business hardware.',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
};

/** The platform itself. */
export const platformSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#vexaos`,
  name: 'VexaOS',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android',
  url: SITE_URL,
  description:
    'VexaOS connects workforce, commerce, inventory, customer experiences, and business hardware through one platform — a single identity, organization model, data layer, and device registry.',
  publisher: { '@id': ORG_ID },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: String(PRODUCT_PRICING[0].from),
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      price: PRODUCT_PRICING[0].from,
      unitText: 'per location per month',
    },
    url: `${SITE_URL}/pricing`,
  },
};

/** One SoftwareApplication per product. */
export const productSchemas = PRODUCTS.map((p) => {
  const price = PRODUCT_PRICING.find((pp) => pp.slug === p.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/products/${p.slug}#software`,
    name: p.name,
    alternateName: `${p.name} — Powered by VexaOS`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: p.domain,
    operatingSystem: 'Web, Android',
    url: `${SITE_URL}/products/${p.slug}`,
    description: p.summary,
    featureList: p.capabilities.map((c) => c.title),
    isPartOf: { '@id': `${SITE_URL}/#vexaos` },
    publisher: { '@id': ORG_ID },
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: String(price.from),
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              priceCurrency: 'USD',
              price: price.from,
              unitText: price.unit,
            },
            url: `${SITE_URL}/pricing`,
          },
        }
      : {}),
  };
});

export const productCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${SITE_URL}/products#catalog`,
  name: 'VexaOS product catalog',
  url: `${SITE_URL}/products`,
  itemListElement: PRODUCT_PRICING.map((p, i) => ({
    '@type': 'Offer',
    position: i + 1,
    priceCurrency: 'USD',
    price: String(p.from),
    itemOffered: {
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'BusinessApplication',
    },
    url: p.slug === 'platform' ? `${SITE_URL}/pricing` : `${SITE_URL}/products/${p.slug}`,
  })),
};

export const industriesItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/industries#list`,
  name: 'Industries served by VexaOS',
  url: `${SITE_URL}/industries`,
  itemListElement: VERTICALS.map((v, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: v.name,
    url: `${SITE_URL}/industries/${v.slug}`,
  })),
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/pricing#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I have to buy all of the VexaOS products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Each VexaOS product is sold separately and works on its own. The VexaOS Platform line is required with any product because it provides identity, the organization model, the shared data layer, and device management.',
      },
    },
    {
      '@type': 'Question',
      name: 'What products make up VexaOS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ShyftGrid for workforce and scheduling, TouchBoard for employee displays, Commerce Ops for orders and payments, VexaFront for customer-facing kiosks, and Inventory Ops for stock and cost — all on the VexaOS platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is hardware included in the VexaOS subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Hardware is billed separately. VexaFront kiosks and TouchBoard displays can be purchased outright or leased; the flagship 43-inch board is $2,499 to purchase or $99 per month on a 36-month lease.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are VexaOS staff accounts charged per seat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Staff accounts are unlimited within a location. Pricing is per location and per device rather than per user.',
      },
    },
  ],
};

export const vexaosSchemas = [
  organizationSchema,
  websiteSchema,
  platformSchema,
  productCatalogSchema,
  industriesItemListSchema,
  faqSchema,
  ...productSchemas,
];
