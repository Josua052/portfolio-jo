export type Award = {
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
  skills?: string[];
  credentialUrl?: string;
};

export const AWARDS: Award[] = [
  {
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    issued: "Feb 2026",
    skills: ["React.js"],
  },
  {
    title: "Financial Literacy",
    issuer: "Dicoding Indonesia",
    issued: "Nov 2025",
    expires: "Nov 2028",
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    issued: "Jan 2026",
    expires: "Jan 2029",
  },
  {
    title: "Dicoding Developer Coaching",
    issuer: "Dicoding Indonesia",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    issued: "Nov 2023",
    expires: "Nov 2026",
  },
  {
    title: "Belajar Visualisasi Data",
    issuer: "Dicoding Indonesia",
    issued: "Sep 2023",
    expires: "Sep 2026",
  },
  {
    title: "National Integrated Science Olympic",
    issuer: "Universitas Gadjah Mada",
    skills: ["Mathematics"],
  },
  {
    title: "Kickstart Your Front End Developer Career with React JS",
    issuer: "Edspert.id",
  },
  {
    title: "Video Editor Certificate",
    issuer: "Infinite Learning Indonesia",
    skills: ["Video Editing", "Video Production"],
  },
  {
    title: "Web Development",
    issuer: "Infinite Learning Indonesia",
    skills: ["Web Development", "React.js"],
  },
];