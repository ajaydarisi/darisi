"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";
import { socialUrls } from "@/lib/seo";

const quickLinks = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialLinks = [
  { icon: GitHubIcon, href: socialUrls.github, label: "GitHub" },
  { icon: LinkedInIcon, href: socialUrls.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer aria-label="Site footer" className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/darisi-wordmark.svg"
                alt="Darisi"
                className="h-9 w-auto"
                width={117}
                height={36}
              />
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Personal site of Ajay Darisi, a software engineer in Bengaluru,
              India, building product web apps, internal tools, and platform
              features.
            </p>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">
              Get in Touch
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-200"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
                  location: "footer",
                })
              }
            >
              <Mail className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="w-9 h-9 rounded-lg hover:text-primary bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Ajay Darisi.
          </p>
        </div>
      </div>
    </footer>
  );
}
