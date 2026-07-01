// Enterprise Schema.org structured data for the Private AI Workflow Systems site.
//
// This file is the source of truth for every JSON-LD block emitted by the
// site. Each export is a single schema object (or array of objects) that
// app/layout.tsx serializes into <script type="application/ld+json">.
//
// SEO strategy:
// 1. Identity      — Organization, Person, ProfessionalService, LocalBusiness, WebSite
// 2. Page          — WebPage, BreadcrumbList, Speakable
// 3. Catalog       — Service (×6), ItemList for service catalog and industries
// 4. Pricing       — AggregateOffer + Offer per tier (services pricing only)
// 5. Conversion    — HowTo for the estimator process
// 6. Authority     — FAQPage with substantive long-form answers

import { aiSystemTiers } from './ai-tiers';

const SITE_URL = 'https://iamdariushenry.com';
const SITE_NAME = 'Private AI Workflow Systems';
const PROVIDER_NAME = 'Darius Henry — Private AI Workflow Systems';
const PROVIDER_DESCRIPTION =
  'Custom private AI workflow systems for businesses, powered by custom Mac Studio nodes running Apple Silicon with large unified memory (Mac Studio M4 Max through M3 Ultra). Private document search, custom business assistants, workflow automation, and on-prem AI infrastructure for real estate, law, medical, dental, restaurant, franchise, construction, cleaning, film/media, property management, and insurance businesses.';

/* ============================================================
 *  1. IDENTITY
 * ============================================================ */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: PROVIDER_NAME,
  alternateName: ['Darius Henry AI', 'Private AI Workflow Systems'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.jpg`,
  description: PROVIDER_DESCRIPTION,
  founder: {
    '@type': 'Person',
    name: 'Darius Henry',
  },
  foundingDate: '2024',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'support@vexaos.io',
      contactType: 'sales',
      availableLanguage: ['English'],
      areaServed: ['US', 'CA', 'GB', 'AU', 'Worldwide'],
    },
    {
      '@type': 'ContactPoint',
      email: 'support@vexaos.io',
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/darius-henry-292b21373/',
    'https://github.com/PulseTV-llc',
  ],
  knowsAbout: [
    'Private AI Infrastructure',
    'Mac Studio AI Node Deployment',
    'Apple Silicon AI Infrastructure',
    'Mac Studio M3 Ultra Nodes',
    'Apple Silicon Private AI',
    'Local LLM on Mac Studio',
    'Document Intelligence',
    'Retrieval-Augmented Generation',
    'Workflow Automation',
    'Business AI Assistants',
    'Vector Search',
    'Document OCR',
    'Role-Based Access Control',
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#person`,
  name: 'Darius Henry',
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  jobTitle: 'Private AI Workflow Systems Builder',
  worksFor: { '@id': `${SITE_URL}#organization` },
  description:
    'Filmmaker, app developer, and business systems builder. Designs and deploys private AI workflow systems on custom Mac Studio nodes running Apple Silicon for real estate, law, medical/dental, restaurant, construction, franchise, media, and local service businesses.',
  email: 'support@vexaos.io',
  sameAs: [
    'https://www.linkedin.com/in/darius-henry-292b21373/',
    'https://github.com/PulseTV-llc',
  ],
  knowsAbout: [
    'Private AI Infrastructure',
    'Mac Studio AI Node Deployment',
    'Apple Silicon AI Infrastructure',
    'Local LLM on Mac Studio',
    'Document Intelligence',
    'Workflow Automation',
    'Business AI Assistants',
    'App Development',
    'Video and Media Production',
    'Business Process Automation',
  ],
  knowsLanguage: ['en-US'],
};

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}#service-business`,
  name: PROVIDER_NAME,
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: '+1-000-000-0000',
  email: 'support@vexaos.io',
  priceRange: '$$$$',
  description: PROVIDER_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Australia' },
  ],
  serviceType: [
    'Private AI Assistant Development',
    'Document Intelligence Systems',
    'Workflow Automation',
    'Custom Mac Studio AI Node Deployment',
    'Custom AI Dashboards',
    'Ongoing AI Optimization',
  ],
  hasOfferCatalog: { '@id': `${SITE_URL}#offer-catalog` },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};

/* ============================================================
 *  2. WEBSITE + SITELINKS SEARCH
 * ============================================================ */

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: PROVIDER_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}#webpage`,
  url: SITE_URL,
  name: 'Private AI Workflow Systems for Businesses',
  description: PROVIDER_DESCRIPTION,
  isPartOf: { '@id': `${SITE_URL}#website` },
  about: { '@id': `${SITE_URL}#organization` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
  },
  inLanguage: 'en-US',
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.gradient-text'],
  },
  mainContentOfPage: {
    '@type': 'WebPageElement',
    cssSelector: 'main',
  },
};

/* ============================================================
 *  3. SERVICE CATALOG
 * ============================================================ */

const servicesList = [
  {
    name: 'Private AI Assistant',
    description:
      "A company-specific AI assistant trained around business documents, policies, services, and workflows. Built on dedicated Mac Studio nodes running Apple Silicon for privacy, control, and tone fidelity to the business.",
    serviceType: 'Private AI Assistant Development',
  },
  {
    name: 'Document Intelligence System',
    description:
      'Upload and search PDFs, contracts, invoices, reports, spreadsheets, SOPs, training material, and scanned files. Natural-language Q&A over private company knowledge with optional OCR ingestion, accelerated locally on Apple Silicon.',
    serviceType: 'Document Intelligence',
  },
  {
    name: 'Staff Workflow Automation',
    description:
      'AI-driven drafting of customer replies, summaries, checklists, internal answers, and repeatable workflows for business teams. Reduces repetitive admin work and onboarding cost.',
    serviceType: 'Workflow Automation',
  },
  {
    name: 'Custom Mac Studio AI Node Deployment',
    description:
      'Planning and deployment of custom Mac Studio nodes running Apple Silicon — Mac Studio M4 Max through M3 Ultra with large unified memory — sized to team count, usage, privacy requirements, and workload. Scales from a single node up to 8-node clusters.',
    serviceType: 'AI Infrastructure Deployment',
  },
  {
    name: 'Custom AI Dashboard',
    description:
      'Optional web dashboard for employees, admins, document upload, AI chat, user permissions, audit logs, and workflow management.',
    serviceType: 'Custom Software Development',
  },
  {
    name: 'Monthly AI Optimization',
    description:
      'Ongoing prompt refinement, document refreshes, staff support, workflow expansion, and system monitoring for deployed private AI workflow systems.',
    serviceType: 'Managed Services',
  },
];

export const serviceSchemas = servicesList.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  serviceType: s.serviceType,
  description: s.description,
  provider: { '@id': `${SITE_URL}#organization` },
  areaServed: 'Worldwide',
  category: 'Business AI Infrastructure',
  brand: { '@id': `${SITE_URL}#organization` },
}));

export const serviceCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${SITE_URL}#offer-catalog`,
  name: 'Private AI Workflow Systems — Service Catalog',
  itemListElement: servicesList.map((s, i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name: s.name,
      description: s.description,
      provider: { '@id': `${SITE_URL}#organization` },
    },
  })),
};

/* ============================================================
 *  4. PRICING — AGGREGATE OFFER + PER-TIER OFFER (SERVICES ONLY)
 * ============================================================
 *
 * AggregateOffer covers services pricing (setupRange) only. Hardware
 * (the BOM range stored on each tier as hardwareRange) is informational
 * copy on the page — it varies too much per build to commit to a single
 * structured Offer. Keeping AggregateOffer scoped to services prevents
 * schema drift and avoids implying a fixed hardware quote in search
 * results.
 */

// Extract numeric low/high from labels like "$4,500–$7,500" or "$125,000–$175,000+".
function parsePriceRange(label: string): { low: number; high: number } | null {
  const numbers = label.match(/\$?([\d,]+)/g);
  if (!numbers || numbers.length === 0) return null;
  const parsed = numbers.map((n) => Number(n.replace(/[^\d]/g, '')));
  if (parsed.some(Number.isNaN)) return null;
  return {
    low: parsed[0],
    high: parsed[parsed.length - 1],
  };
}

const tierOffers = aiSystemTiers
  .map((tier) => {
    const range = parsePriceRange(tier.setupRange);
    if (!range) return null;
    return {
      '@type': 'Offer' as const,
      name: tier.label,
      description: `${tier.label} — ${tier.users} users, ${
        typeof tier.nodes === 'number'
          ? `${tier.nodes} Mac Studio node${tier.nodes === 1 ? '' : 's'} on ${tier.gpuSpec}`
          : `custom Mac Studio node count on ${tier.gpuSpec}`
      }. Services setup ${tier.setupRange}, hardware estimate ${tier.hardwareRange}, monthly support ${tier.monthly}. ${tier.bestFor}.`,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        minPrice: range.low,
        maxPrice: range.high,
      },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        unitText: 'users',
        value: tier.users,
      },
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}#pricing`,
    };
  })
  .filter((o): o is NonNullable<typeof o> => o !== null);

const offerLowestPrice = tierOffers.reduce(
  (min, o) => Math.min(min, (o.priceSpecification as { minPrice: number }).minPrice),
  Infinity
);
const offerHighestPrice = tierOffers.reduce(
  (max, o) => Math.max(max, (o.priceSpecification as { maxPrice: number }).maxPrice),
  0
);

export const aggregateOfferSchema = {
  '@context': 'https://schema.org',
  '@type': 'AggregateOffer',
  '@id': `${SITE_URL}#aggregate-offer`,
  name: 'Private AI Workflow System — Tier Services Pricing',
  description:
    'Services setup pricing for Private AI Workflow Systems ranges from Starter Private AI for small teams to Full Private AI Infrastructure for enterprise deployments. Each tier targets a specific Mac Studio class (Apple Silicon M4 Max through M3 Ultra). Hardware is billed separately.',
  priceCurrency: 'USD',
  lowPrice: offerLowestPrice,
  highPrice: offerHighestPrice,
  offerCount: tierOffers.length,
  offers: tierOffers,
  itemOffered: {
    '@type': 'Service',
    name: 'Private AI Workflow System',
    provider: { '@id': `${SITE_URL}#organization` },
  },
  seller: { '@id': `${SITE_URL}#organization` },
  url: `${SITE_URL}#pricing`,
};

/* ============================================================
 *  5. INDUSTRY ITEM LIST
 * ============================================================ */

const industries = [
  'Real Estate Companies',
  'Law Offices',
  'Medical & Dental Offices',
  'Restaurants & Franchise Groups',
  'Construction Companies',
  'Cleaning Companies',
  'Film & Media Companies',
  'Property Management Companies',
  'Local Service Businesses',
  'Insurance Agencies',
];

export const industriesItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}#industries`,
  name: 'Industries served by Private AI Workflow Systems',
  description:
    'Industries with active Private AI Workflow System deployments and templates: real estate, law, medical/dental, restaurants and franchises, construction, cleaning, film/media, property management, local service, and insurance.',
  numberOfItems: industries.length,
  itemListOrder: 'https://schema.org/ItemListUnordered',
  itemListElement: industries.map((name, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: `Private AI Workflow System for ${name}`,
      provider: { '@id': `${SITE_URL}#organization` },
      areaServed: 'Worldwide',
    },
  })),
};

/* ============================================================
 *  6. HOW-TO — THE ESTIMATOR FUNNEL
 * ============================================================ */

export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${SITE_URL}#how-to-estimate`,
  name: 'How to estimate a Private AI Workflow System for your business',
  description:
    'Answer a few business questions on this site and the estimator generates a recommended tier, Mac Studio node count, Mac Studio spec, services setup price range, hardware estimate range, monthly support estimate, and planning notes.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Share business information',
      text: 'Provide business name, contact, industry, and the number of locations the system needs to support.',
      url: `${SITE_URL}#estimate`,
    },
    {
      '@type': 'HowToStep',
      name: 'Select team size',
      text: 'Choose the bucket of users that will access the private AI system (1–5, 6–15, 16–30, 31–50, 51–75, 76–100, 101–150, 151–250, or 250+).',
      url: `${SITE_URL}#estimate`,
    },
    {
      '@type': 'HowToStep',
      name: 'Describe documents and knowledge',
      text: 'Estimate document volume and select the document types the AI should ingest — PDFs, Word, Excel, contracts, invoices, SOPs, policies, customer messages, scanned paperwork, and more.',
      url: `${SITE_URL}#estimate`,
    },
    {
      '@type': 'HowToStep',
      name: 'Pick workflow goals',
      text: 'Select the workflows the AI should support: document search, customer replies, lead follow-up, contract summarization, staff training, internal FAQ, report generation, email drafting, content generation, invoice extraction, client-facing chatbot, voice transcription.',
      url: `${SITE_URL}#estimate`,
    },
    {
      '@type': 'HowToStep',
      name: 'Set security and deployment preferences',
      text: 'Indicate document sensitivity, role-based access needs, and whether the deployment should be on-prem Mac Studio nodes, hybrid on-prem + cloud, or undecided.',
      url: `${SITE_URL}#estimate`,
    },
    {
      '@type': 'HowToStep',
      name: 'Review integrations and budget',
      text: 'Pick existing systems the AI should connect to (Google Drive, Dropbox, OneDrive, Gmail, Outlook, CRM, Zapier, etc.) and provide budget range plus launch timeline.',
      url: `${SITE_URL}#estimate`,
    },
    {
      '@type': 'HowToStep',
      name: 'Receive your estimate',
      text: 'The estimator returns a recommended tier, Mac Studio node count, Mac Studio spec (M4 Max through M3 Ultra), services setup price range, hardware estimate range, monthly support estimate, the workflows the system will handle, and planning notes specific to your answers.',
      url: `${SITE_URL}#estimate`,
    },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Custom Mac Studio AI Node Cluster' },
    { '@type': 'HowToTool', name: 'Apple Silicon AI Acceleration (Mac Studio M4 Max / M3 Ultra)' },
    { '@type': 'HowToTool', name: 'Private Document Search Engine' },
  ],
  supply: [
    { '@type': 'HowToSupply', name: 'Company documents and policies' },
    { '@type': 'HowToSupply', name: 'Team size and integration list' },
  ],
};

/* ============================================================
 *  7. AUTHORITY — EXPANDED FAQ
 * ============================================================ */

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Private AI Workflow System?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Private AI Workflow System turns scattered business knowledge — PDFs, policies, contracts, invoices, SOPs, customer messages, and internal procedures — into a private, searchable AI assistant your team can actually use. It is built around your specific documents and workflows, runs on dedicated Mac Studio nodes running Apple Silicon, and keeps sensitive files under company control rather than being pasted into public AI tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why use custom Mac Studio AI nodes instead of public AI tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A custom Mac Studio AI node deployment gives the business its own private AI infrastructure: a Mac Studio running Apple Silicon (M-series Max or Ultra) with large unified memory sitting inside the office, studio, equipment room, or controlled technology environment. Sensitive files stay under company control, models and embeddings run locally on the Mac Studio, the system can be tuned around your own documents and policies, and additional nodes (or higher Mac Studio specs) can be added as users, document volume, and workloads grow. The business gets a visible AI infrastructure asset instead of only another monthly software subscription.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from ChatGPT, Copilot, or other public AI tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Public AI tools are general-purpose and run on shared infrastructure outside your company. A Private AI Workflow System is built specifically around your business — your documents, your policies, your tone of voice, your customer workflows — and the model and document store can run on Mac Studio nodes running Apple Silicon physically located in your office. That keeps confidential information off public model training paths, supports role-based access for staff, and enables custom workflows that public chatbots cannot perform.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Mac Studio configurations are used in the AI nodes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Mac Studio spec scales with tier. Starter tiers use a Mac Studio M4 Max (64GB unified memory). Mid tiers step up to Mac Studio M4 Max (128GB) and Mac Studio M3 Ultra (96GB). Larger tiers use Mac Studio M3 Ultra (256GB unified memory), often as dual-node configurations. Enterprise tiers use Mac Studio M3 Ultra (512GB), and the Custom Enterprise tier extends to multi-node Mac Studio M3 Ultra clusters. The estimator on this site recommends the right Mac Studio spec based on your team size and workload.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to buy the hardware separately?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pricing is two-track: services (build, integration, training, deployment) are quoted separately from hardware (the Mac Studio nodes themselves). The client can procure hardware directly, or hardware procurement can be coordinated as part of the engagement. Every tier on this site displays both numbers — Services setup price range and Hardware estimate range — so you see the full picture up front.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a Private AI Workflow System cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Services setup scales with team size and the number of Mac Studio nodes deployed. Starter Private AI for 1–5 users is $4,500–$7,500 services with about $5,000–$9,000 hardware (single Mac Studio M4 Max node) and $750/mo support. Small Team AI for 6–15 users is $9,500–$15,000 services with $12,000–$22,000 hardware. Mid tiers (Department AI through Advanced Business AI) range from $17,500 up to $65,000 services with hardware from $25,000 up to $130,000. Enterprise tiers scale up to Full Private AI Infrastructure at $125,000+ services and $350,000–$550,000 hardware (multi-node Mac Studio M3 Ultra cluster). Final pricing depends on document volume, security requirements, integrations, OCR needs, custom dashboards, and the Mac Studio spec selected.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many AI nodes does my business need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As a rule of thumb: 1 node for 1–5 users, 2 nodes for 6–15 users, 3 nodes for 16–30 users, 4 nodes for 31–50 users, 5 nodes for 51–75 users, 6 nodes for 76–100 users, 7 nodes for 101–150 users, and 8 nodes for 151–250 users. Larger deployments use a custom architecture. Document volume, OCR needs, client-facing chatbot workloads, and concurrency requirements can shift the recommendation, as can the Mac Studio spec chosen — a higher-spec Mac Studio M3 Ultra can do the work of several entry Mac Studio nodes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can the system search our PDFs, contracts, SOPs, and scanned documents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Document Intelligence component ingests PDFs, Word documents, Excel and CSV files, contracts, invoices, SOPs, training manuals, policies, customer messages, emails, and images or scanned paperwork through OCR. Staff can ask plain-English questions like "What does our refund policy say?", "Summarize this contract in plain English", or "Find the training instructions for new staff", and the system answers from your private document set.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this safe for businesses with sensitive or regulated information?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. For businesses handling sensitive documents, the recommended configuration is an on-prem Mac Studio node deployment with role-based access, audit controls, encrypted backups, and stricter admin permissions. Models and document indexes run locally on the Mac Studio; files do not leave the company environment. This is the configuration used for law offices, medical and dental practices, insurance agencies, and other businesses with confidentiality requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which industries use Private AI Workflow Systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Real estate companies, law offices, medical and dental offices, restaurants and franchise groups, construction companies, cleaning companies, film and media companies, property management companies, local service businesses, and insurance agencies. Each industry has its own document mix and workflow templates: real estate uses leases and inspection reports, law offices use case files and intake responses, medical and dental use procedures and training, restaurants use SOPs and menu information, and so on.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can the AI draft customer replies, social posts, and sales follow-ups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Workflow automation includes drafting customer service replies in the company tone, generating lead follow-up emails, creating sales scripts and talk-tracks, writing social media posts from menu items or new listings, producing report summaries, and turning invoice batches into structured summaries. The assistant is tuned to the business voice, not generic AI output.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a client-facing chatbot be built on top of this?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with guardrails. A client-facing chatbot is offered as part of the workflow goals and requires additional approval workflows, content boundaries, and website integration. It draws on the same private document base but presents a controlled subset suited to public-facing communication.',
      },
    },
    {
      '@type': 'Question',
      name: 'What integrations are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Google Drive, Dropbox, Microsoft OneDrive, Gmail, Outlook, CRM systems, website forms, Zapier and Make, Firebase, Supabase, and custom APIs. Integration scope is confirmed during the planning phase and can extend setup time for businesses with many concurrent integrations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I deploy this entirely on-premises, or is cloud involved?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Three deployment options are available: fully on-prem on Mac Studio nodes inside the office (recommended for sensitive documents), hybrid on-prem plus cloud (for businesses that want some cloud-side processing), or undecided (the planning conversation determines the best path). On-prem deployment is the configuration most often chosen by law, medical, dental, insurance, and high-security businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does deployment take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most deployments target a 30 to 90 day launch window depending on tier, document volume, integration count, OCR scope, and hardware procurement lead time. Smaller tiers (Starter and Small Team) typically launch faster. Larger tiers with high document volume, OCR workflows, custom dashboards, or many integrations require longer planning and ingestion phases. Higher-spec Mac Studio M3 Ultra configurations can carry additional procurement lead time.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does monthly support include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly support covers ongoing prompt refinement, document refreshes when new files are added, staff support, workflow expansion as the business identifies new use cases, and system monitoring. Monthly support scales with tier — $750/mo for Starter Private AI up to $12,500+/mo for Full Private AI Infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get a planning estimate for my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the on-site estimator. Answer a few business questions — team size, document volume, workflow goals, security and integration needs — and the system generates a recommended tier, Mac Studio node count, Mac Studio spec, services setup price range, hardware estimate range, monthly support estimate, and planning notes specific to your answers. The estimate is a planning number; final pricing is confirmed during a workflow consultation.',
      },
    },
  ],
};

/* ============================================================
 *  8. BREADCRUMB
 * ============================================================ */

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}#breadcrumbs`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Private AI Workflow Systems',
      item: `${SITE_URL}#capabilities`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Pricing',
      item: `${SITE_URL}#pricing`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Estimate',
      item: `${SITE_URL}#estimate`,
    },
  ],
};

/* ============================================================
 *  Legacy export kept for layout.tsx compatibility.
 *  (Some old code iterates an array — we no longer emit
 *  portfolio item schemas on the new site, so this is empty.)
 * ============================================================ */
export const portfolioItemSchemas: unknown[] = [];
