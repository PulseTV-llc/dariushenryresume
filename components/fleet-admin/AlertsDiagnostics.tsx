'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { fleetCall } from '@/lib/fleet/client';
import { ago, when } from '@/lib/fleet/logic';
import type { AlertRow, DiagnosticRow } from '@/lib/fleet/types';
import { useFleet } from './FleetShell';
import { Badge, BTN_QUIET, Dialog, Empty, ErrorBox, PageHeader, Pager, SELECT, Spinner, usePoll } from './ui';

const SEV: Record<string, string> = { critical: 'bg-rose-50 text-rose-800 ring-rose-200', warning: 'bg-amber-50 text-amber-900 ring-amber-200', info: 'bg-slate-100 text-slate-700 ring-slate-200' };
const KIND: Record<string, string> = { offline: 'Offline too long', update_failures: 'Repeated update failures', storage_low: 'Storage low', service_down: 'Service down',
  temperature_high: 'Temperature', memory_high: 'Memory', maintenance: 'Maintenance', lorawan_down: 'LoRaWAN lost', no_uploads: 'No data uploads' };

export function Alerts() {
  const { can, act, toast } = useFleet();
  const [status, setStatus] = useState('live');
  const [severity, setSeverity] = useState('');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<{ total: number; rows: AlertRow[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    try { setData(await fleetCall('fleet_alerts', { p_filter: { status, ...(severity ? { severity } : {}) }, p_limit: 50, p_offset: offset })); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [status, severity, offset]);
  usePoll(load, 20000, [load]);
  const set = async (id: string, s: 'acknowledged' | 'resolved') => {
    const note = s === 'resolved' ? window.prompt('What fixed it? (kept with the alert)') ?? undefined : undefined;
    await act(() => fleetCall('fleet_alert_set', { p_id: id, p_status: s, p_note: note ?? null })); toast(s === 'resolved' ? 'Resolved' : 'Acknowledged'); await load();
  };
  return (
    <div>
      <PageHeader title="Fleet alerts" subtitle="Raised by the server every minute from heartbeats and updates; one per gateway and kind, closed automatically when it clears. Critical ones are pushed and emailed to fleet staff once." />
      <div className="mb-3 flex flex-wrap gap-2 text-sm">
        <label className="flex items-center gap-1">Show<select className={SELECT} value={status} onChange={(e) => { setStatus(e.target.value); setOffset(0); }}><option value="live">Open and acknowledged</option><option value="open">Open</option><option value="acknowledged">Acknowledged</option><option value="resolved">Resolved</option><option value="all">All (history)</option></select></label>
        <label className="flex items-center gap-1">Severity<select className={SELECT} value={severity} onChange={(e) => { setSeverity(e.target.value); setOffset(0); }}><option value="">Any</option><option value="critical">Critical</option><option value="warning">Warning</option><option value="info">Info</option></select></label>
      </div>
      {error && <ErrorBox error={error} onRetry={() => void load()} />}
      {!data ? <Spinner /> : data.rows.length === 0 ? <Empty>No alerts here.</Empty> : (
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">{data.rows.map((a) => (
          <li key={a.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2"><Badge tone={SEV[a.severity] ?? SEV.info}>{a.severity}</Badge><b>{KIND[a.kind] ?? a.kind}</b>
                <Link className="font-mono text-sm text-blue-800" href={`/admin/fleet/gateways/${a.unit_id}`}>{a.serial}</Link>{a.organization_name && <span className="text-xs text-slate-500">{a.organization_name}</span>}</p>
              <p className="text-sm">{a.message}</p>
              <p className="text-xs text-slate-500">opened {when(a.opened_at)} · last seen {ago(a.last_seen_at)} · {a.status}
                {a.acknowledged_by_email ? ` · acknowledged by ${a.acknowledged_by_email}` : ''}{a.resolved_at ? ` · resolved ${when(a.resolved_at)}${a.resolved_by_email ? ` by ${a.resolved_by_email}` : ' automatically'}` : ''}</p>
            </div>
            {can('diagnostics') && a.status !== 'resolved' && <div className="flex gap-2">
              {a.status === 'open' && <button type="button" className={`${BTN_QUIET} !h-9`} onClick={() => set(a.id, 'acknowledged')}>Acknowledge</button>}
              <button type="button" className={`${BTN_QUIET} !h-9`} onClick={() => set(a.id, 'resolved')}>Resolve</button></div>}
          </li>))}</ul>
      )}
      {data && <Pager total={data.total} limit={50} offset={offset} onPage={setOffset} />}
    </div>
  );
}

export function Diagnostics() {
  const { can, act } = useFleet();
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<{ total: number; rows: (DiagnosticRow & { has_bundle: boolean })[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<{ id: string; serial: string; bundle: unknown } | null>(null);
  const load = useCallback(async () => {
    try { setData(await fleetCall('fleet_diagnostics_list', { p_filter: {}, p_limit: 50, p_offset: offset })); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [offset]);
  usePoll(load, 15000, [load]);
  return (
    <div>
      <PageHeader title="Diagnostics" subtitle="Bundles a gateway collects on request: versions, services, health, radios and its last service logs, redacted (no keys, tokens, Wi-Fi names or readings). No file browsing, no terminal. Kept 30 days; opening one is logged." />
      <p className="mb-3 text-sm text-slate-600">Request a bundle from a gateway&apos;s page (Actions → Collect diagnostics).</p>
      {error && <ErrorBox error={error} onRetry={() => void load()} />}
      {!data ? <Spinner /> : data.rows.length === 0 ? <Empty>No diagnostics requested yet.</Empty> : (
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">{data.rows.map((d) => (
          <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
            <div><Link className="font-mono font-semibold text-blue-800" href={`/admin/fleet/gateways/${d.unit_id}`}>{d.serial}</Link> <Badge tone={d.status === 'RECEIVED' ? SEV.info : d.status === 'FAILED' ? SEV.critical : SEV.warning}>{d.status}</Badge>
              <p className="text-xs text-slate-500">asked by {d.requested_by_email ?? '—'} {when(d.requested_at)}{d.received_at ? ` · received ${when(d.received_at)} · ${Math.round((d.size_bytes ?? 0) / 1024)} KB` : ''}</p></div>
            {can('diagnostics') && d.has_bundle && <button type="button" className={`${BTN_QUIET} !h-9`} onClick={async () => {
              const r = await act(() => fleetCall<{ bundle: unknown }>('fleet_diagnostic', { p_id: d.id })); setOpen({ id: d.id, serial: d.serial, bundle: r.bundle });
            }}>Open</button>}
            {d.status === 'RECEIVED' && !d.has_bundle && <span className="text-xs text-slate-500">expired (retention)</span>}
          </li>))}</ul>
      )}
      {data && <Pager total={data.total} limit={50} offset={offset} onPage={setOffset} />}
      {open && <Dialog title={`Diagnostics: ${open.serial}`} onClose={() => setOpen(null)} wide>
        <pre className="max-h-[70vh] overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">{JSON.stringify(open.bundle, null, 2)}</pre>
      </Dialog>}
    </div>
  );
}
