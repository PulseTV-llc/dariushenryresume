/**
 * Product imagery.
 *
 * Sources live outside the repo at ~/Documents/vexaos-docs/. Most captures now
 * come from the curated `marketing-screens/` set; `location-switcher` is still
 * from `demo-screens/` because that set has no replacement for it yet. See
 * SCREEN_SOURCES for per-image provenance.
 *
 * Only screenshots that show the product working are wired in. Captures still
 * showing error toasts or empty states are deliberately excluded — as of the
 * latest marketing-screens drop that is 03-commerce-ops (empty "select a
 * location" state plus an un-actioned Stripe activation banner) and
 * 04-shyftgrid-schedule (the "We couldn't load your schedule" error). Both were
 * recaptured but not reseeded, so they still cannot ship.
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
      'One organization, many locations — every product respects the same hierarchy.',
    frame: 'browser',
  },
  unifiedSettings: {
    src: '/screens/unified-settings.webp',
    width: 1800,
    height: 1125,
    alt: 'VexaOS settings, split into platform settings that exist once and product settings shown only for products the organization holds.',
    caption:
      'Platform settings exist once, regardless of which products you hold. Product settings appear only for what you own.',
    frame: 'browser',
  },
  touchBoard: {
    src: '/screens/touchboard-board.webp',
    width: 1290,
    height: 800,
    alt: 'A TouchBoard wall display showing who is on the floor, an uncovered open shift, a pending swap, and a staffing health score.',
    caption:
      'TouchBoard on the wall — who is in, who is late, what is uncovered, and how the shift is tracking.',
    frame: 'device',
  },
} satisfies Record<string, Screenshot>;

export type ScreenKey = keyof typeof SCREENS;

/** Provenance, so a re-drop can be swapped in without guesswork. */
export const SCREEN_SOURCES: Record<ScreenKey, string> = {
  vexaosHome: 'marketing-screens/01-vexaos-control-center.png',
  productSwitcher: 'marketing-screens/02-product-switcher.png',
  locationSwitcher: 'demo-screens/04-location-switcher.png (no marketing-screens equivalent yet)',
  unifiedSettings: 'marketing-screens/05-unified-settings.png',
  touchBoard:
    'marketing-screens/07-touchboard-MARKETING-PAGE-landscape.png (cropped to the board panel)',
};

/**
 * Product slug → screenshot. Products without a usable capture fall through to
 * the hardware/graphic slots rather than showing a broken or empty screen.
 */
export const PRODUCT_SCREENS: Partial<Record<string, ScreenKey>> = {
  touchboard: 'touchBoard',
  // facility-ops: awaiting the neutral cold-storage capture (walk-in coolers /
  // freezers, temp + humidity). Drop it into marketing-screens/, optimize to
  // /public/screens/facility-cold-storage.webp, add it to SCREENS, and point
  // this key at it. Until then the page renders the reserved slot below.
};

/**
 * Product slugs whose screenshot is commissioned but not yet delivered. These
 * render a labelled reserved slot rather than nothing, so the gap is visible.
 */
export const PENDING_PRODUCT_SCREENS: Record<string, { label: string; hint: string }> = {
  'facility-ops': {
    label: 'Facility Ops — cold-storage monitoring',
    hint: 'Walk-in coolers and freezers, temperature and humidity against setpoints',
  },
};

/**
 * Hardware photography slots. The user is supplying real board and kiosk
 * photos; until then these render as labelled placeholders rather than stock.
 */
export interface HardwareSlot {
  key: string;
  label: string;
  hint: string;
  /** Aspect ratio as a CSS aspect-ratio value. */
  ratio: string;
}

export const HARDWARE_PHOTO_SLOTS: HardwareSlot[] = [
  {
    key: 'board-wall',
    label: 'TouchBoard, wall-mounted',
    hint: 'Back-of-house board in situ, staff in frame',
    ratio: '4 / 3',
  },
  {
    key: 'kiosk-floor',
    label: 'VexaFront freestanding kiosk',
    hint: 'Lobby or counter kiosk, customer using it',
    ratio: '3 / 4',
  },
  {
    key: 'kiosk-counter',
    label: 'VexaFront counter kiosk',
    hint: 'Countertop unit at point of service',
    ratio: '4 / 3',
  },
];
