import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { Section, SectionHeading, SecondaryButton } from '@/components/site/Section';
import Hero from '@/components/marketing/Hero';
import ProblemSection from '@/components/marketing/ProblemSection';
import ArchitectureDiagram from '@/components/marketing/ArchitectureDiagram';
import CapabilityGrid from '@/components/marketing/CapabilityGrid';
import SystemCard from '@/components/marketing/SystemCard';
import CaseStudyCard from '@/components/marketing/CaseStudyCard';
import RestaurantShowcase from '@/components/marketing/RestaurantShowcase';
import PlatformLayers from '@/components/marketing/PlatformLayers';
import ModuleStrip from '@/components/marketing/ModuleStrip';
import ArchitecturePrinciples from '@/components/marketing/ArchitecturePrinciples';
import IndustryCard from '@/components/marketing/IndustryCard';
import ProcessTimeline from '@/components/marketing/ProcessTimeline';
import EngagementPricing from '@/components/marketing/EngagementPricing';
import BlueprintSection from '@/components/marketing/BlueprintSection';
import FounderSection from '@/components/marketing/FounderSection';
import GlobalDelivery from '@/components/marketing/GlobalDelivery';
import CTASection from '@/components/marketing/CTASection';
import { BUILD_GROUPS } from '@/lib/marketing/capabilities';
import { SYSTEMS } from '@/lib/marketing/systems';
import { CASE_STUDIES } from '@/lib/marketing/case-studies';
import { INDUSTRIES } from '@/lib/marketing/industries';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: {
    absolute: 'VexaOS — Custom Business Operating Systems | Web, Mobile & Hardware',
  },
  description:
    'VexaOS designs and builds custom business operating systems — web control centers, iOS and Android apps, POS, workforce, inventory, kiosks, and connected hardware on one architecture. For multi-location and operationally complex companies, delivered worldwide.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'VexaOS — Custom Business Operating Systems',
    description:
      'Software should fit your business — not the other way around. Custom systems across web, mobile, operations, data, and hardware, built on proven VexaOS architecture.',
    url: SITE_URL,
  },
};

const SOLUTION_STEPS = [
  ['Study', 'We study how your organization actually works — the roles, locations, exceptions, and handoffs.'],
  ['Diagnose', 'We identify where systems break down: duplicate entry, blind spots, and work that depends on memory.'],
  ['Design', 'We design the software architecture around the business, then build it on proven VexaOS infrastructure.'],
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        {/* 1 — Hero */}
        <Hero />

        {/* 2 — The problem */}
        <ProblemSection />

        {/* 3 — The solution */}
        <Section id="solution" className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="The solution"
            title="One connected operating system."
            subtitle="Designed around your workflows. Your operation, your people, your devices — one system."
          />
          <ArchitectureDiagram />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {SOLUTION_STEPS.map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="font-mono text-xs text-sky-300">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{t}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* 4 — What VexaOS can build */}
        <Section id="what-we-build" className="border-t border-white/10">
          <SectionHeading
            eyebrow="Systems we build"
            title="What VexaOS Can Build"
            subtitle="From employee apps to executive dashboards. Web. Mobile. Hardware. One architecture."
          />
          <CapabilityGrid groups={BUILD_GROUPS} />
          <div className="mt-10 flex justify-center">
            <SecondaryButton href="/solutions">
              Explore solutions
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </Section>

        {/* 5 — Flagship systems & demos */}
        <Section id="systems" className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Systems & demos"
            title="See What We Can Build"
            subtitle="Complete operating systems assembled on the same VexaOS architecture. Each is labeled honestly — interactive, available as a walkthrough, in development, or coming soon."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((s, i) => (
              <SystemCard key={s.slug} system={s} featured={i === 0} />
            ))}
            <div className="flex flex-col justify-center rounded-2xl border border-dashed border-white/15 p-6 sm:p-7">
              <p className="text-lg font-semibold text-white">Your operation isn&rsquo;t listed?</p>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                These are examples, not a menu. Your system is designed around your specific
                operation — on the same proven architecture.
              </p>
              <a href="#start" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">
                Tell us how yours works
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <p className="mono-label text-gray-500">Case studies</p>
                <h3 className="mt-2 text-2xl font-semibold text-white tracking-tight">Real software, labeled for what it is</h3>
              </div>
              <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">
                All case studies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {CASE_STUDIES.map((c) => (
                <CaseStudyCard key={c.slug} study={c} />
              ))}
            </div>
          </div>
        </Section>

        {/* 6 — Restaurant / café flagship */}
        <RestaurantShowcase />

        {/* 7 — Platform advantage */}
        <Section id="platform-advantage" className="border-t border-white/10">
          <PlatformLayers />
          <div className="mt-6">
            <ModuleStrip />
          </div>
        </Section>

        {/* 8 — Platform architecture */}
        <Section id="architecture" className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Platform architecture"
            title="One identity. One organization model. One data layer."
            subtitle="Proven architecture. Custom implementation. Six principles every VexaOS system is built on."
          />
          <ArchitecturePrinciples />
          <div className="mt-10 flex justify-center">
            <SecondaryButton href="/platform">
              Explore the platform
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </Section>

        {/* 9 — Industries */}
        <Section id="industries" className="border-t border-white/10">
          <SectionHeading
            eyebrow="Industries"
            title="Built for operationally complex businesses."
            subtitle="You may not be a Fortune 500 company, but your operational complexity can still be enterprise-level. VexaOS is built for organizations running roughly 2 to 50+ locations without a large internal software team."
          />
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind) => (
              <IndustryCard key={ind.slug} industry={ind} />
            ))}
          </div>
        </Section>

        {/* 10 — How it works */}
        <Section id="process" className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="How it works"
            title="From discovery to a system that keeps improving."
            subtitle="A consulting-grade process where the system is designed and built by the same hands."
          />
          <ProcessTimeline />
        </Section>

        {/* 11 — Pricing */}
        <Section id="pricing" className="border-t border-white/10">
          <SectionHeading
            eyebrow="Pricing"
            title="Every business system is scoped individually."
            subtitle="Custom project pricing with transparent starting points. Recurring fees cover Managed Platform & Support — hosting, monitoring, security, and ongoing improvements."
          />
          <EngagementPricing />
          <div className="mt-10 flex justify-center">
            <SecondaryButton href="/pricing">
              Pricing details
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </Section>

        {/* 12 — Business Blueprint */}
        <Section id="blueprint" className="bg-[#03060c] border-t border-white/10">
          <BlueprintSection showDeliverables={false} />
        </Section>

        {/* 13 — Founder */}
        <Section id="founder" className="border-t border-white/10">
          <FounderSection />
        </Section>

        {/* 14 — Global delivery */}
        <Section id="global" className="bg-[#03060c] border-t border-white/10">
          <GlobalDelivery />
        </Section>

        {/* 15 — Final CTA + intake */}
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
