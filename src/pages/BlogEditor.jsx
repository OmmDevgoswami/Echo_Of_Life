import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Begin your incantation here...</p>',
    editorProps: {
      attributes: {
        class: 'ProseMirror focus:outline-none min-h-[400px] text-parchment/90'
      }
    }
  });

  async function handlePublish() {
    if (!title || !editor) return;
    setIsSubmitting(true);

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const html = editor.getHTML();
    const text = editor.getText();
    const excerpt = text.substring(0, 150) + '...';

    const { error } = await supabase.from('posts').insert([
      { title, category, content: html, slug, excerpt, is_pinned: isPinned, created_at: new Date() }
    ]);

    if (error) {
      alert('The spell failed: ' + error.message);
    } else {
      navigate('/blog');
    }
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#0b0b12] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#fcf8ef] border-[12px] border-void shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[85vh] flex flex-col"
        >
          {/* EDITOR HEADER */}
          <div className="p-8 md:p-12 pb-0">
            <input 
              type="text" 
              placeholder="Title of the Tale" 
              className="w-full bg-transparent border-none font-cinzel text-5xl text-[#2c2720] focus:ring-0 placeholder:text-void/10 mb-2 p-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Category (e.g. Poetry, Dark Fantasy)" 
              className="w-full bg-transparent border-none font-fell text-xl text-[#7a5c2e] focus:ring-0 placeholder:text-gold/20 mb-8 p-0 italic"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex-1 px-8 md:px-16 pb-12 overflow-y-auto custom-editor-area">
            <EditorContent editor={editor} />
          </div>

          <div className="bg-[#fcf8ef] p-10 flex justify-between items-center mt-auto border-t border-black/5 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
            <div className="text-black/60 font-fell text-[11px] uppercase tracking-[0.4em] italic px-8">
              "Words bound in ink & starlight"
            </div>
            
            <div className="flex gap-12 items-center px-8">
              <button 
                onClick={() => navigate('/blog')}
                className="font-fell text-red-700/60 uppercase tracking-[0.4em] hover:text-red-700 transition-all text-[11px] font-bold"
              >
                Burn Ritual
              </button>
              <button 
                onClick={handlePublish}
                disabled={isSubmitting}
                className="px-12 py-4 bg-[#3d2b1f] text-[#fcf8ef] font-fell uppercase tracking-[0.4em] hover:bg-[#2a1d15] transition-all disabled:opacity-50 text-[11px] shadow-xl font-bold rounded-sm"
              >
                {isSubmitting ? 'Sealing...' : 'Seal to Grimoire'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .custom-editor-area .ProseMirror {
          color: #2c2720 !important;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          line-height: 1.8;
          min-h: 50vh;
        }
        .custom-editor-area .ProseMirror p {
           margin-bottom: 1.5rem;
        }
        .custom-editor-area .ProseMirror:focus {
          outline: none;
        }
        .glow-red:hover {
          text-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }
      `}</style>
    </div>
  );
}

