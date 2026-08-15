import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, X, Monitor } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import {
  Section,
  SectionHeading,
  Eyebrow,
  PageHero,
  CTABand,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import { VERTICALS, VERTICALS_BY_SLUG, PRODUCTS_BY_SLUG, SITE_URL } from '@/lib/vexaos';

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const v = VERTICALS_BY_SLUG[params.slug];
  if (!v) return {};
  return {
    title: `VexaOS for ${v.name}`,
    description: `${v.tagline} A VexaOS configuration for ${v.name.toLowerCase()} — workforce, commerce, inventory, and customer-facing screens on one platform.`,
    alternates: { canonical: `${SITE_URL}/industries/${v.slug}` },
    openGraph: {
      title: `VexaOS for ${v.name}`,
      description: v.tagline,
      url: `${SITE_URL}/industries/${v.slug}`,
    },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const v = VERTICALS_BY_SLUG[params.slug];
  if (!v) notFound();

  const others = VERTICALS.filter((o) => o.slug !== v.slug).slice(0, 4);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero eyebrow={`VexaOS for ${v.name}`} title={v.name} subtitle={v.tagline}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo">
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/pricing">See pricing</SecondaryButton>
          </div>
        </PageHero>

        {/* Pain / outcome */}
        <Section className="pt-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-1">Without a connected system</h2>
              <p className="text-sm text-gray-500 mb-6">
                The friction most {v.name.toLowerCase()} operators absorb daily.
              </p>
              <ul className="space-y-3.5">
                {v.pain.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-gray-400 leading-relaxed">
                    <X className="w-4 h-4 mt-1 shrink-0 text-red-400/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sky-400/25 bg-gradient-to-br from-sky-500/[0.07] to-transparent p-7 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-1">On VexaOS</h2>
              <p className="text-sm text-gray-500 mb-6">What changes on day one.</p>
              <ul className="space-y-3.5">
                {v.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-[15px] text-gray-300 leading-relaxed">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-sky-400" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Front of house */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Eyebrow>Front of house</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                The VexaFront configuration for {v.name.toLowerCase()}.
              </h2>
              <p className="mt-5 text-lg text-gray-400 leading-relaxed">{v.frontConfig}</p>
              <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
                Same platform, same data, same control center — an experience shaped to what a{' '}
                {v.name.toLowerCase().replace(/s$/, '')} customer expects at the front counter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <SecondaryButton href="/products/vexafront">
                  About VexaFront
                  <ArrowRight className="w-4 h-4" />
                </SecondaryButton>
                <SecondaryButton href="/hardware">Hardware &amp; sizes</SecondaryButton>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/[0.08] to-transparent p-8 sm:p-10 text-center">
                <span className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-pink-600 items-center justify-center">
                  <Monitor className="w-7 h-7 text-white" />
                </span>
                <p className="mt-6 text-xl font-bold text-white">VexaFront</p>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
                  {v.frontConfig}
                </p>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Available 15" – 43", plus wall installations
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Recommended stack */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Recommended stack"
            title={`How ${v.name.toLowerCase()} typically deploy VexaOS.`}
            subtitle="Start where the friction is worst. Every product below shares the same platform, so the order you adopt them in is a business decision, not a technical one."
          />
          <div className="space-y-3">
            {v.stack.map((slug, i) => {
              const p = PRODUCTS_BY_SLUG[slug];
              if (!p) return null;
              return (
                <Link
                  key={slug}
                  href={`/products/${slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 hover:border-white/20 hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-xs font-mono text-gray-600 w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${p.accent} items-center justify-center`}
                  >
                    <Icon name={p.icon} className="w-5 h-5 text-white" strokeWidth={2} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-base font-semibold text-white group-hover:text-sky-200 transition-colors">
                      {p.name}
                    </span>
                    <span className="block mt-1 text-sm text-gray-400 leading-relaxed">
                      {p.summary}
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-sky-300 transition-colors shrink-0 hidden sm:block" />
                </Link>
              );
            })}
          </div>
        </Section>

        {/* Other industries */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="Other industries" title="VexaOS elsewhere." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-sky-400/30 transition-colors"
              >
                <span className="inline-flex w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
                  <Icon name={o.icon} className="w-[18px] h-[18px] text-sky-300" />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-white group-hover:text-sky-200 transition-colors">
                  {o.name}
                </h3>
              </Link>
            ))}
          </div>
        </Section>

        <CTABand
          title={`See VexaOS configured for ${v.name.toLowerCase()}.`}
          subtitle="Thirty minutes, your workflow, real screens."
        />
      </main>
      <SiteFooter />
    </>
  );
}
