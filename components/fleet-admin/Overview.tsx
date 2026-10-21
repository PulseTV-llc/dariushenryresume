'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fleetCall } from '@/lib/fleet/client';
import { ago, LIFECYCLE_LABEL } from '@/lib/fleet/logic';
import type { Lifecycle, Overview } from '@/lib/fleet/types';
import { BarList, CARD, ErrorBox, PageHeader, Spinner, Stat, TrendChart, usePoll } from './ui';

export default function FleetOverview() {
  const router = useRouter();
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sim, setSim] = useState(false);
  usePoll(async () => {
    try { setData(await fleetCall<Overview>('fleet_overview', { p_include_simulated: sim })); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, 20000, [sim]);

  const go = (q: string) => router.push(`/admin/fleet/gateways${q ? `?${q}` : ''}`);
  if (error && !data) return <ErrorBox error={error} />;
  if (!data) return <Spinner />;
  const c = data.counts;
  return (
    <div className="space-y-6">
      <PageHeader title="Fleet overview" subtitle={<>Live from the database · updated {ago(data.generated_at)}{data.simulated_units > 0 && !sim ? ` · ${data.simulated_units} simulated unit${data.simulated_units === 1 ? '' : 's'} not counted` : ''}</>}>
        {data.simulated_units > 0 && (
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sim} onChange={(e) => setSim(e.target.checked)} className="h-4 w-4" />Include simulated units</label>
        )}
      </PageHeader>
      {error && <ErrorBox error={`Showing the last loaded figures: ${error}`} />}
      <section aria-label="Counts" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label="Total gateways" value={c.total} onClick={() => go('')} />
        <Stat label="Online" value={c.online} tone="text-emerald-700" onClick={() => go('health=ONLINE')} />
        <Stat label="Offline" value={c.offline} tone={c.offline ? 'text-rose-700' : ''} onClick={() => go('health=OFFLINE')} />
        <Stat label="Degraded" value={c.degraded} tone={c.degraded ? 'text-amber-700' : ''} onClick={() => go('health=DEGRADED')} />
        <Stat label="Unassigned" value={c.unassigned} onClick={() => go('unassigned=1')} />
        <Stat label="Need an update" value={c.needs_update} onClick={() => go('update_state=PENDING')} />
        <Stat label="Updating" value={c.updating} onClick={() => go('update_state=UPDATING')} />
        <Stat label="Failed updates" value={c.failed_updates} tone={c.failed_updates ? 'text-rose-700' : ''} onClick={() => go('update_state=FAILED')} />
        <Stat label="Connected sensors" value={c.sensors} hint="as last reported by gateways" />
        <Stat label="Not reporting yet" value={c.unknown} onClick={() => go('health=UNKNOWN')} hint="no agent heartbeat or app contact" />
      </section>

      <section className={CARD} aria-label="Online trend">
        <h2 className="text-sm font-semibold">Online, last 7 days</h2>
        <TrendChart points={data.online_trend} />
      </section>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <BarList title="By lifecycle" items={Object.entries(data.by_lifecycle).map(([k, v]) => ({ key: LIFECYCLE_LABEL[k as Lifecycle] ?? k, count: v ?? 0 }))} />
        <BarList title="By model" items={data.by_model} />
        <BarList title="By country" items={data.by_country} />
        <BarList title="Software versions" items={data.by_version} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ListCard title="Connectivity alerts" empty="No open connectivity alerts." href="/admin/fleet/alerts"
          rows={data.connectivity_alerts.map((a) => ({ key: a.id, main: `${a.serial} · ${a.message}`, side: ago(a.opened_at), href: `/admin/fleet/gateways/${a.unit_id}` }))} />
        <ListCard title="Failed deployments" empty="No failed deployments." href="/admin/fleet/history"
          rows={data.failed_deployments.map((d) => ({ key: d.id, main: `${d.name} (${d.version}) · ${d.failed} failed`, side: ago(d.at), href: `/admin/fleet/deployments/${d.id}` }))} />
        <ListCard title="Recent activations" empty="No activations yet."
          rows={data.recent_activations.map((r) => ({ key: r.id, main: `${r.serial} · ${r.organization_name ?? '—'}${r.site_name ? ` / ${r.site_name}` : ''}`, side: ago(r.activated_at), href: `/admin/fleet/gateways/${r.id}` }))} />
        <ListCard title="Successful updates" empty="No updates yet."
          rows={data.successful_updates.map((r) => ({ key: `${r.unit_id}${r.at}`, main: `${r.serial} → ${r.version}`, side: ago(r.at), href: `/admin/fleet/gateways/${r.unit_id}` }))} />
      </div>
    </div>
  );
}

function ListCard({ title, rows, empty, href }: { title: string; empty: string; href?: string; rows: { key: string; main: string; side: string; href: string }[] }) {
  return (
    <section className={CARD} aria-label={title}>
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">{title}</h2>{href && <Link href={href} className="text-xs font-semibold text-blue-700">See all</Link>}</div>
      {rows.length === 0 ? <p className="mt-2 text-sm text-slate-500">{empty}</p> : (
        <ul className="mt-2 divide-y divide-slate-100 text-sm">
          {rows.map((r) => (
            <li key={r.key}><Link href={r.href} className="flex items-center justify-between gap-3 py-2 hover:text-blue-800"><span className="min-w-0 truncate">{r.main}</span><span className="shrink-0 text-xs text-slate-500">{r.side}</span></Link></li>
          ))}
        </ul>
      )}
    </section>
  );
}
