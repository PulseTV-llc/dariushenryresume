export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  metrics?: string[];
  status: 'Production' | 'Active Development' | 'Beta';
  tier: 1 | 2 | 3;
  // New outcome-focused fields
  problem?: string;
  solution?: string;
  outcome?: string;
}

export const projects: Project[] = [
  {
    id: 'zonely',
    title: 'ZONELY',
    tagline: 'Real Estate Intelligence Platform',
    description: 'A comprehensive real estate technology ecosystem for property syndication, deal management, and investor communication. Multi-platform solution with iOS, macOS, and web portals.',
    category: 'SaaS Platform',
    technologies: ['SwiftUI', 'Next.js 16', 'React 19', 'TypeScript', 'Firebase', 'Express', 'OpenAI', 'Stripe', 'Puppeteer'],
    features: [
      'Deal room management with multi-user collaboration',
      'Property intelligence and market analysis with AI',
      'Investor dashboard with portfolio tracking',
      'Tenant management and communication',
      'Subscription tiers (Free, Premium, Pro)',
      'Home inspection calculators',
      'Move/relocation cost estimators'
    ],
    metrics: ['Multi-platform (iOS, macOS, Web)', 'Real-time collaboration', 'AI-powered intelligence'],
    status: 'Production',
    tier: 1,
    problem: 'Real estate founders wasting $50K+ on agencies, waiting 6 months for buggy MVPs',
    solution: 'Full real estate intelligence SaaS with iOS app, web portal, AI analysis, and Stripe subscriptions',
    outcome: 'Live in production in 90 days. Multi-platform ecosystem. Revenue-ready subscriptions. Now acquiring users.'
  },
  {
    id: 'speakix',
    title: 'SPEAKIX',
    tagline: 'AI-Powered Language Learning Revolution',
    description: 'Revolutionary iOS language learning app with real AI conversation partners and deep cultural immersion. Positioning as "The Duolingo Killer" with genuine AI conversations, not pre-scripted responses.',
    category: 'EdTech SaaS',
    technologies: ['SwiftUI', 'Firebase', 'OpenAI GPT-4', 'AVFoundation', 'Speech Framework', 'StoreKit 2'],
    features: [
      'Real AI conversation partner (GPT-4, not scripts)',
      '100+ comprehensive learning modules',
      'Multi-language support (Mandarin, English, Thai, Bengali)',
      'Spaced Repetition System (SRS)',
      'Speech recognition and pronunciation feedback',
      'Character/script learning with stroke order',
      'Gamification: Daily streaks, XP, achievements',
      'CEFR level progression (A1→C2)'
    ],
    metrics: ['100 free AI conversations/month', '$9.99/month Premium', 'iOS 17+'],
    status: 'Active Development',
    tier: 1,
    problem: 'EdTech apps using fake "AI" (pre-scripted responses). Users want REAL conversation practice, not robots.',
    solution: 'Full iOS language learning platform with REAL GPT-4 conversations, 100+ modules, gamification, subscriptions',
    outcome: 'The "Duolingo Killer". 100 free AI conversations/month freemium model. Multi-language support. Ready for App Store.'
  },
  {
    id: 'tapecoach',
    title: 'TAPECOACH',
    tagline: 'AI Self-Tape Audition Analyzer',
    description: 'Professional iOS app helping actors improve self-tape auditions through comprehensive AI-powered video and audio analysis using advanced computer vision and audio processing.',
    category: 'Professional Tools',
    technologies: ['SwiftUI', 'Vision Framework', 'Core Image', 'AVFoundation', 'Accelerate DSP', 'OpenAI Vision', 'Firebase', 'StoreKit 2'],
    features: [
      'Real-time video recording with face detection',
      '4-category analysis: Framing, Lighting, Audio, Eyeline',
      'Computer vision-powered framing analysis',
      'Audio analysis: dB levels, SNR, clipping detection',
      'Lighting analysis: Brightness, shadows, backlighting',
      'Overall scoring (0-100) with actionable tips',
      'Video storage with thumbnails',
      '13 development phases completed'
    ],
    metrics: ['3 free analyses/month', '$9.99/month Pro', 'iOS 17+'],
    status: 'Beta',
    tier: 1,
    problem: 'Actors losing roles because of bad self-tape quality. No automated way to get professional feedback fast.',
    solution: 'iOS app with computer vision analysis: framing, lighting, audio levels, eyeline. AI-powered scoring & tips.',
    outcome: 'Professional-grade audition analyzer in your pocket. 3 free analyses/month freemium. In beta with real actors.'
  },
  {
    id: 'pulsetv',
    title: 'PULSETV',
    tagline: 'Streaming & Ad Management Ecosystem',
    description: 'Complete streaming platform ecosystem with iOS streaming app and full-stack ad management system for campaign management, audience targeting, and performance analytics.',
    category: 'Media Platform',
    technologies: ['SwiftUI', 'Vue.js 2.6', 'Vuetify', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'JWT', 'Chart.js'],
    features: [
      'iOS streaming application with Firebase backend',
      'Ad campaign management dashboard',
      'Audience targeting and segmentation',
      'Budget allocation and optimization',
      'Performance analytics with visualizations',
      'Real-time metrics and reporting',
      'Payout calculator for creators'
    ],
    metrics: ['Full-stack platform', 'B2C + B2B', 'Production ready'],
    status: 'Production',
    tier: 2
  },
  {
    id: 'actorsdb',
    title: 'ACTORSDB',
    tagline: 'Talent Management Platform',
    description: 'Comprehensive talent management ecosystem with multiple platform variants (iOS, macOS, Web) for actor profile management, audition tracking, and talent marketplace.',
    category: 'Talent Management',
    technologies: ['SwiftUI', 'Next.js', 'Firebase', 'Firestore', 'Firebase Storage', 'React', 'Vercel'],
    features: [
      'Actor profile management with headshots',
      'Audition tracking and history',
      'Agent/management integration',
      'Booking system',
      'Portfolio showcasing',
      'Search and filtering capabilities',
      'Multi-platform support (iOS, macOS, Web)'
    ],
    metrics: ['Multiple production versions', 'Multi-platform', 'Firebase backend'],
    status: 'Production',
    tier: 2
  },
  {
    id: 'chinese-translator',
    title: 'CHINESE TRANSLATOR',
    tagline: 'Language Learning Web App',
    description: 'Comprehensive Chinese language learning web application with interactive modules, AI-powered feedback, and complete freemium system with trial/paid conversion.',
    category: 'EdTech Web App',
    technologies: ['React 19', 'Tailwind CSS', 'Firebase', 'Pinyin', 'React Router v7', 'Stripe'],
    features: [
      'Chinese language modules for all CEFR levels',
      'Spaced Repetition System (SRS)',
      'Multiple learning modes',
      'AI conversation partner integration',
      'Admin dashboard for user management',
      'Usage tracking and analytics',
      'Freemium model with trial conversion'
    ],
    metrics: ['Production ready', 'Full freemium system', 'Multi-level curriculum'],
    status: 'Production',
    tier: 1
  },
  {
    id: 'stockhouse-films',
    title: 'STOCKHOUSE FILMS',
    tagline: 'Professional Video Production Website',
    description: 'Modern Next.js website for professional video production company with aggressive booking system, Stripe payment integration, and admin dashboard.',
    category: 'Business Website',
    technologies: ['Next.js 14', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Stripe', 'Next.js API Routes'],
    features: [
      '3-tier package system ($750-$1,500/month)',
      '40% deposit required, 3-month minimum',
      'Auto-charge balance 48 hours before shoot',
      'Admin dashboard with booking management',
      'Revenue tracking and filtering',
      'Aggressive branding and animations',
      'SEO optimized'
    ],
    metrics: ['Production ready', 'Stripe integration', 'B2B service platform'],
    status: 'Production',
    tier: 2
  },
  {
    id: 'nicolebright',
    title: 'NICOLEBRIGHT',
    tagline: 'Actress Portfolio Platform',
    description: 'Multi-platform actress portfolio and booking system with iOS app and Next.js web interface, featuring reel management and Stripe payment processing.',
    category: 'Portfolio Platform',
    technologies: ['SwiftUI', 'Next.js 16', 'React 19', 'Stripe', 'Firebase', 'Tailwind CSS'],
    features: [
      'Portfolio and reel management',
      'Booking system',
      'Fan/audience interaction',
      'Social media integration',
      'Payment processing via Stripe',
      'Multi-platform (iOS + Web)'
    ],
    metrics: ['Multi-platform', 'Payment integration', 'B2C entertainment'],
    status: 'Active Development',
    tier: 2
  },
  {
    id: 'backend-split',
    title: 'BACKEND SPLIT',
    tagline: 'Enterprise Calculator Suite',
    description: 'Comprehensive iOS app with multiple financial and investment calculators, featuring subscription system, Firebase cloud sync, and enterprise-grade calculations.',
    category: 'Business Tools',
    technologies: ['SwiftUI', 'Firebase', 'StoreKit 2', 'Firestore', 'Firebase Analytics'],
    features: [
      '5+ investment calculators (Budget, ROI, Mortgage, Cash Flow)',
      'Subscription system: 3 free analyses/month',
      'Dashboard with stats and usage tracking',
      'Cloud sync via Firebase',
      'Export functionality',
      'Dark mode default'
    ],
    metrics: ['iOS 17+', 'Subscription model', 'Enterprise calculations'],
    status: 'Production',
    tier: 2,
    problem: 'Real estate investors doing calculations on spreadsheets. Time-consuming, error-prone, no mobile access.',
    solution: '5+ enterprise calculators in one iOS app: Budget, ROI, Mortgage, Cash Flow. Cloud sync + subscriptions.',
    outcome: 'Live on iOS. Complete freemium system with usage limits. Professional calculations in your pocket.'
  },
  {
    id: 'nutrilens',
    title: 'NUTRILENS',
    tagline: 'AI Nutrition & Health App',
    description: 'iOS health and wellness application with AI-powered nutrition tracking, health recommendations, and meal planning.',
    category: 'Health & Wellness',
    technologies: ['SwiftUI', 'Firebase', 'AI Integration'],
    features: [
      'Nutrition tracking',
      'AI-powered health recommendations',
      'Meal planning',
      'Health analytics'
    ],
    status: 'Active Development',
    tier: 3
  },
  {
    id: 'metadata-builder',
    title: 'METADATA BUILDER',
    tagline: 'Professional Media Tools',
    description: 'Suite of iOS and web tools for video and audio metadata management, designed for professional content creators.',
    category: 'Media Tools',
    technologies: ['SwiftUI', 'Web Technologies', 'Firebase'],
    features: [
      'Video metadata management',
      'Audio metadata tools',
      'Web companion interface',
      'Professional content creation support'
    ],
    status: 'Production',
    tier: 3
  },
  {
    id: 'bengali-job-scraper',
    title: 'BENGALI JOB SCRAPER',
    tagline: 'Bilingual Job Aggregator',
    description: 'Python bot that ethically scrapes multiple job sites to find bilingual Bengali-English customer service positions with comprehensive filtering and export capabilities.',
    category: 'Automation Tool',
    technologies: ['Python 3.7+', 'BeautifulSoup', 'Selenium', 'Requests'],
    features: [
      'Multi-site scraping (Indeed, Upwork, FlexJobs)',
      'Ethical scraping with rate limiting',
      'Language relevance detection',
      'Duplicate filtering',
      'CSV and JSON export',
      'Comprehensive error handling'
    ],
    status: 'Production',
    tier: 3
  },
];

export const getTierOneProjects = () => projects.filter(p => p.tier === 1);
export const getFeaturedProjects = () => projects.filter(p => p.tier <= 2);
export const getAllProjects = () => projects;
