import { motion } from "framer-motion";

export default function Cat() {
  return (
    <div className="absolute bottom-6 left-0 w-full h-[80px] pointer-events-none overflow-hidden">

      {/* Stars */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: window.innerWidth + 80,
            opacity: [0, 1, 0],
            y: [0, Math.random() * 40 + 40]
          }}
          transition={{
            duration: 6,
            delay: 2 + i * 0.15,
            ease: "linear"
          }}
          style={{
            width: "6px",
            height: "6px",
            background: "#c4b5fd",
            borderRadius: "50%",
            position: "absolute",
            filter: "blur(1px)"
          }}
        />
      ))}

      {/* Cat */}
      <motion.img
        src="/kitty.png"
        alt="cat"
        initial={{ x: -100 }}
        animate={{ x: window.innerWidth + 100, y: [0, -2, 0] }}
        transition={{
          x: { duration: 6, delay: 2, ease: "linear" },
          y: { repeat: Infinity, duration: 0.6 }
        }}
        style={{ width: "60px" }}
        className="absolute bottom-0 opacity-70 mix-blend-lighten"
      />
    </div>
  );
}