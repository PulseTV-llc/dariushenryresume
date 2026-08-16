import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, X, Link2, Hand, MonitorPlay } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import ScreenshotFrame, { PendingScreenshotSlot } from '@/components/site/ScreenshotFrame';
import TouchBoardVideo from '@/components/touchboard/TouchBoardShowcase';
import { SCREENS, PRODUCT_SCREENS, PENDING_PRODUCT_SCREENS } from '@/lib/screens';
import {
  Section,
  SectionHeading,
  Eyebrow,
  CTABand,
  PoweredByBadge,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import {
  PRODUCTS,
  PRODUCTS_BY_SLUG,
  VERTICALS_BY_SLUG,
  STANDALONE_BY_SLUG,
  DEVICE_BY_SLUG,
  BUNDLES,
  PROPOSED_PRICE_NOTE,
  usd,
  SITE_URL,
} from '@/lib/vexaos';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = PRODUCTS_BY_SLUG[params.slug];
  if (!product) return {};
  return {
    title: `${product.name} — ${product.role}`,
    description: product.summary,
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — Powered by VexaOS`,
      description: product.summary,
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS_BY_SLUG[params.slug];
  if (!product) notFound();

  const standalone = STANDALONE_BY_SLUG[product.slug];
  const device = DEVICE_BY_SLUG[product.slug];
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  // Only claim bundle inclusion for products a bundle actually contains —
  // Facility Ops and Inspections are standalone-only.
  const inBundles = BUNDLES.filter((b) => b.products.includes(product.slug));
  const cheapestBundle = inBundles.length
    ? inBundles.reduce((a, b) => (b.priceCents < a.priceCents ? b : a))
    : null;
  const screenKey = PRODUCT_SCREENS[product.slug];
  const productShot = screenKey ? SCREENS[screenKey] : null;
  const pendingShot = productShot ? null : PENDING_PRODUCT_SCREENS[product.slug];

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        {/* ---- Hero ---- */}
        <section className="relative pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                'radial-gradient(closest-side, rgba(14,165,233,0.16), rgba(14,165,233,0))',
            }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <span
              className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${product.accent} items-center justify-center`}
            >
              <Icon name={product.icon} className="w-6 h-6 text-white" strokeWidth={2} />
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
              {product.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg font-medium text-sky-300">{product.role}</p>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
              {product.intro}
            </p>
            <div className="mt-7 flex justify-center">
              <PoweredByBadge />
            </div>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryButton href={product.cta.href} className="w-full sm:w-auto">
                {product.cta.label}
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
              {product.proof ? (
                <SecondaryButton href={product.proof.href} className="w-full sm:w-auto">
                  {product.proof.label}
                </SecondaryButton>
              ) : product.slug === 'touchboard' ? (
                <SecondaryButton href="/products/touchboard/demo" className="w-full sm:w-auto">
                  <Hand className="w-4 h-4" />
                  Try the interactive demo
                </SecondaryButton>
              ) : (
                <SecondaryButton href="/pricing" className="w-full sm:w-auto">
                  See pricing
                </SecondaryButton>
              )}
            </div>
          </div>
        </section>

        {/* ---- The problem ---- */}
        <Section className="border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                {product.problem.headline}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-3.5">
                {product.problem.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-[15px] text-gray-400 leading-relaxed"
                  >
                    <X className="w-4 h-4 mt-1 shrink-0 text-red-400/70" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ---- The product ---- */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <Eyebrow>The product</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                {product.product.headline}
              </h2>
              <p className="mt-5 text-lg text-gray-400 leading-relaxed">{product.product.body}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-5">
                  Where it runs
                </p>
                <ul className="space-y-3">
                  {product.product.surfaces.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                      {s}
                    </li>
                  ))}
                </ul>
                {(standalone || device) && (
                  <div className="mt-7 pt-6 border-t border-white/10">
                    {/* Not yet priced — never substitute a number. */}
                    {standalone?.comingSoon ? (
                      <>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                          Pricing
                        </p>
                        <p className="mt-2 text-2xl font-bold text-white">Coming soon</p>
                        <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                          {product.name} is in beta and not yet priced. Talk to us about including
                          it in your deployment.
                        </p>
                        <Link
                          href="/contact"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                        >
                          Contact us
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </>
                    ) : device ? (
                      <>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                          Device software
                        </p>
                        <p className="mt-2 text-3xl font-bold text-white">
                          {usd(device.priceCents)}
                          <span className="text-base font-medium text-gray-400">
                            {' '}
                            {device.unit}
                          </span>
                        </p>
                        <p className="mt-2.5 text-sm text-gray-400 leading-relaxed">
                          {device.completeNote}. Hardware sold separately.
                        </p>
                        <Link
                          href="/pricing"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                        >
                          Full pricing
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </>
                    ) : standalone?.proposed && standalone.priceCents !== null ? (
                      <>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                            Standalone
                          </p>
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-400/30 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                            Proposed
                          </span>
                        </div>
                        <p className="mt-2 text-3xl font-bold text-white">
                          {usd(standalone.priceCents)}
                          <span className="text-base font-medium text-gray-400">
                            {' '}
                            per location / month
                          </span>
                        </p>
                        <p className="mt-2.5 text-sm text-amber-200/80 leading-relaxed">
                          {PROPOSED_PRICE_NOTE}
                        </p>
                        <Link
                          href="/contact"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                        >
                          Contact us
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </>
                    ) : standalone?.priceCents !== null && standalone !== undefined ? (
                      <>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                          Standalone
                        </p>
                        <p className="mt-2 text-3xl font-bold text-white">
                          {usd(standalone.priceCents as number)}
                          <span className="text-base font-medium text-gray-400">
                            {' '}
                            per location / month
                          </span>
                        </p>
                        <p className="mt-2.5 text-sm text-gray-400 leading-relaxed">
                          {cheapestBundle
                            ? `Included in VexaOS bundles from ${usd(cheapestBundle.priceCents)} per location / month.`
                            : 'Sold standalone — not part of a bundle.'}
                        </p>
                        <Link
                          href="/pricing"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                        >
                          Full pricing
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>

          {productShot && (
            <div className="mt-14">
              <ScreenshotFrame shot={productShot} sizes="(min-width: 1024px) 65vw, 100vw" />
            </div>
          )}
          {pendingShot && (
            <div className="mt-14 max-w-3xl mx-auto">
              <PendingScreenshotSlot label={pendingShot.label} hint={pendingShot.hint} />
            </div>
          )}
        </Section>

        {/* ---- Modes (configurable platforms only) ---- */}
        {product.modes && (
          <Section className="border-t border-white/10">
            <SectionHeading
              eyebrow="Modes"
              title="One platform. Pick the mode."
              subtitle={`Every mode below is the same ${product.name} platform, the same data, and the same managed devices — not separate products you buy and integrate.`}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.modes.map((m) => (
                <div
                  key={m.key}
                  className={`rounded-2xl border p-6 transition-colors ${
                    m.status === 'available'
                      ? 'border-sky-400/30 bg-gradient-to-b from-sky-500/[0.08] to-transparent'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex w-10 h-10 rounded-xl items-center justify-center ${
                        m.status === 'available'
                          ? 'bg-gradient-to-br from-sky-500/25 to-blue-600/25 border border-sky-400/25'
                          : 'bg-white/[0.05] border border-white/10'
                      }`}
                    >
                      <Icon name={m.icon} className="w-[18px] h-[18px] text-sky-300" />
                    </span>
                    {m.status === 'available' && (
                      <span className="px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-400/25 text-[10px] font-semibold uppercase tracking-wider text-sky-200">
                        Shipping today
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">{m.name}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{m.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Change a screen from one mode to another from the control center. No new hardware,
              no second vendor, no duplicate customer record.
            </p>
          </Section>
        )}

        {/* ---- Capabilities ---- */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Capabilities"
            title={`What ${product.name} does.`}
            subtitle="Built for operators who need the detail to hold up on a busy day, not just in a demo."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors"
              >
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2.5 text-sm text-gray-400 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---- TouchBoard only: the hardware, and the live demo ---- */}
        {product.slug === 'touchboard' && (
          <Section className="border-t border-white/10">
            <SectionHeading
              eyebrow="The hardware"
              title="The board itself."
              subtitle="A commercial-grade panel on a wall mount or a rolling floor stand — this is the unit the software above runs on."
            />
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <TouchBoardVideo
                  src="/touchboard-demo.mp4"
                  poster="/screens/touchboard-demo-poster.webp"
                  label="A TouchBoard display rotating on a mobile floor stand"
                />
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
                  Want to see the software working, not just the box?
                </h3>
                <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                  We rebuilt the real Android board so you can drive it in your browser. Switch
                  between the device modes one board can run, drill into the wall&apos;s detail
                  screens, and watch it heal itself back Home. The real interface on mock data —
                  no sign-up, and nothing leaves your browser.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    'Six real device modes, using the app\u2019s own labels',
                    'The flagship Standings Board and its read-only drill-ins',
                    'Clock-in shows a QR, exactly as the real board does',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] text-gray-400">
                      <Check className="w-4 h-4 mt-1 shrink-0 text-emerald-400" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <PrimaryButton href="/products/touchboard/demo" className="w-full sm:w-auto">
                    <Hand className="w-4 h-4" />
                    Try the interactive demo
                    <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                  <SecondaryButton href="/hardware" className="w-full sm:w-auto">
                    <MonitorPlay className="w-4 h-4" />
                    Sizes &amp; pricing
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* ---- Integration with VexaOS ---- */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Inside VexaOS</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                How {product.name} connects to the rest.
              </h2>
              <p className="mt-5 text-gray-400 leading-relaxed">
                {product.name} is not integrated with the other VexaOS products — it is built on
                the same platform. There is no sync job, no connector, and no second copy of your
                data.
              </p>
              <div className="mt-8">
                <SecondaryButton href="/platform">
                  Read the platform overview
                  <ArrowRight className="w-4 h-4" />
                </SecondaryButton>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-3">
                {product.integrations.map((i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-[15px] text-gray-300 leading-relaxed"
                  >
                    <Link2 className="w-4 h-4 mt-1 shrink-0 text-sky-400" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <ScreenshotFrame
              shot={SCREENS.vexaosHome}
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="max-w-4xl mx-auto"
            />
          </div>
        </Section>

        {/* ---- Industries ---- */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Industries"
            title={`Where ${product.name} fits.`}
            subtitle="Configured per vertical, so the workflow matches the business rather than the other way around."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {product.industries.map((slug) => {
              const v = VERTICALS_BY_SLUG[slug];
              if (!v) return null;
              return (
                <Link
                  key={slug}
                  href={`/industries/${slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-sky-400/30 hover:bg-white/[0.04] transition-colors"
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
                    <Icon name={v.icon} className="w-[18px] h-[18px] text-sky-300" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-white group-hover:text-sky-200 transition-colors">
                    {v.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{v.tagline}</p>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* ---- Other products ---- */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="The rest of the system"
            title="What else runs on VexaOS."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/products/${o.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors"
              >
                <span
                  className={`inline-flex w-10 h-10 rounded-xl bg-gradient-to-br ${o.accent} items-center justify-center`}
                >
                  <Icon name={o.icon} className="w-[18px] h-[18px] text-white" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-white group-hover:text-sky-200 transition-colors">
                  {o.name}
                </h3>
                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{o.role}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-300">
                  Explore
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <CTABand
          title={`See ${product.name} against your operation.`}
          subtitle="A working walkthrough with your locations, your roles, and your numbers — not a generic demo account."
        />
      </main>
      <SiteFooter />
    </>
  );
}
