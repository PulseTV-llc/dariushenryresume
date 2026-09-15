import Image from 'next/image';
import { SCREENS } from '@/lib/screens';

/**
 * Layered hero composition built from REAL product captures: the control
 * center, a native TouchBoard wall display, and the Facility Ops monitor,
 * joined to a coded employee-app card by live connection lines.
 *
 * Percent-based positioning inside an aspect-ratio box keeps the layers
 * proportional at every width; secondary layers drop out below `sm`.
 */
export default function HeroSystemVisual() {
  const main = SCREENS.shyftgridSchedule;
  const board = SCREENS.touchBoard;
  const facility = SCREENS.facilityColdStorage;

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Ambient glow + technical grid */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-10 -inset-y-12 tech-grid opacity-60 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.20), rgba(37,99,235,0.06), transparent)' }}
      />

      <div className="relative aspect-[16/11] sm:aspect-[16/10]">
        {/* Back layer — Facility Ops monitor */}
        <figure className="hidden sm:block absolute right-0 top-0 w-[46%] opacity-60">
          <BrowserChrome label="facility · cold chain">
            <Image
              src={facility.src}
              width={facility.width}
              height={facility.height}
              alt={facility.alt}
              sizes="(min-width: 1024px) 30vw, 45vw"
              className="w-full h-auto"
            />
          </BrowserChrome>
        </figure>

        {/* Main layer — control center */}
        <figure className="absolute left-0 top-[6%] sm:top-[9%] w-[88%] sm:w-[70%] z-10">
          <BrowserChrome label="control center · mission control" strong>
            <Image
              src={main.src}
              width={main.width}
              height={main.height}
              alt={main.alt}
              priority
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="w-full h-auto"
            />
          </BrowserChrome>
        </figure>

        {/* Device layer — TouchBoard wall display */}
        <figure className="absolute right-0 sm:right-[3%] bottom-0 w-[58%] sm:w-[42%] z-20">
          <div className="rounded-[14px] sm:rounded-[18px] bg-gradient-to-b from-[#1a2233] to-[#0b101b] p-[5px] sm:p-2 shadow-2xl shadow-black/70 ring-1 ring-white/15">
            <Image
              src={board.src}
              width={board.width}
              height={board.height}
              alt={board.alt}
              sizes="(min-width: 1024px) 30vw, 55vw"
              className="w-full h-auto rounded-[9px] sm:rounded-[11px]"
            />
          </div>
          <figcaption className="mt-2 hidden sm:flex items-center justify-end gap-2 mono-label text-[10px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 vx-pulse" />
            TouchBoard · Android · live
          </figcaption>
        </figure>

        {/* Phone layer — employee app (coded illustration) */}
        <div className="hidden md:block absolute left-[4%] bottom-[2%] w-[17%] z-30" aria-hidden="true">
          <PhoneCard />
        </div>

        {/* Connection lines */}
        <svg
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full z-[25] pointer-events-none"
          viewBox="0 0 1000 625"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="vx-hero-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M 215 520 C 330 520, 420 470, 560 470" fill="none" stroke="url(#vx-hero-line)" strokeWidth="1.5" className="vx-flow" vectorEffect="non-scaling-stroke" />
          <path d="M 640 110 C 700 150, 720 250, 760 330" fill="none" stroke="url(#vx-hero-line)" strokeWidth="1.5" className="vx-flow" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Floating system chips */}
        <Chip className="hidden md:flex left-[30%] top-[1.5%] z-30" dot="bg-sky-400">
          Org · 3 locations
        </Chip>
        <Chip className="hidden md:flex left-[27%] bottom-[18%] z-30" dot="bg-emerald-400">
          Clock-in verified
        </Chip>
        <Chip className="hidden lg:flex right-[1%] top-[44%] z-30" dot="bg-violet-400">
          Device registry · 5 online
        </Chip>
      </div>
    </div>
  );
}

function BrowserChrome({
  children,
  label,
  strong = false,
}: {
  children: React.ReactNode;
  label: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl sm:rounded-2xl border bg-[#070b14] ${
        strong ? 'border-white/15 shadow-2xl shadow-black/70' : 'border-white/10 shadow-xl shadow-black/50'
      }`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-2 hidden sm:block truncate mono-label text-[9px] tracking-[0.14em] text-gray-500">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function Chip({ children, className, dot }: { children: React.ReactNode; className: string; dot: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute items-center gap-2 rounded-full border border-white/15 bg-[#070b14]/90 backdrop-blur px-3 py-1.5 mono-label text-[10px] tracking-[0.12em] text-gray-300 shadow-lg shadow-black/50 ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

/** A coded employee-app screen — illustrative, not a capture. */
function PhoneCard() {
  return (
    <div className="rounded-[22px] bg-gradient-to-b from-[#1b2334] to-[#0a0f19] p-[5px] shadow-2xl shadow-black/80 ring-1 ring-white/15">
      <div className="rounded-[18px] bg-[#0b1220] px-2.5 pt-3 pb-3 overflow-hidden">
        <div className="mx-auto mb-2.5 h-1 w-8 rounded-full bg-white/15" />
        <p className="text-[8px] uppercase tracking-[0.14em] text-gray-500">Employee app</p>
        <p className="mt-1 text-[11px] font-semibold text-white leading-tight">Today · 7:00 – 3:00</p>
        <p className="text-[9px] text-gray-400">Pontiac · Barista</p>
        <div className="mt-2.5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-2 py-1.5">
          <p className="text-[8px] uppercase tracking-[0.12em] text-emerald-300">Verified</p>
          <p className="text-[9px] text-gray-300">Location · QR · Photo</p>
        </div>
        <div className="mt-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 py-1.5 text-center text-[10px] font-semibold text-white">
          Clock in
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-full rounded bg-white/[0.07]" />
          <div className="h-1.5 w-3/4 rounded bg-white/[0.07]" />
        </div>
      </div>
    </div>
  );
}
