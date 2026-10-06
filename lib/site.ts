/**
 * Site-wide constants, navigation and content for vexaos.io.
 *
 * Positioning: VexaOs is a vendor-neutral platform to monitor anything,
 * anywhere. Sensors -> Edge Gateway -> Cloud & AI Insights -> apps.
 *
 * HONESTY RULES for every string in this file:
 *  - Only claim what the product does today. Anything else carries a
 *    `status` of 'development' or 'soon' and is labelled on the page.
 *  - No customers, logos, testimonials, certifications or statistics.
 *  - Never name third-party hardware vendors. The gateway is the
 *    "VexaOs Edge Gateway".
 */

export const SITE_URL = 'https://www.vexaos.io';
export const CONTACT_EMAIL = 'support@vexaos.io';
export const ADDRESS = {
  street: '35 W. Huron St, Suite 403',
  city: 'Pontiac',
  region: 'MI',
  postalCode: '48342',
  country: 'US',
  mapsUrl: 'https://maps.google.com/?q=35+W.+Huron+St+Suite+403+Pontiac+MI+48342',
} as const;

export const TAGLINE = 'Monitor anything, anywhere.';
export const DESCRIPTION =
  'VexaOs is a vendor-neutral monitoring platform: wireless sensors, an offline-safe Edge Gateway, VexaOs Cloud with AI Insights, and apps for web, iOS and Android.';

export type Status = 'available' | 'development' | 'soon';

export const STATUS_LABEL: Record<Status, string> = {
  available: 'Available',
  development: 'In development',
  soon: 'Coming soon',
};

/* -------------------------------------------------------------------------- */
/* Products                                                                   */
/* -------------------------------------------------------------------------- */

export type IconName =
  | 'sensors'
  | 'gateway'
  | 'mobile'
  | 'cloud'
  | 'apps'
  | 'thermometer'
  | 'door'
  | 'vibration'
  | 'plug'
  | 'food'
  | 'warehouse'
  | 'factory'
  | 'building'
  | 'health'
  | 'restaurant'
  | 'environment'
  | 'water'
  | 'energy'
  | 'assets'
  | 'safety'
  | 'process'
  | 'wired'
  | 'bluetooth';

export interface Product {
  slug: string;
  name: string;
  short: string;
  /** One-line role in the stack. */
  role: string;
  summary: string;
  icon: IconName;
  status: Status;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'sensors',
    name: 'Sensors',
    short: 'Sensors',
    role: 'Measure',
    summary:
      'Nine sensor families, wireless and wired. Bluetooth temperature, humidity, pressure and door sensors are live today; the rest, including RS-485 / Modbus, are added through adapters.',
    icon: 'sensors',
    status: 'available',
  },
  {
    slug: 'edge-gateway',
    name: 'VexaOs Edge Gateway',
    short: 'Edge Gateway',
    role: 'Collect',
    summary:
      'Listens to nearby sensors, checks alarm rules on site, and keeps every reading through internet outages and restarts.',
    icon: 'gateway',
    status: 'available',
  },
  {
    slug: 'mobile-gateway',
    name: 'VexaOs Mobile Gateway',
    short: 'Mobile Gateway',
    role: 'Collect on the move',
    summary:
      'The same gateway for places without fixed power or network: vehicles, trailers and temporary sites.',
    icon: 'mobile',
    status: 'soon',
  },
  {
    slug: 'cloud-ai-insights',
    name: 'VexaOs Cloud & AI Insights',
    short: 'Cloud & AI Insights',
    role: 'Understand',
    summary:
      'Stores history, runs alert rules, and flags drift, time-to-limit forecasts and unusual door activity in plain English.',
    icon: 'cloud',
    status: 'available',
  },
  {
    slug: 'apps',
    name: 'VexaOs Apps',
    short: 'Apps',
    role: 'Act',
    summary:
      'One account on web, iOS and Android: live dashboards, alerts, analytics, multiple sites and team roles.',
    icon: 'apps',
    status: 'available',
  },
];

export const productHref = (slug: string) => `/products/${slug}`;

/* -------------------------------------------------------------------------- */
/* Industries                                                                 */
/* -------------------------------------------------------------------------- */

export interface Industry {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  /** Featured on the home page. */
  primary: boolean;
  headline: string;
  summary: string;
  /** What people in this industry typically watch. */
  monitor: { title: string; body: string; status?: Status }[];
  /** How the platform's existing features apply. */
  how: { title: string; body: string }[];
  /** Plain statement of what VexaOs does not claim here. */
  note: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'food-service-cold-chain',
    name: 'Food service & cold chain',
    short: 'Food & cold chain',
    icon: 'food',
    primary: true,
    headline: 'Know your coolers are cold before the food is lost.',
    summary:
      'Walk-ins, reach-ins, freezers and prep areas, watched around the clock. See a cooler warming hours before it reaches its limit, and know the moment a door is left open.',
    monitor: [
      { title: 'Walk-in coolers and freezers', body: 'Temperature and humidity every few seconds, summarized and charted by hour, day and month.' },
      { title: 'Cooler and freezer doors', body: 'Every open and close is recorded the moment it happens, with a flag when a door stays open.' },
      { title: 'Prep and dry storage', body: 'Room temperature and humidity, with alerts when they leave the range you set.' },
    ],
    how: [
      { title: 'A warning before the limit', body: 'When a cooler trends toward its alert limit, the forecast shows how many hours are left at the current rate.' },
      { title: 'Readings survive an outage', body: 'If the internet drops, the gateway keeps recording and uploads everything once it is back.' },
      { title: 'A record you can export', body: 'Daily minimum, average and maximum for every sensor, with CSV export for your own logs.' },
    ],
    note: 'VexaOs records and alerts on conditions. It does not replace your food safety plan, and it holds no food safety certification.',
  },
  {
    slug: 'warehouses-logistics',
    name: 'Warehouses & logistics',
    short: 'Warehouses',
    icon: 'warehouse',
    primary: true,
    headline: 'Every storage zone and dock door, on one screen.',
    summary:
      'Temperature and humidity across storage zones, and a full record of when doors open and for how long, across every building you run.',
    monitor: [
      { title: 'Storage zones', body: 'Temperature and humidity by location, with each site, room and piece of equipment named the way you name it.' },
      { title: 'Dock and cold-room doors', body: 'Opens today, longest open and a timeline of every event, plus a flag for openings at unusual hours.' },
      { title: 'Goods in transit', body: 'A battery-powered gateway for vehicles and trailers.', status: 'soon' },
    ],
    how: [
      { title: 'Many sites, one account', body: 'Switch between locations or see them together. People only see the sites they belong to.' },
      { title: 'Compare zones', body: 'Put sensors side by side in Analytics to find the zone that runs warm or damp.' },
      { title: 'Know when equipment goes quiet', body: 'A sensor that stops reporting, a low battery or a weak signal each raise their own finding.' },
    ],
    note: 'In-transit monitoring depends on the Mobile Gateway, which is not available yet.',
  },
  {
    slug: 'manufacturing-machine-health',
    name: 'Manufacturing & machine health',
    short: 'Manufacturing',
    icon: 'factory',
    primary: true,
    headline: 'Watch the conditions around your machines today. Vibration is next.',
    summary:
      'Monitor the temperature and humidity of production areas, electrical rooms and enclosures now. Vibration monitoring for rotating equipment is in development.',
    monitor: [
      { title: 'Production and storage areas', body: 'Temperature and humidity where materials and finished goods are sensitive to either.' },
      { title: 'Enclosures and equipment rooms', body: 'Heat building up in a cabinet or room shows as a drift finding long before a fixed limit is crossed.' },
      { title: 'Vibration on rotating equipment', body: 'Velocity, displacement and frequency on three axes, summarized at the gateway.', status: 'development' },
    ],
    how: [
      { title: 'Drift, not just limits', body: 'A steady rise over six hours is flagged even when the reading is still inside its allowed range.' },
      { title: 'Rules checked on site', body: 'Alarm rules run on the gateway, so an alarm is raised even when the cloud is unreachable.' },
      { title: 'Built to add sensor types', body: 'Each sensor type is an adapter. New ones are added without changing the gateway, cloud or apps around them.' },
    ],
    note: 'Vibration and machine-health monitoring is in development and is not available today. We will tell you where it stands when you get in touch.',
  },
  {
    slug: 'facilities-property',
    name: 'Facilities & property',
    short: 'Facilities',
    icon: 'building',
    primary: false,
    headline: 'Keep an eye on the rooms nobody is standing in.',
    summary:
      'Plant rooms, server closets, storage units and vacant spaces: temperature, humidity and doors, across a portfolio of buildings.',
    monitor: [
      { title: 'Plant and server rooms', body: 'Rising temperature is flagged as a trend, with a forecast when a limit is set.' },
      { title: 'Damp and humidity', body: 'Temperature and humidity rising together is called out as its own finding.' },
      { title: 'Doors and access points', body: 'A record of every opening, with a flag for activity at hours that are normally quiet.' },
    ],
    how: [
      { title: 'Organized like your portfolio', body: 'Sites, locations within a site, and equipment, with sensors placed against each.' },
      { title: 'Roles for staff and contractors', body: 'Owner, admin, installer and viewer roles decide who can change rules and who can only look.' },
      { title: 'Gateway health included', body: 'Each gateway reports its own power, network and uptime, so you know the monitor is working.' },
    ],
    note: 'VexaOs monitors conditions. It is not a security or access control system.',
  },
  {
    slug: 'healthcare-pharma-storage',
    name: 'Healthcare & pharma storage',
    short: 'Healthcare & pharma',
    icon: 'health',
    primary: false,
    headline: 'Continuous temperature records for the fridges that matter.',
    summary:
      'Continuous temperature and humidity monitoring for medicine fridges, freezers and storage rooms, with alerts and a history you can export.',
    monitor: [
      { title: 'Medicine fridges and freezers', body: 'Readings around the clock, with alert rules you set per sensor.' },
      { title: 'Storage rooms', body: 'Room temperature and humidity with daily minimum, average and maximum.' },
      { title: 'Fridge and room doors', body: 'Every opening recorded, with a flag when a door is left open.' },
    ],
    how: [
      { title: 'Early warning', body: 'The forecast shows the hours left before a limit is reached at the current rate of change.' },
      { title: 'No gaps from an outage', body: 'The gateway stores readings locally and uploads them once the connection returns.' },
      { title: 'Acknowledge and resolve', body: 'Alerts keep a history of who acknowledged and resolved them, and when.' },
    ],
    note: 'VexaOs is a monitoring tool. It is not a medical device and holds no regulatory validation or certification (for example 21 CFR Part 11 or GxP). Check your own compliance requirements before relying on it for regulated records.',
  },
];

export const INDUSTRIES_BY_SLUG = Object.fromEntries(INDUSTRIES.map((i) => [i.slug, i]));
export const industryHref = (slug: string) => `/solutions/${slug}`;

export const RESTAURANT_OS = {
  href: '/solutions/restaurant-os',
  name: 'Restaurant OS',
  summary:
    'A separate VexaOs Hospitality solution for running a restaurant: owner control center, floor, kitchen display and orders. Approaching pilot.',
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  href: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items?: NavLink[];
}

export const MAIN_NAV: NavGroup[] = [
  { label: 'Platform', href: '/platform' },
  {
    label: 'Products',
    href: '/products',
    items: PRODUCTS.map((p) => ({
      href: productHref(p.slug),
      label: p.short,
      description: p.summary,
      badge: p.status === 'available' ? undefined : STATUS_LABEL[p.status],
    })),
  },
  {
    label: 'Solutions',
    href: '/solutions',
    items: [
      ...INDUSTRIES.map((i) => ({ href: industryHref(i.slug), label: i.name })),
      { href: RESTAURANT_OS.href, label: RESTAURANT_OS.name, description: 'Hospitality solution' },
    ],
  },
  { label: 'About', href: '/about' },
];

export const NAV_CTA = { label: 'Book a demo', href: '/contact' } as const;

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Platform',
    links: [
      { href: '/platform', label: 'How it works' },
      ...PRODUCTS.map((p) => ({ href: productHref(p.slug), label: p.short })),
    ],
  },
  {
    title: 'Solutions',
    links: [
      ...INDUSTRIES.map((i) => ({ href: industryHref(i.slug), label: i.short })),
      { href: RESTAURANT_OS.href, label: RESTAURANT_OS.name },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Book a demo' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export const OG_IMAGES = [
  { url: '/opengraph-image', width: 1200, height: 630, alt: 'VexaOs: monitor anything, anywhere.' },
];
