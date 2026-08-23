"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import * as Icons from "lucide-react";
import { MobileAppMockup } from "@/components/MobileAppMockup";

export default function ProjectLiveViewerPage() {
  const params = useParams();
  const rawSlug = params?.slug as string | undefined;

  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!rawSlug) {
    return notFound();
  }

  const project = PROJECTS.find(
    (p) =>
      p.slug?.toLowerCase() === rawSlug.toLowerCase() ||
      p.title.toLowerCase().replace(/[^a-z0-9]/g, "") === rawSlug.toLowerCase() ||
      p.index === rawSlug
  );

  if (!project) {
    notFound();
  }

  const liveTargetUrl = project.demoUrl || project.url;

  if (!liveTargetUrl) {
    return (
      <div className="viewer-empty-state">
        <div className="empty-box">
          <Icons.AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
          <h2 className="text-xl font-bold text-foreground mb-2">No Live URL Configured</h2>
          <p className="text-sm text-muted mb-6">
            This project ({project.title}) is an internal platform and does not have an active deployment URL configured.
          </p>
          <Link href="/project" className="viewer-back-link">
            <Icons.ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="viewer-container">
      {/* ── Top App Bar (Clean Custom Portfolio Shell) ── */}
      <header className="viewer-navbar">
        {/* Left Section: Back to Portfolio */}
        <div className="viewer-nav-left">
          <Link href="/project" className="viewer-back-btn" title="Back to All Projects">
            <Icons.ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0 back-icon" />
            <span className="back-text">Back to Projects</span>
          </Link>

          <span className="viewer-divider" />

          <div className="viewer-project-info">
            <h1 className="viewer-project-title truncate">{project.title}</h1>
            <span className="viewer-badge-live">
              <span className="viewer-live-dot" />
              Live Demo
            </span>
          </div>
        </div>

        {/* Right Section: Viewport Mode Switcher */}
        <div className="viewer-nav-right">
          <div className="viewer-mode-switch">
            <button
              onClick={() => setViewMode("desktop")}
              className={`mode-btn ${viewMode === "desktop" ? "active" : ""}`}
              title="Desktop View"
              type="button"
            >
              <Icons.Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("tablet")}
              className={`mode-btn ${viewMode === "tablet" ? "active" : ""}`}
              title="Tablet View (768px)"
              type="button"
            >
              <Icons.Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`mode-btn ${viewMode === "mobile" ? "active" : ""}`}
              title="Mobile View (390px)"
              type="button"
            >
              <Icons.Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Viewport Area ── */}
      <main className="viewer-body">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="viewer-loading-overlay">
            <div className="loading-card">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-indigo-400 mb-3" />
              <p className="text-sm font-semibold text-white">Loading {project.title}...</p>
              <p className="text-xs text-slate-400 mt-1">Rendering live application</p>
            </div>
          </div>
        )}

        {/* Responsive Frame Wrapper */}
        {viewMode === "mobile" ? (
          <div className="flex-1 w-full overflow-y-auto flex items-center justify-center p-4">
            <MobileAppMockup
              appUrl={liveTargetUrl}
              appName={project.title}
              appCategory={project.category}
              showCustomUrlInput={false}
              className="scale-90 sm:scale-100 origin-center"
            />
          </div>
        ) : (
          <div className={`iframe-frame-container mode-${viewMode}`}>
            <iframe
              src={liveTargetUrl}
              title={`${project.title} Live Application`}
              className="viewer-iframe"
              onLoad={() => setIsLoading(false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
      </main>

      <style jsx>{`
        .viewer-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background: #020617;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        /* Top Navigation Bar */
        .viewer-navbar {
          height: 56px;
          background: #0f172a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
          gap: 1.5rem;
          flex-shrink: 0;
          user-select: none;
        }

        .viewer-nav-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 0;
          flex: 1;
        }

        /* High-contrast, prominent Back button */
        .viewer-back-btn {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.825rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #ffffff !important;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .viewer-back-btn:hover {
          background: #334155;
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateX(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
        }
        .back-icon {
          color: #ffffff;
          transition: transform 0.2s ease;
        }
        .viewer-back-btn:hover .back-icon {
          transform: translateX(-2px);
        }
        .back-text {
          color: #ffffff;
        }

        .viewer-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }

        .viewer-project-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-width: 0;
        }
        .viewer-project-title {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .viewer-badge-live {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
          flex-shrink: 0;
        }
        .viewer-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.1); }
        }

        /* Right Actions */
        .viewer-nav-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          justify-content: flex-end;
          flex-shrink: 0;
        }
        .viewer-mode-switch {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 3px;
          gap: 3px;
        }
        .mode-btn {
          width: 34px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          color: #94a3b8;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mode-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .mode-btn.active {
          color: #ffffff;
          background: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        }

        /* Main Viewport Body */
        .viewer-body {
          position: relative;
          flex: 1;
          width: 100%;
          height: calc(100vh - 56px);
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .iframe-frame-container {
          height: 100%;
          background: #ffffff;
          transition: width 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
          position: relative;
          display: flex;
        }
        .iframe-frame-container.mode-desktop {
          width: 100%;
        }
        .iframe-frame-container.mode-tablet {
          width: 768px;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 60px rgba(0, 0, 0, 0.85);
        }
        .iframe-frame-container.mode-mobile {
          width: 390px;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 60px rgba(0, 0, 0, 0.85);
        }

        .viewer-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: #ffffff;
        }

        /* Loading Overlay */
        .viewer-loading-overlay {
          position: absolute;
          inset: 0;
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .loading-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2.25rem 3rem;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.6);
        }

        /* Empty state */
        .viewer-empty-state {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #020617;
          padding: 2rem;
        }
        .empty-box {
          max-width: 440px;
          text-align: center;
          padding: 3rem 2rem;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
        }
        .viewer-back-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono), monospace;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #ffffff;
          background: #3b82f6;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          text-decoration: none;
        }

        @media (max-width: 640px) {
          .viewer-navbar {
            padding: 0 0.75rem;
          }
          .back-text {
            display: none;
          }
          .viewer-project-title {
            font-size: 0.9rem;
            max-width: 160px;
          }
          .viewer-mode-switch {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
