import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import {
  Section,
  SectionHeading,
  PageHero,
  CTABand,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import { FOUNDER, FOUNDER_STATS } from '@/lib/founder';
import { SITE_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'About — The business operating system company',
  description:
    'VexaOS builds one operating system for the whole business: workforce, commerce, inventory, customer experiences, and the hardware they run on. Founded and built by Darius Henry.',
  alternates: { canonical: `${SITE_URL}/about` },
};

const BELIEFS = [
  {
    icon: 'Layers',
    title: 'Integration is an architecture problem',
    detail:
      'Connectors and sync jobs are a symptom of systems that were never designed together. We solved it by building one platform and putting the products on top of it.',
  },
  {
    icon: 'Store',
    title: 'Independent operators deserve enterprise software',
    detail:
      'A four-location restaurant group has the same operational complexity as a chain, without the IT department. The software should not assume one exists.',
  },
  {
    icon: 'MonitorSmartphone',
    title: 'Hardware is part of the product',
    detail:
      'The screen at your counter is where the software meets the customer. Shipping and managing that hardware ourselves is the only way to be accountable for the experience.',
  },
  {
    icon: 'Wrench',
    title: 'Configuration beats customization',
    detail:
      'A restaurant and a salon do not need different codebases. They need different configurations of the same well-built one — which is what makes the platform sustainable for everyone on it.',
  },
];

const TIMELINE = [
  {
    period: 'The pattern',
    title: 'A decade of building for disconnected businesses',
    detail:
      'Custom platforms across real estate, media, education, and services — each one built around the same recurring problem: tools that could not see each other.',
  },
  {
    period: 'The proof',
    title: 'ShyftGrid',
    detail:
      'A single connected system — manager dashboard, staff mobile experience, and a touchscreen board on one real-time backend. It worked, and it showed what the architecture underneath should be.',
  },
  {
    period: 'The platform',
    title: 'VexaOS',
    detail:
      'The shared foundation extracted and built properly: one identity, one organization model, one data layer, one device registry. ShyftGrid became the first product on it.',
  },
  {
    period: 'Today',
    title: 'Five products, one system',
    detail:
      'ShyftGrid, Commerce Ops, Inventory Ops, VexaFront, and TouchBoard — sold separately, running on the same platform, with hardware managed end to end.',
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
              We build the system{' '}
              <span className="gradient-text">underneath the business.</span>
            </>
          }
          subtitle="VexaOS exists because operators were being asked to be their own systems integrators. One platform, five products, and the hardware they run on — from a single vendor that is accountable for all of it."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo">
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/about/founder">Meet the founder</SecondaryButton>
          </div>
        </PageHero>

        {/* What we believe */}
        <Section className="pt-8">
          <SectionHeading
            eyebrow="What we believe"
            title="Four convictions the platform is built on."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {BELIEFS.map((b) => (
              <div
                key={b.title}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
              >
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
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="How we got here"
            title="VexaOS was extracted, not invented."
            subtitle="The platform is the answer to a problem seen repeatedly in real deployments — not a whiteboard exercise."
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {TIMELINE.map((t, i) => (
              <div
                key={t.title}
                className="flex gap-5 sm:gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
              >
                <div className="shrink-0">
                  <span className="inline-flex w-9 h-9 rounded-full bg-sky-500/10 border border-sky-400/25 items-center justify-center text-xs font-semibold text-sky-200">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    {t.period}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Founder */}
        <Section className="border-t border-white/10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Founder
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {FOUNDER.name}
                </h2>
                <p className="mt-1.5 text-sm text-sky-300">{FOUNDER.role}</p>
                <p className="mt-5 text-gray-400 leading-relaxed">{FOUNDER.bio[0]}</p>
                <div className="mt-8">
                  <SecondaryButton href="/about/founder">
                    Full background and track record
                    <ArrowRight className="w-4 h-4" />
                  </SecondaryButton>
                </div>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
                {FOUNDER_STATS.map((s) => (
                  <div key={s.label} className="bg-[#04070e] px-5 py-6">
                    <p className="text-2xl font-bold text-white tracking-tight">{s.value}</p>
                    <p className="mt-1 text-xs text-gray-500 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Where we are going */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow="Where we are going"
              title="More products. Same foundation."
              subtitle="Every new capability we ship lands on the platform that is already there — which means it works with what you already run on day one, not after an integration project."
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <SecondaryButton href="/platform">Read the platform overview</SecondaryButton>
              <Link
                href="/blog"
                className="text-sm text-gray-400 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors"
              >
                Follow along on the blog
              </Link>
            </div>
          </div>
        </Section>

        <CTABand
          title="Come see it working."
          subtitle="Bring your operation, your questions, and your hardest scheduling week."
        />
      </main>
      <SiteFooter />
    </>
  );
}
