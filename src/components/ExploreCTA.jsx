import { motion } from "framer-motion";

export default function ExploreCTA() {
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      
      <p className="mb-6 text-lg opacity-70">
        Not all stories stay on pages…
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-6 px-8 py-3 rounded-full border border-purple-500 
        text-white bg-white/5 backdrop-blur-md
        hover:bg-purple-600/20 hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]
        transition-all duration-300"
        >
        Explore Her Universe
        </motion.button>
    </section>
  );
}