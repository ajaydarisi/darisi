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
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
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
            ? "border-border bg-background/90 shadow-[var(--shadow-floating)] backdrop-blur-xl"
            : "border-transparent bg-background/80 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="site-shell flex h-16 items-center justify-between"
        >
          <Link
            href="/"
            className="flex items-center"
            aria-label="Darisi home"
          >
            <BrandMark
              variant="mark"
              className="h-7 w-7"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm transition-colors duration-[var(--motion-fast)] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-primary-text after:transition-all after:duration-[var(--motion-base)] after:content-[''] ${
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
        className="top-16 min-h-[calc(100svh-4rem)] rounded-none border-x-0 border-t-0 bg-background p-0 lg:hidden"
      >
        <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to the main sections of Ajay Darisi&apos;s site.
        </SheetDescription>

        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6">
          {links.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <SheetClose key={link.label} asChild>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center rounded-[var(--radius-control)] px-4 py-3 text-base transition-colors duration-[var(--motion-base)] hover:bg-surface hover:text-foreground ${
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
