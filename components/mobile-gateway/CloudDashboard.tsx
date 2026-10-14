'use client';

import { useState } from 'react';
import { BarChart3, Bell, Boxes, LayoutGrid, MapPin, Radio, Router, Settings } from 'lucide-react';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';

type D = MobileGatewayStrings['cloud']['dash'];
const NAV_ICONS = [LayoutGrid, Router, Radio, Boxes, MapPin, Bell, BarChart3, Settings];
type W = 'map' | 'readings' | 'connectivity' | 'chart' | 'log' | 'battery' | 'alerts';
/** which panels each section of the concept is about (Overview: all of them) */
const FOCUS: W[][] = [[], ['map', 'connectivity', 'battery'], ['readings'], ['log'], ['map'], ['alerts'], ['chart'], ['connectivity', 'battery']];
// an illustrative temperature trace (°C), drawn without an axis: it only shows a reading staying inside a band
const TRACE = [3.6, 3.7, 3.9, 3.8, 4.0, 4.1, 3.9, 3.7, 3.8, 3.6, 3.7, 3.9, 4.2, 4.0, 3.8, 3.8, 3.7, 3.9, 3.8, 3.8];

/** Part 10: a conceptual VexaOs dashboard. The left navigation highlights what each area is planned to show. */
export default function CloudDashboard({ t }: { t: D }) {
  const [nav, setNav] = useState(0);
  const focus = (w: W) => (nav === 0 ? undefined : FOCUS[nav].includes(w) ? 'true' : 'dim');
  const pts = TRACE.map((v, i) => `${(i / (TRACE.length - 1)) * 300},${90 - (v - 3) * 40}`).join(' ');
  return (
    <div className="mg-dash">
      <div className="flex items-center gap-2 border-b border-[#161d26] px-4 py-3">
        {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#28313B]" aria-hidden="true" />)}
        <span className="ml-2 text-sm font-semibold">VexaOs Cloud</span>
        <span className="ml-auto rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#F7C66B] ring-1 ring-[#F5A524]/40">{t.label}</span>
      </div>
      <div className="grid md:grid-cols-[12.5rem_1fr]">
        <nav aria-label={t.label} className="mg-dash-nav flex gap-1 overflow-x-auto border-b border-[#161d26] p-2 md:block md:space-y-1 md:border-b-0 md:border-r">
          {t.nav.map((label, i) => {
            const Icon = NAV_ICONS[i];
            return <button key={label} type="button" aria-pressed={nav === i} onClick={() => setNav(i)}><Icon className="h-4 w-4 flex-none" aria-hidden="true" />{label}</button>;
          })}
        </nav>
        <div className="p-3 sm:p-4">
          <p className="mb-3 min-h-[2.75rem] text-sm leading-relaxed text-[#9CA7B5]" aria-live="polite">{t.navHelp[nav]}</p>
          <div className="grid gap-3 lg:grid-cols-3">
            <section className="mg-widget lg:col-span-2" data-focus={focus('map')} aria-label={t.map}>
              <h4 className="text-xs font-semibold text-[#9CA7B5]">{t.map}</h4>
              <svg viewBox="0 0 300 120" className="mt-2 h-auto w-full" aria-hidden="true">
                <rect width="300" height="120" rx="8" fill="#06080c" />
                <path d="M30 70 C 80 80, 130 85, 170 82 S 240 74, 270 66" fill="none" stroke="#263241" strokeWidth="2" />
                <path d="M110 12 C 116 40, 108 60, 122 74 C 130 80, 140 70, 140 56 C 142 36, 136 20, 138 4" fill="#0b1522" stroke="#1d3150" />
                {[[70, 77], [196, 79], [250, 40]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="10" fill="#267DFF" opacity="0.18" /><circle cx={x} cy={y} r="4" fill="#45B8FF" /></g>)}
              </svg>
            </section>
            <section className="mg-widget" data-focus={focus('readings')} aria-label={t.readings}>
              <h4 className="text-xs font-semibold text-[#9CA7B5]">{t.readings}</h4>
              <dl className="mt-1">{t.readingRows.map(([k, v]) => <div key={k} className="mg-kv"><dt className="text-[#9CA7B5]">{k}</dt><dd className="font-semibold tabular-nums">{v}</dd></div>)}</dl>
            </section>
            <section className="mg-widget lg:col-span-2" data-focus={focus('chart')} aria-label={t.chart}>
              <h4 className="text-xs font-semibold text-[#9CA7B5]">{t.chart}</h4>
              <svg viewBox="0 0 300 100" className="mt-2 h-auto w-full" role="img" aria-label={t.chartAlt}>
                <rect x="0" y="22" width="300" height="56" fill="#267DFF" opacity="0.07" />
                <path d="M0 22 H300 M0 78 H300" stroke="#1d3150" strokeDasharray="4 6" />
                <polyline points={pts} fill="none" stroke="#45B8FF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </section>
            <section className="mg-widget" data-focus={focus('connectivity')} aria-label={t.connectivity}>
              <h4 className="text-xs font-semibold text-[#9CA7B5]">{t.connectivity}</h4>
              <dl className="mt-1">{t.connectivityRows.map(([k, v]) => <div key={k} className="mg-kv"><dt className="text-[#9CA7B5]">{k}</dt><dd className="flex items-center gap-1.5 font-semibold"><span className="mg-dot" aria-hidden="true" />{v}</dd></div>)}</dl>
            </section>
            <section className="mg-widget" data-focus={focus('log')} aria-label={t.log}>
              <h4 className="text-xs font-semibold text-[#9CA7B5]">{t.log}</h4>
              <ul className="mt-2 space-y-1.5 text-sm">{t.logRows.map((r) => <li key={r} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#45B8FF]" aria-hidden="true" />{r}</li>)}</ul>
            </section>
            <section className="mg-widget" data-focus={focus('battery')} aria-label={t.battery}>
              <h4 className="text-xs font-semibold text-[#9CA7B5]">{t.battery}</h4>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#161d26]" aria-hidden="true"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#267DFF] to-[#45B8FF]" /></div>
              <p className="mt-2 text-sm text-[#9CA7B5]">{t.batteryValue}</p>
            </section>
            <section className="mg-widget" data-focus={focus('alerts')} aria-label={t.alerts}>
              <h4 className="text-xs font-semibold text-[#9CA7B5]">{t.alerts}</h4>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold"><Bell className="h-4 w-4 text-[#45B8FF]" aria-hidden="true" />{t.alertsValue}</p>
            </section>
          </div>
          <p className="mt-3 text-xs text-[#657181]">{t.caption}</p>
        </div>
      </div>
    </div>
  );
}
