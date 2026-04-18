// src/components/testimonial/TestimonialForm.tsx
"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, Star } from "lucide-react";

const RELATION_OPTIONS = [
  "Rekan Kerja",
  "Klien / Client",
  "Atasan / Manager",
  "Kolaborator",
  "Lainnya",
];

export default function TestimonialForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          role: fd.get("role") || undefined,
          company: fd.get("company") || undefined,
          relation: fd.get("relation") || undefined,
          message: fd.get("message"),
          rating: rating || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Gagal mengirim testimoni.");
      } else {
        setSuccess(true);
        form.reset();
        setRating(0);
      }
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const ic = (name: string) =>
    `tf-input${focused === name ? " tf-input-focus" : ""}`;

  if (success) {
    return (
      <div className="tf-success">
        <div className="tf-success-icon">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="tf-success-title">Terima kasih!</h3>
        <p className="tf-success-sub">
          Testimonimu sudah diterima dan sedang menunggu review. Sangat berarti! 🙏
        </p>
        <button className="tf-success-btn" onClick={() => setSuccess(false)}>
          Tulis lagi
        </button>

        <style>{`
          .tf-success {
            display: flex; flex-direction: column; align-items: center;
            justify-content: center; text-align: center;
            gap: 0.875rem; padding: 3rem 1.5rem;
            min-height: 300px;
          }
          .tf-success-icon {
            width: 52px; height: 52px; border-radius: 50%;
            background: rgba(34,197,94,0.1);
            border: 1px solid rgba(34,197,94,0.25);
            display: flex; align-items: center; justify-content: center;
            color: #22c55e;
          }
          .tf-success-title {
            font-family: var(--font-montserrat), serif;
            font-size: 1.1rem; font-weight: 800;
            letter-spacing: -0.02em; color: var(--foreground); margin: 0;
          }
          .tf-success-sub {
            font-size: 0.82rem; line-height: 1.65;
            color: var(--muted); max-width: 260px; margin: 0;
          }
          .tf-success-btn {
            margin-top: 0.25rem;
            padding: 0.5rem 1.125rem; border-radius: 8px;
            border: 1px solid var(--border);
            background: transparent; color: var(--muted);
            font-size: 0.78rem; font-weight: 600;
            cursor: pointer; font-family: inherit;
            transition: border-color 0.2s, color 0.2s;
          }
          .tf-success-btn:hover { border-color: var(--foreground); color: var(--foreground); }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="tf-form">
      {/* Header */}
      <div className="tf-head">
        <p className="tf-eyebrow">/ share your experience</p>
        <h3 className="tf-title">Tulis rekomendasimu</h3>
        <p className="tf-sub">
          Pernah bekerja sama atau memberikan proyek? Ceritakan pengalamanmu.
        </p>
      </div>

      {/* Star rating */}
      <div className="tf-rating-wrap">
        <p className="tf-label">Rating</p>
        <div className="tf-stars">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              className="tf-star-btn"
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(s)}
              aria-label={`Rate ${s} stars`}
            >
              <Star
                size={20}
                fill={(hovered || rating) >= s ? "#f59e0b" : "none"}
                stroke={(hovered || rating) >= s ? "#f59e0b" : "var(--border)"}
                strokeWidth={1.5}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="tf-rating-text">
              {["", "Buruk", "Cukup", "Baik", "Sangat Baik", "Luar Biasa"][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="tf-field">
        <label className="tf-label" htmlFor="tf-name">Nama Lengkap *</label>
        <input
          id="tf-name"
          name="name"
          placeholder="Input your name"
          required
          className={ic("name")}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
      </div>

      {/* Role + Company */}
      <div className="tf-row">
        <div className="tf-field">
          <label className="tf-label" htmlFor="tf-role">Jabatan</label>
          <input
            id="tf-role"
            name="role"
            placeholder="Software Engineer"
            className={ic("role")}
            onFocus={() => setFocused("role")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div className="tf-field">
          <label className="tf-label" htmlFor="tf-company">Perusahaan</label>
          <input
            id="tf-company"
            name="company"
            placeholder="PT. Example"
            className={ic("company")}
            onFocus={() => setFocused("company")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      {/* Relation */}
      <div className="tf-field">
        <label className="tf-label" htmlFor="tf-relation">Hubungan dengan Josua</label>
        <select
          id="tf-relation"
          name="relation"
          className={ic("relation")}
          onFocus={() => setFocused("relation")}
          onBlur={() => setFocused(null)}
          defaultValue=""
        >
          <option value="" disabled>Pilih hubungan...</option>
          {RELATION_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="tf-field">
        <label className="tf-label" htmlFor="tf-message">Testimoni *</label>
        <textarea
          id="tf-message"
          name="message"
          required
          rows={4}
          placeholder="Ceritakan pengalamanmu bekerja bersama Josua..."
          className={ic("message")}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        />
      </div>

      {error && <p className="tf-error">{error}</p>}

      <button type="submit" className="tf-submit" disabled={loading}>
        {loading ? (
          <><Loader2 size={14} className="tf-spin" /> Mengirim...</>
        ) : (
          <><Send size={13} /> Kirim Testimoni</>
        )}
      </button>

      <p className="tf-disclaimer">
        Testimoni akan direview terlebih dahulu sebelum ditampilkan.
      </p>

      <style>{`
        .tf-form {
          display: flex; flex-direction: column; gap: 1.125rem;
          width: 100%; box-sizing: border-box;
        }

        .tf-head { display: flex; flex-direction: column; gap: 0.3rem; }
        .tf-eyebrow {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--muted);
        }
        .tf-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.1rem; font-weight: 800;
          letter-spacing: -0.025em; color: var(--foreground); margin: 0;
        }
        .tf-sub {
          font-size: 0.8rem; line-height: 1.6;
          color: var(--muted); margin: 0;
        }

        .tf-rating-wrap { display: flex; flex-direction: column; gap: 0.4rem; }
        .tf-stars { display: flex; align-items: center; gap: 2px; }
        .tf-star-btn {
          background: none; border: none; cursor: pointer; padding: 2px;
          display: flex; align-items: center; line-height: 1;
        }
        .tf-rating-text {
          font-size: 0.72rem; font-weight: 600;
          color: #f59e0b; margin-left: 0.25rem;
        }

        .tf-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .tf-label {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--muted);
        }
        .tf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 480px) { .tf-row { grid-template-columns: 1fr; } }

        .tf-input {
          width: 100%; padding: 0.6rem 0.85rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--secondary);
          color: var(--foreground);
          font-size: 0.825rem; font-family: inherit;
          outline: none; resize: vertical;
          appearance: none;
          box-sizing: border-box;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
        }
        .tf-input::placeholder { color: var(--muted); opacity: 0.5; }
        .tf-input-focus {
          border-color: var(--foreground) !important;
          background: var(--background) !important;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.06);
        }
        .dark .tf-input-focus { box-shadow: 0 0 0 3px rgba(226,232,240,0.07); }

        select.tf-input {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.8rem center;
          padding-right: 2.25rem;
        }

        .tf-error {
          font-size: 0.75rem; color: #ef4444;
          padding: 0.55rem 0.8rem;
          border-radius: 7px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
        }

        .tf-submit {
          display: flex; align-items: center; justify-content: center;
          gap: 0.45rem; width: 100%; padding: 0.8rem;
          border-radius: 8px; border: none;
          background: var(--foreground); color: var(--background);
          font-size: 0.825rem; font-weight: 700;
          font-family: inherit; letter-spacing: 0.01em;
          cursor: pointer;
          transition: opacity 0.18s;
        }
        .tf-submit:hover:not(:disabled) { opacity: 0.85; }
        .tf-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .tf-disclaimer {
          font-size: 0.68rem; color: var(--muted);
          text-align: center; margin: 0; letter-spacing: 0.02em;
        }

        @keyframes tf-spin { to { transform: rotate(360deg); } }
        .tf-spin { animation: tf-spin 0.8s linear infinite; }
      `}</style>
    </form>
  );
}