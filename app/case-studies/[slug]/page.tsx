import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Minus, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import ScreenshotFrame, { PendingScreenshotSlot } from '@/components/site/ScreenshotFrame';
import { Section, SectionHeading, Eyebrow, CTABand } from '@/components/site/Section';
import { EngagementBadge } from '@/components/marketing/CaseStudyCard';
import { SystemLink } from '@/components/marketing/SystemCard';
import { CASE_STUDIES, CASE_STUDIES_BY_SLUG } from '@/lib/marketing/case-studies';
import { SYSTEMS_BY_SLUG } from '@/lib/marketing/systems';
import { SCREENS } from '@/lib/screens';
import { SITE_URL, OG_IMAGES } from '@/lib/marketing/site';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = CASE_STUDIES_BY_SLUG[params.slug];
  if (!c) return {};
  const url = `${SITE_URL}/case-studies/${c.slug}`;
  return {
    title: `${c.title} — ${c.label} | Case Study`,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: { title: `${c.title} — ${c.label}`, description: c.summary, url, images: OG_IMAGES },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = CASE_STUDIES_BY_SLUG[params.slug];
  if (!c) notFound();
  const system = c.relatedSystem ? SYSTEMS_BY_SLUG[c.relatedSystem] : undefined;

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <section className="relative pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Case studies
            </Link>
            <div className="mt-6 flex justify-center">
              <EngagementBadge engagement={c.engagement} />
            </div>
            <p className="mt-5 mono-label text-gray-500">{c.industry}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              {c.title}
            </h1>
            <p className="mt-2 text-lg text-sky-300">{c.label}</p>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">{c.summary}</p>
          </div>
        </section>

        {/* Client / industry facts */}
        <Section className="pt-0 sm:pt-0">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ['Client / industry', c.industry],
              ['Engagement', c.label],
              ['Technology', c.technology.slice(0, 4).join(' · ')],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#050912] px-5 py-5">
                <dt className="mono-label text-[10px] text-gray-500">{k}</dt>
                <dd className="mt-1.5 text-sm text-gray-200">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Problem + system */}
        <Section className="border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>The problem</Eyebrow>
              <ul className="mt-6 space-y-3">
                {c.problem.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-gray-300 leading-relaxed">
                    <Minus className="w-4 h-4 mt-1 shrink-0 text-red-400/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <Eyebrow>The system</Eyebrow>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">{c.system}</p>
            </div>
          </div>
        </Section>

        {/* Applications */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="Applications built" title="Every surface in the system." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.applications.map((a) => (
              <li key={a.name} className="rounded-xl border border-white/10 bg-[#060a13] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[15px] font-semibold text-white">{a.name}</p>
                  <span className="mono-label text-[10px] text-sky-300/80">{a.platform}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{a.detail}</p>
                {a.status && <p className="mt-3 text-xs text-gray-400"><span className="mono-label text-[10px] text-gray-600">Status</span> {a.status}</p>}
              </li>
            ))}
          </ul>
        </Section>

        {/* Technology + results */}
        <Section className="border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Technology</Eyebrow>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.technology.map((t) => (
                  <li key={t} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-300">{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Results</Eyebrow>
              {c.results.length > 0 ? (
                <ul className="mt-6 space-y-3">
                  {c.results.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[15px] text-gray-300">
                      <Check className="w-4 h-4 mt-1 shrink-0 text-sky-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-gray-400 leading-relaxed">
                  {c.resultsNote ?? 'Measured results have not been published yet.'}
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* Screenshots */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="Screenshots" title="The software itself." />
          {c.images.length > 0 ? (
            <div className={`grid gap-8 ${c.images.length > 1 ? 'lg:grid-cols-2' : 'max-w-5xl mx-auto'}`}>
              {c.images.map((img) =>
                img.screen ? (
                  <ScreenshotFrame key={img.caption} shot={{ ...SCREENS[img.screen], caption: img.caption }} sizes="(min-width: 1024px) 48vw, 100vw" />
                ) : img.src ? (
                  <figure key={img.caption}>
                    <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14]">
                      <Image src={img.src} width={img.width ?? 1600} height={img.height ?? 900} alt={img.alt ?? img.caption} sizes="(min-width: 1024px) 60vw, 100vw" className="w-full h-auto" />
                    </div>
                    <figcaption className="mt-3 text-center text-sm text-gray-500">{img.caption}</figcaption>
                  </figure>
                ) : null
              )}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <PendingScreenshotSlot label={`${c.title} — product screens`} hint="Screenshots will be published once approved for public release." />
            </div>
          )}
        </Section>

        {system && (
          <Section className="border-t border-white/10">
            <div className="max-w-2xl mx-auto">
              <p className="mono-label text-gray-500 mb-4">Related system</p>
              <SystemLink system={system} />
            </div>
          </Section>
        )}

        <CTABand
          title="Proven architecture. Custom implementation."
          subtitle="Tell us how your business operates. We’ll design the system around it."
        />
      </main>
      <SiteFooter />
    </>
  );
}
