import { Metadata } from 'next';
import { DESCRIPTION, OG_IMAGES, SITE_URL } from '@/lib/site';

/**
 * Site-wide metadata for vexaos.io.
 *
 * Positioning: VexaOs is a vendor-neutral platform to monitor anything,
 * anywhere: sensors, Edge Gateway, Cloud & AI Insights, and apps.
 *
 * Pages build their own metadata with pageMeta() so each has its own
 * canonical; the OG image comes from app/opengraph-image.tsx.
 */

export const siteConfig = {
  name: 'VexaOs',
  title: 'VexaOs: Monitor Anything, Anywhere',
  description: DESCRIPTION,
  url: SITE_URL,
  locale: 'en_US',
  keywords: [
    'remote monitoring platform',
    'IoT monitoring',
    'wireless temperature monitoring',
    'humidity monitoring',
    'door sensor monitoring',
    'cold chain monitoring',
    'walk-in cooler monitoring',
    'warehouse temperature monitoring',
    'edge gateway',
    'sensor alerts',
    'temperature drift detection',
    'multi-site monitoring',
  ],
};

export const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: '%s · VexaOs',
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'VexaOs', url: siteConfig.url }],
    creator: 'VexaOs',
    publisher: 'VexaOs',
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
      title: siteConfig.title,
      description: siteConfig.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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
};

/** Per-page metadata with its own canonical and social card. */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'VexaOs',
      locale: 'en_US',
      title: `${title} · VexaOs`,
      description,
      url,
      images: OG_IMAGES,
    },
    twitter: { card: 'summary_large_image', title: `${title} · VexaOs`, description },
  };
}
