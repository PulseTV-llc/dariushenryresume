'use client';

import { useRef, useState, FormEvent } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { CONTACT_EMAIL, INDUSTRIES } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

const INTERESTS = [
  'Temperature & humidity',
  'Door monitoring',
  'Vibration (in development)',
  'Mobile Gateway (coming soon)',
  'Restaurant OS',
];

const SITE_COUNTS = ['1 site', '2–5 sites', '6–20 sites', '21+ sites'];

const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30';
const labelCls = 'mb-2 block text-sm font-medium text-slate-800';

export default function DemoForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    sites: '',
    message: '',
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const started = useRef(false);

  const set = (k: keyof typeof form, v: string) => {
    if (!started.current) {
      started.current = true;
      trackEvent('contact_started');
    }
    setForm((f) => ({ ...f, [k]: v }));
  };
  const toggle = (name: string) =>
    setInterests((d) => (d.includes(name) ? d.filter((x) => x !== name) : [...d, name]));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please add your name, email and a short note about what you want to monitor.');
      return;
    }

    setStatus('loading');

    // Maps onto the /api/contact "new format": `problem` is the required narrative.
    const payload = {
      name: form.name,
      email: form.email,
      problem: form.message,
      situation: 'Demo request',
      selectedTier: interests.join(', ') || 'Not specified',
      features: interests,
      additionalDetails: [
        form.company && `Company: ${form.company}`,
        form.industry && `Industry: ${form.industry}`,
        form.sites && `Sites: ${form.sites}`,
        interests.length ? `Interested in: ${interests.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      businessName: form.company,
      industry: form.industry,
      locations: form.sites,
      systemType: 'Monitoring platform demo',
      intent: 'demo',
      source: 'vexaos.io/contact',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }
      trackEvent('contact_completed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="rounded-3xl border border-blue-200 bg-blue-50 p-10 text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
          <CheckCircle2 className="h-7 w-7 text-white" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Your request is in.</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-600">
          Thanks, {form.name.split(' ')[0] || 'there'}. We will reply to{' '}
          <span className="font-medium text-slate-900">{form.email}</span> to arrange a time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name <span className="text-blue-700">(required)</span>
          </label>
          <input id="name" className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" required maxLength={100} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Work email <span className="text-blue-700">(required)</span>
          </label>
          <input id="email" type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" required maxLength={100} />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>Company</label>
          <input id="company" className={inputCls} value={form.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" maxLength={200} />
        </div>
        <div>
          <label htmlFor="industry" className={labelCls}>Industry</label>
          <select id="industry" className={inputCls} value={form.industry} onChange={(e) => set('industry', e.target.value)}>
            <option value="">Select an industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i.slug} value={i.name}>{i.name}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="sites" className={labelCls}>How many sites?</label>
          <select id="sites" className={inputCls} value={form.sites} onChange={(e) => set('sites', e.target.value)}>
            <option value="">Select</option>
            {SITE_COUNTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>What are you interested in?</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((name) => {
            const active = interests.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggle(name)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={labelCls}>
          What do you want to monitor? <span className="text-blue-700">(required)</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputCls}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="For example: three walk-in coolers and a freezer across two sites, and the back door."
          required
          maxLength={3000}
        />
      </div>

      {status === 'error' && errorMsg && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {errorMsg} If it keeps happening, email us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">{CONTACT_EMAIL}</a>.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-800 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Request a demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        We use your details only to reply to this request.
      </p>
    </form>
  );
}
