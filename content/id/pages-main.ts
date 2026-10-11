import type { Page } from '@/lib/i18n/types';

// MACHINE DRAFT (id): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.

/**
 * Main pages (Indonesian draft). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const home: Page = {
  meta: {
    title: 'VexaOs: Pantau Apa Saja, di Mana Saja',
    description:
      'VexaOs adalah platform pemantauan yang netral terhadap vendor: sensor nirkabel dan smart plug, Edge Gateway yang aman saat offline, VexaOs Cloud dengan AI Insights, serta aplikasi untuk web, iOS, dan Android.',
  },
  hero: {
    eyebrow: 'Platform pemantauan yang netral terhadap vendor',
    title: 'Pantau apa saja, [[di mana saja.]]',
    subtitle:
      'Sensor nirkabel, Edge Gateway yang terus merekam saat internet terputus, cloud yang mendeteksi masalah lebih awal, serta aplikasi untuk web, iOS, dan Android. Satu platform, untuk industri apa pun.',
    ctas: [
      { label: 'Jadwalkan demo', href: '/contact', variant: 'primary' },
      { label: 'Lihat cara kerjanya', href: '/platform', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'heroShots',
      caption: 'Dashboard web VexaOs. Tangkapan layar asli dari site uji kami: dua sensor, satu gateway, tanpa data contoh.',
    },
    {
      type: 'stack',
      id: 'stack',
      eyebrow: 'Platform',
      title: 'Empat lapisan. Satu sistem.',
      subtitle:
        'Setiap lapisan mengerjakan satu tugas dan meneruskannya ke lapisan berikutnya, sehingga pembacaan yang diambil di dalam freezer berakhir sebagai peringatan di genggaman seseorang.',
      link: { label: 'Cara kerja platform', href: '/platform' },
    },
    {
      type: 'sensors',
      id: 'sensors',
      tinted: true,
      compact: true,
      eyebrow: 'Kelompok sensor',
      title: 'Jauh lebih dari sekadar termometer.',
      subtitle:
        'Sembilan kelompok sensor, nirkabel dan berkabel, dalam satu platform. Hijau berarti sudah berfungsi saat ini; sisanya kami tambahkan melalui adapter.',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Dibuat untuk dunia nyata',
      title: 'Pemantauan yang tetap bekerja ketika ada yang tidak beres.',
      subtitle: 'Jaringan terputus, listrik berkedip, dan baterai melemah. Platform ini dirancang untuk hari-hari seperti itu.',
      items: [
        { icon: 'gateway', title: 'Aman saat offline', body: 'Gateway menulis setiap pembacaan ke penyimpanannya sendiri dan mengunggahnya, satu kali dan berurutan, ketika koneksi kembali.' },
        { icon: 'plug', title: 'Pulih sendiri', body: 'Watchdog memulai ulang radio atau layanan yang macet dan berupaya memulihkan jaringan, tanpa perlu ada orang di lokasi.' },
        { icon: 'door', title: 'Kejadian pintu seketika', body: 'Pintu yang dibuka atau ditutup dikirim saat itu juga. Tidak menunggu ringkasan berikutnya.' },
        { icon: 'cloud', title: 'Peringatan dini', body: 'Deteksi drift dan prakiraan waktu menuju batas menandai masalah selagi masih ada waktu untuk bertindak.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'VexaOs Cloud & AI Insights',
      title: 'Platform memberi tahu Anda apa yang berubah, dan apa yang perlu diperiksa.',
      body: 'Setiap 30 menit cloud memeriksa setiap sensor untuk mencari pola yang biasanya mendahului kegagalan. Temuan dihitung dari pengukuran Anda, dan masing-masing menyertakan angka yang mendasarinya.',
      checks: [
        '**Deteksi drift.** Kenaikan atau penurunan yang terus-menerus selama enam jam, ditandai sebelum batas terlampaui.',
        '**Prakiraan waktu menuju batas.** Berapa jam lagi sampai sebuah sensor mencapai batas peringatannya pada laju saat ini.',
        '**Pola pintu.** Dibiarkan terbuka, dibuka pada jam yang tidak biasa, atau terbuka jauh lebih lama dari biasanya.',
        '**Penjelasan dalam bahasa Inggris yang mudah dipahami.** Apa yang terjadi, kemungkinan penyebabnya, dan apa yang perlu dilakukan, selalu ditampilkan di samping angka hasil pengukuran.',
      ],
      shot: 'doorActivity',
      link: { label: 'Selengkapnya tentang Cloud & AI Insights', href: '/products/cloud-ai-insights' },
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Energi',
      title: 'Lihat berapa biaya pengoperasian setiap peralatan.',
      subtitle: 'Colokkan sebuah peralatan ke smart plug, lalu daya, energi, dan biayanya muncul di samping sensor Anda yang lain.',
      items: [
        { icon: 'energy', title: 'Pemantauan smart plug', status: 'available', body: 'Plug pengukur daya Wi-Fi melaporkan daya saat ini dan energi terpakai, peralatan demi peralatan.' },
        { icon: 'cloud', title: 'Tarif Anda yang sebenarnya', status: 'available', body: 'Masukkan tarif tetap, tarif per musim, atau tarif beban puncak dan luar beban puncak per musim. Biaya mengikuti tarif yang berlaku pada hari itu.' },
        { icon: 'plug', title: 'Konsumsi daya siaga', status: 'available', body: 'Peralatan yang terus menarik daya saat tidak digunakan ditandai sebagai temuan.' },
        { icon: 'apps', title: 'Biaya per peralatan', status: 'available', body: 'Rincian biaya per peralatan dan area, penyumbang biaya terbesar, serta proyeksi satu bulan.' },
      ],
      note: {
        body: 'Biaya adalah estimasi dari tarif yang Anda masukkan, bukan tagihan listrik dari penyedia listrik. Satu model smart plug didukung saat ini dan model itu cocok untuk stopkontak Amerika Utara; plug untuk wilayah lain, serta meter panel melalui RS-485 / Modbus, ditambahkan sebagai integrasi.',
      },
      link: { label: 'Energi di katalog sensor', href: '/products/sensors#energy' },
    },
    {
      type: 'industries',
      id: 'industries',
      tinted: true,
      eyebrow: 'Solusi',
      title: 'Satu platform, banyak tempat untuk menggunakannya.',
      subtitle: 'Sensor, gateway, cloud, dan aplikasi yang sama, diterapkan pada apa yang perlu Anda pantau.',
    },
    {
      type: 'split',
      flip: true,
      eyebrow: 'Netral terhadap vendor',
      title: 'Tidak terikat pada satu merek sensor.',
      body: 'Setiap jenis sensor terhubung ke gateway melalui adapter yang mengubah pembacaannya menjadi satu format umum. Cloud dan aplikasi tidak pernah perlu tahu siapa pembuat sensornya.',
      checks: [
        'Tambahkan jenis sensor baru tanpa mengganti gateway atau mengubah aplikasi Anda.',
        'Setiap pembacaan disimpan dalam satuan standar, apa pun yang dilaporkan sensor.',
        'Format data yang tidak dikenal ditolak, tidak pernah ditebak.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Kondisi saat ini',
      title: 'Apa yang sudah berfungsi saat ini, dan apa yang akan datang.',
      subtitle: 'Kami lebih suka Anda mengetahuinya sekarang daripada baru mengetahuinya nanti.',
      items: [
        {
          title: 'Berfungsi saat ini',
          status: 'available',
          body: 'Sensor suhu, kelembapan, tekanan, dan pintu. Smart plug Wi-Fi dengan biaya energi. VexaOs Edge Gateway. VexaOs Cloud dengan AI Insights. Dashboard web serta aplikasi iOS dan Android, dengan notifikasi di ponsel.',
        },
        {
          title: 'Sedang dibangun',
          status: 'development',
          body: 'Sensor getaran dan kesehatan mesin sedang diintegrasikan. Perangkat RS-485 / Modbus berkabel diberikan sebagai integrasi. Peringatan lewat email sudah dibuat tetapi belum diaktifkan.',
        },
        {
          title: 'Mobile Gateway',
          status: 'soon',
          body: 'Gateway untuk kendaraan, trailer, dan lokasi tanpa listrik atau jaringan tetap. Masih direncanakan, belum dipasarkan.',
        },
      ],
    },
  ],
};

const platform: Page = {
  meta: {
    title: 'Platform: Cara Kerja VexaOs',
    description:
      'Cara kerja VexaOs: sensor dan smart plug melapor ke Edge Gateway yang aman saat offline, yang mengirim ringkasan dan alarm seketika ke VexaOs Cloud, tempat AI Insights serta aplikasi web, iOS, dan Android mengubahnya menjadi tindakan.',
  },
  hero: {
    eyebrow: 'Platform',
    title: 'Dari sensor di dinding hingga peringatan [[di genggaman Anda.]]',
    subtitle:
      'VexaOs terdiri atas empat lapisan yang bekerja sebagai satu sistem: sensor, gateway, cloud, dan aplikasi. Berikut tugas masing-masing, dan apa yang terjadi pada sebuah pembacaan di sepanjang perjalanannya.',
    ctas: [
      { label: 'Jadwalkan demo', href: '/contact', variant: 'primary' },
      { label: 'Lihat produk', href: '/products', variant: 'secondary' },
    ],
  },
  sections: [
    { type: 'stack' },
    {
      type: 'steps',
      tinted: true,
      eyebrow: 'Perjalanan sebuah pembacaan',
      title: 'Apa yang terjadi, langkah demi langkah.',
      items: [
        { title: 'Sensor mengambil pembacaan', body: 'Sensor bertenaga baterai menyiarkan suhu, kelembapan, atau status pintu melalui Bluetooth Low Energy setiap beberapa detik. Smart plug melapor melalui Wi-Fi. Perangkat RS-485 / Modbus berkabel bergabung melalui integrasi.' },
        { title: 'Gateway menangkapnya', body: 'VexaOs Edge Gateway menangkap setiap sensor dalam jangkauan, menguraikannya melalui adapter untuk jenis sensor tersebut, dan mengubahnya menjadi satu format umum.' },
        { title: 'Aturan diperiksa di lokasi', body: 'Aturan alarm berjalan di gateway itu sendiri. Batas yang terlampaui atau kejadian pintu langsung dikirim, mendahului semua yang lain dalam antrean.' },
        { title: 'Ringkasan dikirim ke cloud', body: 'Secara default gateway mengirim ringkasan per sensor setiap 10 detik: minimum, maksimum, rata-rata, dan nilai terbaru. Intervalnya dapat diatur per sensor.' },
        { title: 'Cloud mencari tanda masalah', body: 'VexaOs Cloud menyimpan riwayat dan memeriksa setiap sensor untuk drift, prakiraan, aktivitas pintu yang tidak biasa, baterai lemah, dan perangkat yang berhenti melapor.' },
        { title: 'Anda melihatnya dan bertindak', body: 'Dashboard diperbarui secara langsung di web, iOS, dan Android, dan peringatan sampai ke ponsel Anda. Peringatan dapat dikonfirmasi dan diselesaikan, dengan catatan siapa melakukan apa.' },
      ],
    },
    {
      type: 'sensors',
      id: 'sensors',
      compact: true,
      eyebrow: 'Kelompok sensor',
      title: 'Apa saja yang dapat ditangkap platform.',
      subtitle:
        'Sembilan kelompok sensor, nirkabel dan berkabel, dalam satu platform. Hijau berarti sudah berfungsi saat ini; sisanya kami tambahkan melalui adapter.',
    },
    {
      type: 'split',
      id: 'offline',
      tinted: true,
      eyebrow: 'Ketika internet terputus',
      title: 'Tidak ada yang hilang. Tidak ada yang terhitung dua kali.',
      body: 'Gateway tidak pernah berasumsi jaringan selalu tersedia. Pembacaan lebih dulu masuk ke antrean yang tahan lama di gateway, dan baru dihapus setelah cloud mengonfirmasi telah menerimanya.',
      checks: [
        'Pembacaan dan alarm tetap tersimpan selama gangguan internet dan restart gateway.',
        'Ketika koneksi kembali, alarm diunggah lebih dulu, lalu semua yang lain dari yang terlama hingga terbaru.',
        'Setiap pesan memiliki ID sendiri, sehingga pengiriman ulang tidak akan pernah menghasilkan duplikat.',
        'Alarm yang terbuka sebelum restart tetap terbuka setelahnya.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      id: 'vendor-neutral',
      cols: 3,
      eyebrow: 'Netral terhadap vendor sejak perancangan',
      title: 'Sensor terhubung melalui adapter.',
      subtitle:
        'Adapter adalah perangkat lunak kecil di gateway yang memahami satu jenis sensor. Semua yang ada setelahnya menggunakan satu format VexaOs.',
      items: [
        { icon: 'plug', title: 'Tambah jenis sensor seiring waktu', body: 'Mendukung jenis sensor baru berarti menambahkan sebuah adapter. Gateway, cloud, dan aplikasi tetap seperti semula.' },
        { icon: 'sensors', title: 'Satu format, satuan standar', body: 'Suhu, kelembapan, tekanan, daya, baterai, dan sinyal disimpan dalam satuan standar. Aplikasi mengonversinya untuk tampilan, misalnya °C atau °F.' },
        { icon: 'gateway', title: 'Tanpa menebak', body: 'Jika sebuah sensor mengirim format yang tidak dikenali adapter, pembacaan itu ditolak, bukan ditebak.' },
      ],
    },
    {
      type: 'cards',
      id: 'security',
      tinted: true,
      cols: 4,
      eyebrow: 'Keamanan dan akses',
      title: 'Setiap gateway membuktikan identitasnya. Setiap orang hanya melihat site miliknya.',
      items: [
        { title: 'Satu kunci per gateway', body: 'Setiap gateway memegang kunci perangkatnya sendiri dan masuk dengan kunci itu. Kunci tersebut tidak pernah meninggalkan gateway.' },
        { title: 'Terenkripsi saat dikirim', body: 'Gateway berkomunikasi dengan VexaOs Cloud melalui HTTPS dengan pemeriksaan sertifikat. Siaran sensor terenkripsi juga didukung.' },
        { title: 'Akses berdasarkan keanggotaan', body: 'Data dipisahkan menurut organisasi dan site. Setiap orang hanya melihat site tempat mereka telah ditambahkan.' },
        { title: 'Akun hanya melalui undangan', body: 'Akun dibuat melalui undangan, dengan peran pemilik (owner), admin, pemasang (installer), dan pengamat (viewer).' },
      ],
      note: {
        body: 'VexaOs saat ini tidak memiliki sertifikasi keamanan atau kepatuhan, seperti SOC 2 atau ISO 27001. Jika Anda memerlukan jaminan tertentu, tanyakan kepada kami dan kami akan menjawab dengan terus terang.',
      },
    },
  ],
};

const products: Page = {
  meta: {
    title: 'Produk',
    description:
      'Lini produk VexaOs: sensor nirkabel dan smart plug, VexaOs Edge Gateway, Mobile Gateway (segera hadir), VexaOs Cloud dengan AI Insights, serta aplikasi untuk web, iOS, dan Android.',
  },
  hero: {
    eyebrow: 'Produk',
    title: 'Semua yang ada di antara pembacaan [[dan keputusan.]]',
    subtitle: 'Lima produk yang dirancang bersama. Mulailah dengan satu site dan beberapa sensor, lalu tambahkan sesuai kebutuhan Anda.',
  },
  sections: [{ type: 'products' }],
};

const solutions: Page = {
  meta: {
    title: 'Solusi per Industri',
    description:
      'Cara VexaOs digunakan di berbagai industri: layanan makanan dan rantai dingin, gudang dan logistik, manufaktur, fasilitas dan properti, serta penyimpanan layanan kesehatan dan farmasi.',
  },
  hero: {
    eyebrow: 'Solusi',
    title: 'Satu platform. [[Industri Anda.]]',
    subtitle:
      'VexaOs tidak dibuat untuk satu jenis usaha saja. Sensor, gateway, cloud, dan aplikasi yang sama berlaku di mana pun suhu, kelembapan, pintu, atau sebuah peralatan itu penting.',
  },
  sections: [
    {
      type: 'solutions',
      other: {
        title: 'Kebutuhan lain?',
        body: 'Jika sesuatu memiliki suhu, kelembapan, pintu, atau colokan, kemungkinan besar platform ini dapat memantaunya. Beri tahu kami apa yang Anda pikirkan.',
        label: 'Hubungi kami',
      },
      restaurant: { eyebrow: 'Juga dari VexaOs', label: 'Lihat Restaurant OS' },
    },
  ],
};

/** Labels around an industry page; the industry's own words are in catalog.ts. */
const industry = {
  eyebrowPrefix: 'Solusi',
  metaTitleSuffix: 'Pemantauan',
  primary: 'Jadwalkan demo',
  secondary: 'Cara kerja platform',
  monitor: { eyebrow: 'Apa yang dipantau', title: 'Tempat platform ini paling bermanfaat.' },
  how: { eyebrow: 'Bagaimana VexaOs membantu', title: 'Platform ini, dalam penerapan.' },
  stack: { eyebrow: 'Susunan yang sama di mana pun', title: 'Apa yang akan Anda jalankan.' },
  restaurantLead: 'Mengelola restoran? Lihat',
  restaurantTail: ', solusi hospitality kami.',
};

const restaurantOs: Page = {
  meta: {
    title: 'Restaurant OS: VexaOs Hospitality',
    description:
      'Restaurant OS adalah solusi VexaOs Hospitality untuk mengelola restoran: area lantai, layar dapur, dan pesanan dalam satu pusat kendali. Mendekati tahap pilot.',
  },
  hero: {
    eyebrow: 'Solusi · VexaOs Hospitality',
    status: 'development',
    title: 'Restaurant OS: [[satu sistem untuk seluruh restoran.]]',
    subtitle:
      'Restaurant OS adalah solusi VexaOs yang terpisah untuk hospitality. Solusi ini menghubungkan area lantai, dapur, dan pesanan dalam satu pusat kendali. Restaurant OS mendekati tahap pilot dan belum tersedia secara umum.',
    ctas: [
      { label: 'Tanyakan tentang pilot', href: '/contact', variant: 'primary' },
      { label: 'Pemantauan rantai dingin', href: '/solutions/food-service-cold-chain', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Area depan (front of house)',
      title: 'Area lantai, secara langsung.',
      body: 'Setiap meja dan statusnya dalam satu tampilan, diperbarui saat host mendudukkan tamu dan meja dibersihkan.',
      checks: [
        'Meja per bagian, dengan jumlah kursi dan status saat ini.',
        'Jumlah meja tersedia, terisi, dan perlu dibersihkan dalam sekilas pandang.',
        'Manajer dapat menambah meja dan mengubah status secara manual.',
      ],
      shot: 'restaurantFloor',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Dapur',
      title: 'Tiket dari lini masak hingga meja saji (pass).',
      body: 'Layar dapur mencerminkan tiket yang sedang berjalan menurut tahapnya, sehingga pusat kendali menampilkan apa yang dilihat dapur.',
      checks: [
        'Sedang dimasak, siap diantar, dan sudah disajikan.',
        'Tiket makan di tempat, katering, dan pesan antar bersama-sama.',
        'Tandai tiket siap dan sudah disajikan dari pusat kendali.',
      ],
      shot: 'restaurantKitchen',
    },
    {
      type: 'note',
      note: {
        title: 'Kaitannya dengan platform pemantauan',
        body: 'Restaurant OS dan platform pemantauan VexaOs saat ini adalah produk yang terpisah. Sebuah restoran dapat menggunakan sensor dan gateway VexaOs untuk memantau pendingin dan pintunya tanpa Restaurant OS, dan begitu pula sebaliknya. Tangkapan layar di halaman ini menampilkan Restaurant OS yang berjalan dengan data demonstrasi, bukan restoran milik pelanggan.',
      },
      linkLead: 'Mencari pemantauan pendingin, freezer, dan pintu?',
      link: { label: 'Lihat layanan makanan dan rantai dingin', href: '/solutions/food-service-cold-chain' },
    },
  ],
  cta: {
    title: 'Tertarik dengan pilot Restaurant OS?',
    body: 'Ceritakan tentang restoran Anda dan kami akan menjelaskan sampai di mana Restaurant OS saat ini.',
  },
};

const about: Page = {
  meta: {
    title: 'Tentang VexaOs',
    description:
      'VexaOs membangun platform yang netral terhadap vendor untuk memantau apa saja, di mana saja: sensor, Edge Gateway yang aman saat offline, AI Insights di cloud, dan aplikasi. Berbasis di Pontiac, Michigan.',
  },
  hero: {
    eyebrow: 'Tentang',
    title: 'Kami membangun platform yang [[mengawasi hal-hal yang penting.]]',
    subtitle:
      'VexaOs adalah perusahaan teknologi yang berbasis di Pontiac, Michigan. Kami membuat platform yang netral terhadap vendor untuk memantau peralatan dan ruangan: sensor, gateway, cloud, dan aplikasi, yang dirancang sebagai satu sistem.',
  },
  sections: [
    {
      type: 'prose',
      paragraphs: [
        'Banyak hal yang menjadi tumpuan sebuah usaha terjadi di luar pandangan. Freezer menghangat pada malam hari. Pintu dibiarkan terbuka. Ruangan menjadi lembap. Biasanya seseorang baru mengetahuinya belakangan, ketika kerusakan sudah terjadi.',
        'VexaOs hadir untuk menutup celah itu. Kami mendahulukan bagian yang paling sulit: gateway yang terus merekam ketika jaringan gagal, dan cloud yang memperhatikan drift yang perlahan maupun batas yang terlampaui. Kemudian kami membangun aplikasi di atasnya, agar orang yang tepat melihatnya tepat waktu.',
        'Platform ini tidak terikat pada satu industri atau satu merek sensor. Layanan makanan, gudang, manufaktur, fasilitas, dan penyimpanan layanan kesehatan semuanya memiliki kebutuhan dasar yang sama, dan platform yang sama melayani masing-masing.',
      ],
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Cara kami bekerja',
      title: 'Apa yang dapat Anda harapkan dari kami.',
      items: [
        { title: 'Kami menyampaikan apa adanya', body: 'Jika sesuatu masih dalam pengembangan atau segera hadir, kami memberinya label. Anda tidak akan menemukan pelanggan, statistik, atau sertifikasi rekaan di situs ini.' },
        { title: 'Pengukuran sebelum AI', body: 'Temuan berasal dari pengukuran Anda dan menampilkan angkanya. AI digunakan untuk menjelaskan, tidak pernah untuk memutuskan.' },
        { title: 'Dibuat untuk hari yang buruk', body: 'Kami merancang untuk gangguan koneksi, listrik padam, dan baterai habis, karena pada hari-hari itulah pemantauan paling dibutuhkan.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Posisi kami saat ini',
      title: 'Perusahaan muda yang membangun secara terbuka.',
      items: [
        { title: 'Saat ini', body: 'Platform pemantauan berfungsi dari ujung ke ujung: sensor suhu, kelembapan, dan pintu, smart plug dengan biaya energi, Edge Gateway, VexaOs Cloud dengan AI Insights, serta aplikasi web dan seluler. Kami menerima pemesanan demo sekarang.' },
        { title: 'Berikutnya', body: 'Sensor getaran dan kesehatan mesin, perangkat RS-485 / Modbus berkabel, peringatan lewat email, dan Mobile Gateway. Restaurant OS, solusi hospitality kami, mendekati tahap pilot.' },
      ],
    },
    { type: 'findUs', title: 'Temukan kami' },
  ],
};

const contact: Page = {
  meta: {
    title: 'Jadwalkan Demo',
    description:
      'Jadwalkan demo platform pemantauan VexaOs, atau hubungi kami. Beri tahu kami apa yang ingin Anda pantau dan kami akan menunjukkan cara kerjanya.',
  },
  hero: {
    eyebrow: 'Jadwalkan demo',
    title: 'Beri tahu kami apa yang perlu [[Anda awasi.]]',
    subtitle:
      'Catatan singkat sudah cukup. Kami akan menunjukkan platform yang sedang bekerja, dan menyampaikan dengan terus terang apa yang bisa dan belum bisa dilakukannya untuk Anda saat ini.',
  },
  sections: [
    {
      type: 'contact',
      next: {
        title: 'Apa yang terjadi selanjutnya',
        items: [
          'Kami membalas melalui email untuk mengatur waktu.',
          'Kami memandu Anda melihat dashboard, peringatan, dan insight.',
          'Kami membahas site Anda dan sensor mana yang sesuai.',
        ],
      },
      email: { title: 'Lebih suka email?' },
    },
  ],
  cta: false,
};

export const pagesMain = { home, platform, products, solutions, industry, restaurantOs, about, contact };
