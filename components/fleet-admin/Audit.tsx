'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fleetCall } from '@/lib/fleet/client';
import { when } from '@/lib/fleet/logic';
import { BTN_QUIET, CARD, Empty, ErrorBox, INPUT, PageHeader, Pager, Spinner, useLoad } from './ui';

interface AuditRow { id: string; at: string; actor_email: string | null; actor_role: string | null; action: string; unit_id: string | null; serial: string | null; target: string | null; details: Record<string, unknown> }
const LIMIT = 100;

export default function Audit() {
  const [filter, setFilter] = useState({ action: '', actor: '', serial: '' });
  const [applied, setApplied] = useState(filter);
  const [offset, setOffset] = useState(0);
  const { data, error, reload } = useLoad(() => fleetCall<{ total: number; rows: AuditRow[] }>('fleet_audit_list', {
    p_filter: Object.fromEntries(Object.entries(applied).filter(([, v]) => v)), p_limit: LIMIT, p_offset: offset }), [applied, offset]);
  return (
    <div>
      <PageHeader title="Audit log" subtitle="Every fleet action: who, what, when. It cannot be edited or deleted (the database refuses)." />
      <form className={`${CARD} mb-3 flex flex-wrap items-end gap-2`} onSubmit={(e) => { e.preventDefault(); setOffset(0); setApplied(filter); }}>
        <label className="text-sm font-medium">Action starts with<input className={`${INPUT} mt-1 !h-10`} value={filter.action} onChange={(e) => setFilter({ ...filter, action: e.target.value })} placeholder="unit. / command. / deployment." /></label>
        <label className="text-sm font-medium">Person<input className={`${INPUT} mt-1 !h-10`} value={filter.actor} onChange={(e) => setFilter({ ...filter, actor: e.target.value })} /></label>
        <label className="text-sm font-medium">Serial<input className={`${INPUT} mt-1 !h-10`} value={filter.serial} onChange={(e) => setFilter({ ...filter, serial: e.target.value })} /></label>
        <button type="submit" className={`${BTN_QUIET} !h-10`}>Filter</button>
      </form>
      {error && <ErrorBox error={error} onRetry={reload} />}
      {!data ? <Spinner /> : data.rows.length === 0 ? <Empty>Nothing recorded yet.</Empty> : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th scope="col" className="px-3 py-2">When</th><th scope="col" className="px-3 py-2">Who</th><th scope="col" className="px-3 py-2">Action</th><th scope="col" className="px-3 py-2">Unit</th><th scope="col" className="px-3 py-2">Details</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{data.rows.map((r) => (
              <tr key={r.id}><td className="whitespace-nowrap px-3 py-2 text-xs">{when(r.at)}</td><td className="px-3 py-2 text-xs">{r.actor_email ?? 'system / gateway'}{r.actor_role && <div className="text-slate-500">{r.actor_role}</div>}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.action}</td>
                <td className="px-3 py-2 font-mono text-xs">{r.unit_id && r.serial ? <Link className="text-blue-800" href={`/admin/fleet/gateways/${r.unit_id}`}>{r.serial}</Link> : r.target ?? '—'}</td>
                <td className="max-w-md px-3 py-2"><code className="block truncate text-xs text-slate-600" title={JSON.stringify(r.details)}>{JSON.stringify(r.details)}</code></td></tr>))}</tbody>
          </table>
        </div>
      )}
      {data && <Pager total={data.total} limit={LIMIT} offset={offset} onPage={setOffset} />}
    </div>
  );
}
