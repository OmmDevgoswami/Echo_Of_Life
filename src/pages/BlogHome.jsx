import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) setUser(session?.user ?? null);
      await fetchPosts();
    }

    init();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
        fetchPosts();
      }
    });

    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    }
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) setPosts(data);
      // Optionally, you could still log errors if needed:
      // if (error) console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b12] pt-32 pb-12 px-4 md:px-6">
      <div className="max-w-[900px] mx-auto">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="font-cinzel text-4xl md:text-5xl text-parchment glow-gold mb-4">The Grimoire</h1>
          <p className="font-garamond italic text-lg md:text-xl text-parchment-dim">A collection of starlight & shadows</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            {user ? (
              <>
                <Link to="/blog/new" className="w-full sm:w-auto px-6 py-3 border border-gold text-gold font-fell uppercase tracking-widest hover:bg-gold hover:text-void transition-all text-xs">
                  Compose New Verse
                </Link>
                <button onClick={() => supabase.auth.signOut()} className="font-fell text-gold/40 hover:text-gold uppercase tracking-widest text-[10px]">
                  — Logout Ritual
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowAuth(true)}
                className="w-full sm:w-auto px-8 py-3 bg-gold text-void font-fell uppercase tracking-widest hover:bg-gold-bright transition-all text-xs"
              >
                Enter the Coven to Speak
              </button>
            )}
          </div>
        </header>

        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

        {loading ? (
          <div className="text-center font-fell text-gold animate-pulse mt-20">Consulting the oracles...</div>
        ) : (
          <div className="grid gap-12">
            {posts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group border-b border-gold/10 pb-12"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {post.cover_image && (
                    <div className="w-full md:w-1/3 aspect-video overflow-hidden border border-gold/20">
                      <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="text-[10px] md:text-xs font-fell text-gold uppercase tracking-widest">{post.category || 'Chronicle'}</span>
                    <h2 className="font-cinzel text-xl md:text-2xl text-parchment hover:text-gold transition-colors mt-2 leading-tight">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="font-garamond text-base md:text-lg text-parchment/70 mt-4 line-clamp-3 italic">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 md:mt-4 text-[10px] font-fell text-parchment/40 uppercase tracking-widest md:tracking-tighter">
                      {new Date(post.created_at).toLocaleDateString()} — {Math.ceil(post.content?.length / 500) || 1} min read
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
