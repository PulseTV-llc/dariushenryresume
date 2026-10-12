import type { Locale } from '@/lib/i18n/config';
import type { DeviceId, Layer, RoomId } from './facility';

/**
 * Words for the facility illustration on /locate-node. English is the source; th, vi, id, fil are machine drafts.
 *
 * HONESTY RULES: this is an illustration and the page says so. Every reading is an example and is labelled
 * "Example". Ripples are "zones", never a distance. Locations are rooms, never coordinates, and the copy says
 * "not GPS". Vibration is "being integrated". The smart plug connects over Wi-Fi, not through a Locate Node.
 * Brand names are not translated: VexaOs, Locate Node, VexaOs Cloud, Bluetooth, Wi-Fi.
 */
export interface DeviceText { name: string; measures: string; reading: string; alert: string }
const en = {
  eyebrow: 'See it in a building',
  title: ['One building.', 'Every signal, in its place.'],
  intro: 'A walk-in, a kitchen, a dock, a machine room. Point at anything to see what it measures, which Locate Node hears it, and what it could tell you.',
  hint: { desktop: 'Hover or tab through the markers.', touch: 'Tap a marker. Drag the plan sideways to see it all.' },
  layers: { temperature: 'Temperature', doors: 'Doors', assets: 'Assets', energy: 'Energy', motion: 'Motion' } as Record<Layer, string>,
  layersLabel: 'Show',
  tour: { play: 'Play tour', stop: 'Stop tour', step: '{n} of {total}' },
  rooms: { dining: 'Dining', kitchen: 'Kitchen', walkin: 'Walk-in cooler', office: 'Office', storage: 'Storage & loading dock', machine: 'Machine room' } as Record<RoomId, string>,
  node: { name: 'Locate Node', inRoom: 'Locate Node · {room}', measures: 'Listens for the Bluetooth sensors and tags in its zone and passes what it hears to VexaOs Cloud.', hears: 'Hearing now', none: 'Nothing nearby right now', alert: 'A node that goes quiet is itself something to know about.' },
  room: { heardBy: 'Heard by', devices: 'In this room', empty: 'No sensors in this room' },
  card: { measures: 'What it measures', reading: 'Reading', example: 'Example', heardBy: 'Heard by', zone: 'Zone', alert: 'Could alert you when', close: 'Close' },
  wifi: 'Wi-Fi, straight to VexaOs Cloud (not through a Locate Node)',
  integrating: 'Being integrated',
  integratingNote: 'Not available yet. Shown to illustrate where it would sit.',
  cloud: 'VexaOs Cloud',
  phone: { title: 'VexaOs', now: 'now', label: 'Example notifications on a phone', idle: 'All quiet.' },
  notifications: { doorWalkin: 'Walk-in door open 4 min', cart: 'Cart #3 moved to Storage & loading dock', plug: 'Fryer plug drawing 1.4 kW' } as Partial<Record<DeviceId, string>>,
  devices: {
    temp: { name: 'Temperature sensor', measures: 'The air temperature inside the walk-in cooler.', reading: '3.2 °C', alert: 'The cooler warms past the limit you set.' },
    humidity: { name: 'Humidity sensor', measures: 'Humidity and temperature in dry storage.', reading: '48 % RH', alert: 'Storage gets too damp for what is kept there.' },
    doorWalkin: { name: 'Door sensor · Walk-in', measures: 'Whether the walk-in door is open or closed, and for how long.', reading: 'Open 4 min', alert: 'The door is left open.' },
    doorDock: { name: 'Door sensor · Dock', measures: 'Each time the loading-dock door opens and closes.', reading: 'Closed', alert: 'The dock door opens outside working hours.' },
    plug: { name: 'Smart plug · Fryer', measures: 'The power the fryer is drawing, and the energy it has used.', reading: '1.4 kW', alert: 'The fryer is still on after closing.' },
    motion: { name: 'Motion sensor', measures: 'Whether there is movement in the office.', reading: 'Movement 2 min ago', alert: 'There is movement when the office should be empty.' },
    vibration: { name: 'Vibration sensor · Motor', measures: 'How much a motor vibrates as it runs.', reading: '—', alert: 'A motor starts to shake more than usual.' },
    cart: { name: 'Asset tag · Cart #3', measures: 'Which zone the cart is in. Room-level, not GPS.', reading: 'In: {room}', alert: 'The cart leaves the building, or is not where it should be.' },
    badge: { name: 'Asset tag · Staff badge', measures: 'Which zone the badge was last heard in. Room-level, not GPS.', reading: 'In: {room}', alert: 'Someone needs to be found quickly.' },
    toolkit: { name: 'Asset tag · Tool kit', measures: 'Which zone the tool kit is in. Room-level, not GPS.', reading: 'In: {room}', alert: 'The kit is moved out of the machine room.' },
  } as Record<DeviceId, DeviceText>,
  // the same building dressed as a factory: only what differs from the restaurant
  layouts: { label: 'Building', restaurant: 'Restaurant', factory: 'Factory' },
  factory: {
    intro: 'A production floor, a cold store, a dock, a compressor room. Point at anything to see what it measures, which Locate Node hears it, and what it could tell you.',
    rooms: { dining: 'Production floor', kitchen: 'Assembly', walkin: 'Cold store', office: 'Office', storage: 'Warehouse & loading dock', machine: 'Compressor room' } as Record<RoomId, string>,
    notifications: { doorWalkin: 'Cold store door open 4 min', cart: 'Pallet jack #3 moved to Warehouse & loading dock', plug: 'Conveyor plug drawing 1.4 kW' } as Partial<Record<DeviceId, string>>,
    devices: {
      temp: { measures: 'The air temperature inside the cold store.', alert: 'The cold store warms past the limit you set.' },
      humidity: { measures: 'Humidity and temperature in the warehouse.', alert: 'The warehouse gets too damp for what is stored there.' },
      doorWalkin: { name: 'Door sensor · Cold store', measures: 'Whether the cold store door is open or closed, and for how long.' },
      plug: { name: 'Smart plug · Conveyor', measures: 'The power the conveyor is drawing, and the energy it has used.', alert: 'The conveyor is still running after the shift.' },
      motion: {},
      vibration: { name: 'Vibration sensor · Compressor', measures: 'How much the compressor vibrates as it runs.', alert: 'The compressor starts to shake more than usual.' },
      cart: { name: 'Asset tag · Pallet jack #3', measures: 'Which zone the pallet jack is in. Room-level, not GPS.', alert: 'The pallet jack leaves the building, or is not where it should be.' },
      toolkit: { alert: 'The kit is moved out of the compressor room.' },
    } as Partial<Record<DeviceId, Partial<DeviceText>>>,
  },
  footnote: 'An illustration, not a floor plan of a real site. Readings are examples. Ripples show a zone, not a measured range. Locations are estimated per room and depend on where nodes are placed. Locate Node is in development: supported sensor types are confirmed at launch.',
  static: 'Animation is off. Every marker still opens its details.',
};
export type FacilityStrings = typeof en;

const th: FacilityStrings = {
  eyebrow: 'ดูการทำงานในอาคาร',
  title: ['อาคารเดียว', 'ทุกสัญญาณอยู่ในที่ของมัน'],
  intro: 'ห้องเย็น ครัว ลานขนถ่าย ห้องเครื่อง ชี้ไปที่จุดใดก็ได้เพื่อดูว่ามันวัดอะไร Locate Node ตัวไหนได้ยิน และมันบอกอะไรคุณได้บ้าง',
  hint: { desktop: 'เลื่อนเมาส์ หรือกด Tab ผ่านเครื่องหมายต่าง ๆ', touch: 'แตะที่เครื่องหมาย ลากแผนผังไปด้านข้างเพื่อดูทั้งหมด' },
  layers: { temperature: 'อุณหภูมิ', doors: 'ประตู', assets: 'ทรัพย์สิน', energy: 'พลังงาน', motion: 'การเคลื่อนไหว' },
  layersLabel: 'แสดง',
  tour: { play: 'เล่นทัวร์', stop: 'หยุดทัวร์', step: '{n} จาก {total}' },
  rooms: { dining: 'ห้องอาหาร', kitchen: 'ครัว', walkin: 'ห้องเย็น', office: 'สำนักงาน', storage: 'คลังและลานขนถ่าย', machine: 'ห้องเครื่อง' },
  node: { name: 'Locate Node', inRoom: 'Locate Node · {room}', measures: 'คอยฟังเซ็นเซอร์และแท็ก Bluetooth ในโซนของมัน แล้วส่งสิ่งที่ได้ยินไปยัง VexaOs Cloud', hears: 'กำลังได้ยิน', none: 'ตอนนี้ไม่มีอะไรอยู่ใกล้', alert: 'โหนดที่เงียบไปก็เป็นสิ่งที่ควรรู้เช่นกัน' },
  room: { heardBy: 'ได้ยินโดย', devices: 'ในห้องนี้', empty: 'ไม่มีเซ็นเซอร์ในห้องนี้' },
  card: { measures: 'สิ่งที่วัด', reading: 'ค่าที่อ่านได้', example: 'ตัวอย่าง', heardBy: 'ได้ยินโดย', zone: 'โซน', alert: 'อาจแจ้งเตือนคุณเมื่อ', close: 'ปิด' },
  wifi: 'Wi-Fi ตรงไปยัง VexaOs Cloud (ไม่ผ่าน Locate Node)',
  integrating: 'กำลังเชื่อมต่อระบบ',
  integratingNote: 'ยังไม่พร้อมใช้งาน แสดงไว้เพื่อให้เห็นตำแหน่งที่จะติดตั้ง',
  cloud: 'VexaOs Cloud',
  phone: { title: 'VexaOs', now: 'ตอนนี้', label: 'ตัวอย่างการแจ้งเตือนบนโทรศัพท์', idle: 'ทุกอย่างเงียบสงบ' },
  notifications: { doorWalkin: 'ประตูห้องเย็นเปิดอยู่ 4 นาที', cart: 'รถเข็น #3 ย้ายไปที่คลังและลานขนถ่าย', plug: 'ปลั๊กหม้อทอดใช้ไฟ 1.4 kW' },
  devices: {
    temp: { name: 'เซ็นเซอร์อุณหภูมิ', measures: 'อุณหภูมิอากาศภายในห้องเย็น', reading: '3.2 °C', alert: 'ห้องเย็นอุ่นเกินขีดจำกัดที่คุณตั้งไว้' },
    humidity: { name: 'เซ็นเซอร์ความชื้น', measures: 'ความชื้นและอุณหภูมิในคลังของแห้ง', reading: '48 % RH', alert: 'คลังชื้นเกินไปสำหรับของที่เก็บอยู่' },
    doorWalkin: { name: 'เซ็นเซอร์ประตู · ห้องเย็น', measures: 'ประตูห้องเย็นเปิดหรือปิดอยู่ และนานเท่าใด', reading: 'เปิดอยู่ 4 นาที', alert: 'ประตูถูกเปิดทิ้งไว้' },
    doorDock: { name: 'เซ็นเซอร์ประตู · ลานขนถ่าย', measures: 'ทุกครั้งที่ประตูลานขนถ่ายเปิดและปิด', reading: 'ปิดอยู่', alert: 'ประตูลานขนถ่ายเปิดนอกเวลาทำงาน' },
    plug: { name: 'ปลั๊กอัจฉริยะ · หม้อทอด', measures: 'กำลังไฟที่หม้อทอดใช้อยู่ และพลังงานที่ใช้ไปแล้ว', reading: '1.4 kW', alert: 'หม้อทอดยังเปิดอยู่หลังปิดร้าน' },
    motion: { name: 'เซ็นเซอร์ตรวจจับการเคลื่อนไหว', measures: 'มีการเคลื่อนไหวในสำนักงานหรือไม่', reading: 'เคลื่อนไหวเมื่อ 2 นาทีก่อน', alert: 'มีการเคลื่อนไหวในเวลาที่สำนักงานควรว่าง' },
    vibration: { name: 'เซ็นเซอร์การสั่น · มอเตอร์', measures: 'มอเตอร์สั่นมากเพียงใดขณะทำงาน', reading: '—', alert: 'มอเตอร์เริ่มสั่นมากกว่าปกติ' },
    cart: { name: 'แท็กทรัพย์สิน · รถเข็น #3', measures: 'รถเข็นอยู่ในโซนใด ระดับห้อง ไม่ใช่ GPS', reading: 'อยู่ที่: {room}', alert: 'รถเข็นออกจากอาคาร หรือไม่อยู่ในที่ที่ควรอยู่' },
    badge: { name: 'แท็กทรัพย์สิน · บัตรพนักงาน', measures: 'บัตรถูกได้ยินครั้งล่าสุดในโซนใด ระดับห้อง ไม่ใช่ GPS', reading: 'อยู่ที่: {room}', alert: 'ต้องการตามหาใครบางคนอย่างรวดเร็ว' },
    toolkit: { name: 'แท็กทรัพย์สิน · ชุดเครื่องมือ', measures: 'ชุดเครื่องมืออยู่ในโซนใด ระดับห้อง ไม่ใช่ GPS', reading: 'อยู่ที่: {room}', alert: 'ชุดเครื่องมือถูกย้ายออกจากห้องเครื่อง' },
  },
  // the same building dressed as a factory: only what differs from the restaurant
  layouts: { label: 'อาคาร', restaurant: 'ร้านอาหาร', factory: 'โรงงาน' },
  factory: {
    intro: 'พื้นที่ผลิต ห้องเย็น ลานขนถ่าย ห้องคอมเพรสเซอร์ ชี้ไปที่จุดใดก็ได้เพื่อดูว่ามันวัดอะไร Locate Node ตัวไหนได้ยิน และมันบอกอะไรคุณได้บ้าง',
    rooms: { dining: 'พื้นที่ผลิต', kitchen: 'สายประกอบ', walkin: 'ห้องเย็น', office: 'สำนักงาน', storage: 'คลังสินค้าและลานขนถ่าย', machine: 'ห้องคอมเพรสเซอร์' },
    notifications: { doorWalkin: 'ประตูห้องเย็นเปิดอยู่ 4 นาที', cart: 'รถลากพาเลท #3 ย้ายไปที่คลังสินค้าและลานขนถ่าย', plug: 'ปลั๊กสายพานใช้ไฟ 1.4 kW' },
    devices: {
      temp: { measures: 'อุณหภูมิอากาศภายในห้องเย็น', alert: 'ห้องเย็นอุ่นเกินขีดจำกัดที่คุณตั้งไว้' },
      humidity: { measures: 'ความชื้นและอุณหภูมิในคลังสินค้า', alert: 'คลังสินค้าชื้นเกินไปสำหรับของที่เก็บอยู่' },
      doorWalkin: { name: 'เซ็นเซอร์ประตู · ห้องเย็น', measures: 'ประตูห้องเย็นเปิดหรือปิดอยู่ และนานเท่าใด' },
      plug: { name: 'ปลั๊กอัจฉริยะ · สายพาน', measures: 'กำลังไฟที่สายพานใช้อยู่ และพลังงานที่ใช้ไปแล้ว', alert: 'สายพานยังทำงานอยู่หลังเลิกกะ' },
      motion: {},
      vibration: { name: 'เซ็นเซอร์การสั่น · คอมเพรสเซอร์', measures: 'คอมเพรสเซอร์สั่นมากเพียงใดขณะทำงาน', alert: 'คอมเพรสเซอร์เริ่มสั่นมากกว่าปกติ' },
      cart: { name: 'แท็กทรัพย์สิน · รถลากพาเลท #3', measures: 'รถลากพาเลทอยู่ในโซนใด ระดับห้อง ไม่ใช่ GPS', alert: 'รถลากพาเลทออกจากอาคาร หรือไม่อยู่ในที่ที่ควรอยู่' },
      toolkit: { alert: 'ชุดเครื่องมือถูกย้ายออกจากห้องคอมเพรสเซอร์' },
    },
  },
  footnote: 'ภาพประกอบ ไม่ใช่แผนผังของสถานที่จริง ค่าที่อ่านได้เป็นตัวอย่าง วงคลื่นแสดงโซน ไม่ใช่ระยะที่วัดได้ ตำแหน่งประมาณเป็นรายห้องและขึ้นอยู่กับตำแหน่งที่วางโหนด Locate Node อยู่ระหว่างการพัฒนา: ประเภทเซ็นเซอร์ที่รองรับจะยืนยันเมื่อเปิดตัว',
  static: 'ปิดภาพเคลื่อนไหวอยู่ ทุกเครื่องหมายยังเปิดดูรายละเอียดได้',
};

const vi: FacilityStrings = {
  eyebrow: 'Xem nó trong một tòa nhà',
  title: ['Một tòa nhà.', 'Mọi tín hiệu, đúng chỗ của nó.'],
  intro: 'Kho lạnh, bếp, khu bốc dỡ, phòng máy. Trỏ vào bất cứ thứ gì để xem nó đo gì, Locate Node nào nghe thấy nó, và nó có thể cho bạn biết điều gì.',
  hint: { desktop: 'Di chuột hoặc nhấn Tab qua các điểm đánh dấu.', touch: 'Chạm vào một điểm. Kéo sơ đồ sang ngang để xem hết.' },
  layers: { temperature: 'Nhiệt độ', doors: 'Cửa', assets: 'Tài sản', energy: 'Năng lượng', motion: 'Chuyển động' },
  layersLabel: 'Hiển thị',
  tour: { play: 'Phát tour', stop: 'Dừng tour', step: '{n} trên {total}' },
  rooms: { dining: 'Phòng ăn', kitchen: 'Bếp', walkin: 'Kho lạnh', office: 'Văn phòng', storage: 'Kho và khu bốc dỡ', machine: 'Phòng máy' },
  node: { name: 'Locate Node', inRoom: 'Locate Node · {room}', measures: 'Lắng nghe các cảm biến và thẻ Bluetooth trong khu vực của nó rồi chuyển những gì nghe được đến VexaOs Cloud.', hears: 'Đang nghe', none: 'Hiện không có gì ở gần', alert: 'Một node im lặng cũng là điều đáng biết.' },
  room: { heardBy: 'Được nghe bởi', devices: 'Trong phòng này', empty: 'Không có cảm biến trong phòng này' },
  card: { measures: 'Nó đo gì', reading: 'Số đo', example: 'Ví dụ', heardBy: 'Được nghe bởi', zone: 'Khu vực', alert: 'Có thể cảnh báo bạn khi', close: 'Đóng' },
  wifi: 'Wi-Fi, thẳng đến VexaOs Cloud (không qua Locate Node)',
  integrating: 'Đang được tích hợp',
  integratingNote: 'Chưa có. Hiển thị để minh họa vị trí đặt.',
  cloud: 'VexaOs Cloud',
  phone: { title: 'VexaOs', now: 'bây giờ', label: 'Ví dụ thông báo trên điện thoại', idle: 'Mọi thứ yên ắng.' },
  notifications: { doorWalkin: 'Cửa kho lạnh mở 4 phút', cart: 'Xe đẩy #3 đã chuyển đến Kho và khu bốc dỡ', plug: 'Ổ cắm bếp chiên đang dùng 1.4 kW' },
  devices: {
    temp: { name: 'Cảm biến nhiệt độ', measures: 'Nhiệt độ không khí bên trong kho lạnh.', reading: '3.2 °C', alert: 'Kho lạnh ấm lên quá giới hạn bạn đặt.' },
    humidity: { name: 'Cảm biến độ ẩm', measures: 'Độ ẩm và nhiệt độ trong kho hàng khô.', reading: '48 % RH', alert: 'Kho quá ẩm so với hàng đang lưu.' },
    doorWalkin: { name: 'Cảm biến cửa · Kho lạnh', measures: 'Cửa kho lạnh đang mở hay đóng, và trong bao lâu.', reading: 'Mở 4 phút', alert: 'Cửa bị để mở.' },
    doorDock: { name: 'Cảm biến cửa · Khu bốc dỡ', measures: 'Mỗi lần cửa khu bốc dỡ mở và đóng.', reading: 'Đang đóng', alert: 'Cửa khu bốc dỡ mở ngoài giờ làm việc.' },
    plug: { name: 'Ổ cắm thông minh · Bếp chiên', measures: 'Công suất bếp chiên đang dùng và điện năng đã tiêu thụ.', reading: '1.4 kW', alert: 'Bếp chiên vẫn bật sau giờ đóng cửa.' },
    motion: { name: 'Cảm biến chuyển động', measures: 'Có chuyển động trong văn phòng hay không.', reading: 'Chuyển động 2 phút trước', alert: 'Có chuyển động khi văn phòng lẽ ra phải trống.' },
    vibration: { name: 'Cảm biến rung · Động cơ', measures: 'Động cơ rung nhiều đến mức nào khi chạy.', reading: '—', alert: 'Động cơ bắt đầu rung nhiều hơn bình thường.' },
    cart: { name: 'Thẻ tài sản · Xe đẩy #3', measures: 'Xe đẩy đang ở khu vực nào. Theo phòng, không phải GPS.', reading: 'Ở: {room}', alert: 'Xe đẩy rời tòa nhà, hoặc không ở đúng chỗ.' },
    badge: { name: 'Thẻ tài sản · Thẻ nhân viên', measures: 'Thẻ được nghe lần cuối ở khu vực nào. Theo phòng, không phải GPS.', reading: 'Ở: {room}', alert: 'Cần tìm ai đó thật nhanh.' },
    toolkit: { name: 'Thẻ tài sản · Bộ dụng cụ', measures: 'Bộ dụng cụ đang ở khu vực nào. Theo phòng, không phải GPS.', reading: 'Ở: {room}', alert: 'Bộ dụng cụ bị mang ra khỏi phòng máy.' },
  },
  // the same building dressed as a factory: only what differs from the restaurant
  layouts: { label: 'Tòa nhà', restaurant: 'Nhà hàng', factory: 'Nhà máy' },
  factory: {
    intro: 'Xưởng sản xuất, kho lạnh, khu bốc dỡ, phòng máy nén. Trỏ vào bất cứ thứ gì để xem nó đo gì, Locate Node nào nghe thấy nó, và nó có thể cho bạn biết điều gì.',
    rooms: { dining: 'Xưởng sản xuất', kitchen: 'Lắp ráp', walkin: 'Kho lạnh', office: 'Văn phòng', storage: 'Kho hàng và khu bốc dỡ', machine: 'Phòng máy nén' },
    notifications: { doorWalkin: 'Cửa kho lạnh mở 4 phút', cart: 'Xe nâng tay #3 đã chuyển đến Kho hàng và khu bốc dỡ', plug: 'Ổ cắm băng chuyền đang dùng 1.4 kW' },
    devices: {
      temp: { measures: 'Nhiệt độ không khí bên trong kho lạnh.', alert: 'Kho lạnh ấm lên quá giới hạn bạn đặt.' },
      humidity: { measures: 'Độ ẩm và nhiệt độ trong kho hàng.', alert: 'Kho hàng quá ẩm so với hàng đang lưu.' },
      doorWalkin: { name: 'Cảm biến cửa · Kho lạnh', measures: 'Cửa kho lạnh đang mở hay đóng, và trong bao lâu.' },
      plug: { name: 'Ổ cắm thông minh · Băng chuyền', measures: 'Công suất băng chuyền đang dùng và điện năng đã tiêu thụ.', alert: 'Băng chuyền vẫn chạy sau ca làm.' },
      motion: {},
      vibration: { name: 'Cảm biến rung · Máy nén', measures: 'Máy nén rung nhiều đến mức nào khi chạy.', alert: 'Máy nén bắt đầu rung nhiều hơn bình thường.' },
      cart: { name: 'Thẻ tài sản · Xe nâng tay #3', measures: 'Xe nâng tay đang ở khu vực nào. Theo phòng, không phải GPS.', alert: 'Xe nâng tay rời tòa nhà, hoặc không ở đúng chỗ.' },
      toolkit: { alert: 'Bộ dụng cụ bị mang ra khỏi phòng máy nén.' },
    },
  },
  footnote: 'Đây là hình minh họa, không phải sơ đồ của một địa điểm thật. Số đo là ví dụ. Các vòng sóng thể hiện một khu vực, không phải tầm phủ đo được. Vị trí được ước tính theo phòng và phụ thuộc vào nơi đặt node. Locate Node đang được phát triển: các loại cảm biến được hỗ trợ sẽ được xác nhận khi ra mắt.',
  static: 'Hoạt ảnh đang tắt. Mọi điểm đánh dấu vẫn mở được chi tiết.',
};

const id: FacilityStrings = {
  eyebrow: 'Lihat di dalam gedung',
  title: ['Satu gedung.', 'Setiap sinyal, pada tempatnya.'],
  intro: 'Ruang pendingin, dapur, area bongkar muat, ruang mesin. Arahkan ke apa pun untuk melihat apa yang diukurnya, Locate Node mana yang mendengarnya, dan apa yang bisa diberitahukannya kepada Anda.',
  hint: { desktop: 'Arahkan kursor atau tekan Tab melewati penanda.', touch: 'Ketuk sebuah penanda. Geser denah ke samping untuk melihat semuanya.' },
  layers: { temperature: 'Suhu', doors: 'Pintu', assets: 'Aset', energy: 'Energi', motion: 'Gerakan' },
  layersLabel: 'Tampilkan',
  tour: { play: 'Putar tur', stop: 'Hentikan tur', step: '{n} dari {total}' },
  rooms: { dining: 'Ruang makan', kitchen: 'Dapur', walkin: 'Ruang pendingin', office: 'Kantor', storage: 'Gudang & area bongkar muat', machine: 'Ruang mesin' },
  node: { name: 'Locate Node', inRoom: 'Locate Node · {room}', measures: 'Mendengarkan sensor dan tag Bluetooth di zonanya dan meneruskan apa yang didengarnya ke VexaOs Cloud.', hears: 'Sedang mendengar', none: 'Tidak ada apa pun di dekatnya saat ini', alert: 'Node yang mendadak diam pun layak diketahui.' },
  room: { heardBy: 'Didengar oleh', devices: 'Di ruangan ini', empty: 'Tidak ada sensor di ruangan ini' },
  card: { measures: 'Apa yang diukur', reading: 'Pembacaan', example: 'Contoh', heardBy: 'Didengar oleh', zone: 'Zona', alert: 'Bisa memperingatkan Anda saat', close: 'Tutup' },
  wifi: 'Wi-Fi, langsung ke VexaOs Cloud (tidak melalui Locate Node)',
  integrating: 'Sedang diintegrasikan',
  integratingNote: 'Belum tersedia. Ditampilkan untuk menggambarkan letaknya.',
  cloud: 'VexaOs Cloud',
  phone: { title: 'VexaOs', now: 'sekarang', label: 'Contoh notifikasi di ponsel', idle: 'Semua tenang.' },
  notifications: { doorWalkin: 'Pintu ruang pendingin terbuka 4 menit', cart: 'Troli #3 pindah ke Gudang & area bongkar muat', plug: 'Steker penggorengan memakai 1.4 kW' },
  devices: {
    temp: { name: 'Sensor suhu', measures: 'Suhu udara di dalam ruang pendingin.', reading: '3.2 °C', alert: 'Ruang pendingin menghangat melewati batas yang Anda tetapkan.' },
    humidity: { name: 'Sensor kelembapan', measures: 'Kelembapan dan suhu di gudang kering.', reading: '48 % RH', alert: 'Gudang terlalu lembap untuk barang yang disimpan.' },
    doorWalkin: { name: 'Sensor pintu · Ruang pendingin', measures: 'Apakah pintu ruang pendingin terbuka atau tertutup, dan berapa lama.', reading: 'Terbuka 4 menit', alert: 'Pintu dibiarkan terbuka.' },
    doorDock: { name: 'Sensor pintu · Bongkar muat', measures: 'Setiap kali pintu area bongkar muat dibuka dan ditutup.', reading: 'Tertutup', alert: 'Pintu bongkar muat terbuka di luar jam kerja.' },
    plug: { name: 'Steker pintar · Penggorengan', measures: 'Daya yang sedang dipakai penggorengan, dan energi yang telah digunakannya.', reading: '1.4 kW', alert: 'Penggorengan masih menyala setelah tutup.' },
    motion: { name: 'Sensor gerak', measures: 'Apakah ada gerakan di kantor.', reading: 'Gerakan 2 menit lalu', alert: 'Ada gerakan saat kantor seharusnya kosong.' },
    vibration: { name: 'Sensor getaran · Motor', measures: 'Seberapa besar getaran motor saat berjalan.', reading: '—', alert: 'Motor mulai bergetar lebih dari biasanya.' },
    cart: { name: 'Tag aset · Troli #3', measures: 'Di zona mana troli berada. Tingkat ruangan, bukan GPS.', reading: 'Di: {room}', alert: 'Troli keluar dari gedung, atau tidak berada di tempatnya.' },
    badge: { name: 'Tag aset · Lencana staf', measures: 'Di zona mana lencana terakhir terdengar. Tingkat ruangan, bukan GPS.', reading: 'Di: {room}', alert: 'Seseorang perlu ditemukan dengan cepat.' },
    toolkit: { name: 'Tag aset · Kotak perkakas', measures: 'Di zona mana kotak perkakas berada. Tingkat ruangan, bukan GPS.', reading: 'Di: {room}', alert: 'Kotak perkakas dipindahkan keluar dari ruang mesin.' },
  },
  // the same building dressed as a factory: only what differs from the restaurant
  layouts: { label: 'Bangunan', restaurant: 'Restoran', factory: 'Pabrik' },
  factory: {
    intro: 'Lantai produksi, ruang pendingin, area bongkar muat, ruang kompresor. Arahkan ke apa pun untuk melihat apa yang diukurnya, Locate Node mana yang mendengarnya, dan apa yang bisa diberitahukannya kepada Anda.',
    rooms: { dining: 'Lantai produksi', kitchen: 'Perakitan', walkin: 'Ruang pendingin', office: 'Kantor', storage: 'Gudang & area bongkar muat', machine: 'Ruang kompresor' },
    notifications: { doorWalkin: 'Pintu ruang pendingin terbuka 4 menit', cart: 'Hand pallet #3 pindah ke Gudang & area bongkar muat', plug: 'Steker konveyor memakai 1.4 kW' },
    devices: {
      temp: { measures: 'Suhu udara di dalam ruang pendingin.', alert: 'Ruang pendingin menghangat melewati batas yang Anda tetapkan.' },
      humidity: { measures: 'Kelembapan dan suhu di gudang.', alert: 'Gudang terlalu lembap untuk barang yang disimpan.' },
      doorWalkin: { name: 'Sensor pintu · Ruang pendingin', measures: 'Apakah pintu ruang pendingin terbuka atau tertutup, dan berapa lama.' },
      plug: { name: 'Steker pintar · Konveyor', measures: 'Daya yang sedang dipakai konveyor, dan energi yang telah digunakannya.', alert: 'Konveyor masih berjalan setelah sif selesai.' },
      motion: {},
      vibration: { name: 'Sensor getaran · Kompresor', measures: 'Seberapa besar getaran kompresor saat berjalan.', alert: 'Kompresor mulai bergetar lebih dari biasanya.' },
      cart: { name: 'Tag aset · Hand pallet #3', measures: 'Di zona mana hand pallet berada. Tingkat ruangan, bukan GPS.', alert: 'Hand pallet keluar dari gedung, atau tidak berada di tempatnya.' },
      toolkit: { alert: 'Kotak perkakas dipindahkan keluar dari ruang kompresor.' },
    },
  },
  footnote: 'Ini ilustrasi, bukan denah lokasi nyata. Pembacaan adalah contoh. Riak menunjukkan zona, bukan jangkauan terukur. Lokasi diperkirakan per ruangan dan bergantung pada penempatan node. Locate Node sedang dikembangkan: jenis sensor yang didukung dikonfirmasi saat peluncuran.',
  static: 'Animasi dimatikan. Setiap penanda tetap dapat membuka detailnya.',
};

const fil: FacilityStrings = {
  eyebrow: 'Tingnan ito sa isang gusali',
  title: ['Isang gusali.', 'Bawat signal, nasa lugar nito.'],
  intro: 'Isang walk-in, kusina, loading dock, silid ng makina. Ituro ang anuman para makita kung ano ang sinusukat nito, aling Locate Node ang nakakarinig dito, at ano ang masasabi nito sa iyo.',
  hint: { desktop: 'I-hover o mag-Tab sa mga marker.', touch: 'I-tap ang isang marker. I-drag ang plano pagilid para makita ang lahat.' },
  layers: { temperature: 'Temperatura', doors: 'Mga pinto', assets: 'Mga asset', energy: 'Enerhiya', motion: 'Galaw' },
  layersLabel: 'Ipakita',
  tour: { play: 'I-play ang tour', stop: 'Ihinto ang tour', step: '{n} sa {total}' },
  rooms: { dining: 'Dining', kitchen: 'Kusina', walkin: 'Walk-in cooler', office: 'Opisina', storage: 'Imbakan at loading dock', machine: 'Silid ng makina' },
  node: { name: 'Locate Node', inRoom: 'Locate Node · {room}', measures: 'Nakikinig sa mga Bluetooth sensor at tag sa sona nito at ipinapasa ang naririnig nito sa VexaOs Cloud.', hears: 'Naririnig ngayon', none: 'Walang malapit sa ngayon', alert: 'Ang node na biglang tumahimik ay dapat ding malaman.' },
  room: { heardBy: 'Naririnig ng', devices: 'Sa silid na ito', empty: 'Walang sensor sa silid na ito' },
  card: { measures: 'Ano ang sinusukat nito', reading: 'Reading', example: 'Halimbawa', heardBy: 'Naririnig ng', zone: 'Sona', alert: 'Maaari kang abisuhan kapag', close: 'Isara' },
  wifi: 'Wi-Fi, diretso sa VexaOs Cloud (hindi dumadaan sa Locate Node)',
  integrating: 'Isinasama pa',
  integratingNote: 'Hindi pa available. Ipinapakita para ilarawan kung saan ito ilalagay.',
  cloud: 'VexaOs Cloud',
  phone: { title: 'VexaOs', now: 'ngayon', label: 'Mga halimbawang notification sa telepono', idle: 'Tahimik ang lahat.' },
  notifications: { doorWalkin: 'Bukas ang pinto ng walk-in nang 4 minuto', cart: 'Lumipat ang Cart #3 sa Imbakan at loading dock', plug: 'Kumukonsumo ang plug ng fryer ng 1.4 kW' },
  devices: {
    temp: { name: 'Sensor ng temperatura', measures: 'Ang temperatura ng hangin sa loob ng walk-in cooler.', reading: '3.2 °C', alert: 'Uminit ang cooler lampas sa limitasyong itinakda mo.' },
    humidity: { name: 'Sensor ng halumigmig', measures: 'Halumigmig at temperatura sa tuyong imbakan.', reading: '48 % RH', alert: 'Masyadong mahalumigmig ang imbakan para sa nakatago roon.' },
    doorWalkin: { name: 'Sensor ng pinto · Walk-in', measures: 'Kung bukas o sarado ang pinto ng walk-in, at gaano katagal.', reading: 'Bukas nang 4 minuto', alert: 'Naiwang bukas ang pinto.' },
    doorDock: { name: 'Sensor ng pinto · Dock', measures: 'Tuwing bumubukas at sumasara ang pinto ng loading dock.', reading: 'Sarado', alert: 'Bumukas ang pinto ng dock sa labas ng oras ng trabaho.' },
    plug: { name: 'Smart plug · Fryer', measures: 'Ang kuryenteng ginagamit ng fryer, at ang enerhiyang nakonsumo nito.', reading: '1.4 kW', alert: 'Nakabukas pa ang fryer pagkatapos magsara.' },
    motion: { name: 'Sensor ng galaw', measures: 'Kung may gumagalaw sa opisina.', reading: 'May galaw 2 minuto ang nakalipas', alert: 'May gumagalaw kapag dapat walang tao sa opisina.' },
    vibration: { name: 'Sensor ng vibration · Motor', measures: 'Kung gaano kalakas ang pagyanig ng motor habang umaandar.', reading: '—', alert: 'Nagsimulang yumanig ang motor nang higit sa karaniwan.' },
    cart: { name: 'Asset tag · Cart #3', measures: 'Kung saang sona naroon ang cart. Ayon sa silid, hindi GPS.', reading: 'Nasa: {room}', alert: 'Lumabas ng gusali ang cart, o wala sa dapat nitong kinalalagyan.' },
    badge: { name: 'Asset tag · Badge ng staff', measures: 'Kung saang sona huling narinig ang badge. Ayon sa silid, hindi GPS.', reading: 'Nasa: {room}', alert: 'May taong kailangang mahanap agad.' },
    toolkit: { name: 'Asset tag · Tool kit', measures: 'Kung saang sona naroon ang tool kit. Ayon sa silid, hindi GPS.', reading: 'Nasa: {room}', alert: 'Inilabas ang kit mula sa silid ng makina.' },
  },
  // the same building dressed as a factory: only what differs from the restaurant
  layouts: { label: 'Gusali', restaurant: 'Restawran', factory: 'Pabrika' },
  factory: {
    intro: 'Isang production floor, cold store, loading dock, silid ng compressor. Ituro ang anuman para makita kung ano ang sinusukat nito, aling Locate Node ang nakakarinig dito, at ano ang masasabi nito sa iyo.',
    rooms: { dining: 'Production floor', kitchen: 'Assembly', walkin: 'Cold store', office: 'Opisina', storage: 'Bodega at loading dock', machine: 'Silid ng compressor' },
    notifications: { doorWalkin: 'Bukas ang pinto ng cold store nang 4 minuto', cart: 'Lumipat ang Pallet jack #3 sa Bodega at loading dock', plug: 'Kumukonsumo ang plug ng conveyor ng 1.4 kW' },
    devices: {
      temp: { measures: 'Ang temperatura ng hangin sa loob ng cold store.', alert: 'Uminit ang cold store lampas sa limitasyong itinakda mo.' },
      humidity: { measures: 'Halumigmig at temperatura sa bodega.', alert: 'Masyadong mahalumigmig ang bodega para sa nakatago roon.' },
      doorWalkin: { name: 'Sensor ng pinto · Cold store', measures: 'Kung bukas o sarado ang pinto ng cold store, at gaano katagal.' },
      plug: { name: 'Smart plug · Conveyor', measures: 'Ang kuryenteng ginagamit ng conveyor, at ang enerhiyang nakonsumo nito.', alert: 'Umaandar pa ang conveyor pagkatapos ng shift.' },
      motion: {},
      vibration: { name: 'Sensor ng vibration · Compressor', measures: 'Kung gaano kalakas ang pagyanig ng compressor habang umaandar.', alert: 'Nagsimulang yumanig ang compressor nang higit sa karaniwan.' },
      cart: { name: 'Asset tag · Pallet jack #3', measures: 'Kung saang sona naroon ang pallet jack. Ayon sa silid, hindi GPS.', alert: 'Lumabas ng gusali ang pallet jack, o wala sa dapat nitong kinalalagyan.' },
      toolkit: { alert: 'Inilabas ang kit mula sa silid ng compressor.' },
    },
  },
  footnote: 'Isang ilustrasyon ito, hindi plano ng totoong lugar. Mga halimbawa ang mga reading. Ipinapakita ng mga alon ang isang sona, hindi sukat na abot. Tinatantya ang lokasyon ayon sa silid at nakadepende sa pagkakalagay ng mga node. Ginagawa pa ang Locate Node: kukumpirmahin sa paglulunsad ang mga suportadong uri ng sensor.',
  static: 'Naka-off ang animation. Mabubuksan pa rin ng bawat marker ang mga detalye nito.',
};

export const FACILITY_STRINGS: Record<Locale, FacilityStrings> = { en, th, vi, id, fil };
export type FacilityLayout = 'restaurant' | 'factory';
/** The strings for one layout: the factory's words laid over the restaurant's. */
export function layoutStrings(t: FacilityStrings, layout: FacilityLayout): FacilityStrings {
  if (layout === 'restaurant') return t;
  const devices = Object.fromEntries(Object.entries(t.devices).map(([id, d]) => [id, { ...d, ...t.factory.devices[id as DeviceId] }])) as Record<DeviceId, DeviceText>;
  return { ...t, intro: t.factory.intro, rooms: t.factory.rooms, notifications: { ...t.notifications, ...t.factory.notifications }, devices };
}
export const facilityStrings = (locale: Locale): FacilityStrings => FACILITY_STRINGS[locale] ?? en;
