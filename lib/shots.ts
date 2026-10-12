import type { ShotKey } from './i18n/types';

/**
 * Real product screenshots (files and sizes; alt text and captions are in
 * content/<locale>/common.ts).
 *
 * The iot-* images are crops of unedited captures of the VexaOs web and mobile
 * apps running against a real gateway and real sensors on a test site. They
 * are cropped only: no pixel is edited and no data is invented. Crops leave
 * out the old logo and third-party hardware names.
 *
 * The restaurant-* images are crops of the Restaurant OS control center
 * running on demonstration data, and are always captioned as such.
 */
export const SHOTS: Record<ShotKey, { src: string; width: number; height: number }> = {
  dashboardSummary: { src: '/product/iot-dashboard-summary.webp', width: 1166, height: 236 },
  dashboardPanels: { src: '/product/iot-dashboard-panels.webp', width: 362, height: 570 },
  doorActivity: { src: '/product/iot-door-activity.webp', width: 1600, height: 790 },
  sensorCharts: { src: '/product/iot-sensor-charts.webp', width: 1600, height: 796 },
  mobileDashboard: { src: '/product/iot-mobile-dashboard.webp', width: 780, height: 550 },
  restaurantFloor: { src: '/product/restaurant-floor.webp', width: 1632, height: 812 },
  restaurantKitchen: { src: '/product/restaurant-kitchen.webp', width: 1632, height: 372 },
};
