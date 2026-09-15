import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, Section, SectionHeading, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import ProcessTimeline from '@/components/marketing/ProcessTimeline';
import PlatformLayers from '@/components/marketing/PlatformLayers';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'Process — How VexaOS Designs, Builds, and Runs Your Business System',
  description:
    'The VexaOS engagement process: discovery, Business Blueprint, system architecture, prototype, build, deployment, and managed platform support — for custom business software delivered worldwide.',
  alternates: { canonical: `${SITE_URL}/how-it-works` },
};

const PRINCIPLES = [
  ['Operations first', 'We learn the workflow — including the exceptions — before a single screen is designed.'],
  ['Phased, reviewed delivery', 'Work ships in phases you can see and use, not a big reveal at the end.'],
  ['Proven foundations', 'Identity, permissions, devices, and data come from the VexaOS platform, not a blank repository.'],
  ['Operated after launch', 'Managed Platform & Support keeps the system secure, monitored, and improving.'],
];

export default function HowItWorks() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Process"
          title={
            <>
              From how you operate{' '}
              <span className="gradient-text">to a system that runs it.</span>
            </>
          }
          subtitle="A consulting-grade process with the engineering to back it: we study the operation, design the system, build it on proven architecture, deploy it — and keep it running."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact?intent=blueprint" event="blueprint_started" eventProps={{ placement: 'process_hero' }} className="w-full sm:w-auto">
              Start with a Blueprint
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/pricing" className="w-full sm:w-auto">
              See pricing
            </SecondaryButton>
          </div>
        </PageHero>

        <Section className="pt-10 sm:pt-12">
          <ProcessTimeline />
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="How we work" title="Four commitments behind every engagement." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="font-mono text-xs text-sky-300">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-base font-semibold text-white">{t}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="border-t border-white/10">
          <PlatformLayers />
        </Section>

        <CTABand
          title="Tell us how your business operates."
          subtitle="We’ll help you determine what should be connected, automated, rebuilt, or replaced."
        />
      </main>
      <SiteFooter />
    </>
  );
}
