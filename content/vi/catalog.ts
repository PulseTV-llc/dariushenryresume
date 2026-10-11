/**
 * Products, industries and the sensor catalog (Vietnamese).
 *
 * Structure (slugs, icons, statuses, connectivity) lives in lib/site.ts and
 * lib/sensors.ts. This file holds only the words, keyed by slug, and array
 * items line up by position with those registries.
 *
 * HONESTY RULES: only claim what the product does today; no customers,
 * statistics, certifications, sensor vendor names or specifications.
 */
// MACHINE DRAFT (vi): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.
export const catalog = {
  products: {
    sensors: {
      name: 'Cảm biến',
      short: 'Cảm biến',
      role: 'Đo lường',
      summary:
        'Chín nhóm cảm biến, không dây và có dây. Cảm biến Bluetooth đo nhiệt độ, độ ẩm, áp suất và cảm biến cửa, cùng ổ cắm thông minh Wi-Fi đã hoạt động hiện nay; các loại còn lại, bao gồm RS-485 / Modbus, được bổ sung thông qua adapter.',
    },
    'edge-gateway': {
      name: 'VexaOs Edge Gateway',
      short: 'Edge Gateway',
      role: 'Thu thập',
      summary:
        'Lắng nghe các cảm biến và ổ cắm thông minh ở gần, kiểm tra quy tắc báo động ngay tại chỗ, và giữ lại mọi số đo khi mất internet hoặc khởi động lại.',
    },
    'mobile-gateway': {
      name: 'VexaOs Mobile Gateway',
      short: 'Mobile Gateway',
      role: 'Thu thập khi di chuyển',
      summary: 'Cũng là gateway đó, dành cho những nơi không có nguồn điện hoặc mạng cố định: xe, rơ-moóc và các địa điểm tạm thời.',
    },
    'cloud-ai-insights': {
      name: 'VexaOs Cloud & AI Insights',
      short: 'Cloud & AI Insights',
      role: 'Thấu hiểu',
      summary:
        'Lưu trữ lịch sử, chạy các quy tắc cảnh báo, tính chi phí điện bạn sử dụng, và chỉ ra độ trôi, dự báo thời gian chạm ngưỡng và hoạt động cửa bất thường bằng tiếng Anh dễ hiểu.',
    },
    apps: {
      name: 'VexaOs Apps',
      short: 'Ứng dụng',
      role: 'Hành động',
      summary: 'Một tài khoản trên web, iOS và Android: bảng điều khiển trực tiếp, cảnh báo, phân tích, năng lượng, nhiều cơ sở và vai trò trong nhóm.',
    },
  },

  industries: {
    'food-service-cold-chain': {
      name: 'Dịch vụ ăn uống & chuỗi lạnh',
      short: 'Thực phẩm & chuỗi lạnh',
      headline: 'Biết chắc kho mát vẫn đủ lạnh trước khi thực phẩm bị hỏng.',
      summary:
        'Kho mát, tủ mát, tủ đông và khu sơ chế được theo dõi suốt ngày đêm. Thấy một kho mát đang ấm dần lên từ nhiều giờ trước khi chạm ngưỡng, và biết ngay khi có cửa bị để mở.',
      monitor: [
        { title: 'Kho mát và kho đông', body: 'Nhiệt độ và độ ẩm được đo vài giây một lần, được tổng hợp và vẽ biểu đồ theo giờ, ngày và tháng.' },
        { title: 'Cửa kho mát và tủ đông', body: 'Mọi lần mở và đóng được ghi lại ngay khi xảy ra, kèm đánh dấu khi cửa bị để mở.' },
        { title: 'Khu sơ chế và kho khô', body: 'Nhiệt độ và độ ẩm phòng, kèm cảnh báo khi vượt ra ngoài khoảng bạn đặt.' },
      ],
      how: [
        { title: 'Cảnh báo trước khi chạm ngưỡng', body: 'Khi một kho mát có xu hướng tiến về ngưỡng cảnh báo, dự báo cho biết còn bao nhiêu giờ nếu giữ tốc độ hiện tại.' },
        { title: 'Số đo không mất khi mất kết nối', body: 'Nếu mất internet, gateway vẫn tiếp tục ghi và tải lên toàn bộ khi có mạng trở lại.' },
        { title: 'Bản ghi bạn có thể xuất ra', body: 'Giá trị thấp nhất, trung bình và cao nhất hằng ngày của từng cảm biến, kèm xuất CSV cho sổ ghi chép của riêng bạn.' },
      ],
      note: 'VexaOs ghi lại và cảnh báo về các điều kiện môi trường. Nó không thay thế kế hoạch an toàn thực phẩm của bạn, và không có chứng nhận an toàn thực phẩm nào.',
    },
    'warehouses-logistics': {
      name: 'Kho bãi & logistics',
      short: 'Kho bãi',
      headline: 'Mọi khu lưu trữ và cửa bến hàng, trên một màn hình.',
      summary:
        'Nhiệt độ và độ ẩm ở các khu lưu trữ, cùng bản ghi đầy đủ về thời điểm cửa mở và mở trong bao lâu, tại mọi tòa nhà bạn vận hành.',
      monitor: [
        { title: 'Khu lưu trữ', body: 'Nhiệt độ và độ ẩm theo từng vị trí, với mỗi cơ sở, phòng và thiết bị được đặt tên theo đúng cách bạn vẫn gọi.' },
        { title: 'Cửa bến hàng và cửa phòng lạnh', body: 'Số lần mở hôm nay, lần mở lâu nhất và dòng thời gian của mọi sự kiện, kèm đánh dấu những lần mở vào giờ bất thường.' },
        { title: 'Hàng hóa đang vận chuyển', body: 'Một gateway chạy bằng pin dành cho xe và rơ-moóc.' },
      ],
      how: [
        { title: 'Nhiều cơ sở, một tài khoản', body: 'Chuyển qua lại giữa các địa điểm hoặc xem tất cả cùng lúc. Mỗi người chỉ thấy những cơ sở mình thuộc về.' },
        { title: 'So sánh các khu', body: 'Đặt các cảm biến cạnh nhau trong mục Phân tích để tìm ra khu nào thường ấm hoặc ẩm hơn.' },
        { title: 'Biết khi thiết bị im lặng', body: 'Cảm biến ngừng báo số liệu, pin yếu hoặc tín hiệu yếu đều tạo ra một phát hiện riêng.' },
      ],
      note: 'Việc giám sát khi vận chuyển phụ thuộc vào Mobile Gateway, hiện chưa có sẵn.',
    },
    'manufacturing-machine-health': {
      name: 'Sản xuất & tình trạng máy móc',
      short: 'Sản xuất',
      headline: 'Theo dõi điều kiện xung quanh máy móc của bạn ngay hôm nay. Độ rung là bước tiếp theo.',
      summary:
        'Giám sát nhiệt độ và độ ẩm của khu sản xuất, phòng điện và tủ thiết bị ngay từ bây giờ. Tính năng giám sát độ rung cho thiết bị quay đang được tích hợp.',
      monitor: [
        { title: 'Khu sản xuất và lưu trữ', body: 'Nhiệt độ và độ ẩm ở những nơi nguyên vật liệu và thành phẩm nhạy cảm với một trong hai yếu tố này.' },
        { title: 'Tủ thiết bị và phòng thiết bị', body: 'Nhiệt tích tụ trong tủ hoặc phòng sẽ hiện ra dưới dạng phát hiện độ trôi từ rất lâu trước khi vượt một ngưỡng cố định.' },
        { title: 'Độ rung trên thiết bị quay', body: 'Vận tốc, độ dịch chuyển và tần số trên ba trục, được tổng hợp tại gateway.' },
      ],
      how: [
        { title: 'Độ trôi, không chỉ ngưỡng', body: 'Mức tăng đều trong sáu giờ sẽ được đánh dấu ngay cả khi số đo vẫn nằm trong khoảng cho phép.' },
        { title: 'Quy tắc được kiểm tra tại chỗ', body: 'Quy tắc báo động chạy trên gateway, nên báo động vẫn được phát ra ngay cả khi không kết nối được với đám mây.' },
        { title: 'Được xây dựng để bổ sung loại cảm biến', body: 'Mỗi loại cảm biến là một adapter. Loại mới được thêm vào mà không cần thay đổi gateway, đám mây hay ứng dụng xung quanh.' },
      ],
      note: 'Tính năng giám sát độ rung và tình trạng máy móc đang được tích hợp và hiện chưa có sẵn. Các thiết bị đo có dây trong nhà máy qua RS-485 / Modbus được cung cấp dưới dạng tích hợp. Chúng tôi sẽ cho bạn biết từng hạng mục đang ở giai đoạn nào khi bạn liên hệ.',
    },
    'facilities-property': {
      name: 'Cơ sở vật chất & bất động sản',
      short: 'Cơ sở vật chất',
      headline: 'Để mắt đến những căn phòng không có ai đứng trong đó.',
      summary:
        'Phòng kỹ thuật, phòng máy chủ nhỏ, kho lưu trữ và không gian bỏ trống: nhiệt độ, độ ẩm, cửa và các thiết bị đang cắm điện, trên toàn bộ danh mục tòa nhà.',
      monitor: [
        { title: 'Phòng kỹ thuật và phòng máy chủ', body: 'Nhiệt độ tăng được đánh dấu như một xu hướng, kèm dự báo khi có đặt ngưỡng.' },
        { title: 'Ẩm ướt và độ ẩm', body: 'Nhiệt độ và độ ẩm cùng tăng được nêu ra thành một phát hiện riêng.' },
        { title: 'Cửa và lối ra vào', body: 'Bản ghi mọi lần mở, kèm đánh dấu hoạt động vào những giờ thường yên ắng.' },
      ],
      how: [
        { title: 'Tổ chức giống danh mục của bạn', body: 'Cơ sở, các vị trí trong một cơ sở và thiết bị, với cảm biến được gắn vào từng mục.' },
        { title: 'Vai trò cho nhân viên và nhà thầu', body: 'Các vai trò chủ sở hữu, quản trị viên, người lắp đặt và người xem quyết định ai được thay đổi quy tắc và ai chỉ được xem.' },
        { title: 'Thiết bị cắm điện tốn bao nhiêu', body: 'Ổ cắm thông minh hiển thị công suất, kWh và chi phí theo từng thiết bị, đồng thời đánh dấu thiết bị vẫn tiêu thụ điện khi không hoạt động.' },
      ],
      note: 'VexaOs giám sát các điều kiện môi trường. Nó không phải là hệ thống an ninh hay kiểm soát ra vào.',
    },
    'healthcare-pharma-storage': {
      name: 'Y tế & bảo quản dược phẩm',
      short: 'Y tế & dược phẩm',
      headline: 'Bản ghi nhiệt độ liên tục cho những chiếc tủ lạnh quan trọng.',
      summary:
        'Giám sát nhiệt độ và độ ẩm liên tục cho tủ lạnh bảo quản thuốc, tủ đông và phòng lưu trữ, kèm cảnh báo và lịch sử bạn có thể xuất ra.',
      monitor: [
        { title: 'Tủ lạnh và tủ đông bảo quản thuốc', body: 'Số đo suốt ngày đêm, với quy tắc cảnh báo bạn đặt cho từng cảm biến.' },
        { title: 'Phòng lưu trữ', body: 'Nhiệt độ và độ ẩm phòng với giá trị thấp nhất, trung bình và cao nhất hằng ngày.' },
        { title: 'Cửa tủ lạnh và cửa phòng', body: 'Mọi lần mở đều được ghi lại, kèm đánh dấu khi cửa bị để mở.' },
      ],
      how: [
        { title: 'Cảnh báo sớm', body: 'Dự báo cho biết còn bao nhiêu giờ trước khi chạm ngưỡng nếu giữ tốc độ thay đổi hiện tại.' },
        { title: 'Không có khoảng trống do mất kết nối', body: 'Gateway lưu số đo tại chỗ và tải lên khi kết nối trở lại.' },
        { title: 'Xác nhận và xử lý', body: 'Cảnh báo lưu lại lịch sử về việc ai đã xác nhận, ai đã xử lý, và vào lúc nào.' },
      ],
      note: 'VexaOs là một công cụ giám sát. Nó không phải là thiết bị y tế và không có bất kỳ thẩm định hay chứng nhận nào theo quy định (ví dụ 21 CFR Part 11 hoặc GxP). Hãy kiểm tra các yêu cầu tuân thủ của riêng bạn trước khi dựa vào nó cho các hồ sơ thuộc diện quản lý.',
    },
  },

  restaurantOs: {
    name: 'Restaurant OS',
    summary:
      'Một giải pháp VexaOs Hospitality riêng biệt để vận hành nhà hàng: khu phục vụ, màn hình bếp và đơn gọi món trong một trung tâm điều khiển. Sắp bước vào giai đoạn thí điểm.',
    card: 'Giải pháp của chúng tôi cho ngành nhà hàng – khách sạn để vận hành nhà hàng, song hành cùng nền tảng giám sát.',
  },

  sensors: {
    statusLabel: {
      now: 'Đã có ngay',
      integrating: 'Đang được tích hợp',
      integration: 'Qua tích hợp',
    },
    statusHelp: {
      now: 'Đang hoạt động trên nền tảng hiện nay.',
      integrating: 'Một adapter đang được xây dựng. Hiện chưa có sẵn.',
      integration: 'Chưa được xây dựng. Chúng tôi bổ sung thông qua adapter khi có khách hàng cần.',
    },
    connectivityName: {
      ble: 'Bluetooth Low Energy (không dây)',
      wifi: 'Wi-Fi (không dây)',
      rs485: 'RS-485 / Modbus (có dây)',
    },
    legend: {
      ble: 'Không dây, Bluetooth Low Energy',
      wifi: 'Không dây, ổ cắm thông minh Wi-Fi',
      rs485: 'Có dây, RS-485 / Modbus (qua tích hợp)',
    },
    ui: {
      filterLabel: 'Lọc nhóm cảm biến theo ngành',
      all: 'Tất cả các ngành',
      details: 'Chi tiết',
      seeDetails: 'Xem chi tiết',
      hideDetails: 'Ẩn chi tiết',
      typicalUse: 'Ứng dụng điển hình:',
      more: '+{n} mục khác',
      fullCatalog: 'Xem toàn bộ danh mục cảm biến',
    },
    request: {
      title: 'Không thấy cảm biến của bạn?',
      body: 'Không dây hay có dây, chúng tôi đều tích hợp. VexaOs không phụ thuộc nhà cung cấp và bổ sung cảm biến mới thông qua adapter. Hãy cho chúng tôi biết bạn cần đo gì, và chúng tôi sẽ nói rõ nó đã hoạt động hôm nay, đang được thực hiện, hay cần phải xây dựng.',
      label: 'Hỏi về một cảm biến',
    },
    connectivity: {
      ble: {
        title: 'Không dây: Bluetooth Low Energy',
        body: 'Cảm biến chạy bằng pin, không cần đi dây. Gateway nghe được mọi cảm biến trong tầm phủ sóng.',
        items: [
          'Nhiệt độ, độ ẩm và áp suất khí quyển',
          'Tiếp điểm cửa ra vào và cửa sổ',
          'Chuyển động của cảm biến, pin và cường độ tín hiệu',
          'Hỗ trợ tín hiệu phát mã hóa từ cảm biến',
        ],
      },
      wifi: {
        title: 'Không dây: ổ cắm thông minh Wi-Fi',
        body: 'Ổ cắm có đo điện, nằm trên cùng mạng với gateway. Cắm thiết bị vào và xem nó tiêu thụ bao nhiêu.',
        items: [
          'Công suất hiện tại, tính bằng watt',
          'Điện năng đã dùng, tính bằng kWh',
          'Trạng thái bật, tắt và quá tải',
          'Chi phí tính từ mức giá bạn nhập',
        ],
        note: 'Hiện chỉ hỗ trợ một mẫu ổ cắm, và nó phù hợp với ổ điện Bắc Mỹ. Ổ cắm cho các khu vực khác được bổ sung dưới dạng tích hợp.',
      },
      rs485: {
        title: 'Công nghiệp có dây: RS-485 / Modbus RTU',
        body: 'Dành cho các thiết bị đo và bộ điều khiển đã có sẵn trong nhà xưởng của bạn. Tùy chọn Modbus TCP qua Ethernet.',
        items: [
          'Đồng hồ đo điện năng và công suất, đồng hồ đo lưu lượng',
          'Bộ truyền tín hiệu mức và áp suất',
          'Tín hiệu 4–20 mA và 0–10 V, thông qua bộ chuyển đổi',
          'PLC và bộ điều khiển, thiết bị HVAC và BMS',
        ],
        note: 'Adapter Modbus của gateway chưa được xây dựng. Thiết bị có dây được cung cấp dưới dạng tích hợp, được xây dựng và kiểm thử trên chính thiết bị của bạn. Chỉ giám sát: VexaOs đọc giá trị và không điều khiển thiết bị.',
      },
      footer: 'Một mô hình dữ liệu, một ứng dụng. Không dây hay có dây, mọi số đo đều có cùng lịch sử, cảnh báo và thông tin phân tích.',
    },
    families: {
      environment: {
        name: 'Môi trường',
        value: 'Nắm rõ điều kiện trong mọi căn phòng.',
        measurements: ['Nhiệt độ', 'Độ ẩm', 'Áp suất khí quyển', 'Chất lượng không khí (CO₂, VOC, PM2.5)', 'Ánh sáng', 'Tiếng ồn'],
        use: 'Phòng lưu trữ, khu làm việc, phòng máy chủ nhỏ và văn phòng.',
        detail:
          'Nhiệt độ, độ ẩm và áp suất đã hoạt động hiện nay, kèm lịch sử, quy tắc cảnh báo, phát hiện độ trôi và dự báo thời gian chạm ngưỡng. Chất lượng không khí, ánh sáng và tiếng ồn được bổ sung thông qua adapter; hãy cho chúng tôi biết bạn cần loại nào.',
      },
      'cold-chain': {
        name: 'Chuỗi lạnh & an toàn thực phẩm',
        value: 'Phát hiện kho mát đang ấm lên trước khi mất hàng.',
        measurements: [
          'Nhiệt độ không khí trong kho mát và tủ đông',
          'Cửa kho mát bị để hé',
          'Nhật ký nhiệt độ có xuất CSV',
          'Đầu dò cho cấp đông sâu',
          'Đầu dò nhiệt độ giữ thực phẩm',
        ],
        use: 'Kho mát, tủ mát, tủ đông, tủ lạnh bảo quản thuốc và dây chuyền sơ chế.',
        detail:
          'Nhiệt độ không khí bên trong kho mát và tủ đông, đánh dấu cửa để hé và nhật ký có thể xuất ra đã hoạt động hiện nay. Nhật ký cung cấp giá trị thấp nhất, trung bình và cao nhất hằng ngày để hỗ trợ hồ sơ theo kiểu HACCP của riêng bạn; VexaOs không phải là một chứng nhận an toàn thực phẩm. Đầu dò có dây cho nhiệt độ cấp đông sâu và nhiệt độ giữ thực phẩm được bổ sung thông qua adapter.',
      },
      'access-occupancy': {
        name: 'Ra vào & mức độ sử dụng không gian',
        value: 'Biết cái gì đã mở, khi nào, và trong bao lâu.',
        measurements: [
          'Tiếp điểm cửa ra vào và cửa sổ',
          'Chuyển động và độ nghiêng của cảm biến',
          'Chuyển động (PIR)',
          'Sự hiện diện và đếm người',
          'Nút khẩn cấp và nút gọi',
        ],
        use: 'Cửa phòng lạnh, cửa bến hàng, kho hàng và kiểm tra trong giờ vắng.',
        detail:
          'Cảm biến tiếp điểm báo mọi lần mở và đóng ngay khi xảy ra, kèm số lần mở hôm nay, lần mở lâu nhất và dòng thời gian. Các phát hiện về giờ bất thường và cửa bị để mở đi kèm theo đó. Cảm biến chuyển động, sự hiện diện và các nút bấm được bổ sung thông qua adapter. VexaOs không phải là hệ thống an ninh hay ứng phó khẩn cấp.',
      },
      'water-leak': {
        name: 'Nước & rò rỉ',
        value: 'Tìm ra chỗ rò khi nó mới chỉ là một vũng nước.',
        measurements: ['Điểm rò rỉ và ngập nước', 'Lưu lượng và mức sử dụng nước', 'Bồn chứa và mức chất lỏng'],
        use: 'Phòng kỹ thuật, dưới bồn rửa và thiết bị, tầng hầm và bồn chứa.',
        detail:
          'Chưa có gì trong nhóm này hoạt động hiện nay. Cảm biến điểm rò rỉ không dây, cùng đồng hồ lưu lượng và bộ truyền tín hiệu mức có dây qua RS-485 / Modbus, được bổ sung thông qua adapter và sẽ dùng chung cảnh báo, lịch sử và ứng dụng như mọi cảm biến khác.',
      },
      'machine-health': {
        name: 'Tình trạng máy móc',
        value: 'Nhận ra máy sắp hỏng qua cách nó vận hành.',
        measurements: [
          'Độ rung: vận tốc, độ dịch chuyển, tần số',
          'Nhiệt độ ổ trục và động cơ',
          'Độ nghiêng và hướng',
          'Thời gian chạy và số chu kỳ',
          'Dòng điện tiêu thụ (kẹp dòng CT)',
        ],
        use: 'Động cơ, máy bơm, quạt, máy nén và băng tải.',
        detail:
          'Cảm biến độ rung đầu tiên của chúng tôi đang được tích hợp: vận tốc, độ dịch chuyển và tần số trên ba trục, kèm nhiệt độ và góc, được tổng hợp trên gateway. Hiện chưa có sẵn. Thời gian chạy, đếm chu kỳ và kẹp dòng sẽ tiếp nối thông qua adapter, không dây hoặc có dây qua RS-485 / Modbus.',
      },
      'industrial-process': {
        name: 'Quy trình công nghiệp',
        value: 'Đưa các thiết bị đo bạn đã có lên cùng một màn hình.',
        measurements: [
          'Bộ truyền tín hiệu áp suất',
          'Đồng hồ đo lưu lượng',
          'Mức trong bồn và bình chứa',
          'Đầu vào analog (4–20 mA, 0–10 V qua bộ chuyển đổi)',
          'Thanh ghi của PLC và bộ điều khiển',
        ],
        use: 'Dây chuyền công nghệ, trạm bơm, hệ thống lò hơi và chiller, HVAC và BMS.',
        detail:
          'Chưa có gì trong nhóm này hoạt động hiện nay. Các thiết bị đo này kết nối bằng dây qua RS-485 / Modbus RTU, với Modbus TCP qua Ethernet là một tùy chọn. Adapter Modbus của gateway chưa được xây dựng; chúng tôi xây dựng nó trên chính thiết bị của bạn dưới dạng tích hợp. Chỉ giám sát: VexaOs đọc giá trị và không điều khiển thiết bị.',
      },
      energy: {
        name: 'Năng lượng',
        value: 'Biết thứ gì đang chạy và bạn tốn bao nhiêu cho nó.',
        measurements: [
          'Công suất (W) và điện năng (kWh) qua ổ cắm thông minh',
          'Chi phí theo giá theo mùa và theo khung giờ',
          'Phát hiện điện tiêu thụ ở chế độ chờ',
          'Phân tích chi phí theo từng thiết bị',
          'Đồng hồ đo điện cho tủ điện và mạch nhánh (RS-485)',
        ],
        use: 'Tủ lạnh, máy pha cà phê, lò nướng, máy nén, máy chủ và thiết bị văn phòng.',
        detail:
          'Ổ cắm thông minh Wi-Fi đã hoạt động hiện nay: công suất hiện tại, kWh, và chi phí hôm nay, tuần này và tháng này cho từng thiết bị. Bạn nhập giá điện của riêng mình (giá cố định, theo mùa, hoặc theo mùa với giờ cao điểm và thấp điểm), và nền tảng đánh dấu những thiết bị vẫn tiêu thụ điện khi không hoạt động. Chi phí là ước tính dựa trên mức giá bạn nhập, không phải hóa đơn tiền điện. Hiện chỉ hỗ trợ một mẫu ổ cắm và nó phù hợp với ổ điện Bắc Mỹ. Đồng hồ đo cho tủ điện và mạch nhánh qua RS-485 / Modbus được bổ sung dưới dạng tích hợp.',
      },
      'assets-tracking': {
        name: 'Tài sản & theo dõi vị trí',
        value: 'Biết gateway nào nghe thấy thiết bị của bạn lần gần nhất.',
        measurements: [
          'Thẻ tài sản và beacon Bluetooth',
          'Vị trí được ghi nhận lần cuối',
          'Khi vận chuyển, với Mobile Gateway (sắp ra mắt)',
        ],
        use: 'Xe đẩy, thùng chứa, dụng cụ và hàng hóa di chuyển giữa các cơ sở.',
        detail:
          'Các gateway vốn đã nghe được thiết bị Bluetooth xung quanh; việc biến điều đó thành theo dõi tài sản được bổ sung thông qua adapter. Việc theo dõi giữa các cơ sở phụ thuộc vào Mobile Gateway, hiện sắp ra mắt.',
      },
      safety: {
        name: 'An toàn',
        value: 'Thêm một đôi mắt theo dõi bầu không khí bạn không nhìn thấy được.',
        measurements: ['Khí carbon monoxide (CO)', 'Khí metan và khí dễ cháy', 'Các chỉ báo liên quan đến khói'],
        use: 'Bếp, phòng kỹ thuật, gara và phòng ắc quy.',
        detail:
          'Chưa có gì trong nhóm này hoạt động hiện nay. Cảm biến khí có thể được bổ sung thông qua adapter, chỉ nhằm mục đích nắm tình hình và theo dõi xu hướng. VexaOs không phải là hệ thống an toàn sinh mạng, không có chứng nhận an toàn sinh mạng nào, và tuyệt đối không được dùng thay cho các thiết bị báo khói, báo cháy hoặc báo rò khí mà quy chuẩn bắt buộc.',
      },
    },
  },
};
