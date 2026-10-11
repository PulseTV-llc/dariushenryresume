'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { call } from '@/lib/store/admin-client';
import { money } from '@/lib/store/format';
import type { OrderStatus, StoreOrder } from '@/lib/store/types';
import { BTN, BTN_QUIET, CARD, INPUT } from './StoreAdmin';

const STATUSES: OrderStatus[] = ['paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
const TONE: Record<OrderStatus, string> = {
  paid: 'bg-blue-50 text-blue-800 ring-blue-200', processing: 'bg-amber-50 text-amber-800 ring-amber-200', shipped: 'bg-violet-50 text-violet-800 ring-violet-200',
  delivered: 'bg-emerald-50 text-emerald-800 ring-emerald-200', cancelled: 'bg-slate-100 text-slate-700 ring-slate-200', refunded: 'bg-rose-50 text-rose-800 ring-rose-200',
};
const PAGE = 25;
const when = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

function OrderCard({ order, onSaved }: { order: StoreOrder; onSaved: (o: StoreOrder) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ status: order.status, tracking_carrier: order.tracking_carrier ?? '', tracking_number: order.tracking_number ?? '', tracking_url: order.tracking_url ?? '', notes: order.notes ?? '' });
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const a = order.shipping?.address ?? {};
  async function save() {
    setBusy(true);
    try {
      const saved = await call<StoreOrder>('store_admin_order_update', { p_id: order.id, p: form });
      onSaved({ ...order, ...saved, items: order.items });
      setNote({ ok: true, text: 'Saved.' });
    } catch (e) { setNote({ ok: false, text: (e as Error).message }); }
    setBusy(false);
  }
  return (
    <li className={CARD}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 text-left">
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">#{order.number}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${TONE[order.status]}`}>{order.status}</span>
            {!order.livemode && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">test</span>}
            {order.flags?.oversold ? <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-800 ring-1 ring-rose-200">oversold</span> : null}
          </span>
          <span className="mt-0.5 block truncate text-sm text-slate-600">{order.name || order.email || 'Customer'} · {when(order.created_at)}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-semibold tabular-nums">{money(order.total_cents, order.currency)}</span>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </span>
      </button>
      {open && (
        <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 md:grid-cols-2">
          <div className="space-y-3 text-sm">
            <ul className="divide-y divide-slate-100">
              {order.items.map((i, n) => (
                <li key={n} className="flex justify-between gap-3 py-1.5">
                  <span className="min-w-0">{i.quantity} × {i.name}{i.variant_title ? ` (${i.variant_title})` : ''}{i.sku ? <span className="text-slate-400"> · {i.sku}</span> : null}
                    {i.tier_min != null ? <span className="ml-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-800">bulk {i.tier_min}{i.tier_max == null ? '+' : `–${i.tier_max}`}: {money(i.unit_cents, order.currency)} each{i.base_cents != null ? ` (normally ${money(i.base_cents, order.currency)})` : ''}</span> : null}</span>
                  <span className="shrink-0 tabular-nums">{money(i.unit_cents * i.quantity, order.currency)}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-600">Subtotal {money(order.subtotal_cents, order.currency)} · Shipping {money(order.shipping_cents, order.currency)} · Tax {money(order.tax_cents, order.currency)}</p>
            <address className="not-italic text-slate-700">
              <span className="block font-semibold">{order.shipping?.name ?? order.name}</span>
              {[a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(', '), a.country].filter(Boolean).map((l, n) => <span key={n} className="block">{l}</span>)}
              {order.email && <a href={`mailto:${order.email}`} className="block text-blue-700">{order.email}</a>}
              {order.phone && <a href={`tel:${order.phone}`} className="block text-blue-700">{order.phone}</a>}
            </address>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Status
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as OrderStatus })} className={`${INPUT} mt-1`}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm font-medium">Carrier<input value={form.tracking_carrier} onChange={(e) => setForm({ ...form, tracking_carrier: e.target.value })} placeholder="UPS" className={`${INPUT} mt-1`} /></label>
              <label className="block text-sm font-medium">Tracking number<input value={form.tracking_number} onChange={(e) => setForm({ ...form, tracking_number: e.target.value })} className={`${INPUT} mt-1`} /></label>
            </div>
            <label className="block text-sm font-medium">Tracking link<input type="url" inputMode="url" value={form.tracking_url} onChange={(e) => setForm({ ...form, tracking_url: e.target.value })} placeholder="https://" className={`${INPUT} mt-1`} /></label>
            <label className="block text-sm font-medium">Notes (only you see these)
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className={`${INPUT} mt-1 !h-auto py-2`} />
            </label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={save} disabled={busy} className={BTN}>{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Save</button>
              {note && <span role="status" className={`text-sm ${note.ok ? 'text-emerald-700' : 'text-rose-600'}`}>{note.text}</span>}
            </div>
            <p className="text-xs text-slate-500">Refunds are made in Stripe; the order is marked refunded here automatically. Changing the status does not email the customer.</p>
          </div>
        </div>
      )}
    </li>
  );
}

export default function OrdersTab() {
  const [status, setStatus] = useState<'' | OrderStatus>('');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<{ total: number; orders: StoreOrder[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(() => {
    call<{ total: number; orders: StoreOrder[] }>('store_admin_orders', { p_status: status || null, p_limit: PAGE, p_offset: offset }).then((d) => { setData(d); setError(null); }).catch((e) => setError(e.message));
  }, [status, offset]);
  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {(['', ...STATUSES] as const).map((s) => (
          <button key={s || 'all'} type="button" onClick={() => { setStatus(s); setOffset(0); }} aria-pressed={status === s}
                  className={`h-9 shrink-0 rounded-full border px-3 text-sm font-medium ${status === s ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white text-slate-700'}`}>{s || 'All'}</button>
        ))}
      </div>
      {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
      {!data ? <Loader2 className="mt-4 h-5 w-5 animate-spin text-slate-400" aria-label="Loading" /> : data.orders.length === 0 ? (
        <div className={`${CARD} mt-2 text-sm text-slate-600`}>No orders{status ? ` with status "${status}"` : ' yet'}.</div>
      ) : (
        <>
          <ul className="mt-2 space-y-3">
            {data.orders.map((o) => <OrderCard key={o.id} order={o} onSaved={(saved) => setData({ ...data, orders: data.orders.map((x) => (x.id === saved.id ? saved : x)) })} />)}
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
