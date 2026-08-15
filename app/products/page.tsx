import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import Icon from '@/components/site/Icon';
import EcosystemDiagram from '@/components/site/EcosystemDiagram';
import {
  Section,
  SectionHeading,
  PageHero,
  CTABand,
  PoweredByBadge,
  PrimaryButton,
  SecondaryButton,
} from '@/components/site/Section';
import { PRODUCTS, VERTICALS_BY_SLUG, SITE_URL } from '@/lib/vexaos';

export const metadata: Metadata = {
  title: 'Products — ShyftGrid, Commerce Ops, Inventory Ops, VexaFront, TouchBoard',
  description:
    'The five VexaOS products: ShyftGrid for workforce, Commerce Ops for orders and payments, Inventory Ops for stock and cost, VexaFront for customer-facing kiosks, and TouchBoard for employee displays. Sold separately, built on one platform.',
  alternates: { canonical: `${SITE_URL}/products` },
};

export default function ProductsPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#04070e]">
        <PageHero
          eyebrow="Products"
          title={
            <>
              Five products, sold separately.{' '}
              <span className="gradient-text">One platform underneath.</span>
            </>
          }
          subtitle="Buy the one that solves your problem today. Add the others when you need them — there is no integration to build, because they were never separate systems."
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton href="/demo">
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/pricing">See pricing</SecondaryButton>
          </div>
        </PageHero>

        {/* Ecosystem */}
        <Section className="pt-8">
          <EcosystemDiagram />
        </Section>

        {/* Product detail cards */}
        <Section className="border-t border-white/10">
          <SectionHeading
            eyebrow="The lineup"
            title="What each product does."
            subtitle="Every product carries its own weight on its own. The advantage compounds when they run together."
          />

          <div className="space-y-4">
            {PRODUCTS.map((p) => (
              <div
                key={p.slug}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9"
              >
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${p.accent} items-center justify-center`}
                      >
                        <Icon name={p.icon} className="w-5 h-5 text-white" strokeWidth={2} />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{p.name}</h3>
                        <p className="text-[13px] text-gray-500">{p.role}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-[15px] text-gray-400 leading-relaxed">{p.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                      >
                        {p.name} overview
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <PoweredByBadge />
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-4">
                      Core capabilities
                    </p>
                    <ul className="space-y-2.5">
                      {p.capabilities.slice(0, 4).map((c) => (
                        <li
                          key={c.title}
                          className="flex items-start gap-2.5 text-sm text-gray-400"
                        >
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 mb-4">
                      Strong fit for
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.industries.slice(0, 5).map((slug) => {
                        const v = VERTICALS_BY_SLUG[slug];
                        if (!v) return null;
                        return (
                          <Link
                            key={slug}
                            href={`/industries/${slug}`}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                          >
                            {v.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <CTABand
          title="Not sure where to start?"
          subtitle="Tell us where the friction is and we will show you which product removes it first."
          primary={{ label: 'Book a demo', href: '/demo' }}
          secondary={{ label: 'See pricing', href: '/pricing' }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
