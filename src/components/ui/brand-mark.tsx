import type { CSSProperties } from "react";

type BrandMarkVariant = "mark" | "wordmark";

const assets = {
  mark: {
    src: "/logo.svg",
    width: 512,
    height: 512,
    alt: "Darisi logo",
  },
  wordmark: {
    src: "/darisi-wordmark.svg",
    width: 828,
    height: 256,
    alt: "DARISI",
  },
} as const;

interface BrandMarkProps {
  variant: BrandMarkVariant;
  className?: string;
  alt?: string;
}

// No preload: `as="image"` never matches how the browser fetches a CSS
// mask-image, so the hint was discarded ("credentials mode does not match")
// and the SVG was fetched twice. The mask is same-origin and ~1 KB, and the
// stylesheet referencing it is render-blocking, so the fetch already starts as
// early as it usefully can.
export function BrandMark({ variant, className, alt }: BrandMarkProps) {
  const asset = assets[variant];
  const label = alt ?? asset.alt;
  const style = {
    aspectRatio: `${asset.width} / ${asset.height}`,
    maskImage: `url(${asset.src})`,
    maskPosition: "center",
    maskRepeat: "no-repeat",
    maskSize: "contain",
    WebkitMaskImage: `url(${asset.src})`,
    WebkitMaskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
  } satisfies CSSProperties;

  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={`block bg-primary ${className ?? ""}`}
      style={style}
    />
  );
}
