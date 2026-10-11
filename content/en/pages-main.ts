import type { Page } from '@/lib/i18n/types';

/**
 * Main pages (English source). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const home: Page = {
  meta: {
    title: 'VexaOs: Monitor Anything, Anywhere',
    description:
      'VexaOs is a vendor-neutral monitoring platform: wireless sensors and smart plugs, an offline-safe Edge Gateway, VexaOs Cloud with AI Insights, and apps for web, iOS and Android.',
  },
  hero: {
    eyebrow: 'Vendor-neutral monitoring platform',
    title: 'Monitor anything, [[anywhere.]]',
    subtitle:
      'Wireless sensors, an Edge Gateway that keeps recording when the internet drops, a cloud that spots trouble early, and apps for web, iOS and Android. One platform, any industry.',
    ctas: [
      { label: 'Book a demo', href: '/contact', variant: 'primary' },
      { label: 'See how it works', href: '/platform', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'heroShots',
      caption: 'The VexaOs web dashboard. Real captures from our test site: two sensors, one gateway, no sample data.',
    },
    {
      type: 'stack',
      id: 'stack',
      eyebrow: 'The platform',
      title: 'Four layers. One system.',
      subtitle:
        "Each layer does one job and hands off to the next, so a reading taken in a freezer ends up as an alert in someone's hand.",
      link: { label: 'How the platform works', href: '/platform' },
    },
    {
      type: 'sensors',
      id: 'sensors',
      tinted: true,
      compact: true,
      eyebrow: 'Sensor families',
      title: 'Far more than a thermometer.',
      subtitle:
        'Nine families of sensor, wireless and wired, on one platform. Green is working today; the rest we add through adapters.',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Built for the real world',
      title: 'Monitoring that keeps working when things go wrong.',
      subtitle: 'Networks drop, power blips and batteries run down. The platform is built around those days.',
      items: [
        { icon: 'gateway', title: 'Offline-safe', body: 'The gateway writes every reading to its own storage and uploads it, once and in order, when the connection returns.' },
        { icon: 'plug', title: 'Self-healing', body: 'Watchdogs restart a stalled radio or service and work to bring the network back, with no one on site.' },
        { icon: 'door', title: 'Instant door events', body: 'A door opening or closing is sent the moment it happens. It does not wait for the next summary.' },
        { icon: 'cloud', title: 'Early warning', body: 'Drift detection and time-to-limit forecasts flag a problem while there is still time to act.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'VexaOs Cloud & AI Insights',
      title: 'It tells you what changed, and what to look at.',
      body: 'Every 30 minutes the cloud checks each sensor for the patterns that come before a failure. Findings are computed from your measurements, and each one carries the numbers behind it.',
      checks: [
        '**Drift detection.** A steady rise or fall over six hours, flagged before a limit is crossed.',
        '**Time-to-limit forecasts.** How many hours until a sensor reaches its alert limit at the current rate.',
        '**Door patterns.** Left open, opened at unusual hours, or open far longer than normal.',
        '**Plain-English explanations.** What happened, the likely cause and what to do, always shown next to the measured numbers.',
      ],
      shot: 'doorActivity',
      link: { label: 'More on Cloud & AI Insights', href: '/products/cloud-ai-insights' },
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Energy',
      title: 'See what every appliance costs to run.',
      subtitle: 'Plug an appliance into a smart plug and its power, energy and cost show up next to your other sensors.',
      items: [
        { icon: 'energy', title: 'Smart-plug monitoring', status: 'available', body: 'Wi-Fi metering plugs report power now and energy used, appliance by appliance.' },
        { icon: 'cloud', title: 'Your real prices', status: 'available', body: 'Enter a flat price, prices by season, or on-peak and off-peak prices by season. Cost follows the price in effect on the day.' },
        { icon: 'plug', title: 'Standby draw', status: 'available', body: 'Equipment that keeps drawing power while it sits idle is flagged as a finding.' },
        { icon: 'apps', title: 'Cost by appliance', status: 'available', body: 'A breakdown of cost per appliance and area, the biggest cost drivers, and a projected month.' },
      ],
      note: {
        body: 'Costs are estimates from the prices you enter, not a utility bill. One smart plug model is supported today and it fits North American outlets; plugs for other regions, and panel meters over RS-485 / Modbus, are added as an integration.',
      },
      link: { label: 'Energy in the sensor catalog', href: '/products/sensors#energy' },
    },
    {
      type: 'industries',
      id: 'industries',
      tinted: true,
      eyebrow: 'Solutions',
      title: 'One platform, many places to use it.',
      subtitle: 'The same sensors, gateway, cloud and apps, applied to what you need to watch.',
    },
    {
      type: 'split',
      flip: true,
      eyebrow: 'Vendor-neutral',
      title: 'Not tied to one make of sensor.',
      body: 'Each sensor type plugs into the gateway through an adapter that turns its readings into one common format. The cloud and the apps never need to know who made the sensor.',
      checks: [
        'Add a new sensor type without replacing your gateway or changing your apps.',
        'Every reading is stored in standard units, whatever the sensor reports.',
        'Unknown data formats are refused, never guessed at.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Where things stand',
      title: 'What works today, and what is coming.',
      subtitle: 'We would rather you know now than find out later.',
      items: [
        {
          title: 'Working today',
          status: 'available',
          body: 'Temperature, humidity, pressure and door sensors. Wi-Fi smart plugs with energy cost. The VexaOs Edge Gateway. VexaOs Cloud with AI Insights. The web dashboard and the iOS and Android app, with phone notifications.',
        },
        {
          title: 'Being built',
          status: 'development',
          body: 'Vibration and machine-health sensing is being integrated. Wired RS-485 / Modbus devices are delivered as an integration. Email alerts are built but not switched on yet.',
        },
        {
          title: 'Mobile Gateway',
          status: 'soon',
          body: 'A gateway for vehicles, trailers and sites without fixed power or network. Planned, not shipping.',
        },
      ],
    },
  ],
};

const platform: Page = {
  meta: {
    title: 'Platform: How VexaOs Works',
    description:
      'How VexaOs works: sensors and smart plugs report to an offline-safe Edge Gateway, which sends summaries and instant alarms to VexaOs Cloud, where AI Insights and the web, iOS and Android apps turn them into action.',
  },
  hero: {
    eyebrow: 'Platform',
    title: 'From a sensor on the wall to an alert [[in your hand.]]',
    subtitle:
      'VexaOs is four layers that work as one system: sensors, gateway, cloud and apps. Here is what each one does, and what happens to a reading along the way.',
    ctas: [
      { label: 'Book a demo', href: '/contact', variant: 'primary' },
      { label: 'Browse the products', href: '/products', variant: 'secondary' },
    ],
  },
  sections: [
    { type: 'stack' },
    {
      type: 'steps',
      tinted: true,
      eyebrow: 'The journey of a reading',
      title: 'What happens, step by step.',
      items: [
        { title: 'A sensor takes a reading', body: 'Battery-powered sensors broadcast temperature, humidity or door state over Bluetooth Low Energy every few seconds. Smart plugs report over Wi-Fi. Wired RS-485 / Modbus devices join through an integration.' },
        { title: 'The gateway hears it', body: 'The VexaOs Edge Gateway picks up every sensor in range, decodes it through the adapter for that sensor type, and converts it to one common format.' },
        { title: 'Rules are checked on site', body: 'Alarm rules run on the gateway itself. A crossed limit or a door event is sent straight away, ahead of everything else in the queue.' },
        { title: 'Summaries go to the cloud', body: 'By default the gateway sends a summary per sensor every 10 seconds: minimum, maximum, average and latest. The interval can be set per sensor.' },
        { title: 'The cloud looks for trouble', body: 'VexaOs Cloud stores the history and checks every sensor for drift, forecasts, unusual door activity, low batteries and silent devices.' },
        { title: 'You see it and act', body: 'Dashboards update live on web, iOS and Android, and alerts reach your phone. Alerts can be acknowledged and resolved, with a record of who did what.' },
      ],
    },
    {
      type: 'sensors',
      id: 'sensors',
      compact: true,
      eyebrow: 'Sensor families',
      title: 'What the platform can listen to.',
      subtitle:
        'Nine families of sensor, wireless and wired, on one platform. Green is working today; the rest we add through adapters.',
    },
    {
      type: 'split',
      id: 'offline',
      tinted: true,
      eyebrow: 'When the internet drops',
      title: 'Nothing is lost. Nothing is counted twice.',
      body: 'The gateway never assumes the network is there. Readings go into a durable queue on the gateway first, and are only removed once the cloud confirms it has them.',
      checks: [
        'Readings and alarms are kept through internet outages and gateway restarts.',
        'When the connection returns, alarms upload first, then everything else from oldest to newest.',
        'Every message has its own ID, so a retry can never create a duplicate.',
        'Alarms that were open before a restart are still open after it.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      id: 'vendor-neutral',
      cols: 3,
      eyebrow: 'Vendor-neutral by design',
      title: 'Sensors plug in through adapters.',
      subtitle:
        'An adapter is a small piece of software on the gateway that understands one sensor type. Everything after it speaks a single VexaOs format.',
      items: [
        { icon: 'plug', title: 'Add sensor types over time', body: 'Supporting a new kind of sensor means adding an adapter. The gateway, cloud and apps stay as they are.' },
        { icon: 'sensors', title: 'One format, standard units', body: 'Temperature, humidity, pressure, power, battery and signal are stored in standard units. The apps convert for display, for example °C or °F.' },
        { icon: 'gateway', title: 'No guessing', body: 'If a sensor sends a format the adapter does not recognize, the reading is refused rather than guessed at.' },
      ],
    },
    {
      type: 'cards',
      id: 'security',
      tinted: true,
      cols: 4,
      eyebrow: 'Security and access',
      title: 'Each gateway proves who it is. Each person sees only their sites.',
      items: [
        { title: 'A key per gateway', body: 'Every gateway holds its own device key and signs in with it. The key never leaves the gateway.' },
        { title: 'Encrypted in transit', body: 'Gateways talk to VexaOs Cloud over HTTPS with certificate checking. Encrypted sensor broadcasts are supported too.' },
        { title: 'Access by membership', body: 'Data is separated by organization and site. People see only the sites they have been added to.' },
        { title: 'Invite-only accounts', body: 'Accounts are created by invitation, with owner, admin, installer and viewer roles.' },
      ],
      note: {
        body: 'VexaOs does not hold security or compliance certifications today, such as SOC 2 or ISO 27001. If you need specific assurances, ask us and we will answer plainly.',
      },
    },
  ],
};

const products: Page = {
  meta: {
    title: 'Products',
    description:
      'The VexaOs product line: wireless sensors and smart plugs, the VexaOs Edge Gateway, the Mobile Gateway (coming soon), VexaOs Cloud with AI Insights, and apps for web, iOS and Android.',
  },
  hero: {
    eyebrow: 'Products',
    title: 'Everything between the reading [[and the decision.]]',
    subtitle: 'Five products that are designed together. Start with one site and a few sensors, and add more as you need them.',
  },
  sections: [{ type: 'products' }],
};

const solutions: Page = {
  meta: {
    title: 'Solutions by Industry',
    description:
      'How VexaOs is used across industries: food service and cold chain, warehouses and logistics, manufacturing, facilities and property, and healthcare and pharma storage.',
  },
  hero: {
    eyebrow: 'Solutions',
    title: 'One platform. [[Your industry.]]',
    subtitle:
      'VexaOs is not built for one kind of business. The same sensors, gateway, cloud and apps apply wherever temperature, humidity, a door or an appliance matters.',
  },
  sections: [
    {
      type: 'solutions',
      other: {
        title: 'Something else?',
        body: 'If it has a temperature, a humidity, a door or a plug, the platform can probably watch it. Tell us what you have in mind.',
        label: 'Talk to us',
      },
      restaurant: { eyebrow: 'Also from VexaOs', label: 'See Restaurant OS' },
    },
  ],
};

/** Labels around an industry page; the industry's own words are in catalog.ts. */
const industry = {
  eyebrowPrefix: 'Solutions',
  metaTitle: '{name} Monitoring',
  primary: 'Book a demo',
  secondary: 'How the platform works',
  monitor: { eyebrow: 'What to monitor', title: 'Where it earns its keep.' },
  how: { eyebrow: 'How VexaOs helps', title: 'The platform, applied.' },
  stack: { eyebrow: 'The same stack everywhere', title: 'What you would be running.' },
  restaurantLead: 'Running a restaurant? See',
  restaurantTail: ', our hospitality solution.',
};

const restaurantOs: Page = {
  meta: {
    title: 'Restaurant OS: VexaOs Hospitality',
    description:
      'Restaurant OS is the VexaOs Hospitality solution for running a restaurant: floor, kitchen display and orders in one control center. Approaching pilot.',
  },
  hero: {
    eyebrow: 'Solutions · VexaOs Hospitality',
    status: 'development',
    title: 'Restaurant OS: [[one system for the whole restaurant.]]',
    subtitle:
      'Restaurant OS is a separate VexaOs solution for hospitality. It connects the floor, the kitchen and orders in one control center. It is approaching pilot and is not generally available.',
    ctas: [
      { label: 'Ask about the pilot', href: '/contact', variant: 'primary' },
      { label: 'Cold chain monitoring', href: '/solutions/food-service-cold-chain', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Front of house',
      title: 'The floor, live.',
      body: 'Every table and its status in one view, updating as hosts seat parties and tables are cleared.',
      checks: [
        'Tables by section, with seats and current status.',
        'Available, seated and needs-bussing counts at a glance.',
        'Managers can add tables and override status.',
      ],
      shot: 'restaurantFloor',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Kitchen',
      title: 'Tickets from the line to the pass.',
      body: 'The kitchen display mirrors live tickets by stage, so the control center shows what the kitchen sees.',
      checks: [
        'On the line, ready to run and served.',
        'Dine-in, catering and delivery tickets together.',
        'Mark tickets ready and served from the control center.',
      ],
      shot: 'restaurantKitchen',
    },
    {
      type: 'note',
      note: {
        title: 'How this fits with the monitoring platform',
        body: "Restaurant OS and the VexaOs monitoring platform are separate products today. A restaurant can use VexaOs sensors and gateways to watch its coolers and doors without Restaurant OS, and the other way round. The screenshots on this page show Restaurant OS running on demonstration data, not a customer's restaurant.",
      },
      linkLead: 'Looking for cooler, freezer and door monitoring?',
      link: { label: 'See food service and cold chain', href: '/solutions/food-service-cold-chain' },
    },
  ],
  cta: {
    title: 'Interested in the Restaurant OS pilot?',
    body: 'Tell us about your restaurant and we will walk you through where Restaurant OS stands today.',
  },
};

const about: Page = {
  meta: {
    title: 'About VexaOs',
    description:
      'VexaOs builds a vendor-neutral platform to monitor anything, anywhere: sensors, an offline-safe Edge Gateway, cloud AI Insights, and apps. Based in Pontiac, Michigan.',
  },
  hero: {
    eyebrow: 'About',
    title: 'We build the platform that [[watches what matters.]]',
    subtitle:
      'VexaOs is a technology company based in Pontiac, Michigan. We make a vendor-neutral platform for monitoring equipment and spaces: sensors, gateways, cloud and apps, designed as one system.',
  },
  sections: [
    {
      type: 'prose',
      paragraphs: [
        'A lot of what a business depends on happens out of sight. A freezer warms up overnight. A door is left open. A room gets damp. Usually someone finds out afterwards, when the damage is done.',
        'VexaOs exists to close that gap. We put the hardest parts first: a gateway that keeps recording when the network fails, and a cloud that notices a slow drift as well as a crossed limit. Then we built the apps on top, so the right person sees it in time.',
        'The platform is not tied to one industry or one make of sensor. Food service, warehouses, manufacturing, facilities and healthcare storage all have the same underlying need, and the same platform serves each.',
      ],
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'How we work',
      title: 'What you can expect from us.',
      items: [
        { title: 'We say what is real', body: 'If something is in development or coming soon, we label it. You will not find invented customers, statistics or certifications on this site.' },
        { title: 'Measured before AI', body: 'Findings come from your measurements and show their numbers. AI is used to explain, never to decide.' },
        { title: 'Built for bad days', body: 'We design for the outage, the power cut and the flat battery, because those are the days monitoring is needed most.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Where we are',
      title: 'A young company, building in the open.',
      items: [
        { title: 'Today', body: 'The monitoring platform works end to end: temperature, humidity and door sensors, smart plugs with energy cost, the Edge Gateway, VexaOs Cloud with AI Insights, and the web and mobile apps. We are booking demos now.' },
        { title: 'Next', body: 'Vibration and machine-health sensing, wired RS-485 / Modbus devices, email alerts, and the Mobile Gateway. Restaurant OS, our hospitality solution, is approaching pilot.' },
      ],
    },
    { type: 'findUs', title: 'Find us' },
  ],
};

const contact: Page = {
  meta: {
    title: 'Book a Demo',
    description:
      'Book a demo of the VexaOs monitoring platform, or get in touch. Tell us what you want to monitor and we will show you how it works.',
  },
  hero: {
    eyebrow: 'Book a demo',
    title: 'Tell us what you need [[to keep an eye on.]]',
    subtitle:
      'A short note is enough. We will show you the platform working, and tell you plainly what it can and cannot do for you today.',
  },
  sections: [
    {
      type: 'contact',
      next: {
        title: 'What happens next',
        items: [
          'We reply by email to arrange a time.',
          'We walk you through the dashboard, alerts and insights.',
          'We talk through your sites and which sensors fit.',
        ],
      },
      email: { title: 'Prefer email?' },
    },
  ],
  cta: false,
};

export const pagesMain = { home, platform, products, solutions, industry, restaurantOs, about, contact };
