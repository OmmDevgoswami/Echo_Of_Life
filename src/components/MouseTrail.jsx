import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseTrail() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const move = (e) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setPoints((prev) => [...prev.slice(-15), newPoint]);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">

      {points.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            top: p.y,
            left: p.x,
            width: "6px",
            height: "6px",
            background: "#c4b5fd",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(1px)",
          }}
        />
      ))}

    </div>
  );
}