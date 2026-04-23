import { motion } from 'motion/react';
import { GALLERY_IMAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Gallery() {
  return (
    <section id="gallery" className="py-64 bg-[#121212]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <span className="text-accent font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">
            Visual Sanctuary
          </span>
          <h2 className="text-4xl md:text-6xl font-heading mb-10 leading-tight text-foreground uppercase tracking-tight">
            The <span className="italic font-light text-accent italic">Collection</span>
          </h2>
          <p className="text-[11px] text-foreground/40 tracking-[0.3em] font-bold max-w-xl mx-auto leading-relaxed uppercase italic">
            "A CURATED GLIMPSE INTO THE TRANSFORMATIONS WE CRAFT."
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
              className={cn(
                "relative overflow-hidden rounded-none luxury-shadow group aspect-square transition-all duration-1000 border border-white/5",
                index === 1 && "md:row-span-2 md:aspect-auto",
                index === 4 && "md:col-span-2 md:aspect-auto"
              )}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-700"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
