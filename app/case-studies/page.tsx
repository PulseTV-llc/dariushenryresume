import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, Section, CTABand } from '@/components/site/Section';
import CaseStudyCard from '@/components/marketing/CaseStudyCard';
import { CASE_STUDIES, ENGAGEMENT_LABEL } from '@/lib/marketing/case-studies';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'Case Studies — Custom Business Systems Built on VexaOS',
  description:
    'Case studies of business systems built on VexaOS architecture — workforce, restaurant, and facility operations — each clearly labeled as a client engagement, internal deployment, platform, or demonstration.',
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Case studies"
          title={
            <>
              Real systems, <span className="gradient-text">labeled honestly.</span>
            </>
          }
          subtitle="Every case study states exactly what it is. We never present an internal project or a demonstration as an outside client — client engagements will be published here as they go live."
        />
        <Section className="pt-8">
          <ul className="mb-8 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
            {Object.values(ENGAGEMENT_LABEL).map((l) => (
              <li key={l} className="rounded-full border border-white/10 px-3 py-1">{l}</li>
            ))}
          </ul>
          <div className="grid gap-4 md:grid-cols-3">
            {CASE_STUDIES.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Section>
        <CTABand
          title="Your system could be the next case study."
          subtitle="Tell us how your business operates. We’ll design the system around it."
        />
      </main>
      <SiteFooter />
    </>
  );
}
