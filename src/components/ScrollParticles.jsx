import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollParticles() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">

      {[...Array(30)].map((_, i) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, i % 2 === 0 ? -100 : 100]
        );

        return (
          <motion.div
            key={i}
            style={{
              y,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            className="absolute w-[2px] h-[2px] bg-purple-300 rounded-full opacity-30"
          />
        );
      })}

    </div>
  );
}