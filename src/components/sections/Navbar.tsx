"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
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
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function sectionId(href: string): string | null {
  return href.includes("#") ? href.split("#")[1] : null;
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isLinkActive = (href: string) => {
    const id = sectionId(href);
    return id ? activeSection === id : pathname.startsWith(href);
  };

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
      .map((link) => {
        const id = sectionId(link.href);
        return id ? document.getElementById(id) : null;
      })
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
        className={`sticky top-0 z-[60] border-b transition-all duration-[var(--motion-base)] ${
          scrolled
            ? "border-border-subtle bg-background/95 shadow-[var(--shadow-floating)] backdrop-blur-xl"
            : "border-border-subtle/70 bg-background/85 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="site-shell flex h-[4.5rem] items-center justify-between"
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Darisi home"
          >
            <BrandMark
              variant="mark"
              className="h-8 w-8"
            />
            <span className="hidden font-utility text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-foreground sm:inline">
              Ajay Darisi
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex xl:gap-9">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative py-2 font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-[var(--motion-fast)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-primary-text after:transition-transform after:duration-[var(--motion-base)] after:content-[''] ${
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:scale-x-0"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild size="sm">
                <Link
                  href="/#contact"
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.navPrimaryCtaClick, {
                      location: "desktop_nav",
                    })
                  }
                >
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>

          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
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
        className="top-[4.5rem] min-h-[calc(100svh-4.5rem)] rounded-none border-x-0 border-t-0 bg-background p-0 lg:hidden"
      >
        <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to the main sections of Ajay Darisi&apos;s site.
        </SheetDescription>

        <nav className="site-shell flex flex-col gap-1 py-8">
          {links.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <SheetClose key={link.label} asChild>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center border-b border-border-subtle px-1 py-4 font-display text-2xl transition-colors duration-[var(--motion-base)] hover:text-primary-text ${
                    isActive
                      ? "text-primary-text"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </SheetClose>
            );
          })}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Theme
              </span>
              <ThemeToggle />
            </div>
            <Button asChild className="w-full" size="default">
              <Link
                href="/#contact"
                onClick={() => {
                  trackEvent(ANALYTICS_EVENTS.navMobileCtaClick, {
                    location: "mobile_nav",
                  });
                  setMobileOpen(false);
                }}
              >
                Get in Touch
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
