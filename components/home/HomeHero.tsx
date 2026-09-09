import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import EcosystemDiagram from '@/components/site/EcosystemDiagram';
import { PrimaryButton, SecondaryButton } from '@/components/site/Section';
import { APP_URL, HOME_STATS } from '@/lib/vexaos';

export default function HomeHero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[34rem] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(closest-side, rgba(14,165,233,0.18), rgba(14,165,233,0))',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-300">
              Custom business systems · built without borders
            </span>
          </div>

          <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.04] text-balance">
            Your business isn&rsquo;t off-the-shelf.{' '}
            <span className="gradient-text">Your software shouldn&rsquo;t be either.</span>
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
            VexaOS designs and builds custom business systems that connect your people, devices,
            workflows, and operations — built around how your business actually works, for
            businesses around the world.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact" className="w-full sm:w-auto">
              Build My System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/systems" className="w-full sm:w-auto">
              See What We Build
            </SecondaryButton>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[13px] text-gray-500">
            {['Android Apps', 'Business Dashboards', 'NFC', 'Kiosks', 'Automation', 'Connected Hardware'].map((x, i) => (
              <span key={x} className="flex items-center gap-2.5">
                <span>{x}</span>
                {i < 5 && <span className="text-sky-500/60">•</span>}
              </span>
            ))}
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-300">
            <span className="text-white">Detroit</span>
            <span className="text-sky-400">→</span>
            <span className="text-white">Bangkok</span>
            <span className="text-sky-400">→</span>
            <span className="gradient-text">Anywhere</span>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Already a customer?{' '}
            <a
              href={APP_URL}
              className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200 font-medium transition-colors"
            >
              Log in to your control center
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>

        {/* Ecosystem diagram */}
        <div className="mt-16 sm:mt-20">
          <EcosystemDiagram />
        </div>

        {/* Stat strip */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="bg-[#04070e] px-5 py-6 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{s.value}</p>
              <p className="mt-1.5 text-xs sm:text-[13px] text-gray-500 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Custom systems, built on proven VexaOS infrastructure.{' '}
          <Link href="/systems" className="text-gray-300 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors">
            See what we build
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
