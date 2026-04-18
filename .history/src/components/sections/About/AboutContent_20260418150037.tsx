"use client";

import Image from "next/image";

const STATS = [
  { value: "3", label: "Years designing" },
  { value: "1yr", label: "Industry experience" },
  { value: "5", label: "Projects shipped" },
];

const SKILLS = [
  { name: "React.js", color: "#61DAFB" },
  { name: "Next.js", color: "#0070f3" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Flutter", color: "#54C5F8" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Node.js", color: "#68A063" },
  { name: "Adobe CC", color: "#FF0000" },
];

export function AboutContent() {
  return (
    <section className="section about-content-section">
      <div className="container-custom">
        <div className="about-grid">
          {/* ── LEFT: Photo + stats ── */}
          <div className="about-photo-col">
            <div className="about-photo-wrap">
              <div className="about-photo-frame">
                <Image
                  src="/images/profile1.jpg"
                  alt="Josua Ronaldo Pandiangan"
                  width={500}
                  height={600}
                  className="about-photo-img"
                />
                <div className="about-photo-gradient" />
              </div>

              <div className="about-stat-card about-stat-card-tl">
                <span className="about-stat-value">{STATS[0].value}</span>
                <span className="about-stat-label">{STATS[0].label}</span>
              </div>
              <div className="about-stat-card about-stat-card-br">
                <span className="about-stat-value">{STATS[2].value}</span>
                <span className="about-stat-label">{STATS[2].label}</span>
              </div>

              <div
                className="about-photo-corner about-photo-corner-tl"
                aria-hidden
              />
              <div
                className="about-photo-corner about-photo-corner-br"
                aria-hidden
              />
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="about-content-col">
            <p className="about-content-eyebrow">/ introduction</p>

            <h2 className="about-content-heading">
              My Name
              <br />
              <span className="about-content-heading-outline">
                Josua Ronaldo Pandiangan
              </span>
            </h2>

            {/* ── Bio Block ── */}
            <div className="about-bio-wrap">
              {/* Highlighted Quote */}
              <div className="about-bio-quote">
                <span className="about-bio-quote-mark">"</span>
                <p>
                  Full-stack developer & UI/UX designer from the land of Batak
                  where we code as hard as we talk, and ship products faster
                  than we finish a plate of <em>saksang</em>.
                </p>
              </div>

              <div className="about-bio-divider" />

              {/* Bio segments */}
              <div className="about-bio-segments">
                <div className="about-bio-segment">
                  <span className="about-bio-segment-label">Background</span>
                  <p>
                    IT graduate from <strong>Universitas Sumatera Utara</strong>{" "}
                    with 3+ years shaping digital products from pixel-perfect
                    interfaces to production ready systems.
                  </p>
                </div>

                <div className="about-bio-segment">
                  <span className="about-bio-segment-label">Expertise</span>
                  <p>
                    Specializing in <strong>React.js, Flutter & Figma</strong>
                    <br />
                    bridging design and engineering to deliver experiences that
                    are fast, accessible, and actually enjoyable to use.
                  </p>
                </div>

                <div className="about-bio-segment">
                  <span className="about-bio-segment-label">
                    Beyond the screen
                  </span>
                  <p>
                    Fueled by football, emerging tech, and side projects. Firm
                    believer that the best code like Batak music hits
                    differently when there is soul behind it.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="about-stats-row">
              {STATS.map((s) => (
                <div key={s.label} className="about-stat-inline">
                  <span className="about-stat-inline-value">{s.value}</span>
                  <span className="about-stat-inline-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="about-skills-wrap">
              <p className="about-skills-label">Tech &amp; Tools</p>
              <div className="about-skills-list">
                {SKILLS.map((sk) => (
                  <span key={sk.name} className="about-skill-tag">
                    <span
                      className="about-skill-dot"
                      style={{ background: sk.color }}
                    />
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-content-section {
          background: var(--background) !important;
          color: var(--foreground);
        }

        /* ── Layout ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* ── Photo column ── */
        .about-photo-col { position: relative; }
        .about-photo-wrap {
          position: relative;
          display: inline-block;
          width: 100%;
        }
        .about-photo-frame {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid var(--border);
          aspect-ratio: 4 / 5;
          background: var(--secondary);
        }
        .about-photo-img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          display: block;
          transition: transform 0.6s ease;
        }
        .about-photo-frame:hover .about-photo-img {
          transform: scale(1.03);
        }
        .about-photo-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 35%;
          background: linear-gradient(to top, var(--background), transparent);
          pointer-events: none;
        }
        .about-photo-corner {
          position: absolute;
          width: 32px;
          height: 32px;
          border-color: var(--foreground);
          border-style: solid;
          opacity: 0.2;
        }
        .about-photo-corner-tl {
          top: -8px; left: -8px;
          border-width: 2px 0 0 2px;
          border-radius: 4px 0 0 0;
        }
        .about-photo-corner-br {
          bottom: -8px; right: -8px;
          border-width: 0 2px 2px 0;
          border-radius: 0 0 4px 0;
        }
        .about-stat-card {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.25rem;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--background);
          backdrop-filter: blur(12px);
          z-index: 2;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
        }
        .about-stat-card-tl { top: 1.5rem; left: -1.25rem; }
        .about-stat-card-br { bottom: 3rem; right: -1.25rem; }
        .about-stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);
          line-height: 1;
        }
        .about-stat-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 0.25rem;
        }

        /* ── Content column ── */
        .about-content-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          padding-top: 1rem;
        }
        .about-content-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .about-content-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: var(--foreground);
          margin: 0;
        }
        .about-content-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        /* ── Bio block ── */
        .about-bio-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Quote block */
        .about-bio-quote {
          position: relative;
          padding: 1.1rem 1.25rem 1.1rem 1.5rem;
          border-left: 3px solid var(--foreground);
          background: var(--secondary);
          border-radius: 0 12px 12px 0;
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .about-bio-quote-mark {
          font-family: Georgia, serif;
          font-size: 2.5rem;
          line-height: 1;
          font-weight: 900;
          color: var(--foreground);
          opacity: 0.15;
          margin-top: -0.25rem;
          flex-shrink: 0;
          user-select: none;
        }
        .about-bio-quote p {
          font-size: 0.9rem;
          line-height: 1.75;
          color: var(--foreground);
          font-style: italic;
          margin: 0;
        }
        .about-bio-quote em {
          font-style: normal;
          font-weight: 700;
        }

        /* Thin divider */
        .about-bio-divider {
          height: 1px;
          background: var(--border);
          width: 100%;
          opacity: 0.6;
        }

        /* Bio segments */
        .about-bio-segments {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .about-bio-segment {
          display: grid;
          grid-template-columns: 8.5rem 1fr;
          gap: 0.75rem;
          align-items: baseline; 
        }
        @media (max-width: 500px) {
          .about-bio-segment {
            grid-template-columns: 1fr;
            gap: 0.2rem;
          }
        }
        .about-bio-segment-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          padding-top: 0.15rem;
          word-break: break-word; 
        }
        .about-bio-segment p {
          font-size: 0.9rem;
          line-height: 1.75;
          color: var(--muted);
          margin: 0;
        }
        .about-bio-segment strong {
          color: var(--foreground);
          font-weight: 600;
        }

        /* ── Stats row ── */
        .about-stats-row {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--background);
        }
        .about-stat-inline {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          gap: 0.25rem;
          border-right: 1px solid var(--border);
          background: var(--background);
        }
        .about-stat-inline:last-child { border-right: none; }
        .about-stat-inline-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);
          line-height: 1;
        }
        .about-stat-inline-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── Skills ── */
        .about-skills-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .about-skills-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .about-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .about-skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid var(--border);
          color: var(--foreground);
          background: var(--background);
          cursor: default;
        }
        .about-skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
