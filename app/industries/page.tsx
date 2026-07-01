import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading } from '@/components/site/Section';
import { INDUSTRIES } from '@/lib/business-data';

export const metadata: Metadata = {
  title: 'Industries We Build For | Connected Business Systems',
  description:
    'Custom connected systems for salons, restaurants, retail, field workforce, cleaning, security, clinics, med spas, gyms, and repair shops — web dashboards, mobile apps, and touchscreen tools built around your workflow.',
  alternates: { canonical: 'https://iamdariushenry.com/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="relative pt-36 pb-8 px-4 sm:px-6 lg:px-8 grid-background overflow-hidden">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
                Industries
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              A connected system shaped around{' '}
              <span className="gradient-text">how your industry runs.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Not a template forced onto your business. Each system below is built around the real
              workflow of that industry — from the front desk to the field.
            </p>
          </div>
        </section>

        <Section className="pt-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.slug}
                className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                    <Icon name={ind.icon} className="w-7 h-7 text-cyan-300" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{ind.name}</h2>
                    <p className="text-gray-400 mt-1">{ind.tagline}</p>
                  </div>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {ind.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Not listed note */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Don't see your business?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-7">
              These are examples, not limits. If your business runs on staff, customers, scheduling,
              locations, or devices that should talk to each other — it can run on a connected system.
              Spas, med spas, delivery companies, warehouses, and international operations all fit.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Tell me about your business
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
