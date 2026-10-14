'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, Download, Loader2 } from 'lucide-react';
import { call } from '@/lib/store/admin-client';
import { en } from '@/lib/mobile-gateway/i18n/en';
import { INDUSTRY_KEYS, MONITOR_KEYS, SIZE_KEYS, launchListCsv, launchListCsvName, type LaunchEntry } from '@/lib/mobile-gateway/launch-list';
import { BTN_QUIET, CARD } from './StoreAdmin';

interface Page { total: number; counts: { subscribed: number; unsubscribed: number; consultation: number }; entries: LaunchEntry[] }
const PAGE = 50;
const F = en.early.form;
const label = (keys: readonly string[], labels: string[], k: string | null) => (k == null ? '' : labels[keys.indexOf(k)] ?? k);
const when = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

/**
 * Mobile Gateway launch list (owner only). The database decides: public.marketing_admin_launch_list refuses anyone
 * but the store owner, so this tab is shown to the owner and would show an error to anyone else.
 */
export default function LaunchListTab() {
  const [status, setStatus] = useState<'' | 'subscribed' | 'unsubscribed'>('subscribed');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Page | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(() => {
    call<Page>('marketing_admin_launch_list', { p_status: status || null, p_limit: PAGE, p_offset: offset })
      .then((d) => { setData(d); setError(null); })
      .catch((e) => setError(e.message.includes('marketing_admin_launch_list') ? 'The launch list is not set up in the database yet (migration 20261108090000_marketing_launch_list).' : e.message));
  }, [status, offset]);
  useEffect(() => { load(); }, [load]);

  async function exportCsv() {
    setBusy(true);
    try {
      const all = await call<Page>('marketing_admin_launch_list', { p_status: status || null, p_limit: 5000, p_offset: 0 });
      const url = URL.createObjectURL(new Blob([launchListCsv(all.entries)], { type: 'text/csv;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url; a.download = launchListCsvName(); a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) { setError((e as Error).message); }
    setBusy(false);
  }

  return (
    <div>
      <div className={`${CARD} flex flex-wrap items-center justify-between gap-3`}>
        <div>
          <h2 className="text-lg font-bold tracking-tight">Mobile Gateway launch list</h2>
          <p className="text-sm text-slate-600">
            {data ? <>{data.counts.subscribed} subscribed · {data.counts.consultation} asked for a consultation · {data.counts.unsubscribed} unsubscribed</> : 'Loading…'}
          </p>
          <p className="mt-1 text-xs text-slate-500">No emails are sent from the website yet. Contact people from your own mail, and honour unsubscribes.</p>
        </div>
        <button type="button" onClick={exportCsv} disabled={busy || !data?.total} className={`${BTN_QUIET} !h-10`}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}Export CSV
        </button>
      </div>
      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2">
        {(['subscribed', 'unsubscribed', ''] as const).map((s) => (
          <button key={s || 'all'} type="button" onClick={() => { setStatus(s); setOffset(0); }} aria-pressed={status === s}
                  className={`h-9 shrink-0 rounded-full border px-3 text-sm font-medium ${status === s ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white text-slate-700'}`}>{s || 'All'}</button>
        ))}
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-rose-600">{error}</p>}
      {!data ? (!error && <Loader2 className="mt-4 h-5 w-5 animate-spin text-slate-400" aria-label="Loading" />) : data.entries.length === 0 ? (
        <div className={`${CARD} mt-2 text-sm text-slate-600`}>No sign-ups{status ? ` (${status})` : ''} yet.</div>
      ) : (
        <>
          <ul className="mt-2 space-y-2">
            {data.entries.map((e) => (
              <li key={e.id} className={CARD}>
                <button type="button" onClick={() => setOpen(open === e.id ? null : e.id)} aria-expanded={open === e.id} className="flex w-full items-center justify-between gap-3 text-left">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{e.full_name}</span>
                      {e.request_type === 'consultation' && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800 ring-1 ring-blue-200">consultation</span>}
                      {e.status === 'unsubscribed' && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">unsubscribed</span>}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-slate-600">{e.company || '—'} · {label(INDUSTRY_KEYS, F.industries, e.industry)} · {when(e.created_at)}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 flex-none text-slate-400 transition ${open === e.id ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {open === e.id && (
                  <dl className="mt-3 grid gap-x-6 gap-y-2 border-t border-slate-100 pt-3 text-sm sm:grid-cols-2">
                    {([
                      ['Email', <a key="m" href={`mailto:${e.email}`} className="text-blue-700">{e.email}</a>],
                      ['Primary use case', e.use_case], ['Country', e.country], ['Deployment size', label(SIZE_KEYS, F.quantities, e.deployment_size)],
                      ['Would monitor', e.monitor.map((m) => label(MONITOR_KEYS, F.monitorOptions, m)).join(', ')], ['Message', e.message],
                      ['Language', e.locale], ['Consent', `${e.consent_version}, ${when(e.consented_at)}`], ['Submissions', String(e.submissions)],
                      ['Updated', when(e.updated_at)], ...(e.unsubscribed_at ? [['Unsubscribed', when(e.unsubscribed_at)] as const] : []),
                    ] as const).map(([k, v]) => (
                      <div key={k} className="min-w-0"><dt className="text-xs text-slate-500">{k}</dt><dd className="whitespace-pre-wrap break-words">{v || '—'}</dd></div>
                    ))}
                  </dl>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>{offset + 1}–{Math.min(offset + PAGE, data.total)} of {data.total}</span>
            <span className="flex gap-2">
              <button type="button" disabled={offset === 0} onClick={() => setOffset(Math.max(0, offset - PAGE))} className={`${BTN_QUIET} !h-9`}>Previous</button>
              <button type="button" disabled={offset + PAGE >= data.total} onClick={() => setOffset(offset + PAGE)} className={`${BTN_QUIET} !h-9`}>Next</button>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
