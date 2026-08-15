import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import {
  Section,
  SectionHeading,
  PageHero,
  CTABand,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import {
  usd,
  BUNDLES,
  STANDALONE_PRICING,
  DEVICE_PRICING,
  FOUNDING_OFFER,
  PLAN_TIERS,
  PRICING_DISCLAIMER,
  PROPOSED_PRICE_NOTE,
  TOUCHBOARD_PRICING_STATEMENT,
  PRODUCTS_BY_SLUG,
  HARDWARE_LEASE,
  SITE_URL,
} from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Pricing — Bundles, standalone products, and device software',
  description:
    'VexaOS pricing: Workforce $79, Operations $149, Commerce $179, and Complete $249 per location per month. Standalone products from $59. Founding Customer rates for the first 25 organizations.',
  alternates: { canonical: `${SITE_URL}/pricing` },
};

const FAQ = [
  {
    q: 'Do I have to buy a bundle?',
    a: 'No. ShyftGrid, Commerce Ops, Inventory Ops, and Inspections can each be bought standalone. Bundles exist because most operators end up wanting more than one, and the bundle costs less than the parts.',
  },
  {
    q: 'Is the platform an extra charge?',
    a: 'No. The VexaOS platform — identity, the organization model, roles and permissions, the shared data layer, and the device registry — is included with every bundle and every standalone product. There is no separate platform line.',
  },
  {
    q: 'How is a "location" counted?',
    a: 'A location is a physical site operating under your organization. Locations 2–5 bill at 80% of the bundle rate; 6–20 and 21+ are quoted individually. Device software never takes the multi-location discount, and rollup reporting across sites is included.',
  },
  {
    q: 'Are staff accounts charged per seat?',
    a: 'No. Staff accounts are unlimited within a location. Pricing is per location and per device, never per user — we do not want pricing to discourage you from putting the system in front of the people who use it.',
  },
  {
    q: 'What about Facility Ops and Inspections?',
    a: 'Both are in beta. Inspections is priced at $49 per location per month. Facility Ops does not have confirmed commercial terms yet, so we do not publish a rate for it — talk to us and we will work them out directly rather than put a number on the page we cannot stand behind.',
  },
  {
    q: 'Is hardware included?',
    a: `No — device software and hardware are billed separately. ${TOUCHBOARD_PRICING_STATEMENT} Displays can be purchased outright or leased; the flagship ${HARDWARE_LEASE.size} board is ${usd(HARDWARE_LEASE.purchase * 100)} to buy or $${HARDWARE_LEASE.monthly}/month on a ${HARDWARE_LEASE.term} lease.`,
  },
  {
    q: 'What about payment processing?',
    a: 'Payment processing fees are charged by the processor, not by us. Commerce Ops works with your processor rather than forcing you onto ours.',
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Pricing"
          title={
            <>
              Priced per location.{' '}
              <span className="gradient-text">Never per person.</span>
            </>
          }
          subtitle="Pick the bundle that matches how you operate, or buy a single product on its own. The VexaOS platform is included either way."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo">
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/contact">Get a quote</SecondaryButton>
          </div>
        </PageHero>

        {/* ---- Founding Customer banner ---- */}
        <Section className="pt-6 pb-0">
          <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/[0.10] via-amber-500/[0.04] to-transparent px-6 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-amber-300 to-orange-600 items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </span>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200/90">
                  {FOUNDING_OFFER.name} · first {FOUNDING_OFFER.limit} organizations
                </p>
                <p className="mt-1.5 text-[15px] text-gray-300 leading-relaxed">
                  {FOUNDING_OFFER.blurb}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ---- Bundles ---- */}
        <Section>
          <SectionHeading
            eyebrow="Bundles"
            title="The way most operators buy."
            subtitle="Every bundle includes the VexaOS platform and unlimited staff accounts. Prices are per location, per month."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BUNDLES.map((b) => (
              <div
                key={b.key}
                className={`flex flex-col rounded-3xl border p-7 ${
                  b.highlight
                    ? 'border-sky-400/35 bg-gradient-to-b from-sky-500/[0.10] to-transparent'
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                {b.highlight && (
                  <span className="self-start mb-4 px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-400/25 text-[11px] font-semibold text-sky-200">
                    Everything
                  </span>
                )}
                <h3 className="text-lg font-bold text-white">{b.name}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed min-h-[3.5rem]">
                  {b.blurb}
                </p>

                <p className="mt-5 text-4xl font-bold text-white tracking-tight">
                  {usd(b.priceCents)}
                </p>
                <p className="mt-1 text-[13px] text-gray-500">per location / month</p>

                <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-amber-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  {usd(b.foundingCents)} founding rate
                </p>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-3.5">
                    Includes
                  </p>
                  <ul className="space-y-2.5">
                    {b.products.map((slug) => {
                      const p = PRODUCTS_BY_SLUG[slug];
                      return (
                        <li
                          key={slug}
                          className="flex items-start gap-2.5 text-sm text-gray-300"
                        >
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                          {p ? p.name : slug}
                        </li>
                      );
                    })}
                    {b.extras.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400/70" />
                        {e}
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 text-sm text-gray-500">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-gray-600" />
                      VexaOS platform + unlimited staff
                    </li>
                  </ul>
                </div>

                <div className="mt-7">
                  {b.highlight ? (
                    <PrimaryButton href="/demo" className="w-full text-sm py-3">
                      Book a demo
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton href="/demo" className="w-full text-sm py-3">
                      Book a demo
                    </SecondaryButton>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-gray-500 leading-relaxed">
            {PRICING_DISCLAIMER}
          </p>
        </Section>

        {/* ---- Standalone ---- */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Standalone"
            title="Or buy exactly one thing."
            subtitle="Each product solves its own problem and runs on its own. The platform comes with it either way."
          />
          <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 overflow-hidden">
            {STANDALONE_PRICING.map((p, i) => (
              <div
                key={p.slug}
                className={`grid sm:grid-cols-12 gap-3 sm:gap-6 items-center px-6 sm:px-8 py-6 ${
                  i > 0 ? 'border-t border-white/10' : ''
                } ${p.comingSoon ? 'bg-white/[0.01]' : ''}`}
              >
                <div className="sm:col-span-8">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {p.href ? (
                      <Link
                        href={p.href}
                        className="text-base font-semibold text-white hover:text-sky-200 transition-colors"
                      >
                        {p.name}
                      </Link>
                    ) : (
                      <span className="text-base font-semibold text-white">{p.name}</span>
                    )}
                    {p.comingSoon && (
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Coming soon
                      </span>
                    )}
                    {p.proposed && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-400/30 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                        Proposed
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{p.summary}</p>
                </div>
                <div className="sm:col-span-4 sm:text-right">
                  {p.comingSoon || p.priceCents === null ? (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                    >
                      Contact us
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <>
                      <p
                        className={`text-2xl font-bold tracking-tight ${
                          p.proposed ? 'text-amber-100' : 'text-white'
                        }`}
                      >
                        {usd(p.priceCents)}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">per location / month</p>
                      {p.proposed && (
                        <Link
                          href="/contact"
                          className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200 hover:text-amber-100 transition-colors"
                        >
                          Confirm this rate
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {STANDALONE_PRICING.some((p) => p.proposed) && (
            <p className="mt-6 max-w-4xl mx-auto flex items-start gap-2.5 rounded-xl border border-amber-400/25 bg-amber-500/[0.06] px-5 py-4 text-sm text-amber-100/90 leading-relaxed">
              <span className="mt-0.5 px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-[10px] font-semibold uppercase tracking-wider text-amber-200 shrink-0">
                Proposed
              </span>
              {PROPOSED_PRICE_NOTE}
            </p>
          )}
        </Section>

        {/* ---- Device software ---- */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Device software"
            title="Screens are licensed per device."
            subtitle="The software that runs on a kiosk or a board is priced per device, separately from your per-location subscription. Hardware is separate again."
          />
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {DEVICE_PRICING.map((d) => (
              <div
                key={d.slug}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-8"
              >
                <h3 className="text-lg font-bold text-white">{d.name}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{d.summary}</p>

                <p className="mt-6 text-4xl font-bold text-white tracking-tight">
                  {usd(d.priceCents)}
                </p>
                <p className="mt-1 text-[13px] text-gray-500">{d.unit}</p>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3 flex-1">
                  {d.includedWithComplete > 0 && (
                    <p className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                      VexaOS Complete includes {d.includedWithComplete} license per location
                    </p>
                  )}
                  <p className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                    {d.includedWithComplete > 0
                      ? `Additional boards ${usd(d.completeCents)}/device/mo on Complete`
                      : `${usd(d.completeCents)}/device/mo with VexaOS Complete`}
                  </p>
                  <p className="flex items-start gap-2.5 text-sm text-gray-500">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-gray-600" />
                    Hardware sold separately
                  </p>
                </div>

                <Link
                  href={d.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  About {d.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-gray-200 font-medium">TouchBoard, precisely:</span>{' '}
              {TOUCHBOARD_PRICING_STATEMENT}
            </p>
          </div>
        </Section>

        {/* ---- Founding offer detail ---- */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="max-w-4xl mx-auto rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[0.08] to-transparent p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-[11px] font-semibold tracking-[0.16em] uppercase text-amber-200">
                  <Sparkles className="w-3 h-3" />
                  {FOUNDING_OFFER.name}
                </p>
                <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Founding rates, held for {FOUNDING_OFFER.termMonths} months.
                </h2>
                <ul className="mt-6 space-y-2.5">
                  {FOUNDING_OFFER.terms.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-gray-400">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-amber-300/80" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <PrimaryButton href="/demo">
                    Claim a founding place
                    <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-3 bg-white/[0.03] border-b border-white/10 px-4 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                      Bundle
                    </span>
                    <span className="text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                      List
                    </span>
                    <span className="text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200/90">
                      Founding
                    </span>
                  </div>
                  {BUNDLES.map((b, i) => (
                    <div
                      key={b.key}
                      className={`grid grid-cols-3 items-center px-4 py-3.5 ${
                        i > 0 ? 'border-t border-white/10' : ''
                      }`}
                    >
                      <span className="text-sm font-medium text-white">{b.name}</span>
                      <span className="text-right text-sm text-gray-500 line-through">
                        {usd(b.priceCents)}
                      </span>
                      <span className="text-right text-sm font-semibold text-amber-200">
                        {usd(b.foundingCents)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ---- How you buy ---- */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="How you buy"
            title="One site, several sites, or a network."
            subtitle="The products stay the same. What changes is volume pricing, administration, and how much of the rollout we run with you."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {PLAN_TIERS.map((t) => (
              <div
                key={t.key}
                className={`flex flex-col rounded-3xl border p-8 ${
                  t.highlight
                    ? 'border-sky-400/35 bg-gradient-to-b from-sky-500/[0.09] to-transparent'
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                {t.highlight && (
                  <span className="self-start mb-4 px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-400/25 text-[11px] font-semibold text-sky-200">
                    Most common
                  </span>
                )}
                <h3 className="text-xl font-bold text-white">{t.name}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t.blurb}</p>
                <p className="mt-6 text-2xl font-bold text-white tracking-tight">{t.priceNote}</p>
                <ul className="mt-7 space-y-3 flex-1">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-gray-400">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {t.highlight ? (
                    <PrimaryButton href={t.cta.href} className="w-full">
                      {t.cta.label}
                      <ArrowRight className="w-4 h-4" />
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton href={t.cta.href} className="w-full">
                      {t.cta.label}
                    </SecondaryButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---- Hardware note ---- */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Hardware is priced separately.
                </h2>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  Kiosks and boards are billed as hardware, on top of the per-device software
                  license. Buy outright, or lease the flagship {HARDWARE_LEASE.size} board at $
                  {HARDWARE_LEASE.monthly}/month over {HARDWARE_LEASE.term} with replacement
                  included.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <SecondaryButton href="/hardware">
                  See hardware pricing
                  <ArrowRight className="w-4 h-4" />
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Section>

        {/* ---- FAQ ---- */}
        <Section className="border-t border-white/10">
          <SectionHeading eyebrow="Questions" title="The things operators ask first." />
          <div className="max-w-3xl mx-auto grid gap-3">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-6"
              >
                <h3 className="text-base font-semibold text-white">{f.q}</h3>
                <p className="mt-2.5 text-sm text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Section>

        <CTABand
          title="Get a number for your operation."
          subtitle="Tell us how many locations, how many screens, and which products — we will put a real quote in front of you."
          primary={{ label: 'Get a quote', href: '/contact' }}
          secondary={{ label: 'Book a demo', href: '/demo' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
