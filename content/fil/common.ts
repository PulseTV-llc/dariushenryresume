/**
 * Shared interface text (Filipino).
 * Brand and product names are never translated: VexaOs, VexaOs Edge Gateway,
 * VexaOs Mobile Gateway, VexaOs Cloud, AI Insights, Restaurant OS.
 */
// MACHINE DRAFT (fil): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.
export const common = {
  tagline: 'I-monitor ang kahit ano, kahit saan.',
  description:
    'Ang VexaOs ay isang vendor-neutral na monitoring platform: mga wireless sensor at smart plug, isang Edge Gateway na ligtas kahit offline, VexaOs Cloud na may AI Insights, at mga app para sa web, iOS at Android.',
  nav: {
    platform: 'Platform',
    products: 'Mga Produkto',
    solutions: 'Mga Solusyon',
    about: 'Tungkol sa Amin',
    bookDemo: 'Mag-book ng demo',
    home: 'Home ng VexaOs',
    main: 'Pangunahin',
    footer: 'Footer',
    skip: 'Lumaktaw sa nilalaman',
    openMenu: 'Buksan ang menu',
    closeMenu: 'Isara ang menu',
    hospitality: 'Solusyon para sa hospitality',
    howItWorks: 'Paano ito gumagana',
    contact: 'Makipag-ugnayan',
    company: 'Kompanya',
  },
  status: {
    available: 'Available',
    development: 'Dine-develop pa',
    soon: 'Malapit na',
  },
  labels: {
    explore: 'Tuklasin',
    learnMore: 'Alamin pa',
    step: 'Hakbang',
    worthKnowing: 'Mabuting malaman',
  },
  language: {
    label: 'Wika',
    switchTo: 'Palitan ang wika',
    dismiss: 'Huwag na, salamat',
    draftNotice:
      'Ang salin na ito ay machine draft na hindi pa nasusuri ng isang katutubong tagapagsalita. Ang bersyong Ingles ang batayan.',
    readEnglish: 'Basahin sa Ingles',
  },
  footer: {
    blurb:
      'Mga sensor at smart plug, isang Edge Gateway na ligtas kahit offline, VexaOs Cloud na may AI Insights, at mga app para sa web, iOS at Android.',
    rights: 'Nakalaan ang lahat ng karapatan.',
    messageUs: 'Mag-message sa amin',
  },
  cta: {
    title: 'Tingnan ito sa sarili ninyong kagamitan.',
    body: 'Sabihin sa amin kung ano ang kailangan ninyong bantayan at kung saan. Ipapakita namin sa inyo ang platform at magiging tapat kami kung ano ang kaya at hindi nito kayang gawin sa ngayon.',
    primary: 'Mag-book ng demo',
    secondary: 'Paano ito gumagana',
  },
  stack: {
    sensors: ['Siyam na pamilya ng sensor', 'Gumagana na ngayon ang mga Bluetooth sensor at Wi-Fi smart plug', 'Wired na RS-485 / Modbus sa pamamagitan ng integration'],
    gateway: ['Iniingatan ang mga reading kahit may outage', 'Sinusuri ang mga alarm rule sa mismong site', 'Kusang nakakabawi'],
    cloud: ['Drift at mga forecast', 'Mga finding sa simpleng Ingles', 'Gastos sa enerhiya batay sa sarili ninyong presyo'],
    apps: ['Web, iOS at Android', 'Mga alert, analytics at enerhiya', 'Mga site, team at role'],
  },
  form: {
    name: 'Pangalan',
    email: 'Email sa trabaho',
    company: 'Kompanya',
    industry: 'Industriya',
    selectIndustry: 'Pumili ng industriya',
    other: 'Iba pa',
    sites: 'Ilang site?',
    select: 'Pumili',
    siteCounts: ['1 site', '2–5 site', '6–20 site', '21+ site'],
    interestsLabel: 'Ano ang interesado kayo?',
    interests: [
      'Temperatura at humidity',
      'Pagmo-monitor ng pinto',
      'Enerhiya at mga smart plug',
      'Vibration (kasalukuyang ini-integrate)',
      'Wired na RS-485 / Modbus (sa pamamagitan ng integration)',
      'Mobile Gateway (malapit na)',
      'Restaurant OS',
    ],
    message: 'Ano ang gusto ninyong i-monitor?',
    messagePlaceholder: 'Halimbawa: tatlong walk-in cooler at isang freezer sa dalawang site, at ang pinto sa likod.',
    required: '(kailangan)',
    submit: 'Humiling ng demo',
    sending: 'Ipinapadala…',
    privacy: 'Ginagamit lang namin ang inyong mga detalye para sagutin ang kahilingang ito.',
    missing: 'Pakilagay ang inyong pangalan, email at maikling tala tungkol sa gusto ninyong i-monitor.',
    failed: 'May nangyaring mali.',
    fallback: 'Kung patuloy itong mangyari, mag-email sa amin sa',
    successTitle: 'Natanggap na ang inyong kahilingan.',
    successBody: 'Salamat, {name}. Sasagot kami sa {email} para magtakda ng oras.',
    replyLanguage: 'Sa ngayon, sa Ingles kami sumasagot.',
  },
  notFound: {
    title: 'Hindi namin mahanap ang page na iyon.',
    body: 'Maaaring nailipat ito nang muling buuin ang site.',
    back: 'Bumalik sa home page',
  },
  shots: {
    dashboardSummary: {
      alt: 'Summary row ng VexaOs web dashboard: 2 sa 2 sensor ang online, average na temperatura 21.4 °C, humidity 40%, pressure 978 hPa, walang aktibong alert, online ang gateway.',
      caption: 'Ang summary row ng web dashboard. Totoong kuha mula sa aming test site.',
    },
    dashboardPanels: {
      alt: 'Mga panel ng VexaOs dashboard: walang aktibong alert, at isang 24-oras na trend ng temperatura.',
      caption: 'Mga aktibong alert at ang trend ng temperatura. Totoong kuha mula sa aming test site.',
    },
    doorActivity: {
      alt: 'Mga detalye ng sensor sa VexaOs para sa isang door sensor: mga tile ng temperatura, humidity, baterya at signal, bilang ng bukas ngayong araw, pinakamatagal na bukas, at timeline ng mga pagbukas at pagsara.',
      caption: 'Mga detalye ng door sensor: bawat pagbukas at pagsara sa isang timeline. Totoong kuha mula sa aming test site.',
    },
    sensorCharts: {
      alt: 'Mga chart ng history ng sensor sa VexaOs para sa temperatura, humidity, baterya at lakas ng signal sa loob ng 24 oras.',
      caption: 'History ng sensor sa loob ng 24 oras: temperatura, humidity, baterya at signal. Totoong kuha mula sa aming test site.',
    },
    mobileDashboard: {
      alt: 'Dashboard ng VexaOs mobile app na nagpapakita ng mga tile ng aktibong sensor at average na temperatura.',
      caption: 'Ang mobile dashboard. Totoong kuha mula sa aming test site.',
    },
    restaurantFloor: {
      alt: 'Floor board ng Restaurant OS na nagpapakita ng sampung mesa ayon sa status: available, may nakaupo at kailangang ligpitin.',
      caption: 'Floor board ng Restaurant OS, tumatakbo sa demonstration data.',
    },
    restaurantKitchen: {
      alt: 'Kitchen display ng Restaurant OS na nagpapakita ng mga ticket na nasa line, handa nang ihatid, at naihain na.',
      caption: 'Kitchen display ng Restaurant OS, tumatakbo sa demonstration data.',
    },
  },
};
