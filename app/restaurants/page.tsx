import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Check, Cpu } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import {
  Section,
  SectionHeading,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  CTABand,
  Eyebrow,
} from '@/components/site/Section';
import RestaurantEcosystem from '@/components/marketing/RestaurantEcosystem';
import ScreenshotFrame from '@/components/site/ScreenshotFrame';
import { SYSTEMS_BY_SLUG } from '@/lib/marketing/systems';
import { SCREENS } from '@/lib/screens';
import { SITE_URL } from '@/lib/marketing/site';

const system = SYSTEMS_BY_SLUG['restaurant-os'];

export const metadata: Metadata = {
  title: 'Restaurant OS — One Connected Operating System for Restaurants | VexaOS',
  description:
    'VexaOS Restaurant OS runs your whole restaurant on one system — POS, waiter, host, kitchen display, scheduling, inventory, and financials on a single data layer. Built and running today; now booking pilot demos.',
  alternates: { canonical: `${SITE_URL}/restaurants` },
  openGraph: {
    title: 'Restaurant OS — One Connected Operating System for Restaurants',
    description:
      'POS, waiter, host, kitchen, staff, inventory, and finance in one system. Built and running today — book a live demo.',
    url: `${SITE_URL}/restaurants`,
  },
};

const REPLACES = [
  'Separate POS that owns your data',
  'A scheduling app that doesn’t know sales',
  'Inventory in a spreadsheet',
  'Reservations from another vendor',
  'Payroll reports that arrive too late',
  'Owner reconciling locations by hand',
];

const WHATS_BUILT = [
  'Owner control center on live data',
  'Waiter / server app (orders, splits, pay)',
  'Host app (waitlist, reservations, pacing)',
  'Kitchen display (KDS) by station',
  'Scheduling, clock-in, labor & tips',
  'Inventory, recipes & food cost',
  'Financials & multi-location P&L',
  'Guest ordering & QR order-and-pay',
];

export default function RestaurantsPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Restaurant OS · approaching pilot"
          title={
            <>
              The operating system for your <span className="gradient-text">whole restaurant.</span>
            </>
          }
          subtitle="One connected system from the guest’s first order to the owner’s end-of-day numbers — front of house, kitchen, staff, inventory, and financials on a single data layer. Not another POS."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton
              href="/demo"
              event="restaurant_demo_click"
              eventProps={{ placement: 'restaurants_hero' }}
              className="w-full sm:w-auto"
            >
              Request a Live Demo
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="#ecosystem" className="w-full sm:w-auto">
              See the system
            </SecondaryButton>
          </div>
        </PageHero>

        {/* Real product screenshot, high on the page — let the software sell itself. */}
        <Section className="pt-4">
          <figure>
            <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14] shadow-2xl shadow-black/60">
              <Image
                src="/screens/cc-owner.webp"
                width={1920}
                height={1200}
                alt="VexaOS Restaurant OS owner control center showing an AI daily brief and live sales, orders, covers, and tips across locations."
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority
                className="w-full h-auto"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-gray-500">
              The owner control center, running on live demo data — sales, labor, and food cost across every location.
            </figcaption>
          </figure>
        </Section>

        {/* Ecosystem at a glance */}
        <Section id="ecosystem" className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="One connected system"
            title="Every part of the restaurant, on one platform."
            subtitle="Each app shares the same menu, staff, guests, and numbers — so nothing has to be reconciled between vendors."
          />
          <RestaurantEcosystem />
        </Section>

        {/* Not another POS — replaces the disconnected stack */}
        <Section className="border-t border-white/10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <Eyebrow>Not another POS</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.1] text-balance">
                One system replaces a drawer full of tools.
              </h2>
              <p className="mt-5 text-lg text-gray-400 leading-relaxed">
                Most restaurants run four or five disconnected products that never agree. POS is just
                one module inside Restaurant OS — scheduling, inventory, reservations, and the
                back office all live in the same system, on the same data.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {REPLACES.map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <Check className="mt-0.5 w-4 h-4 shrink-0 text-sky-300" />
                  <span className="text-sm text-gray-300 leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Applications */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <SectionHeading
            eyebrow="The apps"
            title="A complete lineup, built and running."
            subtitle="Owner to server to line cook — every role has an app, and they all speak to the same system."
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {system.apps.map((app) => (
              <li key={app.name} className="rounded-xl border border-white/10 bg-[#060a13] px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold text-white">{app.name}</p>
                  <span className="mono-label text-[10px] text-sky-300/80 whitespace-nowrap">{app.platform}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{app.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Real product screenshots */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="Inside the product"
            title="Real screens from the live system."
            subtitle="Not mockups — these are the actual Restaurant OS control center running on live data today."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <ScreenshotFrame shot={SCREENS.ccFloor} sizes="(min-width:1024px) 32vw, 100vw" />
            <ScreenshotFrame shot={SCREENS.ccDelivery} sizes="(min-width:1024px) 32vw, 100vw" />
            <ScreenshotFrame shot={SCREENS.ccKitchen} sizes="(min-width:1024px) 32vw, 100vw" />
          </div>
        </Section>

        {/* Status / pilot */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Where it stands</Eyebrow>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.1] text-balance">
                Substantially built. Now approaching pilot.
              </h2>
              <p className="mt-5 text-lg text-gray-400 leading-relaxed">{system.statusNote}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <PrimaryButton href="/demo" event="restaurant_demo_click" eventProps={{ placement: 'restaurants_status' }} className="w-full sm:w-auto">
                  Book a demo
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
                <SecondaryButton href="/contact?intent=pilot&system=restaurant-os" className="w-full sm:w-auto">
                  Talk about a pilot
                </SecondaryButton>
              </div>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2 self-center">
              {WHATS_BUILT.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                  <Check className="mt-0.5 w-4 h-4 shrink-0 text-emerald-400" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* IoT — visible but secondary */}
        <Section className="bg-[#03060c] border-t border-white/10">
          <div className="rounded-2xl border border-dashed border-white/15 p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-gray-400" />
              <p className="mono-label text-gray-500">On the platform roadmap</p>
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              Connected hardware & sensors, as the platform grows.
            </h2>
            <p className="mt-4 max-w-3xl text-gray-400 leading-relaxed">
              VexaOS is built to connect the physical restaurant too — temperature and cold-storage
              monitoring, BLE/NFC and equipment sensors, and on-site devices reporting into the same
              system. These arrive progressively; we’ll always tell you exactly what’s live versus on
              the roadmap.
            </p>
            <div className="mt-8">
              <ScreenshotFrame shot={SCREENS.ccConnectedOps} sizes="(min-width:1024px) 70vw, 100vw" />
            </div>
          </div>
        </Section>

        <CTABand
          title="See Restaurant OS on your own operation."
          subtitle="A live demo walks your menu, floor, and numbers through the working system — then we talk about a pilot."
          primary={{ label: 'Request a Live Demo', href: '/demo', event: 'restaurant_demo_click' }}
          secondary={{ label: 'Talk about a pilot', href: '/contact?intent=pilot&system=restaurant-os' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
