/**
 * Option sets for the system intake form.
 *
 * Imported by a client component — keep this file free of large data imports
 * (industry names are listed here rather than derived from industries.ts).
 */

export type IntakeIntent = 'build' | 'blueprint' | 'walkthrough';

export const INTENT_OPTIONS: { value: IntakeIntent; label: string; detail: string }[] = [
  { value: 'blueprint', label: 'Start with a Business Blueprint', detail: 'A documented system design, scope, and budget range first.' },
  { value: 'build', label: 'Discuss building a system', detail: 'Talk through what to connect, automate, rebuild, or replace.' },
  { value: 'walkthrough', label: 'See a system walkthrough', detail: 'A guided look at a working VexaOS system.' },
];

export const INDUSTRY_OPTIONS = [
  'Restaurants & Cafés',
  'Hospitality',
  'Cleaning & Facility Services',
  'Retail',
  'Salons & Barbershops',
  'Gyms & Fitness',
  'Auto Service',
  'Property Management',
  'Clinics & Med Spas',
  'Warehousing',
  'Field Service',
  'Franchise & Multi-Site Operations',
  'Other',
];

export const LOCATION_OPTIONS = ['1 location', '2–5 locations', '6–20 locations', '21–50 locations', '50+ locations'];

export const EMPLOYEE_OPTIONS = ['1–10', '11–50', '51–200', '201–500', '500+'];

export const REPLACE_OPTIONS = [
  'Scheduling / time clock',
  'POS',
  'Inventory',
  'Spreadsheets',
  'CRM',
  'Booking / reservations',
  'Group chats / messaging',
  'Reporting',
  'Paper checklists',
];

export const BUILD_TARGET_OPTIONS = [
  'Web control center',
  'Employee app',
  'Customer app',
  'POS / ordering',
  'Scheduling & time',
  'Inventory',
  'CRM / loyalty',
  'Kiosks / touchscreens',
  'Inspections / facility',
  'AI & automation',
  'Integrations',
  'Not sure yet',
];

export const WEB_SYSTEM_OPTIONS = [
  'Owner / executive control center',
  'Manager dashboard',
  'Customer portal',
  'Online ordering / booking',
  'Admin & reporting',
  'Internal tools',
];

export const MOBILE_APP_OPTIONS = ['Employee app', 'Manager app', 'Customer app', 'Field / crew app', 'POS / waiter app', 'Not sure yet'];

export const MOBILE_PLATFORM_OPTIONS = ['iOS', 'Android', 'Both', 'Not sure'];

export const DEVICE_OPTIONS = [
  'Tablets',
  'Kiosks',
  'Wall displays',
  'Kitchen displays',
  'NFC / RFID',
  'QR / barcode scanners',
  'Printers',
  'Sensors / IoT',
  'None yet',
];

export const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $30,000',
  '$30,000 – $75,000',
  '$75,000 – $150,000',
  '$150,000+',
  'Not sure yet',
];

export const TIMELINE_OPTIONS = ['As soon as possible', 'Within 3 months', '3–6 months', '6–12 months', 'Exploring options'];

/** Industry slug (as used in /industries/[slug] and ?industry=) → option label. */
export const INDUSTRY_SLUG_TO_NAME: Record<string, string> = {
  restaurant: 'Restaurants & Cafés',
  hospitality: 'Hospitality',
  'cleaning-facility-services': 'Cleaning & Facility Services',
  retail: 'Retail',
  salon: 'Salons & Barbershops',
  gym: 'Gyms & Fitness',
  'auto-service': 'Auto Service',
  'property-management': 'Property Management',
  healthcare: 'Clinics & Med Spas',
  warehousing: 'Warehousing',
  'field-service': 'Field Service',
  'multi-site': 'Franchise & Multi-Site Operations',
};
