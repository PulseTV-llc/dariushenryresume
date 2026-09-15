import { ArrowRight, Linkedin } from 'lucide-react';
import { Eyebrow, SecondaryButton } from '@/components/site/Section';
import { FOUNDER, FOUNDER_STACK, FOUNDER_STATS } from '@/lib/founder';

/** Founder credibility block — reused on the homepage and /about. */
export default function FounderSection({ showStats = true }: { showStats?: boolean }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Eyebrow>Founder</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white tracking-tight">{FOUNDER.name}</h2>
          <p className="mt-1.5 text-base text-sky-300">
            {FOUNDER.role}, {FOUNDER.company}
          </p>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed text-balance">{FOUNDER.headline}</p>
          <p className="mt-4 text-[15px] text-gray-400 leading-relaxed">{FOUNDER.bio[1]}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <SecondaryButton href="/about/founder" className="w-full sm:w-auto">
              Background &amp; track record
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
            <a
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4 text-sky-300" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="mono-label text-gray-500">Builds directly with</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {FOUNDER_STACK.map((t) => (
              <li key={t} className="rounded-lg border border-white/10 bg-[#060a13] px-3 py-1.5 text-[13px] text-gray-300">
                {t}
              </li>
            ))}
          </ul>
          {showStats && (
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {FOUNDER_STATS.map((s) => (
                <div key={s.label} className="bg-[#04070e] px-3 py-5 sm:px-4 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-bold text-white tracking-tight">{s.value}</dd>
                  <dd className="mt-1 text-[11px] sm:text-xs text-gray-500 leading-snug">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
