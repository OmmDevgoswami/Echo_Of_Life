import { useScroll } from "framer-motion";
import Hero from "../components/Hero";
import Identity from "../components/Identity";
import Fragments from "../components/Fragments";
import DeepSection from "../components/DeepSection";
import ExploreCTA from "../components/ExploreCTA";
import DotNav from "../components/DotNav";
import RevealSection from "../components/RevealSection"
import CustomCursor from "../components/CustomCursor";
import MouseTrail from "../components/MouseTrail";
import ScrollParticles from "../components/ScrollParticles";
export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-[#0b0b12] text-white overflow-x-hidden selection:bg-purple-500/30">
      <MouseTrail />
      <CustomCursor />
      <ScrollParticles />

      <DotNav />

      <section id="hero">
        <Hero />
      </section>

      <section id="identity">
        <RevealSection>
          <Identity />
        </RevealSection>
      </section>

      <section id="fragments">
        <RevealSection>
          <Fragments scrollYProgress={scrollYProgress} />
        </RevealSection>
      </section>

      <section id="deep">
        <RevealSection>
          <DeepSection />
        </RevealSection>
      </section>

      <section id="cta">
        <RevealSection>
          <ExploreCTA />
        </RevealSection>
      </section>

    </div>
  );
}