import type { Metadata } from 'next';
import { Monitor, ClipboardList, Calculator, ArrowUpRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import VexaContactForm from '@/components/site/VexaContactForm';
import { PageHero } from '@/components/site/Section';
import { SITE_URL, APP_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Book a demo — See VexaOS running your operation',
  description:
    'A 30-minute VexaOS walkthrough against your actual business: your locations, your products, your shifts, and your front counter. No generic demo account.',
  alternates: { canonical: `${SITE_URL}/demo` },
};

const WHAT_TO_EXPECT = [
  {
    icon: ClipboardList,
    title: 'We start with your operation',
    detail:
      'Locations, roles, what you sell, and which systems you are on today. Fifteen minutes of context makes the rest of the session useful.',
  },
  {
    icon: Monitor,
    title: 'Then we show the real thing',
    detail:
      'The control center, the products you care about, and the kiosk or board experience — configured to look like your business, not ours.',
  },
  {
    icon: Calculator,
    title: 'You leave with numbers',
    detail:
      'Which products you actually need, what hardware fits your floor, and what it costs per location. Written down, not implied.',
  },
];

export default function DemoPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Book a demo"
          title={
            <>
              Thirty minutes,{' '}
              <span className="gradient-text">your actual business.</span>
            </>
          }
          subtitle="We do not run canned demos. Tell us how your operation works and we will walk VexaOS through it — your locations, your catalog, your shifts, your front counter."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* What to expect */}
            <aside className="lg:col-span-5 space-y-4">
              {WHAT_TO_EXPECT.map(({ icon: I, title, detail }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
                >
                  <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                    <I className="w-5 h-5 text-sky-300" />
                  </span>
                  <h2 className="mt-5 text-base font-semibold text-white">{title}</h2>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{detail}</p>
                </div>
              ))}

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
                <h2 className="text-base font-semibold text-white">Already a customer?</h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  Your control center is at app.vexaos.io. For support with a live deployment,
                  sign in and use the in-app support channel.
                </p>
                <a
                  href={APP_URL}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  Log in to VexaOS
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
                <VexaContactForm variant="demo" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
