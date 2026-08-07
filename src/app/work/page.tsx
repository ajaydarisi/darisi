import type { Metadata } from "next";
import { WorkIndex } from "@/components/sections/work-index";
import { buildWorkPageJsonLd } from "@/lib/site-content";

const jsonLd = buildWorkPageJsonLd();

const title = "Selected Work | Darisi";
const description =
  "A working index of product web apps, internal systems, and platform work by Ajay Darisi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work" },
  twitter: { title, description },
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkIndex />
    </>
  );
}
