'use client';

import { useState, type FormEvent } from 'react';
import { BellRing, Check, Loader2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { StoreStrings } from '@/lib/store/strings';
import { cleanEmail } from '@/lib/store/waitlist';

/** "Notify me when available" for a coming-soon product. Stores the address; no email is sent yet. */
export default function NotifyForm({ productId, locale, t }: { productId: string; locale: Locale; t: StoreStrings }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');   // left empty by people; bots fill it
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!cleanEmail(email)) { setError(t.soon.notifyInvalid); return; }
    setState('sending');
    setError(null);
    try {
      const res = await fetch('/api/store/waitlist', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ product_id: productId, email, locale, website }) });
      if (res.ok) { setState('done'); return; }
      const body = await res.json().catch(() => ({}));
      setError(body.error === 'invalid_email' ? t.soon.notifyInvalid : t.soon.notifyFailed);
    } catch { setError(t.soon.notifyFailed); }
    setState('idle');
  }

  if (state === 'done') {
    return <p role="status" className="mt-5 flex max-w-md items-start gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 ring-1 ring-emerald-200"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{t.soon.notifyDone}</p>;
  }
  return (
    <form onSubmit={submit} noValidate className="mt-5 max-w-md rounded-2xl border border-slate-200 bg-white/80 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-900"><BellRing className="h-4 w-4 text-blue-600" aria-hidden="true" />{t.soon.notifyTitle}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">{t.soon.email}</span>
          <input type="email" inputMode="email" autoComplete="email" required maxLength={254} value={email} placeholder="name@example.com" aria-invalid={error ? true : undefined} aria-describedby="notify-note"
                 onChange={(e) => { setEmail(e.target.value); setError(null); }}
                 className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30" />
        </label>
        {/* honeypot: hidden from people and assistive technology */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <button type="submit" disabled={state === 'sending'} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
          {state === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}{t.soon.notifyButton}
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-rose-600">{error}</p>}
      <p id="notify-note" className="mt-2 text-xs leading-relaxed text-slate-500">{t.soon.notifyPrivacy}</p>
    </form>
  );
}
