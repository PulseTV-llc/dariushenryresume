import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import ScreenshotFrame, { HardwarePhotoCard } from '@/components/site/ScreenshotFrame';
import { Section, SectionHeading, PageHero, CTABand, PrimaryButton, SecondaryButton, Eyebrow } from '@/components/site/Section';
import PlatformLayers from '@/components/marketing/PlatformLayers';
import ArchitecturePrinciples from '@/components/marketing/ArchitecturePrinciples';
import { SCREENS, HARDWARE_PHOTOS } from '@/lib/screens';
import { PRODUCTS, DOMAIN_META, type ProductDomain } from '@/lib/vexaos';
import { SITE_URL } from '@/lib/marketing/site';

export const metadata: Metadata = {
  title: 'Platform — Proven Architecture Underneath Every Custom System',
  description:
    'The VexaOS platform: reusable identity, organization, access, data, device, communication, integration, and intelligence layers — plus proven workforce, commerce, inventory, and facility modules — underneath every custom business system.',
  alternates: { canonical: `${SITE_URL}/platform` },
};

const SECURITY = [
  { icon: 'Building2', title: 'Tenant isolation', detail: 'Data is scoped to your organization and locations, enforced with row-level security or deny-by-default rules at the database — not just hidden in the interface.' },
  { icon: 'KeyRound', title: 'Role-based access', detail: 'Roles and permissions checked server-side, down to the action. A shift lead cannot see payroll because the data layer says so.' },
  { icon: 'ScrollText', title: 'Audit trails', detail: 'Sensitive actions — pricing, refunds, stock adjustments, approvals — recorded with who, what, and when.' },
  { icon: 'Lock', title: 'Encryption', detail: 'Data encrypted in transit and at rest on managed cloud infrastructure.' },
  { icon: 'MonitorSmartphone', title: 'Device lockdown', detail: 'Kiosks and boards run locked-down modes, paired to a location, and can be unpaired remotely.' },
  { icon: 'ShieldCheck', title: 'Security maintenance', detail: 'Dependency updates, monitoring, and patching are part of Managed Platform & Support.' },
];

const INTEGRATIONS = [
  ['Payments', 'Card-present and online payments through established processors such as Stripe.'],
  ['Payroll & accounting', 'Approved hours, tips, and financials exported to the providers you already use.'],
  ['APIs & webhooks', 'REST APIs and event webhooks so your system can talk to anything with an API.'],
  ['Existing software', 'Keep the tools that work — POS, booking, delivery, or industry software — and connect them.'],
  ['Data migration', 'Customers, employees, catalogs, and history moved in from spreadsheets and legacy systems.'],
  ['Notifications', 'Email, SMS, push, and on-screen alerts routed to the right person.'],
];

const DOMAINS: ProductDomain[] = ['Workforce', 'Commerce', 'Operations'];

export default function PlatformPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Platform"
          title={
            <>
              Proven architecture.{' '}
              <span className="gradient-text">Custom implementation.</span>
            </>
          }
          subtitle="Every VexaOS system is custom on the surface and proven underneath. The platform gives your build identity, organizations, permissions, data, devices, and integrations that already work — so the budget goes into your operation."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/contact?intent=build" className="w-full sm:w-auto">
              Build My Business System
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="#modules" className="w-full sm:w-auto">
              See the proven modules
            </SecondaryButton>
          </div>
        </PageHero>

        {/* Architecture layers */}
        <Section id="architecture" className="pt-10 sm:pt-12">
          <PlatformLayers />
        </Section>

        {/* Principles */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Architecture principles"
            title="One identity. One organization model. One data layer."
            subtitle="Build these once, properly, and every application on top of them starts consistent — and stays that way."
          />
          <ArchitecturePrinciples detailed />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <ScreenshotFrame shot={SCREENS.locationSwitcher} sizes="(min-width: 1024px) 48vw, 100vw" />
            <ScreenshotFrame shot={SCREENS.unifiedSettings} sizes="(min-width: 1024px) 48vw, 100vw" />
          </div>
        </Section>

        {/* Modules */}
        <Section id="modules" className="border-t border-white/10">
          <SectionHeading
            eyebrow="Proven modules"
            title="Proven technology underneath every VexaOS build."
            subtitle="Working software we assemble, extend, and customize inside your system. These are building blocks — not separate products you have to buy and stitch together."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {DOMAINS.map((domain) => (
              <div key={domain} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <p className="mono-label text-gray-400">{DOMAIN_META[domain].label}</p>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{DOMAIN_META[domain].blurb}</p>
                <ul className="mt-5 space-y-2.5">
                  {PRODUCTS.filter((p) => p.domain === domain).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/platform/modules/${p.slug}`}
                        className="group flex items-start gap-3 rounded-xl border border-white/10 bg-[#070b14] p-3.5 hover:border-sky-400/30 transition-colors"
                      >
                        <span className={`inline-flex w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br ${p.accent} items-center justify-center`}>
                          <Icon name={p.icon} className="w-[18px] h-[18px] text-white" strokeWidth={2} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-white group-hover:text-sky-200 transition-colors">{p.name}</span>
                          <span className="block text-xs text-gray-500 leading-relaxed mt-0.5">{p.role}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Security */}
        <Section id="security" className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Security"
            title="Governed access, designed in."
            subtitle="Security is part of the architecture every build inherits — not a feature added at the end."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECURITY.map((s) => (
              <li key={s.title} className="surface rounded-2xl p-6">
                <Icon name={s.icon} className="w-5 h-5 text-sky-300" />
                <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{s.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
            Industry and regional compliance requirements — such as payment card, health data, or
            data-protection rules — are scoped and addressed per engagement.
          </p>
        </Section>

        {/* Integrations */}
        <Section id="integrations" className="border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Eyebrow>Integrations</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] text-balance">
                Open at the edges.
              </h2>
              <p className="mt-5 text-lg text-gray-400 leading-relaxed">
                Your VexaOS system becomes the system of record without becoming a walled garden.
                Keep what works, connect it, and replace only what is holding the operation back.
              </p>
            </div>
            <ul className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
              {INTEGRATIONS.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-white">
                    <Check className="w-4 h-4 text-sky-400" />
                    {t}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Devices */}
        <Section id="devices" className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="Devices"
            title="Web. Mobile. Hardware. One architecture."
            subtitle="Tablets, kiosks, wall boards, readers, and sensors enroll in one device registry — paired to a location, assigned a mode, and managed remotely."
          />
          <ScreenshotFrame shot={SCREENS.deviceFleet} sizes="(min-width: 1024px) 70vw, 100vw" className="max-w-5xl mx-auto" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HARDWARE_PHOTOS.map((p) => (
              <HardwarePhotoCard key={p.key} photo={p} />
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <SecondaryButton href="/hardware">
              Connected hardware
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
            <SecondaryButton href="/platform/modules/touchboard/demo" event="demo_opened" eventProps={{ module: 'touchboard', placement: 'platform_devices' }}>
              Try the TouchBoard demo
            </SecondaryButton>
          </div>
        </Section>

        <CTABand
          title="Bring us your architecture questions."
          subtitle="Multi-location rollups, permission models, device fleets, data migration, integrations — the technical conversation goes as deep as you need."
        />
      </main>
      <SiteFooter />
    </>
  );
}
