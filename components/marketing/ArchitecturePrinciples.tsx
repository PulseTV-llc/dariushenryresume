import Icon from '@/components/site/Icon';
import { PLATFORM_PILLARS } from '@/lib/vexaos';

/**
 * The six architecture principles — one identity, one organization model, one
 * data layer, one device registry, governed access, open at the edges.
 * `detailed` adds each pillar's supporting points (used on /platform).
 */
export default function ArchitecturePrinciples({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PLATFORM_PILLARS.map((pillar, i) => (
        <li key={pillar.title} className="surface rounded-2xl p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 items-center justify-center">
              <Icon name={pillar.icon} className="w-[18px] h-[18px] text-sky-300" />
            </span>
            <span className="mono-label text-[10px] text-gray-600">P{i + 1}</span>
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">{pillar.title}</h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">{pillar.summary}</p>
          {detailed && (
            <ul className="mt-5 pt-5 border-t border-white/10 space-y-2">
              {pillar.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
