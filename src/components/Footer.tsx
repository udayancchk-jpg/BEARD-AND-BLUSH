import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] border-t border-white/5 pt-48 pb-20 overflow-hidden relative">
      {/* Subtle deep glow */}
      <div className="absolute -bottom-[20%] left-[10%] w-[40%] h-[40%] bg-[#2C0A2E]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-10 group">
              <span className="text-2xl font-heading tracking-tight text-foreground uppercase">
                Beard & <span className="text-accent italic font-light">Blush</span>
              </span>
            </a>
            <p className="text-[10px] text-foreground/40 leading-relaxed tracking-[0.3em] mb-12 uppercase font-light">
              THE PINNACLE OF LUXURY SANCTUARY CARE. REDEFINING THE STANDARD OF BEAUTY THROUGH GLOBAL ARTISTRY.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center text-accent hover:bg-accent hover:text-secondary transition-all duration-700 bg-[#1C071D]/40 backdrop-blur-md">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.5em] uppercase mb-10 text-accent">Concierge</h4>
            <ul className="space-y-6">
              {['Philosopy', 'Rituals', 'AI Consultant', 'Specialists', 'Visuals', 'Book Appointment'].map((item) => (
                <li key={item}>
                  {item === 'AI Consultant' ? (
                    <Link to="/consultant" className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 hover:text-accent transition-all duration-500 font-light translate-x-0 hover:translate-x-2 inline-block">
                      {item}
                    </Link>
                  ) : (
                    <a href={`/#${item === 'Book Appointment' ? 'ultrapremium' : item.toLowerCase().replace(/ /g, '')}`} className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 hover:text-accent transition-all duration-500 font-light translate-x-0 hover:translate-x-2 inline-block">
                      {item}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.5em] uppercase mb-10 text-accent">Signature</h4>
            <ul className="space-y-6">
              {['Hair Artistry', 'Bridal Design', 'Spa Clinical', 'Skin Refinement', 'Nail Sculpture'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 hover:text-accent transition-all duration-500 font-light translate-x-0 hover:translate-x-2 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.5em] uppercase mb-10 text-accent">Contact</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 leading-relaxed font-light">
                  Elite Suite, Above Senco Gold, <br />Agartala, UP 799001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 font-light">+91 82598 00001</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 font-light">HEAVEN@BEARDANDBLUSH.COM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 text-[10px] uppercase tracking-[0.4em] text-foreground/20 font-bold">
          <p>© {currentYear} BB EXCLUSIVE SANCTUARY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-16">
            <a href="#" className="hover:text-accent transition-all duration-500">PRIVACY</a>
            <a href="#" className="hover:text-accent transition-all duration-500">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
