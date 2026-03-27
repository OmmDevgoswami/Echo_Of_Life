import { motion } from "framer-motion";

export default function RevealSection({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100, scale: 0.96, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      className="min-h-screen flex items-center justify-center"
    >
      {children}
    </motion.section>
  );
}