import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteRitual, setShowDeleteRitual] = useState(false);
  const [applauses, setApplauses] = useState(0);
  const [whispers, setWhispers] = useState([]);
  const [newWhisper, setNewWhisper] = useState('');
  const [isApplauding, setIsApplauding] = useState(false);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let isMounted = true;
    
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (isMounted) setUser(authUser);
      await fetchPost();
    }

    load();
    window.scrollTo(0, 0);

    return () => { isMounted = false; };
  }, [slug]);

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error || !data) {
       navigate('/blog');
    } else {
       setPost(data);
       await fetchInteractions(data.id);
    }
    setLoading(false);
  }

  async function fetchInteractions(postId) {
     const { data: appData } = await supabase.from('applauses').select('count').eq('post_id', postId);
     setApplauses(appData?.length || 0);
     
     const { data: whispData } = await supabase.from('whispers').select('*').eq('post_id', postId).order('created_at', { ascending: false });
     setWhispers(whispData || []);
  }

  async function handleApplaud() {
    if (!user) return alert("You must join the coven to applaud!");
    setIsApplauding(true);
    const { error } = await supabase.from('applauses').insert([{ post_id: post.id, user_id: user.id, count: 1 }]);
    if (!error) setApplauses(prev => prev + 1);
    setTimeout(() => setIsApplauding(false), 500);
  }

  async function handleWhisper(e) {
    e.preventDefault();
    if (!user) return alert("You must join the coven to whisper!");
    if (!newWhisper.trim()) return;

    const { error } = await supabase.from('whispers').insert([{ 
      post_id: post.id, 
      user_id: user.id, 
      author_email: user.email, 
      content: newWhisper 
    }]);

    if (!error) {
       setNewWhisper('');
       fetchInteractions(post.id);
    }
  }

  async function togglePin() {
    const newStatus = !post.is_pinned;
    const { error } = await supabase
      .from('posts')
      .update({ is_pinned: newStatus })
      .eq('id', post.id);
    
    if (!error) {
      setPost({ ...post, is_pinned: newStatus });
      alert(newStatus ? "✦ Pinned to Chronicles!" : "✧ Removed from Chronicles");
    } else {
      alert("The pin ritual failed: " + error.message);
    }
  }

  async function handleDelete() {
    if (deleteConfirm === post.title) {
      const { error } = await supabase.from('posts').delete().eq('id', post.id);
      if (!error) {
        alert("The parchment has been reduced to ash.");
        navigate('/blog');
      } else {
        alert("The void rejected the burning: " + error.message);
      }
    } else {
      alert("The name does not match the ritual.");
    }
  }

  const isAuthor = user !== null;

  if (loading) return <div className="min-h-screen bg-void flex items-center justify-center font-fell text-gold animate-pulse text-2xl tracking-[0.4em]">CONSULTING THE ARCHIVES...</div>;
  if (!post) return null;

  return (
    <div className="min-h-screen bg-void pt-32 pb-48 px-6 md:px-12 relative overflow-x-hidden selection:bg-gold/30 selection:text-parchment">
      {/* SCROLL PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold z-[2000] origin-left" style={{ scaleX }} />

      <div className="max-w-[900px] mx-auto">
          <header className="mb-24 text-center">
            <Link to="/blog" className="font-fell text-gold/40 hover:text-gold text-[10px] uppercase tracking-[0.5em] mb-12 block transition-all">← Return to Grimoire</Link>
            <span className="text-xs font-fell text-gold/60 uppercase tracking-[0.6em] glow-gold block mb-6">{post.category}</span>
            <h1 className="font-cinzel text-6xl md:text-9xl text-parchment mb-12 leading-[0.85] tracking-tighter italic">{post.title}</h1>
            <div className="divider mx-auto mb-12"><span className="divider-glyph">✦</span></div>
          </header>

          {/* COVER IMAGE */}
          {post.cover_image && (
             <div className="mb-32">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="border border-gold/20 p-2 bg-void/50 shadow-2xl">
                   <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover rounded-sm" />
                </motion.div>
                {post.cover_caption && <p className="text-center font-garamond italic text-parchment/30 text-sm mt-6 mb-12 tracking-widest">— {post.cover_caption}</p>}
             </div>
          )}

          <article className="prose-immersion font-garamond text-2xl md:text-4xl text-parchment/90 leading-[1.6] mb-64 text-justify first-letter:text-7xl first-letter:font-cinzel first-letter:text-gold first-letter:mr-3 first-letter:float-left first-letter:leading-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* AUTHOR BIO (The Sealed Envelope) */}
          <section className="mb-64 border-t border-gold/10 pt-24 max-w-[600px] mx-auto text-center">
             <div className="font-fell border-2 border-gold/5 bg-gold/5 p-12 relative group pointer-events-none">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold text-void px-6 py-2 text-xs tracking-widest font-bold shadow-[0_0_20px_#c9a84c]">THE CHRONICLER</span>
                <p className="text-parchment/60 font-garamond italic text-xl mb-8 leading-relaxed italic animate-glow">
                  "I find beauty in the unexpressed words, weaving the starlight of emotions into ink-trails for the brave souls who dare to read."
                </p>
                <div className="font-fell text-gold text-sm tracking-widest">— The Witch of Echoes</div>
             </div>
          </section>

          {/* INTERACTION ZONE */}
          <section className="interaction-ritual mb-32 border-t border-gold/10 pt-24">
             <div className="flex flex-col items-center gap-12 mb-24">
                <motion.button 
                  whileTap={{ scale: 1.2, rotate: 10 }}
                  animate={isApplauding ? { y: [0, -20, 0] } : {}}
                  onClick={handleApplaud}
                  className="group relative flex flex-col items-center gap-4"
                >
                  <div className="w-24 h-24 rounded-full border-2 border-gold/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                     <span className="text-4xl grayscale group-hover:grayscale-0 transition-transform duration-700 transform group-hover:rotate-12">👏</span>
                  </div>
                  <span className="font-cinzel text-gold text-xl tracking-[0.2em]">{applauses} Applauses</span>
                </motion.button>
             </div>

             <div className="max-w-[700px] mx-auto border border-gold/10 p-12 bg-void/30">
                <h3 className="font-cinzel text-gold text-xl mb-12 uppercase tracking-[0.4em] text-center border-b border-gold/10 pb-4">Whispers to the Void</h3>
                
                {user ? (
                   <form onSubmit={handleWhisper} className="mb-24">
                      <textarea 
                        placeholder="Leave your whisper..."
                        className="w-full bg-[#fdfaf3] border-none p-8 font-garamond text-black placeholder:text-black/30 focus:ring-2 focus:ring-gold/30 transition-all outline-none resize-none h-[200px] mb-6 shadow-inner text-2xl"
                        value={newWhisper}
                        onChange={(e) => setNewWhisper(e.target.value)}
                      />
                      <div className="flex justify-center">
                         <button type="submit" className="px-16 py-4 bg-gold text-void font-fell uppercase tracking-widest hover:bg-gold-bright transition-all text-sm font-bold shadow-xl">Cast Whisper</button>
                      </div>
                   </form>
                ) : (
                   <div className="text-center p-16 border border-gold/5 mb-16 bg-gold/5 italic">
                      <p className="font-fell text-gold/40 uppercase tracking-[0.3em] text-xs mb-6">Join the coven to speak</p>
                      <button onClick={() => navigate('/blog')} className="text-gold font-fell uppercase tracking-[0.3em] hover:text-gold-bright underline underline-offset-8">Consult at entrance</button>
                   </div>
                )}

                <div className="space-y-16">
                   {whispers.map((whisp) => (
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={whisp.id} className="border-l-2 border-gold/10 pl-12 py-4">
                         <div className="flex justify-between items-center mb-6">
                            <span className="font-fell text-xs text-gold/50 uppercase tracking-[0.4em]">{whisp.author_email.split('@')[0]}</span>
                            <span className="font-fell text-[10px] text-gold/20 uppercase tracking-[0.4em]">{new Date(whisp.created_at).toLocaleDateString()}</span>
                         </div>
                         <p className="font-garamond text-parchment/80 text-2xl leading-relaxed italic">"{whisp.content}"</p>
                      </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* ADMIN TOOLS */}
          {isAuthor && (
            <div className="mb-24 p-8 md:p-16 border-4 border-gold/10 bg-void flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
               <div className="flex flex-col gap-4">
                  <span className="font-fell text-xs text-gold/40 uppercase tracking-[0.5em] font-bold">WITCH'S SANCTUM RITUALS</span>
                  <p className="font-garamond text-parchment/20 text-xs italic tracking-widest leading-loose">Master of the Chronicles</p>
               </div>
               <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-10 w-full md:w-auto">
                  <button onClick={togglePin} className={`w-full sm:w-auto px-8 py-4 font-fell text-[10px] md:text-[11px] uppercase tracking-[0.5em] border-2 transition-all shadow-2xl ${post.is_pinned ? 'bg-gold text-void border-gold' : 'text-gold border-gold/20 hover:border-gold'}`}>
                     {post.is_pinned ? '✦ Unpin Chronicle' : '✧ Pin to Fragments'}
                  </button>
                  <button onClick={() => setShowDeleteRitual(!showDeleteRitual)} className="font-fell text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-red-700/60 hover:text-red-600 transition-all font-bold py-4">
                     — The Eternal Burning
                  </button>
               </div>
            </div>
          )}

          {showDeleteRitual && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-[3000] flex items-center justify-center bg-void/95 backdrop-blur-xl p-6">
              <div className="max-w-[500px] w-full p-12 border-2 border-red-900/40 bg-red-950/20 text-center shadow-[0_0_100px_rgba(153,27,27,0.4)]">
                 <h3 className="font-cinzel text-red-500 text-3xl mb-8 tracking-[0.3em]">EXCOMMUNICATE?</h3>
                 <p className="font-garamond text-parchment/40 italic mb-12">The starlight will fade. The ink will bleed to nothingness.</p>
                 <input 
                   type="text" 
                   placeholder="Type the title to confirm"
                   className="w-full bg-[#fdfaf3] border-none p-6 font-garamond text-black mb-12 text-center text-2xl focus:ring-4 focus:ring-red-900/30 shadow-inner"
                   value={deleteConfirm}
                   onChange={(e) => setDeleteConfirm(e.target.value)}
                 />
                 <div className="flex gap-12 justify-center">
                    <button onClick={() => setShowDeleteRitual(false)} className="text-parchment/40 font-fell text-xs uppercase tracking-[0.4em] hover:text-parchment">Abandon</button>
                    <button onClick={handleDelete} className="px-12 py-4 bg-red-900 text-white font-fell text-xs uppercase tracking-[0.5em] hover:bg-red-800 transition-all shadow-2xl">Burn</button>
                 </div>
              </div>
            </motion.div>
          )}
      </div>

      <style>{`
        .prose-immersion blockquote {
          border-left: 4px solid #c9a84c;
          padding-left: 2rem;
          margin: 4rem 0;
          font-style: italic;
          color: #f0c96b;
          font-size: 1.1em;
          background: rgba(201, 168, 76, 0.05);
          padding: 2rem 3rem;
        }
        .prose-immersion h2, .prose-immersion h3 {
          font-family: 'Cinzel', serif;
          color: #c9a84c;
          margin: 6rem 0 3rem;
          text-align: center;
          letter-spacing: 0.2em;
        }
        .prose-immersion img {
          border-radius: 4px;
          margin: 5rem auto;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
