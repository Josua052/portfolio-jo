import Link from "next/link";
import AnimatedElement from "@/components/ui/AnimatedElement";
import ContactVisual from "./ContactVisual";

export default function ContactSection() {

  return (
    <section className="section">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT — Visual */}
          <AnimatedElement className="w-full flex justify-center" delay={0} initialX={-40} initialY={0} exitX={-40} exitY={0}>
            <ContactVisual />
          </AnimatedElement>

          {/* RIGHT — Content */}
          <div className="flex flex-col gap-6 w-full">
            {/* Eyebrow */}
            <AnimatedElement delay={0.1} initialX={40} initialY={0} exitX={40} exitY={0}>
              <p className="contact-eyebrow">/ get in touch</p>
            </AnimatedElement>

            <AnimatedElement delay={0.2} initialX={40} initialY={0} exitX={40} exitY={0}>
              <h2 className="contact-heading">
                Any questions or
                <br />
                just want to{" "}
                <span className="contact-heading-accent">say hi?</span>
              </h2>
            </AnimatedElement>

            <AnimatedElement delay={0.3} initialX={40} initialY={0} exitX={40} exitY={0}>
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
            </AnimatedElement>

            {/* Email CTA */}
            <AnimatedElement delay={0.4} initialX={40} initialY={0} exitX={40} exitY={0}>
              <Link
                href="mailto:josuaronaldo96@gmail.com"
                className="contact-email-btn"
              >
                <span className="contact-email-icon">✉</span>
                josuaronaldo96@gmail.com
                <span className="contact-email-arrow">↗</span>
              </Link>
            </AnimatedElement>

            {/* Divider */}
            <AnimatedElement delay={0.5} initialX={40} initialY={0} exitX={40} exitY={0}>
              <div className="contact-divider" />
            </AnimatedElement>
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
