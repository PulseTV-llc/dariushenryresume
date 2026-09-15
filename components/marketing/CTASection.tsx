import { ArrowRight } from 'lucide-react';
import { Section, PrimaryButton } from '@/components/site/Section';
import SystemIntakeForm, { type IntakeInitial } from './intake/SystemIntakeForm';

const NEXT_STEPS = [
  ['01', 'We review how your business operates'],
  ['02', 'A discovery conversation with the founder'],
  ['03', 'A recommendation: Blueprint, build, or neither'],
];

/**
 * Final conversion section: headline, CTAs, and the compact system intake form.
 */
export default function CTASection({
  title = 'Tell us how your business operates.',
  subtitle = 'We’ll help you determine what should be connected, automated, rebuilt, or replaced.',
  placement = 'home_final_cta',
  initial,
}: {
  title?: string;
  subtitle?: string;
  placement?: string;
  initial?: IntakeInitial;
}) {
  return (
    <Section id="start" className="border-t border-white/10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/[0.08] via-blue-600/[0.03] to-transparent p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(60% 70% at 15% 0%, rgba(56,189,248,0.14), rgba(0,0,0,0))' }}
        />
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08] text-balance">
              {title}
            </h2>
            <p className="mt-5 text-lg text-gray-400 leading-relaxed">{subtitle}</p>

            <div className="mt-9 flex flex-col sm:flex-row lg:flex-col gap-3 lg:max-w-sm">
              <PrimaryButton
                href="/contact?intent=blueprint"
                event="blueprint_started"
                eventProps={{ placement }}
                className="w-full sm:w-auto lg:w-full"
              >
                Start Your Business Blueprint
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
              <a
                href="#tell-us"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-semibold hover:bg-white/[0.08] transition-colors w-full sm:w-auto lg:w-full"
              >
                Tell Us About Your Business
              </a>
            </div>

            <ol className="mt-10 space-y-3">
              {NEXT_STEPS.map(([n, t]) => (
                <li key={n} className="flex items-center gap-4 text-[15px] text-gray-300">
                  <span className="font-mono text-xs text-sky-300">{n}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>

          <div id="tell-us" className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#050912]/90 p-5 sm:p-8">
              <SystemIntakeForm variant="compact" placement={placement} initial={initial} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
