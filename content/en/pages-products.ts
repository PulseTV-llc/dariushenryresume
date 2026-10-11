import type { Page } from '@/lib/i18n/types';

/**
 * Product pages (English source). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const sensors: Page = {
  meta: {
    title: 'Sensor Catalog: Nine Families, Wireless and Wired',
    description:
      'The VexaOs sensor catalog: environment, cold chain, access and occupancy, water and leak, machine health, industrial process, energy, assets and safety, over Bluetooth LE, Wi-Fi or RS-485 / Modbus. Each measurement is labelled available now or via integration.',
  },
  hero: {
    eyebrow: 'Products · Sensors',
    title: 'A sensor for [[whatever you need to watch.]]',
    subtitle:
      'Nine sensor families, wireless and wired, on one platform. Every measurement is labelled, so you can see what works today and what we add through an adapter.',
    ctas: [{ label: 'Ask about sensors', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'sensors',
      id: 'catalog',
      compact: false,
      eyebrow: 'Sensor catalog',
      title: 'Nine families. Pick your industry.',
      subtitle: 'Filter by industry, then open a family for the detail.',
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Connectivity',
      title: 'Wireless and wired, into one gateway.',
      subtitle: 'Bluetooth sensors and Wi-Fi smart plugs work today. Wired RS-485 / Modbus devices are added as an integration.',
    },
    {
      type: 'split',
      eyebrow: 'Door sensors',
      title: 'Every open and close, on a timeline.',
      body: 'Door events are sent as they happen. In the apps you see how many times a door opened today, the longest it stayed open, and each event with its time.',
      checks: [
        'Each change is recorded once, in order, even through an outage.',
        'A door open for 10 minutes or more is flagged.',
        'Openings at unusual hours and unusually long open time are called out.',
      ],
      shot: 'doorActivity',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Sensor health',
      title: 'The sensors watch themselves, too.',
      body: 'A monitoring system is only useful if you know it is still working. Every sensor reports its battery and signal, and the platform raises its own findings when one needs attention.',
      checks: [
        'Low battery, or a battery on course to run out within 30 days.',
        'Weak signal, or signal that has dropped sharply.',
        'A sensor that has gone quiet while its gateway is still online.',
      ],
      shot: 'sensorCharts',
      note: {
        body: 'Sensors that are available now connect over Bluetooth Low Energy, so they need to be within radio range of a gateway; we check signal at each location during setup. "Via integration" means the adapter does not exist yet, and that includes everything on RS-485 / Modbus: we build it when a customer needs it, and we do not publish specifications for sensors we have not integrated.',
      },
    },
  ],
};

const edgeGateway: Page = {
  meta: {
    title: 'VexaOs Edge Gateway: Offline-Safe and Self-Healing',
    description:
      'The VexaOs Edge Gateway collects readings from nearby sensors and smart plugs, checks alarm rules on site, keeps every reading through outages and restarts, and recovers by itself.',
  },
  hero: {
    eyebrow: 'Products · Edge Gateway',
    title: 'The gateway that [[keeps recording.]]',
    subtitle:
      'The VexaOs Edge Gateway sits on site, listens to every sensor in range, and gets the data to the cloud. When the network or power lets it down, it holds on to your readings and puts itself right.',
    ctas: [
      { label: 'Book a demo', href: '/contact', variant: 'primary' },
      { label: 'How offline mode works', href: '/platform#offline', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'cards',
      cols: 3,
      items: [
        { icon: 'gateway', title: 'Offline-safe', body: 'Readings are written to durable storage on the gateway and removed only after the cloud confirms receipt. An outage delays your data; it does not lose it.' },
        { icon: 'plug', title: 'Self-healing', body: 'If the sensor radio goes silent, the gateway restarts scanning, then resets the radio, then restarts its own service. A hardware watchdog covers a full freeze.' },
        { icon: 'cloud', title: 'Auto-recovery', body: 'When the network drops, the gateway works through reconnecting Wi-Fi, restarting networking and, as a last resort, a rate-limited reboot. It starts by itself after power returns.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'On-site decisions',
      title: 'Alarms do not wait for the cloud.',
      body: 'Alarm rules are checked on the gateway against every reading. A raised or cleared alarm goes to the front of the queue and is sent immediately.',
      checks: [
        'Limits with a hold time, so a brief spike does not raise an alarm.',
        'Hysteresis, so a reading hovering at the limit does not flap on and off.',
        'Summaries every 10 seconds by default, adjustable per sensor.',
        'Detailed raw readings stay on the gateway; the cloud gets the summaries.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Gateway health',
      title: 'You can see the gateway is alive.',
      subtitle:
        'Every minute the gateway reports its own health: network, sensor radio, uptime and power supply. If it has had to recover from something, it tells you what happened.',
      items: [
        { title: 'Offline', body: 'A gateway offline for 5 minutes raises a finding.' },
        { title: 'Power', body: 'A weak power supply is detected and reported.' },
        { title: 'Backlog', body: 'A backlog of readings waiting to upload is visible.' },
        { title: 'Identity', body: 'Each gateway signs in with its own device key over HTTPS.' },
      ],
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Connectivity',
      title: 'Wireless and wired, into one gateway.',
      subtitle: 'Bluetooth sensors and Wi-Fi smart plugs work today. Wired RS-485 / Modbus devices are added as an integration.',
    },
    {
      type: 'cards',
      cols: 3,
      eyebrow: 'Setup',
      title: 'What a gateway needs.',
      items: [
        { title: 'Mains power', body: 'The Edge Gateway is for fixed sites with a power outlet. For places without one, see the Mobile Gateway, which is coming soon.' },
        { title: 'Wi-Fi or Ethernet', body: 'An ordinary internet connection is enough. The gateway makes outbound HTTPS connections only.' },
        { title: 'Sensors in range', body: 'Wireless sensors connect over Bluetooth Low Energy; larger sites use more than one gateway. Smart plugs join the same network as the gateway. Wired RS-485 / Modbus devices are added as an integration.' },
      ],
      note: {
        body: 'The Edge Gateway is new. Its offline queue, self-recovery and restart behaviour are covered by automated tests, and it runs with real sensors on our own test site. Long-duration field testing is still under way, and we will share exactly where it stands when you talk to us.',
      },
    },
  ],
};

const mobileGateway: Page = {
  meta: {
    title: 'VexaOs Mobile Gateway (Coming Soon)',
    description:
      'The VexaOs Mobile Gateway is a planned gateway for vehicles, trailers and sites without fixed power or network. It is coming soon and is not available today.',
  },
  hero: {
    eyebrow: 'Products · Mobile Gateway',
    status: 'soon',
    title: 'Monitoring for places [[that move.]]',
    subtitle:
      'The VexaOs Mobile Gateway is planned for vehicles, trailers and temporary sites, where there is no fixed power or network. It is not available yet.',
    ctas: [
      { label: 'Tell us your use case', href: '/contact', variant: 'primary' },
      { label: 'See the Edge Gateway', href: '/products/edge-gateway', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'note',
      note: {
        title: 'Coming soon',
        body: 'This page describes what we are planning, not a product you can order. Specifications, pricing and dates are not final, so none are listed here. If mobile monitoring matters to you, get in touch and we will keep you informed.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'The plan',
      title: 'The same platform, away from the wall socket.',
      subtitle:
        'The Mobile Gateway is intended to work with the same sensors, the same VexaOs Cloud and the same apps as the Edge Gateway.',
      items: [
        { icon: 'mobile', title: 'Goods in transit', body: 'Intended for refrigerated vehicles and trailers, so a load is monitored between sites as well as at them.' },
        { icon: 'warehouse', title: 'Temporary sites', body: 'Intended for events, pop-ups and short-term storage where installing fixed equipment is not practical.' },
        { icon: 'gateway', title: 'Store and forward', body: "Built on the Edge Gateway's offline queue, which already keeps readings when there is no connection." },
      ],
    },
  ],
  cta: {
    title: 'Need mobile monitoring?',
    body: 'Tell us what you move and where. Your use case helps shape what we build, and we will let you know when the Mobile Gateway is ready.',
  },
};

const cloud: Page = {
  meta: {
    title: 'VexaOs Cloud & AI Insights',
    description:
      'VexaOs Cloud stores your sensor history and runs AI Insights: drift detection, time-to-limit forecasts, unusual door activity, energy cost and standby draw, with plain-English explanations always shown next to the measured numbers.',
  },
  hero: {
    eyebrow: 'Products · Cloud & AI Insights',
    title: 'Spot the problem [[before it becomes a loss.]]',
    subtitle:
      'VexaOs Cloud keeps your history, runs your alert rules, and checks every sensor for the patterns that come before a failure. Then it explains what it found in plain English.',
    ctas: [{ label: 'Book a demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Measured first',
      title: 'Detection is arithmetic. AI only does the explaining.',
      body: 'Findings come from fixed rules run on your measurements every 30 minutes. Each one stores the numbers it was computed from. The AI model is used for one thing: turning a finding that already exists into a clear sentence.',
      checks: [
        'Text is labelled **Measured** or **AI-written**, and AI text shows its confidence.',
        'AI text is never shown without the measured numbers beside it.',
        'The AI cannot create a finding, change its severity or close it.',
        'If AI explanations are switched off or unavailable, you still get every finding, described from the numbers.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'What it looks for',
      title: 'Findings, checked around the clock.',
      subtitle: 'Each has a severity of info, warning or critical, and a status you control: open, acknowledged or resolved.',
      items: [
        { title: 'Drift', body: 'A steady rise or fall in temperature or humidity over the last six hours, even while readings are still in range.' },
        { title: 'Time to limit', body: 'When a sensor with an alert rule is heading for its limit, the hours left at the current rate.' },
        { title: 'Unusual reading', body: 'A reading far from what this sensor normally shows at this hour of the day.' },
        { title: 'Door left open', body: 'A door that has been open for 10 minutes or more, right now.' },
        { title: 'Door at unusual hours', body: 'A door opened at an hour that has been quiet for the last two weeks.' },
        { title: 'Door open longer than normal', body: 'Total open time today at least double the recent daily average.' },
        { title: 'Warm and humid together', body: 'Temperature and humidity rising together, a common sign of a door seal or cooling problem.' },
        { title: 'Standby draw', body: 'A plugged-in appliance that keeps drawing power while it sits idle.' },
        { title: 'Energy cost', body: 'The biggest cost drivers of the week, a meaningful change month over month, and heavy use in on-peak hours.' },
        { title: 'Battery', body: 'A low battery, or one on course to run out within 30 days.' },
        { title: 'Signal', body: 'Weak signal, or a sharp drop compared with the days before.' },
        { title: 'Sensor gone quiet', body: 'No reading for 15 minutes while the gateway is still online.' },
        { title: 'Gateway health', body: 'A gateway offline, short on power, or with a backlog waiting to upload.' },
      ],
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Energy',
      title: 'Energy cost, from your own prices.',
      subtitle: 'Smart plugs report kWh. The cloud turns that into cost using the electricity prices you enter.',
      items: [
        { icon: 'energy', title: 'Three pricing modes', body: 'A flat price, a price per season, or on-peak and off-peak prices per season, set for the organization or for a single site.' },
        { icon: 'cloud', title: 'Price history', body: 'Each price has a start date, so a new price never rewrites the cost of energy already used.' },
        { icon: 'apps', title: 'Cost by appliance', body: 'Today, the last 7 days and this month, with a projected month and a breakdown by appliance and area.' },
        { icon: 'plug', title: 'Honest about gaps', body: 'Where a price has not been entered, the cost reads "rate not set". It is never shown as zero.' },
      ],
      note: {
        body: 'Costs are estimates from the prices you enter and whole-hour energy totals, not a utility bill. The default on-peak hours are a starting point, not any utility\'s official schedule.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 4,
      eyebrow: 'The cloud underneath',
      title: 'History, rules and access in one place.',
      items: [
        { title: 'History', body: 'Every summary is stored, with hourly roll-ups for fast charts over a day, a week or a month.' },
        { title: 'Alert rules', body: 'Set limits per sensor. Alerts keep a history, and can be acknowledged and resolved.' },
        { title: 'Live updates', body: 'Dashboards update as new readings arrive, without refreshing the page.' },
        { title: 'Sites and roles', body: 'Organizations, sites, locations and equipment, with access decided by membership and role.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Privacy',
      title: 'What the AI model is sent, and what it is not.',
      items: [
        { title: 'Sent', body: 'The site name and time zone, and for each finding: its kind and severity, the sensor name, location and equipment, and the summary numbers the finding was computed from.' },
        { title: 'Never sent', body: 'Your stream of raw readings, email addresses, user names, hardware addresses or keys. Every reply is checked before it is stored, and anything unexpected is discarded.' },
      ],
      note: {
        body: 'AI explanations are optional and use a third-party AI model. Critical findings and alerts reach your phone as push notifications; email delivery is built but not switched on yet, and text messages are not available. Forecasts are estimates based on the recent trend, not guarantees.',
      },
    },
  ],
};

const apps: Page = {
  meta: {
    title: 'VexaOs Apps for Web, iOS and Android',
    description:
      'The VexaOs apps for web, iOS and Android: live dashboards, alerts with phone notifications, analytics with CSV export, energy cost, multiple sites, and team roles, on one account.',
  },
  hero: {
    eyebrow: 'Products · Apps',
    title: 'Your sites, [[on every screen.]]',
    subtitle:
      'One account on the web and on iOS and Android. See what is happening now, look back over a month, and deal with an alert wherever you are.',
    ctas: [{ label: 'Book a demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    { type: 'shot', shot: 'dashboardSummary' },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Web dashboard',
      title: 'Everything in one place.',
      items: [
        { title: 'Dashboard', body: 'Sensors online, averages, active alerts, gateway status, power now, energy today and the latest insights at a glance.' },
        { title: 'Sensors', body: 'Search, filter and sort every sensor. Open one for its history, door timeline and profile.' },
        { title: 'Alerts', body: 'Alert history, acknowledge and resolve, and alert rules for each sensor.' },
        { title: 'Insights', body: 'Findings filtered by status, severity, kind and sensor, with the daily digest.' },
        { title: 'Analytics', body: 'Compare sensors, see daily minimum, average and maximum, review door activity, and export CSV.' },
        { title: 'Energy', body: 'Power now, kWh and cost by appliance and area, cost over time, a projected month, and CSV export.' },
        { title: 'Locations', body: 'Sites, locations within a site and equipment, with each sensor placed where it lives.' },
        { title: 'Devices', body: 'Gateway health, plus guided flows for adding a sensor or a smart plug.' },
        { title: 'Settings', body: 'Profile, organization, team invitations, units, energy pricing and notification preferences.' },
      ],
    },
    {
      type: 'split',
      eyebrow: 'iOS and Android',
      title: 'The same data in your pocket.',
      body: 'The mobile app follows the web dashboard: live sensors, sensor details with history, analytics, energy, insights and settings. It works in portrait and landscape, on phones and tablets.',
      checks: [
        'Live readings and door state for every sensor.',
        'Phone notifications for critical alerts, with quiet hours and reminders.',
        'Rename sensors and set their location and equipment from the app.',
        'Choose °C or °F; the data stays the same.',
      ],
      shot: 'mobileDashboard',
      phone: true,
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Teams and sites',
      title: 'The right people see the right sites.',
      body: 'Accounts are invitation-only. Each person is added to an organization, or to a single site within it, with a role that decides what they can do.',
      checks: [
        '**Owner and admin:** manage the organization, team and sites.',
        '**Installer:** add sensors, set rules and resolve findings.',
        '**Viewer:** see dashboards and acknowledge alerts.',
        'Switch between locations, or view them all together.',
      ],
      shot: 'dashboardPanels',
      note: {
        body: 'The iOS and Android app is not listed in the public app stores yet; we set it up with you during onboarding. Phone push notifications are live. Email alerts are built but not switched on yet, and text messages are not available. The apps are in English today.',
      },
    },
  ],
};

export const pagesProducts = {
  sensors,
  'edge-gateway': edgeGateway,
  'mobile-gateway': mobileGateway,
  'cloud-ai-insights': cloud,
  apps,
};
