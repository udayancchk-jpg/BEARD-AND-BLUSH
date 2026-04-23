import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Loader2, Sparkles, User, Phone as PhoneIcon, Mail as MailIcon, Scissors, MessageSquare } from 'lucide-react';
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SALON_SERVICES, SPA_SERVICES } from '@/lib/constants';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
  service: z.string().min(1, { message: "Please select a service." }),
  date: z.date().nullable().refine((val) => val !== null, { message: "Please select a date." }),
  timeSlot: z.string().min(1, { message: "Please select a time slot." }),
  notes: z.string().optional(),
});

const ALL_SERVICES = [...SPA_SERVICES, ...SALON_SERVICES];

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

export default function BookingSystem() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastBooking, setLastBooking] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      service: "",
      notes: "",
      timeSlot: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const bookingData = {
        ...values,
        date: format(values.date as Date, 'yyyy-MM-dd'),
        status: 'pending',
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'bookings'), bookingData);
      setLastBooking(values);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ultrapremium" className="py-64 bg-[#121212] relative overflow-hidden">
      {/* Cinematic background with vignette and glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2C0A2E]/30 via-[#121212] to-[#2C0A2E]/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(44,10,46,0.15)_0%,_transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#121212] to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent/30"></div>
              <span className="text-accent font-bold tracking-[0.6em] uppercase text-[10px]">
                Reservation Suite
              </span>
              <div className="w-12 h-[1px] bg-accent/30"></div>
            </div>
            <h2 className="text-5xl md:text-8xl font-heading mb-8 text-foreground uppercase tracking-tight">
              Ultra <span className="italic font-light text-accent">Premium</span>
            </h2>
            <p className="text-[11px] text-foreground/40 tracking-[0.5em] uppercase font-bold italic">
              "Your experience begins with elegance."
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              <div className="bg-[#1C071D]/40 backdrop-blur-3xl rounded-[32px] border border-white/5 luxury-shadow overflow-hidden">
                <div className="grid lg:grid-cols-2 divide-x divide-white/5">
              
              {/* Left Column: Date & Time Selection */}
              <div className="p-12 md:p-20 bg-[#2C0A2E]/10 flex flex-col">
                <div className="mb-12 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl border border-accent/20 flex items-center justify-center text-accent bg-accent/5">
                    <CalendarIcon className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading text-accent tracking-wide uppercase">Select <span className="italic">Date</span></h3>
                    <p className="text-[9px] text-foreground/40 uppercase tracking-[0.3em] font-light mt-1">Choose your moment of rejuvenation</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <div className="mb-16">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            isBefore(date, startOfToday()) || isBefore(date, new Date("1900-01-01"))
                          }
                          className="p-6 rounded-3xl bg-[#121212]/30 border border-white/5 mx-auto shadow-2xl"
                          classNames={{
                            head_cell: "text-foreground/30 font-bold text-[9px] uppercase tracking-[0.3em] w-12 pb-4",
                            cell: "h-12 w-12 text-center text-sm p-0 relative",
                            day: cn(
                              "h-10 w-10 p-0 font-light aria-selected:opacity-100 uppercase tracking-widest text-[10px] rounded-full mx-auto hover:bg-accent/10 hover:text-accent transition-all duration-300"
                            ),
                            day_selected: "bg-accent !text-secondary font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]",
                            day_today: "text-accent font-bold",
                          }}
                        />
                        <FormMessage className="text-[10px] text-accent mt-4 text-center" />
                      </div>
                    )}
                  />

                  <div>
                    <div className="mb-8 flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl border border-accent/20 flex items-center justify-center text-accent bg-accent/5">
                        <Clock className="h-5 w-5 stroke-[1.5]" />
                      </div>
                      <h3 className="text-xl font-heading text-accent tracking-wide uppercase">Arrival <span className="italic">Time</span></h3>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => (
                        <motion.button
                          key={slot}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => form.setValue("timeSlot", slot)}
                          className={cn(
                            "py-3 rounded-xl text-[8px] font-bold uppercase tracking-[0.2em] border transition-all duration-500",
                            form.watch("timeSlot") === slot
                              ? "bg-accent text-secondary border-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                              : "bg-[#121212]/30 text-foreground/40 border-white/5 hover:border-accent/40"
                          )}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                    <FormMessage className="text-[10px] text-accent mt-4" />
                  </div>
                </div>
              </div>

              {/* Right Column: User Details */}
              <div className="p-12 md:p-20 bg-[#121212]/20">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-16 flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl border border-accent/20 flex items-center justify-center text-accent bg-accent/5">
                          <User className="h-5 w-5 stroke-[1.5]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-heading text-accent tracking-wide uppercase">Digital <span className="italic">Identity</span></h3>
                          <p className="text-[9px] text-foreground/40 uppercase tracking-[0.3em] font-light mt-1">Register your presence in our sanctuary</p>
                        </div>
                      </div>

                      <div className="space-y-10">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2 mb-4">
                                  <User className="h-3 w-3 text-accent" />
                                  <FormLabel className="text-[9px] uppercase tracking-[0.4em] font-bold text-foreground/30">Identification</FormLabel>
                                </div>
                                <FormControl>
                                  <Input 
                                    placeholder="Your Elite Name" 
                                    {...field} 
                                    className="rounded-2xl border border-white/5 bg-[#121212]/40 focus:ring-1 focus:ring-accent/50 focus:border-accent/50 h-16 px-6 text-foreground placeholder:text-foreground/5 text-xs font-light transition-all shadow-inner" 
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px] text-accent" />
                              </FormItem>
                            )}
                          />

                          <div className="grid md:grid-cols-2 gap-10">
                            <FormField
                              control={form.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex items-center gap-2 mb-4">
                                    <PhoneIcon className="h-3 w-3 text-accent" />
                                    <FormLabel className="text-[9px] uppercase tracking-[0.4em] font-bold text-foreground/30">Secure Line</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Input placeholder="+91 00000 00000" {...field} className="rounded-2xl border border-white/5 bg-[#121212]/40 focus:ring-1 focus:ring-accent/50 focus:border-accent/50 h-16 px-6 text-foreground placeholder:text-foreground/5 text-xs font-light transition-all shadow-inner" />
                                  </FormControl>
                                  <FormMessage className="text-[10px] text-accent" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex items-center gap-2 mb-4">
                                    <MailIcon className="h-3 w-3 text-accent" />
                                    <FormLabel className="text-[9px] uppercase tracking-[0.4em] font-bold text-foreground/30">Digital Mail</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Input placeholder="name@domain.com" {...field} className="rounded-2xl border border-white/5 bg-[#121212]/40 focus:ring-1 focus:ring-accent/50 focus:border-accent/50 h-16 px-6 text-foreground placeholder:text-foreground/5 text-xs font-light transition-all shadow-inner" />
                                  </FormControl>
                                  <FormMessage className="text-[10px] text-accent" />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2 mb-4">
                                  <Scissors className="h-3 w-3 text-accent" />
                                  <FormLabel className="text-[9px] uppercase tracking-[0.4em] font-bold text-foreground/30">The Ritual</FormLabel>
                                </div>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="rounded-2xl border border-white/5 bg-[#121212]/40 focus:ring-1 focus:ring-accent/50 focus:border-accent/50 h-16 px-6 text-foreground text-xs font-light transition-all shadow-inner">
                                      <SelectValue placeholder="Selection slot" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-2xl border-white/10 bg-[#1C071D] text-foreground border">
                                    {ALL_SERVICES.map(s => <SelectItem key={s.id} value={s.title} className="focus:bg-accent focus:text-secondary tracking-widest text-[9px] uppercase py-4 cursor-pointer">{s.title}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-[10px] text-accent" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2 mb-4">
                                  <MessageSquare className="h-3 w-3 text-accent" />
                                  <FormLabel className="text-[9px] uppercase tracking-[0.4em] font-bold text-foreground/30">Bespoke Requests</FormLabel>
                                </div>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us how to tailor your transformation..." 
                                    {...field} 
                                    className="rounded-2xl border border-white/5 bg-[#121212]/40 focus:ring-1 focus:ring-accent/50 focus:border-accent/50 px-6 py-5 text-foreground placeholder:text-foreground/5 text-xs font-light transition-all shadow-inner min-h-[140px] resize-none" 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div className="pt-8">
                            <Button 
                              type="submit" 
                              disabled={isLoading}
                              className="w-full rounded-2xl bg-accent hover:bg-accent/90 text-secondary h-20 text-[11px] font-bold uppercase tracking-[0.6em] transition-all duration-700 disabled:opacity-50 luxury-shadow group relative overflow-hidden"
                            >
                              <motion.div 
                                className="absolute inset-0 bg-white/20 skew-x-[-20deg] -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"
                              />
                              {isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing Request...
                                </>
                              ) : (
                                <span className="flex items-center justify-center gap-4 relative z-10">
                                  Complete Reservation
                                  <Sparkles className="h-4 w-4 animate-pulse" />
                                </span>
                              )}
                            </Button>
                            
                            <p className="text-center mt-10 text-[9px] text-foreground/20 tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-4">
                              <span className="w-8 h-[1px] bg-white/5"></span>
                              Exclusive Access
                              <span className="w-8 h-[1px] bg-white/5"></span>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      className="h-full flex flex-col items-center justify-center text-center py-10 px-6 sm:py-20 sm:px-8 relative overflow-hidden"
                    >
                      {/* Success Sparkles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 0.4, 0], 
                            scale: [0, 1.5, 0.5],
                            y: [0, -100 - Math.random() * 100],
                            x: [(Math.random() - 0.5) * 200]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            delay: i * 0.5,
                            ease: "easeOut"
                          }}
                          className="absolute text-accent"
                          style={{ top: '50%' }}
                        >
                          <Sparkles size={16 + Math.random() * 10} />
                        </motion.div>
                      ))}

                      <div className="w-32 h-32 rounded-full border-2 border-accent/30 bg-accent/5 flex items-center justify-center mb-12 relative shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                        <motion.div 
                          className="absolute inset-0 bg-accent/10 blur-3xl rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        ></motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle2 className="h-16 w-16 text-accent relative z-10" />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-3xl sm:text-4xl font-heading mb-4 text-foreground uppercase tracking-tight">
                          Ritual <span className="italic text-accent">Confirmed</span>
                        </h3>
                        <p className="text-[10px] text-accent tracking-[0.4em] uppercase font-bold mb-8">
                          Welcome to the Sanctuary, {lastBooking?.fullName?.split(' ')[0]}
                        </p>
                      </motion.div>

                      {/* Confirmation Details Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 backdrop-blur-md relative group"
                      >
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Scissors className="w-12 h-12 text-white rotate-45" />
                         </div>
                         <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                               <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 font-bold">Service</span>
                               <span className="text-xs font-medium text-accent uppercase tracking-widest">{lastBooking?.service}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                               <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 font-bold">Appointment</span>
                               <div className="text-right">
                                  <div className="text-xs font-medium text-foreground uppercase tracking-widest">
                                    {lastBooking?.date ? format(lastBooking.date as Date, 'MMMM dd, yyyy') : ''}
                                  </div>
                                  <div className="text-[10px] text-accent/60 uppercase tracking-widest mt-1 italic">
                                    at {lastBooking?.timeSlot}
                                  </div>
                               </div>
                            </div>
                         </div>
                      </motion.div>

                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-foreground/40 text-[9px] mb-12 max-w-xs leading-loose font-light italic tracking-[0.3em] uppercase"
                      >
                        "A consultant will contact you via your secure line shortly to finalize your bespoke experience."
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                      >
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => {
                            setIsSubmitted(false);
                            form.reset();
                            setLastBooking(null);
                          }}
                          className="rounded-2xl px-12 border-accent/20 text-accent hover:bg-accent hover:text-secondary uppercase tracking-[0.4em] text-[9px] h-14 transition-all duration-700 bg-transparent flex items-center gap-4 group"
                        >
                          New Reservation
                          <Sparkles className="h-3 w-3 group-hover:animate-spin" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  </div>
</section>
  );
}
