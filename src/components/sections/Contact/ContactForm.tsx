// src/components/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const PROJECT_OPTIONS = [
  "Website Development",
  "UI/UX Design",
  "Mobile App",
  "Frontend Only",
  "Full Stack",
  "Other",
];

export default function ContactForm() {
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState("");
  const [focused, setFocused]   = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    formData.get("name"),
          email:   formData.get("email"),
          project: formData.get("project"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = (name: string) =>
    `cf-input ${focused === name ? "cf-input-focused" : ""}`;

  if (success) {
    return (
      <div className="cf-success-wrap">
        <div className="cf-success-icon">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="cf-success-title">Message sent!</h3>
        <p className="cf-success-sub">
          Thanks for reaching out. I will get back to you as soon as possible.
        </p>
        <button
          className="cf-success-btn"
          onClick={() => setSuccess(false)}
        >
          Send another message
        </button>

        <style>{`
          .cf-success-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 1rem;
            padding: 3rem 2rem;
            border: 1px solid var(--border);
            border-radius: 1.25rem;
            background: var(--background);
            min-height: 380px;
          }
          .cf-success-icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: rgba(34,197,94,0.1);
            border: 1px solid rgba(34,197,94,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #22c55e;
          }
          .cf-success-title {
            font-family: var(--font-montserrat), serif;
            font-size: 1.375rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: var(--foreground);
            margin: 0;
          }
          .cf-success-sub {
            font-size: 0.875rem;
            line-height: 1.7;
            color: var(--muted);
            max-width: 280px;
          }
          .cf-success-btn {
            padding: 0.6rem 1.25rem;
            border-radius: 10px;
            border: 1px solid var(--border);
            background: var(--background);
            color: var(--muted);
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: border-color 0.2s, color 0.2s;
          }
          .cf-success-btn:hover {
            border-color: var(--foreground);
            color: var(--foreground);
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="cf-form">
      {/* Label */}
      <div className="cf-form-header">
        <p className="cf-form-eyebrow">/ project request</p>
        <h2 className="cf-form-title">Let`s work together</h2>
      </div>

      {/* Name */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          placeholder="Josua Ronaldo"
          className={fieldClass("name")}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Email */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className={fieldClass("email")}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Project type — select */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="project">Project Type</label>
        <select
          id="project"
          name="project"
          className={fieldClass("project")}
          onFocus={() => setFocused("project")}
          onBlur={() => setFocused(null)}
          defaultValue=""
        >
          <option value="" disabled>Select a project type...</option>
          {PROJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, timeline, and budget..."
          rows={5}
          className={fieldClass("message")}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          required
        />
      </div>

      {/* Error */}
      {error && <p className="cf-error">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        className="cf-submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={15} className="cf-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={14} />
          </>
        )}
      </button>

      <style>{`
        .cf-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 2rem;
        }

        .cf-form-header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 0.25rem;
        }
        .cf-form-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .cf-form-title {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: 1.375rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--foreground);
          margin: 0;
        }

        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .cf-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .cf-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--secondary);
          color: var(--foreground);
          font-size: 0.875rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          resize: vertical;
          appearance: none;
        }
        .cf-input::placeholder { color: var(--muted); opacity: 0.6; }
        .cf-input:hover { border-color: var(--foreground); opacity: 0.6; }
        .cf-input-focused {
          border-color: var(--foreground) !important;
          background: var(--background) !important;
          box-shadow: 0 0 0 3px rgba(15,23,42,0.06);
        }
        .dark .cf-input-focused {
          box-shadow: 0 0 0 3px rgba(226,232,240,0.06);
        }

        select.cf-input {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .cf-error {
          font-size: 0.78rem;
          font-weight: 500;
          color: #ef4444;
          padding: 0.6rem 0.875rem;
          border-radius: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
        }

        .cf-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.85rem;
          border-radius: 10px;
          border: none;
          background: var(--primary);
          color: var(--background);
          font-size: 0.875rem;
          font-weight: 700;
          font-family: inherit;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .cf-submit:hover:not(:disabled) {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .cf-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
        .cf-spin { animation: cf-spin 0.8s linear infinite; }
      `}</style>
    </form>
  );
}