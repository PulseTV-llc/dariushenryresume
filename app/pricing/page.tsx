import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { Section, SectionHeading, PageHero, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import EngagementPricing from '@/components/marketing/EngagementPricing';
import BlueprintSection from '@/components/marketing/BlueprintSection';
import { MANAGED_PLATFORM_INCLUDES, PRICING_FAQ } from '@/lib/marketing/pricing';
import { SITE_URL } from '@/lib/marketing/site';
import { faqPageSchema } from '@/lib/structured-data-vexaos';

export const metadata: Metadata = {
  title: 'Pricing — Custom Business System Development & Managed Platform',
  description:
    'Transparent starting points for custom business software: Business Blueprint from $750, Launch Systems from $4,500, Growth Systems from $12,500, and Custom Business OS from $25,000, with Managed Platform & Support. Every system is scoped individually.',
  alternates: { canonical: `${SITE_URL}/pricing` },
};

export default function PricingPage() {
  const faqSchema = faqPageSchema(PRICING_FAQ);
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <PageHero
          eyebrow="Pricing"
          title={
            <>
              Every business system is{' '}
              <span className="gradient-text">scoped individually.</span>
            </>
          }
          subtitle="Custom project pricing with transparent starting points. A one-time build, then Managed Platform & Support that keeps the system running, secure, and improving."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton
              href="/contact?intent=blueprint"
              event="pricing_blueprint_click"
              eventProps={{ placement: 'pricing_hero' }}
              className="w-full sm:w-auto"
            >
              Start with a Blueprint
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/contact?intent=build" className="w-full sm:w-auto">
              Get a scoped estimate
            </SecondaryButton>
          </div>
        </PageHero>

        <Section className="pt-10 sm:pt-12">
          <EngagementPricing />
        </Section>

        {/* Managed platform */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                center={false}
                eyebrow="Managed Platform & Support"
                title="The system keeps running after launch."
                subtitle="Recurring fees are not a license to use generic software. They cover the infrastructure, security, and support that keep your system operating — and the improvements that keep it fitting your business as it changes."
              />
            </div>
            <ul className="lg:col-span-6 grid gap-3">
              {MANAGED_PLATFORM_INCLUDES.map((i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-[15px] text-gray-200">
                  <Check className="w-4 h-4 shrink-0 text-sky-400" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="blueprint" className="border-t border-white/10">
          <BlueprintSection />
        </Section>

        {/* FAQ */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="Questions" title="Pricing, answered plainly." />
          <div className="max-w-3xl mx-auto divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
            {PRICING_FAQ.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-white">
                  {f.q}
                  <span className="text-sky-300 transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <CTABand
          title="Get a number for your operation."
          subtitle="Tell us how the business runs. We’ll recommend a Blueprint, a build, or tell you honestly if neither makes sense yet."
          primary={{ label: 'Start Your Business Blueprint', href: '/contact?intent=blueprint', event: 'pricing_blueprint_click' }}
          secondary={{ label: 'Tell Us About Your Business', href: '/contact' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
