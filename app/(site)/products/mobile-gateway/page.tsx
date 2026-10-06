import { pageMeta } from '../../../metadata';
import {
  CTABand,
  FeatureCard,
  HonestNote,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeading,
  StatusBadge,
} from '@/components/site/ui';

export const metadata = pageMeta({
  title: 'VexaOs Mobile Gateway (Coming Soon)',
  description:
    'The VexaOs Mobile Gateway is a planned gateway for vehicles, trailers and sites without fixed power or network. It is coming soon and is not available today.',
  path: '/products/mobile-gateway',
});

export default function MobileGatewayPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Mobile Gateway"
        badge={<StatusBadge status="soon" />}
        title={<>Monitoring for places <span className="gradient-text">that move.</span></>}
        subtitle="The VexaOs Mobile Gateway is planned for vehicles, trailers and temporary sites, where there is no fixed power or network. It is not available yet."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact" className="w-full sm:w-auto">Tell us your use case</PrimaryButton>
          <SecondaryButton href="/products/edge-gateway" className="w-full sm:w-auto">See the Edge Gateway</SecondaryButton>
        </div>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <HonestNote title="Coming soon">
          This page describes what we are planning, not a product you can order. Specifications, pricing and dates are
          not final, so none are listed here. If mobile monitoring matters to you, get in touch and we will keep you
          informed.
        </HonestNote>
      </Section>

      <Section className="bg-white/60">
        <SectionHeading
          eyebrow="The plan"
          title="The same platform, away from the wall socket."
          subtitle="The Mobile Gateway is intended to work with the same sensors, the same VexaOs Cloud and the same apps as the Edge Gateway."
        />
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard icon="mobile" title="Goods in transit" body="Intended for refrigerated vehicles and trailers, so a load is monitored between sites as well as at them." />
          <FeatureCard icon="warehouse" title="Temporary sites" body="Intended for events, pop-ups and short-term storage where installing fixed equipment is not practical." />
          <FeatureCard icon="gateway" title="Store and forward" body="Built on the Edge Gateway's offline queue, which already keeps readings when there is no connection." />
        </div>
      </Section>

      <CTABand
        placement="mobile-gateway"
        title="Need mobile monitoring?"
        body="Tell us what you move and where. Your use case helps shape what we build, and we will let you know when the Mobile Gateway is ready."
      />
    </>
  );
}
