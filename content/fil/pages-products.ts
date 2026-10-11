import type { Page } from '@/lib/i18n/types';

// MACHINE DRAFT (fil): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.

/**
 * Product pages (Filipino). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const sensors: Page = {
  meta: {
    title: 'Katalogo ng Sensor: Siyam na Pamilya, Wireless at Wired',
    description:
      'Ang katalogo ng sensor ng VexaOs: kapaligiran, cold chain, access at occupancy, tubig at tagas, kalusugan ng makina, prosesong pang-industriya, enerhiya, mga asset at kaligtasan, sa Bluetooth LE, Wi-Fi o RS-485 / Modbus. Bawat sukat ay may label na available na ngayon o sa pamamagitan ng integration.',
  },
  hero: {
    eyebrow: 'Mga Produkto · Mga Sensor',
    title: 'Isang sensor para sa [[anumang kailangan ninyong bantayan.]]',
    subtitle:
      'Siyam na pamilya ng sensor, wireless at wired, sa iisang platform. May label ang bawat sukat, kaya makikita ninyo kung ano ang gumagana ngayon at kung ano ang idinaragdag namin sa pamamagitan ng adapter.',
    ctas: [{ label: 'Magtanong tungkol sa mga sensor', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'sensors',
      id: 'catalog',
      compact: false,
      eyebrow: 'Katalogo ng sensor',
      title: 'Siyam na pamilya. Piliin ang inyong industriya.',
      subtitle: 'I-filter ayon sa industriya, saka buksan ang isang pamilya para sa detalye.',
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Connectivity',
      title: 'Wireless at wired, papasok sa iisang gateway.',
      subtitle: 'Gumagana na ngayon ang mga Bluetooth sensor at Wi-Fi smart plug. Ang mga wired na RS-485 / Modbus device ay idinaragdag bilang integration.',
    },
    {
      type: 'split',
      eyebrow: 'Mga door sensor',
      title: 'Bawat pagbukas at pagsara, sa isang timeline.',
      body: 'Ipinapadala ang mga door event habang nangyayari ang mga ito. Sa mga app, makikita ninyo kung ilang beses bumukas ang pinto ngayong araw, ang pinakamatagal na pananatili nitong bukas, at ang bawat event kasama ang oras nito.',
      checks: [
        'Bawat pagbabago ay nire-record nang isang beses, sunod-sunod, kahit may outage.',
        'Fina-flag ang pintong bukas nang 10 minuto o higit pa.',
        'Itinuturo ang mga pagbukas sa hindi pangkaraniwang oras at ang di-karaniwang tagal ng pagkakabukas.',
      ],
      shot: 'doorActivity',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Kalusugan ng sensor',
      title: 'Binabantayan din ng mga sensor ang kanilang sarili.',
      body: 'May silbi lang ang isang monitoring system kung alam ninyong gumagana pa ito. Inire-report ng bawat sensor ang baterya at signal nito, at naglalabas ang platform ng sarili nitong mga finding kapag may nangangailangan ng pansin.',
      checks: [
        'Mahinang baterya, o bateryang inaasahang mauubos sa loob ng 30 araw.',
        'Mahinang signal, o signal na biglang bumaba nang malaki.',
        'Sensor na tumahimik habang online pa ang gateway nito.',
      ],
      shot: 'sensorCharts',
      note: {
        body: 'Ang mga sensor na available na ngayon ay kumokonekta sa Bluetooth Low Energy, kaya kailangang nasa loob ang mga ito ng radio range ng isang gateway; sinusuri namin ang signal sa bawat lokasyon habang nagse-setup. Ang "Sa pamamagitan ng integration" ay nangangahulugang wala pa ang adapter, at kasama roon ang lahat ng nasa RS-485 / Modbus: binubuo namin ito kapag kailangan ng isang customer, at hindi kami naglalathala ng mga specification para sa mga sensor na hindi pa namin nai-integrate.',
      },
    },
  ],
};

const edgeGateway: Page = {
  meta: {
    title: 'VexaOs Edge Gateway: Ligtas Kahit Offline at Kusang Nag-aayos',
    description:
      'Kinokolekta ng VexaOs Edge Gateway ang mga reading mula sa mga kalapit na sensor at smart plug, sinusuri ang mga alarm rule sa mismong site, iniingatan ang bawat reading kahit may outage at restart, at kusang nakakabawi.',
  },
  hero: {
    eyebrow: 'Mga Produkto · Edge Gateway',
    title: 'Ang gateway na [[patuloy na nagre-record.]]',
    subtitle:
      'Nasa site ang VexaOs Edge Gateway, nakikinig sa bawat sensor na abot nito, at dinadala ang data sa cloud. Kapag pumalya ang network o kuryente, iniingatan nito ang inyong mga reading at kusa nitong inaayos ang sarili.',
    ctas: [
      { label: 'Mag-book ng demo', href: '/contact', variant: 'primary' },
      { label: 'Paano gumagana ang offline mode', href: '/platform#offline', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'cards',
      cols: 3,
      items: [
        { icon: 'gateway', title: 'Ligtas kahit offline', body: 'Isinusulat ang mga reading sa matibay na storage sa gateway at inaalis lang pagkatapos kumpirmahin ng cloud na natanggap na ang mga ito. Naaantala ng outage ang inyong data; hindi nito ito nawawala.' },
        { icon: 'plug', title: 'Kusang nag-aayos', body: 'Kapag tumahimik ang sensor radio, nire-restart ng gateway ang pag-scan, saka nire-reset ang radio, saka nire-restart ang sarili nitong service. May hardware watchdog para sa tuluyang pag-freeze.' },
        { icon: 'cloud', title: 'Kusang pagbawi', body: 'Kapag nawala ang network, sunod-sunod na sinusubukan ng gateway ang muling pagkonekta sa Wi-Fi, pag-restart ng networking at, bilang huling paraan, isang reboot na may limitasyon sa dalas. Kusa itong nagsisimula kapag bumalik ang kuryente.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'Mga desisyon sa mismong site',
      title: 'Hindi naghihintay sa cloud ang mga alarm.',
      body: 'Sinusuri ang mga alarm rule sa gateway laban sa bawat reading. Ang alarm na na-raise o na-clear ay pumupunta sa unahan ng queue at ipinapadala kaagad.',
      checks: [
        'Mga limit na may hold time, para hindi mag-alarm ang isang saglit na spike.',
        'Hysteresis, para hindi paulit-ulit na mag-on at mag-off ang reading na nasa mismong limit.',
        'Mga summary kada 10 segundo bilang default, naa-adjust kada sensor.',
        'Nananatili sa gateway ang mga detalyadong raw reading; mga summary ang napupunta sa cloud.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Kalusugan ng gateway',
      title: 'Nakikita ninyong buhay ang gateway.',
      subtitle:
        'Kada minuto, inire-report ng gateway ang sarili nitong kalusugan: network, sensor radio, uptime at power supply. Kung kinailangan nitong bumawi mula sa anuman, sinasabi nito sa inyo kung ano ang nangyari.',
      items: [
        { title: 'Offline', body: 'Ang gateway na offline nang 5 minuto ay naglalabas ng finding.' },
        { title: 'Power', body: 'Natutukoy at inire-report ang mahinang power supply.' },
        { title: 'Backlog', body: 'Nakikita ang backlog ng mga reading na naghihintay ma-upload.' },
        { title: 'Pagkakakilanlan', body: 'Bawat gateway ay nagsa-sign in gamit ang sarili nitong device key sa HTTPS.' },
      ],
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Connectivity',
      title: 'Wireless at wired, papasok sa iisang gateway.',
      subtitle: 'Gumagana na ngayon ang mga Bluetooth sensor at Wi-Fi smart plug. Ang mga wired na RS-485 / Modbus device ay idinaragdag bilang integration.',
    },
    {
      type: 'cards',
      cols: 3,
      eyebrow: 'Setup',
      title: 'Ano ang kailangan ng isang gateway.',
      items: [
        { title: 'Kuryente mula sa saksakan', body: 'Ang Edge Gateway ay para sa mga permanenteng site na may power outlet. Para sa mga lugar na wala nito, tingnan ang Mobile Gateway, na malapit na.' },
        { title: 'Wi-Fi o Ethernet', body: 'Sapat na ang ordinaryong koneksyon sa internet. Mga outbound na HTTPS connection lang ang ginagawa ng gateway.' },
        { title: 'Mga sensor na abot', body: 'Kumokonekta ang mga wireless sensor sa Bluetooth Low Energy; gumagamit ng higit sa isang gateway ang mas malalaking site. Sumasali ang mga smart plug sa parehong network ng gateway. Ang mga wired na RS-485 / Modbus device ay idinaragdag bilang integration.' },
      ],
      note: {
        body: 'Bago pa ang Edge Gateway. Ang offline queue, kusang pagbawi at restart behaviour nito ay saklaw ng mga automated test, at tumatakbo ito kasama ang mga totoong sensor sa sarili naming test site. Isinasagawa pa ang pangmatagalang field testing, at ibabahagi namin ang eksaktong kalagayan nito kapag nakipag-usap kayo sa amin.',
      },
    },
  ],
};

const mobileGateway: Page = {
  meta: {
    title: 'VexaOs Mobile Gateway (Malapit Na)',
    description:
      'Ang VexaOs Mobile Gateway ay isang nakaplanong gateway para sa mga sasakyan, trailer at site na walang permanenteng kuryente o network. Malapit na ito at hindi pa available ngayon.',
  },
  hero: {
    eyebrow: 'Mga Produkto · Mobile Gateway',
    status: 'soon',
    title: 'Monitoring para sa mga lugar [[na gumagalaw.]]',
    subtitle:
      'Ang VexaOs Mobile Gateway ay nakaplano para sa mga sasakyan, trailer at pansamantalang site, kung saan walang permanenteng kuryente o network. Hindi pa ito available.',
    ctas: [
      { label: 'Sabihin sa amin ang inyong use case', href: '/contact', variant: 'primary' },
      { label: 'Tingnan ang Edge Gateway', href: '/products/edge-gateway', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'note',
      note: {
        title: 'Malapit na',
        body: 'Inilalarawan ng page na ito ang pinaplano namin, hindi isang produktong maaari ninyong i-order. Hindi pa pinal ang mga specification, presyo at petsa, kaya walang nakalista rito. Kung mahalaga sa inyo ang mobile monitoring, makipag-ugnayan sa amin at pananatilihin namin kayong may alam.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Ang plano',
      title: 'Ang parehong platform, malayo sa saksakan sa dingding.',
      subtitle:
        'Ang Mobile Gateway ay nilalayong gumana sa parehong mga sensor, parehong VexaOs Cloud at parehong mga app gaya ng Edge Gateway.',
      items: [
        { icon: 'mobile', title: 'Mga kalakal na nasa biyahe', body: 'Nilalayon para sa mga refrigerated na sasakyan at trailer, para namo-monitor ang karga sa pagitan ng mga site at hindi lang sa mismong mga site.' },
        { icon: 'warehouse', title: 'Mga pansamantalang site', body: 'Nilalayon para sa mga event, pop-up at panandaliang storage kung saan hindi praktikal ang pagkakabit ng permanenteng kagamitan.' },
        { icon: 'gateway', title: 'Store and forward', body: 'Nakabatay sa offline queue ng Edge Gateway, na ngayon pa lang ay nag-iingat na ng mga reading kapag walang koneksyon.' },
      ],
    },
  ],
  cta: {
    title: 'Kailangan ng mobile monitoring?',
    body: 'Sabihin sa amin kung ano ang inililipat ninyo at kung saan. Nakakatulong ang inyong use case sa paghubog ng binubuo namin, at ipapaalam namin sa inyo kapag handa na ang Mobile Gateway.',
  },
};

const cloud: Page = {
  meta: {
    title: 'VexaOs Cloud & AI Insights',
    description:
      'Iniimbak ng VexaOs Cloud ang history ng inyong mga sensor at pinapatakbo ang AI Insights: drift detection, mga time-to-limit forecast, hindi pangkaraniwang aktibidad ng pinto, gastos sa enerhiya at standby draw, na may mga paliwanag sa simpleng Ingles na laging ipinapakita katabi ng mga nasukat na numero.',
  },
  hero: {
    eyebrow: 'Mga Produkto · Cloud & AI Insights',
    title: 'Makita ang problema [[bago ito maging pagkalugi.]]',
    subtitle:
      'Iniingatan ng VexaOs Cloud ang inyong history, pinapatakbo ang inyong mga alert rule, at sinusuri ang bawat sensor para sa mga pattern na nauuna sa isang pagpalya. Pagkatapos, ipinapaliwanag nito sa simpleng Ingles ang nakita nito.',
    ctas: [{ label: 'Mag-book ng demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Sukat muna',
      title: 'Aritmetika ang detection. Pagpapaliwanag lang ang ginagawa ng AI.',
      body: 'Ang mga finding ay galing sa mga nakatakdang rule na pinapatakbo sa inyong mga sukat kada 30 minuto. Iniimbak ng bawat isa ang mga numerong pinagkuwentahan nito. Iisa lang ang gamit ng AI model: gawing malinaw na pangungusap ang finding na umiiral na.',
      checks: [
        'May label ang text na **Measured** o **AI-written**, at ipinapakita ng AI text ang confidence nito.',
        'Hindi kailanman ipinapakita ang AI text nang wala sa tabi nito ang mga nasukat na numero.',
        'Hindi kayang gumawa ng finding ang AI, baguhin ang severity nito o isara ito.',
        'Kung naka-off o hindi available ang mga paliwanag ng AI, makukuha pa rin ninyo ang bawat finding, na inilalarawan mula sa mga numero.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Ano ang hinahanap nito',
      title: 'Mga finding, sinusuri araw at gabi.',
      subtitle: 'Bawat isa ay may severity na info, warning o critical, at status na kayo ang may kontrol: bukas, na-acknowledge o na-resolve.',
      items: [
        { title: 'Drift', body: 'Tuloy-tuloy na pagtaas o pagbaba ng temperatura o humidity sa nakaraang anim na oras, kahit nasa saklaw pa ang mga reading.' },
        { title: 'Oras bago ang limit', body: 'Kapag papunta sa limit nito ang isang sensor na may alert rule, ang mga oras na natitira sa kasalukuyang bilis.' },
        { title: 'Hindi pangkaraniwang reading', body: 'Reading na malayo sa karaniwang ipinapakita ng sensor na ito sa ganitong oras ng araw.' },
        { title: 'Pintong naiwang bukas', body: 'Pintong bukas na nang 10 minuto o higit pa, sa mismong sandaling ito.' },
        { title: 'Pinto sa hindi pangkaraniwang oras', body: 'Pintong binuksan sa oras na tahimik sa nakaraang dalawang linggo.' },
        { title: 'Pintong bukas nang mas matagal kaysa karaniwan', body: 'Kabuuang oras na bukas ngayong araw na hindi bababa sa doble ng kamakailang pang-araw-araw na average.' },
        { title: 'Sabay na mainit at mahalumigmig', body: 'Sabay na tumataas ang temperatura at humidity, isang karaniwang senyales ng problema sa door seal o cooling.' },
        { title: 'Standby draw', body: 'Nakasaksak na appliance na patuloy na kumukonsumo ng kuryente habang naka-idle.' },
        { title: 'Gastos sa enerhiya', body: 'Ang pinakamalalaking pinagmumulan ng gastos sa linggo, makabuluhang pagbabago mula sa isang buwan patungo sa susunod, at mabigat na paggamit sa mga on-peak na oras.' },
        { title: 'Baterya', body: 'Mahinang baterya, o bateryang inaasahang mauubos sa loob ng 30 araw.' },
        { title: 'Signal', body: 'Mahinang signal, o biglang pagbaba kumpara sa mga nakaraang araw.' },
        { title: 'Sensor na tumahimik', body: 'Walang reading sa loob ng 15 minuto habang online pa ang gateway.' },
        { title: 'Kalusugan ng gateway', body: 'Gateway na offline, kulang sa power, o may backlog na naghihintay ma-upload.' },
      ],
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Enerhiya',
      title: 'Gastos sa enerhiya, batay sa sarili ninyong presyo.',
      subtitle: 'Nagre-report ng kWh ang mga smart plug. Ginagawa itong gastos ng cloud gamit ang mga presyo ng kuryenteng inilagay ninyo.',
      items: [
        { icon: 'energy', title: 'Tatlong pricing mode', body: 'Flat na presyo, presyo kada season, o on-peak at off-peak na presyo kada season, na itinatakda para sa organisasyon o para sa iisang site.' },
        { icon: 'cloud', title: 'History ng presyo', body: 'Bawat presyo ay may petsa ng simula, kaya hindi kailanman binabago ng bagong presyo ang gastos ng enerhiyang nagamit na.' },
        { icon: 'apps', title: 'Gastos kada appliance', body: 'Ngayong araw, nakaraang 7 araw at ngayong buwan, na may projection para sa buwan at breakdown ayon sa appliance at area.' },
        { icon: 'plug', title: 'Tapat tungkol sa mga kulang', body: 'Kung saan walang nailagay na presyo, "rate not set" ang nakasulat sa gastos. Hindi ito kailanman ipinapakita bilang zero.' },
      ],
      note: {
        body: 'Ang mga gastos ay mga tantiya mula sa mga presyong inilagay ninyo at sa kabuuang enerhiya kada buong oras, hindi utility bill. Ang default na on-peak na oras ay panimulang batayan lang, hindi opisyal na schedule ng alinmang utility.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 4,
      eyebrow: 'Ang cloud sa ilalim',
      title: 'History, mga rule at access sa iisang lugar.',
      items: [
        { title: 'History', body: 'Iniimbak ang bawat summary, na may mga hourly roll-up para sa mabibilis na chart sa loob ng isang araw, isang linggo o isang buwan.' },
        { title: 'Mga alert rule', body: 'Magtakda ng mga limit kada sensor. May history ang mga alert, at maaaring i-acknowledge at i-resolve.' },
        { title: 'Mga live na update', body: 'Nag-a-update ang mga dashboard habang dumarating ang mga bagong reading, nang hindi nire-refresh ang page.' },
        { title: 'Mga site at role', body: 'Mga organisasyon, site, lokasyon at kagamitan, na ang access ay itinatakda ng membership at role.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Privacy',
      title: 'Ano ang ipinapadala sa AI model, at ano ang hindi.',
      items: [
        { title: 'Ipinapadala', body: 'Ang pangalan ng site at time zone, at para sa bawat finding: ang uri at severity nito, ang pangalan ng sensor, lokasyon at kagamitan, at ang mga summary number na pinagkuwentahan ng finding.' },
        { title: 'Hindi kailanman ipinapadala', body: 'Ang daloy ng inyong mga raw reading, mga email address, user name, hardware address o key. Sinusuri ang bawat sagot bago ito iimbak, at itinatapon ang anumang hindi inaasahan.' },
      ],
      note: {
        body: 'Opsyonal ang mga paliwanag ng AI at gumagamit ang mga ito ng third-party na AI model. Umaabot sa inyong telepono ang mga critical na finding at alert bilang push notification; nabuo na ang pagpapadala sa email pero hindi pa naka-on, at hindi available ang mga text message. Ang mga forecast ay mga tantiya batay sa kamakailang trend, hindi mga garantiya.',
      },
    },
  ],
};

const apps: Page = {
  meta: {
    title: 'VexaOs Apps para sa Web, iOS at Android',
    description:
      'Ang mga app ng VexaOs para sa web, iOS at Android: mga live na dashboard, mga alert na may notification sa telepono, analytics na may CSV export, gastos sa enerhiya, maraming site, at mga role ng team, sa iisang account.',
  },
  hero: {
    eyebrow: 'Mga Produkto · Apps',
    title: 'Ang inyong mga site, [[sa bawat screen.]]',
    subtitle:
      'Isang account sa web at sa iOS at Android. Tingnan ang nangyayari ngayon, balikan ang nakaraang buwan, at asikasuhin ang isang alert nasaan man kayo.',
    ctas: [{ label: 'Mag-book ng demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    { type: 'shot', shot: 'dashboardSummary' },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Web dashboard',
      title: 'Lahat sa iisang lugar.',
      items: [
        { title: 'Dashboard', body: 'Mga sensor na online, mga average, aktibong alert, status ng gateway, power ngayon, enerhiya ngayong araw at ang mga pinakabagong insight sa isang tingin.' },
        { title: 'Mga sensor', body: 'Hanapin, i-filter at i-sort ang bawat sensor. Buksan ang isa para sa history, door timeline at profile nito.' },
        { title: 'Mga alert', body: 'History ng alert, pag-acknowledge at pag-resolve, at mga alert rule para sa bawat sensor.' },
        { title: 'Insights', body: 'Mga finding na naka-filter ayon sa status, severity, uri at sensor, kasama ang daily digest.' },
        { title: 'Analytics', body: 'Ikumpara ang mga sensor, tingnan ang pang-araw-araw na minimum, average at maximum, suriin ang aktibidad ng pinto, at mag-export ng CSV.' },
        { title: 'Enerhiya', body: 'Power ngayon, kWh at gastos ayon sa appliance at area, gastos sa paglipas ng panahon, projection para sa buwan, at CSV export.' },
        { title: 'Mga lokasyon', body: 'Mga site, mga lokasyon sa loob ng site at kagamitan, na ang bawat sensor ay nakalagay kung saan talaga ito naroon.' },
        { title: 'Mga device', body: 'Kalusugan ng gateway, pati mga guided flow para sa pagdaragdag ng sensor o smart plug.' },
        { title: 'Settings', body: 'Profile, organisasyon, mga imbitasyon sa team, mga unit, presyo ng enerhiya at mga preference sa notification.' },
      ],
    },
    {
      type: 'split',
      eyebrow: 'iOS at Android',
      title: 'Ang parehong data sa inyong bulsa.',
      body: 'Sumusunod ang mobile app sa web dashboard: mga live na sensor, mga detalye ng sensor na may history, analytics, enerhiya, insights at settings. Gumagana ito sa portrait at landscape, sa mga telepono at tablet.',
      checks: [
        'Mga live na reading at status ng pinto para sa bawat sensor.',
        'Mga notification sa telepono para sa mga critical na alert, na may quiet hours at mga paalala.',
        'Palitan ang pangalan ng mga sensor at itakda ang lokasyon at kagamitan ng mga ito mula sa app.',
        'Pumili ng °C o °F; hindi nagbabago ang data.',
      ],
      shot: 'mobileDashboard',
      phone: true,
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Mga team at site',
      title: 'Ang tamang mga tao ang nakakakita ng tamang mga site.',
      body: 'Sa imbitasyon lang ang mga account. Bawat tao ay idinaragdag sa isang organisasyon, o sa iisang site sa loob nito, na may role na nagtatakda kung ano ang puwede nilang gawin.',
      checks: [
        '**Owner at admin:** pinamamahalaan ang organisasyon, team at mga site.',
        '**Installer:** nagdaragdag ng mga sensor, nagtatakda ng mga rule at nagre-resolve ng mga finding.',
        '**Viewer:** tumitingin ng mga dashboard at nag-a-acknowledge ng mga alert.',
        'Magpalipat-lipat sa mga lokasyon, o tingnan ang lahat nang sabay-sabay.',
      ],
      shot: 'dashboardPanels',
      note: {
        body: 'Hindi pa nakalista ang iOS at Android app sa mga pampublikong app store; sine-set up namin ito kasama ninyo sa onboarding. Gumagana na ang mga push notification sa telepono. Nabuo na ang mga email alert pero hindi pa naka-on, at hindi available ang mga text message. Nasa Ingles ang mga app sa ngayon.',
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
