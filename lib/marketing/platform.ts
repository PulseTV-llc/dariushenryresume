/**
 * The reusable architecture underneath every VexaOS build. Publicly this is
 * the "we're not starting from zero" story; the modules themselves are
 * catalogued in lib/vexaos.ts (PRODUCTS).
 */

export interface PlatformLayer {
  key: string;
  title: string;
  icon: string;
  items: string[];
  detail: string;
}

export const PLATFORM_LAYERS: PlatformLayer[] = [
  {
    key: 'identity',
    title: 'Identity',
    icon: 'Fingerprint',
    items: ['Authentication', 'SSO-ready architecture', 'User profiles'],
    detail: 'Every employee, manager, and customer exists once, with one login across every application.',
  },
  {
    key: 'organizations',
    title: 'Organizations',
    icon: 'Building2',
    items: ['Companies', 'Locations', 'Departments', 'Teams'],
    detail: 'Multi-location and multi-brand hierarchies defined once and respected everywhere.',
  },
  {
    key: 'access',
    title: 'Access',
    icon: 'ShieldCheck',
    items: ['Roles', 'Permissions', 'Policy enforcement'],
    detail: 'A shift lead sees what a shift lead should — enforced at the data layer, not just the screen.',
  },
  {
    key: 'data',
    title: 'Data',
    icon: 'Database',
    items: ['Unified data model', 'Realtime data', 'Reporting'],
    detail: 'People, orders, stock, and devices in one model, updated live on every surface.',
  },
  {
    key: 'devices',
    title: 'Devices',
    icon: 'Cpu',
    items: ['Device registry', 'Kiosks', 'NFC/RFID', 'Tablets', 'Hardware'],
    detail: 'Pair a device, assign a location and a mode, and manage it remotely from then on.',
  },
  {
    key: 'communication',
    title: 'Communication',
    icon: 'BellRing',
    items: ['Notifications', 'Alerts', 'Messaging'],
    detail: 'The right person hears about the right event — on the phone, the board, or the dashboard.',
  },
  {
    key: 'integrations',
    title: 'Integrations',
    icon: 'Plug',
    items: ['APIs', 'Payments', 'External systems', 'Webhooks'],
    detail: 'Open at the edges: payroll, accounting, payments, and the tools you already rely on.',
  },
  {
    key: 'intelligence',
    title: 'Intelligence',
    icon: 'BrainCircuit',
    items: ['Analytics', 'AI', 'Automation', 'Forecasting'],
    detail: 'Reporting, automation, and AI built on the same records — not a separate warehouse.',
  },
];

/** Nodes in the homepage "one connected operating system" diagram. */
export const SYSTEM_NODES: { label: string; icon: string; detail: string }[] = [
  { label: 'Employees', icon: 'Users', detail: 'Schedules, time, roles' },
  { label: 'Customers', icon: 'UserRound', detail: 'Accounts, history, loyalty' },
  { label: 'Locations', icon: 'MapPin', detail: 'Sites, regions, brands' },
  { label: 'Devices', icon: 'Cpu', detail: 'Kiosks, boards, readers' },
  { label: 'Inventory', icon: 'Boxes', detail: 'Stock, vendors, cost' },
  { label: 'Orders', icon: 'Receipt', detail: 'Every channel, one queue' },
  { label: 'Payments', icon: 'CreditCard', detail: 'Tenders, tips, payouts' },
  { label: 'Operations', icon: 'ClipboardCheck', detail: 'Tasks, inspections, SLAs' },
  { label: 'Analytics', icon: 'LineChart', detail: 'Labor, revenue, margin' },
  { label: 'Automation', icon: 'Workflow', detail: 'Rules, alerts, approvals' },
];

export interface ProcessStep {
  step: string;
  title: string;
  detail: string;
  output: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    detail: 'We learn how the company currently operates — locations, roles, tools, exceptions, and where work falls through the cracks.',
    output: 'Operational context',
  },
  {
    step: '02',
    title: 'Business Blueprint',
    detail: 'We map processes, workflows, roles, systems, integrations, hardware, and requirements into one documented picture.',
    output: 'System map & scope',
  },
  {
    step: '03',
    title: 'System Architecture',
    detail: 'We define how the operating system should work: applications, data model, permissions, devices, and integrations.',
    output: 'Technical architecture',
  },
  {
    step: '04',
    title: 'Prototype',
    detail: 'We validate the major workflows and user experience with the people who will use them before full build.',
    output: 'Validated workflows',
  },
  {
    step: '05',
    title: 'Build',
    detail: 'Web, mobile, backend, integrations, and infrastructure — built on the VexaOS platform in reviewed phases.',
    output: 'Working software',
  },
  {
    step: '06',
    title: 'Deployment',
    detail: 'Launch, data migration, hardware setup, onboarding, and training for managers and staff.',
    output: 'Live system',
  },
  {
    step: '07',
    title: 'Managed Platform Support',
    detail: 'Monitoring, updates, support, security maintenance, infrastructure, and ongoing improvements.',
    output: 'A system that keeps improving',
  },
];
