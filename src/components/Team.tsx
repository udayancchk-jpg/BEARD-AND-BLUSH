import { motion } from 'motion/react';
import { TEAM_MEMBERS } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';

export default function Team() {
  return (
    <section id="team" className="py-64 bg-[#121212] overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-40">
          <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
            The Specialists
          </span>
          <h2 className="text-5xl md:text-7xl font-heading mb-10 leading-tight text-foreground uppercase tracking-tight">
            Masters of <span className="italic font-light text-accent italic">Aesthetics</span>
          </h2>
          <p className="text-base text-foreground/40 tracking-wide font-light max-w-xl mx-auto leading-relaxed uppercase italic">
            "A collective of world-class artisans dedicated to absolute perfection."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
              className="group luxury-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden transition-all duration-1000">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-2">{member.specialization}</div>
                   <div className="h-[1px] w-8 bg-accent/40 group-hover:w-16 transition-all duration-700"></div>
                </div>
              </div>
              <div className="text-center p-12 bg-card">
                <span className="text-accent/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
                  {member.role}
                </span>
                <h3 className="text-2xl font-heading text-foreground mb-4">{member.name}</h3>
                <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] font-light leading-relaxed italic line-clamp-2">
                  "{member.intro}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
