import { ArrowRight, Layers, Building2, Globe2, FileText } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/site/Section';
import HeroSystemVisual from './HeroSystemVisual';
import { BUILD_SURFACES } from '@/lib/marketing/site';

/** The four things a visitor must understand within ten seconds. */
const PROOF_POINTS = [
  {
    icon: Layers,
    title: 'We’re not starting from zero',
    detail: 'Identity, roles, devices, and data layers are already built and proven.',
  },
  {
    icon: Building2,
    title: 'Built for complex operations',
    detail: 'Designed for organizations running roughly 2 to 50+ locations.',
  },
  {
    icon: Globe2,
    title: 'Built in America. Delivered worldwide.',
    detail: 'Remote discovery, deployment, and support across time zones.',
  },
  {
    icon: FileText,
    title: 'Start with a Business Blueprint',
    detail: 'A documented system design, from $750, before major development.',
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 grid-background opacity-30 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[64rem] h-[36rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(14,165,233,0.16), rgba(14,165,233,0))' }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/25 bg-sky-500/[0.08] px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-sky-100">
              Custom Business Operating Systems
            </span>
          </p>

          <h1 className="mt-7 text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-[4.5rem] font-bold text-white tracking-tight text-balance">
            Built around the way your company{' '}
            <span className="gradient-text">actually works.</span>
          </h1>

          <p className="mt-6 sm:mt-7 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
            VexaOS designs and builds connected software ecosystems that unify your workforce,
            customers, operations, commerce, data, and business hardware into one system.
          </p>

          <div className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <PrimaryButton href="/contact?intent=build" event="hero_build_system_click" className="w-full sm:w-auto">
              Build My Business System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/systems" event="hero_demo_click" className="w-full sm:w-auto">
              Explore Our Systems
            </SecondaryButton>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[13px] text-gray-500" aria-label="What we build across">
            {BUILD_SURFACES.map((x, i) => (
              <li key={x} className="flex items-center gap-2.5">
                <span>{x}</span>
                {i < BUILD_SURFACES.length - 1 && <span className="text-sky-500/60" aria-hidden="true">•</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 sm:mt-20">
          <HeroSystemVisual />
        </div>

        <ul className="mt-14 sm:mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF_POINTS.map(({ icon: I, title, detail }) => (
            <li key={title} className="bg-[#04070e] px-5 py-5 sm:px-6 sm:py-6">
              <I className="w-[18px] h-[18px] text-sky-300" />
              <p className="mt-3 text-[15px] font-semibold text-white leading-snug">{title}</p>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
