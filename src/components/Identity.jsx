import { motion } from "framer-motion";

export default function Identity() {
  const lines = [
    "She writes what lingers.",
    "She heals what is unseen.",
    "She walks paths most forget.",
    "She gathers fragments of quiet worlds.",
  ];

  return (
    <section className="min-h-screen px-6 md:px-16 lg:px-24 pt-24 md:pt-32 lg:pt-40 relative">

      <div className="grid md:grid-cols-2 items-center w-full md:gap-x-40 lg:gap-x-60">

        {/* LEFT TEXT */}
        <div className="space-y-6 text-left max-w-md md:ml-10 lg:ml-20">

          <h1 className="text-4xl md:text-6xl hero-font">
            Her Name
          </h1>

          <p className="text-white/50 tracking-widest text-sm">
            — A LIVING PRESENCE —
          </p>

          {/* ✨ STAGGERED TEXT */}
          <div className="space-y-3 text-lg text-white/80">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.3,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-end md:mr-10 lg:mr-20">

          <motion.div
            initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            animate={{ y: [2, -6, 2] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >

            {/* ✨ GLOW BACKDROP */}
            <div className="absolute inset-0 bg-purple-500 opacity-20 blur-[80px] -z-10" />

            {/* ZINE STYLE FRAME */}
            <div className="relative p-2 bg-white/5 backdrop-blur-md 
              rotate-[-3deg] shadow-[0_0_40px_rgba(124,58,237,0.3)]">

              <img
                src="/ugc_sunflower.jpg"
                alt="her"
                className="w-[280px] md:w-[360px] lg:w-[420px] object-cover 
                brightness-105 contrast-110 saturate-110"
              />

            </div>

            {/* OVERLAY SCRATCH / GRAIN */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          </motion.div>

        </div>

      </div>

    </section>
  );
}