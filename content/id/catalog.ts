/**
 * Products, industries and the sensor catalog (Indonesian draft).
 *
 * Structure (slugs, icons, statuses, connectivity) lives in lib/site.ts and
 * lib/sensors.ts. This file holds only the words, keyed by slug, and array
 * items line up by position with those registries.
 *
 * HONESTY RULES: only claim what the product does today; no customers,
 * statistics, certifications, sensor vendor names or specifications.
 */
// MACHINE DRAFT (id): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.
export const catalog = {
  products: {
    sensors: {
      name: 'Sensor',
      short: 'Sensor',
      role: 'Mengukur',
      summary:
        'Sembilan kelompok sensor, nirkabel dan berkabel. Sensor Bluetooth untuk suhu, kelembapan, tekanan, dan pintu serta smart plug Wi-Fi sudah berfungsi saat ini; sisanya, termasuk RS-485 / Modbus, ditambahkan melalui adapter.',
    },
    'edge-gateway': {
      name: 'VexaOs Edge Gateway',
      short: 'Edge Gateway',
      role: 'Mengumpulkan',
      summary:
        'Menangkap data dari sensor dan smart plug di sekitarnya, memeriksa aturan alarm di lokasi, dan menyimpan setiap pembacaan selama gangguan internet dan restart.',
    },
    'mobile-gateway': {
      name: 'VexaOs Mobile Gateway',
      short: 'Mobile Gateway',
      role: 'Mengumpulkan saat bergerak',
      summary: 'Gateway yang sama untuk tempat tanpa listrik atau jaringan tetap: kendaraan, trailer, dan lokasi sementara.',
    },
    'cloud-ai-insights': {
      name: 'VexaOs Cloud & AI Insights',
      short: 'Cloud & AI Insights',
      role: 'Memahami',
      summary:
        'Menyimpan riwayat, menjalankan aturan peringatan, menghitung biaya pemakaian energi Anda, serta menandai drift, prakiraan waktu menuju batas, dan aktivitas pintu yang tidak biasa dalam bahasa Inggris yang mudah dipahami.',
    },
    apps: {
      name: 'VexaOs Apps',
      short: 'Aplikasi',
      role: 'Bertindak',
      summary: 'Satu akun di web, iOS, dan Android: dashboard langsung, peringatan, analitik, energi, banyak site, dan peran tim.',
    },
  },

  industries: {
    'food-service-cold-chain': {
      name: 'Layanan makanan & rantai dingin',
      short: 'Makanan & rantai dingin',
      headline: 'Pastikan pendingin Anda tetap dingin sebelum makanan terbuang.',
      summary:
        'Ruang pendingin (walk-in), lemari pendingin, freezer, dan area persiapan, dipantau sepanjang waktu. Lihat pendingin yang mulai menghangat berjam-jam sebelum mencapai batasnya, dan ketahui saat itu juga ketika sebuah pintu dibiarkan terbuka.',
      monitor: [
        { title: 'Ruang pendingin dan freezer walk-in', body: 'Suhu dan kelembapan setiap beberapa detik, diringkas dan ditampilkan dalam grafik per jam, hari, dan bulan.' },
        { title: 'Pintu pendingin dan freezer', body: 'Setiap buka dan tutup dicatat saat itu juga, dengan tanda ketika pintu tetap terbuka.' },
        { title: 'Area persiapan dan penyimpanan kering', body: 'Suhu dan kelembapan ruangan, dengan peringatan ketika keluar dari rentang yang Anda tetapkan.' },
      ],
      how: [
        { title: 'Peringatan sebelum batas tercapai', body: 'Ketika tren sebuah pendingin mengarah ke batas peringatannya, prakiraan menunjukkan berapa jam yang tersisa pada laju saat ini.' },
        { title: 'Pembacaan tetap aman saat gangguan', body: 'Jika internet terputus, gateway terus merekam dan mengunggah semuanya begitu koneksi kembali.' },
        { title: 'Catatan yang dapat Anda ekspor', body: 'Nilai minimum, rata-rata, dan maksimum harian untuk setiap sensor, dengan ekspor CSV untuk catatan Anda sendiri.' },
      ],
      note: 'VexaOs mencatat kondisi dan memberi peringatan. VexaOs tidak menggantikan rencana keamanan pangan Anda, dan tidak memiliki sertifikasi keamanan pangan apa pun.',
    },
    'warehouses-logistics': {
      name: 'Gudang & logistik',
      short: 'Gudang',
      headline: 'Setiap zona penyimpanan dan pintu dok, dalam satu layar.',
      summary:
        'Suhu dan kelembapan di seluruh zona penyimpanan, serta catatan lengkap kapan pintu dibuka dan berapa lama, di setiap bangunan yang Anda kelola.',
      monitor: [
        { title: 'Zona penyimpanan', body: 'Suhu dan kelembapan per lokasi, dengan setiap site, ruangan, dan peralatan dinamai sesuai cara Anda menamainya.' },
        { title: 'Pintu dok dan ruang pendingin', body: 'Jumlah pembukaan hari ini, pembukaan terlama, dan linimasa setiap kejadian, ditambah tanda untuk pembukaan pada jam yang tidak biasa.' },
        { title: 'Barang dalam perjalanan', body: 'Gateway bertenaga baterai untuk kendaraan dan trailer.' },
      ],
      how: [
        { title: 'Banyak site, satu akun', body: 'Berpindah antarlokasi atau melihat semuanya sekaligus. Setiap orang hanya melihat site tempat mereka terdaftar.' },
        { title: 'Bandingkan zona', body: 'Sandingkan sensor di Analitik untuk menemukan zona yang cenderung hangat atau lembap.' },
        { title: 'Ketahui saat peralatan berhenti melapor', body: 'Sensor yang berhenti melapor, baterai lemah, atau sinyal lemah masing-masing memunculkan temuannya sendiri.' },
      ],
      note: 'Pemantauan dalam perjalanan bergantung pada Mobile Gateway, yang belum tersedia.',
    },
    'manufacturing-machine-health': {
      name: 'Manufaktur & kesehatan mesin',
      short: 'Manufaktur',
      headline: 'Pantau kondisi di sekitar mesin Anda hari ini. Getaran menyusul berikutnya.',
      summary:
        'Pantau suhu dan kelembapan area produksi, ruang listrik, dan panel sekarang. Pemantauan getaran untuk peralatan berputar sedang diintegrasikan.',
      monitor: [
        { title: 'Area produksi dan penyimpanan', body: 'Suhu dan kelembapan di tempat bahan dan barang jadi peka terhadap salah satu dari keduanya.' },
        { title: 'Panel dan ruang peralatan', body: 'Panas yang menumpuk di dalam kabinet atau ruangan terlihat sebagai temuan drift jauh sebelum batas tetap terlampaui.' },
        { title: 'Getaran pada peralatan berputar', body: 'Kecepatan, perpindahan, dan frekuensi pada tiga sumbu, diringkas di gateway.' },
      ],
      how: [
        { title: 'Drift, bukan hanya batas', body: 'Kenaikan yang terus-menerus selama enam jam ditandai meskipun pembacaan masih berada dalam rentang yang diizinkan.' },
        { title: 'Aturan diperiksa di lokasi', body: 'Aturan alarm berjalan di gateway, sehingga alarm tetap dimunculkan meskipun cloud tidak dapat dijangkau.' },
        { title: 'Dirancang untuk menambah jenis sensor', body: 'Setiap jenis sensor adalah sebuah adapter. Jenis baru ditambahkan tanpa mengubah gateway, cloud, atau aplikasi di sekitarnya.' },
      ],
      note: 'Pemantauan getaran dan kesehatan mesin sedang diintegrasikan dan belum tersedia saat ini. Instrumen pabrik berkabel melalui RS-485 / Modbus diberikan sebagai integrasi. Kami akan memberi tahu Anda posisi masing-masing ketika Anda menghubungi kami.',
    },
    'facilities-property': {
      name: 'Fasilitas & properti',
      short: 'Fasilitas',
      headline: 'Awasi ruangan yang tidak ditunggui siapa pun.',
      summary:
        'Ruang mesin, ruang server kecil, unit penyimpanan, dan ruang kosong: suhu, kelembapan, pintu, dan peralatan yang tercolok, di seluruh portofolio bangunan.',
      monitor: [
        { title: 'Ruang mesin dan ruang server', body: 'Suhu yang naik ditandai sebagai tren, dengan prakiraan bila sebuah batas telah ditetapkan.' },
        { title: 'Lembap dan kelembapan', body: 'Suhu dan kelembapan yang naik bersamaan disorot sebagai temuan tersendiri.' },
        { title: 'Pintu dan titik akses', body: 'Catatan setiap pembukaan, dengan tanda untuk aktivitas pada jam yang biasanya sepi.' },
      ],
      how: [
        { title: 'Tertata seperti portofolio Anda', body: 'Site, lokasi di dalam site, dan peralatan, dengan sensor ditempatkan pada masing-masing.' },
        { title: 'Peran untuk staf dan kontraktor', body: 'Peran pemilik (owner), admin, pemasang (installer), dan pengamat (viewer) menentukan siapa yang dapat mengubah aturan dan siapa yang hanya dapat melihat.' },
        { title: 'Berapa biaya peralatan yang tercolok', body: 'Smart plug menampilkan daya, kWh, dan biaya per peralatan, serta menandai peralatan yang menarik daya saat tidak digunakan.' },
      ],
      note: 'VexaOs memantau kondisi. VexaOs bukan sistem keamanan atau kontrol akses.',
    },
    'healthcare-pharma-storage': {
      name: 'Penyimpanan layanan kesehatan & farmasi',
      short: 'Kesehatan & farmasi',
      headline: 'Catatan suhu berkelanjutan untuk lemari pendingin yang penting.',
      summary:
        'Pemantauan suhu dan kelembapan berkelanjutan untuk lemari pendingin obat, freezer, dan ruang penyimpanan, dengan peringatan dan riwayat yang dapat Anda ekspor.',
      monitor: [
        { title: 'Lemari pendingin obat dan freezer', body: 'Pembacaan sepanjang waktu, dengan aturan peringatan yang Anda tetapkan per sensor.' },
        { title: 'Ruang penyimpanan', body: 'Suhu dan kelembapan ruangan dengan nilai minimum, rata-rata, dan maksimum harian.' },
        { title: 'Pintu lemari pendingin dan ruangan', body: 'Setiap pembukaan dicatat, dengan tanda ketika pintu dibiarkan terbuka.' },
      ],
      how: [
        { title: 'Peringatan dini', body: 'Prakiraan menunjukkan jam yang tersisa sebelum sebuah batas tercapai pada laju perubahan saat ini.' },
        { title: 'Tanpa celah data akibat gangguan', body: 'Gateway menyimpan pembacaan secara lokal dan mengunggahnya begitu koneksi kembali.' },
        { title: 'Konfirmasi dan selesaikan', body: 'Peringatan menyimpan riwayat siapa yang mengonfirmasi dan menyelesaikannya, serta kapan.' },
      ],
      note: 'VexaOs adalah alat pemantauan. VexaOs bukan alat kesehatan dan tidak memiliki validasi atau sertifikasi regulasi apa pun (misalnya 21 CFR Part 11 atau GxP). Periksa persyaratan kepatuhan Anda sendiri sebelum mengandalkannya untuk catatan yang diatur regulasi.',
    },
  },

  restaurantOs: {
    name: 'Restaurant OS',
    summary:
      'Solusi VexaOs Hospitality yang terpisah untuk mengelola restoran: area lantai, layar dapur, dan pesanan dalam satu pusat kendali. Mendekati tahap pilot.',
    card: 'Solusi hospitality kami untuk mengelola restoran, berdampingan dengan platform pemantauan.',
  },

  sensors: {
    statusLabel: {
      now: 'Tersedia sekarang',
      integrating: 'Sedang diintegrasikan',
      integration: 'Melalui integrasi',
    },
    statusHelp: {
      now: 'Berfungsi di platform saat ini.',
      integrating: 'Adapter sedang dibuat sekarang. Belum tersedia.',
      integration: 'Belum dibuat. Kami menambahkannya melalui adapter ketika pelanggan membutuhkannya.',
    },
    connectivityName: {
      ble: 'Bluetooth Low Energy (nirkabel)',
      wifi: 'Wi-Fi (nirkabel)',
      rs485: 'RS-485 / Modbus (berkabel)',
    },
    legend: {
      ble: 'Nirkabel, Bluetooth Low Energy',
      wifi: 'Nirkabel, smart plug Wi-Fi',
      rs485: 'Berkabel, RS-485 / Modbus (melalui integrasi)',
    },
    ui: {
      filterLabel: 'Saring kelompok sensor menurut industri',
      all: 'Semua industri',
      details: 'Detail',
      seeDetails: 'Lihat detail',
      hideDetails: 'Sembunyikan detail',
      typicalUse: 'Penggunaan umum:',
      more: '+{n} lainnya',
      fullCatalog: 'Lihat katalog sensor lengkap',
    },
    request: {
      title: 'Tidak menemukan sensor Anda?',
      body: 'Nirkabel atau berkabel, kami mengintegrasikannya. VexaOs netral terhadap vendor dan menambahkan sensor baru melalui adapter. Beri tahu kami apa yang perlu Anda ukur dan kami akan menyampaikan dengan terus terang apakah itu sudah berfungsi saat ini, sedang dikerjakan, atau perlu dibuat.',
      label: 'Tanyakan tentang sensor',
    },
    connectivity: {
      ble: {
        title: 'Nirkabel: Bluetooth Low Energy',
        body: 'Sensor bertenaga baterai tanpa perlu pemasangan kabel. Gateway menangkap setiap sensor dalam jangkauan.',
        items: [
          'Suhu, kelembapan, dan tekanan barometrik',
          'Kontak pintu dan jendela',
          'Pergerakan sensor, baterai, dan kekuatan sinyal',
          'Siaran sensor terenkripsi didukung',
        ],
      },
      wifi: {
        title: 'Nirkabel: smart plug Wi-Fi',
        body: 'Plug pengukur daya pada jaringan yang sama dengan gateway. Colokkan sebuah peralatan dan lihat berapa pemakaiannya.',
        items: [
          'Daya saat ini, dalam watt',
          'Energi terpakai, dalam kWh',
          'Status hidup, mati, dan beban berlebih',
          'Biaya dari tarif yang Anda masukkan',
        ],
        note: 'Satu model plug didukung saat ini, dan model itu cocok untuk stopkontak Amerika Utara. Plug untuk wilayah lain ditambahkan sebagai integrasi.',
      },
      rs485: {
        title: 'Industri berkabel: RS-485 / Modbus RTU',
        body: 'Untuk instrumen dan pengontrol yang sudah ada di lantai pabrik Anda. Modbus TCP melalui Ethernet tersedia sebagai opsi.',
        items: [
          'Meter energi dan daya, flow meter',
          'Transmitter level dan tekanan',
          'Sinyal 4–20 mA dan 0–10 V, melalui konverter',
          'PLC dan pengontrol, peralatan HVAC dan BMS',
        ],
        note: 'Adapter Modbus pada gateway belum dibuat. Perangkat berkabel diberikan sebagai integrasi, dibuat dan diuji dengan peralatan Anda. Hanya pemantauan: VexaOs membaca nilai dan tidak mengendalikan peralatan.',
      },
      footer: 'Satu model data, satu aplikasi. Nirkabel atau berkabel, setiap pembacaan mendapatkan riwayat, peringatan, dan insight yang sama.',
    },
    families: {
      environment: {
        name: 'Lingkungan',
        value: 'Ketahui kondisi di setiap ruangan.',
        measurements: ['Suhu', 'Kelembapan', 'Tekanan barometrik', 'Kualitas udara (CO₂, VOC, PM2.5)', 'Cahaya', 'Kebisingan'],
        use: 'Ruang penyimpanan, area kerja, ruang server kecil, dan kantor.',
        detail:
          'Suhu, kelembapan, dan tekanan sudah berfungsi saat ini, dengan riwayat, aturan peringatan, deteksi drift, dan prakiraan waktu menuju batas. Kualitas udara, cahaya, dan kebisingan ditambahkan melalui adapter; beri tahu kami mana yang Anda butuhkan.',
      },
      'cold-chain': {
        name: 'Rantai dingin & keamanan pangan',
        value: 'Ketahui pendingin yang menghangat sebelum stok terbuang.',
        measurements: [
          'Suhu udara pendingin dan freezer',
          'Pintu pendingin tidak tertutup rapat',
          'Log suhu dengan ekspor CSV',
          'Probe deep-freeze',
          'Probe suhu penyimpanan makanan siap saji',
        ],
        use: 'Ruang pendingin walk-in, lemari pendingin, freezer, lemari pendingin obat, dan lini persiapan.',
        detail:
          'Suhu udara di dalam pendingin dan freezer, tanda pintu tidak tertutup rapat, dan log yang dapat diekspor sudah berfungsi saat ini. Log tersebut memberi Anda nilai minimum, rata-rata, dan maksimum harian untuk mendukung catatan bergaya HACCP milik Anda sendiri; VexaOs bukan sertifikasi keamanan pangan. Probe berkabel untuk suhu deep-freeze dan suhu penyimpanan makanan siap saji ditambahkan melalui adapter.',
      },
      'access-occupancy': {
        name: 'Akses & okupansi',
        value: 'Lihat apa yang dibuka, kapan, dan berapa lama.',
        measurements: [
          'Kontak pintu dan jendela',
          'Pergerakan dan kemiringan sensor',
          'Gerakan (PIR)',
          'Okupansi dan penghitungan orang',
          'Tombol panik dan tombol panggil',
        ],
        use: 'Pintu ruang pendingin, pintu dok, ruang stok, dan pemeriksaan pada jam sepi.',
        detail:
          'Sensor kontak melaporkan setiap buka dan tutup saat itu juga, dengan jumlah pembukaan hari ini, pembukaan terlama, dan linimasa. Temuan jam tidak biasa dan pintu dibiarkan terbuka sudah termasuk. Gerakan, okupansi, dan tombol ditambahkan melalui adapter. VexaOs bukan sistem keamanan atau tanggap darurat.',
      },
      'water-leak': {
        name: 'Air & kebocoran',
        value: 'Temukan kebocoran selagi masih berupa genangan kecil.',
        measurements: ['Titik kebocoran dan banjir', 'Aliran dan pemakaian air', 'Tangki dan level'],
        use: 'Ruang mesin, di bawah wastafel dan peralatan, basemen, dan tangki.',
        detail:
          'Belum ada yang berfungsi dalam kelompok ini saat ini. Sensor titik kebocoran nirkabel, serta flow meter dan transmitter level berkabel melalui RS-485 / Modbus, ditambahkan melalui adapter dan akan menggunakan peringatan, riwayat, dan aplikasi yang sama seperti setiap sensor lainnya.',
      },
      'machine-health': {
        name: 'Kesehatan mesin',
        value: 'Kenali mesin yang mulai bermasalah dari cara kerjanya.',
        measurements: [
          'Getaran: kecepatan, perpindahan, frekuensi',
          'Suhu bearing dan motor',
          'Kemiringan dan orientasi',
          'Waktu operasi dan siklus',
          'Tarikan arus (klem CT)',
        ],
        use: 'Motor, pompa, kipas, kompresor, dan konveyor.',
        detail:
          'Sensor getaran pertama kami sedang diintegrasikan sekarang: kecepatan, perpindahan, dan frekuensi tiga sumbu, dengan suhu dan sudut, diringkas di gateway. Sensor ini belum tersedia. Waktu operasi, penghitungan siklus, dan klem arus menyusul melalui adapter, nirkabel atau berkabel melalui RS-485 / Modbus.',
      },
      'industrial-process': {
        name: 'Proses industri',
        value: 'Tampilkan instrumen yang sudah Anda miliki dalam satu layar.',
        measurements: [
          'Transmitter tekanan',
          'Flow meter',
          'Level tangki dan bejana',
          'Input analog (4–20 mA, 0–10 V melalui konverter)',
          'Register PLC dan pengontrol',
        ],
        use: 'Lini proses, stasiun pompa, instalasi boiler dan chiller, HVAC dan BMS.',
        detail:
          'Belum ada yang berfungsi dalam kelompok ini saat ini. Instrumen ini terhubung dengan kabel melalui RS-485 / Modbus RTU, dengan Modbus TCP melalui Ethernet sebagai opsi. Adapter Modbus pada gateway belum dibuat; kami membuatnya dengan peralatan Anda sebagai integrasi. Hanya pemantauan: VexaOs membaca nilai dan tidak mengendalikan peralatan.',
      },
      energy: {
        name: 'Energi',
        value: 'Ketahui apa yang sedang menyala dan berapa biayanya bagi Anda.',
        measurements: [
          'Daya (W) dan energi (kWh) smart plug',
          'Biaya dengan tarif musiman dan tarif berdasarkan waktu pemakaian',
          'Deteksi konsumsi daya siaga (standby)',
          'Rincian biaya per peralatan',
          'Meter daya panel dan sirkuit (RS-485)',
        ],
        use: 'Lemari pendingin, mesin kopi, oven, kompresor, server, dan peralatan kantor.',
        detail:
          'Smart plug Wi-Fi sudah berfungsi saat ini: daya saat ini, kWh, dan biaya hari ini, minggu ini, dan bulan ini untuk setiap peralatan. Anda memasukkan tarif listrik Anda sendiri (tetap, per musim, atau per musim dengan jam beban puncak dan luar beban puncak), dan platform menandai peralatan yang terus menarik daya saat tidak digunakan. Biaya adalah estimasi dari tarif yang Anda masukkan, bukan tagihan listrik dari penyedia listrik. Satu model plug didukung saat ini dan model itu cocok untuk stopkontak Amerika Utara. Meter panel dan sirkuit melalui RS-485 / Modbus ditambahkan sebagai integrasi.',
      },
      'assets-tracking': {
        name: 'Aset & pelacakan',
        value: 'Ketahui gateway mana yang terakhir menangkap sinyal peralatan Anda.',
        measurements: [
          'Tag aset dan beacon Bluetooth',
          'Lokasi terakhir terdeteksi',
          'Dalam perjalanan, dengan Mobile Gateway (segera hadir)',
        ],
        use: 'Troli, kontainer, perkakas, dan muatan yang berpindah antar-site.',
        detail:
          'Gateway sudah menangkap perangkat Bluetooth di sekitarnya; mengubahnya menjadi pelacakan aset ditambahkan melalui adapter. Pelacakan antar-site bergantung pada Mobile Gateway, yang segera hadir.',
      },
      safety: {
        name: 'Keselamatan',
        value: 'Sepasang mata tambahan untuk udara yang tidak dapat Anda lihat.',
        measurements: ['Karbon monoksida (CO)', 'Metana dan gas mudah terbakar', 'Indikator terkait asap'],
        use: 'Dapur, ruang mesin, garasi, dan ruang baterai.',
        detail:
          'Belum ada yang berfungsi dalam kelompok ini saat ini. Sensor gas dapat ditambahkan melalui adapter hanya untuk kewaspadaan dan pemantauan tren. VexaOs bukan sistem keselamatan jiwa, tidak memiliki sertifikasi keselamatan jiwa, dan tidak boleh sekali pun menggantikan alarm asap, kebakaran, atau gas yang diwajibkan oleh peraturan.',
      },
    },
  },
};
