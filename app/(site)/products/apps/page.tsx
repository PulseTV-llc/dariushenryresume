import Image from 'next/image';
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
  title: 'VexaOS Apps for Web, iOS and Android',
  description:
    'The VexaOS apps for web, iOS and Android: live dashboards, alerts, analytics with CSV export, multiple sites, and team roles, on one account.',
  path: '/products/apps',
});

const SCREENS = [
  { title: 'Dashboard', body: 'Sensors online, averages, active alerts, gateway status and the latest insights at a glance.' },
  { title: 'Sensors', body: 'Search, filter and sort every sensor. Open one for its history, door timeline and profile.' },
  { title: 'Alerts', body: 'Alert history, acknowledge and resolve, and alert rules for each sensor.' },
  { title: 'Insights', body: 'Findings filtered by status, severity, kind and sensor, with the daily digest.' },
  { title: 'Analytics', body: 'Compare sensors, see daily minimum, average and maximum, review door activity, and export CSV.' },
  { title: 'Locations', body: 'Sites, locations within a site and equipment, with each sensor placed where it lives.' },
  { title: 'Devices', body: 'Gateway health, plus a guided flow for adding a sensor.' },
  { title: 'Settings', body: 'Profile, organization, team invitations, units and notification preferences.' },
];

export default function AppsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Apps"
        title={<>Your sites, <span className="gradient-text">on every screen.</span></>}
        subtitle="One account on the web and on iOS and Android. See what is happening now, look back over a month, and deal with an alert wherever you are."
      >
        <PrimaryButton href="/contact">Book a demo</PrimaryButton>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <Shot {...SHOTS.dashboardSummary} priority sizes="(min-width: 1152px) 1120px, 100vw" />
      </Section>

      <Section className="bg-white/60">
        <SectionHeading eyebrow="Web dashboard" title="Everything in one place." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCREENS.map((s) => (
            <FeatureCard key={s.title} title={s.title} body={s.body} />
          ))}
        </div>
      </Section>

      <Section>
        <Split
          eyebrow="iOS and Android"
          title="The same data in your pocket."
          body="The mobile app follows the web dashboard: live sensors, sensor details with history, analytics, insights and settings. It works in portrait and landscape, on phones and tablets."
          visual={
            <figure className="mx-auto max-w-sm">
              <div className="glass overflow-hidden rounded-[2.25rem] p-2">
                <Image
                  src={SHOTS.mobileDashboard.src}
                  width={SHOTS.mobileDashboard.width}
                  height={SHOTS.mobileDashboard.height}
                  alt={SHOTS.mobileDashboard.alt}
                  sizes="(min-width: 640px) 384px, 100vw"
                  className="h-auto w-full rounded-[1.75rem]"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs text-slate-500">{SHOTS.mobileDashboard.caption}</figcaption>
            </figure>
          }
        >
          <CheckList
            items={[
              'Live readings and door state for every sensor.',
              'Rename sensors and set their location and equipment from the app.',
              'Choose °C or °F; the data stays the same.',
              'Sign in with the same account as the web dashboard.',
            ]}
          />
        </Split>
      </Section>

      <Section className="bg-white/60">
        <Split
          flip
          eyebrow="Teams and sites"
          title="The right people see the right sites."
          body="Accounts are invitation-only. Each person is added to an organization, or to a single site within it, with a role that decides what they can do."
          visual={<Shot {...SHOTS.dashboardPanels} sizes="(min-width: 1024px) 45vw, 100vw" />}
        >
          <CheckList
            items={[
              <><strong>Owner and admin:</strong> manage the organization, team and sites.</>,
              <><strong>Installer:</strong> add sensors, set rules and resolve findings.</>,
              <><strong>Viewer:</strong> see dashboards and acknowledge alerts.</>,
              'Switch between locations, or view them all together.',
            ]}
          />
        </Split>
        <div className="mt-10">
          <HonestNote>
            The iOS and Android app is not listed in the public app stores yet; we set it up with you during
            onboarding. Alerts appear live inside the apps today. Push and email notifications are in development.
          </HonestNote>
        </div>
      </Section>

      <CTABand placement="apps" />
    </>
  );
}
