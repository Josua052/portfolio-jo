"use client";

export default function AboutHero() {
  return (
    <section className="about-hero">
      {/* Background grid */}
      <div className="about-hero-grid" aria-hidden />

      <div className="about-hero-inner">
        {/* Eyebrow */}
        <p className="about-hero-eyebrow">/ about me</p>

        {/* Heading */}
        <h1 className="about-hero-title">
          <span className="about-hero-title-solid">The person</span>
          <span className="about-hero-title-outline">behind the code</span>
        </h1>

        {/* Sub */}
        <p className="about-hero-sub">
          A glimpse into my journey, skills, and passion in design &amp; development
        </p>

        {/* Divider line */}
        <div className="about-hero-line" aria-hidden />
      </div>

      <style>{`
        .about-hero {
          position: relative;
          width: 100%;
          padding: 8rem 1.5rem 4rem;
          overflow: hidden;
          background: var(--background);
        }

        .about-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.3;
          mask-image: radial-gradient(ellipse 70% 90% at 50% 50%, black 20%, transparent 100%);
        }

        .about-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .about-hero-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          animation: fadeSlideUp 0.6s ease both;
        }

        .about-hero-title {
          display: flex;
          flex-direction: column;
          margin: 0;
          gap: 0.05em;
          animation: fadeSlideUp 0.65s 0.08s ease both;
        }

        .about-hero-title-solid,
        .about-hero-title-outline {
          display: block;
          font-family: var(--font-montserrat), Georgia, serif;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          font-size: clamp(3rem, 7vw, 6rem);
        }

        .about-hero-title-solid {
          color: var(--foreground);
        }

        .about-hero-title-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }

        .about-hero-sub {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 480px;
          animation: fadeSlideUp 0.65s 0.16s ease both;
        }

        .about-hero-line {
          width: 48px;
          height: 2px;
          background: var(--foreground);
          opacity: 0.25;
          animation: fadeSlideUp 0.65s 0.22s ease both;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

