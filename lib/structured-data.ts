// Comprehensive Schema.org structured data for maximum SEO impact

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Darius Henry Development',
  url: 'https://dariushenryresume.vercel.app',
  logo: 'https://dariushenryresume.vercel.app/logo.png',
  description: 'Professional full-stack development services specializing in SaaS platforms, AI integration, and enterprise applications',
  founder: {
    '@type': 'Person',
    name: 'Darius Henry',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'dariushenry@hotmail.com',
    contactType: 'Customer Service',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://linkedin.com/in/dariushenry',
    'https://github.com/PulseTV-llc',
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Darius Henry',
  url: 'https://dariushenryresume.vercel.app',
  image: 'https://dariushenryresume.vercel.app/profile.jpg',
  jobTitle: 'Full-Stack Developer & SaaS Architect',
  description: 'Expert full-stack developer with 27+ production applications across web, mobile, and AI platforms. Specialized in React, Next.js, TypeScript, Node.js, Python, and React Native.',
  email: 'dariushenry@hotmail.com',
  sameAs: [
    'https://linkedin.com/in/dariushenry',
    'https://github.com/PulseTV-llc',
  ],
  knowsAbout: [
    'Full-Stack Development',
    'SaaS Architecture',
    'AI Integration',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'React Native',
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
  name: 'Darius Henry - Full-Stack Development Services',
  image: 'https://dariushenryresume.vercel.app/og-image.jpg',
  '@id': 'https://dariushenryresume.vercel.app',
  url: 'https://dariushenryresume.vercel.app',
  telephone: 'Contact via email',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    addressCountry: 'US',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$5,000 - $150,000+',
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
    name: 'Starter Web Development',
    description: 'Professional website development with modern technologies, SEO optimization, and mobile-first design. Perfect for portfolios, business sites, and landing pages.',
    provider: {
      '@type': 'Organization',
      name: 'Darius Henry Development',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '5000-15000',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '5000',
        maxPrice: '15000',
        priceCurrency: 'USD',
      },
      availability: 'https://schema.org/InStock',
      deliveryLeadTime: {
        '@type': 'QuantitativeValue',
        minValue: '2',
        maxValue: '4',
        unitText: 'weeks',
      },
    },
    areaServed: 'Worldwide',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Web & Mobile Application Development',
    description: 'Full-stack web and mobile application development with custom database architecture, user authentication, payment integration, and cloud deployment. Ideal for e-commerce, booking systems, and business tools.',
    provider: {
      '@type': 'Organization',
      name: 'Darius Henry Development',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '15000-50000',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '15000',
        maxPrice: '50000',
        priceCurrency: 'USD',
      },
      availability: 'https://schema.org/InStock',
      deliveryLeadTime: {
        '@type': 'QuantitativeValue',
        minValue: '1',
        maxValue: '3',
        unitText: 'months',
      },
    },
    areaServed: 'Worldwide',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Enterprise SaaS Platform Development',
    description: 'Production-grade SaaS platforms with multi-tenant architecture, AI/ML integration, real-time features, advanced analytics, and subscription management. Similar to Zonely, Speakix, and TapeCoach.',
    provider: {
      '@type': 'Organization',
      name: 'Darius Henry Development',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '50000-150000',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '50000',
        maxPrice: '150000',
        priceCurrency: 'USD',
      },
      availability: 'https://schema.org/InStock',
      deliveryLeadTime: {
        '@type': 'QuantitativeValue',
        minValue: '3',
        maxValue: '6',
        unitText: 'months',
      },
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
      name: 'How much does custom software development cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Custom software development costs range from $5,000-$15,000 for starter projects (websites, landing pages), $15,000-$50,000 for professional applications (e-commerce, booking systems), $50,000-$150,000+ for enterprise SaaS platforms, and custom quotes for complex enterprise solutions. Pricing depends on project complexity, features, timeline, and technology requirements.',
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
      name: 'How long does it take to build a SaaS platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SaaS platform development typically takes 3-6 months for enterprise-grade solutions with multi-tenant architecture, AI integration, and advanced features. Simpler web applications take 1-3 months, while starter websites can be completed in 2-4 weeks. Timeline depends on feature complexity, integrations, and design requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer post-launch support and maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all projects include post-launch support: 2 weeks for starter projects, 30 days for professional applications, and 90 days for enterprise SaaS platforms. Support includes bug fixes, performance monitoring, and minor adjustments. Ongoing maintenance packages are available for long-term partnerships.',
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
      item: 'https://dariushenryresume.vercel.app',
    },
  ],
};
