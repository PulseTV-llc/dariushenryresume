/** Pure display and decision rules for the fleet admin (tested in logic.test.ts). The database decides; these only explain. */
import type { Health, Lifecycle, Permission, TargetStatus, UnitRow, UpdateState, CommandType } from './types';

export const HEALTH_LABEL: Record<Health, string> = { ONLINE: 'Online', OFFLINE: 'Offline', DEGRADED: 'Degraded', UNKNOWN: 'Not reporting' };
export const HEALTH_TONE: Record<Health, string> = {
  ONLINE: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  OFFLINE: 'bg-rose-50 text-rose-800 ring-rose-200',
  DEGRADED: 'bg-amber-50 text-amber-900 ring-amber-200',
  UNKNOWN: 'bg-slate-100 text-slate-700 ring-slate-200',
};
export const LIFECYCLE_LABEL: Record<Lifecycle, string> = {
  INVENTORY: 'Inventory', PROVISIONING: 'Provisioning', READY: 'Ready', ASSIGNED: 'Assigned', SHIPPED: 'Shipped',
  ACTIVATED: 'Activated', MAINTENANCE: 'Maintenance', SUSPENDED: 'Suspended', RETIRED: 'Retired',
};
export const UPDATE_LABEL: Record<UpdateState, string> = {
  IDLE: 'Up to date', PENDING: 'Update waiting', UPDATING: 'Updating', FAILED: 'Update failed', ROLLED_BACK: 'Rolled back',
};
export const TARGET_LABEL: Record<TargetStatus, string> = {
  PENDING: 'Pending', QUEUED: 'Queued', AWAITING_DEVICE: 'Waiting for gateway', DOWNLOADING: 'Downloading', VERIFYING: 'Verifying',
  INSTALLING: 'Installing', RESTARTING: 'Restarting', HEALTH_CHECKING: 'Health check', SUCCEEDED: 'Succeeded', FAILED: 'Failed',
  ROLLBACK_PENDING: 'Rollback pending', ROLLING_BACK: 'Rolling back', ROLLED_BACK: 'Rolled back', CANCELLED: 'Cancelled',
};
export const TARGET_DONE: TargetStatus[] = ['SUCCEEDED', 'FAILED', 'ROLLED_BACK', 'CANCELLED'];
/** Steps during which a gateway must not be interrupted (cancel leaves these to finish). */
export const TARGET_CRITICAL: TargetStatus[] = ['INSTALLING', 'RESTARTING', 'HEALTH_CHECKING', 'ROLLING_BACK', 'ROLLBACK_PENDING'];

export function targetTone(s: TargetStatus): string {
  if (s === 'SUCCEEDED') return 'bg-emerald-50 text-emerald-800 ring-emerald-200';
  if (s === 'FAILED' || s === 'ROLLED_BACK') return 'bg-rose-50 text-rose-800 ring-rose-200';
  if (s === 'CANCELLED' || s === 'PENDING') return 'bg-slate-100 text-slate-700 ring-slate-200';
  return 'bg-blue-50 text-blue-800 ring-blue-200';
}

/** "just now", "5 min ago", "3 h ago", "2 days ago"; null -> "never". */
export function ago(iso: string | null | undefined, now: number = Date.now()): string {
  if (!iso) return 'never';
  const s = Math.round((now - Date.parse(iso)) / 1000);
  if (!Number.isFinite(s)) return '—';
  if (s < 0) return 'just now';
  if (s < 45) return 'just now';
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  const d = Math.round(s / 86400);
  return `${d} day${d === 1 ? '' : 's'} ago`;
}

export function when(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export const can = (perms: readonly Permission[] | undefined, p: Permission) => !!perms?.includes(p);

/** Lifecycle actions offered for a unit (the database re-checks every one). */
export type UnitAction = 'assign' | 'unassign' | 'ship' | 'activate' | 'maintenance' | 'end_maintenance' | 'suspend' | 'resume'
  | 'transfer' | 'retire' | 'provision_token';
export function unitActions(u: Pick<UnitRow, 'lifecycle' | 'gateway_id' | 'site_id'>, perms: readonly Permission[]): UnitAction[] {
  const out: UnitAction[] = [];
  const L = u.lifecycle;
  if (L === 'RETIRED') return out;
  if (can(perms, 'register') && (L === 'INVENTORY' || L === 'PROVISIONING')) out.push('provision_token');
  if (can(perms, 'assign')) {
    if (L === 'READY' || L === 'ASSIGNED' || L === 'SHIPPED') out.push('assign');
    if ((L === 'ASSIGNED' || L === 'SHIPPED') && u.site_id) out.push('unassign');
    if (L === 'ASSIGNED') out.push('ship');
    if ((L === 'READY' || L === 'ASSIGNED' || L === 'SHIPPED') && u.gateway_id && u.site_id) out.push('activate');
  }
  if (can(perms, 'remote_action')) {
    if (L === 'MAINTENANCE') out.push('end_maintenance');
    else if (L !== 'SUSPENDED') out.push('maintenance');
  }
  if (can(perms, 'manage_credentials')) {
    if (L === 'ACTIVATED') out.push('suspend');
    if (L === 'SUSPENDED') out.push('resume');
    if (L !== 'INVENTORY' || u.gateway_id) out.push('transfer');
    out.push('retire');
  }
  return out;
}

export const COMMAND_LABEL: Record<CommandType, string> = {
  restart_app: 'Restart VexaOs services', restart_agent: 'Restart the fleet agent', reboot: 'Reboot',
  check_update: 'Check for updates', collect_diagnostics: 'Collect diagnostics',
};
/** What each remote action costs the customer, shown in the confirm dialog. */
export const COMMAND_WARNING: Partial<Record<CommandType, string>> = {
  restart_app: 'Sensor readings pause for about 10–30 seconds. Readings taken meanwhile are queued on the gateway and sent afterwards.',
  restart_agent: 'Fleet monitoring of this gateway pauses for about a minute. Customer data is not affected.',
  reboot: 'The gateway is offline for about 1–2 minutes. Customer readings stop meanwhile; sensors that store readings send them later, others leave a gap.',
};
/** Commands a gateway's installed agent says it supports, intersected with what the person may do. */
export function availableCommands(capabilities: readonly string[], perms: readonly Permission[], lifecycle: Lifecycle): CommandType[] {
  if (lifecycle === 'RETIRED' || lifecycle === 'SUSPENDED') return [];
  const out: CommandType[] = [];
  const cap = new Set(capabilities);
  if (can(perms, 'diagnostics')) {
    if (cap.has('check_update')) out.push('check_update');
    if (cap.has('collect_diagnostics')) out.push('collect_diagnostics');
  }
  if (can(perms, 'remote_action')) {
    for (const c of ['restart_app', 'restart_agent', 'reboot'] as const) if (cap.has(c)) out.push(c);
  }
  return out;
}

/** Inventory filters <-> URL search params (so a filtered view can be bookmarked and shared). */
export interface InventoryFilter {
  q?: string; health?: string; lifecycle?: string; unassigned?: boolean; model?: string; version?: string;
  organization_id?: string; country?: string; update_state?: string; group_id?: string; simulated?: 'exclude' | 'include' | 'only';
}
const FILTER_KEYS = ['q', 'health', 'lifecycle', 'model', 'version', 'organization_id', 'country', 'update_state', 'group_id', 'simulated'] as const;
export function filterFromParams(p: URLSearchParams): InventoryFilter {
  const f: InventoryFilter = {};
  for (const k of FILTER_KEYS) { const v = p.get(k); if (v) (f as Record<string, string>)[k] = v; }
  if (p.get('unassigned') === '1') f.unassigned = true;
  return f;
}
export function filterToParams(f: InventoryFilter): URLSearchParams {
  const p = new URLSearchParams();
  for (const k of FILTER_KEYS) { const v = f[k]; if (v) p.set(k, String(v)); }
  if (f.unassigned) p.set('unassigned', '1');
  return p;
}

/** Whole-number percentage, never NaN. */
export const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0);

/** Semantic version compare (major.minor.patch with optional -pre). -1, 0, 1. */
export function semverCompare(a: string, b: string): number {
  const parse = (v: string) => {
    const m = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(v.trim());
    return m ? { n: [Number(m[1]), Number(m[2]), Number(m[3])], pre: m[4] ?? null } : null;
  };
  const x = parse(a), y = parse(b);
  if (!x || !y) return a < b ? -1 : a > b ? 1 : 0;
  for (let i = 0; i < 3; i++) if (x.n[i] !== y.n[i]) return x.n[i]! < y.n[i]! ? -1 : 1;
  if (x.pre === y.pre) return 0;
  if (x.pre === null) return 1;
  if (y.pre === null) return -1;
  return x.pre < y.pre ? -1 : 1;
}
export const isSemver = (v: string) => /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(v.trim());
