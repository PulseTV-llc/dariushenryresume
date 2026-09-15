import Icon from '@/components/site/Icon';
import { Eyebrow } from '@/components/site/Section';
import { PLATFORM_LAYERS } from '@/lib/marketing/platform';

/**
 * "We're not starting from zero" — the reusable layers every build inherits,
 * with a two-tier stack showing what is custom and what is already proven.
 */
export default function PlatformLayers({
  title = 'We’re not starting from zero.',
  headingLevel = 'h2',
}: {
  title?: string;
  headingLevel?: 'h1' | 'h2';
}) {
  const Heading = headingLevel;
  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-end">
        <div className="lg:col-span-6">
          <Eyebrow>The VexaOS platform advantage</Eyebrow>
          <Heading className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
            {title}
          </Heading>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            Every VexaOS implementation is powered by reusable enterprise architecture that lets us
            build customized systems faster and more reliably than beginning every project from
            scratch.
          </p>
          <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
            Your budget goes into what makes your operation different — not into rebuilding
            authentication, permissions, and device management on every project.
          </p>
        </div>

        {/* Two-tier stack */}
        <div className="lg:col-span-6" aria-label="Proven architecture. Custom implementation.">
          <div className="rounded-2xl border border-sky-400/[0.35] bg-gradient-to-br from-sky-500/[0.12] to-blue-600/[0.04] px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">Custom implementation</p>
              <span className="mono-label text-[10px] text-sky-300">Built for you</span>
            </div>
            <p className="mt-1.5 text-sm text-gray-400">Your workflows · your applications · your rules · your brand · your integrations</p>
          </div>
          <div aria-hidden="true" className="flex justify-around px-10">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-5 w-px bg-gradient-to-b from-sky-400/60 to-sky-400/10" />
            ))}
          </div>
          <div className="rounded-2xl border border-white/[0.12] bg-[#060a13] px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">Proven architecture</p>
              <span className="mono-label text-[10px] text-emerald-300">Already built</span>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {PLATFORM_LAYERS.map((l) => (
                <span key={l.key} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 mono-label text-[10px] tracking-[0.1em] text-gray-400 text-center">
                  {l.key}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORM_LAYERS.map((layer, i) => (
          <li key={layer.key} className="bg-[#050912] p-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 items-center justify-center">
                <Icon name={layer.icon} className="w-[18px] h-[18px] text-sky-300" />
              </span>
              <span className="mono-label text-[10px] text-gray-600">L{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white uppercase tracking-[0.08em]">{layer.title}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">{layer.detail}</p>
            <ul className="mt-4 space-y-1.5">
              {layer.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
