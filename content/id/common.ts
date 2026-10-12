/**
 * Shared interface text (Indonesian draft).
 * Brand and product names are never translated: VexaOs, VexaOs Edge Gateway,
 * VexaOs Mobile Gateway, VexaOs Cloud, AI Insights, Restaurant OS.
 */
// MACHINE DRAFT (id): translated by AI, not yet reviewed by a native speaker. Source of truth: content/en/.
export const common = {
  tagline: 'Pantau apa saja, di mana saja.',
  description:
    'VexaOs adalah platform pemantauan yang netral terhadap vendor: sensor nirkabel dan smart plug, Edge Gateway yang aman saat offline, VexaOs Cloud dengan AI Insights, serta aplikasi untuk web, iOS, dan Android.',
  nav: {
    platform: 'Platform',
    products: 'Produk',
    solutions: 'Solusi',
    about: 'Tentang',
    bookDemo: 'Jadwalkan demo',
    home: 'Beranda VexaOs',
    main: 'Utama',
    footer: 'Footer',
    skip: 'Langsung ke konten',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    hospitality: 'Solusi hospitality',
    howItWorks: 'Cara kerja',
    contact: 'Kontak',
    company: 'Perusahaan',
  },
  status: {
    available: 'Tersedia',
    development: 'Dalam pengembangan',
    soon: 'Segera hadir',
  },
  labels: {
    explore: 'Jelajahi',
    learnMore: 'Pelajari lebih lanjut',
    step: 'Langkah',
    worthKnowing: 'Perlu diketahui',
  },
  language: {
    label: 'Bahasa',
    switchTo: 'Ganti bahasa',
    dismiss: 'Tidak, terima kasih',
    draftNotice:
      'Terjemahan ini adalah draf mesin yang belum ditinjau oleh penutur asli. Versi bahasa Inggris menjadi acuan.',
    readEnglish: 'Baca dalam bahasa Inggris',
  },
  footer: {
    blurb:
      'Sensor dan smart plug, Edge Gateway yang aman saat offline, VexaOs Cloud dengan AI Insights, serta aplikasi untuk web, iOS, dan Android.',
    rights: 'Hak cipta dilindungi undang-undang.',
    messageUs: 'Kirim pesan kepada kami',
  },
  cta: {
    title: 'Lihat cara kerjanya pada peralatan Anda sendiri.',
    body: 'Beri tahu kami apa yang perlu Anda pantau dan di mana. Kami akan menunjukkan platformnya dan berterus terang tentang apa yang bisa dan belum bisa dilakukannya saat ini.',
    primary: 'Jadwalkan demo',
    secondary: 'Cara kerja',
  },
  stack: {
    sensors: ['Sembilan kelompok sensor', 'Sensor Bluetooth dan smart plug Wi-Fi sudah berfungsi saat ini', 'RS-485 / Modbus berkabel melalui integrasi'],
    gateway: ['Menyimpan pembacaan selama gangguan koneksi', 'Aturan alarm diperiksa di lokasi', 'Pulih dengan sendirinya'],
    cloud: ['Drift dan prakiraan', 'Temuan dalam bahasa Inggris yang mudah dipahami', 'Biaya energi dari tarif Anda sendiri'],
    apps: ['Web, iOS, dan Android', 'Peringatan, analitik, dan energi', 'Site, tim, dan peran'],
  },
  form: {
    name: 'Nama',
    email: 'Email kantor',
    company: 'Perusahaan',
    industry: 'Industri',
    selectIndustry: 'Pilih industri',
    other: 'Lainnya',
    sites: 'Berapa banyak site?',
    select: 'Pilih',
    siteCounts: ['1 site', '2–5 site', '6–20 site', '21+ site'],
    interestsLabel: 'Apa yang Anda minati?',
    interests: [
      'Suhu & kelembapan',
      'Pemantauan pintu',
      'Energi & smart plug',
      'Getaran (sedang diintegrasikan)',
      'RS-485 / Modbus berkabel (melalui integrasi)',
      'Mobile Gateway (segera hadir)',
      'Restaurant OS',
    ],
    message: 'Apa yang ingin Anda pantau?',
    messagePlaceholder: 'Misalnya: tiga ruang pendingin (walk-in cooler) dan satu freezer di dua site, serta pintu belakang.',
    required: '(wajib diisi)',
    submit: 'Minta demo',
    sending: 'Mengirim…',
    privacy: 'Kami menggunakan data Anda hanya untuk membalas permintaan ini.',
    missing: 'Mohon isi nama, email, dan catatan singkat tentang apa yang ingin Anda pantau.',
    failed: 'Terjadi kesalahan.',
    fallback: 'Jika masalah ini terus terjadi, kirim email kepada kami di',
    successTitle: 'Permintaan Anda sudah kami terima.',
    successBody: 'Terima kasih, {name}. Kami akan membalas ke {email} untuk mengatur waktu.',
    replyLanguage: 'Saat ini kami membalas dalam bahasa Inggris.',
  },
  notFound: {
    title: 'Kami tidak dapat menemukan halaman tersebut.',
    body: 'Halaman itu mungkin telah dipindahkan saat situs ini dibangun ulang.',
    back: 'Kembali ke beranda',
  },
  shots: {
    dashboardSummary: {
      alt: 'Baris ringkasan dashboard web VexaOs: 2 dari 2 sensor online, suhu rata-rata 21,4 °C, kelembapan 40%, tekanan 978 hPa dan tidak ada peringatan aktif.',
      caption: 'Baris ringkasan dashboard web. Tangkapan layar asli dari site uji kami.',
    },
    dashboardPanels: {
      alt: 'Panel dashboard VexaOs: tidak ada peringatan aktif, dan tren suhu 24 jam.',
      caption: 'Peringatan aktif dan tren suhu. Tangkapan layar asli dari site uji kami.',
    },
    doorActivity: {
      alt: 'Detail sensor VexaOs untuk sebuah sensor pintu: kotak suhu, kelembapan, baterai, dan sinyal, jumlah pembukaan hari ini, pembukaan terlama, serta linimasa kejadian buka dan tutup.',
      caption: 'Detail sensor pintu: setiap buka dan tutup pada sebuah linimasa. Tangkapan layar asli dari site uji kami.',
    },
    sensorCharts: {
      alt: 'Grafik riwayat sensor VexaOs untuk suhu, kelembapan, baterai, dan kekuatan sinyal selama 24 jam.',
      caption: 'Riwayat sensor selama 24 jam: suhu, kelembapan, baterai, dan sinyal. Tangkapan layar asli dari site uji kami.',
    },
    mobileDashboard: {
      alt: 'Dashboard aplikasi seluler VexaOs yang menampilkan kotak sensor aktif dan suhu rata-rata.',
      caption: 'Dashboard seluler. Tangkapan layar asli dari site uji kami.',
    },
    restaurantFloor: {
      alt: 'Papan denah lantai Restaurant OS yang menampilkan sepuluh meja menurut status: tersedia, terisi, dan perlu dibersihkan.',
      caption: 'Papan denah lantai Restaurant OS, berjalan dengan data demonstrasi.',
    },
    restaurantKitchen: {
      alt: 'Layar dapur Restaurant OS yang menampilkan tiket yang sedang dimasak, siap diantar, dan sudah disajikan.',
      caption: 'Layar dapur Restaurant OS, berjalan dengan data demonstrasi.',
    },
  },
};
