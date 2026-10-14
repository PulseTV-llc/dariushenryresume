'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Bluetooth, RadioTower, Signal, Wifi } from 'lucide-react';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import Picture from './Picture';

type T = MobileGatewayStrings['networks'];
const ICONS = [Bluetooth, RadioTower, Wifi, Signal];
// where each radio's node sits around the gateway (viewBox 800×500), and the path it takes in
const NODES = [
  { x: 120, y: 92, d: 'M120 92 C 230 92, 270 190, 352 228' },
  { x: 680, y: 92, d: 'M680 92 C 570 92, 530 190, 448 228' },
  { x: 120, y: 408, d: 'M120 408 C 230 408, 270 310, 352 272' },
  { x: 680, y: 408, d: 'M680 408 C 570 408, 530 310, 448 272' },
];

/** Part 4: BLE | LoRaWAN | Wi-Fi | 4G. Choosing one lights its path into the gateway and explains it. */
export default function ConnectivitySelector({ t }: { t: T }) {
  const [active, setActive] = useState(0);
  const base = useId().replace(/:/g, '');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = t.items.length;
  const move = (i: number) => { const k = (i + n) % n; setActive(k); refs.current[k]?.focus(); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(active + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(active - 1); }
    else if (e.key === 'Home') { e.preventDefault(); move(0); }
    else if (e.key === 'End') { e.preventDefault(); move(n - 1); }
  };
  const item = t.items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
      {/* the diagram */}
      <div className="mg-net relative" aria-hidden="true">
        <div className="relative mx-auto aspect-[8/5] w-full max-w-[42rem]">
          <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id={`${base}-g`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#267DFF" stopOpacity="0.28" /><stop offset="1" stopColor="#267DFF" stopOpacity="0" /></radialGradient>
            </defs>
            <ellipse cx="400" cy="250" rx="300" ry="190" fill={`url(#${base}-g)`} />
            {[150, 220].map((r) => <ellipse key={r} cx="400" cy="250" rx={r * 1.5} ry={r} fill="none" stroke="#161d26" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
            {NODES.map((p, i) => (
              <g key={i} data-on={i === active}>
                <path d={p.d} className="net-path" />
                <path d={p.d} className="net-flow" style={{ animationDirection: i === 3 ? 'reverse' : 'normal' }} />
                <circle cx={p.x} cy={p.y} r="34" className="net-node" />
                <text x={p.x} y={p.y + (i < 2 ? -50 : 62)} textAnchor="middle" className="net-label">{t.items[i].tab}</text>
              </g>
            ))}
          </svg>
          {NODES.map((p, i) => {
            const Icon = ICONS[i];
            return <Icon key={i} className={`absolute h-[5%] w-[5%] min-h-4 min-w-4 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${i === active ? 'text-[#45B8FF]' : 'text-[#657181]'}`} style={{ left: `${(p.x / 800) * 100}%`, top: `${(p.y / 500) * 100}%` }} />;
          })}
          <div className="mg-net-device"><Picture image="cutout" alt="" sizes="(min-width: 1024px) 15vw, 34vw" /></div>
        </div>
      </div>

      {/* the controls and the explanation */}
      <div>
        <div role="tablist" aria-label={t.tablist} className="mg-tabs w-fit max-w-full" onKeyDown={onKey}>
          {t.items.map((it, i) => (
            <button key={it.tab} ref={(r) => { refs.current[i] = r; }} type="button" role="tab" id={`${base}-t${i}`} aria-controls={`${base}-p`} aria-selected={i === active}
                    tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} className="mg-tab">{it.tab}</button>
          ))}
        </div>
        <div role="tabpanel" id={`${base}-p`} aria-labelledby={`${base}-t${active}`} tabIndex={0} key={active} className="mg-fade-in mt-8">
          <p className="mg-eyebrow">{item.name}</p>
          <h3 className="mg-h3 mt-3">{item.title}</h3>
          <p className="mg-body mt-4 max-w-xl text-[1.0625rem]">{item.body}</p>
          <h4 className="mt-7 text-sm font-semibold text-[#F5F7FA]">{t.applications}</h4>
          <ul className="mg-list mt-3">{item.applications.map((a) => <li key={a}>{a}</li>)}</ul>
          <h4 className="mt-7 text-sm font-semibold text-[#F5F7FA]">{t.pathway}</h4>
          <ol className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            {item.path.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="mg-tech">{step}</span>
                {i < item.path.length - 1 && <ArrowRight className="h-4 w-4 text-[#45B8FF]" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-xl border-l-2 border-[#F5A524]/60 pl-4 text-sm leading-relaxed text-[#9CA7B5]"><span className="font-semibold text-[#F5F7FA]">{t.good}: </span>{item.note}</p>
        </div>
      </div>
    </div>
  );
}
