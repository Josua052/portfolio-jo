// src/components/testimonial/TestimonialsTicker.tsx
// Server Component — infinite ticker with center-focus depth effect.
// Center card is full size, neighbours shrink + fade creating a 3D carousel feel.

import { unstable_noStore as noStore } from "next/cache";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  relation?: string;
  message: string;
  rating?: number;
  created_at: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="tk-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={10}
          fill={s <= rating ? "#f59e0b" : "none"}
          stroke={s <= rating ? "#f59e0b" : "var(--border)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  const palettes = [
    { bg: "rgba(99,102,241,0.12)",  color: "#6366f1" },
    { bg: "rgba(34,197,94,0.12)",   color: "#22c55e" },
    { bg: "rgba(245,158,11,0.12)",  color: "#f59e0b" },
    { bg: "rgba(6,182,212,0.12)",   color: "#06B6D4" },
    { bg: "rgba(239,68,68,0.12)",   color: "#ef4444" },
    { bg: "rgba(168,85,247,0.12)",  color: "#a855f7" },
  ];
  const p = palettes[index % palettes.length];
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="tk-avatar"
      style={{ background: p.bg, color: p.color, borderColor: `${p.color}33` }}
    >
      {initials}
    </div>
  );
}

export default async function TestimonialsTicker() {
  noStore();

  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  const items = (data ?? []) as Testimonial[];

  if (items.length === 0) {
    return (
      <div className="tk-empty">
        <p>Belum ada testimoni.</p>
        <style>{`
          .tk-empty {
            padding: 2.5rem 1.5rem;
            font-size: 0.875rem;
            color: var(--muted);
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  // Triple so the loop never shows a gap
  const looped = [...items, ...items, ...items];
  const itemCount = items.length;

  return (
    <>
      <div className="tk-scene" id="tk-scene">
        <div className="tk-track" id="tk-track">
          {looped.map((item, i) => {
            const realIdx = i % itemCount;
            return (
              <div className="tk-slot" key={`${item.id}-${i}`} data-idx={i}>
                <div className="tk-card">
                  <div className="tk-card-top">
                    <span className="tk-num">
                      {String(realIdx + 1).padStart(2, "0")}
                    </span>
                    {item.rating && <StarRating rating={item.rating} />}
                  </div>

                  <blockquote className="tk-message">
                    &ldquo;{item.message}&rdquo;
                  </blockquote>

                  <div className="tk-footer">
                    <Avatar name={item.name} index={realIdx} />
                    <div className="tk-footer-text">
                      <p className="tk-name">{item.name}</p>
                      <p className="tk-meta">
                        {item.role && <span>{item.role}</span>}
                        {item.role && item.company && (
                          <span className="tk-dot">&middot;</span>
                        )}
                        {item.company && <span>{item.company}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Scene ── */
        .tk-scene {
          overflow: hidden;
          padding: 2.75rem 0 2.25rem;
          position: relative;
        }

        /* Edge fades */
        .tk-scene::before,
        .tk-scene::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 200px;
          z-index: 10;
          pointer-events: none;
        }
        .tk-scene::before {
          left: 0;
          background: linear-gradient(to right, var(--background) 0%, transparent 100%);
        }
        .tk-scene::after {
          right: 0;
          background: linear-gradient(to left, var(--background) 0%, transparent 100%);
        }

        /* ── Track ── */
        .tk-track {
          display: flex;
          align-items: center;
          gap: 20px;
          width: max-content;
          will-change: transform;
          animation: tk-scroll ${itemCount * 6}s linear infinite;
        }

        @keyframes tk-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-320px * ${itemCount})); }
        }

        /* ── Slot ── */
        .tk-slot {
          flex-shrink: 0;
          width: 300px;
          transition:
            transform 0.5s cubic-bezier(0.34, 1.26, 0.64, 1),
            opacity   0.5s ease;

          /* Default: far side card */
          transform: scale(0.78);
          opacity: 0.35;
        }

        .tk-slot.is-near {
          transform: scale(0.89);
          opacity: 0.65;
        }

        .tk-slot.is-center {
          transform: scale(1.06);
          opacity: 1;
          z-index: 5;
        }

        /* ── Card ── */
        .tk-card {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.375rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          box-sizing: border-box;
        }

        .tk-slot.is-center .tk-card {
          border-color: var(--foreground);
        }

        .tk-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tk-num {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .tk-stars { display: flex; align-items: center; gap: 2px; }

        .tk-message {
          font-size: 0.875rem;
          line-height: 1.75;
          color: var(--muted);
          margin: 0;
          flex: 1;
          overflow-wrap: break-word;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tk-slot.is-center .tk-message {
          color: var(--foreground);
          opacity: 0.85;
        }

        .tk-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.875rem;
          border-top: 1px solid var(--border);
        }

        .tk-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-montserrat), serif;
          font-size: 0.72rem; font-weight: 800;
          flex-shrink: 0;
        }

        .tk-footer-text {
          display: flex; flex-direction: column; gap: 0.15rem; min-width: 0;
        }

        .tk-name {
          font-size: 0.875rem; font-weight: 700;
          letter-spacing: -0.01em; color: var(--foreground);
          margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .tk-meta {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 0.72rem; color: var(--muted); margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .tk-dot { opacity: 0.4; }
      `}</style>

      {/* Inline script: classify slots as center / near / far each frame */}
      <script dangerouslySetInnerHTML={{ __html: `
(function () {
  var CARD_W = 300;
  var GAP    = 20;
  var UNIT   = CARD_W + GAP;

  var scene  = document.getElementById('tk-scene');
  var track  = document.getElementById('tk-track');
  if (!scene || !track) return;

  var slots  = Array.from(track.querySelectorAll('.tk-slot'));
  var paused = false;

  function getTranslateX(el) {
    var st = window.getComputedStyle(el);
    var tr = st.transform || st.webkitTransform;
    if (!tr || tr === 'none') return 0;
    var m = tr.match(/matrix\\(([^)]+)\\)/);
    if (!m) return 0;
    return parseFloat(m[1].split(',')[4]);
  }

  function classify() {
    var sceneW  = scene.offsetWidth;
    var centerX = sceneW / 2;
    var tx      = getTranslateX(track);

    slots.forEach(function (slot, idx) {
      var slotLeft   = tx + idx * UNIT;
      var slotCenter = slotLeft + CARD_W / 2;
      var dist       = Math.abs(slotCenter - centerX);

      slot.classList.remove('is-center', 'is-near');
      if (dist < UNIT * 0.42) {
        slot.classList.add('is-center');
      } else if (dist < UNIT * 1.15) {
        slot.classList.add('is-near');
      }
    });
  }

  function loop() {
    classify();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  track.addEventListener('mouseenter', function () {
    paused = true;
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', function () {
    paused = false;
    track.style.animationPlayState = 'running';
  });
})();
      `}} />
    </>
  );
}