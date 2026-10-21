'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity, AlertTriangle, BarChart3, ClipboardList, Cpu, FolderTree, History, Loader2, LogOut, Menu, Package, PlusCircle,
  Rocket, Settings, Stethoscope, Store, X,
} from 'lucide-react';
import { adminClient } from '@/lib/store/admin-client';
import { storeConfigured } from '@/lib/store/config';
import { FleetError, confirmPassword, fleetCall } from '@/lib/fleet/client';
import type { FleetMe, Permission } from '@/lib/fleet/types';
import { BTN, BTN_QUIET, Dialog, INPUT } from './ui';

interface FleetCtx {
  me: FleetMe;
  can: (p: Permission) => boolean;
  /**
   * Run a database action. When the database asks for a fresh sign-in (step-up), the password dialog opens and the
   * action is retried once after it. Errors come back as thrown Error with a readable message.
   */
  act: <T>(fn: () => Promise<T>) => Promise<T>;
  toast: (msg: string) => void;
}
const Ctx = createContext<FleetCtx | null>(null);
export function useFleet(): FleetCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useFleet outside FleetShell');
  return c;
}

export const NAV: { href: string; label: string; icon: typeof Package; perm?: Permission }[] = [
  { href: '/admin/fleet', label: 'Overview', icon: BarChart3 },
  { href: '/admin/fleet/gateways', label: 'Gateways', icon: Cpu },
  { href: '/admin/fleet/register', label: 'Register Gateway', icon: PlusCircle, perm: 'register' },
  { href: '/admin/fleet/groups', label: 'Gateway Groups', icon: FolderTree },
  { href: '/admin/fleet/releases', label: 'Software Releases', icon: Package },
  { href: '/admin/fleet/deployments', label: 'OTA Deployments', icon: Rocket },
  { href: '/admin/fleet/history', label: 'Deployment History', icon: History },
  { href: '/admin/fleet/alerts', label: 'Alerts', icon: AlertTriangle },
  { href: '/admin/fleet/diagnostics', label: 'Diagnostics', icon: Stethoscope },
  { href: '/admin/fleet/audit', label: 'Audit Logs', icon: ClipboardList },
  { href: '/admin/fleet/settings', label: 'Staff & Settings', icon: Settings },
];

function SignIn({ onDone, denied }: { onDone: () => void; denied: string | null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    const { error: err } = await adminClient().auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) setError(err.message === 'Invalid login credentials' ? 'That email and password do not match.' : err.message);
    else onDone();
  }
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-bold tracking-tight">VexaOs Fleet</h1>
      <p className="mt-1 text-sm text-slate-600">Sign in with your VexaOs account. Only fleet staff get in.</p>
      {denied && <p role="alert" className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">{denied}</p>}
      <form onSubmit={submit} className="mt-6 space-y-3">
        <label className="block text-sm font-medium">Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${INPUT} mt-1`} /></label>
        <label className="block text-sm font-medium">Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${INPUT} mt-1`} /></label>
        {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
        <button type="submit" disabled={busy} className={`${BTN} w-full`}>{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Sign in</button>
      </form>
    </main>
  );
}

function StepUp({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <Dialog title="Confirm it's you" onClose={onCancel}>
      <p className="text-sm text-slate-700">This action has a big impact, so it needs your password again (you last entered it more than 15 minutes ago).</p>
      <form className="mt-4 space-y-3" onSubmit={async (e) => {
        e.preventDefault(); setBusy(true); setError(null);
        const err = await confirmPassword(password);
        setBusy(false);
        if (err) setError(err); else onDone();
      }}>
        <label className="block text-sm font-medium">Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${INPUT} mt-1`} /></label>
        {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
        <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className={BTN_QUIET}>Cancel</button>
          <button type="submit" disabled={busy} className={BTN}>{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}Confirm</button></div>
      </form>
    </Dialog>
  );
}

export default function FleetShell({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'loading' | 'signed-out' | 'denied' | 'ready'>('loading');
  const [me, setMe] = useState<FleetMe | null>(null);
  const [denied, setDenied] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [stepUp, setStepUp] = useState<{ resolve: (ok: boolean) => void } | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname() ?? '/admin/fleet';

  const check = useCallback(async () => {
    const { data } = await adminClient().auth.getSession();
    if (!data.session) { setState('signed-out'); return; }
    try {
      const who = await fleetCall<FleetMe | null>('fleet_me');
      if (!who) {
        // stay signed in (the store admin shares this session); just do not open the fleet
        setDenied(`${data.session.user.email ?? 'That account'} is not fleet staff. Ask a super admin for a fleet role.`);
        setState('denied');
        return;
      }
      setMe(who); setDenied(null); setState('ready');
    } catch {
      setDenied('The fleet service could not be reached. Try again in a moment.');
      setState('signed-out');
    }
  }, []);
  useEffect(() => { if (storeConfigured()) void check(); }, [check]);
  useEffect(() => { setMenu(false); }, [pathname]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 4000);
  }, []);

  const act = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    try { return await fn(); } catch (e) {
      if (e instanceof FleetError && e.stepUp) {
        const ok = await new Promise<boolean>((resolve) => setStepUp({ resolve }));
        setStepUp(null);
        if (!ok) throw new Error('Cancelled: the action needs your password.');
        return await fn();
      }
      if (e instanceof FleetError && e.forbidden) throw new Error(e.message.startsWith('your fleet role') ? e.message.charAt(0).toUpperCase() + e.message.slice(1) + '.' : 'You are not allowed to do that.');
      throw e;
    }
  }, []);

  if (!storeConfigured()) return <main className="mx-auto max-w-md px-4 py-20 text-center text-sm text-slate-600">Not configured on this deployment (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing).</main>;
  if (state === 'loading') return <main className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-slate-400" aria-label="Loading" /></main>;
  if (state === 'denied') return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 text-sm">
      <h1 className="text-2xl font-bold tracking-tight">VexaOs Fleet</h1>
      <p role="alert" className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-amber-900 ring-1 ring-amber-200">{denied}</p>
      <div className="mt-4 flex gap-3"><Link href="/admin/store" className="font-semibold text-blue-700">Store admin</Link>
        <button type="button" className="font-semibold text-blue-700" onClick={async () => { await adminClient().auth.signOut(); setState('signed-out'); }}>Use another account</button></div>
    </main>
  );
  if (state === 'signed-out' || !me) return <SignIn onDone={check} denied={denied} />;

  const can = (p: Permission) => me.permissions.includes(p);
  const items = NAV.filter((n) => !n.perm || can(n.perm));
  const active = (href: string) => (href === '/admin/fleet' ? pathname === href : pathname.startsWith(href));
  const nav = (
    <ul className="space-y-0.5">
      {items.map(({ href, label, icon: Icon }) => (
        <li key={href}>
          <Link href={href} aria-current={active(href) ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${active(href) ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-100'}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />{label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Ctx.Provider value={{ me, can, act, toast }}>
      <a href="#fleet-main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <button type="button" className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Activity className="h-5 w-5 text-blue-700" aria-hidden="true" />
          <span className="truncate font-bold tracking-tight">VexaOs Fleet</span>
          <span className="hidden truncate text-xs text-slate-500 sm:inline">{me.email} · {me.role.replace('_', ' ')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/store" className="hidden items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900 sm:inline-flex"><Store className="h-4 w-4" aria-hidden="true" />Store admin</Link>
          <button type="button" onClick={async () => { await adminClient().auth.signOut(); setMe(null); setState('signed-out'); }} className={`${BTN_QUIET} !h-9 !px-3`} aria-label="Sign out">
            <LogOut className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1400px]">
        <nav aria-label="Fleet" className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-slate-200 p-3 lg:block">{nav}</nav>
        {menu && <nav aria-label="Fleet" className="fixed inset-x-0 top-14 z-20 max-h-[80vh] overflow-y-auto border-b border-slate-200 bg-white p-3 shadow-lg lg:hidden">{nav}</nav>}
        <main id="fleet-main" className="min-w-0 flex-1 px-3 pb-16 pt-5 sm:px-6">{children}</main>
      </div>
      {stepUp && <StepUp onDone={() => stepUp.resolve(true)} onCancel={() => stepUp.resolve(false)} />}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        {toastMsg && <div className="pointer-events-auto rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toastMsg}</div>}
      </div>
    </Ctx.Provider>
  );
}
