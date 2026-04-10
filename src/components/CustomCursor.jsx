import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const posOuter = useRef({ x: 0, y: 0 });
  const posInner = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const handleHover = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%, -50%) scale(2.5)";
    };
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const links = document.querySelectorAll('a, button, .story-card, .book-spine');
    links.forEach(l => {
      l.addEventListener('mouseenter', handleHover);
      l.addEventListener('mouseleave', handleLeave);
    });

    const animate = () => {
      // Smooth travel for outer circle
      posOuter.current.x += (mouse.current.x - posOuter.current.x) * 0.15;
      posOuter.current.y += (mouse.current.y - posOuter.current.y) * 0.15;

      // Inner dot is faster
      posInner.current.x = mouse.current.x;
      posInner.current.y = mouse.current.y;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${posOuter.current.x}px`;
        cursorRef.current.style.top = `${posOuter.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${posInner.current.x}px`;
        dotRef.current.style.top = `${posInner.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    const animateId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animateId);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} className="hidden md:block" />
      <div id="cursor-dot" ref={dotRef} className="hidden md:block" />
    </>
  );
}