import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading, PageHero, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import CapabilityGrid from '@/components/marketing/CapabilityGrid';
import ArchitectureDiagram from '@/components/marketing/ArchitectureDiagram';
import { BUILD_GROUPS, SOLUTION_AREAS } from '@/lib/marketing/capabilities';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'Solutions — Custom Business Management & Operations Software',
  description:
    'Custom business operating systems covering workforce management, POS and commerce, inventory, customer experience, connected hardware, facility operations, and analytics — designed around how your company works and built on proven VexaOS architecture.',
  alternates: { canonical: `${SITE_URL}/solutions` },
};

export default function SolutionsPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Custom Business OS"
          title={
            <>
              Software should fit your business —{' '}
              <span className="gradient-text">not the other way around.</span>
            </>
          }
          subtitle="Your company should not have to change the way it operates to fit its software. VexaOS builds the software around the way your company operates — one connected system across every part of the business."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact?intent=build" event="hero_build_system_click" eventProps={{ page: 'solutions' }} className="w-full sm:w-auto">
              Build My Business System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/systems" event="hero_demo_click" eventProps={{ page: 'solutions' }} className="w-full sm:w-auto">
              Explore Our Systems
            </SecondaryButton>
          </div>
        </PageHero>

        {/* Jump nav */}
        <nav aria-label="Solution areas" className="px-4 sm:px-6 lg:px-8">
          <ul className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
            {SOLUTION_AREAS.map((a) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-gray-300 hover:border-sky-400/30 hover:text-white transition-colors"
                >
                  <Icon name={a.icon} className="w-3.5 h-3.5 text-sky-300" />
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Section className="pt-16">
          <SectionHeading
            eyebrow="One connected system"
            title="Every area of the operation, on one architecture."
            subtitle="Workforce, commerce, inventory, customers, devices, facilities, and data share one identity, one organization model, and one data layer."
          />
          <ArchitectureDiagram />
        </Section>

        {/* Solution areas */}
        {SOLUTION_AREAS.map((area, i) => (
          <Section key={area.id} id={area.id} className={`border-t border-white/10 ${i % 2 === 0 ? 'bg-[#03060c]' : ''}`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/10 border border-white/10 items-center justify-center">
                    <Icon name={area.icon} className="w-5 h-5 text-sky-300" />
                  </span>
                  <span className="mono-label text-sky-300/90">{area.title}</span>
                </div>
                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                  {area.headline}
                </h2>
                <p className="mt-5 text-lg text-gray-400 leading-relaxed">{area.summary}</p>
                <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-400 leading-relaxed">
                  <span className="mono-label text-[10px] text-gray-500 block mb-1">Example build</span>
                  {area.example}
                </p>
              </div>
              <div className="lg:col-span-6">
                <p className="mono-label text-gray-500">Capabilities</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {area.capabilities.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[15px] text-gray-200">
                      <Check className="w-4 h-4 shrink-0 text-sky-400" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 mono-label text-gray-500">Proven technology underneath</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {area.modules.map((m) => (
                    <li key={m} className="rounded-lg border border-sky-400/20 bg-sky-500/[0.06] px-3 py-1.5 text-sm text-sky-100">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        ))}

        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Deliverables"
            title="From employee apps to executive dashboards."
            subtitle="The applications and systems a VexaOS build can include."
          />
          <CapabilityGrid groups={BUILD_GROUPS} />
          <p className="mt-10 text-center text-sm text-gray-500">
            Looking for your industry?{' '}
            <Link href="/industries" className="text-gray-300 underline underline-offset-4 decoration-white/20 hover:text-white">
              See industries we build for
            </Link>
            .
          </p>
        </Section>

        <CTABand
          title="Tell us how your business operates."
          subtitle="We’ll help you determine what should be connected, automated, rebuilt, or replaced."
        />
      </main>
      <SiteFooter />
    </>
  );
}
