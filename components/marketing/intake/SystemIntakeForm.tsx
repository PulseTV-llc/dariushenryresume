'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { COUNTRY_OPTIONS } from '@/lib/marketing/global';
import {
  INTENT_OPTIONS,
  INDUSTRY_OPTIONS,
  LOCATION_OPTIONS,
  EMPLOYEE_OPTIONS,
  REPLACE_OPTIONS,
  BUILD_TARGET_OPTIONS,
  WEB_SYSTEM_OPTIONS,
  MOBILE_APP_OPTIONS,
  MOBILE_PLATFORM_OPTIONS,
  DEVICE_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  type IntakeIntent,
} from '@/lib/marketing/intake';

export interface IntakeInitial {
  intent?: IntakeIntent;
  country?: string;
  industry?: string;
  system?: string;
  tier?: string;
}

type Variant = 'compact' | 'full';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  industry: string;
  locations: string;
  employees: string;
  existingSoftware: string;
  replaceSystems: string[];
  buildTargets: string[];
  webSystems: string[];
  mobileApps: string[];
  mobilePlatform: string;
  devices: string[];
  integrations: string;
  problem: string;
  budget: string;
  timeline: string;
  intent: IntakeIntent;
  website: string; // honeypot
}

type Field = keyof FormState;

const STEPS: Record<Variant, { title: string; subtitle: string; required: Field[] }[]> = {
  compact: [
    { title: 'About you', subtitle: 'Who we’ll be talking to.', required: ['name', 'company', 'email', 'country'] },
    { title: 'Your operation', subtitle: 'How the business runs today.', required: ['locations'] },
    { title: 'Priorities', subtitle: 'What needs to change first.', required: ['problem'] },
  ],
  full: [
    { title: 'Your company', subtitle: 'Who we’ll be designing for.', required: ['name', 'company', 'email', 'country', 'industry'] },
    { title: 'Your operation', subtitle: 'Locations, people, and the tools you run on today.', required: ['locations'] },
    { title: 'The system', subtitle: 'Web, mobile, devices, and integrations. Pick what applies — “not sure” is fine.', required: [] },
    { title: 'Priorities', subtitle: 'The problem, the budget, and the timeline.', required: ['problem'] },
  ],
};

const LABELS: Partial<Record<Field, string>> = {
  name: 'your name',
  company: 'your company',
  email: 'a work email',
  country: 'your country',
  industry: 'your industry',
  locations: 'number of locations',
  problem: 'your biggest operational problem',
};

const inputCls =
  'w-full min-h-[48px] px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-[16px] sm:text-[15px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors';
const selectCls = `${inputCls} appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10`;
const selectArrow = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
};

export default function SystemIntakeForm({
  variant = 'full',
  placement,
  initial,
}: {
  variant?: Variant;
  /** Where the form is rendered — reported with every analytics event. */
  placement: string;
  initial?: IntakeInitial;
}) {
  const steps = STEPS[variant];
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [missing, setMissing] = useState<Field[]>([]);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: initial?.country ?? '',
    industry: initial?.industry ?? '',
    locations: '',
    employees: '',
    existingSoftware: '',
    replaceSystems: [],
    buildTargets: [],
    webSystems: [],
    mobileApps: [],
    mobilePlatform: '',
    devices: [],
    integrations: '',
    problem: '',
    budget: '',
    timeline: '',
    intent: initial?.intent ?? 'build',
    website: '',
  });

  // Blueprint arrivals count as a started Blueprint once per mount.
  useEffect(() => {
    if (initial?.intent === 'blueprint') trackEvent('blueprint_started', { placement, source: 'intake_prefill' });
  }, [initial?.intent, placement]);

  // Move focus to the step heading when the step changes (not on first paint).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('contact_started', { placement, variant, intent: form.intent });
  };

  const set = <K extends Field>(k: K, v: FormState[K]) => {
    markStarted();
    setForm((f) => ({ ...f, [k]: v }));
    setMissing((m) => m.filter((x) => x !== k));
  };

  const toggle = (k: 'replaceSystems' | 'buildTargets' | 'webSystems' | 'mobileApps' | 'devices', v: string) => {
    markStarted();
    setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
  };

  const validateStep = (index: number) => {
    const req = steps[index].required;
    const empty = req.filter((k) => {
      const v = form[k];
      return Array.isArray(v) ? v.length === 0 : !String(v).trim();
    });
    if (req.includes('email') && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMissing([...empty, 'email']);
      setError('Please enter a valid email address.');
      return false;
    }
    if (empty.length) {
      setMissing(empty);
      setError(`Please add ${empty.map((k) => LABELS[k] ?? k).join(', ')}.`);
      return false;
    }
    setMissing([]);
    setError('');
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    trackEvent('contact_step_completed', { placement, variant, step: step + 1 });
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setError('');
    setMissing([]);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      next();
      return;
    }
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        setStep(i);
        return;
      }
    }

    // Bots fill the hidden field; humans never see it.
    if (form.website) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    const intentLabel = INTENT_OPTIONS.find((o) => o.value === form.intent)?.label ?? form.intent;
    const features = Array.from(new Set([...form.buildTargets, ...form.webSystems, ...form.mobileApps]));

    const lines = [
      `Intent: ${intentLabel}`,
      `Company: ${form.company}`,
      form.phone && `Phone: ${form.phone}`,
      `Country: ${form.country}`,
      form.industry && `Industry: ${form.industry}`,
      `Locations: ${form.locations}`,
      form.employees && `Employees: ${form.employees}`,
      form.existingSoftware && `Existing software: ${form.existingSoftware}`,
      form.replaceSystems.length > 0 && `Systems to replace: ${form.replaceSystems.join(', ')}`,
      form.buildTargets.length > 0 && `Wants to build: ${form.buildTargets.join(', ')}`,
      form.webSystems.length > 0 && `Web systems: ${form.webSystems.join(', ')}`,
      form.mobileApps.length > 0 && `Mobile apps: ${form.mobileApps.join(', ')}`,
      form.mobilePlatform && `Mobile platforms: ${form.mobilePlatform}`,
      form.devices.length > 0 && `Devices: ${form.devices.join(', ')}`,
      form.integrations && `Integrations: ${form.integrations}`,
      form.budget && `Budget: ${form.budget}`,
      form.timeline && `Timeline: ${form.timeline}`,
      initial?.system && `System of interest: ${initial.system}`,
      initial?.tier && `Pricing tier of interest: ${initial.tier}`,
      `Form: ${placement} (${variant})`,
    ].filter(Boolean);

    // Maps onto the /api/contact "new format" (problem is the required narrative).
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      problem: form.problem.trim(),
      situation: intentLabel,
      selectedTier: initial?.tier ?? form.intent,
      timeline: form.timeline || 'Not specified',
      features,
      additionalDetails: lines.join('\n'),
      businessName: form.company,
      country: form.country,
      industry: form.industry,
      systemType: [intentLabel, initial?.system].filter(Boolean).join(' · '),
      devices: form.devices,
      budget: form.budget,
      // Additive intake fields (optional server-side).
      phone: form.phone,
      locations: form.locations,
      employees: form.employees,
      existingSoftware: form.existingSoftware,
      replaceSystems: form.replaceSystems,
      mobilePlatform: form.mobilePlatform,
      integrations: form.integrations,
      intent: form.intent,
      source: placement,
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
      trackEvent('contact_completed', {
        placement,
        variant,
        intent: form.intent,
        industry: form.industry || null,
        country: form.country || null,
        locations: form.locations || null,
        budget: form.budget || null,
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-sky-400/25 bg-sky-500/[0.05] p-8 sm:p-12 text-center" role="status">
        <span className="mx-auto mb-6 flex w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </span>
        <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white outline-none">
          {form.intent === 'blueprint' ? 'Your Blueprint request is in.' : 'Thanks — we have your details.'}
        </h3>
        <p className="mt-3 text-gray-400 max-w-md mx-auto leading-relaxed">
          We&apos;ll review how {form.company || 'your business'} operates and reply to{' '}
          <span className="text-sky-300">{form.email}</span> to schedule a discovery conversation.
        </p>
      </div>
    );
  }

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const invalid = (k: Field) => missing.includes(k);

  return (
    <form onSubmit={submit} noValidate className="relative">
      {/* Progress */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {steps.map((s, i) => (
          <span
            key={s.title}
            className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-gradient-to-r from-sky-400 to-blue-500' : 'bg-white/10'}`}
          />
        ))}
      </div>
      <p className="mt-4 mono-label text-[10px] text-gray-500">
        Step {step + 1} of {steps.length}
      </p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-1 text-xl sm:text-2xl font-semibold text-white outline-none">
        {current.title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">{current.subtitle}</p>

      <div className="mt-7 space-y-5">
        {/* ---------- Step: contact ---------- */}
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="name" label="Name" required invalid={invalid('name')} value={form.name} onChange={(v) => set('name', v)} autoComplete="name" />
            <TextField id="company" label="Company" required invalid={invalid('company')} value={form.company} onChange={(v) => set('company', v)} autoComplete="organization" />
            <TextField id="email" label="Work email" type="email" required invalid={invalid('email')} value={form.email} onChange={(v) => set('email', v)} autoComplete="email" inputMode="email" />
            <TextField id="phone" label="Phone" type="tel" value={form.phone} onChange={(v) => set('phone', v)} autoComplete="tel" inputMode="tel" />
            <SelectField id="country" label="Country" required invalid={invalid('country')} value={form.country} onChange={(v) => set('country', v)} options={COUNTRY_OPTIONS} />
            <SelectField
              id="industry"
              label="Industry"
              required={variant === 'full'}
              invalid={invalid('industry')}
              value={form.industry}
              onChange={(v) => set('industry', v)}
              options={INDUSTRY_OPTIONS}
            />
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
            </div>
          </div>
        )}

        {/* ---------- Step: operation ---------- */}
        {step === 1 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField id="locations" label="Number of locations" required invalid={invalid('locations')} value={form.locations} onChange={(v) => set('locations', v)} options={LOCATION_OPTIONS} />
              <SelectField id="employees" label="Approximate employees" value={form.employees} onChange={(v) => set('employees', v)} options={EMPLOYEE_OPTIONS} />
            </div>
            <TextField
              id="existingSoftware"
              label="Software you use today"
              value={form.existingSoftware}
              onChange={(v) => set('existingSoftware', v)}
              placeholder="e.g. Square POS, 7shifts, Google Sheets, QuickBooks"
            />
            {variant === 'full' ? (
              <ChipGroup label="Systems you want to replace" options={REPLACE_OPTIONS} values={form.replaceSystems} onToggle={(v) => toggle('replaceSystems', v)} />
            ) : (
              <ChipGroup label="What do you want to build?" options={BUILD_TARGET_OPTIONS} values={form.buildTargets} onToggle={(v) => toggle('buildTargets', v)} />
            )}
          </>
        )}

        {/* ---------- Step: system (full only) ---------- */}
        {variant === 'full' && step === 2 && (
          <>
            <ChipGroup label="Web systems needed" options={WEB_SYSTEM_OPTIONS} values={form.webSystems} onToggle={(v) => toggle('webSystems', v)} />
            <ChipGroup label="Mobile apps needed" options={MOBILE_APP_OPTIONS} values={form.mobileApps} onToggle={(v) => toggle('mobileApps', v)} />
            <ChipGroup
              label="Mobile platforms"
              options={MOBILE_PLATFORM_OPTIONS}
              values={form.mobilePlatform ? [form.mobilePlatform] : []}
              onToggle={(v) => set('mobilePlatform', form.mobilePlatform === v ? '' : v)}
            />
            <ChipGroup label="Devices & hardware" options={DEVICE_OPTIONS} values={form.devices} onToggle={(v) => toggle('devices', v)} />
            <TextField
              id="integrations"
              label="Integrations"
              value={form.integrations}
              onChange={(v) => set('integrations', v)}
              placeholder="e.g. Stripe, payroll provider, accounting, delivery platforms"
            />
          </>
        )}

        {/* ---------- Step: priorities ---------- */}
        {isLast && (
          <>
            <div>
              <label htmlFor="problem" className="block text-sm font-medium text-gray-300 mb-2">
                Biggest operational problem <span className="text-sky-400">*</span>
              </label>
              <textarea
                id="problem"
                rows={4}
                maxLength={3000}
                aria-invalid={invalid('problem')}
                className={`${inputCls} ${invalid('problem') ? 'border-red-400/60' : ''}`}
                value={form.problem}
                onChange={(e) => set('problem', e.target.value)}
                placeholder="Where does work fall through the cracks today? What would you fix first?"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField id="budget" label="Budget range" value={form.budget} onChange={(v) => set('budget', v)} options={BUDGET_OPTIONS} />
              <SelectField id="timeline" label="Timeline" value={form.timeline} onChange={(v) => set('timeline', v)} options={TIMELINE_OPTIONS} />
            </div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-300 mb-2">How would you like to start?</legend>
              <div className="grid gap-2.5">
                {INTENT_OPTIONS.map((o) => {
                  const active = form.intent === o.value;
                  return (
                    <label
                      key={o.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        active ? 'border-sky-400/50 bg-sky-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={o.value}
                        checked={active}
                        onChange={() => set('intent', o.value)}
                        className="mt-1 accent-sky-500"
                      />
                      <span>
                        <span className="block text-sm font-medium text-white">{o.label}</span>
                        <span className="block text-xs text-gray-500 mt-0.5">{o.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}
      </div>

      <div aria-live="polite">
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.06] px-4 py-3.5 text-sm text-red-200">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-xl border border-white/15 text-sm font-semibold text-gray-200 hover:bg-white/[0.06] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="sm:ml-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : isLast ? (
            <>
              {form.intent === 'blueprint' ? 'Start My Business Blueprint' : 'Send to VexaOS'}
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <p className="mt-5 text-xs text-gray-500 leading-relaxed">
        We use your details only to respond to this enquiry. No lists, no sharing.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-2">
      {children} {required && <span className="text-sky-400">*</span>}
    </label>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  required,
  invalid,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  invalid?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'email' | 'tel' | 'text';
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        maxLength={300}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={invalid}
        aria-required={required}
        className={`${inputCls} ${invalid ? 'border-red-400/60' : ''}`}
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required,
  invalid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
  invalid?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        aria-required={required}
        className={`${selectCls} ${invalid ? 'border-red-400/60' : ''} ${value ? '' : 'text-gray-500'}`}
        style={selectArrow}
      >
        <option value="" className="bg-[#0b1220]">
          Select
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0b1220] text-white">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ChipGroup({
  label,
  options,
  values,
  onToggle,
}: {
  label: string;
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-300 mb-2.5">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = values.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              aria-pressed={active}
              className={`min-h-[40px] rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                active
                  ? 'border-sky-400/50 bg-sky-500/15 text-white'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/25 hover:text-gray-200'
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
