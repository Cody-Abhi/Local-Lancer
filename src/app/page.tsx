import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ShieldCheck, Zap, Globe, MessageSquare, CreditCard, ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-white font-black text-xl italic">L</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white italic">LucknowLink</span>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            <Link href="#features" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="/dashboard/jobs" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Find Work</Link>
            <Link href="/dashboard/freelancers" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Pros</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-xs font-black uppercase tracking-widest hover:bg-white/5">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest px-8 rounded-xl shadow-xl shadow-primary/10">
                Join Platform
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/5 text-primary text-[10px] font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <MapPin className="w-3.5 h-3.5" />
            Hyper-Local Lucknow Marketplace
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl leading-[0.9] text-white italic">
            HIRE LUCKNOW'S <span className="text-primary not-italic">ELITE</span> TALENT
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mb-12 font-medium leading-relaxed">
            The dedicated platform for Uttar Pradesh's capital. Connect with trusted local experts within <span className="text-primary font-bold">50km</span> of your neighborhood.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
            <Link href="/signup" className="flex-1">
              <Button size="lg" className="w-full bg-primary text-white hover:bg-primary/90 h-20 text-xl font-black uppercase italic tracking-widest rounded-2xl shadow-2xl shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
                Start Now <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>

          <div className="mt-24 relative w-full max-w-6xl aspect-[21/9] rounded-[3rem] border border-white/5 bg-card/50 overflow-hidden shadow-[0_0_100px_rgba(255,140,43,0.1)] group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img 
              src="https://picsum.photos/seed/lucknow_city_hero/1600/800" 
              alt="LucknowLink Interface" 
              className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-[3000ms] group-hover:scale-110"
              data-ai-hint="Lucknow skyline"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
               <div className="p-10 bg-card/80 border border-white/10 rounded-[2rem] shadow-2xl max-w-md text-left backdrop-blur-2xl">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shadow-inner">
                       <Zap className="text-primary w-7 h-7 fill-current" />
                    </div>
                    <div>
                       <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">AI Matching Engaged</div>
                       <div className="text-xl font-black italic text-white">124 Matches in Gomti Nagar</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-3/4 animate-pulse" />
                     </div>
                     <div className="flex justify-between items-center">
                        <div className="flex -space-x-3">
                           {[1,2,3,4].map(i => (
                             <div key={i} className="w-10 h-10 rounded-full border-4 border-card bg-secondary" />
                           ))}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pros available now</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-secondary/20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-6">LUCKNOW EXCLUSIVE <span className="text-primary not-italic">POWER</span></h2>
            <div className="h-1.5 w-24 bg-primary rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MapPin className="w-8 h-8 text-primary" />}
              title="Geo-Fence Search"
              description="Precisely target Lucknow neighborhoods like Aliganj, Hazratganj, and Gomti Nagar within 50km."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="DPDP Security"
              description="Privacy built-in from the ground up, compliant with the 2023 Digital Personal Data Protection Act."
            />
            <FeatureCard 
              icon={<Star className="w-8 h-8 text-primary fill-current" />}
              title="Verified Pros"
              description="Manual and AI-assisted verification of local identity and professional skillsets."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-8 h-8 text-primary" />}
              title="Real-time Chat"
              description="Instant communication with local context, including AI-powered language translation tools."
            />
            <FeatureCard 
              icon={<CreditCard className="w-8 h-8 text-primary" />}
              title="Escrow Payments"
              description="Safe digital holding accounts that protect both client funds and freelancer earnings."
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-primary" />}
              title="Lucknow Network"
              description="Join a thriving community of local businesses and world-class digital professionals."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm italic">L</span>
            </div>
            <span className="text-xl font-black italic text-white tracking-tight">LucknowLink</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em]">
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="hover:text-primary transition-colors">KYC Policy</Link>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest">© 2025 LucknowLink. Built for Uttar Pradesh.</div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card/40 border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2rem] overflow-hidden group hover:shadow-[0_0_50px_rgba(255,140,43,0.05)]">
      <CardContent className="p-10 flex flex-col items-start">
        <div className="w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-inner">
          {icon}
        </div>
        <h3 className="text-2xl font-black italic text-white mb-4 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground font-medium leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
