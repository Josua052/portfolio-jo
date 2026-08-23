export type Project = {
  index: string;
  slug?: string;
  title: string;
  subtitle: string;
  company: string;
  period: string;
  url: string | null;
  demoUrl?: string | null;
  detailRoute?: string;
  image?: string | null;
  githubUrl?: string | null;
  status: "live" | "featured" | "completed" | "ongoing";
  description: string[];
  tech: string[];
  category: string;
  role?: string;
  architectureHighlights?: { title: string; desc: string }[];
  keyFeatures?: string[];
};

export const PROJECTS: Project[] = [
  {
    index: "00",
    slug: "AutomotiveAftermarketSupplyChainEnterprise",
    title: "Automotive Aftermarket & Supply Chain Enterprise",
    subtitle: "Automotive Aftermarket & Supply Chain Enterprise",
    company: "SSM",
    period: "Aug - Sep 2026",
    role: "Sole Technical Partner & Full-Stack Architect",
    url: null,
    demoUrl: "https://workshop-ims-web.vercel.app//dashboard",
    detailRoute: "/project/AutomotiveAftermarketSupplyChainEnterprise",
    status: "ongoing",
    description: [
      "Led end-to-end engineering and architectural design as the sole technical partner, owning the complete SDLC from BRD/PRD requirements analysis to full-stack implementation and security hardening",
      "Architected a high-concurrency backend ecosystem using Go (Gin, GORM) and PostgreSQL multi-schema architecture, integrating Redis for session rate-limiting and Asynq for background jobs",
      "Engineered critical financial algorithms, including dynamic Dollar-Cost Averaging (DCA / Moving Average Cost) recalculation and a 2-phase stock reservation mechanism",
      "Developed a modular, type-safe frontend dashboard using React 19, TypeScript (strict mode), Vite, and Tailwind CSS v4 with schema-first form validation via Zod",
      "Implemented enterprise-grade security controls including dual-token JWT authentication, strict RBAC, CSRF protection, and append-only audit logging",
    ],
    architectureHighlights: [
      {
        title: "High-Concurrency Go Backend",
        desc: "Built with Go (Gin & GORM) and a PostgreSQL multi-schema database design, achieving sub-millisecond query execution and robust data isolation.",
      },
      {
        title: "Redis & Asynq Background Queue",
        desc: "Distributed rate-limiting, session caching, and asynchronous task execution for stock recalculations and automated background reporting.",
      },
      {
        title: "Financial DCA & Stock Reservation",
        desc: "Dynamic Moving Average Cost recalculation algorithms paired with a 2-phase stock reservation engine to prevent inventory race conditions.",
      },
      {
        title: "Enterprise RBAC & Security",
        desc: "Dual-token JWT lifecycle, strict Role-Based Access Control, CSRF protection, and immutable append-only audit logs for all financial transactions.",
      },
      {
        title: "React 19 & Tailwind v4 Frontend",
        desc: "Strict TypeScript type-safety, Vite build pipeline, reactive state management, and schema-validated UI components.",
      },
    ],
    keyFeatures: [
      "Real-time Multi-Branch Inventory Tracking & SKU Stock Valuation",
      "Dynamic Dollar-Cost Averaging (DCA) recalculation engine",
      "Work Order, Estimation & Workshop Service lifecycle management",
      "Supplier & Purchase Order automated workflow",
      "Sales Order, Invoicing & Multi-payment gateway reconciliation",
      "Granular RBAC permission matrix for technicians, cashiers & admins",
    ],
    tech: [
      "Go",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Tailwind v4",
      "Asynq",
      "Docker",
    ],
    category: "Supply Chain · Enterprise",
  },
  {
    index: "01",
    slug: "RestaurantSaaS",
    title: "Multi-Tenant Restaurant & F&B SaaS",
    subtitle: "Enterprise Multi-Tenant Restaurant & F&B SaaS Ecosystem",
    company: "Personal Project · Self-Initiated",
    period: "Jun 2026 – Present",
    role: "Full-Stack Software Engineer & System Architect",
    url: "https://restaurant-saas-web-sigma.vercel.app/",
    demoUrl: "https://restaurant-saas-web-sigma.vercel.app/",
    detailRoute: "/project/RestaurantSaaS",
    status: "ongoing",
    description: [
      "Led end-to-end architectural design and full-stack engineering as the sole developer, architecting a scalable multi-tenant restaurant management ecosystem supporting Super Admin, Tenant Owners, Branch Staff, and B2C Public Dining portals.",
      "Architected a high-performance backend using Go (Gin, GORM) and PostgreSQL, enforcing strict data isolation via Row Level Security (RLS) & tenant scoping, integrated Redis for sliding-window rate limiting (anti-DDoS) & JWT blacklisting, and built a modular Capability Engine to gate feature access.",
      "Engineered concurrency-safe booking and order workflows, utilizing pessimistic database locking (SELECT ... FOR UPDATE) and ACID transactions to eliminate double-booking race conditions, backed by a deterministic State Machine to enforce strict reservation and order lifecycle transitions.",
      "Developed a modern multi-tenant frontend using Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4, delivering a tablet-first responsive POS/Staff UI, dynamic subdomain/slug routing for custom tenant storefronts, and optimistic UI updates with automatic state rollback.",
      "Implemented enterprise security and cloud-native integrations, featuring dual-token JWT authentication with secure httpOnly cookie rotation, MinIO/S3 presigned URL asset uploads, schema-driven validation via Zod, and standardized API error/response formatting.",
    ],
    architectureHighlights: [
      {
        title: "Multi-Tenant Go & PostgreSQL Engine",
        desc: "Backend performa tinggi dengan isolasi data multi-tenant ketat (Row Level Security), capability subscription engine dinamis, dan query sub-millisecond.",
      },
      {
        title: "Pessimistic Locking & State Machine",
        desc: "SELECT ... FOR UPDATE dalam transaksi ACID untuk mengeliminasi race condition dan double-booking, dikontrol oleh finite state machine deterministik.",
      },
      {
        title: "Next.js App Router & React 19 Dashboard",
        desc: "Antarmuka tablet-first modern untuk staf/POS kasir, dynamic routing multi-tenant, serta optimistic UI updates dengan automated rollback.",
      },
      {
        title: "Redis & MinIO Object Storage",
        desc: "Rate limiting terdistribusi, token blacklisting via Redis, dan integrasi direct upload media berbasis MinIO / S3 Presigned URLs.",
      },
      {
        title: "Enterprise Dual-Token JWT & Zod Validation",
        desc: "Rotasi token JWT via httpOnly cookies, validasi skema form Zod, standardisasi respon API JSON, container Docker, dan dokumentasi Swagger.",
      },
    ],
    keyFeatures: [
      "Super Admin, Tenant Owner, dan Staff/Kasir Multi-Role Portal",
      "Tablet-First POS & Kitchen Ordering Workflow",
      "Portal Publik B2C: Digital QR Menu & Real-time Table Reservation",
      "Pessimistic Database Locking untuk Reservasi Tanpa Konflik",
      "Modular Capability Engine berbasis Paket Langganan",
      "MinIO / S3 Presigned URL Media Storage Integration",
    ],
    tech: [
      "Go",
      "Next.js",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "MinIO",
      "Tailwind v4",
      "Docker",
      "Zod",
      "SWR",
    ],
    category: "SaaS · Multi-Tenant · Web App",
  },
  {
    index: "02",
    title: "Degiva Sukses Indonesia",
    subtitle: "Corporate Website",
    company: "PT. Degiva Sukses Indonesia",
    period: "2025 · Present",
    url: "https://degivasukses.com/",
    status: "live",
    description: [
      "Built a fully responsive corporate website for Degiva Sukses Indonesia from design to deployment",
      "Implemented dynamic content sections, service pages, and company profile with modern UI",
      "Integrated contact forms and optimized performance for production launch",
    ],
    tech: ["Vue.js", "Laravel", "Tailwind CSS", "MySQL", "REST API"],
    category: "Corporate · Web",
  },
  {
    index: "03",
    title: "Artha Mitra Berkarya",
    subtitle: "Construction Company Platform",
    company: "PT. Artha Mitra Berkarya",
    period: "2025 · Present",
    url: "https://www.arthamitraberkarya.com/",
    status: "live",
    description: [
      "Developed a full-featured Next.js website for a construction company serving clients including UGM and Bantul Government",
      "Built service pages, project portfolio, blog, career, and contact modules",
      "Delivered a professional platform emphasizing trust, transparency, and quality",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "Construction · Web",
  },
  {
    index: "04",
    title: "Unicate",
    subtitle: "Featured Community Platform",
    company: "Infinite Learning · Apple Developer Academy",
    period: "2022 – 2023",
    url: null,
    status: "featured",
    description: [
      "Led as Project Manager and Front-End Developer for a community-focused web application",
      "Published as a featured project at the Developer Festival by Apple Developer Academy",
      "Designed full UI/UX in Figma and implemented responsive interfaces with React.js",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Figma"],
    category: "Community · Web App",
  },
  {
    index: "05",
    title: "OneClick Dokter",
    subtitle: "Healthcare Web Application",
    company: "Infinite Learning · Apple Developer Academy",
    period: "2022",
    url: null,
    status: "completed",
    description: [
      "Developed a healthcare platform connecting patients with doctors for online consultations",
      "Built responsive front-end with React.js and contributed to UX research and prototyping",
      "Integrated RESTful APIs for appointment scheduling and doctor search features",
    ],
    tech: ["React.js", "Node.js", "Figma", "REST API"],
    category: "Healthcare · Web App",
  },
  {
    index: "06",
    title: "Freedom",
    subtitle: "Social Impact Web Application",
    company: "Infinite Learning · Apple Developer Academy",
    period: "2022",
    url: null,
    status: "completed",
    description: [
      "Contributed to a social-impact focused web application as part of a cross-functional team",
      "Applied design thinking methodology from user research through to final prototype",
      "Implemented front-end components using React.js with responsive layouts",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Figma"],
    category: "Social Impact · Web App",
  },
  {
    index: "07",
    title: "Research Student – Final Thesis",
    subtitle: "Thesis Web Application",
    company: "-",
    period: "2025",
    url: null,
    status: "completed",
    description: [
      "Designed and implemented a deep learning classification model using EfficientNetV2 to identify tongue lesion types for early oral cancer detection",
      "Applied image preprocessing techniques and organised the dataset with clear labeling to improve model performance and reliability.",
      "Evaluated the model using accuracy, validation metrics, confusion matrix, and AUC to ensure robust and consistent prediction results",
    ],
    tech: ["Flask", "PHP", "Google Collab", "Figma"],
    category: "Thesis · Web App",
  },
  {
    index: "08",
    title: "Online Bus Ticket Booking Application Project",
    subtitle: "Thesis Web Application",
    company: "-",
    period: "2025",
    url: null,
    demoUrl: "https://bus-booking-mobile.vercel.app/",
    status: "completed",
    description: [
      "Designed and developed a mobile bus ticket booking system for Android to streamline ticketing operations and improve the customer booking experience for a transportation company",
      "Built core features such as user registration, bus and route selection, ticket booking, departure scheduling, and payment confirmation",
      "Created a clean, intuitive, and responsive UI using Figma, ensuring a smooth user journey from browsing routes to completing a booking",
      "Implemented the application using Flutter and Android Studio, integrating Firebase for authentication, real-time database management, and secure data storage",
    ],
    tech: ["Flutter", "Firebase", "Figma"],
    category: "Thesis · Mobile App",
  },
  {
    index: "09",
    title: "Collaborative Bus Tracking Project",
    subtitle: "Project Student Web Application",
    company: "Project Last Exam",
    period: "2024",
    url: null,
    status: "completed",
    description: [
      "Contributed to the development of a bus tracking web application using PHP and PostgreSQL, supporting real-time vehicle monitoring and trip information",
      "Performed bug fixing, functional testing, and deployment activities to maintain a stable, reliable, and fully operational system",
      "Collaborated with the development team to refine the user interface, improving usability, readability, and overall user experience for end-users",
    ],
    tech: ["PHP", "Firebase", "Figma"],
    category: "Project Home · Web App",
  },
];

export const STATUS_CONFIG = {
  live: { label: "Live", color: "#22c55e", dot: "#22c55e" },
  featured: { label: "Featured", color: "#6366f1", dot: "#6366f1" },
  completed: { label: "Completed", color: "#94a3b8", dot: "#94a3b8" },
  ongoing: { label: "On Going", color: "#38bdf8", dot: "#38bdf8" },
} as const;
