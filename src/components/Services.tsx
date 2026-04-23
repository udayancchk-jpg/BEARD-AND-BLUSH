import { motion } from 'motion/react';
import { SPA_SERVICES, SALON_SERVICES } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';

export default function Services() {
  return (
    <section id="services" className="pt-32 pb-64 bg-[#121212]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-40">
          <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
            Signature Rituals
          </span>
          <h2 className="text-5xl md:text-7xl font-heading mb-10 leading-tight text-foreground uppercase tracking-tight">
            Curated <span className="italic font-light text-accent italic">Treatments</span>
          </h2>
          <p className="text-base text-foreground/40 tracking-wide font-light max-w-xl mx-auto leading-relaxed uppercase italic">
            "Discover our collection of elite rituals, designed to restore your natural harmony."
          </p>
        </div>

        {/* Spa Services */}
        <div className="mb-48">
          <div className="flex items-center gap-10 mb-20">
            <h3 className="text-[11px] font-bold tracking-[0.5em] uppercase text-accent/80 whitespace-nowrap">
              Wellness & Spa
            </h3>
            <div className="h-[1px] flex-grow bg-white/5"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {SPA_SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Salon Services */}
        <div>
          <div className="flex items-center gap-10 mb-20">
            <h3 className="text-[11px] font-bold tracking-[0.5em] uppercase text-accent/80 whitespace-nowrap">
              Artistic Styling
            </h3>
            <div className="h-[1px] flex-grow bg-white/5"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12">
            {SALON_SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
      className="luxury-card group"
    >
      <div className="relative aspect-[4/5] overflow-hidden transition-all duration-1000">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700"></div>
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
        </div>
      </div>
      <div className="p-8 text-center bg-card">
        <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-4 text-foreground group-hover:text-accent transition-colors">
          {service.title}
        </h4>
        <p className="text-[10px] text-foreground/40 leading-relaxed tracking-wider font-light line-clamp-3 uppercase italic">
          {service.description}
        </p>
        <div className="mt-8 w-12 h-[1px] bg-accent/20 mx-auto group-hover:w-20 group-hover:bg-accent transition-all duration-700"></div>
      </div>
    </motion.div>
  );
}
