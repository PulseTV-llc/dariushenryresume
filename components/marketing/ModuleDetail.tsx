import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Hand, Link2 } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import ScreenshotFrame, { HardwarePhotoCard } from '@/components/site/ScreenshotFrame';
import TouchBoardVideo from '@/components/touchboard/TouchBoardShowcase';
import { Section, SectionHeading, Eyebrow, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import { SystemLink } from './SystemCard';
import { SCREENS, PRODUCT_SCREENS, HARDWARE_PHOTOS } from '@/lib/screens';
import { PRODUCTS, SITE_URL, type Product } from '@/lib/vexaos';
import { SYSTEMS } from '@/lib/marketing/systems';
import { OG_IMAGES } from '@/lib/marketing/site';

export function moduleMetadata(product: Product): Metadata {
  const url = `${SITE_URL}/platform/modules/${product.slug}`;
  return {
    title: `${product.name} Module — ${product.role}`,
    description: `${product.name} is a proven VexaOS module used inside custom business systems: ${product.summary}`,
    alternates: { canonical: url },
    openGraph: { title: `${product.name} — a proven VexaOS module`, description: product.summary, url, images: OG_IMAGES },
  };
}

/**
 * Detail page for an internal VexaOS module. Presented as proven technology
 * underneath custom systems — no SKU pricing, no "buy this product".
 */
export default function ModuleDetail({ product }: { product: Product }) {
  const screenKey = PRODUCT_SCREENS[product.slug];
  const shot = screenKey ? SCREENS[screenKey] : null;
  const usedIn = SYSTEMS.filter((s) => s.foundations.some((f) => f.toLowerCase().includes(product.name.toLowerCase())));
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const isTouchBoard = product.slug === 'touchboard';

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <section className="relative pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <Link
              href="/platform#modules"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Platform modules
            </Link>
            <div className="mt-6 flex justify-center">
              <span className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${product.accent} items-center justify-center`}>
                <Icon name={product.icon} className="w-6 h-6 text-white" strokeWidth={2} />
              </span>
            </div>
            <p className="mt-6 mono-label text-sky-300/90">Proven VexaOS module</p>
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
              {product.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg font-medium text-sky-300">{product.role}</p>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">{product.intro}</p>
            <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto">
              Not sold as a standalone app — {product.name} is a building block VexaOS assembles,
              extends, and customizes inside the system we design for your operation.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryButton href="/contact?intent=build" className="w-full sm:w-auto">
                Build a system with {product.name}
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
              {isTouchBoard ? (
                <SecondaryButton
                  href="/platform/modules/touchboard/demo"
                  event="demo_opened"
                  eventProps={{ module: 'touchboard' }}
                  className="w-full sm:w-auto"
                >
                  <Hand className="w-4 h-4" />
                  Try the interactive demo
                </SecondaryButton>
              ) : (
                <SecondaryButton href="/platform" className="w-full sm:w-auto">
                  How the platform fits together
                </SecondaryButton>
              )}
            </div>
          </div>
        </section>

        {shot && (
          <Section className="pt-0 sm:pt-0">
            <div className="max-w-5xl mx-auto">
              <ScreenshotFrame shot={shot} sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
          </Section>
        )}

        {/* Problem + what it does */}
        <Section className="border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>The problem it solves</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                {product.problem.headline}
              </h2>
              <ul className="mt-6 space-y-3">
                {product.problem.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] text-gray-400 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400/70 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white">{product.product.headline}</h3>
              <p className="mt-3 text-gray-400 leading-relaxed">{product.product.body}</p>
              <p className="mt-6 mono-label text-gray-500">Surfaces</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.product.surfaces.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Modes */}
        {product.modes && (
          <Section className="bg-[#03060c] border-t border-white/10">
            <SectionHeading eyebrow="Configurable modes" title="One module, configured per screen." />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.modes.map((m) => (
                <li key={m.key} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center justify-between">
                    <Icon name={m.icon} className="w-5 h-5 text-sky-300" />
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                        m.status === 'available'
                          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                          : 'border-white/15 bg-white/[0.04] text-gray-300'
                      }`}
                    >
                      {m.status === 'available' ? 'Available today' : 'Supported mode'}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{m.name}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{m.detail}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Capabilities */}
        <Section className="border-t border-white/10">
          <SectionHeading eyebrow="Capabilities" title={`What ${product.name} brings to a build.`} />
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {product.capabilities.map((c) => (
              <li key={c.title} className="bg-[#050912] p-6">
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{c.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Integrations + used in */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Eyebrow>Inside a VexaOS system</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold text-white tracking-tight">How it connects.</h2>
              <ul className="mt-6 space-y-3">
                {product.integrations.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-gray-300 leading-relaxed">
                    <Link2 className="w-4 h-4 mt-1 shrink-0 text-sky-400" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              {usedIn.length > 0 && (
                <>
                  <p className="mono-label text-gray-500">Powers these systems</p>
                  <div className="mt-4 space-y-3">
                    {usedIn.map((s) => (
                      <SystemLink key={s.slug} system={s} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Section>

        {isTouchBoard && (
          <Section className="border-t border-white/10">
            <SectionHeading eyebrow="On real hardware" title="The same board, on the wall." />
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <TouchBoardVideo
                  src="/touchboard-demo.mp4"
                  poster="/screens/touchboard-demo-poster.webp"
                  label="TouchBoard hardware turntable"
                />
              </div>
              <div className="lg:col-span-8 grid gap-6 sm:grid-cols-2">
                {HARDWARE_PHOTOS.slice(0, 2).map((p) => (
                  <HardwarePhotoCard key={p.key} photo={p} />
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Other modules */}
        <Section className="border-t border-white/10">
          <SectionHeading eyebrow="Other modules" title="The rest of the toolkit." />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug} className="min-w-0">
                <Link
                  href={`/platform/modules/${o.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 hover:border-white/20 transition-colors"
                >
                  <span className={`inline-flex w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br ${o.accent} items-center justify-center`}>
                    <Icon name={o.icon} className="w-4 h-4 text-white" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white group-hover:text-sky-200">{o.name}</span>
                    <span className="block text-xs text-gray-500 truncate">{o.role}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <CTABand
          title="Proven architecture. Custom implementation."
          subtitle={`Tell us how your business operates. We’ll design the system — using ${product.name} where it fits, and building what it doesn’t cover.`}
        />
      </main>
      <SiteFooter />
    </>
  );
}
