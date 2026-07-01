// Private AI Workflow Systems — tier definitions and estimator logic.
// Edit this file to update pricing tiers, node counts, Mac Studio specs, or
// estimator adjustment notes. The pricing UI, the intake estimator, and
// the /api/ai-estimate route all read from these exports.
//
// Tiers are anchored on the Mac Studio class used in each AI node. Pricing is
// two-track:
//   • Services setup (build, integration, training)
//   • Hardware estimate (BOM range — client procures or we coordinate)
// Plus monthly support.

export type UserBucket =
  | '1-5'
  | '6-15'
  | '16-30'
  | '31-50'
  | '51-75'
  | '76-100'
  | '101-150'
  | '151-250'
  | '250+';

export type DocumentBucket =
  | 'under-500'
  | '500-2500'
  | '2500-10000'
  | '10000-50000'
  | '50000+';

export interface AiSystemTier {
  id: UserBucket;
  label: string;
  users: string;
  nodes: number | 'Custom';
  gpuSpec: string;
  setupRange: string;
  hardwareRange: string;
  monthly: string;
  bestFor: string;
  highlight?: boolean;
}

export const aiSystemTiers: AiSystemTier[] = [
  {
    id: '1-5',
    label: 'Starter Private AI',
    users: '1–5',
    nodes: 1,
    gpuSpec: 'Mac Studio M4 Max (64GB unified memory)',
    setupRange: '$4,500–$7,500',
    hardwareRange: '$5,000–$9,000',
    monthly: '$750/mo',
    bestFor: 'Owner, solo office, small leadership team',
  },
  {
    id: '6-15',
    label: 'Small Team AI',
    users: '6–15',
    nodes: 2,
    gpuSpec: 'Mac Studio M4 Max (128GB unified memory)',
    setupRange: '$9,500–$15,000',
    hardwareRange: '$12,000–$22,000',
    monthly: '$1,500/mo',
    bestFor: 'Small business team, law office, real estate team, dental office',
  },
  {
    id: '16-30',
    label: 'Department AI',
    users: '16–30',
    nodes: 3,
    gpuSpec: 'Mac Studio M3 Ultra (96GB unified memory)',
    setupRange: '$17,500–$27,500',
    hardwareRange: '$25,000–$45,000',
    monthly: '$2,500/mo',
    bestFor: 'Department, growing agency, property management team',
    highlight: true,
  },
  {
    id: '31-50',
    label: 'Business AI Cluster',
    users: '31–50',
    nodes: 4,
    gpuSpec: 'Mac Studio M3 Ultra (256GB unified memory)',
    setupRange: '$30,000–$45,000',
    hardwareRange: '$50,000–$85,000',
    monthly: '$3,500/mo',
    bestFor: 'Medium-size business or multi-department office',
  },
  {
    id: '51-75',
    label: 'Advanced Business AI',
    users: '51–75',
    nodes: 5,
    gpuSpec: 'Mac Studio M3 Ultra (256GB unified memory) · dual-node',
    setupRange: '$45,000–$65,000',
    hardwareRange: '$80,000–$130,000',
    monthly: '$5,000/mo',
    bestFor: 'Larger company or franchise group',
  },
  {
    id: '76-100',
    label: 'Enterprise AI Cluster',
    users: '76–100',
    nodes: 6,
    gpuSpec: 'Mac Studio M3 Ultra (512GB unified memory)',
    setupRange: '$65,000–$90,000',
    hardwareRange: '$130,000–$220,000',
    monthly: '$7,500/mo',
    bestFor: 'Multi-location company or regional business',
  },
  {
    id: '101-150',
    label: 'Large Enterprise AI',
    users: '101–150',
    nodes: 7,
    gpuSpec: 'Mac Studio M3 Ultra (512GB unified memory) · dual-node',
    setupRange: '$90,000–$125,000',
    hardwareRange: '$220,000–$350,000',
    monthly: '$10,000/mo',
    bestFor: 'Large company, heavy AI usage, high document volume',
  },
  {
    id: '151-250',
    label: 'Full Private AI Infrastructure',
    users: '151–250',
    nodes: 8,
    gpuSpec: 'Mac Studio M3 Ultra (512GB unified memory) · multi-node cluster',
    setupRange: '$125,000–$175,000+',
    hardwareRange: '$350,000–$550,000',
    monthly: '$12,500–$15,000/mo',
    bestFor: 'Enterprise, franchise group, regional operation, high-security business',
  },
  {
    id: '250+',
    label: 'Custom Enterprise Architecture',
    users: '250+',
    nodes: 'Custom',
    gpuSpec: 'Mac Studio M3 Ultra cluster (multi-node, custom)',
    setupRange: 'Custom quote',
    hardwareRange: 'Custom quote',
    monthly: 'Custom support agreement',
    bestFor: 'Multi-region enterprise, regulated industry, or high-volume document operations',
  },
];

export function findTier(userBucket: UserBucket | undefined | null): AiSystemTier {
  return aiSystemTiers.find((t) => t.id === userBucket) ?? aiSystemTiers[0];
}

export interface EstimateInput {
  userBucket?: UserBucket;
  documentBucket?: DocumentBucket;
  sensitive?: 'no' | 'somewhat' | 'highly';
  roleBased?: 'yes' | 'no' | 'not-sure';
  deployment?: 'local' | 'hybrid' | 'not-sure';
  integrations?: string[];
  workflowGoals?: string[];
  documentTypes?: string[];
}

export interface EstimateResultData {
  tier: AiSystemTier;
  nodes: number | 'Custom';
  gpuSpec: string;
  setupRange: string;
  hardwareRange: string;
  monthly: string;
  notes: string[];
  systemHandles: string[];
}

const documentVolumeNote: Record<DocumentBucket, string | null> = {
  'under-500': null,
  '500-2500': null,
  '2500-10000': null,
  '10000-50000':
    'Your system may require expanded storage, stronger indexing, and additional document-ingestion planning.',
  '50000+':
    'Your document volume may require a dedicated ingestion pipeline, structured tagging, OCR workflow, and custom search architecture.',
};

export function buildEstimate(input: EstimateInput): EstimateResultData {
  const tier = findTier(input.userBucket);
  const notes: string[] = [];

  const volumeNote = input.documentBucket ? documentVolumeNote[input.documentBucket] : null;
  if (volumeNote) notes.push(volumeNote);

  if (input.sensitive === 'highly') {
    notes.push(
      'Recommended: on-prem Mac Studio node deployment, role-based access, audit controls, encrypted backups, and stricter admin permissions.'
    );
  }

  if (input.roleBased === 'yes') {
    notes.push(
      'Role-based user permissions should be included so staff only access approved business knowledge.'
    );
  }

  const goals = input.workflowGoals ?? [];
  if (goals.includes('client-chatbot')) {
    notes.push(
      'Client-facing chatbot requires additional guardrails, approval workflows, and website integration.'
    );
  }

  if ((input.integrations ?? []).length >= 4) {
    notes.push(
      'Multiple integrations may increase setup scope and require API planning.'
    );
  }

  const docTypes = input.documentTypes ?? [];
  if (docTypes.includes('scanned')) {
    notes.push(
      'OCR scanning and document cleanup should be added to the ingestion workflow.'
    );
  }

  if (input.deployment === 'local' && tier.id !== '250+') {
    notes.push(
      'On-prem Mac Studio nodes keep sensitive files inside the office and give the business a visible private AI infrastructure asset.'
    );
  }

  const systemHandles = deriveSystemHandles(input);

  return {
    tier,
    nodes: tier.nodes,
    gpuSpec: tier.gpuSpec,
    setupRange: tier.setupRange,
    hardwareRange: tier.hardwareRange,
    monthly: tier.monthly,
    notes,
    systemHandles,
  };
}

function deriveSystemHandles(input: EstimateInput): string[] {
  const out: string[] = ['Private document search across uploaded company files'];
  const goals = new Set(input.workflowGoals ?? []);

  if (goals.has('document-search')) out.push('Natural-language Q&A over company files');
  if (goals.has('customer-replies')) out.push('Drafted customer service replies in your tone');
  if (goals.has('lead-followup')) out.push('Lead follow-up drafts and outreach templates');
  if (goals.has('contract-summary')) out.push('Contract summarization in plain English');
  if (goals.has('staff-training')) out.push('Staff training and onboarding assistant');
  if (goals.has('internal-faq')) out.push('Internal FAQ system for staff questions');
  if (goals.has('sales-scripts')) out.push('Sales scripts and call talk-tracks');
  if (goals.has('document-org')) out.push('Document organization and tagging');
  if (goals.has('report-gen')) out.push('Report generation from internal data');
  if (goals.has('email-drafting')) out.push('Email drafting with company voice');
  if (goals.has('social-content')) out.push('Social media and content drafts');
  if (goals.has('invoice-extract')) out.push('Invoice and document data extraction');
  if (goals.has('client-chatbot')) out.push('Client-facing chatbot with guardrails');
  if (goals.has('voice-transcription')) out.push('Voice and meeting transcription');

  out.push('Dedicated Mac Studio AI node deployment, sized to your team');

  return out;
}
