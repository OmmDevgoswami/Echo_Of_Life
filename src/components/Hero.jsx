import { motion } from "framer-motion";
import { useRef } from "react";
import SplitTextReveal from "./SplitTextReveal";
import Cat from "./Cat";
import Stars from "./Stars";

export default function Hero() {
  const textRef = useRef(null);

  const handleMove = (e) => {
    if (!textRef.current) return;

    const rect = textRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // ✨ Whole text slight movement
    textRef.current.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;

    // ✨ Glow intensity based on distance
    const distance = Math.sqrt(x * x + y * y);
    const intensity = Math.max(0, 1 - distance / 300);

    textRef.current.style.textShadow = `
      0 0 ${20 + intensity * 40}px rgba(124,58,237,${0.2 + intensity * 0.4})
    `;

    // ✨ Letter-level interaction (magic part)
    const chars = textRef.current.querySelectorAll(".char");

    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();

      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      const dist = Math.sqrt(dx * dx + dy * dy);
      const strength = Math.max(0, 1 - dist / 120);

      char.style.transform = `
        translate(${dx * 0.02 * strength}px, ${dy * 0.02 * strength}px)
      `;
    });
  };

  const reset = () => {
    if (!textRef.current) return;

    textRef.current.style.transform = "translate(0px, 0px)";
    textRef.current.style.textShadow = "0 0 20px rgba(255,255,255,0.08)";

    const chars = textRef.current.querySelectorAll(".char");
    chars.forEach((char) => {
      char.style.transform = "translate(0px, 0px)";
    });
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      
      <Stars />

      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-700 opacity-20 blur-[160px]" />

      {/* Text */}
      <div
        ref={textRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="text-center max-w-2xl leading-relaxed transition-transform duration-300"
      >
        <SplitTextReveal
          text="Some stories are not written… they are felt."
          className="hero-font text-3xl md:text-5xl"
        />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-sm text-white/60"
      >
        — Echoes of Life
      </motion.p>

      <Cat />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0.8], y: [0, 6, 0] }}
        transition={{
          delay: 6.5, // ⏳ AFTER cat animation (~6s)
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 flex flex-col items-center text-white/60 text-sm"
      >
        <span className="tracking-wide">Scroll to explore</span>

        {/* Arrow */}
        <div className="mt-2 text-lg">↓</div>
      </motion.div>
    </section>
  );
}