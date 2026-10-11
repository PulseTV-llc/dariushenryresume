'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Copy, Loader2, Trash2, XCircle } from 'lucide-react';
import { call, siteStatus } from '@/lib/store/admin-client';
import { money } from '@/lib/store/format';
import type { Sales, SalesBlock } from '@/lib/store/types';
import { BTN, CARD, INPUT, type Me } from './StoreAdmin';

function SalesTiles({ block, title, note }: { block: SalesBlock; title: string; note?: string }) {
  const m = (cents: number) => (block.mixed_currency ? '—' : money(cents, block.currency));
  const tiles: [string, { orders: number; revenue_cents: number }][] = [['Today', block.today], ['Last 7 days', block.last_7d], ['Last 30 days', block.last_30d], ['All time', block.all_time]];
  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      {note && <p className="text-xs text-slate-500">{note}</p>}
      <div className="mt-2 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map(([label, v]) => (
          <div key={label} className={CARD}>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{m(v.revenue_cents)}</p>
            <p className="text-sm text-slate-600">{v.orders} order{v.orders === 1 ? '' : 's'}</p>
          </div>
        ))}
      </div>
      {block.mixed_currency && <p className="mt-2 text-xs text-amber-700">Orders in more than one currency: totals are not added together.</p>}
      {block.top.length > 0 && (
        <div className={`${CARD} mt-3`}>
          <h3 className="text-sm font-semibold">Best sellers, last 30 days</h3>
          <ul className="mt-2 divide-y divide-slate-100 text-sm">
            {block.top.map((t) => (
              <li key={t.name} className="flex items-center justify-between gap-3 py-2">
                <span className="min-w-0 truncate">{t.name}</span>
                <span className="shrink-0 tabular-nums text-slate-600">{t.quantity} sold · {m(t.revenue_cents)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function Overview({ onOpenOrders }: { onOpenOrders: () => void }) {
  const [sales, setSales] = useState<Sales | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { call<Sales>('store_admin_sales').then(setSales).catch((e) => setError(e.message)); }, []);
  if (error) return <p role="alert" className="text-sm text-rose-600">{error}</p>;
  if (!sales) return <Loader2 className="h-5 w-5 animate-spin text-slate-400" aria-label="Loading" />;
  const toShip = (sales.live?.to_ship ?? 0) + (sales.test?.to_ship ?? 0);
  return (
    <div className="space-y-6">
      {toShip > 0 && (
        <button type="button" onClick={onOpenOrders} className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-blue-700">
          {toShip} order{toShip === 1 ? '' : 's'} to ship →
        </button>
      )}
      {sales.live && <SalesTiles block={sales.live} title="Sales" note="Paid orders, without cancelled and refunded ones." />}
      {sales.test && <SalesTiles block={sales.test} title="Test payments" note="Made with Stripe test cards. No money moved." />}
      {!sales.live && !sales.test && <div className={`${CARD} text-sm text-slate-600`}>No orders yet. Totals appear here after the first checkout.</div>}
    </div>
  );
}

interface Status {
  checkout: string | null; mode: 'test' | 'live' | null; webhook_url: string; webhook_events: string[]; ship_countries: string[];
  has: { stripe_secret: boolean; stripe_publishable: boolean; webhook_secret: boolean; service_role: boolean };
}
const BLOCK_TEXT: Record<string, string> = {
  stripe_keys: 'Stripe keys are not set yet, so the store shows "Contact to order".',
  webhook_secret: 'The webhook signing secret is missing. Checkout stays closed until orders can be recorded.',
  order_recording: 'The Supabase service role key is missing. Checkout stays closed until orders can be recorded.',
  live_key: 'A live Stripe key is set but live payments are not switched on (STORE_LIVE_PAYMENTS=on).',
  catalog: 'The Supabase URL and anon key are missing.',
};

export function SettingsTab({ me }: { me: Me }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [admins, setAdmins] = useState<{ email: string; role: string }[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const load = useCallback(() => call<{ email: string; role: string }[]>('store_admin_admins').then(setAdmins).catch(() => {}), []);
  useEffect(() => { siteStatus<Status>().then(setStatus); load(); }, [load]);

  async function add(e: FormEvent) {
    e.preventDefault();
    try { await call('store_admin_admin_set', { p_email: email, p_role: role }); setEmail(''); setNote({ ok: true, text: 'Saved. They sign in with their VexaOs account.' }); load(); }
    catch (err) { setNote({ ok: false, text: (err as Error).message }); }
  }
  async function remove(target: string) {
    if (!window.confirm(`Remove ${target} from the store admins?`)) return;
    try { await call('store_admin_admin_remove', { p_email: target }); load(); } catch (err) { setNote({ ok: false, text: (err as Error).message }); }
  }
  const Row = ({ ok, label }: { ok: boolean; label: string }) => (
    <li className="flex items-center gap-2 text-sm">{ok ? <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-label="Set" /> : <XCircle className="h-4 w-4 text-slate-300" aria-label="Missing" />}<code className="text-xs">{label}</code></li>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className={CARD}>
        <h2 className="text-base font-semibold">Payments</h2>
        {!status ? <p className="mt-2 text-sm text-slate-500">Checking…</p> : (
          <>
            <p className={`mt-2 rounded-xl px-3 py-2 text-sm ring-1 ${status.checkout ? 'bg-amber-50 text-amber-900 ring-amber-200' : 'bg-emerald-50 text-emerald-900 ring-emerald-200'}`}>
              {status.checkout ? BLOCK_TEXT[status.checkout] ?? status.checkout : `Checkout is open${status.mode === 'test' ? ' in TEST mode: no real money is taken.' : '.'}`}
            </p>
            <ul className="mt-3 space-y-1.5">
              <Row ok={status.has.stripe_secret} label="STRIPE_SECRET_KEY" />
              <Row ok={status.has.stripe_publishable} label="NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" />
              <Row ok={status.has.webhook_secret} label="STRIPE_WEBHOOK_SECRET" />
              <Row ok={status.has.service_role} label="SUPABASE_SERVICE_ROLE_KEY" />
            </ul>
            <p className="mt-2 text-xs text-slate-500">Keys are set in Vercel (Project → Settings → Environment Variables), then redeploy. This page only shows whether each one is present.</p>
            <h3 className="mt-4 text-sm font-semibold">Stripe webhook</h3>
            <div className="mt-1 flex items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded-lg bg-slate-100 px-2 py-1.5 text-xs">{status.webhook_url}</code>
              <button type="button" onClick={() => { navigator.clipboard?.writeText(status.webhook_url); setCopied(true); }} className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-300 px-2 text-xs font-semibold">
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />{copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">Events: {status.webhook_events.join(', ')}</p>
            <p className="mt-2 text-xs text-slate-500">Ships to: {status.ship_countries.join(', ')} (STORE_SHIP_COUNTRIES)</p>
          </>
        )}
      </section>

      <section className={CARD}>
        <h2 className="text-base font-semibold">Store admins</h2>
        <p className="mt-1 text-xs text-slate-500">People on this list can manage products and orders after signing in with their VexaOs account. Owners manage the list.</p>
        <ul className="mt-3 divide-y divide-slate-100">
          {admins.map((a) => (
            <li key={a.email} className="flex items-center justify-between gap-2 py-2 text-sm">
              <span className="min-w-0 truncate">{a.email}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold">{a.role}</span>
                {me.role === 'owner' && a.email !== me.email && (
                  <button type="button" onClick={() => remove(a.email)} aria-label={`Remove ${a.email}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                )}
              </span>
            </li>
          ))}
        </ul>
        {me.role === 'owner' && (
          <form onSubmit={add} className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input type="email" required placeholder="name@example.com" aria-label="Email to add" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
            <select aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)} className={`${INPUT} sm:w-32`}><option value="admin">admin</option><option value="owner">owner</option></select>
            <button type="submit" className={BTN}>Add</button>
          </form>
        )}
        {note && <p role="status" className={`mt-2 text-sm ${note.ok ? 'text-emerald-700' : 'text-rose-600'}`}>{note.text}</p>}
      </section>
    </div>
  );
}
