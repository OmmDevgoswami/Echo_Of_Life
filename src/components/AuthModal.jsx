import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);
    else onClose();
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-void/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-void border border-gold/20 p-8 md:p-12 w-full max-w-[400px] shadow-2xl relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-parchment/30 hover:text-gold transition-colors">✕</button>
          
          <h2 className="font-cinzel text-2xl text-parchment mb-2 text-center">{isSignUp ? 'Join the Coven' : 'Enter the Grimoire'}</h2>
          <p className="font-fell text-xs text-gold/50 text-center uppercase tracking-widest mb-8">Identification required for interaction</p>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <input 
                type="email" 
                placeholder="Ancient Email" 
                className="w-full bg-transparent border-2 border-gold/30 p-4 font-garamond text-gold placeholder:text-gold/20 focus:border-gold focus:ring-0 transition-all outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Secret Password" 
                className="w-full bg-transparent border-2 border-gold/30 p-4 font-garamond text-gold placeholder:text-gold/20 focus:border-gold focus:ring-0 transition-all outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              disabled={loading}
              className="w-full py-4 bg-gold text-void font-fell text-lg uppercase tracking-widest hover:bg-gold-bright transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(201,168,76,0.3)]"
            >
              {loading ? 'Consulting Oracles...' : (isSignUp ? 'UNVEIL SPIRIT' : 'ASCEND')}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-gold/5">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-fell text-xs text-parchment/30 hover:text-gold uppercase tracking-widest transition-colors"
            >
              {isSignUp ? 'Already an initiate? Sign In' : 'Need to join the coven? Sign Up'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
