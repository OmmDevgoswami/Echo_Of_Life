import { motion } from "framer-motion";
import MovingStrips from "./MovingStrips";

const data = [
  "I write what silence cannot hold.",
  "There are nights that never leave.",
  "Some wounds glow in the dark.",
];

export default function Fragments() {
  return (
    <section className="flex flex-wrap justify-center items-center gap-16 p-10">

      <MovingStrips />

      {data.map((text, i) => (
        <motion.div
          key={i}

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          animate={{
            y: [0, -10, 0],
            rotate: [0, i % 2 === 0 ? 2 : -2, 0],
          }}

          style={{
            position: "absolute",
            top: `${30 + i * 15}%`,
            left: `${20 + i * 20}%`
          }}

          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          whileHover={{
            scale: 1.08,
            rotate: 0,
          }}

          className="p-6 bg-white/5 backdrop-blur-md rounded-xl max-w-xs 
          cursor-pointer hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] "
        >
          {text}
        </motion.div>
      ))}

    </section>
  );
}