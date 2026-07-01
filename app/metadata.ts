import { Metadata } from 'next';

// Award-winning enterprise SEO metadata.
//
// Strategy:
// 1. Title pattern: <Primary keyword> | <Differentiator> · <Brand>
//    Kept ≤80 chars so Google does not truncate the keyword.
// 2. Description: leads with the offering, names the Mac Studio class,
//    lists the most valuable industries, ends with a CTA-style benefit.
// 3. Keywords: clustered by buyer intent — offering, infrastructure
//    (Mac Studio + Apple Silicon), capability, industry vertical, and
//    bottom-of-funnel intent.

export const siteConfig = {
  name: 'VexaOS',
  brandName: 'VexaOS · Connected Business Systems · Darius Henry',
  shortTitle: 'VexaOS — Connected Business Systems',
  longTitle:
    'VexaOS — Custom Web, Mobile & Touchscreen Business Systems | Darius Henry',
  description:
    'VexaOS by Darius Henry builds custom connected business systems across web apps, iOS, Android, touchscreen kiosks, dashboards, staff tools, customer portals, scheduling, payments, and real-time operations.',
  url: 'https://iamdariushenry.com',
  ogImage: 'https://iamdariushenry.com/og-vexaos.png',
  twitterHandle: '@dariushenry',
  locale: 'en_US',
  author: {
    name: 'Darius Henry',
    email: 'support@vexaos.io',
    linkedin: 'https://www.linkedin.com/in/darius-henry-292b21373/',
    github: 'https://github.com/PulseTV-llc',
  },
  keywords: [
    // === Offering — exact-match buyer intent ===
    'private AI workflow system',
    'private AI workflow systems',
    'private AI for business',
    'private business AI',
    'custom AI for business',
    'business AI assistant',
    'private AI assistant for company',
    'company AI system',
    'private document search AI',
    'on-premise AI for business',
    'local AI deployment for business',
    'private LLM deployment',

    // === Infrastructure — Mac Studio + Apple Silicon specific ===
    'Mac Studio AI node',
    'Mac Studio AI workstation',
    'Apple Silicon AI workstation',
    'Apple Silicon AI server',
    'Mac Studio M4 Max AI',
    'Mac Studio M3 Ultra AI',
    'Mac Studio AI cluster',
    'on-prem Mac Studio AI server',
    'Mac Studio LLM server',
    'private LLM on Mac Studio',
    'local LLM on Mac Studio',
    'Apple Silicon LLM deployment',
    'Apple Silicon private AI',
    'unified memory AI inference',
    'on-prem Apple Silicon AI',
    'private AI appliance',
    'private AI infrastructure',
    'office AI server',
    'on-prem AI workstation',
    'on-prem AI node',
    'dedicated AI compute node',

    // === Capabilities ===
    'document intelligence',
    'document intelligence system',
    'AI document search',
    'natural language document search',
    'retrieval augmented generation for business',
    'AI workflow automation',
    'staff workflow automation',
    'AI internal FAQ',
    'AI SOP assistant',
    'AI staff training assistant',
    'contract summarization AI',
    'invoice extraction AI',
    'OCR document AI',
    'AI report generation',
    'AI email drafting',
    'client-facing chatbot',
    'voice transcription for business',

    // === Industries ===
    'AI for real estate',
    'AI for real estate brokerages',
    'AI for law offices',
    'AI for law firms',
    'AI for medical offices',
    'AI for dental offices',
    'AI for restaurants',
    'AI for franchises',
    'AI for franchise groups',
    'AI for construction companies',
    'AI for cleaning companies',
    'AI for film and media',
    'AI for production companies',
    'AI for property management',
    'AI for insurance agencies',
    'AI for local service businesses',

    // === Bottom-of-funnel intent ===
    'build private AI for my business',
    'custom AI assistant for company',
    'AI consultant for small business',
    'AI workflow consultant',
    'AI implementation consultant',
    'business automation with AI',
    'private AI estimate',
    'private AI pricing',
    'AI system pricing',
    'Mac Studio AI node pricing',
    'Apple Silicon AI server pricing',
    'enterprise private AI cost',
    'how much does private AI cost',

    // === Comparison intent ===
    'private AI vs ChatGPT for business',
    'on-prem AI vs cloud AI',
    'alternative to ChatGPT for business',
    'private alternative to public AI',
  ],
};

export const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.longTitle,
      template: `%s · Darius Henry`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
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
          alt: 'VexaOS — Connected Business Systems by Darius Henry',
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
          alt: 'VexaOS — Connected Business Systems by Darius Henry',
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
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
    verification: {
      // Add your Google Search Console verification code here once issued.
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: siteConfig.url,
      languages: {
        'en-US': siteConfig.url,
        'x-default': siteConfig.url,
      },
    },
    category: 'technology',
    classification: 'Private AI Infrastructure for Businesses',
    other: {
      'og:price:currency': 'USD',
      'og:availability': 'in stock',
    },
  };
};
