'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { BarChart3, Loader2, LogOut, Megaphone, Package, Settings as SettingsIcon, ShoppingBag } from 'lucide-react';
import { adminClient, call } from '@/lib/store/admin-client';
import { storeConfigured } from '@/lib/store/config';
import { SITE_URL } from '@/lib/site';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';
import { Overview, SettingsTab } from './OverviewSettings';
import LaunchListTab from './LaunchListTab';

export interface Me { email: string; role: 'owner' | 'admin' }
type Tab = 'overview' | 'products' | 'orders' | 'launch' | 'settings';
const TABS: { key: Tab; label: string; icon: typeof Package }[] = [
  { key: 'overview', label: 'Overview', icon: BarChart3 }, { key: 'products', label: 'Products', icon: Package },
  { key: 'orders', label: 'Orders', icon: ShoppingBag }, { key: 'settings', label: 'Settings', icon: SettingsIcon },
];
/** The Mobile Gateway launch list: the owner only (the database enforces the same rule). */
const OWNER_TABS: { key: Tab; label: string; icon: typeof Package }[] = [{ key: 'launch', label: 'Launch list', icon: Megaphone }];
export const INPUT = 'h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 sm:text-sm';
export const BTN = 'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50';
export const BTN_QUIET = 'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50';
export const CARD = 'rounded-2xl border border-slate-200 bg-white p-4 sm:p-5';

function SignIn({ onDone, denied }: { onDone: () => void; denied: string | null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await adminClient().auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) setError(err.message === 'Invalid login credentials' ? 'That email and password do not match.' : err.message);
    else onDone();
  }
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-bold tracking-tight">VexaOs Store admin</h1>
      <p className="mt-1 text-sm text-slate-600">Sign in with your VexaOs account. Only people on the store&apos;s admin list get in.</p>
      {denied && <p role="alert" className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">{denied}</p>}
      <form onSubmit={submit} className="mt-6 space-y-3">
        <label className="block text-sm font-medium">Email
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${INPUT} mt-1`} />
        </label>
        <label className="block text-sm font-medium">Password
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${INPUT} mt-1`} />
        </label>
        {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
        <button type="submit" disabled={busy} className={`${BTN} w-full`}>{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Sign in</button>
      </form>
    </main>
  );
}

/** The store admin: sign-in, then Overview / Products / Orders / Settings. Access is decided by the database. */
export default function StoreAdmin() {
  const [state, setState] = useState<'loading' | 'signed-out' | 'ready'>('loading');
  const [me, setMe] = useState<Me | null>(null);
  const [denied, setDenied] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('overview');

  const check = useCallback(async () => {
    const { data } = await adminClient().auth.getSession();
    if (!data.session) { setState('signed-out'); return; }
    try {
      const who = await call<Me | null>('store_admin_me');
      if (!who) {
        await adminClient().auth.signOut();
        setDenied(`${data.session.user.email ?? 'That account'} is not on the store's admin list.`);
        setState('signed-out');
        return;
      }
      setMe(who);
      setDenied(null);
      setState('ready');
    } catch {
      setDenied('The store could not be reached. Try again in a moment.');
      setState('signed-out');
    }
  }, []);
  useEffect(() => { if (storeConfigured()) check(); }, [check]);

  // on the admin's own host the storefront lives on the main site
  const storeHref = typeof window !== 'undefined' && window.location.hostname.startsWith('admin.') ? `${SITE_URL}/store` : '/store';

  if (!storeConfigured()) {
    return <main className="mx-auto max-w-md px-4 py-20 text-center text-sm text-slate-600">The store is not configured on this deployment (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing).</main>;
  }
  if (state === 'loading') return <main className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-slate-400" aria-label="Loading" /></main>;
  if (state === 'signed-out' || !me) return <SignIn onDone={check} denied={denied} />;

  return (
    <div className="mx-auto max-w-6xl px-3 pb-24 pt-4 sm:px-6 sm:pb-10">
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight">VexaOs Store</h1>
          <p className="truncate text-xs text-slate-500">{me.email} · {me.role}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={storeHref} target="_blank" rel="noopener" className="hidden text-sm font-semibold text-blue-700 hover:text-blue-900 sm:inline">View store</a>
          <button type="button" onClick={async () => { await adminClient().auth.signOut(); setMe(null); setState('signed-out'); }} className={`${BTN_QUIET} !h-10 !px-3`} aria-label="Sign out">
            <LogOut className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* tabs: a row on desktop, a bar at the bottom of the screen on a phone */}
      <nav aria-label="Store admin" className={`fixed inset-x-0 bottom-0 z-40 grid ${me.role === 'owner' ? 'grid-cols-5' : 'grid-cols-4'} border-t border-slate-200 bg-white sm:static sm:mt-4 sm:flex sm:gap-1 sm:rounded-2xl sm:border sm:p-1`}>
        {(me.role === 'owner' ? [...TABS.slice(0, 3), ...OWNER_TABS, TABS[3]] : TABS).map(({ key, label, icon: Icon }) => (
          <button key={key} type="button" onClick={() => setTab(key)} aria-current={tab === key ? 'page' : undefined}
                  className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold sm:flex-row sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${tab === key ? 'text-blue-700 sm:bg-blue-50' : 'text-slate-500 hover:text-slate-900'}`}>
            <Icon className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />{label}
          </button>
        ))}
      </nav>

      <div className="mt-4">
        {tab === 'overview' && <Overview onOpenOrders={() => setTab('orders')} />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'launch' && me.role === 'owner' && <LaunchListTab />}
        {tab === 'settings' && <SettingsTab me={me} />}
      </div>
    </div>
  );
}
