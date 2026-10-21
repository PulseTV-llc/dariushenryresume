'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FolderPlus, RefreshCw, Rocket, Search } from 'lucide-react';
import { fleetCall } from '@/lib/fleet/client';
import { ago, filterFromParams, filterToParams, LIFECYCLE_LABEL, UPDATE_LABEL, type InventoryFilter } from '@/lib/fleet/logic';
import type { FilterOptions, Lifecycle, Page, UnitRow, UpdateState } from '@/lib/fleet/types';
import { useFleet } from './FleetShell';
import { BTN_QUIET, CARD, Dialog, Empty, ErrorBox, HealthBadge, INPUT, PageHeader, Pager, SELECT, SimBadge, Spinner, usePoll, BTN } from './ui';

const LIMIT = 50;

export default function Gateways() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { can, act, toast } = useFleet();
  const filter = useMemo(() => filterFromParams(new URLSearchParams(params?.toString() ?? '')), [params]);
  const offset = Number(params?.get('offset') ?? 0) || 0;
  const sort = params?.get('sort') ?? 'serial';
  const [page, setPage] = useState<Page<UnitRow> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [opts, setOpts] = useState<FilterOptions | null>(null);
  const [q, setQ] = useState(filter.q ?? '');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [groupDialog, setGroupDialog] = useState(false);

  useEffect(() => { fleetCall<FilterOptions>('fleet_filter_options').then(setOpts).catch(() => {}); }, []);
  const load = useCallback(async () => {
    try { setPage(await fleetCall<Page<UnitRow>>('fleet_gateways', { p_filter: filter, p_limit: LIMIT, p_offset: offset, p_sort: sort })); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [filter, offset, sort]);
  usePoll(load, 15000, [load]);

  const setFilter = (f: InventoryFilter, keepOffset = false) => {
    const p = filterToParams(f);
    if (sort !== 'serial') p.set('sort', sort);
    if (keepOffset && offset) p.set('offset', String(offset));
    router.replace(`${pathname}${p.toString() ? `?${p}` : ''}`);
    setSelected(new Set());
  };
  const setParam = (k: string, v: string) => {
    const p = new URLSearchParams(params?.toString() ?? '');
    if (v) p.set(k, v); else p.delete(k);
    if (k !== 'offset') p.delete('offset');
    router.replace(`${pathname}?${p}`);
  };
  const upd = (k: keyof InventoryFilter, v: string) => setFilter({ ...filter, [k]: v || undefined });

  const rows = page?.rows ?? [];
  const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <div>
      <PageHeader title="Gateways" subtitle="Every registered unit. Filters stay in the address, so a view can be shared.">
        <button type="button" onClick={() => void load()} className={`${BTN_QUIET} !h-10`}><RefreshCw className="h-4 w-4" aria-hidden="true" />Refresh</button>
        {can('register') && <Link href="/admin/fleet/register" className={`${BTN} !h-10`}>Register gateway</Link>}
      </PageHeader>

      <form role="search" className={`${CARD} mb-3 space-y-3`} onSubmit={(e) => { e.preventDefault(); upd('q', q.trim()); }}>
        <div className="flex gap-2">
          <label className="relative flex-1"><span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Serial, gateway id, name, customer or site" className={`${INPUT} pl-9`} />
          </label>
          <button type="submit" className={BTN_QUIET}>Search</button>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Sel label="Connection" value={filter.health} onChange={(v) => upd('health', v)} options={[['ONLINE', 'Online'], ['OFFLINE', 'Offline'], ['DEGRADED', 'Degraded'], ['UNKNOWN', 'Not reporting']]} />
          <Sel label="Lifecycle" value={filter.lifecycle} onChange={(v) => upd('lifecycle', v)} options={Object.entries(LIFECYCLE_LABEL)} />
          <Sel label="Update" value={filter.update_state} onChange={(v) => upd('update_state', v)} options={Object.entries(UPDATE_LABEL)} />
          <Sel label="Model" value={filter.model} onChange={(v) => upd('model', v)} options={(opts?.models ?? []).map((m) => [m, m])} />
          <Sel label="Version" value={filter.version} onChange={(v) => upd('version', v)} options={(opts?.versions ?? []).map((m) => [m, m])} />
          <Sel label="Customer" value={filter.organization_id} onChange={(v) => upd('organization_id', v)} options={(opts?.organizations ?? []).map((o) => [o.id, o.name])} />
          <Sel label="Country" value={filter.country} onChange={(v) => upd('country', v)} options={(opts?.countries ?? []).map((m) => [m, m])} />
          <Sel label="Group" value={filter.group_id} onChange={(v) => upd('group_id', v)} options={(opts?.groups ?? []).map((g) => [g.id, g.name])} />
          <Sel label="Simulated" value={filter.simulated} onChange={(v) => upd('simulated', v)} options={[['include', 'Include'], ['only', 'Only simulated']]} placeholder="Real only" />
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4" checked={!!filter.unassigned} onChange={(e) => setFilter({ ...filter, unassigned: e.target.checked || undefined })} />Unassigned</label>
          <Sel label="Sort" value={sort === 'serial' ? '' : sort} onChange={(v) => setParam('sort', v)} options={[['last_seen', 'Last seen'], ['lifecycle', 'Lifecycle'], ['version', 'Version'], ['customer', 'Customer']]} placeholder="Serial" />
          {(Object.keys(filter).length > 0) && <button type="button" className="font-semibold text-blue-700" onClick={() => { setQ(''); setFilter({}); }}>Clear filters</button>}
        </div>
      </form>

      {selected.size > 0 && (
        <div className="sticky top-16 z-10 mb-3 flex flex-wrap items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm text-white" role="region" aria-label="Selection">
          <span className="font-semibold">{selected.size} selected</span>
          {can('register') && <button type="button" onClick={() => setGroupDialog(true)} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 font-semibold hover:bg-white/25"><FolderPlus className="h-4 w-4" aria-hidden="true" />Add to group</button>}
          {can('deploy') && <Link href={`/admin/fleet/deployments/new?units=${[...selected].join(',')}`} className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 font-semibold hover:bg-white/25"><Rocket className="h-4 w-4" aria-hidden="true" />Deploy an update</Link>}
          <button type="button" onClick={() => setSelected(new Set())} className="ml-auto underline">Clear</button>
        </div>
      )}

      {error && <div className="mb-3"><ErrorBox error={error} onRetry={() => void load()} /></div>}
      {!page ? <Spinner /> : rows.length === 0 ? <Empty>No gateways match.{can('register') && <> <Link className="font-semibold text-blue-700" href="/admin/fleet/register">Register one</Link>.</>}</Empty> : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[960px] text-left text-sm">
            <caption className="sr-only">Gateways, page {Math.floor(offset / LIMIT) + 1}</caption>
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="w-10 px-3 py-2"><input type="checkbox" className="h-4 w-4" aria-label="Select all on this page" checked={allOnPage}
                  onChange={() => setSelected((s) => { const n = new Set(s); rows.forEach((r) => (allOnPage ? n.delete(r.id) : n.add(r.id))); return n; })} /></th>
                <th scope="col" className="px-3 py-2">Serial</th><th scope="col" className="px-3 py-2">Model</th><th scope="col" className="px-3 py-2">Customer</th>
                <th scope="col" className="px-3 py-2">Location</th><th scope="col" className="px-3 py-2">Version</th><th scope="col" className="px-3 py-2">Connection</th>
                <th scope="col" className="px-3 py-2">Last seen</th><th scope="col" className="px-3 py-2">Update</th><th scope="col" className="px-3 py-2"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className={selected.has(r.id) ? 'bg-blue-50/60' : 'hover:bg-slate-50'}>
                  <td className="px-3 py-2"><input type="checkbox" className="h-4 w-4" aria-label={`Select ${r.serial}`} checked={selected.has(r.id)} onChange={() => toggle(r.id)} /></td>
                  <td className="px-3 py-2"><Link href={`/admin/fleet/gateways/${r.id}`} className="font-mono font-semibold text-blue-800 hover:underline">{r.serial}</Link>
                    <div className="flex items-center gap-1 text-xs text-slate-500">{LIFECYCLE_LABEL[r.lifecycle as Lifecycle]}{r.is_simulated && <SimBadge />}</div></td>
                  <td className="px-3 py-2">{r.model}{r.hardware_revision && <span className="text-xs text-slate-500"> · rev {r.hardware_revision}</span>}</td>
                  <td className="px-3 py-2">{r.organization_name ?? <span className="text-slate-400">Unassigned</span>}</td>
                  <td className="px-3 py-2">{r.site_name ?? '—'}{r.country && <span className="text-xs text-slate-500"> · {r.country}</span>}</td>
                  <td className="px-3 py-2 font-mono text-xs">{r.app_version ?? '—'}</td>
                  <td className="px-3 py-2"><HealthBadge health={r.health} reasons={r.health_reasons} /></td>
                  <td className="px-3 py-2 text-xs text-slate-600" title={r.last_contact_at ?? ''}>{ago(r.last_contact_at)}</td>
                  <td className="px-3 py-2 text-xs">{UPDATE_LABEL[r.update_state as UpdateState]}</td>
                  <td className="px-3 py-2 text-right"><Link href={`/admin/fleet/gateways/${r.id}`} className="text-sm font-semibold text-blue-700">Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {page && <Pager total={page.total} limit={page.limit} offset={page.offset} onPage={(o) => setParam('offset', o ? String(o) : '')} />}
      {groupDialog && <AddToGroup ids={[...selected]} groups={opts?.groups ?? []} onClose={() => setGroupDialog(false)}
        onDone={async (gid) => { await act(() => fleetCall('fleet_group_members_set', { p_group: gid, p_add: [...selected] })); toast(`${selected.size} added to the group`); setSelected(new Set()); }} />}
    </div>
  );
}

function Sel({ label, value, onChange, options, placeholder = 'Any' }: { label: string; value?: string; onChange: (v: string) => void; options: (string[] | [string, string])[]; placeholder?: string }) {
  return (
    <label className="flex items-center gap-1"><span className="text-slate-600">{label}</span>
      <select className={SELECT} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

function AddToGroup({ ids, groups, onClose, onDone }: { ids: string[]; groups: { id: string; name: string }[]; onClose: () => void; onDone: (gid: string) => Promise<void> }) {
  const [gid, setGid] = useState(groups[0]?.id ?? '');
  const [err, setErr] = useState<string | null>(null);
  return (
    <Dialog title={`Add ${ids.length} gateway${ids.length === 1 ? '' : 's'} to a group`} onClose={onClose}>
      {groups.length === 0 ? <p className="text-sm">No groups yet. <Link href="/admin/fleet/groups" className="font-semibold text-blue-700">Create one</Link> first.</p> : (
        <form className="space-y-3" onSubmit={async (e) => { e.preventDefault(); try { await onDone(gid); onClose(); } catch (x) { setErr(x instanceof Error ? x.message : String(x)); } }}>
          <label className="block text-sm font-medium">Group<select className={`${INPUT} mt-1`} value={gid} onChange={(e) => setGid(e.target.value)}>{groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></label>
          {err && <p role="alert" className="text-sm text-rose-600">{err}</p>}
          <div className="flex justify-end gap-2"><button type="button" className={BTN_QUIET} onClick={onClose}>Cancel</button><button type="submit" className={BTN}>Add</button></div>
        </form>
      )}
    </Dialog>
  );
}
