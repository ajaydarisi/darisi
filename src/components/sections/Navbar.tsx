"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = ["Services", "Work", "About", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (mobileOpen) closeMobile();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen, closeMobile]);

  // Body scroll lock + Escape key
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeMobile();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-border shadow-lg shadow-black/20"
            : "bg-background/80 backdrop-blur-md border-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16"
        >
          <a
            href="#"
            className="flex items-center gap-2.5"
            aria-label="Darisi — Home"
          >
            <img
              src="/logo.svg"
              alt="Darisi logo"
              className="h-6 w-6"
              width={24}
              height={24}
            />
            <span className="text-lg font-bold tracking-widest text-foreground">
              DARISI
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {link}
              </a>
            ))}
            <Button asChild size="sm" variant="outline">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay — always in DOM for CSS transitions */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        />

        {/* Menu panel */}
        <div
          className={`absolute top-16 left-0 right-0 bg-background border-b border-border shadow-2xl shadow-black/40 transition-all duration-300 ease-out ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-1">
            {links.map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`flex items-center text-base text-muted hover:text-foreground hover:bg-surface rounded-xl px-4 py-3 transition-all duration-300 ease-out ${
                  mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${75 + index * 50}ms` : "0ms",
                }}
                onClick={closeMobile}
              >
                {link}
              </a>
            ))}
            <div
              className={`mt-3 pt-3 border-t border-border transition-all duration-300 ease-out ${
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: mobileOpen
                  ? `${75 + links.length * 50}ms`
                  : "0ms",
              }}
            >
              <Button asChild size="default" className="w-full">
                <a href="#contact" onClick={closeMobile}>
                  Get in Touch
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
