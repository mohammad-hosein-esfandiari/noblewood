import { Background } from "./children/Background";
import { FloatingElements } from "./children/FloatingElements";
import { MainContent } from "./children/MainContent";
import { FeaturesGrid } from "./children/FeaturesGrid";

export default function HeroSection() {
  return (
    <section className="hero-section  relative min-h-screen flex items-center justify-center overflow-hidden pb-32">
      <Background />
      <FloatingElements />
      <div className="relative  z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <MainContent />
        <FeaturesGrid />
      </div>
    </section>
  );
}
