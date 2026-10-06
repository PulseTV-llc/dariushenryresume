import { ArrowRight } from 'lucide-react';
import { pageMeta } from '../../metadata';
import { CTABand, GlassCard, IconTile, PageHero, Section, StatusBadge } from '@/components/site/ui';
import TrackedLink from '@/components/site/TrackedLink';
import { PRODUCTS, productHref } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Products',
  description:
    'The VexaOs product line: wireless sensors, the VexaOs Edge Gateway, the Mobile Gateway (coming soon), VexaOs Cloud with AI Insights, and apps for web, iOS and Android.',
  path: '/products',
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>Everything between the reading <span className="gradient-text">and the decision.</span></>}
        subtitle="Five products that are designed together. Start with one site and a few sensors, and add more as you need them."
      />
      <Section className="pt-4 sm:pt-6">
        <div className="grid gap-5 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <TrackedLink
              key={p.slug}
              href={productHref(p.slug)}
              event="product_explore_click"
              eventProps={{ product: p.slug }}
              className={`group block rounded-3xl ${i === PRODUCTS.length - 1 && PRODUCTS.length % 2 ? 'md:col-span-2' : ''}`}
            >
              <GlassCard className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
                <div className="flex items-center gap-3">
                  <IconTile name={p.icon} />
                  <p className="mono-label text-blue-700">{p.role}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-slate-900">{p.name}</h2>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{p.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </GlassCard>
            </TrackedLink>
          ))}
        </div>
      </Section>
      <CTABand placement="products" />
    </>
  );
}
