"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";

const links = ["Services", "Work", "About", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (mobileOpen) setMobileOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  return (
    <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/90 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-transparent bg-background/80 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
        >
          <a
            href="#"
            className="flex items-center gap-2.5"
            aria-label="Darisi — Home"
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
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link}
              </a>
            ))}
            <Button asChild size="sm" variant="outline">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          <Dialog.Trigger asChild>
            <button
              className="p-2 text-muted transition-colors hover:text-foreground md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </Dialog.Trigger>
        </nav>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 md:hidden" />
        <Dialog.Content className="mobile-menu-panel fixed left-0 right-0 top-16 z-50 border-b border-border bg-background shadow-2xl shadow-black/40 focus:outline-none md:hidden">
          <Dialog.Title className="sr-only">Mobile navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Navigate to the main sections of the Darisi website.
          </Dialog.Description>

          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6">
            {links.map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="mobile-menu-link flex items-center rounded-xl px-4 py-3 text-base text-muted transition-colors duration-300 hover:bg-surface hover:text-foreground"
                style={
                  {
                    "--menu-delay": `${75 + index * 50}ms`,
                  } as CSSProperties
                }
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <div
              className="mobile-menu-cta mt-3 border-t border-border pt-3"
              style={
                {
                  "--menu-delay": `${75 + links.length * 50}ms`,
                } as CSSProperties
              }
            >
              <Button asChild className="w-full" size="default">
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  Get in Touch
                </a>
              </Button>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
