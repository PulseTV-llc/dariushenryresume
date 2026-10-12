import { describe, expect, it } from 'vitest';
import { LOCALES } from '@/lib/i18n/config';
import { CYCLE, DEVICES, DEVICE_IDS, NODES, NODE_IDS, NOTIFICATIONS, PROPS, ROOMS, ROOM_IDS, ROOM_LABEL, ROOM_NODE, SIZE, TOUR, VIEW, deviceAt, heardBy, heardByNode, iso, notificationAt, packetAt, pct, roomAt } from './facility';
import { FACILITY_STRINGS, facilityStrings, layoutStrings } from './facility-strings';

const shape = (v: unknown): unknown => (Array.isArray(v) ? v.map(shape) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)])) : typeof v);
const texts = (v: unknown): string[] => (typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(texts) : []);

describe('the facility plan', () => {
  it('rooms tile the building, and every room has a node that hears it', () => {
    const area = ROOM_IDS.reduce((sum, r) => sum + (ROOMS[r][2] - ROOMS[r][0]) * (ROOMS[r][3] - ROOMS[r][1]), 0);
    expect(area).toBe(SIZE[0] * SIZE[1]);
    for (const r of ROOM_IDS) { expect(NODE_IDS).toContain(ROOM_NODE[r]); expect(roomAt(ROOM_LABEL[r])).toBe(r); }
    for (const n of NODE_IDS) expect(roomAt(NODES[n].at)).toBe(NODES[n].room);
  });

  it('everything drawn lands inside the picture', () => {
    const inside = (gx: number, gy: number, z = 0) => { const p = pct(iso(gx, gy, z)); expect(p.left).toBeGreaterThan(0); expect(p.left).toBeLessThan(100); expect(p.top).toBeGreaterThan(0); expect(p.top).toBeLessThan(100); };
    inside(0, 0, 40); inside(SIZE[0], 0, 40); inside(0, SIZE[1]); inside(SIZE[0], SIZE[1]);
    for (const [x0, y0, x1, y1, h] of [...PROPS.restaurant, ...PROPS.factory]) { inside(x0, y0, h); inside(x1, y1); }
    expect(VIEW.w / VIEW.h).toBeGreaterThan(1);
  });

  it('sensors sit where the story says they do', () => {
    expect(roomAt(DEVICES.temp.at!)).toBe('walkin');
    expect(roomAt(DEVICES.plug.at!)).toBe('kitchen');
    expect(roomAt(DEVICES.motion.at!)).toBe('office');
    expect(roomAt(DEVICES.vibration.at!)).toBe('machine');
    expect(roomAt(DEVICES.humidity.at!)).toBe('storage');
  });

  it('a tag is located by the room it is in: the node that hears it changes as it moves', () => {
    const [leave, arrive, back, home] = DEVICES.cart.trip!;
    expect(heardBy('cart', leave - 0.1)).toEqual({ room: 'kitchen', node: 'nKitchen' });
    expect(heardBy('cart', arrive + 0.1)).toEqual({ room: 'storage', node: 'nDock' });
    expect(heardBy('cart', home + 0.1).room).toBe('kitchen');
    expect(deviceAt('cart', arrive)).toEqual(DEVICES.cart.path!.at(-1));
    expect(deviceAt('cart', back + CYCLE)).toEqual(deviceAt('cart', back));
    expect(heardBy('badge', 0).room).toBe('dining');
    expect(heardBy('badge', DEVICES.badge.trip![1] + 0.1).room).toBe('kitchen');
    expect(heardByNode('nKitchen', 0)).toContain('cart');
    expect(heardByNode('nDock', arrive + 0.1)).toContain('cart');
  });

  it('the smart plug is Wi-Fi: no node hears it, and its packets still reach the cloud', () => {
    expect(DEVICES.plug.via).toBe('wifi');
    expect(heardBy('plug', 0).node).toBeNull();
    expect(packetAt('plug', DEVICES.plug.first! + 0.2)).not.toBeNull();
    for (const n of NODE_IDS) expect(heardByNode(n, 3)).not.toContain('plug');
  });

  it('the vibration sensor is only being integrated: no packets, ever', () => {
    expect(DEVICES.vibration.integrating).toBe(true);
    for (let t = 0; t < CYCLE; t += 0.25) expect(packetAt('vibration', t)).toBeNull();
  });

  it('packets leave on schedule and are gone between sends', () => {
    expect(packetAt('temp', DEVICES.temp.first! + 0.1)).not.toBeNull();
    const quiet = DEVICE_IDS.filter((d) => DEVICES[d].every).some((d) => { for (let t = 0; t < CYCLE; t += 0.1) if (!packetAt(d, t)) return true; return false; });
    expect(quiet).toBe(true);
  });

  it('the phone shows one notification at a time, each caused by a device in the plan', () => {
    for (const [i, n] of NOTIFICATIONS.entries()) {
      expect(DEVICE_IDS).toContain(n.device);
      expect(notificationAt((n.from + n.to) / 2).index).toBe(i);
      if (i) expect(n.from).toBeGreaterThan(NOTIFICATIONS[i - 1].to);
    }
    expect(notificationAt(NOTIFICATIONS[0].from - 0.5).index).toBe(-1);
    // the cart's notification comes after it has arrived at the dock
    expect(NOTIFICATIONS.find((n) => n.device === 'cart')!.from).toBeGreaterThan(DEVICES.cart.trip![1]);
  });

  it('the tour visits real things, once each', () => {
    expect(new Set(TOUR).size).toBe(TOUR.length);
    for (const id of TOUR) expect([...DEVICE_IDS, ...NODE_IDS] as string[]).toContain(id);
  });
});

describe('the facility copy', () => {
  it('every language has every string', () => {
    expect(Object.keys(FACILITY_STRINGS).sort()).toEqual([...LOCALES].sort());
    for (const l of LOCALES) expect(shape(facilityStrings(l))).toEqual(shape(FACILITY_STRINGS.en));
  });

  it('every device, room and notification has its words', () => {
    for (const l of LOCALES) {
      const t = facilityStrings(l);
      for (const d of DEVICE_IDS) for (const k of ['name', 'measures', 'reading', 'alert'] as const) expect(t.devices[d][k]).toBeTruthy();
      for (const r of ROOM_IDS) expect(t.rooms[r]).toBeTruthy();
      for (const n of NOTIFICATIONS) expect(t.notifications[n.device]).toBeTruthy();
      for (const d of ['cart', 'badge', 'toolkit'] as const) expect(t.devices[d].reading).toContain('{room}');
      expect(t.node.inRoom).toContain('{room}');
      expect(t.tour.step).toContain('{n}');
    }
  });

  it('stays honest: brand spelling, not GPS, no measured range, vibration has no reading', () => {
    for (const l of LOCALES) {
      const t = facilityStrings(l), all = texts(t).join('\n');
      expect(all).toContain('VexaOs');
      expect(all).not.toMatch(/VexaOS|Vexa OS|Raspberry|MOKO/);
      expect(t.devices.cart.measures).toContain('GPS');
      expect(t.devices.vibration.reading).toBe('—');
      expect(t.card.example).toBeTruthy();
      expect(t.footnote.length).toBeGreaterThan(60);
      // no distances or battery claims anywhere
      expect(all).not.toMatch(/\d+\s?(m|meters?|metres?|ft|feet|km|เมตร|mét)\b/i);
      expect(all).not.toMatch(/\d+\s?(years?|months?|ปี|năm|tahun|taon)\b/i);
    }
  });

  it('the factory layout changes the words, never the claims', () => {
    for (const l of LOCALES) {
      const t = facilityStrings(l), f = layoutStrings(t, 'factory');
      expect(layoutStrings(t, 'restaurant')).toBe(t);
      expect(shape({ ...f, factory: 0, layouts: 0 })).toEqual(shape({ ...t, factory: 0, layouts: 0 }));
      expect(f.rooms.dining).not.toBe(t.rooms.dining);
      expect(f.devices.cart.name).not.toBe(t.devices.cart.name);
      expect(f.notifications.cart).not.toBe(t.notifications.cart);
      // what must stay true in either building
      expect(f.devices.cart.measures).toContain('GPS');
      expect(f.devices.vibration.reading).toBe('—');
      for (const d of DEVICE_IDS) expect(f.devices[d].reading).toBe(t.devices[d].reading);
      expect(f.footnote).toBe(t.footnote);
    }
  });

  it('furniture never sits on a sensor, a node or a tag\'s path', () => {
    const spots = [...DEVICE_IDS.flatMap((d) => DEVICES[d].path ?? [DEVICES[d].at!]), ...NODE_IDS.map((n) => NODES[n].at)];
    for (const layout of ['restaurant', 'factory'] as const) {
      for (const [x0, y0, x1, y1] of PROPS[layout]) {
        // the plug and the vibration sensor sit ON their appliance, by design
        const on = spots.filter(([x, y]) => x > x0 && x < x1 && y > y0 && y < y1).filter((p) => p !== DEVICES.plug.at && p !== DEVICES.vibration.at);
        expect(on).toEqual([]);
      }
    }
  });
});
