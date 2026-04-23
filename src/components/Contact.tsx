import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "+91 82598 00001",
      href: "tel:+918259800001"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "hello@beardandblush.com",
      href: "mailto:hello@beardandblush.com"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Address",
      value: "Mantribari Road, Agartala",
      href: "https://maps.app.goo.gl/yeGHi9YA75qoUUFtO"
    }
  ];

  return (
    <section id="contact" className="py-64 bg-[#121212] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-accent font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">
              The Connection
            </span>
            <h2 className="text-4xl md:text-7xl font-heading mb-12 text-foreground uppercase leading-tight tracking-tight">
              Visit the <span className="italic font-light text-accent italic">Sanctuary</span>
            </h2>
            <p className="text-[11px] text-foreground/40 mb-16 leading-loose tracking-[0.3em] font-bold max-w-lg uppercase">
              EXPERIENCE THE PINNACLE OF BEAUTY AND WELLNESS. WE INVITE YOU TO REACH OUT AND BEGIN YOUR JOURNEY OF ABSOLUTE REFINEMENT.
            </p>

            <div className="space-y-12 mb-16">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-10 group"
                >
                  <div className="w-14 h-14 rounded-none border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-secondary transition-all duration-700 bg-[#1C071D]/40 backdrop-blur-md">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 mb-2">
                      {item.label}
                    </div>
                    <div className="text-xl font-heading tracking-widest text-foreground uppercase">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-8">
              <Button
                asChild
                className="rounded-none px-12 h-16 bg-[#A6788A] hover:bg-[#8E6172] text-[#F8F6F2] font-bold uppercase tracking-[0.4em] text-[10px] luxury-shadow transition-all duration-700"
              >
                <a href="https://wa.me/918259800001" target="_blank" rel="noopener noreferrer">
                  WhatsApp Concierge
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none px-12 h-16 border-accent/20 text-accent hover:bg-accent hover:text-secondary font-bold uppercase tracking-[0.4em] text-[10px] transition-all duration-700"
              >
                <a href="#ultrapremium">Book Your Appointment</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative h-[700px] rounded-none overflow-hidden luxury-shadow border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 bg-[#1C071D]"
          >
            {/* Placeholder for Google Map - In real app, use Google Maps Embed API */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
              <div className="w-20 h-20 rounded-none border border-accent/20 flex items-center justify-center mb-10 bg-[#121212]/40 backdrop-blur-md">
                <MapPin className="h-8 w-8 text-accent opacity-60" />
              </div>
              <h3 className="text-[11px] font-bold tracking-[0.5em] uppercase mb-6 text-foreground">The Agartala Sanctuary</h3>
              <p className="text-[10px] text-foreground/40 mb-12 tracking-[0.3em] font-light leading-loose uppercase">
                BEARD & BLUSH, 1ST FLOOR, ABOVE SENCO GOLD, <br /> MANTRIBARI ROAD EXTENSION, AGARTALA, TRIPURA 799001
              </p>
              <Button asChild variant="outline" className="rounded-none border-accent/20 text-accent text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-accent hover:text-secondary h-14 px-12 transition-all duration-700 bg-transparent">
                <a href="https://maps.app.goo.gl/yeGHi9YA75qoUUFtO" target="_blank" rel="noopener noreferrer">
                  Interactive Access
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
