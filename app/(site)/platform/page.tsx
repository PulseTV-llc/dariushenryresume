import { pageMeta } from '../../metadata';
import {
  CTABand,
  CheckList,
  FeatureCard,
  GlassCard,
  HonestNote,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeading,
  Shot,
  Split,
} from '@/components/site/ui';
import StackDiagram from '@/components/site/StackDiagram';
import { SHOTS } from '@/lib/shots';

export const metadata = pageMeta({
  title: 'Platform: How VexaOS Works',
  description:
    'How VexaOS works: sensors report to an offline-safe Edge Gateway, which sends summaries and instant alarms to VexaOS Cloud, where AI Insights and the web, iOS and Android apps turn them into action.',
  path: '/platform',
});

const JOURNEY = [
  {
    n: '1',
    title: 'A sensor takes a reading',
    body: 'Battery-powered sensors broadcast temperature, humidity or door state over Bluetooth Low Energy every few seconds. Nothing to wire.',
  },
  {
    n: '2',
    title: 'The gateway hears it',
    body: 'The VexaOS Edge Gateway picks up every sensor in range, decodes it through the adapter for that sensor type, and converts it to one common format.',
  },
  {
    n: '3',
    title: 'Rules are checked on site',
    body: 'Alarm rules run on the gateway itself. A crossed limit or a door event is sent straight away, ahead of everything else in the queue.',
  },
  {
    n: '4',
    title: 'Summaries go to the cloud',
    body: 'By default the gateway sends a summary per sensor every 10 seconds: minimum, maximum, average and latest. The interval can be set per sensor.',
  },
  {
    n: '5',
    title: 'The cloud looks for trouble',
    body: 'VexaOS Cloud stores the history and checks every sensor for drift, forecasts, unusual door activity, low batteries and silent devices.',
  },
  {
    n: '6',
    title: 'You see it and act',
    body: 'Dashboards update live on web, iOS and Android. Alerts can be acknowledged and resolved, with a record of who did what.',
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title={<>From a sensor on the wall to an alert <span className="gradient-text">in your hand.</span></>}
        subtitle="VexaOS is four layers that work as one system: sensors, gateway, cloud and apps. Here is what each one does, and what happens to a reading along the way."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact" className="w-full sm:w-auto">Book a demo</PrimaryButton>
          <SecondaryButton href="/products" className="w-full sm:w-auto">Browse the products</SecondaryButton>
        </div>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <StackDiagram />
      </Section>

      <Section className="bg-white/60">
        <SectionHeading eyebrow="The journey of a reading" title="What happens, step by step." />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((s) => (
            <li key={s.n}>
              <GlassCard className="h-full">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </GlassCard>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="offline">
        <Split
          eyebrow="When the internet drops"
          title="Nothing is lost. Nothing is counted twice."
          body="The gateway never assumes the network is there. Readings go into a durable queue on the gateway first, and are only removed once the cloud confirms it has them."
          visual={<Shot {...SHOTS.dashboardPanels} sizes="(min-width: 1024px) 45vw, 100vw" />}
        >
          <CheckList
            items={[
              'Readings and alarms are kept through internet outages and gateway restarts.',
              'When the connection returns, alarms upload first, then everything else from oldest to newest.',
              'Every message has its own ID, so a retry can never create a duplicate.',
              'Alarms that were open before a restart are still open after it.',
            ]}
          />
        </Split>
      </Section>

      <Section id="vendor-neutral" className="bg-white/60">
        <SectionHeading
          eyebrow="Vendor-neutral by design"
          title="Sensors plug in through adapters."
          subtitle="An adapter is a small piece of software on the gateway that understands one sensor type. Everything after it speaks a single VexaOS format."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon="plug"
            title="Add sensor types over time"
            body="Supporting a new kind of sensor means adding an adapter. The gateway, cloud and apps stay as they are."
          />
          <FeatureCard
            icon="sensors"
            title="One format, standard units"
            body="Temperature, humidity, pressure, battery and signal are stored in standard units. The apps convert for display, for example °C or °F."
          />
          <FeatureCard
            icon="gateway"
            title="No guessing"
            body="If a sensor sends a format the adapter does not recognize, the reading is refused rather than guessed at."
          />
        </div>
      </Section>

      <Section id="security">
        <SectionHeading
          eyebrow="Security and access"
          title="Each gateway proves who it is. Each person sees only their sites."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard title="A key per gateway" body="Every gateway holds its own device key and signs in with it. The key never leaves the gateway." />
          <FeatureCard title="Encrypted in transit" body="Gateways talk to VexaOS Cloud over HTTPS with certificate checking. Encrypted sensor broadcasts are supported too." />
          <FeatureCard title="Access by membership" body="Data is separated by organization and site. People see only the sites they have been added to." />
          <FeatureCard title="Invite-only accounts" body="Accounts are created by invitation, with owner, admin, installer and viewer roles." />
        </div>
        <div className="mt-8">
          <HonestNote>
            VexaOS does not hold security or compliance certifications today, such as SOC 2 or ISO 27001. If you need
            specific assurances, ask us and we will answer plainly.
          </HonestNote>
        </div>
      </Section>

      <CTABand placement="platform" />
    </>
  );
}
