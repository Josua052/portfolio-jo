"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

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
  const [selectedProject, setSelectedProject] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    if (!selectedProject) {
      setError("Please select a project type.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    formData.get("name"),
          email:   formData.get("email"),
          project: formData.get("project"), // grabs from hidden input
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setSelectedProject("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="brutal-success">
        <CheckCircle2 size={48} className="success-icon" />
        <h2>MESSAGE SECURED.</h2>
        <p>I'll be in touch shortly.</p>
        <button onClick={() => setSuccess(false)}>← BACK TO FORM</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="brutal-form">
      {/* 01. NAME */}
      <div className="brutal-field">
        <label htmlFor="name">01. WHAT'S YOUR NAME?</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          required
        />
      </div>

      {/* 02. EMAIL */}
      <div className="brutal-field">
        <label htmlFor="email">02. WHAT'S YOUR EMAIL?</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          required
        />
      </div>

      {/* 03. PROJECT TYPE (Chips instead of Select) */}
      <div className="brutal-field">
        <label>03. WHAT ARE YOU LOOKING FOR? *</label>
        <input type="hidden" name="project" value={selectedProject} required />
        <div className="brutal-chips">
          {PROJECT_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`brutal-chip ${selectedProject === opt ? "active" : ""}`}
              onClick={() => setSelectedProject(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 04. MESSAGE */}
      <div className="brutal-field">
        <label htmlFor="message">04. TELL ME MORE ABOUT IT</label>
        <textarea
          id="message"
          name="message"
          placeholder="Timeline, budget, details... *"
          rows={3}
          required
        />
      </div>

      {error && <p className="brutal-error">{error}</p>}

      {/* SUBMIT */}
      <button 
        type="submit" 
        className="brutal-submit"
        disabled={loading}
      >
        {loading ? "SENDING..." : "SUBMIT REQUEST"}
        {!loading && <Send size={20} />}
      </button>

      <style>{`
        /* Brutalist Form Styles */
        .brutal-form {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          width: 100%;
        }

        .brutal-field {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .brutal-field label {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--muted);
          text-transform: uppercase;
        }

        /* Inputs & Textareas */
        .brutal-field input:not([type="hidden"]),
        .brutal-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 2px solid color-mix(in srgb, var(--foreground) 15%, transparent);
          border-radius: 0;
          padding: 0.5rem 0 1rem;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--foreground);
          transition: border-color 0.3s ease;
          appearance: none;
        }

        .brutal-field textarea {
          resize: vertical;
          min-height: 80px;
        }

        .brutal-field input:focus,
        .brutal-field textarea:focus {
          outline: none;
          border-bottom-color: var(--foreground);
        }

        .brutal-field input::placeholder,
        .brutal-field textarea::placeholder {
          color: color-mix(in srgb, var(--foreground) 20%, transparent);
          font-weight: 400;
        }

        /* Brutalist Chips (replaces Select) */
        .brutal-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .brutal-chip {
          padding: 0.75rem 1.25rem;
          border: 1px solid color-mix(in srgb, var(--foreground) 20%, transparent);
          background: transparent;
          border-radius: 99px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .brutal-chip:hover {
          border-color: var(--foreground);
          color: var(--foreground);
        }

        .brutal-chip.active {
          background: var(--foreground);
          border-color: var(--foreground);
          color: var(--background);
        }

        /* Error */
        .brutal-error {
          color: #ef4444;
          font-size: 0.85rem;
          margin: 0;
        }

        /* Submit Button */
        .brutal-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1.5rem 2rem;
          background: var(--foreground);
          color: var(--background);
          border: none;
          border-radius: 0;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
          margin-top: 1rem;
        }

        .brutal-submit:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 10px 0 color-mix(in srgb, var(--foreground) 20%, transparent);
        }

        .brutal-submit:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 0 0 transparent;
        }

        .brutal-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Success State */
        .brutal-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 4rem 0;
        }

        .success-icon {
          color: var(--foreground);
        }

        .brutal-success h2 {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 1;
        }

        .brutal-success p {
          font-size: 1rem;
          color: var(--muted);
          margin: 0;
        }

        .brutal-success button {
          margin-top: 1rem;
          background: transparent;
          border: 1px solid var(--foreground);
          color: var(--foreground);
          padding: 1rem 1.5rem;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .brutal-success button:hover {
          background: var(--foreground);
          color: var(--background);
        }

        @media (max-width: 640px) {
          .brutal-field input:not([type="hidden"]),
          .brutal-field textarea {
            font-size: 1.25rem;
          }
          .brutal-submit {
            padding: 1.2rem;
          }
        }
      `}</style>
    </form>
  );
}