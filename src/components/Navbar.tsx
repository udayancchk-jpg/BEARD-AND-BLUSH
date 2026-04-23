import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'AI Consultant', href: '/consultant' },
    { name: 'Team', href: '/#team' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#121212]/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-heading tracking-tight text-foreground uppercase">
            Beard & <span className="text-accent italic font-light">Blush</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-[11px] font-semibold hover:text-accent transition-colors tracking-widest uppercase text-foreground/80"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-[11px] font-semibold hover:text-accent transition-colors tracking-widest uppercase text-foreground/80"
              >
                {link.name}
              </Link>
            )
          ))}
          <Button
            asChild
            className="rounded-none px-10 bg-accent text-secondary hover:bg-accent/90 font-bold uppercase tracking-[0.3em] text-[10px] h-11 transition-all duration-300 border border-accent/20"
          >
            <a href="/#ultrapremium" onClick={() => handleLinkClick('/#ultrapremium')}>
              Book Your Appointment
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-t border-accent/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-10 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-xs font-medium tracking-[0.3em] uppercase py-2 text-foreground/80"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-medium tracking-[0.3em] uppercase py-2 text-foreground/80"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Button
                asChild
                variant="outline"
                className="w-full rounded-none border-accent text-accent mt-4 uppercase tracking-widest text-[10px] h-12"
                onClick={() => handleLinkClick('/#ultrapremium')}
              >
                <a href="/#ultrapremium">Book Your Appointment</a>
              </Button>
              <a
                href="tel:+918259800001"
                className="flex items-center justify-center gap-3 text-accent font-medium tracking-widest uppercase text-[10px] py-2"
              >
                <Phone size={14} />
                Call Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
