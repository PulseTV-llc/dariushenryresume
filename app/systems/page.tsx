import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { Section, SectionHeading, PageHero, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import SystemCard from '@/components/marketing/SystemCard';
import CaseStudyCard from '@/components/marketing/CaseStudyCard';
import RestaurantShowcase from '@/components/marketing/RestaurantShowcase';
import ModuleStrip from '@/components/marketing/ModuleStrip';
import { SYSTEMS, STATUS_META } from '@/lib/marketing/systems';
import { CASE_STUDIES } from '@/lib/marketing/case-studies';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'Systems — Restaurant, Facility, Workforce & Retail Operating Systems',
  description:
    'Explore complete business operating systems VexaOS builds: Restaurant & Café OS, Facility Operations OS, Workforce Operations OS, Retail OS, and Service Business OS — with interactive demos, walkthroughs, and case studies.',
  alternates: { canonical: `${SITE_URL}/systems` },
};

export default function SystemsPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Systems"
          title={
            <>
              See what VexaOS <span className="gradient-text">can build.</span>
            </>
          }
          subtitle="Complete operating systems assembled on one proven architecture. They show the range — your system is designed around your own operation."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact?intent=build" className="w-full sm:w-auto">
              Build My Business System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="#case-studies" className="w-full sm:w-auto">
              Read the case studies
            </SecondaryButton>
          </div>
        </PageHero>

        <Section className="pt-8">
          <ul className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
            {Object.entries(STATUS_META).map(([k, v]) => (
              <li key={k}>
                <span className="text-gray-300">{v.label}</span>
                {k === 'interactive' && ' — open it now'}
                {k === 'walkthrough' && ' — running software, shown on request'}
                {k === 'in-development' && ' — actively being built'}
                {k === 'coming-soon' && ' — demo environment in preparation'}
              </li>
            ))}
          </ul>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((s, i) => (
              <SystemCard key={s.slug} system={s} featured={i === 0} />
            ))}
          </div>
        </Section>

        <RestaurantShowcase />

        <Section id="case-studies" className="border-t border-white/10">
          <SectionHeading
            eyebrow="Case studies"
            title="Real software, labeled for what it is."
            subtitle="Internal deployments, platform demonstrations, and VexaOS’s own technology — never presented as outside clients. Client case studies will be published as engagements go live."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {CASE_STUDIES.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <ModuleStrip />
        </Section>

        <CTABand
          title="Your operation isn’t on this page yet."
          subtitle="Tell us how your business operates. We’ll design the system around it — on the same proven architecture."
        />
      </main>
      <SiteFooter />
    </>
  );
}
