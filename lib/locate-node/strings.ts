import type { Locale } from '@/lib/i18n/config';

/**
 * The Locate Node page (/locate-node). English is the source; th, vi, id and
 * fil are machine drafts (see docs/LOCALIZATION.md).
 *
 * HONESTY RULES for this page. Locate Node is IN DEVELOPMENT.
 *  - Every capability comes from the product's own description in the store
 *    and is worded as intent ("designed to"), never as a measured result.
 *  - No numbers the product data does not contain: no range, speed, battery
 *    life, sensor counts, certifications, awards, reviews or customers.
 *    Unknown specifications are shown as "—".
 *  - Superlatives are brand voice ("the best listener in the room"), never a
 *    factual ranking against other products.
 *  - It is NOT the VexaOs Edge Gateway: nothing here borrows that product's
 *    behaviour (offline queue, watchdogs, sub-second door events).
 *  - Brand names stay as written: VexaOs, VexaOs Locate Node, VexaOs Cloud,
 *    AI Insights, MQTT, HTTP/HTTPS, Bluetooth, USB-C.
 */
const en = {
  meta: {
    title: 'VexaOs Locate Node: Small. Mighty. Always listening.',
    description:
      'VexaOs Locate Node is a compact Bluetooth gateway, in development, designed to bring supported sensors and tagged assets into VexaOs, MQTT and HTTP/HTTPS systems.',
  },
  name: 'VexaOs Locate Node',
  hero: {
    title: ['Small.', 'Mighty.', 'Always listening.'],
    subtitle: 'A compact Bluetooth gateway designed to bring your sensors and your tagged equipment into one intelligent picture.',
    how: 'See how it works',
    imageAlt: 'VexaOs Locate Node: a matte-black wall gateway with an external antenna and a glowing blue status light bar.',
  },
  status: { soon: 'Coming soon', expected: 'Expected {when}', development: 'In development', available: 'Available now' },
  buy: { notify: 'Notify me', buy: 'Buy', view: 'View in store', priceTba: 'Price TBA', soonNote: 'Not on sale yet. Leave your email and we will tell you when it is.' },
  statement: 'Every space is full of signals. A cooler drifting warm. A cart that moved. A room nobody checked. Locate Node is designed to listen for them, so you do not have to.',
  design: {
    eyebrow: 'Design',
    title: ['Matte black.', 'Quietly brilliant.'],
    body: 'A device made to be seen, in places where most hardware is hidden. Refined enough for a dining room. Tough-looking enough for a factory floor.',
    points: [
      { title: 'A light bar that speaks', body: 'One horizontal RGB bar is designed to show operation, connectivity and system status at a glance.' },
      { title: 'An antenna with intent', body: 'An external antenna, out in the open, where a radio belongs.' },
      { title: 'One cable', body: 'USB-C power. That is the whole installation diagram.' },
      { title: 'On the wall, out of the way', body: 'Designed for wall mounting, with a serviceable enclosure and premium fasteners.' },
    ],
  },
  stats: {
    title: 'The whole idea, in three numbers.',
    items: [
      { value: 4, label: 'kinds of Bluetooth devices it is designed to hear', detail: 'Temperature, humidity, environmental sensors and asset tags.' },
      { value: 3, label: 'ways to connect what it hears', detail: 'VexaOs, MQTT and HTTP/HTTPS.' },
      { value: 1, label: 'cable to power it', detail: 'USB-C.' },
    ],
  },
  flow: {
    eyebrow: 'How it works',
    title: ['From a whisper', 'to a decision.'],
    steps: [
      { title: 'Sensors', body: 'Supported Bluetooth sensors and asset tags broadcast nearby.' },
      { title: 'Locate Node', body: 'Designed to collect those broadcasts and pass them on.' },
      { title: 'VexaOs Cloud & AI', body: 'Where readings become history, alerts and plain-language insights.' },
      { title: 'Your phone', body: 'The VexaOs apps for web, iOS and Android.' },
    ],
    note: 'Cloud services, alerts and analytics may require a separate software subscription.',
  },
  bento: {
    eyebrow: 'What it is designed to do',
    title: ['One device.', 'A building full of answers.'],
    items: [
      { title: 'It listens to your sensors', body: 'Collects wireless broadcasts from supported Bluetooth Low Energy sensors: temperature, humidity, environmental and more.' },
      { title: 'It notices what is nearby', body: 'Identifies nearby Bluetooth asset tags. Place several nodes around a building for room-level and zone-based location estimates.' },
      { title: 'It keeps you aware', body: 'Connect readings and observations to monitoring platforms for visualization, alerts, history and analysis.' },
      { title: 'It speaks your language', body: 'VexaOs, MQTT, HTTP/HTTPS. Use the platform you have, or the one you are building.' },
      { title: 'It tells you how it is doing', body: 'A precision light bar, designed as a calm visual signal for operation and connectivity.' },
      { title: 'It belongs', body: 'Compact, matte black, with refined branding. Made to sit in a professional space without apology.' },
    ],
  },
  places: {
    eyebrow: 'Made for real places',
    title: ['Front of house.', 'Back of house.', 'Everywhere in between.'],
    captions: ['At home on a dining-room wall.', 'Just as comfortable on the factory floor.'],
    alts: ['Locate Node mounted on a wall in a restaurant dining room.', 'Locate Node mounted on a pillar in a manufacturing facility.'],
    listTitle: 'Designed for',
    list: ['Warehouses and distribution centers', 'Manufacturing and industrial facilities', 'Restaurants and hospitality', 'Medical offices and healthcare operations', 'Commercial offices and campuses', 'Retail and inventory management', 'Equipment storage and maintenance', 'Smart buildings and connected workplaces'],
  },
  editions: {
    eyebrow: 'Two ways to run it',
    title: 'Choose how it connects.',
    items: [
      { name: 'Standard', body: 'Native VexaOs connectivity, monitoring and provisioning.', note: 'Software subscription sold separately.' },
      { name: 'Open Integration', body: 'MQTT and HTTP/HTTPS integration with third-party systems and custom software.', note: '' },
    ],
  },
  compare: {
    eyebrow: 'The old way, and this way',
    title: ['Stop walking the floor', 'with a clipboard.'],
    old: 'The old way',
    new: 'With Locate Node',
    rows: [
      ['Someone walks the building and writes readings down.', 'Designed to collect readings wirelessly from supported sensors.'],
      ['You hear about a problem after it has happened.', 'Connect readings to alerts and history in your monitoring platform.'],
      ['“Where is that cart?” Ask around.', 'Room-level and zone-based estimates with several nodes.'],
      ['Your data lives in one closed box.', 'VexaOs, MQTT and HTTP/HTTPS: your data goes where you need it.'],
    ],
  },
  specs: {
    eyebrow: 'Tech specs',
    title: 'What we know. And what we do not, yet.',
    rows: [
      ['Wireless', 'Bluetooth Low Energy (receives broadcasts from supported sensors and tags)'],
      ['Integrations', 'VexaOs · MQTT · HTTP/HTTPS'],
      ['Power', 'USB-C'],
      ['Antenna', 'External'],
      ['Mounting', 'Wall'],
      ['Status indicator', 'Horizontal RGB light bar'],
      ['Enclosure', 'Matte black, serviceable'],
      ['Network connection', '—'],
      ['Dimensions and weight', '—'],
      ['Wireless range', '—'],
      ['Operating temperature', '—'],
      ['Certifications', '—'],
    ],
    note: '“—” means not yet published. Locate Node is in development; specifications are confirmed after hardware validation.',
  },
  compat: {
    eyebrow: 'Compatibility',
    title: 'Plays well with others.',
    sensorsTitle: 'Sensors and tags',
    sensors: ['Temperature sensors', 'Humidity sensors', 'Environmental monitors', 'Bluetooth asset tags'],
    sensorsNote: 'Supported Bluetooth Low Energy devices only. Compatible devices and supporting software are required. Ask us about yours.',
    connectTitle: 'Connectivity',
    connect: ['VexaOs (Standard edition)', 'MQTT (Open Integration)', 'HTTP / HTTPS (Open Integration)'],
    notTitle: 'What it is not',
    not: ['Not GPS.', 'Not guaranteed precise indoor positioning: location estimates depend on where nodes are placed and on the environment.'],
  },
  faq: {
    title: 'Questions. Answered straight.',
    items: [
      { q: 'Can I buy it today?', a: 'Not yet. Locate Node is in development. The first production units will be offered after hardware validation and software compatibility testing. Leave your email and we will tell you the moment it is available.' },
      { q: 'Does it track things with GPS?', a: 'No. Locate Node listens for nearby Bluetooth tags. With several nodes it supports room-level and zone-based estimates, which depend on node placement and the environment. It does not provide GPS or guaranteed precise indoor positioning.' },
      { q: 'What else do I need?', a: 'Compatible Bluetooth devices and supporting software. Advanced analytics, notifications and cloud services may require a separate software subscription.' },
      { q: 'Will it work with my sensors?', a: 'It is designed for supported Bluetooth Low Energy sensors, including compatible temperature, humidity, environmental and asset-tracking devices. Tell us what you use and we will tell you where it stands.' },
      { q: 'Do I have to use VexaOs?', a: 'No. The Open Integration edition is designed for MQTT and HTTP/HTTPS, for third-party systems and your own software.' },
      { q: 'Is this the VexaOs Edge Gateway?', a: 'No. Locate Node is a separate, compact device that is still in development. The VexaOs Edge Gateway is a different product, available today.' },
    ],
  },
  final: { title: ['Every signal matters.', 'Be the first to hear.'], body: 'Locate Node is on its way. Put your name down and we will email you when it is ready.' },
  footnote: 'VexaOs Locate Node is in development. This page describes its intended design, which may change before release. The final hardware may differ from the images shown.',
  store: { explore: 'Explore Locate Node', banner: 'Locate Node. Small. Mighty. Always listening.' },
};
export type LocateNodeStrings = typeof en;

const th: LocateNodeStrings = {
  meta: {
    title: 'VexaOs Locate Node: เล็ก ทรงพลัง ฟังอยู่เสมอ',
    description: 'VexaOs Locate Node คือเกตเวย์ Bluetooth ขนาดกะทัดรัดที่อยู่ระหว่างการพัฒนา ออกแบบมาเพื่อนำเซ็นเซอร์ที่รองรับและทรัพย์สินที่ติดแท็กเข้าสู่ระบบ VexaOs, MQTT และ HTTP/HTTPS',
  },
  name: 'VexaOs Locate Node',
  hero: {
    title: ['เล็ก', 'ทรงพลัง', 'ฟังอยู่เสมอ'],
    subtitle: 'เกตเวย์ Bluetooth ขนาดกะทัดรัด ออกแบบมาเพื่อรวมเซ็นเซอร์และอุปกรณ์ที่ติดแท็กของคุณไว้ในภาพเดียวที่ชาญฉลาด',
    how: 'ดูวิธีการทำงาน',
    imageAlt: 'VexaOs Locate Node: เกตเวย์ติดผนังสีดำด้าน มีเสาอากาศภายนอกและแถบไฟสถานะสีน้ำเงิน',
  },
  status: { soon: 'เร็ว ๆ นี้', expected: 'คาดว่าจะมา {when}', development: 'อยู่ระหว่างการพัฒนา', available: 'พร้อมจำหน่ายแล้ว' },
  buy: { notify: 'แจ้งเตือนฉัน', buy: 'ซื้อ', view: 'ดูในร้านค้า', priceTba: 'ยังไม่ประกาศราคา', soonNote: 'ยังไม่วางจำหน่าย ฝากอีเมลไว้ แล้วเราจะแจ้งให้ทราบเมื่อพร้อม' },
  statement: 'ทุกพื้นที่เต็มไปด้วยสัญญาณ ตู้เย็นที่ค่อย ๆ อุ่นขึ้น รถเข็นที่ถูกย้าย ห้องที่ไม่มีใครตรวจ Locate Node ออกแบบมาเพื่อคอยฟังสิ่งเหล่านั้น เพื่อที่คุณจะได้ไม่ต้องคอยฟังเอง',
  design: {
    eyebrow: 'ดีไซน์',
    title: ['ดำด้าน', 'เฉียบคมอย่างเงียบ ๆ'],
    body: 'อุปกรณ์ที่สร้างมาเพื่อให้มองเห็น ในที่ที่ฮาร์ดแวร์ส่วนใหญ่ถูกซ่อนไว้ ประณีตพอสำหรับห้องอาหาร และดูแข็งแกร่งพอสำหรับพื้นที่โรงงาน',
    points: [
      { title: 'แถบไฟที่บอกเล่าได้', body: 'แถบไฟ RGB แนวนอนหนึ่งแถบ ออกแบบมาเพื่อแสดงการทำงาน การเชื่อมต่อ และสถานะระบบได้ในพริบตา' },
      { title: 'เสาอากาศที่มีเหตุผล', body: 'เสาอากาศภายนอก อยู่ในที่โล่ง ซึ่งเป็นที่ของคลื่นวิทยุ' },
      { title: 'สายเดียว', body: 'จ่ายไฟผ่าน USB-C นั่นคือแผนผังการติดตั้งทั้งหมด' },
      { title: 'บนผนัง ไม่เกะกะ', body: 'ออกแบบมาสำหรับติดผนัง พร้อมตัวเครื่องที่เปิดซ่อมบำรุงได้และสกรูคุณภาพสูง' },
    ],
  },
  stats: {
    title: 'แนวคิดทั้งหมด ในตัวเลขสามตัว',
    items: [
      { value: 4, label: 'ประเภทอุปกรณ์ Bluetooth ที่ออกแบบมาให้รับฟัง', detail: 'เซ็นเซอร์อุณหภูมิ ความชื้น สภาพแวดล้อม และแท็กทรัพย์สิน' },
      { value: 3, label: 'วิธีเชื่อมต่อสิ่งที่ได้ยิน', detail: 'VexaOs, MQTT และ HTTP/HTTPS' },
      { value: 1, label: 'สายสำหรับจ่ายไฟ', detail: 'USB-C' },
    ],
  },
  flow: {
    eyebrow: 'วิธีการทำงาน',
    title: ['จากเสียงกระซิบ', 'สู่การตัดสินใจ'],
    steps: [
      { title: 'เซ็นเซอร์', body: 'เซ็นเซอร์ Bluetooth และแท็กทรัพย์สินที่รองรับส่งสัญญาณอยู่ใกล้ ๆ' },
      { title: 'Locate Node', body: 'ออกแบบมาเพื่อรวบรวมสัญญาณเหล่านั้นและส่งต่อ' },
      { title: 'VexaOs Cloud และ AI', body: 'ที่ซึ่งค่าที่อ่านได้กลายเป็นประวัติ การแจ้งเตือน และข้อมูลเชิงลึกในภาษาที่เข้าใจง่าย' },
      { title: 'โทรศัพท์ของคุณ', body: 'แอป VexaOs สำหรับเว็บ iOS และ Android' },
    ],
    note: 'บริการคลาวด์ การแจ้งเตือน และการวิเคราะห์ อาจต้องสมัครสมาชิกซอฟต์แวร์แยกต่างหาก',
  },
  bento: {
    eyebrow: 'สิ่งที่ออกแบบมาให้ทำ',
    title: ['อุปกรณ์เดียว', 'ทั้งอาคารเต็มไปด้วยคำตอบ'],
    items: [
      { title: 'ฟังเซ็นเซอร์ของคุณ', body: 'รวบรวมสัญญาณไร้สายจากเซ็นเซอร์ Bluetooth Low Energy ที่รองรับ: อุณหภูมิ ความชื้น สภาพแวดล้อม และอื่น ๆ' },
      { title: 'สังเกตสิ่งที่อยู่ใกล้', body: 'ระบุแท็กทรัพย์สิน Bluetooth ที่อยู่ใกล้ วางหลายโหนดรอบอาคารเพื่อประมาณตำแหน่งระดับห้องและระดับโซน' },
      { title: 'ทำให้คุณรับรู้เสมอ', body: 'เชื่อมต่อค่าที่อ่านได้และข้อมูลที่สังเกตได้กับแพลตฟอร์มมอนิเตอร์ เพื่อการแสดงผล การแจ้งเตือน ประวัติ และการวิเคราะห์' },
      { title: 'พูดภาษาเดียวกับคุณ', body: 'VexaOs, MQTT, HTTP/HTTPS ใช้แพลตฟอร์มที่คุณมี หรือแพลตฟอร์มที่คุณกำลังสร้าง' },
      { title: 'บอกให้รู้ว่าตัวเองเป็นอย่างไร', body: 'แถบไฟที่ออกแบบอย่างประณีต เป็นสัญญาณภาพที่สงบสำหรับการทำงานและการเชื่อมต่อ' },
      { title: 'เข้ากับที่ของมัน', body: 'กะทัดรัด ดำด้าน พร้อมแบรนด์ที่ประณีต สร้างมาเพื่ออยู่ในพื้นที่ทำงานมืออาชีพได้อย่างมั่นใจ' },
    ],
  },
  places: {
    eyebrow: 'สร้างมาเพื่อสถานที่จริง',
    title: ['หน้าร้าน', 'หลังร้าน', 'และทุกที่ระหว่างนั้น'],
    captions: ['เข้ากันได้ดีบนผนังห้องอาหาร', 'และสบายพอ ๆ กันบนพื้นที่โรงงาน'],
    alts: ['Locate Node ติดตั้งบนผนังในห้องอาหารของร้านอาหาร', 'Locate Node ติดตั้งบนเสาในโรงงานผลิต'],
    listTitle: 'ออกแบบมาสำหรับ',
    list: ['คลังสินค้าและศูนย์กระจายสินค้า', 'โรงงานผลิตและอุตสาหกรรม', 'ร้านอาหารและธุรกิจบริการ', 'คลินิกและงานด้านสุขภาพ', 'สำนักงานและแคมปัสธุรกิจ', 'ค้าปลีกและการจัดการสินค้าคงคลัง', 'พื้นที่จัดเก็บและซ่อมบำรุงอุปกรณ์', 'อาคารอัจฉริยะและสถานที่ทำงานที่เชื่อมต่อกัน'],
  },
  editions: {
    eyebrow: 'สองวิธีในการใช้งาน',
    title: 'เลือกวิธีเชื่อมต่อ',
    items: [
      { name: 'Standard', body: 'การเชื่อมต่อ การมอนิเตอร์ และการตั้งค่าอุปกรณ์กับ VexaOs โดยตรง', note: 'การสมัครสมาชิกซอฟต์แวร์จำหน่ายแยกต่างหาก' },
      { name: 'Open Integration', body: 'การเชื่อมต่อ MQTT และ HTTP/HTTPS กับระบบของผู้ให้บริการรายอื่นและซอฟต์แวร์ที่พัฒนาเอง', note: '' },
    ],
  },
  compare: {
    eyebrow: 'วิธีเดิม และวิธีนี้',
    title: ['เลิกเดินตรวจ', 'พร้อมคลิปบอร์ด'],
    old: 'วิธีเดิม',
    new: 'ด้วย Locate Node',
    rows: [
      ['มีคนเดินรอบอาคารแล้วจดค่าที่อ่านได้', 'ออกแบบมาเพื่อรวบรวมค่าแบบไร้สายจากเซ็นเซอร์ที่รองรับ'],
      ['คุณรู้ปัญหาหลังจากที่มันเกิดขึ้นแล้ว', 'เชื่อมต่อค่าที่อ่านได้กับการแจ้งเตือนและประวัติในแพลตฟอร์มมอนิเตอร์ของคุณ'],
      ['“รถเข็นคันนั้นอยู่ไหน” ต้องถามคนรอบข้าง', 'การประมาณตำแหน่งระดับห้องและระดับโซนด้วยหลายโหนด'],
      ['ข้อมูลของคุณอยู่ในกล่องปิดกล่องเดียว', 'VexaOs, MQTT และ HTTP/HTTPS: ข้อมูลของคุณไปยังที่ที่คุณต้องการ'],
    ],
  },
  specs: {
    eyebrow: 'ข้อมูลทางเทคนิค',
    title: 'สิ่งที่เรารู้ และสิ่งที่เรายังไม่รู้',
    rows: [
      ['ไร้สาย', 'Bluetooth Low Energy (รับสัญญาณจากเซ็นเซอร์และแท็กที่รองรับ)'],
      ['การเชื่อมต่อระบบ', 'VexaOs · MQTT · HTTP/HTTPS'],
      ['ไฟเลี้ยง', 'USB-C'],
      ['เสาอากาศ', 'ภายนอก'],
      ['การติดตั้ง', 'ติดผนัง'],
      ['ไฟแสดงสถานะ', 'แถบไฟ RGB แนวนอน'],
      ['ตัวเครื่อง', 'ดำด้าน เปิดซ่อมบำรุงได้'],
      ['การเชื่อมต่อเครือข่าย', '—'],
      ['ขนาดและน้ำหนัก', '—'],
      ['ระยะสัญญาณไร้สาย', '—'],
      ['อุณหภูมิใช้งาน', '—'],
      ['การรับรองมาตรฐาน', '—'],
    ],
    note: '“—” หมายถึงยังไม่ได้เผยแพร่ Locate Node อยู่ระหว่างการพัฒนา ข้อมูลจำเพาะจะยืนยันหลังการตรวจสอบฮาร์ดแวร์',
  },
  compat: {
    eyebrow: 'ความเข้ากันได้',
    title: 'ทำงานร่วมกับผู้อื่นได้ดี',
    sensorsTitle: 'เซ็นเซอร์และแท็ก',
    sensors: ['เซ็นเซอร์อุณหภูมิ', 'เซ็นเซอร์ความชื้น', 'อุปกรณ์ตรวจวัดสภาพแวดล้อม', 'แท็กทรัพย์สิน Bluetooth'],
    sensorsNote: 'เฉพาะอุปกรณ์ Bluetooth Low Energy ที่รองรับ ต้องมีอุปกรณ์ที่เข้ากันได้และซอฟต์แวร์รองรับ สอบถามเราเกี่ยวกับอุปกรณ์ของคุณ',
    connectTitle: 'การเชื่อมต่อ',
    connect: ['VexaOs (รุ่น Standard)', 'MQTT (Open Integration)', 'HTTP / HTTPS (Open Integration)'],
    notTitle: 'สิ่งที่ไม่ใช่',
    not: ['ไม่ใช่ GPS', 'ไม่รับประกันการระบุตำแหน่งภายในอาคารอย่างแม่นยำ: การประมาณตำแหน่งขึ้นอยู่กับตำแหน่งที่วางโหนดและสภาพแวดล้อม'],
  },
  faq: {
    title: 'คำถาม ตอบอย่างตรงไปตรงมา',
    items: [
      { q: 'ซื้อได้วันนี้ไหม', a: 'ยัง Locate Node อยู่ระหว่างการพัฒนา หน่วยผลิตชุดแรกจะเปิดจำหน่ายหลังการตรวจสอบฮาร์ดแวร์และการทดสอบความเข้ากันได้ของซอฟต์แวร์ ฝากอีเมลไว้ แล้วเราจะแจ้งทันทีที่พร้อม' },
      { q: 'ติดตามสิ่งของด้วย GPS หรือไม่', a: 'ไม่ Locate Node คอยฟังแท็ก Bluetooth ที่อยู่ใกล้ เมื่อใช้หลายโหนดจะรองรับการประมาณตำแหน่งระดับห้องและระดับโซน ซึ่งขึ้นอยู่กับตำแหน่งที่วางโหนดและสภาพแวดล้อม ไม่มี GPS และไม่รับประกันการระบุตำแหน่งภายในอาคารอย่างแม่นยำ' },
      { q: 'ต้องมีอะไรเพิ่มอีกบ้าง', a: 'อุปกรณ์ Bluetooth ที่เข้ากันได้และซอฟต์แวร์รองรับ การวิเคราะห์ขั้นสูง การแจ้งเตือน และบริการคลาวด์ อาจต้องสมัครสมาชิกซอฟต์แวร์แยกต่างหาก' },
      { q: 'ใช้กับเซ็นเซอร์ของฉันได้ไหม', a: 'ออกแบบมาสำหรับเซ็นเซอร์ Bluetooth Low Energy ที่รองรับ รวมถึงอุปกรณ์วัดอุณหภูมิ ความชื้น สภาพแวดล้อม และติดตามทรัพย์สินที่เข้ากันได้ บอกเราว่าคุณใช้อะไร แล้วเราจะบอกสถานะให้ทราบ' },
      { q: 'จำเป็นต้องใช้ VexaOs ไหม', a: 'ไม่จำเป็น รุ่น Open Integration ออกแบบมาสำหรับ MQTT และ HTTP/HTTPS เพื่อใช้กับระบบของผู้ให้บริการรายอื่นและซอฟต์แวร์ของคุณเอง' },
      { q: 'นี่คือ VexaOs Edge Gateway หรือไม่', a: 'ไม่ใช่ Locate Node เป็นอุปกรณ์ขนาดกะทัดรัดอีกรุ่นหนึ่งที่ยังอยู่ระหว่างการพัฒนา VexaOs Edge Gateway เป็นผลิตภัณฑ์คนละตัวที่มีจำหน่ายแล้ววันนี้' },
    ],
  },
  final: { title: ['ทุกสัญญาณมีความหมาย', 'เป็นคนแรกที่ได้ยิน'], body: 'Locate Node กำลังจะมา ลงชื่อไว้ แล้วเราจะส่งอีเมลถึงคุณเมื่อพร้อม' },
  footnote: 'VexaOs Locate Node อยู่ระหว่างการพัฒนา หน้านี้อธิบายการออกแบบที่ตั้งใจไว้ ซึ่งอาจเปลี่ยนแปลงก่อนวางจำหน่าย ฮาร์ดแวร์จริงอาจแตกต่างจากภาพที่แสดง',
  store: { explore: 'สำรวจ Locate Node', banner: 'Locate Node เล็ก ทรงพลัง ฟังอยู่เสมอ' },
};

const vi: LocateNodeStrings = {
  meta: {
    title: 'VexaOs Locate Node: Nhỏ gọn. Mạnh mẽ. Luôn lắng nghe.',
    description: 'VexaOs Locate Node là một gateway Bluetooth nhỏ gọn đang được phát triển, được thiết kế để đưa các cảm biến được hỗ trợ và tài sản gắn thẻ vào hệ thống VexaOs, MQTT và HTTP/HTTPS.',
  },
  name: 'VexaOs Locate Node',
  hero: {
    title: ['Nhỏ gọn.', 'Mạnh mẽ.', 'Luôn lắng nghe.'],
    subtitle: 'Một gateway Bluetooth nhỏ gọn, được thiết kế để đưa cảm biến và thiết bị gắn thẻ của bạn vào một bức tranh thông minh duy nhất.',
    how: 'Xem cách hoạt động',
    imageAlt: 'VexaOs Locate Node: gateway gắn tường màu đen nhám với ăng-ten ngoài và thanh đèn trạng thái màu xanh lam.',
  },
  status: { soon: 'Sắp ra mắt', expected: 'Dự kiến {when}', development: 'Đang phát triển', available: 'Đã có hàng' },
  buy: { notify: 'Báo cho tôi', buy: 'Mua', view: 'Xem trong cửa hàng', priceTba: 'Giá sẽ được công bố sau', soonNote: 'Chưa mở bán. Hãy để lại email, chúng tôi sẽ báo cho bạn khi có hàng.' },
  statement: 'Mọi không gian đều đầy tín hiệu. Một tủ mát đang ấm dần. Một chiếc xe đẩy đã bị dời đi. Một căn phòng không ai kiểm tra. Locate Node được thiết kế để lắng nghe chúng, để bạn không phải làm việc đó.',
  design: {
    eyebrow: 'Thiết kế',
    title: ['Đen nhám.', 'Xuất sắc một cách lặng lẽ.'],
    body: 'Một thiết bị được làm ra để được nhìn thấy, ở những nơi mà phần lớn phần cứng bị giấu đi. Đủ tinh tế cho phòng ăn. Đủ cứng cáp cho sàn nhà máy.',
    points: [
      { title: 'Thanh đèn biết nói', body: 'Một thanh đèn RGB nằm ngang được thiết kế để cho thấy hoạt động, kết nối và trạng thái hệ thống chỉ trong một cái nhìn.' },
      { title: 'Ăng-ten có chủ đích', body: 'Ăng-ten ngoài, đặt ở nơi thoáng, đúng chỗ của sóng vô tuyến.' },
      { title: 'Một sợi cáp', body: 'Nguồn USB-C. Đó là toàn bộ sơ đồ lắp đặt.' },
      { title: 'Trên tường, không vướng víu', body: 'Được thiết kế để gắn tường, với vỏ máy có thể bảo dưỡng và ốc vít cao cấp.' },
    ],
  },
  stats: {
    title: 'Toàn bộ ý tưởng, trong ba con số.',
    items: [
      { value: 4, label: 'loại thiết bị Bluetooth mà nó được thiết kế để lắng nghe', detail: 'Cảm biến nhiệt độ, độ ẩm, môi trường và thẻ tài sản.' },
      { value: 3, label: 'cách kết nối những gì nó nghe được', detail: 'VexaOs, MQTT và HTTP/HTTPS.' },
      { value: 1, label: 'sợi cáp để cấp nguồn', detail: 'USB-C.' },
    ],
  },
  flow: {
    eyebrow: 'Cách hoạt động',
    title: ['Từ một lời thì thầm', 'đến một quyết định.'],
    steps: [
      { title: 'Cảm biến', body: 'Các cảm biến Bluetooth và thẻ tài sản được hỗ trợ phát tín hiệu ở gần.' },
      { title: 'Locate Node', body: 'Được thiết kế để thu các tín hiệu đó và chuyển tiếp.' },
      { title: 'VexaOs Cloud & AI', body: 'Nơi số đo trở thành lịch sử, cảnh báo và thông tin dễ hiểu.' },
      { title: 'Điện thoại của bạn', body: 'Ứng dụng VexaOs cho web, iOS và Android.' },
    ],
    note: 'Dịch vụ đám mây, cảnh báo và phân tích có thể cần một gói đăng ký phần mềm riêng.',
  },
  bento: {
    eyebrow: 'Những gì nó được thiết kế để làm',
    title: ['Một thiết bị.', 'Cả tòa nhà đầy câu trả lời.'],
    items: [
      { title: 'Lắng nghe cảm biến của bạn', body: 'Thu tín hiệu không dây từ các cảm biến Bluetooth Low Energy được hỗ trợ: nhiệt độ, độ ẩm, môi trường và hơn thế nữa.' },
      { title: 'Nhận biết những gì ở gần', body: 'Nhận diện các thẻ tài sản Bluetooth ở gần. Đặt nhiều node quanh tòa nhà để ước tính vị trí theo phòng và theo khu vực.' },
      { title: 'Giúp bạn luôn nắm tình hình', body: 'Kết nối số đo và quan sát với các nền tảng giám sát để hiển thị, cảnh báo, lưu lịch sử và phân tích.' },
      { title: 'Nói ngôn ngữ của bạn', body: 'VexaOs, MQTT, HTTP/HTTPS. Dùng nền tảng bạn đang có, hoặc nền tảng bạn đang xây dựng.' },
      { title: 'Cho bạn biết nó đang thế nào', body: 'Một thanh đèn chính xác, được thiết kế như một tín hiệu trực quan nhẹ nhàng cho hoạt động và kết nối.' },
      { title: 'Thuộc về không gian', body: 'Nhỏ gọn, đen nhám, thương hiệu tinh tế. Được làm ra để hiện diện tự tin trong không gian chuyên nghiệp.' },
    ],
  },
  places: {
    eyebrow: 'Làm cho những nơi có thật',
    title: ['Khu vực khách.', 'Khu vực bếp.', 'Và mọi nơi ở giữa.'],
    captions: ['Hợp với bức tường phòng ăn.', 'Và cũng thoải mái trên sàn nhà máy.'],
    alts: ['Locate Node gắn trên tường trong phòng ăn của nhà hàng.', 'Locate Node gắn trên cột trong một nhà máy sản xuất.'],
    listTitle: 'Được thiết kế cho',
    list: ['Kho hàng và trung tâm phân phối', 'Cơ sở sản xuất và công nghiệp', 'Nhà hàng và dịch vụ lưu trú', 'Phòng khám và hoạt động y tế', 'Văn phòng và khuôn viên doanh nghiệp', 'Bán lẻ và quản lý tồn kho', 'Khu lưu trữ và bảo trì thiết bị', 'Tòa nhà thông minh và nơi làm việc kết nối'],
  },
  editions: {
    eyebrow: 'Hai cách vận hành',
    title: 'Chọn cách kết nối.',
    items: [
      { name: 'Standard', body: 'Kết nối, giám sát và cấp phát thiết bị trực tiếp với VexaOs.', note: 'Gói đăng ký phần mềm được bán riêng.' },
      { name: 'Open Integration', body: 'Tích hợp MQTT và HTTP/HTTPS với hệ thống của bên thứ ba và phần mềm tùy chỉnh.', note: '' },
    ],
  },
  compare: {
    eyebrow: 'Cách cũ, và cách này',
    title: ['Thôi đi quanh xưởng', 'với tấm bìa kẹp giấy.'],
    old: 'Cách cũ',
    new: 'Với Locate Node',
    rows: [
      ['Có người đi khắp tòa nhà và ghi lại số đo.', 'Được thiết kế để thu số đo không dây từ các cảm biến được hỗ trợ.'],
      ['Bạn biết về sự cố sau khi nó đã xảy ra.', 'Kết nối số đo với cảnh báo và lịch sử trong nền tảng giám sát của bạn.'],
      ['“Chiếc xe đẩy đó ở đâu?” Đi hỏi mọi người.', 'Ước tính theo phòng và theo khu vực với nhiều node.'],
      ['Dữ liệu của bạn nằm trong một chiếc hộp đóng kín.', 'VexaOs, MQTT và HTTP/HTTPS: dữ liệu đi đến nơi bạn cần.'],
    ],
  },
  specs: {
    eyebrow: 'Thông số kỹ thuật',
    title: 'Điều chúng tôi biết. Và điều chưa biết.',
    rows: [
      ['Không dây', 'Bluetooth Low Energy (nhận tín hiệu từ cảm biến và thẻ được hỗ trợ)'],
      ['Tích hợp', 'VexaOs · MQTT · HTTP/HTTPS'],
      ['Nguồn', 'USB-C'],
      ['Ăng-ten', 'Ngoài'],
      ['Lắp đặt', 'Gắn tường'],
      ['Đèn trạng thái', 'Thanh đèn RGB nằm ngang'],
      ['Vỏ máy', 'Đen nhám, có thể bảo dưỡng'],
      ['Kết nối mạng', '—'],
      ['Kích thước và trọng lượng', '—'],
      ['Tầm phủ sóng không dây', '—'],
      ['Nhiệt độ hoạt động', '—'],
      ['Chứng nhận', '—'],
    ],
    note: '“—” nghĩa là chưa công bố. Locate Node đang được phát triển; thông số sẽ được xác nhận sau khi thẩm định phần cứng.',
  },
  compat: {
    eyebrow: 'Tương thích',
    title: 'Phối hợp tốt với những thứ khác.',
    sensorsTitle: 'Cảm biến và thẻ',
    sensors: ['Cảm biến nhiệt độ', 'Cảm biến độ ẩm', 'Thiết bị theo dõi môi trường', 'Thẻ tài sản Bluetooth'],
    sensorsNote: 'Chỉ các thiết bị Bluetooth Low Energy được hỗ trợ. Cần có thiết bị tương thích và phần mềm hỗ trợ. Hãy hỏi chúng tôi về thiết bị của bạn.',
    connectTitle: 'Kết nối',
    connect: ['VexaOs (phiên bản Standard)', 'MQTT (Open Integration)', 'HTTP / HTTPS (Open Integration)'],
    notTitle: 'Những gì nó không phải',
    not: ['Không phải GPS.', 'Không bảo đảm định vị trong nhà chính xác: ước tính vị trí phụ thuộc vào nơi đặt node và môi trường.'],
  },
  faq: {
    title: 'Câu hỏi. Trả lời thẳng thắn.',
    items: [
      { q: 'Tôi có thể mua hôm nay không?', a: 'Chưa. Locate Node đang được phát triển. Những thiết bị sản xuất đầu tiên sẽ được chào bán sau khi thẩm định phần cứng và kiểm tra tương thích phần mềm. Hãy để lại email, chúng tôi sẽ báo ngay khi có hàng.' },
      { q: 'Nó có theo dõi đồ vật bằng GPS không?', a: 'Không. Locate Node lắng nghe các thẻ Bluetooth ở gần. Với nhiều node, nó hỗ trợ ước tính theo phòng và theo khu vực, phụ thuộc vào vị trí đặt node và môi trường. Nó không cung cấp GPS hay định vị trong nhà chính xác được bảo đảm.' },
      { q: 'Tôi cần thêm những gì?', a: 'Thiết bị Bluetooth tương thích và phần mềm hỗ trợ. Phân tích nâng cao, thông báo và dịch vụ đám mây có thể cần một gói đăng ký phần mềm riêng.' },
      { q: 'Nó có dùng được với cảm biến của tôi không?', a: 'Nó được thiết kế cho các cảm biến Bluetooth Low Energy được hỗ trợ, gồm các thiết bị đo nhiệt độ, độ ẩm, môi trường và theo dõi tài sản tương thích. Hãy cho chúng tôi biết bạn dùng gì, chúng tôi sẽ cho bạn biết tình trạng.' },
      { q: 'Tôi có bắt buộc dùng VexaOs không?', a: 'Không. Phiên bản Open Integration được thiết kế cho MQTT và HTTP/HTTPS, dành cho hệ thống của bên thứ ba và phần mềm của riêng bạn.' },
      { q: 'Đây có phải VexaOs Edge Gateway không?', a: 'Không. Locate Node là một thiết bị nhỏ gọn riêng biệt, vẫn đang được phát triển. VexaOs Edge Gateway là một sản phẩm khác, hiện đã có.' },
    ],
  },
  final: { title: ['Mọi tín hiệu đều quan trọng.', 'Hãy là người nghe đầu tiên.'], body: 'Locate Node đang đến. Hãy để lại tên, chúng tôi sẽ gửi email cho bạn khi nó sẵn sàng.' },
  footnote: 'VexaOs Locate Node đang được phát triển. Trang này mô tả thiết kế dự kiến, có thể thay đổi trước khi phát hành. Phần cứng cuối cùng có thể khác với hình ảnh hiển thị.',
  store: { explore: 'Khám phá Locate Node', banner: 'Locate Node. Nhỏ gọn. Mạnh mẽ. Luôn lắng nghe.' },
};

const id: LocateNodeStrings = {
  meta: {
    title: 'VexaOs Locate Node: Kecil. Perkasa. Selalu mendengarkan.',
    description: 'VexaOs Locate Node adalah gateway Bluetooth ringkas yang sedang dikembangkan, dirancang untuk membawa sensor yang didukung dan aset bertag ke sistem VexaOs, MQTT, dan HTTP/HTTPS.',
  },
  name: 'VexaOs Locate Node',
  hero: {
    title: ['Kecil.', 'Perkasa.', 'Selalu mendengarkan.'],
    subtitle: 'Gateway Bluetooth ringkas yang dirancang untuk menyatukan sensor dan peralatan bertag Anda dalam satu gambaran yang cerdas.',
    how: 'Lihat cara kerjanya',
    imageAlt: 'VexaOs Locate Node: gateway dinding hitam doff dengan antena eksternal dan bilah lampu status biru yang menyala.',
  },
  status: { soon: 'Segera hadir', expected: 'Perkiraan {when}', development: 'Dalam pengembangan', available: 'Tersedia sekarang' },
  buy: { notify: 'Beri tahu saya', buy: 'Beli', view: 'Lihat di toko', priceTba: 'Harga akan diumumkan', soonNote: 'Belum dijual. Tinggalkan email Anda dan kami akan memberi tahu saat tersedia.' },
  statement: 'Setiap ruang penuh dengan sinyal. Pendingin yang perlahan menghangat. Troli yang berpindah. Ruangan yang tidak diperiksa siapa pun. Locate Node dirancang untuk mendengarkan semuanya, agar Anda tidak perlu melakukannya.',
  design: {
    eyebrow: 'Desain',
    title: ['Hitam doff.', 'Cemerlang tanpa berisik.'],
    body: 'Perangkat yang dibuat untuk terlihat, di tempat sebagian besar perangkat keras disembunyikan. Cukup halus untuk ruang makan. Cukup tangguh tampilannya untuk lantai pabrik.',
    points: [
      { title: 'Bilah lampu yang berbicara', body: 'Satu bilah RGB horizontal dirancang untuk menunjukkan operasi, konektivitas, dan status sistem dalam sekilas.' },
      { title: 'Antena dengan maksud', body: 'Antena eksternal, di tempat terbuka, di tempat radio seharusnya berada.' },
      { title: 'Satu kabel', body: 'Daya USB-C. Itulah seluruh diagram pemasangannya.' },
      { title: 'Di dinding, tidak mengganggu', body: 'Dirancang untuk dipasang di dinding, dengan casing yang dapat diservis dan pengencang premium.' },
    ],
  },
  stats: {
    title: 'Seluruh gagasannya, dalam tiga angka.',
    items: [
      { value: 4, label: 'jenis perangkat Bluetooth yang dirancang untuk didengarnya', detail: 'Sensor suhu, kelembapan, lingkungan, dan tag aset.' },
      { value: 3, label: 'cara menghubungkan apa yang didengarnya', detail: 'VexaOs, MQTT, dan HTTP/HTTPS.' },
      { value: 1, label: 'kabel untuk memberinya daya', detail: 'USB-C.' },
    ],
  },
  flow: {
    eyebrow: 'Cara kerja',
    title: ['Dari sebuah bisikan', 'menjadi keputusan.'],
    steps: [
      { title: 'Sensor', body: 'Sensor Bluetooth dan tag aset yang didukung memancarkan sinyal di sekitar.' },
      { title: 'Locate Node', body: 'Dirancang untuk mengumpulkan pancaran itu dan meneruskannya.' },
      { title: 'VexaOs Cloud & AI', body: 'Tempat pembacaan menjadi riwayat, peringatan, dan wawasan dalam bahasa sederhana.' },
      { title: 'Ponsel Anda', body: 'Aplikasi VexaOs untuk web, iOS, dan Android.' },
    ],
    note: 'Layanan cloud, peringatan, dan analitik mungkin memerlukan langganan perangkat lunak terpisah.',
  },
  bento: {
    eyebrow: 'Untuk apa ia dirancang',
    title: ['Satu perangkat.', 'Gedung yang penuh jawaban.'],
    items: [
      { title: 'Mendengarkan sensor Anda', body: 'Mengumpulkan pancaran nirkabel dari sensor Bluetooth Low Energy yang didukung: suhu, kelembapan, lingkungan, dan lainnya.' },
      { title: 'Memperhatikan apa yang ada di dekatnya', body: 'Mengenali tag aset Bluetooth di sekitar. Tempatkan beberapa node di sekeliling gedung untuk perkiraan lokasi tingkat ruangan dan zona.' },
      { title: 'Membuat Anda tetap tahu', body: 'Hubungkan pembacaan dan pengamatan ke platform pemantauan untuk visualisasi, peringatan, riwayat, dan analisis.' },
      { title: 'Berbicara dalam bahasa Anda', body: 'VexaOs, MQTT, HTTP/HTTPS. Gunakan platform yang Anda miliki, atau yang sedang Anda bangun.' },
      { title: 'Memberi tahu keadaannya', body: 'Bilah lampu presisi, dirancang sebagai isyarat visual yang tenang untuk operasi dan konektivitas.' },
      { title: 'Cocok di tempatnya', body: 'Ringkas, hitam doff, dengan merek yang halus. Dibuat untuk hadir di ruang profesional dengan percaya diri.' },
    ],
  },
  places: {
    eyebrow: 'Dibuat untuk tempat nyata',
    title: ['Area depan.', 'Area belakang.', 'Dan semua di antaranya.'],
    captions: ['Serasi di dinding ruang makan.', 'Sama nyamannya di lantai pabrik.'],
    alts: ['Locate Node terpasang di dinding ruang makan restoran.', 'Locate Node terpasang di pilar sebuah fasilitas manufaktur.'],
    listTitle: 'Dirancang untuk',
    list: ['Gudang dan pusat distribusi', 'Fasilitas manufaktur dan industri', 'Restoran dan perhotelan', 'Klinik dan layanan kesehatan', 'Kantor dan kampus bisnis', 'Ritel dan pengelolaan persediaan', 'Penyimpanan dan pemeliharaan peralatan', 'Gedung pintar dan tempat kerja terhubung'],
  },
  editions: {
    eyebrow: 'Dua cara menjalankannya',
    title: 'Pilih cara terhubungnya.',
    items: [
      { name: 'Standard', body: 'Konektivitas, pemantauan, dan provisioning VexaOs secara langsung.', note: 'Langganan perangkat lunak dijual terpisah.' },
      { name: 'Open Integration', body: 'Integrasi MQTT dan HTTP/HTTPS dengan sistem pihak ketiga dan perangkat lunak khusus.', note: '' },
    ],
  },
  compare: {
    eyebrow: 'Cara lama, dan cara ini',
    title: ['Berhenti berkeliling', 'dengan papan klip.'],
    old: 'Cara lama',
    new: 'Dengan Locate Node',
    rows: [
      ['Seseorang berkeliling gedung dan mencatat pembacaan.', 'Dirancang untuk mengumpulkan pembacaan secara nirkabel dari sensor yang didukung.'],
      ['Anda tahu ada masalah setelah terjadi.', 'Hubungkan pembacaan ke peringatan dan riwayat di platform pemantauan Anda.'],
      ['“Di mana troli itu?” Tanya sana-sini.', 'Perkiraan tingkat ruangan dan zona dengan beberapa node.'],
      ['Data Anda tersimpan dalam satu kotak tertutup.', 'VexaOs, MQTT, dan HTTP/HTTPS: data Anda pergi ke tempat yang Anda butuhkan.'],
    ],
  },
  specs: {
    eyebrow: 'Spesifikasi teknis',
    title: 'Yang kami tahu. Dan yang belum.',
    rows: [
      ['Nirkabel', 'Bluetooth Low Energy (menerima pancaran dari sensor dan tag yang didukung)'],
      ['Integrasi', 'VexaOs · MQTT · HTTP/HTTPS'],
      ['Daya', 'USB-C'],
      ['Antena', 'Eksternal'],
      ['Pemasangan', 'Dinding'],
      ['Indikator status', 'Bilah lampu RGB horizontal'],
      ['Casing', 'Hitam doff, dapat diservis'],
      ['Koneksi jaringan', '—'],
      ['Dimensi dan berat', '—'],
      ['Jangkauan nirkabel', '—'],
      ['Suhu operasi', '—'],
      ['Sertifikasi', '—'],
    ],
    note: '“—” berarti belum dipublikasikan. Locate Node sedang dikembangkan; spesifikasi dikonfirmasi setelah validasi perangkat keras.',
  },
  compat: {
    eyebrow: 'Kompatibilitas',
    title: 'Bekerja baik dengan yang lain.',
    sensorsTitle: 'Sensor dan tag',
    sensors: ['Sensor suhu', 'Sensor kelembapan', 'Pemantau lingkungan', 'Tag aset Bluetooth'],
    sensorsNote: 'Hanya perangkat Bluetooth Low Energy yang didukung. Diperlukan perangkat yang kompatibel dan perangkat lunak pendukung. Tanyakan kepada kami tentang perangkat Anda.',
    connectTitle: 'Konektivitas',
    connect: ['VexaOs (edisi Standard)', 'MQTT (Open Integration)', 'HTTP / HTTPS (Open Integration)'],
    notTitle: 'Yang bukan',
    not: ['Bukan GPS.', 'Bukan penentuan posisi dalam ruangan yang dijamin presisi: perkiraan lokasi bergantung pada penempatan node dan lingkungan.'],
  },
  faq: {
    title: 'Pertanyaan. Dijawab terus terang.',
    items: [
      { q: 'Bisakah saya membelinya hari ini?', a: 'Belum. Locate Node sedang dikembangkan. Unit produksi pertama akan ditawarkan setelah validasi perangkat keras dan pengujian kompatibilitas perangkat lunak. Tinggalkan email Anda dan kami akan memberi tahu begitu tersedia.' },
      { q: 'Apakah ia melacak barang dengan GPS?', a: 'Tidak. Locate Node mendengarkan tag Bluetooth di sekitar. Dengan beberapa node, ia mendukung perkiraan tingkat ruangan dan zona, yang bergantung pada penempatan node dan lingkungan. Ia tidak menyediakan GPS atau penentuan posisi dalam ruangan yang dijamin presisi.' },
      { q: 'Apa lagi yang saya butuhkan?', a: 'Perangkat Bluetooth yang kompatibel dan perangkat lunak pendukung. Analitik lanjutan, notifikasi, dan layanan cloud mungkin memerlukan langganan perangkat lunak terpisah.' },
      { q: 'Apakah akan bekerja dengan sensor saya?', a: 'Ia dirancang untuk sensor Bluetooth Low Energy yang didukung, termasuk perangkat suhu, kelembapan, lingkungan, dan pelacak aset yang kompatibel. Beri tahu kami apa yang Anda gunakan dan kami akan memberi tahu statusnya.' },
      { q: 'Apakah saya harus memakai VexaOs?', a: 'Tidak. Edisi Open Integration dirancang untuk MQTT dan HTTP/HTTPS, untuk sistem pihak ketiga dan perangkat lunak Anda sendiri.' },
      { q: 'Apakah ini VexaOs Edge Gateway?', a: 'Bukan. Locate Node adalah perangkat ringkas terpisah yang masih dikembangkan. VexaOs Edge Gateway adalah produk berbeda yang tersedia hari ini.' },
    ],
  },
  final: { title: ['Setiap sinyal berarti.', 'Jadilah yang pertama mendengar.'], body: 'Locate Node sedang dalam perjalanan. Daftarkan nama Anda dan kami akan mengirim email saat ia siap.' },
  footnote: 'VexaOs Locate Node sedang dikembangkan. Halaman ini menjelaskan desain yang dimaksudkan, yang dapat berubah sebelum dirilis. Perangkat keras akhir dapat berbeda dari gambar yang ditampilkan.',
  store: { explore: 'Jelajahi Locate Node', banner: 'Locate Node. Kecil. Perkasa. Selalu mendengarkan.' },
};

const fil: LocateNodeStrings = {
  meta: {
    title: 'VexaOs Locate Node: Maliit. Makapangyarihan. Laging nakikinig.',
    description: 'Ang VexaOs Locate Node ay isang compact na Bluetooth gateway na ginagawa pa, na idinisenyo para dalhin ang mga suportadong sensor at mga asset na may tag sa mga sistemang VexaOs, MQTT, at HTTP/HTTPS.',
  },
  name: 'VexaOs Locate Node',
  hero: {
    title: ['Maliit.', 'Makapangyarihan.', 'Laging nakikinig.'],
    subtitle: 'Isang compact na Bluetooth gateway na idinisenyo para pagsamahin ang iyong mga sensor at kagamitang may tag sa iisang matalinong larawan.',
    how: 'Tingnan kung paano ito gumagana',
    imageAlt: 'VexaOs Locate Node: isang matte-black na gateway na pang-dingding na may panlabas na antenna at kumikinang na asul na status light bar.',
  },
  status: { soon: 'Malapit na', expected: 'Inaasahan sa {when}', development: 'Ginagawa pa', available: 'Available na ngayon' },
  buy: { notify: 'Abisuhan ako', buy: 'Bilhin', view: 'Tingnan sa tindahan', priceTba: 'Iaanunsyo pa ang presyo', soonNote: 'Hindi pa ibinebenta. Iwan ang iyong email at sasabihan ka namin kapag available na.' },
  statement: 'Puno ng signal ang bawat espasyo. Isang cooler na unti-unting umiinit. Isang cart na nailipat. Isang silid na walang tumingin. Idinisenyo ang Locate Node para pakinggan ang mga ito, para hindi mo na kailangang gawin.',
  design: {
    eyebrow: 'Disenyo',
    title: ['Matte black.', 'Tahimik na napakahusay.'],
    body: 'Isang device na ginawa para makita, sa mga lugar kung saan karaniwang itinatago ang hardware. Sapat na pino para sa dining room. Sapat na matibay ang itsura para sa sahig ng pabrika.',
    points: [
      { title: 'Isang light bar na nagsasalita', body: 'Isang pahalang na RGB bar na idinisenyo para ipakita ang operasyon, koneksyon, at status ng sistema sa isang sulyap.' },
      { title: 'Isang antenna na may layunin', body: 'Panlabas na antenna, nasa hayag, kung saan nararapat ang radyo.' },
      { title: 'Isang kable', body: 'USB-C na power. Iyon na ang buong diagram ng pagkakabit.' },
      { title: 'Nasa dingding, hindi nakaharang', body: 'Idinisenyo para ikabit sa dingding, na may enclosure na maaaring i-service at de-kalidad na mga turnilyo.' },
    ],
  },
  stats: {
    title: 'Ang buong ideya, sa tatlong numero.',
    items: [
      { value: 4, label: 'uri ng Bluetooth device na idinisenyo nitong pakinggan', detail: 'Mga sensor ng temperatura, halumigmig, kapaligiran, at mga asset tag.' },
      { value: 3, label: 'paraan para ikonekta ang naririnig nito', detail: 'VexaOs, MQTT, at HTTP/HTTPS.' },
      { value: 1, label: 'kable para paganahin ito', detail: 'USB-C.' },
    ],
  },
  flow: {
    eyebrow: 'Paano ito gumagana',
    title: ['Mula sa isang bulong', 'hanggang sa isang desisyon.'],
    steps: [
      { title: 'Mga sensor', body: 'Nagbo-broadcast sa malapit ang mga suportadong Bluetooth sensor at asset tag.' },
      { title: 'Locate Node', body: 'Idinisenyo para kolektahin ang mga broadcast na iyon at ipasa ang mga ito.' },
      { title: 'VexaOs Cloud at AI', body: 'Kung saan nagiging kasaysayan, alerto, at madaling maunawaang insight ang mga reading.' },
      { title: 'Ang iyong telepono', body: 'Ang mga VexaOs app para sa web, iOS, at Android.' },
    ],
    note: 'Maaaring mangailangan ng hiwalay na software subscription ang mga serbisyo sa cloud, alerto, at analytics.',
  },
  bento: {
    eyebrow: 'Para saan ito idinisenyo',
    title: ['Isang device.', 'Isang gusaling puno ng sagot.'],
    items: [
      { title: 'Pinakikinggan nito ang iyong mga sensor', body: 'Kinokolekta ang mga wireless broadcast mula sa mga suportadong Bluetooth Low Energy sensor: temperatura, halumigmig, kapaligiran, at iba pa.' },
      { title: 'Napapansin nito ang nasa malapit', body: 'Kinikilala ang mga Bluetooth asset tag sa malapit. Maglagay ng ilang node sa paligid ng gusali para sa tantiya ng lokasyon ayon sa silid at sona.' },
      { title: 'Pinananatili kang may alam', body: 'Ikonekta ang mga reading at obserbasyon sa mga monitoring platform para sa visualization, alerto, kasaysayan, at pagsusuri.' },
      { title: 'Nagsasalita ito sa wika mo', body: 'VexaOs, MQTT, HTTP/HTTPS. Gamitin ang platform na mayroon ka, o ang ginagawa mo pa.' },
      { title: 'Sinasabi nito ang lagay nito', body: 'Isang tumpak na light bar, idinisenyo bilang kalmadong biswal na hudyat para sa operasyon at koneksyon.' },
      { title: 'Bagay ito sa lugar', body: 'Compact, matte black, may pinong branding. Ginawa para tumayo sa propesyonal na espasyo nang may kumpiyansa.' },
    ],
  },
  places: {
    eyebrow: 'Ginawa para sa totoong mga lugar',
    title: ['Sa harapan.', 'Sa likuran.', 'At saanman sa pagitan.'],
    captions: ['Bagay sa dingding ng dining room.', 'At kasing-komportable sa sahig ng pabrika.'],
    alts: ['Locate Node na nakakabit sa dingding ng dining room ng isang restaurant.', 'Locate Node na nakakabit sa haligi ng isang pasilidad ng pagmamanupaktura.'],
    listTitle: 'Idinisenyo para sa',
    list: ['Mga bodega at distribution center', 'Mga pasilidad ng pagmamanupaktura at industriya', 'Mga restaurant at hospitality', 'Mga klinika at operasyong pangkalusugan', 'Mga opisina at business campus', 'Retail at pamamahala ng imbentaryo', 'Imbakan at maintenance ng kagamitan', 'Mga smart building at konektadong lugar ng trabaho'],
  },
  editions: {
    eyebrow: 'Dalawang paraan para patakbuhin ito',
    title: 'Piliin kung paano ito kokonekta.',
    items: [
      { name: 'Standard', body: 'Direktang koneksyon, monitoring, at provisioning sa VexaOs.', note: 'Hiwalay na ibinebenta ang software subscription.' },
      { name: 'Open Integration', body: 'Integrasyong MQTT at HTTP/HTTPS sa mga third-party na sistema at custom na software.', note: '' },
    ],
  },
  compare: {
    eyebrow: 'Ang lumang paraan, at ang paraang ito',
    title: ['Tigilan ang pag-iikot', 'na may dalang clipboard.'],
    old: 'Ang lumang paraan',
    new: 'Gamit ang Locate Node',
    rows: [
      ['May taong umiikot sa gusali at isinusulat ang mga reading.', 'Idinisenyo para kolektahin nang wireless ang mga reading mula sa mga suportadong sensor.'],
      ['Nalalaman mo ang problema pagkatapos itong mangyari.', 'Ikonekta ang mga reading sa mga alerto at kasaysayan sa iyong monitoring platform.'],
      ['“Nasaan ang cart na iyon?” Magtanong-tanong.', 'Tantiya ayon sa silid at sona gamit ang ilang node.'],
      ['Nakakulong ang data mo sa iisang saradong kahon.', 'VexaOs, MQTT, at HTTP/HTTPS: pumupunta ang data mo kung saan mo kailangan.'],
    ],
  },
  specs: {
    eyebrow: 'Tech specs',
    title: 'Ang alam namin. At ang hindi pa.',
    rows: [
      ['Wireless', 'Bluetooth Low Energy (tumatanggap ng broadcast mula sa mga suportadong sensor at tag)'],
      ['Mga integrasyon', 'VexaOs · MQTT · HTTP/HTTPS'],
      ['Power', 'USB-C'],
      ['Antenna', 'Panlabas'],
      ['Pagkakabit', 'Sa dingding'],
      ['Indikasyon ng status', 'Pahalang na RGB light bar'],
      ['Enclosure', 'Matte black, maaaring i-service'],
      ['Koneksyon sa network', '—'],
      ['Sukat at bigat', '—'],
      ['Abot ng wireless', '—'],
      ['Temperatura ng operasyon', '—'],
      ['Mga sertipikasyon', '—'],
    ],
    note: 'Ang “—” ay nangangahulugang hindi pa nailalathala. Ginagawa pa ang Locate Node; kinukumpirma ang mga detalye pagkatapos ng hardware validation.',
  },
  compat: {
    eyebrow: 'Pagkakatugma',
    title: 'Mahusay makisama sa iba.',
    sensorsTitle: 'Mga sensor at tag',
    sensors: ['Mga sensor ng temperatura', 'Mga sensor ng halumigmig', 'Mga monitor ng kapaligiran', 'Mga Bluetooth asset tag'],
    sensorsNote: 'Mga suportadong Bluetooth Low Energy device lamang. Kailangan ng mga tugmang device at sumusuportang software. Itanong sa amin ang tungkol sa iyo.',
    connectTitle: 'Koneksyon',
    connect: ['VexaOs (Standard na edisyon)', 'MQTT (Open Integration)', 'HTTP / HTTPS (Open Integration)'],
    notTitle: 'Kung ano ito hindi',
    not: ['Hindi GPS.', 'Hindi garantisadong tumpak na indoor positioning: nakadepende ang tantiya ng lokasyon sa pagkakalagay ng mga node at sa kapaligiran.'],
  },
  faq: {
    title: 'Mga tanong. Sinasagot nang tapat.',
    items: [
      { q: 'Mabibili ko ba ito ngayon?', a: 'Hindi pa. Ginagawa pa ang Locate Node. Iaalok ang mga unang production unit pagkatapos ng hardware validation at pagsubok ng pagkakatugma ng software. Iwan ang iyong email at sasabihan ka namin sa sandaling available na ito.' },
      { q: 'Sinusubaybayan ba nito ang mga bagay gamit ang GPS?', a: 'Hindi. Nakikinig ang Locate Node sa mga Bluetooth tag sa malapit. Gamit ang ilang node, sinusuportahan nito ang tantiya ayon sa silid at sona, na nakadepende sa pagkakalagay ng node at sa kapaligiran. Hindi ito nagbibigay ng GPS o garantisadong tumpak na indoor positioning.' },
      { q: 'Ano pa ang kailangan ko?', a: 'Mga tugmang Bluetooth device at sumusuportang software. Maaaring mangailangan ng hiwalay na software subscription ang advanced analytics, mga notification, at mga serbisyo sa cloud.' },
      { q: 'Gagana ba ito sa mga sensor ko?', a: 'Idinisenyo ito para sa mga suportadong Bluetooth Low Energy sensor, kabilang ang mga tugmang device para sa temperatura, halumigmig, kapaligiran, at asset tracking. Sabihin sa amin ang ginagamit mo at sasabihin namin ang kalagayan nito.' },
      { q: 'Kailangan ko bang gumamit ng VexaOs?', a: 'Hindi. Ang Open Integration na edisyon ay idinisenyo para sa MQTT at HTTP/HTTPS, para sa mga third-party na sistema at sarili mong software.' },
      { q: 'Ito ba ang VexaOs Edge Gateway?', a: 'Hindi. Ang Locate Node ay hiwalay at compact na device na ginagawa pa. Ibang produkto ang VexaOs Edge Gateway, na available na ngayon.' },
    ],
  },
  final: { title: ['Mahalaga ang bawat signal.', 'Maunang makarinig.'], body: 'Paparating na ang Locate Node. Ilista ang pangalan mo at mag-e-email kami kapag handa na ito.' },
  footnote: 'Ginagawa pa ang VexaOs Locate Node. Inilalarawan ng pahinang ito ang nilalayong disenyo nito, na maaaring magbago bago ilabas. Maaaring maiba ang huling hardware sa mga larawang ipinapakita.',
  store: { explore: 'Tuklasin ang Locate Node', banner: 'Locate Node. Maliit. Makapangyarihan. Laging nakikinig.' },
};

export const LOCATE_NODE_STRINGS: Record<Locale, LocateNodeStrings> = { en, th, vi, id, fil };
export const locateNodeStrings = (locale: Locale): LocateNodeStrings => LOCATE_NODE_STRINGS[locale] ?? en;

/** The store product this page sells (LOCATE_NODE_SLUG overrides it if the product is ever renamed). */
export const LOCATE_NODE_SLUG = process.env.LOCATE_NODE_SLUG ?? 'vexaos-locator-node';
export const LOCATE_NODE_PATH = '/locate-node';
