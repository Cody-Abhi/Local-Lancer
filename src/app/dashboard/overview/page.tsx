"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  TrendingUp, 
  Wallet, 
  Briefcase, 
  ChevronRight, 
  Smartphone, 
  Code,
  Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import { useFirestore, useUser, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, query, limit } from 'firebase/firestore';

const chartData = [
  { name: 'Mon', views: 300 },
  { name: 'Tue', views: 500 },
  { name: 'Wed', views: 400 },
  { name: 'Thu', views: 850 },
  { name: 'Fri', views: 700 },
  { name: 'Sat', views: 1100 },
  { name: 'Sun', views: 950 },
];

export default function DashboardOverview() {
  const [isAvailable, setIsAvailable] = useState(true);
  const { user } = useUser();
  const db = useFirestore();

  const statsRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid, 'stats', 'summary');
  }, [db, user]);
  const { data: stats } = useDoc<any>(statsRef);

  const milestonesRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'milestones'), limit(5));
  }, [db, user]);
  const { data: milestones = [] } = useCollection<any>(milestonesRef);

  const displayStats = {
    earnings: stats?.totalEarnings ?? 45200,
    balance: stats?.escrowBalance ?? 12500,
    projects: stats?.activeProjectsCount ?? 3,
    views: stats?.profileViews ?? 1248
  };

  const displayMilestones = milestones.length > 0 ? milestones : [
    { id: 'm1', title: "E-commerce App UI Design", description: "Milestone 2: Wireframes & High-fidelity", progress: 75, dueDate: "Due in 2 days", type: 'design' },
    { id: 'm2', title: "React Component Library", description: "Milestone 1: Button System", progress: 30, dueDate: "Due in 5 days", type: 'dev' }
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-20">
      {/* Availability Status Card */}
      <Card className="bg-card/40 border-primary/10 shadow-2xl rounded-[2rem] overflow-hidden">
        <CardContent className="p-10 flex items-center justify-between bg-gradient-to-r from-primary/10 via-transparent to-transparent">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-primary/20 rounded-2xl shadow-xl shadow-primary/5">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-2xl italic tracking-tight text-white">Lucknow Active Status</h3>
              <p className="text-muted-foreground text-base max-w-xl font-medium leading-relaxed">
                You are currently visible to clients in <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Gomti Nagar & Hazratganj</span>. Toggle to pause new local inquiries.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-background/60 p-3 px-6 rounded-2xl border border-primary/20 shadow-inner">
            <Switch 
              checked={isAvailable} 
              onCheckedChange={setIsAvailable} 
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-sm font-black uppercase tracking-widest text-primary">{isAvailable ? 'Live Now' : 'Off Duty'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard 
          title="Total Earnings" 
          value={`₹${displayStats.earnings.toLocaleString('en-IN')}`} 
          trend="+12%" 
          icon={<TrendingUp className="w-6 h-6 text-green-500" />} 
          variant="green"
        />
        <MetricCard 
          title="Escrow Balance" 
          value={`₹${displayStats.balance.toLocaleString('en-IN')}`} 
          trend="+5%" 
          icon={<Wallet className="w-6 h-6 text-primary" />} 
          variant="blue"
        />
        <MetricCard 
          title="Active Projects" 
          value={displayStats.projects.toString()} 
          trend="0%" 
          icon={<Briefcase className="w-6 h-6 text-orange-500" />} 
          variant="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Milestones and Analytics */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/40 shadow-2xl border-none rounded-[2.5rem] p-4">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <CardTitle className="text-2xl font-black italic text-white tracking-tight">Active Milestones</CardTitle>
              <Button variant="link" className="text-primary font-black uppercase text-xs tracking-widest">Manage All</Button>
            </CardHeader>
            <CardContent className="px-6 space-y-8 pb-10">
              {displayMilestones.map((m: any) => (
                <MilestoneItem 
                  key={m.id}
                  title={m.title} 
                  description={m.description} 
                  progress={m.progress} 
                  dueDate={m.dueDate}
                  icon={m.type === 'design' ? <Smartphone className="w-6 h-6" /> : <Code className="w-6 h-6" />}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/40 shadow-2xl border-none rounded-[2.5rem] p-4">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black italic text-white tracking-tight">Profile Analytics</CardTitle>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Views from local businesses</p>
              </div>
              <div className="flex bg-secondary/50 p-1.5 rounded-2xl border border-border/50">
                <Button variant="ghost" size="sm" className="h-9 text-xs font-black px-4 rounded-xl">7D</Button>
                <Button variant="secondary" size="sm" className="h-9 text-xs font-black px-4 bg-primary text-white hover:bg-primary/90 shadow-xl rounded-xl">30D</Button>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-10">
               <div className="text-5xl font-black text-white mb-8 italic tracking-tighter">{displayStats.views.toLocaleString()}</div>
               <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <Tooltip 
                        cursor={{fill: 'rgba(255, 140, 43, 0.05)'}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card border border-primary/20 p-3 rounded-2xl shadow-2xl text-xs font-black text-primary">
                                {payload[0].value} VIEWS
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="views" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 5 ? 'hsl(var(--primary))' : 'rgba(255, 140, 43, 0.15)'} 
                          />
                        ))}
                      </Bar>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: '900'}}
                        dy={15}
                      />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Nearby Matches and Map */}
        <div className="space-y-8">
          <Card className="bg-card/40 shadow-2xl border-none rounded-[2.5rem] p-4">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <CardTitle className="text-2xl font-black italic text-white tracking-tight">Nearby Jobs</CardTitle>
              <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] tracking-widest px-3 py-1">
                LUCKNOW ONLY
              </Badge>
            </CardHeader>
            <CardContent className="px-6 space-y-6 pb-10">
              <JobMatchItem 
                title="Wordpress Developer for Café"
                location="Gomti Nagar (2.4km)"
                budget="₹8,000"
                category="WEBSITE"
                time="2h ago"
              />
              <JobMatchItem 
                title="Logo Design for Startup"
                location="Hazratganj (4.1km)"
                budget="₹3,500"
                category="DESIGN"
                time="5h ago"
              />
              <JobMatchItem 
                title="Flutter Fixes Needed"
                location="Indira Nagar (6.8km)"
                budget="₹15,000"
                category="MOBILE"
                time="1d ago"
              />
            </CardContent>
          </Card>

          {/* Map Preview Card */}
          <div className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card/40 shadow-2xl h-60">
             <img 
              src="https://picsum.photos/seed/lucknow_map_dashboard/800/600" 
              alt="Lucknow Map" 
              className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"
              data-ai-hint="Lucknow map"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex flex-col justify-end p-8">
                <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">Live Heatmap</div>
                <div className="text-white text-xl font-black italic flex items-center justify-between tracking-tight">
                   Lucknow • 12 Local Leads
                   <div className="w-12 h-12 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 flex items-center justify-center transition-transform group-hover:translate-x-2">
                      <ChevronRight className="w-6 h-6" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, variant }: { 
  title: string, 
  value: string, 
  trend: string, 
  icon: React.ReactNode,
  variant: 'green' | 'blue' | 'orange'
}) {
  return (
    <Card className="bg-card/40 border border-primary/5 shadow-2xl relative overflow-hidden group rounded-[2.5rem] transition-all hover:border-primary/20">
      <CardContent className="p-10">
        <div className="flex justify-between items-start mb-10">
          <div className="p-4 rounded-2xl bg-primary/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <Badge variant="secondary" className={cn(
            "text-[10px] font-black h-7 px-4 flex items-center gap-1.5 uppercase tracking-widest rounded-full",
            trend.startsWith('+') ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground bg-secondary/50'
          )}>
            {trend.startsWith('+') && <TrendingUp className="w-3 h-3" />}
            {trend}
          </Badge>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">{title}</p>
          <p className="text-4xl font-black tracking-tighter text-white italic">{value}</p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      </CardContent>
    </Card>
  );
}

function MilestoneItem({ title, description, progress, dueDate, icon }: { 
  title: string, 
  description: string, 
  progress: number, 
  dueDate: string,
  icon: React.ReactNode
}) {
  return (
    <div className="group border-b border-border/50 last:border-0 pb-10 last:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary shadow-inner group-hover:shadow-primary/5 group-hover:bg-secondary transition-all">
            {icon}
          </div>
          <div>
            <h4 className="font-black text-lg text-white italic tracking-tight">{title}</h4>
            <p className="text-sm text-muted-foreground font-medium">{description}</p>
          </div>
        </div>
        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1.5 rounded-full">{dueDate}</div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
          <span>COMPLETION RATE</span>
          <span className="text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3 bg-secondary/30 rounded-full" />
      </div>
    </div>
  );
}

function JobMatchItem({ title, location, budget, category, time }: { 
  title: string, 
  location: string, 
  budget: string, 
  category: string,
  time: string
}) {
  return (
    <div className="p-6 rounded-[2rem] border border-border/50 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40 transition-all group cursor-pointer shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <Badge className="text-[9px] font-black h-6 px-3 tracking-widest bg-primary/10 text-primary border-none">
          {category}
        </Badge>
        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{time}</span>
      </div>
      <h4 className="font-black text-base mb-2 group-hover:text-primary transition-colors text-white italic tracking-tight">{title}</h4>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        {location}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="font-black text-2xl text-white tracking-tighter italic">{budget}</div>
        <Button variant="link" className="text-primary font-black uppercase tracking-widest p-0 h-auto text-[10px] hover:no-underline hover:translate-x-1 transition-transform">
          Quick Apply
        </Button>
      </div>
    </div>
  );
}