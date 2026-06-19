"use client";

import { useEffect, useRef, useState } from "react";

/* ── Floating tags config with positions ── */
const TAGS = [
  { label: "React.js", color: "#61DAFB", top: "8%", left: "8%" },
  { label: "JavaScript", color: "#F7DF1E", top: "5%", right: "12%" },
  { label: "Next.js", color: "#ffffff", top: "35%", left: "-2%" },
  { label: "TypeScript", color: "#3178C6", top: "30%", right: "-2%" },
  { label: "Node.js", color: "#68A063", bottom: "20%", left: "8%" },
  { label: "Tailwind", color: "#06B6D4", bottom: "18%", right: "12%" },
  { label: "Golang", color: "#00ADD8", top: "-2%", left: "40%" },
  { label: "Laravel", color: "#FF2D20", bottom: "40%", right: "-8%" },
  { label: "PHP", color: "#777BB4", bottom: "-2%", left: "55%" },
  { label: "Figma", color: "#F24E1E", bottom: "35%", left: "-6%" },
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

export default function ContactVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
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
  );
}
