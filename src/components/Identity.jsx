import { motion } from "framer-motion";

export default function Identity() {
  const lines = [
    "She writes what lingers.",
    "She heals what is unseen.",
    "She walks paths most forget.",
    "She gathers fragments of quiet worlds.",
  ];

  return (
    <section id="about" className="min-h-screen py-24 px-8 max-w-[1100px] mx-auto grid md:grid-cols-2 gap-24 items-center overflow-hidden">
      
      {/* LEFT PORTRAIT AREA */}
      <div className="relative flex justify-center items-center">
        {/* GENIUS CAT CARD (Behind, half shown) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2 }}
          className="absolute top-10 left-0 w-[300px] h-[380px] z-0 pointer-events-none drop-shadow-[0_0_30px_rgba(201,168,76,0.3)]"
        >
          <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="portraitBgFix" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#3a1f6a" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#0d0b12" stopOpacity="0.2"/>
              </radialGradient>
              <filter id="catCardGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect width="300" height="380" fill="url(#portraitBgFix)" rx="4"/>
            <rect x="5" y="5" width="290" height="370" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4" rx="4"/>
            
            <g filter="url(#catCardGlow)">
              <rect x="20" y="260" width="260" height="18" rx="3" fill="#1a0d2e" stroke="#c9a84c" strokeWidth="1"/>
              <rect x="30" y="220" width="20" height="42" rx="1" fill="#4a1f6b" stroke="#c9a84c" strokeWidth="0.8"/>
              <rect x="52" y="230" width="16" height="32" rx="1" fill="#2e5b4a" stroke="#c9a84c" strokeWidth="0.8"/>
              <rect x="70" y="225" width="22" height="37" rx="1" fill="#6b2020" stroke="#c9a84c" strokeWidth="0.8"/>
              <rect x="230" y="245" width="10" height="20" rx="1" fill="#e8d8b8" opacity="1"/>
              <ellipse cx="235" cy="244" rx="6" ry="4" fill="#f0c96b" opacity="0.8"/>
              
              <ellipse cx="160" cy="220" rx="55" ry="50" fill="#1a0f2e" stroke="#c9a84c" strokeWidth="0.5"/>
              <circle cx="160" cy="160" r="45" fill="#1a0f2e" stroke="#c9a84c" strokeWidth="0.5"/>
              <polygon points="128,128 118,102 145,120" fill="#1a0f2e" stroke="#c9a84c" strokeWidth="0.8"/>
              <polygon points="192,128 202,102 175,120" fill="#1a0f2e" stroke="#c9a84c" strokeWidth="0.8"/>
              
              <path d="M142,160 Q150,170 158,160" fill="none" stroke="#f0c96b" strokeWidth="2"/>
              <path d="M162,160 Q170,170 178,160" fill="none" stroke="#f0c96b" strokeWidth="2"/>
              
              <path d="M100,258 Q160,248 220,258 L218,275 Q160,265 102,275 Z" fill="#0d0b12" stroke="#c9a84c" strokeWidth="1"/>
            </g>
            
            <circle cx="147" cy="162" r="13" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.9"/>
            <circle cx="173" cy="162" r="13" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.9"/>
            <text x="40" y="80" fill="#c9a84c" fontSize="16" opacity="0.8" style={{fontFamily: "serif"}}>✦</text>
            <text x="250" y="70" fill="#c9a84c" fontSize="12" opacity="0.7" style={{fontFamily: "serif"}}>✧</text>
          </svg>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-[3/4] w-full relative overflow-hidden group z-10"
        >
          {/* VIOLET BACKDROP */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a1f6b] to-[#0d0b12]" />
          
          <img
            src="/ugc_sunflower.jpg"
            alt="The Witch"
            className="w-full h-full object-cover relative z-10 brightness-75 contrast-125 saturate-50 group-hover:brightness-90 transition-all duration-700"
          />

          {/* OUTER GOLD FRAME */}
          <div className="absolute top-[15px] left-[15px] right-[-15px] bottom-[-15px] border border-[#c9a84c]/30 -z-10" />
        </motion.div>
      </div>

      {/* RIGHT TEXT CONTENT */}
      <div className="about-text space-y-6">
        <div className="section-header !text-left !mb-8">
          <span className="section-eyebrow">— the inkbound soul —</span>
          <h2 className="font-cinzel text-4xl md:text-5xl text-parchment leading-tight">
            Of Starlight & <em>Shadow</em>
          </h2>
          <div className="divider !mx-0 !w-[200px]"><span className="divider-glyph">✦</span></div>
        </div>

        <div className="space-y-4 font-garamond text-xl text-parchment/80 leading-relaxed">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="flex gap-8 pt-8">
          <div className="stat">
            <span className="stat-number font-cinzel text-3xl text-gold-bright glow-gold">10</span>
            <span className="stat-label block text-xs italic tracking-widest text-parchment-dim mt-1">TOMES</span>
          </div>
          <div className="stat">
            <span className="stat-number font-cinzel text-3xl text-gold-bright glow-gold">29</span>
            <span className="stat-label block text-xs italic tracking-widest text-parchment-dim mt-1">CRAFTS</span>
          </div>
          <div className="stat">
            <span className="stat-number font-cinzel text-3xl text-gold-bright glow-gold">78</span>
            <span className="stat-label block text-xs italic tracking-widest text-parchment-dim mt-1">CHRONICLES</span>
          </div>
          <div className="stat">
            <span className="stat-number font-cinzel text-3xl text-gold-bright glow-gold">∞</span>
            <span className="stat-label block text-xs italic tracking-widest text-parchment-dim mt-1">ECHOES</span>
          </div>
        </div>
      </div>

    </section>
  );
}
