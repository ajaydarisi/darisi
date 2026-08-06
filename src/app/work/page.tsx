import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
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
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <WorkIndex />
      </main>
      <Footer />
    </>
  );
}
