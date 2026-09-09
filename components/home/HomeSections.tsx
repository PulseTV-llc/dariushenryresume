import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import Icon from '@/components/site/Icon';
import ScreenshotFrame from '@/components/site/ScreenshotFrame';
import {
  Section,
  SectionHeading,
  PoweredByBadge,
  SecondaryButton,
} from '@/components/site/Section';
import { SCREENS } from '@/lib/screens';
import { VERTICALS, OUTCOMES, PLATFORM_PILLARS } from '@/lib/vexaos';

/* -------------------------------------------------------------- */
/* 0 — The management dashboard (proof)                           */
/* -------------------------------------------------------------- */

export function ControlCenterSection() {
  return (
    <Section className="border-t border-white/10">
      <SectionHeading
        eyebrow="The management dashboard"
        title="Every system we build comes with one view of the operation."
        subtitle="People, devices, locations, approvals, and analytics in real time — the control center for the custom system we build around your business. No spreadsheets to reconcile, no separate admin panel per tool."
      />
      <ScreenshotFrame shot={SCREENS.shyftgridSchedule} priority sizes="(min-width: 1024px) 70vw, 100vw" />
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 1 — The problem                                                */
/* -------------------------------------------------------------- */

const DISCONNECTED = [
  'Spreadsheets, paper, and group texts holding the operation together',
  'Generic software that never quite matches how the work happens',
  'A kiosk or app vendor with its own separate database',
  'The same information re-typed between disconnected tools',
  'Five logins, five support contracts, five sources of truth',
];

const CONNECTED = [
  'One system built around your real workflow, not a template',
  'A tap, a scan, or a photo captured once and connected everywhere',
  'People, devices, and locations reading the same live records',
  'Approvals, alerts, and reporting that run themselves',
  'One system of record, on hardware that is part of it',
];

export function ProblemSection() {
  return (
    <Section className="border-t border-white/10">
      <SectionHeading
        eyebrow="The problem"
        title={<>Your business shouldn&rsquo;t have to adapt to your software.</>}
        subtitle="Most operations run on a patchwork of tools that don't fit and don't talk. The cost isn't the subscriptions — it's the hours spent working around software that was never built for how you actually operate."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
          <h3 className="text-lg font-semibold text-white mb-1">Generic, disconnected tools</h3>
          <p className="text-sm text-gray-500 mb-6">What most operators live with today.</p>
          <ul className="space-y-3.5">
            {DISCONNECTED.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[15px] text-gray-400 leading-relaxed">
                <X className="w-4 h-4 mt-1 shrink-0 text-red-400/70" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-sky-400/25 bg-gradient-to-br from-sky-500/[0.07] to-transparent p-7 sm:p-8">
          <h3 className="text-lg font-semibold text-white mb-1">A system built around your operation</h3>
          <p className="text-sm text-gray-500 mb-6">What VexaOS builds instead.</p>
          <ul className="space-y-3.5">
            {CONNECTED.map((c) => (
              <li key={c} className="flex items-start gap-3 text-[15px] text-gray-300 leading-relaxed">
                <Check className="w-4 h-4 mt-1 shrink-0 text-sky-400" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 2 — What we build (outcomes, NOT product SKUs)                 */
/* -------------------------------------------------------------- */

const WHAT_WE_BUILD: [string, string][] = [
  ['Custom Android apps', 'Employee apps, field apps, dedicated tablets, and operational tools.'],
  ['Business dashboards', 'Real-time management for schedules, inventory, approvals, and analytics.'],
  ['Kiosks & touchscreens', 'Employee terminals, customer kiosks, check-in, and dedicated displays.'],
  ['NFC, QR & barcode', 'Tap-to-identify clock-in, scanning, and connected hardware.'],
  ['Workflow automation', 'Replace paperwork, spreadsheets, and manual approvals with connected flows.'],
  ['Custom integrations', 'Connect the software you already use with APIs, webhooks, and databases.'],
];

export function ProductsSection() {
  return (
    <Section id="what-we-build" className="bg-gradient-to-b from-transparent to-[#03060c]">
      <SectionHeading
        eyebrow="What we build"
        title="One system, built around your operation."
        subtitle="Not a menu of products to buy and stitch together. You describe the problem; VexaOS assembles exactly the pieces your operation needs into one connected system."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHAT_WE_BUILD.map(([t, d]) => (
          <div
            key={t}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
          >
            <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/25 to-blue-600/15 border border-white/10 items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-300" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">{t}</h3>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed flex-1">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <SecondaryButton href="/what-we-build">
          Explore what we build
          <ArrowRight className="w-4 h-4" />
        </SecondaryButton>
        <SecondaryButton href="/systems">See real system examples</SecondaryButton>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 3 — Built on VexaOS (reusable infrastructure)                 */
/* -------------------------------------------------------------- */

export function PlatformSection() {
  return (
    <Section className="border-t border-white/10">
      <SectionHeading
        eyebrow="Built on VexaOS"
        title="Custom for you. Built on proven infrastructure."
        subtitle="We don't start every project from zero. Reusable platform components — identity, workforce, forms, inventory, displays, notifications, dashboards, and integrations — let us build sophisticated custom systems faster. This is the technology underneath your system, not products you shop for."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_PILLARS.slice(0, 6).map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
          >
            <span className="inline-flex w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
              <Icon name={pillar.icon} className="w-[18px] h-[18px] text-sky-300" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-white">{pillar.title}</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">{pillar.summary}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <SecondaryButton href="/how-it-works">
          See how it works
          <ArrowRight className="w-4 h-4" />
        </SecondaryButton>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 4 — Outcomes                                                   */
/* -------------------------------------------------------------- */

export function OutcomesSection() {
  return (
    <Section className="bg-[#03060c] border-t border-white/10">
      <SectionHeading
        eyebrow="Why it matters"
        title="The value is in what stops happening."
        subtitle="A system built around your operation removes entire categories of daily work — the re-typing, the reconciling, the chasing."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {OUTCOMES.map((o) => (
          <div
            key={o.title}
            className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
          >
            <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
              <Icon name={o.icon} className="w-5 h-5 text-sky-300" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-white">{o.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{o.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 5 — Industries                                                 */
/* -------------------------------------------------------------- */

export function IndustriesSection() {
  return (
    <Section className="border-t border-white/10">
      <SectionHeading
        eyebrow="Industries"
        title="Built around your operation — not your industry label."
        subtitle="Manufacturing, restaurants, facilities, retail, healthcare operations, hospitality, and multi-location businesses all run differently. We build to how yours works."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {VERTICALS.map((v) => (
          <Link
            key={v.slug}
            href={`/industries/${v.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-sky-400/30 hover:bg-white/[0.04] transition-colors"
          >
            <span className="inline-flex w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
              <Icon name={v.icon} className="w-[18px] h-[18px] text-sky-300" />
            </span>
            <h3 className="mt-4 text-[15px] font-semibold text-white group-hover:text-sky-200 transition-colors">
              {v.name}
            </h3>
            <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{v.tagline}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 6 — Connected hardware                                         */
/* -------------------------------------------------------------- */

export function HardwareSection() {
  return (
    <Section className="bg-[#03060c] border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            center={false}
            eyebrow="Connected hardware"
            title="The hardware is part of the system."
            subtitle="NFC readers, barcode and QR scanners, kiosks, printers, sensors, and displays — enrolled in the VexaOS device registry, configured remotely, monitored centrally, and locked down by default."
          />
          <ul className="space-y-3.5">
            {[
              'NFC badges and readers for tap-to-identify clock-in',
              'Barcode / QR scanning for inventory, receiving, and check-in',
              'Android kiosks and touchscreen displays from tablet to large-format',
              'Every device enrolled, configured, and managed from the dashboard',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-gray-400 leading-relaxed">
                <Check className="w-4 h-4 mt-1 shrink-0 text-sky-400" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <SecondaryButton href="/hardware">
              See connected hardware
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </div>

        <div>
          <ScreenshotFrame shot={SCREENS.touchBoard} sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 7 — Proof / real system built                                 */
/* -------------------------------------------------------------- */

export function ProofSection() {
  return (
    <Section className="border-t border-white/10">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <PoweredByBadge />
            <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              A real connected system we built — before VexaOS had a name.
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              A workforce operation ran as a single connected system: a manager dashboard, a staff
              mobile experience, and a touchscreen board on one real-time backend. That architecture
              became the reusable VexaOS platform — the infrastructure every custom system we build
              now inherits.
            </p>
            <div className="mt-8">
              <SecondaryButton href="/case-study-shyftgrid">
                Read the case study
                <ArrowRight className="w-4 h-4" />
              </SecondaryButton>
            </div>
          </div>
          <div className="lg:col-span-5 grid gap-3">
            {[
              ['Manager control center', 'Schedules, coverage, and cost in one browser view'],
              ['Staff self-service', 'Shifts, swaps, and time off from a phone'],
              ['On-site touch board', 'Clock-in and the live shift, on the wall'],
              ['One real-time backend', 'Every surface reading the same records'],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-[#070b14] px-5 py-4"
              >
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
