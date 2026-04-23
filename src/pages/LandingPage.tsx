import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ConsultantCTA from '@/components/ConsultantCTA';
import WhyChooseUs from '@/components/WhyChooseUs';
import Team from '@/components/Team';
import BookingSystem from '@/components/BookingSystem';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-accent-foreground relative overflow-hidden">
      <Chatbot />
      
      {/* Background Lighting Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0"></div>
      
      {/* Sticky Offer Banner */}
      <div className="bg-muted text-primary-foreground py-3 text-center text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase z-[60] relative border-b border-accent/20">
        Exclusive Online Offer — ₹200 OFF on your first visit
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <ConsultantCTA />
          <Services />
          <WhyChooseUs />
          <Team />
          <BookingSystem />
          <Testimonials />
          <Gallery />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Sticky Mobile Booking Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-8 right-8 z-40 md:hidden"
      >
        <a
          href="#ultrapremium"
          className="flex items-center justify-center gap-4 w-full h-14 bg-accent text-secondary rounded-full font-bold tracking-[0.3em] uppercase shadow-[0_10px_40px_rgba(212,175,55,0.3)] text-[10px] active:scale-95 transition-all border border-accent/20"
        >
          <Calendar className="h-4 w-4" />
          Book Your Appointment
        </a>
      </motion.div>
    </div>
  );
}
