import Icon from '@/components/site/Icon';
import { Eyebrow } from '@/components/site/Section';
import { REGIONS, GLOBAL_CAPABILITIES } from '@/lib/marketing/global';

/** Maps a UTC offset (−8 … +11) onto a 0–100% position along the band. */
const pos = (utc: number) => ((utc + 8) / 19) * 100;

/**
 * "Built in America. Delivered worldwide." — a time-zone band rather than a
 * map of flags. Regions are markets served, never implied client locations.
 */
export default function GlobalDelivery() {
  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow>Global delivery</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
            Built in America. Delivered worldwide.
          </h2>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            VexaOS works remotely with organizations across markets and time zones. Systems can be
            designed, developed, deployed, and supported internationally.
          </p>
        </div>
        <p className="lg:col-span-5 text-sm text-gray-500 leading-relaxed">
          Headquartered in the United States. The regions below are markets we deliver to — shown
          to illustrate reach, not as a list of client locations.
        </p>
      </div>

      {/* Time-zone band */}
      <div className="mt-12 rounded-3xl border border-white/10 bg-[#050912] p-5 sm:p-8 overflow-hidden">
        {/* Desktop band */}
        <div className="hidden lg:block">
          <div className="relative h-44">
            <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-sky-400/10 via-sky-400/50 to-sky-400/10" />
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute top-1/2 -translate-y-1/2 h-2 w-px bg-white/15"
                style={{ left: `${(i / 19) * 100}%` }}
              />
            ))}
            {REGIONS.map((r, i) => {
              const above = i % 2 === 0;
              return (
                <div
                  key={r.name}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${pos(r.utc)}%`, top: above ? '0' : '50%', height: '50%' }}
                >
                  {!above && <span aria-hidden="true" className="h-5 w-px bg-sky-400/40" />}
                  <div className={`text-center ${above ? 'order-1' : 'order-2'}`}>
                    <p className="text-sm font-semibold text-white whitespace-nowrap">{r.name}</p>
                    <p className="mono-label text-[9px] tracking-[0.1em] text-gray-500 whitespace-nowrap">{r.utcLabel}</p>
                  </div>
                  {above && <span aria-hidden="true" className="order-2 mt-auto h-5 w-px bg-sky-400/40" />}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border border-sky-300 ${
                      r.name === 'United States' ? 'bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]' : 'bg-[#050912]'
                    } ${above ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="relative mt-2 h-4 mono-label text-[10px] text-gray-600" aria-hidden="true">
            <span className="absolute left-0">UTC−8</span>
            <span className="absolute -translate-x-1/2" style={{ left: `${pos(0)}%` }}>UTC+0</span>
            <span className="absolute right-0">UTC+11</span>
          </div>
        </div>

        {/* Phone list */}
        <ul className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-2">
          {REGIONS.map((r) => (
            <li key={r.name} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <p className="text-sm font-medium text-white leading-tight">{r.name}</p>
              <p className="mt-0.5 mono-label text-[9px] tracking-[0.08em] text-gray-500">{r.utcLabel}</p>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-6 grid gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GLOBAL_CAPABILITIES.map((c) => (
          <li key={c.title} className="flex items-center sm:items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 sm:p-5">
            <span className="inline-flex w-9 h-9 shrink-0 rounded-lg bg-sky-500/10 border border-sky-400/20 items-center justify-center">
              <Icon name={c.icon} className="w-4 h-4 text-sky-300" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-white">{c.title}</p>
              <p className="mt-1 hidden sm:block text-sm text-gray-500 leading-relaxed">{c.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
