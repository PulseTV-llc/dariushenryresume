/**
 * Product imagery.
 *
 * Sources live outside the repo at ~/Documents/vexaos-docs/. Most captures now
 * come from the curated `marketing-screens/` set; `location-switcher` is still
 * from `demo-screens/` because that set has no replacement for it yet. See
 * SCREEN_SOURCES for per-image provenance.
 *
 * Only screenshots that show the product working are wired in. Still excluded
 * from the latest reseed:
 *   - 04-commerce-ops: reseeded, but every metric reads $0.00 / 0 with an
 *     un-actioned "Activate payments with Stripe" banner and "No sales in this
 *     period". A zeroed dashboard reads as "nobody uses this".
 *   - 05-inventory-ops: has real items, but every row shows the literal string
 *     "undefined units" and every status is Inactive.
 * Both need seeded transactions/stock before they can ship.
 */

export interface Screenshot {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Short caption rendered under the frame. */
  caption: string;
  /** Chrome style — 'browser' draws a window bar, 'device' draws a bezel. */
  frame: 'browser' | 'device';
}

export const SCREENS = {
  vexaosHome: {
    src: '/screens/vexaos-home.webp',
    width: 1800,
    height: 1125,
    alt: 'The VexaOS control center showing an organization with three locations, the products it holds, and the products available to add.',
    caption:
      'The VexaOS control center — every product your organization holds, and the ones it does not, in one place.',
    frame: 'browser',
  },
  productSwitcher: {
    src: '/screens/product-switcher.webp',
    width: 1800,
    height: 1125,
    alt: 'The VexaOS product switcher listing all six products, marked either Included or Upgrade.',
    caption:
      'Adding a product is a switch, not a migration — the platform already holds your people, locations and data.',
    frame: 'browser',
  },
  locationSwitcher: {
    src: '/screens/location-switcher.webp',
    width: 1800,
    height: 1250,
    alt: 'The VexaOS location switcher showing an organization with three locations and an all-locations rollup.',
    caption:
      'One organization, many locations — every application respects the same hierarchy.',
    frame: 'browser',
  },
  unifiedSettings: {
    src: '/screens/unified-settings.webp',
    width: 1800,
    height: 1125,
    alt: 'VexaOS settings, split into platform settings that exist once and module settings shown only where they apply.',
    caption:
      'Platform settings exist once for the whole system; module settings appear only where they apply.',
    frame: 'browser',
  },
  touchBoard: {
    src: '/screens/touchboard-wall.webp',
    width: 1600,
    height: 900,
    alt: 'A TouchBoard employee wall display showing a staffing health score of 95, who is on the floor now, a live clock-in timeline, and a full-width Clock In button.',
    caption:
      'The real TouchBoard employee display — staffing health, who is on the floor, the live timeline, and clock-in, on the wall.',
    frame: 'device',
  },
  deviceFleet: {
    src: '/screens/device-fleet.webp',
    width: 1800,
    height: 1125,
    alt: 'The VexaOS device registry listing a fleet of six paired boards across two locations, five online, each assigned a different mode.',
    caption:
      'The device registry — every board, where it is, what it runs, and when it was last seen. Change a mode and it reaches the device in seconds.',
    frame: 'browser',
  },
  facilityColdStorage: {
    src: '/screens/facility-cold-storage.webp',
    width: 1800,
    height: 1125,
    alt: 'Facility Ops monitoring a cold storage site with three cold rooms, showing control mode, cloud link, field device status, and active temperature alarms on walk-in coolers, a freezer, and the receiving dock.',
    caption:
      'Facility Ops on a cold-chain site — walk-in coolers, a freezer, and the receiving dock, each held against its own limit, with drift raised the moment it happens.',
    frame: 'browser',
  },
  shyftgridSchedule: {
    src: '/screens/shyftgrid-schedule.webp',
    width: 1800,
    height: 1125,
    alt: 'A published ShyftGrid weekly schedule for one location, showing eleven shifts across the week, staff rows with assigned hours, and two open shifts flagged as needing coverage.',
    caption:
      'A published week in ShyftGrid — assigned shifts, hours per person, and the open shifts still needing coverage.',
    frame: 'browser',
  },
} satisfies Record<string, Screenshot>;

export type ScreenKey = keyof typeof SCREENS;

/** Provenance, so a re-drop can be swapped in without guesswork. */
export const SCREEN_SOURCES: Record<ScreenKey, string> = {
  vexaosHome: 'marketing-screens/01-vexaos-control-center.png',
  productSwitcher: 'marketing-screens/02-product-switcher.png',
  locationSwitcher: 'demo-screens/04-location-switcher.png (no marketing-screens equivalent yet)',
  unifiedSettings: 'marketing-screens/07-unified-settings.png',
  touchBoard: 'marketing-screens/09-touchboard-employee-wall.png (real native board, uncropped)',
  deviceFleet: 'marketing-screens/06-device-fleet.png',
  facilityColdStorage: 'marketing-screens/08-facilityops-cold-storage.png',
  shyftgridSchedule: 'marketing-screens/03-shyftgrid-schedule.png',
};

/**
 * Product slug → screenshot. Products without a usable capture fall through to
 * the hardware/graphic slots rather than showing a broken or empty screen.
 */
export const PRODUCT_SCREENS: Partial<Record<string, ScreenKey>> = {
  touchboard: 'touchBoard',
  'facility-ops': 'facilityColdStorage',
  shyftgrid: 'shyftgridSchedule',
  // commerce-ops and inventory-ops still have no shippable capture — see the
  // exclusions at the top of this file.
};

/**
 * Product slugs whose screenshot is commissioned but not yet delivered. These
 * render a labelled reserved slot rather than nothing, so the gap is visible.
 */
export const PENDING_PRODUCT_SCREENS: Record<string, { label: string; hint: string }> = {
  'commerce-ops': {
    label: 'Commerce Ops — a trading day',
    hint: 'Sales summary with real transactions, and payments already activated',
  },
  'inventory-ops': {
    label: 'Inventory Ops — live stock',
    hint: 'Items with real quantities and units, active status, and recent scans',
  },
};

/**
 * Real TouchBoard product photography, replacing the reserved slots that stood
 * here until the shots arrived. Sources were 1672x941 PNGs (~3MB each) in
 * public/; optimized to 1200px WebP (~48-72KB each) and moved to
 * public/photos/. All three are 16:9, so the slots share that ratio and no
 * photo is cropped.
 */
export interface HardwarePhoto {
  key: string;
  src: string;
  width: number;
  height: number;
  /** Form factor this photo illustrates. */
  label: string;
  /** What the board is running in the shot. */
  running: string;
  alt: string;
}

export const HARDWARE_PHOTOS: HardwarePhoto[] = [
  {
    key: 'board-wall',
    src: '/photos/hardware-wall-mounted.webp',
    width: 1200,
    height: 675,
    label: 'Wall-mounted board',
    running: 'Workforce Wall Board',
    alt: 'A TouchBoard wall-mounted on a warehouse wall, running the Workforce Wall Board: a staffing health score of 90, "Fully staffed", who is on the floor, a live timeline, and a full-width Clock In bar. Warehouse racking and a worker in a hi-vis vest are visible beyond it.',
  },
  {
    key: 'kiosk-floor',
    src: '/photos/hardware-kiosk-freestanding.webp',
    width: 1200,
    height: 675,
    label: 'Freestanding floor kiosk',
    running: 'Employee Control Center',
    alt: 'A TouchBoard on a freestanding floor stand in a staff break room, screen in portrait, running the Employee Control Center with "Tap to see your shifts", a Clock In button, and this week\u2019s schedule. Colleagues sit at tables in the background.',
  },
  {
    key: 'kiosk-counter',
    src: '/photos/hardware-counter.webp',
    width: 1200,
    height: 675,
    label: 'Counter station',
    running: 'POS Checkout Station',
    alt: 'A TouchBoard on a coffee-shop counter running the ShyftGrid POS register: a searchable product list with stock counts, a cart totalling $35.90, and a green Charge button. A barista works at the espresso machine behind it.',
  },
];
