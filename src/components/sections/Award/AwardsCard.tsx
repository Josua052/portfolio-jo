// src/components/awards/AwardCard.tsx
"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ── Type — exported so AwardsSection can import it ── */
export type Award = {
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
  skills?: string[];
  credentialUrl?: string;
};

/* ── Issuer config ──
   logo: path to /public/images/issuers/*.png (or svg)
   Place the actual logo files at those paths.
   color: accent used for hover border + top bar
────────────────────────────────────────────── */
export const ISSUER_CONFIG: Record<
  string,
  { logo: string; color: string; fallback: string }
> = {
  HackerRank: {
    logo: "/images/issuers/hackerrank.png",
    color: "#22c55e",
    fallback: "HR",
  },
  "Dicoding Indonesia": {
    logo: "/images/issuers/dicoding.png",
    color: "#6366f1",
    fallback: "DC",
  },
  "Infinite Learning Indonesia": {
    logo: "/images/issuers/infinitelearning.png",
    color: "#06B6D4",
    fallback: "IL",
  },
  "Edspert.id": {
    logo: "/images/issuers/edspert.png",
    color: "#f59e0b",
    fallback: "ED",
  },
  "Universitas Gadjah Mada": {
    logo: "/images/issuers/ugm.jpg",
    color: "#3b82f6",
    fallback: "UGM",
  },
};

/* ── useInView ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ── IssuerLogo — shows image, falls back to initials ── */
function IssuerLogo({
  issuer,
  color,
  logo,
  fallback,
}: {
  issuer: string;
  color: string;
  logo: string;
  fallback: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="award-issuer-badge"
      style={{
        background: `${color}14`,
        borderColor: `${color}30`,
      }}
      title={issuer}
    >
      {!imgError ? (
        <Image
          src={logo}
          alt={issuer}
          width={22}
          height={22}
          className="award-issuer-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="award-issuer-fallback" style={{ color }}>
          {fallback}
        </span>
      )}
    </div>
  );
}

/* ── AwardCard — default export ── */
export default function AwardCard({
  award,
  delay,
  index,
}: {
  award: Award;
  delay: number;
  index: number;
}) {
  const { ref, inView } = useInView();
  const cfg = ISSUER_CONFIG[award.issuer] ?? {
    logo: "",
    color: "#94a3b8",
    fallback: award.issuer.slice(0, 2).toUpperCase(),
  };
  const isNew =
    award.issued?.includes("2026") || award.issued?.includes("2025");

  return (
    <div
      ref={ref}
      className="award-card-outer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`,
      }}
    >
      {/* Watermark index */}
      <span className="award-watermark" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className="award-card"
        style={{ "--accent": cfg.color } as React.CSSProperties}
      >
        {/* Accent top bar — visible on hover */}
        <div className="award-accent-bar" />

        {/* Header row */}
        <div className="award-header">
          <IssuerLogo
            issuer={award.issuer}
            color={cfg.color}
            logo={cfg.logo}
            fallback={cfg.fallback}
          />

          {isNew && <span className="award-new-tag">New</span>}

          {award.credentialUrl && (
            <a
              href={award.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="award-external"
              aria-label="View credential"
            >
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="award-title">{award.title}</h3>

        {/* Issuer name */}
        <p className="award-issuer">{award.issuer}</p>

        {/* Dates */}
        {(award.issued || award.expires) && (
          <div className="award-dates">
            {award.issued && <span>Issued {award.issued}</span>}
            {award.issued && award.expires && (
              <span className="award-dates-sep">·</span>
            )}
            {award.expires && <span>Exp. {award.expires}</span>}
          </div>
        )}

        {/* Skills */}
        {award.skills && award.skills.length > 0 && (
          <div className="award-skills">
            {award.skills.map((s) => (
              <span key={s} className="award-skill-tag">
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="award-footer">
          <span className="award-footer-label">
            {award.credentialUrl ? "View credential" : "Certificate"}
          </span>
          <ArrowUpRight size={13} className="award-footer-arrow" />
        </div>
      </div>

      <style>{`
        .award-card-outer {
          position: relative;
        }

        /* Large watermark number behind card */
        .award-watermark {
          position: absolute;
          top: -0.75rem;
          right: 0.75rem;
          font-family: var(--font-montserrat), serif;
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          color: var(--border);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          opacity: 0.4;
        }

        .award-card {
          position: relative;
          z-index: 1;
          height: 100%;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .award-card:hover {
          border-color: var(--accent, var(--foreground));
          box-shadow:
            0 0 0 1px var(--accent, var(--foreground)),
            0 8px 32px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        /* Accent bar */
        .award-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent, var(--border));
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 1.25rem 1.25rem 0 0;
        }
        .award-card:hover .award-accent-bar { opacity: 1; }

        /* Header */
        .award-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Issuer badge */
        .award-issuer-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .award-issuer-img {
          object-fit: contain;
          width: 24px !important;
          height: 24px !important;
        }
        .award-issuer-fallback {
          font-family: var(--font-montserrat), serif;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        /* New badge */
        .award-new-tag {
          margin-left: auto;
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(34,197,94,0.12);
          color: #22c55e;
          border: 1px solid rgba(34,197,94,0.25);
        }

        /* External link */
        .award-external {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid var(--border);
          color: var(--muted);
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .award-external:hover {
          color: var(--foreground);
          border-color: var(--foreground);
          background: var(--hover);
        }

        /* Content */
        .award-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.35;
        }
        .award-issuer {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--muted);
          margin: 0;
        }

        /* Dates */
        .award-dates {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: var(--muted);
          opacity: 0.75;
        }
        .award-dates-sep { opacity: 0.4; }

        /* Skills */
        .award-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .award-skill-tag {
          display: inline-flex;
          padding: 0.18rem 0.6rem;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 600;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--secondary);
          transition: color 0.2s, border-color 0.2s;
        }
        .award-card:hover .award-skill-tag {
          color: var(--foreground);
          border-color: var(--accent, var(--foreground));
          opacity: 0.7;
        }

        /* Footer */
        .award-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }
        .award-footer-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--muted);
          transition: color 0.2s;
        }
        .award-card:hover .award-footer-label { color: var(--foreground); }

        .award-footer-arrow {
          color: var(--muted);
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.2s, transform 0.2s, color 0.2s;
        }
        .award-card:hover .award-footer-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: var(--foreground);
        }
      `}</style>
    </div>
  );
}
