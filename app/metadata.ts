import { Metadata } from 'next';

export const siteConfig = {
  name: 'Darius Henry - Full-Stack Developer & SaaS Builder',
  description: 'Expert full-stack developer specializing in SaaS platforms, AI integration, and mobile apps. 27+ production applications including Zonely, Speakix, and TapeCoach. React, Next.js, TypeScript, Node.js, Python, React Native. Custom software development from $3K to enterprise solutions.',
  url: 'https://dariushenryresume.vercel.app',
  ogImage: 'https://dariushenryresume.vercel.app/og-image.jpg',
  author: {
    name: 'Darius Henry',
    email: 'darius.henry@gmail.com',
    linkedin: 'https://www.linkedin.com/in/darius-henry-292b21373/',
    github: 'https://github.com/PulseTV-llc',
  },
  keywords: [
    // Core developer keywords
    'full-stack developer',
    'full stack developer',
    'software developer',
    'software engineer',
    'web developer',
    'mobile developer',

    // Technology keywords
    'React developer',
    'Next.js developer',
    'TypeScript developer',
    'Node.js developer',
    'Python developer',
    'React Native developer',
    'JavaScript developer',

    // Specialty keywords
    'SaaS developer',
    'SaaS platform builder',
    'AI integration developer',
    'AI developer',
    'machine learning developer',
    'OpenAI developer',
    'ChatGPT integration',

    // Service keywords
    'custom software development',
    'web application development',
    'mobile app development',
    'enterprise software development',
    'startup developer',
    'MVP development',
    'API development',
    'database developer',

    // Platform keywords
    'Vercel deployment',
    'AWS developer',
    'Firebase developer',
    'cloud developer',

    // Industry keywords
    'real estate tech developer',
    'edtech developer',
    'entertainment tech developer',
    'e-commerce developer',
    'fintech developer',
    'healthtech developer',

    // Project-specific
    'Zonely developer',
    'Speakix developer',
    'TapeCoach developer',
    'PulseTV developer',

    // Solution keywords
    'subscription platform developer',
    'Stripe integration developer',
    'payment gateway integration',
    'authentication developer',
    'multi-tenant SaaS',

    // Hiring keywords
    'hire full-stack developer',
    'freelance developer',
    'contract developer',
    'remote developer',
    'consultant developer',

    // Location-based (add if applicable)
    'USA developer',
    'US-based developer',
    'English-speaking developer',
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
