import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Globe, Layers, Zap, Users, Wrench } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { Section, SectionHeading } from '@/components/site/Section';
import { PUBLIC_PRICING } from '@/lib/quote-config';

export const metadata: Metadata = {
  title: 'Pricing | Custom Connected Business Systems',
  description:
    'Transparent starting points for custom connected business systems — Blueprint Session, Launch System, Growth System, and Custom Business OS. Final pricing depends on features, devices, integrations, country, and business size.',
  alternates: { canonical: 'https://www.vexaos.io/pricing' },
};

const INCLUDES: Record<string, string[]> = {
  blueprint: [
    'Deep-dive into how your business runs',
    'System map: dashboards, apps, touchscreens',
    'Recommended modules & device plan',
    'Clear written scope & next-step quote',
    'Credited toward your build if you proceed',
  ],
  launch: [
    'One connected platform (web + one device layer)',
    'Core dashboard & customer database',
    'A starter set of essential modules',
    'Real-time syncing foundation',
    'Launch, training & handoff',
  ],
  growth: [
    'Web dashboard + mobile apps + staff tools',
    'Multiple connected modules',
    'Customer portal & manager dashboard',
    'Automation: alerts, scheduling, tracking',
    'Priority support & monthly improvements',
  ],
  customOs: [
    'Full multi-device operating system',
    'Web, iOS, Android & touchscreen layers',
    'Advanced integrations & multi-location',
    'AI tools, analytics & automation',
    'Dedicated ongoing partnership',
  ],
};

const PRICE_FACTORS = [
  { icon: Layers, title: 'Features & modules', detail: 'Scheduling, payments, inventory, CRM, loyalty, AI — every module adds capability and build time.' },
  { icon: Users, title: 'Devices & apps', detail: 'Web, iOS, Android, and touchscreen each add scope. Cross-platform mobile is more efficient than two native apps.' },
  { icon: Zap, title: 'Integrations & complexity', detail: 'Third-party APIs, real-time sync, offline modes, and strict reliability raise complexity.' },
  { icon: Globe, title: 'Country & business size', detail: 'Pricing is adapted to your market and the size of your operation — more locations and users add scope.' },
  { icon: Wrench, title: 'Timeline & support', detail: 'Rush timelines and the level of ongoing support you choose affect the total investment.' },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="relative pt-36 pb-8 px-4 sm:px-6 lg:px-8 grid-background overflow-hidden">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
                Pricing
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              Premium systems.{' '}
              <span className="gradient-text">Transparent starting points.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Every VexaOS system is custom-quoted. These are the starting points for each tier — your
              exact price depends on the features, devices, integrations, and size of your business.
            </p>
          </div>
        </section>

        {/* Pricing tiers */}
        <Section className="pt-12">
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
            {PUBLIC_PRICING.map((t) => (
              <div
                key={t.key}
                className={`relative flex flex-col p-7 rounded-3xl border transition-all ${
                  t.highlight
                    ? 'bg-gradient-to-b from-cyan-500/10 to-blue-500/[0.03] border-cyan-500/40 shadow-2xl shadow-cyan-500/10'
                    : 'bg-white/[0.03] border-white/10'
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold whitespace-nowrap">
                    Most popular
                  </span>
                )}
                <h2 className="text-white font-bold text-lg mb-1">{t.name}</h2>
                <p className="text-gray-400 text-sm mb-5 min-h-[40px]">{t.tagline}</p>
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Starting at</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">${t.setup.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs">{t.monthly ? 'setup' : ''}</span>
                  </div>
                  {t.monthly && (
                    <div className="text-cyan-300 text-sm mt-1">+ ${t.monthly.toLocaleString()}/mo</div>
                  )}
                </div>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {INCLUDES[t.key]?.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center px-5 py-3 rounded-xl font-semibold transition-all ${
                    t.highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  Request a quote
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 max-w-3xl mx-auto">
            All prices are starting points in USD and depend on your requirements. Monthly support
            covers hosting oversight, updates, bug fixes, support, monitoring, and small improvements
            depending on your plan. New major features are quoted separately unless included in a
            higher monthly plan.
          </p>
        </Section>

        {/* What affects your price */}
        <Section className="bg-gradient-to-b from-black to-[#05070d]">
          <SectionHeading
            eyebrow="What affects your price?"
            title="Your quote reflects your real requirements."
            subtitle="A few factors shape where your system lands within these tiers."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRICE_FACTORS.map(({ icon: I, title, detail }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 items-center justify-center mb-4">
                  <I className="w-5 h-5 text-cyan-300" />
                </span>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* Country note */}
          <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.05] p-6 sm:p-8 flex items-start gap-4">
            <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </span>
            <div>
              <h3 className="text-white font-semibold mb-2">Pricing adapts to your market</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Systems are built remotely and delivered worldwide. Pricing is adjusted to align with
                the purchasing power of your country and the size of your business — while keeping the
                work at the premium quality standard. Tell us where you're based and we'll tailor the
                quote to your market.
              </p>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/[0.04] to-purple-500/10 p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get an exact quote for your business.
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Share what you're trying to build and we'll come back with a clear, itemized quote and a
              recommended system plan.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all hover:scale-[1.02]"
            >
              Request My Business System Blueprint
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
