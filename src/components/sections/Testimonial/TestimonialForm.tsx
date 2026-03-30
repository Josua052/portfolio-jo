// src/components/testimonial/TestimonialForm.tsx
"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

    const { error: sbErr } = await supabase.from("testimonials").insert([
      {
        name: fd.get("name"),
        role: fd.get("role"),
        company: fd.get("company"),
        relation: fd.get("relation"),
        message: fd.get("message"),
        rating: rating || null,
      },
    ]);

    setLoading(false);

    if (!sbErr) {
      setSuccess(true);
      form.reset();
      setRating(0);
    } else {
      setError(sbErr.message);
    }
  };

  const inputClass = (name: string) =>
    `tf-input ${focused === name ? "tf-input-focus" : ""}`;

  if (success) {
    return (
      <div className="tf-success">
        <div className="tf-success-icon">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="tf-success-title">Terima kasih!</h3>
        <p className="tf-success-sub">
          Testimonimu sudah diterima dan sedang menunggu review. Sangat berarti!
          🙏
        </p>
        <button className="tf-success-btn" onClick={() => setSuccess(false)}>
          Tulis lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="tf-form">
      {/* Header */}
      <div className="tf-form-head">
        <p className="tf-form-eyebrow">/ share your experience</p>
        <h3 className="tf-form-title">Tulis Rekomendasimu</h3>
        <p className="tf-form-sub">
          Pernah bekerja sama atau memberikan proyek? Ceritakan pengalamanmu.
        </p>
      </div>

      {/* Star rating */}
      <div className="tf-rating-wrap">
        <p className="tf-field-label">Rating</p>
        <div className="tf-stars">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              className="tf-star"
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(s)}
              aria-label={`Rate ${s} stars`}
            >
              <Star
                size={22}
                fill={(hovered || rating) >= s ? "#f59e0b" : "none"}
                stroke={(hovered || rating) >= s ? "#f59e0b" : "var(--border)"}
                strokeWidth={1.5}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="tf-rating-label">
              {
                ["", "Buruk", "Cukup", "Baik", "Sangat Baik", "Luar Biasa"][
                  rating
                ]
              }
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="tf-field">
        <label className="tf-field-label" htmlFor="tf-name">
          Nama Lengkap *
        </label>
        <input
          id="tf-name"
          name="name"
          placeholder="Input Your Name"
          required
          className={inputClass("name")}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
      </div>

      {/* Role + Company */}
      <div className="tf-row">
        <div className="tf-field">
          <label className="tf-field-label" htmlFor="tf-role">
            Jabatan / Role
          </label>
          <input
            id="tf-role"
            name="role"
            placeholder="Software Engineer"
            className={inputClass("role")}
            onFocus={() => setFocused("role")}
            onBlur={() => setFocused(null)}
          />
        </div>
        <div className="tf-field">
          <label className="tf-field-label" htmlFor="tf-company">
            Perusahaan
          </label>
          <input
            id="tf-company"
            name="company"
            placeholder="PT. Example"
            className={inputClass("company")}
            onFocus={() => setFocused("company")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      {/* Relation */}
      <div className="tf-field">
        <label className="tf-field-label" htmlFor="tf-relation">
          Hubungan dengan Josua
        </label>
        <select
          id="tf-relation"
          name="relation"
          className={inputClass("relation")}
          onFocus={() => setFocused("relation")}
          onBlur={() => setFocused(null)}
          defaultValue=""
        >
          <option value="" disabled>
            Pilih hubungan...
          </option>
          {RELATION_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="tf-field">
        <label className="tf-field-label" htmlFor="tf-message">
          Testimoni *
        </label>
        <textarea
          id="tf-message"
          name="message"
          required
          rows={5}
          placeholder="Ceritakan pengalamanmu bekerja bersama Josua, kualitas kerja, komunikasi, atau hasil proyek..."
          className={inputClass("message")}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        />
      </div>

      {/* Error */}
      {error && <p className="tf-error">{error}</p>}

      {/* Submit */}
      <button type="submit" className="tf-submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={15} className="tf-spin" /> Mengirim...
          </>
        ) : (
          <>
            <Send size={14} /> Kirim Testimoni
          </>
        )}
      </button>

      <p className="tf-disclaimer">
        Testimoni akan direview terlebih dahulu sebelum ditampilkan.
      </p>

      <style>{`
        /* ── Form wrapper ── */
        .tf-form {
          display: flex;
          flex-direction: column;
          gap: 1.375rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 2rem;
          /* Prevent form from overflowing its sticky container */
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }

        /* Header */
        .tf-form-head { display: flex; flex-direction: column; gap: 0.375rem; }
        .tf-form-eyebrow {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--muted);
        }
        .tf-form-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.25rem; font-weight: 800;
          letter-spacing: -0.025em; color: var(--foreground);
          margin: 0;
        }
        .tf-form-sub {
          font-size: 0.82rem; line-height: 1.6;
          color: var(--muted); margin: 0;
        }

        /* Stars */
        .tf-rating-wrap { display: flex; flex-direction: column; gap: 0.5rem; }
        .tf-stars {
          display: flex; align-items: center; gap: 0.25rem;
        }
        .tf-star {
          background: none; border: none; cursor: pointer; padding: 2px;
          transition: transform 0.15s;
          display: flex; align-items: center;
        }
        .tf-star:hover { transform: scale(1.2); }
        .tf-rating-label {
          font-size: 0.75rem; font-weight: 600;
          color: #f59e0b; margin-left: 0.375rem;
          letter-spacing: 0.02em;
        }

        /* Fields */
        .tf-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .tf-field-label {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--muted);
        }
        .tf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; }
        @media (max-width: 480px) { .tf-row { grid-template-columns: 1fr; } }

        .tf-input {
          width: 100%; padding: 0.7rem 0.95rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--secondary);
          color: var(--foreground);
          font-size: 0.875rem; font-family: inherit;
          outline: none; resize: vertical;
          appearance: none;
          box-sizing: border-box;
          max-width: 100%;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .tf-input::placeholder { color: var(--muted); opacity: 0.55; }
        .tf-input:hover { border-color: color-mix(in srgb, var(--foreground) 30%, var(--border)); }
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
          background-position: right 0.875rem center;
          padding-right: 2.5rem;
        }

        .tf-error {
          font-size: 0.78rem; color: #ef4444;
          padding: 0.6rem 0.875rem;
          border-radius: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
        }

        .tf-submit {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; width: 100%; padding: 0.875rem;
          border-radius: 10px; border: none;
          background: var(--primary); color: var(--background);
          font-size: 0.875rem; font-weight: 700;
          font-family: inherit; letter-spacing: 0.01em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .tf-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .tf-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        .tf-disclaimer {
          font-size: 0.7rem; color: var(--muted);
          text-align: center; margin: 0; letter-spacing: 0.02em;
        }

        @keyframes tf-spin { to { transform: rotate(360deg); } }
        .tf-spin { animation: tf-spin 0.8s linear infinite; }

        /* Success state */
        .tf-success {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          gap: 1rem; padding: 3rem 2rem;
          border: 1px solid var(--border); border-radius: 1.25rem;
          background: var(--background); min-height: 360px;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
        }
        .tf-success-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #22c55e;
        }
        .tf-success-title {
          font-family: var(--font-montserrat), serif;
          font-size: 1.25rem; font-weight: 800;
          letter-spacing: -0.025em; color: var(--foreground); margin: 0;
        }
        .tf-success-sub {
          font-size: 0.85rem; line-height: 1.7;
          color: var(--muted); max-width: 280px;
        }
        .tf-success-btn {
          padding: 0.55rem 1.25rem; border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--background); color: var(--muted);
          font-size: 0.8rem; font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .tf-success-btn:hover { border-color: var(--foreground); color: var(--foreground); }
      `}</style>
    </form>
  );
}
