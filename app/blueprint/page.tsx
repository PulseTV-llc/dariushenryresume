import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading, PageHero, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import { BlueprintDocument } from '@/components/marketing/BlueprintSection';
import { BLUEPRINT_DOCUMENTS, BLUEPRINT_DELIVERABLES, ENGAGEMENT_TIERS } from '@/lib/marketing/pricing';
import { SITE_URL } from '@/lib/marketing/site';

const FROM = ENGAGEMENT_TIERS.find((t) => t.key === 'blueprint')?.from ?? 750;

export const metadata: Metadata = {
  title: 'The VexaOS Business Blueprint — System Design Before Development',
  description: `A professional system design engagement from $${FROM.toLocaleString('en-US')}: workflows, roles, locations, devices, data, integrations, application and technical architecture, build phases, timeline, and budget range — before major development begins.`,
  alternates: { canonical: `${SITE_URL}/blueprint` },
};

const PHASES = [
  { title: 'Intake', detail: 'You tell us how the business operates — locations, roles, tools, and the problems that matter most.' },
  { title: 'Discovery sessions', detail: 'Working sessions with owners, managers, and front-line operators to map how work actually moves.' },
  { title: 'Architecture', detail: 'We design the applications, data model, permissions, devices, and integrations the operation needs.' },
  { title: 'Blueprint review', detail: 'We walk you through the documented system, phases, timeline, and budget range.' },
  { title: 'Build decision', detail: 'You decide what happens next — with a clear scope rather than a guess.' },
];

const FOR_WHO = [
  'Multi-location operators replacing a patchwork of tools',
  'Owners who know something is broken but not what to build',
  'Teams evaluating custom software against off-the-shelf options',
  'Organizations that need a budget range before committing',
];

export default function BlueprintPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="The VexaOS Business Blueprint"
          title={
            <>
              Design your operating system{' '}
              <span className="gradient-text">before you build it.</span>
            </>
          }
          subtitle="The most expensive mistake in custom software is building the wrong thing. The Blueprint documents how your business operates and how the system should work — architecture, phases, timeline, and budget range."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton
              href="/contact?intent=blueprint"
              event="blueprint_started"
              eventProps={{ placement: 'blueprint_hero' }}
              className="w-full sm:w-auto"
            >
              Start Your Business Blueprint
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/pricing" className="w-full sm:w-auto">
              See all pricing
            </SecondaryButton>
          </div>
          <p className="mt-5 text-sm text-gray-500">From ${FROM.toLocaleString('en-US')} · scoped to the size of your operation</p>
        </PageHero>

        <Section className="pt-10 sm:pt-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                center={false}
                eyebrow="What we document"
                title="Before major development begins."
                subtitle="A complete picture of the operation and the system that should run it."
              />
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 -mt-4">
                {BLUEPRINT_DOCUMENTS.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-[15px] text-gray-300">
                    <Check className="w-4 h-4 shrink-0 text-sky-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <BlueprintDocument />
            </div>
          </div>
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="Deliverables" title="What you receive." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BLUEPRINT_DELIVERABLES.map((d) => (
              <li key={d.title} className="surface rounded-2xl p-6">
                <Icon name={d.icon} className="w-5 h-5 text-sky-300" />
                <h3 className="mt-4 text-base font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{d.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="border-t border-white/10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <SectionHeading center={false} eyebrow="How it runs" title="Five steps to a clear build decision." />
              <ol className="-mt-4 relative border-l border-white/10 pl-8 space-y-6">
                {PHASES.map((p, i) => (
                  <li key={p.title} className="relative">
                    <span className="absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full border border-sky-400/30 bg-[#07101f] font-mono text-[11px] text-sky-300">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-400 leading-relaxed">{p.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
                <h3 className="text-base font-semibold text-white">Who it’s for</h3>
                <ul className="mt-4 space-y-3">
                  {FOR_WHO.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 pt-5 border-t border-white/10 text-sm text-gray-500 leading-relaxed">
                  Delivered remotely for organizations worldwide, with sessions scheduled to overlap your
                  business hours.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <CTABand
          title="Tell us how your business operates."
          subtitle="We’ll help you determine what should be connected, automated, rebuilt, or replaced."
          primary={{ label: 'Start Your Business Blueprint', href: '/contact?intent=blueprint', event: 'blueprint_started' }}
          secondary={{ label: 'Tell Us About Your Business', href: '/contact' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
