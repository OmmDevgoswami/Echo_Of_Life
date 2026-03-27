import { motion } from "framer-motion";

export default function ExploreCTA() {
  return (
    <section id="contact" className="min-h-screen py-24 px-8 flex flex-col items-center justify-center text-center">
      
      <div className="section-header mb-12">
        <span className="section-eyebrow">— whisper to me —</span>
        <h2 className="font-cinzel text-4xl text-parchment glow-gold">Seek the Unseen</h2>
        <div className="divider"><span className="divider-glyph">✦</span></div>
      </div>

      <p className="font-garamond italic text-xl text-parchment/60 max-w-lg mb-12">
        "Some doors are only visible to those who know where the silence ends."
      </p>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="btn-send px-12 py-4"
        style={{
          background: "linear-gradient(135deg, var(--violet-deep), var(--violet))",
          border: "1px solid rgba(201,168,76,0.3)",
          color: "var(--gold-bright)",
          fontFamily: "'Cinzel Decorative', serif",
          letterSpacing: "0.15em",
          borderRadius: "2px",
          boxShadow: "var(--glow-violet)"
        }}
      >
        OPEN THE PORTAL
      </motion.button>

      <footer className="mt-32 w-full pt-8 border-top border-white/5 opacity-30 font-garamond italic text-sm tracking-widest">
        &copy; 1923 — THE INKBOUND WITCH — ALL RIGHTS RESERVED
      </footer>
    </section>
  );
}