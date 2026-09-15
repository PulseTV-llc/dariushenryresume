import Icon from '@/components/site/Icon';
import type { BuildGroup } from '@/lib/marketing/capabilities';

/** Grouped grid of what VexaOS builds — six groups, each with chip-level items. */
export default function CapabilityGrid({ groups }: { groups: BuildGroup[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, i) => (
        <li key={g.key} className="group relative bg-[#050912] p-6 sm:p-7 transition-colors hover:bg-[#070d19]">
          <div className="flex items-start justify-between">
            <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/10 border border-white/10 items-center justify-center">
              <Icon name={g.icon} className="w-5 h-5 text-sky-300" />
            </span>
            <span className="mono-label text-gray-600">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">{g.title}</h3>
          <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{g.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[13px] text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
