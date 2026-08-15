/**
 * VexaOS — company & product content model.
 *
 * Single source of truth for the marketing site: navigation, the product
 * ecosystem, platform pillars, industries, hardware and pricing. Pages stay
 * thin and presentational; everything editable lives here.
 *
 * NOTE ON PRICING: software subscription figures in `PRODUCT_PRICING` are
 * PLACEHOLDERS pending sign-off. Hardware figures in `TOUCH_BOARDS`
 * (lib/quote-config.ts) and `HARDWARE_LEASE` are real. See PRICING_DISCLAIMER.
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
  { href: '/products/vexafront', label: 'VexaFront', description: 'Customer-facing kiosks' },
  { href: '/products/inventory-ops', label: 'Inventory Ops', description: 'Stock, supply & costing' },
];

export const PRIMARY_NAV: NavItem[] = [
  { href: '/products', label: 'Products' },
  { href: '/platform', label: 'Platform' },
  { href: '/industries', label: 'Industries' },
  { href: '/hardware', label: 'Hardware' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'Company' },
];

export const FOOTER_NAV: { title: string; links: NavItem[] }[] = [
  {
    title: 'Products',
    links: [{ href: '/products', label: 'All products' }, ...PRODUCT_NAV],
  },
  {
    title: 'Platform',
    links: [
      { href: '/platform', label: 'The VexaOS platform' },
      { href: '/hardware', label: 'Hardware' },
      { href: '/industries', label: 'Industries' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/case-study-shyftgrid', label: 'ShyftGrid case study' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About VexaOS' },
      { href: '/about/founder', label: 'Founder' },
      { href: '/blog', label: 'Insights' },
      { href: '/contact', label: 'Contact' },
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
    role: 'The customer-facing screen at the front of your business',
    icon: 'Monitor',
    accent: 'from-fuchsia-400 to-pink-600',
    summary:
      'Configurable self-service kiosks and displays — ordering, check-in, booking, queueing — tailored to your industry.',
    intro:
      'VexaFront is the customer-facing surface of VexaOS. It is a configurable kiosk and display system that adapts to what your industry needs at the front counter: ordering, check-in, booking, queue management, or signage.',
    problem: {
      headline: 'The front counter is your bottleneck.',
      points: [
        'A queue at the counter while staff take orders one at a time.',
        'Walk-in customers waiting for someone to look up from a screen.',
        'Check-in on a clipboard, then typed into a system twice.',
        'Off-the-shelf kiosks that only do one industry’s workflow.',
        'A front-of-house experience that makes the business feel smaller than it is.',
      ],
    },
    product: {
      headline: 'One kiosk platform, configured per vertical.',
      body:
        'VexaFront ships as a single platform with vertical configurations. A restaurant gets self-order and pay. A salon gets check-in and stylist selection. A gym gets member check-in and class booking. An auto shop gets service intake and status. Same platform, same data, industry-appropriate experience.',
      surfaces: [
        'Countertop kiosks, 15"–27"',
        'Freestanding and wall-mounted kiosks, 32"–43"',
        'Customer-facing displays and digital signage',
        'Queue and order-status screens',
      ],
    },
    capabilities: [
      { title: 'Self-service ordering', detail: 'Browse, customize, and pay without waiting for staff — with upsells built into the flow.' },
      { title: 'Check-in & intake', detail: 'Appointments, walk-ins, memberships, and service intake captured directly into VexaOS.' },
      { title: 'Booking & scheduling', detail: 'Pick a service, a provider, and a time on-screen, written straight to the live calendar.' },
      { title: 'Queue management', detail: 'Ticketing, waitlists, and order-ready displays that keep the lobby moving.' },
      { title: 'Vertical configurations', detail: 'Industry presets for restaurant, salon, retail, gym, auto service, and hospitality.' },
      { title: 'Branded experience', detail: 'Your logo, colors, imagery, and language — the screen looks like your business, not ours.' },
    ],
    integrations: [
      'Sends every order and payment through Commerce Ops.',
      'Books against the same calendar ShyftGrid staffs.',
      'Checks live availability from Inventory Ops before offering an item.',
      'Creates or matches the shared VexaOS customer record at check-in.',
      'Managed remotely through the VexaOS device registry.',
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
    blurb: 'What you hold, what it cost, and what it is doing to your margin.',
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
      'Every employee and every customer exists once, with one login and one record across every product.',
    points: [
      'Single sign-on for staff across ShyftGrid, Commerce Ops, and Inventory Ops',
      'One employee profile — hire once, not five times',
      'One customer record shared by kiosk, counter, and online',
      'Session and device policies applied platform-wide',
    ],
  },
  {
    icon: 'Building2',
    title: 'One organization model',
    summary:
      'Locations, departments, roles, and permissions are defined once and respected everywhere.',
    points: [
      'Multi-location and multi-brand hierarchies',
      'Role-based permissions that apply to every product',
      'Per-location configuration without separate systems',
      'Delegated administration for regional and site managers',
    ],
  },
  {
    icon: 'Database',
    title: 'One data layer',
    summary:
      'Products, customers, employees, orders, and stock live in one model — no syncing, no drift.',
    points: [
      'A single catalog behind every sales surface',
      'Real-time updates propagated to every connected device',
      'Cross-product reporting without exports and spreadsheets',
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
      'Who can see what, who changed what, and when — recorded across the whole platform.',
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
      'VexaOS is the system of record, not a walled garden. Your existing tools stay connected.',
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
    icon: 'PresentationIcon',
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
 * Sizes and outright purchase pricing.
 * 24"–86" mirror TOUCH_BOARDS in lib/quote-config.ts (confirmed pricing).
 * 15" is a PLACEHOLDER — quote-config has a 10" line at $499, not a 15".
 * Confirm the small-kiosk SKU and price before this goes to production.
 */
export const HARDWARE_SIZES = [
  { size: '15"', price: 899, note: 'Counter kiosk' },
  { size: '24"', price: 1099, note: 'Counter kiosk' },
  { size: '32"', price: 1799, note: 'Kiosk or employee board' },
  { size: '43"', price: 2499, note: 'Flagship — kiosk, signage, or board' },
  { size: '55"', price: 3499, note: 'Large employee board' },
  { size: '65"', price: 4499, note: 'Large-format board' },
  { size: '75"', price: 5999, note: 'Large-format board' },
  { size: '86"', price: 7999, note: 'Large-format board' },
] as const;

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

export const PRICING_DISCLAIMER =
  'Prices shown are per location, billed monthly in USD, and exclude payment processing and hardware. Multi-location, multi-brand, and high-volume deployments are quoted individually.';

export interface ProductPrice {
  slug: string;
  name: string;
  /** Starting monthly price per location, USD. */
  from: number;
  unit: string;
  includes: string[];
}

/**
 * PLACEHOLDER SUBSCRIPTION PRICING — confirm before production.
 * Each product is sold separately; the Platform line is required and carries
 * identity, org model, data layer, and device registry.
 */
export const PRODUCT_PRICING: ProductPrice[] = [
  {
    slug: 'platform',
    name: 'VexaOS Platform',
    from: 149,
    unit: 'per location / month',
    includes: [
      'Identity, org model, roles and permissions',
      'Shared customer and employee records',
      'Device registry and remote management',
      'Cross-product reporting',
      'Required with any product',
    ],
  },
  {
    slug: 'shyftgrid',
    name: 'ShyftGrid',
    from: 129,
    unit: 'per location / month',
    includes: [
      'Scheduling, shift marketplace, time & attendance',
      'Labor cost projection and overtime controls',
      'Availability and time-off workflows',
      'Payroll export',
    ],
  },
  {
    slug: 'commerce-ops',
    name: 'Commerce Ops',
    from: 199,
    unit: 'per location / month',
    includes: [
      'Unified catalog and order pipeline',
      'Payments, refunds, and reconciliation',
      'Customer profiles and loyalty',
      'Revenue and product-mix reporting',
    ],
  },
  {
    slug: 'inventory-ops',
    name: 'Inventory Ops',
    from: 149,
    unit: 'per location / month',
    includes: [
      'Live stock levels and counts',
      'Purchasing, receiving, and transfers',
      'Cost of goods and margin reporting',
      'Waste and shrinkage tracking',
    ],
  },
  {
    slug: 'vexafront',
    name: 'VexaFront',
    from: 89,
    unit: 'per kiosk / month',
    includes: [
      'Vertical-configured self-service experience',
      'Branded customer interface',
      'Queue, booking, and check-in flows',
      'Remote device management',
    ],
  },
  {
    slug: 'touchboard',
    name: 'TouchBoard',
    from: 59,
    unit: 'per board / month',
    includes: [
      'Live shift board and touch clock-in',
      'Checklists and task accountability',
      'Announcements and dashboards',
      'Kiosk lockdown and monitoring',
    ],
  },
];

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
    priceNote: 'From $278/mo',
    blurb: 'One site, the platform plus the products you actually need.',
    bullets: [
      'VexaOS Platform included',
      'Add any product, à la carte',
      'Unlimited staff accounts',
      'Standard onboarding and email support',
      'Hardware purchased or leased separately',
    ],
    cta: { label: 'Book a demo', href: '/demo' },
  },
  {
    key: 'multi',
    name: 'Multi-Location',
    priceNote: 'Volume pricing',
    blurb: 'Two or more sites under one organization, with rollup reporting.',
    bullets: [
      'Everything in Single Location',
      'Per-location volume discounts',
      'Cross-location reporting and transfers',
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
  { value: '5', label: 'products on one platform' },
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
