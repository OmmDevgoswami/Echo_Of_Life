import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    let isMounted = true;
    
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (isMounted) setUser(user);
      await fetchPost();
      await fetchInteractions();
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
    }
    setLoading(false);
  }

  async function fetchInteractions() {
     if (!post?.id) return;
     // Fetch counts and comments ONLY FOR THIS POST
     const { data: appData } = await supabase.from('applauses').select('count').eq('post_id', post.id);
     setApplauses(appData?.length || 0);
     
     const { data: whispData } = await supabase.from('whispers').select('*').eq('post_id', post.id).order('created_at', { ascending: false });
     setWhispers(whispData || []);
  }

  // Trigger interaction fetch when post is loaded
  useEffect(() => {
    if (post?.id) {
      fetchInteractions();
    }
  }, [post?.id]);

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
      fetchInteractions();
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

  const isAuthor = user !== null; // TEMPORARY FOR TESTING: Any logged-in user is the 'Witch'

  if (loading) return <div className="min-h-screen bg-void flex items-center justify-center font-fell text-gold animate-pulse text-2xl tracking-[0.4em]">CONSULTING THE ARCHIVES...</div>;
  if (!post) return null;

  return (
    <div className="min-h-screen bg-void pt-32 pb-48 px-6 md:px-12 relative overflow-x-hidden">
      <div className="max-w-[850px] mx-auto">
          <header className="mb-24 text-center">
            <Link to="/blog" className="font-fell text-gold/40 hover:text-gold text-[10px] uppercase tracking-[0.4em] mb-12 block transition-colors">← Return to Grimoire</Link>
            <span className="text-xs font-fell text-gold/60 uppercase tracking-[0.4em] glow-gold block mb-4">{post.category}</span>
            <h1 className="font-cinzel text-5xl md:text-8xl text-parchment mb-8 leading-tight tracking-tighter">{post.title}</h1>
            <div className="divider mx-auto mb-8"><span className="divider-glyph">✦</span></div>
          </header>

          <article className="prose-magical font-garamond text-xl md:text-3xl text-parchment/80 leading-relaxed mb-48 text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* INTERACTION ZONE (Applauses & Whispers) */}
          <section className="mb-32 border-t border-gold/10 pt-24">
             <div className="flex flex-col items-center gap-12 mb-24">
                <motion.button 
                  whileTap={{ scale: 1.2, rotate: 10 }}
                  animate={isApplauding ? { y: [0, -20, 0] } : {}}
                  onClick={handleApplaud}
                  className="group relative flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-gold/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500 shadow-2xl">
                     <span className="text-3xl grayscale group-hover:grayscale-0 transition-transform duration-500 transform group-hover:rotate-12">👏</span>
                  </div>
                  <span className="font-cinzel text-gold text-lg glow-gold">{applauses} Applauses</span>
                  {isApplauding && <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -100 }} className="absolute -top-12 text-gold font-fell font-bold tracking-widest">+1 Magic</motion.div>}
                </motion.button>
             </div>

             <div className="max-w-[600px] mx-auto">
                <h3 className="font-cinzel text-gold text-xl mb-12 uppercase tracking-widest text-center">Spectral Whispers</h3>
                
                {user ? (
                   <form onSubmit={handleWhisper} className="mb-16">
                      <textarea 
                        placeholder="Whisper your thoughts to the void..."
                        className="w-full bg-parchment border-2 border-gold/10 p-6 font-garamond text-black placeholder:text-black/30 focus:border-gold/30 focus:ring-0 transition-all outline-none resize-none h-[150px] mb-4 shadow-inner"
                        value={newWhisper}
                        onChange={(e) => setNewWhisper(e.target.value)}
                      />
                      <div className="flex justify-end">
                         <button type="submit" className="px-12 py-3 bg-gold text-void font-fell uppercase tracking-widest hover:bg-gold-bright transition-all text-xs font-bold">Whisper</button>
                      </div>
                   </form>
                ) : (
                   <div className="text-center p-12 border border-gold/10 mb-16 bg-gold/5">
                      <p className="font-fell text-gold/40 uppercase tracking-widest text-xs mb-4">You must join the coven to leave a whisper</p>
                      <button onClick={() => navigate('/blog')} className="text-gold font-fell uppercase tracking-[0.2em] hover:text-gold-bright transition-colors text-[10px] underline decoration-gold/30 underline-offset-8">Consult the Oracle at the Entrance</button>
                   </div>
                )}

                <div className="space-y-12">
                   {whispers.map((whisp) => (
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={whisp.id} className="border-l border-gold/20 pl-8 py-2">
                         <div className="flex justify-between items-center mb-4">
                            <span className="font-fell text-[10px] text-gold/60 uppercase tracking-widest">{whisp.author_email.split('@')[0]}</span>
                            <span className="font-fell text-[8px] text-gold/20 uppercase tracking-tighter">{new Date(whisp.created_at).toLocaleDateString()}</span>
                         </div>
                         <p className="font-garamond text-parchment/70 text-lg leading-relaxed italic">"{whisp.content}"</p>
                      </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* ADMIN TOOLS */}
          {isAuthor && (
            <div className="mb-24 p-12 border-2 border-gold/10 bg-void flex flex-wrap justify-between items-center gap-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-4">
                 <span className="font-fell text-xs text-gold/40 uppercase tracking-[0.4em] font-bold">WITCH'S SANCTUM RITUALS</span>
                 <p className="font-garamond text-parchment/20 text-xs italic italic">Manage the life-threds of this chronicle</p>
              </div>
              <div className="flex items-center gap-8">
                 <button onClick={togglePin} className={`px-8 py-3 font-fell text-[10px] uppercase tracking-[0.3em] border-2 transition-all shadow-xl ${post.is_pinned ? 'bg-gold text-void border-gold shadow-gold/20' : 'text-gold border-gold/20 hover:border-gold'}`}>
                    {post.is_pinned ? '✦ Unpin from Chronicles' : '✧ Pin to Chronicles'}
                 </button>
                 <button onClick={() => setShowDeleteRitual(!showDeleteRitual)} className="font-fell text-[10px] uppercase tracking-[0.3em] text-red-500/40 hover:text-red-600 transition-all font-bold">
                    — The Eternal Fire
                 </button>
              </div>
            </div>
          )}

          {/* DELETE RITUAL OVERLAY */}
          {showDeleteRitual && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-24 p-8 border-2 border-red-900/40 bg-red-950/20 shadow-[0_0_50px_rgba(153,27,27,0.2)]">
               <h3 className="font-cinzel text-red-500 text-xl mb-4 text-center tracking-widest">DESTROY THIS CHRONICLED TALE?</h3>
               <p className="text-center font-garamond text-parchment/40 italic mb-8">This action will erase the ink forever from the void.</p>
               <input 
                 type="text" 
                 placeholder="Type the exact title to confirm"
                 className="w-full bg-parchment border border-red-900/30 p-4 font-garamond text-black placeholder:text-black/30 focus:border-red-500 focus:ring-0 mb-8 text-center shadow-inner"
                 value={deleteConfirm}
                 onChange={(e) => setDeleteConfirm(e.target.value)}
               />
               <div className="flex gap-8 justify-center">
                  <button onClick={() => setShowDeleteRitual(false)} className="text-parchment/40 font-fell text-[10px] uppercase tracking-[0.3em] hover:text-parchment transition-colors">Abandon</button>
                  <button onClick={handleDelete} className="px-10 py-3 bg-red-900 text-white font-fell text-xs uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-xl">
                    Perform the Burning
                  </button>
               </div>
            </motion.div>
          )}
      </div>
    </div>
  );
}
