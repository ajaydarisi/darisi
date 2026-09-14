import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function NotesNavigation({ isIndex = false }: { isIndex?: boolean }) {
  return (
    <nav aria-label="Notes navigation" className="flex flex-wrap items-center gap-3">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-panel2"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>
      {isIndex ? (
        <span aria-current="page" className="px-2 text-sm font-medium text-soft">Notes</span>
      ) : (
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center rounded-full border border-line px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-card"
        >
          All notes
        </Link>
      )}
    </nav>
  );
}
