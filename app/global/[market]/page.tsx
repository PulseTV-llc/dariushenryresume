import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Globe2 } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { Section, SectionHeading, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import HeroSystemVisual from '@/components/marketing/HeroSystemVisual';
import IndustryCard from '@/components/marketing/IndustryCard';
import PlatformLayers from '@/components/marketing/PlatformLayers';
import EngagementPricing from '@/components/marketing/EngagementPricing';
import CTASection from '@/components/marketing/CTASection';
import { MARKETS, MARKETS_BY_SLUG, GLOBAL_CAPABILITIES } from '@/lib/marketing/global';
import { INDUSTRIES_BY_SLUG } from '@/lib/marketing/industries';
import { SITE_URL, OG_IMAGES } from '@/lib/marketing/site';
import Icon from '@/components/site/Icon';

/**
 * Country campaign landing pages (/global/uk, /global/uae, …) for
 * country-targeted advertising. Every page is noindex until its market entry
 * is marked `indexable` with genuinely localized content.
 */
export function generateStaticParams() {
  return MARKETS.map((m) => ({ market: m.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { market: string } }): Metadata {
  const m = MARKETS_BY_SLUG[params.market];
  if (!m) return {};
  const url = `${SITE_URL}/global/${m.slug}`;
  return {
    title: `Custom Business Operating Systems for Organizations in ${m.inSentence}`,
    description: `VexaOS designs and builds custom business software for multi-location and operationally complex organizations in ${m.inSentence} — web, mobile, workforce, commerce, and connected hardware, delivered remotely from the United States.`,
    alternates: { canonical: url },
    robots: m.indexable ? undefined : { index: false, follow: true },
    openGraph: { title: `VexaOS — Custom business systems for ${m.inSentence}`, url, images: OG_IMAGES },
  };
}

export default function MarketPage({ params }: { params: { market: string } }) {
  const m = MARKETS_BY_SLUG[params.market];
  if (!m) notFound();
  const industries = m.focusIndustries.map((s) => INDUSTRIES_BY_SLUG[s]).filter(Boolean);
  const placement = `global_${m.slug}`;

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <section className="relative overflow-hidden pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
          <div aria-hidden="true" className="absolute inset-0 grid-background opacity-30 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/[0.08] px-3.5 py-1.5 mono-label text-sky-100">
                <Globe2 className="w-3.5 h-3.5" />
                {m.country} · Built in America. Delivered worldwide.
              </p>
              <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
                Custom business operating systems for organizations in{' '}
                <span className="gradient-text">{m.inSentence}.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
                VexaOS designs and builds connected software around how your company actually works —
                web, mobile, workforce, commerce, inventory, and connected hardware on one architecture.
              </p>
              <p className="mt-3 text-sm text-gray-500">{m.timeZoneNote}</p>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                <PrimaryButton
                  href={`/contact?intent=build&country=${encodeURIComponent(m.country)}`}
                  event="hero_build_system_click"
                  eventProps={{ market: m.slug }}
                  className="w-full sm:w-auto"
                >
                  Build My Business System
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
                <SecondaryButton href="/systems" event="hero_demo_click" eventProps={{ market: m.slug }} className="w-full sm:w-auto">
                  Explore Our Systems
                </SecondaryButton>
              </div>
            </div>
            <div className="mt-16">
              <HeroSystemVisual />
            </div>
          </div>
        </section>

        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Industries"
            title="Built for operationally complex businesses."
            subtitle="Examples of operations we build for — your system is designed around your own workflows."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <IndustryCard key={ind.slug} industry={ind} />
            ))}
          </div>
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <PlatformLayers />
        </Section>

        <Section className="border-t border-white/10">
          <SectionHeading eyebrow="Remote delivery" title="Designed, built, deployed, and supported remotely." />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GLOBAL_CAPABILITIES.map((c) => (
              <li key={c.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <Icon name={c.icon} className="w-5 h-5 shrink-0 text-sky-300" />
                <div>
                  <p className="text-[15px] font-semibold text-white">{c.title}</p>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="Pricing" title="Every business system is scoped individually." />
          <EngagementPricing />
        </Section>

        <CTASection placement={placement} initial={{ country: m.country }} />
      </main>
      <SiteFooter />
    </>
  );
}
