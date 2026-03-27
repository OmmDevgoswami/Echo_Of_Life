import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      // LERP (smooth follow)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate(${pos.current.x}px, ${pos.current.y}px)
          translate(-50%, -50%)
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
    ref={cursorRef}
    className="fixed top-0 left-0 pointer-events-none z-[9999]"
    style={{
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: "radial-gradient(circle, #c4b5fd, transparent 70%)",
      filter: "blur(2px)",
      onMouseEnter : "scale: 1.8", 
      onMouseLeave : "scale: 1"
    }}
  />
  );
}