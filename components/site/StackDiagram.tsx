import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, productHref, type ProductSlug } from '@/lib/site';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { Content } from '@/lib/i18n/content';
import { IconTile, StatusBadge } from './ui';

const STAGES: { products: ProductSlug[]; points: 'sensors' | 'gateway' | 'cloud' | 'apps' }[] = [
  { products: ['sensors'], points: 'sensors' },
  { products: ['edge-gateway', 'mobile-gateway'], points: 'gateway' },
  { products: ['cloud-ai-insights'], points: 'cloud' },
  { products: ['apps'], points: 'apps' },
];

/** The VexaOs stack, left to right: sensors, gateway, cloud, apps. */
export default function StackDiagram({ locale, c }: { locale: Locale; c: Content }) {
  return (
    <ol className="grid gap-4 lg:grid-cols-4 lg:gap-3">
      {STAGES.map((stage, i) => (
        <li key={stage.points} className="relative flex">
          <div className="glass flex w-full flex-col rounded-3xl p-5">
            <p className="mono-label mb-4 text-blue-700">{c.common.labels.step} {i + 1}</p>
            <div className="space-y-3">
              {stage.products.map((slug) => {
                const p = PRODUCTS.find((x) => x.slug === slug)!;
                const t = c.catalog.products[slug];
                return (
                  <Link key={slug} href={localePath(locale, productHref(slug))} className="group flex items-start gap-3 rounded-xl">
                    <IconTile name={p.icon} />
                    <span>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold leading-tight text-slate-900 group-hover:text-blue-700">
                        {t.short}
                        <StatusBadge status={p.status} labels={c.common.status} />
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">{t.role}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <ul className="mt-5 space-y-1.5 border-t border-slate-200/70 pt-4 text-sm text-slate-600">
              {c.common.stack[stage.points].map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          {i < STAGES.length - 1 && (
            <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-md lg:flex" aria-hidden="true">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
