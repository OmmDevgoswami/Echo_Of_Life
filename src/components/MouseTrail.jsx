import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MouseTrail() {
  const [points, setPoints] = useState([]);
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Math.random(),
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.8 ? "#f0c96b" : "#c9a84c"
      };
      setPoints((prev) => [...prev.slice(-10), newPoint]);
    };

    const handleClick = (e) => {
      const newSparks = Array.from({ length: 10 }).map((_, i) => ({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        dx: (Math.random() - 0.5) * 150,
        dy: (Math.random() - 0.5) * 150,
        color: Math.random() > 0.5 ? '#c9a84c' : '#7b4fa6'
      }));
      setSparks(newSparks);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {points.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full"
            style={{
              top: p.y,
              left: p.x,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, x: s.x, y: s.y }}
            animate={{ opacity: 0, x: s.x + s.dx, y: s.y + s.dy }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: s.color,
              boxShadow: `0 0 15px ${s.color}`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}