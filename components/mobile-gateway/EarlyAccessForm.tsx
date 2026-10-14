'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { LOCALE_INFO, localePath, type Locale } from '@/lib/i18n/config';
import { trackEvent } from '@/lib/analytics';
import { COUNTRY_CODES, INDUSTRY_KEYS, LIMITS, MONITOR_KEYS, SIZE_KEYS, validateLaunchForm, type LaunchErrors } from '@/lib/mobile-gateway/launch-list';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';

type F = MobileGatewayStrings['early']['form'];
declare global { interface Window { turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void } } }

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const FIELDS = ['full_name', 'email', 'company', 'industry', 'use_case', 'message', 'consent'] as const;

/**
 * Part 19: the launch list. Validated here for helpful messages and again on the server and in the database.
 * Nothing is emailed: the confirmation says so by saying nothing about email. The unsubscribe link is shown
 * to the person who signed up (it is the only copy of it until confirmation emails exist).
 */
export default function EarlyAccessForm({ t, locale, source }: { t: F; locale: Locale; source: string }) {
  const [type, setType] = useState<'launch_list' | 'consultation'>('launch_list');
  const [errors, setErrors] = useState<LaunchErrors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [fail, setFail] = useState<string | null>(null);
  const [unsubscribe, setUnsubscribe] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // country names come from the browser's Intl data (it differs from the server's), so they are filled in after hydration
  const [countries, setCountries] = useState<{ c: string; n: string }[]>([]);
  useEffect(() => {
    let names: Intl.DisplayNames | null = null;
    try { names = new Intl.DisplayNames([LOCALE_INFO[locale].tag, 'en'], { type: 'region' }); } catch { /* old browser: codes */ }
    setCountries(COUNTRY_CODES.map((c) => ({ c, n: names?.of(c) ?? c })).sort((a, b) => a.n.localeCompare(b.n, LOCALE_INFO[locale].tag)));
  }, [locale]);

  // "Request a Business Consultation" links to #join-consult: switch the form to that request
  useEffect(() => {
    const sync = () => { if (window.location.hash === '#join-consult') { setType('consultation'); setTimeout(() => form.current?.querySelector<HTMLInputElement>('input[name="full_name"]')?.focus({ preventScroll: true }), 400); } };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const renderTurnstile = () => {
    if (!SITE_KEY || !widget.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(widget.current, { sitekey: SITE_KEY, theme: 'dark', language: LOCALE_INFO[locale].tag, callback: (v: string) => setToken(v), 'expired-callback': () => setToken('') });
  };
  useEffect(() => { renderTurnstile(); });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {
      full_name: fd.get('full_name'), email: fd.get('email'), company: fd.get('company'), industry: fd.get('industry'), use_case: fd.get('use_case'),
      country: fd.get('country') || null, deployment_size: fd.get('deployment_size') || null, monitor: fd.getAll('monitor'), message: fd.get('message'),
      request_type: type, consent: fd.get('consent') === 'on', website: fd.get('website'), locale, source, turnstile: token || undefined,
    };
    const checked = validateLaunchForm(data);
    if (!checked.ok) {
      setErrors(checked.errors);
      setFail(t.errors.summary);
      const first = FIELDS.find((f) => checked.errors[f]);
      if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({}); setFail(null); setState('sending');
    try {
      const res = await fetch('/api/launch-list', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setUnsubscribe(typeof body.unsubscribe === 'string' ? body.unsubscribe : null);
        setState('done');
        trackEvent('launch_list_completed', { product: 'mobile-gateway', type, locale });
        setTimeout(() => done.current?.focus(), 50);
        return;
      }
      if (body.error === 'invalid' && body.fields) setErrors(body.fields as LaunchErrors);
      setFail(res.status === 429 ? t.errors.rate : body.error === 'verification' ? t.errors.verification : res.status === 503 ? t.errors.unavailable : body.error === 'invalid' ? t.errors.summary : t.errors.generic);
    } catch {
      setFail(t.errors.generic);
    }
    setState('idle');
    if (widgetId.current) { window.turnstile?.reset(widgetId.current); setToken(''); }
  }

  if (state === 'done') {
    return (
      <div ref={done} tabIndex={-1} role="status" className="mg-form p-7 text-center outline-none sm:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#45B8FF]" aria-hidden="true" />
        <h3 className="mg-h3 mt-5">{t.success.title}</h3>
        <p className="mg-lead mx-auto mt-4 max-w-md">{t.success.body}</p>
        <div className="mt-8 flex flex-col items-center gap-3 text-sm">
          {unsubscribe && <a href={localePath(locale, unsubscribe.split('#')[0]) + '#' + unsubscribe.split('#')[1]} className="text-[#9CA7B5] underline underline-offset-4 hover:text-white">{t.success.unsubscribe}</a>}
          <button type="button" onClick={() => { setState('idle'); setUnsubscribe(null); }} className="font-semibold text-[#45B8FF] hover:text-[#7dcbff]">{t.success.again}</button>
        </div>
      </div>
    );
  }

  const err = (k: keyof LaunchErrors) => errors[k] ? (errors[k] === 'tooLong' ? t.errors.tooLong : t.errors[errors[k] as Exclude<NonNullable<LaunchErrors[typeof k]>, 'tooLong'>]) : null;
  const field = (name: keyof LaunchErrors) => ({ name, 'aria-invalid': errors[name] ? true : undefined, 'aria-describedby': errors[name] ? `mg-e-${name}` : undefined });
  const Err = ({ k }: { k: keyof LaunchErrors }) => (errors[k] ? <p id={`mg-e-${k}`} className="mg-err">{err(k)}</p> : null);
  const req = <span aria-hidden="true" className="text-[#45B8FF]"> *</span>;
  const opt = <span className="font-normal text-[#657181]"> ({t.optional})</span>;

  return (
    <form ref={form} onSubmit={submit} noValidate className="mg-form p-5 sm:p-8" aria-labelledby="mg-form-title">
      <h3 id="mg-form-title" className="text-xl font-semibold tracking-tight">{type === 'consultation' ? t.typeConsult : t.title}</h3>
      <p className="mt-1 text-sm text-[#9CA7B5]">{t.intro}</p>

      <fieldset className="mt-5">
        <legend className="mg-field">{t.type}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(['launch_list', 'consultation'] as const).map((v) => (
            <label key={v} className="mg-choice">
              <input type="radio" name="request_type" value={v} checked={type === v} onChange={() => setType(v)} />
              {v === 'launch_list' ? t.typeList : t.typeConsult}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="mg-field">{t.name}{req}
          <input {...field('full_name')} type="text" autoComplete="name" required maxLength={LIMITS.name} className="mg-input" />
          <Err k="full_name" />
        </label>
        <label className="mg-field">{t.email}{req}
          <input {...field('email')} type="email" inputMode="email" autoComplete="email" required maxLength={254} className="mg-input" />
          <Err k="email" />
        </label>
        <label className="mg-field">{t.company}{req}
          <input {...field('company')} type="text" autoComplete="organization" required maxLength={LIMITS.company} className="mg-input" />
          <Err k="company" />
        </label>
        <label className="mg-field">{t.industry}{req}
          <select {...field('industry')} required defaultValue="" className="mg-input">
            <option value="" disabled>{t.choose}</option>
            {INDUSTRY_KEYS.map((k, i) => <option key={k} value={k}>{t.industries[i]}</option>)}
          </select>
          <Err k="industry" />
        </label>
        <label className="mg-field sm:col-span-2">{t.useCase}{opt}
          <input {...field('use_case')} type="text" maxLength={LIMITS.useCase} placeholder={t.useCaseHint} className="mg-input" />
          <Err k="use_case" />
        </label>
        <label className="mg-field">{t.country}{opt}
          <select name="country" defaultValue="" autoComplete="country" className="mg-input">
            <option value="">{t.choose}</option>
            {countries.map(({ c, n }) => <option key={c} value={c}>{n}</option>)}
          </select>
        </label>
        <label className="mg-field">{t.quantity}{opt}
          <select name="deployment_size" defaultValue="" className="mg-input">
            <option value="">{t.choose}</option>
            {SIZE_KEYS.map((k, i) => <option key={k} value={k}>{t.quantities[i]}</option>)}
          </select>
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="mg-field">{t.monitor}{opt}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MONITOR_KEYS.map((k, i) => <label key={k} className="mg-choice"><input type="checkbox" name="monitor" value={k} />{t.monitorOptions[i]}</label>)}
        </div>
      </fieldset>

      <label className="mg-field mt-5">{t.message}{opt}
        <textarea {...field('message')} rows={3} maxLength={LIMITS.message} className="mg-input resize-y" />
        <Err k="message" />
      </label>

      {/* a field people never see: bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>{t.honeypot}<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="mg-check mt-5 text-sm leading-relaxed text-[#C9D1DB]">
        <input {...field('consent')} type="checkbox" required />
        <span>{t.consent}{req}</span>
      </label>
      <Err k="consent" />

      {SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onLoad={renderTurnstile} />
          <div ref={widget} className="mt-5 min-h-[65px]" />
        </>
      )}

      {fail && <p role="alert" className="mt-5 rounded-xl bg-[#F04438]/10 px-4 py-3 text-sm text-[#FDA29B] ring-1 ring-[#F04438]/30">{fail}</p>}

      <button type="submit" disabled={state === 'sending'} className="mg-btn mg-btn-primary mt-6 w-full sm:w-auto">
        {state === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{t.submitting}</> : <>{type === 'consultation' ? t.submitConsult : t.submit}<ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-[#657181]">{t.privacy}</p>
    </form>
  );
}
