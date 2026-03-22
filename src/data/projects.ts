export type Project = {
  index: string;
  title: string;
  subtitle: string;
  company: string;
  period: string;
  url: string | null;
  status: "live" | "featured" | "completed";
  description: string[];
  tech: string[];
  category: string;
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Degiva Sukses Indonesia",
    subtitle: "Corporate Website",
    company: "PT. Global Service Indonesia",
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
    index: "02",
    title: "Artha Mitra Berkarya",
    subtitle: "Construction Company Platform",
    company: "PT. Global Service Indonesia",
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
    index: "03",
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
    index: "04",
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
    index: "05",
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
    index: "06",
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
    index: "07",
    title: "Online Bus Ticket Booking Application Project",
    subtitle: "Thesis Web Application",
    company: "Thesis",
    period: "2025",
    url: null,
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
    index: "08",
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
} as const;
