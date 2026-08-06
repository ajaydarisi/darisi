"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";
import { socialUrls } from "@/lib/seo";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
];

export function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-border-subtle py-10">
      <div className="site-shell">
        <div className="flex flex-col gap-8 border-b border-border-subtle pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center">
              <BrandMark variant="wordmark" alt="Darisi" className="h-8 w-auto" />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Product web apps, internal tools, and platform work by Ajay Darisi.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, { location: "footer" })
            }
          >
            <Mail className="h-4 w-4" />
            {CONTACT_EMAIL}
          </a>
          <div className="flex items-center gap-5">
            <a href={socialUrls.github} target="_blank" rel="me noopener noreferrer" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href={socialUrls.linkedin} target="_blank" rel="me noopener noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <p className="text-xs">© {new Date().getFullYear()} Ajay Darisi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
