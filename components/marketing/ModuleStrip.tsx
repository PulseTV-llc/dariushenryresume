import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Icon from '@/components/site/Icon';
import { PRODUCTS } from '@/lib/vexaos';

/**
 * "Proven technology underneath every VexaOS build" — the internal modules,
 * presented as building blocks rather than products to buy.
 */
export default function ModuleStrip({ linkToModules = true }: { linkToModules?: boolean }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#050912] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="mono-label text-sky-300/90">Proven technology underneath every VexaOS build</p>
          <p className="mt-2 text-sm text-gray-400 max-w-2xl leading-relaxed">
            Working modules we assemble, extend, and customize — so your system starts from software
            that already runs, not a blank repository.
          </p>
        </div>
        {linkToModules && (
          <Link
            href="/platform#modules"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors shrink-0"
          >
            Explore the modules
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      <ul className="mt-6 grid gap-2.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <li key={p.slug} className="min-w-0">
            <Link
              href={`/platform/modules/${p.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 hover:border-white/20 transition-colors"
            >
              <span className={`inline-flex w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br ${p.accent} items-center justify-center`}>
                <Icon name={p.icon} className="w-4 h-4 text-white" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white group-hover:text-sky-200 transition-colors">{p.name}</span>
                <span className="block text-xs text-gray-500 truncate">{p.role}</span>
              </span>
            </Link>
          </li>
        ))}
        <li className="flex items-center rounded-xl border border-dashed border-white/15 px-3.5 py-3">
          <span className="text-xs text-gray-500 leading-relaxed">
            + identity, organizations, roles, device registry, notifications, and integrations
          </span>
        </li>
      </ul>
    </div>
  );
}
