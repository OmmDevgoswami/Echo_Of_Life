import { motion } from "framer-motion";

export default function Stars() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden">

      {[...Array(40)].map((_, i) => {
        const size = Math.random() * 2 + 1;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              width: size,
              height: size,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              position: "absolute",
              background: "#c9a84c",
              borderRadius: "50%",
              filter: "blur(1px)"
            }}
          />
        );
      })}

    </div>
  );
}