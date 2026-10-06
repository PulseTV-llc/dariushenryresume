import Link from 'next/link';
import { pageMeta } from '../../../metadata';
import {
  CTABand,
  CheckList,
  HonestNote,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
  Shot,
  Split,
  StatusBadge,
} from '@/components/site/ui';
import { SHOTS } from '@/lib/shots';

export const metadata = pageMeta({
  title: 'Restaurant OS: VexaOS Hospitality',
  description:
    'Restaurant OS is the VexaOS Hospitality solution for running a restaurant: floor, kitchen display and orders in one control center. Approaching pilot.',
  path: '/solutions/restaurant-os',
});

export default function RestaurantOSPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions · VexaOS Hospitality"
        badge={<StatusBadge status="development" />}
        title={<>Restaurant OS: <span className="gradient-text">one system for the whole restaurant.</span></>}
        subtitle="Restaurant OS is a separate VexaOS solution for hospitality. It connects the floor, the kitchen and orders in one control center. It is approaching pilot and is not generally available."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact" className="w-full sm:w-auto">Ask about the pilot</PrimaryButton>
          <SecondaryButton href="/solutions/food-service-cold-chain" className="w-full sm:w-auto">
            Cold chain monitoring
          </SecondaryButton>
        </div>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <Split
          eyebrow="Front of house"
          title="The floor, live."
          body="Every table and its status in one view, updating as hosts seat parties and tables are cleared."
          visual={<Shot {...SHOTS.restaurantFloor} />}
        >
          <CheckList
            items={[
              'Tables by section, with seats and current status.',
              'Available, seated and needs-bussing counts at a glance.',
              'Managers can add tables and override status.',
            ]}
          />
        </Split>
      </Section>

      <Section className="bg-white/60">
        <Split
          flip
          eyebrow="Kitchen"
          title="Tickets from the line to the pass."
          body="The kitchen display mirrors live tickets by stage, so the control center shows what the kitchen sees."
          visual={<Shot {...SHOTS.restaurantKitchen} />}
        >
          <CheckList
            items={[
              'On the line, ready to run and served.',
              'Dine-in, catering and delivery tickets together.',
              'Mark tickets ready and served from the control center.',
            ]}
          />
        </Split>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-5">
          <HonestNote title="How this fits with the monitoring platform">
            Restaurant OS and the VexaOS monitoring platform are separate products today. A restaurant can use VexaOS
            sensors and gateways to watch its coolers and doors without Restaurant OS, and the other way round. The
            screenshots on this page show Restaurant OS running on demonstration data, not a customer&apos;s
            restaurant.
          </HonestNote>
          <p className="text-center text-sm text-slate-600">
            Looking for cooler, freezer and door monitoring?{' '}
            <Link href="/solutions/food-service-cold-chain" className="font-semibold text-blue-700 hover:text-blue-900">
              See food service and cold chain
            </Link>
            .
          </p>
        </div>
      </Section>

      <CTABand
        placement="restaurant-os"
        title="Interested in the Restaurant OS pilot?"
        body="Tell us about your restaurant and we will walk you through where Restaurant OS stands today."
      />
    </>
  );
}
