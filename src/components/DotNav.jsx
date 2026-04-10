import { useState, useEffect } from "react";

const sections = ["hero", "identity", "fragments", "deep", "cta"];

export default function DotNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      const index = Math.round(scrollY / height);
      setActive(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">

      {sections.map((_, i) => (
        <div
          key={i}
          onClick={() =>
            window.scrollTo({
              top: i * window.innerHeight,
              behavior: "smooth"
            })
          }
          className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
            active === i
              ? "bg-purple-400 scale-150 shadow-[0_0_12px_rgba(124,58,237,0.9)]"
              : "bg-white/30 hover:bg-white/60"
          }`}
        />
      ))}

    </div>
  );
}