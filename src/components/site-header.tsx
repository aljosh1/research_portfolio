"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const subscribe = () => () => {};
const getMountedSnapshot = () => true;
const getServerSnapshot = () => false;

export function SiteHeader({ name }: { name: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mounted = useSyncExternalStore(
    subscribe,
    getMountedSnapshot,
    getServerSnapshot,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const monogram = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLowerCase();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    document
      .querySelectorAll<HTMLElement>("main section[id]")
      .forEach((section) => {
        observer.observe(section);
      });

    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label={`${name} — home`}>
        <span className="wordmark-mark" aria-hidden="true">
          {monogram}.
        </span>
        <span className="wordmark-name">{name}</span>
      </a>

      <nav
        className={`primary-nav${menuOpen ? "is-open" : ""}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <a
            className={
              activeSection === link.href ? "nav-link is-active" : "nav-link"
            }
            href={link.href}
            key={link.href}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a className="nav-availability" href="#contact" onClick={closeMenu}>
          Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>

      <div className="header-actions">
        <button
          className="icon-button theme-toggle"
          type="button"
          aria-label={
            mounted && resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <Moon size={18} aria-hidden="true" />
          )}
        </button>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
