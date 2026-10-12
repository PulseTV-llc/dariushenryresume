import Image from 'next/image';
import Link from 'next/link';
import { Activity, ArrowDown, ArrowRight, Box, Check, CloudCog, Minus, Radar, Radio, Router, Smartphone, Sparkles, Workflow, X } from 'lucide-react';
import { localePath, type Locale } from '@/lib/i18n/config';
import { imageUrl } from '@/lib/store/config';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreImage, StoreProduct } from '@/lib/store/types';
import type { LocateNodeStrings } from '@/lib/locate-node/strings';
import { buyView, words } from '@/lib/locate-node/view';
import NotifyForm from '@/components/store/NotifyForm';
import { facilityStrings } from '@/lib/locate-node/facility-strings';
import Facility from './Facility';
import LocateNodeFx from './LocateNodeFx';

const BENTO_ICONS = [Radio, Radar, Activity, Workflow, Sparkles, Box];
const FLOW_ICONS = [Radio, Router, CloudCog, Smartphone];

/** A product photo from the store, never stretched: it keeps its own proportions, or is cropped by `fit`. */
function Photo({ image, alt, sizes, priority = false, className = '', fit }: {
  image: StoreImage; alt: string; sizes: string; priority?: boolean; className?: string; fit?: { ratio: string; position: string };
}) {
  if (fit) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: fit.ratio }}>
        <Image src={imageUrl(image.path)} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: fit.position }} />
      </div>
    );
  }
  return <Image src={imageUrl(image.path)} alt={alt} width={image.width ?? 1448} height={image.height ?? 1086} sizes={sizes} priority={priority} className={`h-auto w-full ${className}`} />;
}

function Lines({ lines, className = '' }: { lines: string[]; className?: string }) {
  return <>{lines.map((l, i) => <span key={i} className={`block ${i === lines.length - 1 ? className : ''}`}>{l}</span>)}</>;
}

/**
 * The Locate Node page: one long, dark, scroll-told story. Everything it says comes from the product's
 * description in the store (see the honesty rules in lib/locate-node/strings.ts); what it offers to do
 * (notify, buy, price) comes from the product's live status.
 */
export default function LocateNodePage({ locale, t, s, product }: { locale: Locale; t: LocateNodeStrings; s: StoreStrings; product: StoreProduct }) {
  const buy = buyView(product, t, s.from, locale);
  const [hero, placeA, placeB] = [product.images[0], product.images[1], product.images[2]];
  const storeHref = localePath(locale, `/store/${product.slug}`);
  const cta = buy.action === 'notify' ? '#ln-notify' : storeHref;
  const statement = words(t.statement);
  const Cta = ({ className }: { className: string }) => buy.action === 'notify'
    ? <a href={cta} className={className}>{buy.label}<ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
    : <Link href={cta} className={className}>{buy.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>;

  return (
    <div id="locate-node" className="ln">
      {/* ------------------------------------------------------------------ hero */}
      <section data-ln-hero className="ln-hero relative overflow-hidden px-5 pb-10 pt-24 text-center sm:px-8 sm:pt-28" aria-labelledby="ln-title">
        <div className="ln-aurora" aria-hidden="true" />
        <p className="ln-eyebrow relative">{t.name}</p>
        <h1 id="ln-title" className="ln-display relative mx-auto mt-4"><Lines lines={t.hero.title} className="ln-shine" /></h1>
        <p className="relative mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300 sm:text-xl">{t.hero.subtitle}</p>
        <p className="relative mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
          <span className="ln-chip">{buy.status}</span>
          <span className="text-base font-semibold text-white">{buy.price}</span>
        </p>
        <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Cta className="ln-btn ln-btn-primary" />
          <a href="#ln-how" className="ln-btn ln-btn-ghost">{t.hero.how}</a>
        </div>
        {product.status === 'coming_soon' && buy.action === 'notify' && <p className="relative mx-auto mt-4 max-w-sm text-xs leading-relaxed text-slate-500">{t.buy.soonNote}</p>}
        {hero && (
          <div data-ln-scrub className="ln-hero-shot relative mx-auto mt-6 max-w-5xl sm:mt-2">
            <div className="ln-hero-glow" aria-hidden="true" />
            <Photo image={hero} alt={hero.alt || t.hero.imageAlt} sizes="(min-width: 1100px) 1024px, 100vw" priority className="ln-hero-img" />
          </div>
        )}
      </section>

      {/* ------------------------------------------- a sentence that lights up as you read */}
      <section className="px-5 py-24 sm:px-8 sm:py-40">
        <p data-ln-scrub className="ln-statement mx-auto max-w-5xl" style={{ ['--n' as string]: statement.length }}>
          {statement.map((w, i) => <span key={i} style={{ ['--i' as string]: i }}>{w}</span>)}
        </p>
      </section>

      {/* ---------------------------------------------------------------- design */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-design">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="ln-eyebrow">{t.design.eyebrow}</p>
            <h2 id="ln-design" className="ln-h2 mt-4"><Lines lines={t.design.title} className="ln-shine" /></h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">{t.design.body}</p>
            {hero && (
              <div data-ln-reveal className="ln-frame mt-8">
                {/* the same studio photo, cropped in on the light bar */}
                <Photo image={hero} alt="" sizes="(min-width: 1024px) 520px, 100vw" fit={{ ratio: '5 / 4', position: '54% 62%' }} className="ln-zoom rounded-[1.4rem]" />
              </div>
            )}
          </div>
          <ol className="space-y-5 lg:pt-24">
            {t.design.points.map((p, i) => (
              <li key={p.title} data-ln-reveal className="ln-card p-7 sm:p-9" style={{ ['--d' as string]: `${i * 60}ms` }}>
                <p className="ln-index">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------------------------- stats */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-stats">
        <h2 id="ln-stats" className="mx-auto max-w-3xl text-center text-2xl font-semibold tracking-tight text-slate-300 sm:text-3xl">{t.stats.title}</h2>
        <dl className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {t.stats.items.map((x, i) => (
            <div key={x.label} data-ln-reveal className="ln-card flex flex-col p-8 text-center" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <dd className="ln-stat order-1"><span data-ln-count={x.value}>{x.value}</span></dd>
              <dt className="order-2 mt-3 text-lg font-semibold text-white">{x.label}</dt>
              <dd className="order-3 mt-2 text-sm leading-relaxed text-slate-400">{x.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ----------------------------------------------------------- how it works */}
      <section id="ln-how" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-flow">
        <div className="mx-auto max-w-6xl text-center">
          <p className="ln-eyebrow">{t.flow.eyebrow}</p>
          <h2 id="ln-flow" className="ln-h2 mx-auto mt-4 max-w-3xl"><Lines lines={t.flow.title} className="ln-shine" /></h2>
          <ol data-ln-reveal className="ln-flow mt-14 text-left">
            {t.flow.steps.map((step, i) => {
              const Icon = FLOW_ICONS[i];
              return (
                <li key={step.title} className={`ln-flow-step ${i === 1 ? 'is-node' : ''}`} style={{ ['--i' as string]: i }}>
                  {i > 0 && <span className="ln-flow-link" aria-hidden="true"><i /><i /></span>}
                  <div className="ln-flow-node">
                    <span className="ln-flow-icon"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                    <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-slate-500">{t.flow.note}</p>
        </div>
      </section>

      {/* -------------------------------------------------------------- facility */}
      <Facility t={facilityStrings(locale)} />

      {/* ----------------------------------------------------------------- bento */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-bento">
        <div className="mx-auto max-w-6xl">
          <p className="ln-eyebrow">{t.bento.eyebrow}</p>
          <h2 id="ln-bento" className="ln-h2 mt-4 max-w-3xl"><Lines lines={t.bento.title} className="ln-shine" /></h2>
          <ul className="ln-bento mt-12">
            {t.bento.items.map((item, i) => {
              const Icon = BENTO_ICONS[i];
              return (
                <li key={item.title} data-ln-reveal className={`ln-card ln-tile ln-tile-${i}`} style={{ ['--d' as string]: `${(i % 3) * 70}ms` }}>
                  {i === 0 && <span className="ln-waves" aria-hidden="true"><i /><i /><i /></span>}
                  {i === 1 && <span className="ln-zones" aria-hidden="true">{Array.from({ length: 12 }, (_, k) => <i key={k} />)}</span>}
                  {i === 4 && <span className="ln-bar" aria-hidden="true" />}
                  <span className="ln-tile-icon"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-300">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- places */}
      {(placeA || placeB) && (
        <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-places">
          <div className="mx-auto max-w-6xl">
            <p className="ln-eyebrow">{t.places.eyebrow}</p>
            <h2 id="ln-places" className="ln-h2 mt-4"><Lines lines={t.places.title} className="ln-shine" /></h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {[placeA, placeB].map((img, i) => img && (
                <figure key={img.id} data-ln-reveal className="ln-frame" style={{ ['--d' as string]: `${i * 120}ms` }}>
                  <div data-ln-scrub className="overflow-hidden rounded-[1.4rem]">
                    <Photo image={img} alt={img.alt || t.places.alts[i]} sizes="(min-width: 1024px) 560px, 100vw" className="ln-drift" />
                  </div>
                  <figcaption className="px-3 pb-2 pt-4 text-lg font-medium text-slate-200">{t.places.captions[i]}</figcaption>
                </figure>
              ))}
            </div>
            <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{t.places.listTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.places.list.map((x) => <li key={x} className="ln-pill">{x}</li>)}
            </ul>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- editions */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-editions">
        <div className="mx-auto max-w-6xl">
          <p className="ln-eyebrow">{t.editions.eyebrow}</p>
          <h2 id="ln-editions" className="ln-h2 mt-4">{t.editions.title}</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {t.editions.items.map((e, i) => (
              <li key={e.name} data-ln-reveal className="ln-card p-8" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <p className="ln-index">{t.name}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{e.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">{e.body}</p>
                {e.note && <p className="mt-4 text-sm text-slate-500">{e.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------------- compare */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-compare">
        <div className="mx-auto max-w-5xl">
          <p className="ln-eyebrow">{t.compare.eyebrow}</p>
          <h2 id="ln-compare" className="ln-h2 mt-4"><Lines lines={t.compare.title} className="ln-shine" /></h2>
          <div data-ln-reveal className="ln-card mt-10 overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-1/2 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:px-8">{t.compare.old}</th>
                  <th scope="col" className="ln-col-new w-1/2 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300 sm:px-8">{t.compare.new}</th>
                </tr>
              </thead>
              <tbody>
                {t.compare.rows.map(([oldWay, newWay]) => (
                  <tr key={oldWay} className="border-t border-white/10 align-top">
                    <td className="px-5 py-5 text-[15px] leading-relaxed text-slate-400 sm:px-8 sm:text-base">
                      <X className="mb-2 h-4 w-4 text-slate-600" aria-hidden="true" />{oldWay}
                    </td>
                    <td className="ln-col-new px-5 py-5 text-[15px] font-medium leading-relaxed text-white sm:px-8 sm:text-base">
                      <Check className="mb-2 h-4 w-4 text-sky-300" strokeWidth={3} aria-hidden="true" />{newWay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- specs */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-specs">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="ln-eyebrow">{t.specs.eyebrow}</p>
            <h2 id="ln-specs" className="ln-h2 mt-4 !text-4xl sm:!text-5xl">{t.specs.title}</h2>
          </div>
          <div>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {t.specs.rows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[1fr_1.4fr] gap-4 py-4 sm:py-5">
                  <dt className="text-sm text-slate-400 sm:text-base">{label}</dt>
                  <dd className={`text-sm sm:text-base ${value === '—' ? 'text-slate-600' : 'font-medium text-white'}`}>
                    {value === '—' ? <><Minus className="inline h-4 w-4" aria-hidden="true" /><span className="sr-only">{t.specs.note}</span></> : value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">{t.specs.note}</p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- compatibility */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-compat">
        <div className="mx-auto max-w-6xl">
          <p className="ln-eyebrow">{t.compat.eyebrow}</p>
          <h2 id="ln-compat" className="ln-h2 mt-4">{t.compat.title}</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div data-ln-reveal className="ln-card p-7">
              <h3 className="text-lg font-semibold text-white">{t.compat.sensorsTitle}</h3>
              <ul className="mt-4 space-y-2.5">{t.compat.sensors.map((x) => <li key={x} className="flex gap-2.5 text-slate-200"><Check className="mt-1 h-4 w-4 shrink-0 text-sky-300" strokeWidth={3} aria-hidden="true" />{x}</li>)}</ul>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">{t.compat.sensorsNote}</p>
            </div>
            <div data-ln-reveal className="ln-card p-7" style={{ ['--d' as string]: '80ms' }}>
              <h3 className="text-lg font-semibold text-white">{t.compat.connectTitle}</h3>
              <ul className="mt-4 space-y-2.5">{t.compat.connect.map((x) => <li key={x} className="flex gap-2.5 text-slate-200"><Check className="mt-1 h-4 w-4 shrink-0 text-sky-300" strokeWidth={3} aria-hidden="true" />{x}</li>)}</ul>
            </div>
            <div data-ln-reveal className="ln-card p-7" style={{ ['--d' as string]: '160ms' }}>
              <h3 className="text-lg font-semibold text-white">{t.compat.notTitle}</h3>
              <ul className="mt-4 space-y-2.5">{t.compat.not.map((x) => <li key={x} className="flex gap-2.5 text-slate-300"><X className="mt-1 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- FAQ */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ln-faq">
        <div className="mx-auto max-w-3xl">
          <h2 id="ln-faq" className="ln-h2 !text-4xl sm:!text-5xl">{t.faq.title}</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {t.faq.items.map((f) => (
              <details key={f.q} className="ln-faq group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="ln-faq-mark" aria-hidden="true" />
                </summary>
                <p className="pb-6 pr-10 text-base leading-relaxed text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- final */}
      <section id="ln-notify" data-ln-end className="ln-final relative scroll-mt-20 overflow-hidden px-5 pb-40 pt-24 text-center sm:px-8 sm:pt-32" aria-labelledby="ln-final">
        <div className="ln-aurora" aria-hidden="true" />
        <h2 id="ln-final" className="ln-display relative mx-auto max-w-[18ch] !text-[clamp(2.4rem,7vw,5.5rem)]"><Lines lines={t.final.title} className="ln-shine" /></h2>
        <p className="relative mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{buy.action === 'notify' ? t.final.body : t.hero.subtitle}</p>
        <p className="relative mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
          <span className="ln-chip">{buy.status}</span>
          <span className="text-base font-semibold text-white">{buy.price}</span>
        </p>
        {buy.action === 'notify' ? (
          <div className="relative mx-auto mt-2 flex max-w-md justify-center text-left"><NotifyForm productId={product.id} locale={locale} t={s} /></div>
        ) : (
          <div className="relative mt-8"><Cta className="ln-btn ln-btn-primary" /></div>
        )}
        <p className="relative mt-6"><Link href={storeHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-white">{t.buy.view}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></p>
        <p className="relative mx-auto mt-14 max-w-2xl text-xs leading-relaxed text-slate-500">{t.footnote}</p>
      </section>

      {/* -------------------------------------------------------------- buy bar */}
      <div data-ln-bar data-on="false" className="ln-buybar" role="region" aria-label={t.name}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white sm:text-base">{t.name}</span>
            <span className="block truncate text-xs text-slate-400 sm:text-sm">{buy.price} · {buy.status}</span>
          </p>
          <Cta className="ln-btn ln-btn-primary !min-h-[2.75rem] shrink-0 !px-5" />
        </div>
      </div>
      <LocateNodeFx root="locate-node" />
    </div>
  );
}
