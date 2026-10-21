/** Shapes returned by public.fleet_* (platform repository: supabase/migrations/2026111*_fleet_*.sql). */

export type Role = 'super_admin' | 'fleet_admin' | 'fleet_technician' | 'fleet_viewer';
export type Permission = 'view' | 'register' | 'assign' | 'diagnostics' | 'remote_action' | 'pause' | 'create_release'
  | 'approve_release' | 'deploy' | 'manage_credentials' | 'manage_staff';
export interface FleetMe { email: string; role: Role; permissions: Permission[] }

export type Lifecycle = 'INVENTORY' | 'PROVISIONING' | 'READY' | 'ASSIGNED' | 'SHIPPED' | 'ACTIVATED' | 'MAINTENANCE' | 'SUSPENDED' | 'RETIRED';
export type Health = 'ONLINE' | 'OFFLINE' | 'DEGRADED' | 'UNKNOWN';
export type UpdateState = 'IDLE' | 'PENDING' | 'UPDATING' | 'FAILED' | 'ROLLED_BACK';
export type Channel = 'DEVELOPMENT' | 'BETA' | 'STABLE';

export interface UnitRow {
  id: string; serial: string; gateway_id: string | null; name: string | null; model: string; hardware_family: string;
  hardware_revision: string | null; lifecycle: Lifecycle; health: Health; health_reasons: string[];
  organization_id: string | null; organization_name: string | null; site_id: string | null; site_name: string | null;
  country: string | null; timezone: string | null; app_version: string | null; agent_version: string | null; os_version: string | null;
  update_state: UpdateState; update_channel: Channel; last_contact_at: string | null; last_heartbeat_at: string | null;
  app_last_seen: string | null; sensor_count: number | null; is_simulated: boolean; batch: string | null; created_at: string;
}
export interface Page<T> { total: number; limit: number; offset: number; rows: T[] }

export interface Bucket { key: string; count: number }
export interface Overview {
  counts: { total: number; online: number; offline: number; degraded: number; unknown: number; unassigned: number;
            needs_update: number; updating: number; failed_updates: number; sensors: number };
  by_lifecycle: Partial<Record<Lifecycle, number>>;
  by_model: Bucket[]; by_country: Bucket[]; by_version: Bucket[];
  recent_activations: { id: string; serial: string; organization_name: string | null; site_name: string | null; activated_at: string }[];
  connectivity_alerts: AlertRow[];
  failed_deployments: { id: string; name: string; version: string; failed: number; at: string }[];
  successful_updates: { unit_id: string; serial: string; version: string; at: string }[];
  online_trend: { at: string; total: number; online: number; offline: number; degraded: number }[];
  simulated_units: number; generated_at: string;
}

export interface FilterOptions {
  models: string[]; versions: string[]; countries: string[];
  organizations: { id: string; name: string }[]; groups: { id: string; name: string }[];
}
export interface Customer { id: string; name: string; status: string; sites: { id: string; name: string; timezone: string | null }[] }

export type CommandType = 'restart_app' | 'restart_agent' | 'reboot' | 'check_update' | 'collect_diagnostics';
export type CommandStatus = 'QUEUED' | 'DELIVERED' | 'ACKNOWLEDGED' | 'SUCCEEDED' | 'FAILED' | 'EXPIRED' | 'CANCELLED' | 'REJECTED';
export interface CommandRow {
  id: string; type: CommandType; status: CommandStatus; issued_by_email: string | null; created_at: string; expires_at: string;
  delivered_at: string | null; acked_at: string | null; completed_at: string | null; result: Record<string, unknown> | null; error: string | null;
}

export type AlertKind = 'offline' | 'update_failures' | 'storage_low' | 'service_down' | 'temperature_high' | 'memory_high' | 'maintenance' | 'lorawan_down';
export interface AlertRow {
  id: string; unit_id: string; serial: string; kind: AlertKind; severity: 'info' | 'warning' | 'critical';
  status: 'open' | 'acknowledged' | 'resolved'; message: string; opened_at: string; last_seen_at: string; occurrences: number;
  acknowledged_by_email: string | null; acknowledged_at: string | null; resolved_at: string | null; resolved_by_email: string | null;
  organization_name?: string | null;
}

export type TargetStatus = 'PENDING' | 'QUEUED' | 'AWAITING_DEVICE' | 'DOWNLOADING' | 'VERIFYING' | 'INSTALLING' | 'RESTARTING'
  | 'HEALTH_CHECKING' | 'SUCCEEDED' | 'FAILED' | 'ROLLBACK_PENDING' | 'ROLLING_BACK' | 'ROLLED_BACK' | 'CANCELLED';
export type DeploymentStatus = 'SCHEDULED' | 'RUNNING' | 'PAUSED' | 'HALTED' | 'COMPLETED' | 'CANCELLED';
export type ReleaseCategory = 'app' | 'agent' | 'os' | 'bootloader' | 'peripheral';
export type ReleaseStatus = 'DRAFT' | 'VERIFIED' | 'APPROVED' | 'REVOKED';

export interface ReleaseRow {
  id: string; category: ReleaseCategory; version: string; name: string; notes: string | null; hardware_family: string;
  min_hardware_revision: string | null; supported_os: string[]; min_agent_version: string | null; channel: Channel;
  status: ReleaseStatus; artifact_path: string | null; artifact_size: number | null; sha256: string | null; signing_key_id: string | null;
  signature: string | null; verified_at: string | null; verify_error: string | null; approved_at: string | null; approved_by_email: string | null;
  created_at: string; created_by_email: string | null; release_date: string | null; deployments: number;
}
export interface SigningKey { key_id: string; name: string; public_key: string; created_at: string; revoked_at: string | null }

export interface DeploymentRow {
  id: string; name: string; release_id: string; version: string; category: ReleaseCategory; status: DeploymentStatus;
  strategy: Strategy; start_at: string | null; created_at: string; created_by_email: string | null; halted_reason: string | null;
  counts: Partial<Record<TargetStatus, number>>; total: number; window: MaintenanceWindow | null;
}
export interface Strategy { type: 'all' | 'canary' | 'percentage'; canary_count?: number; wave_percent?: number; wave_interval_min?: number; max_failure_rate?: number }
export interface MaintenanceWindow { start_hour: number; end_hour: number }
export interface TargetRow {
  id: string; unit_id: string; serial: string; status: TargetStatus; wave: number; from_version: string | null; progress: number | null;
  error: string | null; updated_at: string; organization_name: string | null; attempts: number;
}
export interface DeploymentSpec {
  release_id: string; unit_ids?: string[]; group_ids?: string[]; channel?: Channel | null; organization_id?: string | null;
  strategy: Strategy; start_at?: string | null; window?: MaintenanceWindow | null; allow_downgrade?: boolean; name?: string;
}
export interface DeploymentPreview {
  release: { id: string; version: string; category: ReleaseCategory; status: ReleaseStatus; channel: Channel };
  selected: number; compatible: number; already_current: number; offline: number;
  incompatible: { serial: string; reason: string }[];
  by_current_version: Bucket[]; waves: { wave: number; count: number }[]; risks: string[]; artifact_ready: boolean;
}

export interface DiagnosticRow {
  id: string; unit_id: string; serial: string; status: 'REQUESTED' | 'RECEIVED' | 'FAILED' | 'EXPIRED'; requested_by_email: string | null;
  requested_at: string; received_at: string | null; size_bytes: number | null; summary: Record<string, unknown> | null;
}
