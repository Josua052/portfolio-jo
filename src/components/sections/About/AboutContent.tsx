"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { gdriveProxyUrl } from "@/lib/gdrive";
import { IconQuote } from "@tabler/icons-react";

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

/* 
  Definisi animasi cinematic memori.
  Foto-foto melayang pelan (drift) dari posisi offset ke posisi final.
*/
const SCATTERED_PHOTOS = [
  {
    id: "1IkFybzJapMgsV8TG4sAcBuu_WGcgnwZM",
    left: "60%",
    top: "35%",
    initial: { x: "-15vw", y: "15vh", rotate: -25 },
    animate: { rotate: 12 },
  },
  {
    id: "1XAGEC4_5Cv5793ZFgrtNb7Zj5QmCkocr",
    left: "15%",
    top: "50%",
    initial: { x: "15vw", y: "-15vh", rotate: 25 },
    animate: { rotate: -10 },
  },
  {
    id: "1x8oRATWzzLXh6zeOBRtvHxFyj9pF4Bta",
    left: "75%",
    top: "60%",
    initial: { x: "-15vw", y: "-15vh", rotate: -15 },
    animate: { rotate: 5 },
  },
  {
    id: "13aVvZ397mCf5V2G4SCeHLAS3RTcs4GIq",
    left: "40%",
    top: "15%",
    initial: { x: 0, y: "20vh", rotate: 15 },
    animate: { rotate: -8 },
  },
  {
    id: "1Xotn3OSnnA5v6DzbizbU6MlR4WRsuiHH",
    left: "10%",
    top: "20%",
    initial: { x: "15vw", y: "15vh", rotate: -15 },
    animate: { rotate: 15 },
  },
  {
    id: "1dQibdsid3vDKr7aiO9jekiIFF5bADoe9",
    left: "80%",
    top: "25%",
    initial: { x: "-15vw", y: 0, rotate: 20 },
    animate: { rotate: -15 },
  },
  {
    id: "11Bv5T2B4uPUHcTzCR8m7cDPh7YVvDVY_",
    left: "25%",
    top: "65%",
    initial: { x: 0, y: "-20vh", rotate: -10 },
    animate: { rotate: 8 },
  },
];

const BIO_DATA = [
  {
    id: "bg",
    label: "Background",
    content: (
      <div className="accordion-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
        <p>
          Frontend Engineer experienced in building user-focused web apps with <strong>React.js</strong> and <strong>Next.js</strong>, honed through roles at <strong>PT Global Service Indonesia</strong> and <strong>Apple Developer Academy</strong>.
        </p>
        <p>
          Beyond writing production-ready code, I bridge the gap between technical execution and business strategy—translating complex requirements into clear digital solutions that deliver tangible business outcomes.
        </p>
      </div>
    ),
  },
  {
    id: "exp",
    label: "Expertise",
    content: (
      <p className="accordion-text">
        Specializing in <strong>React.js, Flutter & Figma</strong>. Bridging
        design and engineering to deliver experiences that are fast, accessible,
        and highly enjoyable.
      </p>
    ),
  },
  {
    id: "beyond",
    label: "Beyond the screen",
    content: (
      <p className="accordion-text">
        Fueled by football, emerging tech, and side projects. Firm believer that
        the best code hits differently when there is soul behind it.
      </p>
    ),
  },
  {
    id: "tech",
    label: "Tech & Tools",
    content: (
      <div className="unboxed-skills-list accordion-text">
        {SKILLS.map((sk) => (
          <span key={sk.name} className="unboxed-skill-tag">
            <span
              className="unboxed-skill-dot"
              style={{ background: sk.color }}
            />
            {sk.name}
          </span>
        ))}
      </div>
    ),
  },
];

export function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentPhoto, setCurrentPhoto] = useState<number>(0);

  // Cinematic cycle effect: Ganti foto secara berkala
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % SCATTERED_PHOTOS.length);
    }, 5500); // Ganti foto setiap 5.5 detik
    return () => clearInterval(interval);
  }, []);

  // Subtle parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yContentLeft = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yContentRight = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="about-editorial-section">
      {/* ── 1. Cinematic Memory Cycle ── */}
      <div className="about-scattered-wrapper" aria-hidden="true">
        <AnimatePresence>
          {SCATTERED_PHOTOS.map((photo, index) => {
            if (index !== currentPhoto) return null;

            return (
              <motion.div
                key={photo.id}
                className="about-polaroid-frame absolute-polaroid"
                style={{ left: photo.left, top: photo.top }}
                initial={{ ...photo.initial, opacity: 0, scale: 0.9 }}
                animate={{
                  x: 0,
                  y: 0,
                  rotate: photo.animate.rotate,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 1.05 }} // Dissolve perlahan ke depan
                transition={{
                  duration: 5.0, // Sangat lambat dan halus
                  ease: "easeInOut",
                }}
              >
                <img
                  src={gdriveProxyUrl(photo.id)}
                  alt="Memory"
                  className="about-polaroid-img"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Smooth bottom gradient to fade the legs */}
      <div className="about-bottom-smooth-gradient" aria-hidden="true" />

      <div className="container-custom about-content-relative">
        <div className="about-grid-editorial">
          {/* ── 2. LEFT: Name & Quote (Unboxed) ── */}
          <motion.div
            className="about-col-left"
            style={{ y: yContentLeft }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-name-block">
              <div className="about-eyebrow-wrap">
                <span className="about-eyebrow-line" />
                <p className="about-eyebrow">Introduction</p>
              </div>

              <h2 className="about-name-huge">
                Josua
                <br />
                <span className="about-name-outline">Ronaldo</span>
                Pandiangan
              </h2>

              <div className="about-quote-minimal">
                <IconQuote className="quote-icon-minimal" stroke={1.5} />
                <p>
                  Frontend Engineer from the land of Batak where we code as hard as we talk, and ship digital solutions faster than we finish a plate of <em>saksang</em>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── 3. CENTER: Profile Cutout ── */}
          <div className="about-col-center">
            <motion.div
              className="about-cutout-wrapper"
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5,
              }}
            >
              <Image
                src="/images/dashboard/me.png"
                alt="Josua Ronaldo Pandiangan"
                width={700}
                height={900}
                className="about-cutout-img"
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </motion.div>
          </div>

          {/* ── 4. RIGHT: Interactive Glass Tabs ── */}
          <motion.div
            className="about-col-right"
            style={{ y: yContentRight }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="about-interactive-card">
              <div className="about-card-tabs">
                {BIO_DATA.map((item, index) => {
                  const labelText = item.label.replace(/\d+\s*\/\/\s*/, '').trim();
                  return (
                    <button
                      key={item.id}
                      className={`about-tab-btn ${activeIndex === index ? "active" : ""}`}
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {labelText}
                    </button>
                  );
                })}
              </div>
              
              <div className="about-card-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {BIO_DATA[activeIndex].content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Base Section ── */
        .about-editorial-section {
          position: relative;
          width: 100%;
          background: var(--background);
          color: var(--foreground);
          overflow: hidden;
          padding: 6rem 0 12rem; /* Reduced top space, added bottom space for image overflow */
          display: flex;
          flex-direction: column;
        }

        /* ── Scattered Flying Photos ── */
        .about-scattered-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          opacity: 0.6; /* Transparansi agar tidak menutupi teks */
        }

        .about-polaroid-frame {
          background: #ffffff;
          padding: 10px 10px 38px 10px;
          border-radius: 4px;
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3);
          width: 250px; /* Sedikit lebih besar karena hanya satu yang tampil */
          height: 310px;
        }

        .absolute-polaroid {
          position: absolute;
          will-change: transform, opacity;
        }

        .about-polaroid-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
          background: #f1f5f9;
        }

        /* ── Smooth Bottom Gradient for Legs ── */
        .about-bottom-smooth-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 350px;
          background: linear-gradient(
            to top, 
            var(--background) 0%, 
            color-mix(in srgb, var(--background) 80%, transparent) 30%,
            transparent 100%
          );
          z-index: 20; 
          pointer-events: none;
        }

        /* ── Content Layout ── */
        .about-content-relative {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .about-grid-editorial {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 500px minmax(0, 1fr);
          align-items: center;
          gap: 3rem;
          min-height: 580px; /* Reduced to make the section tighter vertically */
        }

        /* ── LEFT: Name & Quote ── */
        .about-col-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          justify-self: start;
          max-width: 450px;
        }

        .about-name-block {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-eyebrow-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .about-eyebrow-line {
          width: 40px;
          height: 2px;
          background: var(--foreground);
        }

        .about-eyebrow {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--foreground);
          margin: 0;
        }

        .about-name-huge {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2rem, 5vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--foreground);
          margin: 0;
          text-transform: uppercase;
        }

        .about-name-outline {
          -webkit-text-stroke: 2px var(--foreground);
          color: transparent;
          opacity: 0.8;
          display: block;
          margin-top: 0.2rem;
        }

        .about-quote-minimal {
          position: relative;
          margin-top: 1rem;
          padding-left: 1.5rem;
          border-left: 2px solid var(--foreground);
        }

        .quote-icon-minimal {
          width: 20px;
          height: 20px;
          opacity: 0.2;
          position: absolute;
          top: -10px;
          left: -10px;
          background: var(--background);
        }

        .about-quote-minimal p {
          font-size: 1.1rem;
          line-height: 1.7;
          font-style: italic;
          color: var(--foreground);
          opacity: 0.85;
          margin: 0;
        }

        /* ── CENTER: Cutout ── */
        .about-col-center {
          display: flex;
          justify-content: center;
          position: relative;
          height: 100%;
        }

        .about-cutout-wrapper {
          position: absolute;
          bottom: -180px; 
          width: 100%;
          display: flex;
          justify-content: center;
          z-index: 5;
        }

        .about-cutout-img {
          width: 100%;
          max-width: 600px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
          transform: scale(1.15);
          transform-origin: bottom center;
        }

        /* ── RIGHT: Interactive Glass Tabs ── */
        .about-col-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          justify-self: end;
          max-width: 450px;
          width: 100%;
        }

        .about-interactive-card {
          background: color-mix(in srgb, var(--background) 60%, transparent);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .about-card-tabs {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          gap: 0.5rem;
          border-bottom: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          padding-bottom: 1rem;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        
        .about-card-tabs::-webkit-scrollbar {
          display: none;
        }

        .about-tab-btn {
          white-space: nowrap;
          flex-shrink: 0;
          background: transparent;
          border: 1px solid transparent;
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--foreground) 50%, transparent);
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .about-tab-btn:hover {
          color: var(--foreground);
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
        }

        .about-tab-btn.active {
          color: var(--background);
          background: var(--foreground);
          box-shadow: 0 4px 15px color-mix(in srgb, var(--foreground) 30%, transparent);
        }

        .about-card-content {
          min-height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 0.5rem;
        }

        .accordion-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--foreground);
          opacity: 0.9;
          margin: 0;
        }

        .accordion-text strong {
          font-weight: 700;
          color: var(--foreground);
        }

        /* Unboxed Skills */
        .unboxed-skills-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start; 
          gap: 0.6rem;
        }

        .unboxed-skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: 50px; /* match tabs */
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
          color: var(--foreground);
          background: color-mix(in srgb, var(--background) 50%, transparent);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        
        .unboxed-skill-tag:hover {
          transform: scale(1.05);
          border-color: var(--foreground);
        }

        .unboxed-skill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .about-grid-editorial {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .about-col-left {
            order: 1;
            align-items: flex-start;
            justify-self: center;
          }
          .about-col-right {
            order: 2;
            justify-self: center;
          }
          .about-col-center {
            order: 3;
            grid-column: span 2;
            min-height: 450px; /* Reduced slightly */
          }
        }

        @media (max-width: 768px) {
          .about-editorial-section {
            padding: 5rem 0 12rem; /* Ensure bottom padding on mobile too */
          }
          .about-grid-editorial {
            grid-template-columns: 1fr;
            gap: 0; /* Remove gap so we can control precise overlap */
          }
          .about-col-left {
            order: 1;
            margin-bottom: 2rem;
          }
          .about-col-center {
            order: 2;
            grid-column: span 1;
            min-height: 450px;
          }
          .about-col-right {
            order: 3;
            margin-top: -120px; /* Tarik bio ke atas agar menimpa setengah badan bawah objek */
            position: relative;
            z-index: 30; /* Pastikan Bio berada di atas gambar objek */
          }
          .about-quote-minimal p { font-size: 0.95rem; }
          .accordion-text { font-size: 0.95rem; }
        }
      `}</style>
    </section>
  );
}
