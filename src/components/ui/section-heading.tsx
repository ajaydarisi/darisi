import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  titleId: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "section-heading",
        align === "center" && "section-heading--center",
        className
      )}
    >
      <Badge variant="eyebrow">{eyebrow}</Badge>
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
