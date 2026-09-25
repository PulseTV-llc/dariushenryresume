/**
 * PUBLIC SALES POSITIONING — site-wide navigation and brand language.
 *
 * VexaOS is sold as a custom business operating system: the client describes
 * how their business runs, and VexaOS designs the system around it. The
 * reusable modules underneath (ShyftGrid, TouchBoard, Commerce Ops, VexaFront,
 * Inventory Ops, Facility Ops, Inspections) live in lib/vexaos.ts as INTERNAL
 * architecture and surface publicly only as "proven technology underneath".
 *
 * Keep the two separate: marketing content here, module catalog there.
 */

export { APP_URL, SITE_URL, CONTACT_EMAIL } from '@/lib/vexaos';

export interface NavLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items?: NavLink[];
  /** Optional "see all" link rendered under a dropdown. */
  footer?: NavLink;
}

export const MAIN_NAV: NavGroup[] = [
  { label: 'Restaurant OS', href: '/restaurants' },
  {
    label: 'Solutions',
    href: '/solutions',
    items: [
      { href: '/solutions', label: 'Custom Business OS', description: 'One connected system, designed around your operation' },
      { href: '/solutions#workforce', label: 'Workforce Systems', description: 'Scheduling, attendance, labor and payroll intelligence' },
      { href: '/solutions#commerce', label: 'Commerce Systems', description: 'POS, ordering, payments, loyalty and reservations' },
      { href: '/solutions#customer-experience', label: 'Customer Experience', description: 'Customer apps, portals, kiosks and self-service' },
      { href: '/solutions#facility-operations', label: 'Facility Operations', description: 'Inspections, audits, sensors and compliance' },
      { href: '/solutions#connected-hardware', label: 'Connected Hardware', description: 'Terminals, TouchBoards, NFC/RFID and QR' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    items: [
      { href: '/industries/restaurant', label: 'Restaurants & Cafés' },
      { href: '/industries/hospitality', label: 'Hospitality' },
      { href: '/industries/cleaning-facility-services', label: 'Facility Services' },
      { href: '/industries/retail', label: 'Retail' },
      { href: '/industries/multi-site', label: 'Multi-Site Operations' },
    ],
    footer: { href: '/industries', label: 'All industries' },
  },
  {
    label: 'Platform',
    href: '/platform',
    items: [
      { href: '/platform#architecture', label: 'Architecture', description: 'The layers every VexaOS build inherits' },
      { href: '/platform#security', label: 'Security', description: 'Governed access, audit trails, isolation' },
      { href: '/platform#integrations', label: 'Integrations', description: 'APIs, payments, webhooks, existing tools' },
      { href: '/platform#devices', label: 'Devices', description: 'Registry, kiosks, boards and field hardware' },
    ],
  },
  {
    label: 'Systems',
    href: '/systems',
    items: [
      { href: '/systems/restaurant-os', label: 'Restaurant OS' },
      { href: '/systems/facility-os', label: 'Facility OS' },
      { href: '/systems/workforce-os', label: 'Workforce OS' },
      { href: '/systems/retail-os', label: 'Retail OS' },
    ],
    footer: { href: '/systems', label: 'All systems & case studies' },
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'About',
    href: '/about',
    items: [
      { href: '/about', label: 'Company' },
      { href: '/about/founder', label: 'Founder' },
      { href: '/how-it-works', label: 'Process' },
    ],
  },
];

export const NAV_CTA = { label: 'Request a Demo', href: '/demo' } as const;

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Solutions',
    links: [
      { href: '/solutions', label: 'Custom Business OS' },
      { href: '/solutions#workforce', label: 'Workforce Systems' },
      { href: '/solutions#commerce', label: 'Commerce Systems' },
      { href: '/solutions#customer-experience', label: 'Customer Experience' },
      { href: '/solutions#facility-operations', label: 'Facility Operations' },
      { href: '/solutions#connected-hardware', label: 'Connected Hardware' },
    ],
  },
  {
    title: 'Systems',
    links: [
      { href: '/systems', label: 'All systems' },
      { href: '/systems/restaurant-os', label: 'Restaurant OS' },
      { href: '/systems/facility-os', label: 'Facility OS' },
      { href: '/systems/workforce-os', label: 'Workforce OS' },
      { href: '/case-studies', label: 'Case studies' },
      { href: '/industries', label: 'Industries' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { href: '/platform', label: 'Platform overview' },
      { href: '/platform#architecture', label: 'Architecture' },
      { href: '/platform#modules', label: 'Proven modules' },
      { href: '/hardware', label: 'Connected hardware' },
      { href: '/platform/modules/touchboard/demo', label: 'TouchBoard demo' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About VexaOS' },
      { href: '/about/founder', label: 'Founder' },
      { href: '/how-it-works', label: 'Process' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/blueprint', label: 'Business Blueprint' },
      { href: '/blog', label: 'Insights' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

/** Channels VexaOS builds across — used as hero microcopy. */
export const BUILD_SURFACES = ['Web', 'iOS', 'Android', 'Workforce', 'Commerce', 'Inventory', 'AI', 'Hardware'];

/**
 * Default social image (app/opengraph-image.tsx). Pages that declare their own
 * `openGraph` replace the inherited object, so they must re-attach it.
 */
export const OG_IMAGES = [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'VexaOS — Custom business operating systems' }];
