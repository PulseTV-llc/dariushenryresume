'use client';

import { useState } from 'react';
import { fleetCall } from '@/lib/fleet/client';
import { useFleet } from './FleetShell';
import { BTN, BTN_QUIET, CARD, ErrorBox, INPUT, PageHeader, Spinner, useLoad } from './ui';

const ROLE_HELP: Record<string, string> = {
  super_admin: 'Everything, including staff and settings. Every platform admin is one.',
  fleet_admin: 'Everything except staff and settings: releases, approvals, deployments, credentials.',
  fleet_technician: 'Register, provision, assign, diagnostics, restart and reboot, pause deployments.',
  fleet_viewer: 'Read only.',
};
const SETTING_HELP: Record<string, string> = {
  heartbeat_interval_s: 'Agent heartbeat interval (seconds), sent to gateways at check-in',
  offline_after_s: 'A gateway is Offline after this long without any contact (seconds)',
  offline_alert_after_s: 'Raise an "offline" alert after this long offline (seconds)',
  disk_free_min_pct: 'Degraded below this free disk (%)', memory_max_pct: 'Degraded above this memory use (%)',
  temperature_max_c: 'Degraded above this temperature (°C)', app_stale_after_s: 'Degraded when the agent reports but the app has not uploaded for this long (seconds)',
  raw_heartbeat_retention_days: 'Keep raw heartbeats (days)', rollup_retention_days: 'Keep hourly rollups (days)',
  diagnostics_retention_days: 'Keep diagnostic bundles (days)', rollout_max_failure_rate: 'Halt a rollout above this failure rate (0–1)',
  rollout_min_sample: 'Finished gateways needed before the halt rule applies', update_failures_alert: 'Alert after this many failed updates in a row',
  enrollment_token_ttl_min: 'Default provisioning token lifetime (minutes)',
};

export default function SettingsPage() {
  const { can, act, toast, me } = useFleet();
  const staff = useLoad(() => fleetCall<{ email: string; role: string; source: string }[]>('fleet_staff_list'));
  const settings = useLoad(() => fleetCall<Record<string, number>>('fleet_settings_get'));
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('fleet_viewer');
  const [err, setErr] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const manage = can('manage_staff');
  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader title="Staff & settings" subtitle="Fleet roles are separate from customer roles: a customer owner gets nothing here." />
      <section className={CARD} aria-label="Staff">
        <h2 className="text-sm font-semibold">Fleet staff</h2>
        {staff.error && <ErrorBox error={staff.error} />}
        {!staff.data ? <Spinner /> : (
          <ul className="mt-2 divide-y divide-slate-100 text-sm">{staff.data.map((s) => (
            <li key={s.email} className="flex flex-wrap items-center justify-between gap-2 py-2"><span>{s.email} <span className="text-xs text-slate-500">· {s.role.replace('_', ' ')}{s.source === 'platform admin' ? ' (platform admin)' : ''}</span></span>
              {manage && s.source === 'fleet' && s.email !== me.email && <button type="button" className={`${BTN_QUIET} !h-8 text-xs`} onClick={async () => {
                try { await act(() => fleetCall('fleet_staff_set', { p_email: s.email, p_role: null })); toast('Removed'); staff.reload(); } catch (x) { setErr(x instanceof Error ? x.message : String(x)); } }}>Remove</button>}
            </li>))}</ul>
        )}
        {manage && (
          <form className="mt-3 flex flex-wrap items-end gap-2" onSubmit={async (e) => {
            e.preventDefault(); setErr(null);
            try { await act(() => fleetCall('fleet_staff_set', { p_email: email.trim(), p_role: role })); toast('Role saved'); setEmail(''); staff.reload(); }
            catch (x) { setErr(x instanceof Error ? x.message : String(x)); }
          }}>
            <label className="text-sm font-medium">Email of a VexaOs account<input type="email" required className={`${INPUT} mt-1 !h-10`} value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label className="text-sm font-medium">Role<select className={`${INPUT} mt-1 !h-10`} value={role} onChange={(e) => setRole(e.target.value)}>
              {Object.keys(ROLE_HELP).map((r) => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}</select></label>
            <button type="submit" className={`${BTN} !h-10`}>Give role</button>
          </form>
        )}
        {err && <p role="alert" className="mt-2 text-sm text-rose-600">{err}</p>}
        <dl className="mt-3 grid gap-1 text-xs text-slate-600 sm:grid-cols-2">{Object.entries(ROLE_HELP).map(([k, v]) => <div key={k}><dt className="inline font-semibold">{k.replace('_', ' ')}: </dt><dd className="inline">{v}</dd></div>)}</dl>
      </section>

      <section className={CARD} aria-label="Thresholds">
        <h2 className="text-sm font-semibold">Thresholds and retention</h2>
        {!settings.data ? <Spinner /> : (
          <ul className="mt-2 divide-y divide-slate-100 text-sm">{Object.entries(settings.data).sort().map(([k, v]) => (
            <li key={k} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span className="min-w-0 flex-1">{SETTING_HELP[k] ?? k}</span>
              {manage ? (
                <form className="flex items-center gap-2" onSubmit={async (e) => {
                  e.preventDefault(); setErr(null);
                  try { await act(() => fleetCall('fleet_settings_set', { p_key: k, p_value: Number(edits[k]) })); toast('Saved'); settings.reload(); setEdits({ ...edits, [k]: '' }); }
                  catch (x) { setErr(x instanceof Error ? x.message : String(x)); }
                }}>
                  <label className="sr-only" htmlFor={`s-${k}`}>{SETTING_HELP[k] ?? k}</label>
                  <input id={`s-${k}`} inputMode="decimal" className={`${INPUT} !h-9 !w-24`} placeholder={String(v)} value={edits[k] ?? ''} onChange={(e) => setEdits({ ...edits, [k]: e.target.value })} />
                  <button type="submit" disabled={!edits[k]} className={`${BTN_QUIET} !h-9`}>Save</button>
                </form>
              ) : <span className="tabular-nums">{String(v)}</span>}
            </li>))}</ul>
        )}
      </section>
    </div>
  );
}
