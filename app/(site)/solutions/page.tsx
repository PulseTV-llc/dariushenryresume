import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMeta } from '../../metadata';
import { CTABand, GlassCard, IconTile, PageHero, Section, SectionHeading } from '@/components/site/ui';
import TrackedLink from '@/components/site/TrackedLink';
import { INDUSTRIES, RESTAURANT_OS, industryHref } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Solutions by Industry',
  description:
    'How VexaOs is used across industries: food service and cold chain, warehouses and logistics, manufacturing, facilities and property, and healthcare and pharma storage.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>One platform. <span className="gradient-text">Your industry.</span></>}
        subtitle="VexaOs is not built for one kind of business. The same sensors, gateway, cloud and apps apply wherever temperature, humidity or a door matters."
      />
      <Section className="pt-4 sm:pt-6">
        <div className="grid gap-5 md:grid-cols-2">
          {INDUSTRIES.map((ind) => (
            <TrackedLink
              key={ind.slug}
              href={industryHref(ind.slug)}
              event="industry_explore_click"
              eventProps={{ industry: ind.slug }}
              className="group block rounded-3xl"
            >
              <GlassCard className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
                <IconTile name={ind.icon} className="mb-5" />
                <h2 className="text-xl font-semibold text-slate-900">{ind.name}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{ind.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                  Explore
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </GlassCard>
            </TrackedLink>
          ))}
          <Link href="/contact" className="group block rounded-3xl">
            <div className="flex h-full flex-col justify-center rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-7">
              <h2 className="text-xl font-semibold text-slate-900">Something else?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                If it has a temperature, a humidity or a door, the platform can probably watch it. Tell us what you
                have in mind.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                Talk to us
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </Section>

      <Section className="bg-white/60">
        <SectionHeading
          eyebrow="Also from VexaOs"
          title="Restaurant OS"
          subtitle={RESTAURANT_OS.summary}
        />
        <p className="text-center">
          <Link href={RESTAURANT_OS.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
            See Restaurant OS
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </Section>

      <CTABand placement="solutions" />
    </>
  );
}
