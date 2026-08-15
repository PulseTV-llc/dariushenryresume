import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
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
  PRODUCT_PRICING,
  PLAN_TIERS,
  PRICING_DISCLAIMER,
  HARDWARE_LEASE,
  SITE_URL,
} from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Pricing — Platform plus the products you need',
  description:
    'VexaOS pricing: the platform plus any of the five products, priced separately per location. Volume pricing for multi-location operators and custom terms for enterprise and franchise groups.',
  alternates: { canonical: `${SITE_URL}/pricing` },
};

const FAQ = [
  {
    q: 'Do I have to buy all five products?',
    a: 'No. Each product is sold separately and works on its own. The VexaOS Platform line is required with any product because it carries identity, the organization model, the shared data layer, and device management.',
  },
  {
    q: 'How is a "location" counted?',
    a: 'A location is a physical site operating under your organization. Multi-location operators get volume pricing, and rollup reporting across sites is included at that level.',
  },
  {
    q: 'Are staff accounts charged per seat?',
    a: 'No. Staff accounts are unlimited within a location. We do not want pricing to discourage you from putting the system in front of the people who use it.',
  },
  {
    q: 'Is hardware included?',
    a: `No — hardware is billed separately. Displays can be purchased outright or leased; the flagship ${HARDWARE_LEASE.size} board is $${HARDWARE_LEASE.purchase.toLocaleString()} to buy or $${HARDWARE_LEASE.monthly}/month on a ${HARDWARE_LEASE.term} lease.`,
  },
  {
    q: 'What about payment processing?',
    a: 'Payment processing fees are charged by the processor, not by us. Commerce Ops works with your processor rather than forcing you onto ours.',
  },
  {
    q: 'What does onboarding cost?',
    a: 'Standard onboarding is included. Larger deployments — multi-location rollouts, data migration, staff training, or custom integrations — are scoped and quoted as part of an enterprise agreement.',
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
              Pay for the platform,{' '}
              <span className="gradient-text">then the products you use.</span>
            </>
          }
          subtitle="Six line items, priced separately. Nothing bundled you did not ask for, and no surprise per-seat charges when you hire."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo">
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/contact">Get a quote</SecondaryButton>
          </div>
        </PageHero>

        {/* Per-product pricing */}
        <Section className="pt-8">
          <SectionHeading
            eyebrow="Products"
            title="Priced per product, per location."
            subtitle="Start with the platform and one product. Add the rest as you need them — adding a product is a switch in the control center, not a migration."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_PRICING.map((p) => {
              const isPlatform = p.slug === 'platform';
              return (
                <div
                  key={p.slug}
                  className={`flex flex-col rounded-2xl border p-7 ${
                    isPlatform
                      ? 'border-sky-400/30 bg-gradient-to-br from-sky-500/[0.09] to-transparent'
                      : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                    {isPlatform && (
                      <span className="px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-400/25 text-[11px] font-semibold text-sky-200 shrink-0">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-3xl font-bold text-white tracking-tight">
                    <span className="text-base font-medium text-gray-500 align-top">from </span>$
                    {p.from}
                  </p>
                  <p className="mt-1 text-[13px] text-gray-500">{p.unit}</p>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  {!isPlatform && (
                    <Link
                      href={`/products/${p.slug}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                    >
                      About {p.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-gray-500 leading-relaxed">
            {PRICING_DISCLAIMER}
          </p>
        </Section>

        {/* Tiers */}
        <Section className="bg-[#03060c] border-t border-white/10">
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

        {/* Hardware note */}
        <Section className="border-t border-white/10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Hardware is priced separately.
                </h2>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  Kiosks and boards are billed as hardware, not as part of the subscription. Buy
                  outright, or lease the flagship {HARDWARE_LEASE.size} board at $
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

        {/* FAQ */}
        <Section className="bg-[#03060c] border-t border-white/10">
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
