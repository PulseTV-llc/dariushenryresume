import { ArrowUpRight } from 'lucide-react';
import Icon from '@/components/site/Icon';
import TrackedLink from './TrackedLink';
import type { Industry } from '@/lib/marketing/industries';

/** Industry tile that links to its landing page (/industries/[slug]). */
export default function IndustryCard({ industry, compact = false }: { industry: Industry; compact?: boolean }) {
  return (
    <TrackedLink
      href={`/industries/${industry.slug}`}
      event="industry_cta_click"
      eventProps={{ industry: industry.slug }}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 hover:border-sky-400/30 hover:bg-white/[0.04] transition-colors"
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
          <Icon name={industry.icon} className="w-[18px] h-[18px] text-sky-300" />
        </span>
        <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-sky-300 transition-colors" />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-white group-hover:text-sky-200 transition-colors">
        {industry.name}
      </h3>
      {!compact && <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{industry.summary}</p>}
    </TrackedLink>
  );
}
