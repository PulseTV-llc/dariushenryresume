/**
 * Mock data for the interactive TouchBoard emulator.
 *
 * Entirely self-contained — no network, no backend, no persistence. Every
 * interaction in the emulator mutates in-memory React state seeded from here,
 * so a page refresh resets the device to this state.
 *
 * Modelled on the real employee wall display (see
 * vexaos-docs/marketing-screens/09-touchboard-employee-wall.png).
 */

export const DEMO_LOCATION = 'Auddix Coffee — Pontiac';

export interface Employee {
  id: string;
  name: string;
  initials: string;
  role: string;
  /** Tailwind gradient stops for the avatar chip. */
  accent: string;
}

export const EMPLOYEES: Employee[] = [
  { id: 'dr', name: 'Devon Reyes', initials: 'DR', role: 'Barista', accent: 'from-sky-400 to-blue-600' },
  { id: 'mo', name: 'Maya Okafor', initials: 'MO', role: 'Shift Lead', accent: 'from-violet-400 to-indigo-600' },
  { id: 'nb', name: 'Nia Brooks', initials: 'NB', role: 'Roaster', accent: 'from-emerald-400 to-teal-600' },
  { id: 'sw', name: 'Sam Whitfield', initials: 'SW', role: 'Barista', accent: 'from-amber-400 to-orange-600' },
  { id: 'jt', name: 'Jordan Tate', initials: 'JT', role: 'Barista', accent: 'from-rose-400 to-pink-600' },
  { id: 'ic', name: 'Imani Cole', initials: 'IC', role: 'Baker', accent: 'from-fuchsia-400 to-purple-600' },
];

export const EMPLOYEE_BY_ID: Record<string, Employee> = Object.fromEntries(
  EMPLOYEES.map((e) => [e.id, e])
);

export type ShiftState = 'clocked-in' | 'scheduled' | 'on-break' | 'done';

export interface Shift {
  id: string;
  employeeId: string;
  start: string;
  end: string;
  role: string;
  state: ShiftState;
}

export const SHIFTS: Shift[] = [
  { id: 's1', employeeId: 'dr', start: '6:00 AM', end: '2:00 PM', role: 'Bar', state: 'clocked-in' },
  { id: 's2', employeeId: 'mo', start: '7:00 AM', end: '3:00 PM', role: 'Shift Lead', state: 'clocked-in' },
  { id: 's3', employeeId: 'nb', start: '8:00 AM', end: '4:00 PM', role: 'Roasting', state: 'clocked-in' },
  { id: 's4', employeeId: 'sw', start: '2:00 PM', end: '9:00 PM', role: 'Bar', state: 'scheduled' },
  { id: 's5', employeeId: 'jt', start: '3:00 PM', end: '9:00 PM', role: 'Register', state: 'scheduled' },
  { id: 's6', employeeId: 'ic', start: '5:00 AM', end: '11:00 AM', role: 'Bakery', state: 'done' },
];

export interface OpenShift {
  id: string;
  day: string;
  start: string;
  end: string;
  role: string;
  reason: string;
  urgent: boolean;
}

export const OPEN_SHIFTS: OpenShift[] = [
  {
    id: 'o1',
    day: 'Today',
    start: '4:00 PM',
    end: '9:00 PM',
    role: 'Bar',
    reason: 'Called out — coverage needed',
    urgent: true,
  },
  {
    id: 'o2',
    day: 'Tomorrow',
    start: '6:00 AM',
    end: '12:00 PM',
    role: 'Bakery',
    reason: 'Added for morning rush',
    urgent: false,
  },
  {
    id: 'o3',
    day: 'Sun Aug 16',
    start: '11:00 AM',
    end: '5:00 PM',
    role: 'Register',
    reason: 'Open — unassigned',
    urgent: false,
  },
];

export interface SwapRequest {
  id: string;
  fromId: string;
  toId: string;
  day: string;
  start: string;
  end: string;
  note: string;
}

export const SWAPS: SwapRequest[] = [
  {
    id: 'w1',
    fromId: 'jt',
    toId: 'sw',
    day: 'Tomorrow',
    start: '3:00 PM',
    end: '9:00 PM',
    note: 'Family commitment — Sam has agreed to cover.',
  },
  {
    id: 'w2',
    fromId: 'ic',
    toId: 'nb',
    day: 'Mon Aug 17',
    start: '5:00 AM',
    end: '11:00 AM',
    note: 'Swapping bakery open for a later roasting shift.',
  },
];

export interface TimeOff {
  id: string;
  employeeId: string;
  range: string;
  kind: string;
  status: 'Approved' | 'Pending';
}

export const TIME_OFF: TimeOff[] = [
  { id: 't1', employeeId: 'ic', range: 'Aug 18 – Aug 22', kind: 'Vacation', status: 'Approved' },
  { id: 't2', employeeId: 'dr', range: 'Aug 20', kind: 'Appointment', status: 'Approved' },
  { id: 't3', employeeId: 'jt', range: 'Aug 29 – Aug 31', kind: 'Personal', status: 'Pending' },
];

export interface Announcement {
  id: string;
  title: string;
  body: string;
  from: string;
  posted: string;
  pinned?: boolean;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'New cold brew ratio starts Monday',
    body: 'We are moving to a 1:8 concentrate. Updated cards are on the bar and in the prep binder. Maya is running a 10-minute walkthrough at the start of each shift this week.',
    from: 'Maya Okafor',
    posted: '2h ago',
    pinned: true,
  },
  {
    id: 'a2',
    title: 'Pontiac hits 4.9 on the quarter',
    body: 'Best guest score of any location this quarter. Thank you — that is entirely down to the people on this board.',
    from: 'District',
    posted: 'Yesterday',
  },
  {
    id: 'a3',
    title: 'Walk-in cooler service Thursday AM',
    body: 'Technician arrives at 7:00. Pull what you need for open before then; Facility Ops will alarm while the door is off.',
    from: 'Operations',
    posted: '2 days ago',
  },
];

export interface Recognition {
  id: string;
  employeeId: string;
  fromName: string;
  note: string;
  when: string;
}

export const RECOGNITION: Recognition[] = [
  {
    id: 'r1',
    employeeId: 'nb',
    fromName: 'Maya Okafor',
    note: 'Caught the cooler drift before it cost us a single case. Genuinely saved the day.',
    when: '1h ago',
  },
  {
    id: 'r2',
    employeeId: 'dr',
    fromName: 'Imani Cole',
    note: 'Covered the whole morning rush solo when we were down a person and never dropped a ticket.',
    when: 'Yesterday',
  },
  {
    id: 'r3',
    employeeId: 'sw',
    fromName: 'Devon Reyes',
    note: 'Trained two new hires this week on top of a full shift load.',
    when: '3 days ago',
  },
];

export interface TimelineEntry {
  id: string;
  employeeId: string;
  action: string;
  at: string;
}

export const TIMELINE: TimelineEntry[] = [
  { id: 'l1', employeeId: 'nb', action: 'Clocked in', at: '8:56 AM' },
  { id: 'l2', employeeId: 'sw', action: 'Claimed an open shift', at: '7:41 AM' },
  { id: 'l3', employeeId: 'dr', action: 'Clocked in', at: '6:56 AM' },
  { id: 'l4', employeeId: 'ic', action: 'Clocked out', at: '11:02 AM' },
];

/** The employee the demo device is "signed in" as for claim/clock actions. */
export const DEMO_ME = 'sw';

/** Valid PIN for the mock clock-in flow. Any other 4 digits is rejected. */
export const DEMO_PIN = '2468';
