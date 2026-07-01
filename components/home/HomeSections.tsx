'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Globe,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import Icon from '@/components/site/Icon';
import { Section, SectionHeading } from '@/components/site/Section';
import {
  PAIN_POINTS,
  SOLUTION_CARDS,
  DEVICE_CARDS,
  INDUSTRIES,
  FEATURE_GRID_ITEMS,
  PROCESS_STEPS,
  MARKETS,
} from '@/lib/business-data';
import { PUBLIC_PRICING } from '@/lib/quote-config';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

/* ---------------- Section 2: Problem ---------------- */
export function ProblemSection() {
  return (
    <Section className="bg-gradient-to-b from-black to-[#05070d]">
      <SectionHeading
        eyebrow="The real problem"
        title="Most businesses are running on disconnected tools."
        subtitle="A booking app here, a spreadsheet there, payments somewhere else, and staff filling the gaps by hand. It works — until it quietly costs you time, money, and the professional image you want."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAIN_POINTS.map((point, i) => (
          <motion.div
            key={point}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/10"
          >
            <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </span>
            <p className="text-gray-300 text-[15px] leading-relaxed">{point}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Section 3: Solution ---------------- */
export function SolutionSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The solution"
        title={
          <>
            One custom system built{' '}
            <span className="gradient-text">around your business.</span>
          </>
        }
        subtitle="Replace scattered tools with VexaOS — one platform your staff, customers, and managers can actually use, where every part of your operation finally stays connected."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {SOLUTION_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
            <div className="relative">
              <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 items-center justify-center mb-5">
                <Icon name={card.icon} className="w-6 h-6 text-cyan-300" />
              </span>
              <h3 className="text-white font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Section 4: Device ecosystem ---------------- */
export function DeviceEcosystemSection() {
  return (
    <Section className="bg-gradient-to-b from-[#05070d] to-black">
      <SectionHeading
        eyebrow="Every device, connected"
        title="Your dashboard, apps, and touchscreens — working together."
        subtitle="From the front desk to the field, every part of your operation runs on the same real-time system."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DEVICE_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 text-center"
          >
            <span className="inline-flex w-14 h-14 rounded-2xl bg-black border border-white/10 items-center justify-center mb-5 mx-auto">
              <Icon name={card.icon} className="w-7 h-7 text-cyan-300" />
            </span>
            <h3 className="text-white font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{card.detail}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-400">
        <Layers className="w-4 h-4 text-cyan-400" />
        Built on one backend — a single source of truth every device reads and writes.
      </div>
    </Section>
  );
}

/* ---------------- Section 5: Industry examples ---------------- */
export function IndustryExamplesSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Built for real businesses"
        title="Built for real businesses, not generic templates."
        subtitle="Every industry runs differently. Your system is shaped around your workflow — not the other way around."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.slice(0, 6).map((ind, i) => (
          <motion.div
            key={ind.slug}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              href="/industries"
              className="group block h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 items-center justify-center mb-4">
                <Icon name={ind.icon} className="w-6 h-6 text-cyan-300" />
              </span>
              <h3 className="text-white font-semibold text-lg mb-1.5">{ind.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{ind.tagline}</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-cyan-300 font-medium">
                Explore the system
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Section 6: ShyftGrid proof ---------------- */
export function ShyftGridProofSection() {
  const proof = [
    'A web dashboard for managers and owners',
    'A connected mobile app experience for staff',
    'An Android touchscreen / touch-board station',
    'Real-time syncing across every device',
  ];
  return (
    <Section className="bg-gradient-to-b from-black to-[#05070d]">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
              Proof it works — ShyftGrid
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
            A real connected system — not a slide deck.
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            ShyftGrid is a live example of exactly this approach: business-specific software
            that replaces disconnected tools with one connected operation — a dashboard, mobile
            experience, and touchscreen station all sharing the same real-time data.
          </p>
          <ul className="space-y-3 mb-8">
            {proof.map((p) => (
              <li key={p} className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/case-study-shyftgrid"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
          >
            Read the ShyftGrid case study
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-3xl rounded-full" />
          <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 grid grid-cols-2 gap-4">
            {[
              { k: 'Dashboard', v: 'Web' },
              { k: 'Staff tools', v: 'Mobile' },
              { k: 'Front line', v: 'Touchscreen' },
              { k: 'Data', v: 'Real-time' },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{c.k}</div>
                <div className="text-xl font-bold gradient-text">{c.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- Section 7: Modular feature grid ---------------- */
export function FeatureModulesSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Modular by design"
        title="Add exactly what your business needs."
        subtitle="Start with the essentials and grow. Every module plugs into the same connected system."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {FEATURE_GRID_ITEMS.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all"
          >
            <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <Icon name={f.icon} className="w-4 h-4 text-cyan-300" />
            </span>
            <span className="text-sm text-gray-200 font-medium">{f.label}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Section 8: Process ---------------- */
export function ProcessSection() {
  return (
    <Section className="bg-gradient-to-b from-[#05070d] to-black">
      <SectionHeading
        eyebrow="How it's built"
        title="From idea to launch, one clear path."
        subtitle="A proven process that keeps you in control and turns your business into a connected system without the chaos."
      />
      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
        {PROCESS_STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10"
          >
            <div className="text-3xl font-black gradient-text mb-3">{s.step}</div>
            <h3 className="text-white font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Section 9: Pricing preview ---------------- */
export function PricingPreviewSection() {
  const tiers = PUBLIC_PRICING.filter((p) => p.key !== 'blueprint');
  return (
    <Section>
      <SectionHeading
        eyebrow="Investment"
        title="Premium systems, transparent starting points."
        subtitle="Every system is custom-quoted, but here's where each tier begins. Final pricing depends on features, devices, integrations, and your business size."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div
            key={t.key}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`relative p-8 rounded-3xl border transition-all ${
              t.highlight
                ? 'bg-gradient-to-b from-cyan-500/10 to-blue-500/[0.03] border-cyan-500/40 shadow-2xl shadow-cyan-500/10'
                : 'bg-white/[0.03] border-white/10'
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold">
                Most popular
              </span>
            )}
            <h3 className="text-white font-bold text-xl mb-1">{t.name}</h3>
            <p className="text-gray-400 text-sm mb-5">{t.tagline}</p>
            <div className="mb-6">
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Starting at</div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  ${t.setup.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">setup</span>
              </div>
              {t.monthly && (
                <div className="text-cyan-300 text-sm mt-1">
                  + ${t.monthly.toLocaleString()}/mo support
                </div>
              )}
            </div>
            <Link
              href="/pricing"
              className={`block text-center px-5 py-3 rounded-xl font-semibold transition-all ${
                t.highlight
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              See what's included
            </Link>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-gray-500">
        Final pricing depends on your requirements.{' '}
        <Link href="/pricing" className="text-cyan-300 hover:text-cyan-200 underline">
          See full pricing details →
        </Link>
      </p>
    </Section>
  );
}

/* ---------------- Section 10: International ---------------- */
export function InternationalSection() {
  return (
    <Section className="bg-gradient-to-b from-black to-[#05070d]">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 mb-5">
            <Globe className="w-4 h-4 text-cyan-300" />
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-200">
              Global reach
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
            Built remotely. Sold globally.
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Distance is not a limitation. I build and deliver complete connected systems for
            businesses across the world — with pricing adapted to your market and a process
            designed for remote collaboration.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Start from anywhere
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
          <div className="flex flex-wrap gap-3">
            {MARKETS.map((m) => (
              <span
                key={m}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-gray-200 text-sm font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- Section 11: Final CTA ---------------- */
export function FinalCTASection() {
  return (
    <Section>
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/[0.04] to-purple-500/10 p-10 sm:p-16 text-center"
      >
        <div className="absolute inset-0 grid-background opacity-40" />
        <div className="relative">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance mb-5">
            Ready to turn your business into a connected system?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-9">
            Let's map how your business runs today — and design the VexaOS platform that will run it
            tomorrow. It starts with a Business Blueprint.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Start With a Business Blueprint
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/systems"
              className="w-full sm:w-auto px-7 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
            >
              Explore what's possible
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
