import { Mail, MapPin } from 'lucide-react';
import { pageMeta } from '../../metadata';
import { CTABand, FeatureCard, GlassCard, PageHero, Section, SectionHeading } from '@/components/site/ui';
import { ADDRESS, CONTACT_EMAIL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'About VexaOS',
  description:
    'VexaOS builds a vendor-neutral platform to monitor anything, anywhere: sensors, an offline-safe Edge Gateway, cloud AI Insights, and apps. Based in Pontiac, Michigan.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>We build the platform that <span className="gradient-text">watches what matters.</span></>}
        subtitle="VexaOS is a technology company based in Pontiac, Michigan. We make a vendor-neutral platform for monitoring equipment and spaces: sensors, gateways, cloud and apps, designed as one system."
      />

      <Section className="pt-4 sm:pt-6">
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-slate-700">
          <p>
            A lot of what a business depends on happens out of sight. A freezer warms up overnight. A door is left
            open. A room gets damp. Usually someone finds out afterwards, when the damage is done.
          </p>
          <p>
            VexaOS exists to close that gap. We put the hardest parts first: a gateway that keeps recording
            when the network fails, and a cloud that notices a slow drift as well as a crossed limit. Then we built
            the apps on top, so the right person sees it in time.
          </p>
          <p>
            The platform is not tied to one industry or one make of sensor. Food service, warehouses, manufacturing,
            facilities and healthcare storage all have the same underlying need, and the same platform serves each.
          </p>
        </div>
      </Section>

      <Section className="bg-white/60">
        <SectionHeading eyebrow="How we work" title="What you can expect from us." />
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            title="We say what is real"
            body="If something is in development or coming soon, we label it. You will not find invented customers, statistics or certifications on this site."
          />
          <FeatureCard
            title="Measured before AI"
            body="Findings come from your measurements and show their numbers. AI is used to explain, never to decide."
          />
          <FeatureCard
            title="Built for bad days"
            body="We design for the outage, the power cut and the flat battery, because those are the days monitoring is needed most."
          />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Where we are" title="A young company, building in the open." />
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <GlassCard>
            <h3 className="text-base font-semibold text-slate-900">Today</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The monitoring platform works end to end: temperature, humidity and door sensors, the Edge Gateway,
              VexaOS Cloud with AI Insights, and the web and mobile apps. We are booking demos now.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-base font-semibold text-slate-900">Next</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Vibration and machine-health sensing, push and email alert delivery, and the Mobile Gateway. Restaurant
              OS, our hospitality solution, is approaching pilot.
            </p>
          </GlassCard>
          <GlassCard className="md:col-span-2">
            <h3 className="text-base font-semibold text-slate-900">Find us</h3>
            <address className="mt-3 grid gap-3 not-italic sm:grid-cols-2">
              <a href={ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-600 hover:text-blue-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                <span>
                  VexaOS
                  <br />
                  {ADDRESS.street}
                  <br />
                  {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
                </span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-3 text-sm text-slate-600 hover:text-blue-700">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </address>
          </GlassCard>
        </div>
      </Section>

      <CTABand placement="about" />
    </>
  );
}
