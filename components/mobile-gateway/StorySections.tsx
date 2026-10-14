import { ArrowDown, ArrowRight, BatteryCharging, Cable, UploadCloud, Cpu, SignalHigh, SignalZero, Sun, Truck } from 'lucide-react';
import { POWER_SEQUENCE } from '@/lib/mobile-gateway/config';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import ConnectivitySelector from './ConnectivitySelector';
import { LocationMap } from './RouteMap';
import Picture from './Picture';
import Scene from './Scene';
import { Checks, Head, Section } from './ui';

type T = MobileGatewayStrings;
const words = (s: string) => s.match(/\S+\s*/g) ?? [];

/** Part 3: the device emerges from darkness as the visitor scrolls (studio render; LED layer from the same render). */
export function GatewayProductReveal({ alt }: { alt: string }) {
  return (
    <div className="mg-reveal" aria-hidden={alt ? undefined : true}>
      <Picture image="studio" alt={alt} sizes="(min-width: 1060px) 1180px, (min-width: 768px) 112vw, 150vw" priority className="mg-reveal-base block" />
      <div className="mg-reveal-sweep" />
      <Picture image="studioLed" alt="" sizes="(min-width: 1060px) 1180px, (min-width: 768px) 112vw, 150vw" className="mg-reveal-bloom" imgClassName="h-full" />
      <Picture image="studioLed" alt="" sizes="(min-width: 1060px) 1180px, (min-width: 768px) 112vw, 150vw" className="mg-reveal-led" imgClassName="h-full" />
    </div>
  );
}

export function MobileGatewayHero({ t }: { t: T }) {
  return (
    <section id="overview" data-mg-spy="overview" aria-labelledby="mg-title" className="mg-hero" data-mg-scrub="pin">
      <div className="mg-hero-stage">
        <div className="mg-hero-copy">
          <p><span className="mg-badge">{t.hero.badge}</span></p>
          <p className="mg-eyebrow mt-6">{t.hero.eyebrow}</p>
          <h1 id="mg-title" className="mt-2 text-lg font-semibold tracking-tight text-[#F5F7FA] sm:text-2xl">{t.name}</h1>
          <p className="mg-display mg-hero-title mx-auto mt-3 max-w-[14ch] sm:max-w-none">{t.hero.title.map((l, i) => <span key={i} className={`block ${i ? 'mg-second' : ''}`}>{l}</span>)}</p>
        </div>
        <GatewayProductReveal alt={t.hero.imageAlt} />
        <div className="mg-hero-cta flex w-full flex-col items-center justify-center gap-3 px-5 sm:flex-row">
          <a href="#join" className="mg-btn mg-btn-primary w-full sm:w-auto">{t.hero.primary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <a href="#technology" className="mg-btn mg-btn-ghost w-full sm:w-auto">{t.hero.secondary}<ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

/** Part 1 and the hero's supporting copy: the idea, then the four technologies. */
export function BigIdea({ t }: { t: T }) {
  const s = words(t.promise.statement);
  return (
    <>
      <section aria-labelledby="mg-intro" className="px-5 pb-16 pt-16 text-center sm:px-8 sm:pt-24">
        <h2 id="mg-intro" className="sr-only">{t.hero.featuresSub}</h2>
        <p data-mg-reveal className="mg-lead mx-auto max-w-3xl text-[#C9D1DB]">{t.hero.body}</p>
        <p data-mg-reveal className="mg-h3 mx-auto mt-14 max-w-4xl" style={{ ['--d' as string]: '80ms' }}>
          {t.hero.features.split(/(?<=\.)\s+/).map((w, i) => <span key={i} className="inline-block px-2" style={{ color: i % 2 ? '#45B8FF' : '#F5F7FA' }}>{w}</span>)}
        </p>
        <p data-mg-reveal className="mt-4 text-lg text-[#9CA7B5]" style={{ ['--d' as string]: '160ms' }}>{t.hero.featuresSub}</p>
      </section>
      <section aria-labelledby="mg-idea" className="px-5 py-24 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-[70rem]">
          <p className="mg-eyebrow">{t.promise.eyebrow}</p>
          <h2 id="mg-idea" data-mg-scrub className="mg-statement mt-6" style={{ ['--n' as string]: s.length }}>
            {s.map((w, i) => <span key={i} style={{ ['--i' as string]: i }}>{w}</span>)}
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <p data-mg-reveal className="mg-lead">{t.promise.body}</p>
            <ul className="space-y-3">
              {t.promise.moments.map((m, i) => (
                <li key={m} data-mg-reveal className="flex items-baseline gap-4 border-b border-[#161d26] pb-3 text-xl font-medium tracking-tight sm:text-2xl" style={{ ['--d' as string]: `${i * 70}ms` }}>
                  <span className="font-mono text-xs text-[#45B8FF]">{String(i + 1).padStart(2, '0')}</span>{m}
                </li>
              ))}
            </ul>
          </div>
          <p data-mg-reveal className="mg-body mt-14 max-w-3xl text-lg">{t.promise.notRouter}</p>
          <p data-mg-reveal className="mg-h3 mt-10 max-w-4xl">{t.promise.close}</p>
        </div>
      </section>
    </>
  );
}

/** Part 4. */
export function FourNetworksExperience({ t }: { t: T }) {
  return (
    <Section id="technology" spy="technology" label="mg-networks">
      <Head id="mg-networks" eyebrow={t.networks.eyebrow} title={t.networks.title} sub={t.networks.subtitle} notice={t.common.notice} />
      <div className="mt-16"><ConnectivitySelector t={t.networks} /></div>
      <p className="mt-10 flex flex-wrap items-center gap-2 text-sm text-[#9CA7B5]"><span className="mg-tech">{t.networks.gnss}</span><span className="mg-pill" data-s="planned">{t.status.planned}</span><span>{t.location.planned[0]}</span></p>
    </Section>
  );
}

/** Part 5. */
export function PortablePowerSection({ t }: { t: T }) {
  const icons = [BatteryCharging, Cable, Sun];
  const status = ['underDevelopment', 'planned', 'underEvaluation'] as const;
  return (
    <Section label="mg-power" className="bg-[linear-gradient(180deg,#050609,#080b10_40%,#050609)]">
      <Head id="mg-power" eyebrow={t.power.eyebrow} title={t.power.title} sub={t.power.subtitle} notice={t.common.notice} />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {t.power.sources.map((s, i) => {
          const Icon = icons[i];
          return (
            <article key={s.title} data-mg-reveal className="mg-panel flex flex-col p-6 sm:p-7" style={{ ['--d' as string]: `${i * 80}ms` }}>
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-7 w-7 text-[#45B8FF]" aria-hidden="true" />
                <span className="mg-pill" data-s={status[i]}>{t.status[status[i]]}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mg-body mt-3 flex-1">{s.body}</p>
              <p className="mt-5 border-t border-[#161d26] pt-4 text-sm text-[#9CA7B5]">{s.detail}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
        <div data-mg-reveal>
          <h3 className="text-lg font-semibold">{t.power.managementTitle}</h3>
          <Checks items={t.power.management} className="mt-4" />
          <p className="mt-8 text-sm leading-relaxed text-[#9CA7B5]">{t.power.note}</p>
        </div>
        <div>
          <h3 data-mg-reveal className="mg-h3">{t.power.sequenceTitle}</h3>
          <ol className="mg-swipe md-grid-2 mt-6">
            {POWER_SEQUENCE.map((k, i) => (
              <li key={k} data-mg-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                <Scene slot={{ illustration: k }} uid={`pw-${k}`} alt={`${t.power.sequence[i]} — ${t.common.illustrative}`} label={t.common.illustrative} sizes="(min-width: 768px) 32vw, 80vw" />
                <p className="mt-3 flex items-center gap-3 text-sm font-semibold"><span className="font-mono text-xs text-[#45B8FF]">{String(i + 1).padStart(2, '0')}</span>{t.power.sequence[i]}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/** Part 6. */
export function LocationIntelligence({ t }: { t: T }) {
  return (
    <Section label="mg-location">
      <Head id="mg-location" eyebrow={t.location.eyebrow} title={t.location.title} sub={t.location.subtitle} notice={t.common.notice} />
      <div data-mg-reveal className="mt-14"><LocationMap t={t.location.map} /></div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div data-mg-reveal>
          <h3 className="text-lg font-semibold">{t.location.plannedTitle}</h3>
          <Checks items={t.location.planned} className="mt-4 sm:columns-2 sm:gap-8 [&>li]:break-inside-avoid" />
        </div>
        <aside data-mg-reveal className="mg-panel p-6 sm:p-7">
          <h3 className="text-lg font-semibold">{t.location.distinctionTitle}</h3>
          <p className="mg-body mt-3">{t.location.distinction}</p>
        </aside>
      </div>
    </Section>
  );
}

/** Part 7: store-and-forward, as a concept animation that loops (pausable) and a step list that is always there. */
export function OfflineResilience({ t }: { t: T }) {
  const a = t.offline.anim;
  return (
    <Section label="mg-offline" className="bg-[linear-gradient(180deg,#050609,#07090e_50%,#050609)]">
      <Head id="mg-offline" eyebrow={t.offline.eyebrow} title={t.offline.title} sub={t.offline.body} notice={t.common.notice} />
      <figure data-mg-reveal className="mt-14">
        <ol className="mg-frames" aria-label={a.label}>
          {[
            { title: t.offline.steps[1], icon: SignalHigh, tone: 'ok', queue: 0, up: true },
            { title: t.offline.steps[2], icon: SignalZero, tone: 'off', queue: 4, up: false },
            { title: t.offline.steps[4], icon: SignalHigh, tone: 'ok', queue: 0, up: true, sync: true },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <li key={i} className="mg-frame" data-tone={f.tone} style={{ ['--i' as string]: i }}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-[#657181]">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold ${f.tone === 'off' ? 'text-[#F7C66B]' : 'text-[#45B8FF]'}`}><Icon className="h-4 w-4" aria-hidden="true" />{f.tone === 'off' ? a.noService : a.service}</span>
                </div>
                <div className="relative mt-5 flex h-28 items-end justify-between" aria-hidden="true">
                  <Truck className="h-16 w-16 text-[#9CA7B5]" strokeWidth={1.1} />
                  <div className="flex flex-col items-end gap-2">
                    <span className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[0.6875rem] font-semibold ring-1 ${f.up ? 'text-[#45B8FF] ring-[#45B8FF]/40' : 'text-[#657181] ring-[#28313B]'}`}><UploadCloud className="h-3.5 w-3.5" />VexaOs Cloud</span>
                    <div className="mg-queue w-24 rounded-lg bg-[#080b10] p-2 ring-1 ring-[#28313B]">
                      <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#657181]">{a.queue}</p>
                      <div className="mt-1.5 flex h-8 flex-col-reverse gap-1">
                        {[0, 1, 2, 3].map((k) => <i key={k} className={k < f.queue ? 'on' : f.sync ? 'sync' : ''} style={{ ['--k' as string]: k }} />)}
                      </div>
                    </div>
                  </div>
                  {f.up && <span className="mg-uplink" />}
                </div>
                <p className="mt-5 border-t border-[#161d26] pt-4 text-[0.9375rem] font-semibold">{f.title}</p>
              </li>
            );
          })}
        </ol>
        <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#657181]">{a.label}</figcaption>
      </figure>
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div data-mg-reveal>
          <h3 className="text-lg font-semibold">{t.offline.stepsTitle}</h3>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {t.offline.steps.map((s, i) => (
              <li key={s} className="mg-panel flex gap-4 p-4">
                <span className="font-mono text-sm text-[#45B8FF]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[0.9375rem] leading-relaxed text-[#C9D1DB]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div data-mg-reveal>
          <h3 className="text-lg font-semibold">{t.offline.potentialTitle}</h3>
          <ul className="mg-list mt-4">{t.offline.potential.map((p) => <li key={p}>{p}</li>)}</ul>
          <p className="mt-8 text-sm leading-relaxed text-[#9CA7B5]">{t.offline.note}</p>
        </div>
      </div>
    </Section>
  );
}

/** Part 8. */
export function EdgeIntelligence({ t }: { t: T }) {
  return (
    <Section label="mg-edge">
      <Head id="mg-edge" eyebrow={t.edge.eyebrow} title={t.edge.title} sub={t.edge.body} notice={t.common.notice} />
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <div data-mg-reveal className="mg-panel p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{t.edge.targetTitle}</h3><Cpu className="h-6 w-6 text-[#45B8FF]" aria-hidden="true" /></div>
          <Checks items={t.edge.target} className="mt-5 sm:columns-2 sm:gap-6 [&>li]:break-inside-avoid" />
        </div>
        <div data-mg-reveal className="mg-panel p-6 sm:p-8" style={{ ['--d' as string]: '80ms' }}>
          <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{t.edge.roadmapTitle}</h3><span className="mg-pill" data-s="roadmap">{t.status.roadmap}</span></div>
          <Checks items={t.edge.roadmap} tone="roadmap" className="mt-5" />
        </div>
      </div>
      <div data-mg-reveal className="mt-16">
        <h3 className="mg-eyebrow">{t.edge.exampleTitle}</h3>
        <p className="mt-3 max-w-3xl text-xl font-medium tracking-tight sm:text-2xl">{t.edge.exampleLead}</p>
        <ol className="mg-chain mt-8 sm:grid-cols-3 lg:grid-cols-6">
          {t.edge.example.map((s, i) => (
            <li key={s} className="mg-chain-node flex flex-col gap-3" data-on={i === t.edge.example.length - 1 ? 'true' : undefined}>
              <span className="font-mono text-xs text-[#45B8FF]">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[0.9375rem]">{s}</span>
              <span className="mg-chain-link mt-auto" style={{ ['--i' as string]: i }} aria-hidden="true" />
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-[#F7C66B]">{t.edge.exampleNote}</p>
      </div>
    </Section>
  );
}

