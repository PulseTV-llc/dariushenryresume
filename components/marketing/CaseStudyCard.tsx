import { ArrowRight } from 'lucide-react';
import TrackedLink from './TrackedLink';
import { ENGAGEMENT_LABEL, type CaseStudy, type Engagement } from '@/lib/marketing/case-studies';

const ENGAGEMENT_TONE: Record<Engagement, string> = {
  client: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  internal: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
  platform: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  demonstration: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
};

export function EngagementBadge({ engagement }: { engagement: Engagement }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${ENGAGEMENT_TONE[engagement]}`}>
      {ENGAGEMENT_LABEL[engagement]}
    </span>
  );
}

/** Card for a case study. The engagement badge always states what kind of project it is. */
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 hover:border-white/20 transition-colors">
      <div className="flex flex-wrap items-center gap-2">
        <EngagementBadge engagement={study.engagement} />
      </div>
      <p className="mt-5 mono-label text-[10px] text-gray-500">{study.industry}</p>
      <h3 className="mt-1.5 text-xl font-semibold text-white tracking-tight">{study.title}</h3>
      <p className="text-sm text-sky-300">{study.label}</p>
      <p className="mt-3 text-sm text-gray-400 leading-relaxed flex-1">{study.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {study.technology.slice(0, 5).map((t) => (
          <li key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-gray-400">
            {t}
          </li>
        ))}
      </ul>
      <TrackedLink
        href={`/case-studies/${study.slug}`}
        event="case_study_opened"
        eventProps={{ study: study.slug }}
        className="mt-6 pt-5 border-t border-white/10 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors"
      >
        Read the case study
        <ArrowRight className="w-4 h-4" />
      </TrackedLink>
    </article>
  );
}
