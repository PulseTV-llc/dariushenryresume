import Link from 'next/link';
import { Fingerprint, Building2, Database, Cpu } from 'lucide-react';
import Icon from './Icon';
import { PRODUCTS, DOMAIN_META, type ProductDomain } from '@/lib/vexaos';

const PLATFORM_CHIPS = [
  { icon: Fingerprint, label: 'Identity' },
  { icon: Building2, label: 'Organization' },
  { icon: Database, label: 'Data' },
  { icon: Cpu, label: 'Devices' },
];

const COLUMNS: { domain: ProductDomain; ring: string; dot: string }[] = [
  { domain: 'Workforce', ring: 'hover:border-sky-400/40', dot: 'bg-sky-400' },
  { domain: 'Commerce', ring: 'hover:border-fuchsia-400/40', dot: 'bg-fuchsia-400' },
  { domain: 'Operations', ring: 'hover:border-emerald-400/40', dot: 'bg-emerald-400' },
];

/**
 * The VexaOS ecosystem: the platform layer on top, the six products grouped
 * into their three domains beneath it. Built from flex/grid rather than a fixed
 * SVG so it reflows cleanly from phone to desktop.
 */
export default function EcosystemDiagram() {
  return (
    <div className="relative">
      {/* ---- Platform layer ---- */}
      <div className="relative rounded-2xl border border-sky-400/25 bg-gradient-to-br from-sky-500/[0.12] via-blue-600/[0.06] to-transparent p-6 sm:p-7">
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'radial-gradient(70% 120% at 50% 0%, rgba(56,189,248,0.12), rgba(0,0,0,0))',
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/90">
              The platform
            </p>
            <p className="mt-1.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
              VexaOS
            </p>
            <p className="mt-1 text-sm text-gray-400 max-w-md">
              One identity, one organization model, one data layer, one device registry —
              shared by every product above it.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end sm:max-w-[15rem]">
            {PLATFORM_CHIPS.map(({ icon: I, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-medium text-gray-300"
              >
                <I className="w-3.5 h-3.5 text-sky-300" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Connector ---- */}
      <div className="relative h-10 sm:h-12" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 40">
          <defs>
            <linearGradient id="vx-eco-line" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path
            d="M150 0 V14 M50 40 V26 H250 V40 M150 14 V26"
            fill="none"
            stroke="url(#vx-eco-line)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ---- Product domains ---- */}
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map(({ domain, ring, dot }) => {
          const meta = DOMAIN_META[domain];
          const products = PRODUCTS.filter((p) => p.domain === domain);
          return (
            <div
              key={domain}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  {meta.label}
                </p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-0 md:min-h-[2.5rem]">
                {meta.blurb}
              </p>

              <div className="space-y-2.5">
                {products.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className={`group flex items-start gap-3 p-3.5 rounded-xl bg-[#070b14] border border-white/10 transition-colors ${ring}`}
                  >
                    <span
                      className={`inline-flex w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br ${p.accent} items-center justify-center`}
                    >
                      <Icon name={p.icon} className="w-[18px] h-[18px] text-white" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white group-hover:text-sky-200 transition-colors">
                        {p.name}
                      </span>
                      <span className="block text-xs text-gray-500 leading-relaxed mt-0.5">
                        {p.role}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
