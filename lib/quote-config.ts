/**
 * ============================================================================
 * QUOTE CALCULATOR CONFIGURATION  —  SINGLE SOURCE OF TRUTH FOR ALL PRICING
 * ============================================================================
 *
 * Everything the private admin quote calculator uses to compute a price lives
 * here. To change pricing later, edit ONLY this file.
 *
 *  •  BASE_* / MODULE_* / QUANTITY_* ......  US-dollar base prices
 *  •  COMPLEXITY_MULTIPLIERS ...............  scope complexity factors
 *  •  TIMELINE_MULTIPLIERS .................  rush factors
 *  •  COUNTRY_TIERS + COUNTRY_TO_TIER ......  geographic pricing intelligence
 *  •  MINIMUMS .............................  profit-protection floor prices
 *  •  SUPPORT_TIERS / SUPPORT_ADDONS .......  monthly support pricing
 *  •  PACKAGE_THRESHOLDS ...................  package recommendation bands
 *
 * All figures are in USD and represent the *US base* price. The country tier
 * multiplier and complexity/timeline multipliers are applied on top of these
 * by lib/quote-engine.ts.
 * ============================================================================
 */

/* --------------------------------------------------------------------------
 * SECTION C — CORE PLATFORM OPTIONS (base build prices, US baseline)
 * ------------------------------------------------------------------------ */
export const PLATFORM_OPTIONS = {
  webDashboard: {
    key: 'webDashboard',
    label: 'Web Dashboard / Admin Panel',
    price: 6000,
    note: 'Core browser-based control center for managers/owners.',
  },
  customerPortal: {
    key: 'customerPortal',
    label: 'Customer Web Portal',
    price: 4000,
    note: 'Customer-facing web area (booking, accounts, history).',
  },
  iosApp: {
    key: 'iosApp',
    label: 'Native iOS App',
    price: 7500,
    note: 'Dedicated iPhone app.',
  },
  androidApp: {
    key: 'androidApp',
    label: 'Native Android App',
    price: 7500,
    note: 'Dedicated Android app.',
  },
  crossPlatformMobile: {
    key: 'crossPlatformMobile',
    label: 'Cross-Platform Mobile App (iOS + Android from one codebase)',
    price: 9000,
    note: 'One shared codebase shipping to both stores. Cheaper than two native apps — prefer this unless truly native-only features are required.',
  },
  touchscreenKiosk: {
    key: 'touchscreenKiosk',
    label: 'Android Touchscreen / Kiosk Interface',
    price: 6500,
    note: 'Touch-board / kiosk station experience. Adds hardware + layout complexity.',
  },
} as const;

/**
 * Separate native iOS + native Android selected together.
 * The engine flags this and shows the $10,000 combined price + a recommendation
 * to use cross-platform ($9,000) instead unless truly needed.
 */
export const SEPARATE_NATIVE_COMBINED_PRICE = 10000;

/**
 * Selecting the touchscreen/kiosk platform adds this build-complexity surcharge
 * on top of its base price (kiosk lockdown, offline sync, hardware handling).
 */
export const TOUCHSCREEN_COMPLEXITY_SURCHARGE = 1500;

export type PlatformKey = keyof typeof PLATFORM_OPTIONS;

/* --------------------------------------------------------------------------
 * SECTION D — FEATURE MODULES (add-on build prices, US baseline)
 * ------------------------------------------------------------------------ */
export const FEATURE_MODULES = [
  { key: 'scheduling', label: 'Scheduling / Booking System', price: 2500 },
  { key: 'payments', label: 'Payments & Checkout Integration', price: 3000 },
  { key: 'inventory', label: 'Inventory Management', price: 2500 },
  { key: 'customerProfiles', label: 'Customer Profiles / CRM', price: 2500 },
  { key: 'staffRoles', label: 'Staff Roles & Permissions', price: 2000 },
  { key: 'pushNotifications', label: 'Push Notifications', price: 1500 },
  { key: 'smsEmailAlerts', label: 'SMS / Email Alerts', price: 2000 },
  { key: 'reports', label: 'Reports & Analytics Dashboard', price: 3000 },
  { key: 'jobTracking', label: 'Job / Order Tracking', price: 2500 },
  { key: 'photoUploads', label: 'Photo Uploads & Media', price: 1500 },
  { key: 'digitalSignatures', label: 'Digital Signatures', price: 1500 },
  { key: 'multiLocation', label: 'Multi-Location Support', price: 3000 },
  { key: 'adminControls', label: 'Advanced Admin Controls', price: 2000 },
  { key: 'loyalty', label: 'Loyalty / Rewards Program', price: 2500 },
  { key: 'realtimeSync', label: 'Real-Time Syncing Engine', price: 3500 },
  { key: 'aiTools', label: 'AI Tools / Automation Layer', price: 4000 },
  { key: 'chatMessaging', label: 'In-App Chat / Messaging', price: 2500 },
  { key: 'geolocation', label: 'GPS / Geolocation & Routing', price: 2500 },
] as const;

export type FeatureModuleKey = (typeof FEATURE_MODULES)[number]['key'];

/* --------------------------------------------------------------------------
 * SECTION E — QUANTITY-BASED PRICING (per-additional-unit prices)
 * ------------------------------------------------------------------------ */
export const QUANTITY_PRICING = {
  // Extra role-based dashboards beyond the first, each:
  additionalDashboard: { price: 2000, freeUnits: 1, label: 'Additional dashboards' },
  // Staff/user roles: first 2 included, each after:
  additionalRole: { price: 500, freeUnits: 2, label: 'User roles (after first 2)' },
  // Distinct touchscreen screen groups/layouts: first 10 included, each after:
  additionalScreenGroup: { price: 250, freeUnits: 10, label: 'Screen groups (after first 10)' },
  // Third-party API integrations, each:
  apiIntegration: { price: 3000, freeUnits: 0, label: 'API integrations' },
  // Business locations: first included, each additional:
  additionalLocation: { price: 750, freeUnits: 1, label: 'Locations (after first)' },
  // Languages: first (English) included, each additional:
  additionalLanguage: { price: 2000, freeUnits: 1, label: 'Languages (after first)' },
  // Physical touchscreen stations: first included, each additional:
  additionalTouchscreenStation: { price: 500, freeUnits: 1, label: 'Touchscreen stations (after first)' },
  // Onboarding / training sessions, each:
  trainingSession: { price: 500, freeUnits: 0, label: 'Training sessions' },
} as const;

export type QuantityKey = keyof typeof QUANTITY_PRICING;

/* --------------------------------------------------------------------------
 * SECTION E2 — TOUCH BOARD HARDWARE (pass-through physical goods)
 *
 * Physical all-in-one touchscreen boards resold to the client. These are
 * PASS-THROUGH HARDWARE: each selected board is added to the setup total at its
 * flat per-unit `price` and is NEVER marked up by the complexity / timeline /
 * country multipliers, and never affected by the software minimum-price floors.
 *
 * `cost` (optional) is our internal landed-cost basis (what we pay, before tax
 * & shipping). It is used ONLY for the admin-side margin readout and is NEVER
 * shown on the client-facing quote/PDF. Edit sizes / prices / costs here — this
 * is the only place.
 *
 * COST STATUS: only the 55" cost is a real confirmed supplier price ($1,750).
 * Every other `cost` below is a STANDARD-MARKET ESTIMATE (~50% of sell price,
 * anchored to the confirmed 55" ratio) — replace each with the actual landed
 * cost as you confirm it with the supplier. The `estimate` flag drives the
 * "est." label in the admin margin readout.
 * ------------------------------------------------------------------------ */
export const TOUCH_BOARDS = [
  { key: 'tb8', size: '8"', price: 349, cost: 175, estimate: true },
  { key: 'tb10', size: '10"', price: 499, cost: 250, estimate: true },
  { key: 'tb24', size: '24"', price: 1099, cost: 550, estimate: true },
  { key: 'tb32', size: '32"', price: 1799, cost: 900, estimate: true },
  { key: 'tb43', size: '43"', price: 2499, cost: 1250, estimate: true },
  { key: 'tb55', size: '55"', price: 3499, cost: 1750, estimate: false }, // confirmed: we pay $1,750 + tax & shipping
  { key: 'tb65', size: '65"', price: 4499, cost: 2250, estimate: true },
  { key: 'tb75', size: '75"', price: 5999, cost: 3000, estimate: true },
  { key: 'tb86', size: '86"', price: 7999, cost: 4000, estimate: true },
] as const;

export type TouchBoardKey = (typeof TOUCH_BOARDS)[number]['key'];

/* --------------------------------------------------------------------------
 * SECTION F — COMPLEXITY MULTIPLIERS
 * Applied to the BUILD FEE (platform + modules + quantities), NOT to hard
 * third-party usage fees (those are pass-through, see THIRD_PARTY note).
 * ------------------------------------------------------------------------ */
export const COMPLEXITY_MULTIPLIERS = [
  { key: 'simple', label: 'Simple', value: 1.0, note: 'Straightforward CRUD, few edge cases.' },
  { key: 'moderate', label: 'Moderate', value: 1.25, note: 'Several connected modules, some custom logic.' },
  { key: 'advanced', label: 'Advanced', value: 1.5, note: 'Complex workflows, real-time sync, multiple roles.' },
  { key: 'complex', label: 'Complex', value: 1.85, note: 'Heavy integrations, offline sync, kiosk + mobile + web.' },
  { key: 'enterprise', label: 'Enterprise', value: 2.25, note: 'Mission-critical, multi-location, strict reliability.' },
] as const;

export type ComplexityKey = (typeof COMPLEXITY_MULTIPLIERS)[number]['key'];

/* --------------------------------------------------------------------------
 * SECTION G — RUSH / TIMELINE MULTIPLIERS
 * Also applied to the build fee only.
 * ------------------------------------------------------------------------ */
export const TIMELINE_MULTIPLIERS = [
  { key: 'noDeadline', label: 'No set timeline / Not sure', value: 1.0, note: 'No deadline — standard schedule, no rush premium.' },
  { key: 'flexible', label: 'Flexible / Standard', value: 1.0, note: 'Normal schedule.' },
  { key: 'sixtyDays', label: 'Within 60 days', value: 1.15, note: 'Mild acceleration.' },
  { key: 'thirtyDays', label: 'Within 30 days', value: 1.35, note: 'Significant acceleration.' },
  { key: 'emergency', label: 'Emergency / ASAP', value: 1.75, note: 'All-hands rush.' },
] as const;

export type TimelineKey = (typeof TIMELINE_MULTIPLIERS)[number]['key'];

/* --------------------------------------------------------------------------
 * COMBINED MULTIPLIER CAP
 *
 * Safety ceiling on the COMPOUNDED setup multiplier (complexity × timeline ×
 * country). No matter how the levers stack — e.g. Enterprise (×2.25) +
 * Emergency (×1.75) + Tier 1 (×1.1) = ×4.33 — the setup BUILD FEE is never
 * charged at more than base × this value. If the raw product exceeds the cap it
 * is scaled down to exactly the cap.
 *
 * This ONLY clamps the setup fee. Individual multipliers are still shown as-is,
 * and monthly support pricing + the minimum-price floors are unaffected.
 *
 * Darius: tune this if you ever want to allow (or tighten) how aggressively the
 * combined levers can push a setup price. 3.0 = "never more than 3× base".
 * ------------------------------------------------------------------------ */
export const MAX_COMBINED_MULTIPLIER = 3.0;

/* --------------------------------------------------------------------------
 * SECTION H — COUNTRY-BASED PRICING INTELLIGENCE (4-tier system)
 *
 * Each tier has a suggested multiplier RANGE and a default suggested value
 * the calculator pre-fills. The admin can always override manually.
 *
 * These multipliers are a GUIDANCE LAYER. Final price still depends on scope,
 * business size, urgency, complexity, number of locations, and client budget.
 * ------------------------------------------------------------------------ */
export const COUNTRY_TIERS = {
  tier1: {
    key: 'tier1',
    label: 'Tier 1 — Premium Markets',
    range: [1.0, 1.25] as [number, number],
    suggested: 1.1,
    description: 'High purchasing power. Full premium pricing (often a premium uplift).',
    examples: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'Switzerland', 'Norway', 'UAE', 'Singapore', 'Netherlands', 'Ireland', 'Denmark'],
  },
  tier2: {
    key: 'tier2',
    label: 'Tier 2 — Strong Middle Markets',
    range: [0.8, 1.0] as [number, number],
    suggested: 0.9,
    description: 'Solid buying power. Near-full pricing with slight adjustment.',
    examples: ['Spain', 'Italy', 'Portugal', 'Poland', 'Czech Republic', 'South Korea', 'Japan', 'Chile', 'Saudi Arabia', 'Greece', 'Estonia'],
  },
  tier3: {
    key: 'tier3',
    label: 'Tier 3 — Emerging Growth Markets',
    range: [0.6, 0.8] as [number, number],
    suggested: 0.7,
    description: 'Growing markets. Adjusted pricing to stay competitive while profitable.',
    examples: ['Mexico', 'Brazil', 'Thailand', 'Malaysia', 'Turkey', 'South Africa', 'Colombia', 'Peru', 'Jamaica', 'Trinidad & Tobago', 'Dominican Republic'],
  },
  tier4: {
    key: 'tier4',
    label: 'Tier 4 — Budget-Sensitive Markets',
    range: [0.45, 0.65] as [number, number],
    suggested: 0.55,
    description: 'Price-sensitive markets. Lowest multiplier — protect with minimums and reduced scope.',
    examples: ['Philippines', 'India', 'Indonesia', 'Vietnam', 'Nigeria', 'Kenya', 'Egypt', 'Pakistan', 'Bangladesh', 'Nepal'],
  },
} as const;

export type CountryTierKey = keyof typeof COUNTRY_TIERS;

/**
 * Explicit country → tier mapping used to auto-suggest a multiplier.
 * Add or move countries here as needed. Unknown countries default to tier1
 * (safest for profit) and the calculator notes it as "unmapped".
 */
export const COUNTRY_TO_TIER: Record<string, CountryTierKey> = {
  // Tier 1
  'United States': 'tier1',
  Canada: 'tier1',
  'United Kingdom': 'tier1',
  Australia: 'tier1',
  Germany: 'tier1',
  Switzerland: 'tier1',
  Norway: 'tier1',
  'United Arab Emirates': 'tier1',
  UAE: 'tier1',
  Singapore: 'tier1',
  Netherlands: 'tier1',
  Ireland: 'tier1',
  Denmark: 'tier1',
  Sweden: 'tier1',
  Austria: 'tier1',
  Luxembourg: 'tier1',
  Qatar: 'tier1',
  Kuwait: 'tier1',
  'New Zealand': 'tier1',
  Belgium: 'tier1',
  Finland: 'tier1',
  France: 'tier1',
  // Tier 2
  Spain: 'tier2',
  Italy: 'tier2',
  Portugal: 'tier2',
  Poland: 'tier2',
  'Czech Republic': 'tier2',
  'South Korea': 'tier2',
  Japan: 'tier2',
  Chile: 'tier2',
  'Saudi Arabia': 'tier2',
  Greece: 'tier2',
  Estonia: 'tier2',
  Hungary: 'tier2',
  Croatia: 'tier2',
  Slovakia: 'tier2',
  Lithuania: 'tier2',
  Latvia: 'tier2',
  Uruguay: 'tier2',
  'Costa Rica': 'tier2',
  Panama: 'tier2',
  // Tier 3
  Mexico: 'tier3',
  Brazil: 'tier3',
  Thailand: 'tier3',
  Malaysia: 'tier3',
  Turkey: 'tier3',
  'South Africa': 'tier3',
  Colombia: 'tier3',
  Peru: 'tier3',
  Jamaica: 'tier3',
  'Trinidad & Tobago': 'tier3',
  'Trinidad and Tobago': 'tier3',
  'Dominican Republic': 'tier3',
  Argentina: 'tier3',
  Ecuador: 'tier3',
  Romania: 'tier3',
  Bulgaria: 'tier3',
  Serbia: 'tier3',
  Bahamas: 'tier3',
  Barbados: 'tier3',
  'Puerto Rico': 'tier3',
  // Tier 4
  Philippines: 'tier4',
  India: 'tier4',
  Indonesia: 'tier4',
  Vietnam: 'tier4',
  Nigeria: 'tier4',
  Kenya: 'tier4',
  Egypt: 'tier4',
  Pakistan: 'tier4',
  Bangladesh: 'tier4',
  Nepal: 'tier4',
  Ghana: 'tier4',
  'Sri Lanka': 'tier4',
  Cambodia: 'tier4',
  Morocco: 'tier4',
};

/** Sorted, de-duplicated country list for the dropdown. */
export const COUNTRY_LIST = Object.keys(COUNTRY_TO_TIER)
  .filter((c) => c !== 'UAE' && c !== 'Trinidad and Tobago') // hide alias duplicates in UI
  .sort();

/* --------------------------------------------------------------------------
 * SECTION H — MINIMUM PRICE PROTECTION (profit floor, applied AFTER country
 * multiplier). If a computed price falls below these, the calculator raises it
 * to the floor and shows a "below-profitable" warning — unless the admin has
 * manually overridden the multiplier.
 * ------------------------------------------------------------------------ */
export const MINIMUMS = {
  blueprint: 500,
  starterSetup: 2500,
  seriousCustomSetup: 4500,
  monthly: 150,
  touchscreenKiosk: 3000,
  mobileApp: 5000,
  webDashboard: 2500,
} as const;

/* --------------------------------------------------------------------------
 * SECTION I — MONTHLY SUPPORT TIERS
 * Country multiplier applies to monthly too, but never below MINIMUMS.monthly.
 * ------------------------------------------------------------------------ */
export const SUPPORT_TIERS = [
  {
    key: 'basic',
    label: 'Basic Care',
    price: 299,
    forComplexity: ['simple', 'moderate'],
    includes: ['Hosting oversight', 'Security patches', 'Bug fixes', 'Email support', 'Uptime monitoring'],
  },
  {
    key: 'growth',
    label: 'Growth Care',
    price: 750,
    forComplexity: ['advanced'],
    includes: ['Everything in Basic', 'Priority support', 'Small monthly improvements', 'Content/config updates', 'Monthly check-in'],
  },
  {
    key: 'premium',
    label: 'Premium Operations',
    price: 1500,
    forComplexity: ['complex'],
    includes: ['Everything in Growth', 'Faster SLAs', 'Larger monthly improvement budget', 'Performance tuning', 'Priority feature slots'],
  },
  {
    key: 'enterprise',
    label: 'Enterprise',
    price: 3000,
    forComplexity: ['enterprise'],
    includes: ['Everything in Premium', 'Dedicated attention', 'Multi-location oversight', 'Custom SLAs', 'Roadmap partnership'],
    plus: true, // "$3,000+"
  },
] as const;

export type SupportTierKey = (typeof SUPPORT_TIERS)[number]['key'];

export const SUPPORT_ADDONS = [
  { key: 'extraLocation', label: 'Additional location monitoring', price: 150 },
  { key: 'extraApp', label: 'Additional app store maintenance', price: 100 },
  { key: 'prioritySla', label: 'Priority / same-day SLA', price: 250 },
  { key: 'monthlyFeatureHours', label: 'Extra 5 hrs monthly improvements', price: 400 },
  { key: 'aiUsageOversight', label: 'AI usage oversight & tuning', price: 300 },
] as const;

/* --------------------------------------------------------------------------
 * SECTION J — PAYMENT SCHEDULE OPTIONS
 * financingUplift is added to the total for financed plans.
 * ------------------------------------------------------------------------ */
export const PAYMENT_SCHEDULES = {
  milestone: {
    key: 'milestone',
    label: 'Milestone (40 / 30 / 20 / 10)',
    financingUplift: 0,
    splits: [
      { label: 'Deposit — project kickoff', pct: 0.4 },
      { label: 'Design & prototype approved', pct: 0.3 },
      { label: 'Core build complete', pct: 0.2 },
      { label: 'Launch & handoff', pct: 0.1 },
    ],
  },
  halfHalf: {
    key: 'halfHalf',
    label: '50 / 50',
    financingUplift: 0,
    splits: [
      { label: 'Deposit — project kickoff', pct: 0.5 },
      { label: 'Launch & handoff', pct: 0.5 },
    ],
  },
  three: {
    key: 'three',
    label: '3 Payments (+10% financing)',
    financingUplift: 0.1,
    splits: [
      { label: 'Payment 1', pct: 1 / 3 },
      { label: 'Payment 2', pct: 1 / 3 },
      { label: 'Payment 3', pct: 1 / 3 },
    ],
  },
  six: {
    key: 'six',
    label: '6 Payments (+20% financing)',
    financingUplift: 0.2,
    splits: [
      { label: 'Payment 1', pct: 1 / 6 },
      { label: 'Payment 2', pct: 1 / 6 },
      { label: 'Payment 3', pct: 1 / 6 },
      { label: 'Payment 4', pct: 1 / 6 },
      { label: 'Payment 5', pct: 1 / 6 },
      { label: 'Payment 6', pct: 1 / 6 },
    ],
  },
} as const;

export type PaymentScheduleKey = keyof typeof PAYMENT_SCHEDULES;

/* --------------------------------------------------------------------------
 * SECTION K — TIMELINE ESTIMATOR (weeks, by total build-fee scope in USD)
 * ------------------------------------------------------------------------ */
export const TIMELINE_ESTIMATOR = [
  { maxBuildFee: 7500, weeks: '3–5 weeks', lo: 3, hi: 5 },
  { maxBuildFee: 20000, weeks: '6–10 weeks', lo: 6, hi: 10 },
  { maxBuildFee: 50000, weeks: '10–16 weeks', lo: 10, hi: 16 },
  { maxBuildFee: Infinity, weeks: '16–24+ weeks', lo: 16, hi: 24 },
] as const;

/* --------------------------------------------------------------------------
 * SECTION L — PACKAGE RECOMMENDATION THRESHOLDS (based on US base setup)
 * ------------------------------------------------------------------------ */
export const PACKAGE_THRESHOLDS = [
  { key: 'launch', label: 'Launch System', min: 4500, max: 7500, monthly: 299 },
  { key: 'growth', label: 'Growth System', min: 7501, max: 20000, monthly: 750 },
  { key: 'customOs', label: 'Custom Business OS', min: 20001, max: 50000, monthly: 1500 },
  { key: 'enterprise', label: 'Enterprise', min: 50001, max: Infinity, monthly: 3000 },
] as const;

/* --------------------------------------------------------------------------
 * PUBLIC PRICING (used on the /pricing marketing page — NOT the calculator)
 * ------------------------------------------------------------------------ */
export const PUBLIC_PRICING = [
  {
    key: 'blueprint',
    name: 'Blueprint Session',
    setup: 750,
    monthly: null,
    startingAt: true,
    tagline: 'Map your system before you build it.',
    highlight: false,
  },
  {
    key: 'launch',
    name: 'Launch System',
    setup: 4500,
    monthly: 299,
    startingAt: true,
    tagline: 'Your first connected platform, live and running.',
    highlight: false,
  },
  {
    key: 'growth',
    name: 'Growth System',
    setup: 12500,
    monthly: 750,
    startingAt: true,
    tagline: 'Web, mobile, and staff tools working as one.',
    highlight: true,
  },
  {
    key: 'customOs',
    name: 'Custom Business OS',
    setup: 25000,
    monthly: 1500,
    startingAt: true,
    tagline: 'A complete digital operating system for your business.',
    highlight: false,
  },
] as const;

/* --------------------------------------------------------------------------
 * SECTIONS N / O / P — DISCLAIMERS & INTERNAL WARNINGS (rendered verbatim-ish)
 * ------------------------------------------------------------------------ */
export const DISCLAIMERS = {
  scopeWarning:
    'Scope warning: This quote reflects the features selected above. Any new modules, screens, integrations, or major changes requested after the scope is agreed are quoted separately. "Just one more thing" requests add real build time — capture them as change orders.',
  thirdPartyFees:
    'Third-party & usage fees are separate: App Store / Google Play developer accounts, hosting, SMS/email providers, payment processor fees, mapping/geolocation APIs, and AI model usage are billed by those providers directly (or passed through at cost). Complexity/timeline/country multipliers apply to the BUILD FEE only — never to these hard pass-through costs.',
  marketAdjustmentNote:
    'Country pricing is a market-adjustment guide, not a discount entitlement. It aligns the offer with local purchasing power while keeping the work profitable.',
  minimumProtectionNote:
    'Minimum price protection ensures no custom build is accepted below a profitable floor. Lower country pricing should never mean unlimited custom work — reduce scope or phase the build instead of dropping below the floor.',
} as const;

/**
 * SECTION P — internal profit-protection warning thresholds.
 * The engine emits these warnings; they are never shown to clients.
 */
export const PROFIT_PROTECTION = {
  // If effective hourly (setup / estimatedHours) falls below this → warn.
  minEffectiveHourly: 55,
  // Rough internal estimate: hours ≈ buildFee(base) / this rate.
  internalBuildRate: 110,
  // If country multiplier below this AND scope is large → warn about over-discounting.
  aggressiveMultiplierThreshold: 0.6,
  // If monthly (after multiplier) hits the floor → warn it's break-even support.
  monthlyFloorWarning: MINIMUMS.monthly,
} as const;
