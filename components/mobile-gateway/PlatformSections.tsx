import Link from 'next/link';
import { Activity, ArrowRight, Bluetooth, Cog, DoorOpen, Droplets, Gauge, Lock, Power, Puzzle, ShieldCheck, Sprout, Thermometer, Waves, Wind } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import { DETAILS, ECOSYSTEM, LIGHTS, SPEC_ROWS } from '@/lib/mobile-gateway/config';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import { withVendor } from '@/lib/mobile-gateway/vendor';
import type { LocateNodeLink } from '@/lib/locate-node/nav';
import EarlyAccessForm from './EarlyAccessForm';
import Picture from './Picture';
import SpecsToggle from './SpecsToggle';
import Tabs from './Tabs';
import { Checks, Head, Pill, Section, Title } from './ui';

type T = MobileGatewayStrings;
const SENSOR_ICONS = [Thermometer, Droplets, Sprout, Waves, DoorOpen, Activity, Gauge, Wind, Bluetooth, Power, Cog, Puzzle];

/** Part 11. */
export function SensorCompatibility({ t }: { t: T }) {
  const s = t.sensors;
  return (
    <Section label="mg-sensors">
      <Head id="mg-sensors" title={s.title} sub={s.body} notice={t.common.notice} />
      <ul className="mg-swipe lg-grid-4 mt-12">
        {s.items.map(([name, body], i) => {
          const Icon = SENSOR_ICONS[i];
          return (
            <li key={name} data-mg-reveal className="mg-panel flex min-h-[11rem] flex-col p-5" style={{ ['--d' as string]: `${(i % 4) * 60}ms` }}>
              <Icon className="h-6 w-6 text-[#45B8FF]" aria-hidden="true" />
              <h3 className="mt-auto pt-8 text-lg font-semibold tracking-tight">{name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#9CA7B5]">{body}</p>
            </li>
          );
        })}
      </ul>
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div data-mg-reveal>
          <h3 className="text-lg font-semibold">{s.dependsTitle}</h3>
          <ul className="mg-list mt-4">{s.depends.map((d) => <li key={d}>{d}</li>)}</ul>
          <p className="mt-6 text-sm leading-relaxed text-[#9CA7B5]">{s.dependsNote}</p>
        </div>
        <div data-mg-reveal>
          <div className="flex flex-wrap items-center gap-3"><h3 className="text-lg font-semibold">{s.provisionTitle}</h3><Pill s="target" t={t} /></div>
          <ol className="mt-5 space-y-3">
            {s.provision.map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#0b1a2c] font-mono text-xs text-[#45B8FF] ring-1 ring-[#45B8FF]/40">{i + 1}</span>
                <span><span className="font-semibold">{title}</span><span className="block text-sm text-[#9CA7B5]">{body}</span></span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-[#9CA7B5]">{s.provisionNote}</p>
        </div>
      </div>
    </Section>
  );
}

/** Part 12. */
export function GatewaySecurity({ t }: { t: T }) {
  const s = t.security;
  return (
    <Section label="mg-security" className="bg-[linear-gradient(180deg,#050609,#080b10_50%,#050609)]">
      <Head id="mg-security" title={s.title} sub={s.body} notice={t.common.notice} />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div data-mg-reveal className="mg-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-lg font-semibold"><ShieldCheck className="h-5 w-5 text-[#45B8FF]" aria-hidden="true" />{s.plannedTitle}</h3><Pill s="planned" t={t} /></div>
          <Checks items={s.planned} className="mt-5 sm:columns-2 sm:gap-6 [&>li]:break-inside-avoid" />
        </div>
        <div data-mg-reveal className="mg-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-lg font-semibold"><Lock className="h-5 w-5 text-[#45B8FF]" aria-hidden="true" />{s.evaluateTitle}</h3><Pill s="underEvaluation" t={t} /></div>
          <Checks items={s.evaluate} tone="roadmap" className="mt-5" />
        </div>
      </div>
      <p className="mt-6 text-sm text-[#F7C66B]">{s.note}</p>
    </Section>
  );
}

/** Part 13: real crops of the renders, one per detail. */
export function HardwareDesignReveal({ t }: { t: T }) {
  const d = t.design;
  return (
    <Section id="design" spy="design" label="mg-design">
      <Head id="mg-design" title={d.title} sub={d.subtitle} />
      <ul className="mg-swipe lg-grid-3 mt-14">
        {DETAILS.map((k, i) => (
          <li key={k} style={{ ['--d' as string]: `${(i % 3) * 90}ms` }}>
            <figure>
              <div data-mg-reveal className="mg-detail"><Picture image={`detail-${k}`} alt={d.details[i].alt} sizes="(min-width: 1024px) 24rem, 78vw" fill /></div>
              <figcaption className="mt-4">
                <span className="flex items-center gap-3"><span className="font-mono text-xs text-[#45B8FF]">{String.fromCharCode(65 + i)}</span><span className="font-semibold">{d.details[i].title}</span></span>
                <span className="mt-1 block text-sm leading-relaxed text-[#9CA7B5]">{d.details[i].body}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-[#657181]">{d.rendersNote}</p>
      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        <div data-mg-reveal className="lg:col-span-2">
          <h3 className="text-lg font-semibold">{d.directionTitle}</h3>
          <ul className="mg-list mt-4">{d.direction.map((x) => <li key={x}>{x}</li>)}</ul>
          <h3 className="mt-10 text-lg font-semibold">{d.testingTitle}</h3>
          <ul className="mg-list mt-4">{d.testing.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="mt-4 text-sm text-[#F7C66B]">{d.testingNote}</p>
        </div>
        <div data-mg-reveal className="mg-panel p-6">
          <h3 className="text-lg font-semibold">{d.lightTitle}</h3>
          <ul className="mt-5 space-y-4">
            {d.light.map(([name, meaning], i) => (
              <li key={name} className="flex items-center gap-4">
                <span className="mg-light" style={{ color: LIGHTS[i].color }} data-pulse={LIGHTS[i].pulse} aria-hidden="true" />
                <span><span className="block text-sm font-semibold">{name}</span><span className="block text-sm text-[#9CA7B5]">{meaning}</span></span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-[#9CA7B5]">{d.lightNote}</p>
        </div>
      </div>
    </Section>
  );
}

/** Part 14. Every group is a native <details>; the vendor names only appear when the flag in vendor.ts is on. */
export function TechnicalSpecifications({ t }: { t: T }) {
  const s = t.specs;
  return (
    <Section id="specs" spy="specs" label="mg-specs">
      <div data-mg-reveal>
        <p className="mg-eyebrow">{s.eyebrow}</p>
        <div className="mt-4"><Title lines={s.title} id="mg-specs" /></div>
      </div>
      <div data-mg-reveal className="relative mt-10 overflow-hidden rounded-[2rem] ring-1 ring-[#161d26]">
        <Picture image="wet" alt={s.imageAlt} sizes="(min-width: 1216px) 76rem, 100vw" imgClassName="aspect-[16/9] object-cover sm:aspect-[16/7]" imgStyle={{ objectPosition: '50% 45%' }} />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div className="flex gap-2"><dt className="text-[#9CA7B5]">{s.product}</dt><dd className="font-semibold">{t.name}</dd></div>
          <div className="flex items-center gap-2"><dt className="text-[#9CA7B5]">{s.productStatus}</dt><dd><Pill s="inDevelopment" t={t} /></dd></div>
        </dl>
        <div className="flex flex-wrap items-center gap-3"><span className="mg-notice">{t.common.notice}</span><SpecsToggle target="mg-spec-groups" expand={s.expandAll} collapse={s.collapseAll} /></div>
      </div>
      <div id="mg-spec-groups" className="mt-6 border-t border-[#161d26]">
        {s.groups.map((g, gi) => (
          <details key={g.title} className="mg-spec border-b border-[#161d26]" open={gi < 2}>
            <summary className="flex items-center justify-between gap-4 py-5 sm:py-6">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{g.title}</h3>
              <span className="mg-spec-mark" aria-hidden="true" />
            </summary>
            <dl className="pb-6">
              {g.rows.map(([label, value], ri) => {
                const row = SPEC_ROWS[gi][ri];
                return (
                  <div key={label} className="grid gap-1 border-t border-[#10161e] py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
                    <dt className="text-[0.9375rem] text-[#9CA7B5]">{label}</dt>
                    <dd className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
                      {row.pill ? <><span className="font-medium">{withVendor(value, row.vendor)}</span><Pill s={row.s} t={t} /></> : <span className="mg-pill" data-s={row.s}>{value}</span>}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </details>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#9CA7B5]">{s.note}</p>
    </Section>
  );
}

/** Part 16. */
export function GatewayComparison({ t }: { t: T }) {
  const c = t.comparison;
  return (
    <Section label="mg-compare">
      <Head id="mg-compare" eyebrow={c.eyebrow} title={c.title} />
      <div data-mg-reveal className="mt-12 overflow-x-auto rounded-2xl ring-1 ring-[#161d26]" tabIndex={0} role="region" aria-labelledby="mg-compare">
        <table className="mg-table">
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">{c.feature}</span></th>
              {c.columns.map((col, i) => (
                <th key={col} scope="col" className={i === 2 ? 'mg-col-us' : ''}>
                  {col}{i === 2 && <span className="mg-pill ml-2 align-middle" data-s="planned">{c.plannedTag}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.rows.map(([label, ...cells]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {cells.map((x, i) => <td key={i} className={i === 2 ? 'mg-col-us font-medium' : 'text-[#9CA7B5]'}>{x}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-sm text-[#9CA7B5]">{c.note}</p>
    </Section>
  );
}

/** Part 17: the chain, the six stages, and three scenarios. */
export function ConnectivityJourney({ t }: { t: T }) {
  const j = t.journey;
  const chain = (nodes: string[], tech?: (string | null)[]) => (
    <ol className="mg-chain mg-chain-row" style={{ ['--n' as string]: nodes.length }}>
      {nodes.map((n, i) => (
        <li key={n + i} className="mg-chain-node flex min-h-[5.5rem] flex-col justify-between gap-3 text-[0.8125rem] sm:text-[0.9375rem]" data-on={i === nodes.length - 1 ? 'true' : undefined}>
          <span className="font-mono text-[0.6875rem] text-[#45B8FF]">{String(i + 1).padStart(2, '0')}{tech?.[i] ? ` · ${tech[i]}` : ''}</span>
          <span>{n}</span>
          {i < nodes.length - 1 && <span className="mg-chain-link" style={{ ['--i' as string]: i }} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
  return (
    <Section label="mg-journey" className="bg-[radial-gradient(ellipse_at_50%_100%,rgba(38,125,255,0.1),transparent_60%)]">
      <Head id="mg-journey" eyebrow={j.eyebrow} title={j.title} />
      <div data-mg-reveal className="mt-12">{chain(j.chain)}</div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {j.stages.map(([title, body], i) => (
          <li key={title} data-mg-reveal className="mg-panel p-5" style={{ ['--d' as string]: `${(i % 3) * 70}ms` }}>
            <p className="font-mono text-xs text-[#45B8FF]">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#9CA7B5]">{body}</p>
          </li>
        ))}
      </ol>
      <div data-mg-reveal className="mt-14">
        <Tabs label={j.scenarioLabel} tabs={j.scenarios.map((s) => s.name)} listClassName="w-fit max-w-full"
          panels={j.scenarios.map((s) => (
            <div key={s.name} className="mt-6">{chain(s.chain)}</div>
          ))} />
      </div>
      <p className="mt-6 text-sm text-[#9CA7B5]">{j.note}</p>
    </Section>
  );
}

/** Part 18: the family. Only real pages are linked; planned products have no links. */
export function VexaOsEcosystem({ t, locateNode }: { t: T; locateNode: LocateNodeLink | null }) {
  const e = t.ecosystem;
  return (
    <Section label="mg-eco">
      <Head id="mg-eco" title={e.title} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {e.items.map((item, i) => {
          const kind = ECOSYSTEM[i];
          const here = kind === 'here';
          return (
            <li key={item.name} data-mg-reveal className={`mg-panel flex flex-col p-6 ${here ? 'ring-1 ring-[#45B8FF]/50' : ''}`} style={{ ['--d' as string]: `${i * 70}ms` }}>
              <div className="flex flex-wrap items-center gap-2">
                {kind === 'planned' && <Pill s="planned" t={t} />}
                {kind === 'locate' && locateNode && <span className="mg-pill" data-s="inDevelopment">{locateNode.badge}</span>}
                {here && <><span className="mg-pill" data-s="planned">{e.here}</span><span className="mg-pill" data-s="inDevelopment">{e.soon}</span></>}
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9CA7B5]">{item.body}</p>
              {kind === 'locate' && locateNode && <Link href={locateNode.href} className="mg-link-cta mt-5 text-sm">{e.explore}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/** Part 19: the main conversion. */
export function EarlyAccess({ t, locale, source }: { t: T; locale: Locale; source: string }) {
  const e = t.early;
  return (
    <section id="join" data-mg-spy="join" aria-labelledby="mg-join" className="mg-join overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <span id="join-consult" className="absolute top-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-[76rem] gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <p className="mg-eyebrow">{e.eyebrow}</p>
          <h2 id="mg-join" className="mg-h2 mt-4">{e.title}</h2>
          <p className="mg-lead mt-6 text-[#C9D1DB]">{e.body}</p>
          <p className="mt-3 text-[#9CA7B5]">{e.secondary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#join-form" className="mg-btn mg-btn-primary">{e.primary}</a>
            <a href="#join-consult" className="mg-btn mg-btn-ghost">{e.consult}</a>
          </div>
          <div className="mg-closing-visual relative -mx-5 mt-8 sm:mx-0" style={{ ['--p' as string]: 0.35 }}>
            <Picture image="studio" alt={e.imageAlt} sizes="(min-width: 1024px) 34rem, 100vw" className="mg-closing-base block" />
            <Picture image="studioLed" alt="" sizes="(min-width: 1024px) 34rem, 100vw" className="absolute inset-0" imgClassName="h-full" />
          </div>
        </div>
        <div id="join-form" data-mg-anchor><EarlyAccessForm t={e.form} locale={locale} source={source} /></div>
      </div>
    </section>
  );
}

/** Part 20. */
export function GatewayFAQ({ t }: { t: T }) {
  return (
    <Section id="faq" spy="faq" label="mg-faq">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <Head id="mg-faq" eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="border-t border-[#161d26]">
          {t.faq.items.map((f) => (
            <details key={f.q} className="mg-faq mg-spec border-b border-[#161d26]">
              <summary className="flex items-center justify-between gap-5 py-5">
                <h3 className="text-[1.0625rem] font-semibold sm:text-lg">{f.q}</h3>
                <span className="mg-spec-mark" aria-hidden="true" />
              </summary>
              <p className="mg-body pb-6 pr-10">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Part 21 closing: the product fades to near-black until only its light remains. */
export function GatewayClosingHero({ t }: { t: T }) {
  const c = t.closing;
  return (
    <section aria-labelledby="mg-closing" className="mg-closing relative overflow-hidden px-5 pb-28 pt-10 text-center sm:px-8" data-mg-scrub>
      <div className="mg-closing-visual relative mx-auto max-w-[64rem]" aria-hidden="true">
        <Picture image="studio" alt="" sizes="(min-width: 1024px) 64rem, 100vw" className="mg-closing-base block" />
        <Picture image="studioLed" alt="" sizes="(min-width: 1024px) 64rem, 100vw" className="absolute inset-0" imgClassName="h-full" />
      </div>
      <div className="relative -mt-[12%]">
        <h2 id="mg-closing" className="mg-h2">{c.line.map((l, i) => <span key={i} className={`block ${i ? 'mg-second' : ''}`}>{l}</span>)}</h2>
        <p className="mt-10 text-lg font-semibold tracking-tight">{c.name} <span className="text-[#657181]">—</span> <span className="text-[#45B8FF]">{c.soon}</span></p>
        <a href="#join" className="mg-btn mg-btn-primary mt-8">{c.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
      </div>
    </section>
  );
}
