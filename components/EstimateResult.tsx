'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Server, DollarSign, ClipboardCopy, Calendar, ArrowRight, Info, Cpu, Wrench } from 'lucide-react';
import { useState } from 'react';
import type { EstimateResultData } from '@/lib/ai-tiers';

interface Props {
  businessName: string;
  contactName: string;
  email: string;
  estimate: EstimateResultData;
  onReset: () => void;
}

export default function EstimateResult({ businessName, contactName, email, estimate, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  const summaryText = buildSummaryText({ businessName, contactName, email, estimate });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available; user can still scroll/screenshot */
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Your AI System Estimate
        </h2>
        <p className="text-gray-300">
          {contactName ? `Thanks, ${contactName}. ` : ''}
          Here&rsquo;s a planning estimate for{' '}
          <span className="text-white font-semibold">{businessName || 'your business'}</span>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-10 mb-6"
      >
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
            Recommended tier
          </div>
          <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
            {estimate.tier.label}
          </div>
          <div className="text-sm text-gray-400">
            For teams of {estimate.tier.users} users
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Stat
            icon={<Server className="w-5 h-5 text-white" />}
            label="Mac Studio nodes"
            value={typeof estimate.nodes === 'number' ? `${estimate.nodes}` : 'Custom'}
            color="from-cyan-500 to-blue-500"
          />
          <Stat
            icon={<DollarSign className="w-5 h-5 text-white" />}
            label="Services setup"
            value={estimate.setupRange}
            color="from-purple-500 to-pink-500"
          />
          <Stat
            icon={<Wrench className="w-5 h-5 text-white" />}
            label="Hardware estimate"
            value={estimate.hardwareRange}
            color="from-amber-500 to-orange-500"
          />
          <Stat
            icon={<Calendar className="w-5 h-5 text-white" />}
            label="Monthly support"
            value={estimate.monthly}
            color="from-emerald-500 to-teal-500"
          />
        </div>

        <div className="mb-8 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <Cpu className="w-4 h-4 text-cyan-300 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 mr-2">
              Mac Studio spec
            </span>
            <span className="text-sm text-cyan-200 font-medium">{estimate.gpuSpec}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            What this system will handle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {estimate.systemHandles.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {estimate.notes.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-300" />
              Planning notes for your setup
            </h3>
            {estimate.notes.map((note, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
              >
                <span className="text-amber-300 mt-0.5">•</span>
                <p className="text-sm text-gray-300 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6 text-center"
      >
        <p className="text-gray-200 mb-4">
          Your AI system estimate has been generated. Darius can review your answers and
          recommend the best private AI workflow setup for your business.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`mailto:darius.henry@gmail.com?subject=${encodeURIComponent(
              `Private AI Workflow consultation — ${businessName || 'New inquiry'}`
            )}&body=${encodeURIComponent(summaryText)}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
          >
            Schedule a Workflow Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-lg font-medium text-white hover:bg-white/10 transition-all"
          >
            <ClipboardCopy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy estimate'}
          </button>
        </div>
      </motion.div>

      <p className="text-xs text-gray-500 text-center max-w-xl mx-auto">
        This is a planning estimate. Services and hardware are billed separately. Final
        pricing depends on chosen Mac Studio spec, hardware configuration, document volume,
        integrations, and workflow complexity.
      </p>

      <div className="text-center mt-6">
        <button
          onClick={onReset}
          className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
        >
          Start a new estimate
        </button>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
      <div
        className={`mx-auto w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function buildSummaryText({
  businessName,
  contactName,
  email,
  estimate,
}: {
  businessName: string;
  contactName: string;
  email: string;
  estimate: EstimateResultData;
}) {
  const lines = [
    'Private AI Workflow System — Planning Estimate',
    '',
    `Business: ${businessName || '—'}`,
    `Contact: ${contactName || '—'} (${email || '—'})`,
    '',
    `Recommended tier: ${estimate.tier.label}`,
    `Users supported: ${estimate.tier.users}`,
    `Mac Studio nodes: ${estimate.nodes}`,
    `Mac Studio spec: ${estimate.gpuSpec}`,
    `Services setup: ${estimate.setupRange}`,
    `Hardware estimate: ${estimate.hardwareRange}`,
    `Monthly support: ${estimate.monthly}`,
    '',
    'System will handle:',
    ...estimate.systemHandles.map((s) => `  • ${s}`),
  ];

  if (estimate.notes.length > 0) {
    lines.push('', 'Planning notes:');
    estimate.notes.forEach((n) => lines.push(`  • ${n}`));
  }

  lines.push(
    '',
    'This is a planning estimate. Final pricing depends on hardware configuration, document volume, integrations, and workflow complexity.'
  );

  return lines.join('\n');
}
