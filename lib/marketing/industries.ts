/**
 * Industries — data for the /industries index and the reusable
 * /industries/[slug] landing-page template.
 *
 * Adding an industry page = adding an entry here. Slugs from the previous
 * vertical model (restaurant, salon, retail, gym, auto-service, hospitality,
 * healthcare, field-service) are preserved so existing URLs keep working.
 */

export interface IndustrySurface {
  /** Application or area of the system, e.g. "Kitchen". */
  title: string;
  platform: string;
  detail: string;
}

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  /** Card and hero one-liner. */
  summary: string;
  /** SEO title fragment, e.g. "Custom restaurant management software". */
  seoTitle: string;
  seoDescription: string;
  /** Who we build for inside this industry. */
  operators: string[];
  challenges: { title: string; detail: string }[];
  /** The applications and areas a VexaOS system typically includes. */
  surfaces: IndustrySurface[];
  /** Capability chips grouped for the architecture section. */
  capabilities: string[];
  /** Flagship system slug to feature, if one fits. */
  system?: string;
  /** Visible in the homepage grid (all are routable). */
  featured: boolean;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'restaurant',
    name: 'Restaurants & Cafés',
    icon: 'UtensilsCrossed',
    summary: 'Front of house, kitchen, workforce, inventory, and financials on one multi-location system.',
    seoTitle: 'Custom Restaurant Management Software & Restaurant OS Development',
    seoDescription:
      'VexaOS designs and builds custom restaurant operating systems — POS, waiter apps, kitchen display, scheduling, inventory, recipe costing, online ordering, and owner analytics — for restaurant and café groups.',
    operators: ['Restaurant groups', 'Café groups', 'Quick service', 'Bars & bakeries'],
    challenges: [
      { title: 'Four vendors, no single truth', detail: 'POS, scheduling, inventory, and reservations each hold part of the story.' },
      { title: 'Food cost is a guess', detail: 'Costing comes from invoices, not from what actually sold and was wasted.' },
      { title: 'Labor surprises', detail: 'Overtime and labor percentage show up at payroll, after the money is spent.' },
      { title: 'Location-by-location blind spots', detail: 'Owners reconcile sites in spreadsheets instead of seeing them live.' },
    ],
    surfaces: [
      { title: 'Owner', platform: 'Web control center', detail: 'Sales, labor, food cost, and exceptions across every location.' },
      { title: 'Waiter', platform: 'Android app', detail: 'Tables, orders, modifiers, and payment at the table.' },
      { title: 'Kitchen', platform: 'Kitchen display', detail: 'Tickets by station and state, timed from fire to served.' },
      { title: 'Inventory', platform: 'Web + mobile', detail: 'Stock, vendors, purchasing, waste, and recipe costing.' },
      { title: 'Workforce', platform: 'Employee app + wall board', detail: 'Schedules, clock-in, tips, and labor cost live.' },
      { title: 'Financials', platform: 'Control center', detail: 'Daily P&L, tenders, tips, and margin by location.' },
      { title: 'Customer experience', platform: 'Web + kiosk', detail: 'Online ordering, QR order-and-pay, reservations, loyalty.' },
      { title: 'Multi-location', platform: 'Organization model', detail: 'Brands, locations, roles, and rollups defined once.' },
    ],
    capabilities: ['POS', 'Kitchen display', 'Table management', 'Reservations', 'Online ordering', 'Recipe costing', 'Inventory', 'Purchasing', 'Scheduling', 'Tips & payroll tracking', 'Loyalty', 'Audit logs'],
    system: 'restaurant-os',
    featured: true,
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    icon: 'BedDouble',
    summary: 'Guest services, housekeeping, departments, and supplies coordinated across properties.',
    seoTitle: 'Custom Hotel & Hospitality Operations Software',
    seoDescription:
      'Custom hospitality operating systems for hotels and hospitality groups — guest self-service, housekeeping coordination, departmental scheduling, inspections, and supply control on one platform.',
    operators: ['Hotels', 'Boutique hotel groups', 'Serviced apartments', 'Resorts'],
    challenges: [
      { title: 'Front desk as the catch-all', detail: 'Every routine request lands on the busiest people in the building.' },
      { title: 'Housekeeping on paper', detail: 'Room status and assignments tracked on printed sheets.' },
      { title: 'Departments in silos', detail: 'Housekeeping, F&B, and maintenance schedule in isolation.' },
      { title: 'Supplies counted by hand', detail: 'Amenity and linen stock known only after it runs out.' },
    ],
    surfaces: [
      { title: 'Property control center', platform: 'Web', detail: 'Rooms, departments, tasks, and exceptions across properties.' },
      { title: 'Housekeeping app', platform: 'Mobile', detail: 'Assignments, room status, inspections, and issues.' },
      { title: 'Guest self-service', platform: 'Kiosk + web', detail: 'Check-in, requests, amenity ordering, and wayfinding.' },
      { title: 'Staff boards', platform: 'Wall display', detail: 'Department status, shifts, and announcements back of house.' },
    ],
    capabilities: ['Guest requests', 'Housekeeping', 'Inspections', 'Departmental scheduling', 'Maintenance work orders', 'Supply tracking', 'F&B ordering'],
    system: 'restaurant-os',
    featured: true,
  },
  {
    slug: 'cleaning-facility-services',
    name: 'Cleaning & Facility Services',
    icon: 'SprayCan',
    summary: 'Dispatch, crews, inspections, photo evidence, and client reporting across every site.',
    seoTitle: 'Custom Cleaning & Facility Services Management Software',
    seoDescription:
      'Custom operating systems for commercial cleaning and facility-services companies — crew dispatch, checklists, inspections with photo evidence, client portals, and multi-site reporting.',
    operators: ['Commercial cleaning companies', 'Janitorial contractors', 'Facility-services firms', 'Inspection teams'],
    challenges: [
      { title: 'Proof of work', detail: 'Clients ask what was done; the answer lives in a supervisor’s memory.' },
      { title: 'Dispatch by text', detail: 'Crews, sites, and changes coordinated across group chats.' },
      { title: 'Quality drift', detail: 'Inspections are sporadic and scores never reach the client.' },
      { title: 'Time theft and no-shows', detail: 'On-site attendance cannot be verified.' },
    ],
    surfaces: [
      { title: 'Operations center', platform: 'Web', detail: 'Sites, crews, schedules, inspections, and alerts.' },
      { title: 'Crew app', platform: 'Mobile', detail: 'Assignments, checklists, photo proof, and verified clock-in.' },
      { title: 'Client portal', platform: 'Web', detail: 'Service history, inspection scores, and requests.' },
      { title: 'Supervisor inspections', platform: 'Mobile', detail: 'Scored rounds with evidence and follow-up tasks.' },
    ],
    capabilities: ['Dispatch', 'Checklists', 'Photo evidence', 'Inspections & scores', 'Verified clock-in', 'Client portal', 'Supply tracking', 'Invoicing data'],
    system: 'facility-os',
    featured: true,
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: 'ShoppingBag',
    summary: 'One catalog across floor, kiosk, and online, with stock and staffing that stay honest.',
    seoTitle: 'Custom Retail Operations & POS Software Development',
    seoDescription:
      'Custom retail operating systems — POS, inventory, transfers, workforce scheduling, kiosks, and loyalty on one catalog and one customer record across every store.',
    operators: ['Retail groups', 'Specialty retail', 'Franchise retail', 'Multi-brand operators'],
    challenges: [
      { title: 'Channel mismatch', detail: 'Online and in-store availability disagree.' },
      { title: 'Pricing gaps', detail: 'A price change misses one channel or one store.' },
      { title: 'Late shrinkage', detail: 'Variance discovered at year-end rather than in-month.' },
      { title: 'Staffing blind to traffic', detail: 'Schedules built without sales patterns.' },
    ],
    surfaces: [
      { title: 'Retail control center', platform: 'Web', detail: 'Sales, stock, labor, and margin by store.' },
      { title: 'Store POS', platform: 'Tablet', detail: 'Checkout, returns, customer lookup, and loyalty.' },
      { title: 'Stock app', platform: 'Android', detail: 'Receiving, counts, transfers, and barcode scanning.' },
      { title: 'Customer kiosk', platform: 'Kiosk', detail: 'Product lookup, endless aisle, and self-checkout.' },
    ],
    capabilities: ['POS', 'Payments', 'Inventory', 'Transfers', 'Purchasing', 'Loyalty', 'Scheduling', 'Labor vs sales'],
    system: 'retail-os',
    featured: true,
  },
  {
    slug: 'salon',
    name: 'Salons & Barbershops',
    icon: 'Scissors',
    summary: 'Booking, check-in, client records, POS, commission, and retail stock together.',
    seoTitle: 'Custom Salon & Barbershop Management Software',
    seoDescription:
      'Custom salon and barbershop systems — online booking, check-in kiosks, client history, POS, commission tracking, and retail inventory in one connected platform.',
    operators: ['Salon groups', 'Barbershops', 'Beauty studios', 'Spa chains'],
    challenges: [
      { title: 'Front desk bottleneck', detail: 'Walk-ins wait while the desk answers the phone.' },
      { title: 'Client history in personal notes', detail: 'Preferences leave when a stylist does.' },
      { title: 'Commission by hand', detail: 'Provider pay reconciled in spreadsheets.' },
      { title: 'Untrusted retail counts', detail: 'Product stock never matches the shelf.' },
    ],
    surfaces: [
      { title: 'Owner dashboard', platform: 'Web', detail: 'Bookings, revenue per provider, and retail margin.' },
      { title: 'Client app', platform: 'iOS + Android', detail: 'Booking, reminders, history, and payments.' },
      { title: 'Check-in kiosk', platform: 'Kiosk', detail: 'Walk-in check-in, provider choice, and waitlist.' },
      { title: 'Staff app', platform: 'Mobile', detail: 'Schedule, client notes, and commission.' },
    ],
    capabilities: ['Online booking', 'Check-in', 'Client records', 'POS', 'Commission', 'Retail inventory', 'Loyalty'],
    system: 'service-business-os',
    featured: true,
  },
  {
    slug: 'gym',
    name: 'Gyms & Fitness',
    icon: 'Dumbbell',
    summary: 'Member check-in, class booking, trainer schedules, and retail on one platform.',
    seoTitle: 'Custom Gym & Fitness Studio Management Software',
    seoDescription:
      'Custom gym and fitness systems — member check-in, class and trainer booking, memberships, staff scheduling, and retail on one connected platform.',
    operators: ['Gym groups', 'Boutique studios', 'Fitness franchises', 'Sports facilities'],
    challenges: [
      { title: 'Peak-hour check-in queues', detail: 'Front desks overwhelmed at 6am and 6pm.' },
      { title: 'Booking separate from membership', detail: 'Two systems for the same member.' },
      { title: 'Trainer schedules over text', detail: 'Availability and coverage managed informally.' },
      { title: 'Untracked retail', detail: 'Supplements and merch sold without stock control.' },
    ],
    surfaces: [
      { title: 'Club control center', platform: 'Web', detail: 'Members, classes, staff, and revenue by location.' },
      { title: 'Member app', platform: 'iOS + Android', detail: 'Bookings, check-in QR, and account.' },
      { title: 'Entry kiosk', platform: 'Kiosk + NFC/QR', detail: 'Self check-in and guest registration.' },
      { title: 'Trainer app', platform: 'Mobile', detail: 'Sessions, clients, and schedule.' },
    ],
    capabilities: ['Memberships', 'Class booking', 'Check-in', 'NFC/QR access', 'Trainer scheduling', 'POS', 'Retail inventory'],
    system: 'service-business-os',
    featured: true,
  },
  {
    slug: 'auto-service',
    name: 'Auto Service',
    icon: 'Wrench',
    summary: 'Service intake, parts, technician time, and customer status updates connected.',
    seoTitle: 'Custom Auto Service & Repair Shop Management Software',
    seoDescription:
      'Custom auto service systems — digital intake, parts inventory, technician time tracking, job status displays, and customer updates across service locations.',
    operators: ['Auto service groups', 'Collision centers', 'Tire & lube chains', 'Fleet maintenance'],
    challenges: [
      { title: 'Paper intake', detail: 'Vehicle details written down, then typed in again.' },
      { title: 'Parts uncertainty', detail: 'Availability confirmed by walking to the back.' },
      { title: 'Technician time estimated', detail: 'Hours reconstructed at invoicing.' },
      { title: 'Status calls', detail: 'Customers phoning to ask if the car is ready.' },
    ],
    surfaces: [
      { title: 'Service control center', platform: 'Web', detail: 'Jobs, bays, technicians, and parts by location.' },
      { title: 'Intake kiosk', platform: 'Kiosk', detail: 'Vehicle details, approvals, and signatures.' },
      { title: 'Technician app', platform: 'Tablet', detail: 'Job cards, time tracking, and inspection photos.' },
      { title: 'Customer updates', platform: 'SMS + web', detail: 'Status, approvals, and pickup notifications.' },
    ],
    capabilities: ['Digital intake', 'Job cards', 'Parts inventory', 'Technician time', 'Status displays', 'Customer notifications', 'POS'],
    featured: true,
  },
  {
    slug: 'property-management',
    name: 'Property Management',
    icon: 'Building',
    summary: 'Work orders, inspections, vendors, and resident communication across portfolios.',
    seoTitle: 'Custom Property Management Operations Software',
    seoDescription:
      'Custom property management operating systems — maintenance work orders, unit inspections, vendor coordination, resident portals, and portfolio reporting.',
    operators: ['Residential portfolios', 'Commercial property managers', 'HOA management', 'Student housing'],
    challenges: [
      { title: 'Work orders lost in email', detail: 'Requests, vendors, and completion tracked by inbox.' },
      { title: 'Inspections without evidence', detail: 'Move-in and move-out condition disputed.' },
      { title: 'Vendor accountability', detail: 'No record of when a vendor arrived or finished.' },
      { title: 'Portfolio visibility', detail: 'Each property reported on differently.' },
    ],
    surfaces: [
      { title: 'Portfolio control center', platform: 'Web', detail: 'Properties, units, work orders, and SLAs.' },
      { title: 'Maintenance app', platform: 'Mobile', detail: 'Assignments, photos, parts, and sign-off.' },
      { title: 'Resident portal', platform: 'Web + mobile', detail: 'Requests, notices, and status.' },
      { title: 'Vendor access', platform: 'Web', detail: 'Assigned jobs, check-in, and completion proof.' },
    ],
    capabilities: ['Work orders', 'Unit inspections', 'Vendor management', 'Resident portal', 'Access & QR', 'Sensors', 'Portfolio reporting'],
    system: 'facility-os',
    featured: true,
  },
  {
    slug: 'healthcare',
    name: 'Clinics & Med Spas',
    icon: 'Stethoscope',
    summary: 'Patient check-in, intake, provider scheduling, and consumables tracking.',
    seoTitle: 'Custom Clinic & Med Spa Operations Software',
    seoDescription:
      'Custom clinic and med spa systems — patient check-in, digital intake, provider scheduling, room utilization, consumable inventory, and multi-location reporting.',
    operators: ['Clinic groups', 'Med spas', 'Dental groups', 'Physical therapy'],
    challenges: [
      { title: 'Clipboard intake', detail: 'Forms filled on paper and typed in twice.' },
      { title: 'Provider schedules disconnected', detail: 'Booking and staffing live in different tools.' },
      { title: 'Reactive consumables ordering', detail: 'Supplies noticed only when they run out.' },
      { title: 'Room utilization unknown', detail: 'No single view of the day across rooms.' },
    ],
    surfaces: [
      { title: 'Clinic control center', platform: 'Web', detail: 'Appointments, providers, rooms, and revenue.' },
      { title: 'Check-in kiosk', platform: 'Kiosk', detail: 'Arrival, intake forms, and consent signatures.' },
      { title: 'Staff board', platform: 'Wall display', detail: 'Room status and the day’s schedule.' },
      { title: 'Patient app', platform: 'Mobile', detail: 'Booking, reminders, and forms.' },
    ],
    capabilities: ['Check-in', 'Digital intake', 'Provider scheduling', 'Room status', 'Consumable inventory', 'POS', 'Reporting'],
    system: 'service-business-os',
    featured: true,
  },
  {
    slug: 'warehousing',
    name: 'Warehousing',
    icon: 'Warehouse',
    summary: 'Receiving, stock movement, shifts, and floor visibility for distribution teams.',
    seoTitle: 'Custom Warehouse Operations & Workforce Software',
    seoDescription:
      'Custom warehouse systems — barcode receiving, stock movement, shift scheduling, verified attendance, large-format floor boards, and safety inspections.',
    operators: ['Distribution centers', '3PL operators', 'Wholesale', 'Light manufacturing'],
    challenges: [
      { title: 'Stock location uncertainty', detail: 'Movements recorded late or not at all.' },
      { title: 'Shift coverage gaps', detail: 'Absences discovered at the start of the shift.' },
      { title: 'Floor visibility', detail: 'Teams cannot see targets or status.' },
      { title: 'Safety checks on paper', detail: 'Equipment inspections impossible to audit.' },
    ],
    surfaces: [
      { title: 'Operations center', platform: 'Web', detail: 'Inbound, outbound, stock, and labor by shift.' },
      { title: 'Scanner app', platform: 'Android', detail: 'Receiving, picks, moves, and counts.' },
      { title: 'Floor boards', platform: 'Large-format display', detail: 'Staffing, targets, and alerts.' },
      { title: 'Employee app', platform: 'Mobile', detail: 'Shifts, swaps, and clock-in.' },
    ],
    capabilities: ['Barcode scanning', 'Receiving', 'Stock movement', 'Shift scheduling', 'Attendance', 'Safety inspections', 'Floor displays'],
    system: 'workforce-os',
    featured: true,
  },
  {
    slug: 'field-service',
    name: 'Field Service',
    icon: 'Truck',
    summary: 'Dispatch, crews, van stock, time at the job, and proof of work.',
    seoTitle: 'Custom Field Service Management Software',
    seoDescription:
      'Custom field service systems — dispatch, crew scheduling, mobile job completion with photos and signatures, van stock, and time tracking at the job.',
    operators: ['HVAC & plumbing', 'Electrical contractors', 'Pest control', 'Installation crews'],
    challenges: [
      { title: 'Dispatch by phone', detail: 'Crews routed through calls and texts.' },
      { title: 'Van stock unknown', detail: 'Missing parts discovered on the job.' },
      { title: 'Friday timesheets', detail: 'Hours reconstructed from memory.' },
      { title: 'No proof of completion', detail: 'Disputes with nothing to show.' },
    ],
    surfaces: [
      { title: 'Dispatch center', platform: 'Web', detail: 'Jobs, crews, routes, and status.' },
      { title: 'Technician app', platform: 'Mobile', detail: 'Job details, photos, signatures, and time.' },
      { title: 'Customer updates', platform: 'SMS + web', detail: 'Arrival windows and completion reports.' },
      { title: 'Stock tracking', platform: 'Mobile', detail: 'Van and depot inventory.' },
    ],
    capabilities: ['Dispatch', 'Crew scheduling', 'Job completion', 'Photo & signature capture', 'Van stock', 'Time tracking', 'Customer notifications'],
    system: 'facility-os',
    featured: true,
  },
  {
    slug: 'multi-site',
    name: 'Franchise & Multi-Site Operations',
    icon: 'Network',
    summary: 'Standards, reporting, and control across locations, brands, and franchisees.',
    seoTitle: 'Multi-Location Business Software & Franchise Operations Systems',
    seoDescription:
      'Custom multi-location business software for franchise operators and multi-site groups — shared standards, location rollups, delegated roles, inspections, and unified reporting.',
    operators: ['Franchise operators', 'Multi-brand groups', 'Regional chains', 'Multi-site service companies'],
    challenges: [
      { title: 'Every site does it differently', detail: 'Standards drift location by location.' },
      { title: 'Reporting by spreadsheet', detail: 'Rollups assembled manually each week.' },
      { title: 'Access sprawl', detail: 'Regional and site managers with the wrong permissions.' },
      { title: 'Tool sprawl', detail: 'Each location adds its own apps.' },
    ],
    surfaces: [
      { title: 'Executive control center', platform: 'Web', detail: 'Every location, brand, and region in one view.' },
      { title: 'Location manager app', platform: 'Web + mobile', detail: 'Site operations within delegated permissions.' },
      { title: 'Standards & inspections', platform: 'Mobile', detail: 'Brand audits with scores and follow-up.' },
      { title: 'Location devices', platform: 'Kiosks + boards', detail: 'Enrolled and managed centrally.' },
    ],
    capabilities: ['Organization hierarchy', 'Delegated roles', 'Location rollups', 'Brand standards', 'Inspections', 'Device fleet', 'Unified reporting'],
    system: 'workforce-os',
    featured: true,
  },
];

export const INDUSTRIES_BY_SLUG: Record<string, Industry> = Object.fromEntries(INDUSTRIES.map((i) => [i.slug, i]));
