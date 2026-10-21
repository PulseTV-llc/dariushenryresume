'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Pause, Play, RotateCcw, XCircle } from 'lucide-react';
import { fleetCall } from '@/lib/fleet/client';
import { ago, pct, TARGET_CRITICAL, TARGET_LABEL, targetTone, when } from '@/lib/fleet/logic';
import type { DeploymentPreview, DeploymentRow, DeploymentSpec, ReleaseRow, Strategy, TargetRow, TargetStatus } from '@/lib/fleet/types';
import { useFleet } from './FleetShell';
import { Badge, BTN, BTN_DANGER, BTN_QUIET, CARD, ConfirmDialog, Empty, ErrorBox, INPUT, PageHeader, Pager, SELECT, Spinner, usePoll } from './ui';

const D_TONE: Record<string, string> = {
  SCHEDULED: 'bg-slate-100 text-slate-700 ring-slate-200', RUNNING: 'bg-blue-50 text-blue-800 ring-blue-200', PAUSED: 'bg-amber-50 text-amber-900 ring-amber-200',
  HALTED: 'bg-rose-50 text-rose-800 ring-rose-200', COMPLETED: 'bg-emerald-50 text-emerald-800 ring-emerald-200', CANCELLED: 'bg-slate-100 text-slate-700 ring-slate-200',
};

function Progress({ d }: { d: Pick<DeploymentRow, 'counts' | 'total'> }) {
  const c = d.counts;
  const ok = c.SUCCEEDED ?? 0, bad = (c.FAILED ?? 0) + (c.ROLLED_BACK ?? 0), cancelled = c.CANCELLED ?? 0;
  const busy = d.total - ok - bad - cancelled - (c.PENDING ?? 0) - (c.QUEUED ?? 0);
  return (
    <div>
      <div className="flex h-2 overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${ok} succeeded, ${bad} failed, ${busy} in progress of ${d.total}`}>
        <div className="bg-emerald-500" style={{ width: `${pct(ok, d.total)}%` }} /><div className="bg-rose-500" style={{ width: `${pct(bad, d.total)}%` }} />
        <div className="bg-blue-500" style={{ width: `${pct(Math.max(busy, 0), d.total)}%` }} />
      </div>
      <p className="mt-1 text-xs text-slate-600">{ok} succeeded · {bad} failed · {Math.max(busy, 0)} in progress · {(c.PENDING ?? 0) + (c.QUEUED ?? 0)} waiting{cancelled ? ` · ${cancelled} cancelled` : ''} · {d.total} total</p>
    </div>
  );
}

/** Active deployments (or, with history, all of them). */
export function DeploymentList({ history = false }: { history?: boolean }) {
  const { can } = useFleet();
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<{ total: number; rows: DeploymentRow[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    try {
      setData(await fleetCall('fleet_deployments', { p_filter: history ? {} : { status: 'SCHEDULED,RUNNING,PAUSED,HALTED' }, p_limit: 25, p_offset: offset }));
      setError(null);
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [history, offset]);
  usePoll(load, 15000, [load]);
  return (
    <div>
      <PageHeader title={history ? 'Deployment history' : 'OTA deployments'} subtitle={history ? 'Every deployment, newest first, with how each gateway fared.' : 'Running, scheduled, paused and halted deployments. Updates live while you watch.'}>
        {can('deploy') && <Link href="/admin/fleet/deployments/new" className={BTN}>New deployment</Link>}
      </PageHeader>
      {error && <ErrorBox error={error} onRetry={() => void load()} />}
      {!data ? <Spinner /> : data.rows.length === 0 ? <Empty>{history ? 'No deployments yet.' : 'Nothing is being deployed.'} {!history && <Link className="font-semibold text-blue-700" href="/admin/fleet/history">History</Link>}</Empty> : (
        <ul className="space-y-2">{data.rows.map((d) => (
          <li key={d.id} className={CARD}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div><Link href={`/admin/fleet/deployments/${d.id}`} className="font-semibold text-blue-800">{d.name}</Link>
                <p className="text-xs text-slate-600">{d.category} {d.version} · {d.strategy.type}{d.strategy.type === 'canary' ? ` (${d.strategy.canary_count ?? 1} first)` : ''} · by {d.created_by_email ?? '—'} · {when(d.created_at)}</p></div>
              <Badge tone={D_TONE[d.status] ?? D_TONE.SCHEDULED}>{d.status}</Badge>
            </div>
            {d.halted_reason && d.status === 'HALTED' && <p className="mt-1 text-xs text-rose-700">{d.halted_reason}</p>}
            <div className="mt-2"><Progress d={d} /></div>
          </li>))}</ul>
      )}
      {data && <Pager total={data.total} limit={25} offset={offset} onPage={setOffset} />}
    </div>
  );
}

export function NewDeployment() {
  const router = useRouter();
  const params = useSearchParams();
  const { can, act, toast } = useFleet();
  const [releases, setReleases] = useState<ReleaseRow[] | null>(null);
  const [groups, setGroups] = useState<{ id: string; name: string; members: number }[]>([]);
  const [spec, setSpec] = useState<DeploymentSpec>(() => ({
    release_id: params?.get('release') ?? '', unit_ids: params?.get('units')?.split(',').filter(Boolean) ?? [], group_ids: [],
    channel: null, strategy: { type: 'canary', canary_count: 1, wave_percent: 25, wave_interval_min: 30 },
  }));
  const [rate, setRate] = useState('0.2');
  const [windowOn, setWindowOn] = useState(false);
  const [win, setWin] = useState({ start: 1, end: 5 });
  const [startAt, setStartAt] = useState('');
  const [preview, setPreview] = useState<DeploymentPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    fleetCall<ReleaseRow[]>('fleet_releases', { p_filter: { status: 'APPROVED' } }).then((r) => { setReleases(r); if (!spec.release_id && r[0]) setSpec((s) => ({ ...s, release_id: r[0]!.id })); }).catch((e) => setError(e.message));
    fleetCall<{ id: string; name: string; members: number }[]>('fleet_groups').then(setGroups).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fullSpec = useMemo<DeploymentSpec & Record<string, unknown>>(() => ({
    ...spec, max_failure_rate: Number(rate),
    ...(windowOn ? { window_start_hour: win.start, window_end_hour: win.end } : {}),
    ...(startAt ? { start_at: new Date(startAt).toISOString() } : {}),
  }), [spec, rate, windowOn, win, startAt]);
  useEffect(() => {
    if (!spec.release_id) return;
    const t = setTimeout(() => {
      fleetCall<DeploymentPreview>('fleet_deployment_preview', { p_spec: fullSpec }).then((p) => { setPreview(p); setError(null); }).catch((e) => setError(e.message));
    }, 300);
    return () => clearTimeout(t);
  }, [fullSpec, spec.release_id]);

  if (!can('deploy')) return <p className="text-sm text-slate-600">Your fleet role cannot deploy updates.</p>;
  const st = spec.strategy;
  const setSt = (s: Partial<Strategy>) => setSpec({ ...spec, strategy: { ...st, ...s } });
  return (
    <div className="max-w-4xl space-y-4">
      <Link href="/admin/fleet/deployments" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Deployments</Link>
      <PageHeader title="New deployment" subtitle="Choose the release and the gateways, see exactly what would happen, then confirm." />
      {error && <ErrorBox error={error} />}
      <section className={`${CARD} space-y-3`} aria-label="What and where">
        <label className="block text-sm font-medium">Release (approved only)
          <select className={`${INPUT} mt-1`} value={spec.release_id} onChange={(e) => setSpec({ ...spec, release_id: e.target.value })}>
            {!releases?.length && <option value="">No approved release</option>}
            {releases?.map((r) => <option key={r.id} value={r.id}>{r.name} {r.version} ({r.category}, {r.channel})</option>)}
          </select></label>
        <fieldset className="space-y-2 text-sm"><legend className="font-medium">Gateways (any of)</legend>
          {spec.unit_ids && spec.unit_ids.length > 0 && <p>{spec.unit_ids.length} selected in the Gateways list <button type="button" className="text-blue-700 underline" onClick={() => setSpec({ ...spec, unit_ids: [] })}>clear</button></p>}
          <div className="flex flex-wrap gap-3">{groups.map((g) => (
            <label key={g.id} className="flex items-center gap-1"><input type="checkbox" className="h-4 w-4" checked={spec.group_ids?.includes(g.id) ?? false}
              onChange={(e) => setSpec({ ...spec, group_ids: e.target.checked ? [...(spec.group_ids ?? []), g.id] : (spec.group_ids ?? []).filter((x) => x !== g.id) })} />{g.name} ({g.members})</label>))}</div>
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4" checked={!!spec.simulated} onChange={(e) => setSpec({ ...spec, simulated: e.target.checked || undefined })} />Simulated units only (testing with the gateway simulator)</label>
          <label className="flex items-center gap-2">Every gateway on the channel
            <select className={SELECT} value={spec.channel ?? ''} onChange={(e) => setSpec({ ...spec, channel: (e.target.value || null) as DeploymentSpec['channel'] })}>
              <option value="">—</option><option>DEVELOPMENT</option><option>BETA</option><option>STABLE</option></select></label>
        </fieldset>
      </section>
      <section className={`${CARD} space-y-3`} aria-label="How">
        <fieldset className="flex flex-wrap gap-4 text-sm"><legend className="mb-1 font-medium">Strategy</legend>
          {(['canary', 'percentage', 'all'] as const).map((t) => <label key={t} className="flex items-center gap-1"><input type="radio" name="strategy" checked={st.type === t} onChange={() => setSt({ type: t })} />{t === 'canary' ? 'Canary first, then waves' : t === 'percentage' ? 'Waves only' : 'All at once'}</label>)}
        </fieldset>
        <div className="grid gap-3 sm:grid-cols-4">
          {st.type === 'canary' && <label className="text-sm font-medium">Canary gateways<input type="number" min={1} max={50} className={`${INPUT} mt-1`} value={st.canary_count ?? 1} onChange={(e) => setSt({ canary_count: Number(e.target.value) })} /></label>}
          {st.type !== 'all' && <label className="text-sm font-medium">Each wave (%)<input type="number" min={1} max={100} className={`${INPUT} mt-1`} value={st.wave_percent ?? 25} onChange={(e) => setSt({ wave_percent: Number(e.target.value) })} /></label>}
          {st.type !== 'all' && <label className="text-sm font-medium">Wait between waves (min)<input type="number" min={0} max={10080} className={`${INPUT} mt-1`} value={st.wave_interval_min ?? 30} onChange={(e) => setSt({ wave_interval_min: Number(e.target.value) })} /></label>}
          <label className="text-sm font-medium">Halt above failure rate<input inputMode="decimal" className={`${INPUT} mt-1`} value={rate} onChange={(e) => setRate(e.target.value)} /></label>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4" checked={windowOn} onChange={(e) => setWindowOn(e.target.checked)} />Only inside a maintenance window (the site&apos;s local time)</label>
        {windowOn && <div className="flex items-center gap-2 text-sm">from <input type="number" min={0} max={23} className={`${INPUT} !w-20`} value={win.start} onChange={(e) => setWin({ ...win, start: Number(e.target.value) })} aria-label="Window start hour" />:00 to <input type="number" min={0} max={23} className={`${INPUT} !w-20`} value={win.end} onChange={(e) => setWin({ ...win, end: Number(e.target.value) })} aria-label="Window end hour" />:00</div>}
        <label className="block text-sm font-medium">Start (empty = now)<input type="datetime-local" className={`${INPUT} mt-1 sm:!w-72`} value={startAt} onChange={(e) => setStartAt(e.target.value)} /></label>
      </section>
      <section className={CARD} aria-label="Preview" aria-live="polite">
        <h2 className="text-sm font-semibold">Preview</h2>
        {!preview ? <p className="text-sm text-slate-500">Choose a release and gateways.</p> : (
          <div className="mt-2 space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div><p className="text-xs text-slate-500">Selected</p><p className="text-xl font-bold">{preview.selected}</p></div>
              <div><p className="text-xs text-slate-500">Will update</p><p className="text-xl font-bold text-blue-700">{preview.compatible}</p></div>
              <div><p className="text-xs text-slate-500">Already on {preview.release.version}</p><p className="text-xl font-bold">{preview.already_current}</p></div>
              <div><p className="text-xs text-slate-500">Offline now</p><p className="text-xl font-bold">{preview.offline}</p></div>
            </div>
            <p>Current versions: {preview.by_current_version.map((b) => `${b.key} × ${b.count}`).join(' · ') || '—'}</p>
            <p>Waves: {preview.waves.map((w) => `${w.wave === 0 && st.type === 'canary' ? 'canary' : `wave ${w.wave}`}: ${w.count}`).join(' → ') || '—'}</p>
            <p>Artifact in storage: {preview.artifact_ready ? 'yes' : <b className="text-rose-700">missing</b>}</p>
            {preview.risks.length > 0 && <ul className="list-disc space-y-1 rounded-xl bg-amber-50 py-2 pl-6 pr-3 text-amber-900 ring-1 ring-amber-200">{preview.risks.map((r) => <li key={r}>{r}</li>)}</ul>}
            {preview.incompatible.length > 0 && <details><summary className="cursor-pointer font-semibold text-blue-700">{preview.incompatible.length} skipped (and why)</summary>
              <ul className="mt-1 max-h-48 overflow-y-auto text-xs">{preview.incompatible.map((i) => <li key={i.serial}><span className="font-mono">{i.serial}</span>: {i.reason}</li>)}</ul></details>}
          </div>
        )}
        <button type="button" className={`${BTN} mt-3`} disabled={!preview || preview.compatible === 0 || preview.release.status !== 'APPROVED' || !preview.artifact_ready} onClick={() => setConfirm(true)}>Review and confirm</button>
      </section>
      {confirm && preview && <ConfirmDialog title={`Deploy ${preview.release.version} to ${preview.compatible} gateway${preview.compatible === 1 ? '' : 's'}?`} confirmLabel="Start deployment" typeToConfirm="DEPLOY"
        body={<><p>{st.type === 'all' ? 'All at once.' : st.type === 'canary' ? `${st.canary_count ?? 1} canary gateway(s) first; the next wave starts only when they finished, then ${st.wave_percent}% at a time.` : `${st.wave_percent}% at a time.`} Halts by itself above {Math.round(Number(rate) * 100)}% failures.</p>
               <p>Each gateway checks the signature and checksum itself, keeps the previous version and rolls back by itself if its health checks fail. A gateway is marked succeeded only when the backend sees the new version running.</p>
               <p className="text-xs text-slate-500">Recorded in the audit log with your name.</p></>}
        onClose={() => setConfirm(false)}
        onConfirm={async () => { const id = await act(() => fleetCall<string>('fleet_deployment_create', { p_spec: fullSpec })); toast('Deployment created'); router.push(`/admin/fleet/deployments/${id}`); }} />}
    </div>
  );
}

interface DeploymentDetailData extends DeploymentRow { targets: (TargetRow & { health: string; events: { at: string; status: TargetStatus; error: string | null; source: string; progress: number | null }[] })[];
  target_total: number; review_note: string | null; reviewed_by_email: string | null; reviewed_at: string | null; cancel_reason: string | null }

export function DeploymentDetail({ id }: { id: string }) {
  const { can, act, toast } = useFleet();
  const [d, setD] = useState<DeploymentDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [offset, setOffset] = useState(0);
  const [dialog, setDialog] = useState<null | 'pause' | 'resume' | 'cancel'>(null);
  const load = useCallback(async () => {
    try { setD(await fleetCall('fleet_deployment', { p_id: id, p_status: filter || null, p_limit: 100, p_offset: offset })); setError(null); }
    catch (e) { setError(e instanceof Error ? e.message : String(e)); }
  }, [id, filter, offset]);
  usePoll(load, 8000, [load]);
  if (error && !d) return <ErrorBox error={error} onRetry={() => void load()} />;
  if (!d) return <Spinner />;
  const critical = d.targets.filter((t) => TARGET_CRITICAL.includes(t.status)).length;
  const control = async (action: string, note?: string) => { await act(() => fleetCall('fleet_deployment_control', { p_id: id, p_action: action, p_note: note ?? null })); toast(`Deployment ${action}d`); await load(); };
  return (
    <div className="space-y-4">
      <Link href="/admin/fleet/deployments" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Deployments</Link>
      <PageHeader title={d.name} subtitle={<span className="flex flex-wrap items-center gap-2"><Badge tone={D_TONE[d.status] ?? D_TONE.SCHEDULED}>{d.status}</Badge>
        <span>{d.category} {d.version} · {d.strategy.type} · halts above {Math.round(Number(d.max_failure_rate) * 100)}% · {d.window ? `window ${d.window.start_hour}:00–${d.window.end_hour}:00 local` : 'any time'} · starts {when(d.start_at)}</span></span>}>
        {can('pause') && (d.status === 'RUNNING' || d.status === 'SCHEDULED') && <button type="button" className={BTN_QUIET} onClick={() => setDialog('pause')}><Pause className="h-4 w-4" aria-hidden="true" />Pause</button>}
        {((d.status === 'PAUSED' && can('pause')) || (d.status === 'HALTED' && can('deploy'))) && <button type="button" className={BTN} onClick={() => setDialog('resume')}><Play className="h-4 w-4" aria-hidden="true" />{d.status === 'HALTED' ? 'Review and resume' : 'Resume'}</button>}
        {can('pause') && !['COMPLETED', 'CANCELLED'].includes(d.status) && <button type="button" className={BTN_DANGER} onClick={() => setDialog('cancel')}><XCircle className="h-4 w-4" aria-hidden="true" />Cancel</button>}
      </PageHeader>
      {d.status === 'HALTED' && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-900 ring-1 ring-rose-200">Halted: {d.halted_reason}. Nothing new starts until someone who may deploy reviews it.</p>}
      {d.reviewed_at && <p className="text-xs text-slate-600">Reviewed by {d.reviewed_by_email} {when(d.reviewed_at)}: {d.review_note}</p>}
      <section className={CARD}><Progress d={d} /></section>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label className="flex items-center gap-1">Show<select className={SELECT} value={filter} onChange={(e) => { setFilter(e.target.value); setOffset(0); }}><option value="">all</option>
          {(Object.keys(TARGET_LABEL) as TargetStatus[]).map((s) => <option key={s} value={s}>{TARGET_LABEL[s]} ({d.counts[s] ?? 0})</option>)}</select></label>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th scope="col" className="px-3 py-2">Gateway</th><th scope="col" className="px-3 py-2">Wave</th><th scope="col" className="px-3 py-2">From</th><th scope="col" className="px-3 py-2">Status</th><th scope="col" className="px-3 py-2">Detail</th><th scope="col" className="px-3 py-2"><span className="sr-only">Actions</span></th></tr></thead>
          <tbody className="divide-y divide-slate-100">{d.targets.map((t) => (
            <tr key={t.id} className="align-top">
              <td className="px-3 py-2"><Link className="font-mono font-semibold text-blue-800" href={`/admin/fleet/gateways/${t.unit_id}`}>{t.serial}</Link><div className="text-xs text-slate-500">{t.organization_name ?? 'unassigned'} · {t.health.toLowerCase()}</div></td>
              <td className="px-3 py-2">{t.wave}</td><td className="px-3 py-2 font-mono text-xs">{t.from_version ?? '—'}</td>
              <td className="px-3 py-2"><Badge tone={targetTone(t.status)}>{TARGET_LABEL[t.status]}{t.status === 'DOWNLOADING' && t.progress != null ? ` ${t.progress}%` : ''}</Badge>{t.attempt > 1 && <div className="text-xs text-slate-500">attempt {t.attempt}</div>}</td>
              <td className="px-3 py-2 text-xs">{t.error && <p className="text-rose-700">{t.error}</p>}
                <details><summary className="cursor-pointer text-blue-700">{t.events.length} steps · {ago(t.updated_at)}</summary>
                  <ol className="mt-1 space-y-0.5">{t.events.map((e, i) => <li key={i}>{when(e.at)} · {e.source} · {TARGET_LABEL[e.status] ?? e.status}{e.progress != null ? ` ${e.progress}%` : ''}{e.error ? ` — ${e.error}` : ''}</li>)}</ol></details></td>
              <td className="px-3 py-2 text-right">{can('deploy') && ['FAILED', 'ROLLED_BACK', 'CANCELLED'].includes(t.status) && ['RUNNING', 'PAUSED', 'HALTED'].includes(d.status) &&
                <button type="button" className={`${BTN_QUIET} !h-8 text-xs`} onClick={async () => { await act(() => fleetCall('fleet_target_retry', { p_target: t.id })); toast('Queued again'); await load(); }}><RotateCcw className="h-3 w-3" aria-hidden="true" />Retry</button>}</td>
            </tr>))}</tbody>
        </table>
      </div>
      <Pager total={d.target_total} limit={100} offset={offset} onPage={setOffset} />
      {dialog === 'pause' && <ConfirmDialog title="Pause this deployment?" confirmLabel="Pause" body="No gateway starts the update while paused. Gateways already downloading or installing finish." onClose={() => setDialog(null)} onConfirm={() => control('pause')} />}
      {dialog === 'resume' && <ConfirmDialog title={d.status === 'HALTED' ? 'Review and resume' : 'Resume'} confirmLabel="Resume" reason={d.status === 'HALTED'}
        body={d.status === 'HALTED' ? <><p>It halted because: {d.halted_reason}.</p><p>Write what you checked and why it is safe to continue (at least 10 characters). Logged with your name.</p></> : 'Gateways continue from where they were.'}
        onClose={() => setDialog(null)} onConfirm={(note) => control('resume', note)} />}
      {dialog === 'cancel' && <ConfirmDialog title="Cancel this deployment?" danger confirmLabel="Cancel deployment" reason typeToConfirm="CANCEL"
        body={<><p>Gateways that have not started installing stop. {critical > 0 ? `${critical} gateway(s) are installing, restarting or checking right now: they are never interrupted and finish (or roll back) on their own.` : ''}</p><p>Nothing that already updated is changed back.</p></>}
        onClose={() => setDialog(null)} onConfirm={(note) => control('cancel', note)} />}
    </div>
  );
}

