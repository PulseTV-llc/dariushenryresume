import { track } from '@vercel/analytics';

/**
 * Conversion events for the marketing site.
 *
 * Reuses the Vercel Analytics integration already mounted in app/layout.tsx —
 * no additional vendor. Event names are a closed union so every CTA reports
 * into the same, predictable funnel.
 */
export type MarketingEvent =
  | 'nav_demo_click'
  | 'hero_demo_click'
  | 'hero_platform_click'
  | 'product_explore_click'
  | 'industry_explore_click'
  | 'final_cta_click'
  | 'contact_started'
  | 'contact_completed';

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
