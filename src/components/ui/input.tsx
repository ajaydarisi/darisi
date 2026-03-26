import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/50 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
