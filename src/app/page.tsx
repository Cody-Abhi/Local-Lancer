import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Briefcase, 
  Search, 
  Percent, 
  IndianRupee, 
  CheckCircle,
  Globe,
  Plus
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0C14] text-white selection:bg-primary/30 font-body">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0C14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-3">
              <span className="text-white font-black text-lg italic">L</span>
            </div>
            <span className="text-xl font-black tracking-tighter italic text-white">LucknowLink</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Find Work</Link>
            <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Hire Freelancers</Link>
            <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Why Us</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-secondary/30 px-4 py-2 rounded-full border border-white/5">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Lucknow, UP</span>
              <div className="w-4 h-4 rounded-full bg-secondary/50 flex items-center justify-center ml-2">
                <Globe className="w-2 h-2 text-white" />
              </div>
            </div>
            <Link href="/login">
              <Button variant="ghost" className="text-[11px] font-black uppercase tracking-widest hover:bg-white/5 px-6">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest px-8 rounded-xl h-11 text-xs">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-48 pb-32">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live opportunities in your 50km radius
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] italic">
              Find Local <br />
              Developers in <br />
              <span className="text-primary not-italic">Lucknow</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-lg font-medium leading-relaxed">
              Connect with top talent from Gomti Nagar to Alambagh. Verified professionals, secure INR payments, and local support right in your neighborhood.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 h-16 px-10 text-sm font-black uppercase italic tracking-widest rounded-2xl shadow-2xl shadow-primary/20 transition-transform active:scale-95">
                  Hire Local Talent
                </Button>
              </Link>
              <Link href="/dashboard/jobs">
                <Button size="lg" variant="secondary" className="bg-secondary/30 text-white hover:bg-secondary/50 h-16 px-10 text-sm font-black uppercase italic tracking-widest rounded-2xl border border-white/5">
                  Find Work
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <Avatar key={i} className="w-10 h-10 border-4 border-[#0A0C14] rounded-full">
                    <AvatarImage src={`https://picsum.photos/seed/${i+100}/100/100`} />
                  </Avatar>
                ))}
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                Trusted by 2,000+ Lucknow locals
              </p>
            </div>
          </div>

          {/* Hero Illustration: Map */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity" />
            <Card className="relative bg-[#1A1D2B]/40 border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
              <CardContent className="p-10">
                <div className="relative aspect-square w-full">
                  <img 
                    src="https://picsum.photos/seed/lucknow_map_hero/800/800" 
                    alt="Lucknow Map Illustration" 
                    className="w-full h-full object-contain opacity-60 grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000"
                    data-ai-hint="Lucknow city map"
                  />
                  {/* Map Hotspots */}
                  <div className="absolute top-[20%] left-[30%] w-4 h-4 bg-primary rounded-full ring-8 ring-primary/20 animate-bounce" />
                  <div className="absolute bottom-[40%] right-[20%] w-3 h-3 bg-primary rounded-full ring-8 ring-primary/20" />
                  <div className="absolute bottom-[10%] left-[50%] w-3 h-3 bg-primary rounded-full ring-8 ring-primary/20" />
                </div>

                <div className="mt-8 bg-[#0A0C14]/60 p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-secondary/50 rounded-xl flex items-center justify-center">
                      <IndianRupee className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Recent Activity</div>
                      <div className="text-sm font-bold text-white italic">Amit S. hired a React Dev</div>
                      <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">2 minutes ago • Hazratganj</div>
                    </div>
                  </div>
                  <div className="text-xs font-black text-primary animate-pulse italic uppercase tracking-widest">Live</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nearby Opportunities */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0A0C14]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black italic tracking-tight text-white mb-2">Nearby Opportunities</h2>
              <p className="text-muted-foreground font-medium">Fresh jobs posted within 50km of Lucknow</p>
            </div>
            <Link href="/dashboard/jobs" className="text-[11px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2">
              View all jobs <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <JobCard 
              title="E-commerce Setup"
              location="Gomti Nagar • 2km away"
              description="Looking for a Shopify expert to set up an online store for my traditional Chikankari clothing shop."
              budget="₹15,000"
              type="Fixed"
              icon={<Plus className="w-5 h-5 text-orange-500" />}
            />
            <JobCard 
              title="React Developer"
              location="Indira Nagar • 5km away"
              description="EdTech startup needs a frontend developer for 20hrs/week. Must know React and Tailwind CSS."
              budget="₹25,000"
              type="Part-time"
              suffix="/mo"
              icon={<Briefcase className="w-5 h-5 text-blue-500" />}
            />
            <JobCard 
              title="UI Design for App"
              location="Hazratganj • 3km away"
              description="Need a modern UI design for a local food delivery app aggregation platform. Mobile first."
              budget="₹8,000"
              type="Fixed"
              icon={<Star className="w-5 h-5 text-purple-500" />}
            />
          </div>
        </div>
      </section>

      {/* Why Choose LucknowLink */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FF8C2B]/5 opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-6">Why Choose LucknowLink?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-20 font-medium">Built for our community, understanding our local needs better than global platforms.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyCard 
              icon={<Percent className="w-8 h-8 text-primary" />}
              title="Lowest Fees (5%)"
              description="Keep more of what you earn. We charge only 5% commission compared to 20% on global platforms."
            />
            <WhyCard 
              icon={<IndianRupee className="w-8 h-8 text-primary" />}
              title="Direct INR Payments"
              description="No forex fees or conversion hassle. Get paid directly to your Indian bank account or UPI instantly."
            />
            <WhyCard 
              icon={<CheckCircle className="w-8 h-8 text-primary" />}
              title="Local Verification"
              description="We physically verify businesses and freelancers, ensuring trust and reducing scams significantly."
            />
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-black italic tracking-tight text-white">Top Freelancers in Lucknow</h2>
            <Link href="/dashboard/freelancers" className="text-[11px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2">
              View all talent <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FreelancerCard 
              name="Priya Singh" 
              role="Content Writer" 
              location="Aliganj, Lucknow" 
              rating={4.9} 
              jobs={42} 
              avatar="https://picsum.photos/seed/priya_home/200/200" 
            />
            <FreelancerCard 
              name="Rahul Verma" 
              role="Graphic Designer" 
              location="Mahanagar, Lucknow" 
              rating={5.0} 
              jobs={28} 
              avatar="https://picsum.photos/seed/rahul_home/200/200" 
            />
            <FreelancerCard 
              name="Arjun Kapoor" 
              role="Full Stack Dev" 
              location="Jankipuram, Lucknow" 
              rating={4.8} 
              jobs={15} 
              avatar="https://picsum.photos/seed/arjun_home/200/200" 
            />
            <FreelancerCard 
              name="Sarah Khan" 
              role="Digital Marketer" 
              location="Chowk, Lucknow" 
              rating={4.9} 
              jobs={56} 
              avatar="https://picsum.photos/seed/sarah_home/200/200" 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-[#0A0C14]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-3">
                <span className="text-white font-black text-lg italic">L</span>
              </div>
              <span className="text-xl font-black tracking-tighter italic text-white">LucknowLink</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Connecting Lucknow's talent with local businesses. Made with ❤️ in UP.
            </p>
          </div>

          <FooterColumn 
            title="For Clients" 
            links={['Post a Job', 'Find Freelancers', 'Enterprise Solutions']} 
          />
          <FooterColumn 
            title="For Freelancers" 
            links={['Find Work', 'Create Profile', 'Success Stories']} 
          />
          <FooterColumn 
            title="Support" 
            links={['Help Center', 'Trust & Safety', 'Contact Us']} 
          />
        </div>

        <div className="container mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            © 2025 LucknowLink. All rights reserved.
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function JobCard({ title, location, description, budget, type, icon, suffix = '' }: { 
  title: string, 
  location: string, 
  description: string, 
  budget: string, 
  type: string,
  icon: React.ReactNode,
  suffix?: string
}) {
  return (
    <Card className="bg-[#1A1D2B]/40 border-white/5 hover:border-primary/50 transition-all group rounded-[2rem] overflow-hidden">
      <CardContent className="p-8 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
            {icon}
          </div>
          <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-widest px-3 py-1">
            {type}
          </Badge>
        </div>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-4">{location}</p>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-8 pt-0 flex items-center justify-between mt-4">
        <div className="text-xl font-black text-white italic tracking-tighter">
          {budget}<span className="text-[10px] text-muted-foreground font-black uppercase ml-1">{suffix}</span>
        </div>
        <Button variant="link" className="text-primary p-0 h-auto font-black uppercase tracking-widest text-[10px] hover:no-underline">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

function WhyCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-transparent border-none shadow-none text-center">
      <CardContent className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-[2rem] bg-secondary/30 flex items-center justify-center border border-white/5 shadow-inner">
          {icon}
        </div>
        <h3 className="text-xl font-black italic tracking-tight text-white">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[250px] font-medium mx-auto">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function FreelancerCard({ name, role, location, rating, jobs, avatar }: { 
  name: string, 
  role: string, 
  location: string, 
  rating: number, 
  jobs: number, 
  avatar: string 
}) {
  return (
    <Card className="bg-[#1A1D2B]/40 border-white/5 hover:border-primary/50 transition-all text-center rounded-[2.5rem] overflow-hidden p-8 group">
      <div className="relative mx-auto mb-6">
        <Avatar className="w-24 h-24 rounded-full border-4 border-[#0A0C14] ring-2 ring-primary/20 group-hover:ring-primary transition-all">
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback className="font-black">{name[0]}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0A0C14]" />
      </div>
      <h3 className="text-lg font-black text-white italic mb-1">{name}</h3>
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{role}</p>
      <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest mb-6">{location}</p>
      
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-1.5 text-xs font-black text-white">
          <Star className="w-3 h-3 text-primary fill-current" />
          {rating.toFixed(1)}
        </div>
        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          ({jobs} jobs)
        </div>
      </div>
      
      <Button className="w-full h-11 bg-secondary/50 hover:bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all">
        View Profile
      </Button>
    </Card>
  );
}

function FooterColumn({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{title}</h4>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link}>
            <Link href="#" className="text-[10px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
