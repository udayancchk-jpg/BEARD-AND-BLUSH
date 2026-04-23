import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';

export default function Testimonials() {
  return (
    <section className="py-64 bg-[#121212] overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#2C0A2E]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-40">
          <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
            Inner Glow
          </span>
          <h2 className="text-5xl md:text-8xl font-heading mb-10 leading-tight text-foreground uppercase tracking-tight">
            Client <span className="italic font-light text-accent italic">Devotion</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-10 text-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/40 font-bold uppercase italic">"Unparalleled journeys in refinement"</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="p-16 h-full relative group luxury-card">
                <Quote className="absolute -top-4 -right-4 h-32 w-32 text-white/5 group-hover:text-accent/10 transition-all duration-1000 rotate-12" />
                
                <p className="text-base leading-relaxed mb-16 italic text-foreground/70 font-light font-heading tracking-wide">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center font-heading text-accent text-lg bg-[#2C0A2E]">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground">{testimonial.name}</div>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-accent mt-1.5 opacity-60">Verified Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
