import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading, PageHero, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import TrackedLink from '@/components/marketing/TrackedLink';
import { INDUSTRIES } from '@/lib/marketing/industries';
import { SYSTEMS_BY_SLUG } from '@/lib/marketing/systems';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'Industries — Multi-Location Business Software for Complex Operations',
  description:
    'Custom business operating systems for restaurants and cafés, hospitality, cleaning and facility services, retail, salons, gyms, auto service, property management, clinics, warehousing, field service, and franchise and multi-site operators.',
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
              Built for operationally <span className="gradient-text">complex businesses.</span>
            </>
          }
          subtitle="You may not be a Fortune 500 company, but your operational complexity can still be enterprise-level. VexaOS builds for organizations running roughly 2 to 50+ locations without a large internal software team."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact?intent=build" className="w-full sm:w-auto">
              Build My Business System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/systems" className="w-full sm:w-auto">
              Explore Our Systems
            </SecondaryButton>
          </div>
        </PageHero>

        <Section className="pt-8">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => {
              const system = ind.system ? SYSTEMS_BY_SLUG[ind.system] : undefined;
              return (
                <li key={ind.slug}>
                  <TrackedLink
                    href={`/industries/${ind.slug}`}
                    event="industry_cta_click"
                    eventProps={{ industry: ind.slug, placement: 'industries_index' }}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 hover:border-sky-400/30 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/10 border border-white/10 items-center justify-center">
                        <Icon name={ind.icon} className="w-5 h-5 text-sky-300" />
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-white group-hover:text-sky-200 transition-colors">{ind.name}</h2>
                        <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{ind.summary}</p>
                      </div>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-1.5 flex-1 content-start">
                      {ind.capabilities.slice(0, 5).map((c) => (
                        <li key={c} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[12px] text-gray-400">
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 group-hover:gap-2.5 transition-all">
                        See the system
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      {system && <span className="mono-label text-[10px] text-gray-500">{system.shortName}</span>}
                    </div>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Not listed?"
            title="Built around your operation — not your industry label."
            subtitle="Specialty businesses and multi-site operators rarely fit a category. If your operation has locations, people, customers, inventory, or devices to coordinate, it can run on one system."
          />
          <div className="flex justify-center">
            <PrimaryButton href="/contact?intent=build">
              Tell us how your business runs
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </div>
        </Section>

        <CTABand
          title="Your operation. Your workflows. Your system."
          subtitle="Start with a conversation about how your business operates — or a Business Blueprint."
        />
      </main>
      <SiteFooter />
    </>
  );
}
