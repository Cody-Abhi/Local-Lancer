"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, IndianRupee, Map as MapIcon, List, Search, Sparkles, Filter } from 'lucide-react';
import { mockJobs } from '@/lib/mock-data';
import { Slider } from '@/components/ui/slider';
import { searchAlternatives } from '@/ai/flows/ai-search-alternatives';

export default function JobsPage() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [search, setSearch] = useState('');
  const [radius, setRadius] = useState([20]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAiRefine = async () => {
    if (!search) return;
    setLoadingAi(true);
    try {
      const res = await searchAlternatives({ originalQuery: search, searchType: 'job' });
      setAiSuggestions(res.suggestions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Jobs</h1>
          <p className="text-muted-foreground">Finding matching opportunities near Lucknow</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'map')} className="bg-secondary p-1 rounded-lg border">
            <TabsList className="bg-transparent h-8">
              <TabsTrigger value="list" className="flex items-center gap-2 px-3 data-[state=active]:bg-background">
                <List className="w-4 h-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2 px-3 data-[state=active]:bg-background">
                <MapIcon className="w-4 h-4" />
                Map
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      <Card className="bg-card/50 border-primary/10 overflow-hidden">
        <CardContent className="p-4 md:p-6 space-y-4">
           <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Skills, titles, or categories..." 
                  className="pl-10 h-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Radius: {radius}km</span>
                  <span className="font-medium text-primary">Lucknow Central</span>
                </div>
                <Slider 
                  value={radius} 
                  onValueChange={setRadius} 
                  max={50} 
                  step={1} 
                />
             </div>
             <Button 
               size="lg" 
               className="bg-primary hover:bg-primary/90 h-12 px-8"
               onClick={handleAiRefine}
               disabled={loadingAi}
             >
               {loadingAi ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
               AI Refine
             </Button>
           </div>

           {aiSuggestions.length > 0 && (
             <div className="flex flex-wrap items-center gap-2 pt-2 border-t mt-2">
               <span className="text-xs font-semibold text-primary uppercase tracking-wider">Try:</span>
               {aiSuggestions.map((suggestion, idx) => (
                 <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSearch(suggestion)}
                  >
                   {suggestion}
                 </Badge>
               ))}
             </div>
           )}
        </CardContent>
      </Card>

      {view === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job) => (
            <Card key={job.id} className="bg-card hover:border-primary/50 transition-all group overflow-hidden flex flex-col">
              <CardHeader className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest text-primary border-primary/20">
                    {job.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    2h ago
                  </span>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skillsRequired.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-[10px] font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t">
                  <div className="flex items-center gap-1 font-bold text-primary">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {job.budget.toLocaleString('en-IN')}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location.address}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-0">
                <Button className="w-full rounded-none h-12 bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all font-bold">
                  View Details & Apply
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="h-[600px] bg-secondary/20 border-dashed border-2 flex flex-col items-center justify-center text-center p-12">
           <MapIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
           <h3 className="text-xl font-bold mb-2 text-foreground">Interactive Lucknow Map</h3>
           <p className="text-muted-foreground max-w-sm mb-6">
             Visualize jobs across Gomti Nagar, Aliganj, Hazratganj and other regions. (Map visualization requires a Google Maps API Key).
           </p>
           <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-card p-4 rounded-xl border flex flex-col items-center">
                 <div className="text-2xl font-bold text-primary">12</div>
                 <div className="text-xs text-muted-foreground">Jobs in Gomti Nagar</div>
              </div>
              <div className="bg-card p-4 rounded-xl border flex flex-col items-center">
                 <div className="text-2xl font-bold text-primary">8</div>
                 <div className="text-xs text-muted-foreground">Jobs in Hazratganj</div>
              </div>
           </div>
        </Card>
      )}
    </div>
  );
}