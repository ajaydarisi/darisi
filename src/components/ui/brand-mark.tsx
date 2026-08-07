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
  priority?: boolean;
}

export function BrandMark({
  variant,
  className,
  alt,
  priority = false,
}: BrandMarkProps) {
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
    <>
      {priority && <link rel="preload" as="image" href={asset.src} fetchPriority="high" />}
      <span
        role={label ? "img" : undefined}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
        className={`block bg-primary ${className ?? ""}`}
        style={style}
      />
    </>
  );
}
