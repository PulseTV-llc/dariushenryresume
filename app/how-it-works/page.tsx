import type { Metadata } from 'next';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero, Section, CTABand } from '@/components/site/Section';
import { SITE_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'How It Works — From your workflow to a running system',
  description:
    'How VexaOS turns your workflow into a running system: we learn how your business works, design the system, build and deploy it (including hardware), and keep it running.',
  alternates: { canonical: `${SITE_URL}/how-it-works` },
};

const STEPS: [string, string, string][] = [
  ['01', 'Tell us how your business works', 'We learn the workflow, pain points, people, devices, locations, and operational requirements — the exceptions included.'],
  ['02', 'We design your system', 'VexaOS creates the architecture, applications, dashboards, workflows, and integrations, assembled from proven building blocks.'],
  ['03', 'We build + deploy', 'We develop, test, configure hardware when required (NFC, scanners, kiosks, printers), and deploy the system.'],
  ['04', 'VexaOS keeps it running', 'Hosting, platform infrastructure, updates, support, monitoring, and ongoing improvements over time.'],
];

export default function HowItWorks() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="How it works"
          title="From your workflow to a running system."
          subtitle="A custom system without the custom chaos. VexaOS runs a clear path from your first conversation to software your team uses every day — and keeps improving after launch."
        />
        <Section>
          <ol className="relative mx-auto max-w-3xl space-y-5 border-l border-white/10 pl-8">
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="relative">
                <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 font-mono text-xs font-bold text-sky-300">
                  {n}
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h2 className="text-lg font-semibold text-white">{t}</h2>
                  <p className="mt-2 leading-relaxed text-gray-400">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
        <CTABand
          title="Tell us what your business needs to do."
          subtitle="Describe your operation and the problem you're solving. We'll design the system."
          primary={{ label: 'Build My System', href: '/contact' }}
          secondary={{ label: 'See what we build', href: '/systems' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
