/**
 * Founder credibility content — relocated from the original resume/portfolio
 * homepage (components/Skills.tsx, WhyMe.tsx, AboutSection.tsx, Hero.tsx) and
 * reframed for the custom business operating system positioning.
 *
 * RULE: no invented accomplishments, customers, revenue, certifications, or
 * employees. FOUNDER_STATS are carried over verbatim from the original site's
 * Skills section — confirm them before adding new ones. Project detail
 * continues to come from data/projects.ts.
 */

export const FOUNDER = {
  name: 'Darius Henry',
  role: 'Founder & Chief Architect',
  company: 'VexaOS',
  location: 'United States',
  linkedin: 'https://www.linkedin.com/in/darius-henry-292b21373/',
  github: 'https://github.com/PulseTV-llc',
  email: 'support@vexaos.io',
  headline:
    'A hands-on technical founder designing systems across software, mobile applications, connected hardware, business operations, media technology, and digital infrastructure.',
  bio: [
    'Darius Henry is the founder and chief architect of VexaOS. He designs and builds across the whole stack a real operation depends on — web control centers, native mobile apps, Android devices and kiosks, data models, integrations, and the hardware on the wall.',
    'The same problem kept appearing: businesses with genuinely complex operations, running on disconnected tools, without an internal software team to fix it. The answer was never another app. It was a reusable architecture underneath — identity, organizations, permissions, devices, data — and a custom system on top, designed around how each company actually works.',
    'He remains hands-on in every VexaOS build: architecture, data modeling, native apps, the device layer, and the product decisions that determine whether a system holds up on the busiest day of the week.',
  ],
} as const;

/** Carried over from the original Skills section. */
export const FOUNDER_STATS = [
  { value: '27+', label: 'Production applications shipped' },
  { value: '6+', label: 'SaaS platforms built end to end' },
  { value: '15+', label: 'Years across web, mobile, and media' },
] as const;

/** Capability areas the founder builds across — rendered as chips.
 *  Kept at the capability level on purpose; the underlying stack isn't disclosed. */
export const FOUNDER_STACK = [
  'Web platforms',
  'iOS & Android apps',
  'Cross-platform apps',
  'Real-time cloud backends',
  'Databases & security',
  'APIs & webhooks',
  'Payments',
  'Hardware integration',
  'NFC/RFID',
  'IoT',
  'AI',
  'UI/UX',
  'Business operations systems',
] as const;

export const FOUNDER_EXPERTISE = [
  {
    title: 'Platform & architecture',
    icon: 'Layers',
    items: [
      'Multi-tenant SaaS architecture',
      'Row-level security and role-based access',
      'Real-time data modeling and sync',
      'Organization and location hierarchies',
      'Performance and scale optimization',
    ],
  },
  {
    title: 'Web & control centers',
    icon: 'Code',
    items: [
      'Next.js and React',
      'TypeScript',
      'Tailwind CSS and design systems',
      'Operator dashboards and command-center UI',
      'UI/UX for high-pressure environments',
    ],
  },
  {
    title: 'Mobile & devices',
    icon: 'Smartphone',
    items: [
      'Swift and SwiftUI',
      'Kotlin, Jetpack Compose, and Android',
      'React Native',
      'Android kiosk and wall-display deployment',
      'Offline-tolerant device workflows',
    ],
  },
  {
    title: 'Backend & data',
    icon: 'Server',
    items: [
      'Node.js',
      'Supabase and PostgreSQL',
      'Firebase Firestore and Cloud Functions',
      'REST APIs, webhooks, and integrations',
      'Data migration',
    ],
  },
  {
    title: 'Hardware & IoT',
    icon: 'Cpu',
    items: [
      'NFC/RFID and QR identification',
      'Barcode scanning workflows',
      'Device registries and remote configuration',
      'Sensors and environmental telemetry',
      'Touchscreen and signage hardware',
    ],
  },
  {
    title: 'AI, automation & media',
    icon: 'BrainCircuit',
    items: [
      'LLM integration in production systems',
      'Document intelligence and extraction',
      'Workflow automation',
      'Video production and product storytelling',
      'Digital signage and display media',
    ],
  },
] as const;

export const FOUNDER_PRINCIPLES = [
  {
    icon: 'Workflow',
    title: 'Build around the operation',
    detail:
      'Software should fit the business, not the other way around. The workflow is understood before a single screen is designed.',
  },
  {
    icon: 'Layers',
    title: 'Solve the foundation once',
    detail:
      'Identity, permissions, devices, and the data model are solved in the platform — so each client’s budget goes into what makes their operation different.',
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
      'From the database to the touchscreen on the wall. When one partner is accountable for all of it, the operator stops being the integrator.',
  },
] as const;
