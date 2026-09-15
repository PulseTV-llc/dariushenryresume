import { PROCESS_STEPS } from '@/lib/marketing/platform';

/**
 * Seven-step engagement process. A horizontal rail on large screens (4 + 3),
 * a vertical timeline on phones.
 */
export default function ProcessTimeline() {
  return (
    <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {PROCESS_STEPS.map((s, i) => {
        const isBlueprint = s.title === 'Business Blueprint';
        return (
          <li
            key={s.step}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              isBlueprint
                ? 'border-sky-400/30 bg-gradient-to-br from-sky-500/[0.09] to-transparent'
                : 'border-white/10 bg-white/[0.02]'
            } ${i === PROCESS_STEPS.length - 1 ? 'lg:col-span-2' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-sky-300">{s.step}</span>
              {isBlueprint && <span className="mono-label text-[10px] text-sky-300">Start here</span>}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed flex-1">{s.detail}</p>
            <p className="mt-5 pt-4 border-t border-white/10 text-xs text-gray-500">
              <span className="mono-label text-[10px] text-gray-600">Outcome</span>
              <span className="ml-2 text-gray-300">{s.output}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}
