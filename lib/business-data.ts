/**
 * Shared marketing content for the Custom Connected Business Systems site.
 * Kept as data so pages stay thin and content is easy to edit in one place.
 */

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/industries', label: 'Industries' },
  { href: '/systems', label: 'Systems' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/case-study-shyftgrid', label: 'ShyftGrid Case Study' },
  { href: '/ai-solutions', label: 'AI Solutions' },
  { href: '/contact', label: 'Contact' },
];

/* -------------------------------------------------------------- */
/* Industries                                                     */
/* -------------------------------------------------------------- */
export interface Industry {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  tagline: string;
  features: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'salon-spa',
    name: 'Salons, Barbershops & Spas',
    icon: 'Scissors',
    tagline: 'Bookings, stylists, and clients on one connected system.',
    features: [
      'Online booking with staff-specific calendars',
      'Client profiles, history, and preferences',
      'Automated SMS/email reminders to cut no-shows',
      'Staff commission and service tracking',
      'Front-desk touchscreen check-in',
      'Loyalty and rewards for repeat clients',
    ],
  },
  {
    slug: 'restaurant-cafe',
    name: 'Restaurants & Cafés',
    icon: 'UtensilsCrossed',
    tagline: 'Touchscreen ordering, kitchen sync, and manager control.',
    features: [
      'Touchscreen self-order and counter kiosks',
      'Real-time kitchen display sync',
      'Menu and pricing managed from one dashboard',
      'Staff roles for servers, kitchen, and managers',
      'Sales reports and daily analytics',
      'Loyalty, promos, and customer profiles',
    ],
  },
  {
    slug: 'retail',
    name: 'Retail & Small Stores',
    icon: 'ShoppingBag',
    tagline: 'Inventory, checkout, and customers, always in sync.',
    features: [
      'Live inventory across devices and locations',
      'Touchscreen point-of-sale stations',
      'Customer profiles and purchase history',
      'Low-stock alerts and reorder tracking',
      'Staff permissions and shift tools',
      'Sales dashboards and reporting',
    ],
  },
  {
    slug: 'field-workforce',
    name: 'Field Workforce & Mobile Services',
    icon: 'Truck',
    tagline: 'Dispatch, track, and prove every job from anywhere.',
    features: [
      'Mobile job dispatch and scheduling',
      'GPS tracking and route optimization',
      'Photo uploads and digital signatures on-site',
      'Real-time job status back to the office',
      'Customer notifications and ETAs',
      'Timesheets and job costing',
    ],
  },
  {
    slug: 'cleaning-security-service',
    name: 'Cleaning, Security & Service Companies',
    icon: 'ShieldCheck',
    tagline: 'Every shift, checkpoint, and report in one place.',
    features: [
      'Shift scheduling and check-in/out',
      'Checkpoint scans and incident reports',
      'Photo proof and digital signatures',
      'Client-facing status portals',
      'Multi-site and multi-team management',
      'Automated alerts to managers',
    ],
  },
  {
    slug: 'clinic-medspa',
    name: 'Clinics & Med Spas',
    icon: 'Stethoscope',
    tagline: 'Appointments, records, and patients handled with care.',
    features: [
      'Appointment booking and reminders',
      'Patient/client profiles and history',
      'Intake forms and digital signatures',
      'Staff and provider scheduling',
      'Secure records and role-based access',
      'Follow-up automation and recalls',
    ],
  },
  {
    slug: 'repair-service',
    name: 'Repair & Service Shops',
    icon: 'Wrench',
    tagline: 'Track every ticket from drop-off to pickup.',
    features: [
      'Job/ticket tracking with status updates',
      'Customer notifications by SMS/email',
      'Parts and inventory tracking',
      'Photo documentation and estimates',
      'Front-desk touchscreen intake',
      'Payment and pickup workflow',
    ],
  },
  {
    slug: 'gym-fitness',
    name: 'Gyms & Fitness Studios',
    icon: 'Dumbbell',
    tagline: 'Members, classes, and check-ins fully connected.',
    features: [
      'Class and session booking',
      'Membership management and billing',
      'Touchscreen or app-based check-in',
      'Trainer and staff scheduling',
      'Member profiles and progress tracking',
      'Automated renewal and re-engagement alerts',
    ],
  },
];

/* -------------------------------------------------------------- */
/* System layers (for /systems)                                   */
/* -------------------------------------------------------------- */
export interface SystemLayer {
  title: string;
  icon: string;
  summary: string;
  items: string[];
}

export const SYSTEM_LAYERS: SystemLayer[] = [
  {
    title: 'Dashboard Layer',
    icon: 'LayoutDashboard',
    summary: 'The command center your managers and owners run the business from.',
    items: [
      'Web admin dashboard',
      'Manager dashboard',
      'Multi-location controls',
      'Staff roles & permissions',
      'Reports & analytics',
      'Admin controls & audit',
    ],
  },
  {
    title: 'Mobile Layer',
    icon: 'Smartphone',
    summary: 'Native and cross-platform apps for staff and customers.',
    items: [
      'iOS app',
      'Android app',
      'Employee app',
      'Customer portal app',
      'Push notifications',
      'Offline-friendly workflows',
    ],
  },
  {
    title: 'Touchscreen Layer',
    icon: 'MonitorSmartphone',
    summary: 'Kiosk and touch-board stations for the front line.',
    items: [
      'Android touchscreen / kiosk',
      'Self-service ordering & check-in',
      'Front-desk stations',
      'Digital signage & displays',
      'Locked-down kiosk mode',
      'Fast, glanceable interfaces',
    ],
  },
  {
    title: 'Automation Layer',
    icon: 'Zap',
    summary: 'The alerts, reminders, and AI that run in the background.',
    items: [
      'SMS & email alerts',
      'Scheduling & reminders',
      'Job / order tracking',
      'AI tools & automation',
      'Loyalty & rewards',
      'Workflow triggers',
    ],
  },
  {
    title: 'Data Layer',
    icon: 'Database',
    summary: 'The single source of truth every device reads and writes.',
    items: [
      'Customer profiles & CRM',
      'Inventory & catalog',
      'Payments & transactions',
      'Photo uploads & media',
      'Digital signatures',
      'Real-time syncing engine',
    ],
  },
  {
    title: 'Integration Layer',
    icon: 'Plug',
    summary: 'Connecting your system to the tools you already use.',
    items: [
      'Payment processors',
      'Accounting & POS',
      'Mapping & geolocation',
      'Third-party API integrations',
      'Multi-language support',
      'Import / export & migration',
    ],
  },
];

/* -------------------------------------------------------------- */
/* Modular feature grid (homepage section 7)                      */
/* -------------------------------------------------------------- */
export const FEATURE_GRID_ITEMS = [
  { icon: 'CalendarClock', label: 'Scheduling & Booking' },
  { icon: 'CreditCard', label: 'Payments & Checkout' },
  { icon: 'Boxes', label: 'Inventory Management' },
  { icon: 'Users', label: 'Customer Profiles / CRM' },
  { icon: 'UserCog', label: 'Staff Roles & Permissions' },
  { icon: 'Bell', label: 'Push Notifications' },
  { icon: 'MessageSquare', label: 'SMS / Email Alerts' },
  { icon: 'BarChart3', label: 'Reports & Analytics' },
  { icon: 'ClipboardList', label: 'Job / Order Tracking' },
  { icon: 'Camera', label: 'Photo Uploads' },
  { icon: 'PenTool', label: 'Digital Signatures' },
  { icon: 'Building2', label: 'Multi-Location' },
  { icon: 'ShieldCheck', label: 'Admin Controls' },
  { icon: 'Sparkles', label: 'AI Tools' },
  { icon: 'Gift', label: 'Loyalty & Rewards' },
  { icon: 'RefreshCw', label: 'Real-Time Syncing' },
];

/* -------------------------------------------------------------- */
/* Process steps (homepage section 8)                             */
/* -------------------------------------------------------------- */
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Business Blueprint',
    detail: 'We map how your business actually runs — every role, workflow, and pain point — into a clear system plan.',
  },
  {
    step: '02',
    title: 'Design & Prototype',
    detail: 'You see your dashboard, apps, and touchscreens as interactive designs before a line of production code is written.',
  },
  {
    step: '03',
    title: 'Connected Build',
    detail: 'I build the web, mobile, and touchscreen layers on one real-time synced backend — your single source of truth.',
  },
  {
    step: '04',
    title: 'Testing & Training',
    detail: 'We test on real devices and train your staff so the system fits the way your team already works.',
  },
  {
    step: '05',
    title: 'Launch & Support',
    detail: 'We go live together, then keep it running with monitoring, updates, and improvements over time.',
  },
];

/* -------------------------------------------------------------- */
/* International markets (homepage section 10)                    */
/* -------------------------------------------------------------- */
export const MARKETS = [
  'United States',
  'Canada',
  'Thailand',
  'Philippines',
  'Mexico',
  'Caribbean',
  'United Kingdom',
  'Australia',
  'UAE',
  'And beyond',
];

/* -------------------------------------------------------------- */
/* Homepage: problem pain points (section 2)                      */
/* -------------------------------------------------------------- */
export const PAIN_POINTS = [
  'Bookings in one app, payments in another, staff schedules on paper.',
  'Customer information scattered across spreadsheets, notebooks, and DMs.',
  'No single screen that shows what is actually happening right now.',
  'Staff re-typing the same data into three different tools.',
  'Generic apps that almost fit your business — but never quite.',
  'A brand that looks smaller and less professional than it really is.',
];

/* -------------------------------------------------------------- */
/* Homepage: solution cards (section 3)                           */
/* -------------------------------------------------------------- */
export const SOLUTION_CARDS = [
  {
    icon: 'LayoutDashboard',
    title: 'One Connected Dashboard',
    detail: 'Managers and owners see bookings, staff, sales, and operations from a single real-time control center.',
  },
  {
    icon: 'Smartphone',
    title: 'Apps Your People Actually Use',
    detail: 'Staff and customer apps designed around your real workflow — not a template forced onto your business.',
  },
  {
    icon: 'MonitorSmartphone',
    title: 'Touchscreen Front Line',
    detail: 'Kiosk and touch-board stations for ordering, check-in, and self-service that make your business feel modern.',
  },
  {
    icon: 'RefreshCw',
    title: 'Everything Stays in Sync',
    detail: 'Change something on one device and it updates everywhere instantly. One source of truth, every screen.',
  },
];

/* -------------------------------------------------------------- */
/* Device ecosystem cards (section 4)                             */
/* -------------------------------------------------------------- */
export const DEVICE_CARDS = [
  {
    icon: 'Laptop',
    title: 'Web Dashboard',
    detail: 'The browser-based command center for managers and owners.',
  },
  {
    icon: 'Smartphone',
    title: 'iOS App',
    detail: 'A polished iPhone app for staff and customers on the move.',
  },
  {
    icon: 'Tablet',
    title: 'Android App',
    detail: 'Native Android reach for your team and your customers.',
  },
  {
    icon: 'MonitorSmartphone',
    title: 'Touchscreen Interface',
    detail: 'Kiosk and touch-board stations for the front of your business.',
  },
];
