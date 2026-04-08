import { Metadata } from 'next';

export const siteConfig = {
  name: 'I BUILD REVENUE-READY iOS APPS IN 7 DAYS | Darius Henry',
  description: 'Fix Your Broken App or Get Your MVP Live Fast. iOS, React Native, SaaS Developer. 27+ Apps Shipped (Zonely, Speakix, TapeCoach). Emergency App Rescue, 7-Day MVPs, Revenue-Ready Apps, Production SaaS. Real Estate Tech, EdTech, Entertainment. Taking 2 new clients this month.',
  url: 'https://iamdariushenry.com',
  ogImage: 'https://iamdariushenry.com/og-image.jpg',
  author: {
    name: 'Darius Henry',
    email: 'darius.henry@gmail.com',
    linkedin: 'https://www.linkedin.com/in/darius-henry-292b21373/',
    github: 'https://github.com/PulseTV-llc',
  },
  keywords: [
    // URGENT/CONVERSION KEYWORDS (NEW - PRIORITY)
    'fix broken app',
    'broken app rescue',
    'emergency app repair',
    'agency delivered broken app',
    'stuck app development',
    'app not working',
    '7 day MVP',
    '7-day MVP developer',
    'fast MVP development',
    'quick app development',
    'revenue ready app',
    'revenue-ready iOS app',
    'build app fast',
    'rapid app development',

    // Core developer keywords
    'iOS developer',
    'iOS app developer',
    'full-stack developer',
    'full stack developer',
    'software developer',
    'mobile developer',
    'React Native developer',
    'Swift developer',

    // Technology keywords
    'React developer',
    'Next.js developer',
    'TypeScript developer',
    'Node.js developer',
    'Python developer',
    'JavaScript developer',

    // Specialty keywords
    'SaaS developer',
    'SaaS platform builder',
    'AI integration developer',
    'AI developer',
    'machine learning developer',
    'OpenAI developer',
    'ChatGPT integration',

    // Service keywords (UPDATED - no pricing)
    'custom app development',
    'mobile app development',
    'startup developer',
    'MVP development',
    'MVP builder',
    'prototype developer',

    // Platform keywords
    'AWS developer',
    'Firebase developer',
    'cloud developer',
    'Vercel expert',

    // Industry keywords
    'real estate tech developer',
    'real estate app developer',
    'edtech developer',
    'education app developer',
    'entertainment tech developer',
    'SaaS for real estate',

    // Project-specific
    'Zonely',
    'Zonely developer',
    'Speakix',
    'Speakix developer',
    'TapeCoach',
    'TapeCoach developer',
    'PulseTV developer',

    // Solution keywords
    'subscription platform',
    'Stripe integration',
    'payment integration',
    'multi-tenant SaaS',
    'SaaS architecture',

    // Hiring keywords
    'hire iOS developer',
    'hire app developer',
    'freelance iOS developer',
    'contract developer',
    'remote developer',
    'independent developer',

    // Problem-solving keywords (NEW)
    'app development rescue',
    'fix my app',
    'complete unfinished app',
    'app development help',
    'startup app developer',
    'validate app idea',
    'fast app launch',
  ],
};

export const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
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
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: 'Darius Henry - Full-Stack Developer Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: '@dariushenry',
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
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    verification: {
      google: 'your-google-verification-code', // Add after Google Search Console setup
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
    alternates: {
      canonical: siteConfig.url,
    },
    category: 'technology',
  };
};
