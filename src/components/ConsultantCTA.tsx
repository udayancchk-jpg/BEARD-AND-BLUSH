import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConsultantCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-40 bg-[#121212] border-y border-white/5 relative overflow-hidden">
      {/* Decorative scanning line animation background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div
           animate={{ top: ['0%', '100%', '0%'] }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="absolute left-0 right-0 h-[1px] bg-accent z-0"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          
          {/* Visual Side with scanning animation */}
          <div className="relative group order-2 md:order-1">
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden luxury-shadow border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80" 
                alt="Face for scanning" 
                className="w-full h-full object-cover grayscale brightness-50 contrast-125"
              />
              
              {/* Scanning Animations */}
              <div className="absolute inset-0 flex flex-col justify-between p-12 pointer-events-none">
                <div className="flex justify-between">
                  <div className="w-10 h-10 border-t-2 border-l-2 border-accent/40 rounded-tl-xl animate-pulse"></div>
                  <div className="w-10 h-10 border-t-2 border-r-2 border-accent/40 rounded-tr-xl animate-pulse delay-75"></div>
                </div>
                
                {/* Real-time scanning UI elements */}
                <div className="flex flex-col gap-4 items-center">
                   <div className="w-48 h-[1px] bg-accent/30 relative overflow-hidden">
                      <motion.div 
                        animate={{ left: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-accent shadow-[0_0_10px_#D4AF37]"
                      />
                   </div>
                   <span className="text-[8px] font-bold text-accent uppercase tracking-[0.5em] animate-pulse">Analyzing Symmetry</span>
                </div>

                <div className="flex justify-between">
                  <div className="w-10 h-10 border-b-2 border-l-2 border-accent/40 rounded-bl-xl animate-pulse delay-150"></div>
                  <div className="w-10 h-10 border-b-2 border-r-2 border-accent/40 rounded-br-xl animate-pulse delay-300"></div>
                </div>
              </div>

              {/* Horizontal scanning line */}
              <motion.div 
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-[2px] bg-accent shadow-[0_0_15px_#D4AF37] z-20 pointer-events-none"
              />

              {/* Data points overlays */}
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 left-1/4 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#D4AF37]"
              />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                className="absolute top-1/2 right-1/3 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#D4AF37]"
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#2C0A2E]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col justify-center gap-2 hidden lg:flex">
               <Sparkles className="text-accent h-6 w-6 mb-2" />
               <h5 className="text-[10px] font-bold text-foreground uppercase tracking-widest leading-relaxed">Precision <br />Diagnostic</h5>
               <p className="text-[8px] text-foreground/40 leading-relaxed uppercase tracking-tighter italic">World-class AI interface</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 md:order-2">
            <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
              Digital Diagnostic
            </span>
            <h2 className="text-4xl md:text-6xl font-heading mb-10 text-foreground uppercase tracking-tight leading-tight">
              Consult with our <br />
              <span className="italic font-light text-accent">Artisan AI</span>
            </h2>
            <p className="text-sm text-foreground/50 leading-loose tracking-[0.2em] font-light uppercase italic mb-12 max-w-md">
              "Experience the future of sanctuary care. Our AI Consultant provides a scientific diagnostic of your unique features to curate a bespoke transformation plan."
            </p>
            
            <ul className="space-y-6 mb-16">
              {[
                "Instant Symmetry Mapping",
                "Advanced Undertone Detection",
                "Personalized Ritual Curation"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-all shadow-[0_0_10px_#D4AF37]" />
                  <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-[0.3em]">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Button 
               onClick={() => {
                 window.scrollTo(0, 0);
                 navigate('/consultant');
               }}
               className="h-16 px-12 bg-accent text-secondary hover:bg-accent/90 rounded-none uppercase font-bold tracking-[0.4em] text-[10px] luxury-shadow group flex items-center gap-6"
            >
              Get Free Analysis
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
