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
              The business operating system
            </span>
          </div>

          <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.04] text-balance">
            One operating system for{' '}
            <span className="gradient-text">your entire business.</span>
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
            VexaOS connects your workforce, commerce, inventory, customer experiences, and
            business hardware through one platform — one identity, one data layer, one
            control center.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo" className="w-full sm:w-auto">
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/products" className="w-full sm:w-auto">
              Explore the products
            </SecondaryButton>
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
          Built for multi-location operators.{' '}
          <Link href="/platform" className="text-gray-300 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors">
            See how the platform fits together
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
