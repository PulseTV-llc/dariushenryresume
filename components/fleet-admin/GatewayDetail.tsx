'use client';

import { useCallback, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, KeyRound } from 'lucide-react';
import { fleetCall } from '@/lib/fleet/client';
import {
  ago, availableCommands, COMMAND_LABEL, COMMAND_WARNING, LIFECYCLE_LABEL, TARGET_LABEL, targetTone, unitActions, UPDATE_LABEL, when,
  type UnitAction,
} from '@/lib/fleet/logic';
import type { AlertRow, CommandRow, CommandType, Customer, Lifecycle, TargetStatus, UnitRow, UpdateState } from '@/lib/fleet/types';
import { useFleet } from './FleetShell';
import { Badge, BTN, BTN_DANGER, BTN_QUIET, CARD, ConfirmDialog, Dialog, ErrorBox, HealthBadge, INPUT, PageHeader, SimBadge, Spinner, usePoll } from './ui';

type Json = Record<string, any>;
export interface GatewayDetailData {
  unit: UnitRow & Json & { capabilities: string[] };
  identity: { keys: { key_id: string; fingerprint: string; created_at: string; revoked_at: string | null }[]; provisioning: Json | null;
              tokens: { id: string; created_at: string; expires_at: string; used_at: string | null; revoked_at: string | null; created_by_email: string | null }[] };
  heartbeat: Json | null; app_health: Json | null;
  sensors: { id: string; name: string; sensor_type: string; adapter: string; model: string; connection_state: string; last_seen: string | null }[];
  alerts: AlertRow[]; commands: CommandRow[];
  updates: { id: string; deployment_id: string; deployment_name: string; version: string; status: TargetStatus; error: string | null; updated_at: string; progress: number | null }[];
  groups: { id: string; name: string }[];
  history: { id: string; at: string; action: string; actor_email: string | null; details: Json }[];
  metrics_24h: { hour: string; cpu_avg: number | null; mem_max: number | null; temp_max: number | null; disk_free_min: number | null; samples: number }[];
}

const ACTION_LABEL: Record<UnitAction, string> = {
  assign: 'Assign to customer', unassign: 'Unassign', ship: 'Mark shipped', activate: 'Activate', maintenance: 'Maintenance mode',
  end_maintenance: 'End maintenance', suspend: 'Suspend', resume: 'Resume', transfer: 'Transfer (rotate credentials)', retire: 'Retire',
  provision_token: 'Provisioning token',
};

export default function GatewayDetail({ id }: { id: string }) {
  const { me, can, act, toast } = useFleet();
  const [d, setD] = useState<GatewayDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dialog, setDialog] = useState<null | { kind: 'action'; action: UnitAction } | { kind: 'command'; type: CommandType }>(null);
  const load = useCallback(async () => {
    try { setD(await fleetCall<GatewayDetailData>('fleet_gateway', { p_unit: id })); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [id]);
  usePoll(load, 10000, [load]);

  if (error && !d) return <ErrorBox error={error} onRetry={() => void load()} />;
  if (!d) return <Spinner />;
  const u = d.unit;
  const hb = d.heartbeat ?? {};
  const sys = hb.system ?? d.app_health?.system ?? {};
  const radios = hb.radios ?? {};
  const actions = unitActions(u, me.permissions);
  const commands = availableCommands(u.capabilities ?? [], me.permissions, u.lifecycle as Lifecycle);
  const run = async (fn: string, args: Json, done: string) => { await act(() => fleetCall(fn, args)); toast(done); await load(); };

  return (
    <div className="space-y-4">
      <Link href="/admin/fleet/gateways" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Gateways</Link>
      <PageHeader title={u.serial} subtitle={<span className="flex flex-wrap items-center gap-2">
        <HealthBadge health={u.health} reasons={u.health_reasons} />
        <Badge tone="bg-slate-100 text-slate-800 ring-slate-200">{LIFECYCLE_LABEL[u.lifecycle as Lifecycle]}</Badge>
        <Badge tone="bg-slate-100 text-slate-800 ring-slate-200">{UPDATE_LABEL[u.update_state as UpdateState]}</Badge>
        {u.is_simulated && <SimBadge />}
        <span className="text-xs">Last contact {ago(u.last_contact_at)}</span>
      </span>} />
      {error && <ErrorBox error={`Showing the last loaded data: ${error}`} />}
      {u.health_reasons?.length > 0 && <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">Why: {u.health_reasons.join(' · ')}</p>}

      {/* actions */}
      {(actions.length > 0 || commands.length > 0) && (
        <section className={CARD} aria-label="Actions">
          <h2 className="text-sm font-semibold">Actions</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {commands.map((c) => (
              <button key={c} type="button" className={c === 'reboot' || c === 'rollback_app' ? BTN_DANGER : BTN_QUIET} onClick={() => setDialog({ kind: 'command', type: c })}>{COMMAND_LABEL[c]}</button>
            ))}
            {can('deploy') && u.gateway_id && <Link href={`/admin/fleet/deployments/new?units=${u.id}`} className={BTN_QUIET}>Schedule an update</Link>}
            {actions.map((a) => (
              <button key={a} type="button" className={a === 'retire' || a === 'transfer' || a === 'suspend' ? BTN_DANGER : BTN_QUIET} onClick={() => setDialog({ kind: 'action', action: a })}>{ACTION_LABEL[a]}</button>
            ))}
          </div>
          {u.gateway_id && commands.length === 0 && (u.capabilities ?? []).length === 0 && (
            <p className="mt-2 text-xs text-slate-500">Remote actions appear once this gateway runs the fleet agent (it reports what it supports).</p>
          )}
        </section>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Identity">
          <Rows rows={[
            ['Serial', <Mono key="s">{u.serial}</Mono>], ['Device id', u.gateway_id ? <Mono key="g">{u.gateway_id}</Mono> : 'Not provisioned'],
            ['Model', `${u.model}${u.hardware_revision ? ` · rev ${u.hardware_revision}` : ''}`], ['Compute module', u.compute_module ?? '—'],
            ['Batch', u.batch ?? '—'], ['Assembled', when(u.assembled_at)], ['Provisioned', when(u.provisioned_at)], ['Activated', when(u.activated_at)],
            ['Warranty until', u.warranty_until ?? '—'], ['Customer', u.organization_name ? `${u.organization_name}${u.site_name ? ` / ${u.site_name}` : ''}` : 'Unassigned'],
            ['Country / time zone', `${u.country ?? '—'} · ${u.timezone ?? '—'}`], ['Update channel', u.update_channel],
            ['Groups', d.groups.length ? d.groups.map((g) => g.name).join(', ') : '—'],
          ]} />
          <h3 className="mt-4 flex items-center gap-1 text-sm font-semibold"><KeyRound className="h-4 w-4" aria-hidden="true" />Device keys</h3>
          {d.identity.keys.length === 0 ? <p className="text-sm text-slate-500">No key registered.</p> : (
            <ul className="mt-1 space-y-1 text-xs">{d.identity.keys.map((k) => (
              <li key={k.key_id} className="flex flex-wrap items-center gap-2"><Mono>{k.fingerprint}</Mono>
                {k.revoked_at ? <Badge tone="bg-rose-50 text-rose-800 ring-rose-200">revoked {ago(k.revoked_at)}</Badge> : <Badge tone="bg-emerald-50 text-emerald-800 ring-emerald-200">active</Badge>}
                <span className="text-slate-500">since {when(k.created_at)}</span></li>))}</ul>
          )}
          {d.identity.provisioning && <ProvisioningReport r={d.identity.provisioning} />}
        </Section>

        <Section title="Connectivity">
          <Rows rows={[
            ['Agent heartbeat', u.last_heartbeat_at ? `${ago(u.last_heartbeat_at)} (${when(u.last_heartbeat_at)})` : 'Never'],
            ['Data upload (app)', u.app_last_seen ? `${ago(u.app_last_seen)} (${when(u.app_last_seen)})` : 'Never'],
            ['Network', hb.network?.active ?? d.app_health?.network?.active ?? '—'],
            ['Method (registered)', u.connectivity_method ?? '—'],
            ['Boot id / uptime', hb.bootId ? `${String(hb.bootId).slice(0, 8)} · ${fmtUptime(hb.uptimeS ?? sys.uptime_s)}` : fmtUptime(sys.uptime_s)],
            ['Outbound only', 'Yes. The gateway opens no ports; it polls over HTTPS.'],
          ]} />
        </Section>

        <Section title="Software">
          <Rows rows={[
            ['App (VexaOs Edge)', <Mono key="a">{u.app_version ?? '—'}</Mono>], ['Fleet agent', <Mono key="b">{u.agent_version ?? '—'}</Mono>],
            ['Operating system', u.os_version ?? hb.versions?.os ?? '—'], ['Kernel', hb.versions?.kernel ?? '—'],
            ['Bootloader / EEPROM', u.bootloader_version ?? '—'], ['Protocol', u.protocol_version ?? '—'],
            ['Agent capabilities', (u.capabilities ?? []).length ? u.capabilities.join(', ') : '—'],
            ['Update state', hb.update?.state ? `${hb.update.state}${hb.update.progress != null ? ` · ${hb.update.progress}%` : ''}` : UPDATE_LABEL[u.update_state as UpdateState]],
          ]} />
        </Section>

        <Section title="Hardware">
          <Rows rows={[
            ['CPU', pctOr(sys.cpuPct ?? sys.cpu_pct)], ['Memory used', pctOr(sys.memUsedPct ?? sys.mem_used_pct)],
            ['Disk free', pctOr(sys.diskFreePct ?? sys.disk_free_pct)], ['Temperature', sys.tempC ?? sys.cpu_temp_c != null ? `${Math.round(sys.tempC ?? sys.cpu_temp_c)} °C` : '—'],
            ['Load (1 min)', sys.load1 ?? sys.load_avg1 ?? '—'], ['Power', d.app_health?.power ? (d.app_health.power.under_voltage_now ? 'Under-voltage now' : 'OK') : '—'],
          ]} />
          {d.metrics_24h.length > 0 && <MiniTable rows={d.metrics_24h} />}
        </Section>

        <Section title="Radios">
          <Rows rows={[
            ['Bluetooth LE', radios.ble ? `${radios.ble.state ?? '—'}${radios.ble.devicesSeen != null ? ` · ${radios.ble.devicesSeen} devices heard` : ''}` : d.app_health?.ble ? `${d.app_health.ble.state ?? '—'}` : '—'],
            ['Wi-Fi', radios.wifi ? `${radios.wifi.present ? 'present' : 'absent'}${radios.wifi.connected ? ' · connected' : ''}${radios.wifi.rssi != null ? ` · ${radios.wifi.rssi} dBm` : ''}` : '—'],
            ['LoRaWAN', loraText(radios.lorawan)],
            ['RS-485', radios.rs485 ? (radios.rs485.present ? `${(radios.rs485.ports ?? []).length} port(s): ${(radios.rs485.ports ?? []).join(', ')}` : 'No adapter detected') : '—'],
          ]} />
          {radios.lorawan?.detected && <p className="mt-2 text-xs text-slate-500">LoRaWAN is reported as found. Updates never change the region or the network server&apos;s data.</p>}
        </Section>

        <Section title={`Connected devices (${d.sensors.length})`}>
          {d.sensors.length === 0 ? <p className="text-sm text-slate-500">No sensors on this gateway.</p> : (
            <ul className="divide-y divide-slate-100 text-sm">{d.sensors.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-2 py-1.5"><span className="min-w-0 truncate">{s.name} <span className="text-xs text-slate-500">· {s.sensor_type} · {s.model}</span></span>
                <span className="shrink-0 text-xs text-slate-500">{s.connection_state} · {ago(s.last_seen)}</span></li>))}</ul>
          )}
        </Section>
      </div>

      <Section title="Updates">
        {d.updates.length === 0 ? <p className="text-sm text-slate-500">No update has targeted this gateway.</p> : (
          <ul className="divide-y divide-slate-100 text-sm">{d.updates.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <Link href={`/admin/fleet/deployments/${t.deployment_id}`} className="font-semibold text-blue-800">{t.deployment_name} · {t.version}</Link>
              <span className="flex items-center gap-2"><Badge tone={targetTone(t.status)}>{TARGET_LABEL[t.status]}{t.progress != null && t.status === 'DOWNLOADING' ? ` ${t.progress}%` : ''}</Badge><span className="text-xs text-slate-500">{ago(t.updated_at)}</span></span>
              {t.error && <p className="w-full text-xs text-rose-700">{t.error}</p>}
            </li>))}</ul>
        )}
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Alerts">
          {d.alerts.length === 0 ? <p className="text-sm text-slate-500">No alerts.</p> : (
            <ul className="divide-y divide-slate-100 text-sm">{d.alerts.map((a) => (
              <li key={a.id} className="py-1.5"><span className="font-medium">{a.message}</span> <span className="text-xs text-slate-500">· {a.severity} · {a.status} · {ago(a.opened_at)}</span></li>))}</ul>
          )}
        </Section>
        <Section title="Remote actions">
          {d.commands.length === 0 ? <p className="text-sm text-slate-500">None yet.</p> : (
            <ul className="divide-y divide-slate-100 text-sm">{d.commands.map((c) => (
              <li key={c.id} className="py-1.5">
                <div className="flex justify-between gap-2"><span className="font-medium">{COMMAND_LABEL[c.type] ?? c.type}</span><span className="text-xs">{c.status}</span></div>
                <div className="text-xs text-slate-500">by {c.issued_by_email ?? 'system'} · asked {when(c.created_at)}{c.acked_at ? ` · acknowledged ${when(c.acked_at)}` : ''}{c.completed_at ? ` · done ${when(c.completed_at)}` : ''}</div>
                {c.error && <div className="text-xs text-rose-700">{c.error}</div>}
              </li>))}</ul>
          )}
        </Section>
      </div>

      <Section title="History">
        <ul className="divide-y divide-slate-100 text-sm">{d.history.map((h) => (
          <li key={h.id} className="flex flex-wrap justify-between gap-2 py-1.5"><span><Mono>{h.action}</Mono> {summarize(h.details)}</span><span className="text-xs text-slate-500">{h.actor_email ?? 'system'} · {when(h.at)}</span></li>))}</ul>
      </Section>

      {dialog?.kind === 'command' && (
        <ConfirmDialog title={`${COMMAND_LABEL[dialog.type]}: ${u.serial}`} danger={dialog.type === 'reboot' || dialog.type === 'rollback_app'}
          body={<><p>{COMMAND_WARNING[dialog.type] ?? 'The gateway picks this up at its next check-in (within about a minute) and reports the result.'}</p>
                 <p className="text-xs text-slate-500">The request expires if the gateway does not pick it up within 15 minutes. It runs at most once.</p></>}
          confirmLabel={COMMAND_LABEL[dialog.type]} typeToConfirm={dialog.type === 'reboot' || dialog.type === 'rollback_app' ? u.serial : undefined} reason={dialog.type === 'reboot' || dialog.type === 'restart_app' || dialog.type === 'rollback_app'}
          onClose={() => setDialog(null)}
          onConfirm={(reason) => run('fleet_command_create', { p_unit: u.id, p_type: dialog.type, p_reason: reason || null, p_idempotency_key: crypto.randomUUID() }, `${COMMAND_LABEL[dialog.type]}: sent`)} />
      )}
      {dialog?.kind === 'action' && <UnitActionDialog action={dialog.action} unit={u} onClose={() => setDialog(null)} run={run} />}
    </div>
  );
}

function UnitActionDialog({ action, unit: u, onClose, run }: { action: UnitAction; unit: GatewayDetailData['unit']; onClose: () => void; run: (fn: string, args: Json, done: string) => Promise<void> }) {
  if (action === 'assign') return <AssignDialog unit={u} onClose={onClose} run={run} />;
  if (action === 'provision_token') return <TokenDialog unit={u} onClose={onClose} />;
  const L: Record<Exclude<UnitAction, 'assign' | 'provision_token'>, { title: string; body: ReactNode; label: string; danger?: boolean; type?: boolean; reason?: boolean; go: (r: string) => Promise<void> }> = {
    unassign: { title: 'Unassign', body: 'The unit goes back to Ready, without a customer.', label: 'Unassign', reason: true, go: (r) => run('fleet_assign', { p_unit: u.id, p_site: null, p_reason: r }, 'Unassigned') },
    ship: { title: 'Mark shipped', body: 'Records that the unit left for the customer. It activates when it first connects at the customer, or when you activate it.', label: 'Mark shipped', reason: true, go: (r) => run('fleet_set_lifecycle', { p_unit: u.id, p_to: 'SHIPPED', p_reason: r }, 'Marked shipped') },
    activate: { title: 'Activate', body: `Attaches the gateway to ${u.organization_name ?? 'its customer'} / ${u.site_name ?? 'its site'}. The customer then sees it and its readings in their dashboard.`, label: 'Activate', go: () => run('fleet_activate', { p_unit: u.id }, 'Activated') },
    maintenance: { title: 'Maintenance mode', body: 'Alerts for this unit are held and it receives no updates until maintenance ends. Customer data keeps flowing.', label: 'Start maintenance', reason: true, go: (r) => run('fleet_set_lifecycle', { p_unit: u.id, p_to: 'MAINTENANCE', p_reason: r }, 'In maintenance') },
    end_maintenance: { title: 'End maintenance', body: `The unit returns to ${LIFECYCLE_LABEL[(u.previous_lifecycle ?? 'ACTIVATED') as Lifecycle]}.`, label: 'End maintenance', reason: true, go: (r) => run('fleet_set_lifecycle', { p_unit: u.id, p_to: u.previous_lifecycle ?? 'ACTIVATED', p_reason: r }, 'Maintenance ended') },
    suspend: { title: 'Suspend', body: 'The gateway is refused at sign-in until resumed: no data flows and the customer sees it offline.', label: 'Suspend', danger: true, type: true, reason: true, go: (r) => run('fleet_set_lifecycle', { p_unit: u.id, p_to: 'SUSPENDED', p_reason: r }, 'Suspended') },
    resume: { title: 'Resume', body: 'The gateway may sign in and send data again.', label: 'Resume', reason: true, go: (r) => run('fleet_set_lifecycle', { p_unit: u.id, p_to: 'ACTIVATED', p_reason: r }, 'Resumed') },
    transfer: { title: 'Transfer to another customer', body: <><p>Every key of this device is revoked and its identity is retired: it can no longer sign in or send data. Its history stays with the current customer.</p><p>The unit returns to Inventory. To use it again, provision it with a new token (it gets a new identity, so the next customer never sees the previous one&apos;s data, and its local queue is wiped).</p></>, label: 'Transfer', danger: true, type: true, reason: true, go: (r) => run('fleet_release_unit', { p_unit: u.id, p_action: 'transfer', p_reason: r }, 'Transferred: credentials revoked') },
    retire: { title: 'Retire', body: 'Keys revoked, identity retired, and the unit can never be used again. History is kept.', label: 'Retire', danger: true, type: true, reason: true, go: (r) => run('fleet_release_unit', { p_unit: u.id, p_action: 'retire', p_reason: r }, 'Retired') },
  };
  const c = L[action as Exclude<UnitAction, 'assign' | 'provision_token'>];
  return <ConfirmDialog title={`${c.title}: ${u.serial}`} body={c.body} confirmLabel={c.label} danger={c.danger} typeToConfirm={c.type ? u.serial : undefined} reason={c.reason} onClose={onClose} onConfirm={c.go} />;
}

function AssignDialog({ unit: u, onClose, run }: { unit: GatewayDetailData['unit']; onClose: () => void; run: (fn: string, args: Json, done: string) => Promise<void> }) {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [org, setOrg] = useState(u.organization_id ?? '');
  const [site, setSite] = useState(u.site_id ?? '');
  const [reason, setReason] = useState('');
  const [err, setErr] = useState<string | null>(null);
  usePoll(async () => { if (!customers) setCustomers(await fleetCall<Customer[]>('fleet_customers').catch((e) => { setErr(e.message); return []; })); }, 600000);
  const sites = customers?.find((c) => c.id === org)?.sites ?? [];
  return (
    <Dialog title={`Assign ${u.serial}`} onClose={onClose}>
      {!customers ? <Spinner /> : (
        <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); try { await run('fleet_assign', { p_unit: u.id, p_site: site, p_reason: reason || null }, 'Assigned'); onClose(); } catch (x) { setErr(x instanceof Error ? x.message : String(x)); } }}>
          <label className="block text-sm font-medium">Customer<select required className={`${INPUT} mt-1`} value={org} onChange={(e) => { setOrg(e.target.value); setSite(''); }}>
            <option value="">Choose…</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}{c.status !== 'active' ? ` (${c.status})` : ''}</option>)}</select></label>
          <label className="block text-sm font-medium">Site<select required className={`${INPUT} mt-1`} value={site} onChange={(e) => setSite(e.target.value)} disabled={!org}>
            <option value="">Choose…</option>{sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
          <label className="block text-sm font-medium">Reason or order number (optional)<input className={`${INPUT} mt-1`} value={reason} onChange={(e) => setReason(e.target.value)} maxLength={200} /></label>
          <p className="text-xs text-slate-500">The customer sees the gateway only after it is activated.</p>
          {err && <p role="alert" className="text-sm text-rose-600">{err}</p>}
          <div className="flex justify-end gap-2"><button type="button" className={BTN_QUIET} onClick={onClose}>Cancel</button><button type="submit" className={BTN}>Assign</button></div>
        </form>
      )}
    </Dialog>
  );
}

/** A one-time provisioning token, shown once; only its hash is stored. */
export function TokenDialog({ unit, onClose }: { unit: { id: string; serial: string }; onClose: () => void }) {
  const { act } = useFleet();
  const [minutes, setMinutes] = useState(60);
  const [tok, setTok] = useState<{ token: string; expires_at: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  return (
    <Dialog title={`Provisioning token: ${unit.serial}`} onClose={onClose}>
      {!tok ? (
        <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); try { setTok(await act(() => fleetCall('fleet_provisioning_token_create', { p_unit: unit.id, p_minutes: minutes }))); } catch (x) { setErr(x instanceof Error ? x.message : String(x)); } }}>
          <p className="text-sm text-slate-700">Creates a one-time token for the factory step on this unit. It works once, for this serial only, and expires. Creating a new one revokes the previous one.</p>
          <label className="block text-sm font-medium">Valid for<select className={`${INPUT} mt-1`} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
            {[15, 60, 240, 1440].map((m) => <option key={m} value={m}>{m < 60 ? `${m} minutes` : `${m / 60} hour${m === 60 ? '' : 's'}`}</option>)}</select></label>
          {err && <p role="alert" className="text-sm text-rose-600">{err}</p>}
          <div className="flex justify-end gap-2"><button type="button" className={BTN_QUIET} onClick={onClose}>Cancel</button><button type="submit" className={BTN}>Create token</button></div>
        </form>
      ) : (
        <div className="space-y-3 text-sm">
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-amber-900 ring-1 ring-amber-200">Shown only now. It expires {when(tok.expires_at)}.</p>
          <div className="flex items-center gap-2"><code className="min-w-0 flex-1 break-all rounded-lg bg-slate-100 px-3 py-2 font-mono">{tok.token}</code>
            <button type="button" className={`${BTN_QUIET} !h-10`} onClick={async () => { await navigator.clipboard.writeText(tok.token); setCopied(true); }}><Copy className="h-4 w-4" aria-hidden="true" />{copied ? 'Copied' : 'Copy'}</button></div>
          <p>On the gateway (factory step):</p>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">vexa-edge fleet provision {unit.serial}{'\n'}# paste the token when asked (it is never put on the command line){'\n'}# then: vexa-edge fleet report</pre>
          <div className="flex justify-end"><button type="button" className={BTN} onClick={onClose}>Done</button></div>
        </div>
      )}
    </Dialog>
  );
}

function ProvisioningReport({ r }: { r: Json }) {
  return (
    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs ring-1 ring-slate-200">
      <h3 className="text-sm font-semibold">Provisioning report</h3>
      <dl className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1">
        <dt className="text-slate-500">At</dt><dd>{when(r.created_at)}</dd>
        <dt className="text-slate-500">Software</dt><dd>{r.report?.softwareVersion ?? '—'}</dd>
        <dt className="text-slate-500">Fingerprint</dt><dd className="break-all font-mono">{r.fingerprint ?? '—'}</dd>
        <dt className="text-slate-500">Connectivity</dt><dd>{r.report?.connectivity?.ok ? 'passed' : 'failed'}{r.report?.connectivity?.latencyMs != null ? ` · ${r.report.connectivity.latencyMs} ms` : ''}</dd>
        <dt className="text-slate-500">Test heartbeat</dt><dd>{r.heartbeat_ok ? 'received' : 'not received'}</dd>
        <dt className="text-slate-500">Ready</dt><dd className={r.ready ? 'font-semibold text-emerald-700' : 'font-semibold text-rose-700'}>{r.ready ? 'yes' : `no: ${(r.problems ?? []).join(', ')}`}</dd>
      </dl>
    </div>
  );
}

function MiniTable({ rows }: { rows: GatewayDetailData['metrics_24h'] }) {
  return (
    <details className="mt-3 text-xs"><summary className="cursor-pointer font-semibold text-blue-700">Last 24 hours, hourly</summary>
      <div className="mt-2 max-h-56 overflow-y-auto"><table className="w-full text-left">
        <thead className="text-slate-500"><tr><th scope="col">Hour</th><th scope="col">CPU avg</th><th scope="col">Mem max</th><th scope="col">Temp max</th><th scope="col">Disk free min</th></tr></thead>
        <tbody>{rows.map((m) => <tr key={m.hour}><td>{new Date(m.hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td><td>{pctOr(m.cpu_avg)}</td><td>{pctOr(m.mem_max)}</td><td>{m.temp_max != null ? `${Math.round(m.temp_max)} °C` : '—'}</td><td>{pctOr(m.disk_free_min)}</td></tr>)}</tbody>
      </table></div></details>
  );
}

const Mono = ({ children }: { children: ReactNode }) => <span className="font-mono text-xs">{children}</span>;
function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className={CARD} aria-label={title}><h2 className="mb-2 text-sm font-semibold">{title}</h2>{children}</section>;
}
function Rows({ rows }: { rows: [string, ReactNode][] }) {
  return <dl className="grid grid-cols-[minmax(0,40%)_1fr] gap-x-3 gap-y-1.5 text-sm">{rows.map(([k, v]) => <div key={k} className="contents"><dt className="text-slate-500">{k}</dt><dd className="min-w-0 break-words">{v ?? '—'}</dd></div>)}</dl>;
}
const pctOr = (v: unknown) => (typeof v === 'number' ? `${Math.round(v)} %` : '—');
function fmtUptime(s: unknown): string {
  if (typeof s !== 'number') return '—';
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  return d ? `up ${d} d ${h} h` : h ? `up ${h} h ${m} min` : `up ${m} min`;
}
function loraText(l: Json | undefined): string {
  if (!l) return '—';
  if (!l.detected) return 'Not detected';
  const parts = [l.hardware ?? 'concentrator', l.stack && l.stack !== 'none' ? l.stack : 'no software found', l.service ? `service ${l.service}` : null,
    l.region ? `region ${l.region}` : null, l.networkServer ? `network server ${l.networkServer}` : null, l.uplinks24h != null ? `${l.uplinks24h} uplinks/24 h` : null];
  return parts.filter(Boolean).join(' · ');
}
function summarize(d: Json): string {
  const keys = Object.entries(d ?? {}).filter(([, v]) => v !== null && v !== '' && typeof v !== 'object').slice(0, 4);
  return keys.length ? `(${keys.map(([k, v]) => `${k}: ${v}`).join(', ')})` : '';
}
