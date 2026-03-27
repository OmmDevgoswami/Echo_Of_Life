import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function SplitTextReveal({ text, className = "" }) {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
        filter: "blur(8px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.035,
        duration: 1.2,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <div ref={elRef} className={className}>
      {text.split("").map((c, i) => (
        <span key={i} className="char inline-block transition-transform duration-200 opacity-0">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </div>
  );
}
