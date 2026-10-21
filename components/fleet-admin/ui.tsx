'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import { BTN, BTN_QUIET, CARD, INPUT } from '@/components/store-admin/StoreAdmin';
import type { Health } from '@/lib/fleet/types';
import { HEALTH_LABEL, HEALTH_TONE } from '@/lib/fleet/logic';

export { BTN, BTN_QUIET, CARD, INPUT };
export const BTN_DANGER = 'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50';
export const SELECT = 'h-10 rounded-xl border border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30';

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return <div className="flex items-center gap-2 py-8 text-sm text-slate-500" role="status"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />{label}…</div>;
}
export function ErrorBox({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-900 ring-1 ring-rose-200">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">{error}</div>
      {onRetry && <button type="button" onClick={onRetry} className="font-semibold underline">Try again</button>}
    </div>
  );
}
export function Empty({ children }: { children: ReactNode }) {
  return <div className={`${CARD} text-center text-sm text-slate-600`}>{children}</div>;
}
export function Badge({ tone, children, title }: { tone: string; children: ReactNode; title?: string }) {
  return <span title={title} className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${tone}`}>{children}</span>;
}
export function HealthBadge({ health, reasons }: { health: Health; reasons?: string[] }) {
  return <Badge tone={HEALTH_TONE[health]} title={reasons?.length ? reasons.join(', ') : undefined}>
    <span aria-hidden="true" className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${health === 'ONLINE' ? 'bg-emerald-500' : health === 'OFFLINE' ? 'bg-rose-500' : health === 'DEGRADED' ? 'bg-amber-500' : 'bg-slate-400'}`} />
    {HEALTH_LABEL[health]}
  </Badge>;
}
export const SimBadge = () => <Badge tone="bg-violet-50 text-violet-800 ring-violet-200" title="A simulator or test unit, not real hardware">SIMULATED</Badge>;

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function Stat({ label, value, tone, onClick, hint }: { label: string; value: number | string; tone?: string; onClick?: () => void; hint?: string }) {
  const inner = (<><p className="text-xs text-slate-500">{label}</p><p className={`mt-1 text-2xl font-bold tabular-nums ${tone ?? ''}`}>{value}</p>{hint && <p className="text-xs text-slate-500">{hint}</p>}</>);
  return onClick
    ? <button type="button" onClick={onClick} className={`${CARD} text-left hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600/30`}>{inner}</button>
    : <div className={CARD}>{inner}</div>;
}

/** Accessible modal: focus moves in, Escape closes, focus returns to what opened it. */
export function Dialog({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>('input, select, textarea, button:not([data-close])');
    (first ?? ref.current)?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); before?.focus?.(); };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={id}
           className={`max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 id={id} className="text-lg font-bold">{title}</h2>
          <button type="button" data-close onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

/**
 * Confirm a consequential action. `typeToConfirm` makes the person type a word (e.g. the serial) first;
 * `reason` asks for a reason that goes into the audit log.
 */
export function ConfirmDialog({ title, body, confirmLabel, danger, typeToConfirm, reason, onConfirm, onClose }: {
  title: string; body: ReactNode; confirmLabel: string; danger?: boolean; typeToConfirm?: string; reason?: boolean;
  onConfirm: (reason: string) => Promise<void>; onClose: () => void;
}) {
  const [typed, setTyped] = useState('');
  const [why, setWhy] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ok = (!typeToConfirm || typed.trim().toUpperCase() === typeToConfirm.toUpperCase()) && (!reason || why.trim().length >= 3);
  return (
    <Dialog title={title} onClose={onClose}>
      <div className="space-y-3 text-sm text-slate-700">{body}</div>
      <form className="mt-4 space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        if (!ok) return;
        setBusy(true); setError(null);
        try { await onConfirm(why.trim()); onClose(); } catch (err) { setError(err instanceof Error ? err.message : String(err)); } finally { setBusy(false); }
      }}>
        {reason && <label className="block text-sm font-medium">Reason (kept in the audit log)
          <input value={why} onChange={(e) => setWhy(e.target.value)} className={`${INPUT} mt-1`} maxLength={300} required minLength={3} /></label>}
        {typeToConfirm && <label className="block text-sm font-medium">Type <span className="font-mono">{typeToConfirm}</span> to confirm
          <input value={typed} onChange={(e) => setTyped(e.target.value)} className={`${INPUT} mt-1 font-mono`} autoComplete="off" /></label>}
        {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={BTN_QUIET}>Cancel</button>
          <button type="submit" disabled={!ok || busy} className={danger ? BTN_DANGER : BTN}>{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}{confirmLabel}</button>
        </div>
      </form>
    </Dialog>
  );
}

export function Pager({ total, limit, offset, onPage }: { total: number; limit: number; offset: number; onPage: (offset: number) => void }) {
  if (total <= limit) return <p className="mt-3 text-xs text-slate-500">{total} result{total === 1 ? '' : 's'}</p>;
  const page = Math.floor(offset / limit) + 1, pages = Math.ceil(total / limit);
  return (
    <nav aria-label="Pages" className="mt-3 flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-600">{offset + 1}–{Math.min(offset + limit, total)} of {total}</span>
      <div className="flex items-center gap-1">
        <button type="button" className={`${BTN_QUIET} !h-9 !px-2`} disabled={offset === 0} onClick={() => onPage(Math.max(0, offset - limit))} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
        <span className="px-2 tabular-nums">{page} / {pages}</span>
        <button type="button" className={`${BTN_QUIET} !h-9 !px-2`} disabled={offset + limit >= total} onClick={() => onPage(offset + limit)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </nav>
  );
}

/** Horizontal bars (inline SVG-free: plain divs, readable by screen readers as a list). */
export function BarList({ title, items, empty = 'No data yet.' }: { title: string; items: { key: string; count: number }[]; empty?: string }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <section className={CARD} aria-label={title}>
      <h2 className="text-sm font-semibold">{title}</h2>
      {items.length === 0 ? <p className="mt-2 text-sm text-slate-500">{empty}</p> : (
        <ul className="mt-3 space-y-2">
          {items.slice(0, 8).map((i) => (
            <li key={i.key} className="text-sm">
              <div className="flex justify-between gap-2"><span className="truncate">{i.key}</span><span className="tabular-nums text-slate-600">{i.count}</span></div>
              <div className="mt-1 h-2 rounded-full bg-slate-100" aria-hidden="true"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${(i.count / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Online share over time: an SVG area line with a text summary for screen readers. */
export function TrendChart({ points }: { points: { at: string; total: number; online: number }[] }) {
  if (points.length < 2) return <p className="mt-2 text-sm text-slate-500">The trend appears after the first hours of heartbeats.</p>;
  const W = 600, H = 120;
  const xs = (i: number) => (i / (points.length - 1)) * W;
  const ys = (p: { total: number; online: number }) => H - (p.total ? (p.online / p.total) * (H - 8) : 0) - 4;
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${xs(i).toFixed(1)},${ys(p).toFixed(1)}`).join(' ');
  const last = points[points.length - 1]!;
  return (
    <figure className="mt-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d={`${line} L${W},${H} L0,${H} Z`} className="fill-blue-600/10" />
        <path d={line} className="fill-none stroke-blue-600" strokeWidth={2} vectorEffect="non-scaling-stroke" />
      </svg>
      <figcaption className="text-xs text-slate-500">Share of units online, hourly. Now {last.online} of {last.total}.</figcaption>
    </figure>
  );
}

/** Re-run `fn` every `ms` while the page is visible (live updates without a socket). */
export function usePoll(fn: () => void | Promise<void>, ms: number, deps: unknown[] = []) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    let t: ReturnType<typeof setInterval> | null = null;
    const start = () => { if (!t) t = setInterval(() => { if (document.visibilityState === 'visible') void saved.current(); }, ms); };
    const onVis = () => { if (document.visibilityState === 'visible') void saved.current(); };
    void saved.current();
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => { if (t) clearInterval(t); document.removeEventListener('visibilitychange', onVis); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms, ...deps]);
}

/** Load once (and on demand), with loading and error states. */
export function useLoad<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true);
    try { setData(await fn()); setError(null); } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => { void reload(); }, [reload]);
  return { data, error, loading, reload, setData };
}
