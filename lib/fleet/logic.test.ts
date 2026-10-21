import { describe, expect, it } from 'vitest';
import { ago, availableCommands, filterFromParams, filterToParams, isSemver, pct, semverCompare, unitActions } from './logic';
import type { Permission } from './types';

const ALL: Permission[] = ['view', 'register', 'assign', 'diagnostics', 'remote_action', 'pause', 'create_release', 'approve_release', 'deploy', 'manage_credentials', 'manage_staff'];
const TECH: Permission[] = ['view', 'register', 'assign', 'diagnostics', 'remote_action', 'pause'];

describe('ago', () => {
  const now = Date.parse('2026-10-21T12:00:00Z');
  it('reads naturally', () => {
    expect(ago(null, now)).toBe('never');
    expect(ago('2026-10-21T11:59:50Z', now)).toBe('just now');
    expect(ago('2026-10-21T11:55:00Z', now)).toBe('5 min ago');
    expect(ago('2026-10-21T09:00:00Z', now)).toBe('3 h ago');
    expect(ago('2026-10-20T12:00:00Z', now)).toBe('1 day ago');
    expect(ago('garbage', now)).toBe('—');
  });
});

describe('unitActions', () => {
  it('retired units offer nothing', () => expect(unitActions({ lifecycle: 'RETIRED', gateway_id: 'vgw_x', site_id: 's' }, ALL)).toEqual([]));
  it('inventory: a provisioning token; viewers get nothing', () => {
    expect(unitActions({ lifecycle: 'INVENTORY', gateway_id: null, site_id: null }, ALL)).toContain('provision_token');
    expect(unitActions({ lifecycle: 'INVENTORY', gateway_id: null, site_id: null }, ['view'])).toEqual([]);
  });
  it('activate needs a device and a site', () => {
    expect(unitActions({ lifecycle: 'ASSIGNED', gateway_id: null, site_id: 's' }, TECH)).not.toContain('activate');
    expect(unitActions({ lifecycle: 'ASSIGNED', gateway_id: 'vgw', site_id: 's' }, TECH)).toContain('activate');
  });
  it('technicians cannot transfer, retire or suspend', () => {
    const a = unitActions({ lifecycle: 'ACTIVATED', gateway_id: 'vgw', site_id: 's' }, TECH);
    expect(a).toContain('maintenance');
    expect(a).not.toContain('transfer');
    expect(a).not.toContain('retire');
    expect(a).not.toContain('suspend');
  });
  it('an active unit is never simply re-assigned', () => {
    expect(unitActions({ lifecycle: 'ACTIVATED', gateway_id: 'vgw', site_id: 's' }, ALL)).not.toContain('assign');
  });
});

describe('availableCommands', () => {
  it('only what the agent supports and the person may do', () => {
    expect(availableCommands(['reboot', 'collect_diagnostics', 'rollback_app'], ALL, 'ACTIVATED')).toEqual(['collect_diagnostics', 'reboot', 'rollback_app']);
    expect(availableCommands(['reboot'], ['view', 'diagnostics'], 'ACTIVATED')).toEqual([]);
    expect(availableCommands([], ALL, 'ACTIVATED')).toEqual([]);
    expect(availableCommands(['reboot'], ALL, 'SUSPENDED')).toEqual([]);
  });
});

describe('filters in the URL', () => {
  it('round-trips', () => {
    const f = { q: 'VEX', health: 'OFFLINE', unassigned: true, simulated: 'include' as const };
    expect(filterFromParams(filterToParams(f))).toEqual(f);
    expect(filterToParams({}).toString()).toBe('');
  });
});

describe('semver', () => {
  it('compares', () => {
    expect(semverCompare('0.5.0', '0.6.0')).toBe(-1);
    expect(semverCompare('1.10.0', '1.9.9')).toBe(1);
    expect(semverCompare('1.0.0-rc.1', '1.0.0')).toBe(-1);
    expect(semverCompare('1.0.0', '1.0.0')).toBe(0);
    expect(isSemver('0.6.0')).toBe(true);
    expect(isSemver('v0.6')).toBe(false);
  });
  it('pct never divides by zero', () => { expect(pct(1, 0)).toBe(0); expect(pct(1, 3)).toBe(33); });
});
