import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
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
  Shot,
} from '@/components/site/ui';
import StackDiagram from '@/components/site/StackDiagram';
import { INDUSTRIES, INDUSTRIES_BY_SLUG, RESTAURANT_OS } from '@/lib/site';
import { SHOTS } from '@/lib/shots';

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ind = INDUSTRIES_BY_SLUG[params.slug];
  if (!ind) return {};
  return pageMeta({
    title: `${ind.name} Monitoring`,
    description: ind.summary,
    path: `/solutions/${ind.slug}`,
  });
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES_BY_SLUG[params.slug];
  if (!ind) notFound();

  return (
    <>
      <PageHero eyebrow={`Solutions · ${ind.short}`} title={ind.headline} subtitle={ind.summary}>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact" className="w-full sm:w-auto">
            Book a demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </PrimaryButton>
          <SecondaryButton href="/platform" className="w-full sm:w-auto">How the platform works</SecondaryButton>
        </div>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <SectionHeading eyebrow="What to monitor" title="Where it earns its keep." />
        <div className="grid gap-5 md:grid-cols-3">
          {ind.monitor.map((m) => (
            <FeatureCard key={m.title} title={m.title} body={m.body} status={m.status} />
          ))}
        </div>
      </Section>

      <Section className="bg-white/60">
        <SectionHeading eyebrow="How VexaOS helps" title="The platform, applied." />
        <div className="grid gap-5 md:grid-cols-3">
          {ind.how.map((h) => (
            <FeatureCard key={h.title} title={h.title} body={h.body} />
          ))}
        </div>
        <Shot {...SHOTS.doorActivity} className="mx-auto mt-12 max-w-4xl" sizes="(min-width: 1024px) 896px, 100vw" />
      </Section>

      <Section>
        <SectionHeading eyebrow="The same stack everywhere" title="What you would be running." />
        <StackDiagram />
        <div className="mx-auto mt-10 max-w-3xl space-y-5">
          <HonestNote>{ind.note}</HonestNote>
          {ind.slug === 'food-service-cold-chain' && (
            <p className="text-center text-sm text-slate-600">
              Running a restaurant? See{' '}
              <Link href={RESTAURANT_OS.href} className="font-semibold text-blue-700 hover:text-blue-900">
                Restaurant OS
              </Link>
              , our hospitality solution.
            </p>
          )}
        </div>
      </Section>

      <CTABand placement={`solution_${ind.slug}`} />
    </>
  );
}
