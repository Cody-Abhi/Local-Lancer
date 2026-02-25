"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Heart, 
  ChevronDown, 
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { mockUsers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function FreelancersPage() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto pb-20">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-primary fill-current" />
          <h1 className="text-5xl font-black italic tracking-tighter text-white">
            TOP <span className="text-primary">TALENT</span> LUCKNOW
          </h1>
        </div>
        <p className="text-muted-foreground text-xl font-medium max-w-2xl">
          Connect with verified local experts within <span className="text-primary font-bold">50km</span> of your neighborhood.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-6">
        <div className="relative group max-w-4xl">
          <Input 
            placeholder="Search for skills (React, Design, Content)..." 
            className="h-20 pl-16 pr-40 bg-card/40 border-primary/10 text-white text-xl font-bold rounded-[1.5rem] focus:ring-primary/50 shadow-2xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-6 top-7 w-7 h-7 text-primary" />
          <Button 
            className="absolute right-3 top-3 h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest rounded-2xl shadow-xl shadow-primary/20"
          >
            Find Pros
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <FilterButton label="Expertise" />
            <FilterButton label="Experience" />
            <Badge className="bg-primary/10 text-primary border border-primary/30 h-12 px-6 flex items-center gap-3 rounded-full cursor-pointer hover:bg-primary/20 transition-all font-black text-xs tracking-widest uppercase">
              Radius: &lt; 20km
              <X className="w-4 h-4" />
            </Badge>
            <FilterButton label="Budget Range" />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">SORT BY</span>
            <button className="bg-secondary/40 border border-border/50 px-5 py-3 rounded-2xl text-primary font-black flex items-center gap-2 hover:bg-secondary/60 transition-all text-xs tracking-widest uppercase">
              Recommended
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockUsers.map((user) => (
          <Card 
            key={user.id} 
            className="bg-card/40 border border-border/50 hover:border-primary/50 transition-all group overflow-hidden rounded-[2.5rem] shadow-2xl"
          >
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-5">
                  <div className="relative">
                    <Avatar className="w-20 h-20 ring-4 ring-primary/10 rounded-[1.5rem]">
                      <AvatarImage src={user.avatar} className="object-cover" />
                      <AvatarFallback className="rounded-[1.5rem] text-xl font-black">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-primary p-1.5 rounded-xl shadow-lg ring-4 ring-card">
                        <ShieldCheck className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-2xl italic tracking-tight text-white group-hover:text-primary transition-colors">{user.name}</h3>
                    </div>
                    <p className="text-sm text-primary font-black uppercase tracking-[0.2em] italic">
                      {user.id === 'f1' ? 'Senior React Dev' : 
                       user.id === 'f2' ? 'UI/UX Lead' :
                       user.id === 'f3' ? 'Full Stack Eng' :
                       user.id === 'f4' ? 'WP Specialist' :
                       user.id === 'f5' ? 'Mobile App Pro' : 'SEO Strategist'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-primary font-black text-lg">
                    <Star className="w-5 h-5 fill-current" />
                    {user.rating}
                  </div>
                  <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mt-1">
                    120 REVIEWS
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-8">
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-secondary/60 text-muted-foreground border-none text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between p-5 bg-secondary/30 rounded-[1.5rem] border border-border/50">
                <div>
                  <div className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-1">BASE RATE</div>
                  <div className="text-3xl font-black italic tracking-tighter text-white">
                    ₹{user.id === 'f1' ? '800' : 
                      user.id === 'f2' ? '1200' :
                      user.id === 'f3' ? '650' :
                      user.id === 'f4' ? '500' :
                      user.id === 'f5' ? '1500' : '900'}
                    <span className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">/HR</span>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] tracking-widest flex items-center gap-2 px-4 py-2 rounded-xl">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.id === 'f1' ? '1.5' : 
                   user.id === 'f2' ? '3.2' :
                   user.id === 'f3' ? '8.4' :
                   user.id === 'f4' ? '5.1' :
                   user.id === 'f5' ? '12' : '4.5'} KM
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0 flex gap-4">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest h-16 rounded-2xl shadow-xl shadow-primary/10 transition-transform active:scale-95"
              >
                Hire Expert
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className={cn(
                  "w-16 h-16 rounded-2xl bg-secondary hover:bg-secondary/80 transition-all border border-border/50",
                  favorites.includes(user.id) && "text-red-500"
                )}
                onClick={() => toggleFavorite(user.id)}
              >
                <Heart className={cn("w-6 h-6", favorites.includes(user.id) && "fill-current")} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-12">
        <PaginationButton icon={<ChevronLeft className="w-6 h-6" />} />
        <PaginationButton label="1" active />
        <PaginationButton label="2" />
        <PaginationButton label="3" />
        <span className="text-muted-foreground font-black px-4">...</span>
        <PaginationButton icon={<ChevronRight className="w-6 h-6" />} />
      </div>
    </div>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <Button 
      variant="outline" 
      className="h-12 px-6 rounded-2xl bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50 font-black text-xs tracking-widest uppercase"
    >
      {label}
      <ChevronDown className="w-4 h-4 ml-3 text-primary" />
    </Button>
  );
}

function PaginationButton({ label, icon, active }: { label?: string, icon?: React.ReactNode, active?: boolean }) {
  return (
    <Button 
      variant={active ? "default" : "ghost"}
      className={cn(
        "w-14 h-14 p-0 rounded-2xl font-black text-sm",
        active ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-muted-foreground hover:bg-card border border-border/50"
      )}
    >
      {label || icon}
    </Button>
  );
}