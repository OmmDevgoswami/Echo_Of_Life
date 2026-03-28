import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import BlogHome from "./pages/BlogHome";
import BlogEditor from "./pages/BlogEditor";
import BlogPost from "./pages/BlogPost";
import CustomCursor from "./components/CustomCursor";
import MouseTrail from "./components/MouseTrail";
import MagicBackground from "./components/MagicBackground";
import DotNav from "./components/DotNav";

export default function App() {
  return (
    <Router>
      <div className="app-container relative">
        <CustomCursor />
        <MouseTrail />
        <MagicBackground />
        <DotNav />

        {/* PERMANENT LOGO & NAV */}
        <nav className="fixed top-0 left-0 right-0 p-8 z-[100] flex justify-between items-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-cinzel text-gold text-lg md:text-xl tracking-[0.2em] pointer-events-auto cursor-pointer"
          >
            <Link to="/">✦ THE INKBOUND WITCH</Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-8 items-center pointer-events-auto"
          >
            <Link to="/blog" className="font-fell text-gold/60 hover:text-gold uppercase tracking-[0.2em] text-sm transition-all duration-300">
              The Grimoire
            </Link>
          </motion.div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/new" element={<BlogEditor />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/edit/:slug" element={<BlogEditor />} />
        </Routes>
      </div>
    </Router>
  );
}