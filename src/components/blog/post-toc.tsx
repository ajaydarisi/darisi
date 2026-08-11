import { Children, cloneElement, isValidElement, type ReactNode } from "react";

export interface PostHeading {
  id: string;
  label: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return headingText(node.props.children);
  }

  return "";
}

/**
 * Collects the article's `h2`s and stamps the ids the contents list links to.
 *
 * Posts are hand-authored JSX with the headings as direct children, so reading
 * them off the element tree keeps the contents list correct with no per-post
 * metadata to maintain — and it happens on the server, so the list ships in the
 * HTML rather than appearing after hydration.
 */
export function withHeadingIds(children: ReactNode): {
  headings: PostHeading[];
  content: ReactNode;
} {
  const headings: PostHeading[] = [];

  const content = Children.map(children, (child) => {
    if (!isValidElement<{ id?: string; children?: ReactNode }>(child)) return child;
    if (child.type !== "h2") return child;

    const label = headingText(child.props.children).trim();
    if (!label) return child;

    const id = child.props.id ?? slugify(label);
    headings.push({ id, label });

    return cloneElement(child, { id });
  });

  return { headings, content };
}

export function PostToc({ headings }: { headings: PostHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="rounded-[1.75rem] bg-card px-7 py-[1.625rem] shadow-[var(--shadow-soft)]"
    >
      <p className="text-xs font-bold uppercase tracking-[0.09em] text-soft">
        On this page
      </p>
      <div className="mt-4 flex flex-col">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="border-t-[1.5px] border-line py-[0.6875rem] text-[0.9375rem] font-medium leading-[1.4] text-[var(--text-body)] transition-[color,padding-left] duration-200 hover:pl-1.5 hover:text-foreground"
          >
            {heading.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
