import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisualArchitect from '@/components/VisualArchitect';
import Chatbot from '@/components/Chatbot';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function ConsultantPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-accent-foreground relative overflow-hidden">
      <Chatbot />
      
      {/* Background Lighting Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <VisualArchitect />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
