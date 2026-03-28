import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Dropcursor from '@tiptap/extension-dropcursor';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/imagekit';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogEditor() {
  const { slug: editSlug } = useParams();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverCaption, setCoverCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [existingId, setExistingId] = useState(null);
  const coverInputRef = useRef(null);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'magical-ink-image mx-auto my-12 border border-gold/10 shadow-lg max-h-[400px] object-contain rounded-sm',
        },
      }),
      Placeholder.configure({
        placeholder: 'Begin your chronicle here...',
      }),
      Dropcursor.configure({
        color: '#c9a84c',
        width: 2,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose-edit focus:outline-none min-h-[600px] p-12 font-garamond text-2xl leading-relaxed text-black/80',
      },
      handleDrop: (view, event) => {
        const hasFiles = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length;
        if (hasFiles) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            handleInTextImageUpload(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editSlug && editor) {
      fetchExistingPost();
    }
  }, [editSlug, editor]);

  async function fetchExistingPost() {
    const { data, error } = await supabase.from('posts').select('*').eq('slug', editSlug).maybeSingle();
    if (data) {
      setTitle(data.title);
      setSubtitle(data.subtitle || '');
      setCategory(data.category || '');
      setCoverImage(data.cover_image || '');
      setCoverCaption(data.cover_caption || '');
      setExistingId(data.id);
      
      // We check for editor again just to be safe
      if (editor) {
        editor.commands.setContent(data.content);
      }
    }
  }

  const handleInTextImageUpload = async (file) => {
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      const caption = window.prompt("The legend of this visual (You can use <a> for links!):");
      
      editor.chain().focus().insertContent([
        {
          type: 'paragraph',
          content: [
            {
              type: 'image',
              attrs: { src: url, class: 'magical-ink-image mx-auto my-12 border border-gold/10 shadow-lg max-h-[400px]' }
            }
          ]
        },
        {
          type: 'paragraph',
          attrs: { class: 'text-center font-garamond italic text-black/50 text-sm tracking-widest' },
          content: [
            { type: 'text', text: '— ' },
            { type: 'text', text: caption || '' }
          ]
        }
      ]).run();
    } catch (err) {
      alert("The ink-trail broke: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerInTextImagePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) handleInTextImageUpload(file);
    };
    input.click();
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setCoverImage(url);
    } catch (err) {
      alert("Cover spell failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  async function handlePublish() {
    if (!title || !editor.getText()) return alert('A chronicle needs both a title and its heart.');
    setIsSubmitting(true);
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const postData = {
      title,
      subtitle,
      slug,
      category,
      content: editor.getHTML(),
      cover_image: coverImage,
      cover_caption: coverCaption,
      excerpt: editor.getText().slice(0, 150) + '...',
      is_pinned: false
    };

    let error;
    if (existingId) {
      const { error: err } = await supabase.from('posts').update(postData).eq('id', existingId);
      error = err;
    } else {
      const { error: err } = await supabase.from('posts').insert([postData]);
      error = err;
    }

    if (error) alert("The spell failed: " + error.message);
    else navigate('/blog');
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-void py-24 px-6 md:px-12 flex flex-col items-center">
      {isUploading && (
        <div className="fixed inset-0 z-[5000] bg-void/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-gold font-fell text-2xl animate-pulse tracking-[0.5em]">BINDING DATA TO INK...</div>
        </div>
      )}

      <div className="w-full max-w-[1000px] flex flex-col h-full bg-[#fcf8ef] shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
        
        {/* EDITORIAL HEADER */}
        <div className="p-12 border-b border-black/10 bg-[#fcf8ef]">
           <input 
             type="text" 
             placeholder="Title of the Tale"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             className="w-full bg-transparent border-none p-0 text-5xl md:text-7xl font-cinzel text-black focus:ring-0 placeholder:text-black/30 mb-8"
           />
           <input 
             type="text" 
             placeholder="The Echo (Subtitle/Hook for this tale...)"
             value={subtitle}
             onChange={(e) => setSubtitle(e.target.value)}
             className="w-full bg-transparent border-none p-0 text-xl font-garamond italic text-black/60 focus:ring-0 placeholder:text-black/40 mt-4 mb-4"
           />
           <div className="flex flex-wrap gap-8 items-center">
             <input 
               type="text" 
               placeholder="Category..."
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               className="bg-transparent border-b border-black/20 text-xs font-fell uppercase tracking-[0.3em] text-black/80 focus:border-gold focus:ring-0 w-[200px] placeholder:text-black/40"
             />
             <div className="hidden md:block h-4 w-[1px] bg-black/20"></div>
             <button onClick={triggerInTextImagePicker} className="font-fell text-[11px] uppercase tracking-widest text-[#5a3a7a] hover:text-[#4a2e63] transition-colors flex items-center gap-2 font-bold focus:outline-none">
                <span>✦ Invoke Image (Upload)</span>
             </button>
           </div>
        </div>

        {/* COVER IMAGE AREA */}
        <div className="px-12 pt-12">
            <input 
              type="file" 
              ref={coverInputRef}
              onChange={handleCoverUpload}
              className="hidden"
              accept="image/*"
            />
            <div 
              onClick={() => coverInputRef.current.click()}
              className="w-full min-h-[200px] bg-black/5 border-2 border-dashed border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-all group mb-8"
            >
              {coverImage ? (
                <div className="w-full relative">
                  <img src={coverImage} alt="Cover" className="w-full aspect-[16/7] object-cover shadow-xl" />
                  <div className="absolute inset-0 bg-void/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white font-fell tracking-widest uppercase text-xs">Click to replace cover</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                   <span className="block text-4xl mb-4 text-black/30 transition-colors group-hover:text-gold/60">✦</span>
                   <span className="text-xs font-fell uppercase tracking-widest text-black/60">Click to set the Chronicle's Face</span>
                </div>
              )}
            </div>
            {coverImage && (
              <input 
                type="text" 
                placeholder="Legend of the visual..."
                value={coverCaption}
                onChange={(e) => setCoverCaption(e.target.value)}
                className="w-full bg-transparent border-none p-4 text-sm font-garamond italic text-center text-black focus:ring-0 mb-12"
              />
            )}
        </div>

        {/* WORKSPACE */}
        <div className="flex-1 custom-editor-area relative">
          <EditorContent editor={editor} />
        </div>

        {/* FOOTER */}
        <div className="bg-[#fcf8ef] p-6 md:p-10 flex flex-col md:flex-row justify-between items-center mt-auto border-t border-black/5 gap-8">
          <div className="text-black/40 font-fell text-[11px] uppercase tracking-[0.4em] italic">
            "Words bound in ink & starlight"
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 items-center w-full md:w-auto px-4 md:px-8">
            <button onClick={() => navigate('/blog')} className="font-fell text-red-700/60 uppercase tracking-[0.4em] hover:text-red-700 transition-all text-[11px] font-bold order-2 md:order-1">Burn Ritual</button>
            <button 
              onClick={handlePublish}
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-4 bg-[#3d2b1f] text-[#fcf8ef] font-fell uppercase tracking-[0.4em] hover:bg-[#2a1d15] shadow-xl font-bold order-1 md:order-2"
            >
              {isSubmitting ? 'Sealing...' : 'Seal to Grimoire'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-editor-area .ProseMirror:focus { outline: none; }
        .prose-edit h1, .prose-edit h2 { font-family: 'Cinzel', serif; color: #3d2b1f; margin-top: 2rem; }
        .prose-edit p { margin-bottom: 1.2rem; }
        .prose-immersion p { margin-bottom: 1.2rem; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .magical-ink-image { transition: all 0.5s ease; cursor: move; }
        .magical-ink-image:hover { transform: scale(1.01); box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
}
