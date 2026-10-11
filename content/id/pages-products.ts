import type { Page } from '@/lib/i18n/types';

// MACHINE DRAFT (id): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.

/**
 * Product pages (Indonesian draft). Inline markers: **bold**, [[accent]].
 * HONESTY RULES apply to every string: see content/en/catalog.ts.
 */

const sensors: Page = {
  meta: {
    title: 'Katalog Sensor: Sembilan Kelompok, Nirkabel dan Berkabel',
    description:
      'Katalog sensor VexaOs: lingkungan, rantai dingin, akses dan okupansi, air dan kebocoran, kesehatan mesin, proses industri, energi, aset, dan keselamatan, melalui Bluetooth LE, Wi-Fi, atau RS-485 / Modbus. Setiap pengukuran diberi label tersedia sekarang atau melalui integrasi.',
  },
  hero: {
    eyebrow: 'Produk · Sensor',
    title: 'Sensor untuk [[apa pun yang perlu Anda pantau.]]',
    subtitle:
      'Sembilan kelompok sensor, nirkabel dan berkabel, dalam satu platform. Setiap pengukuran diberi label, sehingga Anda dapat melihat apa yang sudah berfungsi saat ini dan apa yang kami tambahkan melalui adapter.',
    ctas: [{ label: 'Tanyakan tentang sensor', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'sensors',
      id: 'catalog',
      compact: false,
      eyebrow: 'Katalog sensor',
      title: 'Sembilan kelompok. Pilih industri Anda.',
      subtitle: 'Saring menurut industri, lalu buka sebuah kelompok untuk melihat detailnya.',
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Konektivitas',
      title: 'Nirkabel dan berkabel, ke dalam satu gateway.',
      subtitle: 'Sensor Bluetooth dan smart plug Wi-Fi sudah berfungsi saat ini. Perangkat RS-485 / Modbus berkabel ditambahkan sebagai integrasi.',
    },
    {
      type: 'split',
      eyebrow: 'Sensor pintu',
      title: 'Setiap buka dan tutup, pada sebuah linimasa.',
      body: 'Kejadian pintu dikirim saat terjadi. Di aplikasi Anda melihat berapa kali sebuah pintu dibuka hari ini, waktu terlama pintu itu terbuka, dan setiap kejadian beserta waktunya.',
      checks: [
        'Setiap perubahan dicatat satu kali, berurutan, bahkan selama gangguan koneksi.',
        'Pintu yang terbuka selama 10 menit atau lebih ditandai.',
        'Pembukaan pada jam yang tidak biasa dan waktu terbuka yang luar biasa lama disorot.',
      ],
      shot: 'doorActivity',
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Kesehatan sensor',
      title: 'Sensor juga mengawasi dirinya sendiri.',
      body: 'Sistem pemantauan hanya berguna jika Anda tahu sistem itu masih bekerja. Setiap sensor melaporkan baterai dan sinyalnya, dan platform memunculkan temuannya sendiri ketika ada yang perlu diperhatikan.',
      checks: [
        'Baterai lemah, atau baterai yang diperkirakan habis dalam 30 hari.',
        'Sinyal lemah, atau sinyal yang turun tajam.',
        'Sensor yang berhenti melapor sementara gateway-nya masih online.',
      ],
      shot: 'sensorCharts',
      note: {
        body: 'Sensor yang tersedia sekarang terhubung melalui Bluetooth Low Energy, sehingga harus berada dalam jangkauan radio sebuah gateway; kami memeriksa sinyal di setiap lokasi saat pemasangan. "Melalui integrasi" berarti adapternya belum ada, dan itu mencakup semua yang menggunakan RS-485 / Modbus: kami membuatnya ketika pelanggan membutuhkannya, dan kami tidak memublikasikan spesifikasi untuk sensor yang belum kami integrasikan.',
      },
    },
  ],
};

const edgeGateway: Page = {
  meta: {
    title: 'VexaOs Edge Gateway: Aman Saat Offline dan Pulih Sendiri',
    description:
      'VexaOs Edge Gateway mengumpulkan pembacaan dari sensor dan smart plug di sekitarnya, memeriksa aturan alarm di lokasi, menyimpan setiap pembacaan selama gangguan dan restart, serta pulih dengan sendirinya.',
  },
  hero: {
    eyebrow: 'Produk · Edge Gateway',
    title: 'Gateway yang [[terus merekam.]]',
    subtitle:
      'VexaOs Edge Gateway ditempatkan di lokasi, menangkap setiap sensor dalam jangkauan, dan mengirimkan datanya ke cloud. Ketika jaringan atau listrik bermasalah, gateway menjaga pembacaan Anda dan memulihkan dirinya sendiri.',
    ctas: [
      { label: 'Jadwalkan demo', href: '/contact', variant: 'primary' },
      { label: 'Cara kerja mode offline', href: '/platform#offline', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'cards',
      cols: 3,
      items: [
        { icon: 'gateway', title: 'Aman saat offline', body: 'Pembacaan ditulis ke penyimpanan yang tahan lama di gateway dan baru dihapus setelah cloud mengonfirmasi penerimaan. Gangguan koneksi menunda data Anda; tidak menghilangkannya.' },
        { icon: 'plug', title: 'Pulih sendiri', body: 'Jika radio sensor berhenti menerima sinyal, gateway memulai ulang pemindaian, lalu mereset radio, lalu memulai ulang layanannya sendiri. Watchdog perangkat keras menangani kondisi macet total.' },
        { icon: 'cloud', title: 'Pemulihan otomatis', body: 'Ketika jaringan terputus, gateway secara bertahap menyambungkan ulang Wi-Fi, memulai ulang jaringan, dan, sebagai upaya terakhir, melakukan reboot yang frekuensinya dibatasi. Gateway menyala dengan sendirinya setelah listrik kembali.' },
      ],
    },
    {
      type: 'split',
      tinted: true,
      eyebrow: 'Keputusan di lokasi',
      title: 'Alarm tidak menunggu cloud.',
      body: 'Aturan alarm diperiksa di gateway terhadap setiap pembacaan. Alarm yang dimunculkan atau dihapus ditempatkan di depan antrean dan langsung dikirim.',
      checks: [
        'Batas dengan waktu tahan, sehingga lonjakan sesaat tidak memunculkan alarm.',
        'Histeresis, sehingga pembacaan yang berada di sekitar batas tidak membuat alarm hidup-mati berulang kali.',
        'Ringkasan setiap 10 detik secara default, dapat diatur per sensor.',
        'Pembacaan mentah yang terperinci tetap berada di gateway; cloud menerima ringkasannya.',
      ],
      shot: 'dashboardPanels',
    },
    {
      type: 'cards',
      cols: 4,
      eyebrow: 'Kesehatan gateway',
      title: 'Anda dapat melihat bahwa gateway masih hidup.',
      subtitle:
        'Setiap menit gateway melaporkan kesehatannya sendiri: jaringan, radio sensor, waktu aktif, dan catu daya. Jika gateway harus memulihkan diri dari sesuatu, gateway memberi tahu Anda apa yang terjadi.',
      items: [
        { title: 'Offline', body: 'Gateway yang offline selama 5 menit memunculkan temuan.' },
        { title: 'Daya', body: 'Catu daya yang lemah terdeteksi dan dilaporkan.' },
        { title: 'Antrean tertunda', body: 'Antrean pembacaan yang menunggu diunggah dapat dilihat.' },
        { title: 'Identitas', body: 'Setiap gateway masuk dengan kunci perangkatnya sendiri melalui HTTPS.' },
      ],
    },
    {
      type: 'connectivity',
      id: 'connectivity',
      tinted: true,
      eyebrow: 'Konektivitas',
      title: 'Nirkabel dan berkabel, ke dalam satu gateway.',
      subtitle: 'Sensor Bluetooth dan smart plug Wi-Fi sudah berfungsi saat ini. Perangkat RS-485 / Modbus berkabel ditambahkan sebagai integrasi.',
    },
    {
      type: 'cards',
      cols: 3,
      eyebrow: 'Pemasangan',
      title: 'Apa yang dibutuhkan sebuah gateway.',
      items: [
        { title: 'Listrik dari stopkontak', body: 'Edge Gateway ditujukan untuk lokasi tetap yang memiliki stopkontak. Untuk tempat tanpa stopkontak, lihat Mobile Gateway, yang segera hadir.' },
        { title: 'Wi-Fi atau Ethernet', body: 'Koneksi internet biasa sudah cukup. Gateway hanya membuat koneksi HTTPS keluar.' },
        { title: 'Sensor dalam jangkauan', body: 'Sensor nirkabel terhubung melalui Bluetooth Low Energy; site yang lebih besar menggunakan lebih dari satu gateway. Smart plug bergabung ke jaringan yang sama dengan gateway. Perangkat RS-485 / Modbus berkabel ditambahkan sebagai integrasi.' },
      ],
      note: {
        body: 'Edge Gateway adalah produk baru. Antrean offline, pemulihan mandiri, dan perilaku restart-nya dicakup oleh pengujian otomatis, dan gateway ini berjalan dengan sensor sungguhan di site uji kami sendiri. Pengujian lapangan jangka panjang masih berlangsung, dan kami akan menyampaikan posisinya secara tepat ketika Anda berbicara dengan kami.',
      },
    },
  ],
};

const mobileGateway: Page = {
  meta: {
    title: 'VexaOs Mobile Gateway (Segera Hadir)',
    description:
      'VexaOs Mobile Gateway adalah gateway yang direncanakan untuk kendaraan, trailer, dan lokasi tanpa listrik atau jaringan tetap. Produk ini segera hadir dan belum tersedia saat ini.',
  },
  hero: {
    eyebrow: 'Produk · Mobile Gateway',
    status: 'soon',
    title: 'Pemantauan untuk tempat [[yang bergerak.]]',
    subtitle:
      'VexaOs Mobile Gateway direncanakan untuk kendaraan, trailer, dan lokasi sementara, tempat tidak ada listrik atau jaringan tetap. Produk ini belum tersedia.',
    ctas: [
      { label: 'Ceritakan kebutuhan Anda', href: '/contact', variant: 'primary' },
      { label: 'Lihat Edge Gateway', href: '/products/edge-gateway', variant: 'secondary' },
    ],
  },
  sections: [
    {
      type: 'note',
      note: {
        title: 'Segera hadir',
        body: 'Halaman ini menjelaskan apa yang sedang kami rencanakan, bukan produk yang dapat Anda pesan. Spesifikasi, harga, dan tanggal belum final, sehingga tidak ada yang dicantumkan di sini. Jika pemantauan bergerak penting bagi Anda, hubungi kami dan kami akan terus memberi Anda kabar.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Rencananya',
      title: 'Platform yang sama, jauh dari stopkontak.',
      subtitle:
        'Mobile Gateway dimaksudkan untuk bekerja dengan sensor yang sama, VexaOs Cloud yang sama, dan aplikasi yang sama seperti Edge Gateway.',
      items: [
        { icon: 'mobile', title: 'Barang dalam perjalanan', body: 'Dimaksudkan untuk kendaraan dan trailer berpendingin, sehingga muatan dipantau di antara site dan juga di site itu sendiri.' },
        { icon: 'warehouse', title: 'Lokasi sementara', body: 'Dimaksudkan untuk acara, gerai pop-up, dan penyimpanan jangka pendek, tempat pemasangan peralatan tetap tidak praktis.' },
        { icon: 'gateway', title: 'Simpan lalu teruskan', body: 'Dibangun di atas antrean offline Edge Gateway, yang sudah menyimpan pembacaan ketika tidak ada koneksi.' },
      ],
    },
  ],
  cta: {
    title: 'Butuh pemantauan bergerak?',
    body: 'Beri tahu kami apa yang Anda angkut dan ke mana. Kebutuhan Anda membantu membentuk apa yang kami bangun, dan kami akan memberi tahu Anda ketika Mobile Gateway siap.',
  },
};

const cloud: Page = {
  meta: {
    title: 'VexaOs Cloud & AI Insights',
    description:
      'VexaOs Cloud menyimpan riwayat sensor Anda dan menjalankan AI Insights: deteksi drift, prakiraan waktu menuju batas, aktivitas pintu yang tidak biasa, biaya energi, dan konsumsi daya siaga, dengan penjelasan dalam bahasa Inggris yang mudah dipahami dan selalu ditampilkan di samping angka hasil pengukuran.',
  },
  hero: {
    eyebrow: 'Produk · Cloud & AI Insights',
    title: 'Kenali masalahnya [[sebelum menjadi kerugian.]]',
    subtitle:
      'VexaOs Cloud menyimpan riwayat Anda, menjalankan aturan peringatan Anda, dan memeriksa setiap sensor untuk mencari pola yang biasanya mendahului kegagalan. Kemudian cloud menjelaskan apa yang ditemukannya dalam bahasa Inggris yang mudah dipahami.',
    ctas: [{ label: 'Jadwalkan demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    {
      type: 'split',
      eyebrow: 'Pengukuran lebih dulu',
      title: 'Deteksi adalah hitungan aritmetika. AI hanya menjelaskan.',
      body: 'Temuan berasal dari aturan tetap yang dijalankan pada pengukuran Anda setiap 30 menit. Masing-masing menyimpan angka yang menjadi dasar perhitungannya. Model AI digunakan untuk satu hal: mengubah temuan yang sudah ada menjadi kalimat yang jelas.',
      checks: [
        'Teks diberi label **Measured** (terukur) atau **AI-written** (ditulis AI), dan teks AI menampilkan tingkat keyakinannya.',
        'Teks AI tidak pernah ditampilkan tanpa angka hasil pengukuran di sampingnya.',
        'AI tidak dapat membuat temuan, mengubah tingkat keparahannya, atau menutupnya.',
        'Jika penjelasan AI dimatikan atau tidak tersedia, Anda tetap mendapatkan setiap temuan, yang dijelaskan dari angka-angkanya.',
      ],
      shot: 'sensorCharts',
    },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Apa yang dicarinya',
      title: 'Temuan, diperiksa sepanjang waktu.',
      subtitle: 'Masing-masing memiliki tingkat keparahan info, peringatan, atau kritis, dan status yang Anda kendalikan: terbuka, dikonfirmasi, atau diselesaikan.',
      items: [
        { title: 'Drift', body: 'Kenaikan atau penurunan suhu atau kelembapan yang terus-menerus selama enam jam terakhir, bahkan saat pembacaan masih dalam rentang.' },
        { title: 'Waktu menuju batas', body: 'Ketika sensor yang memiliki aturan peringatan sedang mengarah ke batasnya, jumlah jam yang tersisa pada laju saat ini.' },
        { title: 'Pembacaan tidak biasa', body: 'Pembacaan yang jauh dari nilai yang biasanya ditunjukkan sensor ini pada jam tersebut.' },
        { title: 'Pintu dibiarkan terbuka', body: 'Pintu yang telah terbuka selama 10 menit atau lebih, saat ini juga.' },
        { title: 'Pintu pada jam tidak biasa', body: 'Pintu yang dibuka pada jam yang sepi selama dua minggu terakhir.' },
        { title: 'Pintu terbuka lebih lama dari biasanya', body: 'Total waktu terbuka hari ini setidaknya dua kali rata-rata harian belakangan ini.' },
        { title: 'Hangat dan lembap bersamaan', body: 'Suhu dan kelembapan naik bersamaan, tanda umum adanya masalah pada karet pintu atau pendinginan.' },
        { title: 'Konsumsi daya siaga', body: 'Peralatan tercolok yang terus menarik daya saat tidak digunakan.' },
        { title: 'Biaya energi', body: 'Penyumbang biaya terbesar minggu ini, perubahan yang berarti dari bulan ke bulan, dan pemakaian tinggi pada jam beban puncak.' },
        { title: 'Baterai', body: 'Baterai lemah, atau baterai yang diperkirakan habis dalam 30 hari.' },
        { title: 'Sinyal', body: 'Sinyal lemah, atau penurunan tajam dibandingkan hari-hari sebelumnya.' },
        { title: 'Sensor berhenti melapor', body: 'Tidak ada pembacaan selama 15 menit sementara gateway masih online.' },
        { title: 'Kesehatan gateway', body: 'Gateway yang offline, kekurangan daya, atau memiliki antrean yang menunggu diunggah.' },
      ],
    },
    {
      type: 'cards',
      id: 'energy',
      cols: 4,
      eyebrow: 'Energi',
      title: 'Biaya energi, dari tarif Anda sendiri.',
      subtitle: 'Smart plug melaporkan kWh. Cloud mengubahnya menjadi biaya menggunakan tarif listrik yang Anda masukkan.',
      items: [
        { icon: 'energy', title: 'Tiga mode tarif', body: 'Tarif tetap, tarif per musim, atau tarif beban puncak dan luar beban puncak per musim, yang diatur untuk organisasi atau untuk satu site.' },
        { icon: 'cloud', title: 'Riwayat tarif', body: 'Setiap tarif memiliki tanggal mulai, sehingga tarif baru tidak pernah mengubah biaya energi yang sudah terpakai.' },
        { icon: 'apps', title: 'Biaya per peralatan', body: 'Hari ini, 7 hari terakhir, dan bulan ini, dengan proyeksi satu bulan dan rincian per peralatan dan area.' },
        { icon: 'plug', title: 'Jujur tentang data yang kosong', body: 'Jika tarif belum dimasukkan, biayanya tertulis "rate not set" (tarif belum diatur). Biaya tidak pernah ditampilkan sebagai nol.' },
      ],
      note: {
        body: 'Biaya adalah estimasi dari tarif yang Anda masukkan dan total energi per jam penuh, bukan tagihan listrik dari penyedia listrik. Jam beban puncak bawaan adalah titik awal, bukan jadwal resmi penyedia listrik mana pun.',
      },
    },
    {
      type: 'cards',
      tinted: true,
      cols: 4,
      eyebrow: 'Cloud di baliknya',
      title: 'Riwayat, aturan, dan akses di satu tempat.',
      items: [
        { title: 'Riwayat', body: 'Setiap ringkasan disimpan, dengan rangkuman per jam agar grafik sehari, seminggu, atau sebulan tampil cepat.' },
        { title: 'Aturan peringatan', body: 'Tetapkan batas per sensor. Peringatan menyimpan riwayat, serta dapat dikonfirmasi dan diselesaikan.' },
        { title: 'Pembaruan langsung', body: 'Dashboard diperbarui saat pembacaan baru masuk, tanpa memuat ulang halaman.' },
        { title: 'Site dan peran', body: 'Organisasi, site, lokasi, dan peralatan, dengan akses yang ditentukan oleh keanggotaan dan peran.' },
      ],
    },
    {
      type: 'cards',
      cols: 2,
      eyebrow: 'Privasi',
      title: 'Apa yang dikirim ke model AI, dan apa yang tidak.',
      items: [
        { title: 'Dikirim', body: 'Nama site dan zona waktu, dan untuk setiap temuan: jenis dan tingkat keparahannya, nama sensor, lokasi, dan peralatan, serta angka ringkasan yang menjadi dasar perhitungan temuan tersebut.' },
        { title: 'Tidak pernah dikirim', body: 'Aliran pembacaan mentah Anda, alamat email, nama pengguna, alamat perangkat keras, atau kunci. Setiap balasan diperiksa sebelum disimpan, dan apa pun yang tidak terduga dibuang.' },
      ],
      note: {
        body: 'Penjelasan AI bersifat opsional dan menggunakan model AI pihak ketiga. Temuan dan peringatan kritis sampai ke ponsel Anda sebagai notifikasi push; pengiriman lewat email sudah dibuat tetapi belum diaktifkan, dan pesan teks (SMS) tidak tersedia. Prakiraan adalah estimasi berdasarkan tren terkini, bukan jaminan.',
      },
    },
  ],
};

const apps: Page = {
  meta: {
    title: 'VexaOs Apps untuk Web, iOS, dan Android',
    description:
      'Aplikasi VexaOs untuk web, iOS, dan Android: dashboard langsung, peringatan dengan notifikasi di ponsel, analitik dengan ekspor CSV, biaya energi, banyak site, dan peran tim, dalam satu akun.',
  },
  hero: {
    eyebrow: 'Produk · Aplikasi',
    title: 'Site Anda, [[di setiap layar.]]',
    subtitle:
      'Satu akun di web serta di iOS dan Android. Lihat apa yang sedang terjadi sekarang, tinjau kembali data sebulan terakhir, dan tangani peringatan di mana pun Anda berada.',
    ctas: [{ label: 'Jadwalkan demo', href: '/contact', variant: 'primary' }],
  },
  sections: [
    { type: 'shot', shot: 'dashboardSummary' },
    {
      type: 'cards',
      tinted: true,
      cols: 3,
      eyebrow: 'Dashboard web',
      title: 'Semuanya di satu tempat.',
      items: [
        { title: 'Dashboard', body: 'Sensor online, nilai rata-rata, peringatan aktif, status gateway, daya saat ini, energi hari ini, dan insight terbaru dalam sekilas pandang.' },
        { title: 'Sensor', body: 'Cari, saring, dan urutkan setiap sensor. Buka salah satunya untuk melihat riwayat, linimasa pintu, dan profilnya.' },
        { title: 'Peringatan', body: 'Riwayat peringatan, konfirmasi dan penyelesaian, serta aturan peringatan untuk setiap sensor.' },
        { title: 'Insight', body: 'Temuan yang disaring menurut status, tingkat keparahan, jenis, dan sensor, beserta ringkasan harian.' },
        { title: 'Analitik', body: 'Bandingkan sensor, lihat nilai minimum, rata-rata, dan maksimum harian, tinjau aktivitas pintu, dan ekspor CSV.' },
        { title: 'Energi', body: 'Daya saat ini, kWh dan biaya per peralatan dan area, biaya dari waktu ke waktu, proyeksi satu bulan, dan ekspor CSV.' },
        { title: 'Lokasi', body: 'Site, lokasi di dalam site, dan peralatan, dengan setiap sensor ditempatkan di tempatnya berada.' },
        { title: 'Perangkat', body: 'Kesehatan gateway, ditambah alur terpandu untuk menambahkan sensor atau smart plug.' },
        { title: 'Pengaturan', body: 'Profil, organisasi, undangan tim, satuan, tarif energi, dan preferensi notifikasi.' },
      ],
    },
    {
      type: 'split',
      eyebrow: 'iOS dan Android',
      title: 'Data yang sama di saku Anda.',
      body: 'Aplikasi seluler mengikuti dashboard web: sensor secara langsung, detail sensor dengan riwayat, analitik, energi, insight, dan pengaturan. Aplikasi berfungsi dalam orientasi potret dan lanskap, di ponsel dan tablet.',
      checks: [
        'Pembacaan langsung dan status pintu untuk setiap sensor.',
        'Notifikasi di ponsel untuk peringatan kritis, dengan jam tenang dan pengingat.',
        'Ganti nama sensor serta atur lokasi dan peralatannya dari aplikasi.',
        'Pilih °C atau °F; datanya tetap sama.',
      ],
      shot: 'mobileDashboard',
      phone: true,
    },
    {
      type: 'split',
      tinted: true,
      flip: true,
      eyebrow: 'Tim dan site',
      title: 'Orang yang tepat melihat site yang tepat.',
      body: 'Akun hanya dibuat melalui undangan. Setiap orang ditambahkan ke sebuah organisasi, atau ke satu site di dalamnya, dengan peran yang menentukan apa yang dapat mereka lakukan.',
      checks: [
        '**Pemilik (owner) dan admin:** mengelola organisasi, tim, dan site.',
        '**Pemasang (installer):** menambahkan sensor, mengatur aturan, dan menyelesaikan temuan.',
        '**Pengamat (viewer):** melihat dashboard dan mengonfirmasi peringatan.',
        'Berpindah antarlokasi, atau melihat semuanya sekaligus.',
      ],
      shot: 'dashboardPanels',
      note: {
        body: 'Aplikasi iOS dan Android belum tercantum di toko aplikasi publik; kami menyiapkannya bersama Anda saat onboarding. Notifikasi push di ponsel sudah berfungsi. Peringatan lewat email sudah dibuat tetapi belum diaktifkan, dan pesan teks (SMS) tidak tersedia. Saat ini aplikasi tersedia dalam bahasa Inggris.',
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
