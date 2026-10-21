'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fleetCall } from '@/lib/fleet/client';
import { when } from '@/lib/fleet/logic';
import { useFleet } from './FleetShell';
import { BTN, BTN_QUIET, CARD, ConfirmDialog, Empty, ErrorBox, INPUT, PageHeader, Spinner, useLoad } from './ui';

interface Group { id: string; name: string; description: string | null; members: number; created_at: string }

export default function Groups() {
  const { can, act, toast } = useFleet();
  const { data, error, reload } = useLoad(() => fleetCall<Group[]>('fleet_groups'));
  const [edit, setEdit] = useState<{ id: string | null; name: string; description: string } | null>(null);
  const [del, setDel] = useState<Group | null>(null);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="max-w-4xl">
      <PageHeader title="Gateway groups" subtitle="Named sets of gateways, for staged rollouts (e.g. Canary) and filters. Add gateways from the Gateways list (select, then Add to group).">
        {can('register') && <button type="button" className={BTN} onClick={() => setEdit({ id: null, name: '', description: '' })}>New group</button>}
      </PageHeader>
      {error && <ErrorBox error={error} onRetry={reload} />}
      {!data ? <Spinner /> : data.length === 0 ? <Empty>No groups yet.</Empty> : (
        <ul className="space-y-2">{data.map((g) => (
          <li key={g.id} className={`${CARD} flex flex-wrap items-center justify-between gap-3`}>
            <div className="min-w-0"><Link href={`/admin/fleet/gateways?group_id=${g.id}&simulated=include`} className="font-semibold text-blue-800">{g.name}</Link>
              <p className="text-sm text-slate-600">{g.members} gateway{g.members === 1 ? '' : 's'}{g.description ? ` · ${g.description}` : ''} · created {when(g.created_at)}</p></div>
            {can('register') && <div className="flex gap-2"><button type="button" className={`${BTN_QUIET} !h-9`} onClick={() => setEdit({ id: g.id, name: g.name, description: g.description ?? '' })}>Edit</button>
              <button type="button" className={`${BTN_QUIET} !h-9`} onClick={() => setDel(g)}>Delete</button></div>}
          </li>))}</ul>
      )}
      {edit && (
        <form className={`${CARD} mt-4 space-y-3`} onSubmit={async (e) => {
          e.preventDefault(); setErr(null);
          try { await act(() => fleetCall('fleet_group_save', { p_id: edit.id, p_name: edit.name, p_description: edit.description || null })); toast('Group saved'); setEdit(null); reload(); }
          catch (x) { setErr(x instanceof Error ? x.message : String(x)); }
        }}>
          <h2 className="text-sm font-semibold">{edit.id ? 'Edit group' : 'New group'}</h2>
          <label className="block text-sm font-medium">Name<input required maxLength={80} className={`${INPUT} mt-1`} value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></label>
          <label className="block text-sm font-medium">Description<input maxLength={500} className={`${INPUT} mt-1`} value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} /></label>
          {err && <p role="alert" className="text-sm text-rose-600">{err}</p>}
          <div className="flex gap-2"><button type="submit" className={BTN}>Save</button><button type="button" className={BTN_QUIET} onClick={() => setEdit(null)}>Cancel</button></div>
        </form>
      )}
      {del && <ConfirmDialog title={`Delete ${del.name}?`} body="The gateways stay; only the group goes. Past deployments keep their list of gateways." confirmLabel="Delete" danger
        onClose={() => setDel(null)} onConfirm={async () => { await act(() => fleetCall('fleet_group_delete', { p_id: del.id })); toast('Group deleted'); reload(); }} />}
    </div>
  );
}
