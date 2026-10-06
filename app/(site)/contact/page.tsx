import { Mail, MapPin } from 'lucide-react';
import { pageMeta } from '../../metadata';
import { CheckList, GlassCard, PageHero, Section } from '@/components/site/ui';
import DemoForm from '@/components/site/DemoForm';
import { ADDRESS, CONTACT_EMAIL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Book a Demo',
  description:
    'Book a demo of the VexaOS monitoring platform, or get in touch. Tell us what you want to monitor and we will show you how it works.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title={<>Tell us what you need <span className="gradient-text">to keep an eye on.</span></>}
        subtitle="A short note is enough. We will show you the platform working, and tell you plainly what it can and cannot do for you today."
      />
      <Section className="pt-4 sm:pt-6">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <GlassCard className="!p-6 sm:!p-9">
            <DemoForm />
          </GlassCard>
          <div className="space-y-5">
            <GlassCard>
              <h2 className="text-base font-semibold text-slate-900">What happens next</h2>
              <div className="mt-4">
                <CheckList
                  items={[
                    'We reply by email to arrange a time.',
                    'We walk you through the dashboard, alerts and insights.',
                    'We talk through your sites and which sensors fit.',
                  ]}
                />
              </div>
            </GlassCard>
            <GlassCard>
              <h2 className="text-base font-semibold text-slate-900">Prefer email?</h2>
              <address className="mt-4 space-y-3 not-italic">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-700">
                  <Mail className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
                <a href={ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-600 hover:text-blue-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
                  </span>
                </a>
              </address>
            </GlassCard>
          </div>
        </div>
      </Section>
    </>
  );
}
