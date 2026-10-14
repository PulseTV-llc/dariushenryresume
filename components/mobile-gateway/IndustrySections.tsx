import { ArrowRight, ShieldAlert } from 'lucide-react';
import { STORIES, SCENARIOS, type StoryConfig } from '@/lib/mobile-gateway/config';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import { TripDashboard } from './RouteMap';
import CloudDashboard from './CloudDashboard';
import Scene from './Scene';
import Tabs from './Tabs';
import { Checks, Head, Section, TechList } from './ui';

type T = MobileGatewayStrings;
type Story = T['industries']['stories'][number];

function FieldDashboard({ t }: { t: T['industries']['field'] }) {
  const rows: [string, string][] = [[t.soil, t.soilValue], [t.tank, t.tankValue], [t.air, t.airValue], [t.pump, t.pumpValue]];
  return (
    <div className="mg-dash p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold">{t.title}</p>
        <span className="rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#F7C66B] ring-1 ring-[#F5A524]/40">{t.label}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {rows.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-[#0c1016] px-3 py-3 ring-1 ring-[#28313B]">
            <dt className="text-xs text-[#9CA7B5]">{k}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums tracking-tight">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function MedicalDashboard({ t }: { t: T['industries']['medical'] }) {
  return (
    <div className="mg-dash p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold">{t.title}</p>
        <span className="rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#F7C66B] ring-1 ring-[#F5A524]/40">{t.label}</span>
      </div>
      <dl className="mt-3">{t.rows.map(([k, v]) => <div key={k} className="mg-kv"><dt className="text-[#9CA7B5]">{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl>
    </div>
  );
}

/** One of the nine Part 9 stories. */
export function IndustryStory({ t, story, cfg, index }: { t: T; story: Story; cfg: StoryConfig; index: number }) {
  const ind = t.industries;
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');
  return (
    <article id={`story-${cfg.id}`} data-mg-anchor aria-labelledby={`story-${cfg.id}-t`} className="border-t border-[#161d26] py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <p data-mg-reveal className="flex items-center gap-3"><span className="font-mono text-sm text-[#45B8FF]">{num}</span><span className="mg-eyebrow">{story.name}</span></p>
          <h3 id={`story-${cfg.id}-t`} data-mg-reveal className="mg-h3 mt-4">{story.title}</h3>
          <p data-mg-reveal className="mg-lead mt-4 text-[#C9D1DB]">{story.tagline}</p>
          <dl data-mg-reveal className="mt-8 space-y-5">
            <div><dt className="text-sm font-semibold">{ind.problem}</dt><dd className="mg-body mt-1">{story.problem}</dd></div>
            <div><dt className="text-sm font-semibold">{ind.solution}</dt><dd className="mg-body mt-1">{story.solution}</dd></div>
          </dl>
          <div data-mg-reveal className="mt-6"><TechList t={t} tech={cfg.tech} label={t.scenarios.tech} /></div>
          <h4 data-mg-reveal className="mt-8 text-sm font-semibold">{ind.applications}</h4>
          <ul data-mg-reveal className="mg-list mt-3">{story.applications.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
        <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          <div data-mg-reveal>
            <Scene slot={cfg.slot} uid={`st-${cfg.id}`} alt={story.sceneAlt} label={t.common.illustrative} overlays={story.overlays}
                   concept={cfg.concept ? ind.medical.disclosure : undefined} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          {cfg.dashboard && (
            <div data-mg-reveal className="mt-4">
              {cfg.dashboard === 'trip' && <TripDashboard t={ind.trip} from={t.location.map.from} to={t.location.map.to} />}
              {cfg.dashboard === 'field' && <FieldDashboard t={ind.field} />}
              {cfg.dashboard === 'medical' && <MedicalDashboard t={ind.medical} />}
            </div>
          )}
          {cfg.concept && <MedicalLogisticsConcept t={ind.medical} />}
        </div>
      </div>
      <p data-mg-reveal className="mg-h3 mt-14 max-w-4xl text-[#9CA7B5]">{story.statement}</p>
    </article>
  );
}

/** Part 9, story 03: the concept's limits, stated as plainly as the concept itself. */
export function MedicalLogisticsConcept({ t }: { t: T['industries']['medical'] }) {
  return (
    <aside data-mg-reveal className="mt-4 rounded-2xl bg-[#F5A524]/[0.06] p-5 ring-1 ring-[#F5A524]/35 sm:p-6" aria-label={t.limitsTitle}>
      <p className="flex items-start gap-3 font-semibold text-[#FDE3B0]"><ShieldAlert className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />{t.disclosure}</p>
      <h4 className="mt-4 text-sm font-semibold">{t.limitsTitle}</h4>
      <Checks items={t.limits} className="mt-3 text-sm" />
      <p className="mt-4 text-sm leading-relaxed text-[#9CA7B5]">{t.requires}</p>
    </aside>
  );
}

export function IndustryStories({ t }: { t: T }) {
  return (
    <section id="industries" data-mg-spy="industries" aria-labelledby="mg-industries" className="px-5 pt-24 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-[76rem]">
        <Head id="mg-industries" eyebrow={t.industries.eyebrow} title={t.industries.title} sub={t.industries.subtitle} />
        <nav aria-label={t.industries.index} className="mt-10">
          <ol className="mg-swipe" style={{ gridAutoColumns: 'max-content' }}>
            {t.industries.stories.map((s, i) => (
              <li key={s.name}><a href={`#story-${STORIES[i].id}`} className="mg-tech whitespace-nowrap !rounded-full !px-4 !py-2 hover:!text-[#45B8FF]"><span className="font-mono text-xs text-[#45B8FF]">{String(i + 1).padStart(2, '0')}</span>{s.name}</a></li>
            ))}
          </ol>
        </nav>
        <div className="mt-10">
          {t.industries.stories.map((s, i) => <IndustryStory key={s.name} t={t} story={s} cfg={STORIES[i]} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/** Part 10. */
export function GatewayCloudVisualization({ t }: { t: T }) {
  return (
    <Section label="mg-cloud" className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(38,125,255,0.12),transparent_60%)]">
      <Head id="mg-cloud" eyebrow={t.cloud.eyebrow} title={t.cloud.title} sub={t.cloud.body} center />
      <div data-mg-reveal className="mt-14"><CloudDashboard t={t.cloud.dash} /></div>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <div data-mg-reveal className="mg-panel p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{t.cloud.plannedTitle}</h3><span className="mg-pill" data-s="planned">{t.status.planned}</span></div>
          <Checks items={t.cloud.planned} className="mt-5 sm:columns-2 sm:gap-6 [&>li]:break-inside-avoid" />
        </div>
        <div data-mg-reveal className="mg-panel p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{t.cloud.roadmapTitle}</h3><span className="mg-pill" data-s="roadmap">{t.status.roadmap}</span></div>
          <Checks items={t.cloud.roadmap} tone="roadmap" className="mt-5 sm:columns-2 sm:gap-6 [&>li]:break-inside-avoid" />
        </div>
      </div>
      <p className="mt-6 text-sm text-[#9CA7B5]">{t.cloud.note}</p>
    </Section>
  );
}

/** Part 15: eight operations; the panels are server-rendered and the tabs only switch between them. */
export function ScenarioSelector({ t }: { t: T }) {
  const s = t.scenarios;
  return (
    <Section label="mg-scenarios">
      <Head id="mg-scenarios" eyebrow={s.eyebrow} title={s.title} />
      <div data-mg-reveal className="mt-12">
        <Tabs label={s.tablist} tabs={s.tabs.map((x) => x.name)} listClassName="w-fit max-w-full"
          panels={s.tabs.map((tab, i) => (
            <div key={tab.name} className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <Scene slot={SCENARIOS[i].slot} uid={`sc-${i}`} alt={`${tab.name} — ${t.common.illustrative}`} label={t.common.illustrative}
                       concept={SCENARIOS[i].concept ? t.industries.medical.disclosure : undefined} sizes="(min-width: 1024px) 56vw, 100vw" />
                <div className="mt-4 rounded-2xl bg-[#080b10] p-4 ring-1 ring-[#28313B]">
                  <p className="text-xs font-semibold text-[#9CA7B5]">{s.dashboard} <span className="mg-pill ml-2" data-s="planned">{t.status.planned}</span></p>
                  <ul className="mt-3 grid grid-cols-3 gap-2">{tab.dashboard.map((d) => <li key={d} className="rounded-xl bg-[#0c1016] px-3 py-4 text-center text-xs font-semibold ring-1 ring-[#28313B] sm:text-sm">{d}</li>)}</ul>
                </div>
              </div>
              <div className="lg:col-span-5">
                <h3 className="mg-h3">{tab.name}</h3>
                <dl className="mt-6 space-y-6">
                  <div><dt className="text-sm font-semibold">{s.problem}</dt><dd className="mg-body mt-1">{tab.problem}</dd></div>
                  <div><dt className="text-sm font-semibold">{s.tech}</dt><dd className="mt-2"><TechList t={t} tech={SCENARIOS[i].tech} /></dd></div>
                  <div><dt className="text-sm font-semibold">{s.sensors}</dt><dd className="mt-2"><ul className="mg-list">{tab.sensors.map((x) => <li key={x}>{x}</li>)}</ul></dd></div>
                  <div><dt className="text-sm font-semibold">{s.helps}</dt><dd className="mg-body mt-1">{tab.helps}</dd></div>
                </dl>
                <a href="#join" className="mg-btn mg-btn-primary mt-8">{t.common.earlyAccess}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
              </div>
            </div>
          ))} />
      </div>
    </Section>
  );
}
