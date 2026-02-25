import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ShieldCheck, Zap, Globe, MessageSquare, CreditCard, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">LucknowLink</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="/dashboard/jobs" className="text-sm font-medium hover:text-primary transition-colors">Find Jobs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Join Platform</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <MapPin className="w-3 h-3" />
            Hyper-Local Lucknow Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
            Connecting Lucknow's <span className="text-primary">Best Talent</span> with Local Opportunities
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10">
            The dedicated platform for Lucknow. Hire trusted local experts in your neighborhood with AI-powered matching and DPDP-compliant security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link href="/signup" className="flex-1">
              <Button size="lg" className="w-full bg-primary text-white hover:bg-primary/90 h-14 text-lg">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-20 relative w-full max-w-5xl aspect-video rounded-2xl border bg-card/50 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img 
              src="https://picsum.photos/seed/lucknow_map_2/1200/600" 
              alt="LucknowLink Map Interface" 
              className="w-full h-full object-cover opacity-60 grayscale"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
               <div className="p-8 bg-card border rounded-xl shadow-2xl max-w-sm text-left backdrop-blur-md bg-opacity-80">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                       <Zap className="text-primary w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-sm font-bold">AI Local Matching</div>
                       <div className="text-xs text-muted-foreground">Finding 52+ matches in Hazratganj</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                     <div className="h-3 w-full bg-muted rounded-full" />
                     <div className="h-3 w-3/4 bg-muted rounded-full" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Why LucknowLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MapPin className="text-primary" />}
              title="Geo-Targeted Search"
              description="Find work or hire talent within a specific radius of your neighborhood in Lucknow."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-primary" />}
              title="DPDP Compliant"
              description="Securing your personal data according to the Digital Personal Data Protection Act 2023."
            />
            <FeatureCard 
              icon={<Zap className="text-primary" />}
              title="AI Skill Suggestions"
              description="Our GenAI agents analyze profiles to give you the perfect local match automatically."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-primary" />}
              title="Lucknow Chat"
              description="Integrated messaging with local context and easy contact management."
            />
            <FeatureCard 
              icon={<Globe className="text-primary" />}
              title="Verified Profiles"
              description="Every freelancer goes through a verification process to ensure local authenticity."
            />
            <FeatureCard 
              icon={<CreditCard className="text-primary" />}
              title="Secure Escrow"
              description="Safe payments for Lucknow businesses using secure digital holding accounts."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">L</span>
            </div>
            <span className="font-bold text-foreground">LucknowLink</span>
          </div>
          <div className="flex gap-8">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Contact</Link>
          </div>
          <div>© 2025 LucknowLink. Built for Uttar Pradesh.</div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card border-none hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
