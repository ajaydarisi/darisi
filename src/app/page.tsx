import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Story } from "@/components/sections/Story";
import { Notes } from "@/components/sections/Notes";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { buildJsonLd } from "@/lib/site-content";

const jsonLd = buildJsonLd();

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <Hero />
        <Work />
        <Story />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
