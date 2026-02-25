"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MapPin, Star, ShieldCheck, Award, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { optimizeProfile, ProfileOptimizationOutput } from '@/ai/flows/profile-optimization-tips';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState<ProfileOptimizationOutput | null>(null);

  const [profileData, setProfileData] = useState({
    bio: "I am a web developer based in Gomti Nagar, Lucknow. I build React apps and specialized in e-commerce sites.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    portfolio: "Built 5 sites for local shops including a bakery and a hardware store."
  });

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const res = await optimizeProfile({
        currentProfileDescription: profileData.bio,
        skills: profileData.skills,
        portfolioSummary: profileData.portfolio,
        targetJobTypes: "High-end e-commerce development"
      });
      setTips(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary/10">
              <AvatarImage src="https://picsum.photos/seed/rahul/200/200" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-primary p-1.5 rounded-full ring-4 ring-background">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Rahul Sharma</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              Gomti Nagar, Lucknow
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-sm font-bold">
                <Star className="w-4 h-4 fill-current" />
                4.8
              </div>
              <div className="text-sm font-medium text-primary uppercase tracking-wider">Top Rated</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
           <Button className="bg-primary hover:bg-primary/90">Edit Profile</Button>
           <Button variant="outline" onClick={handleOptimize} disabled={loading}>
             {loading ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
             Get AI Suggestions
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Bio Section */}
          <Card className="bg-card border-primary/5">
            <CardHeader>
              <CardTitle>Professional Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={profileData.bio} 
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                className="min-h-[120px] bg-secondary/20"
              />
            </CardContent>
          </Card>

          {/* AI Suggestions Box */}
          {tips && (
            <Card className="bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-primary flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Profile Optimization Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider opacity-70">General Recommendations</h4>
                    <ul className="space-y-1">
                       {tips.overallRecommendations.map((rec, i) => (
                         <li key={i} className="text-sm flex items-start gap-2">
                           <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                           {rec}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold opacity-70">Biography Refinements</h4>
                      <p className="text-xs text-muted-foreground italic">{tips.profileDescriptionSuggestions[0]}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold opacity-70">Skills to Add</h4>
                      <div className="flex flex-wrap gap-1">
                        {tips.skillSuggestions.slice(0, 3).map((s, i) => <Badge key={i} variant="outline" className="text-[10px]">{s}</Badge>)}
                      </div>
                    </div>
                 </div>
              </CardContent>
            </Card>
          )}

          {/* Portfolio Section */}
          <Card className="bg-card border-primary/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Portfolio Highlights</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80"><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <PortfolioCard 
                   title="Local Bakery Site" 
                   image="https://picsum.photos/seed/bakery/400/250" 
                   tags={["E-commerce", "Shopify"]} 
                 />
                 <PortfolioCard 
                   title="Hardware Store POS" 
                   image="https://picsum.photos/seed/store/400/250" 
                   tags={["React", "Inventory"]} 
                 />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           {/* Profile Stats */}
           <Card className="bg-card border-primary/5">
             <CardHeader>
               <CardTitle className="text-lg">Profile Strength</CardTitle>
               <CardDescription>Increase visibility in Lucknow search results</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span className="font-bold">85%</span>
                   </div>
                   <Progress value={85} className="h-2" />
                </div>
                <div className="pt-4 space-y-3">
                   <StatItem label="Jobs Completed" value="12" />
                   <StatItem label="Client Satisfaction" value="98%" />
                   <StatItem label="Repeat Clients" value="4" />
                </div>
             </CardContent>
           </Card>

           {/* Skills Section */}
           <Card className="bg-card border-primary/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Verified Skills</CardTitle>
                <Award className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                 <div className="flex flex-wrap gap-2">
                    {profileData.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 bg-secondary text-foreground border border-border">
                        {skill}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="px-3 py-1 border-dashed cursor-pointer hover:bg-secondary">
                      + Add New
                    </Badge>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ title, image, tags }: { title: string, image: string, tags: string[] }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-secondary/10 hover:border-primary/30 transition-all">
       <div className="aspect-video overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
       </div>
       <div className="p-4">
          <h4 className="font-bold mb-2">{title}</h4>
          <div className="flex flex-wrap gap-1">
             {tags.map(t => <span key={t} className="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded border">{t}</span>)}
          </div>
       </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-sm py-2 border-b border-border last:border-0">
       <span className="text-muted-foreground">{label}</span>
       <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}