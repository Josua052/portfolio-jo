"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Laptop, ChevronDown } from "lucide-react";

const menus = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Project", href: "/project" },
  { name: "Awards", href: "/awards" },
  {
    name: "Gallery",
    children: [
      { name: "Editing", href: "/gallery-editing" },
      { name: "Live", href: "/gallery-live" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 w-full z-50 border-b bg-[var(--background)] text-[var(--foreground)]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          Ronaldo
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {menus.map((menu) =>
            menu.children ? (
              <div key={menu.name} className="relative group">
                {/* Parent */}
                <span className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition">
                  {menu.name}
                  <ChevronDown size={16} className="mt-[1px]" />
                </span>

                {/* Dropdown */}
                <div
                  className="absolute left-0 mt-2 hidden group-hover:block 
                rounded-xl border border-[var(--border)] 
                bg-[var(--background)] text-[var(--foreground)] 
                shadow-md p-2 min-w-[150px]"
                >
                  {menu.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-3 py-2 rounded-md 
                    hover:bg-[var(--hover)] hover:text-[var(--hover-foreground)] transition"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={menu.name}
                href={menu.href}
                className="hover:opacity-70 transition"
              >
                {menu.name}
              </Link>
            ),
          )}
        </div>

        {/* Theme Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-[var(--hover)] transition"
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-44 rounded-xl 
                border border-[var(--border)] 
                bg-[var(--background)] text-[var(--foreground)]
                shadow-md p-2 text-sm backdrop-blur-md"
            >
              <button
                onClick={() => {
                  setTheme("light");
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md 
                hover:bg-[var(--hover)] hover:text-[var(--hover-foreground)] transition"
              >
                <Sun size={16} /> Light
              </button>

              <button
                onClick={() => {
                  setTheme("dark");
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md 
                hover:bg-[var(--hover)] hover:text-[var(--hover-foreground)] transition"
              >
                <Moon size={16} /> Dark
              </button>

              <button
                onClick={() => {
                  setTheme("system");
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md 
                hover:bg-[var(--hover)] hover:text-[var(--hover-foreground)] transition"
              >
                <Laptop size={16} /> System
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
