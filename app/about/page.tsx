import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading, PageHero, CTABand, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import FounderSection from '@/components/marketing/FounderSection';
import GlobalDelivery from '@/components/marketing/GlobalDelivery';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'About — The Custom Business Operating System Company',
  description:
    'VexaOS designs and builds custom business operating systems for multi-location and operationally complex companies — web, mobile, and hardware on one proven architecture. Founded by Darius Henry. Built in America, delivered worldwide.',
  alternates: { canonical: `${SITE_URL}/about` },
};

const BELIEFS = [
  {
    icon: 'Workflow',
    title: 'Software should fit the business',
    detail:
      'Your company should not have to change the way it operates to fit its software. We build the software around the way your company operates.',
  },
  {
    icon: 'Building2',
    title: 'Complexity isn’t only for the Fortune 500',
    detail:
      'A twelve-location operator has enterprise-level operational complexity without an enterprise IT department. The software should not assume one exists.',
  },
  {
    icon: 'Layers',
    title: 'Custom should not mean starting from zero',
    detail:
      'Identity, permissions, devices, and data are solved once in the platform. Each engagement invests in what makes the operation different.',
  },
  {
    icon: 'MonitorSmartphone',
    title: 'Hardware is part of the system',
    detail:
      'The kiosk at the counter and the board on the wall are where the software meets the operation. They belong in the architecture, not bolted on afterward.',
  },
];

const TIMELINE = [
  {
    period: 'The pattern',
    title: 'Businesses drowning in disconnected tools',
    detail:
      'Custom platforms across real estate, media, education, and services kept meeting the same problem: tools that could not see each other, and operators acting as their own integrators.',
  },
  {
    period: 'The proof',
    title: 'ShyftGrid',
    detail:
      'A connected workforce system — manager control center, employee mobile experience, and Android wall boards on one real-time backend. It showed what the architecture underneath should be.',
  },
  {
    period: 'The platform',
    title: 'VexaOS architecture',
    detail:
      'The shared foundation extracted and built properly: identity, organizations, access, data, a device registry — and reusable modules for workforce, commerce, inventory, and facilities.',
  },
  {
    period: 'Today',
    title: 'Custom business operating systems',
    detail:
      'VexaOS designs and builds complete systems around how each client operates — from restaurant groups to facility services — on architecture that is already proven.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Company"
          title={
            <>
              We design the operating system{' '}
              <span className="gradient-text">for your company.</span>
            </>
          }
          subtitle="VexaOS is a custom business operating system company. We design and build connected software ecosystems — web, mobile, operations, data, and hardware — around how each client’s business actually works."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact?intent=build" className="w-full sm:w-auto">
              Build My Business System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/about/founder" className="w-full sm:w-auto">
              Meet the founder
            </SecondaryButton>
          </div>
        </PageHero>

        {/* Model */}
        <Section className="pt-8">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              ['Custom software company', 'Web control centers, native iOS and Android apps, and device software built for your operation.'],
              ['Systems integrator', 'The tools you keep connected; the ones holding you back replaced — on one data layer.'],
              ['Software platform', 'Reusable architecture and proven modules underneath every build, so nothing starts from zero.'],
            ].map(([t, d]) => (
              <div key={t} className="bg-[#050912] p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white">{t}</h2>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Beliefs */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading eyebrow="What we believe" title="Four convictions behind every system." />
          <div className="grid gap-4 sm:grid-cols-2">
            {BELIEFS.map((b) => (
              <div key={b.title} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                  <Icon name={b.icon} className="w-5 h-5 text-sky-300" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* How we got here */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="How we got here"
            title="The architecture was extracted, not invented."
            subtitle="VexaOS is the answer to a problem seen repeatedly in real builds — not a whiteboard exercise."
          />
          <ol className="max-w-3xl mx-auto space-y-3">
            {TIMELINE.map((t, i) => (
              <li key={t.title} className="flex gap-5 sm:gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <span className="inline-flex w-9 h-9 shrink-0 rounded-full bg-sky-500/10 border border-sky-400/25 items-center justify-center text-xs font-semibold text-sky-200">
                  {i + 1}
                </span>
                <div>
                  <p className="mono-label text-[10px] text-gray-500">{t.period}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Founder */}
        <Section id="founder" className="bg-[#03060c] border-t border-white/10">
          <FounderSection />
        </Section>

        {/* Global */}
        <Section className="border-t border-white/10">
          <GlobalDelivery />
        </Section>

        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow="Process"
              title="See how an engagement runs."
              subtitle="Discovery, Blueprint, architecture, prototype, build, deployment, and managed support."
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <SecondaryButton href="/how-it-works">
                Our process
                <ArrowRight className="w-4 h-4" />
              </SecondaryButton>
              <Link href="/blog" className="text-sm text-gray-400 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors">
                Read our insights
              </Link>
            </div>
          </div>
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
