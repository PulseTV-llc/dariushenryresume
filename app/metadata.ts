import { Metadata } from 'next';

/**
 * Site-wide metadata for vexaos.io.
 *
 * Positioning: VexaOS is a custom business operating system company. It designs
 * and builds connected web, mobile, operations, data, and hardware systems
 * around how each client operates — on reusable VexaOS architecture.
 *
 * Page-level metadata overrides title/description/canonical; the OG image comes
 * from app/opengraph-image.tsx.
 */

export const siteConfig = {
  name: 'VexaOS',
  title: 'VexaOS — Custom Business Operating Systems',
  description:
    'VexaOS designs and builds custom business operating systems — web, iOS, Android, workforce, commerce, inventory, AI, and connected hardware on one architecture. Built in America, delivered worldwide.',
  url: 'https://www.vexaos.io',
  twitterHandle: '@vexaos',
  locale: 'en_US',
  keywords: [
    'custom business operating system',
    'custom business management software',
    'custom operations software',
    'custom enterprise software',
    'business software development',
    'custom restaurant software',
    'restaurant management software development',
    'custom workforce management software',
    'custom POS system development',
    'custom inventory system',
    'multi-location business software',
    'business process automation',
    'operations management software',
    'custom business apps',
    'custom iOS business apps',
    'custom Android business apps',
  ],
};

export const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: '%s · VexaOS',
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
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
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: siteConfig.title,
      description: siteConfig.description,
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
    // No site-wide canonical: each page declares its own, so child routes never
    // inherit the homepage URL as their canonical.
    category: 'technology',
    classification: 'Custom Business Software Development',
  };
};
