"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import awardsData from "@/data/awards.json";

export type Award = {
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
  skills?: string[];
  credentialUrl?: string;
};

const AWARDS = awardsData as Award[];

export const ISSUER_CONFIG: Record<
  string,
  { logo: string; color: string; fallback: string }
> = {
  HackerRank: { logo: "/images/issuers/hackerrank.png", color: "#22c55e", fallback: "HR" },
  "Dicoding Indonesia": { logo: "/images/issuers/dicoding.png", color: "#6366f1", fallback: "DC" },
  "Infinite Learning Indonesia": { logo: "/images/issuers/infinitelearning.png", color: "#06B6D4", fallback: "IL" },
  "Edspert.id": { logo: "/images/issuers/edspert.png", color: "#f59e0b", fallback: "ED" },
  "Universitas Gadjah Mada": { logo: "/images/issuers/ugm.jpg", color: "#3b82f6", fallback: "UGM" },
};

function IssuerLogo({ issuer }: { issuer: string }) {
  const [error, setError] = useState(false);
  const conf = ISSUER_CONFIG[issuer];
  
  if (!conf || error) {
    return (
      <div 
        className="fallback-logo" 
        style={{ 
          color: conf?.color || "var(--foreground)", 
          backgroundColor: conf ? `${conf.color}15` : "color-mix(in srgb, var(--foreground) 10%, transparent)" 
        }}
      >
        {conf?.fallback || issuer.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <Image 
      src={conf.logo} 
      alt={issuer} 
      width={24} 
      height={24} 
      className="issuer-img"
      onError={() => setError(true)}
    />
  );
}

export default function AwardsSection() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, margin: "-100px" });

  // Stats calculation
  const total = AWARDS.length;
  const recent = AWARDS.filter(a => a.issued?.includes("2026") || a.issued?.includes("2025")).length;
  const issuersCount = Array.from(new Set(AWARDS.map((a) => a.issuer))).length;

  return (
    <section className="awards-ledger-section" ref={containerRef}>
      <div className="container-custom">

        {/* ── Heading ── */}
        <motion.div
          className="awards-heading-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="awards-eyebrow">/ awards & certifications</p>

          <div className="awards-heading-row">
            <h1 className="awards-heading">
              Awards &amp;<br />
              <span className="awards-heading-outline">Certifications</span>
            </h1>
            <p className="awards-heading-sub">
              A minimalist ledger of certifications, achievements, and continuous learning milestones.
            </p>
          </div>

          {/* Stats bar */}
          <div className="awards-stats-bar">
            {[
              { value: total.toString(), label: "Total" },
              { value: recent.toString(), label: "Recent" },
              { value: issuersCount.toString(), label: "Issuers" },
            ].map((s) => (
              <div key={s.label} className="awards-stat">
                <span className="awards-stat-value">{s.value}</span>
                <span className="awards-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── LEDGER TABLE (No Filters) ── */}
        <div className="ledger-wrapper">
           <div className="ledger-header hidden-on-mobile">
              <div className="col-year">Year</div>
              <div className="col-cert">Certification</div>
              <div className="col-issuer">Issuer</div>
              <div className="col-skills">Skills</div>
              <div className="col-link">Action</div>
           </div>

           <div className="ledger-body">
              {AWARDS.map((award, i) => {
                 const year = award.issued ? award.issued.split(" ").pop() : "N/A";
                 
                 return (
                    <motion.div 
                      key={`${award.title}-${i}`}
                      className="ledger-row"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: (i % 10) * 0.05 }}
                    >
                       <div className="col-year">{year}</div>
                       <div className="col-cert">
                         <span className="cert-title">{award.title}</span>
                         {year === "2026" && <span className="cert-badge">NEW</span>}
                       </div>
                       <div className="col-issuer">
                         <IssuerLogo issuer={award.issuer} />
                         <span className="issuer-name">{award.issuer}</span>
                       </div>
                       <div className="col-skills">
                         {award.skills?.slice(0, 2).map(skill => (
                           <span key={skill} className="skill-pill">{skill}</span>
                         ))}
                         {award.skills && award.skills.length > 2 && (
                           <span className="skill-pill">+{award.skills.length - 2}</span>
                         )}
                       </div>
                       <div className="col-link">
                         {award.credentialUrl ? (
                           <a href={award.credentialUrl} target="_blank" rel="noopener noreferrer" className="ledger-link-btn" aria-label="View Credential">
                             View <ArrowUpRight size={16} />
                           </a>
                         ) : (
                           <span className="ledger-link-disabled">-</span>
                         )}
                       </div>
                    </motion.div>
                 );
              })}
           </div>
        </div>

      </div>

      <style>{`
        /* ── Section ── */
        .awards-ledger-section {
          background: var(--background);
          color: var(--foreground);
          padding: 6rem 1.5rem 8rem;
        }

        /* ── Heading ── */
        .awards-heading-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 4rem; /* increased slightly to compensate for missing filter bar */
        }
        .awards-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }
        .awards-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .awards-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }
        .awards-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .awards-heading-sub {
          max-width: 380px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
        }

        /* ── Stats bar ── */
        .awards-stats-bar {
          display: flex;
          width: fit-content;
          border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          border-radius: 12px;
          overflow: hidden;
          background: color-mix(in srgb, var(--background) 95%, #ffffff);
          margin-top: 1rem;
        }
        .awards-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1.8rem;
          border-right: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          gap: 0.2rem;
        }
        .awards-stat:last-child { border-right: none; }
        .awards-stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);
          line-height: 1;
        }
        .awards-stat-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 0.2rem;
        }

        /* ── LEDGER TABLE ── */
        .ledger-wrapper {
          width: 100%;
          border-top: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
        }

        .ledger-header {
          display: grid;
          grid-template-columns: 80px 2fr 1.5fr 1.5fr 80px;
          gap: 1.5rem;
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .ledger-row {
          display: grid;
          grid-template-columns: 80px 2fr 1.5fr 1.5fr 80px;
          gap: 1.5rem;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent);
          align-items: center;
          transition: background 0.2s ease, border-color 0.2s ease;
          cursor: default;
        }

        .ledger-row:hover {
          background: color-mix(in srgb, var(--foreground) 3%, transparent);
          border-bottom-color: transparent;
        }

        .col-year {
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          font-weight: 500;
          color: color-mix(in srgb, var(--foreground) 50%, transparent);
        }

        .col-cert {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .cert-title {
          font-weight: 600;
          color: var(--foreground);
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .cert-badge {
          background: color-mix(in srgb, #10b981 15%, transparent);
          color: #10b981;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.2rem 0.5rem;
          border-radius: 99px;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .col-issuer {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .issuer-img {
          border-radius: 6px;
          background: #ffffff;
        }

        .fallback-logo {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .issuer-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--foreground);
          opacity: 0.85;
        }

        .col-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .skill-pill {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          color: var(--muted);
          white-space: nowrap;
          border: 1px solid color-mix(in srgb, var(--foreground) 8%, transparent);
        }

        .col-link {
          display: flex;
          justify-content: flex-end;
        }

        .ledger-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--muted);
          transition: color 0.2s ease;
          text-decoration: none;
        }

        .ledger-link-btn:hover {
          color: var(--foreground);
        }

        .ledger-link-disabled {
          color: color-mix(in srgb, var(--foreground) 20%, transparent);
          font-weight: 600;
        }

        /* ── Responsive Mobile ── */
        @media (max-width: 1024px) {
          .ledger-header, .ledger-row {
            grid-template-columns: 60px 2fr 1fr 80px; 
          }
          .col-skills {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .awards-heading-row {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .ledger-header {
            display: none; /* Hide header completely on mobile */
          }
          
          .ledger-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
            padding: 1.5rem 0; /* Remove horizontal padding on mobile */
          }

          .col-year {
            font-size: 0.8rem;
            opacity: 0.8;
          }

          .col-cert {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.4rem;
          }

          .cert-title {
            font-size: 1.1rem;
          }

          .col-issuer {
            margin-top: 0.2rem;
          }

          .col-link {
            width: 100%;
            justify-content: flex-start;
            margin-top: 1rem;
          }

          .ledger-link-btn {
            background: color-mix(in srgb, var(--foreground) 5%, transparent);
            padding: 0.6rem 1rem;
            border-radius: 8px;
            width: 100%;
            justify-content: center;
            border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          }
        }
      `}</style>
    </section>
  );
}