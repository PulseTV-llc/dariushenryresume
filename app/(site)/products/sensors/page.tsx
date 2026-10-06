import { pageMeta } from '../../../metadata';
import {
  CTABand,
  CheckList,
  FeatureCard,
  HonestNote,
  PageHero,
  PrimaryButton,
  Section,
  SectionHeading,
  Shot,
  Split,
} from '@/components/site/ui';
import { SHOTS } from '@/lib/shots';

export const metadata = pageMeta({
  title: 'Sensors: Temperature, Humidity and Door',
  description:
    'Wireless, battery-powered VexaOS sensors for temperature, humidity and door state. Vibration sensing is in development, and more sensor types are added through adapters.',
  path: '/products/sensors',
});

export default function SensorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Sensors"
        title={<>Small wireless sensors for <span className="gradient-text">the things you need to watch.</span></>}
        subtitle="Battery-powered sensors that report over Bluetooth Low Energy to a VexaOS Edge Gateway. No wiring and no network setup on the sensor."
      >
        <PrimaryButton href="/contact">Ask about sensors</PrimaryButton>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <SectionHeading eyebrow="Sensor types" title="What you can measure." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="thermometer"
            title="Temperature and humidity"
            body="Coolers, freezers, storage rooms and work areas. The sensor also reports air pressure, its own battery level and its signal strength."
          />
          <FeatureCard
            icon="door"
            title="Door and contact"
            body="Open or closed, reported the moment it changes. The door sensor also reports the temperature and humidity where it sits."
          />
          <FeatureCard
            icon="vibration"
            title="Vibration and machine health"
            status="development"
            body="Vibration velocity, displacement and frequency on three axes for rotating equipment. Being built; not available yet."
          />
          <FeatureCard
            icon="plug"
            title="More through adapters"
            body="Each sensor type connects through an adapter on the gateway. Tell us what you need to measure and we will tell you where it stands."
          />
        </div>
      </Section>

      <Section className="bg-white/60">
        <Split
          eyebrow="Door sensors"
          title="Every open and close, on a timeline."
          body="Door events are sent as they happen. In the apps you see how many times a door opened today, the longest it stayed open, and each event with its time."
          visual={<Shot {...SHOTS.doorActivity} />}
        >
          <CheckList
            items={[
              'Each change is recorded once, in order, even through an outage.',
              'A door open for 10 minutes or more is flagged.',
              'Openings at unusual hours and unusually long open time are called out.',
            ]}
          />
        </Split>
      </Section>

      <Section>
        <Split
          flip
          eyebrow="Sensor health"
          title="The sensors watch themselves, too."
          body="A monitoring system is only useful if you know it is still working. Every sensor reports its battery and signal, and the platform raises its own findings when one needs attention."
          visual={<Shot {...SHOTS.sensorCharts} />}
        >
          <CheckList
            items={[
              'Low battery, or a battery on course to run out within 30 days.',
              'Weak signal, or signal that has dropped sharply.',
              'A sensor that has gone quiet while its gateway is still online.',
            ]}
          />
        </Split>
        <div className="mt-10">
          <HonestNote>
            Sensors today connect over Bluetooth Low Energy, so they need to be within radio range of a gateway. Range
            depends on walls, doors and equipment in between. We check signal at each location during setup. Longer
            range radio options are not available yet.
          </HonestNote>
        </div>
      </Section>

      <CTABand placement="sensors" />
    </>
  );
}
