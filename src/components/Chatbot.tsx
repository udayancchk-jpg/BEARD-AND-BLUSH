import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getChatResponse } from '@/services/geminiService';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Welcome to the Plum Luxe Sanctuary. I am your concierge. How may I assist in your pursuit of refinement today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await getChatResponse(userMessage, history);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-28 right-6 md:bottom-10 md:right-10 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-6 w-[calc(100vw-48px)] sm:w-[380px] h-[550px] max-h-[calc(100vh-160px)] bg-[#121212] border border-accent/20 rounded-[32px] shadow-2xl flex flex-col relative"
          >
            {/* Atmospheric Backgrounds inside chat */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2C0A2E]/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10 bg-[#121212]/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center bg-accent/5">
                  <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Concierge</h4>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/40 font-light italic">Art of Living Refined</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-foreground/40 hover:text-accent transition-colors"
                id="close-chatbot"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10 custom-scrollbar"
            >
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={cn(
                    "max-w-[85%] flex flex-col",
                    m.role === 'user' ? "ml-auto" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "p-5 rounded-2xl text-[10px] uppercase tracking-widest leading-loose",
                    m.role === 'user' 
                      ? "bg-accent text-secondary font-bold rounded-tr-none" 
                      : "bg-white/5 text-foreground/80 font-light italic border border-white/5 rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                  <span className={cn(
                    "text-[7px] uppercase tracking-[0.3em] font-bold mt-2 opacity-30",
                    m.role === 'user' ? "text-right" : "text-left"
                  )}>
                    {m.role === 'user' ? 'Guest' : 'Santuary AI'}
                  </span>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 text-accent/50">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-[8px] uppercase tracking-widest">Contemplating excellence...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 relative z-10 bg-[#121212]/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about our rituals..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 pl-6 pr-14 text-[10px] text-foreground uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-foreground/10"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-accent text-secondary flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
                  id="send-message"
                >
                  <Send size={14} className={isLoading ? "animate-pulse" : ""} />
                </button>
              </div>
              <p className="text-center mt-4 text-[7px] text-foreground/20 uppercase tracking-[0.4em] font-bold">
                Bespoke Concierge System
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-full flex items-center justify-center shadow-2xl border transition-all duration-700",
          isOpen 
            ? "bg-secondary text-accent border-accent/20" 
            : "bg-accent text-secondary border-transparent"
        )}
        id="toggle-chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
