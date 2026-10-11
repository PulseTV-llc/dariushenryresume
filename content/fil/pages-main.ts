import type { Page } from '@/lib/i18n/types';

// MACHINE DRAFT (fil): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.

/**
 * Main pages (Filipino). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const home: Page = {
  meta: {
    title: 'VexaOs: I-monitor ang Kahit Ano, Kahit Saan',
    description:
      'Ang VexaOs ay isang vendor-neutral na monitoring platform: mga wireless sensor at smart plug, isang Edge Gateway na ligtas kahit offline, VexaOs Cloud na may AI Insights, at mga app para sa web, iOS at Android.',
  },
  hero: {
    eyebrow: 'Vendor-neutral na monitoring platform',
    title: 'I-monitor ang kahit ano, [[kahit saan.]]',
    subtitle:
      'Mga wireless sensor, isang Edge Gateway na patuloy na nagre-record kapag nawala ang internet, isang cloud na maagang nakakakita ng problema, at mga app para sa web, iOS at Android. Isang platform, anumang industriya.',
    ctas: [
      { label: 'Mag-book ng demo', href: '/contact', variant: 'primary' },
      { label: 'Tingnan kung paano ito gumagana', href: '/platform', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'heroShots',
      caption: 'Ang VexaOs web dashboard. Mga totoong kuha mula sa aming test site: dalawang sensor, isang gateway, walang sample data.',
    },
    {
      type: 'stack',
      id: 'stack',
      eyebrow: 'Ang platform',
      title: 'Apat na layer. Isang sistema.',
      subtitle:
        'Bawat layer ay may iisang trabaho at ipinapasa ito sa susunod, kaya ang reading na kinuha sa isang freezer ay nagiging alert sa kamay ng isang tao.',
      link: { label: 'Paano gumagana ang platform', href: '/platform' },
    },
    {
      type: 'sensors',
      id: 'sensors',
      tinted: true,
      compact: true,
      eyebrow: 'Mga pamilya ng sensor',
      title: 'Higit na higit pa sa isang thermometer.',
      subtitle:
        'Siyam na pamilya ng sensor, wireless at wired, sa iisang platform. Ang berde ay gumagana na ngayon; ang iba ay idinaragdag namin sa pamamagitan ng mga adapter.',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Ginawa para sa totoong mundo',
      title: 'Monitoring na patuloy na gumagana kapag may nagkaproblema.',
      subtitle: 'Nawawala ang network, kumukurap ang kuryente at nauubos ang baterya. Ang platform ay ginawa para sa mga ganoong araw.',
      items: [
        { icon: 'gateway', title: 'Ligtas kahit offline', body: 'Isinusulat ng gateway ang bawat reading sa sarili nitong storage at ina-upload ito, nang isang beses at sunod-sunod, kapag bumalik ang koneksyon.' },
        { icon: 'plug', title: 'Kusang nag-aayos', body: 'Nire-restart ng mga watchdog ang huminto na radio o service at sinisikap ibalik ang network, nang walang tao sa site.' },
        { icon: 'door', title: 'Agarang door event', body: 'Ang pagbukas o pagsara ng pinto ay ipinapadala sa sandaling mangyari ito. Hindi nito hinihintay ang susunod na summary.' },
        { icon: 'cloud', title: 'Maagang babala', body: 'Ang drift detection at mga time-to-limit forecast ay nagfa-flag ng problema habang may panahon pa para kumilos.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'VexaOs Cloud & AI Insights',
      title: 'Sinasabi nito kung ano ang nagbago, at kung ano ang dapat tingnan.',
      body: 'Kada 30 minuto, sinusuri ng cloud ang bawat sensor para sa mga pattern na nauuna sa isang pagpalya. Ang mga finding ay kinukuwenta mula sa inyong mga sukat, at bawat isa ay may kasamang mga numerong pinagbatayan nito.',
      checks: [
        '**Drift detection.** Tuloy-tuloy na pagtaas o pagbaba sa loob ng anim na oras, fina-flag bago pa malampasan ang isang limit.',
        '**Mga time-to-limit forecast.** Ilang oras bago maabot ng sensor ang alert limit nito sa kasalukuyang bilis.',
        '**Mga pattern ng pinto.** Naiwang bukas, binuksan sa hindi pangkaraniwang oras, o bukas nang mas matagal kaysa karaniwan.',
        '**Mga paliwanag sa simpleng Ingles.** Ano ang nangyari, ang malamang na sanhi at ano ang dapat gawin, laging ipinapakita katabi ng mga nasukat na numero.',
      ],
      shot: 'doorActivity',
      link: { label: 'Higit pa tungkol sa Cloud & AI Insights', href: '/products/cloud-ai-insights' },
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Enerhiya',
      title: 'Tingnan kung magkano ang gastos sa pagpapatakbo ng bawat appliance.',
      subtitle: 'Isaksak ang appliance sa isang smart plug at lalabas ang power, enerhiya at gastos nito katabi ng iba ninyong sensor.',
      items: [
        { icon: 'energy', title: 'Monitoring gamit ang smart plug', status: 'available', body: 'Inire-report ng mga Wi-Fi metering plug ang power ngayon at enerhiyang nagamit, kada appliance.' },
        { icon: 'cloud', title: 'Ang totoo ninyong presyo', status: 'available', body: 'Maglagay ng flat na presyo, mga presyo ayon sa season, o on-peak at off-peak na presyo ayon sa season. Sumusunod ang gastos sa presyong umiiral sa araw na iyon.' },
        { icon: 'plug', title: 'Standby draw', status: 'available', body: 'Ang kagamitang patuloy na kumukonsumo ng kuryente habang naka-idle ay fina-flag bilang finding.' },
        { icon: 'apps', title: 'Gastos kada appliance', status: 'available', body: 'Breakdown ng gastos kada appliance at area, ang pinakamalalaking pinagmumulan ng gastos, at projection para sa buwan.' },
      ],
      note: {
        body: 'Ang mga gastos ay mga tantiya mula sa mga presyong inilagay ninyo, hindi utility bill. Isang modelo ng smart plug ang suportado ngayon at kasya ito sa mga outlet na pang-North America; ang mga plug para sa ibang rehiyon, at mga panel meter sa RS-485 / Modbus, ay idinaragdag bilang integration.',
      },
      link: { label: 'Enerhiya sa katalogo ng sensor', href: '/products/sensors#energy' },
    },
    {
      type: 'industries',
      id: 'industries',
      tinted: true,
      eyebrow: 'Mga Solusyon',
      title: 'Isang platform, maraming lugar na mapaggagamitan.',
      subtitle: 'Ang parehong mga sensor, gateway, cloud at app, inilalapat sa kailangan ninyong bantayan.',
    },
    {
      type: 'split',
      flip: true,
      eyebrow: 'Vendor-neutral',
      title: 'Hindi nakatali sa iisang gawa ng sensor.',
      body: 'Bawat uri ng sensor ay kumokonekta sa gateway sa pamamagitan ng adapter na ginagawang iisang karaniwang format ang mga reading nito. Hindi na kailangang malaman ng cloud at ng mga app kung sino ang gumawa ng sensor.',
      checks: [
        'Magdagdag ng bagong uri ng sensor nang hindi pinapalitan ang inyong gateway o binabago ang inyong mga app.',
        'Bawat reading ay iniimbak sa mga standard na unit, anuman ang inire-report ng sensor.',
        'Ang mga hindi kilalang data format ay tinatanggihan, hindi kailanman hinuhulaan.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Ang kasalukuyang kalagayan',
      title: 'Ano ang gumagana ngayon, at ano ang paparating.',
      subtitle: 'Mas gusto naming malaman ninyo ngayon kaysa matuklasan ninyo sa bandang huli.',
      items: [
        {
          title: 'Gumagana ngayon',
          status: 'available',
          body: 'Mga sensor ng temperatura, humidity, pressure at pinto. Mga Wi-Fi smart plug na may gastos sa enerhiya. Ang VexaOs Edge Gateway. VexaOs Cloud na may AI Insights. Ang web dashboard at ang iOS at Android app, na may mga notification sa telepono.',
        },
        {
          title: 'Kasalukuyang binubuo',
          status: 'development',
          body: 'Ang vibration at machine-health sensing ay kasalukuyang ini-integrate. Ang mga wired na RS-485 / Modbus device ay inihahatid bilang integration. Nabuo na ang mga email alert pero hindi pa naka-on.',
        },
        {
          title: 'Mobile Gateway',
          status: 'soon',
          body: 'Isang gateway para sa mga sasakyan, trailer at site na walang permanenteng kuryente o network. Nakaplano, hindi pa inilalabas.',
        },
      ],
    },
  ],
};

const platform: Page = {
  meta: {
    title: 'Platform: Paano Gumagana ang VexaOs',
    description:
      'Paano gumagana ang VexaOs: nagre-report ang mga sensor at smart plug sa isang Edge Gateway na ligtas kahit offline, na nagpapadala ng mga summary at agarang alarm sa VexaOs Cloud, kung saan ginagawang aksyon ang mga ito ng AI Insights at ng mga app sa web, iOS at Android.',
  },
  hero: {
    eyebrow: 'Platform',
    title: 'Mula sa sensor sa dingding hanggang sa alert [[sa inyong kamay.]]',
    subtitle:
      'Ang VexaOs ay apat na layer na gumagana bilang iisang sistema: mga sensor, gateway, cloud at mga app. Narito ang ginagawa ng bawat isa, at ang nangyayari sa isang reading habang dumadaan ito.',
    ctas: [
      { label: 'Mag-book ng demo', href: '/contact', variant: 'primary' },
      { label: 'Tingnan ang mga produkto', href: '/products', variant: 'secondary' },
    ],
  },
  sections: [
    { type: 'stack' },
    {
      type: 'steps',
      tinted: true,
      eyebrow: 'Ang paglalakbay ng isang reading',
      title: 'Ano ang nangyayari, hakbang-hakbang.',
      items: [
        { title: 'Kumukuha ng reading ang sensor', body: 'Ang mga sensor na de-baterya ay nagbo-broadcast ng temperatura, humidity o status ng pinto sa Bluetooth Low Energy kada ilang segundo. Nagre-report ang mga smart plug sa Wi-Fi. Sumasali ang mga wired na RS-485 / Modbus device sa pamamagitan ng integration.' },
        { title: 'Naririnig ito ng gateway', body: 'Nasasagap ng VexaOs Edge Gateway ang bawat sensor na abot nito, dine-decode ito gamit ang adapter para sa uri ng sensor na iyon, at kino-convert ito sa iisang karaniwang format.' },
        { title: 'Sinusuri ang mga rule sa mismong site', body: 'Tumatakbo ang mga alarm rule sa mismong gateway. Ang nalampasang limit o door event ay ipinapadala kaagad, nauuna sa lahat ng iba pang nasa queue.' },
        { title: 'Pumupunta sa cloud ang mga summary', body: 'Bilang default, nagpapadala ang gateway ng summary kada sensor tuwing 10 segundo: minimum, maximum, average at pinakabago. Maaaring itakda ang interval kada sensor.' },
        { title: 'Naghahanap ng problema ang cloud', body: 'Iniimbak ng VexaOs Cloud ang history at sinusuri ang bawat sensor para sa drift, mga forecast, hindi pangkaraniwang aktibidad ng pinto, mahinang baterya at mga device na tumahimik.' },
        { title: 'Nakikita ninyo ito at kumikilos kayo', body: 'Live na nag-a-update ang mga dashboard sa web, iOS at Android, at umaabot ang mga alert sa inyong telepono. Maaaring i-acknowledge at i-resolve ang mga alert, na may record kung sino ang gumawa ng ano.' },
      ],
    },
    {
      type: 'sensors',
      id: 'sensors',
      compact: true,
      eyebrow: 'Mga pamilya ng sensor',
      title: 'Ano ang kayang pakinggan ng platform.',
      subtitle:
        'Siyam na pamilya ng sensor, wireless at wired, sa iisang platform. Ang berde ay gumagana na ngayon; ang iba ay idinaragdag namin sa pamamagitan ng mga adapter.',
    },
    {
      type: 'split',
      id: 'offline',
      tinted: true,
      eyebrow: 'Kapag nawala ang internet',
      title: 'Walang nawawala. Walang nabibilang nang dalawang beses.',
      body: 'Hindi kailanman ipinagpapalagay ng gateway na may network. Pumapasok muna ang mga reading sa isang matibay na queue sa gateway, at inaalis lang kapag nakumpirma ng cloud na natanggap na nito ang mga ito.',
      checks: [
        'Iniingatan ang mga reading at alarm kahit mawalan ng internet o mag-restart ang gateway.',
        'Kapag bumalik ang koneksyon, unang ina-upload ang mga alarm, saka ang lahat ng iba pa mula sa pinakaluma hanggang sa pinakabago.',
        'Bawat mensahe ay may sariling ID, kaya hindi kailanman makakagawa ng duplicate ang isang retry.',
        'Ang mga alarm na bukas bago ang restart ay bukas pa rin pagkatapos nito.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      id: 'vendor-neutral',
      cols: 3,
      eyebrow: 'Vendor-neutral sa disenyo',
      title: 'Kumokonekta ang mga sensor sa pamamagitan ng mga adapter.',
      subtitle:
        'Ang adapter ay isang maliit na software sa gateway na nakakaintindi ng isang uri ng sensor. Lahat ng kasunod nito ay gumagamit ng iisang format ng VexaOs.',
      items: [
        { icon: 'plug', title: 'Magdagdag ng mga uri ng sensor sa paglipas ng panahon', body: 'Ang pagsuporta sa bagong klase ng sensor ay nangangahulugan ng pagdaragdag ng adapter. Nananatiling ganoon pa rin ang gateway, cloud at mga app.' },
        { icon: 'sensors', title: 'Isang format, mga standard na unit', body: 'Ang temperatura, humidity, pressure, power, baterya at signal ay iniimbak sa mga standard na unit. Kino-convert ng mga app ang mga ito para sa display, halimbawa °C o °F.' },
        { icon: 'gateway', title: 'Walang hulaan', body: 'Kung magpadala ang sensor ng format na hindi kilala ng adapter, tinatanggihan ang reading sa halip na hulaan.' },
      ],
    },
    {
      type: 'cards',
      id: 'security',
      tinted: true,
      cols: 4,
      eyebrow: 'Seguridad at access',
      title: 'Pinapatunayan ng bawat gateway kung sino ito. Ang nakikita lang ng bawat tao ay ang sarili nilang mga site.',
      items: [
        { title: 'Isang key kada gateway', body: 'Bawat gateway ay may sariling device key at ito ang ginagamit sa pag-sign in. Hindi kailanman umaalis ang key sa gateway.' },
        { title: 'Naka-encrypt habang ipinapadala', body: 'Nakikipag-usap ang mga gateway sa VexaOs Cloud sa HTTPS na may pagsusuri ng certificate. Suportado rin ang mga naka-encrypt na broadcast ng sensor.' },
        { title: 'Access ayon sa membership', body: 'Hinihiwalay ang data ayon sa organisasyon at site. Ang nakikita lang ng mga tao ay ang mga site kung saan sila idinagdag.' },
        { title: 'Mga account na sa imbitasyon lang', body: 'Ginagawa ang mga account sa pamamagitan ng imbitasyon, na may mga role na owner, admin, installer at viewer.' },
      ],
      note: {
        body: 'Walang hawak ang VexaOs na mga security o compliance certification sa ngayon, tulad ng SOC 2 o ISO 27001. Kung kailangan ninyo ng mga partikular na katiyakan, tanungin kami at sasagot kami nang tahasan.',
      },
    },
  ],
};

const products: Page = {
  meta: {
    title: 'Mga Produkto',
    description:
      'Ang linya ng produkto ng VexaOs: mga wireless sensor at smart plug, ang VexaOs Edge Gateway, ang Mobile Gateway (malapit na), VexaOs Cloud na may AI Insights, at mga app para sa web, iOS at Android.',
  },
  hero: {
    eyebrow: 'Mga Produkto',
    title: 'Lahat ng nasa pagitan ng reading [[at ng desisyon.]]',
    subtitle: 'Limang produktong sama-samang idinisenyo. Magsimula sa isang site at ilang sensor, at magdagdag habang kailangan ninyo.',
  },
  sections: [{ type: 'products' }],
};

const solutions: Page = {
  meta: {
    title: 'Mga Solusyon ayon sa Industriya',
    description:
      'Paano ginagamit ang VexaOs sa iba-ibang industriya: food service at cold chain, mga warehouse at logistics, manufacturing, mga pasilidad at property, at healthcare at pharma storage.',
  },
  hero: {
    eyebrow: 'Mga Solusyon',
    title: 'Isang platform. [[Ang inyong industriya.]]',
    subtitle:
      'Ang VexaOs ay hindi ginawa para sa iisang klase ng negosyo. Ang parehong mga sensor, gateway, cloud at app ay magagamit saanman mahalaga ang temperatura, humidity, isang pinto o isang appliance.',
  },
  sections: [
    {
      type: 'solutions',
      other: {
        title: 'May iba pa?',
        body: 'Kung may temperatura, humidity, pinto o plug ito, malamang na kaya itong bantayan ng platform. Sabihin sa amin kung ano ang nasa isip ninyo.',
        label: 'Makipag-usap sa amin',
      },
      restaurant: { eyebrow: 'Mula rin sa VexaOs', label: 'Tingnan ang Restaurant OS' },
    },
  ],
};

/** Labels around an industry page; the industry's own words are in catalog.ts. */
const industry = {
  eyebrowPrefix: 'Mga Solusyon',
  metaTitleSuffix: 'Monitoring',
  primary: 'Mag-book ng demo',
  secondary: 'Paano gumagana ang platform',
  monitor: { eyebrow: 'Ano ang dapat i-monitor', title: 'Kung saan ito tunay na napapakinabangan.' },
  how: { eyebrow: 'Paano nakakatulong ang VexaOs', title: 'Ang platform, sa aktuwal na gamit.' },
  stack: { eyebrow: 'Ang parehong stack saanman', title: 'Ang patatakbuhin ninyo.' },
  restaurantLead: 'Nagpapatakbo ng restaurant? Tingnan ang',
  restaurantTail: ', ang aming hospitality solution.',
};

const restaurantOs: Page = {
  meta: {
    title: 'Restaurant OS: VexaOs Hospitality',
    description:
      'Ang Restaurant OS ay ang solusyon ng VexaOs Hospitality para sa pagpapatakbo ng restaurant: floor, kitchen display at mga order sa iisang control center. Papalapit na sa pilot.',
  },
  hero: {
    eyebrow: 'Mga Solusyon · VexaOs Hospitality',
    status: 'development',
    title: 'Restaurant OS: [[isang sistema para sa buong restaurant.]]',
    subtitle:
      'Ang Restaurant OS ay isang hiwalay na solusyon ng VexaOs para sa hospitality. Pinag-uugnay nito ang floor, ang kusina at ang mga order sa iisang control center. Papalapit na ito sa pilot at hindi pa ito available sa pangkalahatan.',
    ctas: [
      { label: 'Magtanong tungkol sa pilot', href: '/contact', variant: 'primary' },
      { label: 'Monitoring ng cold chain', href: '/solutions/food-service-cold-chain', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Front of house',
      title: 'Ang floor, live.',
      body: 'Bawat mesa at ang status nito sa iisang view, nag-a-update habang pinapaupo ng mga host ang mga bisita at nililigpit ang mga mesa.',
      checks: [
        'Mga mesa ayon sa section, na may bilang ng upuan at kasalukuyang status.',
        'Isang tingin lang sa bilang ng available, may nakaupo at kailangang ligpitin.',
        'Maaaring magdagdag ng mesa at mag-override ng status ang mga manager.',
      ],
      shot: 'restaurantFloor',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Kusina',
      title: 'Mga ticket mula sa line hanggang sa pass.',
      body: 'Sinasalamin ng kitchen display ang mga live na ticket ayon sa stage, kaya ipinapakita ng control center ang nakikita ng kusina.',
      checks: [
        'Nasa line, handa nang ihatid at naihain na.',
        'Magkakasama ang mga ticket ng dine-in, catering at delivery.',
        'Markahan ang mga ticket bilang handa at naihain mula sa control center.',
      ],
      shot: 'restaurantKitchen',
    },
    {
      type: 'note',
      note: {
        title: 'Paano ito umaangkop sa monitoring platform',
        body: 'Magkahiwalay na produkto ngayon ang Restaurant OS at ang VexaOs monitoring platform. Maaaring gamitin ng isang restaurant ang mga sensor at gateway ng VexaOs para bantayan ang mga cooler at pinto nito nang walang Restaurant OS, at ganoon din sa kabaligtaran. Ipinapakita ng mga screenshot sa page na ito ang Restaurant OS na tumatakbo sa demonstration data, hindi sa restaurant ng isang customer.',
      },
      linkLead: 'Naghahanap ng monitoring para sa cooler, freezer at pinto?',
      link: { label: 'Tingnan ang food service at cold chain', href: '/solutions/food-service-cold-chain' },
    },
  ],
  cta: {
    title: 'Interesado sa pilot ng Restaurant OS?',
    body: 'Ikuwento sa amin ang inyong restaurant at ipapaliwanag namin sa inyo ang kalagayan ng Restaurant OS sa ngayon.',
  },
};

const about: Page = {
  meta: {
    title: 'Tungkol sa VexaOs',
    description:
      'Bumubuo ang VexaOs ng vendor-neutral na platform para i-monitor ang kahit ano, kahit saan: mga sensor, isang Edge Gateway na ligtas kahit offline, AI Insights sa cloud, at mga app. Nakabase sa Pontiac, Michigan.',
  },
  hero: {
    eyebrow: 'Tungkol sa Amin',
    title: 'Binubuo namin ang platform na [[nagbabantay sa mahalaga.]]',
    subtitle:
      'Ang VexaOs ay isang kompanya ng teknolohiya na nakabase sa Pontiac, Michigan. Gumagawa kami ng vendor-neutral na platform para sa pagmo-monitor ng kagamitan at mga espasyo: mga sensor, gateway, cloud at app, na idinisenyo bilang iisang sistema.',
  },
  sections: [
    {
      type: 'prose',
      paragraphs: [
        'Marami sa inaasahan ng isang negosyo ang nangyayari nang hindi nakikita. Umiinit ang freezer sa magdamag. May pintong naiwang bukas. Namamasa ang isang kuwarto. Kadalasan, may nakakaalam na lang pagkatapos, kapag nangyari na ang pinsala.',
        'Umiiral ang VexaOs para punan ang puwang na iyon. Inuna namin ang pinakamahihirap na bahagi: isang gateway na patuloy na nagre-record kapag pumalya ang network, at isang cloud na nakakapansin ng mabagal na drift gaya ng nalampasang limit. Saka namin binuo ang mga app sa ibabaw nito, para makita ito ng tamang tao sa tamang oras.',
        'Ang platform ay hindi nakatali sa iisang industriya o iisang gawa ng sensor. Ang food service, mga warehouse, manufacturing, mga pasilidad at healthcare storage ay may iisang pangunahing pangangailangan, at iisang platform ang nagsisilbi sa bawat isa.',
      ],
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Paano kami nagtatrabaho',
      title: 'Ano ang maaasahan ninyo sa amin.',
      items: [
        { title: 'Sinasabi namin kung ano ang totoo', body: 'Kung may bagay na dine-develop pa o malapit na, nilalagyan namin ito ng label. Wala kayong makikitang inimbentong customer, statistics o certification sa site na ito.' },
        { title: 'Sukat muna bago AI', body: 'Ang mga finding ay galing sa inyong mga sukat at ipinapakita ang mga numero nito. Ginagamit ang AI para magpaliwanag, hindi kailanman para magdesisyon.' },
        { title: 'Ginawa para sa masasamang araw', body: 'Nagdidisenyo kami para sa outage, pagkawala ng kuryente at ubos na baterya, dahil iyon ang mga araw na pinakakailangan ang monitoring.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Nasaan na kami',
      title: 'Isang batang kompanya, hayagang bumubuo.',
      items: [
        { title: 'Ngayon', body: 'Gumagana ang monitoring platform mula umpisa hanggang dulo: mga sensor ng temperatura, humidity at pinto, mga smart plug na may gastos sa enerhiya, ang Edge Gateway, VexaOs Cloud na may AI Insights, at ang web at mobile app. Tumatanggap na kami ng booking para sa mga demo ngayon.' },
        { title: 'Susunod', body: 'Vibration at machine-health sensing, mga wired na RS-485 / Modbus device, mga email alert, at ang Mobile Gateway. Ang Restaurant OS, ang aming hospitality solution, ay papalapit na sa pilot.' },
      ],
    },
    { type: 'findUs', title: 'Hanapin kami' },
  ],
};

const contact: Page = {
  meta: {
    title: 'Mag-book ng Demo',
    description:
      'Mag-book ng demo ng VexaOs monitoring platform, o makipag-ugnayan sa amin. Sabihin sa amin kung ano ang gusto ninyong i-monitor at ipapakita namin kung paano ito gumagana.',
  },
  hero: {
    eyebrow: 'Mag-book ng demo',
    title: 'Sabihin sa amin kung ano ang kailangan ninyong [[bantayan.]]',
    subtitle:
      'Sapat na ang maikling tala. Ipapakita namin sa inyo ang platform habang gumagana, at sasabihin namin nang tahasan kung ano ang kaya at hindi nito kayang gawin para sa inyo sa ngayon.',
  },
  sections: [
    {
      type: 'contact',
      next: {
        title: 'Ano ang susunod na mangyayari',
        items: [
          'Sasagot kami sa email para magtakda ng oras.',
          'Ipapakita namin sa inyo ang dashboard, mga alert at insight.',
          'Pag-uusapan natin ang inyong mga site at kung aling mga sensor ang babagay.',
        ],
      },
      email: { title: 'Mas gusto ang email?' },
    },
  ],
  cta: false,
};

export const pagesMain = { home, platform, products, solutions, industry, restaurantOs, about, contact };
