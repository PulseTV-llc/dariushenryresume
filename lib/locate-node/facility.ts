/**
 * The "facility" illustration on the Locate Node page: a small building drawn as an isometric plan, with Locate
 * Nodes, sensors and moving asset tags. This file is the model (rooms, devices, paths, timing) and the maths
 * (projection, where a tag is at a moment in time, which room that is). Pure, so it is tested without a browser.
 *
 * It is an ILLUSTRATION, and says so on the page: readings are examples, the ripples show a zone (not a
 * measured range), locations are rooms (not coordinates), and vibration is marked "being integrated".
 */
export type Layer = 'temperature' | 'doors' | 'assets' | 'energy' | 'motion';
export type RoomId = 'dining' | 'kitchen' | 'walkin' | 'office' | 'storage' | 'machine';
export type NodeId = 'nDining' | 'nKitchen' | 'nDock' | 'nMachine';
export type DeviceId = 'temp' | 'humidity' | 'doorWalkin' | 'doorDock' | 'plug' | 'motion' | 'vibration' | 'cart' | 'badge' | 'toolkit';
export type Pt = [number, number];

export const LAYERS: Layer[] = ['temperature', 'doors', 'assets', 'energy', 'motion'];
export const LAYER_COLOR: Record<Layer, string> = { temperature: '#38bdf8', doors: '#a78bfa', assets: '#34d399', energy: '#fbbf24', motion: '#f472b6' };

// ------------------------------------------------------------------------------------------ the building
/** Rooms on a 14 x 10 grid: [x0, y0, x1, y1]. */
export const ROOMS: Record<RoomId, [number, number, number, number]> = {
  dining: [0, 0, 6, 6], kitchen: [6, 0, 11, 6], walkin: [11, 0, 14, 6],
  office: [0, 6, 4, 10], storage: [4, 6, 10, 10], machine: [10, 6, 14, 10],
};
export const ROOM_IDS = Object.keys(ROOMS) as RoomId[];
export const SIZE: Pt = [14, 10];
/** Interior walls with their door openings: [x0, y0, x1, y1, gapStart?, gapEnd?] (gap measured along the wall). */
export const WALLS: [number, number, number, number, number?, number?][] = [
  [6, 0, 6, 6, 2.5, 3.5], [11, 0, 11, 6, 3, 3.8], [0, 6, 4, 6, 1.2, 2], [4, 6, 6, 6], [6, 6, 10, 6, 1.6, 2.6], [10, 6, 14, 6],
  [4, 6, 4, 10, 1.5, 2.3], [10, 6, 10, 10, 2.6, 3.4],
];
/** The loading-dock door, on the front wall. */
export const DOCK_DOOR: [Pt, Pt] = [[7, 10], [8.2, 10]];

/** Which node hears a room. A "zone", not a measured range. */
export const ROOM_NODE: Record<RoomId, NodeId> = { dining: 'nDining', office: 'nDining', kitchen: 'nKitchen', walkin: 'nKitchen', storage: 'nDock', machine: 'nMachine' };
export const NODES: Record<NodeId, { at: Pt; room: RoomId }> = {
  nDining: { at: [2.4, 5.5], room: 'dining' }, nKitchen: { at: [8.6, 0.5], room: 'kitchen' },
  nDock: { at: [4.7, 9.4], room: 'storage' }, nMachine: { at: [13.5, 6.6], room: 'machine' },
};
export const NODE_IDS = Object.keys(NODES) as NodeId[];

export interface Device {
  layer: Layer;
  /** where it sits; moving tags have a path instead */
  at?: Pt;
  path?: Pt[];
  /** seconds in the cycle: [leave, arrive, leave again, arrive back] */
  trip?: [number, number, number, number];
  /** 'wifi': goes straight to the cloud, not through a Locate Node (the smart plug) */
  via?: 'wifi';
  /** shown, but no data flows yet */
  integrating?: boolean;
  /** a packet leaves every `every` seconds, first at `first` */
  every?: number;
  first?: number;
}
export const DEVICES: Record<DeviceId, Device> = {
  temp: { layer: 'temperature', at: [12.6, 2.1], every: 4, first: 0.3 },
  humidity: { layer: 'temperature', at: [5.9, 7.6], every: 5, first: 1.6 },
  doorWalkin: { layer: 'doors', at: [11, 3.4], every: 6, first: 1 },
  doorDock: { layer: 'doors', at: [7.6, 9.95], every: 7, first: 3.4 },
  plug: { layer: 'energy', at: [9.6, 4.7], via: 'wifi', every: 5, first: 2.5 },
  motion: { layer: 'motion', at: [1.9, 8.4], every: 4.5, first: 2.2 },
  vibration: { layer: 'motion', at: [12.3, 8.5], integrating: true },
  cart: { layer: 'assets', path: [[8.1, 4.5], [8.1, 6], [8.1, 8.2], [8.4, 9]], trip: [3, 7, 12, 16], every: 3, first: 0.5 },
  badge: { layer: 'assets', path: [[3.3, 3.7], [6, 3], [8.3, 2.3]], trip: [5, 8, 13, 16], every: 3.5, first: 1.9 },
  toolkit: { layer: 'assets', at: [11.1, 7.2], every: 6, first: 4.1 },
};
export const DEVICE_IDS = Object.keys(DEVICES) as DeviceId[];

/** Everything loops on one clock. */
export const CYCLE = 18;
/** What the phone shows, and when (seconds into the cycle): each one is caused by a device. */
export const NOTIFICATIONS: { device: DeviceId; from: number; to: number }[] = [
  { device: 'doorWalkin', from: 1, to: 6.6 }, { device: 'cart', from: 7.2, to: 12.2 }, { device: 'plug', from: 12.8, to: 17.6 },
];
/** The order "Play tour" walks through. */
export const TOUR: (DeviceId | NodeId)[] = ['nKitchen', 'temp', 'doorWalkin', 'plug', 'cart', 'badge', 'motion', 'humidity', 'doorDock', 'toolkit', 'vibration'];

// ------------------------------------------------------------------------------------------- projection
/** The drawing's coordinate box (SVG viewBox): x, y, width, height. */
export const VIEW = { x: -400, y: -112, w: 980, h: 684 } as const;
const SX = 38.1, SY = 22;
/** Grid position (and height above the floor) to a point in the drawing. */
export const iso = (gx: number, gy: number, z = 0): Pt => [(gx - gy) * SX, (gx + gy) * SY - z];
/** A point in the drawing as percentages of the scene box, for the HTML markers laid over it. */
export const pct = ([x, y]: Pt): { left: number; top: number } => ({ left: ((x - VIEW.x) / VIEW.w) * 100, top: ((y - VIEW.y) / VIEW.h) * 100 });
export const CLOUD: Pt = [468, -52];
/** Where the line to the phone leaves the drawing. */
export const PHONE_EDGE: Pt = [574, 96];
/** Height at which things are drawn: nodes hang on walls, sensors sit a little above the floor. */
export const Z = { node: 26, device: 8 } as const;

// ---------------------------------------------------------------------------------------------- motion
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const mod = (a: number, n: number) => ((a % n) + n) % n;

export function roomAt([gx, gy]: Pt): RoomId {
  for (const id of ROOM_IDS) { const [x0, y0, x1, y1] = ROOMS[id]; if (gx >= x0 && gx <= x1 && gy >= y0 && gy <= y1) return id; }
  return 'storage';
}
/** A point a fraction `u` (0..1) of the way along a path, by length. */
export function along(path: Pt[], u: number): Pt {
  const lens = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]));
  const total = lens.reduce((a, b) => a + b, 0);
  let d = clamp01(u) * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) { const k = lens[i] ? d / lens[i] : 0; return [path[i][0] + (path[i + 1][0] - path[i][0]) * k, path[i][1] + (path[i + 1][1] - path[i][1]) * k]; }
    d -= lens[i];
  }
  return path[path.length - 1];
}
/** Where a device is at time `t`: fixed sensors stay put; tags travel out and back with a pause at each end. */
export function deviceAt(id: DeviceId, t: number): Pt {
  const d = DEVICES[id];
  if (!d.path || !d.trip) return d.at as Pt;
  const c = mod(t, CYCLE), [a, b, e, f] = d.trip;
  const u = c < a ? 0 : c < b ? ease((c - a) / (b - a)) : c < e ? 1 : c < f ? 1 - ease((c - e) / (f - e)) : 0;
  return along(d.path, u);
}
/** The room a device is in, and the node that hears it there (null for the Wi-Fi plug). */
export function heardBy(id: DeviceId, t: number): { room: RoomId; node: NodeId | null } {
  const room = roomAt(deviceAt(id, t));
  return { room, node: DEVICES[id].via === 'wifi' ? null : ROOM_NODE[room] };
}

export const HOP = { toNode: 0.9, toCloud: 1.1, toPhone: 0.8 } as const;
/** The packet a device has in flight at time `t`, as a point in the drawing (null: nothing in flight). */
export function packetAt(id: DeviceId, t: number): Pt | null {
  const d = DEVICES[id];
  if (d.integrating || !d.every) return null;
  const u = mod(t - (d.first ?? 0), d.every);
  const from = iso(...deviceAt(id, t), Z.device);
  const lerp = (p: Pt, q: Pt, k: number): Pt => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
  if (d.via === 'wifi') return u < HOP.toNode + HOP.toCloud ? lerp(from, CLOUD, ease(u / (HOP.toNode + HOP.toCloud))) : null;
  const node = iso(...NODES[heardBy(id, t).node as NodeId].at, Z.node);
  if (u < HOP.toNode) return lerp(from, node, ease(u / HOP.toNode));
  if (u < HOP.toNode + HOP.toCloud) return lerp(node, CLOUD, ease((u - HOP.toNode) / HOP.toCloud));
  return null;
}
/** Which notification the phone shows at time `t` (-1: none), and the packet on its way from the cloud to the phone. */
export function notificationAt(t: number): { index: number; packet: Pt | null } {
  const c = mod(t, CYCLE);
  const index = NOTIFICATIONS.findIndex((n) => c >= n.from && c < n.to);
  if (index < 0) return { index, packet: null };
  const k = (c - NOTIFICATIONS[index].from) / HOP.toPhone;
  return { index, packet: k < 1 ? [CLOUD[0] + (PHONE_EDGE[0] - CLOUD[0]) * ease(k), CLOUD[1] + (PHONE_EDGE[1] - CLOUD[1]) * ease(k)] : null };
}

// ------------------------------------------------------------------------------------------- drawing
const poly = (pts: Pt[]) => pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ');
export const roomPolygon = (id: RoomId) => { const [x0, y0, x1, y1] = ROOMS[id]; return poly([iso(x0, y0), iso(x1, y0), iso(x1, y1), iso(x0, y1)]); };
export const roomCentre = (id: RoomId): Pt => { const [x0, y0, x1, y1] = ROOMS[id]; return [(x0 + x1) / 2, (y0 + y1) / 2]; };
/** A wall standing `h` high between two grid points, as a polygon. */
export const wallPolygon = (a: Pt, b: Pt, h: number) => poly([iso(a[0], a[1]), iso(b[0], b[1]), iso(b[0], b[1], h), iso(a[0], a[1], h)]);
/** Interior walls cut at their doorways: the pieces that are actually drawn. */
export function wallPieces(): [Pt, Pt][] {
  return WALLS.flatMap(([x0, y0, x1, y1, g0, g1]): [Pt, Pt][] => {
    const len = Math.hypot(x1 - x0, y1 - y0), at = (d: number): Pt => [x0 + ((x1 - x0) * d) / len, y0 + ((y1 - y0) * d) / len];
    return g0 == null || g1 == null ? [[at(0), at(len)]] : [[at(0), at(g0)], [at(g1), at(len)]];
  });
}
/** Floor grid lines, one per grid unit. */
export function gridLines(): [Pt, Pt][] {
  const out: [Pt, Pt][] = [];
  for (let x = 1; x < SIZE[0]; x++) out.push([iso(x, 0), iso(x, SIZE[1])]);
  for (let y = 1; y < SIZE[1]; y++) out.push([iso(0, y), iso(SIZE[0], y)]);
  return out;
}
/** Furniture, so the rooms read as rooms: [x0, y0, x1, y1, height]. Purely decorative. */
export const PROPS: [number, number, number, number, number][] = [
  [1, 1.2, 2.2, 2.4, 7], [3.5, 1.1, 4.7, 2.3, 7], [0.9, 3.3, 2.1, 4.5, 7], [4.1, 4.2, 5.2, 5.3, 7],            // dining tables
  [9.3, 0.3, 10.7, 1, 10], [8.9, 2.7, 10.4, 3.5, 10], [9.2, 4.3, 10, 5.1, 11],                                // kitchen: counter, island, fryer
  [13.3, 0.5, 13.8, 2.9, 17], [11.4, 0.4, 12.4, 0.9, 17],                                                     // walk-in shelves
  [0.5, 7, 1.2, 8.6, 8],                                                                                      // office desk
  [8.9, 6.7, 9.6, 9.2, 18], [5.7, 8.5, 6.5, 9.3, 6],                                                          // storage shelves, a pallet
  [11.9, 8.1, 12.9, 8.9, 12], [13.1, 8.9, 13.7, 9.6, 20],                                                     // the motor, a cabinet
];
/** A box's three visible faces (top, the face towards the viewer's left, the one towards the right), back to front. */
export function boxFaces([x0, y0, x1, y1, h]: [number, number, number, number, number]): { top: string; left: string; right: string } {
  return {
    top: poly([iso(x0, y0, h), iso(x1, y0, h), iso(x1, y1, h), iso(x0, y1, h)]),
    left: poly([iso(x0, y1, h), iso(x1, y1, h), iso(x1, y1), iso(x0, y1)]),
    right: poly([iso(x1, y0, h), iso(x1, y1, h), iso(x1, y1), iso(x1, y0)]),
  };
}
/** Where each room's name is printed on its floor (it runs along the grid's x axis from here). */
export const ROOM_LABEL: Record<RoomId, Pt> = { dining: [0.5, 5.9], kitchen: [6.4, 5.5], walkin: [11.3, 4.8], office: [0.4, 9.5], storage: [4.4, 6.55], machine: [10.4, 9.5] };

export const isNode = (id: string): id is NodeId => id in NODES;
/** The devices a node hears at time `t`. */
export const heardByNode = (node: NodeId, t: number) => DEVICE_IDS.filter((d) => heardBy(d, t).node === node);
