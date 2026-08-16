'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  ArrowLeft,
  Zap,
  Users,
  MapPin,
  RotateCcw,
  Clock3,
  MonitorPlay,
  QrCode,
  Trophy,
  Repeat2,
  TrendingUp,
  ChefHat,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  LayoutGrid,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import {
  DEMO_LOCATION,
  BOARD_MODES,
  ON_FLOOR,
  UP_FOR_GRABS,
  SCHEDULE_TODAY,
  PENDING_SWAPS,
  RECOGNITION,
  scoreStaffingHealth,
  COMMAND_CENTER,
  KITCHEN_TICKETS,
  INSPECTION_WALL,
  POS_PRODUCTS,
  POS_CART,
  POS_TOTALS,
  CUSTOM_WALL,
  GRAB_QR_TARGET,
} from '@/lib/touchboard-demo-data';

/* ==============================================================
   Palette — TouchColors from ui/theme/Theme.kt, verbatim.
   ============================================================== */
const C = {
  bg: '#06080F',
  surface: '#111729',
  surfaceAlt: '#161E33',
  onSurface: '#F6F8FD',
  muted: '#8C97B6',
  faint: '#59648A',
  hairline: 'rgba(255,255,255,0.08)',
  shyftBlue: '#2E9BF0',
  gridGreen: '#74BD43',
  openAccent: '#38BDF8',
  urgent: '#FB7185',
  interest: '#C084FC',
  inProgress: '#FBBF24',
  resolved: '#34D399',
  brand: '#6366F1',
  brandBright: '#818CF8',
} as const;

/* ==============================================================
   State
   ============================================================== */

type FlagshipRoute = 'home' | 'open' | 'swaps' | 'attendance' | 'recognition';
type Face = 'timeline' | 'swaps' | 'recognition';
type SchedTab = 'Day' | 'Week' | 'Month';

interface State {
  modeId: string;
  route: FlagshipRoute;
  face: Face;
  tab: SchedTab;
  clockInOpen: boolean;
  toast: { id: number; text: string } | null;
}

type Action =
  | { type: 'mode'; id: string }
  | { type: 'route'; route: FlagshipRoute }
  | { type: 'face'; face: Face }
  | { type: 'tab'; tab: SchedTab }
  | { type: 'clockIn'; open: boolean }
  | { type: 'dismissToast' }
  | { type: 'reset' };

const initialState: State = {
  modeId: 'workforce_wall_board',
  route: 'home',
  face: 'timeline',
  tab: 'Day',
  clockInOpen: false,
  toast: null,
};

let toastSeq = 0;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'mode': {
      const mode = BOARD_MODES.find((m) => m.id === action.id);
      return {
        ...state,
        modeId: action.id,
        route: 'home',
        clockInOpen: false,
        toast: mode ? { id: ++toastSeq, text: `Mode set to ${mode.label}` } : state.toast,
      };
    }
    case 'route':
      return { ...state, route: action.route };
    case 'face':
      return { ...state, face: action.face };
    case 'tab':
      return { ...state, tab: action.tab };
    case 'clockIn':
      return { ...state, clockInOpen: action.open };
    case 'dismissToast':
      return { ...state, toast: null };
    case 'reset':
      return { ...initialState, toast: { id: ++toastSeq, text: 'Demo reset' } };
    default:
      return state;
  }
}

/* ==============================================================
   Fixed board canvas — a wall display, scaled to fit
   ============================================================== */
const BOARD_W = 1280;
const BOARD_H = 720;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const MODE_ICON: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  TrendingUp,
  ChefHat,
  ClipboardCheck,
  CreditCard,
  LayoutGrid,
};

/* ==============================================================
   Small shared pieces
   ============================================================== */

function Avatar({
  initials,
  accent,
  size = 'md',
}: {
  initials: string;
  accent: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const cls =
    size === 'lg' ? 'w-14 h-14 text-lg' : size === 'sm' ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm';
  return (
    <span
      className={`${cls} shrink-0 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center font-black text-white`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

/** Section eyebrow in the app's wall style: tiny, bold, wide-tracked. */
function Eyebrow({ children, color = C.faint }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[11px] font-bold uppercase" style={{ color, letterSpacing: '0.18em' }}>
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className = '',
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const style = { background: C.surface, borderColor: C.hairline };
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={`rounded-3xl border text-left transition-colors hover:brightness-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${className}`}
        style={style}
      >
        {children}
      </button>
    );
  }
  return (
    <div className={`rounded-3xl border ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Deterministic faux QR. Self-contained — no encoder, no network. */
function FauxQr({ size = 132, seed = 7 }: { size?: number; seed?: number }) {
  const n = 21;
  const cells = useMemo(() => {
    const out: boolean[] = [];
    let s = seed * 9301 + 49297;
    for (let i = 0; i < n * n; i++) {
      s = (s * 9301 + 49297) % 233280;
      out.push(s / 233280 > 0.5);
    }
    return out;
  }, [seed]);
  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  const px = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <rect width={size} height={size} fill="#fff" rx="6" />
      {Array.from({ length: n * n }).map((_, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        if (isFinder(r, c)) return null;
        return cells[i] ? (
          <rect key={i} x={c * px} y={r * px} width={px} height={px} fill="#06080F" />
        ) : null;
      })}
      {[
        [0, 0],
        [0, n - 7],
        [n - 7, 0],
      ].map(([r, c], i) => (
        <g key={i}>
          <rect x={c * px} y={r * px} width={px * 7} height={px * 7} fill="#06080F" rx="3" />
          <rect x={(c + 1) * px} y={(r + 1) * px} width={px * 5} height={px * 5} fill="#fff" rx="2" />
          <rect x={(c + 2) * px} y={(r + 2) * px} width={px * 3} height={px * 3} fill="#06080F" rx="1" />
        </g>
      ))}
    </svg>
  );
}

/* ==============================================================
   FLAGSHIP — Workforce Wall Board (WallStandingsBoard.kt)
   ============================================================== */

function StandingsBoardHome({
  state,
  go,
  setFace,
  setTab,
  openClockIn,
}: {
  state: State;
  go: (r: FlagshipRoute) => void;
  setFace: (f: Face) => void;
  setTab: (t: SchedTab) => void;
  openClockIn: () => void;
}) {
  const grabs = UP_FOR_GRABS;
  const late = ON_FLOOR.filter((c) => c.state === 'late').length;
  const here = ON_FLOOR.filter((c) => c.state === 'in').length;
  const health = scoreStaffingHealth(grabs.length, PENDING_SWAPS.length, late);
  const healthy = health >= 85;
  const ring = 2 * Math.PI * 58;

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-[18px] flex-1 min-h-0">
        {/* Left column — weight 1.05 in Compose */}
        <div className="flex flex-col min-h-0" style={{ flex: '1.05' }}>
          {/* ScoreboardHero */}
          <GlassCard className="p-4 shrink-0">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <svg width="118" height="118" viewBox="0 0 136 136" className="-rotate-90">
                  <circle cx="68" cy="68" r="58" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
                  <circle
                    cx="68"
                    cy="68"
                    r="58"
                    fill="none"
                    stroke={healthy ? C.resolved : C.inProgress}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(health / 100) * ring} ${ring}`}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-[36px] font-black leading-none tabular-nums"
                    style={{ color: C.onSurface }}
                  >
                    {health}
                  </span>
                  <span
                    className="mt-0.5 text-[9px] font-bold uppercase"
                    style={{ color: C.faint, letterSpacing: '0.18em' }}
                  >
                    Health
                  </span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <Eyebrow>Staffing health</Eyebrow>
                <p
                  className="mt-1 text-[30px] font-black leading-none tracking-tight"
                  style={{ color: healthy ? C.resolved : C.inProgress }}
                >
                  {healthy ? 'Fully staffed' : 'Needs coverage'}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => go('open')}
                    className="rounded-2xl border px-4 py-2.5 text-left transition-colors hover:brightness-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    style={{ background: C.surfaceAlt, borderColor: C.hairline }}
                  >
                    <p
                      className="text-3xl font-black tabular-nums leading-none"
                      style={{ color: C.openAccent }}
                    >
                      {grabs.length}
                    </p>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase"
                      style={{ color: C.faint, letterSpacing: '0.14em' }}
                    >
                      Open
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => go('swaps')}
                    className="rounded-2xl border px-4 py-2.5 text-left transition-colors hover:brightness-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    style={{ background: C.surfaceAlt, borderColor: C.hairline }}
                  >
                    <p
                      className="text-3xl font-black tabular-nums leading-none"
                      style={{ color: C.inProgress }}
                    >
                      {PENDING_SWAPS.length}
                    </p>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase"
                      style={{ color: C.faint, letterSpacing: '0.14em' }}
                    >
                      Swaps
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* OnFloorAvatars */}
          <GlassCard
            className="mt-3 p-4 shrink-0 w-full"
            onClick={() => go('attendance')}
            ariaLabel="On the floor now — open detail"
          >
            <div className="flex items-baseline gap-2.5">
              <Eyebrow>On the floor now</Eyebrow>
              <span className="text-[13px] font-bold" style={{ color: C.resolved }}>
                {here} here
              </span>
              {late > 0 && (
                <span className="text-[13px] font-bold" style={{ color: C.urgent }}>
                  · {late} late/no-show
                </span>
              )}
            </div>
            <div className="mt-3 flex gap-2 overflow-hidden">
              {ON_FLOOR.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 rounded-full border pl-1 pr-3 py-1 shrink-0"
                  style={{
                    background: C.surfaceAlt,
                    borderColor: c.state === 'late' ? 'rgba(251,113,133,0.35)' : C.hairline,
                  }}
                >
                  <Avatar initials={c.initials} accent={c.accent} size="sm" />
                  <span className="text-[13px] font-bold" style={{ color: C.onSurface }}>
                    {c.name.split(' ')[0]}
                  </span>
                  {c.state === 'late' && (
                    <span className="text-[10px] font-black uppercase" style={{ color: C.urgent }}>
                      Late
                    </span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* GrabTiles */}
          <GlassCard className="mt-3 p-4 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center gap-2.5 shrink-0">
              <Eyebrow>Up for grabs</Eyebrow>
              <span className="text-[14px] font-black" style={{ color: C.openAccent }}>
                {grabs.length}
              </span>
              <span
                className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold"
                style={{ color: C.faint }}
              >
                <QrCode className="w-3.5 h-3.5" />
                Scan to grab
              </span>
            </div>
            {/* GrabTile — date/time + countdown, as WallStandingsBoard.kt renders
                it. The per-shift QR lives on the Employee Control Center pickup
                card and in the Open Shifts drill-in, not on this tile. */}
            <div className="mt-3 flex gap-2.5 flex-1 min-h-0">
              {grabs.slice(0, 3).map((g) => (
                <div
                  key={g.id}
                  className="rounded-2xl border p-3.5 flex-1 min-w-0 flex flex-col justify-center"
                  style={{
                    background: C.surfaceAlt,
                    borderColor: g.uncovered ? 'rgba(251,113,133,0.4)' : 'rgba(56,189,248,0.28)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[10px] font-black uppercase"
                      style={{
                        color: g.uncovered ? C.urgent : C.openAccent,
                        letterSpacing: '0.12em',
                      }}
                    >
                      {g.uncovered ? 'Uncovered' : 'Open'}
                    </span>
                    <span className="text-[11px] font-bold tabular-nums" style={{ color: C.muted }}>
                      in {g.startsInMin < 60 ? `${g.startsInMin}m` : `${Math.round(g.startsInMin / 60)}h`}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] font-bold leading-tight" style={{ color: C.onSurface }}>
                    {g.dateLabel}
                  </p>
                  <p className="mt-0.5 text-[13px] tabular-nums leading-tight" style={{ color: C.muted }}>
                    {g.timeLabel}
                  </p>
                  <p className="mt-1.5 text-[11px] font-bold" style={{ color: C.faint }}>
                    {g.role}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right column — FlipPanel */}
        <div className="flex flex-col min-h-0" style={{ flex: '1' }}>
          <GlassCard className="p-[18px] flex-1 min-h-0 flex flex-col">
            <div className="flex gap-2 shrink-0">
              {(
                [
                  ['timeline', 'Live timeline'],
                  ['swaps', 'Swaps'],
                  ['recognition', 'Recognition'],
                ] as const
              ).map(([f, label]) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFace(f)}
                  className="px-3.5 py-2 rounded-full text-[11px] font-black uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  style={{
                    letterSpacing: '0.14em',
                    background: state.face === f ? C.brand : 'rgba(255,255,255,0.05)',
                    color: state.face === f ? '#fff' : C.muted,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-3.5 flex-1 min-h-0 flex flex-col">
              {state.face === 'timeline' && (
                <>
                  <div className="flex gap-1 p-1 rounded-xl shrink-0" style={{ background: C.surfaceAlt }}>
                    {(['Day', 'Week', 'Month'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        className="flex-1 py-2 rounded-lg text-[13px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        style={{
                          background: state.tab === t ? C.brand : 'transparent',
                          color: state.tab === t ? '#fff' : C.muted,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 space-y-2 overflow-y-auto flex-1 pr-1">
                    {SCHEDULE_TODAY.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center gap-3 rounded-2xl border px-4 py-3"
                        style={{ background: C.surfaceAlt, borderColor: C.hairline }}
                      >
                        <Avatar initials={s.initials} accent={s.accent} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-[15px] font-bold leading-tight truncate"
                            style={{ color: C.onSurface }}
                          >
                            {s.name}
                          </p>
                          <p className="text-[12px]" style={{ color: C.faint }}>
                            {s.role}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[13px] font-bold tabular-nums" style={{ color: C.muted }}>
                            {s.time}
                          </p>
                          <p
                            className="text-[10px] font-black uppercase"
                            style={{
                              letterSpacing: '0.1em',
                              color:
                                s.state === 'Clocked in'
                                  ? C.resolved
                                  : s.state === 'Scheduled'
                                    ? C.openAccent
                                    : C.faint,
                            }}
                          >
                            {s.state}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {state.face === 'swaps' && (
                <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                  <div className="flex items-center gap-2.5">
                    <Eyebrow>Pending swaps</Eyebrow>
                    <span className="text-[14px] font-black" style={{ color: C.inProgress }}>
                      {PENDING_SWAPS.length}
                    </span>
                  </div>
                  {PENDING_SWAPS.map((w) => (
                    <div
                      key={w.id}
                      className="rounded-2xl border px-4 py-3.5"
                      style={{ background: C.surfaceAlt, borderColor: C.hairline }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] font-bold" style={{ color: C.onSurface }}>
                          {w.from}
                        </span>
                        <Repeat2 className="w-4 h-4" style={{ color: C.faint }} />
                        <span className="text-[15px] font-bold" style={{ color: C.onSurface }}>
                          {w.to}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] tabular-nums" style={{ color: C.muted }}>
                        {w.when}
                      </p>
                      <span
                        className="mt-2 inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase"
                        style={{
                          letterSpacing: '0.1em',
                          background: 'rgba(251,191,36,0.14)',
                          color: C.inProgress,
                        }}
                      >
                        {w.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {state.face === 'recognition' && (
                <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                  <button
                    type="button"
                    onClick={() => go('recognition')}
                    className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
                    aria-label="Recognition — open detail"
                  >
                    <Sparkles className="w-4 h-4" style={{ color: C.inProgress }} />
                    <span
                      className="text-[14px] font-black uppercase"
                      style={{ color: C.inProgress, letterSpacing: '0.2em' }}
                    >
                      Shoutout
                    </span>
                  </button>
                  {RECOGNITION.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-2xl border px-4 py-3.5"
                      style={{ background: C.surfaceAlt, borderColor: C.hairline }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar initials={r.initials} accent={r.accent} size="sm" />
                        <div className="min-w-0">
                          <p className="text-[15px] font-bold" style={{ color: C.onSurface }}>
                            {r.name}
                          </p>
                          <p className="mt-1 text-[13px] leading-snug" style={{ color: C.muted }}>
                            “{r.note}”
                          </p>
                          <p className="mt-1 text-[11px]" style={{ color: C.faint }}>
                            {r.from}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* ClockInButton — opens the QR overlay, never a keypad */}
      <button
        type="button"
        onClick={openClockIn}
        className="mt-3 w-full shrink-0 h-[54px] rounded-2xl flex items-center justify-center gap-3 font-black text-white text-[19px] transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        style={{ background: `linear-gradient(90deg, ${C.shyftBlue}, ${C.gridGreen})` }}
      >
        <QrCode className="w-6 h-6" />
        Clock In
      </button>
    </div>
  );
}

/** DetailScaffold from DetailScreens.kt — Back is the only control. */
function DetailScaffold({
  title,
  count,
  accent,
  icon: Icon,
  onBack,
  children,
}: {
  title: string;
  count: number;
  accent: string;
  icon: typeof Zap;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold transition-colors hover:brightness-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          style={{ background: C.surfaceAlt, borderColor: C.hairline, color: C.onSurface }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="flex items-center gap-3">
          <Icon className="w-7 h-7" style={{ color: accent }} />
          <h3 className="text-[28px] font-black tracking-tight" style={{ color: C.onSurface }}>
            {title}
          </h3>
          <span
            className="px-3 py-1 rounded-full text-[15px] font-black tabular-nums"
            style={{ background: 'rgba(255,255,255,0.06)', color: accent }}
          >
            {count}
          </span>
        </div>
        <span
          className="ml-auto text-[11px] font-bold uppercase"
          style={{ color: C.faint, letterSpacing: '0.14em' }}
        >
          Display only
        </span>
      </div>
      <div className="mt-5 flex-1 min-h-0 overflow-y-auto pr-1">{children}</div>
    </div>
  );
}

/* ==============================================================
   Other featured modes
   ============================================================== */

function OwnerCommandCenter() {
  const m = COMMAND_CENTER;
  const maxHour = Math.max(...m.byHour);
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex gap-4 shrink-0">
        <GlassCard className="p-5 flex-1">
          <Eyebrow>Revenue today</Eyebrow>
          <p
            className="mt-1 text-[44px] font-black leading-none tabular-nums"
            style={{ color: C.onSurface }}
          >
            {m.revenueToday}
          </p>
          <div className="mt-3 flex gap-4">
            {m.micro.map((s) => (
              <span key={s.label} className="text-[13px]">
                <span style={{ color: C.faint }}>{s.label} </span>
                <span className={`font-bold ${s.accent}`}>{s.value}</span>
              </span>
            ))}
          </div>
        </GlassCard>
        <div className="grid grid-cols-4 gap-3" style={{ flex: '1.3' }}>
          {m.kpis.map((k) => (
            <GlassCard key={k.label} className="p-4 flex flex-col justify-center">
              <p className={`text-[30px] font-black leading-none tabular-nums ${k.accent}`}>{k.value}</p>
              <p
                className="mt-1.5 text-[11px] font-bold uppercase"
                style={{ color: C.faint, letterSpacing: '0.12em' }}
              >
                {k.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <GlassCard className="p-5 flex-1 min-h-0 flex flex-col">
          <Eyebrow color={C.shyftBlue}>Locations</Eyebrow>
          <div className="mt-3.5 space-y-3">
            {m.locations.map((l) => (
              <div key={l.name}>
                <div className="flex justify-between text-[14px]">
                  <span className="font-bold" style={{ color: C.onSurface }}>
                    {l.name}
                  </span>
                  <span className="tabular-nums" style={{ color: C.muted }}>
                    {l.value}
                  </span>
                </div>
                <div
                  className="mt-1.5 h-2.5 rounded-full overflow-hidden"
                  style={{ background: C.surfaceAlt }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${l.fraction * 100}%`, background: C.shyftBlue }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t flex-1 min-h-0" style={{ borderColor: C.hairline }}>
            <Eyebrow color={C.inProgress}>Revenue by hour</Eyebrow>
            <div className="mt-3 flex items-end gap-1.5 h-[76px]">
              {m.byHour.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all duration-700"
                  style={{
                    height: `${(v / maxHour) * 100}%`,
                    background: i === m.peakHour ? C.inProgress : 'rgba(129,140,248,0.5)',
                  }}
                />
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="flex flex-col gap-4" style={{ flex: '1' }}>
          <GlassCard className="p-5 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center gap-2">
              <Eyebrow color={C.resolved}>Live sales</Eyebrow>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.resolved }} />
            </div>
            <div className="mt-3 space-y-2 overflow-y-auto flex-1 pr-1">
              {m.liveSales.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5"
                  style={{ background: C.surfaceAlt }}
                >
                  <span className="text-[13px]" style={{ color: C.muted }}>
                    {s.label}
                  </span>
                  <span
                    className="text-[15px] font-black tabular-nums"
                    style={{ color: C.resolved }}
                  >
                    {s.amount}
                  </span>
                  <span className="text-[11px] tabular-nums" style={{ color: C.faint }}>
                    {s.ago}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-5 shrink-0">
            <Eyebrow color={C.urgent}>Alerts</Eyebrow>
            <div className="mt-3 space-y-2">
              {m.alerts.map((a) => (
                <div key={a.id} className="flex items-start gap-2.5">
                  <AlertTriangle
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: a.tone === 'urgent' ? C.urgent : C.inProgress }}
                  />
                  <span className="text-[13px] leading-snug" style={{ color: C.muted }}>
                    {a.text}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function KitchenDisplay() {
  const col: Record<string, string> = {
    new: C.openAccent,
    working: C.inProgress,
    ready: C.resolved,
  };
  const label: Record<string, string> = { new: 'New', working: 'Working', ready: 'Ready' };
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-baseline gap-4 shrink-0">
        <h3 className="text-[30px] font-black" style={{ color: C.onSurface }}>
          Kitchen
        </h3>
        <span className="text-[15px]" style={{ color: C.muted }}>
          {KITCHEN_TICKETS.length} active tickets
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 flex-1 min-h-0">
        {KITCHEN_TICKETS.map((t) => (
          <GlassCard key={t.id} className="p-5 flex flex-col min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <span className="text-[24px] font-black tabular-nums" style={{ color: C.onSurface }}>
                {t.order}
              </span>
              <span
                className="px-3 py-1 rounded-lg text-[11px] font-black uppercase"
                style={{
                  letterSpacing: '0.1em',
                  background: 'rgba(255,255,255,0.06)',
                  color: col[t.state],
                }}
              >
                {label[t.state]}
              </span>
            </div>
            <div
              className="mt-1.5 flex items-center gap-2 text-[13px] shrink-0"
              style={{ color: C.faint }}
            >
              <span>{t.channel}</span>
              <span>·</span>
              <span className="tabular-nums" style={{ color: t.ageMin >= 8 ? C.urgent : C.faint }}>
                {t.ageMin}m
              </span>
            </div>
            <div className="mt-4 space-y-2.5 flex-1 overflow-y-auto pr-1">
              {t.items.map((it, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className="text-[19px] font-black tabular-nums shrink-0"
                    style={{ color: col[t.state] }}
                  >
                    {it.qty}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[17px] font-bold leading-tight" style={{ color: C.onSurface }}>
                      {it.name}
                    </p>
                    {it.note && (
                      <p className="text-[13px] italic" style={{ color: C.inProgress }}>
                        {it.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-4 h-11 rounded-xl flex items-center justify-center text-[14px] font-black shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', color: C.muted }}
            >
              Bump
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function InspectionWall() {
  const w = INSPECTION_WALL;
  const ring = 2 * Math.PI * 56;
  const max = Math.max(...w.sparkline);
  return (
    <div className="h-full flex flex-col gap-4">
      <GlassCard className="p-5 shrink-0">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
              <circle cx="66" cy="66" r="56" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="11" />
              <circle
                cx="66"
                cy="66"
                r="56"
                fill="none"
                stroke={C.resolved}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${(w.scorePct / 100) * ring} ${ring}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[36px] font-black leading-none" style={{ color: C.onSurface }}>
                {w.grade}
              </span>
              <span className="text-[13px] font-bold tabular-nums" style={{ color: C.resolved }}>
                {w.scorePct}%
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 flex-1">
            {w.stats.map((s) => (
              <div key={s.label}>
                <p className={`text-[32px] font-black leading-none tabular-nums ${s.accent}`}>{s.value}</p>
                <p
                  className="mt-1 text-[11px] font-bold uppercase"
                  style={{ color: C.faint, letterSpacing: '0.12em' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="shrink-0 w-[150px]">
            <div className="flex items-end gap-1 h-[54px]">
              {w.sparkline.map((p, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${(p / max) * 100}%`,
                    background: C.resolved,
                    opacity: 0.35 + (i / w.sparkline.length) * 0.65,
                  }}
                />
              ))}
            </div>
            <p className="mt-1.5 text-[12px] font-bold" style={{ color: C.resolved }}>
              {w.trendDelta} pts / 7d
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        <GlassCard className="p-5 flex flex-col min-h-0">
          <Eyebrow color={C.inProgress}>On the floor now</Eyebrow>
          <div className="mt-3.5 space-y-3 overflow-y-auto flex-1 pr-1">
            {w.inFlight.map((f) => (
              <div key={f.id}>
                <p className="text-[15px] font-bold" style={{ color: C.onSurface }}>
                  {f.template}
                </p>
                <p className="text-[12px]" style={{ color: C.faint }}>
                  {f.who}
                </p>
                <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: C.surfaceAlt }}>
                  <div className="h-full rounded-full" style={{ width: `${f.pct}%`, background: C.inProgress }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex flex-col min-h-0">
          <Eyebrow color={C.urgent}>Risk radar</Eyebrow>
          <div className="mt-3.5 space-y-2.5 overflow-y-auto flex-1 pr-1">
            {w.risks.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl px-3.5 py-2.5"
                style={{ background: C.surfaceAlt }}
              >
                <span className="text-[13px] min-w-0 truncate" style={{ color: C.onSurface }}>
                  {r.item}
                </span>
                <span
                  className="text-[15px] font-black tabular-nums shrink-0 ml-2"
                  style={{ color: r.tone === 'urgent' ? C.urgent : C.inProgress }}
                >
                  ×{r.fails}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex flex-col">
          <Eyebrow color={C.openAccent}>Corrective work</Eyebrow>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {w.corrective.map((c) => (
              <div key={c.label}>
                <p className={`text-[30px] font-black leading-none tabular-nums ${c.accent}`}>{c.value}</p>
                <p
                  className="mt-1 text-[10px] font-bold uppercase"
                  style={{ color: C.faint, letterSpacing: '0.1em' }}
                >
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function PosRegister() {
  return (
    <div className="h-full flex gap-4">
      <div className="flex-1 flex flex-col min-h-0">
        <div
          className="h-12 rounded-xl border flex items-center px-4 text-[15px] shrink-0"
          style={{ background: C.surfaceAlt, borderColor: C.hairline, color: C.faint }}
        >
          Search or scan an item…
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 overflow-y-auto flex-1 pr-1 content-start">
          {POS_PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border p-4"
              style={{ background: C.surface, borderColor: C.hairline }}
            >
              <p className="text-[15px] font-bold leading-tight" style={{ color: C.onSurface }}>
                {p.name}
              </p>
              <p className="mt-2 text-[19px] font-black tabular-nums" style={{ color: C.openAccent }}>
                {p.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <GlassCard className="w-[350px] shrink-0 p-5 flex flex-col">
        <div className="flex items-center justify-between shrink-0">
          <Eyebrow>{POS_TOTALS.register}</Eyebrow>
          <span
            className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase"
            style={{ background: 'rgba(251,191,36,0.14)', color: C.inProgress }}
          >
            Test mode
          </span>
        </div>
        <div className="mt-4 space-y-2 flex-1 min-h-0 overflow-y-auto pr-1">
          {POS_CART.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3"
              style={{ background: C.surfaceAlt }}
            >
              <span className="text-[16px] font-black tabular-nums" style={{ color: C.openAccent }}>
                {c.qty}
              </span>
              <span className="text-[14px] flex-1 min-w-0 truncate" style={{ color: C.onSurface }}>
                {c.name}
              </span>
              <span className="text-[14px] font-bold tabular-nums" style={{ color: C.muted }}>
                {c.line}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t space-y-2 shrink-0" style={{ borderColor: C.hairline }}>
          {[
            ['Subtotal', POS_TOTALS.subtotal],
            ['Tax', POS_TOTALS.tax],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between text-[14px]">
              <span style={{ color: C.faint }}>{l}</span>
              <span className="tabular-nums" style={{ color: C.muted }}>
                {v}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-[22px] font-black pt-1">
            <span style={{ color: C.onSurface }}>Total</span>
            <span className="tabular-nums" style={{ color: C.onSurface }}>
              {POS_TOTALS.total}
            </span>
          </div>
        </div>
        <div
          className="mt-4 h-[56px] rounded-2xl flex items-center justify-center text-[19px] font-black text-white shrink-0"
          style={{ background: `linear-gradient(90deg, ${C.shyftBlue}, ${C.brand})` }}
        >
          Charge {POS_TOTALS.total}
        </div>
      </GlassCard>
    </div>
  );
}

function CustomWall() {
  const w = CUSTOM_WALL;
  return (
    <div className="h-full grid grid-cols-3 grid-rows-2 gap-4">
      <GlassCard className="p-5 flex flex-col justify-center">
        <Eyebrow>{w.kpi.label}</Eyebrow>
        <p className={`mt-2 text-[52px] font-black leading-none tabular-nums ${w.kpi.accent}`}>
          {w.kpi.value}
        </p>
      </GlassCard>

      <GlassCard className="p-5 flex flex-col justify-center">
        <Eyebrow>{w.metricTarget.label}</Eyebrow>
        <p className="mt-2 text-[40px] font-black leading-none tabular-nums" style={{ color: C.resolved }}>
          {w.metricTarget.value}
        </p>
        <p className="mt-1.5 text-[12px] font-bold" style={{ color: C.faint }}>
          {w.metricTarget.target} · in range
        </p>
      </GlassCard>

      <GlassCard className="p-5">
        <Eyebrow color={C.brandBright}>{w.leaderboard.label}</Eyebrow>
        <div className="mt-3 space-y-2">
          {w.leaderboard.rows.map((r, i) => (
            <div key={r.name} className="flex items-center gap-3">
              <span className="text-[12px] font-black w-4" style={{ color: C.faint }}>
                {i + 1}
              </span>
              <span className="text-[14px] flex-1 min-w-0 truncate" style={{ color: C.onSurface }}>
                {r.name}
              </span>
              <span className="text-[14px] font-black tabular-nums" style={{ color: C.brandBright }}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <Eyebrow color={C.urgent}>{w.alertList.label}</Eyebrow>
        <div className="mt-3 space-y-2.5">
          {w.alertList.rows.map((r) => (
            <div key={r.text} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                style={{ background: r.tone === 'urgent' ? C.urgent : C.inProgress }}
              />
              <span className="text-[13px] leading-snug" style={{ color: C.muted }}>
                {r.text}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5 flex flex-col justify-center">
        <Eyebrow color={C.openAccent}>{w.announcement.label}</Eyebrow>
        <p className="mt-2.5 text-[20px] font-bold leading-snug" style={{ color: C.onSurface }}>
          {w.announcement.text}
        </p>
      </GlassCard>

      <GlassCard className="p-5 flex flex-col items-center justify-center">
        <div className="rounded-lg bg-white p-2">
          <FauxQr size={92} seed={19} />
        </div>
        <p className="mt-3 text-[13px] font-bold" style={{ color: C.onSurface }}>
          {w.qr.label}
        </p>
        <p className="text-[11px]" style={{ color: C.faint }}>
          {w.qr.caption}
        </p>
      </GlassCard>
    </div>
  );
}

/* ==============================================================
   Device shell
   ============================================================== */

export default function TouchBoardEmulator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [now, setNow] = useState<Date | null>(null);
  const [scale, setScale] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Scale the fixed board canvas to whatever width we are given. Measured on
  // layout, on resize, via ResizeObserver, and via a poll — some embedded
  // browsers resize without firing either event, which would strand the board
  // at a stale scale. `measure` bails when unchanged, so a settled board never
  // re-renders.
  useIsomorphicLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w <= 0) return;
      const next = w / BOARD_W;
      setScale((prev) => (Math.abs(prev - next) < 0.0005 ? prev : next));
    };
    measure();
    const raf = requestAnimationFrame(measure);
    const settle = setTimeout(measure, 250);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    const poll = setInterval(measure, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      clearInterval(poll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!state.toast) return;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => dispatch({ type: 'dismissToast' }), 2600);
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [state.toast]);

  // Kiosk self-heal, exactly as TouchBoardScreen.kt does it: after 30s on any
  // detail route the wall returns Home, even if nobody taps Back.
  useEffect(() => {
    if (state.route === 'home') return;
    const t = setTimeout(() => dispatch({ type: 'route', route: 'home' }), 30_000);
    return () => clearTimeout(t);
  }, [state.route]);

  const timeLabel = useMemo(
    () => (now ? now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '--:--'),
    [now]
  );
  const dateLabel = useMemo(
    () =>
      now ? now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : '',
    [now]
  );

  const mode = BOARD_MODES.find((m) => m.id === state.modeId) ?? BOARD_MODES[0];
  const isFlagship = mode.id === 'workforce_wall_board';
  const go = useCallback((route: FlagshipRoute) => dispatch({ type: 'route', route }), []);

  return (
    <div className="w-full">
      <div
        className="relative rounded-2xl p-1.5 sm:p-2 border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]"
        style={{
          background: 'linear-gradient(180deg,#23293a,#12161f 55%,#0a0d14)',
          borderColor: 'rgba(255,255,255,0.14)',
        }}
      >
        <div
          ref={wrapRef}
          className="relative overflow-hidden rounded-lg border"
          style={{ height: BOARD_H * scale, background: C.bg, borderColor: 'rgba(0,0,0,0.6)' }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left flex"
            style={{ width: BOARD_W, height: BOARD_H, transform: `scale(${scale})` }}
          >
            {/* Left rail — MODE SWITCHER: one board, many modes */}
            <nav
              aria-label="Board modes"
              className="w-[232px] shrink-0 flex flex-col py-4 px-3 border-r"
              style={{ background: 'rgba(0,0,0,0.35)', borderColor: C.hairline }}
            >
              <div className="px-2 pb-3.5 mb-2 border-b" style={{ borderColor: C.hairline }}>
                <p className="text-[22px] font-black tracking-tight leading-none">
                  <span style={{ color: C.shyftBlue }}>Shyft</span>
                  <span style={{ color: C.gridGreen }}>Grid</span>
                </p>
                <p
                  className="mt-1 text-[9px] font-black uppercase"
                  style={{ color: C.faint, letterSpacing: '0.22em' }}
                >
                  VexaOS Board
                </p>
              </div>

              <p
                className="px-2 pb-2 text-[9px] font-black uppercase"
                style={{ color: C.faint, letterSpacing: '0.18em' }}
              >
                Device mode
              </p>

              <div className="space-y-1 flex-1 overflow-y-auto">
                {BOARD_MODES.map((m) => {
                  const Icon = MODE_ICON[m.icon] ?? LayoutDashboard;
                  const active = m.id === state.modeId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => dispatch({ type: 'mode', id: m.id })}
                      aria-current={active ? 'true' : undefined}
                      className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      style={{
                        background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                        color: active ? C.onSurface : C.muted,
                      }}
                    >
                      <Icon
                        className="w-[18px] h-[18px] mt-0.5 shrink-0"
                        style={{ color: active ? C.shyftBlue : C.faint }}
                      />
                      <span className="min-w-0">
                        <span className="block text-[13px] font-bold leading-tight">{m.label}</span>
                        {m.tag && (
                          <span
                            className="mt-1 inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase"
                            style={{
                              letterSpacing: '0.1em',
                              background: 'rgba(46,155,240,0.16)',
                              color: C.shyftBlue,
                            }}
                          >
                            {m.tag}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="mt-2 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <p className="text-[10px] leading-snug" style={{ color: C.faint }}>
                  {mode.readOnly
                    ? 'Display only — this board reports, it never runs the operation.'
                    : 'This mode accepts input on the device.'}
                </p>
              </div>
            </nav>

            {/* Right pane */}
            <div className="flex-1 min-w-0 flex flex-col">
              <header
                className="flex items-center justify-between gap-6 px-6 py-3.5 border-b shrink-0"
                style={{ borderColor: C.hairline }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: C.gridGreen }} />
                    <span className="text-[19px] font-black truncate" style={{ color: C.onSurface }}>
                      {DEMO_LOCATION}
                    </span>
                  </div>
                  <p
                    className="mt-0.5 text-[10px] font-black uppercase"
                    style={{ color: C.faint, letterSpacing: '0.22em' }}
                  >
                    {isFlagship && state.route === 'home' ? 'Standings Board' : mode.label}
                  </p>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                    style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.3)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: C.resolved }}
                    />
                    <span
                      className="text-[10px] font-black uppercase"
                      style={{ color: C.resolved, letterSpacing: '0.14em' }}
                    >
                      Live
                    </span>
                  </span>
                  <div className="text-right">
                    <p
                      className="text-[34px] font-black tabular-nums leading-none"
                      style={{ color: C.onSurface }}
                    >
                      {timeLabel}
                    </p>
                    <p className="mt-0.5 text-[13px]" style={{ color: C.faint }}>
                      {dateLabel}
                    </p>
                  </div>
                </div>
              </header>

              <div className="relative flex-1 min-h-0 px-6 py-5">
                {isFlagship && state.route === 'home' && (
                  <StandingsBoardHome
                    state={state}
                    go={go}
                    setFace={(face) => dispatch({ type: 'face', face })}
                    setTab={(tab) => dispatch({ type: 'tab', tab })}
                    openClockIn={() => dispatch({ type: 'clockIn', open: true })}
                  />
                )}

                {isFlagship && state.route === 'open' && (
                  <DetailScaffold
                    title="Open Shifts Available"
                    count={UP_FOR_GRABS.length}
                    accent={C.openAccent}
                    icon={Zap}
                    onBack={() => go('home')}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {UP_FOR_GRABS.map((g) => (
                        <GlassCard key={g.id} className="p-5">
                          <p className="text-[20px] font-black" style={{ color: C.onSurface }}>
                            {g.dateLabel}
                          </p>
                          <p className="text-[16px] tabular-nums" style={{ color: C.muted }}>
                            {g.timeLabel}
                          </p>
                          <p className="mt-1 text-[14px] font-bold" style={{ color: C.openAccent }}>
                            {g.role}
                          </p>
                          <div className="mt-4 flex items-center gap-3">
                            <div className="rounded bg-white p-1.5">
                              <FauxQr size={72} seed={g.id.charCodeAt(1)} />
                            </div>
                            <p className="text-[12px] leading-snug" style={{ color: C.faint }}>
                              Scan to grab.
                              <br />
                              Claim happens in the
                              <br />
                              employee&apos;s phone app.
                            </p>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </DetailScaffold>
                )}

                {isFlagship && state.route === 'swaps' && (
                  <DetailScaffold
                    title="Pending Shift Swaps"
                    count={PENDING_SWAPS.length}
                    accent={C.inProgress}
                    icon={Repeat2}
                    onBack={() => go('home')}
                  >
                    <div className="space-y-3">
                      {PENDING_SWAPS.map((w) => (
                        <GlassCard key={w.id} className="p-5 flex items-center gap-5">
                          <div className="flex-1 min-w-0">
                            <p className="text-[19px] font-black" style={{ color: C.onSurface }}>
                              {w.from} → {w.to}
                            </p>
                            <p className="text-[15px] tabular-nums" style={{ color: C.muted }}>
                              {w.when}
                            </p>
                          </div>
                          <span
                            className="px-3.5 py-2 rounded-xl text-[12px] font-black uppercase shrink-0"
                            style={{
                              letterSpacing: '0.1em',
                              background: 'rgba(251,191,36,0.14)',
                              color: C.inProgress,
                            }}
                          >
                            {w.status}
                          </span>
                        </GlassCard>
                      ))}
                    </div>
                  </DetailScaffold>
                )}

                {isFlagship && state.route === 'attendance' && (
                  <DetailScaffold
                    title="On the Floor"
                    count={ON_FLOOR.length}
                    accent={C.resolved}
                    icon={Users}
                    onBack={() => go('home')}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {ON_FLOOR.map((c) => (
                        <GlassCard key={c.id} className="p-5 flex items-center gap-4">
                          <Avatar initials={c.initials} accent={c.accent} size="lg" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[19px] font-black" style={{ color: C.onSurface }}>
                              {c.name}
                            </p>
                            <p className="text-[14px]" style={{ color: C.faint }}>
                              {c.role}
                            </p>
                          </div>
                          <span
                            className="px-3 py-1.5 rounded-lg text-[11px] font-black uppercase shrink-0"
                            style={{
                              letterSpacing: '0.1em',
                              background: 'rgba(255,255,255,0.06)',
                              color: c.state === 'late' ? C.urgent : C.resolved,
                            }}
                          >
                            {c.state === 'late' ? 'Late' : 'Clocked in'}
                          </span>
                        </GlassCard>
                      ))}
                    </div>
                  </DetailScaffold>
                )}

                {isFlagship && state.route === 'recognition' && (
                  <DetailScaffold
                    title="Recognition"
                    count={RECOGNITION.length}
                    accent={C.interest}
                    icon={Trophy}
                    onBack={() => go('home')}
                  >
                    <div className="space-y-3">
                      {RECOGNITION.map((r) => (
                        <GlassCard key={r.id} className="p-5 flex items-start gap-4">
                          <Avatar initials={r.initials} accent={r.accent} />
                          <div className="min-w-0">
                            <p className="text-[19px] font-black" style={{ color: C.onSurface }}>
                              {r.name}
                            </p>
                            <p className="mt-1 text-[15px] leading-snug" style={{ color: C.muted }}>
                              “{r.note}”
                            </p>
                            <p className="mt-1.5 text-[13px]" style={{ color: C.faint }}>
                              {r.from}
                            </p>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </DetailScaffold>
                )}

                {mode.id === 'owner_command_center' && <OwnerCommandCenter />}
                {mode.id === 'kitchen_display' && <KitchenDisplay />}
                {mode.id === 'inspection_command_wall' && <InspectionWall />}
                {mode.id === 'pos_checkout_station' && <PosRegister />}
                {mode.id === 'custom_wall' && <CustomWall />}

                {/* ClockInOverlay — a QR, exactly as ClockIn.kt renders it */}
                {state.clockInOpen && (
                  <div
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center"
                    style={{ background: 'rgba(6,8,15,0.96)' }}
                  >
                    <p className="text-[32px] font-black" style={{ color: C.onSurface }}>
                      Clock In
                    </p>
                    <div className="mt-5 rounded-2xl bg-white p-4">
                      <FauxQr size={180} seed={3} />
                    </div>
                    <p className="mt-5 text-[17px]" style={{ color: C.muted }}>
                      Scan with the Shyftgrid app to clock in
                    </p>
                    <p className="mt-1 text-[13px]" style={{ color: C.faint }}>
                      {GRAB_QR_TARGET}
                    </p>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'clockIn', open: false })}
                      className="mt-7 px-8 h-[50px] rounded-2xl border font-black text-[16px] transition-colors hover:brightness-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      style={{ background: C.surfaceAlt, borderColor: C.hairline, color: C.onSurface }}
                    >
                      Done
                    </button>
                  </div>
                )}

                {state.toast && (
                  <div
                    key={state.toast.id}
                    role="status"
                    className="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 px-6 py-3 rounded-2xl border backdrop-blur-xl"
                    style={{ background: 'rgba(46,155,240,0.18)', borderColor: 'rgba(46,155,240,0.4)' }}
                  >
                    <span className="text-[15px] font-bold" style={{ color: C.onSurface }}>
                      {state.toast.text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-24 h-1 rounded-b-lg"
          style={{ background: '#23293a' }}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span className="inline-flex items-center gap-2 text-xs text-gray-500">
          <MonitorPlay className="w-3.5 h-3.5" />
          <span className="lg:hidden">Shown at wall scale — best viewed on a larger screen.</span>
          <span className="hidden lg:inline">A 43&quot; wall-mounted board, shown at scale.</span>
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-gray-500">
          <Clock3 className="w-3.5 h-3.5" />
          Every interaction is local to your browser — nothing is sent anywhere.
        </span>
        <button
          type="button"
          onClick={() => dispatch({ type: 'reset' })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-xs font-semibold text-gray-300 hover:bg-white/[0.08] hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset demo
        </button>
      </div>
    </div>
  );
}
