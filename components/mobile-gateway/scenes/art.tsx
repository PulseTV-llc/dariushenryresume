/**
 * Original line-art environments for the Mobile Gateway page: dark scenes lit in electric blue. Each one is drawn
 * in a 1200×675 box and says where the real gateway (the cut-out of the studio render) sits in it, and where its
 * sensors are. Nothing here depicts the gateway itself: the device is always the real render, placed on top.
 */
import type { ReactNode } from 'react';
import type { SceneKey } from '@/lib/mobile-gateway/config';

export const VB = { w: 1200, h: 675 };
export interface SceneSpec {
  /** where the gateway is mounted (viewBox units); w is its size when shown in place (no callout) */
  device: { x: number; y: number; w: number };
  /** centre of the magnified callout that shows the real gateway; omitted when it is shown in place */
  callout?: { x: number; y: number };
  /** sensor points that report to the device */
  sensors: [number, number][];
  /** long-range rings (LoRaWAN) rather than short links */
  rings?: boolean;
  draw: (id: string) => ReactNode;
}

// palette (kept in sync with the page tokens in mobile-gateway.css)
const LINE = '#2f3a47';
const EDGE = '#4a5869';
const SOFT = '#1c242e';
const BLUE = '#267DFF';
const CYAN = '#45B8FF';
const FACE = '#0c1016';
const FACE2 = '#111821';

const P = ({ d, s = EDGE, w = 1.4, f = 'none', o = 1, dash }: { d: string; s?: string; w?: number; f?: string; o?: number; dash?: string }) => (
  <path d={d} stroke={s} strokeWidth={w} fill={f} opacity={o} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" strokeDasharray={dash} />
);
const R = ({ x, y, w, h, s = EDGE, f = FACE, r = 0, sw = 1.4, o = 1 }: { x: number; y: number; w: number; h: number; s?: string; f?: string; r?: number; sw?: number; o?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} stroke={s} strokeWidth={sw} fill={f} opacity={o} vectorEffect="non-scaling-stroke" />
);
const C = ({ x, y, r, s = EDGE, f = FACE, sw = 1.4 }: { x: number; y: number; r: number; s?: string; f?: string; sw?: number }) => (
  <circle cx={x} cy={y} r={r} stroke={s} strokeWidth={sw} fill={f} vectorEffect="non-scaling-stroke" />
);
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Sky, horizon glow and a ground plane with perspective lines. */
function Backdrop({ id, horizon = 400, glowX = 600, warm = false, grid = true }: { id: string; horizon?: number; glowX?: number; warm?: boolean; grid?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#04060a" />
          <stop offset={horizon / 675} stopColor={warm ? '#0b111c' : '#09101b'} />
          <stop offset="1" stopColor="#050609" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx={glowX / 1200} cy={horizon / 675} r="0.55">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.22" />
          <stop offset="0.45" stopColor={BLUE} stopOpacity="0.06" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050609" stopOpacity="0" />
          <stop offset="1" stopColor="#050609" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill={`url(#${id}-sky)`} />
      <rect width="1200" height="675" fill={`url(#${id}-glow)`} />
      <P d={`M0 ${horizon} H1200`} s={LINE} w={1} o={0.9} />
      {grid && range(13).map((i) => <P key={`g${i}`} d={`M${glowX} ${horizon} L${-1200 + i * 300} 675`} s={SOFT} w={1} o={0.7} />)}
      {grid && range(5).map((i) => { const y = horizon + (675 - horizon) * ((i + 1) / 6) ** 1.6; return <P key={`h${i}`} d={`M0 ${y} H1200`} s={SOFT} w={1} o={0.6} />; })}
    </>
  );
}
const Stars = ({ n = 36, seed = 3, maxY = 300 }: { n?: number; seed?: number; maxY?: number }) => (
  <g fill="#9CA7B5">
    {range(n).map((i) => {
      const x = (i * 337 + seed * 101) % 1200, y = (i * 191 + seed * 47) % maxY, r = (i % 5 === 0 ? 1.3 : 0.7);
      return <circle key={i} cx={x} cy={y} r={r} opacity={0.25 + (i % 4) * 0.12} />;
    })}
  </g>
);
const Hills = ({ y, o = 1 }: { y: number; o?: number }) => (
  <P d={`M0 ${y} C120 ${y - 30} 220 ${y - 18} 330 ${y - 36} S560 ${y - 10} 700 ${y - 28} S960 ${y - 42} 1200 ${y - 14} V${y + 4} H0 Z`} s={LINE} w={1} f="#070a0f" o={o} />
);
/** A light cone from a lamp at (x, y), pointing down. */
const Cone = ({ id, x, y, w = 160, h = 260 }: { id: string; x: number; y: number; w?: number; h?: number }) => (
  <>
    <defs>
      <linearGradient id={`${id}-cone-${x}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={CYAN} stopOpacity="0.16" />
        <stop offset="1" stopColor={CYAN} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d={`M${x - 6} ${y} L${x - w / 2} ${y + h} H${x + w / 2} L${x + 6} ${y} Z`} fill={`url(#${id}-cone-${x})`} />
    <rect x={x - 9} y={y - 3} width="18" height="4" rx="2" fill={CYAN} opacity="0.85" />
  </>
);

// ------------------------------------------------------------------------------------------------ the scenes

const truck: SceneSpec = {
  device: { x: 742, y: 287, w: 92 },
  callout: { x: 520, y: 118 },
  sensors: [[300, 360], [520, 360], [690, 410]],
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={430} glowX={760} grid={false} />
      <Stars seed={5} maxY={260} />
      <Hills y={432} o={0.9} />
      {/* road */}
      <path d="M0 470 H1200 V675 H0 Z" fill="#06080c" />
      <P d="M0 470 H1200" s={EDGE} w={1.2} />
      <P d="M0 640 H1200" s={LINE} w={1} />
      {range(9).map((i) => <P key={i} d={`M${i * 150 + 20} 560 h70`} s={LINE} w={3} o={0.9} />)}
      {/* speed streaks */}
      {range(6).map((i) => <P key={`s${i}`} d={`M${40 + i * 30} ${330 + i * 22} h${120 - i * 10}`} s={CYAN} w={1} o={0.16} />)}
      {/* trailer */}
      <R x={170} y={220} w={620} h={230} r={4} f={FACE} s={EDGE} />
      <P d="M170 236 H790" s={LINE} w={1} />
      {range(11).map((i) => <P key={`r${i}`} d={`M${226 + i * 52} 222 V448`} s={SOFT} w={1} />)}
      <P d="M172 222 H788" s={CYAN} w={1.3} o={0.45} />
      {/* reefer unit at the front of the trailer */}
      <R x={790} y={250} w={36} h={150} r={3} f={FACE2} />
      {range(6).map((i) => <P key={`v${i}`} d={`M796 ${266 + i * 20} h24`} s={LINE} w={1} />)}
      {/* chassis and wheels */}
      <R x={200} y={450} w={600} h={14} r={2} f="#07090d" s={LINE} />
      {[260, 330, 640].map((x) => <g key={x}><C x={x} y={478} r={30} f="#07090d" /><C x={x} y={478} r={12} s={LINE} /></g>)}
      {/* tractor */}
      <path d="M840 300 H930 L992 360 L1010 372 V462 H840 Z" fill={FACE2} stroke={EDGE} strokeWidth={1.4} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path d="M902 314 H930 L980 362 H902 Z" fill="#0d1a2b" stroke={CYAN} strokeOpacity={0.5} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
      <R x={846} y={240} w={16} h={64} r={3} f={FACE} />
      <P d="M840 410 H1010" s={LINE} w={1} />
      {[880, 975].map((x) => <g key={x}><C x={x} y={478} r={30} f="#07090d" /><C x={x} y={478} r={12} s={LINE} /></g>)}
      <rect x="1004" y="388" width="12" height="10" rx="2" fill={CYAN} opacity="0.9" />
      <path d="M1016 393 L1200 360 V430 Z" fill={CYAN} opacity="0.06" />
    </>
  ),
};

const field: SceneSpec = {
  device: { x: 380, y: 392, w: 96 },
  callout: { x: 790, y: 160 },
  sensors: [[180, 520], [560, 470], [760, 560], [960, 450], [1100, 600], [300, 620]],
  rings: true,
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={300} glowX={420} warm grid={false} />
      <Stars seed={9} maxY={200} n={24} />
      <Hills y={302} />
      {/* crop circles in perspective around the pivot */}
      {range(14).map((i) => {
        const rx = 120 + i * 70, ry = (120 + i * 70) * 0.22;
        return <ellipse key={i} cx={380} cy={430} rx={rx} ry={ry} fill="none" stroke={i % 3 ? SOFT : LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" opacity={0.95 - i * 0.03} />;
      })}
      {/* pivot tower */}
      <P d="M372 430 L380 330 L388 430" s={EDGE} w={1.6} />
      <P d="M366 430 L394 430" s={EDGE} w={1.6} />
      <C x={380} y={326} r={6} f={FACE2} />
      {/* the truss arm, spans and A-frame towers, to the right */}
      <P d="M380 330 L1180 372" s={EDGE} w={1.8} />
      {range(16).map((i) => { const x = 380 + i * 50, y = 330 + i * 2.6; return <P key={`t${i}`} d={`M${x} ${y} L${x + 25} ${y + 22} L${x + 50} ${y + 2.6}`} s={LINE} w={1} />; })}
      <P d="M380 352 L1180 394" s={LINE} w={1} />
      {[580, 780, 980, 1170].map((x, i) => { const y = 340 + (x - 380) * 0.0525; return (
        <g key={x}>
          <P d={`M${x} ${y} L${x - 26} ${y + 120 - i * 6} M${x} ${y} L${x + 26} ${y + 120 - i * 6}`} s={EDGE} w={1.4} />
          <C x={x - 26} y={y + 126 - i * 6} r={9} f="#07090d" />
          <C x={x + 26} y={y + 126 - i * 6} r={9} f="#07090d" />
        </g>
      ); })}
      {/* drops */}
      {range(30).map((i) => <circle key={`d${i}`} cx={420 + i * 26} cy={385 + (i % 3) * 6 + i * 1.4} r="1.1" fill={CYAN} opacity="0.35" />)}
      {/* sensor stakes */}
      {[[180, 520], [560, 470], [760, 560], [960, 450], [1100, 600], [300, 620]].map(([x, y]) => <P key={`k${x}`} d={`M${x} ${y} V${y + 26}`} s={EDGE} w={1.4} />)}
      {/* water tank at the edge of the field */}
      <R x={1010} y={250} w={90} h={60} r={6} f={FACE2} />
      <P d="M1016 262 h78 M1016 276 h78" s={LINE} w={1} />
    </>
  ),
};

const dock: SceneSpec = {
  device: { x: 640, y: 236, w: 84 },
  callout: { x: 1000, y: 118 },
  sensors: [[470, 330], [600, 330], [280, 300], [930, 300]],
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={470} glowX={560} grid />
      {/* building */}
      <path d="M0 90 H1200 V470 H0 Z" fill="#080b10" />
      <P d="M0 90 H1200" s={LINE} w={1} />
      {range(24).map((i) => <P key={i} d={`M${i * 50} 90 V470`} s="#121820" w={1} />)}
      {/* dock doors */}
      {[90, 860].map((x) => (
        <g key={x}>
          <R x={x} y={200} w={250} h={270} f="#0a0e14" s={EDGE} />
          {range(8).map((i) => <P key={i} d={`M${x} ${230 + i * 30} h250`} s={LINE} w={1} />)}
          <Cone id={id} x={x + 125} y={170} w={260} h={300} />
        </g>
      ))}
      {/* the reefer trailer, rear view, backed into the centre door */}
      <R x={380} y={150} w={440} h={330} r={6} f={FACE} s={EDGE} />
      <P d="M600 158 V476" s={EDGE} w={1.2} />
      {[420, 540, 660, 780].map((x) => <P key={x} d={`M${x} 160 V470`} s={LINE} w={2.4} />)}
      {[200, 300, 400].map((y) => <P key={y} d={`M388 ${y} h424`} s={SOFT} w={1} />)}
      <P d="M382 152 H818" s={CYAN} w={1.3} o={0.5} />
      <R x={392} y={484} w={416} h={16} f="#07090d" s={LINE} />
      {[430, 500, 700, 770].map((x) => <C key={x} x={x} y={516} r={22} f="#07090d" />)}
      {[400, 790].map((x) => <rect key={x} x={x} y={456} width="18" height="8" rx="2" fill="#F04438" opacity="0.7" />)}
      {/* dock bumpers and floor markings */}
      <P d="M360 540 L300 675 M840 540 L900 675" s={CYAN} w={2} o={0.35} />
    </>
  ),
};

// warehouse aisle in one-point perspective: two rack faces converging on the vanishing point
const W_FACE = { x0: 40, x1: 500, top0: 30, top1: 250, bot0: 650, bot1: 400 };
const wp = (u: number, v: number, side: 1 | -1 = 1) => {
  const f = u, x = W_FACE.x0 + (W_FACE.x1 - W_FACE.x0) * f, top = W_FACE.top0 + (W_FACE.top1 - W_FACE.top0) * f, bot = W_FACE.bot0 + (W_FACE.bot1 - W_FACE.bot0) * f;
  return [side === 1 ? x : 1200 - x, bot + (top - bot) * v] as [number, number];
};
const W_UPRIGHTS = [0, 0.34, 0.56, 0.71, 0.82, 0.9, 0.96];
const W_LEVELS = [0, 0.34, 0.68];
const warehouse: SceneSpec = {
  device: { x: wp(0.34, 0.5)[0], y: wp(0.34, 0.5)[1], w: 80 },
  callout: { x: 600, y: 150 },
  sensors: [wp(0.15, 0.45), wp(0.62, 0.1), wp(0.2, 0.1, -1), wp(0.5, 0.45, -1), wp(0.75, 0.78, -1)],
  draw: (id) => {
    const face = (side: 1 | -1) => (
      <g key={side}>
        {W_UPRIGHTS.map((u) => { const [x1, y1] = wp(u, 1, side), [x2, y2] = wp(u, 0, side); return <P key={`u${u}`} d={`M${x1} ${y1} L${x2} ${y2}`} s={EDGE} w={u === 0 ? 2.2 : 1.3} />; })}
        {[...W_LEVELS.slice(1), 1].map((v) => { const [a, b] = wp(0, v, side), [c, d] = wp(1, v, side); return <P key={`b${v}`} d={`M${a} ${b} L${c} ${d}`} s={v === 1 ? LINE : CYAN} w={1.3} o={v === 1 ? 1 : 0.45} />; })}
        {W_LEVELS.flatMap((v, li) => W_UPRIGHTS.slice(0, -1).map((u, i) => {
          if ((i + li) % 3 === 2) return null;   // a few empty bays
          const u2 = W_UPRIGHTS[i + 1], inset = (u2 - u) * 0.08, h = 0.25;
          const pts = [wp(u + inset, v + 0.02, side), wp(u2 - inset, v + 0.02, side), wp(u2 - inset, v + h, side), wp(u + inset, v + h, side)];
          return <path key={`p${v}-${u}`} d={`M${pts.map((q) => q.join(' ')).join(' L')} Z`} fill={FACE2} stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />;
        }))}
      </g>
    );
    return (
      <>
        <Backdrop id={id} horizon={325} glowX={600} grid />
        <path d={`M${wp(1, 1)[0]} ${wp(1, 1)[1]} L${wp(1, 1, -1)[0]} ${wp(1, 1, -1)[1]} L${wp(1, 0, -1)[0]} ${wp(1, 0, -1)[1]} L${wp(1, 0)[0]} ${wp(1, 0)[1]} Z`} fill="#070a0f" stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {range(6).map((i) => { const t = i / 6; const y = 20 + (240 - 20) * t; const w = 70 - 55 * t; return <rect key={i} x={600 - w / 2} y={y} width={w} height={Math.max(2, 4 - t * 3)} rx="1.5" fill={CYAN} opacity={0.8 - t * 0.5} />; })}
        {face(1)}
        {face(-1)}
        <P d="M560 675 L592 400 M640 675 L608 400" s="#F5A524" w={1.6} o={0.35} />
      </>
    );
  },
};

const excavator: SceneSpec = {
  device: { x: 520, y: 300, w: 78 },
  callout: { x: 250, y: 150 },
  sensors: [[860, 470], [210, 520], [1040, 520]],
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={430} glowX={560} grid={false} />
      <Stars seed={2} maxY={250} n={28} />
      {/* dirt mound and ground */}
      <path d="M0 470 C200 430 300 440 420 470 H1200 V675 H0 Z" fill="#07090d" />
      <P d="M0 470 C200 430 300 440 420 470 H1200" s={EDGE} w={1.2} />
      <path d="M760 470 C840 380 980 370 1080 470 Z" fill="#090c11" stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {/* tracks */}
      <rect x="330" y="420" width="380" height="70" rx="35" fill="#07090d" stroke={EDGE} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
      {range(6).map((i) => <C key={i} x={370 + i * 60} y={455} r={18} s={LINE} f="#0a0d12" />)}
      {/* body and counterweight */}
      <path d="M350 420 V340 Q350 326 364 326 H640 L690 380 V420 Z" fill={FACE2} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      {/* cab */}
      <path d="M470 326 V220 Q470 206 484 206 H560 L600 250 V326 Z" fill={FACE} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path d="M484 220 H554 L588 256 V312 H484 Z" fill="#0d1a2b" stroke={CYAN} strokeOpacity={0.45} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
      {/* boom, arm and bucket */}
      <path d="M620 340 L700 230 L860 200 L872 222 L716 256 L650 352 Z" fill={FACE2} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path d="M850 206 L940 330 L922 342 L834 222 Z" fill={FACE2} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path d="M916 324 L990 340 L1000 400 Q960 410 930 380 Z" fill={FACE} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <P d="M680 280 L800 236" s={LINE} w={3} />
      <P d="M702 232 L860 202" s={CYAN} w={1.2} o={0.45} />
      {/* work light */}
      <Cone id={id} x={600} y={204} w={420} h={300} />
      {/* fuel tank on site */}
      <R x={160} y={430} w={110} h={50} r={10} f={FACE2} />
    </>
  ),
};

const water: SceneSpec = {
  device: { x: 838, y: 398, w: 76 },
  callout: { x: 1010, y: 190 },
  sensors: [[300, 170], [700, 470], [1040, 520]],
  rings: true,
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={500} glowX={720} warm grid={false} />
      <Stars seed={7} maxY={300} n={30} />
      <Hills y={500} />
      {/* water tower */}
      <ellipse cx="300" cy="150" rx="130" ry="26" fill="#0b1018" stroke={EDGE} strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
      <path d="M170 150 V230 Q300 270 430 230 V150" fill={FACE2} stroke={EDGE} strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
      <P d="M170 150 Q300 176 430 150" s={CYAN} w={1.2} o={0.5} />
      <P d="M300 124 L300 106" s={EDGE} w={1.4} />
      {[200, 260, 340, 400].map((x, i) => <P key={x} d={`M${x} 248 L${200 + (x - 200) * 0.5 + (i < 2 ? -60 : 60) + 50} 520`} s={EDGE} w={1.6} />)}
      {[320, 400, 470].map((y) => <P key={y} d={`M${200 - (y - 248) * 0.12} ${y} L${400 + (y - 248) * 0.12} ${y}`} s={LINE} w={1} />)}
      <P d="M210 300 L390 420 M390 300 L210 420" s={SOFT} w={1} />
      <P d="M300 250 V520" s={LINE} w={2.4} />
      {/* pipe to the pump house */}
      <P d="M300 520 H640 V470 H700" s={EDGE} w={5} o={0.6} />
      {/* pump house */}
      <path d="M680 520 V370 L820 320 L960 370 V520 Z" fill={FACE} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <P d="M670 374 L820 316 L970 374" s={CYAN} w={1.4} o={0.5} />
      <R x={880} y={430} w={50} h={90} f="#0a0e14" />
      <R x={720} y={410} w={60} h={40} f="#0d1a2b" s={LINE} />
      <Cone id={id} x={905} y={410} w={120} h={110} />
      {/* ground */}
      <path d="M0 520 H1200 V675 H0 Z" fill="#06080c" />
      <P d="M0 520 H1200" s={EDGE} w={1.2} />
      {/* valve */}
      <C x={1040} y={540} r={14} f={FACE2} />
      <P d="M1000 540 H1080" s={EDGE} w={4} o={0.6} />
    </>
  ),
};

const solar: SceneSpec = {
  device: { x: 980, y: 352, w: 74 },
  callout: { x: 690, y: 170 },
  sensors: [[300, 470], [600, 430], [820, 520]],
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={360} glowX={900} grid={false} />
      <Stars seed={11} maxY={300} n={60} />
      <Hills y={362} />
      <path d="M0 362 H1200 V675 H0 Z" fill="#06080c" />
      {/* panel rows in perspective */}
      {range(5).map((row) => {
        const y = 400 + row * 52 + row * row * 6, h = 26 + row * 7, x0 = -40 + row * -30, x1 = 860 - row * -40;
        return (
          <g key={row}>
            <path d={`M${x0} ${y + h} L${x0 + 40} ${y} H${x1} L${x1 - 30} ${y + h} Z`} fill="#0a1220" stroke={EDGE} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
            {range(14).map((i) => { const t = i / 14; const xa = x0 + 40 + (x1 - x0 - 40) * t, xb = x0 + (x1 - 30 - x0) * t; return <P key={i} d={`M${xa} ${y} L${xb} ${y + h}`} s="#1d3150" w={1} />; })}
            <P d={`M${x0 + 20} ${y + h / 2} H${x1 - 15}`} s="#1d3150" w={1} />
            <P d={`M${x0 + 40} ${y} H${x1}`} s={CYAN} w={1} o={0.35} />
            <P d={`M${(x0 + x1) / 2} ${y + h} V${y + h + 14 + row * 3}`} s={LINE} w={1.4} />
          </g>
        );
      })}
      {/* battery cabinet */}
      <R x={920} y={330} w={160} h={230} r={4} f={FACE} />
      <P d="M1000 334 V556" s={LINE} w={1} />
      {range(6).map((i) => <P key={i} d={`M936 ${460 + i * 12} h48 M1016 ${460 + i * 12} h48`} s={LINE} w={1} />)}
      <rect x="1060" y="344" width="8" height="8" rx="2" fill={CYAN} opacity="0.8" />
      <P d="M916 328 H1084" s={CYAN} w={1.3} o={0.5} />
    </>
  ),
};

const factory: SceneSpec = {
  device: { x: 186, y: 330, w: 76 },
  callout: { x: 980, y: 250 },
  sensors: [[520, 300], [840, 420], [1040, 330]],
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={520} glowX={500} grid />
      {/* overhead pipes and lights */}
      <P d="M0 80 H1200 M0 96 H1200" s={LINE} w={2} />
      <P d="M0 130 H1200" s={SOFT} w={6} />
      {[300, 700, 1050].map((x) => <Cone key={x} id={id} x={x} y={100} w={300} h={420} />)}
      {/* column with the gateway */}
      <R x={150} y={110} w={40} h={410} f={FACE2} />
      {range(8).map((i) => <P key={i} d={`M150 ${140 + i * 48} h40`} s={LINE} w={1} />)}
      {/* machine */}
      <path d="M300 520 V230 Q300 214 316 214 H700 Q716 214 716 230 V520 Z" fill={FACE} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      <R x={340} y={250} w={240} h={170} r={6} f="#0d1a2b" s={CYAN} sw={1.2} o={0.9} />
      <P d="M380 380 L460 300 L540 360" s={CYAN} w={1.2} o={0.3} />
      <R x={610} y={250} w={80} h={120} r={4} f={FACE2} />
      {range(3).map((i) => <circle key={i} cx={632 + i * 18} cy={272} r="5" fill={i === 0 ? '#45B8FF' : '#28313B'} />)}
      {range(4).map((i) => <P key={i} d={`M624 ${300 + i * 16} h52`} s={LINE} w={1} />)}
      <P d="M300 214 H716" s={CYAN} w={1.2} o={0.45} />
      {/* conveyor */}
      <R x={716} y={420} w={480} h={26} r={4} f={FACE2} />
      {range(10).map((i) => <C key={i} x={740 + i * 46} y={433} r={8} s={LINE} f="#0a0d12" />)}
      {[800, 940, 1080].map((x) => <R key={x} x={x} y={380} w={70} h={40} r={3} f={FACE} s={LINE} sw={1} />)}
      <P d="M740 446 V520 M1170 446 V520" s={EDGE} w={1.4} />
      <path d="M0 520 H1200 V675 H0 Z" fill="#06080c" opacity="0.6" />
      <P d="M0 520 H1200" s={EDGE} w={1.2} />
      <P d="M260 675 L380 520 M820 675 L760 520" s="#F5A524" w={1.6} o={0.3} />
    </>
  ),
};

const caseScene: SceneSpec = {
  device: { x: 600, y: 410, w: 230 },
  sensors: [[200, 520], [1000, 520]],
  draw: (id) => (
    <>
      <Backdrop id={id} horizon={380} glowX={600} grid />
      {/* open lid */}
      <path d="M330 380 L370 120 H830 L870 380 Z" fill={FACE} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path d="M360 360 L392 150 H808 L840 360 Z" fill="#0a0e14" stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {range(9).map((i) => <P key={i} d={`M${392 + i * 46} 156 L${364 + i * 59} 356`} s={SOFT} w={1} />)}
      <P d="M372 122 H828" s={CYAN} w={1.2} o={0.4} />
      {/* base with foam */}
      <path d="M300 390 H900 L960 560 H240 Z" fill={FACE2} stroke={EDGE} strokeWidth={1.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path d="M330 404 H870 L916 540 H284 Z" fill="#0b0f15" stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <ellipse cx="600" cy="470" rx="200" ry="48" fill="#070a0e" />
      <path d="M240 560 H960 V600 Q960 612 948 612 H252 Q240 612 240 600 Z" fill={FACE} stroke={EDGE} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      {[380, 820].map((x) => <R key={x} x={x - 30} y={566} w={60} h={16} r={4} f={FACE2} />)}
      <P d="M302 390 H898" s={CYAN} w={1.3} o={0.5} />
    </>
  ),
};

export const SCENES: Record<SceneKey, SceneSpec> = { truck, field, dock, warehouse, excavator, water, solar, factory, case: caseScene };
