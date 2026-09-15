import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Section, Eyebrow, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import { StatusBadge } from './SystemCard';
import { SYSTEMS_BY_SLUG } from '@/lib/marketing/systems';

/**
 * Flagship showcase for the restaurant & café system. Framed explicitly as an
 * EXAMPLE of what VexaOS builds so the company never reads as restaurant-only.
 */
export default function RestaurantShowcase({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const system = SYSTEMS_BY_SLUG['restaurant-os'];
  const Heading = headingLevel;

  return (
    <Section id="restaurant-os" className="bg-[#03060c] border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Eyebrow>Flagship example</Eyebrow>
            <StatusBadge status={system.status} />
          </div>
          <Heading className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
            A Complete Restaurant Operating System
          </Heading>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">{system.intro}</p>
          <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
            It is one example of what VexaOS builds. The same architecture runs workforce,
            facility, retail, and service operations — the restaurant system simply shows how far
            one connected build can go.
          </p>
          <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-400 leading-relaxed">
            {system.statusNote}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <PrimaryButton
              href={`/systems/${system.slug}`}
              event="system_explore_click"
              eventProps={{ system: system.slug, placement: 'restaurant_showcase' }}
              className="w-full sm:w-auto"
            >
              Explore Restaurant OS
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton
              href="/contact?intent=walkthrough&system=restaurant-os"
              event="demo_opened"
              eventProps={{ system: system.slug, kind: 'walkthrough_request' }}
              className="w-full sm:w-auto"
            >
              Request a walkthrough
            </SecondaryButton>
          </div>
        </div>

        <figure className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14] shadow-2xl shadow-black/60">
            <Image
              src="/blog/ember-and-oak-vexaos.jpg"
              width={1600}
              height={900}
              alt="Concept visualization of a café running one connected system: a self-order kiosk, a kitchen orders display, a counter POS, and QR order-and-pay at the table."
              sizes="(min-width: 1024px) 55vw, 100vw"
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
          <figcaption className="mt-3 text-xs text-gray-500 text-center">
            Concept visualization of the guest, counter, and kitchen surfaces — illustrative, not a client location.
          </figcaption>
        </figure>
      </div>

      {/* Applications */}
      <div className="mt-16">
        <p className="mono-label text-gray-500">Applications in the system</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {system.apps.map((app) => (
            <li key={app.name} className="rounded-xl border border-white/10 bg-[#060a13] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold text-white">{app.name}</p>
                <span className="mono-label text-[10px] text-sky-300/80 whitespace-nowrap">{app.platform}</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{app.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Capabilities */}
      <div className="mt-10">
        <p className="mono-label text-gray-500">Capabilities</p>
        <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {system.capabilityGroups.map((g) => (
            <div key={g.title} className="bg-[#04070e] p-5">
              <p className="text-sm font-semibold text-white">{g.title}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[13px] text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
