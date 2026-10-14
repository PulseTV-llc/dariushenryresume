'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { CITIES, EVENT_AT, LAKES, MAP, ROUTE } from './route';

/** Is the page's motion paused (the sub-navigation's button) or reduced? */
const motionOff = () => typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.getElementById('mg')?.dataset.paused === 'true');

/** Animate a value from its current position to 1 over `ms`, frame by frame; pauses while the page's motion is paused. */
function useJourney(ms: number) {
  const [p, setP] = useState(1);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const last = useRef(0);
  const stop = useCallback(() => { cancelAnimationFrame(raf.current); setPlaying(false); }, []);
  const play = useCallback((from?: number) => {
    cancelAnimationFrame(raf.current);
    if (from != null) setP(from);
    setPlaying(true);
    last.current = performance.now();
    const tick = (now: number) => {
      const dt = now - last.current; last.current = now;
      if (!motionOff()) setP((v) => { const n = Math.min(1, v + dt / ms); if (n >= 1) { setPlaying(false); return 1; } return n; });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [ms]);
  useEffect(() => { if (!playing) cancelAnimationFrame(raf.current); }, [playing]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return { p, setP, playing, play, stop };
}

function useRoutePoints() {
  const path = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  useEffect(() => { if (path.current) setLen(path.current.getTotalLength()); }, []);
  const at = (t: number) => { const pt = path.current && len ? path.current.getPointAtLength(len * t) : null; return pt ? { x: pt.x, y: pt.y } : null; };
  return { path, len, at };
}

function MapArt({ id, p, len, pathRef, at, events, from, to, small = false }: {
  id: string; p: number; len: number; pathRef: React.RefObject<SVGPathElement>; at: (t: number) => { x: number; y: number } | null; events: boolean[]; from: string; to: string; small?: boolean;
}) {
  const truck = at(p);
  return (
    <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className="mg-map block h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#10161e" strokeWidth="1" /></pattern>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#45B8FF" stopOpacity="0.55" /><stop offset="1" stopColor="#45B8FF" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={MAP.w} height={MAP.h} fill="#06080c" />
      <rect width={MAP.w} height={MAP.h} fill={`url(#${id}-grid)`} />
      {LAKES.map((d, i) => <path key={i} d={d} fill="#0b1522" stroke="#1d3150" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />)}
      <path ref={pathRef} d={ROUTE} className="route" />
      <path d={ROUTE} className="route-lit" style={len ? { strokeDasharray: len, strokeDashoffset: len * (1 - p) } : { opacity: p >= 1 ? 1 : 0 }} />
      {[CITIES.detroit, CITIES.chicago].map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={small ? 9 : 7} fill="#0c1016" stroke="#9CA7B5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <text x={c.x} y={c.y + (small ? 44 : 36)} textAnchor="middle" fill="#9CA7B5" fontSize={small ? 30 : 22} fontWeight="600">{i === 0 ? from : to}</text>
        </g>
      ))}
      {len > 0 && EVENT_AT.map((t, i) => { const q = at(t); return q && <circle key={i} cx={q.x} cy={q.y} r={small ? 0 : 8} className="ev" data-on={events[i]} />; })}
      {truck && (
        <g>
          <circle cx={truck.x} cy={truck.y} r={small ? 46 : 38} fill={`url(#${id}-glow)`} />
          <circle cx={truck.x} cy={truck.y} r={small ? 12 : 9} fill="#fff" stroke="#267DFF" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        </g>
      )}
    </svg>
  );
}

/** Part 6: the illustrative journey. Plays once when it comes into view; the event list is always readable. */
export function LocationMap({ t }: { t: { label: string; title: string; route: string; from: string; to: string; replay: string; events: string[]; alt: string } }) {
  const id = useId().replace(/:/g, '');
  const box = useRef<HTMLDivElement>(null);
  const { p, play, playing } = useJourney(9000);
  const { path, len, at } = useRoutePoints();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !box.current) return;
    let started = false;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; play(0); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(box.current);
    return () => io.disconnect();
  }, [play]);
  const on = EVENT_AT.map((x) => p >= x - 0.001);
  return (
    <div ref={box} className="mg-panel overflow-hidden p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F5A524]">{t.label}</p>
          <p className="mt-1 font-semibold">{t.title} <span className="text-[#9CA7B5]">· {t.route}</span></p>
        </div>
        <button type="button" onClick={() => play(0)} disabled={playing} className="mg-btn mg-btn-ghost mg-btn-sm disabled:opacity-50"><RotateCcw className="h-4 w-4" aria-hidden="true" />{t.replay}</button>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <figure className="overflow-hidden rounded-2xl" role="img" aria-label={t.alt}>
          <MapArt id={id} p={p} len={len} pathRef={path} at={at} events={on} from={t.from} to={t.to} />
        </figure>
        <ol className="mg-events space-y-2 self-center px-2 pb-2 md:px-0">
          {t.events.map((e, i) => (
            <li key={e} data-on={on[i]} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem]" style={{ background: on[i] ? 'rgba(38,125,255,0.1)' : 'transparent' }}>
              <span className={`h-2.5 w-2.5 flex-none rounded-full ${on[i] ? 'bg-[#45B8FF] shadow-[0_0_10px_2px_rgba(69,184,255,0.8)]' : 'bg-[#28313B]'}`} aria-hidden="true" />
              {e}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

type Trip = { title: string; truck: string; truckValue: string; route: string; routeValue: string; gateway: string; gatewayValue: string; temperature: string; temperatureValue: string;
  humidity: string; humidityValue: string; door: string; doorValue: string; location: string; locationValue: string; progress: string; play: string; pause: string; label: string };

/** Part 9, story 01: a simulated trip. Scrub the trip or play it; the values are the brief's simulated ones. */
export function TripDashboard({ t, from, to }: { t: Trip; from: string; to: string }) {
  const id = useId().replace(/:/g, '');
  const { p, setP, playing, play, stop } = useJourney(12000);
  const { path, len, at } = useRoutePoints();
  useEffect(() => { setP(0.38); }, [setP]);
  const pct = Math.round(p * 100);
  const rows: [string, string, boolean?][] = [
    [t.truck, t.truckValue], [t.route, t.routeValue], [t.gateway, t.gatewayValue, true], [t.temperature, t.temperatureValue],
    [t.humidity, t.humidityValue], [t.door, t.doorValue], [t.location, t.locationValue, true],
  ];
  return (
    <div className="mg-dash p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold">{t.title}</p>
        <span className="rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#F7C66B] ring-1 ring-[#F5A524]/40">{t.label}</span>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-[#28313B]">
        <MapArt id={id} p={p} len={len} pathRef={path} at={at} events={[]} from={from} to={to} small />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={() => (playing ? stop() : play(p >= 1 ? 0 : undefined))} aria-label={playing ? t.pause : t.play}
                className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#267DFF] text-white">
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        </button>
        <label className="flex-1">
          <span className="sr-only">{t.progress}</span>
          <input type="range" min={0} max={100} value={pct} onChange={(e) => { stop(); setP(Number(e.target.value) / 100); }} aria-valuetext={`${pct}%`}
                 className="mg-range" style={{ ['--v' as string]: `${pct}%` }} />
        </label>
        <span className="w-11 text-right text-sm tabular-nums text-[#9CA7B5]" aria-hidden="true">{pct}%</span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {rows.map(([k, v, live]) => (
          <div key={k} className="rounded-xl bg-[#0c1016] px-3 py-2.5 ring-1 ring-[#28313B]">
            <dt className="text-xs text-[#9CA7B5]">{k}</dt>
            <dd className="mt-0.5 flex items-center gap-1.5 font-semibold">{live && <span className="mg-dot" aria-hidden="true" />}{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
