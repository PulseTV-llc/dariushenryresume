import { ArrowRight, Check, Globe2 } from 'lucide-react';
import TrackedLink from './TrackedLink';
import {
  ENGAGEMENT_TIERS,
  PRICING_FACTORS,
  INTERNATIONAL_PRICING,
  type EngagementTier,
} from '@/lib/marketing/pricing';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

function TierCard({ tier }: { tier: EngagementTier }) {
  const isBlueprint = tier.key === 'blueprint';
  return (
    <li
      className={`relative flex flex-col rounded-2xl border p-6 ${
        tier.highlight
          ? 'border-sky-400/40 bg-gradient-to-b from-sky-500/[0.12] to-blue-600/[0.03] shadow-[0_0_60px_-24px_rgba(56,189,248,0.5)]'
          : isBlueprint
            ? 'border-white/15 bg-white/[0.035]'
            : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      {tier.highlight && (
        <span className="absolute -top-3 left-6 rounded-full border border-sky-400/40 bg-[#07101f] px-2.5 py-0.5 mono-label text-[10px] text-sky-200">
          Full operating system
        </span>
      )}
      {isBlueprint && (
        <span className="absolute -top-3 left-6 rounded-full border border-white/20 bg-[#07101f] px-2.5 py-0.5 mono-label text-[10px] text-gray-200">
          Recommended first step
        </span>
      )}
      <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
      <p className="mt-2 text-sm text-gray-400 leading-relaxed sm:min-h-[4.5rem]">{tier.summary}</p>

      <div className="mt-5">
        <p className="mono-label text-[10px] text-gray-500">Starting from</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white tracking-tight">{money(tier.from)}</span>
          <span className="text-sm text-gray-500">{tier.unit}</span>
        </p>
        <p className="mt-2 text-sm text-gray-400 min-h-[2.5rem]">
          {tier.monthlyFrom ? (
            <>
              Managed Platform &amp; Support from{' '}
              <span className="text-white font-medium">{money(tier.monthlyFrom)}/mo</span>
            </>
          ) : (
            'No recurring fee'
          )}
        </p>
      </div>

      <ul className="mt-5 pt-5 border-t border-white/10 space-y-2.5 flex-1">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs text-gray-500 leading-relaxed">
        <span className="mono-label text-[10px] text-gray-600">Example</span>{' '}
        {tier.examples[0]}
      </p>

      <TrackedLink
        href={tier.cta.href}
        event={isBlueprint ? 'pricing_blueprint_click' : 'pricing_tier_click'}
        eventProps={{ tier: tier.key }}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${
          tier.highlight || isBlueprint
            ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500'
            : 'border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]'
        }`}
      >
        {tier.cta.label}
        <ArrowRight className="w-4 h-4" />
      </TrackedLink>
    </li>
  );
}

/** Engagement pricing: starting points, what drives scope, and the international note. */
export default function EngagementPricing({ showFactors = true }: { showFactors?: boolean }) {
  return (
    <div>
      <ul className="grid gap-5 pt-3 sm:grid-cols-2 xl:grid-cols-4">
        {ENGAGEMENT_TIERS.map((t) => (
          <TierCard key={t.key} tier={t} />
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
        Starting points and examples, not fixed quotes. Every business system is scoped
        individually, and you receive a written estimate before build work is agreed. Larger
        multi-location and enterprise systems are scoped beyond these ranges.
      </p>

      {showFactors && (
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
            <h3 className="text-base font-semibold text-white">What determines exact pricing</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PRICING_FACTORS.map((f) => (
                <li key={f} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-300">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-sky-300" />
              <h3 className="mono-label text-sky-200">International pricing</h3>
            </div>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">{INTERNATIONAL_PRICING}</p>
          </div>
        </div>
      )}
    </div>
  );
}
