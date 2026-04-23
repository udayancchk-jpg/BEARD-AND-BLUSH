import { motion } from 'motion/react';
import { Award, ShieldCheck, UserCheck, Zap, Gem } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Expert & Certified Professionals",
      description: "Our team consists of highly trained and certified experts with years of industry experience."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Premium Hygiene Standards",
      description: "We follow strict sterilization protocols and use high-quality disposables for every client."
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Personalized Beauty Solutions",
      description: "Every treatment is tailored to your unique skin type, hair texture, and style preferences."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Modern Equipment & Techniques",
      description: "We use the latest technology and global beauty techniques to ensure the best results."
    },
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Luxury Experience at Great Value",
      description: "Enjoy a premium ambiance and world-class service without the exorbitant price tag."
    }
  ];

  return (
    <section className="py-64 bg-[#121212] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-3 gap-32 items-center">
          <div className="lg:col-span-1">
            <span className="text-accent font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">
              The Standard
            </span>
            <h2 className="text-5xl md:text-8xl font-heading mb-12 leading-tight text-foreground uppercase tracking-tight">
              Unrivaled <br />
              <span className="italic text-accent italic">Excellence</span>
            </h2>
            <p className="text-[11px] text-foreground/40 mb-16 leading-loose tracking-[0.3em] font-bold uppercase italic">
              "We define luxury not by excess, but by the extreme precision of our craft and the sacred depth of our care."
            </p>
            <div className="p-12 luxury-card">
              <div className="text-6xl font-heading text-accent mb-4 italic">4.9/5</div>
              <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em]">
                Verified Satisfaction
              </div>
            </div>
          </div>
 
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                className="p-12 luxury-card hover:border-accent/30 transition-all duration-700 group shadow-2xl"
              >
                <div className="text-accent/60 mb-10 group-hover:text-accent transition-colors duration-700">
                  {feature.icon}
                </div>
                <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6 text-foreground leading-relaxed">{feature.title}</h4>
                <p className="text-[10px] text-foreground/40 leading-loose tracking-[0.2em] font-light uppercase italic">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
