import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import MovingStrips from "./MovingStrips";

export default function Fragments() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchTopStories() {
      // Get posts, prioritizing pinned ones
      let { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('is_pinned', { ascending: false }) // Pinned first
        .order('created_at', { ascending: false }) // Then latest
        .limit(3);
      
      const romanMap = ["I", "II", "III"];
      
      if (!error && data?.length > 0) {
        setStories(data.slice(0, 3).map((post, index) => ({
          num: romanMap[index],
          id: post.id,
          tag: `★ ${post.category || 'Tale'}`,
          title: post.title,
          desc: post.excerpt,
          slug: post.slug
        })));
      } else {
        // Fallback to static if empty
        setStories([
          {
            num: "I",
            tag: "★ Short Story · Bakery",
            title: "Bakery Man",
            desc: "It was a sunny day as far as I can remember... I was enticed by the smell of bread."
          },
          {
            num: "II",
            tag: "★ Mental Health",
            title: "Kumunoy",
            desc: "I have always thought that kumunoy is a scary type of landform..."
          },
          {
            num: "III",
            tag: "★ Love",
            title: "For Eyes to Speak",
            desc: "I think I speak with my eyes. I was never good at saying how I feel..."
          }
        ]);
      }
    }
    fetchTopStories();
  }, []);

  return (
    <section id="stories" className="py-24 px-8 max-w-[1300px] mx-auto relative overflow-hidden">
      <MovingStrips />
      <div className="section-header mb-16 text-center relative z-10">
        <span className="section-eyebrow">— Bleed into the moon —</span>
        <h2 className="font-cinzel text-4xl text-parchment glow-gold">Buried behind the wings</h2>
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
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold/60 font-medium block">
                  {story.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-cinzel text-parchment leading-tight group-hover:text-gold transition-colors duration-500">
                  {story.title}
                </h3>
                <p className="text-parchment/40 font-garamond text-lg leading-relaxed line-clamp-3 italic">
                  {story.desc}
                </p>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gold/5 flex justify-between items-center group/btn">
                <Link 
                  to={`/blog/${story.slug}`}
                  className="text-[10px] uppercase tracking-[0.4em] text-gold/40 group-hover/btn:text-gold transition-all duration-500 flex items-center gap-4"
                >
                  <span>Read the Story</span>
                  <span className="w-8 h-[1px] bg-gold/20 group-hover/btn:w-16 group-hover/btn:bg-gold transition-all duration-700"></span>
                </Link>
                <span className="text-parchment/5 font-cinzel text-4xl group-hover:text-gold/10 transition-colors duration-700">
                  ✧
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}