import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Hand, MonitorPlay } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import TouchBoardEmulator from '@/components/touchboard/TouchBoardEmulator';
import {
  Section,
  SectionHeading,
  CTABand,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import { SITE_URL, TOUCHBOARD_PRICING_STATEMENT } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'TouchBoard interactive demo — try the employee display',
  description:
    'Try a working TouchBoard in your browser: the Workforce Wall Board plus five more device modes, faithful to the real Android app. No sign-up, nothing sent anywhere.',
  alternates: { canonical: `${SITE_URL}/products/touchboard/demo` },
  openGraph: {
    title: 'TouchBoard interactive demo — Powered by VexaOS',
    description:
      'A working TouchBoard you can drive in the browser: the Standings Board, its read-only drill-ins, and five more device modes.',
    url: `${SITE_URL}/products/touchboard/demo`,
  },
};

const TRY_THESE = [
  {
    title: 'Switch the device mode',
    detail:
      'The left rail is the real device-mode list. One board runs the Workforce Wall, the Owner’s Command Center, a Kitchen Display, an Inspection Wall, a Register, or a Custom Wall — set remotely from the dashboard.',
  },
  {
    title: 'Drill into the wall',
    detail:
      'On the flagship, tap Open, Swaps, On the floor, or Shoutout. Each opens a read-only detail screen whose only control is Back — and after 30 seconds the wall heals itself back Home, exactly as the kiosk does.',
  },
  {
    title: 'Flip the right-hand panel',
    detail:
      'Live timeline, Swaps, and Recognition share one panel, with Day / Week / Month on the schedule — the same flip panel the real board uses.',
  },
  {
    title: 'Tap Clock In',
    detail:
      'It shows a QR, not a keypad. Clocking in happens in the employee’s phone app; the board is a display surface and stays read-only.',
  },
];

export default function TouchBoardDemoPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        {/* Hero */}
        <section className="relative pt-32 sm:pt-36 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                'radial-gradient(closest-side, rgba(16,185,129,0.14), rgba(16,185,129,0))',
            }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <Link
              href="/products/touchboard"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              TouchBoard
            </Link>
            <div className="mt-5">
              <Eyebrow>Interactive demo</Eyebrow>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              Drive a TouchBoard{' '}
              <span className="gradient-text">right here.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
              A faithful rebuild of the real Android TouchBoard, running on mock data. Switch
              device modes, drill into the wall, and watch it heal itself back Home. No sign-up,
              and nothing leaves your browser.
            </p>
          </div>
        </section>

        {/* The device */}
        <section className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="max-w-6xl mx-auto">
            <TouchBoardEmulator />
          </div>
        </section>

        {/* Things to try */}
        <Section className="border-t border-white/10 mt-10">
          <SectionHeading
            eyebrow="Try these"
            title="Four things worth trying."
            subtitle="The board is a display surface. It reports the operation; it never runs it — so what you can tap here is what you can tap on the wall."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {TRY_THESE.map((t, i) => (
              <div
                key={t.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <span className="inline-flex w-9 h-9 shrink-0 rounded-full bg-emerald-500/10 border border-emerald-400/25 items-center justify-center text-xs font-bold text-emerald-300">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 max-w-3xl mx-auto">
            <div className="flex items-start gap-3.5">
              <Hand className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-400 leading-relaxed">
                On a real deployment this runs full-screen on a wall-mounted panel in locked-down
                kiosk mode, signed in to your location, against your live data. The mode is set
                remotely from the VexaOS device registry — the board never picks its own.{' '}
                {TOUCHBOARD_PRICING_STATEMENT}
              </p>
            </div>
          </div>
        </Section>

        {/* Next steps */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow="Next"
              title="See it on your own roster."
              subtitle="The demo runs on invented data. A walkthrough runs on yours — your locations, your shifts, your coverage gaps."
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryButton href="/demo">
                Book a demo
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
              <SecondaryButton href="/products/touchboard">
                <MonitorPlay className="w-4 h-4" />
                Back to TouchBoard
              </SecondaryButton>
            </div>
          </div>
        </Section>

        <CTABand
          title="Put this on your wall."
          subtitle="Hardware, software, and the platform underneath — from one vendor that is accountable for all of it."
          primary={{ label: 'Request a quote', href: '/contact' }}
          secondary={{ label: 'See hardware', href: '/hardware' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
