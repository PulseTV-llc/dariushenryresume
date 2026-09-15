/**
 * What VexaOS builds, expressed two ways:
 *   - BUILD_GROUPS: the homepage "What VexaOS Can Build" grid (by deliverable)
 *   - SOLUTION_AREAS: the /solutions page (by business capability), each mapped
 *     to the proven internal modules that sit underneath it.
 */

export interface BuildGroup {
  key: string;
  title: string;
  summary: string;
  icon: string;
  items: string[];
}

export const BUILD_GROUPS: BuildGroup[] = [
  {
    key: 'applications',
    title: 'Applications',
    summary: 'From employee apps to executive dashboards — native where it matters.',
    icon: 'AppWindow',
    items: [
      'Web Control Centers',
      'iOS Applications',
      'Android Applications',
      'React Native Apps',
      'Employee Apps',
      'Manager Apps',
      'Customer Apps',
    ],
  },
  {
    key: 'commerce',
    title: 'Commerce & Guest',
    summary: 'Every order, payment, booking, and customer on one record.',
    icon: 'CreditCard',
    items: ['POS Systems', 'Kitchen Display Systems', 'Online Ordering', 'Reservations', 'Loyalty', 'CRM'],
  },
  {
    key: 'workforce',
    title: 'Workforce',
    summary: 'Who is working, where, for how long, and what it costs.',
    icon: 'CalendarClock',
    items: ['Scheduling', 'Attendance', 'Payroll Intelligence'],
  },
  {
    key: 'operations',
    title: 'Operations',
    summary: 'Stock, standards, and the physical spaces the business depends on.',
    icon: 'Boxes',
    items: ['Inventory Management', 'Inspections', 'Facility Systems'],
  },
  {
    key: 'hardware',
    title: 'Connected Hardware',
    summary: 'Screens, readers, and sensors enrolled as part of the system.',
    icon: 'MonitorSmartphone',
    items: ['Kiosks', 'Touchscreen Systems', 'IoT', 'NFC/RFID', 'QR Systems'],
  },
  {
    key: 'intelligence',
    title: 'Intelligence & Integration',
    summary: 'Reporting, automation, and the connections to tools you keep.',
    icon: 'BrainCircuit',
    items: ['AI', 'Automation', 'Analytics', 'Financial Reporting', 'API Integrations'],
  },
];

export interface SolutionArea {
  /** Anchor id on /solutions. */
  id: string;
  title: string;
  headline: string;
  summary: string;
  icon: string;
  capabilities: string[];
  /** Internal module names that power this area. Shown as "proven technology underneath". */
  modules: string[];
  /** Example of what a client build looks like. */
  example: string;
}

export const SOLUTION_AREAS: SolutionArea[] = [
  {
    id: 'workforce',
    title: 'Workforce',
    headline: 'Workforce systems built around how your teams actually work.',
    summary:
      'Scheduling, attendance, and labor cost designed around your roles, locations, rules, and pay practices — not a generic template.',
    icon: 'CalendarClock',
    capabilities: ['Scheduling', 'Attendance', 'Clock-in', 'PTO', 'Labor analytics', 'Payroll intelligence', 'Employee communications'],
    modules: ['ShyftGrid', 'TouchBoard'],
    example: 'A multi-location employee app with verified clock-in, shift swaps, and a manager control center that shows labor cost before payroll.',
  },
  {
    id: 'commerce',
    title: 'Commerce',
    headline: 'Commerce systems with one catalog and one customer behind every channel.',
    summary:
      'Point of sale, ordering, payments, and loyalty that share the same records — so the counter, the app, and the report agree.',
    icon: 'CreditCard',
    capabilities: ['POS', 'Ordering', 'Payments', 'Customer accounts', 'Loyalty', 'Reservations'],
    modules: ['Commerce Ops', 'VexaFront'],
    example: 'A handheld POS and kitchen display running on the same order pipeline as online ordering and table reservations.',
  },
  {
    id: 'inventory',
    title: 'Inventory',
    headline: 'Inventory systems that know what you have and what it cost.',
    summary:
      'Stock, purchasing, and costing that move with real transactions, across every location and vendor.',
    icon: 'Boxes',
    capabilities: ['Stock', 'Vendors', 'Purchasing', 'Cost tracking', 'Waste', 'Recipes/BOM', 'Reordering'],
    modules: ['Inventory Ops'],
    example: 'Recipe-level costing that depletes ingredients as items sell and drafts purchase orders at reorder thresholds.',
  },
  {
    id: 'customer-experience',
    title: 'Customer Experience',
    headline: 'Customer experiences that feel like your business, not a vendor’s.',
    summary:
      'Customer apps, portals, kiosks, and self-service flows connected to the same operation your staff run.',
    icon: 'Smile',
    capabilities: ['Customer apps', 'Kiosks', 'Portals', 'Booking', 'Ordering', 'Self-service'],
    modules: ['VexaFront', 'Commerce Ops'],
    example: 'A branded customer portal for booking and account history, plus a lobby kiosk for self check-in.',
  },
  {
    id: 'connected-hardware',
    title: 'Connected Workplace',
    headline: 'Hardware that is part of the system — not bolted on.',
    summary:
      'Wall boards, employee terminals, kiosks, and readers enrolled in one device registry, configured remotely, and locked down by default.',
    icon: 'MonitorSmartphone',
    capabilities: ['TouchBoard', 'Employee terminals', 'Kiosks', 'Android devices', 'NFC/RFID', 'QR systems'],
    modules: ['TouchBoard', 'VexaOS device registry'],
    example: 'A wall-mounted board showing live staffing, with QR clock-in and a mode set remotely from the control center.',
  },
  {
    id: 'facility-operations',
    title: 'Facility Operations',
    headline: 'Facility systems that prove the work happened.',
    summary:
      'Inspections, audits, and environmental monitoring with evidence attached and alerts routed to whoever is on shift.',
    icon: 'ClipboardCheck',
    capabilities: ['Inspections', 'Audits', 'Sensors', 'Compliance', 'Monitoring', 'IoT', 'Device telemetry'],
    modules: ['Inspections', 'Facility Ops'],
    example: 'Scheduled inspection rounds with photo evidence, plus cold-room telemetry that escalates drift to the on-shift supervisor.',
  },
  {
    id: 'data-intelligence',
    title: 'Data & Intelligence',
    headline: 'One data layer, so reporting is a view — not a project.',
    summary:
      'Dashboards, financial tracking, and forecasting built on the same records every application writes to.',
    icon: 'LineChart',
    capabilities: ['Dashboards', 'Financial tracking', 'Analytics', 'AI', 'Reporting', 'Forecasting', 'Alerts'],
    modules: ['VexaOS data layer', 'Analytics'],
    example: 'An owner control center pairing labor, revenue, and cost of goods by location, with exceptions surfaced automatically.',
  },
];
