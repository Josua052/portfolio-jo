"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plane, QrCode } from "lucide-react";

export function AboutEducation() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  // Generate a random-looking barcode pattern
  const barcodePattern = [
    3, 1, 4, 2, 2, 6, 1, 3, 2, 1, 4, 5, 1, 2, 3, 2, 1, 4, 2, 3, 1, 2, 5, 2, 1,
    4, 2,
  ];

  return (
    <section className="about-edu-ticket-section" ref={containerRef}>
      <div className="container-custom">
        {/* Section heading */}
        <motion.div
          className="about-edu-heading-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="about-edu-eyebrow">education</p>
          <div className="about-edu-heading-row">
            <h2 className="about-edu-heading">
              First Class
              <br />
              <span className="about-edu-heading-outline">Journey</span>
            </h2>
            <p className="about-edu-heading-sub">
              A boarding pass to my academic foundation and future trajectory in
              technology.
            </p>
          </div>
        </motion.div>

        {/* VIP BOARDING PASS */}
        <div className="ticket-wrapper-container">
          <motion.div
            className="ticket-container"
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            animate={{
              opacity: inView ? 1 : 0,
              rotateX: inView ? 0 : 20,
              y: inView ? 0 : 50,
            }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.02, rotateZ: 0.5 }}
          >
            {/* Left: Main Ticket Body */}
            <div className="ticket-main">
              <div className="ticket-header">
                <div className="header-brand">
                  <Plane className="brand-icon" size={20} />
                  <span>JOSUA AIRLINES // ACADEMIC CLASS</span>
                </div>
                <span className="header-class">FIRST CLASS</span>
              </div>

              <div className="ticket-body">
                {/* Row 1 */}
                <div className="ticket-row">
                  <div className="data-group">
                    <label>PASSENGER NAME</label>
                    <p className="data-value">Ronaldo, Josua</p>
                  </div>
                  <div className="data-group">
                    <label>FLIGHT DURATION</label>
                    <p className="data-value">2019 — 2025</p>
                  </div>
                  <div className="data-group">
                    <label>GATE</label>
                    <p className="data-value">IT-01</p>
                  </div>
                </div>

                {/* Row 2: Flight Path (The massive visual center) */}
                <div className="ticket-row big-row">
                  <div className="data-group">
                    <label>FROM (ORIGIN)</label>
                    <h2 className="airport-code">MED</h2>
                    <p className="airport-name">Medan, Indonesia</p>
                  </div>

                  <div className="flight-path-visual">
                    <div className="flight-dot"></div>
                    <div className="flight-line"></div>
                    <Plane className="flight-plane-icon" size={24} />
                    <div className="flight-line"></div>
                    <div className="flight-dot filled"></div>
                  </div>

                  <div className="data-group align-right">
                    <label>TO (DESTINATION)</label>
                    <h2 className="airport-code">USU</h2>
                    <p className="airport-name">Bachelor of IT</p>
                  </div>
                </div>

                {/* Row 3: Achievements */}
                <div className="ticket-row bg-accent">
                  <div className="data-group">
                    <label>SEAT / HONORS</label>
                    <p className="data-value highlight-value">
                      GPA 3.57 (High Honors)
                    </p>
                  </div>
                  <div className="data-group">
                    <label>CAPSTONE MISSION</label>
                    <p className="data-value">
                      AI Oral Cancer Detection via EfficientnetV2
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Perforated Separator */}
            <div className="ticket-separator"></div>

            {/* Right: Ticket Stub */}
            <div className="ticket-stub">
              <div className="stub-header">BOARDING PASS</div>

              <div className="stub-body">
                <div className="data-group">
                  <label>PASSENGER</label>
                  <p className="data-value">Ronaldo, J.</p>
                </div>
                <div className="data-group">
                  <label>DESTINATION</label>
                  <p className="data-value">B.IT @ USU</p>
                </div>

                <div className="qr-container">
                  <QrCode size={64} strokeWidth={1} className="qr-icon" />
                </div>

                {/* Fake Barcode */}
                <div className="barcode">
                  {barcodePattern.map((width, idx) => (
                    <div
                      key={idx}
                      className="bar"
                      style={{ width: `${width}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .about-edu-ticket-section {
          background: var(--background);
          color: var(--foreground);
          padding: 5rem 1.5rem 8rem;
          perspective: 1200px; /* Crucial for 3D hover effects */
        }

        /* ── Heading block ── */
        .about-edu-heading-wrap {
          margin-bottom: 5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .about-edu-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .about-edu-heading-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .about-edu-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--foreground);
          margin: 0;
        }

        .about-edu-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .about-edu-heading-sub {
          max-width: 380px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--muted);
          padding-bottom: 0.25rem;
        }

        /* ── Ticket Layout ── */
        .ticket-wrapper-container {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .ticket-container {
          display: flex;
          width: 100%;
          max-width: 900px;
          background: color-mix(in srgb, var(--background) 40%, transparent);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid color-mix(in srgb, var(--foreground) 15%, transparent);
          border-radius: 24px;
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.5);
          overflow: visible; /* To allow the pseudo cutouts to peek through */
          cursor: pointer;
        }

        /* ── Ticket Main ── */
        .ticket-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 2.5rem;
        }

        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid var(--foreground);
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--foreground);
        }

        .header-class {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          background: var(--foreground);
          color: var(--background);
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
        }

        .ticket-body {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .ticket-row {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
        }

        .bg-accent {
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
        }

        .data-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .align-right {
          text-align: right;
          align-items: flex-end;
        }

        label {
          font-family: 'Fira Code', monospace;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .data-value {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .highlight-value {
          color: var(--foreground);
          text-shadow: 0 0 10px color-mix(in srgb, var(--foreground) 40%, transparent);
        }

        /* Flight Path Row */
        .big-row {
          align-items: center;
          margin: 1rem 0;
        }

        .airport-code {
          font-family: var(--font-montserrat), serif;
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.05em;
          color: var(--foreground);
        }

        .airport-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--muted);
        }

        .flight-path-visual {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0 1rem;
          color: var(--muted);
        }

        .flight-line {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(to right, var(--muted), var(--muted) 4px, transparent 4px, transparent 8px);
        }

        .flight-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 2px solid var(--muted);
        }

        .flight-dot.filled {
          background: var(--foreground);
          border-color: var(--foreground);
        }

        .flight-plane-icon {
          color: var(--foreground);
        }

        /* ── Ticket Separator (The Perforation) ── */
        .ticket-separator {
          position: relative;
          width: 2px;
          background: repeating-linear-gradient(to bottom, transparent, transparent 8px, color-mix(in srgb, var(--foreground) 20%, transparent) 8px, color-mix(in srgb, var(--foreground) 20%, transparent) 16px);
        }

        /* The Cutouts using the page background color to punch a hole */
        .ticket-separator::before,
        .ticket-separator::after {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          background: var(--background);
          border-radius: 50%;
          left: -14px;
          z-index: 10;
          /* Add a border inside the cutout to match the ticket border */
          border: 1px solid color-mix(in srgb, var(--foreground) 15%, transparent);
        }

        /* We need to hide the half of the border that bleeds into the ticket */
        .ticket-separator::before {
          top: -16px;
          clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
        }
        .ticket-separator::after {
          bottom: -16px;
          clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        }

        /* ── Ticket Stub (Right Side) ── */
        .ticket-stub {
          width: 280px;
          display: flex;
          flex-direction: column;
          padding: 2.5rem;
          background: color-mix(in srgb, var(--foreground) 2%, transparent);
        }

        .stub-header {
          font-family: 'Fira Code', monospace;
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--foreground);
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--foreground);
        }

        .stub-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
        }

        .qr-container {
          margin-top: auto;
          display: flex;
          justify-content: center;
          padding: 1rem;
          background: var(--foreground);
          color: var(--background);
          border-radius: 12px;
        }

        .barcode {
          display: flex;
          height: 40px;
          width: 100%;
          justify-content: center;
          gap: 2px;
          margin-top: 1rem;
        }

        .bar {
          background: var(--foreground);
          height: 100%;
        }

        /* ── Responsive Mobile ── */
        @media (max-width: 1024px) {
          .airport-code { font-size: 3rem; }
          .ticket-main { padding: 2rem; }
          .ticket-stub { padding: 2rem; width: 240px; }
        }

        @media (max-width: 768px) {
          .ticket-container {
            flex-direction: column;
          }
          
          .ticket-separator {
            width: 100%;
            height: 2px;
            background: repeating-linear-gradient(to right, transparent, transparent 8px, color-mix(in srgb, var(--foreground) 20%, transparent) 8px, color-mix(in srgb, var(--foreground) 20%, transparent) 16px);
          }

          /* Adjust cutouts for horizontal separator */
          .ticket-separator::before,
          .ticket-separator::after {
            top: -14px;
          }
          .ticket-separator::before {
            left: -16px;
            clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
          }
          .ticket-separator::after {
            right: -16px;
            left: auto;
            bottom: auto;
            clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
          }

          .ticket-stub {
            width: 100%;
            border-left: none;
          }

          .ticket-row {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .big-row {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .flight-path-visual {
            display: none; /* Hide plane line on mobile to save space */
          }
          
          .align-right {
            text-align: left;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
