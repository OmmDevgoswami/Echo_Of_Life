import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const bookData = [
  { title: 'The Moonlit Bestiary', color: '#2a1845', text: '#c9a84c' },
  { title: 'Hexes for the Heartbroken', color: '#1a2e1a', text: '#6bbd8c' },
  { title: 'A Grammar of Storms', color: '#2e1a1a', text: '#c26b6b' },
  { title: 'The Familiar\'s Compendium', color: '#1a1a2e', text: '#6b8cc2' },
  { title: 'Ink & Hemlock', color: '#2e2a1a', text: '#c9a84c' },
  { title: 'Songs for the Unwanted Moon', color: '#1a2830', text: '#6bc9c9' },
  { title: 'Thirty-Three Lies About Wolves', color: '#2e1a28', text: '#c96bbd' },
  { title: 'The Witch\'s Concordance', color: '#281a1a', text: '#c98c6b' },
  { title: 'Cartography of Lost Spells', color: '#1a2820', text: '#84c96b' },
  { title: 'The Night Taxonomy', color: '#1f1a2e', text: '#a88bc9' },
];

export default function ShelfOfShadows() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: { duration: 30, repeat: Infinity, ease: "linear" }
    });
  }, [controls]);

  return (
    <section id="collection" className="py-28 overflow-hidden bg-transparent">
      <div className="section-header mb-16 px-8 text-center">
        <span className="section-eyebrow">— lingering light from the scepter —</span>
        <h2 className="font-cinzel text-4xl text-parchment glow-gold">torn paper, vials and spells</h2>
        <div className="divider"><span className="divider-glyph">★</span></div>
      </div>

      <div className="relative overflow-hidden py-4 group cursor-pointer">
        <motion.div 
          className="flex gap-8 w-max"
          animate={controls}
          onHoverStart={() => controls.stop()}
          onHoverEnd={() => controls.start({
            x: ["0%", "-50%"],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          })}
        >
          {[...bookData, ...bookData].map((book, i) => (
            <div
              key={i}
              className="book-spine w-[90px] h-[280px] flex items-center justify-center p-4 rounded-sm relative border border-white/10"
              style={{
                backgroundColor: book.color,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transition: 'transform 0.3s'
              }}
            >
              <span className="font-fell italic text-sm tracking-widest" style={{ color: book.text }}>
                {book.title}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>

      <p className="text-center mt-8 font-garamond italic text-xs tracking-[0.2em] text-parchment/35">
        hover to pause the procession
      </p>

      <style>{`
        .book-spine:hover {
          transform: translateY(-15px) scaleX(1.1);
          z-index: 20;
        }
      `}</style>
    </section>
  );
}

