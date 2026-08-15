import { Metadata } from 'next';

/**
 * Site-wide metadata for the VexaOS company + product marketing site.
 *
 * Positioning: VexaOS is a business operating system — a platform plus five
 * separately sold products (ShyftGrid, Commerce Ops, Inventory Ops, VexaFront,
 * TouchBoard) and the managed touchscreen hardware they run on.
 */

export const siteConfig = {
  name: 'VexaOS',
  brandName: 'VexaOS',
  shortTitle: 'VexaOS — The Business Operating System',
  longTitle: 'VexaOS — One Operating System for Your Entire Business',
  description:
    'VexaOS connects your workforce, commerce, inventory, customer experiences, and business hardware through one platform — one identity, one data layer, one control center.',
  url: 'https://www.vexaos.io',
  appUrl: 'https://app.vexaos.io',
  ogImage: 'https://www.vexaos.io/og-vexaos.png',
  twitterHandle: '@vexaos',
  locale: 'en_US',
  contactEmail: 'support@vexaos.io',
  founder: {
    name: 'Darius Henry',
    linkedin: 'https://www.linkedin.com/in/darius-henry-292b21373/',
    github: 'https://github.com/PulseTV-llc',
  },
  keywords: [
    // === Platform / category ===
    'business operating system',
    'unified business platform',
    'all-in-one business software',
    'connected business systems',
    'multi-location business software',
    'operations platform for multi-location businesses',
    'single platform for workforce and commerce',

    // === Products ===
    'VexaOS',
    'ShyftGrid',
    'ShyftGrid scheduling',
    'Commerce Ops',
    'Inventory Ops',
    'VexaFront',
    'VexaFront kiosk',
    'TouchBoard',
    'employee touchscreen board',

    // === Workforce ===
    'employee scheduling software',
    'shift management software',
    'shift swap and open shift marketplace',
    'time and attendance system',
    'labor cost management',
    'workforce management platform',

    // === Commerce ===
    'point of sale platform',
    'unified commerce platform',
    'order and payment management',
    'customer loyalty platform',
    'self-service ordering kiosk',

    // === Inventory / operations ===
    'inventory management software',
    'multi-location inventory tracking',
    'cost of goods tracking',
    'purchase order and receiving software',
    'waste and shrinkage tracking',

    // === Hardware ===
    'self-service kiosk hardware',
    'commercial touchscreen kiosk',
    'digital menu board',
    'employee display board',
    'managed kiosk devices',
    'touchscreen kiosk lease',

    // === Industries ===
    'restaurant operations software',
    'salon and barbershop software',
    'retail operations platform',
    'gym management software',
    'auto service shop software',
    'hospitality operations software',
    'clinic and med spa software',
    'field service management platform',

    // === Buyer intent ===
    'replace disconnected business tools',
    'one system for scheduling and POS',
    'multi-location operations software pricing',
    'enterprise business operating system',
    'franchise operations platform',
  ],
};

export const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.longTitle,
      template: '%s · VexaOS',
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'VexaOS', url: siteConfig.url }],
    creator: 'VexaOS',
    publisher: 'VexaOS',
    formatDetection: {
      email: true,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: siteConfig.longTitle,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: 'VexaOS — One operating system for your entire business',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: siteConfig.longTitle,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          alt: 'VexaOS — One operating system for your entire business',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon-16x16.png',
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: siteConfig.url,
      languages: {
        'en-US': siteConfig.url,
        'x-default': siteConfig.url,
      },
    },
    category: 'technology',
    classification: 'Business Operating System',
  };
};
