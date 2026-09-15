import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import Icon from '@/components/site/Icon';
import TrackedLink from './TrackedLink';
import { STATUS_META, type FlagshipSystem, type SystemStatus } from '@/lib/marketing/systems';

const TONES: Record<string, string> = {
  emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  sky: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  amber: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  gray: 'border-white/15 bg-white/[0.05] text-gray-300',
};

export function StatusBadge({ status }: { status: SystemStatus }) {
  const meta = STATUS_META[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${TONES[meta.tone]}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'interactive' ? 'bg-emerald-400 vx-pulse' : status === 'coming-soon' ? 'bg-gray-500' : 'bg-current'
        }`}
      />
      {meta.label}
    </span>
  );
}

/** Card for a flagship system / demo environment. */
export default function SystemCard({ system, featured = false }: { system: FlagshipSystem; featured?: boolean }) {
  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 sm:p-7 transition-colors ${
        featured
          ? 'border-sky-400/25 bg-gradient-to-br from-sky-500/[0.08] via-transparent to-transparent'
          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/25 to-blue-600/15 border border-white/10 items-center justify-center">
          <Icon name={system.icon} className="w-5 h-5 text-sky-200" />
        </span>
        <StatusBadge status={system.status} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white tracking-tight">{system.name}</h3>
      <p className="mt-2.5 text-sm text-gray-400 leading-relaxed flex-1">{system.summary}</p>
      <p className="mt-4 text-xs text-gray-500">
        <span className="mono-label text-[10px] text-gray-600">For</span>{' '}
        {system.audience.join(' · ')}
      </p>
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-3">
        <TrackedLink
          href={`/systems/${system.slug}`}
          event="system_explore_click"
          eventProps={{ system: system.slug }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
        >
          Explore System
          <ArrowRight className="w-4 h-4" />
        </TrackedLink>
        {system.status === 'interactive' && system.demo && (
          <TrackedLink
            href={system.demo.href}
            event="demo_opened"
            eventProps={{ system: system.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            View Demo
          </TrackedLink>
        )}
      </div>
    </article>
  );
}

/** Compact inline link variant used inside industry pages. */
export function SystemLink({ system }: { system: FlagshipSystem }) {
  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-sky-400/30 transition-colors"
    >
      <span className="inline-flex w-11 h-11 shrink-0 rounded-xl bg-sky-500/10 border border-sky-400/20 items-center justify-center">
        <Icon name={system.icon} className="w-5 h-5 text-sky-300" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-base font-semibold text-white group-hover:text-sky-200 transition-colors">{system.name}</span>
        <span className="mt-1 block"><StatusBadge status={system.status} /></span>
      </span>
      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-sky-300 transition-colors shrink-0" />
    </Link>
  );
}
