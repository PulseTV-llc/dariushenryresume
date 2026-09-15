import Icon from '@/components/site/Icon';
import VexaMark from '@/components/site/VexaMark';
import { SYSTEM_NODES } from '@/lib/marketing/platform';

/**
 * "One connected operating system" — business entities orbiting a single
 * VexaOS core. A radial layout with live connection lines from `lg` up; a
 * core card plus a node grid on phones and tablets.
 */
export default function ArchitectureDiagram({
  coreLabel = 'Your operating system',
  nodes = SYSTEM_NODES,
}: {
  coreLabel?: string;
  nodes?: { label: string; icon: string; detail: string }[];
}) {
  const positioned = nodes.map((n, i) => {
    const angle = (-90 + (360 / nodes.length) * i) * (Math.PI / 180);
    return { ...n, x: 50 + 41 * Math.cos(angle), y: 50 + 40 * Math.sin(angle) };
  });

  return (
    <div className="relative">
      {/* ---------- lg+: radial ---------- */}
      <div className="relative hidden lg:block aspect-[16/10] max-w-5xl mx-auto">
        <div aria-hidden="true" className="absolute inset-0 tech-grid opacity-50" />

        <svg aria-hidden="true" className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="vx-arch-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="30" ry="30" fill="url(#vx-arch-glow)" />
          <ellipse cx="50" cy="50" rx="41" ry="40" fill="none" stroke="rgba(148,197,255,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <ellipse cx="50" cy="50" rx="24" ry="23" fill="none" stroke="rgba(148,197,255,0.08)" strokeWidth="1" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
          {positioned.map((n) => (
            <line
              key={n.label}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke="rgba(56,189,248,0.55)"
              strokeWidth="1"
              className="vx-flow"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="rounded-2xl border border-sky-400/40 bg-[#07101f]/95 px-6 py-5 text-center shadow-[0_0_60px_-10px_rgba(56,189,248,0.45)]">
            <div className="flex justify-center">
              <VexaMark size={44} />
            </div>
            <p className="mt-2 text-lg font-bold text-white tracking-tight">VexaOS</p>
            <p className="mono-label text-[10px] text-sky-300/90">{coreLabel}</p>
          </div>
        </div>

        {/* Nodes */}
        {positioned.map((n) => (
          <div
            key={n.label}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.12] bg-[#080d18]/95 pl-2.5 pr-3.5 py-2 shadow-lg shadow-black/40 whitespace-nowrap">
              <span className="inline-flex w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 items-center justify-center">
                <Icon name={n.icon} className="w-4 h-4 text-sky-300" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white leading-tight">{n.label}</span>
                <span className="block text-[11px] text-gray-500 leading-tight">{n.detail}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- phones & tablets: stacked ---------- */}
      <div className="lg:hidden max-w-2xl mx-auto">
        <div className="rounded-2xl border border-sky-400/40 bg-[#07101f] px-5 py-5 text-center shadow-[0_0_50px_-12px_rgba(56,189,248,0.45)]">
          <div className="flex justify-center">
            <VexaMark size={40} />
          </div>
          <p className="mt-2 text-lg font-bold text-white">VexaOS</p>
          <p className="mono-label text-[10px] text-sky-300/90">{coreLabel}</p>
        </div>
        <div aria-hidden="true" className="mx-auto h-6 w-px bg-gradient-to-b from-sky-400/60 to-sky-400/10" />
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {nodes.map((n) => (
            <li key={n.label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <Icon name={n.icon} className="w-4 h-4 shrink-0 text-sky-300" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white leading-tight">{n.label}</span>
                <span className="block text-[11px] text-gray-500 leading-tight truncate">{n.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
