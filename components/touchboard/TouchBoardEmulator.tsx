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
  Home,
  CalendarDays,
  Zap,
  Repeat2,
  Plane,
  Megaphone,
  Fingerprint,
  MapPin,
  Check,
  X,
  Star,
  Delete,
  RotateCcw,
  Clock3,
  MonitorPlay,
} from 'lucide-react';
import {
  DEMO_LOCATION,
  DEMO_ME,
  DEMO_PIN,
  EMPLOYEE_BY_ID,
  SHIFTS,
  OPEN_SHIFTS,
  SWAPS,
  TIME_OFF,
  ANNOUNCEMENTS,
  RECOGNITION,
  TIMELINE,
  type Shift,
  type OpenShift,
  type SwapRequest,
  type TimelineEntry,
} from '@/lib/touchboard-demo-data';

/**
 * useLayoutEffect warns when React renders on the server. The board needs a
 * pre-paint measurement to avoid a flash at full size, so use the layout effect
 * in the browser and fall back to useEffect during SSR.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* ============================================================== */
/* State                                                          */
/* ============================================================== */

type ScreenKey =
  | 'home'
  | 'schedule'
  | 'open'
  | 'swaps'
  | 'timeoff'
  | 'announcements'
  | 'clock';

interface State {
  screen: ScreenKey;
  shifts: Shift[];
  open: OpenShift[];
  swaps: (SwapRequest & { decision?: 'approved' | 'declined' })[];
  timeline: TimelineEntry[];
  /** Is the demo employee currently on the clock? */
  onClock: boolean;
  toast: { id: number; text: string; tone: 'ok' | 'warn' } | null;
  /** Announcement currently expanded, if any. */
  openAnnouncement: string | null;
  announcementTab: 'announcements' | 'recognition';
}

type Action =
  | { type: 'go'; screen: ScreenKey }
  | { type: 'claim'; id: string; at: string }
  | { type: 'swap'; id: string; decision: 'approved' | 'declined' }
  | { type: 'clock'; on: boolean; at: string }
  | { type: 'toast'; text: string; tone?: 'ok' | 'warn' }
  | { type: 'dismissToast' }
  | { type: 'toggleAnnouncement'; id: string }
  | { type: 'announcementTab'; tab: 'announcements' | 'recognition' }
  | { type: 'reset' };

const initialState: State = {
  screen: 'home',
  shifts: SHIFTS,
  open: OPEN_SHIFTS,
  swaps: SWAPS,
  timeline: TIMELINE,
  onClock: false,
  toast: null,
  openAnnouncement: ANNOUNCEMENTS[0].id,
  announcementTab: 'announcements',
};

let toastSeq = 0;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'go':
      return { ...state, screen: action.screen };

    case 'claim': {
      const claimed = state.open.find((o) => o.id === action.id);
      if (!claimed) return state;
      const me = EMPLOYEE_BY_ID[DEMO_ME];
      return {
        ...state,
        open: state.open.filter((o) => o.id !== action.id),
        // A claimed shift joins today's roster only when it is today's.
        shifts:
          claimed.day === 'Today'
            ? [
                ...state.shifts,
                {
                  id: `claimed-${claimed.id}`,
                  employeeId: DEMO_ME,
                  start: claimed.start,
                  end: claimed.end,
                  role: claimed.role,
                  state: 'scheduled',
                },
              ]
            : state.shifts,
        timeline: [
          { id: `tl-${claimed.id}`, employeeId: DEMO_ME, action: 'Claimed an open shift', at: action.at },
          ...state.timeline,
        ],
        toast: {
          id: ++toastSeq,
          text: `${me.name} claimed ${claimed.day} ${claimed.start} · ${claimed.role}`,
          tone: 'ok',
        },
      };
    }

    case 'swap': {
      const swap = state.swaps.find((w) => w.id === action.id);
      return {
        ...state,
        swaps: state.swaps.map((w) =>
          w.id === action.id ? { ...w, decision: action.decision } : w
        ),
        toast: swap
          ? {
              id: ++toastSeq,
              text:
                action.decision === 'approved'
                  ? `Swap approved — ${EMPLOYEE_BY_ID[swap.toId].name} now covers ${swap.day}`
                  : `Swap declined — ${EMPLOYEE_BY_ID[swap.fromId].name} keeps ${swap.day}`,
              tone: action.decision === 'approved' ? 'ok' : 'warn',
            }
          : state.toast,
      };
    }

    case 'clock': {
      const me = EMPLOYEE_BY_ID[DEMO_ME];
      return {
        ...state,
        onClock: action.on,
        shifts: state.shifts.map((s) =>
          s.employeeId === DEMO_ME
            ? { ...s, state: action.on ? 'clocked-in' : 'done' }
            : s
        ),
        timeline: [
          {
            id: `tl-clock-${toastSeq + 1}`,
            employeeId: DEMO_ME,
            action: action.on ? 'Clocked in' : 'Clocked out',
            at: action.at,
          },
          ...state.timeline,
        ],
        toast: {
          id: ++toastSeq,
          text: `${me.name} ${action.on ? 'clocked in' : 'clocked out'} at ${action.at}`,
          tone: 'ok',
        },
      };
    }

    case 'toast':
      return { ...state, toast: { id: ++toastSeq, text: action.text, tone: action.tone ?? 'ok' } };

    case 'dismissToast':
      return { ...state, toast: null };

    case 'toggleAnnouncement':
      return {
        ...state,
        openAnnouncement: state.openAnnouncement === action.id ? null : action.id,
      };

    case 'announcementTab':
      return { ...state, announcementTab: action.tab };

    case 'reset':
      return { ...initialState, toast: { id: ++toastSeq, text: 'Demo reset', tone: 'ok' } };

    default:
      return state;
  }
}

/* ============================================================== */
/* Shared bits                                                    */
/* ============================================================== */

/**
 * The board renders on a FIXED 1280x720 canvas and is scaled to fit its
 * container. That is deliberate: a wall display must read as one landscape
 * screen at every viewport, never reflowing into a stacked phone layout. On a
 * narrow screen it simply becomes a smaller wall board, exactly as it would
 * look from across a room.
 */
const BOARD_W = 1280;
const BOARD_H = 720;

const NAV: { key: ScreenKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Overview', icon: Home },
  { key: 'schedule', label: 'Schedule', icon: CalendarDays },
  { key: 'open', label: 'Open Shifts', icon: Zap },
  { key: 'swaps', label: 'Swaps', icon: Repeat2 },
  { key: 'timeoff', label: 'Time Off', icon: Plane },
  { key: 'announcements', label: 'Board', icon: Megaphone },
];

function Avatar({ id, size = 'md' }: { id: string; size?: 'sm' | 'md' | 'lg' }) {
  const e = EMPLOYEE_BY_ID[id];
  if (!e) return null;
  const cls =
    size === 'lg' ? 'w-16 h-16 text-xl' : size === 'sm' ? 'w-10 h-10 text-sm' : 'w-12 h-12 text-base';
  return (
    <span
      className={`${cls} shrink-0 rounded-full bg-gradient-to-br ${e.accent} flex items-center justify-center font-bold text-white shadow-lg`}
      aria-hidden="true"
    >
      {e.initials}
    </span>
  );
}

function StatTile({
  value,
  label,
  tone,
}: {
  value: number | string;
  label: string;
  tone: 'red' | 'blue' | 'amber';
}) {
  const colors = { red: 'text-rose-400', blue: 'text-sky-400', amber: 'text-amber-400' }[tone];
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-5 text-center">
      <p className={`text-5xl font-bold tabular-nums leading-none ${colors}`}>{value}</p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
        {label}
      </p>
    </div>
  );
}

function ScreenTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-3xl font-bold text-white tracking-tight">{title}</h3>
      {sub && <p className="mt-1 text-base text-gray-500">{sub}</p>}
    </div>
  );
}

/** Large-format action button — sized for a hand at arm's length. */
function TouchButton({
  children,
  onClick,
  tone = 'neutral',
  className = '',
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: 'neutral' | 'primary' | 'danger';
  className?: string;
  ariaLabel?: string;
}) {
  const tones = {
    primary:
      'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:from-emerald-400 hover:to-sky-400 shadow-lg shadow-emerald-500/20',
    danger: 'bg-rose-500/15 text-rose-200 border border-rose-400/30 hover:bg-rose-500/25',
    neutral: 'bg-white/[0.06] text-white border border-white/15 hover:bg-white/[0.12]',
  }[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`min-h-[56px] px-7 rounded-2xl text-lg font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${tones} ${className}`}
    >
      {children}
    </button>
  );
}

/* ============================================================== */
/* Screens — all sized for the fixed 1280x720 canvas              */
/* ============================================================== */

function HomeScreen({ state, go }: { state: State; go: (s: ScreenKey) => void }) {
  const onFloor = state.shifts.filter((s) => s.state === 'clocked-in');
  const openCount = state.open.length;
  const pendingSwaps = state.swaps.filter((w) => !w.decision).length;
  const urgent = state.open.filter((o) => o.urgent).length;

  const health = Math.max(40, 100 - urgent * 12 - openCount * 4 - pendingSwaps * 3);
  const circumference = 2 * Math.PI * 64;
  const dash = (health / 100) * circumference;
  const healthy = health >= 85;

  return (
    <div className="grid grid-cols-2 gap-5 h-full">
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
              <circle cx="75" cy="75" r="64" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="13" />
              <circle
                cx="75"
                cy="75"
                r="64"
                fill="none"
                stroke={healthy ? '#34d399' : '#fbbf24'}
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white tabular-nums leading-none">{health}</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                Health
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
              Staffing health
            </p>
            <p
              className={`mt-1.5 text-4xl font-bold tracking-tight leading-none ${
                healthy ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {healthy ? 'Fully staffed' : 'Needs coverage'}
            </p>
            <p className="mt-2.5 text-lg text-gray-400">
              {urgent} urgent · {openCount} open · {pendingSwaps} swaps pending
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatTile value={urgent} label="Urgent" tone="red" />
          <StatTile value={openCount} label="Open" tone="blue" />
          <StatTile value={pendingSwaps} label="Swaps" tone="amber" />
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex-1 min-h-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            On the floor now <span className="text-emerald-400">{onFloor.length} here</span>
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            {onFloor.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-full bg-white/[0.05] border border-white/10 pl-2 pr-5 py-2"
              >
                <Avatar id={s.employeeId} size="sm" />
                <span className="text-lg text-gray-200 font-semibold">
                  {EMPLOYEE_BY_ID[s.employeeId]?.name.split(' ')[0]}
                </span>
              </div>
            ))}
            {onFloor.length === 0 && <p className="text-lg text-gray-600">Nobody clocked in yet.</p>}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col min-h-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
          Live timeline
        </p>

        <div className="mt-4 space-y-3 overflow-y-auto flex-1 pr-1">
          {state.timeline.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] px-5 py-3.5"
            >
              <Avatar id={t.employeeId} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-white truncate leading-tight">
                  {EMPLOYEE_BY_ID[t.employeeId]?.name}
                </p>
                <p className="text-sm text-gray-500">{t.action}</p>
              </div>
              <span className="text-lg font-semibold text-gray-400 tabular-nums shrink-0">{t.at}</span>
            </div>
          ))}
        </div>

        {state.open.length > 0 && (
          <button
            type="button"
            onClick={() => go('open')}
            className="mt-4 w-full flex items-center justify-between gap-3 rounded-2xl bg-sky-500/10 border border-sky-400/30 px-5 py-4 text-left hover:bg-sky-500/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-sky-300" />
              <span className="text-lg font-bold text-white">
                {state.open.length} open shift{state.open.length === 1 ? '' : 's'} — tap to claim
              </span>
            </span>
            <span className="text-sky-300 text-base font-bold">View</span>
          </button>
        )}
      </div>
    </div>
  );
}

function ScheduleScreen({ state }: { state: State }) {
  const order: Record<string, number> = { 'clocked-in': 0, 'on-break': 1, scheduled: 2, done: 3 };
  const sorted = [...state.shifts].sort((a, b) => order[a.state] - order[b.state]);
  const badge = {
    'clocked-in': 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    'on-break': 'bg-amber-500/15 text-amber-300 border-amber-400/30',
    scheduled: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
    done: 'bg-white/[0.06] text-gray-400 border-white/15',
  };
  const label = {
    'clocked-in': 'Clocked in',
    'on-break': 'On break',
    scheduled: 'Scheduled',
    done: 'Done',
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <ScreenTitle title="Today’s schedule" sub={`${state.shifts.length} shifts · ${DEMO_LOCATION}`} />
      <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-1 pr-1 content-start">
        {sorted.map((s) => {
          const e = EMPLOYEE_BY_ID[s.employeeId];
          return (
            <div
              key={s.id}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4"
            >
              <Avatar id={s.employeeId} />
              <div className="min-w-0 flex-1">
                <p className="text-xl font-bold text-white truncate leading-tight">{e?.name}</p>
                <p className="text-base text-gray-500">{s.role}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-white tabular-nums whitespace-nowrap">
                  {s.start} – {s.end}
                </p>
                <span
                  className={`mt-1.5 inline-block px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase tracking-wider ${badge[s.state]}`}
                >
                  {label[s.state]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OpenShiftsScreen({ state, onClaim }: { state: State; onClaim: (id: string) => void }) {
  return (
    <div className="h-full flex flex-col min-h-0">
      <ScreenTitle
        title="Open shifts"
        sub={
          state.open.length
            ? 'Tap Claim to pick one up — it lands on the schedule instantly.'
            : 'Everything is covered.'
        }
      />
      <div className="space-y-3.5 overflow-y-auto flex-1 pr-1">
        {state.open.map((o) => (
          <div
            key={o.id}
            className={`rounded-2xl border px-6 py-5 ${
              o.urgent ? 'bg-rose-500/[0.07] border-rose-400/30' : 'bg-white/[0.03] border-white/10'
            }`}
          >
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                  {o.urgent && (
                    <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-400/40 text-[11px] font-bold uppercase tracking-wider text-rose-200">
                      Urgent
                    </span>
                  )}
                  <span className="text-2xl font-bold text-white">{o.day}</span>
                  <span className="text-2xl font-semibold text-gray-300 tabular-nums">
                    {o.start} – {o.end}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/[0.06] border border-white/15 text-sm font-bold text-gray-300">
                    {o.role}
                  </span>
                </div>
                <p className="mt-2.5 text-base text-gray-500">{o.reason}</p>
              </div>
              <TouchButton
                tone="primary"
                onClick={() => onClaim(o.id)}
                className="shrink-0"
                ariaLabel={`Claim ${o.day} ${o.start} ${o.role} shift`}
              >
                Claim shift
              </TouchButton>
            </div>
          </div>
        ))}

        {state.open.length === 0 && (
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] px-6 py-14 text-center">
            <Check className="w-14 h-14 text-emerald-400 mx-auto" />
            <p className="mt-5 text-3xl font-bold text-white">Fully covered</p>
            <p className="mt-2 text-lg text-gray-400">
              Every shift on the board has someone on it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SwapsScreen({
  state,
  onDecide,
}: {
  state: State;
  onDecide: (id: string, decision: 'approved' | 'declined') => void;
}) {
  return (
    <div className="h-full flex flex-col min-h-0">
      <ScreenTitle title="Pending swaps" sub="Approve or decline — both people are notified." />
      <div className="space-y-3.5 overflow-y-auto flex-1 pr-1">
        {state.swaps.map((w) => {
          const from = EMPLOYEE_BY_ID[w.fromId];
          const to = EMPLOYEE_BY_ID[w.toId];
          return (
            <div
              key={w.id}
              className={`rounded-2xl border px-6 py-5 transition-colors ${
                w.decision === 'approved'
                  ? 'bg-emerald-500/[0.07] border-emerald-400/30'
                  : w.decision === 'declined'
                    ? 'bg-white/[0.02] border-white/10 opacity-60'
                    : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3.5 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Avatar id={w.fromId} size="sm" />
                      <span className="text-lg font-bold text-white">{from?.name}</span>
                    </div>
                    <Repeat2 className="w-5 h-5 text-gray-500" />
                    <div className="flex items-center gap-3">
                      <Avatar id={w.toId} size="sm" />
                      <span className="text-lg font-bold text-white">{to?.name}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-300 tabular-nums whitespace-nowrap">
                      {w.day} · {w.start} – {w.end}
                    </span>
                  </div>
                  <p className="mt-2.5 text-base text-gray-500">{w.note}</p>
                </div>

                <div className="shrink-0">
                  {w.decision ? (
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold ${
                        w.decision === 'approved'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                          : 'bg-white/[0.06] text-gray-400 border border-white/15'
                      }`}
                    >
                      {w.decision === 'approved' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      {w.decision === 'approved' ? 'Approved' : 'Declined'}
                    </span>
                  ) : (
                    <div className="flex gap-3">
                      <TouchButton tone="primary" onClick={() => onDecide(w.id, 'approved')}>
                        <span className="inline-flex items-center gap-2">
                          <Check className="w-5 h-5" /> Approve
                        </span>
                      </TouchButton>
                      <TouchButton tone="danger" onClick={() => onDecide(w.id, 'declined')}>
                        <span className="inline-flex items-center gap-2">
                          <X className="w-5 h-5" /> Decline
                        </span>
                      </TouchButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimeOffScreen() {
  return (
    <div className="h-full flex flex-col min-h-0">
      <ScreenTitle title="Time off" sub="Who is out, and when." />
      <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-1 pr-1 content-start">
        {TIME_OFF.map((t) => {
          const e = EMPLOYEE_BY_ID[t.employeeId];
          return (
            <div
              key={t.id}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4"
            >
              <Avatar id={t.employeeId} />
              <div className="min-w-0 flex-1">
                <p className="text-xl font-bold text-white truncate leading-tight">{e?.name}</p>
                <p className="text-base text-gray-500">{t.kind}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-base font-bold text-white whitespace-nowrap">{t.range}</p>
                <span
                  className={`mt-1.5 inline-block px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase tracking-wider ${
                    t.status === 'Approved'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-400/30'
                  }`}
                >
                  {t.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BoardScreen({
  state,
  onToggle,
  onTab,
}: {
  state: State;
  onToggle: (id: string) => void;
  onTab: (t: 'announcements' | 'recognition') => void;
}) {
  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex gap-3 mb-5">
        {(['announcements', 'recognition'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTab(t)}
            className={`px-6 py-3 rounded-xl text-base font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              state.announcementTab === t
                ? 'bg-indigo-500 text-white'
                : 'bg-white/[0.05] text-gray-400 hover:text-white'
            }`}
          >
            {t === 'announcements' ? 'Announcements' : 'Recognition'}
          </button>
        ))}
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 pr-1">
        {state.announcementTab === 'announcements'
          ? ANNOUNCEMENTS.map((a) => {
              const isOpen = state.openAnnouncement === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onToggle(a.id)}
                  className="w-full text-left rounded-2xl bg-white/[0.03] border border-white/10 px-6 py-5 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5">
                    {a.pinned && (
                      <span className="mt-1 px-2.5 py-1 rounded-md bg-sky-500/20 border border-sky-400/40 text-[11px] font-bold uppercase tracking-wider text-sky-200 shrink-0">
                        Pinned
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-bold text-white">{a.title}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {a.from} · {a.posted}
                      </p>
                      {isOpen && (
                        <p className="mt-3 text-base text-gray-400 leading-relaxed">{a.body}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          : RECOGNITION.map((r) => {
              const e = EMPLOYEE_BY_ID[r.employeeId];
              return (
                <div key={r.id} className="rounded-2xl bg-white/[0.03] border border-white/10 px-6 py-5">
                  <div className="flex items-start gap-4">
                    <Avatar id={r.employeeId} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <p className="text-xl font-bold text-white">{e?.name}</p>
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      </div>
                      <p className="mt-2 text-base text-gray-400 leading-relaxed">“{r.note}”</p>
                      <p className="mt-2 text-sm text-gray-600">
                        {r.fromName} · {r.when}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

function ClockScreen({
  state,
  onClock,
  timeLabel,
}: {
  state: State;
  onClock: (on: boolean) => void;
  timeLabel: string;
}) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const me = EMPLOYEE_BY_ID[DEMO_ME];

  const press = (d: string) => {
    setError(false);
    setPin((p) => (p.length >= 4 ? p : p + d));
  };

  const submit = () => {
    if (pin === DEMO_PIN) {
      onClock(!state.onClock);
      setPin('');
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="h-full grid grid-cols-2 gap-5 min-h-0">
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col items-center justify-center text-center">
        <Avatar id={DEMO_ME} size="lg" />
        <p className="mt-5 text-3xl font-bold text-white">{me?.name}</p>
        <p className="mt-1 text-lg text-gray-500">{me?.role}</p>
        <div
          className={`mt-6 px-6 py-3 rounded-xl border text-lg font-bold ${
            state.onClock
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
              : 'bg-white/[0.05] text-gray-400 border-white/15'
          }`}
        >
          {state.onClock ? `On the clock since ${timeLabel}` : 'Not clocked in'}
        </div>
        <p className="mt-7 text-sm text-gray-600 leading-relaxed max-w-[20rem]">
          Demo PIN is <span className="font-mono text-gray-400">{DEMO_PIN}</span>. Anything else is
          rejected, exactly as the real board would.
        </p>
      </div>

      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 text-center">
          Enter your PIN to {state.onClock ? 'clock out' : 'clock in'}
        </p>

        <div className="mt-4 flex justify-center gap-4" aria-live="polite">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-5 h-5 rounded-full border-2 transition-colors ${
                error
                  ? 'border-rose-400 bg-rose-400/40'
                  : pin.length > i
                    ? 'border-emerald-400 bg-emerald-400'
                    : 'border-white/25'
              }`}
            />
          ))}
        </div>
        {error && (
          <p className="mt-2 text-center text-base font-bold text-rose-300">
            Incorrect PIN — try {DEMO_PIN}
          </p>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2.5 max-w-[19rem] mx-auto w-full flex-1 content-center">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => press(d)}
              className="min-h-[54px] rounded-2xl bg-white/[0.06] border border-white/10 text-2xl font-bold text-white hover:bg-white/[0.12] active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            onClick={() => { setPin(''); setError(false); }}
            aria-label="Clear PIN"
            className="min-h-[54px] rounded-2xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => press('0')}
            className="min-h-[54px] rounded-2xl bg-white/[0.06] border border-white/10 text-2xl font-bold text-white hover:bg-white/[0.12] active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => { setPin((p) => p.slice(0, -1)); setError(false); }}
            aria-label="Delete last digit"
            className="min-h-[54px] rounded-2xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={pin.length < 4}
          className={`mt-4 w-full min-h-[60px] rounded-2xl text-xl font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            state.onClock
              ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400'
              : 'bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-400 hover:brightness-110'
          }`}
        >
          <span className="inline-flex items-center gap-3">
            <Fingerprint className="w-7 h-7" />
            {state.onClock ? 'Clock Out' : 'Clock In'}
          </span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================== */
/* Device shell — landscape wall display, scaled to fit           */
/* ============================================================== */

export default function TouchBoardEmulator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [now, setNow] = useState<Date | null>(null);
  const [scale, setScale] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount-only clock so server and client markup match.
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Scale the fixed board canvas to whatever width we are given.
  //
  // Measured on layout, on window resize, and on orientation change rather than
  // relying on ResizeObserver alone — RO is unavailable or silent in some
  // embedded/webview browsers, and a board stuck at the wrong scale is a broken
  // page. The container width here is driven purely by the viewport, so window
  // resize is a complete signal; RO is kept as an extra when it does work.
  useIsomorphicLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      if (w <= 0) return;
      const next = w / BOARD_W;
      // Bail out when unchanged so the poll below never triggers a re-render.
      setScale((prev) => (Math.abs(prev - next) < 0.0005 ? prev : next));
    };

    measure();
    // Re-measure once layout and webfonts have settled.
    const raf = requestAnimationFrame(measure);
    const settle = setTimeout(measure, 250);

    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }

    // Safety net. Some embedded browsers and webviews resize the viewport
    // without dispatching `resize` or notifying ResizeObserver, which would
    // otherwise strand the board at a stale scale. `measure` only calls
    // setState when the width actually changed, so a settled board re-renders
    // never — this costs a width read every 400ms and nothing else.
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
    toastTimer.current = setTimeout(() => dispatch({ type: 'dismissToast' }), 3200);
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [state.toast]);

  const timeLabel = useMemo(
    () => (now ? now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '--:--'),
    [now]
  );
  const dateLabel = useMemo(
    () =>
      now ? now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : '',
    [now]
  );

  const go = useCallback((screen: ScreenKey) => dispatch({ type: 'go', screen }), []);
  const claim = useCallback((id: string) => dispatch({ type: 'claim', id, at: timeLabel }), [timeLabel]);
  const decide = useCallback(
    (id: string, decision: 'approved' | 'declined') => dispatch({ type: 'swap', id, decision }),
    []
  );
  const clock = useCallback((on: boolean) => dispatch({ type: 'clock', on, at: timeLabel }), [timeLabel]);

  const screenTitle: Record<ScreenKey, string> = {
    home: 'Standings Board',
    schedule: 'Schedule',
    open: 'Open Shifts',
    swaps: 'Swaps',
    timeoff: 'Time Off',
    announcements: 'Board',
    clock: 'Time Clock',
  };

  return (
    <div className="w-full">
      {/* Wall mount: thin bezel around a 16:9 landscape panel */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#23293a] via-[#12161f] to-[#0a0d14] p-1.5 sm:p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)] border border-white/[0.14]">
        <div
          ref={wrapRef}
          className="relative overflow-hidden rounded-lg bg-[#070b14] border border-black/60"
          style={{ height: BOARD_H * scale }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left flex flex-col"
            style={{ width: BOARD_W, height: BOARD_H, transform: `scale(${scale})` }}
          >
            {/* Accent hairline */}
            <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500" />

            <div className="flex flex-1 min-h-0">
              {/* Left rail — wall-display navigation, not phone tabs */}
              <nav
                aria-label="Board sections"
                className="w-[212px] shrink-0 bg-black/40 border-r border-white/10 flex flex-col py-4 px-3"
              >
                <div className="px-2 pb-4 mb-2 border-b border-white/10">
                  <p className="text-2xl font-bold tracking-tight leading-none">
                    <span className="text-sky-400">Shyft</span>
                    <span className="text-emerald-400">Grid</span>
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-500">
                    VexaOS Board
                  </p>
                </div>

                <div className="space-y-1.5 flex-1">
                  {NAV.map(({ key, label, icon: I }) => {
                    const active = state.screen === key;
                    const badge =
                      key === 'open'
                        ? state.open.length
                        : key === 'swaps'
                          ? state.swaps.filter((w) => !w.decision).length
                          : 0;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => go(key)}
                        aria-current={active ? 'page' : undefined}
                        className={`relative w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                          active
                            ? 'bg-white/[0.12] text-white'
                            : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.05]'
                        }`}
                      >
                        <I className="w-5 h-5 shrink-0" />
                        <span className="text-base font-bold">{label}</span>
                        {badge > 0 && (
                          <span className="ml-auto min-w-[24px] h-6 px-1.5 rounded-full bg-rose-500 text-white text-sm font-bold flex items-center justify-center">
                            {badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => go('clock')}
                  className={`mt-3 w-full flex items-center justify-center gap-2.5 min-h-[60px] rounded-2xl font-bold text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    state.screen === 'clock'
                      ? 'bg-white/[0.12] border border-white/20'
                      : state.onClock
                        ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:brightness-110'
                        : 'bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-400 hover:brightness-110'
                  }`}
                >
                  <Fingerprint className="w-6 h-6" />
                  <span className="text-lg">{state.onClock ? 'Clock Out' : 'Clock In'}</span>
                </button>
              </nav>

              {/* Right pane */}
              <div className="flex-1 min-w-0 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between gap-6 px-7 py-4 border-b border-white/10 shrink-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xl font-bold text-white truncate">{DEMO_LOCATION}</span>
                    </div>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                      {screenTitle[state.screen]}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 shrink-0">
                    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                        Live
                      </span>
                    </span>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-white tabular-nums leading-none">
                        {timeLabel}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{dateLabel}</p>
                    </div>
                  </div>
                </header>

                {/* Body */}
                <div className="relative flex-1 min-h-0 px-7 py-6">
                  {state.screen === 'home' && <HomeScreen state={state} go={go} />}
                  {state.screen === 'schedule' && <ScheduleScreen state={state} />}
                  {state.screen === 'open' && <OpenShiftsScreen state={state} onClaim={claim} />}
                  {state.screen === 'swaps' && <SwapsScreen state={state} onDecide={decide} />}
                  {state.screen === 'timeoff' && <TimeOffScreen />}
                  {state.screen === 'announcements' && (
                    <BoardScreen
                      state={state}
                      onToggle={(id) => dispatch({ type: 'toggleAnnouncement', id })}
                      onTab={(tab) => dispatch({ type: 'announcementTab', tab })}
                    />
                  )}
                  {state.screen === 'clock' && (
                    <ClockScreen state={state} onClock={clock} timeLabel={timeLabel} />
                  )}

                  {state.toast && (
                    <div
                      key={state.toast.id}
                      role="status"
                      className={`absolute left-1/2 -translate-x-1/2 bottom-7 z-20 flex items-center gap-3 px-7 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl max-w-[90%] ${
                        state.toast.tone === 'ok'
                          ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100'
                          : 'bg-amber-500/20 border-amber-400/40 text-amber-100'
                      }`}
                    >
                      <Check className="w-5 h-5 shrink-0" />
                      <span className="text-lg font-bold">{state.toast.text}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wall-mount bracket hint */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-24 h-1 rounded-b-lg bg-[#23293a]" />
      </div>

      {/* Under-device controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <span className="inline-flex items-center gap-2 text-xs text-gray-500">
          <MonitorPlay className="w-3.5 h-3.5" />
          <span className="lg:hidden">Shown at wall scale — best viewed on a larger screen.</span>
          <span className="hidden lg:inline">
            A 43&quot; wall-mounted board, shown at scale.
          </span>
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
