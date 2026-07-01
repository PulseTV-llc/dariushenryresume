import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading } from '@/components/site/Section';
import { SYSTEM_LAYERS, FEATURE_GRID_ITEMS } from '@/lib/business-data';

export const metadata: Metadata = {
  title: 'What Can Be Built | Systems, Apps & Touchscreen Platforms',
  description:
    'Web dashboards, iOS and Android apps, touchscreen kiosks, employee and customer apps, manager dashboards, scheduling, payments, inventory, CRM, real-time syncing, AI tools and more — the building blocks of your connected business system.',
  alternates: { canonical: 'https://iamdariushenry.com/systems' },
};

export default function SystemsPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="relative pt-36 pb-8 px-4 sm:px-6 lg:px-8 grid-background overflow-hidden">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
                What can be built
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              Every layer of a modern{' '}
              <span className="gradient-text">business operating system.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your system is assembled from connected layers — dashboards, mobile, touchscreen,
              automation, data, and integrations — all sharing one real-time source of truth.
            </p>
          </div>
        </section>

        {/* System layers */}
        <Section className="pt-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEM_LAYERS.map((layer) => (
              <div
                key={layer.title}
                className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 items-center justify-center mb-5">
                  <Icon name={layer.icon} className="w-6 h-6 text-cyan-300" />
                </span>
                <h2 className="text-xl font-bold text-white mb-2">{layer.title}</h2>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{layer.summary}</p>
                <ul className="space-y-2.5">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Full capability grid */}
        <Section className="bg-gradient-to-b from-black to-[#05070d]">
          <SectionHeading
            eyebrow="Capabilities"
            title="Mix and match exactly what you need."
            subtitle="Start lean and expand over time — every capability plugs into the same connected system."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {FEATURE_GRID_ITEMS.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <Icon name={f.icon} className="w-4 h-4 text-cyan-300" />
                </span>
                <span className="text-sm text-gray-200 font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Design my system
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
