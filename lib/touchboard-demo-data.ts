/**
 * Mock data for the interactive TouchBoard emulator.
 *
 * FIDELITY NOTE — this mirrors the real Android app at
 * shyftgrid-main-wt/touchboard-android (branch `main`). Labels, vocabulary and
 * screen structure are taken from the actual Compose sources, not invented:
 *
 *   ui/TouchBoardScreen.kt        the flagship's routes + 30s kiosk self-heal
 *   ui/WallStandingsBoard.kt      Standings Board home
 *   ui/DetailScreens.kt           the four read-only drill-ins
 *   ui/ClockIn.kt                 clock-in is a QR, never a keypad
 *   ui/commandcenter/…            Owner's Command Center
 *   ui/commerce/KitchenDisplayScreen.kt, PosCheckoutScreen.kt
 *   ui/inspection/InspectionCommandWall.kt
 *   web-dashboard/lib/customboard/types.ts   Custom Wall widget vocabulary
 *
 * The board is a DISPLAY surface. Employees do not claim shifts or clock in on
 * it — those actions happen in the employee's phone app, reached by a
 * scan-to-grab QR. The only PIN pad in the real app is MANAGER sign-in.
 *
 * Everything here is in-memory. No network, no persistence.
 */

export const DEMO_LOCATION = 'Auddix Coffee — Pontiac';

/* ============================================================== */
/* Board modes — real IDs and labels                              */
/* ============================================================== */

/**
 * Featured subset of the app's 19 device modes. IDs match
 * `TouchBoardViewModel.applyMode()`; labels match `MODE_LABEL` in
 * web-dashboard/components/vexaos/VexaosFleetPanel.tsx.
 */
export interface BoardMode {
  id: string;
  label: string;
  /** Family from the ShyftGrid landing taxonomy. */
  family: string;
  /** The pairing-screen hint, verbatim where one exists. */
  hint: string;
  /** Does this surface accept writes, or is it display-only? */
  readOnly: boolean;
  icon: string;
  tag?: string;
}

export const BOARD_MODES: BoardMode[] = [
  {
    id: 'workforce_wall_board',
    label: 'Workforce Wall Board',
    family: 'Workforce boards',
    hint: 'Schedule, open shifts, swaps, announcements',
    readOnly: true,
    icon: 'LayoutDashboard',
    tag: 'Flagship',
  },
  {
    id: 'owner_command_center',
    label: "Owner's Command Center",
    family: 'Workforce boards',
    hint: 'Live cross-location revenue, leaderboard, sales feed, staff on floor & alerts',
    readOnly: true,
    icon: 'TrendingUp',
  },
  {
    id: 'kitchen_display',
    label: 'Kitchen Display (KDS)',
    family: 'Point of sale',
    hint: 'Live ticket rail for the line — bump tickets as they go out',
    readOnly: false,
    icon: 'ChefHat',
  },
  {
    id: 'inspection_command_wall',
    label: 'Inspection Command Wall',
    family: 'Inspections',
    hint: 'Live compliance score, inspections in progress, repeat failures & corrective work — read-only',
    readOnly: true,
    icon: 'ClipboardCheck',
  },
  {
    id: 'pos_checkout_station',
    label: 'POS Checkout Station',
    family: 'Point of sale',
    hint: 'The Register — product list, cart and totals rail, charge',
    readOnly: false,
    icon: 'CreditCard',
  },
  {
    id: 'custom_wall',
    label: 'Custom Wall',
    family: 'Build your own',
    hint: 'Build-your-own board: compose KPIs, feeds, alerts, announcements & QR for any business',
    readOnly: true,
    icon: 'LayoutGrid',
    tag: 'New',
  },
];

/* ============================================================== */
/* Workforce Wall Board — the flagship                            */
/* ============================================================== */

export interface Crew {
  id: string;
  name: string;
  initials: string;
  role: string;
  accent: string;
  /** Mirrors AttendanceVM state on the wall. */
  state: 'in' | 'break' | 'late' | 'soon';
}

export const ON_FLOOR: Crew[] = [
  { id: 'dr', name: 'Devon Reyes', initials: 'DR', role: 'Bar', accent: 'from-sky-400 to-blue-600', state: 'in' },
  { id: 'mo', name: 'Maya Okafor', initials: 'MO', role: 'Shift Lead', accent: 'from-violet-400 to-indigo-600', state: 'in' },
  { id: 'nb', name: 'Nia Brooks', initials: 'NB', role: 'Roasting', accent: 'from-emerald-400 to-teal-600', state: 'in' },
  { id: 'jt', name: 'Jordan Tate', initials: 'JT', role: 'Register', accent: 'from-rose-400 to-pink-600', state: 'late' },
];

/** "UP FOR GRABS" tiles. Countdown + scan-to-grab QR, never a claim button. */
export interface GrabTile {
  id: string;
  dateLabel: string;
  timeLabel: string;
  role: string;
  uncovered: boolean;
  /** Minutes until start, drives the countdown chip. */
  startsInMin: number;
}

export const UP_FOR_GRABS: GrabTile[] = [
  { id: 'g1', dateLabel: 'Today', timeLabel: '4:00 PM – 9:00 PM', role: 'Bar', uncovered: true, startsInMin: 41 },
  { id: 'g2', dateLabel: 'Tomorrow', timeLabel: '6:00 AM – 12:00 PM', role: 'Bakery', uncovered: false, startsInMin: 855 },
  { id: 'g3', dateLabel: 'Sun Aug 16', timeLabel: '11:00 AM – 5:00 PM', role: 'Register', uncovered: false, startsInMin: 1200 },
];

export interface ScheduleRow {
  id: string;
  name: string;
  initials: string;
  accent: string;
  role: string;
  time: string;
  state: 'Clocked in' | 'Scheduled' | 'On break' | 'Done';
}

export const SCHEDULE_TODAY: ScheduleRow[] = [
  { id: 's1', name: 'Devon Reyes', initials: 'DR', accent: 'from-sky-400 to-blue-600', role: 'Bar', time: '6:00 AM – 2:00 PM', state: 'Clocked in' },
  { id: 's2', name: 'Maya Okafor', initials: 'MO', accent: 'from-violet-400 to-indigo-600', role: 'Shift Lead', time: '7:00 AM – 3:00 PM', state: 'Clocked in' },
  { id: 's3', name: 'Nia Brooks', initials: 'NB', accent: 'from-emerald-400 to-teal-600', role: 'Roasting', time: '8:00 AM – 4:00 PM', state: 'Clocked in' },
  { id: 's4', name: 'Jordan Tate', initials: 'JT', accent: 'from-rose-400 to-pink-600', role: 'Register', time: '3:00 PM – 9:00 PM', state: 'Scheduled' },
  { id: 's5', name: 'Imani Cole', initials: 'IC', accent: 'from-fuchsia-400 to-purple-600', role: 'Bakery', time: '5:00 AM – 11:00 AM', state: 'Done' },
];

/** Swaps as the wall shows them — status only, no approve/decline on a wall. */
export interface SwapCard {
  id: string;
  from: string;
  to: string;
  when: string;
  status: 'Awaiting manager' | 'Interest received' | 'In motion';
}

export const PENDING_SWAPS: SwapCard[] = [
  { id: 'w1', from: 'Jordan Tate', to: 'Sam Whitfield', when: 'Tomorrow · 3:00 PM – 9:00 PM', status: 'Awaiting manager' },
  { id: 'w2', from: 'Imani Cole', to: 'Nia Brooks', when: 'Mon Aug 17 · 5:00 AM – 11:00 AM', status: 'Interest received' },
];

export interface Kudos {
  id: string;
  name: string;
  initials: string;
  accent: string;
  note: string;
  from: string;
}

export const RECOGNITION: Kudos[] = [
  { id: 'r1', name: 'Nia Brooks', initials: 'NB', accent: 'from-emerald-400 to-teal-600', note: 'Caught the cooler drift before it cost us a single case.', from: 'Maya Okafor' },
  { id: 'r2', name: 'Devon Reyes', initials: 'DR', accent: 'from-sky-400 to-blue-600', note: 'Covered the whole morning rush solo and never dropped a ticket.', from: 'Imani Cole' },
  { id: 'r3', name: 'Sam Whitfield', initials: 'SW', accent: 'from-amber-400 to-orange-600', note: 'Trained two new hires on top of a full shift load.', from: 'Devon Reyes' },
];

/** Staffing health, scored as StaffingHealthScorer does: open + unfinalized swaps. */
export function scoreStaffingHealth(openCount: number, swapCount: number, late: number): number {
  return Math.max(40, 100 - openCount * 4 - swapCount * 3 - late * 8);
}

/* ============================================================== */
/* Owner's Command Center                                         */
/* ============================================================== */

export const COMMAND_CENTER = {
  revenueToday: '$4,812.40',
  kpis: [
    { label: 'Transactions', value: '218', accent: 'text-indigo-300' },
    { label: 'Avg ticket', value: '$22.07', accent: 'text-sky-300' },
    { label: 'Items sold', value: '514', accent: 'text-violet-300' },
    { label: 'On the floor', value: '3', accent: 'text-emerald-300' },
  ],
  micro: [
    { label: 'Tips', value: '$386.10', accent: 'text-emerald-300' },
    { label: 'Refunds', value: '−$24.00', accent: 'text-rose-300' },
    { label: 'Top', value: 'Pontiac', accent: 'text-sky-300' },
  ],
  locations: [
    { name: 'Pontiac', value: '$2,140.80', fraction: 1 },
    { name: 'Troy', value: '$1,612.60', fraction: 0.75 },
    { name: 'Detroit', value: '$1,059.00', fraction: 0.49 },
  ],
  byHour: [4, 9, 18, 34, 46, 52, 41, 33, 28, 37, 44, 30, 19, 11],
  peakHour: 5,
  liveSales: [
    { id: 'ls1', label: 'Pontiac · Card', amount: '$18.40', ago: '12s' },
    { id: 'ls2', label: 'Troy · Card', amount: '$41.85', ago: '48s' },
    { id: 'ls3', label: 'Pontiac · Cash', amount: '$9.25', ago: '1m' },
    { id: 'ls4', label: 'Detroit · Card', amount: '$27.10', ago: '2m' },
  ],
  alerts: [
    { id: 'a1', text: 'Jordan Tate is 9 minutes late — Pontiac', tone: 'urgent' as const },
    { id: 'a2', text: 'Walk-in cooler above setpoint — Detroit', tone: 'urgent' as const },
    { id: 'a3', text: '1 shift uncovered tonight — Pontiac', tone: 'warn' as const },
  ],
};

/* ============================================================== */
/* Kitchen Display (KDS)                                          */
/* ============================================================== */

export interface KitchenTicket {
  id: string;
  order: string;
  channel: string;
  ageMin: number;
  items: { qty: number; name: string; note?: string }[];
  state: 'new' | 'working' | 'ready';
}

export const KITCHEN_TICKETS: KitchenTicket[] = [
  {
    id: 'k1', order: '#1042', channel: 'Counter', ageMin: 2, state: 'new',
    items: [
      { qty: 2, name: 'Flat White' },
      { qty: 1, name: 'Almond Croissant', note: 'warmed' },
    ],
  },
  {
    id: 'k2', order: '#1041', channel: 'Kiosk', ageMin: 5, state: 'working',
    items: [
      { qty: 1, name: 'Cold Brew', note: 'oat, light ice' },
      { qty: 1, name: 'Breakfast Burrito', note: 'no onion' },
      { qty: 2, name: 'Drip Coffee' },
    ],
  },
  {
    id: 'k3', order: '#1040', channel: 'Online', ageMin: 9, state: 'ready',
    items: [
      { qty: 3, name: 'House Blend 12oz' },
      { qty: 1, name: 'Mocha' },
    ],
  },
];

/* ============================================================== */
/* Inspection Command Wall                                        */
/* ============================================================== */

export const INSPECTION_WALL = {
  scorePct: 94,
  grade: 'A',
  trendDelta: '+2.4',
  stats: [
    { value: '38', label: 'inspections', accent: 'text-indigo-300' },
    { value: '94%', label: 'pass rate', accent: 'text-emerald-300' },
    { value: '2', label: 'failed', accent: 'text-rose-300' },
    { value: '5', label: 'open actions', accent: 'text-sky-300' },
  ],
  sparkline: [78, 81, 86, 84, 89, 91, 94],
  inFlight: [
    { id: 'i1', template: 'Opening Line Check', who: 'Maya Okafor · Pontiac', pct: 62 },
    { id: 'i2', template: 'Cold Chain Log', who: 'Nia Brooks · Detroit', pct: 28 },
  ],
  risks: [
    { id: 'rk1', item: 'Handwash station stocked', fails: 4, tone: 'urgent' as const },
    { id: 'rk2', item: 'Walk-in temp logged', fails: 3, tone: 'urgent' as const },
    { id: 'rk3', item: 'Sanitizer concentration', fails: 2, tone: 'warn' as const },
  ],
  corrective: [
    { value: '3', label: 'unstarted', accent: 'text-sky-300' },
    { value: '2', label: 'in progress', accent: 'text-amber-300' },
    { value: '9', label: 'closed', accent: 'text-emerald-300' },
  ],
};

/* ============================================================== */
/* POS Checkout Station — "The Register"                          */
/* ============================================================== */

export const POS_PRODUCTS = [
  { id: 'p1', name: 'House Blend 12oz', price: '$14.00' },
  { id: 'p2', name: 'Cold Brew', price: '$5.25' },
  { id: 'p3', name: 'Flat White', price: '$4.75' },
  { id: 'p4', name: 'Almond Croissant', price: '$4.50' },
  { id: 'p5', name: 'Breakfast Burrito', price: '$8.95' },
  { id: 'p6', name: 'Mocha', price: '$5.50' },
];

export const POS_CART = [
  { id: 'c1', name: 'Flat White', qty: 2, line: '$9.50' },
  { id: 'c2', name: 'Almond Croissant', qty: 1, line: '$4.50' },
  { id: 'c3', name: 'Cold Brew', qty: 1, line: '$5.25' },
];

export const POS_TOTALS = {
  subtotal: '$19.25',
  tax: '$1.16',
  total: '$20.41',
  register: 'Register 1',
};

/* ============================================================== */
/* Custom Wall — real widget vocabulary                           */
/* ============================================================== */

/**
 * Custom Wall tiles. Typed per widget kind rather than as one loose array, so
 * each renders against a known shape. Widget vocabulary matches
 * web-dashboard/lib/customboard/types.ts (WIDGET_TYPES).
 */
export const CUSTOM_WALL = {
  kpi: { label: 'Units shipped today', value: '1,284', accent: 'text-sky-300' },
  metricTarget: {
    label: 'On-time rate',
    value: '97.2%',
    target: 'target 95%',
    inRange: true,
  },
  leaderboard: {
    label: 'Top pickers',
    rows: [
      { name: 'A. Rivera', value: '412' },
      { name: 'K. Boateng', value: '388' },
      { name: 'S. Whitfield', value: '341' },
    ] as { name: string; value: string }[],
  },
  alertList: {
    label: 'Needs attention',
    rows: [
      { text: 'Dock 3 scanner offline', tone: 'urgent' },
      { text: 'Pallet count variance — Aisle 7', tone: 'warn' },
    ] as { text: string; tone: 'urgent' | 'warn' }[],
  },
  announcement: {
    label: 'Announcement',
    text: 'Safety stand-down Friday 7:00 AM. Full floor.',
  },
  qr: { label: 'Shift feedback', caption: 'Scan to submit' },
} as const;

/** The employee-app URL the wall's scan-to-grab QR points at. */
export const GRAB_QR_TARGET = 'shyftgrid.app/s/claim';
