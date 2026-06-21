"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function ContactSection() {
  const { ref: headRef, inView: headIn } = useInView(0.2);

  return (
    <section className="cs-brutalist-section">
      <div className="container-custom" ref={headRef}>
        <div className="cs-brutalist-grid">
          {/* Left Side: Typography and Links (ContactCard) */}
          <div 
            className="cs-left-col"
            style={{
              opacity: headIn ? 1 : 0,
              transform: headIn ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <ContactCard />
          </div>

          {/* Right Side: The Form */}
          <div 
            className="cs-right-col"
            style={{
              opacity: headIn ? 1 : 0,
              transform: headIn ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>

      <style>{`
        .cs-brutalist-section {
          background: var(--background);
          padding: 8rem 1.5rem 10rem;
          border-top: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
        }

        .cs-brutalist-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 6rem;
          align-items: stretch;
        }

        .cs-left-col {
          border-right: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
          display: flex;
          flex-direction: column;
        }

        .cs-right-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .cs-brutalist-grid {
            grid-template-columns: 1fr;
            gap: 5rem;
          }
          .cs-left-col {
            border-right: none;
            border-bottom: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </section>
  );
}