import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Minus, Play } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading, Eyebrow, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import { StatusBadge } from '@/components/marketing/SystemCard';
import ArchitectureDiagram from '@/components/marketing/ArchitectureDiagram';
import CaseStudyCard from '@/components/marketing/CaseStudyCard';
import IndustryCard from '@/components/marketing/IndustryCard';
import { SYSTEMS, SYSTEMS_BY_SLUG } from '@/lib/marketing/systems';
import { CASE_STUDIES_BY_SLUG } from '@/lib/marketing/case-studies';
import { INDUSTRIES_BY_SLUG } from '@/lib/marketing/industries';
import { SITE_URL, OG_IMAGES } from '@/lib/marketing/site';

export function generateStaticParams() {
  return SYSTEMS.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = SYSTEMS_BY_SLUG[params.slug];
  if (!s) return {};
  const url = `${SITE_URL}/systems/${s.slug}`;
  return {
    title: `${s.name} — Custom ${s.shortName} Software by VexaOS`,
    description: `${s.summary} Designed around your operation and built on proven VexaOS architecture.`,
    alternates: { canonical: url },
    openGraph: { title: `${s.name} — VexaOS`, description: s.summary, url, images: OG_IMAGES },
  };
}

export default function SystemPage({ params }: { params: { slug: string } }) {
  const s = SYSTEMS_BY_SLUG[params.slug];
  if (!s) notFound();

  const study = s.caseStudy ? CASE_STUDIES_BY_SLUG[s.caseStudy] : undefined;
  const industries = s.industries.map((slug) => INDUSTRIES_BY_SLUG[slug]).filter(Boolean);
  const nodes = s.apps.map((a) => ({ label: a.name, icon: 'AppWindow', detail: a.platform }));

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <section className="relative pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(closest-side, rgba(14,165,233,0.16), rgba(14,165,233,0))' }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <Link href="/systems" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All systems
            </Link>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/30 to-blue-600/20 border border-white/10 items-center justify-center">
                <Icon name={s.icon} className="w-6 h-6 text-sky-200" />
              </span>
              <StatusBadge status={s.status} />
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              {s.name}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">{s.intro}</p>
            <p className="mt-4 text-sm text-gray-500">Built for {s.audience.join(' · ')}</p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              {s.status === 'interactive' && s.demo ? (
                <PrimaryButton href={s.demo.href} event="demo_opened" eventProps={{ system: s.slug }} className="w-full sm:w-auto">
                  <Play className="w-4 h-4" />
                  {s.demo.label}
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  href={`/contact?intent=walkthrough&system=${s.slug}`}
                  event="demo_opened"
                  eventProps={{ system: s.slug, kind: 'walkthrough_request' }}
                  className="w-full sm:w-auto"
                >
                  {s.status === 'coming-soon' ? 'Get notified & talk to us' : 'Request a walkthrough'}
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              )}
              <SecondaryButton href={`/contact?intent=build&system=${s.slug}`} className="w-full sm:w-auto">
                Build a system like this
              </SecondaryButton>
            </div>
            <p className="mt-6 mx-auto max-w-2xl rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-400">
              {s.statusNote}
            </p>
          </div>
        </section>

        {/* Problems */}
        <Section className="border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>What it replaces</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                The friction this system is designed to remove.
              </h2>
            </div>
            <ul className="lg:col-span-7 space-y-3">
              {s.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-[15px] text-gray-300">
                  <Minus className="w-4 h-4 mt-1 shrink-0 text-red-400/70" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Architecture */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="System architecture"
            title="One system. Every surface connected."
            subtitle="Each application reads and writes the same records — so the owner, the manager, and the front line see one version of the truth."
          />
          <ArchitectureDiagram coreLabel={s.shortName} nodes={nodes} />
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.apps.map((a) => (
              <li key={a.name} className="rounded-xl border border-white/10 bg-[#060a13] px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold text-white">{a.name}</p>
                  <span className="mono-label text-[10px] text-sky-300/80 whitespace-nowrap">{a.platform}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{a.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Capabilities */}
        <Section className="border-t border-white/10">
          <SectionHeading eyebrow="Capabilities" title="What the system covers." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilityGroups.map((g) => (
              <div key={g.title} className="bg-[#04070e] p-6">
                <p className="text-base font-semibold text-white">{g.title}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[13px] text-gray-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-sky-400/20 bg-sky-500/[0.05] p-6 sm:p-7">
            <p className="mono-label text-sky-300/90">Not starting from zero</p>
            <p className="mt-2 text-[15px] text-gray-300">This system is assembled on proven VexaOS foundations:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.foundations.map((f) => (
                <li key={f} className="rounded-lg border border-white/10 bg-[#060a13] px-3 py-1.5 text-sm text-gray-200">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {(study || industries.length > 0) && (
          <Section className="bg-[#03060c] border-t border-white/10">
            <div className="grid gap-10 lg:grid-cols-12">
              {study && (
                <div className="lg:col-span-5">
                  <p className="mono-label text-gray-500 mb-4">Related case study</p>
                  <CaseStudyCard study={study} />
                </div>
              )}
              {industries.length > 0 && (
                <div className={study ? 'lg:col-span-7' : 'lg:col-span-12'}>
                  <p className="mono-label text-gray-500 mb-4">Industries</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {industries.map((ind) => (
                      <IndustryCard key={ind.slug} industry={ind} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        <CTABand
          title="Your operation. Your workflows. Your system."
          subtitle={`${s.name} is a starting point. Tell us how your business actually runs and we’ll design the system around it.`}
          primary={{ label: 'Build My Business System', href: `/contact?intent=build&system=${s.slug}` }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
