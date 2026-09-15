/**
 * Engagement pricing for custom business systems.
 *
 * These are STARTING POINTS for scoped projects, not a price list. Every
 * system is quoted individually after discovery or a Business Blueprint.
 * Recurring fees are "Managed Platform & Support" — never "subscription".
 *
 * The legacy per-location SaaS price book (bundles, standalone modules, device
 * software) remains in lib/vexaos.ts as internal product strategy and is not
 * rendered publicly.
 */

export interface EngagementTier {
  key: string;
  name: string;
  /** Starting build fee in whole USD. */
  from: number;
  /** Starting managed platform & support fee in whole USD per month, if any. */
  monthlyFrom?: number;
  /** Short qualifier on the build fee, e.g. "one-time". */
  unit: string;
  summary: string;
  bestFor: string;
  includes: string[];
  examples: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
}

export const ENGAGEMENT_TIERS: EngagementTier[] = [
  {
    key: 'blueprint',
    name: 'Business Blueprint',
    from: 750,
    unit: 'one-time',
    summary: 'A documented design of your operating system before major development begins.',
    bestFor: 'Any organization that wants a clear scope, architecture, and budget range first.',
    includes: [
      'Discovery sessions with owners and operators',
      'Workflow and system map',
      'Recommended applications and architecture',
      'Implementation roadmap and scope estimate',
    ],
    examples: ['Deciding what to connect, automate, rebuild, or replace'],
    cta: { label: 'Start a Blueprint', href: '/contact?intent=blueprint' },
  },
  {
    key: 'launch',
    name: 'Launch System',
    from: 4500,
    monthlyFrom: 299,
    unit: 'build',
    summary: 'A focused system solving one core operation, built on the VexaOS platform.',
    bestFor: 'A single workflow that is costing time or money right now.',
    includes: [
      'One or two connected applications',
      'Identity, roles, and permissions',
      'Core integrations and data import',
      'Deployment and onboarding',
    ],
    examples: ['Employee app with verified clock-in + manager dashboard', 'Customer check-in kiosk + control center'],
    cta: { label: 'Discuss a Launch System', href: '/contact?intent=build&tier=launch' },
  },
  {
    key: 'growth',
    name: 'Growth System',
    from: 12500,
    monthlyFrom: 750,
    unit: 'build',
    summary: 'Multiple connected applications running across teams and locations.',
    bestFor: 'Multi-location operators replacing several disconnected tools.',
    includes: [
      'Web control center plus mobile and device apps',
      'Multi-location organization model',
      'Workflow automation and reporting',
      'Hardware and device enrollment',
    ],
    examples: ['Workforce + inventory + customer app across several sites'],
    cta: { label: 'Discuss a Growth System', href: '/contact?intent=build&tier=growth' },
  },
  {
    key: 'custom-os',
    name: 'Custom Business OS',
    from: 25000,
    monthlyFrom: 1500,
    unit: 'build',
    summary: 'A complete operating system across web, mobile, hardware, data, and integrations.',
    bestFor: 'Operationally complex organizations ready to run on one system.',
    includes: [
      'Full application ecosystem — owner to front line',
      'Commerce, workforce, inventory, and operations',
      'Custom integrations, migration, and analytics',
      'Phased rollout with managed platform operations',
    ],
    examples: ['Restaurant group OS: POS, kitchen, waiter, workforce, inventory, financials'],
    cta: { label: 'Design my Business OS', href: '/contact?intent=build&tier=custom-os' },
    highlight: true,
  },
];

export const PRICING_FACTORS = [
  'Scope',
  'Number of applications',
  'Locations',
  'Users',
  'Devices',
  'Integrations',
  'Data migration',
  'Hardware',
  'Infrastructure',
  'Security requirements',
  'Support level',
];

export const MANAGED_PLATFORM_INCLUDES = [
  'Hosting and managed VexaOS infrastructure',
  'Monitoring and incident response',
  'Security maintenance and platform updates',
  'Device and application support',
  'Ongoing improvements on a planned cadence',
];

export const INTERNATIONAL_PRICING =
  'VexaOS works with organizations worldwide. Project pricing reflects system scope, deployment requirements, integrations, infrastructure, support requirements, and local market considerations.';

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: 'Are these fixed prices?',
    a: 'No. They are starting points that show where typical engagements begin. Every business system is scoped individually, and you receive a written estimate before any build work is agreed.',
  },
  {
    q: 'What is Managed Platform & Support?',
    a: 'The recurring fee that keeps your system running: hosting and managed VexaOS infrastructure, monitoring, security maintenance, updates, device and application support, and ongoing improvements. It scales with the size of the system — applications, locations, devices, and support level.',
  },
  {
    q: 'Why start with a Business Blueprint?',
    a: 'Because the most expensive mistake in custom software is building the wrong thing. The Blueprint documents your workflows, requirements, architecture, phases, and budget range, so the build decision is made with a clear picture.',
  },
  {
    q: 'Can we start small and expand?',
    a: 'Yes. Many systems begin with one workflow and grow application by application. Because every build runs on the same VexaOS platform, later phases extend the system rather than replacing it.',
  },
  {
    q: 'Is hardware included?',
    a: 'Hardware is scoped with the system. Kiosks, wall boards, tablets, readers, and sensors can be specified, supplied, and enrolled as part of deployment.',
  },
  {
    q: 'Do you work with organizations outside the United States?',
    a: INTERNATIONAL_PRICING,
  },
];

/* -------------------------------------------------------------- */
/* The Business Blueprint                                         */
/* -------------------------------------------------------------- */

export const BLUEPRINT_DOCUMENTS = [
  'Current workflows',
  'Pain points',
  'Roles',
  'Locations',
  'Devices',
  'Data',
  'Integrations',
  'System requirements',
  'Application architecture',
  'Technical architecture',
  'Build phases',
  'Timeline',
  'Budget range',
];

export const BLUEPRINT_DELIVERABLES: { title: string; detail: string; icon: string }[] = [
  { title: 'System map', detail: 'Every application, data flow, and connection in one diagram.', icon: 'Network' },
  { title: 'Workflow map', detail: 'How work moves today, and how it should move in the new system.', icon: 'Workflow' },
  { title: 'Feature architecture', detail: 'Capabilities organized by application, role, and phase.', icon: 'LayoutGrid' },
  { title: 'Recommended applications', detail: 'Which web, mobile, and device apps the operation actually needs.', icon: 'AppWindow' },
  { title: 'Infrastructure plan', detail: 'Data, hosting, security, devices, and integration approach.', icon: 'Server' },
  { title: 'Implementation roadmap', detail: 'Phases, milestones, and what launches first.', icon: 'Milestone' },
  { title: 'Scope estimate', detail: 'A budget range and timeline for the build decision.', icon: 'Calculator' },
];
