/**
 * JSON-LD structured data for the VexaOS company + product marketing site.
 *
 * Replaces the previous `lib/structured-data.ts`, which described the site as a
 * private-AI consulting practice. That file is left in place (unused by the
 * layout) so nothing is lost — see /ai-solutions for the legacy positioning.
 */

import {
  PRODUCTS,
  VERTICALS,
  BUNDLES,
  STANDALONE_BY_SLUG,
  DEVICE_BY_SLUG,
  SITE_URL,
  CONTACT_EMAIL,
} from './vexaos';

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
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: BUNDLES[0].priceCents / 100,
    highPrice: BUNDLES[BUNDLES.length - 1].priceCents / 100,
    offerCount: BUNDLES.length,
    url: `${SITE_URL}/pricing`,
  },
};

/** One SoftwareApplication per product. */
export const productSchemas = PRODUCTS.map((p) => {
  const standalone = STANDALONE_BY_SLUG[p.slug];
  const device = DEVICE_BY_SLUG[p.slug];
  // Cents → dollars only at the schema edge. Unpriced products emit no offer.
  const priceCents = device
    ? device.priceCents
    : standalone && !standalone.comingSoon
      ? standalone.priceCents
      : null;
  const unitText = device ? device.unit : 'per location per month';
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
    ...(priceCents !== null
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: String(priceCents / 100),
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              priceCurrency: 'USD',
              price: priceCents / 100,
              unitText,
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
  itemListElement: BUNDLES.map((b, i) => ({
    '@type': 'Offer',
    position: i + 1,
    name: `VexaOS ${b.name}`,
    priceCurrency: 'USD',
    price: String(b.priceCents / 100),
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      price: b.priceCents / 100,
      unitText: 'per location per month',
    },
    itemOffered: {
      '@type': 'SoftwareApplication',
      name: `VexaOS ${b.name}`,
      applicationCategory: 'BusinessApplication',
    },
    url: `${SITE_URL}/pricing`,
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
      name: 'Do I have to buy a VexaOS bundle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. ShyftGrid, Commerce Ops, and Inventory Ops can each be bought standalone from $59 per location per month. Bundles start at $79 per location per month and cost less than buying the parts separately.',
      },
    },
    {
      '@type': 'Question',
      name: 'What products make up VexaOS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Six products: ShyftGrid for workforce and scheduling, TouchBoard for employee displays, Commerce Ops for orders and payments, VexaFront for customer-facing kiosks and reception, Inventory Ops for stock and cost, and Facility Ops for environmental monitoring — all on the VexaOS platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is hardware included in the VexaOS subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Device software and hardware are billed separately. TouchBoard software is $29 per device per month; VexaOS Complete includes 1 TouchBoard license per location, with additional boards at $19 per device per month. VexaFront software is $49 per device per month, or $39 with Complete. Displays can be purchased outright or leased; the flagship 43-inch board is $2,499 to purchase or $99 per month on a 36-month lease.',
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
    {
      '@type': 'Question',
      name: 'Is the VexaOS platform an extra charge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Identity, the organization model, roles and permissions, the shared data layer, and the device registry are included with every bundle and every standalone product. There is no separate platform line.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do Facility Ops and Inspections cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both are in beta and not yet priced. Contact VexaOS to discuss including them in a deployment.',
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
