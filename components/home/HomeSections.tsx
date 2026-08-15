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
import {
  PRODUCTS,
  VERTICALS,
  OUTCOMES,
  PLATFORM_PILLARS,
  HARDWARE_LEASE,
  TOUCHBOARD_PRICING_STATEMENT,
} from '@/lib/vexaos';

/* -------------------------------------------------------------- */
/* 0 — The control center (product proof)                         */
/* -------------------------------------------------------------- */

export function ControlCenterSection() {
  return (
    <Section className="border-t border-white/10">
      <SectionHeading
        eyebrow="The control center"
        title="This is the whole business, on one screen."
        subtitle="Your organization, your locations, and every product you hold — plus the ones you have not switched on yet. No second login, no separate admin panel per tool."
      />
      <ScreenshotFrame shot={SCREENS.vexaosHome} priority sizes="(min-width: 1024px) 70vw, 100vw" />
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 1 — The problem                                                */
/* -------------------------------------------------------------- */

const DISCONNECTED = [
  'A scheduling app that has never heard of your point of sale',
  'Inventory counted on paper and typed into a spreadsheet',
  'A kiosk vendor with its own customer database',
  'Payroll reconciled against revenue once a month, by hand',
  'Five logins, five support contracts, five sources of truth',
];

const CONNECTED = [
  'Schedules, sales, and stock reading from the same records',
  'Stock that moves the moment an order is fulfilled',
  'A customer created at the kiosk, recognized at the counter',
  'Labor cost and revenue in one report, every day',
  'One login, one vendor, one system of record',
];

export function ProblemSection() {
  return (
    <Section className="border-t border-white/10">
      <SectionHeading
        eyebrow="The problem"
        title={<>Most businesses run on five systems that don’t talk.</>}
        subtitle="Every tool you buy solves one problem and creates an integration. The cost is not the subscriptions — it is the hours spent moving the same information between them."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
          <h3 className="text-lg font-semibold text-white mb-1">Disconnected tools</h3>
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
          <h3 className="text-lg font-semibold text-white mb-1">One operating system</h3>
          <p className="text-sm text-gray-500 mb-6">What VexaOS replaces it with.</p>
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
/* 2 — Product grid                                               */
/* -------------------------------------------------------------- */

export function ProductsSection() {
  return (
    <Section id="products" className="bg-gradient-to-b from-transparent to-[#03060c]">
      <SectionHeading
        eyebrow="The products"
        title="Six products. One platform underneath."
        subtitle="Each product is sold separately and runs on its own. Together they share the same customers, employees, catalog, and devices — with nothing to integrate."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 hover:border-white/20 hover:bg-white/[0.04] transition-colors"
          >
            <span
              className={`inline-flex w-11 h-11 rounded-xl bg-gradient-to-br ${p.accent} items-center justify-center`}
            >
              <Icon name={p.icon} className="w-5 h-5 text-white" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">{p.name}</h3>
            <p className="mt-1 text-[13px] font-medium text-gray-500">{p.role}</p>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed flex-1">{p.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 group-hover:gap-2.5 transition-all">
              Explore {p.name}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}

        <div className="flex flex-col justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-6 sm:p-7">
          <PoweredByBadge className="self-start" />
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Start with one product and add the rest when you are ready. Because they share the
            platform, adding a product is a switch — not a migration.
          </p>
          <SecondaryButton href="/products" className="mt-6 w-full text-sm py-3">
            Compare all products
          </SecondaryButton>
        </div>
      </div>

      <div className="mt-16">
        <ScreenshotFrame
          shot={SCREENS.productSwitcher}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="max-w-4xl mx-auto"
        />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 3 — Platform                                                   */
/* -------------------------------------------------------------- */

export function PlatformSection() {
  return (
    <Section className="border-t border-white/10">
      <SectionHeading
        eyebrow="The platform"
        title="What makes them one system instead of six."
        subtitle="VexaOS is not a bundle. It is a shared foundation the products are built on — which is why data never has to be synced between them."
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
        <SecondaryButton href="/platform">
          Read the platform overview
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
        subtitle="Connected systems are not an aesthetic preference. They remove entire categories of daily work."
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
        title="Configured for how your industry actually operates."
        subtitle="VexaFront and the products around it ship with vertical configurations — the same platform, shaped to the workflow your front counter and back office already run."
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
/* 6 — Hardware                                                   */
/* -------------------------------------------------------------- */

export function HardwareSection() {
  return (
    <Section className="bg-[#03060c] border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            center={false}
            eyebrow="Hardware"
            title="The screens are part of the system."
            subtitle="VexaFront kiosks and TouchBoard displays are enrolled in the VexaOS device registry — configured remotely, monitored centrally, and locked down by default."
          />
          <ul className="space-y-3.5">
            {[
              'VexaFront customer kiosks from 15" to 43", plus wall installations',
              'TouchBoard employee displays from 32" to 86"',
              'Enrollment, configuration, and content managed from the control center',
              'Purchase outright or lease with hardware replacement included',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-gray-400 leading-relaxed">
                <Check className="w-4 h-4 mt-1 shrink-0 text-sky-400" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <SecondaryButton href="/hardware">
              See hardware and sizes
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </div>

        <div>
          <ScreenshotFrame shot={SCREENS.touchBoard} sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300/90">
              Flagship display · {HARDWARE_LEASE.size}
            </p>
            <p className="mt-2.5 text-sm text-gray-400 leading-relaxed">
              ${HARDWARE_LEASE.purchase.toLocaleString()} to purchase, or $
              {HARDWARE_LEASE.monthly}/month over {HARDWARE_LEASE.term} with replacement
              included. {TOUCHBOARD_PRICING_STATEMENT}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- */
/* 7 — Proof / case study                                         */
/* -------------------------------------------------------------- */

export function ProofSection() {
  return (
    <Section className="border-t border-white/10">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <PoweredByBadge />
            <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              ShyftGrid proved the model before VexaOS had a name.
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              The workforce product started as a single connected system — a manager dashboard,
              a staff mobile experience, and a touchscreen board on one real-time backend. That
              architecture is what became the VexaOS platform, and what every product now
              inherits.
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
