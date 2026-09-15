/**
 * VexaOS — INTERNAL module catalog & platform model.
 *
 * Since the 2026-09 repositioning, VexaOS is SOLD as a custom business
 * operating system (public positioning lives in lib/marketing/*). This file is
 * the internal software architecture underneath: the reusable modules
 * (PRODUCTS), platform pillars, hardware lines, and the per-location SaaS
 * price book kept for a future productized offering.
 *
 * Publicly, modules appear only as "proven technology underneath" on /platform
 * and /platform/modules/[slug]. The SaaS price book (BUNDLES,
 * STANDALONE_PRICING, DEVICE_PRICING, FOUNDING_OFFER, PLAN_TIERS) is NOT
 * rendered on the public site — engagement pricing lives in
 * lib/marketing/pricing.ts. Legacy nav exports below are unused.
 *
 * NOTE ON PRICING: bundle, standalone and device pricing is APPROVED (price
 * book v1-2026-08) and stored in integer cents.
 *   - Inspections is CONFIRMED at $49 and Facility Ops at $99. Every product
 *     on the site now carries a real, published price.
 *   - Two flags remain available and are currently unused:
 *     `proposed: true` renders an amber badge, a "Confirm this rate" link and a
 *     pending-confirmation footnote, and suppresses the JSON-LD offer;
 *     `comingSoon: true` shows no number at all.
 * Hardware figures in `TOUCH_BOARDS` (lib/quote-config.ts) and
 * `HARDWARE_LEASE` are real.
 */

export const APP_URL = 'https://app.vexaos.io';
export const SITE_URL = 'https://www.vexaos.io';
export const CONTACT_EMAIL = 'support@vexaos.io';

/* ============================================================== */
/* Navigation                                                     */
/* ============================================================== */

export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export const PRODUCT_NAV: NavItem[] = [
  { href: '/products/shyftgrid', label: 'ShyftGrid', description: 'Workforce & scheduling' },
  { href: '/products/touchboard', label: 'TouchBoard', description: 'Employee display' },
  { href: '/products/commerce-ops', label: 'Commerce Ops', description: 'Orders, payments, loyalty' },
  { href: '/products/vexafront', label: 'VexaFront', description: 'Customer-facing platform' },
  { href: '/products/inventory-ops', label: 'Inventory Ops', description: 'Stock, supply & costing' },
  { href: '/products/facility-ops', label: 'Facility Ops', description: 'Environmental monitoring' },
  { href: '/products/inspections', label: 'Inspections', description: 'Rounds, checklists & evidence' },
];

export const PRIMARY_NAV: NavItem[] = [
  { href: '/what-we-build', label: 'What We Build' },
  { href: '/systems', label: 'Systems' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/industries', label: 'Industries' },
  { href: '/about', label: 'Company' },
];

export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: 'What we build',
    links: [
      { href: '/what-we-build', label: 'What we build' },
      { href: '/systems', label: 'Systems' },
      { href: '/how-it-works', label: 'How it works' },
      { href: '/hardware', label: 'Connected hardware' },
      { href: '/industries', label: 'Industries' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { href: '/how-it-works', label: 'Built on VexaOS' },
      { href: '/systems', label: 'System examples' },
      { href: '/case-study-shyftgrid', label: 'Case study' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About VexaOS' },
      { href: '/about/founder', label: 'Founder' },
      { href: '/blog', label: 'Insights' },
      { href: '/contact', label: 'Start a project' },
      { href: '/demo', label: 'Book a demo' },
    ],
  },
];

/* ============================================================== */
/* Product ecosystem                                              */
/* ============================================================== */

export type ProductDomain = 'Workforce' | 'Commerce' | 'Operations';

export interface Capability {
  title: string;
  detail: string;
}

/**
 * A selectable experience on a configurable product. `available` means the mode
 * ships today; `mode` means it is a supported configuration of the same
 * platform. Nothing here should imply a mode exists that does not.
 */
export interface ProductMode {
  key: string;
  name: string;
  status: 'available' | 'mode';
  detail: string;
  /** Lucide icon name. */
  icon: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Short domain label used in the ecosystem diagram. */
  domain: ProductDomain;
  /** One-line role inside VexaOS. */
  role: string;
  /** Lucide icon name. */
  icon: string;
  /** Tailwind gradient stops for the product accent. */
  accent: string;
  /** Card blurb on /products and the homepage. */
  summary: string;
  /** Long-form hero subhead on the product page. */
  intro: string;
  /** The business problem this product exists to solve. */
  problem: {
    headline: string;
    points: string[];
  };
  /** What the product actually is. */
  product: {
    headline: string;
    body: string;
    surfaces: string[];
  };
  /** Selectable modes, for products that are configurable platforms. */
  modes?: ProductMode[];
  capabilities: Capability[];
  /** How it plugs into the rest of VexaOS. */
  integrations: string[];
  /** Industry slugs this product is a strong fit for. */
  industries: string[];
  cta: { label: string; href: string };
  /** Optional live proof link. */
  proof?: { label: string; href: string };
}

export const PRODUCTS: Product[] = [
  {
    slug: 'shyftgrid',
    name: 'ShyftGrid',
    domain: 'Workforce',
    role: 'Scheduling, shifts, time and labor cost',
    icon: 'CalendarClock',
    accent: 'from-cyan-400 to-sky-600',
    summary:
      'Build schedules, cover shifts, track time, and see labor cost against revenue — for one location or fifty.',
    intro:
      'ShyftGrid is the workforce layer of VexaOS. It turns scheduling, shift coverage, time tracking, and labor cost into one system your managers and your staff both actually use.',
    problem: {
      headline: 'Scheduling is where margin quietly disappears.',
      points: [
        'Schedules built in spreadsheets, published to a group chat, and immediately out of date.',
        'Shift swaps negotiated by text message, with no record of who agreed to what.',
        'Overtime discovered at payroll, not before it is approved.',
        'No live view of who is actually on the floor right now.',
        'Labor cost reconciled against sales days or weeks after the fact.',
      ],
    },
    product: {
      headline: 'One workforce system, from schedule to payroll export.',
      body:
        'Managers build and publish schedules from the VexaOS control center. Staff see their shifts, request time off, and pick up open shifts from their phone or the TouchBoard on the wall. Every clock-in, swap, and approval is recorded against the same employee record.',
      surfaces: [
        'Manager scheduling in the VexaOS control center',
        'Employee self-service on mobile web',
        'On-site clock-in and shift board via TouchBoard',
        'Payroll and accounting export',
      ],
    },
    capabilities: [
      { title: 'Schedule building', detail: 'Templates, recurring shifts, role and certification requirements, and multi-location coverage in one grid.' },
      { title: 'Shift marketplace', detail: 'Open shifts, swap requests, and pickups with manager approval and a full audit trail.' },
      { title: 'Time & attendance', detail: 'Clock-in from TouchBoard, kiosk, or mobile with geofencing and photo verification options.' },
      { title: 'Labor cost controls', detail: 'Projected labor cost as you build the schedule, overtime warnings before publish, and cost-vs-sales reporting.' },
      { title: 'Availability & time off', detail: 'Staff-submitted availability and PTO requests that flow straight into the scheduling grid.' },
      { title: 'Compliance records', detail: 'Break tracking, minor-hour rules, and exportable records for audits and payroll processing.' },
    ],
    integrations: [
      'Shares the VexaOS employee directory — one profile per person across every product.',
      'Publishes schedules and shift claims to TouchBoard displays on-site.',
      'Feeds labor cost into Commerce Ops reporting so cost sits next to revenue.',
      'Uses VexaOS roles and permissions, so a shift lead sees exactly what a shift lead should.',
      'Exports approved hours to your payroll provider.',
    ],
    industries: ['restaurant', 'retail', 'gym', 'hospitality', 'auto-service', 'salon', 'healthcare', 'field-service'],
    cta: { label: 'See ShyftGrid in action', href: '/demo' },
    proof: { label: 'Read the ShyftGrid case study', href: '/case-study-shyftgrid' },
  },
  {
    slug: 'touchboard',
    name: 'TouchBoard',
    domain: 'Workforce',
    role: 'The always-on display your team runs the shift from',
    icon: 'MonitorPlay',
    accent: 'from-sky-400 to-indigo-600',
    summary:
      'A wall-mounted touchscreen that shows today’s schedule, tasks, announcements, and live operations to the team on the floor.',
    intro:
      'TouchBoard is the employee-facing display for VexaOS. Mounted in the back of house, the stockroom, or the staff area, it puts the shift on a screen everyone can see — and touch.',
    problem: {
      headline: 'Your team does not read the email.',
      points: [
        'Announcements pinned to a corkboard that nobody looks at.',
        'Today’s schedule printed yesterday and already wrong.',
        'Task lists that live in a manager’s head.',
        'Staff pulling out personal phones to check basic operational information.',
        'No shared, glanceable picture of how the shift is actually going.',
      ],
    },
    product: {
      headline: 'The shift, on the wall, always current.',
      body:
        'TouchBoard runs a locked-down VexaOS display on commercial touchscreen hardware from 15" to 86". It shows who is on, what needs doing, what was announced, and how the day is tracking — and staff can clock in, claim an open shift, or complete a task by touching the screen.',
      surfaces: [
        'Wall-mounted touchscreen, 15"–86"',
        'Back-of-house and stockroom displays',
        'Staff room and time-clock stations',
        'Multi-board deployments per location',
      ],
    },
    capabilities: [
      { title: 'Live shift board', detail: 'Who is scheduled, who is clocked in, who is on break, and what is still uncovered.' },
      { title: 'Touch clock-in', detail: 'PIN or badge clock-in and clock-out recorded straight into ShyftGrid.' },
      { title: 'Task & checklist mode', detail: 'Opening, closing, and prep checklists staff tick off, with timestamps and accountability.' },
      { title: 'Announcements', detail: 'Push a message from the control center and it is on every board in every location in seconds.' },
      { title: 'Operational dashboards', detail: 'Sales pace, order queue, or stock alerts on screen for the team that can act on them.' },
      { title: 'Kiosk lockdown', detail: 'Device-locked display mode with remote configuration and health monitoring.' },
    ],
    integrations: [
      'Renders ShyftGrid schedules, open shifts, and clock-in directly.',
      'Surfaces Inventory Ops low-stock and receiving alerts to the floor.',
      'Displays Commerce Ops order queues and daily sales pace.',
      'Registered as a managed device in the VexaOS device registry.',
      'Content and permissions controlled centrally per location.',
    ],
    industries: ['restaurant', 'retail', 'gym', 'hospitality', 'auto-service', 'salon', 'healthcare', 'field-service'],
    cta: { label: 'See TouchBoard hardware', href: '/hardware' },
  },
  {
    slug: 'commerce-ops',
    name: 'Commerce Ops',
    domain: 'Commerce',
    role: 'Orders, payments, customers and loyalty',
    icon: 'CreditCard',
    accent: 'from-violet-400 to-purple-600',
    summary:
      'Take the order, take the payment, keep the customer — with one catalog and one customer record behind every channel.',
    intro:
      'Commerce Ops is the transaction layer of VexaOS. It handles ordering, checkout, payments, customer profiles, and loyalty across every channel your business sells through.',
    problem: {
      headline: 'Every sales channel is its own island.',
      points: [
        'A point-of-sale that does not know what the online store sold.',
        'Menus and price lists maintained separately in three places.',
        'Customer history trapped inside whichever terminal took the order.',
        'Loyalty programs that only work at the counter.',
        'Reporting that requires exporting from four systems into a spreadsheet.',
      ],
    },
    product: {
      headline: 'One catalog, one customer, every channel.',
      body:
        'Commerce Ops keeps a single product and pricing catalog, a single customer record, and a single order pipeline. Whether the order comes from a VexaFront kiosk, a staff terminal, or an online link, it lands in the same queue and updates the same numbers.',
      surfaces: [
        'Staff order and checkout terminals',
        'Self-service ordering through VexaFront',
        'Online ordering and customer links',
        'Manager reporting in the control center',
      ],
    },
    capabilities: [
      { title: 'Unified catalog', detail: 'Products, services, modifiers, and pricing maintained once and published everywhere.' },
      { title: 'Order pipeline', detail: 'A single live queue from placed to prepared to fulfilled, whatever channel it came from.' },
      { title: 'Payments & checkout', detail: 'Card, contactless, and stored-card checkout with tipping, splits, refunds, and reconciliation.' },
      { title: 'Customer records', detail: 'Profiles, order history, preferences, and contact consent shared across the whole platform.' },
      { title: 'Loyalty & promotions', detail: 'Points, rewards, discounts, and campaign codes that apply consistently on every channel.' },
      { title: 'Revenue reporting', detail: 'Daily sales, product mix, channel performance, and revenue against labor cost.' },
    ],
    integrations: [
      'Decrements Inventory Ops stock the moment an order is fulfilled.',
      'Pairs revenue with ShyftGrid labor cost for true daily margin.',
      'Drives the ordering and checkout experience shown on VexaFront.',
      'Pushes live order queues and sales pace to TouchBoard.',
      'Writes to the shared VexaOS customer record — no duplicate profiles.',
    ],
    industries: ['restaurant', 'retail', 'salon', 'gym', 'hospitality', 'auto-service'],
    cta: { label: 'Talk through your channels', href: '/demo' },
  },
  {
    slug: 'vexafront',
    name: 'VexaFront',
    domain: 'Commerce',
    role: 'The configurable customer-facing platform',
    icon: 'Monitor',
    accent: 'from-fuchsia-400 to-pink-600',
    summary:
      'One customer-facing platform, configured into the mode your front of house needs — reception and check-in, self-order, checkout, booking, or queue.',
    intro:
      'VexaFront is the customer-facing surface of VexaOS: a single platform you configure rather than a fixed-purpose kiosk. Reception and check-in ships today; self-order, checkout, booking, and queue are modes of the same platform, running on the same data and the same devices.',
    problem: {
      headline: 'A kiosk that does one thing is a kiosk you replace.',
      points: [
        'Vendors sell you an ordering kiosk, then a separate check-in tablet, then a separate queue screen.',
        'Each one arrives with its own customer database and its own admin login.',
        'The workflow you actually need sits between two products and belongs to neither.',
        'When the business changes, the hardware is wrong — not just the configuration.',
        'A front of house that makes the business feel smaller than it is.',
      ],
    },
    product: {
      headline: 'One platform. Pick the mode. Change it later.',
      body:
        'VexaFront runs one codebase on one device registry, and you choose what a given screen does. Put it on the wall as reception, on the counter as self-order, in the lobby as a queue display — or change a location from one to another without new hardware, a new vendor, or a second customer record.',
      surfaces: [
        'Countertop kiosks, 15"–27"',
        'Freestanding and wall-mounted kiosks, 32"–43"',
        'Customer-facing displays and digital signage',
        'Queue and status screens',
      ],
    },
    /** Selectable experiences on the one platform. `status` gates the badge. */
    modes: [
      {
        key: 'reception',
        name: 'Reception & check-in',
        status: 'available',
        detail:
          'Visitor check-in, a searchable staff and service directory, digital badge issue, and appointment bookings — captured straight into the shared VexaOS customer record.',
        icon: 'UserCheck',
      },
      {
        key: 'self-order',
        name: 'Self-order',
        status: 'mode',
        detail:
          'Browse, customize, and pay without waiting for staff, with the same catalog Commerce Ops sells from at the counter.',
        icon: 'ShoppingCart',
      },
      {
        key: 'checkout',
        name: 'Checkout',
        status: 'mode',
        detail:
          'Customer-facing payment, tipping, and receipt capture, reconciled through Commerce Ops like every other channel.',
        icon: 'CreditCard',
      },
      {
        key: 'booking',
        name: 'Booking',
        status: 'mode',
        detail:
          'Pick a service, a provider, and a time on-screen, written straight to the live calendar ShyftGrid staffs.',
        icon: 'CalendarCheck',
      },
      {
        key: 'queue',
        name: 'Queue',
        status: 'mode',
        detail:
          'Ticketing, waitlists, and order-ready displays that keep a lobby or a dining room moving without anyone calling names.',
        icon: 'ListOrdered',
      },
    ],
    capabilities: [
      { title: 'Mode configuration', detail: 'Choose what each screen does from the control center, and change it later without touching the hardware.' },
      { title: 'Visitor check-in & directory', detail: 'Self check-in, a searchable directory, and digital badges — the reception mode, shipping today.' },
      { title: 'Bookings', detail: 'Appointments taken on-screen against the same live calendar your staff are scheduled on.' },
      { title: 'Self-service transactions', detail: 'Ordering, checkout, tipping, and receipts running on the shared Commerce Ops catalog.' },
      { title: 'Queue & status', detail: 'Waitlists, ticketing, and order-ready displays for the lobby, counter, or floor.' },
      { title: 'Branded experience', detail: 'Your logo, colors, imagery, and language — the screen looks like your business, not ours.' },
    ],
    integrations: [
      'Creates or matches the shared VexaOS customer record at check-in — one customer, not one per screen.',
      'Sends every order and payment through Commerce Ops.',
      'Books against the same calendar ShyftGrid staffs.',
      'Checks live availability from Inventory Ops before offering an item.',
      'Enrolled and mode-switched remotely through the VexaOS device registry.',
    ],
    industries: ['restaurant', 'salon', 'retail', 'gym', 'auto-service', 'hospitality', 'healthcare'],
    cta: { label: 'Configure a VexaFront', href: '/hardware' },
  },
  {
    slug: 'inventory-ops',
    name: 'Inventory Ops',
    domain: 'Operations',
    role: 'Stock, suppliers, costing and waste',
    icon: 'Boxes',
    accent: 'from-emerald-400 to-teal-600',
    summary:
      'Know what you have, what it cost, what you are about to run out of, and where it went.',
    intro:
      'Inventory Ops is the operations layer of VexaOS. It tracks stock across locations, ties every unit to a cost, and turns purchasing and waste from a guess into a number.',
    problem: {
      headline: 'You are ordering from memory.',
      points: [
        'Counts done on paper once a month, if that.',
        'Running out mid-service and discovering it at the worst moment.',
        'Cost of goods estimated rather than measured.',
        'Waste and shrinkage invisible until the numbers stop making sense.',
        'Purchase orders scattered across email threads and text messages.',
      ],
    },
    product: {
      headline: 'Live stock, real cost, across every location.',
      body:
        'Inventory Ops maintains live stock levels that move automatically as Commerce Ops fulfills orders. It handles counts, receiving, transfers between locations, supplier catalogs, purchase orders, and waste logging — and reports cost of goods against actual revenue.',
      surfaces: [
        'Stock management in the control center',
        'Mobile counting and receiving',
        'Low-stock alerts on TouchBoard',
        'Supplier and purchasing workspace',
      ],
    },
    capabilities: [
      { title: 'Live stock levels', detail: 'Quantities that move as sales are fulfilled, not as someone remembers to update a sheet.' },
      { title: 'Counts & reconciliation', detail: 'Scheduled and spot counts with variance reporting so shrinkage surfaces early.' },
      { title: 'Purchasing & receiving', detail: 'Supplier catalogs, purchase orders, and receiving that reconciles against what was ordered.' },
      { title: 'Multi-location transfers', detail: 'Move stock between sites with a record on both ends and no phantom quantities.' },
      { title: 'Cost of goods', detail: 'Unit costing that rolls up into margin per item, per category, and per location.' },
      { title: 'Waste & shrinkage', detail: 'Logged waste with reason codes, reported against volume so patterns become visible.' },
    ],
    integrations: [
      'Draws down automatically from Commerce Ops fulfillment.',
      'Blocks or flags unavailable items on VexaFront before a customer orders them.',
      'Pushes low-stock and receiving alerts to TouchBoard on the floor.',
      'Uses VexaOS locations and roles so each site sees its own stock.',
      'Combines with labor and revenue for a complete cost picture.',
    ],
    industries: ['restaurant', 'retail', 'salon', 'auto-service', 'hospitality', 'gym', 'healthcare'],
    cta: { label: 'Map your stock workflow', href: '/demo' },
  },
  {
    slug: 'facility-ops',
    name: 'Facility Ops',
    domain: 'Operations',
    role: 'Environmental monitoring and control',
    icon: 'Thermometer',
    accent: 'from-amber-400 to-orange-600',
    summary:
      'Telemetry, setpoints, calibration and alerts for the physical spaces your business depends on.',
    intro:
      'Facility Ops is the environmental layer of VexaOS. It watches the conditions inside your spaces — temperature, humidity, air, water, power — holds them against setpoints, and tells someone the moment they drift.',
    problem: {
      headline: 'Nobody knows a room went out of range until something is ruined.',
      points: [
        'A walk-in that drifted overnight, discovered at open.',
        'Sensor readings scattered across vendor apps that do not talk to your roster.',
        'Alarms that fire to an email nobody is watching at 2am.',
        'Calibration records kept — if at all — on a clipboard by the door.',
        'No history to prove conditions held when someone asks.',
      ],
    },
    product: {
      headline: 'Conditions held, drift caught, everything on record.',
      body:
        'Facility Ops polls your field devices, keeps live readings against per-space setpoints, and raises alarms on the controller rather than in the cloud — so conditions are still enforced when the network is not. Every reading, alarm, and calibration is retained and reportable.',
      surfaces: [
        'Space and sensor monitoring in the control center',
        'Alarms routed to on-shift staff via ShyftGrid',
        'Condition status on TouchBoard',
        'Field controllers and Modbus devices on site',
      ],
    },
    capabilities: [
      { title: 'Live telemetry', detail: 'Temperature, humidity, CO₂, VPD, water, and power read continuously per space and per sensor.' },
      { title: 'Setpoints & bands', detail: 'Target values and acceptable ranges per space, with drift measured against them rather than guessed at.' },
      { title: 'Alarms & escalation', detail: 'Conditions evaluated on the controller, escalated to whoever is actually on shift.' },
      { title: 'Control modes', detail: 'Monitoring-only by default, with every physical output forced to its safe state until control is deliberately enabled.' },
      { title: 'Calibration records', detail: 'Instrument calibration tracked, scheduled, and retained for audits and compliance.' },
      { title: 'Advisory intelligence', detail: 'Trend analysis that forecasts when a space will cross its band — advisory only, never silently changing a setpoint.' },
    ],
    integrations: [
      'Routes alarms to the staff ShyftGrid says are on shift right now.',
      'Puts space status and active alarms on TouchBoard where the team can see them.',
      'Ties equipment and sensors to the Inventory Ops asset records they belong to.',
      'Uses VexaOS locations, so each site sees and manages only its own spaces.',
      'Field controllers enrol in the same VexaOS device registry as kiosks and boards.',
    ],
    industries: ['restaurant', 'retail', 'hospitality', 'healthcare', 'gym', 'field-service'],
    cta: { label: 'Talk to us about Facility Ops', href: '/contact' },
  },
  {
    slug: 'inspections',
    name: 'Inspections',
    domain: 'Operations',
    role: 'Rounds, checklists and evidence on the record',
    icon: 'ClipboardCheck',
    accent: 'from-lime-400 to-emerald-600',
    summary:
      'Structured inspection rounds with checklists, photo evidence, and a retained record you can produce on demand.',
    intro:
      'Inspections is the accountability layer of VexaOS. It turns the walkthroughs, opening checks, and compliance rounds your team already does into scheduled work with evidence attached and a record that survives staff turnover.',
    problem: {
      headline: 'The check happened. Proving it is another matter.',
      points: [
        'Opening and closing checks ticked on a laminated sheet nobody files.',
        'Compliance rounds remembered rather than scheduled.',
        'Photo evidence sitting in a manager’s camera roll.',
        'A failed item raised verbally, then lost between shifts.',
        'An auditor asks for six months of records and the search starts from nothing.',
      ],
    },
    product: {
      headline: 'Scheduled rounds, captured evidence, a record that holds up.',
      body:
        'Build the checklist once, schedule the round, and assign it to whoever is on shift. Staff complete it on a phone or a TouchBoard, attach photos and notes to any item, and a failure opens follow-up work instead of evaporating. Every completed round is timestamped, attributed, and retained.',
      surfaces: [
        'Checklist and schedule builder in the control center',
        'Round completion on mobile',
        'Due and overdue rounds on TouchBoard',
        'Exportable records for audits and insurers',
      ],
    },
    capabilities: [
      { title: 'Checklist templates', detail: 'Reusable templates per area, per shift, or per compliance regime, versioned as they change.' },
      { title: 'Scheduled rounds', detail: 'Recurring assignments that appear as work rather than relying on someone remembering.' },
      { title: 'Evidence capture', detail: 'Photos, notes, readings, and signatures attached to the individual item, not the whole form.' },
      { title: 'Fail-to-follow-up', detail: 'A failed item raises assigned follow-up work with an owner and a due time.' },
      { title: 'Attribution & timestamps', detail: 'Who completed what, when, and where — recorded against the VexaOS employee record.' },
      { title: 'Retained records', detail: 'A searchable, exportable history for audits, insurers, and franchise reporting.' },
    ],
    integrations: [
      'Assigns rounds to the staff ShyftGrid says are on shift, not to a name on a list.',
      'Shows due and overdue rounds on TouchBoard so the floor can see them.',
      'Raises stock and equipment issues against Inventory Ops records.',
      'Pairs with Facility Ops so a sensor alarm and a physical check land in the same history.',
      'Scoped by VexaOS locations and roles, with the same audit trail as everything else.',
    ],
    industries: ['restaurant', 'retail', 'hospitality', 'healthcare', 'gym', 'auto-service', 'field-service'],
    cta: { label: 'Talk to us about Inspections', href: '/contact' },
  },
];

export const PRODUCTS_BY_SLUG: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export const DOMAIN_META: Record<
  ProductDomain,
  { label: string; blurb: string; accent: string }
> = {
  Workforce: {
    label: 'Workforce',
    blurb: 'The people who run the business — scheduled, paid, informed and accountable.',
    accent: 'text-sky-300',
  },
  Commerce: {
    label: 'Commerce & customer experience',
    blurb: 'Every order, payment, and customer interaction on one catalog and one record.',
    accent: 'text-fuchsia-300',
  },
  Operations: {
    label: 'Operations',
    blurb: 'What you hold, what it cost, and the conditions the whole operation depends on.',
    accent: 'text-emerald-300',
  },
};

/* ============================================================== */
/* Platform pillars (/platform)                                   */
/* ============================================================== */

export interface PlatformPillar {
  icon: string;
  title: string;
  summary: string;
  points: string[];
}

export const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    icon: 'Fingerprint',
    title: 'One identity',
    summary:
      'Every employee and every customer exists once, with one login and one record across every application in the system.',
    points: [
      'One sign-in for staff across web, mobile, and device apps',
      'One employee profile — hire once, not five times',
      'One customer record shared by kiosk, counter, and online',
      'Session and device policies applied system-wide',
    ],
  },
  {
    icon: 'Building2',
    title: 'One organization model',
    summary:
      'Locations, departments, roles, and permissions are defined once and respected everywhere.',
    points: [
      'Multi-location and multi-brand hierarchies',
      'Role-based permissions that apply to every application',
      'Per-location configuration without separate systems',
      'Delegated administration for regional and site managers',
    ],
  },
  {
    icon: 'Database',
    title: 'One data layer',
    summary:
      'Customers, employees, orders, stock, and devices live in one model — no syncing, no drift.',
    points: [
      'A single catalog behind every sales surface',
      'Real-time updates propagated to every connected device',
      'Cross-application reporting without exports and spreadsheets',
      'Historical records retained for audit and analysis',
    ],
  },
  {
    icon: 'Cpu',
    title: 'One device registry',
    summary:
      'Kiosks, boards, and terminals are provisioned, configured, and monitored from one place.',
    points: [
      'Enroll a device, assign it to a location, and it configures itself',
      'Remote configuration and content updates',
      'Health and connectivity monitoring per device',
      'Locked-down kiosk mode with managed recovery',
    ],
  },
  {
    icon: 'ShieldCheck',
    title: 'Governed access',
    summary:
      'Who can see what, who changed what, and when — recorded across the whole system.',
    points: [
      'Granular permissions down to the action level',
      'Audit trails on schedules, pricing, refunds, and stock adjustments',
      'Encrypted data in transit and at rest',
      'Access reviews and offboarding in one step',
    ],
  },
  {
    icon: 'Plug',
    title: 'Open at the edges',
    summary:
      'Your system of record, not a walled garden. The tools you keep stay connected.',
    points: [
      'Payroll and accounting exports',
      'Payment processor integration',
      'Supplier and vendor data import',
      'API access for custom integrations',
    ],
  },
];

/* ============================================================== */
/* Industries                                                     */
/* ============================================================== */

export interface Vertical {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  /** What breaks in this vertical without a connected system. */
  pain: string[];
  /** What VexaOS does about it. */
  outcomes: string[];
  /** Product slugs, in recommended order. */
  stack: string[];
  /** VexaFront front-of-house configuration for this vertical. */
  frontConfig: string;
}

export const VERTICALS: Vertical[] = [
  {
    slug: 'restaurant',
    name: 'Restaurants & Cafés',
    icon: 'UtensilsCrossed',
    tagline: 'Self-order at the front, live prep in the back, labor and food cost in the same report.',
    pain: [
      'A queue at the counter during the rush',
      'Menu changes made in three systems',
      'Food cost estimated, never measured',
      'Schedules published to a group chat',
    ],
    outcomes: [
      'Customers order and pay themselves on VexaFront while staff produce',
      'One menu published to kiosk, counter, and online at once',
      'Stock draws down per order, so food cost is a real number',
      'Labor cost and revenue on the same daily report',
    ],
    stack: ['vexafront', 'commerce-ops', 'inventory-ops', 'shyftgrid', 'touchboard'],
    frontConfig: 'Self-order and pay, order-status display, and digital menu boards.',
  },
  {
    slug: 'salon',
    name: 'Barbershops & Salons',
    icon: 'Scissors',
    tagline: 'Check-in, stylist selection, retail, and commission — without a front-desk bottleneck.',
    pain: [
      'Walk-ins waiting for a free front desk',
      'Client history in a stylist’s personal notes',
      'Retail product counts nobody trusts',
      'Commission calculated by hand',
    ],
    outcomes: [
      'Clients check in and pick their stylist on the kiosk',
      'One client record every chair can see',
      'Retail stock tied to the same catalog that sells it',
      'Service revenue attributed per stylist automatically',
    ],
    stack: ['vexafront', 'commerce-ops', 'shyftgrid', 'inventory-ops', 'touchboard'],
    frontConfig: 'Walk-in check-in, stylist and service selection, waitlist display.',
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: 'ShoppingBag',
    tagline: 'One catalog across floor, kiosk, and online, with stock that stays honest.',
    pain: [
      'Online and in-store showing different availability',
      'Price changes that miss a channel',
      'Shrinkage discovered at year-end',
      'Coverage planned without knowing traffic',
    ],
    outcomes: [
      'A single catalog and price list behind every channel',
      'Live stock across locations with transfers on record',
      'Variance reporting that surfaces shrinkage in-month',
      'Schedules built against actual sales patterns',
    ],
    stack: ['commerce-ops', 'inventory-ops', 'shyftgrid', 'vexafront', 'touchboard'],
    frontConfig: 'Product lookup, endless-aisle ordering, and self-checkout.',
  },
  {
    slug: 'gym',
    name: 'Gyms & Fitness',
    icon: 'Dumbbell',
    tagline: 'Member check-in, class booking, trainer schedules, and retail on one platform.',
    pain: [
      'Check-in queues at peak hours',
      'Class booking in a separate app from membership',
      'Trainer availability managed over text',
      'Supplement and merch stock untracked',
    ],
    outcomes: [
      'Members check in and book classes at the kiosk',
      'Membership, booking, and payment on one record',
      'Trainer schedules and coverage in ShyftGrid',
      'Retail sold and counted through the same platform',
    ],
    stack: ['vexafront', 'commerce-ops', 'shyftgrid', 'inventory-ops', 'touchboard'],
    frontConfig: 'Member check-in, class booking, and guest registration.',
  },
  {
    slug: 'auto-service',
    name: 'Auto Service',
    icon: 'Wrench',
    tagline: 'Service intake, parts, technician hours, and status updates the customer can see.',
    pain: [
      'Intake on paper, re-typed into a system',
      'Parts availability confirmed by walking to the back',
      'Technician hours estimated at invoicing',
      'Customers calling for status updates',
    ],
    outcomes: [
      'Digital intake at the kiosk with signatures captured',
      'Live parts availability at the moment of quoting',
      'Technician time tracked against each job',
      'Status displayed in the waiting area and sent to the customer',
    ],
    stack: ['vexafront', 'inventory-ops', 'shyftgrid', 'commerce-ops', 'touchboard'],
    frontConfig: 'Service intake, vehicle details, approvals, and status display.',
  },
  {
    slug: 'hospitality',
    name: 'Hotels & Hospitality',
    icon: 'BedDouble',
    tagline: 'Front-desk relief, housekeeping coordination, amenity ordering, and supply control.',
    pain: [
      'Front desk absorbing every routine request',
      'Housekeeping assignments on a printed sheet',
      'Amenity and minibar stock counted by hand',
      'Departmental schedules built in isolation',
    ],
    outcomes: [
      'Guests self-serve check-in and amenity requests on VexaFront',
      'Housekeeping tasks and completion tracked on TouchBoard',
      'Supply levels tracked per floor and per property',
      'One schedule view across every department',
    ],
    stack: ['vexafront', 'shyftgrid', 'inventory-ops', 'commerce-ops', 'touchboard'],
    frontConfig: 'Guest check-in, amenity ordering, concierge and wayfinding.',
  },
  {
    slug: 'healthcare',
    name: 'Clinics & Med Spas',
    icon: 'Stethoscope',
    tagline: 'Patient check-in, intake forms, provider scheduling, and consumable tracking.',
    pain: [
      'Clipboard intake typed in twice',
      'Provider schedules disconnected from booking',
      'Consumables ordered reactively',
      'No single view of the day’s room utilization',
    ],
    outcomes: [
      'Patients complete intake and sign on the kiosk',
      'Provider availability and booking on one calendar',
      'Consumable stock tracked with reorder thresholds',
      'Daily schedule and room status on the staff board',
    ],
    stack: ['vexafront', 'shyftgrid', 'inventory-ops', 'commerce-ops', 'touchboard'],
    frontConfig: 'Patient check-in, digital intake forms, and consent signatures.',
  },
  {
    slug: 'field-service',
    name: 'Field & Multi-Site Service',
    icon: 'Truck',
    tagline: 'Dispatch, crew scheduling, van stock, and proof of work across every site.',
    pain: [
      'Crews dispatched by phone call',
      'Van stock unknown until a job fails',
      'Timesheets reconstructed on Friday',
      'No proof of what was completed where',
    ],
    outcomes: [
      'Crew schedules and assignments in one grid',
      'Stock tracked per vehicle and per depot',
      'Time captured at the job, not from memory',
      'Completion records with photos and signatures',
    ],
    stack: ['shyftgrid', 'inventory-ops', 'commerce-ops', 'touchboard', 'vexafront'],
    frontConfig: 'Depot check-in boards and customer-facing status displays.',
  },
];

export const VERTICALS_BY_SLUG: Record<string, Vertical> = Object.fromEntries(
  VERTICALS.map((v) => [v.slug, v])
);

/* ============================================================== */
/* Hardware                                                       */
/* ============================================================== */

export interface HardwareLine {
  key: string;
  product: 'VexaFront' | 'TouchBoard';
  name: string;
  sizes: string;
  placement: string;
  typicalUse: string[];
  icon: string;
}

export const HARDWARE_LINES: HardwareLine[] = [
  {
    key: 'front-counter',
    product: 'VexaFront',
    name: 'Counter kiosk',
    sizes: '15" – 27"',
    placement: 'Countertop or short stand',
    typicalUse: [
      'Self-order and pay at a café or quick-service counter',
      'Walk-in check-in at a salon or clinic',
      'Member check-in at a gym entrance',
    ],
    icon: 'Tablet',
  },
  {
    key: 'front-floor',
    product: 'VexaFront',
    name: 'Freestanding kiosk',
    sizes: '32" – 43"',
    placement: 'Floor stand or wall mount',
    typicalUse: [
      'High-traffic ordering in a lobby or dining room',
      'Service intake at an auto shop',
      'Guest check-in and concierge in a hotel lobby',
    ],
    icon: 'Monitor',
  },
  {
    key: 'front-display',
    product: 'VexaFront',
    name: 'Customer display & signage',
    sizes: '43" and wall installations',
    placement: 'Wall-mounted, single or tiled',
    typicalUse: [
      'Digital menu boards',
      'Order-ready and queue displays',
      'Waiting-area service status',
    ],
    icon: 'MonitorSpeaker',
  },
  {
    key: 'board-staff',
    product: 'TouchBoard',
    name: 'Employee board',
    sizes: '32" – 55"',
    placement: 'Back of house, staff room, stockroom',
    typicalUse: [
      'Shift board, clock-in, and open-shift claims',
      'Opening and closing checklists',
      'Announcements and operational dashboards',
    ],
    icon: 'MonitorPlay',
  },
  {
    key: 'board-large',
    product: 'TouchBoard',
    name: 'Large-format board',
    sizes: '65" – 86"',
    placement: 'Warehouse, production floor, multi-team areas',
    typicalUse: [
      'Whole-floor visibility for large teams',
      'Production and fulfillment status',
      'Multi-department scheduling at a glance',
    ],
    icon: 'Presentation',
  },
];

/** Real, confirmed lease terms for the flagship 43" board. */
export const HARDWARE_LEASE = {
  size: '43"',
  purchase: 2499,
  monthly: 99,
  term: '36 months',
  note:
    'Lease includes the display, mounting hardware, VexaOS device management, remote configuration, and hardware replacement for the duration of the term.',
} as const;

/**
 * Sizes and outright purchase pricing, "starting at" per unit.
 * 24"–86" mirror the confirmed TOUCH_BOARDS catalog in lib/quote-config.ts.
 * The 15" counter kiosk is not in that catalog, so it is quoted rather than
 * listed — never invent an MSRP for it.
 */
export const HARDWARE_SIZES: {
  size: string;
  priceCents: number | null;
  note: string;
  quoteOnly?: boolean;
}[] = [
  { size: '15"', priceCents: null, note: 'Counter kiosk', quoteOnly: true },
  { size: '24"', priceCents: 109900, note: 'Counter kiosk' },
  { size: '32"', priceCents: 179900, note: 'Kiosk or employee board' },
  { size: '43"', priceCents: 249900, note: 'Flagship — kiosk, signage, or board' },
  { size: '55"', priceCents: 349900, note: 'Large employee board' },
  { size: '65"', priceCents: 449900, note: 'Large-format board' },
  { size: '75"', priceCents: 599900, note: 'Large-format board' },
  { size: '86"', priceCents: 799900, note: 'Large-format board' },
];

export const HARDWARE_INCLUDED = [
  'Commercial-grade capacitive touchscreen',
  'Wall, floor, or counter mounting hardware',
  'VexaOS device enrollment and kiosk lockdown',
  'Remote configuration and content management',
  'Connectivity and health monitoring',
  'On-site placement guidance during onboarding',
];

/* ============================================================== */
/* Pricing                                                        */
/* ============================================================== */

/**
 * APPROVED PRICING. All money is stored in integer cents — never floats — and
 * formatted through `usd()` at the edge. List prices are per location per month
 * unless the unit says otherwise.
 *
 * All standalone prices are confirmed. Two flags remain for future use, both
 * currently unused:
 *   `proposed: true`   — a real number, not yet signed off. Amber badge, a
 *                        "Confirm this rate" link, a pending-confirmation
 *                        footnote, and NO JSON-LD offer.
 *   `comingSoon: true` — no number at all, "Contact us" instead.
 * Never substitute a number for a product that has neither.
 */

/** Format integer cents as USD, dropping `.00` on whole dollars. */
export function usd(cents: number): string {
  const whole = cents % 100 === 0;
  return `$${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  })}`;
}

export const PRICING_DISCLAIMER =
  'Prices are per location, billed monthly in USD, and exclude payment processing fees and hardware. Multi-location, multi-brand, and franchise deployments are quoted individually.';

/* -------------------------------------------------------------- */
/* Bundles — the primary way VexaOS is bought                     */
/* -------------------------------------------------------------- */

export interface Bundle {
  key: string;
  name: string;
  /** List price, integer cents, per location per month. */
  priceCents: number;
  /** Founding Customer price, integer cents, per location per month. */
  foundingCents: number;
  blurb: string;
  /** Product slugs included in the bundle. */
  products: string[];
  /** Non-product inclusions worth calling out. */
  extras: string[];
  highlight?: boolean;
}

export const BUNDLES: Bundle[] = [
  {
    key: 'workforce',
    name: 'Workforce',
    priceCents: 7900,
    foundingCents: 5900,
    blurb: 'Scheduling, shifts, time and labor cost for a single team.',
    products: ['shyftgrid'],
    extras: [],
  },
  {
    key: 'operations',
    name: 'Operations',
    priceCents: 14900,
    foundingCents: 11900,
    blurb: 'Workforce plus the stock and cost side of the operation.',
    products: ['shyftgrid', 'inventory-ops'],
    extras: [],
  },
  {
    key: 'commerce',
    name: 'Commerce',
    priceCents: 17900,
    foundingCents: 14900,
    blurb: 'Selling and stock together — orders drawing down live inventory.',
    products: ['commerce-ops', 'inventory-ops'],
    extras: [],
  },
  {
    key: 'complete',
    name: 'Complete',
    priceCents: 24900,
    foundingCents: 19900,
    blurb: 'The whole operating system: people, selling, and stock on one platform.',
    products: ['shyftgrid', 'commerce-ops', 'inventory-ops'],
    extras: [
      '1 TouchBoard license included per location',
      'Advanced analytics',
      'Cross-product reporting',
      'Device management',
      'Advanced permissions',
      'Priority support',
      'Discounted VexaFront and additional TouchBoard licenses',
    ],
    highlight: true,
  },
];

/* -------------------------------------------------------------- */
/* Standalone products — per location / month                     */
/* -------------------------------------------------------------- */

export interface StandalonePrice {
  slug: string;
  name: string;
  /** Integer cents per location per month. Null when not yet priced. */
  priceCents: number | null;
  comingSoon?: boolean;
  /**
   * The number is a proposal, not signed off. It renders with a visible
   * "Proposed" badge and a footnote. Flip to false (or delete) once confirmed;
   * this is the ONLY place the value lives.
   */
  proposed?: boolean;
  summary: string;
  /** Product page, when one exists. */
  href?: string;
}

/** Footnote rendered wherever a `proposed` price appears. */
export const PROPOSED_PRICE_NOTE =
  'Proposed pricing, pending final confirmation. Not yet bookable — talk to us and we will confirm the rate before anything is signed.';

export const STANDALONE_PRICING: StandalonePrice[] = [
  {
    slug: 'shyftgrid',
    name: 'ShyftGrid',
    priceCents: 7900,
    summary: 'Scheduling, shift swaps, clock in/out, time cards and payroll export.',
    href: '/products/shyftgrid',
  },
  {
    slug: 'commerce-ops',
    name: 'Commerce Ops',
    priceCents: 9900,
    summary: 'Point of sale, card-present payments, refunds, order queues and sales reporting.',
    href: '/products/commerce-ops',
  },
  {
    slug: 'inventory-ops',
    name: 'Inventory Ops',
    priceCents: 5900,
    summary: 'Stock levels, vendors, receiving, reorder approvals and cost of goods.',
    href: '/products/inventory-ops',
  },
  {
    // CONFIRMED — $99/location/month. The premium control and telemetry tier,
    // priced above the rest of the lineup. Change here only.
    slug: 'facility-ops',
    name: 'Facility Ops',
    priceCents: 9900,
    summary: 'Environmental monitoring and control — telemetry, setpoints, calibration and alerts.',
    href: '/products/facility-ops',
  },
  {
    // CONFIRMED 2026-08-15 (price book v1-2026-08). Change here only.
    slug: 'inspections',
    name: 'Inspections',
    priceCents: 4900,
    summary: 'Structured inspection rounds, checklists, and evidence capture with a retained record.',
    href: '/products/inspections',
  },
];

export const STANDALONE_BY_SLUG: Record<string, StandalonePrice> = Object.fromEntries(
  STANDALONE_PRICING.map((p) => [p.slug, p])
);

/* -------------------------------------------------------------- */
/* Device software — per device / month                           */
/* -------------------------------------------------------------- */

export interface DevicePrice {
  slug: string;
  name: string;
  /** Integer cents per device per month at list. */
  priceCents: number;
  unit: string;
  /** Licenses included per location on the Complete bundle. */
  includedWithComplete: number;
  /** Integer cents per device per month for customers on Complete. */
  completeCents: number;
  /** How the Complete rate should be described. */
  completeNote: string;
  summary: string;
  href: string;
}

export const DEVICE_PRICING: DevicePrice[] = [
  {
    slug: 'vexafront',
    name: 'VexaFront',
    priceCents: 4900,
    unit: 'per device / month',
    includedWithComplete: 0,
    completeCents: 3900,
    completeNote: `${'$39'}/device/mo with VexaOS Complete`,
    summary: 'Customer-facing kiosk and reception software — check-in, directory, bookings and self-service.',
    href: '/products/vexafront',
  },
  {
    slug: 'touchboard',
    name: 'TouchBoard',
    priceCents: 2900,
    unit: 'per device / month',
    includedWithComplete: 1,
    completeCents: 1900,
    completeNote: 'VexaOS Complete includes 1 TouchBoard license per location; additional boards $19/device/mo',
    summary: 'Employee wall display — open shifts, pending swaps, announcements and POS modes.',
    href: '/products/touchboard',
  },
];

export const DEVICE_BY_SLUG: Record<string, DevicePrice> = Object.fromEntries(
  DEVICE_PRICING.map((p) => [p.slug, p])
);

/** Canonical TouchBoard pricing sentence — reused verbatim on /pricing and the product page. */
export const TOUCHBOARD_PRICING_STATEMENT =
  'Software $29/device/mo. VexaOS Complete includes 1 TouchBoard license per location; additional boards $19/device/mo. Hardware sold separately.';

export const VEXAFRONT_PRICING_STATEMENT =
  'Software $49/device/mo, or $39/device/mo with VexaOS Complete. Hardware sold separately.';

/* -------------------------------------------------------------- */
/* Founding Customer offer                                        */
/* -------------------------------------------------------------- */

export const FOUNDING_OFFER = {
  limit: 25,
  termMonths: 12,
  name: 'Founding Customer',
  blurb:
    'The first 25 organizations on VexaOS lock founding rates for 12 months. Same platform, same products, same support — priced for the people who back it early.',
  terms: [
    'Limited to the first 25 organizations',
    'Founding rate held for 12 months from activation',
    'Applies to bundle pricing only — founding never discounts device software',
    'Founding Complete still includes exactly one TouchBoard per location; additional boards stay at $19',
    'Reverts to list pricing at renewal',
  ],
} as const;

/* -------------------------------------------------------------- */
/* How you buy                                                    */
/* -------------------------------------------------------------- */

export interface PlanTier {
  key: string;
  name: string;
  blurb: string;
  bullets: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  priceNote: string;
}

export const PLAN_TIERS: PlanTier[] = [
  {
    key: 'single',
    name: 'Single Location',
    priceNote: 'List pricing',
    blurb: 'One site, on the bundle that fits how you operate.',
    bullets: [
      'Any bundle or standalone product',
      'Unlimited staff accounts',
      'The VexaOS platform included — identity, roles, data, devices',
      'Standard onboarding and email support',
      'Device software and hardware billed separately',
    ],
    cta: { label: 'Book a demo', href: '/demo' },
  },
  {
    key: 'multi',
    name: 'Multi-Location',
    priceNote: '20% off locations 2–5',
    blurb: 'Two or more sites under one organization, with rollup reporting.',
    bullets: [
      'Everything in Single Location',
      'Locations 2–5 bill at 80% of the bundle rate',
      '6–20 locations quoted individually',
      'Cross-location reporting and stock transfers',
      'Regional roles and delegated administration',
      'Guided onboarding and priority support',
    ],
    cta: { label: 'Get a quote', href: '/contact' },
    highlight: true,
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    priceNote: 'Contact for enterprise',
    blurb: 'Multi-brand groups, franchise networks, and custom requirements.',
    bullets: [
      'Everything in Multi-Location',
      'Multi-brand and franchise hierarchies',
      'Custom integrations and API access',
      'Deployment planning and staff training',
      'Named account contact and SLA',
    ],
    cta: { label: 'Contact sales', href: '/contact' },
  },
];

/* ============================================================== */
/* Homepage proof points                                          */
/* ============================================================== */

export const HOME_STATS = [
  { value: '7', label: 'products on one platform' },
  { value: '1', label: 'identity, org model, and data layer' },
  { value: '15"–86"', label: 'managed touchscreen hardware' },
  { value: '8', label: 'configured industry verticals' },
];

export const OUTCOMES = [
  {
    icon: 'Workflow',
    title: 'Stop re-entering the same data',
    detail:
      'A customer created at the kiosk is the same customer at the counter. An employee hired once is scheduled, clocked, and paid from one record.',
  },
  {
    icon: 'LineChart',
    title: 'See cost and revenue together',
    detail:
      'Labor from ShyftGrid, revenue from Commerce Ops, and cost of goods from Inventory Ops land in the same report — not three exports.',
  },
  {
    icon: 'Gauge',
    title: 'Move the bottleneck off your counter',
    detail:
      'VexaFront handles ordering, check-in, and booking so your staff spend their time producing rather than transcribing.',
  },
  {
    icon: 'Layers',
    title: 'Adopt one product, or all of them',
    detail:
      'Each product is sold separately and works on its own. They are simply better together, because they already share everything.',
  },
];
