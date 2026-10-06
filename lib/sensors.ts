/**
 * Sensor catalog: families of things VexaOS can monitor.
 *
 * HONESTY RULES (see lib/site.ts):
 *  - 'now'         = works on the platform today, end to end.
 *  - 'integrating' = an adapter is being built right now; not available yet.
 *  - 'integration' = not built. The adapter architecture lets us add it on
 *                    request. Never describe these as existing products.
 *  - Everything on RS-485 / Modbus is 'integration': the gateway's Modbus
 *    adapter is not built yet. Only Bluetooth LE sensors are 'now'.
 *  - No sensor vendor names, no specifications (ranges, accuracy, battery
 *    life) and no certification claims.
 */

import type { IconName } from './site';

export type SensorStatus = 'now' | 'integrating' | 'integration';

export const SENSOR_STATUS_LABEL: Record<SensorStatus, string> = {
  now: 'Available now',
  integrating: 'Being integrated',
  integration: 'Via integration',
};

export const SENSOR_STATUS_HELP: Record<SensorStatus, string> = {
  now: 'Working on the platform today.',
  integrating: 'An adapter is being built now. Not available yet.',
  integration: 'Not built yet. We add it through an adapter when a customer needs it.',
};

export type Connectivity = 'ble' | 'rs485';

export const CONNECTIVITY_LABEL: Record<Connectivity, string> = {
  ble: 'BLE',
  rs485: 'RS-485',
};

export const CONNECTIVITY_NAME: Record<Connectivity, string> = {
  ble: 'Bluetooth Low Energy (wireless)',
  rs485: 'RS-485 / Modbus (wired)',
};

export interface Measurement {
  name: string;
  status: SensorStatus;
}

export interface SensorFamily {
  slug: string;
  name: string;
  icon: IconName;
  /** One-line value. */
  value: string;
  measurements: Measurement[];
  /** Typical use, one short line. */
  use: string;
  /** Shown when the card is expanded. */
  detail: string;
  /** How sensors in this family connect to the gateway. */
  connectivity: Connectivity[];
  /** Industry slugs from lib/site.ts, used by the filter chips. */
  industries: string[];
}

const FOOD = 'food-service-cold-chain';
const WAREHOUSE = 'warehouses-logistics';
const FACTORY = 'manufacturing-machine-health';
const FACILITY = 'facilities-property';
const HEALTH = 'healthcare-pharma-storage';

export const SENSOR_FAMILIES: SensorFamily[] = [
  {
    slug: 'environment',
    name: 'Environment',
    icon: 'environment',
    value: 'Know the conditions in every room.',
    measurements: [
      { name: 'Temperature', status: 'now' },
      { name: 'Humidity', status: 'now' },
      { name: 'Barometric pressure', status: 'now' },
      { name: 'Air quality (CO₂, VOC, PM2.5)', status: 'integration' },
      { name: 'Light', status: 'integration' },
      { name: 'Noise', status: 'integration' },
    ],
    use: 'Storage rooms, work areas, server closets and offices.',
    detail:
      'Temperature, humidity and pressure are live today, with history, alert rules, drift detection and time-to-limit forecasts. Air quality, light and noise are added through adapters; tell us which you need.',
    connectivity: ['ble'],
    industries: [FOOD, WAREHOUSE, FACTORY, FACILITY, HEALTH],
  },
  {
    slug: 'cold-chain',
    name: 'Cold chain & food safety',
    icon: 'food',
    value: 'Catch a warming cooler before the stock is lost.',
    measurements: [
      { name: 'Cooler and freezer air temperature', status: 'now' },
      { name: 'Cooler door left ajar', status: 'now' },
      { name: 'Temperature logs with CSV export', status: 'now' },
      { name: 'Deep-freeze probes', status: 'integration' },
      { name: 'Food-holding temperature probes', status: 'integration' },
    ],
    use: 'Walk-ins, reach-ins, freezers, medicine fridges and prep lines.',
    detail:
      'Air temperature inside coolers and freezers, door-ajar flags and exportable logs work today. The logs give you daily minimum, average and maximum to support your own HACCP-style records; VexaOS is not a food safety certification. Wired probes for deep-freeze and food-holding temperatures are added through adapters.',
    connectivity: ['ble'],
    industries: [FOOD, WAREHOUSE, HEALTH],
  },
  {
    slug: 'access-occupancy',
    name: 'Access & occupancy',
    icon: 'door',
    value: 'See what opened, when, and for how long.',
    measurements: [
      { name: 'Door and window contact', status: 'now' },
      { name: 'Movement and tilt of the sensor', status: 'now' },
      { name: 'Motion (PIR)', status: 'integration' },
      { name: 'Occupancy and people counting', status: 'integration' },
      { name: 'Panic and call buttons', status: 'integration' },
    ],
    use: 'Cold-room doors, dock doors, stock rooms and quiet-hours checks.',
    detail:
      'Contact sensors report every open and close the moment it happens, with opens today, longest open and a timeline. Unusual-hours and left-open findings come with it. Motion, occupancy and buttons are added through adapters. VexaOS is not a security or emergency response system.',
    connectivity: ['ble'],
    industries: [FOOD, WAREHOUSE, FACILITY, HEALTH],
  },
  {
    slug: 'water-leak',
    name: 'Water & leak',
    icon: 'water',
    value: 'Find the leak while it is still a puddle.',
    measurements: [
      { name: 'Leak and flood spots', status: 'integration' },
      { name: 'Water flow and usage', status: 'integration' },
      { name: 'Tank and level', status: 'integration' },
    ],
    use: 'Plant rooms, under sinks and equipment, basements and tanks.',
    detail:
      'Nothing in this family is live today. Wireless leak spots, and wired flow meters and level transmitters over RS-485 / Modbus, are added through adapters and would use the same alerts, history and apps as every other sensor.',
    connectivity: ['ble', 'rs485'],
    industries: [FOOD, WAREHOUSE, FACTORY, FACILITY, HEALTH],
  },
  {
    slug: 'machine-health',
    name: 'Machine health',
    icon: 'vibration',
    value: 'Spot a failing machine by how it runs.',
    measurements: [
      { name: 'Vibration: velocity, displacement, frequency', status: 'integrating' },
      { name: 'Bearing and motor temperature', status: 'integrating' },
      { name: 'Tilt and orientation', status: 'integrating' },
      { name: 'Runtime and cycles', status: 'integration' },
      { name: 'Current draw (CT clamps)', status: 'integration' },
    ],
    use: 'Motors, pumps, fans, compressors and conveyors.',
    detail:
      'Our first vibration sensor is being integrated now: three-axis velocity, displacement and frequency, with temperature and angle, summarized on the gateway. It is not available yet. Runtime, cycle counting and current clamps follow through adapters, wireless or wired over RS-485 / Modbus.',
    connectivity: ['ble', 'rs485'],
    industries: [FACTORY, WAREHOUSE, FACILITY],
  },
  {
    slug: 'industrial-process',
    name: 'Industrial process',
    icon: 'process',
    value: 'Bring the instruments you already have onto one screen.',
    measurements: [
      { name: 'Pressure transmitters', status: 'integration' },
      { name: 'Flow meters', status: 'integration' },
      { name: 'Tank and vessel level', status: 'integration' },
      { name: 'Analog inputs (4–20 mA, 0–10 V via converters)', status: 'integration' },
      { name: 'PLC and controller registers', status: 'integration' },
    ],
    use: 'Process lines, pump stations, boiler and chiller plant, HVAC and BMS.',
    detail:
      'Nothing in this family is live today. These instruments connect by wire over RS-485 / Modbus RTU, with Modbus TCP over Ethernet as an option. The gateway\'s Modbus adapter is not built yet; we build it against your equipment as an integration. Monitoring only: VexaOS reads values and does not control equipment.',
    connectivity: ['rs485'],
    industries: [FACTORY, WAREHOUSE, FACILITY],
  },
  {
    slug: 'energy',
    name: 'Energy',
    icon: 'energy',
    value: 'Know what is running and what it costs you.',
    measurements: [
      { name: 'Power and energy metering', status: 'integration' },
      { name: 'Equipment on/off state', status: 'integration' },
    ],
    use: 'Refrigeration, HVAC, production lines and tenant spaces.',
    detail:
      'Nothing in this family is live today. Power and energy meters typically connect by wire over RS-485 / Modbus, which the gateway does not support yet; we add it through an adapter. Simple on/off state can also be done wirelessly.',
    connectivity: ['rs485', 'ble'],
    industries: [FOOD, FACTORY, FACILITY],
  },
  {
    slug: 'assets-tracking',
    name: 'Assets & tracking',
    icon: 'assets',
    value: 'Know which gateway last heard your equipment.',
    measurements: [
      { name: 'Bluetooth asset tags and beacons', status: 'integration' },
      { name: 'Last-seen location', status: 'integration' },
      { name: 'In transit, with the Mobile Gateway (coming soon)', status: 'integration' },
    ],
    use: 'Carts, containers, tools and loads moving between sites.',
    detail:
      'Gateways already hear Bluetooth devices around them; turning that into asset tracking is added through adapters. Tracking between sites depends on the Mobile Gateway, which is coming soon.',
    connectivity: ['ble'],
    industries: [WAREHOUSE, FACTORY, FACILITY, HEALTH],
  },
  {
    slug: 'safety',
    name: 'Safety',
    icon: 'safety',
    value: 'An extra set of eyes on air you cannot see.',
    measurements: [
      { name: 'Carbon monoxide (CO)', status: 'integration' },
      { name: 'Methane and combustible gas', status: 'integration' },
      { name: 'Smoke-adjacent indicators', status: 'integration' },
    ],
    use: 'Kitchens, plant rooms, garages and battery rooms.',
    detail:
      'Nothing in this family is live today. Gas sensors can be added through adapters for awareness and trend monitoring only. VexaOS is not a life-safety system, holds no life-safety certification, and must never replace code-required smoke, fire or gas alarms.',
    connectivity: ['ble', 'rs485'],
    industries: [FOOD, FACTORY, FACILITY],
  },
];

/** Best status present in a family: drives the card's headline badge. */
export function familyStatus(f: SensorFamily): SensorStatus {
  if (f.measurements.some((m) => m.status === 'now')) return 'now';
  if (f.measurements.some((m) => m.status === 'integrating')) return 'integrating';
  return 'integration';
}
