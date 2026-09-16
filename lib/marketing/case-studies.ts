import type { ScreenKey } from '@/lib/screens';

/**
 * Case studies.
 *
 * NEVER present an internal project or platform demonstration as an outside
 * client. `engagement` drives the badge on every card and page:
 *   client        — a paying outside organization (none published yet)
 *   internal      — VexaOS-built software in an internal deployment
 *   platform      — VexaOS's own technology platform
 *   demonstration — a reference system built to demonstrate capability
 *
 * `results` must be real and verifiable. Leave it empty rather than estimate.
 */

export type Engagement = 'client' | 'internal' | 'platform' | 'demonstration';

export const ENGAGEMENT_LABEL: Record<Engagement, string> = {
  client: 'Client engagement',
  internal: 'Internal deployment',
  platform: 'VexaOS technology platform',
  demonstration: 'Platform demonstration',
};

export interface CaseStudyImage {
  /** A key from lib/screens.ts, or an explicit public image. */
  screen?: ScreenKey;
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption: string;
  /** True for concept renders — always captioned as such. */
  concept?: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  label: string;
  engagement: Engagement;
  industry: string;
  summary: string;
  problem: string[];
  system: string;
  applications: { name: string; platform: string; detail: string; status?: string }[];
  technology: string[];
  /** Verified outcomes only. Empty array renders an honest "not yet published" state. */
  results: string[];
  resultsNote?: string;
  images: CaseStudyImage[];
  relatedSystem?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'shyftgrid',
    title: 'ShyftGrid',
    label: 'Workforce Technology Platform',
    engagement: 'platform',
    industry: 'Multi-location workforce operations',
    summary:
      'The workforce system that became the reusable VexaOS foundation: a manager control center, employee mobile experience, and Android wall boards on one real-time backend.',
    problem: [
      'Schedules, shift swaps, and time off coordinated across disconnected tools and group chats',
      'No live view of who was on the floor, or what open shifts still needed coverage',
      'Front-line staff without a shared, glanceable picture of the shift',
    ],
    system:
      'One connected workforce system: managers schedule and approve from a web control center, employees work from their phones, and wall-mounted TouchBoards show live staffing and QR clock-in — every surface reading the same records, every board enrolled and switched remotely through a device registry.',
    applications: [
      { name: 'Manager control center', platform: 'Web', detail: 'Scheduling, approvals, open shifts, and labor across locations.' },
      { name: 'Employee experience', platform: 'Mobile', detail: 'Shifts, swaps, open-shift claims, and verified clock-in.' },
      { name: 'TouchBoard', platform: 'Android app', detail: 'Native wall display with remotely controlled device modes.' },
      { name: 'Device registry', platform: 'Web', detail: 'Pairing, location assignment, and mode switching per board.' },
    ],
    technology: ['Custom web platform', 'Native Android', 'Real-time cloud backend', 'Secure database'],
    results: [],
    resultsNote:
      'ShyftGrid is VexaOS’s own platform, not a client engagement. Its architecture — identity, organization model, device registry — is what every VexaOS build now inherits.',
    images: [
      { screen: 'shyftgridSchedule', caption: 'A published week in the manager control center.' },
      { screen: 'touchBoard', caption: 'The native TouchBoard wall display.' },
      { screen: 'deviceFleet', caption: 'The device registry controlling a fleet of boards.' },
    ],
    relatedSystem: 'workforce-os',
  },
  {
    slug: 'restaurant-os',
    title: 'VexaOS Restaurant OS',
    label: 'Platform Demonstration',
    engagement: 'demonstration',
    industry: 'Restaurants & cafés',
    summary:
      'A complete restaurant and café operating system — owner control center, Android waiter and kitchen apps, team app, and guest ordering — built as the reusable hospitality template VexaOS customizes for clients.',
    problem: [
      'Hospitality operators running POS, kitchen, scheduling, inventory, and reservations from separate vendors',
      'Food and labor cost measured after the fact rather than during service',
      'Multi-location groups without a single live view of the business',
    ],
    system:
      'A multi-tenant hospitality system on one database with row-level security: every screen in the control center reads live orders, labor, inventory, purchasing, reservations, and financials, while native Android apps handle the table and the kitchen line.',
    applications: [
      { name: 'Owner control center', platform: 'Web app', detail: 'Dashboard, orders, kitchen, workforce, payroll, tips, menu, recipes, inventory, purchasing, financials, compliance, devices.', status: 'Running on live data' },
      { name: 'Waiter app', platform: 'Android app', detail: 'Tables, orders, and payments at the table.', status: 'In development' },
      { name: 'Kitchen display', platform: 'Android app', detail: 'Station tickets and bump-to-served.', status: 'In development' },
      { name: 'Team app', platform: 'Mobile app', detail: 'Schedules, clock-in, and tips for staff.', status: 'In development' },
      { name: 'Guest ordering', platform: 'Web app', detail: 'Online ordering and reservations.', status: 'Planned' },
    ],
    technology: ['Custom web platform', 'Native Android apps', 'Cross-platform app', 'Multi-tenant database', 'Row-level security'],
    results: [],
    resultsNote:
      'This is a platform demonstration, not a client deployment. Client results will be published here when there are real ones to report.',
    images: [
      {
        src: '/blog/ember-and-oak-vexaos.jpg',
        width: 1600,
        height: 900,
        alt: 'Concept visualization of a café running a connected system: a self-order kiosk, a kitchen orders display, a counter POS, and QR order-and-pay at the table.',
        caption: 'Concept visualization of the guest, counter, and kitchen surfaces — not a client photo.',
        concept: true,
      },
    ],
    relatedSystem: 'restaurant-os',
  },
  {
    slug: 'auddix',
    title: 'Auddix Facility Operations',
    label: 'Internal Deployment',
    engagement: 'internal',
    industry: 'Commercial cleaning & facility services',
    summary:
      'A connected platform for a commercial-cleaning business: public booking site, customer portal, admin and dispatch platform, and a shared mobile app for cleaners and customers.',
    problem: [
      'Bookings, dispatch, and customer communication handled across separate tools',
      'No shared, real-time record between office staff, cleaners in the field, and customers',
      'Pricing and job state rules applied inconsistently',
    ],
    system:
      'A monorepo platform where web, mobile, and backend share one business-logic package — pricing engine, job state machines, and permissions — so the booking site, the admin platform, and the field app enforce the same rules in real time.',
    applications: [
      { name: 'Marketing & booking site', platform: 'Web app', detail: 'Service information and online booking.' },
      { name: 'Customer portal', platform: 'Web', detail: 'Bookings, history, and account.' },
      { name: 'Admin & dispatch platform', platform: 'Web', detail: 'Jobs, crews, scheduling, and operations.' },
      { name: 'Cleaner & customer app', platform: 'Mobile app', detail: 'Field workflow for cleaners and a customer experience in one app.' },
    ],
    technology: ['Custom web platform', 'Cross-platform app', 'Real-time cloud backend', 'Integrated payments'],
    results: [],
    resultsNote:
      'An internal VexaOS deployment, not an outside client engagement. Outcomes will be published once measured in production.',
    images: [],
    relatedSystem: 'facility-os',
  },
];

export const CASE_STUDIES_BY_SLUG: Record<string, CaseStudy> = Object.fromEntries(CASE_STUDIES.map((c) => [c.slug, c]));
