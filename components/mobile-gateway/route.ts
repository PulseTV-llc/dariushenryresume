/**
 * The illustrative Detroit → Chicago map (viewBox 1000×560). A stylized drawing, not cartography: the lakes are
 * simplified shapes and the route is a smooth line between the two cities. Shared by the location story and the
 * simulated trip dashboard.
 */
export const MAP = { w: 1000, h: 560 };
export const CITIES = { detroit: { x: 846, y: 352 }, chicago: { x: 168, y: 318 } };
export const ROUTE = 'M846 352 C 790 372, 712 392, 622 386 S 470 372, 392 362 S 262 352, 214 336 S 180 324, 168 318';
/** Lake Michigan, the southern end of Lake Huron, Lake St. Clair and the western end of Lake Erie, simplified. */
export const LAKES = [
  'M150 0 C 160 60, 120 120, 128 190 C 134 240, 150 280, 186 296 C 214 306, 236 290, 246 256 C 262 200, 250 130, 262 70 C 268 40, 262 14, 258 0 Z',
  'M760 0 C 780 40, 800 90, 812 150 C 820 190, 836 214, 858 212 C 880 208, 888 170, 890 120 C 892 70, 900 30, 920 0 Z',
  'M872 300 C 884 292, 900 296, 902 308 C 904 320, 890 328, 878 324 C 868 320, 864 308, 872 300 Z',
  'M880 420 C 920 404, 970 396, 1000 392 V 560 H 1000 C 970 520, 930 470, 880 450 C 866 444, 866 426, 880 420 Z',
];
/** Where along the route (0..1) each of the five conceptual journey events happens. */
export const EVENT_AT = [0, 0.24, 0.48, 0.72, 1];
