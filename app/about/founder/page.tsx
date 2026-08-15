import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Linkedin, Github, Mail } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import {
  Section,
  SectionHeading,
  PageHero,
  CTABand,
  SecondaryButton,
} from '@/components/site/Section';
import {
  FOUNDER,
  FOUNDER_STATS,
  FOUNDER_EXPERTISE,
  FOUNDER_PRINCIPLES,
} from '@/lib/founder';
import { projects } from '@/data/projects';
import { SITE_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Darius Henry — Founder & Chief Architect',
  description:
    'Darius Henry founded VexaOS after a decade building connected business software. Track record, technical background, and the operating principles behind the platform.',
  alternates: { canonical: `${SITE_URL}/about/founder` },
};

export default function FounderPage() {
  // Tier 1 and 2 projects — the substantive track record.
  const track = projects.filter((p) => p.tier <= 2);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Founder"
          title={FOUNDER.name}
          subtitle={FOUNDER.role}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-sm font-medium text-white hover:bg-white/[0.08] transition-colors"
            >
              <Linkedin className="w-4 h-4 text-sky-300" />
              LinkedIn
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={FOUNDER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-sm font-medium text-white hover:bg-white/[0.08] transition-colors"
            >
              <Github className="w-4 h-4 text-gray-300" />
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={`mailto:${FOUNDER.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-sm font-medium text-white hover:bg-white/[0.08] transition-colors"
            >
              <Mail className="w-4 h-4 text-sky-300" />
              Email
            </a>
          </div>
        </PageHero>

        {/* Bio + stats */}
        <Section className="pt-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-5">
              {FOUNDER.bio.map((para) => (
                <p key={para.slice(0, 40)} className="text-lg text-gray-400 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
                {FOUNDER_STATS.map((s) => (
                  <div key={s.label} className="bg-[#04070e] px-5 py-7">
                    <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
                    <p className="mt-1.5 text-xs text-gray-500 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Principles */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Operating principles"
            title="How VexaOS gets built."
            subtitle="The decisions that shaped the platform, and the ones that keep shaping it."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {FOUNDER_PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
              >
                <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                  <Icon name={p.icon} className="w-5 h-5 text-sky-300" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Technical background */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Technical background"
            title="What the founder actually builds."
            subtitle="VexaOS is not outsourced. The platform, the products, and the device layer are built and maintained in-house."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDER_EXPERTISE.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
              >
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
                    <Icon name={cat.icon} className="w-[18px] h-[18px] text-sky-300" />
                  </span>
                  <h3 className="text-base font-semibold text-white">{cat.title}</h3>
                </div>
                <ul className="mt-5 space-y-2">
                  {cat.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Track record */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Track record"
            title="Products shipped before VexaOS."
            subtitle="Platforms built, launched, and run in production — the work that informed how VexaOS is architected."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {track.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-0.5 text-sm text-sky-300">{p.tagline}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-medium text-gray-400 shrink-0">
                    {p.status}
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">{p.description}</p>
                {p.outcome && (
                  <p className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-300 leading-relaxed">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 block mb-1.5">
                      Outcome
                    </span>
                    {p.outcome}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[11px] text-gray-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Full product history and technical writing on the{' '}
            <Link
              href="/blog"
              className="text-gray-300 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors"
            >
              VexaOS blog
            </Link>
            .
          </p>
        </Section>

        {/* Back to company */}
        <Section className="border-t border-white/10">
          <div className="text-center">
            <SecondaryButton href="/about">
              About VexaOS the company
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </Section>

        <CTABand
          title="Talk to the person who built it."
          subtitle="Demos, architecture questions, and deployment planning go directly to the founder."
        />
      </main>
      <SiteFooter />
    </>
  );
}
