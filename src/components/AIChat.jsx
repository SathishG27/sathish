import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Loader2, Mic, MicOff, Volume2, VolumeX, Trash2, Stars, Sparkles, Download } from 'lucide-react';
import { getAIResponse } from '../services/aiService';
import { portfolioData } from '../data/portfolioData';
import resumePdf from '../data/resume.pdf';

// Friday's Cute 3D Female Avatar
const FRIDAY_AVATAR = "/friday_female_3d_avatar.png";

const AIChat = () => {
  const { isChatOpen, toggleChat, setChatOpen, messages, addMessage, clearMessages, hasWelcomed, setHasWelcomed } = useStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const AI_NAME = "Friday";

  // Handle Resume Download
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.target = '_blank';
    link.download = 'Sathish_G_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text) => {
    if (!window.speechSynthesis || !isVoiceEnabled) return;
    
    // Cancel any ongoing speech immediately before starting new one
    window.speechSynthesis.cancel();
    
    const cleanText = text.replace(/\[.*?\]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    
    // Find best female/english voice
    const profVoice = voices.find(v => 
      (v.name.includes('Female') || v.name.includes('UK English') || v.name.includes('Zira') || v.name.includes('Samantha')) && 
      v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (profVoice) {
      utterance.voice = profVoice;
      utterance.pitch = 1.3; // Sweeter, slightly higher pitch
      utterance.rate = 1.05; // Gentle, clear speed
    } else {
      utterance.pitch = 1.3;
      utterance.rate = 1.05;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!hasWelcomed) {
      setShowSplash(true);
      
      const handleInitialStart = () => {
        if (!hasWelcomed) {
          setHasWelcomed(true);
          const msg = `Hi! I'm Friday, your personal assistant. I can help you learn about my boss's work, experience, and how he uses AI tools to build projects fast. What can I help you with today?`;
          speak(msg);
          window.removeEventListener('click', handleInitialStart);
          window.removeEventListener('touchstart', handleInitialStart);
        }
      };

      window.addEventListener('click', handleInitialStart);
      window.addEventListener('touchstart', handleInitialStart);

      return () => {
        window.removeEventListener('click', handleInitialStart);
        window.removeEventListener('touchstart', handleInitialStart);
      };
    }
  }, [hasWelcomed, setHasWelcomed]);

  const handleSend = async (textOverride) => {
    const content = textOverride || input;
    if (!content.trim() || isLoading) return;
    if (showSplash) setShowSplash(false);

    const userMsg = { role: 'user', content };
    addMessage(userMsg);
    setInput('');
    setIsLoading(true);

    try {
      const aiContent = await getAIResponse([...messages, userMsg]);
      const aiMsg = { role: 'assistant', content: aiContent };
      addMessage(aiMsg);
      speak(aiContent);

      if (aiContent.includes('[ACTION:DOWNLOAD_RESUME]')) {
        downloadResume();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isChatOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && !isChatOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/20 backdrop-blur-2xl p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-card border border-primary/20 p-8 sm:p-12 rounded-[3rem] sm:rounded-[4rem] shadow-2xl max-w-xl w-full text-center space-y-6 sm:space-y-8 relative"
            >
              <button 
                onClick={() => setShowSplash(false)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 sm:p-3 hover:bg-secondary rounded-full transition-colors text-muted-foreground"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-full border-4 border-primary p-1 overflow-hidden shadow-2xl bg-secondary/20"
              >
                <img 
                  src={FRIDAY_AVATAR} 
                  alt="Friday" 
                  className="w-full h-full object-cover rounded-full" 
                  onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=F&background=6366f1&color=fff"; }}
                />
              </motion.div>

              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl sm:text-5xl font-black italic">Hi, I'm <span className="text-primary">{AI_NAME}</span></h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-bold leading-relaxed px-2 sm:px-0">
                  "I'm your cute 3D assistant! Shall we explore my boss's professional journey together?"
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-6">
                 <button 
                  onClick={() => { setChatOpen(true); setShowSplash(false); }}
                  className="bg-primary text-white py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-black text-xl sm:text-2xl shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all uppercase"
                >
                  Let's Chat!
                </button>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Click anywhere to hear me</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
        <motion.button 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={toggleChat} 
          className="relative w-16 h-16 sm:w-24 sm:h-24 group"
        >
          <div className={`absolute -inset-1 sm:-inset-2 bg-primary rounded-full blur opacity-40 group-hover:opacity-100 transition-opacity ${isChatOpen ? 'opacity-0' : ''}`} />
          <div className={`w-full h-full rounded-full border-4 border-background shadow-2xl overflow-hidden relative z-10 ${isChatOpen ? 'bg-background scale-90' : 'bg-primary scale-100'}`}>
            {isChatOpen ? (
              <div className="w-full h-full flex items-center justify-center text-foreground"><X size={28} className="sm:w-10 sm:h-10" /></div>
            ) : (
              <motion.img 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                src={FRIDAY_AVATAR} 
                className="w-full h-full object-cover" 
                alt="Friday" 
                onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=F&background=6366f1&color=fff"; }}
              />
            )}
          </div>
        </motion.button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="fixed inset-x-0 bottom-0 sm:absolute sm:inset-auto sm:bottom-28 sm:right-0 w-full sm:w-[440px] h-full sm:h-[720px] bg-background border-t sm:border border-border rounded-t-[3rem] sm:rounded-[4rem] shadow-2xl flex flex-col overflow-hidden no-scrollbar z-[101]"
            >
              <div className="p-6 sm:p-10 bg-primary text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white/20 overflow-hidden bg-white/10 shrink-0">
                    <img 
                      src={FRIDAY_AVATAR} 
                      className="w-full h-full object-cover" 
                      alt="Friday" 
                      onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=F&background=fff&color=6366f1"; }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight">{AI_NAME}</h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-[8px] sm:text-[10px] opacity-90 uppercase tracking-[0.2em]">
                       <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                       Cute & Ready
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${isVoiceEnabled ? 'bg-white/20 shadow-lg' : 'opacity-40'}`}>
                    {isVoiceEnabled ? <Volume2 size={20} className="sm:w-6 sm:h-6" /> : <VolumeX size={20} className="sm:w-6 sm:h-6" />}
                  </button>
                  <button onClick={toggleChat} className="p-3 sm:p-4 hover:bg-white/10 rounded-xl sm:rounded-2xl transition-colors"><X size={22} className="sm:w-7 sm:h-7" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 sm:space-y-10 no-scrollbar bg-slate-50/30 dark:bg-transparent">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shrink-0 mt-1 mr-3 sm:mr-4 border-2 border-border shadow-sm bg-white">
                        <img 
                          src={FRIDAY_AVATAR} 
                          className="w-full h-full object-cover" 
                          alt="Friday" 
                          onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=F&background=6366f1&color=fff"; }}
                        />
                      </div>
                    )}
                    <div className={`p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] text-[15px] sm:text-[17px] font-bold tracking-tight leading-relaxed max-w-[90%] sm:max-w-[85%] shadow-md ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-card text-foreground rounded-tl-none border border-border'}`}>
                      {renderParsedContent(msg.content)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-4 bg-primary/5 p-8 rounded-[2.5rem] w-fit border border-primary/10 mx-auto">
                    <Loader2 size={24} className="animate-spin text-primary" />
                    <span className="text-[13px] font-black uppercase text-primary tracking-widest">Friday is thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-6 sm:px-10 py-4 sm:py-5 overflow-x-auto no-scrollbar flex gap-3 sm:gap-4 shrink-0 border-t border-border/50 bg-secondary/10">
                <button 
                  onClick={() => handleSend("Download my boss's resume")} 
                  className="whitespace-nowrap px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-2xl sm:rounded-[1.5rem] text-[10px] sm:text-[12px] font-black shadow-xl shadow-primary/20 hover:translate-y-[-2px] active:translate-y-0 transition-all flex items-center gap-2 sm:gap-3 shrink-0"
                >
                  <Download size={16} /> GET RESUME
                </button>
                {portfolioData.quickQueries.map((q, i) => (
                  <button key={i} onClick={() => handleSend(q)} className="whitespace-nowrap px-6 sm:px-8 py-3 sm:py-4 bg-background border-2 border-border rounded-2xl sm:rounded-[1.5rem] text-[10px] sm:text-[12px] font-black text-primary hover:border-primary hover:bg-primary/5 transition-all">
                    {q}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8 shrink-0 border-t border-border bg-card">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                  className="flex items-center gap-3 sm:gap-4 bg-secondary/80 rounded-3xl sm:rounded-[2.5rem] p-2 border-2 border-border/40 focus-within:border-primary/50 transition-colors"
                >
                  <button 
                    type="button" 
                    onClick={() => { if(!isListening) recognitionRef.current?.start(); setIsListening(true); }} 
                    className={`p-3 sm:p-4 rounded-full transition-all ${isListening ? 'bg-red-500 text-white shadow-lg' : 'text-muted-foreground hover:bg-secondary-foreground/10'}`}
                  >
                    {isListening ? <MicOff size={22} className="sm:w-6 sm:h-6" /> : <Mic size={22} className="sm:w-6 sm:h-6" />}
                  </button>
                  <input 
                    type="text" value={input} onChange={(e) => setInput(e.target.value)} 
                    placeholder="Ask Friday..." 
                    className="flex-1 bg-transparent px-1 text-[15px] sm:text-[17px] font-bold outline-none border-none ring-0 placeholder:text-muted-foreground/30 min-w-0" 
                  />
                  <button 
                    type="submit" disabled={isLoading || !input.trim()} 
                    className="bg-primary text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg shadow-primary/20 active:scale-90 transition-all flex items-center justify-center shrink-0 disabled:opacity-50 disabled:grayscale"
                  >
                    <Send size={22} className="sm:w-6 sm:h-6" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const renderParsedContent = (content) => {
  if (!content) return null;
  const parts = content.split(/(\[PROJECT_CARD: .*?\]|\[SKILLS_CARD\]|\[CONTACT_CARD\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('[PROJECT_CARD:')) {
      const match = part.match(/\[PROJECT_CARD: (.*?)\]/);
      const proj = portfolioData.projects.find(p => p.title.toLowerCase().includes((match?.[1] || '').toLowerCase()));
      return proj ? (
        <div key={i} className="mt-6 p-8 bg-background border-2 border-border rounded-[3rem] shadow-sm transform transition-all hover:scale-[1.02]">
          <h4 className="text-sm font-black text-primary uppercase mb-3 text-center border-b pb-2">{proj.title}</h4>
          <p className="text-[14px] text-muted-foreground font-bold leading-relaxed">{proj.description}</p>
        </div>
      ) : null;
    }
    if (part === '[SKILLS_CARD]') return (
      <div key={i} className="mt-6 p-8 bg-background border-2 border-border rounded-[3rem] shadow-sm"><p className="text-[13px] uppercase font-black text-primary tracking-[0.2em] mb-5 text-center">Boss's Skill Set</p><div className="flex flex-wrap justify-center gap-3">{portfolioData.skills.frontend.slice(0, 3).concat(portfolioData.skills.backend.slice(0, 2)).map(s => (<span key={s} className="px-5 py-3 bg-primary/10 text-primary text-[12px] rounded-2xl font-black">{s}</span>))}</div></div>
    );
    if (part === '[CONTACT_CARD]') return (
      <div key={i} className="mt-6 p-10 bg-gradient-to-br from-primary to-indigo-700 text-white rounded-[3.5rem] shadow-2xl text-center"><p className="text-[20px] font-black tracking-tight mb-2 underline underline-offset-4">{portfolioData.personalInfo.email}</p><div className="w-12 h-1.5 bg-white/30 mx-auto my-5 rounded-full" /><div className="text-[16px] font-black tracking-widest">{portfolioData.personalInfo.phone}</div></div>
    );
    return <p key={i} className="whitespace-pre-wrap">{part.replace('[ACTION:DOWNLOAD_RESUME]', '')}</p>;
  });
};

export default AIChat;
