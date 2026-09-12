import { Footer, Navbar } from "../components";
import ContentTypes from "./landing/ContentTypes";
import FinalCta from "./landing/FinalCta";
import Hero from "./landing/Hero";
import HowItWorks from "./landing/HowItWorks";
import LibraryPreview from "./landing/LibraryPreview";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-ink selection:text-paper">
      <Navbar />
      <main>
        <Hero />
        <LibraryPreview />
        <ContentTypes />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
