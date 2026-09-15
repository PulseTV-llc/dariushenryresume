import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Monitor, ClipboardList, Hand, ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import IntakeFromParams from '@/components/marketing/intake/IntakeFromParams';
import SystemIntakeForm from '@/components/marketing/intake/SystemIntakeForm';
import TrackedLink from '@/components/marketing/TrackedLink';
import { PageHero } from '@/components/site/Section';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'System Walkthrough — See a VexaOS Business System',
  description:
    'Request a guided walkthrough of a working VexaOS system — control center, mobile and device apps, and connected hardware — framed around how your operation runs.',
  alternates: { canonical: `${SITE_URL}/demo` },
};

const WHAT_TO_EXPECT = [
  {
    icon: ClipboardList,
    title: 'We start with your operation',
    detail: 'Locations, roles, what you sell or deliver, and which systems you run on today — so the walkthrough is relevant.',
  },
  {
    icon: Monitor,
    title: 'Then we show working software',
    detail: 'Control centers, mobile and device apps, and the architecture underneath — what exists today, labeled honestly.',
  },
  {
    icon: ArrowRight,
    title: 'You leave with a direction',
    detail: 'Whether a Business Blueprint, a focused Launch System, or a full Business OS makes sense — or none of them yet.',
  },
];

export default function DemoPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="System walkthrough"
          title={
            <>
              See a working system, <span className="gradient-text">framed around yours.</span>
            </>
          }
          subtitle="Not a canned product demo. Tell us how your operation works and we’ll walk through the VexaOS systems and architecture most relevant to it."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-5 space-y-4">
              {WHAT_TO_EXPECT.map(({ icon: I, title, detail }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="inline-flex w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 items-center justify-center">
                    <I className="w-[18px] h-[18px] text-sky-300" />
                  </span>
                  <h2 className="mt-4 text-base font-semibold text-white">{title}</h2>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{detail}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] p-6">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Hand className="w-4 h-4 text-emerald-300" />
                  Can’t wait?
                </h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Drive a working TouchBoard wall display in your browser right now — no sign-up.
                </p>
                <TrackedLink
                  href="/platform/modules/touchboard/demo"
                  event="demo_opened"
                  eventProps={{ module: 'touchboard', placement: 'demo_page' }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  Open the interactive demo
                  <ArrowRight className="w-4 h-4" />
                </TrackedLink>
              </div>
            </aside>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-[#050912]/90 p-5 sm:p-9">
                <Suspense fallback={<SystemIntakeForm variant="compact" placement="demo_page" initial={{ intent: 'walkthrough' }} />}>
                  <IntakeFromParams variant="compact" placement="demo_page" defaults={{ intent: 'walkthrough' }} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
