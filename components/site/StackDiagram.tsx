import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, productHref, type Product } from '@/lib/site';
import { IconTile, StatusBadge } from './ui';

const bySlug = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p])) as Record<string, Product>;

const STAGES: { step: string; products: Product[]; points: string[] }[] = [
  {
    step: '1',
    products: [bySlug['sensors']],
    points: ['Temperature and humidity', 'Door open and closed', 'More through adapters'],
  },
  {
    step: '2',
    products: [bySlug['edge-gateway'], bySlug['mobile-gateway']],
    points: ['Keeps readings through outages', 'Alarm rules checked on site', 'Recovers by itself'],
  },
  {
    step: '3',
    products: [bySlug['cloud-ai-insights']],
    points: ['Drift and forecasts', 'Plain-English findings', 'History and alert rules'],
  },
  {
    step: '4',
    products: [bySlug['apps']],
    points: ['Web, iOS and Android', 'Alerts and analytics', 'Sites, teams and roles'],
  },
];

/** The VexaOS stack, left to right: sensors, gateway, cloud, apps. */
export default function StackDiagram() {
  return (
    <ol className="grid gap-4 lg:grid-cols-4 lg:gap-3">
      {STAGES.map((stage, i) => (
        <li key={stage.step} className="relative flex">
          <div className="glass flex w-full flex-col rounded-3xl p-5">
            <p className="mono-label mb-4 text-blue-700">Step {stage.step}</p>
            <div className="space-y-3">
              {stage.products.map((p) => (
                <Link key={p.slug} href={productHref(p.slug)} className="group flex items-start gap-3 rounded-xl">
                  <IconTile name={p.icon} />
                  <span>
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold leading-tight text-slate-900 group-hover:text-blue-700">
                      {p.short}
                      <StatusBadge status={p.status} />
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">{p.role}</span>
                  </span>
                </Link>
              ))}
            </div>
            <ul className="mt-5 space-y-1.5 border-t border-slate-200/70 pt-4 text-sm text-slate-600">
              {stage.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          {i < STAGES.length - 1 && (
            <span
              className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-md lg:flex"
              aria-hidden="true"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
