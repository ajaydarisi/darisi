import type { Metadata } from "next";
import { WorkIndex } from "@/components/sections/work-index";

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
  return <WorkIndex />;
}
