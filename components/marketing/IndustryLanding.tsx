import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Minus } from 'lucide-react';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading, Eyebrow, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import ArchitectureDiagram from './ArchitectureDiagram';
import SystemCard from './SystemCard';
import RestaurantShowcase from './RestaurantShowcase';
import IndustryCard from './IndustryCard';
import CTASection from './CTASection';
import { INDUSTRIES, type Industry } from '@/lib/marketing/industries';
import { SYSTEMS_BY_SLUG } from '@/lib/marketing/systems';

/**
 * Reusable industry landing page body — hero, operational problems, the
 * VexaOS architecture for the industry, applications, capabilities, a
 * flagship system, and a pre-filled intake. Drives /industries/[slug] and is
 * designed to be reused by market-specific campaign pages.
 */
export default function IndustryLanding({ industry, marketLabel }: { industry: Industry; marketLabel?: string }) {
  const system = industry.system ? SYSTEMS_BY_SLUG[industry.system] : undefined;
  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 4);
  const nodes = industry.surfaces.map((s) => ({ label: s.title, icon: 'AppWindow', detail: s.platform }));
  const ctaHref = `/contact?intent=build&industry=${industry.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 sm:pt-36 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(14,165,233,0.16), rgba(14,165,233,0))' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Industries
          </Link>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/30 to-blue-600/20 border border-white/10 items-center justify-center">
              <Icon name={industry.icon} className="w-6 h-6 text-sky-200" />
            </span>
          </div>
          <p className="mt-6 mono-label text-sky-300/90">
            Custom operating systems for {industry.name.toLowerCase()}
            {marketLabel ? ` · ${marketLabel}` : ''}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
            {industry.name}, <span className="gradient-text">run on one system.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
            {industry.summary} Designed around how your operation actually works — and built on proven VexaOS architecture.
          </p>
          <p className="mt-4 text-sm text-gray-500">For {industry.operators.join(' · ')}</p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href={ctaHref} event="industry_cta_click" eventProps={{ industry: industry.slug, placement: 'industry_hero' }} className="w-full sm:w-auto">
              Build My Business System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            {system ? (
              <SecondaryButton href={`/systems/${system.slug}`} event="system_explore_click" eventProps={{ system: system.slug, industry: industry.slug }} className="w-full sm:w-auto">
                Explore {system.shortName}
              </SecondaryButton>
            ) : (
              <SecondaryButton href="/blueprint" className="w-full sm:w-auto">
                Start with a Blueprint
              </SecondaryButton>
            )}
          </div>
        </div>
      </section>

      {/* Operational problems */}
      <Section className="border-t border-white/10">
        <SectionHeading
          eyebrow="Operational problems"
          title="Where the operation breaks down today."
          subtitle="The friction that disconnected tools create — and that a system designed around the operation removes."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {industry.challenges.map((c) => (
            <li key={c.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <Minus className="w-5 h-5 mt-0.5 shrink-0 text-red-400/70" />
              <div>
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Architecture + apps */}
      <Section className="bg-[#03060c] border-t border-white/10">
        <SectionHeading
          eyebrow="VexaOS architecture"
          title={`An operating system for ${industry.name.toLowerCase()}.`}
          subtitle="Every application reads and writes the same records, on one identity, organization model, and data layer."
        />
        <ArchitectureDiagram coreLabel={industry.name} nodes={nodes} />
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industry.surfaces.map((s) => (
            <li key={s.title} className="rounded-xl border border-white/10 bg-[#060a13] p-5">
              <p className="mono-label text-[10px] text-sky-300/80">{s.platform}</p>
              <p className="mt-2 text-[15px] font-semibold text-white">{s.title}</p>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{s.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Capabilities */}
      <Section className="border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
          <div className="lg:col-span-5">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
              Built from proven modules, shaped to your workflows.
            </h2>
            <p className="mt-5 text-lg text-gray-400 leading-relaxed">
              We’re not starting from zero. Identity, roles, devices, and the data layer already work —
              so the build focuses on what makes your operation different.
            </p>
          </div>
          <ul className="lg:col-span-7 grid gap-2.5 sm:grid-cols-2">
            {industry.capabilities.map((c) => (
              <li key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[15px] text-gray-200">
                <Check className="w-4 h-4 shrink-0 text-sky-400" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Flagship system */}
      {industry.slug === 'restaurant' ? (
        <RestaurantShowcase />
      ) : (
        system && (
          <Section className="bg-[#03060c] border-t border-white/10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
              <div className="lg:col-span-6">
                <Eyebrow>Demo & example system</Eyebrow>
                <h2 className="mt-5 text-3xl font-bold text-white tracking-tight">See a related system.</h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {system.name} shows how a complete VexaOS system fits together for operations like
                  yours. It is a reference — your system is designed around your own workflows.
                </p>
              </div>
              <div className="lg:col-span-6">
                <SystemCard system={system} />
              </div>
            </div>
          </Section>
        )
      )}

      {/* Other industries */}
      <Section className="border-t border-white/10">
        <SectionHeading eyebrow="Other industries" title="Built for operationally complex businesses." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <IndustryCard key={o.slug} industry={o} compact />
          ))}
        </div>
      </Section>

      <CTASection
        title="Tell us how your operation runs."
        placement={`industry_${industry.slug}`}
        initial={{ industry: industry.name }}
      />
    </>
  );
}
