/**
 * Flagship systems — examples of complete operating systems VexaOS builds.
 *
 * STATUS IS A PROMISE. Never mark a system `interactive` unless a public demo
 * someone can open today exists at `demo.href`.
 *   interactive  — a public, working demo is linked
 *   walkthrough  — real software exists; shown privately on request
 *   in-development — actively being built; walkthrough of what exists on request
 *   coming-soon  — planned demo environment; not yet available
 */

export type SystemStatus = 'interactive' | 'walkthrough' | 'in-development' | 'coming-soon';

export const STATUS_META: Record<SystemStatus, { label: string; tone: string }> = {
  interactive: { label: 'Interactive demo', tone: 'emerald' },
  walkthrough: { label: 'Walkthrough on request', tone: 'sky' },
  'in-development': { label: 'In development', tone: 'amber' },
  'coming-soon': { label: 'Demo coming soon', tone: 'gray' },
};

export interface SystemApp {
  name: string;
  platform: string;
  detail: string;
}

export interface FlagshipSystem {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  status: SystemStatus;
  /** One-line card subtext. */
  summary: string;
  /** Who it is built for. */
  audience: string[];
  /** Long hero subhead on the detail page. */
  intro: string;
  problems: string[];
  apps: SystemApp[];
  capabilityGroups: { title: string; items: string[] }[];
  /** Internal modules that power it — the "not starting from zero" proof. */
  foundations: string[];
  /** Honest note on what exists today. */
  statusNote: string;
  demo?: { label: string; href: string };
  /** Related industry slugs. */
  industries: string[];
  caseStudy?: string;
}

export const SYSTEMS: FlagshipSystem[] = [
  {
    slug: 'restaurant-os',
    name: 'Restaurant & Café OS',
    shortName: 'Restaurant OS',
    icon: 'UtensilsCrossed',
    status: 'in-development',
    summary:
      'A complete connected operating system for hospitality — owner control center, waiter apps, kitchen operations, workforce, inventory, ordering, analytics, and customer experiences.',
    audience: ['Restaurant groups', 'Café groups', 'Quick service', 'Hospitality operators'],
    intro:
      'One system from the guest’s first order to the owner’s end-of-day numbers: front of house, kitchen, workforce, inventory, and financials on a single multi-location data layer.',
    problems: [
      'POS, scheduling, inventory, and reservations from four vendors that never agree',
      'Food cost estimated from invoices instead of measured from what sold',
      'Labor cost discovered at payroll rather than managed during the shift',
      'Owners reconciling locations in spreadsheets at the end of the week',
    ],
    apps: [
      { name: 'Owner Control Center', platform: 'Web', detail: 'Sales, labor, food cost, and exceptions across every location.' },
      { name: 'Manager Dashboard', platform: 'Web', detail: 'Floor, schedule, approvals, purchasing, and daily close.' },
      { name: 'Waiter App', platform: 'Android', detail: 'Tables, orders, modifiers, and payments at the table.' },
      { name: 'Kitchen Display', platform: 'Android', detail: 'Tickets by station and state, with bump-to-served.' },
      { name: 'Team App', platform: 'Mobile app', detail: 'Schedules, clock-in, swaps, and tips for staff.' },
      { name: 'Guest Ordering', platform: 'Web', detail: 'Online ordering, QR order-and-pay, and reservations.' },
    ],
    capabilityGroups: [
      { title: 'Front of house', items: ['POS / orders', 'Table management', 'Reservations', 'Online ordering', 'Kiosks'] },
      { title: 'Kitchen', items: ['Kitchen display', 'Recipe costing', 'Food costing', 'Waste'] },
      { title: 'People', items: ['Scheduling', 'Clock-in', 'Labor costing', 'Payroll tracking'] },
      { title: 'Product & supply', items: ['Inventory', 'Purchasing', 'Vendors'] },
      { title: 'Guests', items: ['CRM', 'Loyalty'] },
      { title: 'Enterprise', items: ['Financial analytics', 'Multi-location control', 'Permissions', 'Audit logs'] },
    ],
    foundations: ['Identity & roles', 'Multi-location organization model', 'Device registry', 'ShyftGrid workforce layer', 'Commerce & inventory modules'],
    statusNote:
      'The control center is running on live data with the Android waiter and kitchen apps in active development. Walkthroughs of the working system are available on request.',
    industries: ['restaurant', 'hospitality', 'multi-site'],
    caseStudy: 'restaurant-os',
  },
  {
    slug: 'facility-os',
    name: 'Facility Operations OS',
    shortName: 'Facility OS',
    icon: 'Building',
    status: 'walkthrough',
    summary:
      'For cleaning companies, property management, facility services, and inspection teams — dispatch, inspections, evidence, monitoring, and client reporting in one system.',
    audience: ['Cleaning companies', 'Property management', 'Facility services', 'Inspection teams'],
    intro:
      'Know what was done, where, by whom, and to what standard — with the evidence attached and the client able to see it.',
    problems: [
      'Crews dispatched by text message with no record of what was completed',
      'Inspection checklists on paper that never reach the client',
      'Sensor alarms landing in inboxes nobody watches overnight',
      'Supervisors driving between sites to confirm basic work happened',
    ],
    apps: [
      { name: 'Operations Control Center', platform: 'Web', detail: 'Sites, crews, schedules, inspections, and alerts.' },
      { name: 'Crew App', platform: 'iOS · Android', detail: 'Assignments, checklists, photo proof, and clock-in on site.' },
      { name: 'Client Portal', platform: 'Web', detail: 'Service history, inspection scores, and requests.' },
      { name: 'Site Terminals', platform: 'Android', detail: 'On-site boards and badge-in stations.' },
    ],
    capabilityGroups: [
      { title: 'Field work', items: ['Dispatch', 'Scheduling', 'Clock-in', 'Checklists'] },
      { title: 'Quality', items: ['Inspections', 'Audits', 'Photo evidence', 'Scores'] },
      { title: 'Monitoring', items: ['Sensors', 'IoT telemetry', 'Alerts', 'Compliance records'] },
      { title: 'Clients', items: ['Client portal', 'Service requests', 'Reporting'] },
    ],
    foundations: ['Inspections module', 'Facility Ops monitoring', 'ShyftGrid workforce layer', 'Device registry'],
    statusNote:
      'Inspections and Facility Ops monitoring run today on the VexaOS platform. Walkthroughs are available on request.',
    industries: ['cleaning-facility-services', 'property-management', 'field-service'],
    caseStudy: 'auddix',
  },
  {
    slug: 'workforce-os',
    name: 'Workforce Operations OS',
    shortName: 'Workforce OS',
    icon: 'CalendarClock',
    status: 'interactive',
    summary:
      'Scheduling, verified attendance, shift marketplace, labor cost, and on-site wall boards for hourly teams across many locations.',
    audience: ['Multi-location employers', 'Hourly workforces', 'Operations leaders', 'Franchise groups'],
    intro:
      'The system your managers schedule from, your staff live in, and your walls display — with labor cost visible before payroll, not after.',
    problems: [
      'Schedules published to a group chat and out of date by morning',
      'Shift swaps agreed by text with no approval trail',
      'Overtime discovered at payroll instead of prevented at scheduling',
      'No live view of who is actually on the floor right now',
    ],
    apps: [
      { name: 'Manager Control Center', platform: 'Web', detail: 'Scheduling, approvals, coverage, and labor cost across locations.' },
      { name: 'Employee App', platform: 'Mobile', detail: 'Shifts, swaps, open-shift claims, time off, and verified clock-in.' },
      { name: 'TouchBoard Wall Display', platform: 'Android', detail: 'Live staffing health, timeline, and QR clock-in on the wall.' },
      { name: 'Device Registry', platform: 'Web', detail: 'Every board paired, assigned, and switched remotely.' },
    ],
    capabilityGroups: [
      { title: 'Scheduling', items: ['Schedule builder', 'Open shifts', 'Shift swaps', 'Availability & PTO'] },
      { title: 'Attendance', items: ['Clock-in', 'Geofence & verification', 'Timecards'] },
      { title: 'Labor', items: ['Labor analytics', 'Overtime controls', 'Payroll export'] },
      { title: 'Communication', items: ['Announcements', 'Recognition', 'Wall displays'] },
    ],
    foundations: ['ShyftGrid', 'TouchBoard', 'Device registry', 'Identity & roles'],
    statusNote:
      'ShyftGrid and TouchBoard are running software. The TouchBoard wall display can be driven in your browser today.',
    demo: { label: 'Try the TouchBoard demo', href: '/platform/modules/touchboard/demo' },
    industries: ['multi-site', 'retail', 'restaurant', 'warehousing'],
    caseStudy: 'shyftgrid',
  },
  {
    slug: 'retail-os',
    name: 'Retail Operations OS',
    shortName: 'Retail OS',
    icon: 'ShoppingBag',
    status: 'coming-soon',
    summary:
      'One catalog across floor, kiosk, and online — with stock that stays honest, staffing built on traffic, and margin by location.',
    audience: ['Retail groups', 'Specialty retail', 'Franchise retail', 'Multi-brand operators'],
    intro:
      'Point of sale, inventory, workforce, and customer experience running on one catalog and one customer record across every store.',
    problems: [
      'Online and in-store showing different availability',
      'Price changes that miss a channel',
      'Shrinkage discovered at year-end instead of in-month',
      'Staffing planned without knowing store traffic',
    ],
    apps: [
      { name: 'Retail Control Center', platform: 'Web', detail: 'Sales, stock, labor, and margin by store.' },
      { name: 'Store POS', platform: 'Android · iPad', detail: 'Checkout, returns, customer lookup, and loyalty.' },
      { name: 'Stock App', platform: 'Android', detail: 'Receiving, counts, transfers, and barcode scanning.' },
      { name: 'Customer Kiosk', platform: 'Android', detail: 'Product lookup, endless aisle, and self-checkout.' },
    ],
    capabilityGroups: [
      { title: 'Commerce', items: ['POS', 'Payments', 'Loyalty', 'Customer accounts'] },
      { title: 'Inventory', items: ['Stock', 'Transfers', 'Purchasing', 'Shrinkage reporting'] },
      { title: 'Workforce', items: ['Scheduling', 'Attendance', 'Labor vs sales'] },
    ],
    foundations: ['Commerce Ops', 'Inventory Ops', 'VexaFront', 'ShyftGrid workforce layer'],
    statusNote: 'The retail demo environment is being prepared. We can walk through the underlying modules today.',
    industries: ['retail', 'multi-site'],
  },
  {
    slug: 'service-business-os',
    name: 'Service Business OS',
    shortName: 'Service OS',
    icon: 'Scissors',
    status: 'coming-soon',
    summary:
      'For salons, barbershops, clinics, med spas, gyms, and auto service — booking, check-in, client records, POS, staff, and retail stock together.',
    audience: ['Salons & barbershops', 'Clinics & med spas', 'Gyms & studios', 'Auto service'],
    intro:
      'Bookings, client history, providers, payments, and retail inventory on one system — so the front desk stops being the bottleneck.',
    problems: [
      'Walk-ins waiting on a front desk that is also answering the phone',
      'Client history living in a provider’s personal notes',
      'Commission and provider pay calculated by hand',
      'Retail product counts nobody trusts',
    ],
    apps: [
      { name: 'Owner Dashboard', platform: 'Web', detail: 'Bookings, revenue per provider, and retail margin.' },
      { name: 'Client App', platform: 'iOS · Android', detail: 'Booking, reminders, history, and payments.' },
      { name: 'Check-in Kiosk', platform: 'Android', detail: 'Walk-in check-in, provider selection, and waitlist.' },
      { name: 'Staff App', platform: 'iOS · Android', detail: 'Schedule, client notes, and commission.' },
    ],
    capabilityGroups: [
      { title: 'Clients', items: ['Online booking', 'Check-in', 'CRM', 'Loyalty'] },
      { title: 'Operations', items: ['POS', 'Retail inventory', 'Intake forms'] },
      { title: 'Staff', items: ['Provider schedules', 'Commission', 'Attendance'] },
    ],
    foundations: ['VexaFront', 'Commerce Ops', 'Inventory Ops', 'ShyftGrid workforce layer'],
    statusNote: 'The service business demo environment is being prepared. Underlying modules can be shown today.',
    industries: ['salon', 'healthcare', 'gym', 'auto-service'],
  },
];

export const SYSTEMS_BY_SLUG: Record<string, FlagshipSystem> = Object.fromEntries(SYSTEMS.map((s) => [s.slug, s]));
