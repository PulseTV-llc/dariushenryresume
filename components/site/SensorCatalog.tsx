'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { INDUSTRIES } from '@/lib/site';
import {
  CONNECTIVITY_LABEL,
  CONNECTIVITY_NAME,
  SENSOR_FAMILIES,
  SENSOR_STATUS_HELP,
  SENSOR_STATUS_LABEL,
  familyStatus,
  type Connectivity,
  type SensorStatus,
} from '@/lib/sensors';
import { CheckList, GlassCard, IconTile } from './ui';

const BADGE: Record<SensorStatus, string> = {
  now: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  integrating: 'bg-amber-50 text-amber-800 ring-amber-200',
  integration: 'bg-slate-100 text-slate-700 ring-slate-200',
};
const DOT: Record<SensorStatus, string> = {
  now: 'bg-emerald-500',
  integrating: 'bg-amber-500',
  integration: 'bg-slate-400',
};

export function SensorStatusBadge({ status }: { status: SensorStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${BADGE[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} aria-hidden="true" />
      {SENSOR_STATUS_LABEL[status]}
    </span>
  );
}

export function ConnectivityBadge({ kind }: { kind: Connectivity }) {
  return (
    <span
      title={CONNECTIVITY_NAME[kind]}
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide ring-1 ${
        kind === 'ble' ? 'bg-blue-50 text-blue-800 ring-blue-200' : 'bg-indigo-50 text-indigo-800 ring-indigo-200'
      }`}
    >
      {CONNECTIVITY_LABEL[kind]}
      <span className="sr-only"> ({CONNECTIVITY_NAME[kind]})</span>
    </span>
  );
}

function Legend() {
  return (
    <dl className="flex flex-col gap-x-6 gap-y-2 text-xs text-slate-600 sm:flex-row sm:flex-wrap sm:justify-center">
      {(Object.keys(SENSOR_STATUS_LABEL) as SensorStatus[]).map((s) => (
        <div key={s} className="flex items-center gap-2">
          <dt>
            <SensorStatusBadge status={s} />
          </dt>
          <dd>{SENSOR_STATUS_HELP[s]}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The sensor catalog.
 * - compact: Home / Platform. Cards only, three measurements each, link to the full page.
 * - full: Sensors page. Industry filter chips and expandable detail per family.
 */
export default function SensorCatalog({ compact = false }: { compact?: boolean }) {
  const [industry, setIndustry] = useState<string>('all');
  const [open, setOpen] = useState<string | null>(null);

  // Arriving from a compact card (/products/sensors#family) opens that family.
  useEffect(() => {
    if (compact) return;
    const slug = window.location.hash.slice(1);
    if (SENSOR_FAMILIES.some((f) => f.slug === slug)) setOpen(slug);
  }, [compact]);

  const families = SENSOR_FAMILIES.filter((f) => industry === 'all' || f.industries.includes(industry));

  return (
    <div>
      {!compact && (
        <div role="group" aria-label="Filter sensor families by industry" className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {[{ slug: 'all', short: 'All industries' }, ...INDUSTRIES].map((i) => {
            const active = industry === i.slug;
            return (
              <button
                key={i.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setIndustry(i.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300'
                }`}
              >
                {i.short}
              </button>
            );
          })}
        </div>
      )}

      <ul className={`grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3`} aria-live="polite">
        {families.map((f) => {
          const expanded = open === f.slug;
          const shown = compact ? f.measurements.slice(0, 3) : f.measurements;
          const more = f.measurements.length - shown.length;
          return (
            <li key={f.slug} id={compact ? undefined : f.slug} className="glass flex flex-col rounded-3xl p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <IconTile name={f.icon} />
                <SensorStatusBadge status={familyStatus(f)} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-lg font-semibold text-slate-900">{f.name}</h3>
                <span className="flex gap-1">
                  {f.connectivity.map((c) => (
                    <ConnectivityBadge key={c} kind={c} />
                  ))}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.value}</p>

              <ul className="mt-4 space-y-1.5">
                {shown.map((m) => (
                  <li key={m.name} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[m.status]}`} aria-hidden="true" />
                    <span>
                      {m.name}
                      <span className="sr-only"> ({SENSOR_STATUS_LABEL[m.status]})</span>
                    </span>
                  </li>
                ))}
                {more > 0 && <li className="pl-4 text-xs text-slate-500">+{more} more</li>}
              </ul>

              {compact ? (
                <Link
                  href={`/products/sensors#${f.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900"
                  aria-label={`${f.name}: see details`}
                >
                  Details
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${f.slug}-detail`}
                    onClick={() => setOpen(expanded ? null : f.slug)}
                    className="mt-4 inline-flex items-center gap-1 self-start rounded-lg text-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    {expanded ? 'Hide details' : 'See details'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <div id={`${f.slug}-detail`} hidden={!expanded} className="mt-4 border-t border-slate-200/80 pt-4">
                    <p className="text-sm leading-relaxed text-slate-600">{f.detail}</p>
                    <p className="mt-3 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">Typical use: </span>
                      {f.use}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {(['now', 'integrating', 'integration'] as SensorStatus[])
                        .filter((s) => f.measurements.some((m) => m.status === s))
                        .map((s) => (
                          <li key={s}>
                            <SensorStatusBadge status={s} />
                          </li>
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
        <Legend />
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <ConnectivityBadge kind="ble" /> Wireless, Bluetooth Low Energy
          </span>
          <span className="flex items-center gap-2">
            <ConnectivityBadge kind="rs485" /> Wired, RS-485 / Modbus (via integration)
          </span>
        </p>
      </div>

      {compact && (
        <p className="mt-8 text-center">
          <Link href="/products/sensors" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
            See the full sensor catalog
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      )}
    </div>
  );
}

/** "Don't see your sensor?" call to action. */
export function SensorRequestCTA() {
  return (
    <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-7 text-center sm:p-9">
      <h3 className="text-xl font-semibold text-slate-900">Don&apos;t see your sensor?</h3>
      <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">
        Wireless or wired, we integrate it. VexaOS is vendor-neutral and adds new sensors through adapters. Tell us
        what you need to measure and we will tell you plainly whether it works today, is in progress, or needs
        building.
      </p>
      <Link
        href="/contact"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Ask about a sensor
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** How devices reach the gateway: wireless and wired, one data model. */
export function ConnectivitySection() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <div className="flex items-start justify-between gap-3">
            <IconTile name="bluetooth" />
            <SensorStatusBadge status="now" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">Wireless: Bluetooth Low Energy</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Battery-powered sensors with nothing to wire. The gateway hears every sensor in range.
          </p>
          <div className="mt-4">
            <CheckList
              items={[
                'Temperature, humidity and barometric pressure',
                'Door and window contact',
                'Sensor movement, battery and signal strength',
                'Encrypted sensor broadcasts supported',
              ]}
            />
          </div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-start justify-between gap-3">
            <IconTile name="wired" />
            <SensorStatusBadge status="integration" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">Wired industrial: RS-485 / Modbus RTU</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            For the instruments and controllers already on your plant floor. Optional Modbus TCP over Ethernet.
          </p>
          <div className="mt-4">
            <CheckList
              items={[
                'Energy and power meters, flow meters',
                'Level and pressure transmitters',
                '4–20 mA and 0–10 V signals, through converters',
                'PLCs and controllers, HVAC and BMS equipment',
              ]}
            />
          </div>
          <p className="mt-4 rounded-xl bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-950 ring-1 ring-amber-200">
            The gateway&apos;s Modbus adapter is not built yet. Wired devices are delivered as an integration, built
            and tested against your equipment. Monitoring only: VexaOS reads values and does not control equipment.
          </p>
        </GlassCard>
      </div>
      <p className="mt-6 text-center text-sm font-medium text-slate-700">
        One data model, one app. Wireless or wired, every reading gets the same history, alerts and insights.
      </p>
    </div>
  );
}
