"use client";

import Link from "next/link";
import contactsData from "@/data/contact.json";

export default function ContactCard() {
  return (
    <div className="brutal-social-wrap">
      {/* Top text */}
      <div className="brutal-header">
        <p className="brutal-eyebrow">/ connect with me</p>
        <h2 className="brutal-title">
          Let's build<br />
          <span>something.</span>
        </h2>
      </div>

      {/* Contact links */}
      <div className="brutal-links">
        {contactsData.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-link"
          >
            <span className="brutal-link-text">{item.platform}</span>
            <span className="brutal-link-arrow">↗</span>
          </Link>
        ))}
      </div>

      {/* Location */}
      <div className="brutal-location">
        <span>Jakarta, ID</span>
        <span className="brutal-dot"></span>
        <span>Worldwide</span>
      </div>

      <style>{`
        .brutal-social-wrap {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          height: 100%;
          padding-right: 2rem;
        }

        /* Header */
        .brutal-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .brutal-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }

        .brutal-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--foreground);
          margin: 0;
        }

        .brutal-title span {
          color: color-mix(in srgb, var(--foreground) 40%, transparent);
        }

        /* Links */
        .brutal-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .brutal-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0;
          border-bottom: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          color: var(--foreground);
          text-decoration: none;
          transition: padding-left 0.3s ease, border-color 0.3s ease;
          group: hover;
        }

        .brutal-link:hover {
          padding-left: 1.5rem;
          border-bottom-color: var(--foreground);
        }

        .brutal-link-text {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .brutal-link-arrow {
          font-size: 1.5rem;
          font-weight: 300;
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .brutal-link:hover .brutal-link-arrow {
          opacity: 1;
          transform: translate(4px, -4px);
        }

        /* Location */
        .brutal-location {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: auto;
          padding-top: 2rem;
        }

        .brutal-dot {
          width: 4px;
          height: 4px;
          background: var(--foreground);
          border-radius: 50%;
        }

        @media (max-width: 1024px) {
          .brutal-social-wrap {
            padding-right: 0;
            gap: 3rem;
          }
          .brutal-link-text {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}