'use client';

import { useSearchParams } from 'next/navigation';
import SystemIntakeForm from './SystemIntakeForm';
import { INDUSTRY_SLUG_TO_NAME, type IntakeIntent } from '@/lib/marketing/intake';
import { COUNTRY_OPTIONS } from '@/lib/marketing/global';

const INTENTS: IntakeIntent[] = ['build', 'blueprint', 'walkthrough'];

/**
 * Intake form pre-filled from campaign / CTA query params:
 *   ?intent=blueprint|build|walkthrough  ?industry=<slug>  ?country=<name>
 *   ?system=<system slug>  ?tier=<pricing tier key>
 * Must be rendered inside a <Suspense> boundary (useSearchParams).
 */
export default function IntakeFromParams({
  variant = 'full',
  placement,
  defaults,
}: {
  variant?: 'compact' | 'full';
  placement: string;
  defaults?: { intent?: IntakeIntent; country?: string; industry?: string };
}) {
  const params = useSearchParams();
  const intentParam = params.get('intent') as IntakeIntent | null;
  const industryParam = params.get('industry');
  const countryParam = params.get('country');

  const initial = {
    intent: intentParam && INTENTS.includes(intentParam) ? intentParam : defaults?.intent,
    industry: (industryParam && INDUSTRY_SLUG_TO_NAME[industryParam]) || defaults?.industry,
    country: (countryParam && COUNTRY_OPTIONS.includes(countryParam) ? countryParam : undefined) || defaults?.country,
    system: params.get('system')?.slice(0, 60) || undefined,
    tier: params.get('tier')?.slice(0, 40) || undefined,
  };

  return (
    <SystemIntakeForm
      // Remount when the prefill changes (e.g. client-side navigation between CTAs).
      key={`${initial.intent}-${initial.industry}-${initial.country}-${initial.system}-${initial.tier}`}
      variant={variant}
      placement={placement}
      initial={initial}
    />
  );
}
