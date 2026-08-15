import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import {
  Section,
  SectionHeading,
  PageHero,
  CTABand,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import { VERTICALS, PRODUCTS_BY_SLUG, SITE_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Industries — Restaurants, salons, retail, gyms, auto service, hospitality',
  description:
    'VexaOS ships with vertical configurations for restaurants, barbershops and salons, retail, gyms, auto service, hospitality, clinics, and field service — the same platform, shaped to how each industry actually operates.',
  alternates: { canonical: `${SITE_URL}/industries` },
};

export default function IndustriesPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Industries"
          title={
            <>
              One platform,{' '}
              <span className="gradient-text">configured for your vertical.</span>
            </>
          }
          subtitle="A restaurant counter and a service bay need different screens, different workflows, and different reports. VexaOS ships vertical configurations rather than asking you to bend your operation around generic software."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo">
              Book a demo for your industry
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/products">See the products</SecondaryButton>
          </div>
        </PageHero>

        <Section className="pt-8">
          <div className="grid gap-4 md:grid-cols-2">
            {VERTICALS.map((v) => (
              <Link
                key={v.slug}
                href={`/industries/${v.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8 hover:border-sky-400/30 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                    <Icon name={v.icon} className="w-5 h-5 text-sky-300" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white group-hover:text-sky-200 transition-colors">
                      {v.name}
                    </h2>
                    <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{v.tagline}</p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-3">
                    Typical stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {v.stack.map((slug) => {
                      const p = PRODUCTS_BY_SLUG[slug];
                      if (!p) return null;
                      return (
                        <span
                          key={slug}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] text-gray-400"
                        >
                          {p.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 group-hover:gap-2.5 transition-all">
                  See the {v.name.toLowerCase()} setup
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Not listed?"
            title="The verticals are configuration, not hard-coded products."
            subtitle="VexaFront, Commerce Ops, and the rest are driven by configuration — catalogs, workflows, roles, and screens. If your operation looks like one of these with different words on it, it is a configuration conversation, not a custom build."
          />
          <div className="flex justify-center">
            <PrimaryButton href="/contact">
              Tell us how your business runs
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </div>
        </Section>

        <CTABand
          title="See your industry configuration."
          subtitle="We will walk the demo through your workflow — your services, your roles, your front counter."
        />
      </main>
      <SiteFooter />
    </>
  );
}
