export interface FlutterMobileApp {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  appUrl: string;
  githubUrl?: string;
  icon: string;
  accentColor: string;
  features: string[];
  techStack: string[];
}

export const FLUTTER_MOBILE_APPS: FlutterMobileApp[] = [
  {
    id: "bus-ticket-booking",
    title: "Bus Ticket Booking App",
    category: "Transport & Ticketing",
    tagline: "Aplikasi pemesanan tiket bus real-time berbasis Flutter dan Firebase",
    description:
      "Aplikasi mobile bus ticket booking system untuk Android & Web. Memfasilitasi pendaftaran pengguna, pemilihan rute & armada bus, penjadwalan keberangkatan, dan konfirmasi pembayaran instan.",
    appUrl: "https://gallery.flutter.dev/#/demo/crane",
    githubUrl: "https://github.com",
    icon: "🚌",
    accentColor: "from-blue-600 to-cyan-500",
    features: [
      "Autentikasi & manajemen profil Firebase",
      "Pencarian & filter rute bus real-time",
      "Peta terminal dan pelacakan jadwal",
      "Konfirmasi e-ticket otomatis & payment gateway",
    ],
    techStack: ["Flutter", "Dart", "Firebase", "Figma", "REST API"],
  },
  {
    id: "flutter-gallery-showcase",
    title: "Material 3 & UI Showcase",
    category: "Mobile Design System",
    tagline: "Koleksi komponen mobile UI dan animasi interaktif 60fps",
    description:
      "Showcase komponen Material 3 dan Cupertino adaptif dengan performa tinggi, animasi transisi halus, dan responsivitas lintas platform.",
    appUrl: "https://gallery.flutter.dev/#/demo/shrine",
    githubUrl: "https://github.com/flutter/gallery",
    icon: "📱",
    accentColor: "from-purple-600 to-indigo-600",
    features: [
      "Material You dynamic theming",
      "Hero transitions & gesture navigation",
      "Adaptive touch physics",
      "Custom canvas animations",
    ],
    techStack: ["Flutter", "Dart", "Provider", "Canvas 2D"],
  },
  {
    id: "fintech-crypto-wallet",
    title: "FinTech & Crypto Wallet",
    category: "Finance & Crypto",
    tagline: "Dompet digital dengan grafik real-time dan otentikasi biometrik",
    description:
      "Aplikasi finansial modern dengan arsitektur BLoC, integrasi grafik candlestick real-time, scanner QR instan, dan multi-currency balance.",
    appUrl: "https://gallery.flutter.dev/#/demo/rally",
    githubUrl: "https://github.com",
    icon: "💎",
    accentColor: "from-emerald-500 to-teal-600",
    features: [
      "Biometric security & encrypted storage",
      "Real-time market candlestick charts",
      "Instant QR payment engine",
      "Multi-account ledger",
    ],
    techStack: ["Flutter", "Dart", "BLoC Pattern", "WebSockets"],
  },
];
