import { motion } from 'motion/react';
import { Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]">
      {/* Cinematic Background Video */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-full min-w-[177.77vh] pointer-events-none border-none scale-110"
            src="https://www.youtube.com/embed/F4C4VBIJuQY?autoplay=1&mute=1&loop=1&playlist=F4C4VBIJuQY&controls=0&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&autohide=1"
            allow="autoplay; encrypted-media"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#2C0A2E]/40 to-[#121212]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212] opacity-80"></div>
        
        {/* Soft Plum/Antique Gold Glows */}
        <div className="absolute top-1/4 -left-1/4 w-[70%] h-[70%] bg-[#2C0A2E]/30 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[70%] h-[70%] bg-[#D4AF37]/10 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
            The Pinnacle of Luxury
          </span>
          <h1 className="text-5xl md:text-8xl font-heading mb-10 leading-[1.1] text-foreground tracking-tight">
            BEAUTY <br />
            <span className="italic font-light text-accent">REDEFINED</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            An exclusive sanctuary where world-class artistry meets the science of transformation. Step into a world of unparalleled elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button
              asChild
              className="rounded-none bg-accent text-secondary hover:bg-accent/90 h-16 px-12 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 group"
            >
              <a href="#ultrapremium" className="flex items-center gap-3">
                Book Your Appointment
                <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-none border-white/20 text-foreground hover:bg-white/5 h-16 px-12 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500"
            >
              <a href="#services">View Rituals</a>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent/100 to-transparent"></div>
        <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-accent">Scroll</span>
      </motion.div>
    </section>
  );
}
