// Comprehensive Schema.org structured data for maximum SEO impact

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Darius Henry - iOS & SaaS Development',
  url: 'https://iamdariushenry.com',
  logo: 'https://iamdariushenry.com/logo.png',
  description: 'Revenue-ready iOS apps in 7 days. Fix broken apps, build MVPs fast, create production SaaS platforms. 27+ apps shipped. Emergency app rescue available.',
  founder: {
    '@type': 'Person',
    name: 'Darius Henry',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'darius.henry@gmail.com',
    contactType: 'Customer Service',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.linkedin.com/in/darius-henry-292b21373/',
    'https://github.com/PulseTV-llc',
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Darius Henry',
  url: 'https://iamdariushenry.com',
  image: 'https://iamdariushenry.com/profile.jpg',
  jobTitle: 'iOS Developer & SaaS Architect',
  description: 'iOS and SaaS developer who builds revenue-ready apps in 7 days. 27+ production apps shipped including Zonely, Speakix, and TapeCoach. Emergency app rescue, MVP development, and production SaaS platforms.',
  email: 'darius.henry@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/darius-henry-292b21373/',
    'https://github.com/PulseTV-llc',
  ],
  knowsAbout: [
    'iOS Development',
    'React Native',
    'SaaS Architecture',
    'AI Integration',
    'MVP Development',
    'App Rescue',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'Swift',
    'OpenAI',
    'AWS',
    'Firebase',
    'PostgreSQL',
    'MongoDB',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Software Engineering',
  },
};

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Darius Henry - iOS & SaaS Development Services',
  image: 'https://iamdariushenry.com/og-image.jpg',
  '@id': 'https://iamdariushenry.com',
  url: 'https://iamdariushenry.com',
  telephone: 'Contact via email',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Worldwide',
  },
  geo: {
    '@type': 'GeoCoordinates',
    addressCountry: 'Worldwide',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  description: 'Revenue-ready iOS apps in 7 days. Emergency app rescue, MVP development, and production SaaS platforms. Taking 2 new clients this month.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '27',
  },
};

export const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '7-Day MVP Development',
    description: 'Validate your idea FAST without wasting months on development. Working iOS or web app delivered in 7 days or less with core features, authentication, database, and payment integration. Perfect for startups needing proof of concept.',
    provider: {
      '@type': 'Organization',
      name: 'Darius Henry - iOS & SaaS Development',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/LimitedAvailability',
      availabilityStarts: new Date().toISOString(),
      description: 'Limited to 2 clients this month',
    },
    areaServed: 'Worldwide',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Revenue-Ready App Development',
    description: 'Full iOS or web app that makes money NOW, not 6 months from now. Complete with Stripe/PayPal integration, user accounts, admin dashboard, analytics, and cloud hosting. Start making money within 1-2 months.',
    provider: {
      '@type': 'Organization',
      name: 'Darius Henry - iOS & SaaS Development',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      description: 'Most popular tier - fast delivery (1-2 months)',
    },
    areaServed: 'Worldwide',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Production SaaS Platform Development',
    description: 'Zonely/Speakix level platform that crushes competitors. Multi-platform (iOS + Web + macOS), AI integration, full subscription system, multi-tenant architecture, real-time features, admin dashboards. Production-ready in 90 days.',
    provider: {
      '@type': 'Organization',
      name: 'Darius Henry - iOS & SaaS Development',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      description: 'Flagship quality - 90 day delivery',
    },
    areaServed: 'Worldwide',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fix Your Broken App',
    description: 'Emergency app rescue service. Agency disappeared or delivered garbage? I will fix it FAST. Audit existing codebase, fix critical bugs, complete unfinished features, get your app live on App Store, add missing payments, deploy to production.',
    provider: {
      '@type': 'Organization',
      name: 'Darius Henry - iOS & SaaS Development',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      description: 'Emergency service available - stop bleeding money on broken apps',
    },
    areaServed: 'Worldwide',
  },
];

export const portfolioItemSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zonely - Real Estate Intelligence Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '100',
    },
    description: 'AI-powered real estate deal analysis platform with ROI calculators, market insights, and subscription management.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Speakix - AI Language Learning Platform',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '250',
    },
    description: 'Comprehensive language learning with AI tutors, 150+ modules, and spaced repetition system for English and Chinese.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TapeCoach - AI Audition Analysis',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '150',
    },
    description: 'AI-powered self-tape audition analyzer for actors with real-time performance feedback using computer vision.',
  },
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can you really build an app in 7 days?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! The 7-Day MVP service delivers a working iOS or web app with core features, user authentication, database setup, and payment integration ready. It\'s designed to validate your idea fast without wasting months on development. Not all features will be included - we focus on the essential features needed to test your concept with real users.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my agency delivered a broken app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The "Fix Your Broken App" service is specifically designed for this situation. I\'ll audit your existing codebase, fix critical bugs and crashes, complete unfinished features, refactor terrible code, add missing payment integration, and deploy to production. I\'ve rescued 5+ broken projects this year - stop bleeding money on a broken app and get it fixed fast.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies do you use for development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I specialize in modern tech stacks including React and Next.js for frontend, Node.js and Python for backend, TypeScript for type safety, React Native for mobile apps, PostgreSQL and MongoDB for databases, AWS and Vercel for cloud hosting, OpenAI for AI integration, and Stripe for payment processing. All projects use production-grade, scalable architecture.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a revenue-ready app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Revenue-Ready Apps are delivered in 1-2 months (not 6-12 months like most agencies). This includes full iOS/web app with Stripe payment integration, user accounts, admin dashboard, analytics, cloud hosting, and 30 days of support. Production SaaS platforms take approximately 90 days. 7-Day MVPs are delivered in a week or less.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in post-launch support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All projects include premium support: 7-Day MVPs include basic support, Revenue-Ready Apps include 30 days of support, and Production SaaS platforms include 90 days of premium support. Support covers bug fixes, performance monitoring, deployment assistance, and feature adjustments. Emergency app rescue service includes ongoing support to keep your app running.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you integrate AI and machine learning into applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, I specialize in AI/ML integration using OpenAI GPT-4, custom chatbots, natural language processing, computer vision, and custom AI models. Examples include TapeCoach (AI audition analysis with computer vision) and Speakix (AI language tutors). AI features can be added to any application tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you build both web and mobile applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, I build responsive web applications using React and Next.js, and cross-platform mobile apps using React Native (iOS and Android from one codebase). Examples include Zonely (React Native mobile app), PulseTV (iOS/Android apps), and Speakix (web platform). All applications are mobile-first and responsive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries do you have experience in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I have extensive experience across multiple industries: Real Estate Tech (Zonely - deal analysis platform), EdTech (Speakix - language learning), Entertainment (TapeCoach - audition analysis, PulseTV - streaming), E-commerce (multiple platforms), Talent Management (ActorsDB), and general SaaS. Open to all industries and business types.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you handle project communication and updates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I use Agile methodology with 2-week sprints, providing daily or weekly progress updates based on preference. Regular demo calls show working features iteratively. Communication via Slack, email, or preferred platform. Transparent progress tracking ensures you\'re always informed of development status and milestones.',
      },
    },
  ],
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://iamdariushenry.com',
    },
  ],
};
