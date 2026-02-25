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
  ChevronRight
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
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Top Talent in <span className="text-primary">Lucknow</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Connect with verified experts within 50km of your location.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="relative group">
          <Input 
            placeholder="Search for skills (e.g. React, UI/UX, Python)..." 
            className="h-14 pl-12 pr-32 bg-card border-none text-foreground text-lg rounded-xl focus-visible:ring-1 focus-visible:ring-primary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-4 w-6 h-6 text-muted-foreground" />
          <Button 
            className="absolute right-2 top-2 h-10 px-8 bg-primary hover:bg-primary/90 rounded-lg font-bold"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <FilterButton label="Skillset" />
            <FilterButton label="Experience" />
            <Badge className="bg-primary/10 text-primary border border-primary/30 h-10 px-4 flex items-center gap-2 rounded-full cursor-pointer hover:bg-primary/20 transition-all">
              Distance: &lt; 20km
              <X className="w-4 h-4" />
            </Badge>
            <FilterButton label="Budget" />
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <button className="text-primary font-bold flex items-center gap-1 hover:opacity-80 transition-all">
              Recommended
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUsers.map((user) => (
          <Card 
            key={user.id} 
            className="bg-card border-none hover:ring-1 hover:ring-primary/30 transition-all group overflow-hidden rounded-2xl shadow-lg"
          >
            <CardHeader className="p-6 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-primary/10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 p-0.5 rounded-full ring-2 ring-card">
                        <ShieldCheck className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{user.name}</h3>
                      {user.verified && <ShieldCheck className="w-4 h-4 text-primary fill-current" />}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {user.id === 'f1' ? 'Senior React Developer' : 
                       user.id === 'f2' ? 'UI/UX Designer' :
                       user.id === 'f3' ? 'Full Stack Engineer' :
                       user.id === 'f4' ? 'Wordpress Expert' :
                       user.id === 'f5' ? 'Mobile App Dev' : 'Content & SEO'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {user.rating}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                    (120 reviews)
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-secondary text-muted-foreground border-none text-[10px] font-bold px-3 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Starting from</div>
                  <div className="text-2xl font-black">
                    ₹{user.id === 'f1' ? '800' : 
                      user.id === 'f2' ? '1200' :
                      user.id === 'f3' ? '650' :
                      user.id === 'f4' ? '500' :
                      user.id === 'f5' ? '1500' : '900'}
                    <span className="text-sm font-normal text-muted-foreground">/hr</span>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-none font-bold text-[10px] flex items-center gap-1.5 px-3 py-1.5">
                  <MapPin className="w-3 h-3" />
                  {user.id === 'f1' ? '1.5' : 
                   user.id === 'f2' ? '3.2' :
                   user.id === 'f3' ? '8.4' :
                   user.id === 'f4' ? '5.1' :
                   user.id === 'f5' ? '12' : '4.5'} km away
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex gap-3">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl"
              >
                Direct Message
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className={cn(
                  "w-12 h-12 rounded-xl bg-secondary hover:bg-secondary/80 transition-all",
                  favorites.includes(user.id) && "text-red-500"
                )}
                onClick={() => toggleFavorite(user.id)}
              >
                <Heart className={cn("w-5 h-5", favorites.includes(user.id) && "fill-current")} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <PaginationButton icon={<ChevronLeft className="w-5 h-5" />} />
        <PaginationButton label="1" active />
        <PaginationButton label="2" />
        <PaginationButton label="3" />
        <span className="text-muted-foreground px-2">...</span>
        <PaginationButton icon={<ChevronRight className="w-5 h-5" />} />
      </div>
    </div>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <Button 
      variant="outline" 
      className="h-10 px-5 rounded-full bg-transparent border-border text-muted-foreground hover:bg-secondary/50 font-medium"
    >
      {label}
      <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
    </Button>
  );
}

function PaginationButton({ label, icon, active }: { label?: string, icon?: React.ReactNode, active?: boolean }) {
  return (
    <Button 
      variant={active ? "default" : "ghost"}
      className={cn(
        "w-10 h-10 p-0 rounded-full font-bold",
        active ? "bg-primary text-white" : "text-muted-foreground hover:bg-card"
      )}
    >
      {label || icon}
    </Button>
  );
}
