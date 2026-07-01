'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  buildEstimate,
  type EstimateInput,
  type EstimateResultData,
  type UserBucket,
  type DocumentBucket,
} from '@/lib/ai-tiers';
import EstimateResult from './EstimateResult';

interface FormState {
  // Business info
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  locations: string;
  // Team size
  userBucket: UserBucket | '';
  // Documents
  documentBucket: DocumentBucket | '';
  documentTypes: string[];
  // Workflow goals
  workflowGoals: string[];
  // Security
  sensitive: 'no' | 'somewhat' | 'highly' | '';
  roleBased: 'yes' | 'no' | 'not-sure' | '';
  deployment: 'local' | 'hybrid' | 'not-sure' | '';
  // Integrations
  integrations: string[];
  // Budget & timeline
  budget: string;
  launchTimeline: string;
}

const INITIAL: FormState = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  website: '',
  industry: '',
  locations: '',
  userBucket: '',
  documentBucket: '',
  documentTypes: [],
  workflowGoals: [],
  sensitive: '',
  roleBased: '',
  deployment: '',
  integrations: [],
  budget: '',
  launchTimeline: '',
};

const INDUSTRIES = [
  'Real Estate',
  'Law Office',
  'Medical / Dental',
  'Restaurant / Franchise',
  'Construction',
  'Cleaning',
  'Film / Media',
  'Property Management',
  'Local Service Business',
  'Insurance',
  'Other',
];

const USER_BUCKETS: { value: UserBucket; label: string }[] = [
  { value: '1-5', label: '1–5' },
  { value: '6-15', label: '6–15' },
  { value: '16-30', label: '16–30' },
  { value: '31-50', label: '31–50' },
  { value: '51-75', label: '51–75' },
  { value: '76-100', label: '76–100' },
  { value: '101-150', label: '101–150' },
  { value: '151-250', label: '151–250' },
  { value: '250+', label: '250+' },
];

const DOCUMENT_BUCKETS: { value: DocumentBucket; label: string }[] = [
  { value: 'under-500', label: 'Under 500' },
  { value: '500-2500', label: '500–2,500' },
  { value: '2500-10000', label: '2,500–10,000' },
  { value: '10000-50000', label: '10,000–50,000' },
  { value: '50000+', label: '50,000+' },
];

const DOCUMENT_TYPES = [
  { value: 'pdf', label: 'PDFs' },
  { value: 'word', label: 'Word docs' },
  { value: 'excel', label: 'Excel / CSV' },
  { value: 'gdrive', label: 'Google Drive files' },
  { value: 'dropbox', label: 'Dropbox files' },
  { value: 'contracts', label: 'Contracts' },
  { value: 'invoices', label: 'Invoices' },
  { value: 'sops', label: 'SOPs' },
  { value: 'training', label: 'Training manuals' },
  { value: 'policies', label: 'Policies' },
  { value: 'customer-messages', label: 'Customer messages' },
  { value: 'emails', label: 'Emails' },
  { value: 'scanned', label: 'Images / scanned paperwork' },
  { value: 'other', label: 'Other' },
];

const WORKFLOW_GOALS = [
  { value: 'document-search', label: 'Private document search' },
  { value: 'customer-replies', label: 'Customer service replies' },
  { value: 'lead-followup', label: 'Lead follow-up' },
  { value: 'contract-summary', label: 'Contract summarization' },
  { value: 'staff-training', label: 'Staff training' },
  { value: 'internal-faq', label: 'Internal FAQ' },
  { value: 'sales-scripts', label: 'Sales scripts' },
  { value: 'document-org', label: 'Document organization' },
  { value: 'report-gen', label: 'Report generation' },
  { value: 'email-drafting', label: 'Email drafting' },
  { value: 'social-content', label: 'Social media / content drafting' },
  { value: 'invoice-extract', label: 'Invoice / document extraction' },
  { value: 'client-chatbot', label: 'Client-facing chatbot' },
  { value: 'voice-transcription', label: 'Voice transcription' },
  { value: 'other', label: 'Other' },
];

const INTEGRATIONS = [
  { value: 'gdrive', label: 'Google Drive' },
  { value: 'dropbox', label: 'Dropbox' },
  { value: 'onedrive', label: 'Microsoft OneDrive' },
  { value: 'gmail', label: 'Gmail' },
  { value: 'outlook', label: 'Outlook' },
  { value: 'crm', label: 'CRM' },
  { value: 'website-forms', label: 'Website forms' },
  { value: 'zapier', label: 'Zapier / Make' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'supabase', label: 'Supabase' },
  { value: 'custom-api', label: 'Custom API' },
  { value: 'not-sure', label: 'Not sure' },
];

const BUDGETS = [
  'Under $5,000',
  '$5,000–$10,000',
  '$10,000–$25,000',
  '$25,000–$50,000',
  '$50,000–$100,000',
  '$100,000+',
];

const TIMELINES = ['ASAP', '30 days', '60 days', '90 days', 'Just researching'];

type StepId = 'business' | 'team' | 'documents' | 'workflow' | 'security' | 'integrations' | 'budget';

interface Step {
  id: StepId;
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  { id: 'business', title: 'Business Information', subtitle: 'Tell us about your company' },
  { id: 'team', title: 'Team Size', subtitle: 'How many users will need access' },
  { id: 'documents', title: 'Documents & Knowledge', subtitle: 'What the AI will search' },
  { id: 'workflow', title: 'Workflow Goals', subtitle: 'What the AI should help with' },
  { id: 'security', title: 'Security & Privacy', subtitle: 'How sensitive is your data' },
  { id: 'integrations', title: 'Integrations', subtitle: 'Where your data lives today' },
  { id: 'budget', title: 'Budget & Timeline', subtitle: 'Planning context' },
];

export default function IntakeEstimator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [estimate, setEstimate] = useState<EstimateResultData | null>(null);

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleList = (key: keyof FormState, value: string) => {
    setForm((f) => {
      const current = (f[key] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...f, [key]: next };
    });
  };

  const stepIsValid = useMemo(() => {
    switch (currentStep.id) {
      case 'business':
        return (
          form.businessName.trim().length > 0 &&
          form.contactName.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        );
      case 'team':
        return form.userBucket !== '';
      case 'documents':
        return form.documentBucket !== '';
      case 'workflow':
        return form.workflowGoals.length > 0;
      case 'security':
        return form.sensitive !== '' && form.roleBased !== '' && form.deployment !== '';
      case 'integrations':
        return true; // optional
      case 'budget':
        return form.budget !== '' && form.launchTimeline !== '';
      default:
        return true;
    }
  }, [currentStep.id, form]);

  const handleNext = async () => {
    if (!stepIsValid || submitting) return;
    if (isLast) {
      await submit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError('');

    const estimateInput: EstimateInput = {
      userBucket: (form.userBucket || undefined) as UserBucket | undefined,
      documentBucket: (form.documentBucket || undefined) as DocumentBucket | undefined,
      sensitive: form.sensitive || undefined,
      roleBased: form.roleBased || undefined,
      deployment: form.deployment || undefined,
      integrations: form.integrations,
      workflowGoals: form.workflowGoals,
      documentTypes: form.documentTypes,
    };

    const localEstimate = buildEstimate(estimateInput);

    // Fire-and-forget save: still show the estimate even if the API isn't wired yet.
    try {
      await fetch('/api/ai-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, estimate: localEstimate }),
      });
    } catch (err) {
      console.warn('[IntakeEstimator] lead save failed (showing estimate anyway):', err);
    }

    setEstimate(localEstimate);
    setSubmitting(false);
  };

  const reset = () => {
    setForm(INITIAL);
    setStep(0);
    setEstimate(null);
    setSubmitError('');
  };

  if (estimate) {
    return (
      <EstimateResult
        businessName={form.businessName}
        contactName={form.contactName}
        email={form.email}
        estimate={estimate}
        onReset={reset}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">
            Step {step + 1} of {STEPS.length} — {currentStep.title}
          </span>
          <span className="text-sm text-cyan-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {currentStep.title}
          </h3>
          <p className="text-gray-400 mb-8">{currentStep.subtitle}</p>

          {currentStep.id === 'business' && (
            <BusinessStep form={form} update={update} />
          )}
          {currentStep.id === 'team' && (
            <ChoiceGrid
              options={USER_BUCKETS}
              value={form.userBucket}
              onChange={(v) => update('userBucket', v as UserBucket)}
              label="How many users will need access?"
            />
          )}
          {currentStep.id === 'documents' && (
            <DocumentsStep
              form={form}
              update={update}
              toggleList={toggleList}
            />
          )}
          {currentStep.id === 'workflow' && (
            <CheckboxGrid
              label="Select all that apply"
              options={WORKFLOW_GOALS}
              values={form.workflowGoals}
              onToggle={(v) => toggleList('workflowGoals', v)}
            />
          )}
          {currentStep.id === 'security' && (
            <SecurityStep form={form} update={update} />
          )}
          {currentStep.id === 'integrations' && (
            <CheckboxGrid
              label="What systems should the AI connect to? (optional)"
              options={INTEGRATIONS}
              values={form.integrations}
              onToggle={(v) => toggleList('integrations', v)}
            />
          )}
          {currentStep.id === 'budget' && (
            <BudgetStep form={form} update={update} />
          )}
        </motion.div>
      </AnimatePresence>

      {submitError && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{submitError}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-lg text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!stepIsValid || submitting}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          <span>{submitting ? 'Generating estimate…' : isLast ? 'Generate Estimate' : 'Continue'}</span>
          {!submitting && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

/* ---------- step components ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-gray-300 mb-2">{children}</label>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = `f-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-cyan-400 ml-1">*</span>}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

function BusinessStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <TextField
        label="Business name"
        value={form.businessName}
        onChange={(v) => update('businessName', v)}
        required
      />
      <TextField
        label="Contact name"
        value={form.contactName}
        onChange={(v) => update('contactName', v)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={form.email}
        onChange={(v) => update('email', v)}
        required
      />
      <TextField
        label="Phone number"
        type="tel"
        value={form.phone}
        onChange={(v) => update('phone', v)}
      />
      <TextField
        label="Website"
        value={form.website}
        onChange={(v) => update('website', v)}
        placeholder="https://"
      />
      <div>
        <Label>Industry</Label>
        <select
          value={form.industry}
          onChange={(e) => update('industry', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
        >
          <option value="">Select…</option>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <TextField
        label="Number of business locations"
        type="number"
        value={form.locations}
        onChange={(v) => update('locations', v)}
        placeholder="1"
      />
    </div>
  );
}

function ChoiceGrid({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                active
                  ? 'bg-cyan-500/15 border-cyan-400 text-white'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckboxGrid({
  label,
  options,
  values,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((o) => {
          const active = values.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onToggle(o.value)}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border text-sm font-medium text-left transition-all ${
                active
                  ? 'bg-cyan-500/15 border-cyan-400 text-white'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span>{o.label}</span>
              {active && <CheckCircle2 className="w-4 h-4 text-cyan-300 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DocumentsStep({
  form,
  update,
  toggleList,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  toggleList: (key: keyof FormState, value: string) => void;
}) {
  return (
    <div className="space-y-8">
      <ChoiceGrid
        label="How many files/documents do you want the AI to search?"
        options={DOCUMENT_BUCKETS}
        value={form.documentBucket}
        onChange={(v) => update('documentBucket', v as DocumentBucket)}
      />
      <CheckboxGrid
        label="What document types do you use?"
        options={DOCUMENT_TYPES}
        values={form.documentTypes}
        onToggle={(v) => toggleList('documentTypes', v)}
      />
    </div>
  );
}

function SecurityStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-8">
      <ChoiceGrid
        label="Does your business handle sensitive documents?"
        options={[
          { value: 'no', label: 'No' },
          { value: 'somewhat', label: 'Somewhat' },
          { value: 'highly', label: 'Yes, highly sensitive' },
        ]}
        value={form.sensitive}
        onChange={(v) => update('sensitive', v as FormState['sensitive'])}
      />
      <ChoiceGrid
        label="Do you need role-based access?"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'not-sure', label: 'Not sure' },
        ]}
        value={form.roleBased}
        onChange={(v) => update('roleBased', v as FormState['roleBased'])}
      />
      <ChoiceGrid
        label="Deployment preference"
        options={[
          { value: 'local', label: 'On-prem Windows AI nodes' },
          { value: 'hybrid', label: 'Hybrid local + cloud' },
          { value: 'not-sure', label: 'Not sure yet' },
        ]}
        value={form.deployment}
        onChange={(v) => update('deployment', v as FormState['deployment'])}
      />
    </div>
  );
}

function BudgetStep({
  form,
  update,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-8">
      <ChoiceGrid
        label="Estimated budget range"
        options={BUDGETS.map((b) => ({ value: b, label: b }))}
        value={form.budget}
        onChange={(v) => update('budget', v)}
      />
      <ChoiceGrid
        label="Desired launch timeline"
        options={TIMELINES.map((t) => ({ value: t, label: t }))}
        value={form.launchTimeline}
        onChange={(v) => update('launchTimeline', v)}
      />
    </div>
  );
}
