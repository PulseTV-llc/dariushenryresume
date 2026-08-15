/**
 * Product imagery.
 *
 * Sources live outside the repo at ~/Documents/vexaos-docs/. The curated
 * `marketing-screens/` set is the intended source; until it lands, these are
 * optimized from `demo-screens/` (see SCREEN_SOURCES for provenance).
 *
 * Only screenshots that show the product working are wired in. Captures that
 * show error toasts, empty states, or un-gated internal views are deliberately
 * excluded — see the report in the session notes for which and why.
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
    height: 1250,
    alt: 'The VexaOS control center showing an organization with three locations, the products it holds, and the products available to add.',
    caption:
      'The VexaOS control center — every product your organization holds, and the ones it does not, in one place.',
    frame: 'browser',
  },
  productSwitcher: {
    src: '/screens/product-switcher.webp',
    width: 1800,
    height: 1250,
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
    height: 1250,
    alt: 'VexaOS settings, split into platform settings that exist once and product settings shown only for products the organization holds.',
    caption:
      'Platform settings exist once, regardless of which products you hold. Product settings appear only for what you own.',
    frame: 'browser',
  },
  touchBoard: {
    src: '/screens/touchboard-board.webp',
    width: 1330,
    height: 850,
    alt: 'A TouchBoard wall display showing who is on the floor, an uncovered open shift, a pending swap, and a staffing health score.',
    caption:
      'TouchBoard on the wall — who is in, who is late, what is uncovered, and how the shift is tracking.',
    frame: 'device',
  },
} satisfies Record<string, Screenshot>;

export type ScreenKey = keyof typeof SCREENS;

/** Provenance, so the curated set can be swapped in without guesswork. */
export const SCREEN_SOURCES: Record<ScreenKey, string> = {
  vexaosHome: 'demo-screens/01-vexaos-home.png',
  productSwitcher: 'demo-screens/02-product-switcher.png',
  locationSwitcher: 'demo-screens/04-location-switcher.png',
  unifiedSettings: 'demo-screens/05-unified-settings.png',
  touchBoard: 'demo-screens/08-touchboard.png (cropped to the board panel)',
};

/**
 * Product slug → screenshot. Products without a usable capture fall through to
 * the hardware/graphic slots rather than showing a broken or empty screen.
 */
export const PRODUCT_SCREENS: Partial<Record<string, ScreenKey>> = {
  touchboard: 'touchBoard',
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
