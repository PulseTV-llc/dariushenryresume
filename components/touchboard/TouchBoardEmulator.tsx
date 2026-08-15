'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
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

const NAV: { key: ScreenKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'schedule', label: 'Schedule', icon: CalendarDays },
  { key: 'open', label: 'Open shifts', icon: Zap },
  { key: 'swaps', label: 'Swaps', icon: Repeat2 },
  { key: 'timeoff', label: 'Time off', icon: Plane },
  { key: 'announcements', label: 'Board', icon: Megaphone },
];

function Avatar({ id, size = 'md' }: { id: string; size?: 'sm' | 'md' | 'lg' }) {
  const e = EMPLOYEE_BY_ID[id];
  if (!e) return null;
  const cls =
    size === 'lg'
      ? 'w-14 h-14 text-base'
      : size === 'sm'
        ? 'w-9 h-9 text-[11px]'
        : 'w-11 h-11 text-sm';
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
  tone: 'red' | 'blue' | 'amber' | 'green';
}) {
  const colors = {
    red: 'text-rose-400',
    blue: 'text-sky-400',
    amber: 'text-amber-400',
    green: 'text-emerald-400',
  }[tone];
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-4 text-center">
      <p className={`text-3xl sm:text-4xl font-bold tabular-nums ${colors}`}>{value}</p>
      <p className="mt-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
        {label}
      </p>
    </div>
  );
}

function ScreenTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h3>
      {sub && <p className="mt-0.5 text-sm text-gray-500">{sub}</p>}
    </div>
  );
}

/** Big, obviously-tappable action button sized for a wall display. */
function TouchButton({
  children,
  onClick,
  tone = 'neutral',
  className = '',
  disabled = false,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: 'neutral' | 'primary' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const tones = {
    primary:
      'bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:from-emerald-400 hover:to-sky-400 shadow-lg shadow-emerald-500/20',
    danger: 'bg-rose-500/15 text-rose-200 border border-rose-400/30 hover:bg-rose-500/25',
    neutral: 'bg-white/[0.06] text-white border border-white/15 hover:bg-white/[0.12]',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/[0.06]',
  }[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`min-h-[44px] px-5 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${tones} ${className}`}
    >
      {children}
    </button>
  );
}

/* ============================================================== */
/* Screens                                                        */
/* ============================================================== */

function HomeScreen({
  state,
  now,
  go,
}: {
  state: State;
  now: Date;
  go: (s: ScreenKey) => void;
}) {
  const onFloor = state.shifts.filter((s) => s.state === 'clocked-in');
  const openCount = state.open.length;
  const pendingSwaps = state.swaps.filter((w) => !w.decision).length;
  const urgent = state.open.filter((o) => o.urgent).length;

  // Health degrades with unresolved work, so the ring reacts to interactions.
  const health = Math.max(40, 100 - urgent * 12 - openCount * 4 - pendingSwaps * 3);
  const circumference = 2 * Math.PI * 52;
  const dash = (health / 100) * circumference;
  const healthy = health >= 85;

  return (
    <div className="grid gap-4 lg:grid-cols-2 h-full">
      {/* Staffing health */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 flex flex-col">
        <div className="flex items-center gap-5 sm:gap-6">
          <div className="relative shrink-0">
            <svg width="124" height="124" viewBox="0 0 124 124" className="-rotate-90">
              <circle cx="62" cy="62" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="11" />
              <circle
                cx="62"
                cy="62"
                r="52"
                fill="none"
                stroke={healthy ? '#34d399' : '#fbbf24'}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">{health}</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                Health
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
              Staffing health
            </p>
            <p
              className={`mt-1 text-2xl sm:text-3xl font-bold tracking-tight ${
                healthy ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {healthy ? 'Fully staffed' : 'Needs coverage'}
            </p>
            <p className="mt-1.5 text-sm text-gray-400">
              {urgent} urgent · {openCount} open · {pendingSwaps} swaps pending
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <StatTile value={urgent} label="Urgent" tone="red" />
          <StatTile value={openCount} label="Open" tone="blue" />
          <StatTile value={pendingSwaps} label="Swaps" tone="amber" />
        </div>

        <div className="mt-5 pt-5 border-t border-white/10 flex-1">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            On the floor now{' '}
            <span className="text-emerald-400">{onFloor.length} here</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {onFloor.map((s) => (
              <div key={s.id} className="flex items-center gap-2.5 rounded-full bg-white/[0.05] border border-white/10 pl-1.5 pr-4 py-1.5">
                <Avatar id={s.employeeId} size="sm" />
                <span className="text-sm text-gray-200 font-medium">
                  {EMPLOYEE_BY_ID[s.employeeId]?.name.split(' ')[0]}
                </span>
              </div>
            ))}
            {onFloor.length === 0 && (
              <p className="text-sm text-gray-600">Nobody clocked in yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Live timeline */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 flex flex-col min-h-0">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Live timeline
          </p>
          <span className="text-xs text-gray-500">
            {now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="mt-4 space-y-2.5 overflow-y-auto flex-1 pr-1">
          {state.timeline.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] px-4 py-3"
            >
              <Avatar id={t.employeeId} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">
                  {EMPLOYEE_BY_ID[t.employeeId]?.name}
                </p>
                <p className="text-xs text-gray-500">{t.action}</p>
              </div>
              <span className="text-sm font-medium text-gray-400 tabular-nums shrink-0">{t.at}</span>
            </div>
          ))}
        </div>

        {state.open.length > 0 && (
          <button
            type="button"
            onClick={() => go('open')}
            className="mt-4 w-full flex items-center justify-between gap-3 rounded-2xl bg-sky-500/10 border border-sky-400/30 px-4 py-3.5 text-left hover:bg-sky-500/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-sky-300" />
              <span className="text-sm sm:text-base font-semibold text-white">
                {state.open.length} open shift{state.open.length === 1 ? '' : 's'} — tap to claim
              </span>
            </span>
            <span className="text-sky-300 text-sm font-semibold">View</span>
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
      <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
        {sorted.map((s) => {
          const e = EMPLOYEE_BY_ID[s.employeeId];
          return (
            <div
              key={s.id}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/10 px-4 sm:px-5 py-3.5"
            >
              <Avatar id={s.employeeId} />
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-white truncate">{e?.name}</p>
                <p className="text-sm text-gray-500">{s.role}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-base font-semibold text-white tabular-nums whitespace-nowrap">
                  {s.start} – {s.end}
                </p>
                <span
                  className={`mt-1 inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wider ${badge[s.state]}`}
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

function OpenShiftsScreen({
  state,
  onClaim,
}: {
  state: State;
  onClaim: (id: string) => void;
}) {
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
      <div className="space-y-3 overflow-y-auto flex-1 pr-1">
        {state.open.map((o) => (
          <div
            key={o.id}
            className={`rounded-2xl border px-4 sm:px-5 py-4 ${
              o.urgent
                ? 'bg-rose-500/[0.07] border-rose-400/30'
                : 'bg-white/[0.03] border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {o.urgent && (
                <span className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-400/40 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  Urgent
                </span>
              )}
              <span className="text-base sm:text-lg font-bold text-white">{o.day}</span>
              <span className="text-base sm:text-lg font-semibold text-gray-300 tabular-nums">
                {o.start} – {o.end}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/15 text-xs font-semibold text-gray-300">
                {o.role}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">{o.reason}</p>
              <TouchButton tone="primary" onClick={() => onClaim(o.id)} ariaLabel={`Claim ${o.day} ${o.start} ${o.role} shift`}>
                Claim shift
              </TouchButton>
            </div>
          </div>
        ))}

        {state.open.length === 0 && (
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] px-6 py-10 text-center">
            <Check className="w-10 h-10 text-emerald-400 mx-auto" />
            <p className="mt-4 text-xl font-bold text-white">Fully covered</p>
            <p className="mt-1.5 text-sm text-gray-400">
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
      <div className="space-y-3 overflow-y-auto flex-1 pr-1">
        {state.swaps.map((w) => {
          const from = EMPLOYEE_BY_ID[w.fromId];
          const to = EMPLOYEE_BY_ID[w.toId];
          return (
            <div
              key={w.id}
              className={`rounded-2xl border px-4 sm:px-5 py-4 transition-colors ${
                w.decision === 'approved'
                  ? 'bg-emerald-500/[0.07] border-emerald-400/30'
                  : w.decision === 'declined'
                    ? 'bg-white/[0.02] border-white/10 opacity-60'
                    : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <Avatar id={w.fromId} size="sm" />
                  <span className="text-sm font-semibold text-white">{from?.name}</span>
                </div>
                <Repeat2 className="w-4 h-4 text-gray-500" />
                <div className="flex items-center gap-2.5">
                  <Avatar id={w.toId} size="sm" />
                  <span className="text-sm font-semibold text-white">{to?.name}</span>
                </div>
                <span className="ml-auto text-sm font-semibold text-gray-300 tabular-nums whitespace-nowrap">
                  {w.day} · {w.start} – {w.end}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500">{w.note}</p>

              <div className="mt-4">
                {w.decision ? (
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                      w.decision === 'approved'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                        : 'bg-white/[0.06] text-gray-400 border border-white/15'
                    }`}
                  >
                    {w.decision === 'approved' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    {w.decision === 'approved' ? 'Approved' : 'Declined'}
                  </span>
                ) : (
                  <div className="flex gap-2.5">
                    <TouchButton tone="primary" onClick={() => onDecide(w.id, 'approved')}>
                      <span className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4" /> Approve
                      </span>
                    </TouchButton>
                    <TouchButton tone="danger" onClick={() => onDecide(w.id, 'declined')}>
                      <span className="inline-flex items-center gap-2">
                        <X className="w-4 h-4" /> Decline
                      </span>
                    </TouchButton>
                  </div>
                )}
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
      <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
        {TIME_OFF.map((t) => {
          const e = EMPLOYEE_BY_ID[t.employeeId];
          return (
            <div
              key={t.id}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/10 px-4 sm:px-5 py-4"
            >
              <Avatar id={t.employeeId} />
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-white truncate">{e?.name}</p>
                <p className="text-sm text-gray-500">{t.kind}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm sm:text-base font-semibold text-white whitespace-nowrap">
                  {t.range}
                </p>
                <span
                  className={`mt-1 inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wider ${
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
      <div className="flex gap-2 mb-4">
        {(['announcements', 'recognition'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTab(t)}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              state.announcementTab === t
                ? 'bg-indigo-500 text-white'
                : 'bg-white/[0.05] text-gray-400 hover:text-white'
            }`}
          >
            {t === 'announcements' ? 'Announcements' : 'Recognition'}
          </button>
        ))}
      </div>

      <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
        {state.announcementTab === 'announcements'
          ? ANNOUNCEMENTS.map((a) => {
              const isOpen = state.openAnnouncement === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onToggle(a.id)}
                  className="w-full text-left rounded-2xl bg-white/[0.03] border border-white/10 px-4 sm:px-5 py-4 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    {a.pinned && (
                      <span className="mt-0.5 px-2 py-0.5 rounded-md bg-sky-500/20 border border-sky-400/40 text-[10px] font-bold uppercase tracking-wider text-sky-200 shrink-0">
                        Pinned
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-white">{a.title}</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {a.from} · {a.posted}
                      </p>
                      {isOpen && (
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed">{a.body}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          : RECOGNITION.map((r) => {
              const e = EMPLOYEE_BY_ID[r.employeeId];
              return (
                <div
                  key={r.id}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 px-4 sm:px-5 py-4"
                >
                  <div className="flex items-start gap-3.5">
                    <Avatar id={r.employeeId} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base font-semibold text-white">{e?.name}</p>
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </div>
                      <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">“{r.note}”</p>
                      <p className="mt-2 text-xs text-gray-600">
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
    <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
      <div className="lg:w-2/5 rounded-3xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 flex flex-col items-center justify-center text-center">
        <Avatar id={DEMO_ME} size="lg" />
        <p className="mt-4 text-xl font-bold text-white">{me?.name}</p>
        <p className="text-sm text-gray-500">{me?.role}</p>
        <div
          className={`mt-5 px-4 py-2 rounded-xl border text-sm font-semibold ${
            state.onClock
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
              : 'bg-white/[0.05] text-gray-400 border-white/15'
          }`}
        >
          {state.onClock ? `On the clock since ${timeLabel}` : 'Not clocked in'}
        </div>
        <p className="mt-6 text-xs text-gray-600 leading-relaxed max-w-[16rem]">
          Demo PIN is <span className="font-mono text-gray-400">{DEMO_PIN}</span>. Anything else is
          rejected, exactly as the real board would.
        </p>
      </div>

      <div className="lg:w-3/5 rounded-3xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 flex flex-col">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 text-center">
          Enter your PIN to {state.onClock ? 'clock out' : 'clock in'}
        </p>

        <div className="mt-4 flex justify-center gap-3" aria-live="polite">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-colors ${
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
          <p className="mt-2.5 text-center text-sm font-medium text-rose-300">
            Incorrect PIN — try {DEMO_PIN}
          </p>
        )}

        <div className="mt-5 grid grid-cols-3 gap-2.5 max-w-xs mx-auto w-full flex-1 content-center">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => press(d)}
              className="min-h-[52px] rounded-2xl bg-white/[0.06] border border-white/10 text-xl font-bold text-white hover:bg-white/[0.12] active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            onClick={() => { setPin(''); setError(false); }}
            aria-label="Clear PIN"
            className="min-h-[52px] rounded-2xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => press('0')}
            className="min-h-[52px] rounded-2xl bg-white/[0.06] border border-white/10 text-xl font-bold text-white hover:bg-white/[0.12] active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => { setPin((p) => p.slice(0, -1)); setError(false); }}
            aria-label="Delete last digit"
            className="min-h-[52px] rounded-2xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={pin.length < 4}
          className={`mt-5 w-full min-h-[56px] rounded-2xl text-lg font-bold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
            state.onClock
              ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400'
              : 'bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-400 hover:brightness-110'
          }`}
        >
          <span className="inline-flex items-center gap-3">
            <Fingerprint className="w-6 h-6" />
            {state.onClock ? 'Clock Out' : 'Clock In'}
          </span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================== */
/* Device shell                                                   */
/* ============================================================== */

export default function TouchBoardEmulator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [now, setNow] = useState<Date | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount-only clock so server and client markup match (no hydration mismatch).
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
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
    () =>
      now
        ? now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        : '--:--',
    [now]
  );
  const dateLabel = useMemo(
    () =>
      now
        ? now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
        : '',
    [now]
  );

  const go = useCallback((screen: ScreenKey) => dispatch({ type: 'go', screen }), []);
  const claim = useCallback(
    (id: string) => dispatch({ type: 'claim', id, at: timeLabel }),
    [timeLabel]
  );
  const decide = useCallback(
    (id: string, decision: 'approved' | 'declined') => dispatch({ type: 'swap', id, decision }),
    []
  );
  const clock = useCallback(
    (on: boolean) => dispatch({ type: 'clock', on, at: timeLabel }),
    [timeLabel]
  );

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
      {/* Device bezel */}
      <div className="relative rounded-[1.75rem] bg-gradient-to-b from-[#1c2230] to-[#0b0f18] p-2.5 sm:p-3 shadow-2xl shadow-black/60 border border-white/10">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-[#070b14] border border-black/40">
          {/* Accent hairline, as on the real board */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500" />

          {/* Location strip */}
          <div className="flex items-center justify-center gap-2 bg-black/40 py-2 px-4">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              {DEMO_LOCATION}
            </span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 pt-4 pb-3">
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold tracking-tight">
                <span className="text-sky-400">Shyft</span>
                <span className="text-emerald-400">Grid</span>
              </p>
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                {screenTitle[state.screen]}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl sm:text-4xl font-bold text-white tabular-nums leading-none">
                {timeLabel}
              </p>
              <p className="mt-1 text-[11px] sm:text-sm text-gray-500">{dateLabel}</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                Live
              </span>
            </span>
          </div>

          {/* Screen body — fixed height on small screens, 16:9 on large */}
          <div className="relative px-4 sm:px-6 pb-4">
            <div className="h-[30rem] sm:h-[32rem] lg:h-[30rem] xl:h-[32rem]">
              {state.screen === 'home' && <HomeScreen state={state} now={now ?? new Date(0)} go={go} />}
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
            </div>

            {/* Toast */}
            {state.toast && (
              <div
                key={state.toast.id}
                role="status"
                className={`absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl max-w-[90%] ${
                  state.toast.tone === 'ok'
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100'
                    : 'bg-amber-500/20 border-amber-400/40 text-amber-100'
                }`}
              >
                <Check className="w-4 h-4 shrink-0" />
                <span className="text-sm font-semibold">{state.toast.text}</span>
              </div>
            )}
          </div>

          {/* Nav rail */}
          <div className="border-t border-white/10 bg-black/30 px-2 sm:px-3 py-2">
            <div className="flex items-center gap-1 overflow-x-auto">
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
                    className={`relative shrink-0 flex flex-col items-center gap-1 min-w-[4.5rem] sm:min-w-[5.5rem] px-2 py-2.5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      active ? 'bg-white/[0.10] text-white' : 'text-gray-500 hover:text-gray-200'
                    }`}
                  >
                    <I className="w-5 h-5" />
                    <span className="text-[10px] sm:text-[11px] font-semibold">{label}</span>
                    {badge > 0 && (
                      <span className="absolute top-1 right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => go('clock')}
                className={`ml-auto shrink-0 flex items-center justify-center gap-2.5 min-h-[52px] px-5 sm:px-8 rounded-xl font-bold text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  state.screen === 'clock'
                    ? 'bg-white/[0.12] border border-white/20'
                    : state.onClock
                      ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:brightness-110'
                      : 'bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-400 hover:brightness-110'
                }`}
              >
                <Fingerprint className="w-5 h-5" />
                <span className="text-sm sm:text-base">
                  {state.onClock ? 'Clock Out' : 'Clock In'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Under-device controls */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
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
