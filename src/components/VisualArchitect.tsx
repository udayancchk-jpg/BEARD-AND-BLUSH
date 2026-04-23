import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Sparkles, Loader2, User, RefreshCw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analyzePortrait } from '@/services/geminiService';

export default function VisualArchitect() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
      const data = await analyzePortrait(base64Data, mimeType);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <section id="ai-consultant" className="py-64 bg-[#121212] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#2C0A2E]/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
            AI Visionary
          </span>
          <h2 className="text-4xl md:text-7xl font-heading mb-10 text-foreground uppercase tracking-tight">
            Artisan <span className="italic font-light text-accent">AI Consultant</span>
          </h2>
          <p className="text-sm text-foreground/40 tracking-[0.2em] uppercase font-light leading-relaxed max-w-xl mx-auto italic">
            "Your portrait is the canvas. Our AI is the master artist. Reveal your personalized sanctuary ritual through visual analysis."
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Upload / Preview Side */}
          <div className="relative group">
            <div className="aspect-[4/5] bg-card rounded-[40px] border border-white/5 overflow-hidden luxury-shadow relative flex items-center justify-center transition-all duration-700 group-hover:border-accent/30">
              {image ? (
                <>
                  <img src={image} alt="Portrait" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full border-white/20 text-white hover:bg-white/10"
                    >
                      <RefreshCw size={18} className="mr-2" />
                      Change Portrait
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-12">
                  <div className="w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center mx-auto mb-10 bg-accent/5">
                    <Camera className="h-10 w-10 text-accent/40" />
                  </div>
                  <h4 className="text-xs font-bold tracking-[0.4em] uppercase text-foreground mb-6">Upload Your Portrait</h4>
                  <p className="text-[10px] text-foreground/30 uppercase tracking-widest max-w-[240px] mx-auto mb-10">
                    A clear front-facing portrait allows our AI to analyze your features with absolute precision.
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-none bg-accent text-secondary hover:bg-accent/90 h-14 px-10 text-[10px] uppercase font-bold tracking-[0.3em]"
                  >
                    <Upload size={16} className="mr-3" />
                    Select Image
                  </Button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            {image && !result && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[280px]"
              >
                <Button 
                  onClick={startAnalysis}
                  className="w-full h-16 bg-[#A6788A] hover:bg-[#8E6172] text-white rounded-none uppercase font-bold tracking-[0.4em] text-[10px] luxury-shadow"
                >
                  <Sparkles size={16} className="mr-3" />
                  Analyze Excellence
                </Button>
              </motion.div>
            )}
          </div>

          {/* Results Side */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <Loader2 className="h-12 w-12 text-accent animate-spin mb-10" />
                  <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-accent mb-4">Deconstructing Artistry</h3>
                  <p className="text-[10px] text-foreground/30 uppercase tracking-[0.3em] italic">Mapping your unique features onto our artisan philosophy...</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#1A1A1A] rounded-[16px] border border-accent/20 p-6 md:p-8 luxury-shadow flex flex-col gap-6"
                >
                  {/* Title */}
                  <h3 className="text-xl md:text-[22px] font-heading text-foreground uppercase tracking-tight">
                    Your Skin Analysis
                  </h3>

                   {/* Dashboard Labels Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/5 pb-6">
                    <div className="flex flex-col gap-2 text-left">
                       <span className="text-[14px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                        🧴 Skin Type
                       </span>
                       <span className="text-[14px] text-white/80 font-light">{result?.summary?.skinType || 'Analyzing...'}</span>
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                       <span className="text-[14px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                        ⚠️ Concern
                       </span>
                       <span className="text-[14px] text-white/80 font-light capitalize">{result?.summary?.primaryConcern || 'Checking...'}</span>
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                       <span className="text-[14px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                         Issues
                       </span>
                       <span className="text-[14px] text-white/80 font-light capitalize">{result?.summary?.skinIssues || 'Evaluating...'}</span>
                    </div>
                  </div>

                  {/* Current Condition */}
                  <div className="flex flex-col gap-3 text-left">
                    <h4 className="text-[14px] font-bold text-accent uppercase tracking-[0.1em]">Current Condition</h4>
                    <ul className="list-none space-y-2">
                      {(result?.currentCondition || []).map((item: string, i: number) => (
                        <li key={i} className="text-[14px] text-[#B0B0B0] flex items-start gap-3">
                          <span className="text-accent mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-[1px] bg-white/5" />
                  {/* Recommended Service */}
                  <div className="flex flex-col gap-3 text-left">
                    <h4 className="text-[14px] font-bold text-accent uppercase tracking-[0.1em] flex items-center gap-2">
                      <span className="text-lg">💆</span> Recommended Service
                    </h4>
                    <span className="text-[18px] font-heading text-white tracking-widest uppercase italic">
                      {result?.recommendedService || 'Analyzing...'}
                    </span>
                  </div>

                  {/* Expected Results */}
                  <div className="flex flex-col gap-3 text-left">
                    <h4 className="text-[14px] font-bold text-accent uppercase tracking-[0.1em] flex items-center gap-2">
                      <span className="text-lg">✨</span> Expected Results
                    </h4>
                    <ul className="list-none space-y-2">
                      {(result?.expectedResults || []).map((item: string, i: number) => (
                        <li key={i} className="text-[14px] text-[#B0B0B0] flex items-start gap-3">
                          <span className="text-accent mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-[1px] bg-white/5" />

                  <p className="text-[11px] text-foreground/40 leading-relaxed tracking-[0.2em] font-light italic uppercase mb-2 text-left">
                    "{result?.closingStatement}"
                  </p>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <Button 
                      asChild 
                      className="bg-[#D4AF37] hover:bg-[#C5A028] text-black h-14 px-8 rounded-[10px] text-[16px] font-bold uppercase transition-all flex-1 shadow-lg shadow-accent/10"
                    >
                      <a href="#ultrapremium">Book This Service</a>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={reset} 
                      className="border-white/10 text-foreground/60 hover:bg-white/5 h-14 px-8 rounded-[10px] text-[14px] font-bold uppercase"
                    >
                      New Analysis
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-10">
                  <div className="w-16 h-16 rounded-[24px] bg-[#A6788A]/10 flex items-center justify-center border border-[#A6788A]/20">
                    <Sparkles className="h-6 w-6 text-[#A6788A]" />
                  </div>
                  <h3 className="text-3xl font-heading text-foreground tracking-tight leading-tight uppercase italic">
                    Unlock Your <br />
                    <span className="text-accent font-light">Individual Signature</span>
                  </h3>
                  <p className="text-xs text-foreground/40 leading-loose tracking-widest font-light uppercase">
                    EVERY PORTRAIT REVEALS A UNIQUE GEOMETRY. OUR ARTIFICIAL INTELLIGENCE ANALYZES THE SYMMETRY OF YOUR FEATURES TO SUGGEST TREATMENTS THAT ENHANCE YOUR NATURAL GRACE.
                  </p>
                  <ul className="space-y-6">
                    {[
                      "Anatomical Symmetry Analysis",
                      "Chromological Undertone Mapping",
                      "Bespoke Ritual Selection"
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-6 group">
                        <div className="w-2 h-2 rounded-full bg-accent/30 group-hover:scale-150 group-hover:bg-accent transition-all"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/60">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
