import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import EcosystemDiagram from '@/components/site/EcosystemDiagram';
import ScreenshotFrame from '@/components/site/ScreenshotFrame';
import { SCREENS } from '@/lib/screens';
import {
  Section,
  SectionHeading,
  PageHero,
  CTABand,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import { PLATFORM_PILLARS, SITE_URL, APP_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Platform — One identity, one org model, one data layer',
  description:
    'The VexaOS platform is the shared foundation under every product: a single identity, a single organization model, a single data layer, and a managed device registry — so nothing has to be integrated.',
  alternates: { canonical: `${SITE_URL}/platform` },
};

const CONTROL_CENTER = [
  ['Locations & organization', 'Sites, regions, brands, and the roles attached to each.'],
  ['People', 'Employees, permissions, onboarding, and offboarding in one place.'],
  ['Catalog', 'Products, services, modifiers, and pricing published to every surface.'],
  ['Devices', 'Every kiosk and board, its location, its configuration, and its health.'],
  ['Reporting', 'Labor, revenue, and cost of goods on one timeline.'],
  ['Audit', 'Who changed a price, approved an override, or adjusted stock — and when.'],
];

const NOT_INTEGRATIONS = [
  {
    wrong: 'Nightly syncs between systems',
    right: 'One record, read live by every product',
  },
  {
    wrong: 'A connector that breaks on a vendor update',
    right: 'Shared internals, versioned together',
  },
  {
    wrong: 'Two customer databases you reconcile by email address',
    right: 'One customer, created once',
  },
  {
    wrong: 'Separate permission models per tool',
    right: 'One role that means the same thing everywhere',
  },
];

export default function PlatformPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Platform"
          title={
            <>
              The reason it is one system,{' '}
              <span className="gradient-text">not six subscriptions.</span>
            </>
          }
          subtitle="VexaOS is the foundation the products are built on: one identity, one organization model, one data layer, and one device registry. Integration is not something you configure — it is the architecture."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo">
              Book a technical walkthrough
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href={APP_URL} external>
              Log in to the control center
            </SecondaryButton>
          </div>
        </PageHero>

        <Section className="pt-8">
          <EcosystemDiagram />
        </Section>

        {/* Pillars */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="The foundation"
            title="Six things every product inherits."
            subtitle="Build these once, properly, and every product on top of them starts consistent — and stays that way."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {PLATFORM_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-white/10 items-center justify-center">
                    <Icon name={pillar.icon} className="w-5 h-5 text-sky-300" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                </div>
                <p className="mt-5 text-[15px] text-gray-400 leading-relaxed">{pillar.summary}</p>
                <ul className="mt-6 space-y-2.5">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-gray-400">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <ScreenshotFrame
              shot={SCREENS.unifiedSettings}
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="max-w-4xl mx-auto"
            />
          </div>
        </Section>

        {/* Control center */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                center={false}
                eyebrow="Control center"
                title="One place your operators actually work."
                subtitle="The VexaOS control center is where the organization is configured and where the business is run — every product, every location, one browser tab."
              />
              <SecondaryButton href={APP_URL} external>
                Open app.vexaos.io
              </SecondaryButton>
            </div>
            <div className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
              {CONTROL_CENTER.map(([title, detail]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5"
                >
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <ScreenshotFrame
              shot={SCREENS.locationSwitcher}
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="max-w-4xl mx-auto"
            />
          </div>
        </Section>

        {/* Not integrations */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="The difference"
            title="Shared internals beat good integrations."
            subtitle="An integration is a promise between two systems. A shared data layer removes the need for the promise."
          />
          <div className="rounded-3xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-2 bg-white/[0.03] border-b border-white/10">
              <p className="px-5 sm:px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                Integrated tools
              </p>
              <p className="px-5 sm:px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300/90 border-l border-white/10">
                VexaOS
              </p>
            </div>
            {NOT_INTEGRATIONS.map((row, i) => (
              <div
                key={row.wrong}
                className={`grid grid-cols-2 ${i > 0 ? 'border-t border-white/10' : ''}`}
              >
                <p className="px-5 sm:px-7 py-5 text-sm text-gray-500 leading-relaxed">
                  {row.wrong}
                </p>
                <p className="px-5 sm:px-7 py-5 text-sm text-gray-200 leading-relaxed border-l border-white/10 bg-sky-500/[0.03]">
                  {row.right}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <CTABand
          title="Bring us your architecture questions."
          subtitle="Multi-location rollups, permission models, device fleets, data migration — the technical walkthrough goes as deep as you need."
          primary={{ label: 'Book a technical walkthrough', href: '/demo' }}
          secondary={{ label: 'Contact sales', href: '/contact' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
