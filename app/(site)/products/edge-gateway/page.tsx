import { pageMeta } from '../../../metadata';
import {
  CTABand,
  CheckList,
  FeatureCard,
  HonestNote,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeading,
  Shot,
  Split,
} from '@/components/site/ui';
import { ConnectivitySection } from '@/components/site/SensorCatalog';
import { SHOTS } from '@/lib/shots';

export const metadata = pageMeta({
  title: 'VexaOS Edge Gateway: Offline-Safe and Self-Healing',
  description:
    'The VexaOS Edge Gateway collects readings from nearby sensors, checks alarm rules on site, keeps every reading through outages and restarts, and recovers by itself.',
  path: '/products/edge-gateway',
});

export default function EdgeGatewayPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Edge Gateway"
        title={<>The gateway that <span className="gradient-text">keeps recording.</span></>}
        subtitle="The VexaOS Edge Gateway sits on site, listens to every sensor in range, and gets the data to the cloud. When the network or power lets it down, it holds on to your readings and puts itself right."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact" className="w-full sm:w-auto">Book a demo</PrimaryButton>
          <SecondaryButton href="/platform#offline" className="w-full sm:w-auto">How offline mode works</SecondaryButton>
        </div>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon="gateway"
            title="Offline-safe"
            body="Readings are written to durable storage on the gateway and removed only after the cloud confirms receipt. An outage delays your data; it does not lose it."
          />
          <FeatureCard
            icon="plug"
            title="Self-healing"
            body="If the sensor radio goes silent, the gateway restarts scanning, then resets the radio, then restarts its own service. A hardware watchdog covers a full freeze."
          />
          <FeatureCard
            icon="cloud"
            title="Auto-recovery"
            body="When the network drops, the gateway works through reconnecting Wi-Fi, restarting networking and, as a last resort, a rate-limited reboot. It starts by itself after power returns."
          />
        </div>
      </Section>

      <Section className="bg-white/60">
        <Split
          eyebrow="On-site decisions"
          title="Alarms do not wait for the cloud."
          body="Alarm rules are checked on the gateway against every reading. A raised or cleared alarm goes to the front of the queue and is sent immediately."
          visual={<Shot {...SHOTS.dashboardPanels} sizes="(min-width: 1024px) 45vw, 100vw" />}
        >
          <CheckList
            items={[
              'Limits with a hold time, so a brief spike does not raise an alarm.',
              'Hysteresis, so a reading hovering at the limit does not flap on and off.',
              'Summaries every 10 seconds by default, adjustable per sensor.',
              'Detailed raw readings stay on the gateway; the cloud gets the summaries.',
            ]}
          />
        </Split>
      </Section>

      <Section>
        <Split
          flip
          eyebrow="Gateway health"
          title="You can see the gateway is alive."
          body="Every minute the gateway reports its own health: network, sensor radio, uptime and power supply. If it has had to recover from something, it tells you what happened."
          visual={<Shot {...SHOTS.mobileGateway} sizes="(min-width: 1024px) 40vw, 100vw" />}
        >
          <CheckList
            items={[
              'A gateway offline for 5 minutes raises a finding.',
              'A weak power supply is detected and reported.',
              'A backlog of readings waiting to upload is visible.',
              'Each gateway signs in with its own device key over HTTPS.',
            ]}
          />
        </Split>
      </Section>

      <Section id="connectivity" className="bg-white/60">
        <SectionHeading
          eyebrow="Connectivity"
          title="Wireless and wired, into one gateway."
          subtitle="Bluetooth sensors work today. Wired RS-485 / Modbus devices are added as an integration."
        />
        <ConnectivitySection />
      </Section>

      <Section>
        <SectionHeading eyebrow="Setup" title="What a gateway needs." />
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard title="Mains power" body="The Edge Gateway is for fixed sites with a power outlet. For places without one, see the Mobile Gateway, which is coming soon." />
          <FeatureCard title="Wi-Fi or Ethernet" body="An ordinary internet connection is enough. The gateway makes outbound HTTPS connections only." />
          <FeatureCard title="Sensors in range" body="Wireless sensors connect over Bluetooth Low Energy; larger sites use more than one gateway. Wired RS-485 / Modbus devices are added as an integration." />
        </div>
        <div className="mt-8">
          <HonestNote>
            The Edge Gateway is new. Its offline queue, self-recovery and restart behaviour are covered by automated
            tests, and it runs with real sensors on our own test site. Long-duration field testing is still under
            way, and we will share exactly where it stands when you talk to us.
          </HonestNote>
        </div>
      </Section>

      <CTABand placement="edge-gateway" />
    </>
  );
}
