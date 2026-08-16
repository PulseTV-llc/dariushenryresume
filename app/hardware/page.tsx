import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import ScreenshotFrame, { HardwarePhotoCard } from '@/components/site/ScreenshotFrame';
import { SCREENS, HARDWARE_PHOTOS } from '@/lib/screens';
import {
  Section,
  SectionHeading,
  PageHero,
  CTABand,
  PoweredByBadge,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import {
  usd,
  HARDWARE_LINES,
  HARDWARE_LEASE,
  HARDWARE_SIZES,
  HARDWARE_INCLUDED,
  TOUCHBOARD_PRICING_STATEMENT,
  VEXAFRONT_PRICING_STATEMENT,
  SITE_URL,
} from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Hardware — VexaFront kiosks and TouchBoard displays',
  description:
    'VexaFront customer kiosks from 15" to 43" and TouchBoard employee displays from 32" to 86". Purchase outright starting at $1,099, or lease the flagship 43" board at $99/month. Enrolled and managed through VexaOS.',
  alternates: { canonical: `${SITE_URL}/hardware` },
};

export default function HardwarePage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Hardware"
          title={
            <>
              Screens that are <span className="gradient-text">part of the system.</span>
            </>
          }
          subtitle="VexaFront kiosks face your customers. TouchBoard displays face your team. Both enroll in the VexaOS device registry, configure themselves from your organization settings, and are managed remotely from the control center."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact">
              Request a hardware quote
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/demo">Book a demo</SecondaryButton>
          </div>
        </PageHero>

        {/* Flagship lease */}
        <Section className="pt-8">
          <div className="rounded-3xl border border-sky-400/25 bg-gradient-to-br from-sky-500/[0.09] to-transparent p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <PoweredByBadge />
                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
                  The {HARDWARE_LEASE.size} board — buy it or lease it.
                </h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Our most-deployed size. It works as a freestanding customer kiosk, a digital
                  menu board, or a wall-mounted employee TouchBoard — the same panel, configured
                  for the role you give it.
                </p>
                <p className="mt-5 text-sm text-gray-500 leading-relaxed">{HARDWARE_LEASE.note}</p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
                <div className="bg-[#04070e] px-5 py-7">
                  <p className="text-xs text-gray-500">Purchase</p>
                  <p className="mt-1.5 text-3xl font-bold text-white">
                    ${HARDWARE_LEASE.purchase.toLocaleString()}
                  </p>
                  <p className="mt-1.5 text-xs text-gray-500">one time, per unit</p>
                </div>
                <div className="bg-[#04070e] px-5 py-7">
                  <p className="text-xs text-gray-500">Lease</p>
                  <p className="mt-1.5 text-3xl font-bold text-white">
                    ${HARDWARE_LEASE.monthly}
                    <span className="text-lg font-medium text-gray-400">/mo</span>
                  </p>
                  <p className="mt-1.5 text-xs text-gray-500">{HARDWARE_LEASE.term}</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* What runs on the screens */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="On the screen"
            title="What your team actually sees."
            subtitle="The hardware is the delivery mechanism. This is the software it exists to put on the wall."
          />
          <ScreenshotFrame
            shot={SCREENS.touchBoard}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="max-w-3xl mx-auto"
          />

          <div className="mt-14 max-w-4xl mx-auto">
            <ScreenshotFrame
              shot={SCREENS.deviceFleet}
              sizes="(min-width: 1024px) 65vw, 100vw"
            />
          </div>

          <div className="mt-16">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-2">
              In the real world
            </p>
            <p className="text-center text-sm text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              The same board, in three form factors — each running a different device mode.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {HARDWARE_PHOTOS.map((photo) => (
                <HardwarePhotoCard
                  key={photo.key}
                  photo={photo}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Product lines */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="The lineup"
            title="Two families, five configurations."
            subtitle="VexaFront for the customer side of the counter, TouchBoard for the staff side. Both run VexaOS in locked-down kiosk mode."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {HARDWARE_LINES.map((h) => (
              <div
                key={h.key}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
                    <Icon name={h.icon} className="w-5 h-5 text-sky-300" />
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                      h.product === 'VexaFront'
                        ? 'bg-fuchsia-500/10 text-fuchsia-200 border border-fuchsia-400/25'
                        : 'bg-sky-500/10 text-sky-200 border border-sky-400/25'
                    }`}
                  >
                    {h.product}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{h.name}</h3>
                <p className="mt-1 text-2xl font-bold text-white tracking-tight">{h.sizes}</p>
                <p className="mt-1.5 text-[13px] text-gray-500">{h.placement}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {h.typicalUse.map((u) => (
                    <li key={u} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Sizes & pricing table */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Sizes & pricing"
            title="Every size, starting at."
            subtitle="Hardware is billed separately from the per-device software license. Leasing is available on selected sizes — ask for terms on anything above 43&quot;."
          />
          <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 bg-white/[0.03] border-b border-white/10 px-5 sm:px-7 py-4">
              <p className="col-span-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                Size
              </p>
              <p className="col-span-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                Typical role
              </p>
              <p className="col-span-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                Starting at
              </p>
            </div>
            {HARDWARE_SIZES.map((s, i) => (
              <div
                key={s.size}
                className={`grid grid-cols-12 items-center px-5 sm:px-7 py-4 ${
                  i > 0 ? 'border-t border-white/10' : ''
                } ${s.size === HARDWARE_LEASE.size ? 'bg-sky-500/[0.05]' : ''}`}
              >
                <p className="col-span-3 text-[15px] font-semibold text-white">{s.size}</p>
                <p className="col-span-5 text-sm text-gray-400">{s.note}</p>
                <p className="col-span-4 text-right text-[15px] font-semibold text-white">
                  {s.priceCents === null ? (
                    <span className="text-sky-300">Request quote</span>
                  ) : (
                    usd(s.priceCents)
                  )}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-center text-xs text-gray-500 leading-relaxed">
            Starting prices are per unit in USD and exclude tax, shipping, installation, and the
            per-device software license. Mounting hardware is included. Volume pricing is
            available on multi-unit and multi-location orders — ask for a quote.
          </p>
        </Section>

        {/* Device software licensing */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="max-w-3xl mx-auto grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-6">
              <p className="text-sm font-semibold text-white">TouchBoard software</p>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {TOUCHBOARD_PRICING_STATEMENT}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-6">
              <p className="text-sm font-semibold text-white">VexaFront software</p>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {VEXAFRONT_PRICING_STATEMENT}
              </p>
            </div>
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
            >
              Full software pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </Section>

        {/* Included */}
        <Section className="border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                center={false}
                eyebrow="What is included"
                title="A managed device, not a monitor."
                subtitle="Every unit ships enrolled against your organization. Plug it in, and it pulls its configuration from the control center."
              />
              <SecondaryButton href="/platform">
                How the device registry works
                <ArrowRight className="w-4 h-4" />
              </SecondaryButton>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {HARDWARE_INCLUDED.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-gray-300 leading-relaxed"
                  >
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <CTABand
          title="Tell us your floor plan."
          subtitle="We will size the kiosks and boards to your counter, your back of house, and your traffic — then quote it."
          primary={{ label: 'Request a hardware quote', href: '/contact' }}
          secondary={{ label: 'Book a demo', href: '/demo' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
