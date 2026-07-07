"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import * as Icons from "lucide-react";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleProject = (index: string) => {
    setActiveProject(activeProject === index ? null : index);
  };

  return (
    <section className="proj-ledger-section">
      <div className="container-custom">
        {/* ── Header ── */}
        <div className="proj-ledger-intro">
          <p className="proj-eyebrow">/ selected work</p>
          <div className="proj-title-row">
            <h2 className="proj-heading">
              Featured <span className="proj-heading-outline">Projects</span>
            </h2>
            <p className="proj-heading-sub">
              A curated list of digital creations, architectures, and robust platforms built over the years.
            </p>
          </div>
        </div>

        {/* ── Ledger Container ── */}
        <div className="proj-ledger-container">
          {/* Table Header (Desktop only) */}
          <div className="proj-ledger-header">
            <div className="col-index">No.</div>
            <div className="col-title">Project</div>
            <div className="col-company">Client / Organization</div>
            <div className="col-category">Category</div>
            <div className="col-toggle"></div>
          </div>

          {/* Table Body */}
          <div className="proj-ledger-body">
            {PROJECTS.map((project) => {
              const isActive = activeProject === project.index;

              return (
                <div 
                  key={project.index} 
                  className={`proj-ledger-row ${isActive ? "active" : ""}`}
                >
                  {/* Visible Row Header */}
                  <div 
                    className="proj-row-visible" 
                    onClick={() => toggleProject(project.index)}
                  >
                    <div className="col-index">{project.index}</div>
                    <div className="col-title">
                      <span className="row-title">{project.title}</span>
                      {project.status === "live" && (
                        <span className="status-badge live">Live</span>
                      )}
                      {project.status === "featured" && (
                        <span className="status-badge featured">Featured</span>
                      )}
                      {project.status === "completed" && (
                        <span className="status-badge completed">Completed</span>
                      )}
                    </div>
                    <div className="col-company">{project.company}</div>
                    <div className="col-category">{project.category}</div>
                    <div className="col-toggle">
                      <div className={`toggle-icon-wrap ${isActive ? "open" : ""}`}>
                        <Icons.Plus className="w-5 h-5 toggle-icon" />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="proj-row-expanded"
                      >
                        <div className="expanded-inner">
                          <div className="expanded-left">
                            <h4 className="expanded-subtitle">{project.subtitle}</h4>
                            <ul className="expanded-points">
                              {project.description.map((point, i) => (
                                <li key={i}>
                                  <Icons.ChevronRight className="point-icon w-4 h-4" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {project.url && (
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="expanded-link"
                              >
                                View Live Project 
                                <Icons.ExternalLink className="w-4 h-4 ml-2" />
                              </a>
                            )}
                          </div>
                          
                          <div className="expanded-right">
                            <h5 className="tech-label">Technologies Used</h5>
                            <div className="tech-tags">
                              {project.tech.map((t, i) => (
                                <span key={i} className="tech-tag">{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Core Section ── */
        .proj-ledger-section {
          background: var(--background);
          color: var(--foreground);
          padding: 6rem 0 10rem 0;
        }

        /* ── Header ── */
        .proj-ledger-intro {
          margin-bottom: 5rem;
        }
        .proj-eyebrow {
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .proj-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .proj-heading {
          font-family: var(--font-montserrat), Georgia, serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin: 0;
        }
        .proj-heading-outline {
          -webkit-text-stroke: 1.5px var(--foreground);
          color: transparent;
        }
        .proj-heading-sub {
          max-width: 400px;
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
          padding-bottom: 0.25rem;
        }

        /* ── Ledger Container ── */
        .proj-ledger-container {
          width: 100%;
          border-top: 2px solid var(--foreground);
        }

        /* ── Ledger Header (Desktop) ── */
        .proj-ledger-header {
          display: grid;
          grid-template-columns: 80px 2.5fr 1.5fr 1fr 60px;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        /* ── Ledger Row ── */
        .proj-ledger-row {
          border-bottom: 1px solid var(--border);
          transition: background 0.3s ease;
        }
        .proj-ledger-row:hover {
          background: color-mix(in srgb, var(--foreground) 2%, transparent);
        }
        .proj-ledger-row.active {
          background: color-mix(in srgb, var(--foreground) 4%, transparent);
        }

        /* Visible Part */
        .proj-row-visible {
          display: grid;
          grid-template-columns: 80px 2.5fr 1.5fr 1fr 60px;
          align-items: center;
          padding: 2.5rem 0;
          cursor: pointer;
        }

        /* Columns */
        .col-index {
          font-family: var(--font-mono), monospace;
          font-size: 1rem;
          color: var(--muted);
          font-weight: 600;
        }
        
        .col-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .row-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--foreground);
          transition: color 0.3s ease;
        }
        .proj-ledger-row:hover .row-title {
          color: var(--hobby-color, #38bdf8); /* Fallback to a brand blue if hobby-color isn't defined */
        }
        
        .status-badge {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          border: 1px solid var(--border);
        }
        .status-badge.live {
          color: #10b981; /* Emerald */
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.2);
        }
        .status-badge.featured {
          color: #f59e0b; /* Amber */
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.2);
        }
        .status-badge.completed {
          color: var(--muted);
        }

        .col-company {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--muted);
        }

        .col-category {
          font-family: var(--font-mono), monospace;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--muted);
        }

        .col-toggle {
          display: flex;
          justify-content: flex-end;
        }
        .toggle-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .toggle-icon {
          color: var(--foreground);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .toggle-icon-wrap.open {
          background: var(--foreground);
          border-color: var(--foreground);
        }
        .toggle-icon-wrap.open .toggle-icon {
          transform: rotate(45deg);
          color: var(--background);
        }

        /* ── Expanded Content ── */
        .proj-row-expanded {
          overflow: hidden;
        }
        .expanded-inner {
          display: flex;
          gap: 4rem;
          padding: 0 0 3rem 80px; /* Offset by index column width */
        }
        
        .expanded-left {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .expanded-subtitle {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 1.5rem 0;
        }
        
        .expanded-points {
          list-style: none;
          padding: 0;
          margin: 0 0 2.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .expanded-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--muted);
        }
        .point-icon {
          color: var(--foreground);
          flex-shrink: 0;
          margin-top: 0.2rem;
          opacity: 0.5;
        }

        .expanded-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono), monospace;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--background);
          background: var(--foreground);
          padding: 0.8rem 1.25rem;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .expanded-link:hover {
          transform: translateY(-2px);
        }

        .expanded-right {
          flex: 1;
        }
        .tech-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 1rem 0;
        }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tech-tag {
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          padding: 0.3rem 0.6rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--foreground);
          background: color-mix(in srgb, var(--background) 50%, transparent);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .proj-ledger-header {
            grid-template-columns: 50px 2fr 1fr 40px;
          }
          .col-category {
            display: none;
          }
          .proj-row-visible {
            grid-template-columns: 50px 2fr 1fr 40px;
            padding: 2rem 0;
          }
          .expanded-inner {
            padding-left: 50px;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .proj-ledger-intro {
            margin-bottom: 3rem;
          }
          .proj-heading-sub { font-size: 0.85rem; }

          /* Hide header on mobile */
          .proj-ledger-header {
            display: none;
          }

          /* Stack visible row */
          .proj-row-visible {
            display: flex;
            flex-wrap: wrap;
            padding: 1.5rem 0;
            gap: 0.75rem;
            position: relative;
          }
          .col-index {
            position: absolute;
            top: 1.5rem;
            right: 0;
            font-size: 0.85rem;
            opacity: 0.5;
          }
          .col-title {
            width: 100%;
            margin-bottom: 0.25rem;
            padding-right: 2rem; /* space for index */
          }
          .row-title {
            font-size: 1.35rem;
          }
          .col-company {
            width: calc(100% - 60px);
            font-size: 0.85rem;
          }
          .col-toggle {
            width: 40px;
            margin-top: -10px;
          }
          .toggle-icon-wrap {
            width: 32px;
            height: 32px;
          }

          /* Stack expanded content */
          .expanded-inner {
            flex-direction: column;
            padding-left: 0;
            gap: 2rem;
            padding-top: 1rem;
          }
          .expanded-points li {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}