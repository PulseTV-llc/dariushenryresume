'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { COUNTRY_LIST } from '@/lib/quote-config';

const INDUSTRIES = [
  'Salon / Barbershop',
  'Restaurant / Café',
  'Retail / Store',
  'Spa / Med Spa',
  'Gym / Fitness',
  'Cleaning Company',
  'Security Company',
  'Delivery / Field Service',
  'Repair / Service Shop',
  'Clinic / Healthcare',
  'Warehouse / Logistics',
  'Other',
];

const SYSTEM_TYPES = [
  'A brand new connected system',
  'Replace disconnected tools',
  'Add mobile apps to what I have',
  'Add a touchscreen / kiosk',
  'A dashboard for my operations',
  'Not sure yet — need guidance',
];

const DEVICES = [
  { key: 'web', label: 'Web App / Dashboard' },
  { key: 'ios', label: 'iOS App' },
  { key: 'android', label: 'Android App' },
  { key: 'touchscreen', label: 'Touchscreen / Kiosk' },
  { key: 'customer', label: 'Customer App / Portal' },
  { key: 'employee', label: 'Employee App' },
];

const BUDGETS = [
  'Under $5,000',
  '$5,000 – $12,500',
  '$12,500 – $25,000',
  '$25,000 – $50,000',
  '$50,000+',
  'Not sure yet',
];

const TIMELINES = [
  'Flexible',
  'Within 60 days',
  'Within 30 days',
  'As soon as possible',
];

const inputCls =
  'w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all';
const labelCls = 'block text-sm font-medium text-gray-300 mb-2';

export default function BusinessContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    businessName: '',
    country: '',
    industry: '',
    currentWebsite: '',
    systemType: '',
    budget: '',
    timeline: 'Flexible',
    message: '',
  });
  const [devices, setDevices] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleDevice = (key: string) =>
    setDevices((d) => (d.includes(key) ? d.filter((x) => x !== key) : [...d, key]));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill in your name, email, and a short description of what you need.');
      return;
    }

    setStatus('loading');

    // Map to the /api/contact "new format": `problem` is the required narrative.
    const deviceLabels = DEVICES.filter((d) => devices.includes(d.key)).map((d) => d.label);
    const payload = {
      name: form.name,
      email: form.email,
      problem: form.message,
      situation: form.systemType,
      selectedTier: form.systemType,
      timeline: form.timeline,
      features: deviceLabels,
      additionalDetails: [
        form.businessName && `Business: ${form.businessName}`,
        form.country && `Country: ${form.country}`,
        form.industry && `Industry: ${form.industry}`,
        form.currentWebsite && `Current website: ${form.currentWebsite}`,
        form.budget && `Budget: ${form.budget}`,
        deviceLabels.length && `Devices: ${deviceLabels.join(', ')}`,
      ]
        .filter(Boolean)
        .join('\n'),
      // Extra structured fields (persisted additively by the API)
      businessName: form.businessName,
      country: form.country,
      industry: form.industry,
      currentWebsite: form.currentWebsite,
      systemType: form.systemType,
      devices: deviceLabels,
      budget: form.budget,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-cyan-500/25 bg-cyan-500/[0.05] p-10 sm:p-14 text-center">
        <span className="mx-auto mb-6 flex w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </span>
        <h2 className="text-2xl font-bold text-white mb-3">Your request is in.</h2>
        <p className="text-gray-300 max-w-md mx-auto">
          Thanks, {form.name.split(' ')[0] || 'there'}. We'll review your business and reply with a
          system plan and a clear quote. Keep an eye on{' '}
          <span className="text-cyan-300">{form.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Contact basics */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name <span className="text-cyan-400">*</span>
          </label>
          <input id="name" className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span className="text-cyan-400">*</span>
          </label>
          <input id="email" type="email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@business.com" required />
        </div>
        <div>
          <label htmlFor="businessName" className={labelCls}>Business name</label>
          <input id="businessName" className={inputCls} value={form.businessName} onChange={(e) => set('businessName', e.target.value)} placeholder="Your business" />
        </div>
        <div>
          <label htmlFor="country" className={labelCls}>Country</label>
          <select id="country" className={inputCls} value={form.country} onChange={(e) => set('country', e.target.value)}>
            <option value="">Select a country</option>
            {COUNTRY_LIST.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="industry" className={labelCls}>Industry</label>
          <select id="industry" className={inputCls} value={form.industry} onChange={(e) => set('industry', e.target.value)}>
            <option value="">Select an industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="currentWebsite" className={labelCls}>Current website (if any)</label>
          <input id="currentWebsite" className={inputCls} value={form.currentWebsite} onChange={(e) => set('currentWebsite', e.target.value)} placeholder="https://" />
        </div>
      </div>

      {/* System type */}
      <div>
        <label htmlFor="systemType" className={labelCls}>What type of system do you need?</label>
        <select id="systemType" className={inputCls} value={form.systemType} onChange={(e) => set('systemType', e.target.value)}>
          <option value="">Select an option</option>
          {SYSTEM_TYPES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Devices */}
      <div>
        <span className={labelCls}>Devices needed</span>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEVICES.map((d) => {
            const active = devices.includes(d.key);
            return (
              <button
                type="button"
                key={d.key}
                onClick={() => toggleDevice(d.key)}
                aria-pressed={active}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                  active
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-white'
                    : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-white/20'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                    active ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'
                  }`}
                >
                  {active && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </span>
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget + timeline */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="budget" className={labelCls}>Budget range</label>
          <select id="budget" className={inputCls} value={form.budget} onChange={(e) => set('budget', e.target.value)}>
            <option value="">Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelCls}>Timeline</label>
          <select id="timeline" className={inputCls} value={form.timeline} onChange={(e) => set('timeline', e.target.value)}>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelCls}>
          Tell us about your business <span className="text-cyan-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputCls}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="What are you trying to build or fix? How does your business run today, and what's frustrating about your current tools?"
          required
        />
      </div>

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request My Business System Blueprint
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-gray-500">
        No spam. Your details are only used to prepare your system plan and quote.
      </p>
    </form>
  );
}
