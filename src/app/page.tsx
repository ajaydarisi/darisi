import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Trust } from "@/components/sections/Trust";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { BestFit } from "@/components/sections/BestFit";
import { FAQ } from "@/components/sections/FAQ";
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
      <main>
        <Hero />
        <Work />
        <Trust />
        <Services />
        <Process />
        <About />
        <BestFit />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
