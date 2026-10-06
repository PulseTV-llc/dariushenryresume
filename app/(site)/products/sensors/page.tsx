import { pageMeta } from '../../../metadata';
import {
  CTABand,
  CheckList,
  HonestNote,
  PageHero,
  PrimaryButton,
  Section,
  SectionHeading,
  Shot,
  Split,
} from '@/components/site/ui';
import SensorCatalog, { ConnectivitySection, SensorRequestCTA } from '@/components/site/SensorCatalog';
import { SHOTS } from '@/lib/shots';

export const metadata = pageMeta({
  title: 'Sensor Catalog: Nine Families, Wireless and Wired',
  description:
    'The VexaOs sensor catalog: environment, cold chain, access and occupancy, water and leak, machine health, industrial process, energy, assets and safety, over Bluetooth LE or RS-485 / Modbus. Each measurement is labelled available now or via integration.',
  path: '/products/sensors',
});

export default function SensorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Sensors"
        title={<>A sensor for <span className="gradient-text">whatever you need to watch.</span></>}
        subtitle="Nine sensor families, wireless and wired, on one platform. Every measurement is labelled, so you can see what works today and what we add through an adapter."
      >
        <PrimaryButton href="/contact">Ask about sensors</PrimaryButton>
      </PageHero>

      <Section id="catalog" className="pt-4 sm:pt-6">
        <SectionHeading
          eyebrow="Sensor catalog"
          title="Nine families. Pick your industry."
          subtitle="Filter by industry, then open a family for the detail."
        />
        <SensorCatalog />
        <div className="mt-12">
          <SensorRequestCTA />
        </div>
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

      <Section className="bg-white/60">
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
            Sensors that are available now connect over Bluetooth Low Energy, so they need to be within radio range of
            a gateway; we check signal at each location during setup. &quot;Via integration&quot; means the adapter
            does not exist yet, and that includes everything on RS-485 / Modbus: we build it when a customer needs
            it, and we do not publish specifications for sensors we have not integrated.
          </HonestNote>
        </div>
      </Section>

      <CTABand placement="sensors" />
    </>
  );
}
