// src/components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Laptop, ChevronDown, X, Menu } from "lucide-react";

const MENUS = [
  { name: "Home",       href: "/" },
  { name: "About",      href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Project",    href: "/project" },
  { name: "Awards",     href: "/awards" },
  {
    name: "Gallery",
    children: [
      { name: "Editing", href: "/gallery-editing" },
      { name: "Live",    href: "/gallery-live" },
    ],
  },
  { name: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();

  const [mounted,       setMounted]       = useState(false);
  const [themeOpen,     setThemeOpen]     = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [galleryOpen,   setGalleryOpen]   = useState(false); // mobile gallery accordion
  const [scrolled,      setScrolled]      = useState(false);

  const themeRef = useRef<HTMLDivElement>(null);

  /* Mount */
  useEffect(() => { setMounted(true); }, []);

  /* Scroll shadow */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Close theme dropdown on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!themeRef.current?.contains(e.target as Node)) setThemeOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (!mounted) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className="navbar-header"
        style={{
          boxShadow: scrolled
            ? "0 1px 0 var(--border), 0 4px 24px rgba(0,0,0,0.04)"
            : "0 1px 0 var(--border)",
        }}
      >
        <nav className="navbar-nav">

          {/* ── Logo ── */}
          <Link href="/" className="navbar-logo" aria-label="Home">
            <Image
              src="/images/logo.png"
              alt="Ronaldo"
              width={36}
              height={36}
              priority
              className="object-contain"
            />
          </Link>

          {/* ── Desktop menu ── */}
          <div className="navbar-desktop-menu">
            {MENUS.map((menu) =>
              menu.children ? (
                /* Gallery dropdown */
                <div key={menu.name} className="navbar-dropdown-wrap group">
                  <span
                    className={`navbar-link navbar-dropdown-trigger ${
                      menu.children.some((c) => isActive(c.href))
                        ? "navbar-link-active"
                        : ""
                    }`}
                  >
                    {menu.name}
                    <ChevronDown size={13} className="navbar-chevron" />
                  </span>

                  <div className="navbar-dropdown">
                    <div className="navbar-dropdown-inner">
                      {menu.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`navbar-dropdown-item ${
                            isActive(child.href) ? "navbar-dropdown-item-active" : ""
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={menu.name}
                  href={menu.href}
                  className={`navbar-link ${isActive(menu.href) ? "navbar-link-active" : ""}`}
                >
                  {menu.name}
                  {isActive(menu.href) && <span className="navbar-link-dot" />}
                </Link>
              )
            )}
          </div>

          {/* ── Right: theme + hamburger ── */}
          <div className="navbar-right">
            {/* Theme toggle */}
            <div ref={themeRef} className="navbar-theme-wrap">
              <button
                onClick={() => setThemeOpen((p) => !p)}
                className="navbar-icon-btn"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark"
                  ? <Sun size={16} />
                  : <Moon size={16} />}
              </button>

              {themeOpen && (
                <div className="navbar-theme-dropdown">
                  {[
                    { label: "Light",  icon: <Sun size={14} />,     value: "light"  },
                    { label: "Dark",   icon: <Moon size={14} />,    value: "dark"   },
                    { label: "System", icon: <Laptop size={14} />,  value: "system" },
                  ].map(({ label, icon, value }) => (
                    <button
                      key={value}
                      onClick={() => { setTheme(value); setThemeOpen(false); }}
                      className={`navbar-theme-item ${
                        resolvedTheme === value ? "navbar-theme-item-active" : ""
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className={`navbar-ham-line ${mobileOpen ? "navbar-ham-open-1" : ""}`} />
              <span className={`navbar-ham-line ${mobileOpen ? "navbar-ham-open-2" : ""}`} />
              <span className={`navbar-ham-line ${mobileOpen ? "navbar-ham-open-3" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer overlay ── */}
      <div
        className={`navbar-overlay ${mobileOpen ? "navbar-overlay-visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {/* ── Mobile drawer ── */}
      <aside className={`navbar-drawer ${mobileOpen ? "navbar-drawer-open" : ""}`}>

        {/* Drawer header */}
        <div className="navbar-drawer-header">
          <Link href="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Ronaldo"
              width={32}
              height={32}
              className="object-contain"
            />
          </Link>
          <button
            className="navbar-icon-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Eyebrow */}
        <p className="navbar-drawer-eyebrow">/ navigation</p>

        {/* Drawer links */}
        <nav className="navbar-drawer-nav">
          {MENUS.map((menu, i) =>
            menu.children ? (
              /* Gallery accordion */
              <div key={menu.name}>
                <button
                  className="navbar-drawer-link navbar-drawer-accordion"
                  onClick={() => setGalleryOpen((p) => !p)}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span>{menu.name}</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transition: "transform 0.3s",
                      transform: galleryOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>
                {galleryOpen && (
                  <div className="navbar-drawer-children">
                    {menu.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`navbar-drawer-child ${
                          isActive(child.href) ? "navbar-drawer-child-active" : ""
                        }`}
                      >
                        <span className="navbar-drawer-child-dot" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={menu.name}
                href={menu.href}
                className={`navbar-drawer-link ${
                  isActive(menu.href) ? "navbar-drawer-link-active" : ""
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span>{menu.name}</span>
                {isActive(menu.href) && (
                  <span className="navbar-drawer-active-badge">current</span>
                )}
              </Link>
            )
          )}
        </nav>

        {/* Drawer footer */}
        <div className="navbar-drawer-footer">
          <p className="navbar-drawer-footer-label">Theme</p>
          <div className="navbar-drawer-theme-row">
            {[
              { label: "Light",  icon: <Sun size={13} />,    value: "light"  },
              { label: "Dark",   icon: <Moon size={13} />,   value: "dark"   },
              { label: "System", icon: <Laptop size={13} />, value: "system" },
            ].map(({ label, icon, value }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`navbar-drawer-theme-btn ${
                  resolvedTheme === value ? "navbar-drawer-theme-active" : ""
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── All styles ── */}
      <style>{`
        /* ── Header ── */
        .navbar-header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          background: var(--background);
          color: var(--foreground);
          transition: box-shadow 0.3s ease, background 0.2s;
        }

        .navbar-nav {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        /* ── Logo ── */
        .navbar-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .navbar-logo:hover { opacity: 0.75; }

        /* ── Desktop menu ── */
        .navbar-desktop-menu {
          display: none;
          align-items: center;
          gap: 0.25rem;
        }
        @media (min-width: 768px) {
          .navbar-desktop-menu { display: flex; }
        }

        .navbar-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--muted);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
          user-select: none;
        }
        .navbar-link:hover {
          color: var(--foreground);
          background: var(--hover);
        }
        .navbar-link-active {
          color: var(--foreground) !important;
        }
        .navbar-link-dot {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--foreground);
        }

        /* ── Dropdown (Gallery) ── */
        .navbar-dropdown-wrap {
          position: relative;
        }
        .navbar-dropdown-trigger {
          cursor: pointer;
        }
        .navbar-chevron {
          transition: transform 0.25s;
          margin-top: 1px;
        }
        .group:hover .navbar-chevron {
          transform: rotate(180deg);
        }

        .navbar-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
          transform: translateX(-50%) translateY(-6px);
          z-index: 60;
        }
        .group:hover .navbar-dropdown {
          pointer-events: auto;
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .navbar-dropdown-inner {
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.375rem;
          min-width: 148px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .navbar-dropdown-item {
          display: block;
          padding: 0.5rem 0.875rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .navbar-dropdown-item:hover {
          background: var(--hover);
          color: var(--foreground);
        }
        .navbar-dropdown-item-active {
          color: var(--foreground) !important;
          background: var(--hover);
        }

        /* ── Right side ── */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        /* ── Icon button ── */
        .navbar-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .navbar-icon-btn:hover {
          color: var(--foreground);
          background: var(--hover);
          border-color: var(--foreground);
        }

        /* ── Theme dropdown ── */
        .navbar-theme-wrap { position: relative; }
        .navbar-theme-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.375rem;
          min-width: 148px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          z-index: 60;
          animation: navbar-pop 0.18s ease;
        }
        @keyframes navbar-pop {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .navbar-theme-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem 0.875rem;
          border-radius: 8px;
          border: none;
          background: transparent;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-align: left;
        }
        .navbar-theme-item:hover {
          background: var(--hover);
          color: var(--foreground);
        }
        .navbar-theme-item-active {
          color: var(--foreground) !important;
          background: var(--hover);
        }

        /* ── Hamburger button ── */
        .navbar-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4.5px;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1px solid var(--border);
          background: var(--background);
          cursor: pointer;
          padding: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .navbar-hamburger:hover {
          border-color: var(--foreground);
          background: var(--hover);
        }
        @media (min-width: 768px) {
          .navbar-hamburger { display: none; }
        }

        .navbar-ham-line {
          display: block;
          width: 16px;
          height: 1.5px;
          background: var(--foreground);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }
        /* Open state — X */
        .navbar-ham-open-1 { transform: translateY(6px) rotate(45deg); }
        .navbar-ham-open-2 { opacity: 0; transform: scaleX(0); }
        .navbar-ham-open-3 { transform: translateY(-6px) rotate(-45deg); }

        /* ── Overlay ── */
        .navbar-overlay {
          position: fixed;
          inset: 0;
          z-index: 55;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .navbar-overlay-visible {
          opacity: 1;
          pointer-events: auto;
        }

        /* ── Mobile drawer ── */
        .navbar-drawer {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 60;
          width: min(320px, 85vw);
          height: 100dvh;
          background: var(--background);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .navbar-drawer-open {
          transform: translateX(0);
        }
        @media (min-width: 768px) {
          .navbar-drawer { display: none; }
        }

        /* Drawer header */
        .navbar-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        /* Eyebrow */
        .navbar-drawer-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 1.25rem 1.25rem 0.5rem;
        }

        /* Drawer nav */
        .navbar-drawer-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0.75rem;
          gap: 0.125rem;
        }

        .navbar-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.75rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background 0.15s, color 0.15s;
          animation: drawer-item-in 0.4s ease both;
        }
        .navbar-drawer-link:hover {
          background: var(--hover);
          color: var(--foreground);
        }
        .navbar-drawer-link-active {
          color: var(--foreground) !important;
          background: var(--hover);
        }
        @keyframes drawer-item-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .navbar-drawer-active-badge {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          background: var(--foreground);
          color: var(--background);
        }

        /* Gallery accordion */
        .navbar-drawer-accordion {
          font-family: inherit;
        }
        .navbar-drawer-children {
          padding: 0.25rem 0 0.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .navbar-drawer-child {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.75rem;
          border-radius: 8px;
          font-size: 0.83rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .navbar-drawer-child:hover {
          background: var(--hover);
          color: var(--foreground);
        }
        .navbar-drawer-child-active {
          color: var(--foreground) !important;
          background: var(--hover);
        }
        .navbar-drawer-child-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--border);
          flex-shrink: 0;
        }
        .navbar-drawer-child-active .navbar-drawer-child-dot {
          background: var(--foreground);
        }

        /* Drawer footer */
        .navbar-drawer-footer {
          padding: 1.25rem;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .navbar-drawer-footer-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .navbar-drawer-theme-row {
          display: flex;
          gap: 0.4rem;
        }
        .navbar-drawer-theme-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.5rem 0.5rem;
          border-radius: 9px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--muted);
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          font-family: inherit;
        }
        .navbar-drawer-theme-btn:hover {
          color: var(--foreground);
          border-color: var(--foreground);
        }
        .navbar-drawer-theme-active {
          background: var(--foreground) !important;
          color: var(--background) !important;
          border-color: var(--foreground) !important;
        }
      `}</style>
    </>
  );
}