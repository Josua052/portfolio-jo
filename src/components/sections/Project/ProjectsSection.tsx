"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/data/projects";
import * as Icons from "lucide-react";
import { MobileAppMockup } from "@/components/MobileAppMockup";

/* ─────────────────────────────────────────────
   Project Thumbnail / Website Preview Component
───────────────────────────────────────────── */
function ProjectThumbnailPreview({ project }: { project: Project }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const targetUrl = project.url || project.demoUrl;
  
  // Priority: 1. Custom Image Path/URL -> 2. Auto-generated screenshot from live/demo URL
  const initialSrc =
    project.image ||
    (targetUrl ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=1000` : null);

  // Extract a clean domain/label for the browser mockup address bar
  const isVercel = Boolean(targetUrl && targetUrl.includes("vercel.app"));
  let displayDomain = "Platform Preview";

  if (isVercel || project.detailRoute) {
    // Hide raw vercel domain, show clean custom slug/app domain
    const slugName = (project.slug || project.title).toLowerCase().replace(/[^a-z0-9]/g, "");
    displayDomain = `${slugName}.app`;
  } else if (targetUrl) {
    try {
      const urlObj = new URL(targetUrl);
      displayDomain = urlObj.hostname.replace(/^www\./, "");
    } catch {
      displayDomain = targetUrl.replace(/^https?:\/\//, "").split("/")[0];
    }
  } else if (project.image) {
    displayDomain = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.app`;
  }

  const isMobileProject =
    project.category.toLowerCase().includes("mobile") ||
    project.tech.includes("Flutter");

  if (isMobileProject && targetUrl) {
    return (
      <div className="preview-mockup-wrapper flex flex-col items-center justify-center py-2">
        <MobileAppMockup
          appUrl={targetUrl}
          appName={project.title}
          appCategory={project.category}
          showCustomUrlInput={false}
          className="scale-[0.8] sm:scale-[0.85] origin-top my-[-30px]"
        />
      </div>
    );
  }

  return (
    <div className="preview-mockup-wrapper">
      {/* ── Browser Mockup Frame ── */}
      <div className="preview-mockup-window">
        {/* Browser Top Navigation Bar */}
        <div className="mockup-navbar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="mockup-address-bar">
            <Icons.Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="mockup-url-text truncate">{displayDomain}</span>
          </div>

          <div className="mockup-nav-actions">
            {project.detailRoute ? (
              <Link
                href={project.detailRoute}
                className="mockup-action-btn"
                title="View Live Project"
              >
                <Icons.ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : targetUrl && !isVercel ? (
              <a
                href={targetUrl}
                target="_blank"
                rel="noreferrer"
                className="mockup-action-btn"
                title="Open in new tab"
              >
                <Icons.ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="mockup-action-btn disabled">
                <Icons.Globe className="w-3.5 h-3.5 opacity-40" />
              </span>
            )}
          </div>
        </div>

        {/* Browser Viewport Area */}
        <div className="mockup-viewport">
          {initialSrc && !imageError ? (
            <div className="mockup-image-container group">
              {!imageLoaded && (
                <div className="mockup-skeleton">
                  <div className="skeleton-shimmer" />
                  <div className="skeleton-center">
                    <Icons.Loader2 className="w-6 h-6 animate-spin text-muted" />
                    <span className="text-xs text-muted mt-2">Loading preview...</span>
                  </div>
                </div>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={initialSrc}
                alt={`${project.title} Preview`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  // If mshots fails and we haven't tried microlink fallback yet
                  if (targetUrl && !initialSrc.includes("microlink.io")) {
                    // Try Microlink screenshot as fallback
                    const fallback = `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
                    const img = new Image();
                    img.src = fallback;
                    img.onload = () => {
                      // fallback worked
                      setImageLoaded(true);
                    };
                    img.onerror = () => {
                      setImageError(true);
                    };
                  } else {
                    setImageError(true);
                  }
                }}
                className={`mockup-screenshot ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              />

              {/* Hover Overlay Button */}
              {project.detailRoute ? (
                <Link
                  href={project.detailRoute}
                  className="mockup-hover-overlay"
                >
                  <span className="mockup-hover-btn">
                    <Icons.ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </span>
                </Link>
              ) : targetUrl ? (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mockup-hover-overlay"
                >
                  <span className="mockup-hover-btn">
                    <Icons.ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </span>
                </a>
              ) : null}
            </div>
          ) : (
            /* Fallback Mockup Placeholder when no URL/image exists */
            <div className="mockup-fallback-placeholder">
              <div className="fallback-grid-bg" />
              <div className="fallback-content">
                <div className="fallback-icon-wrap">
                  <Icons.Layers className="w-8 h-8 text-indigo-400" />
                </div>
                <h6 className="fallback-title">{project.title}</h6>
                <p className="fallback-subtitle">{project.subtitle}</p>
                <div className="fallback-badge">
                  {project.status === "completed" ? "Enterprise Platform" : "App Preview"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption under preview */}
      <div className="preview-caption">
        <span className="preview-caption-dot" />
        <span className="preview-caption-text">
          {targetUrl ? "Live Website Preview" : "Application Architecture"}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Projects Section
───────────────────────────────────────────── */
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
          {/* Table Header (Desktop only - NO numbers) */}
          <div className="proj-ledger-header">
            <div className="col-title">Project</div>
            <div className="col-company">Client / Organization</div>
            <div className="col-category">Category</div>
            <div className="col-toggle"></div>
          </div>

          {/* Table Body */}
          <div className="proj-ledger-body">
            {PROJECTS.map((project, idx) => {
              const projectId = project.slug || project.title || `proj-${idx}`;
              const isActive = activeProject === projectId;

              return (
                <div 
                  key={projectId} 
                  className={`proj-ledger-row ${isActive ? "active" : ""}`}
                >
                  {/* Visible Row Header (NO numbers) */}
                  <div 
                    className="proj-row-visible" 
                    onClick={() => toggleProject(projectId)}
                  >
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
                      {project.status === "ongoing" && (
                        <span className="status-badge ongoing">On Going</span>
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
                          {/* Left Column: Descriptions, Actions & Tech Stack */}
                          <div className="expanded-left">
                            <div className="expanded-meta-header">
                              <h4 className="expanded-subtitle">{project.subtitle}</h4>
                              {project.period && (
                                <span className="expanded-period">{project.period}</span>
                              )}
                            </div>

                            <ul className="expanded-points">
                              {project.description.map((point, i) => (
                                <li key={i}>
                                  <Icons.ChevronRight className="point-icon w-4 h-4" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {/* Action Buttons */}
                            <div className="expanded-action-row">
                              {project.detailRoute ? (
                                <Link 
                                  href={project.detailRoute}
                                  className="expanded-link"
                                >
                                  View Live Project
                                  <Icons.ExternalLink className="w-4 h-4 ml-2" />
                                </Link>
                              ) : project.url ? (
                                <a 
                                  href={project.url} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="expanded-link"
                                >
                                  View Live Project 
                                  <Icons.ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                              ) : null}
                              {project.githubUrl && (
                                <a 
                                  href={project.githubUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="expanded-link outline"
                                >
                                  Source Code
                                  <Icons.Github className="w-4 h-4 ml-2" />
                                </a>
                              )}
                            </div>

                            {/* Tech Stack */}
                            <div className="expanded-tech-wrap">
                              <h5 className="tech-label">Technologies Used</h5>
                              <div className="tech-tags">
                                {project.tech.map((t, i) => (
                                  <span key={i} className="tech-tag">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Column: Interactive Thumbnail Preview Mockup */}
                          <div className="expanded-right">
                            <ProjectThumbnailPreview project={project} />
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

        /* ── Ledger Header (Desktop) - No Index Column ── */
        .proj-ledger-header {
          display: grid;
          grid-template-columns: minmax(0, 3.2fr) minmax(0, 1.4fr) minmax(0, 1fr) 48px;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-poppins), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          align-items: center;
        }
        .proj-ledger-header div {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          letter-spacing: inherit !important;
          text-transform: inherit !important;
          color: inherit !important;
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
          background: color-mix(in srgb, var(--foreground) 3%, transparent);
        }

        /* Visible Part */
        .proj-row-visible {
          display: grid;
          grid-template-columns: minmax(0, 3.2fr) minmax(0, 1.4fr) minmax(0, 1fr) 48px;
          align-items: center;
          padding: 2.25rem 0;
          cursor: pointer;
          transition: padding 0.2s ease;
        }
        
        .col-title {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          min-width: 0;
        }
        .row-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: clamp(1.15rem, 1.8vw, 1.65rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--foreground);
          transition: color 0.3s ease;
        }
        .proj-ledger-row:hover .row-title {
          color: var(--hobby-color, #38bdf8);
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          flex-shrink: 0;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          border: 1px solid var(--border);
        }
        .status-badge.live {
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.25);
        }
        .status-badge.featured {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.25);
        }
        .status-badge.completed {
          color: var(--muted);
          background: rgba(255, 255, 255, 0.03);
        }
        .status-badge.ongoing {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.3);
        }

        .proj-row-visible .col-company {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--muted);
        }

        .proj-row-visible .col-category {
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

        /* ── Expanded Content (2-Column Architecture) ── */
        .proj-row-expanded {
          overflow: hidden;
        }
        .expanded-inner {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 3.5rem;
          padding: 1rem 0 3.5rem 0;
          align-items: start;
        }
        
        .expanded-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .expanded-meta-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 1rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .expanded-subtitle {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--foreground);
          margin: 0;
        }
        .expanded-period {
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          color: var(--muted);
          background: color-mix(in srgb, var(--foreground) 5%, transparent);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--border);
        }
        
        .expanded-points {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .expanded-points li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--muted);
        }
        .point-icon {
          color: var(--foreground);
          flex-shrink: 0;
          margin-top: 0.25rem;
          opacity: 0.6;
        }

        /* Action buttons */
        .expanded-action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.25rem;
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
          padding: 0.75rem 1.2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .expanded-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .expanded-link.secondary {
          background: color-mix(in srgb, var(--foreground) 12%, transparent);
          color: var(--foreground);
          border: 1px solid var(--border);
        }
        .expanded-link.outline {
          background: transparent;
          color: var(--foreground);
          border: 1px solid var(--border);
        }
        .expanded-link.outline:hover {
          background: color-mix(in srgb, var(--foreground) 8%, transparent);
        }

        /* Tech Tags */
        .expanded-tech-wrap {
          width: 100%;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .tech-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 0.85rem 0;
        }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tech-tag {
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          padding: 0.35rem 0.7rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--foreground);
          background: color-mix(in srgb, var(--background) 50%, transparent);
        }

        /* ── Right Column: Browser Mockup Preview ── */
        .expanded-right {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .preview-mockup-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .preview-mockup-window {
          background: #090d16;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .preview-mockup-window:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Mockup Navbar */
        .mockup-navbar {
          height: 38px;
          background: #0f172a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          padding: 0 1rem;
          gap: 0.85rem;
          justify-content: space-between;
        }

        .mockup-dots {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 50px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .mockup-address-bar {
          flex: 1;
          max-width: 320px;
          height: 24px;
          background: rgba(2, 6, 23, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 8px;
          font-family: var(--font-mono), monospace;
          font-size: 0.68rem;
          color: #94a3b8;
        }
        .mockup-url-text {
          letter-spacing: 0.02em;
        }

        .mockup-nav-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 40px;
        }
        .mockup-action-btn {
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .mockup-action-btn:hover:not(.disabled) {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Mockup Viewport */
        .mockup-viewport {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #020617;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mockup-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .mockup-screenshot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
        }
        .mockup-image-container:hover .mockup-screenshot {
          transform: scale(1.04);
        }

        /* Hover Overlay */
        .mockup-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(2, 6, 23, 0.6);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          text-decoration: none;
        }
        .mockup-image-container:hover .mockup-hover-overlay {
          opacity: 1;
        }
        .mockup-hover-btn {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono), monospace;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #ffffff;
          background: #3b82f6;
          padding: 0.65rem 1.15rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
          transform: translateY(6px);
          transition: transform 0.3s ease, background 0.2s;
        }
        .mockup-image-container:hover .mockup-hover-btn {
          transform: translateY(0);
        }
        .mockup-hover-btn:hover {
          background: #2563eb;
        }

        /* Loading Skeleton */
        .mockup-skeleton {
          position: absolute;
          inset: 0;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .skeleton-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          animation: shimmer 1.8s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }

        /* Fallback State */
        .mockup-fallback-placeholder {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 30%, #1e1b4b 0%, #020617 80%);
          padding: 2rem;
          text-align: center;
        }
        .fallback-grid-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 16px 16px;
          opacity: 0.3;
        }
        .fallback-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fallback-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .fallback-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 0.35rem 0;
        }
        .fallback-subtitle {
          font-size: 0.8rem;
          color: #94a3b8;
          margin: 0 0 1rem 0;
          max-width: 260px;
        }
        .fallback-badge {
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
        }

        /* Preview Caption */
        .preview-caption {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 0.25rem;
        }
        .preview-caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
        }
        .preview-caption-text {
          font-family: var(--font-mono), monospace;
          font-size: 0.7rem;
          color: var(--muted);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ── Responsive Adjustments ── */
        @media (max-width: 1024px) {
          .proj-ledger-header {
            grid-template-columns: 2.2fr 1.3fr 40px;
          }
          .col-category {
            display: none;
          }
          .proj-row-visible {
            grid-template-columns: 2.2fr 1.3fr 40px;
            padding: 2rem 0;
          }
          .expanded-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .expanded-right {
            order: -1; /* Show preview above description on tablets */
          }
        }

        @media (max-width: 768px) {
          .proj-ledger-intro {
            margin-bottom: 3rem;
          }
          .proj-heading-sub { font-size: 0.85rem; }

          /* Hide table header on mobile */
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
          .col-title {
            width: 100%;
            margin-bottom: 0.25rem;
          }
          .row-title {
            font-size: 1.35rem;
          }
          .col-company {
            width: calc(100% - 50px);
            font-size: 0.85rem;
          }
          .col-toggle {
            width: 40px;
          }
          .toggle-icon-wrap {
            width: 34px;
            height: 34px;
          }

          /* Expanded content on mobile */
          .expanded-inner {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 0.5rem 0 2.5rem 0;
          }
          .expanded-right {
            order: -1;
          }
          .expanded-points li {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}