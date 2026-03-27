import { motion } from "framer-motion";

const strips = [
  "memory • silence • echo • fragments • night • ink • soul • ",
  "unseen • whispers • healing • shadows • stories • breath • ",
  "dream • stillness • feeling • poetry • darkness • light • ",
  "echoes • time • longing • quiet • presence • void • ",
];

const rotations = [-5, 20, -9, 14];

export default function MovingStrips() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

      {strips.map((text, i) => (
        <div
          key={i}
          className="absolute w-full overflow-hidden"
          style={{
            top: `${20 + i * 18}%`,
            transform: `rotate(${rotations[i]}deg)`,
          }}
        >

          {/* 🔥 ONLY THIS MOVES */}
          <motion.div
            className="whitespace-nowrap text-white/10 text-2xl md:text-3xl font-serif"
            animate={{
              x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {text.repeat(20)}
          </motion.div>

        </div>
      ))}

    </div>
  );
}