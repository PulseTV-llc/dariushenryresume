import type { Page } from '@/lib/i18n/types';

// MACHINE DRAFT (vi): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.

/**
 * Product pages (Vietnamese). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const sensors: Page = {
  meta: {
    title: 'Danh mục cảm biến: chín nhóm, không dây và có dây',
    description:
      'Danh mục cảm biến VexaOs: môi trường, chuỗi lạnh, ra vào và mức độ sử dụng không gian, nước và rò rỉ, tình trạng máy móc, quy trình công nghiệp, năng lượng, tài sản và an toàn, qua Bluetooth LE, Wi-Fi hoặc RS-485 / Modbus. Mỗi phép đo đều được ghi rõ là đã có ngay hoặc qua tích hợp.',
  },
  hero: {
    eyebrow: 'Sản phẩm · Cảm biến',
    title: 'Một cảm biến cho [[bất cứ thứ gì bạn cần theo dõi.]]',
    subtitle:
      'Chín nhóm cảm biến, không dây và có dây, trên một nền tảng. Mỗi phép đo đều được gắn nhãn, để bạn thấy cái gì đã hoạt động hiện nay và cái gì chúng tôi bổ sung thông qua adapter.',
    ctas: [{ label: 'Hỏi về cảm biến', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'sensors',
      id: 'catalog',
      compact: false,
      eyebrow: 'Danh mục cảm biến',
      title: 'Chín nhóm. Chọn ngành của bạn.',
      subtitle: 'Lọc theo ngành, rồi mở một nhóm để xem chi tiết.',
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Kết nối',
      title: 'Không dây và có dây, về cùng một gateway.',
      subtitle: 'Cảm biến Bluetooth và ổ cắm thông minh Wi-Fi đã hoạt động hiện nay. Thiết bị RS-485 / Modbus có dây được bổ sung dưới dạng tích hợp.',
    },
    {
      type: 'split',
      eyebrow: 'Cảm biến cửa',
      title: 'Mọi lần mở và đóng, trên một dòng thời gian.',
      body: 'Sự kiện cửa được gửi đi ngay khi xảy ra. Trong ứng dụng, bạn thấy hôm nay cửa đã mở bao nhiêu lần, lần mở lâu nhất, và từng sự kiện kèm thời điểm.',
      checks: [
        'Mỗi thay đổi được ghi lại một lần, theo đúng thứ tự, ngay cả khi mất kết nối.',
        'Cửa mở từ 10 phút trở lên sẽ được đánh dấu.',
        'Những lần mở vào giờ bất thường và thời gian mở dài bất thường sẽ được nêu ra.',
      ],
      shot: 'doorActivity',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Tình trạng cảm biến',
      title: 'Cảm biến cũng tự theo dõi chính mình.',
      body: 'Một hệ thống giám sát chỉ hữu ích khi bạn biết nó vẫn đang hoạt động. Mỗi cảm biến đều báo về pin và tín hiệu của mình, và nền tảng tự tạo ra phát hiện khi có cảm biến cần được chú ý.',
      checks: [
        'Pin yếu, hoặc pin có khả năng cạn trong vòng 30 ngày.',
        'Tín hiệu yếu, hoặc tín hiệu sụt giảm mạnh.',
        'Một cảm biến đã im lặng trong khi gateway của nó vẫn đang trực tuyến.',
      ],
      shot: 'sensorCharts',
      note: {
        body: 'Các cảm biến đã có ngay kết nối qua Bluetooth Low Energy, nên chúng cần nằm trong tầm sóng vô tuyến của một gateway; chúng tôi kiểm tra tín hiệu tại từng vị trí trong quá trình lắp đặt. "Qua tích hợp" nghĩa là adapter chưa tồn tại, và điều đó bao gồm mọi thứ trên RS-485 / Modbus: chúng tôi xây dựng khi có khách hàng cần, và chúng tôi không công bố thông số kỹ thuật cho những cảm biến mà chúng tôi chưa tích hợp.',
      },
    },
  ],
};

const edgeGateway: Page = {
  meta: {
    title: 'VexaOs Edge Gateway: an toàn khi mất mạng và tự phục hồi',
    description:
      'VexaOs Edge Gateway thu thập số đo từ các cảm biến và ổ cắm thông minh ở gần, kiểm tra quy tắc báo động tại chỗ, giữ lại mọi số đo khi mất kết nối và khởi động lại, và tự khôi phục.',
  },
  hero: {
    eyebrow: 'Sản phẩm · Edge Gateway',
    title: 'Gateway [[không ngừng ghi nhận.]]',
    subtitle:
      'VexaOs Edge Gateway được đặt tại cơ sở, lắng nghe mọi cảm biến trong tầm phủ sóng, và đưa dữ liệu lên đám mây. Khi mạng hoặc nguồn điện gặp trục trặc, nó giữ lại số đo của bạn và tự khắc phục.',
    ctas: [
      { label: 'Đặt lịch demo', href: '/contact', variant: 'primary' },
      { label: 'Chế độ ngoại tuyến hoạt động thế nào', href: '/platform#offline', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'cards',
      cols: 3,
      items: [
        { icon: 'gateway', title: 'An toàn khi mất mạng', body: 'Số đo được ghi vào bộ nhớ bền vững trên gateway và chỉ bị xóa sau khi đám mây xác nhận đã nhận. Mất kết nối làm dữ liệu của bạn đến chậm hơn; nó không làm mất dữ liệu.' },
        { icon: 'plug', title: 'Tự phục hồi', body: 'Nếu bộ thu phát sóng cảm biến im lặng, gateway khởi động lại việc quét, sau đó đặt lại bộ thu phát sóng, rồi khởi động lại dịch vụ của chính nó. Một watchdog phần cứng xử lý trường hợp treo hoàn toàn.' },
        { icon: 'cloud', title: 'Tự động khôi phục', body: 'Khi mất mạng, gateway lần lượt thử kết nối lại Wi-Fi, khởi động lại kết nối mạng và, như giải pháp cuối cùng, khởi động lại thiết bị với tần suất được giới hạn. Nó tự khởi động sau khi có điện trở lại.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'Quyết định tại chỗ',
      title: 'Báo động không chờ đám mây.',
      body: 'Quy tắc báo động được kiểm tra trên gateway với từng số đo. Một báo động được phát ra hoặc được xóa sẽ lên đầu hàng đợi và được gửi đi ngay lập tức.',
      checks: [
        'Ngưỡng có thời gian giữ, để một đợt tăng vọt ngắn không gây ra báo động.',
        'Độ trễ (hysteresis), để số đo dao động quanh ngưỡng không làm báo động bật tắt liên tục.',
        'Bản tổng hợp sau mỗi 10 giây theo mặc định, có thể điều chỉnh cho từng cảm biến.',
        'Số đo thô chi tiết ở lại trên gateway; đám mây nhận các bản tổng hợp.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Tình trạng gateway',
      title: 'Bạn có thể thấy gateway vẫn đang hoạt động.',
      subtitle:
        'Mỗi phút gateway báo cáo tình trạng của chính nó: mạng, bộ thu phát sóng cảm biến, thời gian hoạt động và nguồn điện. Nếu nó đã phải khôi phục sau một sự cố nào đó, nó cho bạn biết điều gì đã xảy ra.',
      items: [
        { title: 'Ngoại tuyến', body: 'Gateway ngoại tuyến trong 5 phút sẽ tạo ra một phát hiện.' },
        { title: 'Nguồn điện', body: 'Nguồn điện yếu được phát hiện và báo cáo.' },
        { title: 'Tồn đọng', body: 'Lượng số đo tồn đọng đang chờ tải lên được hiển thị rõ.' },
        { title: 'Danh tính', body: 'Mỗi gateway đăng nhập bằng khóa thiết bị riêng qua HTTPS.' },
      ],
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Kết nối',
      title: 'Không dây và có dây, về cùng một gateway.',
      subtitle: 'Cảm biến Bluetooth và ổ cắm thông minh Wi-Fi đã hoạt động hiện nay. Thiết bị RS-485 / Modbus có dây được bổ sung dưới dạng tích hợp.',
    },
    {
      type: 'cards',
      cols: 3,
      eyebrow: 'Lắp đặt',
      title: 'Một gateway cần những gì.',
      items: [
        { title: 'Điện lưới', body: 'Edge Gateway dành cho các cơ sở cố định có ổ điện. Với những nơi không có, hãy xem Mobile Gateway, hiện sắp ra mắt.' },
        { title: 'Wi-Fi hoặc Ethernet', body: 'Một kết nối internet thông thường là đủ. Gateway chỉ tạo các kết nối HTTPS đi ra ngoài.' },
        { title: 'Cảm biến trong tầm phủ sóng', body: 'Cảm biến không dây kết nối qua Bluetooth Low Energy; các cơ sở lớn hơn dùng nhiều hơn một gateway. Ổ cắm thông minh tham gia cùng mạng với gateway. Thiết bị RS-485 / Modbus có dây được bổ sung dưới dạng tích hợp.' },
      ],
      note: {
        body: 'Edge Gateway là sản phẩm mới. Hàng đợi ngoại tuyến, khả năng tự khôi phục và hành vi khi khởi động lại của nó được kiểm chứng bằng các bài kiểm thử tự động, và nó đang chạy với cảm biến thật tại cơ sở thử nghiệm của chính chúng tôi. Việc thử nghiệm thực địa dài ngày vẫn đang được tiến hành, và chúng tôi sẽ chia sẻ chính xác tình hình hiện tại khi bạn trao đổi với chúng tôi.',
      },
    },
  ],
};

const mobileGateway: Page = {
  meta: {
    title: 'VexaOs Mobile Gateway (sắp ra mắt)',
    description:
      'VexaOs Mobile Gateway là một gateway đang được lên kế hoạch cho xe, rơ-moóc và các địa điểm không có nguồn điện hoặc mạng cố định. Sản phẩm sắp ra mắt và hiện chưa có sẵn.',
  },
  hero: {
    eyebrow: 'Sản phẩm · Mobile Gateway',
    status: 'soon',
    title: 'Giám sát cho những nơi [[luôn di chuyển.]]',
    subtitle:
      'VexaOs Mobile Gateway được lên kế hoạch cho xe, rơ-moóc và các địa điểm tạm thời, nơi không có nguồn điện hoặc mạng cố định. Hiện chưa có sẵn.',
    ctas: [
      { label: 'Cho chúng tôi biết nhu cầu của bạn', href: '/contact', variant: 'primary' },
      { label: 'Xem Edge Gateway', href: '/products/edge-gateway', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'note',
      note: {
        title: 'Sắp ra mắt',
        body: 'Trang này mô tả những gì chúng tôi đang lên kế hoạch, không phải một sản phẩm bạn có thể đặt mua. Thông số kỹ thuật, giá và thời điểm chưa được chốt, nên không có mục nào được nêu ở đây. Nếu giám sát di động quan trọng với bạn, hãy liên hệ và chúng tôi sẽ cập nhật thông tin cho bạn.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Kế hoạch',
      title: 'Vẫn nền tảng đó, ở nơi không có ổ điện trên tường.',
      subtitle:
        'Mobile Gateway được định hướng để hoạt động với cùng các cảm biến, cùng VexaOs Cloud và cùng các ứng dụng như Edge Gateway.',
      items: [
        { icon: 'mobile', title: 'Hàng hóa đang vận chuyển', body: 'Được định hướng cho xe và rơ-moóc lạnh, để hàng hóa được giám sát cả trên đường giữa các cơ sở lẫn tại các cơ sở.' },
        { icon: 'warehouse', title: 'Địa điểm tạm thời', body: 'Được định hướng cho sự kiện, điểm bán tạm thời và kho lưu trữ ngắn hạn, nơi việc lắp thiết bị cố định là không thực tế.' },
        { icon: 'gateway', title: 'Lưu rồi chuyển tiếp', body: 'Được xây dựng trên hàng đợi ngoại tuyến của Edge Gateway, vốn đã giữ lại số đo khi không có kết nối.' },
      ],
    },
  ],
  cta: {
    title: 'Bạn cần giám sát di động?',
    body: 'Hãy cho chúng tôi biết bạn vận chuyển gì và ở đâu. Nhu cầu của bạn giúp định hình những gì chúng tôi xây dựng, và chúng tôi sẽ báo cho bạn khi Mobile Gateway sẵn sàng.',
  },
};

const cloud: Page = {
  meta: {
    title: 'VexaOs Cloud & AI Insights',
    description:
      'VexaOs Cloud lưu trữ lịch sử cảm biến của bạn và chạy AI Insights: phát hiện độ trôi, dự báo thời gian chạm ngưỡng, hoạt động cửa bất thường, chi phí điện và điện tiêu thụ ở chế độ chờ, với phần giải thích bằng tiếng Anh dễ hiểu luôn được hiển thị bên cạnh các con số đo được.',
  },
  hero: {
    eyebrow: 'Sản phẩm · Cloud & AI Insights',
    title: 'Phát hiện vấn đề [[trước khi nó thành tổn thất.]]',
    subtitle:
      'VexaOs Cloud lưu giữ lịch sử của bạn, chạy các quy tắc cảnh báo của bạn, và kiểm tra từng cảm biến để tìm những dấu hiệu thường xuất hiện trước một sự cố. Sau đó nó giải thích những gì tìm thấy bằng tiếng Anh dễ hiểu.',
    ctas: [{ label: 'Đặt lịch demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Đo lường trước tiên',
      title: 'Việc phát hiện là phép tính số học. AI chỉ làm phần giải thích.',
      body: 'Các phát hiện đến từ những quy tắc cố định chạy trên số đo của bạn sau mỗi 30 phút. Mỗi phát hiện đều lưu các con số mà nó được tính ra. Mô hình AI chỉ được dùng cho một việc: biến một phát hiện đã tồn tại thành một câu rõ ràng.',
      checks: [
        'Văn bản được gắn nhãn **Measured** (đo được) hoặc **AI-written** (do AI viết), và văn bản của AI hiển thị độ tin cậy của nó.',
        'Văn bản của AI không bao giờ được hiển thị mà thiếu các con số đo được bên cạnh.',
        'AI không thể tạo ra phát hiện, thay đổi mức độ nghiêm trọng hay đóng phát hiện.',
        'Nếu phần giải thích của AI bị tắt hoặc không khả dụng, bạn vẫn nhận được mọi phát hiện, được mô tả từ các con số.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Nó tìm kiếm điều gì',
      title: 'Các phát hiện, được kiểm tra suốt ngày đêm.',
      subtitle: 'Mỗi phát hiện có mức độ nghiêm trọng là thông tin, cảnh báo hoặc nghiêm trọng, và một trạng thái do bạn kiểm soát: đang mở, đã xác nhận hoặc đã xử lý.',
      items: [
        { title: 'Độ trôi', body: 'Nhiệt độ hoặc độ ẩm tăng hoặc giảm đều trong sáu giờ gần nhất, ngay cả khi số đo vẫn nằm trong khoảng cho phép.' },
        { title: 'Thời gian chạm ngưỡng', body: 'Khi một cảm biến có quy tắc cảnh báo đang tiến về ngưỡng của nó, số giờ còn lại nếu giữ tốc độ hiện tại.' },
        { title: 'Số đo bất thường', body: 'Một số đo khác xa so với mức cảm biến này thường hiển thị vào giờ này trong ngày.' },
        { title: 'Cửa bị để mở', body: 'Một cánh cửa đã mở từ 10 phút trở lên, ngay lúc này.' },
        { title: 'Cửa mở vào giờ bất thường', body: 'Cửa được mở vào một giờ vốn yên ắng trong hai tuần gần đây.' },
        { title: 'Cửa mở lâu hơn bình thường', body: 'Tổng thời gian mở hôm nay ít nhất gấp đôi mức trung bình hằng ngày gần đây.' },
        { title: 'Vừa ấm vừa ẩm', body: 'Nhiệt độ và độ ẩm cùng tăng, một dấu hiệu thường gặp của vấn đề về gioăng cửa hoặc hệ thống làm lạnh.' },
        { title: 'Điện tiêu thụ ở chế độ chờ', body: 'Một thiết bị đang cắm điện vẫn tiếp tục tiêu thụ điện khi không hoạt động.' },
        { title: 'Chi phí điện', body: 'Những khoản tốn kém nhất trong tuần, thay đổi đáng kể giữa tháng này và tháng trước, và mức sử dụng nhiều trong giờ cao điểm.' },
        { title: 'Pin', body: 'Pin yếu, hoặc pin có khả năng cạn trong vòng 30 ngày.' },
        { title: 'Tín hiệu', body: 'Tín hiệu yếu, hoặc sụt giảm mạnh so với những ngày trước đó.' },
        { title: 'Cảm biến im lặng', body: 'Không có số đo nào trong 15 phút trong khi gateway vẫn đang trực tuyến.' },
        { title: 'Tình trạng gateway', body: 'Gateway ngoại tuyến, thiếu nguồn điện, hoặc có dữ liệu tồn đọng đang chờ tải lên.' },
      ],
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Năng lượng',
      title: 'Chi phí điện, tính từ mức giá của chính bạn.',
      subtitle: 'Ổ cắm thông minh báo về kWh. Đám mây chuyển con số đó thành chi phí dựa trên giá điện bạn nhập.',
      items: [
        { icon: 'energy', title: 'Ba cách tính giá', body: 'Một mức giá cố định, một mức giá cho mỗi mùa, hoặc giá giờ cao điểm và thấp điểm cho mỗi mùa, đặt cho cả tổ chức hoặc cho một cơ sở riêng lẻ.' },
        { icon: 'cloud', title: 'Lịch sử giá', body: 'Mỗi mức giá có ngày bắt đầu, nên một mức giá mới không bao giờ ghi đè lên chi phí của lượng điện đã dùng.' },
        { icon: 'apps', title: 'Chi phí theo thiết bị', body: 'Hôm nay, 7 ngày gần nhất và tháng này, kèm ước tính cho cả tháng và phân tích theo thiết bị và khu vực.' },
        { icon: 'plug', title: 'Trung thực về những chỗ còn thiếu', body: 'Ở nơi chưa nhập giá, chi phí hiển thị là "rate not set" (chưa đặt giá). Nó không bao giờ được hiển thị là số không.' },
      ],
      note: {
        body: 'Chi phí là ước tính dựa trên mức giá bạn nhập và tổng điện năng theo từng giờ tròn, không phải hóa đơn tiền điện. Giờ cao điểm mặc định chỉ là điểm khởi đầu, không phải biểu giờ chính thức của bất kỳ công ty điện lực nào.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 4,
      eyebrow: 'Đám mây bên dưới',
      title: 'Lịch sử, quy tắc và quyền truy cập ở một nơi.',
      items: [
        { title: 'Lịch sử', body: 'Mọi bản tổng hợp đều được lưu, kèm số liệu gộp theo giờ để biểu đồ theo ngày, tuần hoặc tháng hiển thị nhanh.' },
        { title: 'Quy tắc cảnh báo', body: 'Đặt ngưỡng cho từng cảm biến. Cảnh báo lưu lại lịch sử, và có thể được xác nhận và xử lý.' },
        { title: 'Cập nhật trực tiếp', body: 'Bảng điều khiển cập nhật khi có số đo mới, không cần tải lại trang.' },
        { title: 'Cơ sở và vai trò', body: 'Tổ chức, cơ sở, vị trí và thiết bị, với quyền truy cập được quyết định theo tư cách thành viên và vai trò.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Quyền riêng tư',
      title: 'Những gì được gửi cho mô hình AI, và những gì không.',
      items: [
        { title: 'Được gửi', body: 'Tên cơ sở và múi giờ, và với mỗi phát hiện: loại và mức độ nghiêm trọng, tên cảm biến, vị trí và thiết bị, cùng các con số tổng hợp mà phát hiện được tính ra.' },
        { title: 'Không bao giờ gửi', body: 'Dòng số đo thô của bạn, địa chỉ email, tên người dùng, địa chỉ phần cứng hay khóa. Mọi phản hồi đều được kiểm tra trước khi lưu, và bất cứ thứ gì ngoài dự kiến đều bị loại bỏ.' },
      ],
      note: {
        body: 'Phần giải thích của AI là tùy chọn và sử dụng mô hình AI của bên thứ ba. Các phát hiện và cảnh báo nghiêm trọng đến điện thoại của bạn dưới dạng thông báo đẩy; việc gửi qua email đã được xây dựng nhưng chưa được bật, và tin nhắn văn bản thì không có. Dự báo là ước tính dựa trên xu hướng gần đây, không phải cam kết.',
      },
    },
  ],
};

const apps: Page = {
  meta: {
    title: 'VexaOs Apps cho web, iOS và Android',
    description:
      'Các ứng dụng VexaOs cho web, iOS và Android: bảng điều khiển trực tiếp, cảnh báo kèm thông báo trên điện thoại, phân tích có xuất CSV, chi phí điện, nhiều cơ sở và vai trò trong nhóm, trên một tài khoản.',
  },
  hero: {
    eyebrow: 'Sản phẩm · Ứng dụng',
    title: 'Các cơ sở của bạn, [[trên mọi màn hình.]]',
    subtitle:
      'Một tài khoản trên web và trên iOS và Android. Xem điều gì đang diễn ra lúc này, nhìn lại cả một tháng, và xử lý cảnh báo dù bạn đang ở đâu.',
    ctas: [{ label: 'Đặt lịch demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    { type: 'shot', shot: 'dashboardSummary' },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Bảng điều khiển web',
      title: 'Mọi thứ ở một nơi.',
      items: [
        { title: 'Bảng điều khiển', body: 'Xem nhanh số cảm biến trực tuyến, các giá trị trung bình, cảnh báo đang hoạt động, trạng thái gateway, công suất hiện tại, điện năng hôm nay và các thông tin phân tích mới nhất.' },
        { title: 'Cảm biến', body: 'Tìm kiếm, lọc và sắp xếp mọi cảm biến. Mở một cảm biến để xem lịch sử, dòng thời gian của cửa và hồ sơ của nó.' },
        { title: 'Cảnh báo', body: 'Lịch sử cảnh báo, xác nhận và xử lý, cùng quy tắc cảnh báo cho từng cảm biến.' },
        { title: 'Thông tin phân tích', body: 'Các phát hiện được lọc theo trạng thái, mức độ nghiêm trọng, loại và cảm biến, kèm bản tóm tắt hằng ngày.' },
        { title: 'Phân tích', body: 'So sánh các cảm biến, xem giá trị thấp nhất, trung bình và cao nhất hằng ngày, xem lại hoạt động của cửa, và xuất CSV.' },
        { title: 'Năng lượng', body: 'Công suất hiện tại, kWh và chi phí theo thiết bị và khu vực, chi phí theo thời gian, ước tính cho cả tháng, và xuất CSV.' },
        { title: 'Địa điểm', body: 'Cơ sở, các vị trí trong một cơ sở và thiết bị, với mỗi cảm biến được gắn vào đúng nơi nó được đặt.' },
        { title: 'Thiết bị', body: 'Tình trạng gateway, cùng các quy trình có hướng dẫn để thêm cảm biến hoặc ổ cắm thông minh.' },
        { title: 'Cài đặt', body: 'Hồ sơ, tổ chức, lời mời vào nhóm, đơn vị đo, giá điện và tùy chọn thông báo.' },
      ],
    },
    {
      type: 'split',
      eyebrow: 'iOS và Android',
      title: 'Vẫn dữ liệu đó, trong túi của bạn.',
      body: 'Ứng dụng di động bám theo bảng điều khiển web: cảm biến trực tiếp, chi tiết cảm biến kèm lịch sử, phân tích, năng lượng, thông tin phân tích và cài đặt. Nó hoạt động ở chế độ dọc và ngang, trên điện thoại và máy tính bảng.',
      checks: [
        'Số đo trực tiếp và trạng thái cửa cho mọi cảm biến.',
        'Thông báo trên điện thoại cho các cảnh báo nghiêm trọng, có khung giờ yên lặng và lời nhắc.',
        'Đổi tên cảm biến và đặt vị trí, thiết bị cho chúng ngay từ ứng dụng.',
        'Chọn °C hoặc °F; dữ liệu vẫn giữ nguyên.',
      ],
      shot: 'mobileDashboard',
      phone: true,
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Nhóm và cơ sở',
      title: 'Đúng người thấy đúng cơ sở.',
      body: 'Tài khoản chỉ được tạo theo lời mời. Mỗi người được thêm vào một tổ chức, hoặc vào một cơ sở riêng lẻ trong tổ chức đó, với một vai trò quyết định họ được làm gì.',
      checks: [
        '**Chủ sở hữu và quản trị viên:** quản lý tổ chức, nhóm và các cơ sở.',
        '**Người lắp đặt:** thêm cảm biến, đặt quy tắc và xử lý các phát hiện.',
        '**Người xem:** xem bảng điều khiển và xác nhận cảnh báo.',
        'Chuyển qua lại giữa các địa điểm, hoặc xem tất cả cùng lúc.',
      ],
      shot: 'dashboardPanels',
      note: {
        body: 'Ứng dụng iOS và Android chưa có trên các kho ứng dụng công khai; chúng tôi cài đặt cùng bạn trong quá trình triển khai ban đầu. Thông báo đẩy trên điện thoại đã hoạt động. Cảnh báo qua email đã được xây dựng nhưng chưa được bật, và tin nhắn văn bản thì không có. Hiện tại các ứng dụng chỉ có tiếng Anh.',
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
