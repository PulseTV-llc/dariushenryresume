'use client';

import { useMemo, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Copy,
  FileText,
  FileJson,
  RotateCcw,
  Printer,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import {
  PLATFORM_OPTIONS,
  PlatformKey,
  FEATURE_MODULES,
  FeatureModuleKey,
  QUANTITY_PRICING,
  QuantityKey,
  COMPLEXITY_MULTIPLIERS,
  ComplexityKey,
  TIMELINE_MULTIPLIERS,
  TimelineKey,
  COUNTRY_TIERS,
  COUNTRY_LIST,
  SUPPORT_TIERS,
  SupportTierKey,
  SUPPORT_ADDONS,
  PAYMENT_SCHEDULES,
  PaymentScheduleKey,
  DISCLAIMERS,
} from '@/lib/quote-config';
import { calculateQuote, QuoteInput } from '@/lib/quote-engine';

/* ------------------------------------------------------------------ */
const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

const INDUSTRIES = [
  { key: 'salon', label: 'Salon / Barbershop / Spa', modules: ['scheduling', 'customerProfiles', 'smsEmailAlerts', 'loyalty'] },
  { key: 'restaurant', label: 'Restaurant / Café', modules: ['payments', 'reports', 'loyalty', 'realtimeSync'] },
  { key: 'retail', label: 'Retail / Store', modules: ['inventory', 'payments', 'customerProfiles', 'reports'] },
  { key: 'field', label: 'Field Workforce / Mobile', modules: ['jobTracking', 'geolocation', 'photoUploads', 'digitalSignatures'] },
  { key: 'cleaning', label: 'Cleaning / Security', modules: ['scheduling', 'jobTracking', 'photoUploads', 'smsEmailAlerts'] },
  { key: 'clinic', label: 'Clinic / Med Spa', modules: ['scheduling', 'customerProfiles', 'digitalSignatures', 'smsEmailAlerts'] },
  { key: 'gym', label: 'Gym / Fitness', modules: ['scheduling', 'payments', 'customerProfiles', 'loyalty'] },
  { key: 'repair', label: 'Repair / Service Shop', modules: ['jobTracking', 'inventory', 'smsEmailAlerts', 'payments'] },
  { key: 'other', label: 'Other / Custom', modules: [] },
];

const emptyPlatforms = (): Record<PlatformKey, boolean> =>
  Object.keys(PLATFORM_OPTIONS).reduce((acc, k) => {
    acc[k as PlatformKey] = false;
    return acc;
  }, {} as Record<PlatformKey, boolean>);

/* ------------------------------------------------------------------ */
export default function QuoteCalculator() {
  const router = useRouter();

  // Section A — client info
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  // Section B — industry
  const [industry, setIndustry] = useState('other');
  // Section C/D/E
  const [platforms, setPlatforms] = useState<Record<PlatformKey, boolean>>(emptyPlatforms());
  const [features, setFeatures] = useState<Partial<Record<FeatureModuleKey, boolean>>>({});
  const [quantities, setQuantities] = useState<Partial<Record<QuantityKey, number>>>({});
  // Section F/G
  const [complexity, setComplexity] = useState<ComplexityKey>('moderate');
  const [timeline, setTimeline] = useState<TimelineKey>('flexible');
  // Section H
  const [country, setCountry] = useState('United States');
  const [useManualMultiplier, setUseManualMultiplier] = useState(false);
  const [manualMultiplier, setManualMultiplier] = useState(1.0);
  const [overrideMinimums, setOverrideMinimums] = useState(false);
  // Section I
  const [supportTierOverride, setSupportTierOverride] = useState<SupportTierKey | ''>('');
  const [supportAddons, setSupportAddons] = useState<string[]>([]);
  // Section J
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleKey>('milestone');
  // Budget
  const [clientBudget, setClientBudget] = useState('');
  const [copied, setCopied] = useState(false);

  const input: QuoteInput = useMemo(
    () => ({
      platforms,
      features,
      quantities,
      complexity,
      timeline,
      country,
      manualMultiplier: useManualMultiplier ? manualMultiplier : null,
      overrideMinimums,
      supportTierOverride: supportTierOverride || null,
      supportAddons,
      paymentSchedule,
      clientBudget: clientBudget ? Number(clientBudget) : null,
    }),
    [platforms, features, quantities, complexity, timeline, country, useManualMultiplier, manualMultiplier, overrideMinimums, supportTierOverride, supportAddons, paymentSchedule, clientBudget],
  );

  const r = useMemo(() => calculateQuote(input), [input]);

  const togglePlatform = (k: PlatformKey) =>
    setPlatforms((p) => ({ ...p, [k]: !p[k] }));
  const toggleFeature = (k: FeatureModuleKey) =>
    setFeatures((f) => ({ ...f, [k]: !f[k] }));
  const setQty = (k: QuantityKey, v: number) =>
    setQuantities((q) => ({ ...q, [k]: Math.max(0, v) }));
  const toggleAddon = (k: string) =>
    setSupportAddons((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]));

  const applyRecommended = () => {
    const rec = INDUSTRIES.find((i) => i.key === industry)?.modules ?? [];
    setFeatures((f) => {
      const next = { ...f };
      rec.forEach((m) => (next[m as FeatureModuleKey] = true));
      return next;
    });
  };

  const reset = () => {
    setClientName('');
    setBusinessName('');
    setIndustry('other');
    setPlatforms(emptyPlatforms());
    setFeatures({});
    setQuantities({});
    setComplexity('moderate');
    setTimeline('flexible');
    setCountry('United States');
    setUseManualMultiplier(false);
    setManualMultiplier(1.0);
    setOverrideMinimums(false);
    setSupportTierOverride('');
    setSupportAddons([]);
    setPaymentSchedule('milestone');
    setClientBudget('');
  };

  const quoteText = useMemo(
    () => buildQuoteText({ clientName, businessName, industry, r }),
    [clientName, businessName, industry, r],
  );

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportText = () =>
    download(quoteText, `quote-${businessName || 'client'}.txt`, 'text/plain');

  const exportJson = () =>
    download(
      JSON.stringify({ clientName, businessName, industry, input, result: r }, null, 2),
      `quote-${businessName || 'client'}.json`,
      'application/json',
    );

  const handleSignOut = async () => {
    await signOut(auth).catch(() => {});
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl border-b border-white/10 print:hidden">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Quote Calculator</h1>
            <p className="text-xs text-gray-500">Private admin tool · internal pricing</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reset} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-all">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button onClick={handleSignOut} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-all">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[1fr_400px] gap-6 pb-28 lg:pb-6">
        {/* ---------- LEFT: form ---------- */}
        <div className="space-y-5">
          {/* A. Client info */}
          <Card title="A · Client Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Client name">
                <input className={inputCls} value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" />
              </Field>
              <Field label="Business name">
                <input className={inputCls} value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Business" />
              </Field>
            </div>
          </Card>

          {/* B. Industry */}
          <Card title="B · Business Type / Industry" hint="Industry only suggests recommended modules — it never forces them.">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
              <Field label="Industry" className="flex-1">
                <select className={inputCls} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  {INDUSTRIES.map((i) => (
                    <option key={i.key} value={i.key}>{i.label}</option>
                  ))}
                </select>
              </Field>
              <button
                type="button"
                onClick={applyRecommended}
                disabled={industry === 'other'}
                className="px-4 py-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-sm font-medium hover:bg-cyan-500/25 transition-all disabled:opacity-40"
              >
                Apply recommended modules
              </button>
            </div>
          </Card>

          {/* C. Platforms */}
          <Card title="C · Core Platform Options">
            <div className="grid sm:grid-cols-2 gap-3">
              {(Object.keys(PLATFORM_OPTIONS) as PlatformKey[]).map((k) => {
                const opt = PLATFORM_OPTIONS[k];
                return (
                  <Toggle key={k} active={platforms[k]} onClick={() => togglePlatform(k)} label={opt.label} price={opt.price} note={opt.note} />
                );
              })}
            </div>
            {r.platform.bothSeparateNative && (
              <Notice level="amber">
                Separate native iOS + Android selected → billed as {money(10000)} combined.
                Consider <strong>Cross-Platform Mobile ({money(PLATFORM_OPTIONS.crossPlatformMobile.price)})</strong> instead unless you truly need native-only features.
              </Notice>
            )}
          </Card>

          {/* D. Feature modules */}
          <Card title="D · Feature Modules">
            <div className="grid sm:grid-cols-2 gap-3">
              {FEATURE_MODULES.map((m) => (
                <Toggle key={m.key} active={!!features[m.key]} onClick={() => toggleFeature(m.key)} label={m.label} price={m.price} />
              ))}
            </div>
          </Card>

          {/* E. Quantities */}
          <Card title="E · Quantities">
            <div className="grid sm:grid-cols-2 gap-4">
              {(Object.keys(QUANTITY_PRICING) as QuantityKey[]).map((k) => {
                const cfg = QUANTITY_PRICING[k];
                return (
                  <Field key={k} label={`${cfg.label} — ${money(cfg.price)} each${cfg.freeUnits ? `, first ${cfg.freeUnits} free` : ''}`}>
                    <input
                      type="number"
                      min={0}
                      className={inputCls}
                      value={quantities[k] ?? 0}
                      onChange={(e) => setQty(k, Number(e.target.value))}
                    />
                  </Field>
                );
              })}
            </div>
          </Card>

          {/* F. Complexity */}
          <Card title="F · Complexity Multiplier" hint="Applied to the BUILD FEE only — never to hard third-party usage fees.">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {COMPLEXITY_MULTIPLIERS.map((c) => (
                <Pill key={c.key} active={complexity === c.key} onClick={() => setComplexity(c.key)} title={c.label} sub={`×${c.value}`} />
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">{COMPLEXITY_MULTIPLIERS.find((c) => c.key === complexity)?.note}</p>
          </Card>

          {/* G. Timeline */}
          <Card title="G · Rush / Timeline Multiplier">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIMELINE_MULTIPLIERS.map((t) => (
                <Pill key={t.key} active={timeline === t.key} onClick={() => setTimeline(t.key)} title={t.label} sub={`×${t.value}`} />
              ))}
            </div>
          </Card>

          {/* H. Country pricing */}
          <Card title="H · Country-Based Pricing Intelligence">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Country">
                <select className={inputCls} value={country} onChange={(e) => setCountry(e.target.value)}>
                  {COUNTRY_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Client budget (optional, USD)">
                <input type="number" min={0} className={inputCls} value={clientBudget} onChange={(e) => setClientBudget(e.target.value)} placeholder="e.g. 8000" />
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" checked={useManualMultiplier} onChange={(e) => setUseManualMultiplier(e.target.checked)} className="accent-cyan-500 w-4 h-4" />
                Manual multiplier override
              </label>
              {useManualMultiplier && (
                <input
                  type="number"
                  step={0.05}
                  min={0.1}
                  className={`${inputCls} w-28`}
                  value={manualMultiplier}
                  onChange={(e) => setManualMultiplier(Number(e.target.value))}
                />
              )}
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" checked={overrideMinimums} onChange={(e) => setOverrideMinimums(e.target.checked)} className="accent-red-500 w-4 h-4" />
                Override minimum protection
              </label>
            </div>

            {/* Country display */}
            <div className="mt-5 rounded-xl bg-white/[0.03] border border-white/10 p-4 grid sm:grid-cols-3 gap-3 text-sm">
              <Stat label="Detected tier" value={r.countryTier.label.replace(/^Tier \d+ — /, '')} sub={`Tier ${r.countryTierKey.replace('tier', '')}`} />
              <Stat label="Suggested ×" value={`×${r.suggestedMultiplier}`} sub={r.countryMapped ? 'auto' : 'default (unmapped)'} />
              <Stat label="Effective ×" value={`×${r.effectiveMultiplier}`} sub={r.isManualOverride ? 'manual' : 'suggested'} />
              <Stat label="Base US setup" value={money(r.usBaseSetup)} sub="pre-country" />
              <Stat label="Adjusted setup" value={money(r.marketSetupRaw)} sub="pre-minimum" />
              <Stat label="Min applied?" value={r.minApplied ? `Yes → ${money(r.minimumFloor)}` : 'No'} sub={`floor ${money(r.minimumFloor)}`} />
            </div>

            {/* Comparison table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left py-2 pr-3">Tier</th>
                    <th className="text-right py-2 px-3">×</th>
                    <th className="text-right py-2 px-3">Setup</th>
                    <th className="text-right py-2 pl-3">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {r.comparison.map((c) => (
                    <tr key={c.tierKey} className={`border-t border-white/5 ${c.tierKey === r.countryTierKey ? 'text-cyan-300' : 'text-gray-300'}`}>
                      <td className="py-2 pr-3">{c.label.replace(/^Tier \d+ — /, `Tier ${c.tierKey.replace('tier', '')} · `)}</td>
                      <td className="text-right py-2 px-3">×{c.multiplier}</td>
                      <td className="text-right py-2 px-3">{money(c.setup)}{c.floored ? '*' : ''}</td>
                      <td className="text-right py-2 pl-3">{money(c.monthly)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-1">* minimum price protection applied</p>
            </div>
          </Card>

          {/* I. Monthly support */}
          <Card title="I · Monthly Support" hint={`Recommended for ${complexity}: ${SUPPORT_TIERS.find((t) => t.key === r.recommendedSupportTierKey)?.label}`}>
            <Field label="Support tier">
              <select className={inputCls} value={supportTierOverride} onChange={(e) => setSupportTierOverride(e.target.value as SupportTierKey | '')}>
                <option value="">Recommended — {SUPPORT_TIERS.find((t) => t.key === r.recommendedSupportTierKey)?.label} ({money(SUPPORT_TIERS.find((t) => t.key === r.recommendedSupportTierKey)!.price)})</option>
                {SUPPORT_TIERS.map((t) => (
                  <option key={t.key} value={t.key}>{t.label} — {money(t.price)}{'plus' in t && t.plus ? '+' : ''}/mo</option>
                ))}
              </select>
            </Field>
            <div className="mt-3">
              <span className="text-xs uppercase tracking-wider text-gray-500">Add-ons</span>
              <div className="grid sm:grid-cols-2 gap-2 mt-2">
                {SUPPORT_ADDONS.map((a) => (
                  <Toggle key={a.key} active={supportAddons.includes(a.key)} onClick={() => toggleAddon(a.key)} label={a.label} price={a.price} small />
                ))}
              </div>
            </div>
          </Card>

          {/* J. Payment schedule */}
          <Card title="J · Payment Schedule">
            <Field label="Schedule">
              <select className={inputCls} value={paymentSchedule} onChange={(e) => setPaymentSchedule(e.target.value as PaymentScheduleKey)}>
                {Object.values(PAYMENT_SCHEDULES).map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </Field>
            <div className="mt-3 space-y-2">
              {r.paymentPlan.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-sm rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2">
                  <span className="text-gray-300">{p.label} <span className="text-gray-500">({Math.round(p.pct * 100)}%)</span></span>
                  <span className="font-semibold text-white">{money(p.amount)}</span>
                </div>
              ))}
              {r.schedule.financingUplift > 0 && (
                <p className="text-xs text-amber-300/80">Includes +{Math.round(r.schedule.financingUplift * 100)}% financing. Financed total: {money(r.financedTotal)}.</p>
              )}
            </div>
          </Card>

          {/* Phased pricing */}
          <Card title="Phased Build Recommendation">
            <div className="grid sm:grid-cols-3 gap-3">
              {r.phases.map((p) => (
                <div key={p.name} className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="text-sm font-semibold text-white mb-1">{p.name}</div>
                  <div className="text-xs text-gray-500 mb-3 leading-relaxed">{p.detail}</div>
                  <div className="text-lg font-bold text-cyan-300">{money(p.amount)}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* N/O — disclaimers */}
          <Card title="Notes & Disclaimers (internal)">
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2"><Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />{DISCLAIMERS.scopeWarning}</li>
              <li className="flex gap-2"><Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />{DISCLAIMERS.thirdPartyFees}</li>
              <li className="flex gap-2"><Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />{DISCLAIMERS.marketAdjustmentNote}</li>
              <li className="flex gap-2"><Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />{DISCLAIMERS.minimumProtectionNote}</li>
            </ul>
          </Card>
        </div>

        {/* ---------- RIGHT: sticky summary ---------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <SummaryPanel r={r} />
            <ExportButtons
              copied={copied}
              onCopy={copyQuote}
              onText={exportText}
              onJson={exportJson}
              onPrint={() => window.print()}
              onReset={reset}
            />
          </div>
        </aside>
      </div>

      {/* Mobile bottom summary */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3 print:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">Recommended setup</div>
            <div className="text-xl font-black text-white">{money(r.finalSetup)} <span className="text-xs font-normal text-cyan-300">+ {money(r.finalMonthly)}/mo</span></div>
          </div>
          <button onClick={copyQuote} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold">
            {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy quote</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Presentational subcomponents                                       */
/* ================================================================== */
const inputCls =
  'w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm';

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white/[0.02] border border-white/10 p-5">
      <h2 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h2>
      {hint && <p className="text-xs text-gray-500 mt-1 mb-3">{hint}</p>}
      <div className={hint ? '' : 'mt-4'}>{children}</div>
    </section>
  );
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs text-gray-400 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ active, onClick, label, price, note, small }: { active: boolean; onClick: () => void; label: string; price: number; note?: string; small?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-left rounded-lg border px-3 py-2.5 transition-all ${
        active ? 'bg-cyan-500/10 border-cyan-500/40' : 'bg-black/30 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`${small ? 'text-xs' : 'text-sm'} font-medium ${active ? 'text-white' : 'text-gray-300'}`}>{label}</span>
        <span className={`text-xs font-semibold ${active ? 'text-cyan-300' : 'text-gray-500'}`}>{money(price)}</span>
      </div>
      {note && <p className="text-[11px] text-gray-500 mt-1 leading-snug">{note}</p>}
    </button>
  );
}

function Pill({ active, onClick, title, sub }: { active: boolean; onClick: () => void; title: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2 py-2.5 text-center transition-all ${
        active ? 'bg-cyan-500/15 border-cyan-500/40' : 'bg-black/30 border-white/10 hover:border-white/20'
      }`}
    >
      <div className={`text-xs font-semibold ${active ? 'text-white' : 'text-gray-300'}`}>{title}</div>
      <div className={`text-[11px] ${active ? 'text-cyan-300' : 'text-gray-500'}`}>{sub}</div>
    </button>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
      <div className="text-sm font-bold text-white">{value}</div>
      {sub && <div className="text-[10px] text-gray-500">{sub}</div>}
    </div>
  );
}

function Notice({ level, children }: { level: 'amber' | 'red' | 'info'; children: React.ReactNode }) {
  const styles = {
    amber: 'bg-amber-500/10 border-amber-500/25 text-amber-200',
    red: 'bg-red-500/10 border-red-500/25 text-red-200',
    info: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-100',
  }[level];
  return <div className={`mt-3 flex gap-2 rounded-lg border px-3 py-2.5 text-xs leading-relaxed ${styles}`}><AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" /><div>{children}</div></div>;
}

function SummaryPanel({ r }: { r: ReturnType<typeof calculateQuote> }) {
  const strategyColor: Record<string, string> = {
    red: 'bg-red-500/15 border-red-500/40 text-red-200',
    amber: 'bg-amber-500/15 border-amber-500/40 text-amber-200',
    sky: 'bg-sky-500/15 border-sky-500/40 text-sky-200',
    emerald: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200',
    blue: 'bg-blue-500/15 border-blue-500/40 text-blue-200',
  };
  return (
    <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-5">
      <div className="text-xs uppercase tracking-wider text-gray-500">Final recommended</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-3xl font-black text-white">{money(r.finalSetup)}</span>
        <span className="text-sm text-gray-500">setup</span>
      </div>
      <div className="text-cyan-300 font-semibold">+ {money(r.finalMonthly)}/mo support</div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <Stat label="Package" value={r.pkg.label} />
        <Stat label="Timeline" value={r.timelineEstimate} />
        <Stat label="Build fee (US)" value={money(r.usBaseSetup)} sub={`×${r.complexity.value} · ×${r.timeline.value}`} />
        <Stat label="Support tier" value={r.supportTier.label} />
      </div>

      {/* Strategy */}
      <div className={`mt-4 rounded-xl border px-3 py-2.5 ${strategyColor[r.strategy.color] || strategyColor.blue}`}>
        <div className="text-[10px] uppercase tracking-wider opacity-80">Strategy</div>
        <div className="font-bold">{r.strategy.label}</div>
        <div className="text-xs opacity-90 mt-0.5">{r.strategy.reason}</div>
      </div>

      {/* Budget check */}
      {r.budgetCheck && (
        <div className={`mt-3 rounded-xl border px-3 py-2.5 text-xs ${r.budgetCheck.covered ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-200' : 'bg-amber-500/10 border-amber-500/25 text-amber-200'}`}>
          <div className="font-semibold">{r.budgetCheck.message}</div>
          <div className="opacity-90 mt-0.5">{r.budgetCheck.suggestion}</div>
        </div>
      )}

      {/* Warnings */}
      {r.warnings.length > 0 && (
        <div className="mt-3 space-y-2">
          {r.warnings.map((w, i) => {
            const Icon = w.level === 'red' ? AlertTriangle : w.level === 'amber' ? AlertTriangle : Info;
            const cls =
              w.level === 'red'
                ? 'text-red-300'
                : w.level === 'amber'
                ? 'text-amber-300'
                : 'text-gray-400';
            return (
              <div key={i} className={`flex gap-2 text-xs ${cls}`}>
                <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{w.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ExportButtons({ copied, onCopy, onText, onJson, onPrint, onReset }: { copied: boolean; onCopy: () => void; onText: () => void; onJson: () => void; onPrint: () => void; onReset: () => void }) {
  const btn = 'flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all';
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 grid grid-cols-2 gap-2 print:hidden">
      <button onClick={onCopy} className={`${btn} col-span-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white`}>
        {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Quote Summary</>}
      </button>
      <button onClick={onText} className={`${btn} bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10`}><FileText className="w-4 h-4" /> Text</button>
      <button onClick={onJson} className={`${btn} bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10`}><FileJson className="w-4 h-4" /> JSON</button>
      <button onClick={onPrint} className={`${btn} bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10`}><Printer className="w-4 h-4" /> Print / PDF</button>
      <button onClick={onReset} className={`${btn} bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10`}><RotateCcw className="w-4 h-4" /> Reset</button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function buildQuoteText({ clientName, businessName, industry, r }: { clientName: string; businessName: string; industry: string; r: ReturnType<typeof calculateQuote> }) {
  const L: string[] = [];
  const line = (s = '') => L.push(s);
  const ind = INDUSTRIES.find((i) => i.key === industry)?.label ?? industry;

  line('CUSTOM CONNECTED BUSINESS SYSTEM — QUOTE SUMMARY');
  line('================================================');
  if (clientName) line(`Client:       ${clientName}`);
  if (businessName) line(`Business:     ${businessName}`);
  line(`Industry:     ${ind}`);
  line(`Country:      ${r.country} (${r.countryTier.label})`);
  line('');
  line('PLATFORMS & MODULES');
  line('-------------------');
  r.platform.lines.forEach((l) => line(`  • ${l.label} — ${money(l.price)}`));
  r.feature.lines.forEach((l) => line(`  • ${l.label} — ${money(l.price)}`));
  r.quantity.lines.forEach((l) => line(`  • ${l.label} — ${money(l.price)}`));
  line('');
  line(`Base build fee (US):      ${money(r.buildFeeBase)}`);
  line(`Complexity:               ${r.complexity.label} (×${r.complexity.value})`);
  line(`Timeline:                 ${r.timeline.label} (×${r.timeline.value})`);
  line(`US base setup:            ${money(r.usBaseSetup)}`);
  line(`Country multiplier:       ×${r.effectiveMultiplier}${r.isManualOverride ? ' (manual)' : ''}`);
  line(`Market-adjusted setup:    ${money(r.marketSetupRaw)}`);
  if (r.minApplied) line(`Minimum protection:       applied → floor ${money(r.minimumFloor)}`);
  line('');
  line('RECOMMENDATION');
  line('--------------');
  line(`Setup total:              ${money(r.finalSetup)}`);
  line(`Monthly support:          ${money(r.finalMonthly)}/mo (${r.supportTier.label})`);
  line(`Recommended package:      ${r.pkg.label}`);
  line(`Estimated timeline:       ${r.timelineEstimate}`);
  line(`Pricing strategy:         ${r.strategy.label} — ${r.strategy.reason}`);
  line('');
  line(`PAYMENT SCHEDULE — ${r.schedule.label}`);
  line('-------------------------------------');
  r.paymentPlan.forEach((p) => line(`  ${p.label} (${Math.round(p.pct * 100)}%): ${money(p.amount)}`));
  line('');
  line('PHASED OPTION');
  line('-------------');
  r.phases.forEach((p) => line(`  ${p.name}: ${money(p.amount)} — ${p.detail}`));
  line('');
  line('NOTES');
  line('-----');
  line('  • ' + DISCLAIMERS.scopeWarning);
  line('  • ' + DISCLAIMERS.thirdPartyFees);
  line('');
  line('Prepared with the internal quote calculator. Prices in USD.');
  return L.join('\n');
}
