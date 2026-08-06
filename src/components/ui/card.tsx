import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-[var(--radius-panel)] border border-border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "shadow-[var(--shadow-card)]",
        interactive:
          "shadow-[var(--shadow-card)] transition-all duration-[var(--motion-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]",
        inset: "bg-background/60 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  asChild = false,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
} & VariantProps<typeof cardVariants>) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted leading-relaxed", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

export {
  Card,
  cardVariants,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
