"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Floating tags config with positions ── */
const TAGS = [
  { label: "React.js", color: "#61DAFB", top: "8%", left: "8%" },
  { label: "JavaScript", color: "#F7DF1E", top: "5%", right: "6%" },
  { label: "Next.js", color: "#ffffff", top: "42%", left: "2%" },
  { label: "TypeScript", color: "#3178C6", top: "38%", right: "2%" },
  { label: "Node.js", color: "#68A063", bottom: "18%", left: "10%" },
  { label: "Tailwind", color: "#06B6D4", bottom: "12%", right: "8%" },
];

type TagPos = {
  label: string;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

/* ── Cursor component that animates between tag centers ── */
function AnimatedCursor({
  tags,
  containerRef,
}: {
  tags: TagPos[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Wait for layout then start
    const init = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(init);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const moveTo = (idx: number) => {
      const tag = tagRefs.current[idx];
      const container = containerRef.current;
      if (!tag || !container) return;

      const tagRect = tag.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Center of the tag relative to container
      const x = tagRect.left - containerRect.left + tagRect.width / 2;
      const y = tagRect.top - containerRect.top + tagRect.height / 2;
      setCursorPos({ x, y });

      // Click animation after arriving
      const clickTimer = setTimeout(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 300);
      }, 700);

      return clickTimer;
    };

    // Initial position
    moveTo(0);

    const interval = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % tags.length;
        moveTo(next);
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [visible, tags.length]);

  return (
    <>
      {/* Tag elements (invisible anchors for position) */}
      {tags.map((tag, i) => (
        <div
          key={tag.label}
          ref={(el) => {
            tagRefs.current[i] = el;
          }}
          className={`contact-tag ${activeIdx === i ? "contact-tag-active" : ""}`}
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            bottom: tag.bottom,
            borderColor: activeIdx === i ? tag.color : undefined,
            boxShadow: activeIdx === i ? `0 0 12px ${tag.color}33` : undefined,
          }}
        >
          <span className="contact-tag-dot" style={{ background: tag.color }} />
          {tag.label}
        </div>
      ))}

      {/* SVG cursor */}
      {visible && (
        <div
          className="contact-cursor"
          style={{
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            style={{
              transform: clicking ? "scale(0.85)" : "scale(1)",
              transition: "transform 0.15s ease",
            }}
          >
            <path
              d="M4 2L18 10.5L11 12.5L8.5 19L4 2Z"
              fill="var(--foreground)"
              stroke="var(--background)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          {clicking && <div className="contact-cursor-ripple" />}
        </div>
      )}
    </>
  );
}

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT — Visual */}
          <div ref={containerRef} className="contact-visual">
            {/* Background ring decorations */}
            <div className="contact-ring contact-ring-1" />
            <div className="contact-ring contact-ring-2" />
            <div className="contact-ring contact-ring-3" />

            {/* Center monogram */}
            <div className="contact-monogram">
              <span className="contact-monogram-text">JR</span>
              <div className="contact-monogram-ring" />
            </div>

            {/* Floating tags + animated cursor */}
            <AnimatedCursor tags={TAGS} containerRef={containerRef} />
          </div>

          {/* RIGHT — Content */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <p className="contact-eyebrow">/ get in touch</p>

            <h2 className="contact-heading">
              Any questions or
              <br />
              just want to{" "}
              <span className="contact-heading-accent">say hi?</span>
            </h2>

            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              Feel free to reach out whether it is about a project, a
              collaboration, or just a conversation. I read every message.
            </p>

            {/* Email CTA */}
            <Link
              href="mailto:josuaronaldo96@gmail.com"
              className="contact-email-btn"
            >
              <span className="contact-email-icon">✉</span>
              josuaronaldo96@gmail.com
              <span className="contact-email-arrow">↗</span>
            </Link>

            {/* Divider */}
            <div className="contact-divider" />
          </div>
        </div>
      </div>

      <style>{`
        /* ── Visual container ── */
        .contact-visual {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 420px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Decorative rings ── */
        .contact-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--border);
          pointer-events: none;
        }
        .contact-ring-1 { width: 55%; height: 55%; opacity: 0.6; }
        .contact-ring-2 { width: 75%; height: 75%; opacity: 0.35; }
        .contact-ring-3 { width: 95%; height: 95%; opacity: 0.18; }

        /* ── Monogram ── */
        .contact-monogram {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96px;
          height: 96px;
        }
        .contact-monogram-text {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--foreground);
          line-height: 1;
          position: relative;
          z-index: 1;
        }
        .contact-monogram-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          animation: monogram-spin 12s linear infinite;
          background: conic-gradient(from 0deg, transparent 70%, var(--foreground) 100%);
          -webkit-mask: radial-gradient(circle, transparent 60%, black 61%);
          mask: radial-gradient(circle, transparent 60%, black 61%);
          opacity: 0.5;
        }
        @keyframes monogram-spin {
          to { transform: rotate(360deg); }
        }

        /* ── Floating tags ── */
        .contact-tag {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--foreground);
          white-space: nowrap;
          backdrop-filter: blur(8px);
          z-index: 3;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
          animation: tag-float 4s ease-in-out infinite;
        }
        .contact-tag:nth-child(1) { animation-delay: 0s; }
        .contact-tag:nth-child(2) { animation-delay: 0.6s; }
        .contact-tag:nth-child(3) { animation-delay: 1.2s; }
        .contact-tag:nth-child(4) { animation-delay: 1.8s; }
        .contact-tag:nth-child(5) { animation-delay: 2.4s; }
        .contact-tag:nth-child(6) { animation-delay: 3.0s; }

        .contact-tag-active {
          transform: scale(1.08) translateY(-2px);
        }

        @keyframes tag-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        .contact-tag-active {
          animation: tag-float-active 4s ease-in-out infinite;
        }
        @keyframes tag-float-active {
          0%, 100% { transform: scale(1.08) translateY(-2px); }
          50%       { transform: scale(1.08) translateY(-7px); }
        }

        .contact-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Animated cursor ── */
        .contact-cursor {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          pointer-events: none;
          transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-left: 8px;
          margin-top: 8px;
        }
        .contact-cursor-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid var(--foreground);
          transform: translate(-50%, -50%);
          animation: cursor-ripple 0.4s ease-out forwards;
          pointer-events: none;
        }
        @keyframes cursor-ripple {
          from { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          to   { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }

        /* ── Right side content ── */
        .contact-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .contact-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--foreground);
          margin: 0;
        }

        .contact-heading-accent {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .contact-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.85rem 1.5rem;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--foreground);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          width: fit-content;
        }
        .contact-email-btn:hover {
          background: var(--primary);
          color: var(--background);
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .contact-email-icon { font-size: 1rem; }
        .contact-email-arrow {
          margin-left: auto;
          font-size: 1rem;
          transition: transform 0.2s;
        }
        .contact-email-btn:hover .contact-email-arrow {
          transform: translate(2px, -2px);
        }

        .contact-divider {
          height: 1px;
          background: var(--border);
          width: 100%;
        }

        .contact-social-link {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--muted);
          transition: color 0.2s, transform 0.2s;
          display: inline-block;
        }
        .contact-social-link:hover {
          color: var(--foreground);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
