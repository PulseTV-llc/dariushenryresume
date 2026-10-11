import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, CloudCog, Radio, Router, Smartphone } from 'lucide-react';
import { localePath, type Locale } from '@/lib/i18n/config';
import { priceLabel, productText } from '@/lib/store/format';
import type { StoreStrings } from '@/lib/store/strings';
import type { StoreProduct } from '@/lib/store/types';
import { Availability, ProductImage } from './StoreParts';
import StoreHeroFx from './StoreHeroFx';

/** "Hardware made for [[the VexaOs platform.]]": the bracketed part takes the light brand gradient. */
function accent(text: string) {
  return text.split(/(\[\[[^\]]+\]\])/g).map((part, i) =>
    part.startsWith('[[') ? <span key={i} className="sh-accent">{part.slice(2, -2)}</span> : <span key={i}>{part}</span>);
}

/** The orbital mark as a live element: orbits turn slowly, the ring counter-turns, the core breathes. */
function OrbitalMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="sh-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1d4ed8" /><stop offset=".45" stopColor="#2f8bff" /><stop offset="1" stopColor="#67e8f9" /></linearGradient>
        <linearGradient id="sh-b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7dd3fc" /><stop offset=".5" stopColor="#22a7f5" /><stop offset="1" stopColor="#1d4ed8" /></linearGradient>
        <radialGradient id="sh-c" cx=".42" cy=".38" r=".7"><stop offset="0" stopColor="#ffffff" /><stop offset=".35" stopColor="#8fdcff" /><stop offset="1" stopColor="#1d6bf0" /></radialGradient>
        <filter id="sh-g" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.6" /></filter>
      </defs>
      <g className="sh-ring">
        <circle cx="50" cy="50" r="45.5" fill="none" stroke="#38bdf8" strokeOpacity=".35" strokeWidth=".5" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="#38bdf8" strokeOpacity=".16" strokeWidth=".4" strokeDasharray=".6 2.4" />
        <path d="M50 4.5V95.5M4.5 50H95.5" stroke="#38bdf8" strokeOpacity=".26" strokeWidth=".45" strokeDasharray=".6 2.2" />
        <g fill="#7dd3fc"><circle cx="50" cy="4.5" r="1.9" /><circle cx="50" cy="95.5" r="1.9" /><circle cx="4.5" cy="50" r="1.9" /><circle cx="95.5" cy="50" r="1.9" /></g>
      </g>
      <g className="sh-orbits">
        <g fill="none" strokeWidth="5.2" opacity=".6" filter="url(#sh-g)">
          <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(35 50 50)" stroke="#2f8bff" />
          <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(-35 50 50)" stroke="#38bdf8" />
        </g>
        <g fill="none" strokeWidth="5.2">
          <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(35 50 50)" stroke="url(#sh-a)" />
          <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(-35 50 50)" stroke="url(#sh-b)" />
        </g>
      </g>
      <circle className="sh-core-glow" cx="50" cy="50" r="15" fill="#38bdf8" filter="url(#sh-g)" />
      <circle cx="50" cy="50" r="9" fill="url(#sh-c)" />
    </svg>
  );
}

// fixed positions (percent) so the server and the browser draw the same field
const STARS = [[6, 22, 0], [14, 68, 1.2], [23, 12, 2.1], [31, 84, 0.6], [39, 35, 1.7], [47, 8, 2.8], [55, 76, 0.3], [63, 18, 1.4], [71, 58, 2.4], [79, 90, 0.9], [86, 30, 1.9], [93, 66, 0.2], [97, 12, 2.6], [18, 44, 3.1], [68, 40, 3.4]];

/**
 * The store's hero card: what the hardware is for, in one glance. Server-rendered; all motion is CSS
 * (see "Store hero" in app/globals.css) plus a few lines of script for the cursor spotlight and scroll
 * depth. With prefers-reduced-motion everything holds still.
 */
export default function StoreHero({ locale, t, chips, spotlight, hasProducts }: {
  locale: Locale; t: StoreStrings; chips: string[]; spotlight: StoreProduct | null; hasProducts: boolean;
}) {
  const h = t.hero;
  const flow = [{ icon: Radio, label: h.flowSensor }, { icon: Router, label: h.flowGateway }, { icon: CloudCog, label: h.flowCloud }, { icon: Smartphone, label: h.flowApps }];
  const text = spotlight ? productText(spotlight, locale) : null;
  return (
    <section className="px-3 pt-20 sm:px-6 sm:pt-24 lg:px-8" aria-labelledby="store-hero-title">
      <div id="store-hero" className="store-hero relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
        {/* scenery: gradient, grid, particles, horizon glow, cursor spotlight */}
        <div className="sh-bg" aria-hidden="true">
          <div className="sh-grid sh-depth-1" />
          <div className="sh-stars sh-depth-2">
            {STARS.map(([x, y, d], i) => <span key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />)}
          </div>
          <div className="sh-horizon sh-depth-1" />
          <div className="sh-spot" />
        </div>

        <div className="relative grid grid-cols-1 items-center gap-10 px-5 pb-8 pt-10 sm:px-10 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-16 lg:pb-10 lg:pt-20 2xl:px-24">
          <div className="min-w-0">
            <p className="sh-eyebrow"><span aria-hidden="true" />{h.eyebrow}</p>
            <h1 id="store-hero-title" className="mt-5 text-balance text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">{accent(h.title)}</h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-sky-100/85 sm:text-lg">{h.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {hasProducts ? (
                <a href="#products" className="sh-btn sh-btn-primary">{h.shop}<ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
              ) : (
                <Link href={localePath(locale, '/contact')} className="sh-btn sh-btn-primary">{h.ask}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              )}
              <Link href={localePath(locale, '/platform')} className="sh-btn sh-btn-ghost">{h.platform}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <li key={chip} className="sh-chip"><Check className="h-3.5 w-3.5 shrink-0 text-sky-300" strokeWidth={3} aria-hidden="true" />{chip}</li>
              ))}
            </ul>
          </div>

          {/* the glass card: a product on sale, or the mark itself */}
          <div className="sh-depth-3 relative mx-auto w-full max-w-[26rem] lg:max-w-none">
            <div className="sh-halo" aria-hidden="true" />
            {spotlight && text ? (
              <Link href={localePath(locale, `/store/${spotlight.slug}`)} className="sh-glass sh-float group block p-3 sm:p-4">
                <div className="relative">
                  <ProductImage image={spotlight.images[0]} name={text.name} t={t} sizes="(min-width: 1024px) 34vw, 90vw" priority className="!rounded-[1.25rem]" />
                  <span className="sh-tag">{h.featured}</span>
                  <OrbitalMark className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 sm:h-24 sm:w-24" />
                </div>
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 px-2 pb-1 pt-4">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-lg font-semibold leading-snug text-white">{text.name}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-sky-100/80">
                      <span className="text-base font-semibold text-white">{priceLabel(spotlight, locale, t.from) ?? t.noPrice}</span>
                      <Availability product={spotlight} t={t} />
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-sky-200 transition group-hover:text-white">{h.viewProduct}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" /></span>
                </div>
              </Link>
            ) : (
              <div className="sh-glass sh-float p-6 sm:p-8">
                <div className="mx-auto aspect-square w-full max-w-[19rem]"><OrbitalMark className="h-full w-full" /></div>
                <p className="mt-4 text-center text-sm font-medium text-sky-100/85">{h.markCaption}</p>
              </div>
            )}
          </div>
        </div>

        {/* sensor -> gateway -> cloud -> apps, with data moving along the line */}
        <div className="relative px-5 pb-6 sm:px-10 sm:pb-10 lg:px-16 2xl:px-24">
          <ol className="sh-flow" aria-label={h.flowLabel}>
            {flow.map(({ icon: Icon, label }, i) => (
              <li key={label} className="sh-step">
                {i > 0 && <span className="sh-link" aria-hidden="true" style={{ ['--i' as string]: i - 1 }}><i /><i /></span>}
                <span className="sh-node">
                  <span className="sh-node-icon"><Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" /></span>
                  <span className="sh-node-label">{label}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <StoreHeroFx target="store-hero" />
      </div>
    </section>
  );
}
