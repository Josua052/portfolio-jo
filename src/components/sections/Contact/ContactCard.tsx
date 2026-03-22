// src/components/contact/ContactCard.tsx
"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, Phone, ArrowUpRight, MapPin } from "lucide-react";
import contactsData from "@/data/contact.json";

/* Map icon string → Lucide component */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties; }>> = {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
};

/* Color accent per platform */
const PLATFORM_COLOR: Record<string, string> = {
  GitHub:    "#333",
  LinkedIn:  "#0A66C2",
  Instagram: "#E1306C",
  Email:     "#6366f1",
  WhatsApp:  "#22c55e",
};

export default function ContactCard() {
  return (
    <div className="cc-wrap">

      {/* Top text */}
      <div className="cc-header">
        <p className="cc-eyebrow">/ connect with me</p>
        <h2 className="cc-title">
          Find me<br />
          <span className="cc-title-outline">online</span>
        </h2>
        <p className="cc-sub">
          Whether it is a quick question or a long-term collaboration —
          I am always open to a good conversation.
        </p>
      </div>

      {/* Contact links */}
      <div className="cc-links">
        {contactsData.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? Mail;
          const color = PLATFORM_COLOR[item.platform] ?? "#94a3b8";

          return (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-link"
            >
              {/* Icon badge */}
              <div
                className="cc-link-icon"
                style={{ background: `${color}14`, borderColor: `${color}28` }}
              >
                <Icon size={17} style={{ color }} />
              </div>

              {/* Text */}
              <div className="cc-link-text">
                <span className="cc-link-platform">{item.platform}</span>
                <span className="cc-link-value">{item.display}</span>
              </div>

              {/* Arrow */}
              <ArrowUpRight size={14} className="cc-link-arrow" />
            </Link>
          );
        })}
      </div>

      {/* Location badge */}
      <div className="cc-location">
        <MapPin size={13} />
        <span>Jakarta, Indonesia · Open to remote</span>
      </div>

      <style>{`
        .cc-wrap {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          height: 100%;
        }

        /* Header */
        .cc-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .cc-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .cc-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: var(--foreground);
          margin: 0;
        }
        .cc-title-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .cc-sub {
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
          max-width: 320px;
        }

        /* Links list */
        .cc-links {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .cc-link {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--background);
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .cc-link:hover {
          border-color: var(--foreground);
          background: var(--hover);
          transform: translateX(4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        .cc-link-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cc-link-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          flex: 1;
          min-width: 0;
        }
        .cc-link-platform {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          line-height: 1;
        }
        .cc-link-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cc-link-arrow {
          color: var(--muted);
          flex-shrink: 0;
          opacity: 0;
          transform: translate(-3px, 3px);
          transition: opacity 0.2s, transform 0.2s, color 0.2s;
        }
        .cc-link:hover .cc-link-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: var(--foreground);
        }

        /* Location */
        .cc-location {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--muted);
          padding: 0.4rem 0.875rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--background);
          width: fit-content;
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}