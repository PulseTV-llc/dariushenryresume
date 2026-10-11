/**
 * Sensor catalog structure: which families exist, how each measurement is
 * labelled, and how it connects. The words are in content/<locale>/catalog.ts
 * and line up with `statuses` by position.
 *
 * HONESTY RULES (see lib/site.ts):
 *  - 'now'         = works on the platform today, end to end.
 *  - 'integrating' = an adapter is being built right now; not available yet.
 *  - 'integration' = not built. The adapter architecture lets us add it on request.
 *  - Everything on RS-485 / Modbus is 'integration': that adapter is not built.
 *  - No sensor vendor names, specifications or certification claims.
 */
import type { IconName } from './site';

export type SensorStatus = 'now' | 'integrating' | 'integration';
export type Connectivity = 'ble' | 'wifi' | 'rs485';

export const CONNECTIVITY_LABEL: Record<Connectivity, string> = { ble: 'BLE', wifi: 'Wi-Fi', rs485: 'RS-485' };

const FOOD = 'food-service-cold-chain';
const WAREHOUSE = 'warehouses-logistics';
const FACTORY = 'manufacturing-machine-health';
const FACILITY = 'facilities-property';
const HEALTH = 'healthcare-pharma-storage';

export const SENSOR_FAMILIES = [
  { slug: 'environment', icon: 'environment', statuses: ['now', 'now', 'now', 'integration', 'integration', 'integration'], connectivity: ['ble'], industries: [FOOD, WAREHOUSE, FACTORY, FACILITY, HEALTH] },
  { slug: 'cold-chain', icon: 'food', statuses: ['now', 'now', 'now', 'integration', 'integration'], connectivity: ['ble'], industries: [FOOD, WAREHOUSE, HEALTH] },
  { slug: 'access-occupancy', icon: 'door', statuses: ['now', 'now', 'integration', 'integration', 'integration'], connectivity: ['ble'], industries: [FOOD, WAREHOUSE, FACILITY, HEALTH] },
  { slug: 'water-leak', icon: 'water', statuses: ['integration', 'integration', 'integration'], connectivity: ['ble', 'rs485'], industries: [FOOD, WAREHOUSE, FACTORY, FACILITY, HEALTH] },
  { slug: 'machine-health', icon: 'vibration', statuses: ['integrating', 'integrating', 'integrating', 'integration', 'integration'], connectivity: ['ble', 'rs485'], industries: [FACTORY, WAREHOUSE, FACILITY] },
  { slug: 'industrial-process', icon: 'process', statuses: ['integration', 'integration', 'integration', 'integration', 'integration'], connectivity: ['rs485'], industries: [FACTORY, WAREHOUSE, FACILITY] },
  { slug: 'energy', icon: 'energy', statuses: ['now', 'now', 'now', 'now', 'integration'], connectivity: ['wifi', 'rs485'], industries: [FOOD, WAREHOUSE, FACTORY, FACILITY, HEALTH] },
  { slug: 'assets-tracking', icon: 'assets', statuses: ['integration', 'integration', 'integration'], connectivity: ['ble'], industries: [WAREHOUSE, FACTORY, FACILITY, HEALTH] },
  { slug: 'safety', icon: 'safety', statuses: ['integration', 'integration', 'integration'], connectivity: ['ble', 'rs485'], industries: [FOOD, FACTORY, FACILITY] },
] as const satisfies readonly { slug: string; icon: IconName; statuses: readonly SensorStatus[]; connectivity: readonly Connectivity[]; industries: readonly string[] }[];

export type SensorSlug = (typeof SENSOR_FAMILIES)[number]['slug'];

/** Best status present in a family: drives the card's headline badge. */
export function familyStatus(statuses: readonly SensorStatus[]): SensorStatus {
  if (statuses.includes('now')) return 'now';
  if (statuses.includes('integrating')) return 'integrating';
  return 'integration';
}
