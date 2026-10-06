import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMeta } from '../metadata';
import {
  CTABand,
  CheckList,
  Eyebrow,
  FeatureCard,
  GlassCard,
  IconTile,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeading,
  Shot,
  Split,
  StatusBadge,
} from '@/components/site/ui';
import StackDiagram from '@/components/site/StackDiagram';
import TrackedLink from '@/components/site/TrackedLink';
import { DESCRIPTION, INDUSTRIES, RESTAURANT_OS, industryHref } from '@/lib/site';
import { SHOTS } from '@/lib/shots';

export const metadata = {
  ...pageMeta({ title: 'VexaOS: Monitor Anything, Anywhere', description: DESCRIPTION, path: '/' }),
  title: { absolute: 'VexaOS: Monitor Anything, Anywhere' },
};

const primary = INDUSTRIES.filter((i) => i.primary);
const secondary = INDUSTRIES.filter((i) => !i.primary);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="page-wash pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Vendor-neutral monitoring platform</Eyebrow>
            <h1 className="mt-5 text-balance text-5xl font-bold leading-[1.04] tracking-tight text-slate-900 sm:text-6xl">
              Monitor anything, <span className="gradient-text">anywhere.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-600 sm:text-xl">
              Wireless sensors, an Edge Gateway that keeps recording when the internet drops, a cloud that spots
              trouble early, and apps for web, iOS and Android. One platform, any industry.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href="/contact" event="hero_demo_click" className="w-full sm:w-auto">
                Book a demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PrimaryButton>
              <SecondaryButton href="/platform" event="hero_platform_click" className="w-full sm:w-auto">
                See how it works
              </SecondaryButton>
            </div>
          </div>

          {/* Real product, high on the page. */}
          <figure className="mt-14">
            <div className="glass rounded-[2rem] p-2 sm:p-3">
              <Image
                src={SHOTS.dashboardSummary.src}
                width={SHOTS.dashboardSummary.width}
                height={SHOTS.dashboardSummary.height}
                alt={SHOTS.dashboardSummary.alt}
                priority
                sizes="(min-width: 1152px) 1120px, 100vw"
                className="h-auto w-full rounded-3xl"
              />
              <div className="mt-2 grid gap-2 sm:mt-3 sm:gap-3 md:grid-cols-[1.07fr_1fr]">
                <Image
                  src={SHOTS.dashboardPanels.src}
                  width={SHOTS.dashboardPanels.width}
                  height={SHOTS.dashboardPanels.height}
                  alt={SHOTS.dashboardPanels.alt}
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full rounded-3xl"
                />
                <Image
                  src={SHOTS.mobileDashboard.src}
                  width={SHOTS.mobileDashboard.width}
                  height={SHOTS.mobileDashboard.height}
                  alt={SHOTS.mobileDashboard.alt}
                  sizes="(min-width: 768px) 48vw, 100vw"
                  className="hidden h-auto w-full rounded-3xl md:block"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center text-xs text-slate-500">
              The VexaOS web dashboard and mobile app. Real captures from our test site: two sensors, one gateway, no
              sample data.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* The stack */}
      <Section id="stack">
        <SectionHeading
          eyebrow="The platform"
          title="Four layers. One system."
          subtitle="Each layer does one job and hands off to the next, so a reading taken in a freezer ends up as an alert in someone's hand."
        />
        <StackDiagram />
        <p className="mt-8 text-center">
          <Link href="/platform" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
            How the platform works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </Section>

      {/* Why it holds up */}
      <Section className="bg-white/60">
        <SectionHeading
          eyebrow="Built for the real world"
          title="Monitoring that keeps working when things go wrong."
          subtitle="Networks drop, power blips and batteries run down. The platform is built around those days."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="gateway"
            title="Offline-safe"
            body="The gateway writes every reading to its own storage and uploads it, once and in order, when the connection returns."
          />
          <FeatureCard
            icon="plug"
            title="Self-healing"
            body="Watchdogs restart a stalled radio or service and work to bring the network back, with no one on site."
          />
          <FeatureCard
            icon="door"
            title="Instant door events"
            body="A door opening or closing is sent the moment it happens. It does not wait for the next summary."
          />
          <FeatureCard
            icon="cloud"
            title="Early warning"
            body="Drift detection and time-to-limit forecasts flag a problem while there is still time to act."
          />
        </div>
      </Section>

      {/* AI Insights */}
      <Section>
        <Split
          eyebrow="VexaOS Cloud & AI Insights"
          title="It tells you what changed, and what to look at."
          body="Every 30 minutes the cloud checks each sensor for the patterns that come before a failure. Findings are computed from your measurements, and each one carries the numbers behind it."
          visual={<Shot {...SHOTS.doorActivity} />}
        >
          <CheckList
            items={[
              <><strong>Drift detection.</strong> A steady rise or fall over six hours, flagged before a limit is crossed.</>,
              <><strong>Time-to-limit forecasts.</strong> How many hours until a sensor reaches its alert limit at the current rate.</>,
              <><strong>Door patterns.</strong> Left open, opened at unusual hours, or open far longer than normal.</>,
              <><strong>Plain-English explanations.</strong> What happened, the likely cause and what to do, always shown next to the measured numbers.</>,
            ]}
          />
          <Link
            href="/products/cloud-ai-insights"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            More on Cloud & AI Insights
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Split>
      </Section>

      {/* Industries */}
      <Section id="industries" className="bg-white/60">
        <SectionHeading
          eyebrow="Solutions"
          title="One platform, many places to use it."
          subtitle="The same sensors, gateway, cloud and apps, applied to what you need to watch."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {primary.map((ind) => (
            <TrackedLink
              key={ind.slug}
              href={industryHref(ind.slug)}
              event="industry_explore_click"
              eventProps={{ industry: ind.slug }}
              className="group block h-full rounded-3xl"
            >
              <GlassCard className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
                <IconTile name={ind.icon} className="mb-5" />
                <h3 className="text-xl font-semibold text-slate-900">{ind.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{ind.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                  Explore
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </GlassCard>
            </TrackedLink>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secondary.map((ind) => (
            <Link key={ind.slug} href={industryHref(ind.slug)} className="group block rounded-3xl">
              <GlassCard className="flex h-full items-start gap-4 transition group-hover:shadow-xl">
                <IconTile name={ind.icon} />
                <span>
                  <span className="block text-base font-semibold text-slate-900 group-hover:text-blue-700">{ind.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">{ind.headline}</span>
                </span>
              </GlassCard>
            </Link>
          ))}
          <Link href={RESTAURANT_OS.href} className="group block rounded-3xl">
            <GlassCard className="flex h-full items-start gap-4 transition group-hover:shadow-xl">
              <IconTile name="restaurant" />
              <span>
                <span className="block text-base font-semibold text-slate-900 group-hover:text-blue-700">
                  {RESTAURANT_OS.name}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                  Our hospitality solution for running a restaurant, alongside the monitoring platform.
                </span>
              </span>
            </GlassCard>
          </Link>
        </div>
      </Section>

      {/* Vendor neutral */}
      <Section>
        <Split
          flip
          eyebrow="Vendor-neutral"
          title="Not tied to one make of sensor."
          body="Each sensor type plugs into the gateway through an adapter that turns its readings into one common format. The cloud and the apps never need to know who made the sensor."
          visual={<Shot {...SHOTS.sensorCharts} />}
        >
          <CheckList
            items={[
              'Add a new sensor type without replacing your gateway or changing your apps.',
              'Every reading is stored in standard units, whatever the sensor reports.',
              'Unknown data formats are refused, never guessed at.',
            ]}
          />
        </Split>
      </Section>

      {/* Where it stands */}
      <Section className="bg-white/60">
        <SectionHeading
          eyebrow="Where things stand"
          title="What works today, and what is coming."
          subtitle="We would rather you know now than find out later."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <GlassCard>
            <h3 className="text-base font-semibold text-slate-900">Working today</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
              <li>Temperature and humidity sensors</li>
              <li>Door open and closed sensors</li>
              <li>VexaOS Edge Gateway</li>
              <li>VexaOS Cloud with AI Insights</li>
              <li>Web dashboard and the iOS and Android app</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900">Vibration sensing</h3>
              <StatusBadge status="development" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Vibration and machine-health monitoring is being built and is not available yet. Push and email
              delivery of alerts is also in development: today, alerts appear live in the apps.
            </p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900">Mobile Gateway</h3>
              <StatusBadge status="soon" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A gateway for vehicles, trailers and sites without fixed power or network. Planned, not shipping.
            </p>
          </GlassCard>
        </div>
      </Section>

      <div className="pt-16 sm:pt-20">
        <CTABand placement="home" />
      </div>
    </>
  );
}
