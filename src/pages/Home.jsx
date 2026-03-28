import { useScroll, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Identity from "../components/Identity";
import Fragments from "../components/Fragments";
import DeepSection from "../components/DeepSection";
import ExploreCTA from "../components/ExploreCTA";
import DotNav from "../components/DotNav";
import RevealSection from "../components/RevealSection"
import CustomCursor from "../components/CustomCursor";
import MagicBackground from "../components/MagicBackground";
import ShelfOfShadows from "../components/ShelfOfShadows";
import MouseTrail from "../components/MouseTrail";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-transparent text-white overflow-x-hidden selection:bg-purple-500/30">
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

      <section id="collection">
        <RevealSection>
          <ShelfOfShadows />
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