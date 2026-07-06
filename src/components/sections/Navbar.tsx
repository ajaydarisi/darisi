"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <header
        className={`sticky top-0 z-[60] border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/90 shadow-[var(--shadow-floating)] backdrop-blur-xl"
            : "border-transparent bg-background/80 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Darisi home"
          >
            <Image
              src="/logo.svg"
              alt="Darisi logo"
              className="h-6 w-6"
              width={24}
              height={24}
            />
            <span className="text-lg font-bold tracking-widest text-foreground">
              DARISI
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-primary-text after:transition-all after:duration-300 after:content-[''] ${
                    isActive
                      ? "text-foreground after:w-full"
                      : "text-muted hover:text-foreground after:w-0"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild size="sm" variant="outline">
                <a
                  href="#contact"
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.navPrimaryCtaClick, {
                      location: "desktop_nav",
                    })
                  }
                >
                  Start a Project
                </a>
              </Button>
            </div>
          </div>

          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </SheetTrigger>
        </nav>
      </header>

      <SheetContent
        side="top"
        hideClose
        className="top-16 rounded-none border-x-0 border-t-0 bg-background p-0 md:hidden"
      >
        <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to the main sections of the Darisi website.
        </SheetDescription>

        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");

            return (
              <SheetClose key={link.label} asChild>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center rounded-xl px-4 py-3 text-base transition-colors duration-300 hover:bg-surface hover:text-foreground ${
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </SheetClose>
            );
          })}
          <div className="mt-3 border-t border-border pt-3">
            <div className="mb-3 flex justify-end px-4">
              <ThemeToggle />
            </div>
            <Button asChild className="w-full" size="default">
              <a
                href="#contact"
                onClick={() => {
                  trackEvent(ANALYTICS_EVENTS.navMobileCtaClick, {
                    location: "mobile_nav",
                  });
                  setMobileOpen(false);
                }}
              >
                Start a Project
              </a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
