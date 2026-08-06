import Image from "next/image";

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

  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={className}
    />
  );
}
