'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { Content } from '@/lib/i18n/content';
import { CONNECTIVITY_LABEL, SENSOR_FAMILIES, familyStatus, type Connectivity, type SensorStatus } from '@/lib/sensors';
import { CheckList, GlassCard, IconTile } from './ui';

type T = Content['catalog']['sensors'];

const BADGE: Record<SensorStatus, string> = {
  now: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  integrating: 'bg-amber-50 text-amber-800 ring-amber-200',
  integration: 'bg-slate-100 text-slate-700 ring-slate-200',
};
const DOT: Record<SensorStatus, string> = { now: 'bg-emerald-500', integrating: 'bg-amber-500', integration: 'bg-slate-400' };
const STATUSES: SensorStatus[] = ['now', 'integrating', 'integration'];
const TONE: Record<Connectivity, string> = {
  ble: 'bg-blue-50 text-blue-800 ring-blue-200',
  wifi: 'bg-sky-50 text-sky-800 ring-sky-200',
  rs485: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
};

function StatusPill({ status, t }: { status: SensorStatus; t: T }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${BADGE[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} aria-hidden="true" />
      {t.statusLabel[status]}
    </span>
  );
}

function ConnBadge({ kind, t }: { kind: Connectivity; t: T }) {
  return (
    <span title={t.connectivityName[kind]} className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide ring-1 ${TONE[kind]}`}>
      {CONNECTIVITY_LABEL[kind]}
      <span className="sr-only"> ({t.connectivityName[kind]})</span>
    </span>
  );
}

/**
 * The sensor catalog.
 * - compact: Home / Platform. Three measurements per card, linking to the full page.
 * - full: Sensors page. Industry filter chips and expandable detail per family.
 */
export default function SensorCatalog({
  compact = false, locale, t, industries,
}: {
  compact?: boolean; locale: Locale; t: T; industries: { slug: string; short: string }[];
}) {
  const [industry, setIndustry] = useState('all');
  const [open, setOpen] = useState<string | null>(null);

  // Arriving from a compact card (/products/sensors#family) opens that family.
  useEffect(() => {
    if (compact) return;
    const slug = window.location.hash.slice(1);
    if (SENSOR_FAMILIES.some((f) => f.slug === slug)) setOpen(slug);
  }, [compact]);

  const families = SENSOR_FAMILIES.filter((f) => industry === 'all' || (f.industries as readonly string[]).includes(industry));

  return (
    <div>
      {!compact && (
        <div role="group" aria-label={t.ui.filterLabel} className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {[{ slug: 'all', short: t.ui.all }, ...industries].map((i) => {
            const active = industry === i.slug;
            return (
              <button key={i.slug} type="button" aria-pressed={active} onClick={() => setIndustry(i.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300'}`}>
                {i.short}
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {families.map((f) => {
          const w = t.families[f.slug];
          const expanded = open === f.slug;
          const all = w.measurements.map((name, i) => ({ name, status: f.statuses[i] as SensorStatus }));
          const shown = compact ? all.slice(0, 3) : all;
          const more = all.length - shown.length;
          return (
            <li key={f.slug} id={compact ? undefined : f.slug} className="glass flex flex-col rounded-3xl p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <IconTile name={f.icon} />
                <StatusPill status={familyStatus(f.statuses)} t={t} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-lg font-semibold text-slate-900">{w.name}</h3>
                <span className="flex gap-1">
                  {f.connectivity.map((k) => <ConnBadge key={k} kind={k} t={t} />)}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{w.value}</p>

              <ul className="mt-4 space-y-1.5">
                {shown.map((m) => (
                  <li key={m.name} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[m.status]}`} aria-hidden="true" />
                    <span>
                      {m.name}
                      <span className="sr-only"> ({t.statusLabel[m.status]})</span>
                    </span>
                  </li>
                ))}
                {more > 0 && <li className="pl-4 text-xs text-slate-500">{t.ui.more.replace('{n}', String(more))}</li>}
              </ul>

              {compact ? (
                <Link href={`${localePath(locale, '/products/sensors')}#${f.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900" aria-label={`${w.name}: ${t.ui.details}`}>
                  {t.ui.details}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ) : (
                <>
                  <button type="button" aria-expanded={expanded} aria-controls={`${f.slug}-detail`} onClick={() => setOpen(expanded ? null : f.slug)}
                    className="mt-4 inline-flex items-center gap-1 self-start rounded-lg text-sm font-semibold text-blue-700 hover:text-blue-900">
                    {expanded ? t.ui.hideDetails : t.ui.seeDetails}
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <div id={`${f.slug}-detail`} hidden={!expanded} className="mt-4 border-t border-slate-200/80 pt-4">
                    <p className="text-sm leading-relaxed text-slate-600">{w.detail}</p>
                    <p className="mt-3 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">{t.ui.typicalUse} </span>
                      {w.use}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {STATUSES.filter((s) => (f.statuses as readonly SensorStatus[]).includes(s)).map((s) => (
                        <li key={s}><StatusPill status={s} t={t} /></li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <dl className="flex flex-col gap-x-6 gap-y-2 text-xs text-slate-600 sm:flex-row sm:flex-wrap sm:justify-center">
          {STATUSES.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <dt><StatusPill status={s} t={t} /></dt>
              <dd>{t.statusHelp[s]}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
          {(['ble', 'wifi', 'rs485'] as Connectivity[]).map((k) => (
            <span key={k} className="flex items-center gap-2">
              <ConnBadge kind={k} t={t} /> {t.legend[k]}
            </span>
          ))}
        </p>
      </div>

      {compact && (
        <p className="mt-8 text-center">
          <Link href={localePath(locale, '/products/sensors')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
            {t.ui.fullCatalog}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      )}
    </div>
  );
}

/** "Don't see your sensor?" call to action. */
export function SensorRequestCTA({ t, href }: { t: T['request']; href: string }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-7 text-center sm:p-9">
      <h3 className="text-xl font-semibold text-slate-900">{t.title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">{t.body}</p>
      <Link href={href} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
        {t.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

const CONN_CARDS: { kind: Connectivity; icon: 'bluetooth' | 'wifi' | 'wired'; status: SensorStatus }[] = [
  { kind: 'ble', icon: 'bluetooth', status: 'now' },
  { kind: 'wifi', icon: 'wifi', status: 'now' },
  { kind: 'rs485', icon: 'wired', status: 'integration' },
];

/** How devices reach the gateway: wireless and wired, one data model. */
export function ConnectivitySection({ t }: { t: T }) {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {CONN_CARDS.map(({ kind, icon, status }) => {
          const w = t.connectivity[kind];
          return (
            <GlassCard key={kind} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <IconTile name={icon} />
                <StatusPill status={status} t={t} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.body}</p>
              <div className="mt-4 flex-1"><CheckList items={w.items} /></div>
              {'note' in w && (
                <p className="mt-4 rounded-xl bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-950 ring-1 ring-amber-200">{w.note}</p>
              )}
            </GlassCard>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm font-medium text-slate-700">{t.connectivity.footer}</p>
    </div>
  );
}
