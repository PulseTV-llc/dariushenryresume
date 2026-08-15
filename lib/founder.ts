/**
 * Founder credibility content — relocated from the original resume/portfolio
 * homepage (components/Skills.tsx, WhyMe.tsx, AboutSection.tsx, Hero.tsx).
 *
 * The homepage now represents VexaOS the company. This content was NOT deleted;
 * it lives on /about/founder, reframed as the founder's track record rather
 * than a personal job-seeking resume. Project detail continues to come from
 * data/projects.ts.
 */

export const FOUNDER = {
  name: 'Darius Henry',
  role: 'Founder & Chief Architect, VexaOS',
  location: 'United States',
  linkedin: 'https://www.linkedin.com/in/darius-henry-292b21373/',
  github: 'https://github.com/PulseTV-llc',
  email: 'support@vexaos.io',
  bio: [
    'Darius Henry founded VexaOS after a decade of building software for businesses that were drowning in disconnected tools. The pattern repeated in every engagement: a scheduling app that could not see the point of sale, an inventory sheet nobody trusted, and a front counter absorbing the cost of both.',
    'The answer was never another integration. It was one platform underneath all of it — a single identity, a single data layer, and products built on top rather than bolted together. ShyftGrid was the first proof of that architecture; VexaOS is what it became.',
    'He remains hands-on across the platform: architecture, data modeling, the device layer, and the product decisions that determine whether an operator actually uses the software on a busy Saturday.',
  ],
} as const;

/** Preserved from the original Skills section. */
export const FOUNDER_STATS = [
  { value: '27+', label: 'Production applications shipped' },
  { value: '6+', label: 'SaaS platforms built end to end' },
  { value: '15+', label: 'Years across web, mobile, and media' },
  { value: '5', label: 'Products now running on VexaOS' },
] as const;

/** Preserved from the original Skills section, regrouped for a company page. */
export const FOUNDER_EXPERTISE = [
  {
    title: 'Platform & architecture',
    icon: 'Layers',
    items: [
      'Multi-tenant SaaS architecture',
      'Real-time data modeling and sync',
      'Role-based permission systems',
      'Subscription and billing systems',
      'Performance and scale optimization',
    ],
  },
  {
    title: 'Web & control surfaces',
    icon: 'Code',
    items: [
      'React 19 and Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Design systems and UI architecture',
      'Dashboard and operator tooling',
    ],
  },
  {
    title: 'Mobile & devices',
    icon: 'Smartphone',
    items: [
      'SwiftUI and native iOS',
      'Android touchscreen and kiosk deployment',
      'StoreKit 2 and in-app purchase',
      'AVFoundation and Vision',
      'Offline-tolerant device workflows',
    ],
  },
  {
    title: 'Backend & data',
    icon: 'Server',
    items: [
      'Node.js and Express',
      'Firebase Firestore and Cloud Functions',
      'Security rules and access control',
      'REST API design',
      'Data migration and integration',
    ],
  },
  {
    title: 'AI & automation',
    icon: 'Cpu',
    items: [
      'LLM integration in production systems',
      'Document intelligence and extraction',
      'Speech recognition and vision',
      'Workflow automation',
      'Private and on-premise AI deployment',
    ],
  },
  {
    title: 'Media & brand',
    icon: 'Film',
    items: [
      'Video production and direction',
      'Product and brand storytelling',
      'Customer-facing content systems',
      'Digital signage and display media',
      'Creative direction',
    ],
  },
] as const;

/** Preserved from the original "Why me" section, reframed as operating principles. */
export const FOUNDER_PRINCIPLES = [
  {
    icon: 'Gauge',
    title: 'Ship, then refine',
    detail:
      'Working software in front of real operators beats a longer specification. Every VexaOS product was used in a real business before it was sold to anyone.',
  },
  {
    icon: 'Layers',
    title: 'Build the foundation once',
    detail:
      'Identity, permissions, and the data model are not per-product concerns. Getting them right once is why five products behave like one system.',
  },
  {
    icon: 'Users',
    title: 'Design for the busy day',
    detail:
      'Software that only works when things are calm is not operational software. The test is a Saturday rush, not a demo.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Own the whole stack',
    detail:
      'From the data layer to the touchscreen on the wall. When one vendor is accountable for all of it, the operator stops being the integrator.',
  },
] as const;
