/**
 * Products, industries and the sensor catalog (Filipino).
 *
 * Structure (slugs, icons, statuses, connectivity) lives in lib/site.ts and
 * lib/sensors.ts. This file holds only the words, keyed by slug, and array
 * items line up by position with those registries.
 *
 * HONESTY RULES: only claim what the product does today; no customers,
 * statistics, certifications, sensor vendor names or specifications.
 */
// MACHINE DRAFT (fil): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.
export const catalog = {
  products: {
    sensors: {
      name: 'Mga Sensor',
      short: 'Mga Sensor',
      role: 'Sumukat',
      summary:
        'Siyam na pamilya ng sensor, wireless at wired. Gumagana na ngayon ang mga Bluetooth sensor para sa temperatura, humidity, pressure at pinto, pati ang mga Wi-Fi smart plug; ang iba pa, kabilang ang RS-485 / Modbus, ay idinaragdag sa pamamagitan ng mga adapter.',
    },
    'edge-gateway': {
      name: 'VexaOs Edge Gateway',
      short: 'Edge Gateway',
      role: 'Mangolekta',
      summary:
        'Nakikinig sa mga kalapit na sensor at smart plug, sinusuri ang mga alarm rule sa mismong site, at iniingatan ang bawat reading kahit mawalan ng internet o mag-restart.',
    },
    'mobile-gateway': {
      name: 'VexaOs Mobile Gateway',
      short: 'Mobile Gateway',
      role: 'Mangolekta habang bumibiyahe',
      summary: 'Ang parehong gateway para sa mga lugar na walang permanenteng kuryente o network: mga sasakyan, trailer at pansamantalang site.',
    },
    'cloud-ai-insights': {
      name: 'VexaOs Cloud & AI Insights',
      short: 'Cloud & AI Insights',
      role: 'Umunawa',
      summary:
        'Nag-iimbak ng history, nagpapatakbo ng mga alert rule, kinukuwenta ang halaga ng inyong konsumo ng enerhiya, at tinutukoy sa simpleng Ingles ang drift, mga time-to-limit forecast at hindi pangkaraniwang aktibidad ng pinto.',
    },
    apps: {
      name: 'VexaOs Apps',
      short: 'Apps',
      role: 'Kumilos',
      summary: 'Isang account sa web, iOS at Android: mga live na dashboard, alert, analytics, enerhiya, maraming site at mga role ng team.',
    },
  },

  industries: {
    'food-service-cold-chain': {
      name: 'Food service at cold chain',
      short: 'Pagkain at cold chain',
      headline: 'Alamin na malamig ang inyong mga cooler bago pa masayang ang pagkain.',
      summary:
        'Mga walk-in, reach-in, freezer at prep area, binabantayan araw at gabi. Makita ang cooler na umiinit ilang oras bago ito umabot sa limit, at malaman agad kapag may pintong naiwang bukas.',
      monitor: [
        { title: 'Mga walk-in cooler at freezer', body: 'Temperatura at humidity kada ilang segundo, binubuod at naka-chart ayon sa oras, araw at buwan.' },
        { title: 'Mga pinto ng cooler at freezer', body: 'Nire-record ang bawat pagbukas at pagsara sa sandaling mangyari ito, at may flag kapag nanatiling bukas ang pinto.' },
        { title: 'Prep area at dry storage', body: 'Temperatura at humidity ng kuwarto, na may mga alert kapag lumabas ang mga ito sa saklaw na itinakda ninyo.' },
      ],
      how: [
        { title: 'Babala bago umabot sa limit', body: 'Kapag papalapit ang trend ng isang cooler sa alert limit nito, ipinapakita ng forecast kung ilang oras pa ang natitira sa kasalukuyang bilis.' },
        { title: 'Hindi nawawala ang mga reading kahit may outage', body: 'Kapag nawala ang internet, patuloy na nagre-record ang gateway at ina-upload ang lahat kapag bumalik na ito.' },
        { title: 'Record na puwede ninyong i-export', body: 'Pang-araw-araw na minimum, average at maximum para sa bawat sensor, na may CSV export para sa sarili ninyong mga log.' },
      ],
      note: 'Nagre-record at nag-a-alert ang VexaOs tungkol sa mga kondisyon. Hindi nito pinapalitan ang inyong food safety plan, at wala itong hawak na food safety certification.',
    },
    'warehouses-logistics': {
      name: 'Mga warehouse at logistics',
      short: 'Mga warehouse',
      headline: 'Bawat storage zone at pinto ng dock, sa iisang screen.',
      summary:
        'Temperatura at humidity sa mga storage zone, at kumpletong record kung kailan bumubukas ang mga pinto at gaano katagal, sa bawat gusaling pinapatakbo ninyo.',
      monitor: [
        { title: 'Mga storage zone', body: 'Temperatura at humidity ayon sa lokasyon, kung saan ang bawat site, kuwarto at kagamitan ay nakapangalan ayon sa sarili ninyong pagpapangalan.' },
        { title: 'Mga pinto ng dock at cold room', body: 'Bilang ng bukas ngayong araw, pinakamatagal na bukas at timeline ng bawat event, pati flag para sa mga pagbukas sa hindi pangkaraniwang oras.' },
        { title: 'Mga kalakal na nasa biyahe', body: 'Isang gateway na de-baterya para sa mga sasakyan at trailer.' },
      ],
      how: [
        { title: 'Maraming site, isang account', body: 'Magpalipat-lipat sa mga lokasyon o tingnan ang mga ito nang sabay-sabay. Ang nakikita lang ng mga tao ay ang mga site na kinabibilangan nila.' },
        { title: 'Ikumpara ang mga zone', body: 'Pagtabihin ang mga sensor sa Analytics para mahanap ang zone na mainit o mahalumigmig.' },
        { title: 'Alamin kapag tumahimik ang kagamitan', body: 'Ang sensor na huminto sa pag-report, mahinang baterya o mahinang signal ay may kanya-kanyang finding.' },
      ],
      note: 'Ang pagmo-monitor habang nasa biyahe ay nakadepende sa Mobile Gateway, na hindi pa available.',
    },
    'manufacturing-machine-health': {
      name: 'Manufacturing at kalusugan ng makina',
      short: 'Manufacturing',
      headline: 'Bantayan ngayon ang mga kondisyon sa paligid ng inyong mga makina. Vibration ang susunod.',
      summary:
        'I-monitor na ngayon ang temperatura at humidity ng mga production area, electrical room at enclosure. Ang vibration monitoring para sa umiikot na kagamitan ay kasalukuyang ini-integrate.',
      monitor: [
        { title: 'Mga production at storage area', body: 'Temperatura at humidity sa mga lugar kung saan sensitibo sa alinman sa dalawa ang mga materyales at tapos nang produkto.' },
        { title: 'Mga enclosure at equipment room', body: 'Ang init na naiipon sa isang cabinet o kuwarto ay lumalabas bilang drift finding bago pa man malampasan ang isang nakatakdang limit.' },
        { title: 'Vibration sa umiikot na kagamitan', body: 'Velocity, displacement at frequency sa tatlong axis, binubuod sa gateway.' },
      ],
      how: [
        { title: 'Drift, hindi lang mga limit', body: 'Ang tuloy-tuloy na pagtaas sa loob ng anim na oras ay fina-flag kahit nasa loob pa ng pinapayagang saklaw ang reading.' },
        { title: 'Sinusuri ang mga rule sa mismong site', body: 'Tumatakbo ang mga alarm rule sa gateway, kaya may alarm pa rin kahit hindi maabot ang cloud.' },
        { title: 'Ginawa para madagdagan ng mga uri ng sensor', body: 'Bawat uri ng sensor ay isang adapter. Naidaragdag ang mga bago nang hindi binabago ang gateway, cloud o mga app sa paligid nito.' },
      ],
      note: 'Ang vibration at machine-health monitoring ay kasalukuyang ini-integrate at hindi pa available ngayon. Ang mga wired na instrumento ng planta sa RS-485 / Modbus ay inihahatid bilang integration. Sasabihin namin sa inyo ang kalagayan ng bawat isa kapag nakipag-ugnayan kayo.',
    },
    'facilities-property': {
      name: 'Mga pasilidad at property',
      short: 'Mga pasilidad',
      headline: 'Bantayan ang mga kuwartong walang taong nakatayo.',
      summary:
        'Mga plant room, server closet, storage unit at bakanteng espasyo: temperatura, humidity, mga pinto at nakasaksak na kagamitan, sa buong portfolio ng mga gusali.',
      monitor: [
        { title: 'Mga plant room at server room', body: 'Ang tumataas na temperatura ay fina-flag bilang trend, na may forecast kapag may nakatakdang limit.' },
        { title: 'Pamamasa at humidity', body: 'Ang sabay na pagtaas ng temperatura at humidity ay itinuturo bilang sarili nitong finding.' },
        { title: 'Mga pinto at access point', body: 'Record ng bawat pagbukas, na may flag para sa aktibidad sa mga oras na karaniwang tahimik.' },
      ],
      how: [
        { title: 'Nakaayos gaya ng inyong portfolio', body: 'Mga site, mga lokasyon sa loob ng site, at kagamitan, na may mga sensor na nakalagay sa bawat isa.' },
        { title: 'Mga role para sa staff at contractor', body: 'Ang mga role na owner, admin, installer at viewer ang nagtatakda kung sino ang puwedeng magbago ng mga rule at kung sino ang puwede lang tumingin.' },
        { title: 'Magkano ang gastos ng nakasaksak na kagamitan', body: 'Ipinapakita ng mga smart plug ang power, kWh at gastos kada appliance, at fina-flag ang kagamitang kumukonsumo ng kuryente habang naka-idle.' },
      ],
      note: 'Nagmo-monitor ng mga kondisyon ang VexaOs. Hindi ito security o access control system.',
    },
    'healthcare-pharma-storage': {
      name: 'Healthcare at pharma storage',
      short: 'Healthcare at pharma',
      headline: 'Tuloy-tuloy na record ng temperatura para sa mga ref na mahalaga.',
      summary:
        'Tuloy-tuloy na pagmo-monitor ng temperatura at humidity para sa mga ref ng gamot, freezer at storage room, na may mga alert at history na puwede ninyong i-export.',
      monitor: [
        { title: 'Mga ref at freezer ng gamot', body: 'Mga reading araw at gabi, na may mga alert rule na itinatakda ninyo kada sensor.' },
        { title: 'Mga storage room', body: 'Temperatura at humidity ng kuwarto na may pang-araw-araw na minimum, average at maximum.' },
        { title: 'Mga pinto ng ref at kuwarto', body: 'Nire-record ang bawat pagbukas, na may flag kapag naiwang bukas ang pinto.' },
      ],
      how: [
        { title: 'Maagang babala', body: 'Ipinapakita ng forecast ang mga oras na natitira bago maabot ang isang limit sa kasalukuyang bilis ng pagbabago.' },
        { title: 'Walang puwang dahil sa outage', body: 'Lokal na iniimbak ng gateway ang mga reading at ina-upload ang mga ito kapag bumalik ang koneksyon.' },
        { title: 'I-acknowledge at i-resolve', body: 'May history ang mga alert kung sino ang nag-acknowledge at nag-resolve sa mga ito, at kung kailan.' },
      ],
      note: 'Ang VexaOs ay isang monitoring tool. Hindi ito medical device at wala itong hawak na regulatory validation o certification (halimbawa 21 CFR Part 11 o GxP). Suriin ang sarili ninyong mga compliance requirement bago umasa rito para sa mga regulated na record.',
    },
  },

  restaurantOs: {
    name: 'Restaurant OS',
    summary:
      'Isang hiwalay na solusyon ng VexaOs Hospitality para sa pagpapatakbo ng restaurant: floor, kitchen display at mga order sa iisang control center. Papalapit na sa pilot.',
    card: 'Ang aming hospitality solution para sa pagpapatakbo ng restaurant, kasabay ng monitoring platform.',
  },

  sensors: {
    statusLabel: {
      now: 'Available na ngayon',
      integrating: 'Kasalukuyang ini-integrate',
      integration: 'Sa pamamagitan ng integration',
    },
    statusHelp: {
      now: 'Gumagana na sa platform ngayon.',
      integrating: 'May adapter na binubuo ngayon. Hindi pa available.',
      integration: 'Hindi pa nabubuo. Idinaragdag namin ito sa pamamagitan ng adapter kapag kailangan ng isang customer.',
    },
    connectivityName: {
      ble: 'Bluetooth Low Energy (wireless)',
      wifi: 'Wi-Fi (wireless)',
      rs485: 'RS-485 / Modbus (wired)',
    },
    legend: {
      ble: 'Wireless, Bluetooth Low Energy',
      wifi: 'Wireless, mga Wi-Fi smart plug',
      rs485: 'Wired, RS-485 / Modbus (sa pamamagitan ng integration)',
    },
    ui: {
      filterLabel: 'I-filter ang mga pamilya ng sensor ayon sa industriya',
      all: 'Lahat ng industriya',
      details: 'Mga detalye',
      seeDetails: 'Tingnan ang mga detalye',
      hideDetails: 'Itago ang mga detalye',
      typicalUse: 'Karaniwang gamit:',
      more: '+{n} pa',
      fullCatalog: 'Tingnan ang buong katalogo ng sensor',
    },
    request: {
      title: 'Hindi ninyo makita ang inyong sensor?',
      body: 'Wireless man o wired, ini-integrate namin ito. Vendor-neutral ang VexaOs at nagdaragdag ito ng mga bagong sensor sa pamamagitan ng mga adapter. Sabihin sa amin kung ano ang kailangan ninyong sukatin at sasabihin namin nang tahasan kung gumagana na ito ngayon, kasalukuyang ginagawa, o kailangan pang buuin.',
      label: 'Magtanong tungkol sa isang sensor',
    },
    connectivity: {
      ble: {
        title: 'Wireless: Bluetooth Low Energy',
        body: 'Mga sensor na de-baterya na walang kailangang i-wire. Naririnig ng gateway ang bawat sensor na abot nito.',
        items: [
          'Temperatura, humidity at barometric pressure',
          'Contact ng pinto at bintana',
          'Paggalaw ng sensor, baterya at lakas ng signal',
          'Suportado ang mga naka-encrypt na broadcast ng sensor',
        ],
      },
      wifi: {
        title: 'Wireless: mga Wi-Fi smart plug',
        body: 'Mga metering plug na nasa parehong network ng gateway. Isaksak ang appliance at makita kung gaano kalaki ang konsumo nito.',
        items: [
          'Power ngayon, sa watts',
          'Enerhiyang nagamit, sa kWh',
          'Status na naka-on, naka-off at overloaded',
          'Gastos batay sa mga presyong inilagay ninyo',
        ],
        note: 'Isang modelo ng plug ang suportado ngayon, at kasya ito sa mga outlet na pang-North America. Ang mga plug para sa ibang rehiyon ay idinaragdag bilang integration.',
      },
      rs485: {
        title: 'Wired na pang-industriya: RS-485 / Modbus RTU',
        body: 'Para sa mga instrumento at controller na nasa inyong plant floor na. Opsyonal ang Modbus TCP sa Ethernet.',
        items: [
          'Mga energy at power meter, mga flow meter',
          'Mga level at pressure transmitter',
          'Mga signal na 4–20 mA at 0–10 V, sa pamamagitan ng mga converter',
          'Mga PLC at controller, kagamitang HVAC at BMS',
        ],
        note: 'Hindi pa nabubuo ang Modbus adapter ng gateway. Ang mga wired na device ay inihahatid bilang integration, binubuo at tine-test sa inyong kagamitan. Monitoring lang: nagbabasa ng mga value ang VexaOs at hindi nito kinokontrol ang kagamitan.',
      },
      footer: 'Isang data model, isang app. Wireless man o wired, bawat reading ay may parehong history, mga alert at insight.',
    },
    families: {
      environment: {
        name: 'Kapaligiran',
        value: 'Alamin ang mga kondisyon sa bawat kuwarto.',
        measurements: ['Temperatura', 'Humidity', 'Barometric pressure', 'Kalidad ng hangin (CO₂, VOC, PM2.5)', 'Liwanag', 'Ingay'],
        use: 'Mga storage room, lugar ng trabaho, server closet at opisina.',
        detail:
          'Gumagana na ngayon ang temperatura, humidity at pressure, na may history, mga alert rule, drift detection at mga time-to-limit forecast. Ang kalidad ng hangin, liwanag at ingay ay idinaragdag sa pamamagitan ng mga adapter; sabihin sa amin kung alin ang kailangan ninyo.',
      },
      'cold-chain': {
        name: 'Cold chain at food safety',
        value: 'Mahuli ang umiinit na cooler bago masayang ang stock.',
        measurements: [
          'Temperatura ng hangin sa cooler at freezer',
          'Pinto ng cooler na naiwang nakaawang',
          'Mga log ng temperatura na may CSV export',
          'Mga deep-freeze probe',
          'Mga probe para sa food-holding temperature',
        ],
        use: 'Mga walk-in, reach-in, freezer, ref ng gamot at prep line.',
        detail:
          'Gumagana na ngayon ang temperatura ng hangin sa loob ng mga cooler at freezer, mga flag sa pintong nakaawang at mga log na puwedeng i-export. Ibinibigay sa inyo ng mga log ang pang-araw-araw na minimum, average at maximum bilang suporta sa sarili ninyong mga record na estilong HACCP; ang VexaOs ay hindi food safety certification. Ang mga wired na probe para sa deep-freeze at food-holding temperature ay idinaragdag sa pamamagitan ng mga adapter.',
      },
      'access-occupancy': {
        name: 'Access at occupancy',
        value: 'Makita kung ano ang bumukas, kailan, at gaano katagal.',
        measurements: [
          'Contact ng pinto at bintana',
          'Paggalaw at pagtagilid ng sensor',
          'Motion (PIR)',
          'Occupancy at pagbibilang ng tao',
          'Mga panic button at call button',
        ],
        use: 'Mga pinto ng cold room, pinto ng dock, stock room at mga pagsusuri sa tahimik na oras.',
        detail:
          'Inire-report ng mga contact sensor ang bawat pagbukas at pagsara sa sandaling mangyari ito, kasama ang bilang ng bukas ngayong araw, pinakamatagal na bukas at isang timeline. Kasama na rito ang mga finding para sa hindi pangkaraniwang oras at naiwang bukas. Ang motion, occupancy at mga button ay idinaragdag sa pamamagitan ng mga adapter. Ang VexaOs ay hindi security o emergency response system.',
      },
      'water-leak': {
        name: 'Tubig at tagas',
        value: 'Mahanap ang tagas habang maliit na sanaw pa lang ito.',
        measurements: ['Mga spot ng tagas at baha', 'Daloy at konsumo ng tubig', 'Tangke at level'],
        use: 'Mga plant room, ilalim ng lababo at kagamitan, basement at tangke.',
        detail:
          'Wala pang gumagana ngayon sa pamilyang ito. Ang mga wireless na leak spot, at mga wired na flow meter at level transmitter sa RS-485 / Modbus, ay idinaragdag sa pamamagitan ng mga adapter at gagamit ng parehong mga alert, history at app gaya ng lahat ng iba pang sensor.',
      },
      'machine-health': {
        name: 'Kalusugan ng makina',
        value: 'Matukoy ang pasirang makina batay sa takbo nito.',
        measurements: [
          'Vibration: velocity, displacement, frequency',
          'Temperatura ng bearing at motor',
          'Tilt at oryentasyon',
          'Runtime at mga cycle',
          'Current draw (mga CT clamp)',
        ],
        use: 'Mga motor, pump, fan, compressor at conveyor.',
        detail:
          'Ang una naming vibration sensor ay kasalukuyang ini-integrate: velocity, displacement at frequency sa tatlong axis, na may temperatura at anggulo, binubuod sa gateway. Hindi pa ito available. Susunod ang runtime, pagbibilang ng cycle at mga current clamp sa pamamagitan ng mga adapter, wireless o wired sa RS-485 / Modbus.',
      },
      'industrial-process': {
        name: 'Prosesong pang-industriya',
        value: 'Dalhin sa iisang screen ang mga instrumentong mayroon na kayo.',
        measurements: [
          'Mga pressure transmitter',
          'Mga flow meter',
          'Level ng tangke at vessel',
          'Mga analog input (4–20 mA, 0–10 V sa pamamagitan ng mga converter)',
          'Mga register ng PLC at controller',
        ],
        use: 'Mga process line, pump station, boiler at chiller plant, HVAC at BMS.',
        detail:
          'Wala pang gumagana ngayon sa pamilyang ito. Kumokonekta ang mga instrumentong ito gamit ang wire sa RS-485 / Modbus RTU, na may Modbus TCP sa Ethernet bilang opsyon. Hindi pa nabubuo ang Modbus adapter ng gateway; binubuo namin ito para sa inyong kagamitan bilang integration. Monitoring lang: nagbabasa ng mga value ang VexaOs at hindi nito kinokontrol ang kagamitan.',
      },
      energy: {
        name: 'Enerhiya',
        value: 'Alamin kung ano ang tumatakbo at magkano ang gastos nito sa inyo.',
        measurements: [
          'Power (W) at enerhiya (kWh) ng smart plug',
          'Gastos na may seasonal at time-of-use na presyo',
          'Pagtukoy ng standby draw',
          'Breakdown ng gastos kada appliance',
          'Mga power meter ng panel at circuit (RS-485)',
        ],
        use: 'Mga ref, coffee machine, oven, compressor, server at kagamitan sa opisina.',
        detail:
          'Gumagana na ngayon ang mga Wi-Fi smart plug: power ngayon, kWh, at gastos ngayong araw, ngayong linggo at ngayong buwan para sa bawat appliance. Kayo ang naglalagay ng sarili ninyong presyo ng kuryente (flat, ayon sa season, o ayon sa season na may on-peak at off-peak na oras), at fina-flag ng platform ang kagamitang patuloy na kumukonsumo ng kuryente habang naka-idle. Ang mga gastos ay mga tantiya mula sa mga presyong inilagay ninyo, hindi utility bill. Isang modelo ng plug ang suportado ngayon at kasya ito sa mga outlet na pang-North America. Ang mga meter ng panel at circuit sa RS-485 / Modbus ay idinaragdag bilang integration.',
      },
      'assets-tracking': {
        name: 'Mga asset at tracking',
        value: 'Alamin kung aling gateway ang huling nakarinig sa inyong kagamitan.',
        measurements: [
          'Mga Bluetooth asset tag at beacon',
          'Lokasyon kung saan huling nakita',
          'Habang nasa biyahe, gamit ang Mobile Gateway (malapit na)',
        ],
        use: 'Mga cart, container, tool at kargang lumilipat sa pagitan ng mga site.',
        detail:
          'Naririnig na ng mga gateway ang mga Bluetooth device sa paligid nila; ang paggawa nito bilang asset tracking ay idinaragdag sa pamamagitan ng mga adapter. Ang tracking sa pagitan ng mga site ay nakadepende sa Mobile Gateway, na malapit na.',
      },
      safety: {
        name: 'Kaligtasan',
        value: 'Dagdag na mga matang nagbabantay sa hanging hindi ninyo nakikita.',
        measurements: ['Carbon monoxide (CO)', 'Methane at combustible gas', 'Mga indicator na kaugnay ng usok'],
        use: 'Mga kusina, plant room, garahe at battery room.',
        detail:
          'Wala pang gumagana ngayon sa pamilyang ito. Maaaring idagdag ang mga gas sensor sa pamamagitan ng mga adapter para sa awareness at trend monitoring lamang. Ang VexaOs ay hindi life-safety system, wala itong hawak na life-safety certification, at hindi kailanman dapat ipalit sa mga smoke, fire o gas alarm na itinatakda ng code.',
      },
    },
  },
};
