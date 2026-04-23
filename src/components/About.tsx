import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    "Transformation & Confidence",
    "Personalized Beauty Solutions",
    "Skilled Professionals",
    "Highest Hygiene Standards",
  ];

  return (
    <section id="about" className="pt-64 pb-32 bg-[#121212] relative overflow-hidden">
      {/* Decorative texture or glow */}
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-none overflow-hidden luxury-shadow border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80"
                alt="Luxury Spa Interior"
                className="w-full aspect-[4/5] object-cover transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
            </div>
            {/* Elegant overlay element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#2C0A2E]/90 backdrop-blur-3xl p-10 flex flex-col justify-center border border-white/10 hidden md:flex z-20 shadow-2xl">
              <span className="text-accent text-5xl font-heading mb-4 italic">Refined</span>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground leading-relaxed">Redefining the standard of sanctuary care</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
              The Philosophy
            </span>
            <h2 className="text-5xl md:text-6xl font-heading mb-12 leading-tight text-foreground uppercase tracking-tight">
              Science Meets <br />
              <span className="italic font-light text-accent">Divine Artistry</span>
            </h2>
            <p className="text-base text-foreground/60 mb-10 leading-relaxed font-light tracking-wide lg:max-w-lg">
              At Beard & Blush, we believe beauty is a sacred ritual. Our Agartala sanctuary is designed for those who seek more than just a service—they seek a transformation. 
            </p>
            <p className="text-base text-foreground/60 mb-16 leading-relaxed font-light tracking-wide lg:max-w-lg italic border-l border-accent/40 pl-8">
              Combining world-class techniques with elite clinical products, we create bespoke experiences that resonate with your inner radiance.
            </p>

            <div className="grid sm:grid-cols-2 gap-10">
              {[
                { title: "ELITE ARTISTRY", desc: "Certified global masters" },
                { title: "CLINICAL PURITY", desc: "Medical-grade refinement" },
                { title: "BESPOKE RITUALS", desc: "Tailored to your signature" },
                { title: "PRIVATE SANCTUARY", desc: "Absolute exclusivity" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-500"></div>
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.3em] text-foreground uppercase mb-1">{item.title}</div>
                    <div className="text-[10px] text-foreground/40 tracking-widest uppercase font-light">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
