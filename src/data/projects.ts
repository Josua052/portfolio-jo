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
];

export const STATUS_CONFIG = {
  live:      { label: "Live",      color: "#22c55e", dot: "#22c55e" },
  featured:  { label: "Featured",  color: "#6366f1", dot: "#6366f1" },
  completed: { label: "Completed", color: "#94a3b8", dot: "#94a3b8" },
} as const;