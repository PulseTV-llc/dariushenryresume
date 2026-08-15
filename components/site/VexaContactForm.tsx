'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { PRODUCTS, VERTICALS } from '@/lib/vexaos';

const LOCATION_COUNTS = ['1 location', '2–5 locations', '6–20 locations', '21+ locations'];

const TIMELINES = [
  'Just exploring',
  'Next 3–6 months',
  'Next 60 days',
  'As soon as possible',
];

const inputCls =
  'w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors';
const labelCls = 'block text-sm font-medium text-gray-300 mb-2';

export default function VexaContactForm({
  variant = 'contact',
}: {
  /** 'demo' tunes the copy for a scheduled walkthrough. */
  variant?: 'demo' | 'contact';
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    locations: '',
    timeline: 'Next 3–6 months',
    message: '',
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleInterest = (name: string) =>
    setInterests((d) => (d.includes(name) ? d.filter((x) => x !== name) : [...d, name]));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please add your name, email, and a short note about what you need.');
      return;
    }

    setStatus('loading');

    // Maps onto the /api/contact "new format" — `problem` is the required narrative.
    const payload = {
      name: form.name,
      email: form.email,
      problem: form.message,
      situation: variant === 'demo' ? 'Demo request' : 'Sales enquiry',
      selectedTier: interests.join(', ') || 'Not specified',
      timeline: form.timeline,
      features: interests,
      additionalDetails: [
        `Request type: ${variant === 'demo' ? 'Book a demo' : 'Contact sales'}`,
        form.company && `Company: ${form.company}`,
        form.role && `Role: ${form.role}`,
        form.industry && `Industry: ${form.industry}`,
        form.locations && `Locations: ${form.locations}`,
        interests.length ? `Products of interest: ${interests.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      businessName: form.company,
      industry: form.industry,
      systemType: variant === 'demo' ? 'Demo request' : 'Sales enquiry',
      devices: interests,
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
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-sky-400/25 bg-sky-500/[0.05] p-10 sm:p-14 text-center">
        <span className="mx-auto mb-6 flex w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </span>
        <h2 className="text-2xl font-bold text-white mb-3">
          {variant === 'demo' ? 'Your demo request is in.' : 'Message received.'}
        </h2>
        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
          Thanks, {form.name.split(' ')[0] || 'there'}. We&apos;ll be in touch at{' '}
          <span className="text-sky-300">{form.email}</span>
          {variant === 'demo'
            ? ' to schedule a walkthrough against your operation.'
            : ' with next steps.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Basics */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name <span className="text-sky-400">*</span>
          </label>
          <input
            id="name"
            className={inputCls}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Work email <span className="text-sky-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputCls}
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company
          </label>
          <input
            id="company"
            className={inputCls}
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            placeholder="Business name"
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="role" className={labelCls}>
            Your role
          </label>
          <input
            id="role"
            className={inputCls}
            value={form.role}
            onChange={(e) => set('role', e.target.value)}
            placeholder="Owner, operations, IT…"
          />
        </div>
        <div>
          <label htmlFor="industry" className={labelCls}>
            Industry
          </label>
          <select
            id="industry"
            className={inputCls}
            value={form.industry}
            onChange={(e) => set('industry', e.target.value)}
          >
            <option value="">Select an industry</option>
            {VERTICALS.map((v) => (
              <option key={v.slug} value={v.name} className="bg-[#0b1220]">
                {v.name}
              </option>
            ))}
            <option value="Other" className="bg-[#0b1220]">
              Other
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="locations" className={labelCls}>
            Locations
          </label>
          <select
            id="locations"
            className={inputCls}
            value={form.locations}
            onChange={(e) => set('locations', e.target.value)}
          >
            <option value="">Select</option>
            {LOCATION_COUNTS.map((l) => (
              <option key={l} value={l} className="bg-[#0b1220]">
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products of interest */}
      <div>
        <span className={labelCls}>Which products are you interested in?</span>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {PRODUCTS.map((p) => {
            const active = interests.includes(p.name);
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => toggleInterest(p.name)}
                aria-pressed={active}
                className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                  active
                    ? 'border-sky-400/40 bg-sky-500/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                }`}
              >
                <span className="block text-sm font-medium">{p.name}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{p.role}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => toggleInterest('Not sure yet')}
            aria-pressed={interests.includes('Not sure yet')}
            className={`text-left px-4 py-3 rounded-xl border transition-colors ${
              interests.includes('Not sure yet')
                ? 'border-sky-400/40 bg-sky-500/10 text-white'
                : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
            }`}
          >
            <span className="block text-sm font-medium">Not sure yet</span>
            <span className="block text-xs text-gray-500 mt-0.5">Help me work it out</span>
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className={labelCls}>
          Timeline
        </label>
        <select
          id="timeline"
          className={inputCls}
          value={form.timeline}
          onChange={(e) => set('timeline', e.target.value)}
        >
          {TIMELINES.map((t) => (
            <option key={t} value={t} className="bg-[#0b1220]">
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelCls}>
          What are you trying to fix? <span className="text-sky-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputCls}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="How does your business run today — what systems are you on, and where is the friction? The more specific, the more useful the walkthrough."
          required
        />
      </div>

      {errorMsg && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.06] px-4 py-3.5 text-sm text-red-200">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            {variant === 'demo' ? 'Request my demo' : 'Send message'}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        We use your details only to respond to this enquiry. No lists, no sharing.
      </p>
    </form>
  );
}
