import { track } from '@vercel/analytics';

/**
 * Conversion events for the marketing site.
 *
 * Reuses the Vercel Analytics integration already mounted in app/layout.tsx —
 * no additional vendor. Event names are a closed union so every CTA reports
 * into the same, predictable funnel.
 */
export type MarketingEvent =
  | 'hero_build_system_click'
  | 'hero_restaurant_click'
  | 'ecosystem_restaurant_click'
  | 'restaurant_demo_click'
  | 'hero_demo_click'
  | 'nav_build_system_click'
  | 'pricing_blueprint_click'
  | 'pricing_tier_click'
  | 'blueprint_started'
  | 'contact_started'
  | 'contact_step_completed'
  | 'contact_completed'
  | 'industry_cta_click'
  | 'system_explore_click'
  | 'demo_opened'
  | 'final_cta_click'
  | 'case_study_opened';

export type EventProps = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: MarketingEvent, props?: EventProps) {
  if (typeof window === 'undefined') return;
  try {
    track(name, props);
  } catch {
    // Analytics must never break a CTA.
  }
  // If a tag manager is ever added, it receives the same events for free.
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...props });
  }
}
