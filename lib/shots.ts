/**
 * Real product screenshots.
 *
 * The /product/iot-* images are crops of unedited captures of the VexaOS web
 * and mobile apps running against a real gateway and real sensors on a test
 * site ("Test Kitchen"). They are cropped only; no pixel is edited and no data
 * is invented.
 *
 * The /product/restaurant-* images are crops of the Restaurant OS control center running on
 * demonstration data, and must always be captioned as such.
 */

export interface ShotDef {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

const TEST_SITE = 'Real capture from our test site.';

export const SHOTS = {
  dashboardSummary: {
    src: '/product/iot-dashboard-summary.webp',
    width: 1672,
    height: 236,
    alt: 'VexaOS web dashboard summary row: 2 of 2 sensors online, average temperature 21.4 °C, humidity 40%, pressure 978 hPa, no active alerts, gateway online.',
    caption: `The web dashboard summary row. ${TEST_SITE}`,
  },
  dashboardPanels: {
    src: '/product/iot-dashboard-panels.webp',
    width: 680,
    height: 570,
    alt: 'VexaOS dashboard panels: active alerts, gateway status showing online, a 24-hour temperature trend, and a location overview.',
    caption: `Alerts, gateway status, temperature trend and locations. ${TEST_SITE}`,
  },
  doorActivity: {
    src: '/product/iot-door-activity.webp',
    width: 1600,
    height: 790,
    alt: 'VexaOS sensor details for a door sensor: temperature, humidity, battery and signal tiles, opens today, longest open, and a timeline of open and closed events.',
    caption: `Door sensor details: every open and close on a timeline. ${TEST_SITE}`,
  },
  sensorCharts: {
    src: '/product/iot-sensor-charts.webp',
    width: 1600,
    height: 796,
    alt: 'VexaOS sensor history charts for temperature, humidity, battery and signal strength over 24 hours.',
    caption: `Sensor history over 24 hours: temperature, humidity, battery and signal. ${TEST_SITE}`,
  },
  mobileDashboard: {
    src: '/product/iot-mobile-dashboard.webp',
    width: 780,
    height: 700,
    alt: 'VexaOS mobile app dashboard showing active sensors and average temperature tiles.',
    caption: `The mobile dashboard. ${TEST_SITE}`,
  },
  mobileGateway: {
    src: '/product/iot-mobile-gateway.webp',
    width: 780,
    height: 380,
    alt: 'VexaOS mobile app showing a VexaOS Edge Gateway online, with last contact less than a minute ago.',
    caption: `Gateway status in the mobile app. ${TEST_SITE}`,
  },
  restaurantFloor: {
    src: '/product/restaurant-floor.webp',
    width: 1632,
    height: 812,
    alt: 'Restaurant OS floor board showing ten tables by status: available, seated and needs bussing.',
    caption: 'Restaurant OS floor board, running on demonstration data.',
  },
  restaurantKitchen: {
    src: '/product/restaurant-kitchen.webp',
    width: 1632,
    height: 372,
    alt: 'Restaurant OS kitchen display showing tickets on the line, ready to run, and served.',
    caption: 'Restaurant OS kitchen display, running on demonstration data.',
  },
} satisfies Record<string, ShotDef>;
