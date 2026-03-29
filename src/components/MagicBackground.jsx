import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ✦✧★⊕⊗∞◈☽☾◯❂';

export default function MagicBackground() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      char: runes[Math.floor(Math.random() * runes.length)],
      left: Math.random() * 100 + "vw",
      duration: 30 + Math.random() * 40 + "s",
      delay: Math.random() * -40 + "s",
      fontSize: 0.8 + Math.random() * 2.5 + "rem",
      opacity: 0.02 + Math.random() * 0.08
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="rune-field fixed inset-0 pointer-events-none z-0 overflow-hidden bg-void">
      {/* GLOWING LUNAR ORBS */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]"
      />
      
      {/* SPECTRAL MOONS */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`moon-${i}`}
          initial={{ y: "110vh", x: (i * 25) + "vw", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.15, 0] }}
          transition={{ 
            duration: 40 + (i * 10), 
            repeat: Infinity, 
            delay: i * 8,
            ease: "linear"
          }}
          className="absolute text-gold/20 font-serif text-6xl md:text-9xl pointer-events-none"
        >
          {['☽', '☾', '◯', '◌'][i % 4]}
        </motion.div>
      ))}

      {/* SHINY DUST */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          initial={{ 
            opacity: 0,
            x: Math.random() * 100 + "vw",
            y: "110vh"
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 20
          }}
          className="absolute w-[2px] h-[2px] bg-gold rounded-full blur-[0.5px]"
        />
      ))}

      {elements.map((el) => (
        <div
          key={el.id}
          className="rune absolute font-garamond select-none text-gold"
          style={{
            left: el.left,
            animation: `runeFloat ${el.duration} linear infinite`,
            animationDelay: el.delay,
            fontSize: el.fontSize,
            opacity: el.opacity
          }}
        >
          {el.char}
        </div>
      ))}
      <style>{`
        @keyframes runeFloat {
          0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
