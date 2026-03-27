import { motion } from "framer-motion";
import MovingStrips from "./MovingStrips";

const stories = [
  {
    num: "I",
    tag: "★ Short Story · Crush · Dreams",
    title: "Bakery Man",
    desc: "It was a sunny day as far as I can remember. The scorching sun was hitting my black umbrella as I walked by the roadside. I just got back from the city, so I guess it was Saturday. I was enticed by the smell of bread from the local bakery."
  },
  {
    num: "II",
    tag: "★ Mental Health · Addiction Recovery",
    title: "Kumunoy: The Quicksand in my Mind",
    desc: "I have always thought that kumunoy is a scary type of landform. Once you step onto it, you will be sucked under the earth. The more you struggle, the more it will pull you beneath until you are buried under the ground"
  },
  {
    num: "III",
    tag: "★ Love · Unexpressed Emotions · Longing",
    title: "For Eyes to Speak",
    desc: "I had this thought that I have always believe.\nI think I speak with my eyes.\nI was never good at saying how I feel or what I think. Whenever exhaustion hits me, I shut down. I may move a little but my lips won't cooperate with me."
  }
];

export default function Fragments() {
  return (
    <section id="stories" className="py-24 px-8 max-w-[1300px] mx-auto relative overflow-hidden">
      <MovingStrips />
      <div className="section-header mb-16 text-center relative z-10">
        <span className="section-eyebrow">— woven in moonlight —</span>
        <h2 className="font-cinzel text-4xl text-parchment glow-gold">Tales from the Dark</h2>
        <div className="divider"><span className="divider-glyph">✦</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ y: -10, rotate: -0.5 }}
            className="story-card group relative bg-gradient-to-br from-[#1e1432]/80 to-[#0a0814]/90 border border-[#c9a84c]/15 p-10 rounded-sm cursor-pointer hover:border-[#c9a84c]/45"
            style={{ transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)" }}
          >
            {/* LARGE NUMBER BACKGROUND */}
            <span className="absolute top-4 right-6 font-cinzel text-6xl font-black text-[#c9a84c]/5 select-none transition-colors group-hover:text-[#c9a84c]/10">
              {story.num}
            </span>

            <span className="block font-garamond italic text-xs tracking-widest text-[#7b4fa6] uppercase mb-4">
              {story.tag}
            </span>
            
            <h3 className="font-fell text-2xl text-parchment mb-4 leading-tight group-hover:text-gold-bright transition-colors">
              {story.title}
            </h3>
            
            <p className="font-garamond text-parchment/60 leading-relaxed mb-6">
              {story.desc}
            </p>

            <span className="inline-flex items-center gap-2 font-garamond italic text-gold text-sm group-hover:gap-4 transition-all">
              Read the story <span className="text-lg">→</span>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}