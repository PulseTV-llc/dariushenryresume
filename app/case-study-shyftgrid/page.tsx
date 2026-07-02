import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, LayoutDashboard, Smartphone, MonitorSmartphone, RefreshCw } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import { Section, SectionHeading } from '@/components/site/Section';

export const metadata: Metadata = {
  title: 'ShyftGrid Case Study | A Connected Business System',
  description:
    'ShyftGrid is a real example of a connected business system — a web dashboard, mobile app experience, Android touchscreen board, and real-time synced operations replacing disconnected tools with one platform.',
  alternates: { canonical: 'https://www.vexaos.io/case-study-shyftgrid' },
};

const layers = [
  {
    icon: LayoutDashboard,
    title: 'Web Dashboard',
    detail: 'A browser-based control center where managers and owners see and run operations from one place.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Experience',
    detail: 'A connected mobile experience giving staff their tools, tasks, and status on the device in their pocket.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Touchscreen / Touch Board',
    detail: 'An Android touch-board station concept for fast, front-line interaction that feels modern and effortless.',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Operations',
    detail: 'Every device reads and writes the same live data, so the whole operation stays in sync automatically.',
  },
];

const beforeAfter = {
  before: [
    'Separate tools for scheduling, staff, and operations',
    'Information re-entered by hand across systems',
    'No single live view of what was happening',
    'A patchwork that looked and felt disconnected',
  ],
  after: [
    'One connected platform across web, mobile, and touchscreen',
    'A single source of truth every device shares',
    'A real-time dashboard for managers and owners',
    'Business-specific software instead of generic tools',
  ],
};

export default function ShyftGridCaseStudy() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="relative pt-36 pb-8 px-4 sm:px-6 lg:px-8 grid-background overflow-hidden">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
                Case study · ShyftGrid
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              One connected system,{' '}
              <span className="gradient-text">not a pile of tools.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              ShyftGrid is the proof-of-concept behind the VexaOS approach: business-specific software
              that ties a web dashboard, a mobile experience, and a touchscreen station together on one
              real-time backend.
            </p>
          </div>
        </section>

        {/* The problem */}
        <Section className="pt-12">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-red-500/[0.04] border border-red-500/15">
              <h2 className="text-xl font-bold text-white mb-5">Before — disconnected tools</h2>
              <ul className="space-y-3">
                {beforeAfter.before.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-gray-300 text-sm">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-cyan-500/[0.05] border border-cyan-500/25">
              <h2 className="text-xl font-bold text-white mb-5">After — a connected system</h2>
              <ul className="space-y-3">
                {beforeAfter.after.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-gray-200 text-sm">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* The connected system layers */}
        <Section className="bg-gradient-to-b from-black to-[#05070d]">
          <SectionHeading
            eyebrow="The connected system"
            title="Every layer, working as one."
            subtitle="ShyftGrid was designed as a single operation spread across the devices a business actually uses."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {layers.map(({ icon: I, title, detail }) => (
              <div key={title} className="p-7 rounded-3xl bg-white/[0.03] border border-white/10">
                <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 items-center justify-center mb-5">
                  <I className="w-6 h-6 text-cyan-300" />
                </span>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* The takeaway */}
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow="The takeaway"
              title="This is what VexaOS can build for your business."
              subtitle="ShyftGrid is one example of the VexaOS connected-system approach — a dashboard, mobile tools, touchscreen stations, and real-time data — that can be shaped around your industry and your workflow."
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all hover:scale-[1.02]"
              >
                Build my connected system
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/systems"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
              >
                See what can be built
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
