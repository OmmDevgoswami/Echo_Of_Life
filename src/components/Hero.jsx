import { motion, useScroll, useTransform } from "framer-motion";
import Stars from "./Stars";
import Cat from "./Cat";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Sigil Transitions
  const sigilScale = useTransform(scrollY, [0, 500], [1, 0.4]);
  const sigilOpacity = useTransform(scrollY, [0, 500], [0.9, 0.15]);
  const sigilY = useTransform(scrollY, [0, 500], [0, -100]);
  const sigilBlur = useTransform(scrollY, [0, 500], ["0px", "4px"]);

  return (
    <section id="hero" ref={containerRef} className="min-h-screen flex flex-col items-center justify-center text-center p-8 overflow-hidden relative">
      <Stars />

      {/* SIGIL - FIXED BACKGROUND CONSTANT */}
      <motion.div 
        style={{ 
          scale: sigilScale, 
          opacity: sigilOpacity, 
          y: sigilY,
          filter: `blur(${sigilBlur})`,
          position: "fixed",
          top: "20%",
          left: "50%",
          translateX: "-50%",
          zIndex: 0
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="sigil w-[280px] h-[280px] md:w-[450px] md:h-[450px] pointer-events-none transition-all glow-gold"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)" stroke="#c9a84c" fill="none" strokeWidth="0.8" opacity="0.9">
            <circle cx="100" cy="100" r="95" strokeDasharray="3 5"/>
            <circle cx="100" cy="100" r="82" strokeDasharray="1 4"/>
            <circle cx="100" cy="100" r="68"/>
            <polygon points="100,15 188,68 188,132 100,185 12,132 12,68" strokeWidth="0.6"/>
            <polygon points="100,30 175,76 175,124 100,170 25,124 25,76" strokeWidth="0.4" strokeDasharray="2 3"/>
            <path d="M100,10 L110,90 L190,100 L110,110 L100,190 L90,110 L10,100 L90,90 Z" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="30"/>
            <path d="M85,82 L78,70 L92,78 M115,82 L122,70 L108,78" strokeWidth="1.2"/>
            <circle cx="93" cy="94" r="2" fill="#c9a84c" stroke="none"/>
            <circle cx="107" cy="94" r="2" fill="#c9a84c" stroke="none"/>
            <path d="M97,100 Q100,103 103,100" strokeWidth="1"/>
            <path d="M100,5 Q107,10 100,15 Q93,10 100,5" fill="#c9a84c" stroke="none"/>
            <path d="M195,100 Q190,107 185,100 Q190,93 195,100" fill="#c9a84c" stroke="none"/>
            <path d="M100,195 Q93,190 100,185 Q107,190 100,195" fill="#c9a84c" stroke="none"/>
            <path d="M5,100 Q10,93 15,100 Q10,107 5,100" fill="#c9a84c" stroke="none"/>
            <circle cx="100" cy="5" r="2.5" fill="#c9a84c" stroke="none"/>
            <circle cx="188" cy="68" r="2.5" fill="#c9a84c" stroke="none"/>
            <circle cx="188" cy="132" r="2.5" fill="#c9a84c" stroke="none"/>
            <circle cx="100" cy="195" r="2.5" fill="#c9a84c" stroke="none"/>
            <circle cx="12" cy="132" r="2.5" fill="#c9a84c" stroke="none"/>
            <circle cx="12" cy="68" r="2.5" fill="#c9a84c" stroke="none"/>
          </g>
        </svg>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-garamond italic text-sm tracking-[0.4em] text-gold uppercase mb-4 z-10"
      >
        into the trail of misty forest
      </motion.p>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="font-cinzel text-5xl md:text-8xl leading-none tracking-tight title-gradient mb-8 z-10"
      >
        The Inkbound<br/>Witch
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="font-fell italic text-lg md:text-2xl text-parchment-dim tracking-wider mb-10 z-10"
      >
        Witches and Sages, Moon and Tomes, Shadows and Cloak, <br /> <em> Welcome to my Domain. </em>
      </motion.p>

      <Cat />

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center gap-2 opacity-60 text-gold text-xs uppercase tracking-[0.3em] z-10"
      >
        <span>↓</span>
        <span>scroll to enter</span>
      </motion.div>
    </section>
  );
}

