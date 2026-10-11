import type { Page } from '@/lib/i18n/types';

// MACHINE DRAFT (vi): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.

/**
 * Main pages (Vietnamese). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const home: Page = {
  meta: {
    title: 'VexaOs: Giám sát mọi thứ, ở mọi nơi',
    description:
      'VexaOs là nền tảng giám sát không phụ thuộc nhà cung cấp: cảm biến không dây và ổ cắm thông minh, Edge Gateway an toàn khi mất mạng, VexaOs Cloud với AI Insights, cùng ứng dụng cho web, iOS và Android.',
  },
  hero: {
    eyebrow: 'Nền tảng giám sát không phụ thuộc nhà cung cấp',
    title: 'Giám sát mọi thứ, [[ở mọi nơi.]]',
    subtitle:
      'Cảm biến không dây, một Edge Gateway vẫn tiếp tục ghi khi mất internet, một đám mây phát hiện sớm sự cố, cùng ứng dụng cho web, iOS và Android. Một nền tảng, cho mọi ngành.',
    ctas: [
      { label: 'Đặt lịch demo', href: '/contact', variant: 'primary' },
      { label: 'Xem cách hoạt động', href: '/platform', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'heroShots',
      caption: 'Bảng điều khiển web của VexaOs. Ảnh chụp thực tế từ cơ sở thử nghiệm của chúng tôi: hai cảm biến, một gateway, không có dữ liệu mẫu.',
    },
    {
      type: 'stack',
      id: 'stack',
      eyebrow: 'Nền tảng',
      title: 'Bốn lớp. Một hệ thống.',
      subtitle:
        'Mỗi lớp làm một việc rồi chuyển tiếp cho lớp kế tiếp, để một số đo trong tủ đông trở thành một cảnh báo trong tay ai đó.',
      link: { label: 'Nền tảng hoạt động như thế nào', href: '/platform' },
    },
    {
      type: 'sensors',
      id: 'sensors',
      tinted: true,
      compact: true,
      eyebrow: 'Các nhóm cảm biến',
      title: 'Không chỉ là một chiếc nhiệt kế.',
      subtitle:
        'Chín nhóm cảm biến, không dây và có dây, trên một nền tảng. Màu xanh lá là đã hoạt động hiện nay; phần còn lại chúng tôi bổ sung thông qua adapter.',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Xây dựng cho thực tế',
      title: 'Giám sát vẫn hoạt động khi có sự cố.',
      subtitle: 'Mạng rớt, điện chập chờn và pin cạn dần. Nền tảng được xây dựng xoay quanh những ngày như thế.',
      items: [
        { icon: 'gateway', title: 'An toàn khi mất mạng', body: 'Gateway ghi mọi số đo vào bộ nhớ của chính nó và tải lên, một lần duy nhất và theo đúng thứ tự, khi kết nối trở lại.' },
        { icon: 'plug', title: 'Tự phục hồi', body: 'Các watchdog khởi động lại bộ thu phát sóng hoặc dịch vụ bị treo và tìm cách khôi phục mạng, không cần ai có mặt tại chỗ.' },
        { icon: 'door', title: 'Sự kiện cửa tức thời', body: 'Việc cửa mở hoặc đóng được gửi đi ngay khi xảy ra. Nó không chờ đến bản tổng hợp kế tiếp.' },
        { icon: 'cloud', title: 'Cảnh báo sớm', body: 'Phát hiện độ trôi và dự báo thời gian chạm ngưỡng chỉ ra vấn đề khi vẫn còn thời gian để xử lý.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'VexaOs Cloud & AI Insights',
      title: 'Nó cho bạn biết điều gì đã thay đổi, và cần xem xét điều gì.',
      body: 'Cứ 30 phút, đám mây kiểm tra từng cảm biến để tìm những dấu hiệu thường xuất hiện trước một sự cố. Các phát hiện được tính toán từ số đo của bạn, và mỗi phát hiện đều kèm theo các con số đằng sau nó.',
      checks: [
        '**Phát hiện độ trôi.** Mức tăng hoặc giảm đều trong sáu giờ, được đánh dấu trước khi vượt ngưỡng.',
        '**Dự báo thời gian chạm ngưỡng.** Còn bao nhiêu giờ nữa thì cảm biến chạm ngưỡng cảnh báo nếu giữ tốc độ hiện tại.',
        '**Các kiểu hoạt động của cửa.** Bị để mở, mở vào giờ bất thường, hoặc mở lâu hơn nhiều so với bình thường.',
        '**Giải thích bằng tiếng Anh dễ hiểu.** Điều gì đã xảy ra, nguyên nhân có khả năng và cần làm gì, luôn được hiển thị bên cạnh các con số đo được.',
      ],
      shot: 'doorActivity',
      link: { label: 'Tìm hiểu thêm về Cloud & AI Insights', href: '/products/cloud-ai-insights' },
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Năng lượng',
      title: 'Xem mỗi thiết bị tốn bao nhiêu tiền điện để vận hành.',
      subtitle: 'Cắm thiết bị vào ổ cắm thông minh, và công suất, điện năng cùng chi phí của nó sẽ hiện ra bên cạnh các cảm biến khác của bạn.',
      items: [
        { icon: 'energy', title: 'Giám sát bằng ổ cắm thông minh', status: 'available', body: 'Ổ cắm Wi-Fi có đo điện báo công suất hiện tại và điện năng đã dùng, theo từng thiết bị.' },
        { icon: 'cloud', title: 'Giá điện thực tế của bạn', status: 'available', body: 'Nhập một mức giá cố định, giá theo mùa, hoặc giá giờ cao điểm và thấp điểm theo mùa. Chi phí được tính theo mức giá có hiệu lực trong ngày.' },
        { icon: 'plug', title: 'Điện tiêu thụ ở chế độ chờ', status: 'available', body: 'Thiết bị vẫn tiếp tục tiêu thụ điện khi không hoạt động sẽ được đánh dấu thành một phát hiện.' },
        { icon: 'apps', title: 'Chi phí theo thiết bị', status: 'available', body: 'Phân tích chi phí theo từng thiết bị và khu vực, những khoản tốn kém nhất, và ước tính cho cả tháng.' },
      ],
      note: {
        body: 'Chi phí là ước tính dựa trên mức giá bạn nhập, không phải hóa đơn tiền điện. Hiện chỉ hỗ trợ một mẫu ổ cắm thông minh và nó phù hợp với ổ điện Bắc Mỹ; ổ cắm cho các khu vực khác, và đồng hồ đo tủ điện qua RS-485 / Modbus, được bổ sung dưới dạng tích hợp.',
      },
      link: { label: 'Năng lượng trong danh mục cảm biến', href: '/products/sensors#energy' },
    },
    {
      type: 'industries',
      id: 'industries',
      tinted: true,
      eyebrow: 'Giải pháp',
      title: 'Một nền tảng, nhiều nơi để sử dụng.',
      subtitle: 'Vẫn những cảm biến, gateway, đám mây và ứng dụng đó, áp dụng cho những gì bạn cần theo dõi.',
    },
    {
      type: 'split',
      flip: true,
      eyebrow: 'Không phụ thuộc nhà cung cấp',
      title: 'Không bị ràng buộc vào một hãng cảm biến.',
      body: 'Mỗi loại cảm biến kết nối vào gateway thông qua một adapter, chuyển số đo của nó về một định dạng chung. Đám mây và các ứng dụng không bao giờ cần biết ai đã sản xuất cảm biến.',
      checks: [
        'Thêm một loại cảm biến mới mà không cần thay gateway hay đổi ứng dụng.',
        'Mọi số đo được lưu theo đơn vị chuẩn, bất kể cảm biến báo về thế nào.',
        'Định dạng dữ liệu không xác định sẽ bị từ chối, không bao giờ được đoán.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Tình hình hiện tại',
      title: 'Cái gì đã hoạt động hôm nay, và cái gì sắp tới.',
      subtitle: 'Chúng tôi muốn bạn biết ngay bây giờ hơn là phát hiện ra sau này.',
      items: [
        {
          title: 'Đã hoạt động hôm nay',
          status: 'available',
          body: 'Cảm biến nhiệt độ, độ ẩm, áp suất và cảm biến cửa. Ổ cắm thông minh Wi-Fi có tính chi phí điện. VexaOs Edge Gateway. VexaOs Cloud với AI Insights. Bảng điều khiển web và ứng dụng iOS và Android, có thông báo trên điện thoại.',
        },
        {
          title: 'Đang xây dựng',
          status: 'development',
          body: 'Cảm biến độ rung và tình trạng máy móc đang được tích hợp. Thiết bị RS-485 / Modbus có dây được cung cấp dưới dạng tích hợp. Cảnh báo qua email đã được xây dựng nhưng chưa được bật.',
        },
        {
          title: 'Mobile Gateway',
          status: 'soon',
          body: 'Một gateway cho xe, rơ-moóc và các địa điểm không có nguồn điện hoặc mạng cố định. Đã lên kế hoạch, chưa bán ra.',
        },
      ],
    },
  ],
};

const platform: Page = {
  meta: {
    title: 'Nền tảng: VexaOs hoạt động như thế nào',
    description:
      'VexaOs hoạt động như thế nào: cảm biến và ổ cắm thông minh báo về một Edge Gateway an toàn khi mất mạng, gateway gửi các bản tổng hợp và báo động tức thời lên VexaOs Cloud, nơi AI Insights và các ứng dụng web, iOS và Android biến chúng thành hành động.',
  },
  hero: {
    eyebrow: 'Nền tảng',
    title: 'Từ cảm biến trên tường đến cảnh báo [[trong tay bạn.]]',
    subtitle:
      'VexaOs gồm bốn lớp hoạt động như một hệ thống: cảm biến, gateway, đám mây và ứng dụng. Dưới đây là việc mỗi lớp làm, và điều gì xảy ra với một số đo trên đường đi.',
    ctas: [
      { label: 'Đặt lịch demo', href: '/contact', variant: 'primary' },
      { label: 'Xem các sản phẩm', href: '/products', variant: 'secondary' },
    ],
  },
  sections: [
    { type: 'stack' },
    {
      type: 'steps',
      tinted: true,
      eyebrow: 'Hành trình của một số đo',
      title: 'Điều gì xảy ra, từng bước một.',
      items: [
        { title: 'Cảm biến lấy một số đo', body: 'Cảm biến chạy bằng pin phát nhiệt độ, độ ẩm hoặc trạng thái cửa qua Bluetooth Low Energy vài giây một lần. Ổ cắm thông minh báo về qua Wi-Fi. Thiết bị RS-485 / Modbus có dây tham gia thông qua tích hợp.' },
        { title: 'Gateway nghe thấy nó', body: 'VexaOs Edge Gateway thu nhận mọi cảm biến trong tầm phủ sóng, giải mã thông qua adapter dành cho loại cảm biến đó, và chuyển về một định dạng chung.' },
        { title: 'Quy tắc được kiểm tra tại chỗ', body: 'Quy tắc báo động chạy ngay trên gateway. Một ngưỡng bị vượt hoặc một sự kiện cửa được gửi đi ngay lập tức, trước mọi thứ khác trong hàng đợi.' },
        { title: 'Bản tổng hợp được gửi lên đám mây', body: 'Theo mặc định, gateway gửi một bản tổng hợp cho mỗi cảm biến sau mỗi 10 giây: giá trị thấp nhất, cao nhất, trung bình và mới nhất. Khoảng thời gian này có thể đặt riêng cho từng cảm biến.' },
        { title: 'Đám mây tìm dấu hiệu sự cố', body: 'VexaOs Cloud lưu trữ lịch sử và kiểm tra từng cảm biến về độ trôi, dự báo, hoạt động cửa bất thường, pin yếu và thiết bị im lặng.' },
        { title: 'Bạn thấy và hành động', body: 'Bảng điều khiển cập nhật trực tiếp trên web, iOS và Android, và cảnh báo đến điện thoại của bạn. Cảnh báo có thể được xác nhận và xử lý, có ghi lại ai đã làm gì.' },
      ],
    },
    {
      type: 'sensors',
      id: 'sensors',
      compact: true,
      eyebrow: 'Các nhóm cảm biến',
      title: 'Những gì nền tảng có thể lắng nghe.',
      subtitle:
        'Chín nhóm cảm biến, không dây và có dây, trên một nền tảng. Màu xanh lá là đã hoạt động hiện nay; phần còn lại chúng tôi bổ sung thông qua adapter.',
    },
    {
      type: 'split',
      id: 'offline',
      tinted: true,
      eyebrow: 'Khi mất internet',
      title: 'Không mất gì cả. Không có gì bị tính hai lần.',
      body: 'Gateway không bao giờ mặc định rằng mạng luôn sẵn sàng. Số đo trước tiên được đưa vào một hàng đợi bền vững trên gateway, và chỉ bị xóa khi đám mây xác nhận đã nhận được.',
      checks: [
        'Số đo và báo động được giữ lại khi mất internet và khi gateway khởi động lại.',
        'Khi kết nối trở lại, báo động được tải lên trước, sau đó là mọi thứ khác từ cũ nhất đến mới nhất.',
        'Mỗi thông điệp có ID riêng, nên việc gửi lại không bao giờ tạo ra bản trùng lặp.',
        'Báo động đang mở trước khi khởi động lại thì vẫn mở sau đó.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      id: 'vendor-neutral',
      cols: 3,
      eyebrow: 'Không phụ thuộc nhà cung cấp ngay từ thiết kế',
      title: 'Cảm biến kết nối thông qua adapter.',
      subtitle:
        'Adapter là một phần mềm nhỏ trên gateway, hiểu được một loại cảm biến. Mọi thứ phía sau nó đều dùng một định dạng VexaOs duy nhất.',
      items: [
        { icon: 'plug', title: 'Bổ sung loại cảm biến theo thời gian', body: 'Hỗ trợ một loại cảm biến mới nghĩa là thêm một adapter. Gateway, đám mây và ứng dụng vẫn giữ nguyên.' },
        { icon: 'sensors', title: 'Một định dạng, đơn vị chuẩn', body: 'Nhiệt độ, độ ẩm, áp suất, công suất, pin và tín hiệu được lưu theo đơn vị chuẩn. Ứng dụng quy đổi khi hiển thị, ví dụ °C hoặc °F.' },
        { icon: 'gateway', title: 'Không phỏng đoán', body: 'Nếu cảm biến gửi một định dạng mà adapter không nhận ra, số đo sẽ bị từ chối thay vì được đoán.' },
      ],
    },
    {
      type: 'cards',
      id: 'security',
      tinted: true,
      cols: 4,
      eyebrow: 'Bảo mật và quyền truy cập',
      title: 'Mỗi gateway tự chứng minh danh tính. Mỗi người chỉ thấy các cơ sở của mình.',
      items: [
        { title: 'Mỗi gateway một khóa', body: 'Mỗi gateway giữ khóa thiết bị riêng và đăng nhập bằng khóa đó. Khóa không bao giờ rời khỏi gateway.' },
        { title: 'Mã hóa khi truyền', body: 'Gateway giao tiếp với VexaOs Cloud qua HTTPS có kiểm tra chứng chỉ. Tín hiệu phát mã hóa từ cảm biến cũng được hỗ trợ.' },
        { title: 'Truy cập theo tư cách thành viên', body: 'Dữ liệu được tách biệt theo tổ chức và cơ sở. Mỗi người chỉ thấy những cơ sở mà họ đã được thêm vào.' },
        { title: 'Tài khoản chỉ theo lời mời', body: 'Tài khoản được tạo theo lời mời, với các vai trò chủ sở hữu, quản trị viên, người lắp đặt và người xem.' },
      ],
      note: {
        body: 'Hiện tại VexaOs không có các chứng nhận về bảo mật hay tuân thủ, chẳng hạn như SOC 2 hoặc ISO 27001. Nếu bạn cần những cam kết cụ thể, hãy hỏi chúng tôi và chúng tôi sẽ trả lời rõ ràng.',
      },
    },
  ],
};

const products: Page = {
  meta: {
    title: 'Sản phẩm',
    description:
      'Dòng sản phẩm VexaOs: cảm biến không dây và ổ cắm thông minh, VexaOs Edge Gateway, Mobile Gateway (sắp ra mắt), VexaOs Cloud với AI Insights, cùng ứng dụng cho web, iOS và Android.',
  },
  hero: {
    eyebrow: 'Sản phẩm',
    title: 'Mọi thứ nằm giữa số đo [[và quyết định.]]',
    subtitle: 'Năm sản phẩm được thiết kế để đi cùng nhau. Bắt đầu với một cơ sở và vài cảm biến, rồi thêm dần khi bạn cần.',
  },
  sections: [{ type: 'products' }],
};

const solutions: Page = {
  meta: {
    title: 'Giải pháp theo ngành',
    description:
      'VexaOs được sử dụng như thế nào trong các ngành: dịch vụ ăn uống và chuỗi lạnh, kho bãi và logistics, sản xuất, cơ sở vật chất và bất động sản, y tế và bảo quản dược phẩm.',
  },
  hero: {
    eyebrow: 'Giải pháp',
    title: 'Một nền tảng. [[Ngành của bạn.]]',
    subtitle:
      'VexaOs không được xây dựng cho riêng một loại hình kinh doanh. Vẫn những cảm biến, gateway, đám mây và ứng dụng đó được áp dụng ở bất cứ đâu mà nhiệt độ, độ ẩm, một cánh cửa hay một thiết bị điện có ý nghĩa quan trọng.',
  },
  sections: [
    {
      type: 'solutions',
      other: {
        title: 'Một nhu cầu khác?',
        body: 'Nếu nó có nhiệt độ, độ ẩm, một cánh cửa hay một ổ cắm, nhiều khả năng nền tảng có thể theo dõi nó. Hãy cho chúng tôi biết bạn đang nghĩ đến điều gì.',
        label: 'Trao đổi với chúng tôi',
      },
      restaurant: { eyebrow: 'Cũng từ VexaOs', label: 'Xem Restaurant OS' },
    },
  ],
};

/** Labels around an industry page; the industry's own words are in catalog.ts. */
const industry = {
  eyebrowPrefix: 'Giải pháp',
  metaTitleSuffix: 'Giám sát',
  primary: 'Đặt lịch demo',
  secondary: 'Nền tảng hoạt động như thế nào',
  monitor: { eyebrow: 'Cần giám sát những gì', title: 'Nơi nó phát huy giá trị.' },
  how: { eyebrow: 'VexaOs giúp bạn như thế nào', title: 'Nền tảng, khi áp dụng vào thực tế.' },
  stack: { eyebrow: 'Cùng một hệ thống ở mọi nơi', title: 'Những gì bạn sẽ vận hành.' },
  restaurantLead: 'Bạn đang điều hành nhà hàng? Hãy xem',
  restaurantTail: ', giải pháp của chúng tôi cho ngành nhà hàng – khách sạn.',
};

const restaurantOs: Page = {
  meta: {
    title: 'Restaurant OS: VexaOs Hospitality',
    description:
      'Restaurant OS là giải pháp VexaOs Hospitality để vận hành nhà hàng: khu phục vụ, màn hình bếp và đơn gọi món trong một trung tâm điều khiển. Sắp bước vào giai đoạn thí điểm.',
  },
  hero: {
    eyebrow: 'Giải pháp · VexaOs Hospitality',
    status: 'development',
    title: 'Restaurant OS: [[một hệ thống cho toàn bộ nhà hàng.]]',
    subtitle:
      'Restaurant OS là một giải pháp VexaOs riêng biệt dành cho ngành nhà hàng – khách sạn. Nó kết nối khu phục vụ, bếp và đơn gọi món trong một trung tâm điều khiển. Giải pháp sắp bước vào giai đoạn thí điểm và chưa được cung cấp rộng rãi.',
    ctas: [
      { label: 'Hỏi về chương trình thí điểm', href: '/contact', variant: 'primary' },
      { label: 'Giám sát chuỗi lạnh', href: '/solutions/food-service-cold-chain', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Khu phục vụ khách',
      title: 'Sơ đồ bàn, theo thời gian thực.',
      body: 'Mọi bàn và trạng thái của nó trong một màn hình, cập nhật khi nhân viên đón tiếp xếp chỗ cho khách và khi bàn được dọn.',
      checks: [
        'Bàn theo từng khu, kèm số ghế và trạng thái hiện tại.',
        'Xem nhanh số bàn còn trống, đã có khách và cần dọn.',
        'Quản lý có thể thêm bàn và thay đổi trạng thái thủ công.',
      ],
      shot: 'restaurantFloor',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Bếp',
      title: 'Phiếu món từ khu chế biến đến quầy ra món.',
      body: 'Màn hình bếp phản ánh các phiếu món đang chạy theo từng giai đoạn, nên trung tâm điều khiển hiển thị đúng những gì bếp đang thấy.',
      checks: [
        'Đang chế biến, sẵn sàng mang ra và đã phục vụ.',
        'Phiếu ăn tại chỗ, đặt tiệc và giao hàng ở cùng một nơi.',
        'Đánh dấu phiếu là đã sẵn sàng và đã phục vụ ngay từ trung tâm điều khiển.',
      ],
      shot: 'restaurantKitchen',
    },
    {
      type: 'note',
      note: {
        title: 'Giải pháp này liên quan thế nào đến nền tảng giám sát',
        body: 'Hiện tại Restaurant OS và nền tảng giám sát VexaOs là hai sản phẩm riêng biệt. Một nhà hàng có thể dùng cảm biến và gateway của VexaOs để theo dõi kho mát và cửa mà không cần Restaurant OS, và ngược lại. Các ảnh chụp màn hình trên trang này cho thấy Restaurant OS chạy trên dữ liệu minh họa, không phải nhà hàng của một khách hàng.',
      },
      linkLead: 'Bạn đang tìm giải pháp giám sát kho mát, tủ đông và cửa?',
      link: { label: 'Xem dịch vụ ăn uống và chuỗi lạnh', href: '/solutions/food-service-cold-chain' },
    },
  ],
  cta: {
    title: 'Bạn quan tâm đến chương trình thí điểm Restaurant OS?',
    body: 'Hãy kể cho chúng tôi về nhà hàng của bạn, và chúng tôi sẽ trình bày cụ thể Restaurant OS hiện đang ở giai đoạn nào.',
  },
};

const about: Page = {
  meta: {
    title: 'Giới thiệu về VexaOs',
    description:
      'VexaOs xây dựng một nền tảng không phụ thuộc nhà cung cấp để giám sát mọi thứ, ở mọi nơi: cảm biến, Edge Gateway an toàn khi mất mạng, AI Insights trên đám mây, và ứng dụng. Đặt trụ sở tại Pontiac, Michigan.',
  },
  hero: {
    eyebrow: 'Giới thiệu',
    title: 'Chúng tôi xây dựng nền tảng [[theo dõi những điều quan trọng.]]',
    subtitle:
      'VexaOs là một công ty công nghệ đặt trụ sở tại Pontiac, Michigan. Chúng tôi tạo ra một nền tảng không phụ thuộc nhà cung cấp để giám sát thiết bị và không gian: cảm biến, gateway, đám mây và ứng dụng, được thiết kế như một hệ thống.',
  },
  sections: [
    {
      type: 'prose',
      paragraphs: [
        'Rất nhiều thứ mà một doanh nghiệp phụ thuộc vào lại diễn ra ở nơi không ai nhìn thấy. Một tủ đông ấm lên trong đêm. Một cánh cửa bị để mở. Một căn phòng bị ẩm. Thường thì phải sau đó mới có người phát hiện, khi thiệt hại đã xảy ra.',
        'VexaOs ra đời để lấp khoảng trống đó. Chúng tôi làm những phần khó nhất trước: một gateway vẫn tiếp tục ghi khi mạng gặp sự cố, và một đám mây nhận ra cả độ trôi chậm lẫn việc vượt ngưỡng. Sau đó chúng tôi xây dựng các ứng dụng bên trên, để đúng người thấy được kịp thời.',
        'Nền tảng không bị ràng buộc vào một ngành hay một hãng cảm biến. Dịch vụ ăn uống, kho bãi, sản xuất, cơ sở vật chất và bảo quản trong y tế đều có chung một nhu cầu cốt lõi, và cùng một nền tảng phục vụ từng ngành.',
      ],
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Cách chúng tôi làm việc',
      title: 'Những gì bạn có thể mong đợi ở chúng tôi.',
      items: [
        { title: 'Chúng tôi nói đúng sự thật', body: 'Nếu thứ gì đó đang phát triển hoặc sắp ra mắt, chúng tôi ghi rõ như vậy. Bạn sẽ không thấy khách hàng, số liệu thống kê hay chứng nhận bịa đặt trên website này.' },
        { title: 'Đo lường trước, AI sau', body: 'Các phát hiện đến từ số đo của bạn và hiển thị rõ các con số. AI được dùng để giải thích, không bao giờ để quyết định.' },
        { title: 'Xây dựng cho những ngày tồi tệ', body: 'Chúng tôi thiết kế cho lúc mất mạng, mất điện và hết pin, vì đó là những ngày cần giám sát nhất.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Chúng tôi đang ở đâu',
      title: 'Một công ty trẻ, xây dựng một cách công khai.',
      items: [
        { title: 'Hôm nay', body: 'Nền tảng giám sát hoạt động từ đầu đến cuối: cảm biến nhiệt độ, độ ẩm và cảm biến cửa, ổ cắm thông minh có tính chi phí điện, Edge Gateway, VexaOs Cloud với AI Insights, cùng ứng dụng web và di động. Chúng tôi hiện đang nhận đặt lịch demo.' },
        { title: 'Tiếp theo', body: 'Cảm biến độ rung và tình trạng máy móc, thiết bị RS-485 / Modbus có dây, cảnh báo qua email, và Mobile Gateway. Restaurant OS, giải pháp của chúng tôi cho ngành nhà hàng – khách sạn, sắp bước vào giai đoạn thí điểm.' },
      ],
    },
    { type: 'findUs', title: 'Tìm chúng tôi' },
  ],
};

const contact: Page = {
  meta: {
    title: 'Đặt lịch demo',
    description:
      'Đặt lịch demo nền tảng giám sát VexaOs, hoặc liên hệ với chúng tôi. Hãy cho chúng tôi biết bạn muốn giám sát gì và chúng tôi sẽ cho bạn xem nó hoạt động như thế nào.',
  },
  hero: {
    eyebrow: 'Đặt lịch demo',
    title: 'Hãy cho chúng tôi biết bạn cần [[để mắt đến điều gì.]]',
    subtitle:
      'Vài dòng ngắn gọn là đủ. Chúng tôi sẽ cho bạn xem nền tảng đang hoạt động, và nói rõ những gì nó làm được và chưa làm được cho bạn ở thời điểm hiện tại.',
  },
  sections: [
    {
      type: 'contact',
      next: {
        title: 'Điều gì diễn ra tiếp theo',
        items: [
          'Chúng tôi trả lời qua email để sắp xếp thời gian.',
          'Chúng tôi hướng dẫn bạn xem qua bảng điều khiển, cảnh báo và các thông tin phân tích.',
          'Chúng tôi trao đổi về các cơ sở của bạn và loại cảm biến nào phù hợp.',
        ],
      },
      email: { title: 'Bạn thích dùng email hơn?' },
    },
  ],
  cta: false,
};

export const pagesMain = { home, platform, products, solutions, industry, restaurantOs, about, contact };
