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
              {/* Photo frame */}
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

              {/* Floating stat cards */}
              <div className="about-stat-card about-stat-card-tl">
                <span className="about-stat-value">{STATS[0].value}</span>
                <span className="about-stat-label">{STATS[0].label}</span>
              </div>
              <div className="about-stat-card about-stat-card-br">
                <span className="about-stat-value">{STATS[2].value}</span>
                <span className="about-stat-label">{STATS[2].label}</span>
              </div>

              {/* Corner bracket accents */}
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

            <div className="about-paragraphs">
              <p>
                I am a passionate UI/UX designer and full-stack developer with
                over
                <strong> 3 years</strong> of experience crafting intuitive and
                visually engaging digital products — plus 1 year of real-world
                industry experience delivering scalable solutions.
              </p>
              <p>
                As an Information Technology graduate from the{" "}
                <strong>University of North Sumatra</strong>, I specialize in
                React.js, Tailwind CSS, and Flutter, combined with strong design
                expertise in Figma and Adobe Creative Suite.
              </p>
              <p>
                I bridge the gap between design and development — from user
                research and prototyping to building responsive web and mobile
                apps that are both functional and user-centered.
              </p>
              <p>
                Outside of work, I enjoy exploring emerging tech, following
                football, and building creative side projects. I strongly
                believe in continuous learning and staying ahead of design
                trends.
              </p>
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
        /* ── Force section background to follow theme ── */
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

        /* Frame uses only CSS vars — no hardcoded colors */
        .about-photo-frame {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid var(--border);
          aspect-ratio: 4 / 5;
          background: var(--secondary);        /* ✅ respects light/dark */
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

        /* Gradient uses background var so it blends in both modes */
        .about-photo-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 35%;
          background: linear-gradient(to top, var(--background), transparent);
          pointer-events: none;
        }

        /* Corner accents */
        .about-photo-corner {
          position: absolute;
          width: 32px;
          height: 32px;
          border-color: var(--foreground);
          border-style: solid;
          opacity: 0.2;                        /* subtle on both modes */
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

        /* Floating stat cards */
        .about-stat-card {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.25rem;
          border-radius: 14px;
          border: 1px solid var(--border);     /* ✅ var */
          background: var(--background);       /* ✅ var — white in light, dark in dark */
          backdrop-filter: blur(12px);
          z-index: 2;
          /* Shadow adapts: lighter in light mode, darker in dark mode */
          box-shadow:
            0 4px 16px rgba(0,0,0,0.08),
            0 1px 4px rgba(0,0,0,0.04);
        }
        .about-stat-card-tl { top: 1.5rem; left: -1.25rem; }
        .about-stat-card-br { bottom: 3rem; right: -1.25rem; }

        .about-stat-value {
          font-family: var(--font-montserrat), serif;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);            /* ✅ var */
          line-height: 1;
        }
        .about-stat-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);                 /* ✅ var */
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

        /* Paragraphs */
        .about-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .about-paragraphs p {
          font-size: 0.925rem;
          line-height: 1.8;
          color: var(--muted);
        }
        .about-paragraphs strong {
          color: var(--foreground);
          font-weight: 600;
        }

        /* Stats row */
        .about-stats-row {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--background);      /* ✅ var */
        }
        .about-stat-inline {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          gap: 0.25rem;
          border-right: 1px solid var(--border);
          background: var(--background);      /* ✅ var */
          transition: background 0.2s;
        }
        .about-stat-inline:last-child { border-right: none; }
        .about-stat-inline:hover {
          background: var(--hover);
        }

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

        /* Skills */
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
          background: var(--background);      /* ✅ var */
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s, background 0.2s;
          cursor: default;
        }
        .about-skill-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-color: var(--foreground);
          background: var(--hover);           /* ✅ var */
        }
        .about-skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
