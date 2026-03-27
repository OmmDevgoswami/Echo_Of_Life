import { motion, useTransform, useSpring } from "framer-motion";

export default function ParallaxBlock({ children, scrollYProgress, speed = 0.2 }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  return <motion.div style={{ y: smoothY }}>{children}</motion.div>;
}