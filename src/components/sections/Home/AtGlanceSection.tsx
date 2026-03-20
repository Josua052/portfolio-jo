"use client";

import Card from "@/components/ui/Card";
import { MapPin, Github } from "lucide-react";
import RealGlobe from "@/components/RealGlobe"; // adjust path as needed
import {
  Atom,
  Globe,
  FileCode,
  Wind,
  Server,
  Database,
  GitBranch,
} from "lucide-react";

export const TECH_STACK = [
  {
    name: "React",
    color: "#61DAFB",
    icon: <Atom className="w-6 h-6" />,
  },
  {
    name: "Next.js",
    color: "#ffffff",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    icon: <FileCode className="w-6 h-6" />,
  },
  {
    name: "Tailwind",
    color: "#06B6D4",
    icon: <Wind className="w-6 h-6" />,
  },
  {
    name: "Node.js",
    color: "#68A063",
    icon: <Server className="w-6 h-6" />,
  },
  {
    name: "MySQL",
    color: "#4479A1",
    icon: <Database className="w-6 h-6" />,
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    icon: <Database className="w-6 h-6" />,
  },
  {
    name: "Git",
    color: "#F05032",
    icon: <GitBranch className="w-6 h-6" />,
  },
];

function TechStackMarquee() {
  const doubled = [...TECH_STACK, ...TECH_STACK];
  return (
    <div className="tech-marquee-wrapper">
      <div className="tech-marquee-track">
        {doubled.map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="tech-pill">
            <span className="tech-icon" style={{ color: tech.color }}>{tech.icon}</span>
            <span className="tech-label">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AtGlanceSection() {
  return (
    <section className="section">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          At a Glance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LOCATION */}
          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--muted)" }}>
              <MapPin className="w-4 h-4" />
              Jakarta Timur, Indonesia
            </div>

            <div className="relative overflow-hidden rounded-xl" style={{ height: 260 }}>
              <RealGlobe />
              <div
                className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium pointer-events-none"
                style={{
                  background: "rgba(2,6,23,0.75)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#e2e8f0",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="pulse-jakarta" />
                Jakarta, Indonesia
              </div>
              <div className="absolute top-3 right-3 text-xs pointer-events-none" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
                drag to rotate
              </div>
            </div>
          </Card>

          {/* GITHUB */}
          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
              <Github className="w-4 h-4" />
              GitHub Contributions
            </div>
            <div className="rounded-xl overflow-hidden p-3" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <img src="https://ghchart.rshah.org/Josua052" alt="GitHub contribution chart" className="w-full" style={{ borderRadius: 6 }} />
            </div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>Activity across public repositories</p>
          </Card>

          {/* TECH STACK */}
          <Card className="md:col-span-2 flex flex-col gap-5 overflow-hidden">
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              <span>⚡</span> Tech Stack
            </div>
            <TechStackMarquee />
          </Card>
        </div>
      </div>

      <style>{`
        .pulse-jakarta {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: pulse-jakarta 2s infinite;
        }
        @keyframes pulse-jakarta {
          0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.1); }
        }
        .tech-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .tech-marquee-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
        }
        .tech-marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tech-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1.1rem 0.5rem 0.75rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--background);
          white-space: nowrap;
          cursor: default;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          user-select: none;
        }
        .tech-pill:hover {
          border-color: var(--foreground);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .tech-icon {
          width: 28px; height: 28px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s;
        }
        .tech-pill:hover .tech-icon { transform: rotate(12deg) scale(1.15); }
        .tech-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--foreground);
        }
      `}</style>
    </section>
  );
}