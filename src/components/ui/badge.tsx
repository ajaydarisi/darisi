import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border transition-colors",
  {
    variants: {
      variant: {
        eyebrow:
          "rounded-[var(--radius-tag)] border-primary/30 bg-primary/10 px-3 py-1 font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary-text",
        tag: "rounded-full border-border bg-background/70 px-2.5 py-1 text-xs font-medium text-muted",
        media:
          "rounded-full border-border/80 bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm",
        secondary: "rounded-full border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted",
        outline:
          "rounded-[var(--radius-tag)] border-border bg-background/85 px-3 py-1 font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "tag",
    },
  }
)

function Badge({
  className,
  variant = "tag",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
