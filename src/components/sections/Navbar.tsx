"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocalTime } from "@/components/ui/local-time";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "Hey", id: "hey" },
  { label: "Work", id: "work" },
  { label: "Story", id: "story" },
  { label: "Notes", id: "notes" },
  { label: "Chat", id: "chat" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hey");

  useEffect(() => {
    if (!isHome) return;

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Off the homepage the anchors point at sections that are not on the page, so
  // the current item comes from the route instead of the scroll position.
  const isActive = (id: string) =>
    isHome ? activeSection === id : pathname.startsWith("/blog") && id === "notes";

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      {/* Narrow: a rounded bar with a menu trigger. The nav is sticky rather than
          fixed, so it occupies flow space and the hero pulls back up under it. */}
      <div className="sticky top-0 z-[90] px-4 pt-3.5 md:hidden">
        <nav
          aria-label="Main navigation"
          className="flex h-14 items-center justify-between gap-3 rounded-full bg-nav pl-1.5 pr-2 shadow-[var(--shadow-up)]"
        >
          <ThemeToggle />
          <SheetTrigger className="inline-flex h-[2.875rem] items-center gap-3 rounded-full pl-5 pr-4 text-[1.0625rem] font-semibold text-[#F6F2EA]">
            Menu
            <span aria-hidden="true" className="flex w-[1.375rem] flex-col gap-[5px]">
              <span className="h-0.5 bg-[#F6F2EA]" />
              <span className="h-0.5 bg-[#F6F2EA]" />
            </span>
          </SheetTrigger>
        </nav>
      </div>

      {/* Wide: a centred floating pill. */}
      <div className="pointer-events-none sticky top-0 z-20 hidden justify-center pt-[1.125rem] md:flex">
        <nav
          aria-label="Main navigation"
          className="animate-[rise_700ms_var(--ease-standard)_both] pointer-events-auto flex max-w-[calc(100vw-1.25rem)] items-center gap-0.5 overflow-x-auto rounded-full bg-nav p-[7px] shadow-[var(--shadow-up)] [scrollbar-width:none]"
        >
          <ThemeToggle className="size-[2.375rem]" />
          {links.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              aria-current={isActive(link.id) ? "true" : undefined}
              className={`shrink-0 rounded-full px-[clamp(0.6875rem,3.4vw,1.125rem)] pb-2.5 pt-[0.5625rem] text-[clamp(0.84375rem,3.4vw,0.9375rem)] font-semibold -tracking-[0.01em] transition-colors duration-[var(--motion-base)] ${
                isActive(link.id)
                  ? "bg-[rgba(221,160,130,0.18)] text-[#DDA082]"
                  : "text-[#C8DAD6] hover:bg-[rgba(246,242,234,0.12)] hover:text-[#F6F2EA]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <SheetContent
        side="top"
        className="inset-[5.25rem_1rem_1rem] flex flex-col overflow-y-auto overscroll-contain rounded-[2.125rem] border-0 bg-nav px-[1.625rem] pb-[1.625rem] pt-[1.375rem] shadow-[var(--shadow-up)] [&>button:last-child]:right-[1.625rem] [&>button:last-child]:top-[1.375rem] [&>button:last-child]:rounded-full [&>button:last-child]:bg-[rgba(246,242,234,0.10)] [&>button:last-child]:text-[#F6F2EA] [&>button:last-child]:hover:bg-[rgba(246,242,234,0.2)] [&>button:last-child]:hover:text-[#F6F2EA] md:hidden"
      >
        <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to the main sections of Ajay Darisi&apos;s site.
        </SheetDescription>

        <div className="mt-[3.75rem] flex flex-col">
          {links.map((link) => (
            <SheetClose key={link.id} asChild>
              <Link
                href={`/#${link.id}`}
                aria-current={isActive(link.id) ? "true" : undefined}
                className={`flex items-center justify-between gap-4 border-b border-[rgba(246,242,234,0.12)] px-1 py-[clamp(0.6875rem,2.2vh,1.125rem)] text-[clamp(1.4375rem,6.6vw,2.125rem)] font-bold -tracking-[0.04em] ${
                  isActive(link.id) ? "text-[#DDA082]" : "text-[#F6F2EA]"
                }`}
              >
                {link.label}
                <ArrowRight
                  className="size-[1.375rem] shrink-0 text-[#DDA082]"
                  aria-hidden="true"
                />
              </Link>
            </SheetClose>
          ))}
        </div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          onClick={() => {
            trackEvent(ANALYTICS_EVENTS.navMobileCtaClick, {
              location: "mobile_nav",
            });
            setMobileOpen(false);
          }}
          className="mt-8 inline-flex h-[2.875rem] shrink-0 items-center self-start rounded-full bg-[#DDA082] px-[1.375rem] text-base font-bold text-[#0F2724]"
        >
          Start a project
        </a>

        <p className="hand mt-auto pt-[1.375rem] text-[1.375rem] leading-[1.2] text-[#A8BEB9]">
          open to new work · Bengaluru <LocalTime />
        </p>
      </SheetContent>
    </Sheet>
  );
}
