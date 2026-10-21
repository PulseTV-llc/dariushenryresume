'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { fleetCall } from '@/lib/fleet/client';
import { useFleet } from './FleetShell';
import { TokenDialog } from './GatewayDetail';
import { BTN, CARD, INPUT, PageHeader } from './ui';

const FIELDS = 'model hardware_revision compute_module batch assembled_at country timezone update_channel connectivity_method warranty_until notes serial'.split(' ');

export default function Register() {
  const { can, act, toast } = useFleet();
  const [form, setForm] = useState<Record<string, string>>({ model: 'VexaOs Edge Gateway', update_channel: 'STABLE', connectivity_method: 'ethernet' });
  const [count, setCount] = useState(1);
  const [sim, setSim] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string; serial: string }[] | null>(null);
  const [token, setToken] = useState<{ id: string; serial: string } | null>(null);
  if (!can('register')) return <p className="text-sm text-slate-600">Your fleet role cannot register gateways.</p>;
  const f = (k: string) => ({ value: form[k] ?? '', onChange: (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="max-w-3xl">
      <PageHeader title="Register gateway" subtitle="Adds units to inventory with the next serial numbers. A serial identifies a unit; it is never a password or credential." />
      <form className={`${CARD} space-y-4`} onSubmit={async (e) => {
        e.preventDefault(); setBusy(true); setError(null);
        try {
          const unit = Object.fromEntries(FIELDS.map((k) => [k, (form[k] ?? '').trim()]).filter(([, v]) => v));
          const res = await act(() => fleetCall<{ id: string; serial: string }[]>('fleet_register_units', { p_unit: { ...unit, is_simulated: sim }, p_count: form.serial ? 1 : count }));
          setDone(res); toast(`${res.length} registered`);
        } catch (x) { setError(x instanceof Error ? x.message : String(x)); } finally { setBusy(false); }
      }}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">Model<input required className={`${INPUT} mt-1`} {...f('model')} maxLength={80} /></label>
          <label className="text-sm font-medium">Hardware revision<input className={`${INPUT} mt-1`} {...f('hardware_revision')} placeholder="e.g. A1" pattern="[A-Za-z0-9._\-]{1,16}" /></label>
          <label className="text-sm font-medium">Compute module (internal)<input className={`${INPUT} mt-1`} {...f('compute_module')} placeholder="e.g. board and memory size" maxLength={80} /></label>
          <label className="text-sm font-medium">Batch<input className={`${INPUT} mt-1`} {...f('batch')} placeholder="e.g. B-2026-11" maxLength={40} /></label>
          <label className="text-sm font-medium">Assembled on<input type="date" className={`${INPUT} mt-1`} {...f('assembled_at')} /></label>
          <label className="text-sm font-medium">Warranty until<input type="date" className={`${INPUT} mt-1`} {...f('warranty_until')} /></label>
          <label className="text-sm font-medium">Country (2 letters)<input className={`${INPUT} mt-1 uppercase`} {...f('country')} maxLength={2} pattern="[A-Za-z]{2}" placeholder="US" /></label>
          <label className="text-sm font-medium">Time zone<input className={`${INPUT} mt-1`} {...f('timezone')} placeholder="America/New_York (else the site's)" /></label>
          <label className="text-sm font-medium">Update channel<select className={`${INPUT} mt-1`} {...f('update_channel')}><option>STABLE</option><option>BETA</option><option>DEVELOPMENT</option></select></label>
          <label className="text-sm font-medium">Connectivity<select className={`${INPUT} mt-1`} {...f('connectivity_method')}><option value="ethernet">Ethernet</option><option value="wifi">Wi-Fi</option><option value="cellular">Cellular</option><option value="unknown">Unknown</option></select></label>
        </div>
        <label className="block text-sm font-medium">Notes<textarea className={`${INPUT} mt-1 h-20 py-2`} {...f('notes')} maxLength={2000} /></label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">How many units<input type="number" min={1} max={100} className={`${INPUT} mt-1`} value={count} disabled={!!form.serial} onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))} /></label>
          <label className="text-sm font-medium">Specific serial (optional, one unit)<input className={`${INPUT} mt-1 font-mono uppercase`} {...f('serial')} placeholder="VEX-GW-000123" pattern="[Vv][Ee][Xx]-[Gg][Ww]-[0-9]{6}" /></label>
        </div>
        <label className="flex items-start gap-2 rounded-xl bg-violet-50 p-3 text-sm ring-1 ring-violet-200"><input type="checkbox" className="mt-0.5 h-4 w-4" checked={sim} onChange={(e) => setSim(e.target.checked)} />
          <span><b>Simulated unit</b>: for the gateway simulator and tests. Shown with a SIMULATED badge and never counted with real hardware.</span></label>
        {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
        <button type="submit" disabled={busy} className={BTN}>{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Register {form.serial ? '1 unit' : `${count} unit${count === 1 ? '' : 's'}`}</button>
      </form>

      {done && (
        <section className={`${CARD} mt-4`} aria-label="Registered">
          <h2 className="text-sm font-semibold">Registered</h2>
          <p className="text-sm text-slate-600">Next: create a provisioning token for each unit and run the factory step on it (docs/fleet/factory-provisioning.md).</p>
          <ul className="mt-2 divide-y divide-slate-100 text-sm">{done.map((d) => (
            <li key={d.id} className="flex items-center justify-between py-2"><Link href={`/admin/fleet/gateways/${d.id}`} className="font-mono font-semibold text-blue-800">{d.serial}</Link>
              <button type="button" className="text-sm font-semibold text-blue-700" onClick={() => setToken(d)}>Provisioning token</button></li>))}</ul>
        </section>
      )}
      {token && <TokenDialog unit={token} onClose={() => setToken(null)} />}
    </div>
  );
}
