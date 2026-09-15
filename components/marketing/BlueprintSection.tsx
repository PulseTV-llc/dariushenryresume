import { ArrowRight, Check } from 'lucide-react';
import Icon from '@/components/site/Icon';
import { Eyebrow, PrimaryButton, SecondaryButton } from '@/components/site/Section';
import VexaMark from '@/components/site/VexaMark';
import { BLUEPRINT_DOCUMENTS, BLUEPRINT_DELIVERABLES, ENGAGEMENT_TIERS } from '@/lib/marketing/pricing';

const BLUEPRINT_FROM = ENGAGEMENT_TIERS.find((t) => t.key === 'blueprint')?.from ?? 750;

/** Stylized cover + contents page of a Blueprint document. Illustrative. */
export function BlueprintDocument() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 sm:translate-x-4 sm:translate-y-4 rounded-2xl border border-white/10 bg-[#0a101c]" />
      <div className="relative rounded-2xl border border-white/15 bg-[#0b111e] p-6 sm:p-8 shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <VexaMark size={26} />
            <span className="text-sm font-semibold text-white">VexaOS</span>
          </div>
          <span className="mono-label text-[10px] text-gray-500">Confidential</span>
        </div>
        <p className="mt-8 mono-label text-[10px] text-sky-300">Business Blueprint</p>
        <p className="mt-2 text-2xl font-bold text-white tracking-tight">Operating System Design</p>
        <p className="mt-1 text-sm text-gray-500">Prepared for your organization</p>

        <div className="mt-7 border-t border-white/10 pt-5">
          <p className="mono-label text-[10px] text-gray-500">Contents</p>
          <ol className="mt-3 space-y-2">
            {BLUEPRINT_DELIVERABLES.map((d, i) => (
              <li key={d.title} className="flex items-baseline gap-3 text-sm">
                <span className="font-mono text-xs text-sky-300/80">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-gray-300">{d.title}</span>
                <span className="flex-1 border-b border-dotted border-white/15 translate-y-[-3px]" />
                <span className="font-mono text-xs text-gray-600">{String((i + 1) * 3).padStart(2, '0')}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/[0.07] px-3 py-2">
          <Check className="w-4 h-4 text-emerald-300" />
          <span className="text-xs text-emerald-100">Scope estimate, phases, and budget range included</span>
        </div>
      </div>
    </div>
  );
}

export default function BlueprintSection({ showDeliverables = true }: { showDeliverables?: boolean }) {
  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
        <div className="lg:col-span-6">
          <Eyebrow>The VexaOS Business Blueprint</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
            Design the system before you build it.
          </h2>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            Before major development begins, we document how your business operates and how the
            operating system should work — so the build decision is made with a clear architecture,
            phases, timeline, and budget range.
          </p>

          <p className="mt-8 mono-label text-gray-500">What we document</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {BLUEPRINT_DOCUMENTS.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-[15px] text-gray-300">
                <span className="w-1.5 h-1.5 rounded-sm bg-sky-400/80 shrink-0" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <PrimaryButton
              href="/contact?intent=blueprint"
              event="blueprint_started"
              eventProps={{ placement: 'blueprint_section' }}
              className="w-full sm:w-auto"
            >
              Start Your Business Blueprint
              <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
            <SecondaryButton href="/blueprint" className="w-full sm:w-auto">
              How the Blueprint works
            </SecondaryButton>
          </div>
          <p className="mt-4 text-sm text-gray-500">From ${BLUEPRINT_FROM.toLocaleString('en-US')}, scoped to the size of your operation.</p>
        </div>

        <div className="lg:col-span-6">
          <BlueprintDocument />
        </div>
      </div>

      {showDeliverables && (
        <div className="mt-16">
          <p className="mono-label text-gray-500">Deliverables</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BLUEPRINT_DELIVERABLES.map((d) => (
              <li key={d.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <Icon name={d.icon} className="w-[18px] h-[18px] text-sky-300" />
                <p className="mt-3 text-[15px] font-semibold text-white">{d.title}</p>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{d.detail}</p>
              </li>
            ))}
            <li className="rounded-xl border border-dashed border-sky-400/25 bg-sky-500/[0.04] p-5 flex flex-col justify-center">
              <p className="text-[15px] font-semibold text-white">Clarity before commitment</p>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                A documented plan for what to connect, automate, rebuild, or replace — before
                development begins.
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
