"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = ["Services", "Work", "About", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-border">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <Button asChild size="sm" className="w-fit">
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
