import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ✦✧★⊕⊗∞◈';

export default function MagicBackground() {
  const [runeElements, setRuneElements] = useState([]);

  useEffect(() => {
    const newRunes = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      char: runes[Math.floor(Math.random() * runes.length)],
      left: Math.random() * 100 + "vw",
      duration: 20 + Math.random() * 30 + "s",
      delay: Math.random() * 20 + "s",
      fontSize: 1.5 + Math.random() * 2 + "rem"
    }));
    setRuneElements(newRunes);
  }, []);

  return (
    <div className="rune-field fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {/* SHINY DUST */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          initial={{ 
            opacity: Math.random() * 0.3,
            x: Math.random() * 100 + "vw",
            y: "110vh"
          }}
          animate={{
            y: "-10vh",
            x: `${(Math.random() * 100) + (Math.random() * 10 - 5)}vw`,
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
          className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
        />
      ))}

      {runeElements.map((rune) => (
        <div
          key={rune.id}
          className="rune absolute font-garamond text-[#c9a84c]/5 select-none"
          style={{
            left: rune.left,
            animation: `runeFloat ${rune.duration} linear infinite`,
            animationDelay: rune.delay,
            fontSize: rune.fontSize
          }}
        >
          {rune.char}
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
