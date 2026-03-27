import { useScroll, motion } from "framer-motion";
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
    <div className="bg-[#0b0b12] text-white overflow-x-hidden selection:bg-purple-500/30">
      <CustomCursor />
      <MouseTrail />
      <MagicBackground />
      <DotNav />

      {/* PERMANENT LOGO */}
      <nav className="fixed top-0 left-0 p-8 z-[100] pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-cinzel text-gold text-lg md:text-xl tracking-[0.2em] pointer-events-auto cursor-pointer"
        >
          ✦ <span className="hover:text-gold-bright transition-colors">THE INKBOUND WITCH</span>
        </motion.div>
      </nav>

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