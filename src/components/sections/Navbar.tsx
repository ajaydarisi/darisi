"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <header
        className={`sticky top-0 z-[60] border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/90 shadow-lg shadow-black/20 backdrop-blur-xl"
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
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
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
          {links.map((link) => (
            <SheetClose key={link.label} asChild>
              <a
                href={link.href}
                className="flex items-center rounded-xl px-4 py-3 text-base text-muted transition-colors duration-300 hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
          <div className="mt-3 border-t border-border pt-3">
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
