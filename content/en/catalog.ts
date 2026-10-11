/**
 * Products, industries and the sensor catalog (English source).
 *
 * Structure (slugs, icons, statuses, connectivity) lives in lib/site.ts and
 * lib/sensors.ts. This file holds only the words, keyed by slug, and array
 * items line up by position with those registries.
 *
 * HONESTY RULES: only claim what the product does today; no customers,
 * statistics, certifications, sensor vendor names or specifications.
 */
export const catalog = {
  products: {
    sensors: {
      name: 'Sensors',
      short: 'Sensors',
      role: 'Measure',
      summary:
        'Nine sensor families, wireless and wired. Bluetooth temperature, humidity, pressure and door sensors and Wi-Fi smart plugs are live today; the rest, including RS-485 / Modbus, are added through adapters.',
    },
    'edge-gateway': {
      name: 'VexaOs Edge Gateway',
      short: 'Edge Gateway',
      role: 'Collect',
      summary:
        'Listens to nearby sensors and smart plugs, checks alarm rules on site, and keeps every reading through internet outages and restarts.',
    },
    'mobile-gateway': {
      name: 'VexaOs Mobile Gateway',
      short: 'Mobile Gateway',
      role: 'Collect on the move',
      summary: 'The same gateway for places without fixed power or network: vehicles, trailers and temporary sites.',
    },
    'cloud-ai-insights': {
      name: 'VexaOs Cloud & AI Insights',
      short: 'Cloud & AI Insights',
      role: 'Understand',
      summary:
        'Stores history, runs alert rules, prices your energy use, and flags drift, time-to-limit forecasts and unusual door activity in plain English.',
    },
    apps: {
      name: 'VexaOs Apps',
      short: 'Apps',
      role: 'Act',
      summary: 'One account on web, iOS and Android: live dashboards, alerts, analytics, energy, multiple sites and team roles.',
    },
  },

  industries: {
    'food-service-cold-chain': {
      name: 'Food service & cold chain',
      short: 'Food & cold chain',
      headline: 'Know your coolers are cold before the food is lost.',
      summary:
        'Walk-ins, reach-ins, freezers and prep areas, watched around the clock. See a cooler warming hours before it reaches its limit, and know the moment a door is left open.',
      monitor: [
        { title: 'Walk-in coolers and freezers', body: 'Temperature and humidity every few seconds, summarized and charted by hour, day and month.' },
        { title: 'Cooler and freezer doors', body: 'Every open and close is recorded the moment it happens, with a flag when a door stays open.' },
        { title: 'Prep and dry storage', body: 'Room temperature and humidity, with alerts when they leave the range you set.' },
      ],
      how: [
        { title: 'A warning before the limit', body: 'When a cooler trends toward its alert limit, the forecast shows how many hours are left at the current rate.' },
        { title: 'Readings survive an outage', body: 'If the internet drops, the gateway keeps recording and uploads everything once it is back.' },
        { title: 'A record you can export', body: 'Daily minimum, average and maximum for every sensor, with CSV export for your own logs.' },
      ],
      note: 'VexaOs records and alerts on conditions. It does not replace your food safety plan, and it holds no food safety certification.',
    },
    'warehouses-logistics': {
      name: 'Warehouses & logistics',
      short: 'Warehouses',
      headline: 'Every storage zone and dock door, on one screen.',
      summary:
        'Temperature and humidity across storage zones, and a full record of when doors open and for how long, across every building you run.',
      monitor: [
        { title: 'Storage zones', body: 'Temperature and humidity by location, with each site, room and piece of equipment named the way you name it.' },
        { title: 'Dock and cold-room doors', body: 'Opens today, longest open and a timeline of every event, plus a flag for openings at unusual hours.' },
        { title: 'Goods in transit', body: 'A battery-powered gateway for vehicles and trailers.' },
      ],
      how: [
        { title: 'Many sites, one account', body: 'Switch between locations or see them together. People only see the sites they belong to.' },
        { title: 'Compare zones', body: 'Put sensors side by side in Analytics to find the zone that runs warm or damp.' },
        { title: 'Know when equipment goes quiet', body: 'A sensor that stops reporting, a low battery or a weak signal each raise their own finding.' },
      ],
      note: 'In-transit monitoring depends on the Mobile Gateway, which is not available yet.',
    },
    'manufacturing-machine-health': {
      name: 'Manufacturing & machine health',
      short: 'Manufacturing',
      headline: 'Watch the conditions around your machines today. Vibration is next.',
      summary:
        'Monitor the temperature and humidity of production areas, electrical rooms and enclosures now. Vibration monitoring for rotating equipment is being integrated.',
      monitor: [
        { title: 'Production and storage areas', body: 'Temperature and humidity where materials and finished goods are sensitive to either.' },
        { title: 'Enclosures and equipment rooms', body: 'Heat building up in a cabinet or room shows as a drift finding long before a fixed limit is crossed.' },
        { title: 'Vibration on rotating equipment', body: 'Velocity, displacement and frequency on three axes, summarized at the gateway.' },
      ],
      how: [
        { title: 'Drift, not just limits', body: 'A steady rise over six hours is flagged even when the reading is still inside its allowed range.' },
        { title: 'Rules checked on site', body: 'Alarm rules run on the gateway, so an alarm is raised even when the cloud is unreachable.' },
        { title: 'Built to add sensor types', body: 'Each sensor type is an adapter. New ones are added without changing the gateway, cloud or apps around them.' },
      ],
      note: 'Vibration and machine-health monitoring is being integrated and is not available today. Wired plant instruments over RS-485 / Modbus are delivered as an integration. We will tell you where each stands when you get in touch.',
    },
    'facilities-property': {
      name: 'Facilities & property',
      short: 'Facilities',
      headline: 'Keep an eye on the rooms nobody is standing in.',
      summary:
        'Plant rooms, server closets, storage units and vacant spaces: temperature, humidity, doors and plugged-in equipment, across a portfolio of buildings.',
      monitor: [
        { title: 'Plant and server rooms', body: 'Rising temperature is flagged as a trend, with a forecast when a limit is set.' },
        { title: 'Damp and humidity', body: 'Temperature and humidity rising together is called out as its own finding.' },
        { title: 'Doors and access points', body: 'A record of every opening, with a flag for activity at hours that are normally quiet.' },
      ],
      how: [
        { title: 'Organized like your portfolio', body: 'Sites, locations within a site, and equipment, with sensors placed against each.' },
        { title: 'Roles for staff and contractors', body: 'Owner, admin, installer and viewer roles decide who can change rules and who can only look.' },
        { title: 'What plugged-in equipment costs', body: 'Smart plugs show power, kWh and cost per appliance, and flag equipment that draws power while idle.' },
      ],
      note: 'VexaOs monitors conditions. It is not a security or access control system.',
    },
    'healthcare-pharma-storage': {
      name: 'Healthcare & pharma storage',
      short: 'Healthcare & pharma',
      headline: 'Continuous temperature records for the fridges that matter.',
      summary:
        'Continuous temperature and humidity monitoring for medicine fridges, freezers and storage rooms, with alerts and a history you can export.',
      monitor: [
        { title: 'Medicine fridges and freezers', body: 'Readings around the clock, with alert rules you set per sensor.' },
        { title: 'Storage rooms', body: 'Room temperature and humidity with daily minimum, average and maximum.' },
        { title: 'Fridge and room doors', body: 'Every opening recorded, with a flag when a door is left open.' },
      ],
      how: [
        { title: 'Early warning', body: 'The forecast shows the hours left before a limit is reached at the current rate of change.' },
        { title: 'No gaps from an outage', body: 'The gateway stores readings locally and uploads them once the connection returns.' },
        { title: 'Acknowledge and resolve', body: 'Alerts keep a history of who acknowledged and resolved them, and when.' },
      ],
      note: 'VexaOs is a monitoring tool. It is not a medical device and holds no regulatory validation or certification (for example 21 CFR Part 11 or GxP). Check your own compliance requirements before relying on it for regulated records.',
    },
  },

  restaurantOs: {
    name: 'Restaurant OS',
    summary:
      'A separate VexaOs Hospitality solution for running a restaurant: floor, kitchen display and orders in one control center. Approaching pilot.',
    card: 'Our hospitality solution for running a restaurant, alongside the monitoring platform.',
  },

  sensors: {
    statusLabel: {
      now: 'Available now',
      integrating: 'Being integrated',
      integration: 'Via integration',
    },
    statusHelp: {
      now: 'Working on the platform today.',
      integrating: 'An adapter is being built now. Not available yet.',
      integration: 'Not built yet. We add it through an adapter when a customer needs it.',
    },
    connectivityName: {
      ble: 'Bluetooth Low Energy (wireless)',
      wifi: 'Wi-Fi (wireless)',
      rs485: 'RS-485 / Modbus (wired)',
    },
    legend: {
      ble: 'Wireless, Bluetooth Low Energy',
      wifi: 'Wireless, Wi-Fi smart plugs',
      rs485: 'Wired, RS-485 / Modbus (via integration)',
    },
    ui: {
      filterLabel: 'Filter sensor families by industry',
      all: 'All industries',
      details: 'Details',
      seeDetails: 'See details',
      hideDetails: 'Hide details',
      typicalUse: 'Typical use:',
      more: '+{n} more',
      fullCatalog: 'See the full sensor catalog',
    },
    request: {
      title: "Don't see your sensor?",
      body: 'Wireless or wired, we integrate it. VexaOs is vendor-neutral and adds new sensors through adapters. Tell us what you need to measure and we will tell you plainly whether it works today, is in progress, or needs building.',
      label: 'Ask about a sensor',
    },
    connectivity: {
      ble: {
        title: 'Wireless: Bluetooth Low Energy',
        body: 'Battery-powered sensors with nothing to wire. The gateway hears every sensor in range.',
        items: [
          'Temperature, humidity and barometric pressure',
          'Door and window contact',
          'Sensor movement, battery and signal strength',
          'Encrypted sensor broadcasts supported',
        ],
      },
      wifi: {
        title: 'Wireless: Wi-Fi smart plugs',
        body: 'Metering plugs on the same network as the gateway. Plug an appliance in and see what it uses.',
        items: [
          'Power now, in watts',
          'Energy used, in kWh',
          'On, off and overloaded state',
          'Cost from the prices you enter',
        ],
        note: 'One plug model is supported today, and it fits North American outlets. Plugs for other regions are added as an integration.',
      },
      rs485: {
        title: 'Wired industrial: RS-485 / Modbus RTU',
        body: 'For the instruments and controllers already on your plant floor. Optional Modbus TCP over Ethernet.',
        items: [
          'Energy and power meters, flow meters',
          'Level and pressure transmitters',
          '4–20 mA and 0–10 V signals, through converters',
          'PLCs and controllers, HVAC and BMS equipment',
        ],
        note: "The gateway's Modbus adapter is not built yet. Wired devices are delivered as an integration, built and tested against your equipment. Monitoring only: VexaOs reads values and does not control equipment.",
      },
      footer: 'One data model, one app. Wireless or wired, every reading gets the same history, alerts and insights.',
    },
    families: {
      environment: {
        name: 'Environment',
        value: 'Know the conditions in every room.',
        measurements: ['Temperature', 'Humidity', 'Barometric pressure', 'Air quality (CO₂, VOC, PM2.5)', 'Light', 'Noise'],
        use: 'Storage rooms, work areas, server closets and offices.',
        detail:
          'Temperature, humidity and pressure are live today, with history, alert rules, drift detection and time-to-limit forecasts. Air quality, light and noise are added through adapters; tell us which you need.',
      },
      'cold-chain': {
        name: 'Cold chain & food safety',
        value: 'Catch a warming cooler before the stock is lost.',
        measurements: [
          'Cooler and freezer air temperature',
          'Cooler door left ajar',
          'Temperature logs with CSV export',
          'Deep-freeze probes',
          'Food-holding temperature probes',
        ],
        use: 'Walk-ins, reach-ins, freezers, medicine fridges and prep lines.',
        detail:
          'Air temperature inside coolers and freezers, door-ajar flags and exportable logs work today. The logs give you daily minimum, average and maximum to support your own HACCP-style records; VexaOs is not a food safety certification. Wired probes for deep-freeze and food-holding temperatures are added through adapters.',
      },
      'access-occupancy': {
        name: 'Access & occupancy',
        value: 'See what opened, when, and for how long.',
        measurements: [
          'Door and window contact',
          'Movement and tilt of the sensor',
          'Motion (PIR)',
          'Occupancy and people counting',
          'Panic and call buttons',
        ],
        use: 'Cold-room doors, dock doors, stock rooms and quiet-hours checks.',
        detail:
          'Contact sensors report every open and close the moment it happens, with opens today, longest open and a timeline. Unusual-hours and left-open findings come with it. Motion, occupancy and buttons are added through adapters. VexaOs is not a security or emergency response system.',
      },
      'water-leak': {
        name: 'Water & leak',
        value: 'Find the leak while it is still a puddle.',
        measurements: ['Leak and flood spots', 'Water flow and usage', 'Tank and level'],
        use: 'Plant rooms, under sinks and equipment, basements and tanks.',
        detail:
          'Nothing in this family is live today. Wireless leak spots, and wired flow meters and level transmitters over RS-485 / Modbus, are added through adapters and would use the same alerts, history and apps as every other sensor.',
      },
      'machine-health': {
        name: 'Machine health',
        value: 'Spot a failing machine by how it runs.',
        measurements: [
          'Vibration: velocity, displacement, frequency',
          'Bearing and motor temperature',
          'Tilt and orientation',
          'Runtime and cycles',
          'Current draw (CT clamps)',
        ],
        use: 'Motors, pumps, fans, compressors and conveyors.',
        detail:
          'Our first vibration sensor is being integrated now: three-axis velocity, displacement and frequency, with temperature and angle, summarized on the gateway. It is not available yet. Runtime, cycle counting and current clamps follow through adapters, wireless or wired over RS-485 / Modbus.',
      },
      'industrial-process': {
        name: 'Industrial process',
        value: 'Bring the instruments you already have onto one screen.',
        measurements: [
          'Pressure transmitters',
          'Flow meters',
          'Tank and vessel level',
          'Analog inputs (4–20 mA, 0–10 V via converters)',
          'PLC and controller registers',
        ],
        use: 'Process lines, pump stations, boiler and chiller plant, HVAC and BMS.',
        detail:
          "Nothing in this family is live today. These instruments connect by wire over RS-485 / Modbus RTU, with Modbus TCP over Ethernet as an option. The gateway's Modbus adapter is not built yet; we build it against your equipment as an integration. Monitoring only: VexaOs reads values and does not control equipment.",
      },
      energy: {
        name: 'Energy',
        value: 'Know what is running and what it costs you.',
        measurements: [
          'Smart-plug power (W) and energy (kWh)',
          'Cost with seasonal and time-of-use pricing',
          'Standby-draw detection',
          'Per-appliance cost breakdown',
          'Panel and circuit power meters (RS-485)',
        ],
        use: 'Fridges, coffee machines, ovens, compressors, servers and office equipment.',
        detail:
          'Wi-Fi smart plugs are live today: power now, kWh, and cost today, this week and this month for each appliance. You enter your own electricity prices (flat, by season, or by season with on-peak and off-peak hours), and the platform flags equipment that keeps drawing power while idle. Costs are estimates from the prices you enter, not a utility bill. One plug model is supported today and it fits North American outlets. Panel and circuit meters over RS-485 / Modbus are added as an integration.',
      },
      'assets-tracking': {
        name: 'Assets & tracking',
        value: 'Know which gateway last heard your equipment.',
        measurements: [
          'Bluetooth asset tags and beacons',
          'Last-seen location',
          'In transit, with the Mobile Gateway (coming soon)',
        ],
        use: 'Carts, containers, tools and loads moving between sites.',
        detail:
          'Gateways already hear Bluetooth devices around them; turning that into asset tracking is added through adapters. Tracking between sites depends on the Mobile Gateway, which is coming soon.',
      },
      safety: {
        name: 'Safety',
        value: 'An extra set of eyes on air you cannot see.',
        measurements: ['Carbon monoxide (CO)', 'Methane and combustible gas', 'Smoke-adjacent indicators'],
        use: 'Kitchens, plant rooms, garages and battery rooms.',
        detail:
          'Nothing in this family is live today. Gas sensors can be added through adapters for awareness and trend monitoring only. VexaOs is not a life-safety system, holds no life-safety certification, and must never replace code-required smoke, fire or gas alarms.',
      },
    },
  },
};
