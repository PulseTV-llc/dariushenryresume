/**
 * ============================================================================
 * QUOTE ENGINE — pure calculation functions for the admin quote calculator.
 * All pricing constants come from ./quote-config. This file contains NO
 * hard-coded prices; it only computes. Every function is deterministic.
 * ============================================================================
 */

import {
  PLATFORM_OPTIONS,
  PlatformKey,
  SEPARATE_NATIVE_COMBINED_PRICE,
  TOUCHSCREEN_COMPLEXITY_SURCHARGE,
  FEATURE_MODULES,
  FeatureModuleKey,
  QUANTITY_PRICING,
  QuantityKey,
  COMPLEXITY_MULTIPLIERS,
  ComplexityKey,
  TIMELINE_MULTIPLIERS,
  TimelineKey,
  COUNTRY_TIERS,
  COUNTRY_TO_TIER,
  CountryTierKey,
  MINIMUMS,
  SUPPORT_TIERS,
  SupportTierKey,
  SUPPORT_ADDONS,
  PAYMENT_SCHEDULES,
  PaymentScheduleKey,
  TIMELINE_ESTIMATOR,
  PACKAGE_THRESHOLDS,
  PROFIT_PROTECTION,
} from './quote-config';

export interface QuoteInput {
  platforms: Record<PlatformKey, boolean>;
  features: Partial<Record<FeatureModuleKey, boolean>>;
  quantities: Partial<Record<QuantityKey, number>>;
  complexity: ComplexityKey;
  timeline: TimelineKey;
  country: string;
  /** Manual multiplier override; when null, the country-suggested value is used. */
  manualMultiplier: number | null;
  /** Force-skip minimum-price protection (admin explicit override). */
  overrideMinimums: boolean;
  supportTierOverride: SupportTierKey | null;
  supportAddons: string[];
  paymentSchedule: PaymentScheduleKey;
  clientBudget: number | null;
}

const round = (n: number) => Math.round(n);

/* ------------------------------------------------------------------ */
/* Build-fee subtotals                                                 */
/* ------------------------------------------------------------------ */
export function computePlatformSubtotal(platforms: Record<PlatformKey, boolean>) {
  const lines: { label: string; price: number }[] = [];
  let subtotal = 0;

  const iosSeparate = platforms.iosApp;
  const androidSeparate = platforms.androidApp;
  const bothSeparateNative = iosSeparate && androidSeparate;

  (Object.keys(PLATFORM_OPTIONS) as PlatformKey[]).forEach((key) => {
    if (!platforms[key]) return;
    // Handle the "separate native iOS + Android" combined price specially.
    if (bothSeparateNative && (key === 'iosApp' || key === 'androidApp')) return;

    const opt = PLATFORM_OPTIONS[key];
    let price = opt.price;
    if (key === 'touchscreenKiosk') price += TOUCHSCREEN_COMPLEXITY_SURCHARGE;
    lines.push({ label: opt.label, price });
    subtotal += price;
  });

  if (bothSeparateNative) {
    lines.push({
      label: 'Separate native iOS + Android apps (combined)',
      price: SEPARATE_NATIVE_COMBINED_PRICE,
    });
    subtotal += SEPARATE_NATIVE_COMBINED_PRICE;
  }

  return { subtotal, lines, bothSeparateNative };
}

export function computeFeatureSubtotal(features: Partial<Record<FeatureModuleKey, boolean>>) {
  const lines: { label: string; price: number }[] = [];
  let subtotal = 0;
  FEATURE_MODULES.forEach((m) => {
    if (features[m.key]) {
      lines.push({ label: m.label, price: m.price });
      subtotal += m.price;
    }
  });
  return { subtotal, lines };
}

export function computeQuantitySubtotal(quantities: Partial<Record<QuantityKey, number>>) {
  const lines: { label: string; price: number; count: number }[] = [];
  let subtotal = 0;
  (Object.keys(QUANTITY_PRICING) as QuantityKey[]).forEach((key) => {
    const cfg = QUANTITY_PRICING[key];
    const raw = quantities[key] ?? 0;
    const billable = Math.max(0, raw - cfg.freeUnits);
    if (billable > 0) {
      const price = billable * cfg.price;
      lines.push({ label: `${cfg.label} × ${billable}`, price, count: billable });
      subtotal += price;
    }
  });
  return { subtotal, lines };
}

/* ------------------------------------------------------------------ */
/* Country tier resolution                                             */
/* ------------------------------------------------------------------ */
export function resolveCountry(country: string) {
  const tierKey: CountryTierKey = COUNTRY_TO_TIER[country] ?? 'tier1';
  const tier = COUNTRY_TIERS[tierKey];
  const mapped = country in COUNTRY_TO_TIER;
  return { tierKey, tier, suggestedMultiplier: tier.suggested, mapped };
}

/* ------------------------------------------------------------------ */
/* Minimum-price floor                                                 */
/* ------------------------------------------------------------------ */
function computeMinimumFloor(platforms: Record<PlatformKey, boolean>, buildFeeBase: number) {
  const hasMobile =
    platforms.iosApp || platforms.androidApp || platforms.crossPlatformMobile;
  const hasTouchscreen = platforms.touchscreenKiosk;
  const hasWeb = platforms.webDashboard || platforms.customerPortal;
  const isSeriousCustom = hasMobile || hasTouchscreen || buildFeeBase >= 8000;

  let floor: number = MINIMUMS.starterSetup;
  if (isSeriousCustom) floor = Math.max(floor, MINIMUMS.seriousCustomSetup);
  if (hasWeb) floor = Math.max(floor, MINIMUMS.webDashboard);
  if (hasTouchscreen) floor = Math.max(floor, MINIMUMS.touchscreenKiosk);
  if (hasMobile) floor = Math.max(floor, MINIMUMS.mobileApp);
  return { floor, isSeriousCustom, hasMobile, hasTouchscreen, hasWeb };
}

/* ------------------------------------------------------------------ */
/* Support / monthly                                                   */
/* ------------------------------------------------------------------ */
export function recommendSupportTier(complexity: ComplexityKey): SupportTierKey {
  const found = SUPPORT_TIERS.find((t) =>
    (t.forComplexity as readonly string[]).includes(complexity),
  );
  return (found?.key ?? 'basic') as SupportTierKey;
}

/* ------------------------------------------------------------------ */
/* Package recommendation                                              */
/* ------------------------------------------------------------------ */
function recommendPackage(usBaseSetup: number) {
  return (
    PACKAGE_THRESHOLDS.find((p) => usBaseSetup >= p.min && usBaseSetup <= p.max) ??
    PACKAGE_THRESHOLDS[0]
  );
}

/* ------------------------------------------------------------------ */
/* Timeline estimate                                                   */
/*                                                                     */
/* The scope-based standard range comes from TIMELINE_ESTIMATOR. Rush  */
/* selections COMPRESS the shown window toward their target cap — the   */
/* estimate is never longer than the standard one, and never longer     */
/* than the rush cap. Price multipliers are unaffected by this.         */
/* ------------------------------------------------------------------ */
// Per-rush target caps (in weeks). `capLo` pulls the low end down for the
// most aggressive tiers; Infinity means "don't lower the standard low end".
const RUSH_CAPS: Record<TimelineKey, { capHi: number; capLo: number; suffix: string } | null> = {
  noDeadline: null, // standard, unchanged
  flexible: null, // standard, unchanged
  sixtyDays: { capHi: 8, capLo: Infinity, suffix: '' }, // within ~60 days
  thirtyDays: { capHi: 4, capLo: Infinity, suffix: '' }, // within ~30 days
  emergency: { capHi: 3, capLo: 1, suffix: ' · ASAP' }, // shortest feasible
};

function estimateTimeline(buildFeeBase: number, timelineKey: TimelineKey) {
  const tier =
    TIMELINE_ESTIMATOR.find((t) => buildFeeBase <= t.maxBuildFee) ??
    TIMELINE_ESTIMATOR[TIMELINE_ESTIMATOR.length - 1];

  const cap = RUSH_CAPS[timelineKey];
  if (!cap) return tier.weeks; // flexible / no deadline → standard range verbatim

  // Compress toward the rush cap, but never longer than the standard estimate.
  const hi = Math.min(tier.hi, cap.capHi);
  const lo = Math.min(tier.lo, hi, cap.capLo);
  const range = lo === hi ? `~${hi} weeks` : `${lo}–${hi} weeks`;
  return `${range}${cap.suffix}`;
}

/* ------------------------------------------------------------------ */
/* Phased pricing (Phase 1/2/3 split)                                  */
/* ------------------------------------------------------------------ */
const PHASE_1_PLATFORMS: PlatformKey[] = ['webDashboard'];
const PHASE_2_PLATFORMS: PlatformKey[] = [
  'customerPortal',
  'iosApp',
  'androidApp',
  'crossPlatformMobile',
];
const PHASE_3_PLATFORMS: PlatformKey[] = ['touchscreenKiosk'];

const PHASE_1_FEATURES: FeatureModuleKey[] = ['customerProfiles', 'staffRoles', 'adminControls'];
const PHASE_2_FEATURES: FeatureModuleKey[] = [
  'scheduling',
  'payments',
  'jobTracking',
  'chatMessaging',
  'pushNotifications',
  'photoUploads',
  'digitalSignatures',
];
const PHASE_3_FEATURES: FeatureModuleKey[] = [
  'touchscreenKiosk' as FeatureModuleKey,
  'reports',
  'realtimeSync',
  'aiTools',
  'inventory',
  'loyalty',
  'multiLocation',
  'smsEmailAlerts',
  'geolocation',
];

function phaseAmount(
  platforms: Record<PlatformKey, boolean>,
  features: Partial<Record<FeatureModuleKey, boolean>>,
  pKeys: PlatformKey[],
  fKeys: FeatureModuleKey[],
  marketMultiplier: number,
) {
  let sum = 0;
  pKeys.forEach((k) => {
    if (platforms[k]) {
      let price = PLATFORM_OPTIONS[k].price;
      if (k === 'touchscreenKiosk') price += TOUCHSCREEN_COMPLEXITY_SURCHARGE;
      sum += price;
    }
  });
  fKeys.forEach((k) => {
    const m = FEATURE_MODULES.find((mm) => mm.key === k);
    if (m && features[k]) sum += m.price;
  });
  return round(sum * marketMultiplier);
}

/* ================================================================== */
/* MAIN                                                                */
/* ================================================================== */
export function calculateQuote(input: QuoteInput) {
  const platform = computePlatformSubtotal(input.platforms);
  const feature = computeFeatureSubtotal(input.features);
  const quantity = computeQuantitySubtotal(input.quantities);

  // 1. US-base build fee (pre-multiplier)
  const buildFeeBase = platform.subtotal + feature.subtotal + quantity.subtotal;

  // 2. Complexity & timeline multipliers (applied to build fee only)
  const complexity = COMPLEXITY_MULTIPLIERS.find((c) => c.key === input.complexity)!;
  const timeline = TIMELINE_MULTIPLIERS.find((t) => t.key === input.timeline)!;
  const usBaseSetup = buildFeeBase * complexity.value * timeline.value; // US, pre-country

  // 3. Country intelligence
  const countryInfo = resolveCountry(input.country);
  const effectiveMultiplier =
    input.manualMultiplier != null ? input.manualMultiplier : countryInfo.suggestedMultiplier;
  const isManualOverride = input.manualMultiplier != null;

  // 4. Market-adjusted setup (pre-minimum)
  const marketSetupRaw = usBaseSetup * effectiveMultiplier;

  // 5. Minimum protection
  const floorInfo = computeMinimumFloor(input.platforms, buildFeeBase);
  const minApplied = !input.overrideMinimums && marketSetupRaw < floorInfo.floor;
  const finalSetup = round(
    input.overrideMinimums ? marketSetupRaw : Math.max(marketSetupRaw, floorInfo.floor),
  );

  // 6. Monthly support
  const recommendedTierKey = recommendSupportTier(input.complexity);
  const tierKey = input.supportTierOverride ?? recommendedTierKey;
  const supportTier = SUPPORT_TIERS.find((t) => t.key === tierKey)!;
  const addonTotal = input.supportAddons.reduce((sum, key) => {
    const a = SUPPORT_ADDONS.find((x) => x.key === key);
    return sum + (a?.price ?? 0);
  }, 0);
  const monthlyBase = supportTier.price + addonTotal;
  const monthlyMarketRaw = monthlyBase * effectiveMultiplier;
  const monthlyFloorApplied = monthlyMarketRaw < MINIMUMS.monthly;
  const finalMonthly = round(Math.max(monthlyMarketRaw, MINIMUMS.monthly));

  // 7. Package recommendation (from US base, then show market price)
  const pkg = recommendPackage(usBaseSetup);

  // 8. Timeline estimate (scope-based, compressed by the rush selection)
  const timelineEstimate = estimateTimeline(buildFeeBase, input.timeline);

  // 9. Payment schedule
  const schedule = PAYMENT_SCHEDULES[input.paymentSchedule];
  const financedTotal = round(finalSetup * (1 + schedule.financingUplift));
  const paymentPlan = schedule.splits.map((s) => ({
    label: s.label,
    amount: round(financedTotal * s.pct),
    pct: s.pct,
  }));

  // 10. Country comparison table (all four tiers, using each tier's suggested mult)
  const comparison = (Object.keys(COUNTRY_TIERS) as CountryTierKey[]).map((k) => {
    const t = COUNTRY_TIERS[k];
    const setupRaw = usBaseSetup * t.suggested;
    const setup = round(Math.max(setupRaw, floorInfo.floor));
    const monthly = round(Math.max(monthlyBase * t.suggested, MINIMUMS.monthly));
    return {
      tierKey: k,
      label: t.label,
      multiplier: t.suggested,
      setup,
      monthly,
      floored: setupRaw < floorInfo.floor,
    };
  });

  // 11. Budget reality check
  let budgetCheck: null | {
    gap: number;
    covered: boolean;
    message: string;
    suggestion: string;
  } = null;
  if (input.clientBudget != null && input.clientBudget > 0) {
    const gap = finalSetup - input.clientBudget;
    if (gap <= 0) {
      budgetCheck = {
        gap: 0,
        covered: true,
        message: `Client budget of $${input.clientBudget.toLocaleString()} covers the recommended setup of $${finalSetup.toLocaleString()}.`,
        suggestion: 'Proceed with full scope. Consider proposing the next tier up.',
      };
    } else {
      budgetCheck = {
        gap: round(gap),
        covered: false,
        message: `Budget gap of $${round(gap).toLocaleString()} — recommended setup is $${finalSetup.toLocaleString()}, client budget is $${input.clientBudget.toLocaleString()}.`,
        suggestion:
          gap > finalSetup * 0.4
            ? 'Large gap: recommend a phased build (start with Phase 1 core) or a reduced Starter scope.'
            : 'Small gap: offer a payment plan, trim optional modules, or nudge budget up.',
      };
    }
  }

  // 12. Phased pricing
  const phases = [
    {
      name: 'Phase 1 — Core Foundation',
      detail: 'Web dashboard, customer database, core workflow.',
      amount: phaseAmount(input.platforms, input.features, PHASE_1_PLATFORMS, PHASE_1_FEATURES, effectiveMultiplier),
    },
    {
      name: 'Phase 2 — Mobile & Access',
      detail: 'Mobile apps, employee tools, customer portal.',
      amount: phaseAmount(input.platforms, input.features, PHASE_2_PLATFORMS, PHASE_2_FEATURES, effectiveMultiplier),
    },
    {
      name: 'Phase 3 — Advanced Systems',
      detail: 'Touchscreen, automation, integrations, analytics.',
      amount: phaseAmount(input.platforms, input.features, PHASE_3_PLATFORMS, PHASE_3_FEATURES, effectiveMultiplier),
    },
  ];

  // 13. Pricing strategy recommendation
  const strategy = recommendStrategy({
    tierKey: countryInfo.tierKey,
    effectiveMultiplier,
    finalSetup,
    floor: floorInfo.floor,
    marketSetupRaw,
    overrideMinimums: input.overrideMinimums,
    budgetCheck,
    isSeriousCustom: floorInfo.isSeriousCustom,
  });

  // 14. Profit protection warnings (internal only)
  const warnings = buildWarnings({
    buildFeeBase,
    finalSetup,
    effectiveMultiplier,
    marketSetupRaw,
    floor: floorInfo.floor,
    overrideMinimums: input.overrideMinimums,
    minApplied,
    monthlyFloorApplied,
    isManualOverride,
    countryMapped: countryInfo.mapped,
  });

  return {
    // subtotals
    platform,
    feature,
    quantity,
    buildFeeBase: round(buildFeeBase),
    // multipliers
    complexity,
    timeline,
    usBaseSetup: round(usBaseSetup),
    // country
    country: input.country,
    countryTier: countryInfo.tier,
    countryTierKey: countryInfo.tierKey,
    countryMapped: countryInfo.mapped,
    suggestedMultiplier: countryInfo.suggestedMultiplier,
    effectiveMultiplier,
    isManualOverride,
    // setup
    marketSetupRaw: round(marketSetupRaw),
    minimumFloor: floorInfo.floor,
    minApplied,
    finalSetup,
    // monthly
    recommendedSupportTierKey: recommendedTierKey,
    supportTier,
    addonTotal,
    monthlyBase: round(monthlyBase),
    finalMonthly,
    monthlyFloorApplied,
    // package
    pkg,
    // timeline
    timelineEstimate,
    // payment
    schedule,
    financedTotal,
    paymentPlan,
    // extras
    comparison,
    budgetCheck,
    phases,
    strategy,
    warnings,
  };
}

export type QuoteResult = ReturnType<typeof calculateQuote>;

/* ------------------------------------------------------------------ */
function recommendStrategy(args: {
  tierKey: CountryTierKey;
  effectiveMultiplier: number;
  finalSetup: number;
  floor: number;
  marketSetupRaw: number;
  overrideMinimums: boolean;
  budgetCheck: { covered: boolean; gap: number } | null;
  isSeriousCustom: boolean;
}) {
  const { tierKey, effectiveMultiplier, finalSetup, floor, marketSetupRaw, overrideMinimums, budgetCheck } = args;

  // Do Not Accept — Too Low: admin forced price below profitable floor.
  if (overrideMinimums && marketSetupRaw < floor * 0.85) {
    return {
      key: 'doNotAccept',
      label: 'Do Not Accept — Too Low',
      color: 'red',
      reason: `Manual override pushes setup ($${finalSetup.toLocaleString()}) below the profitable floor ($${floor.toLocaleString()}). Reduce scope or decline.`,
    };
  }

  // Large budget gap → phased.
  if (budgetCheck && !budgetCheck.covered && budgetCheck.gap > finalSetup * 0.4) {
    return {
      key: 'phased',
      label: 'Phased Build',
      color: 'amber',
      reason: 'Client budget is well below full scope. Propose Phase 1 core first, then expand.',
    };
  }

  // Tier 4 / heavy discount → starter or template.
  if (tierKey === 'tier4' || effectiveMultiplier <= 0.55) {
    return {
      key: 'emergingStarter',
      label: 'Emerging Market Starter',
      color: 'sky',
      reason: 'Budget-sensitive market: lead with a lean Starter scope, protect the floor, expand later.',
    };
  }
  if (effectiveMultiplier <= 0.7 && !args.isSeriousCustom) {
    return {
      key: 'template',
      label: 'Template-Based',
      color: 'sky',
      reason: 'Low multiplier and light scope: consider a template-based build to stay profitable.',
    };
  }

  // Premium markets, large scope.
  if ((tierKey === 'tier1' || tierKey === 'tier2') && finalSetup >= 20000) {
    return {
      key: 'premiumCustom',
      label: 'Premium Custom',
      color: 'emerald',
      reason: 'Strong market and serious scope: full premium custom build.',
    };
  }

  return {
    key: 'standardGrowth',
    label: 'Standard Growth',
    color: 'blue',
    reason: 'Solid mid-market fit: standard Growth-tier build and support.',
  };
}

/* ------------------------------------------------------------------ */
function buildWarnings(args: {
  buildFeeBase: number;
  finalSetup: number;
  effectiveMultiplier: number;
  marketSetupRaw: number;
  floor: number;
  overrideMinimums: boolean;
  minApplied: boolean;
  monthlyFloorApplied: boolean;
  isManualOverride: boolean;
  countryMapped: boolean;
}) {
  const warnings: { level: 'red' | 'amber' | 'info'; text: string }[] = [];

  if (args.overrideMinimums && args.marketSetupRaw < args.floor) {
    warnings.push({
      level: 'red',
      text: `Minimum protection is OVERRIDDEN. Setup ($${args.finalSetup.toLocaleString()}) is below the profitable floor of $${args.floor.toLocaleString()}. This build may be below-profitable.`,
    });
  } else if (args.minApplied) {
    warnings.push({
      level: 'info',
      text: `Minimum price protection applied — raised to the $${args.floor.toLocaleString()} floor for this scope.`,
    });
  }

  // Effective hourly check
  const estHours = args.buildFeeBase / PROFIT_PROTECTION.internalBuildRate;
  if (estHours > 0) {
    const effHourly = args.finalSetup / estHours;
    if (effHourly < PROFIT_PROTECTION.minEffectiveHourly) {
      warnings.push({
        level: 'amber',
        text: `Effective rate ≈ $${Math.round(effHourly)}/hr (est. ${Math.round(estHours)} hrs) is under the $${PROFIT_PROTECTION.minEffectiveHourly}/hr floor. Trim scope or raise price.`,
      });
    }
  }

  if (args.effectiveMultiplier <= PROFIT_PROTECTION.aggressiveMultiplierThreshold && args.buildFeeBase >= 15000) {
    warnings.push({
      level: 'amber',
      text: `Aggressive discount (×${args.effectiveMultiplier}) on a large scope. Prefer reducing scope over deep discounting.`,
    });
  }

  if (args.monthlyFloorApplied) {
    warnings.push({
      level: 'info',
      text: `Monthly raised to the $${MINIMUMS.monthly} floor — this is near break-even support; keep support scope tight.`,
    });
  }

  if (args.isManualOverride) {
    warnings.push({
      level: 'info',
      text: `Manual multiplier override in use (×${args.effectiveMultiplier}). Country auto-suggestion is bypassed.`,
    });
  }

  if (!args.countryMapped) {
    warnings.push({
      level: 'info',
      text: 'Selected country is not explicitly mapped — defaulted to Tier 1 (safest). Set a manual multiplier if needed.',
    });
  }

  return warnings;
}
