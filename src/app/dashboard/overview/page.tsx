
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  TrendingUp, 
  Wallet, 
  Briefcase, 
  ChevronRight, 
  Smartphone, 
  Code,
  Sparkles,
  Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

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

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      {/* Availability Status Card */}
      <Card className="bg-card border-primary/10 shadow-sm overflow-hidden">
        <CardContent className="p-6 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full mt-1">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Availability Status</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Toggle to show clients in <span className="font-semibold text-foreground">Lucknow & surrounding areas (50km)</span> that you are available for immediate work.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-background/50 p-2 px-4 rounded-full border border-primary/20">
            <Switch 
              checked={isAvailable} 
              onCheckedChange={setIsAvailable} 
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-sm font-bold">{isAvailable ? 'Available' : 'Busy'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Earnings" 
          value="₹45,200" 
          trend="+12%" 
          icon={<TrendingUp className="w-5 h-5 text-green-500" />} 
          variant="green"
        />
        <MetricCard 
          title="Escrow Balance" 
          value="₹12,500" 
          trend="+5%" 
          icon={<Wallet className="w-5 h-5 text-blue-500" />} 
          variant="blue"
        />
        <MetricCard 
          title="Active Projects" 
          value="3" 
          trend="0%" 
          icon={<Briefcase className="w-5 h-5 text-orange-500" />} 
          variant="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Milestones and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Milestones */}
          <Card className="bg-card shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Active Milestones</CardTitle>
              <Button variant="link" className="text-primary font-bold">View All</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <MilestoneItem 
                title="E-commerce App UI Design" 
                description="Milestone 2: Wireframes & High-fidelity" 
                progress={75} 
                dueDate="Due in 2 days"
                icon={<Smartphone className="w-5 h-5" />}
              />
              <MilestoneItem 
                title="React Component Library" 
                description="Milestone 1: Button System" 
                progress={30} 
                dueDate="Due in 5 days"
                icon={<Code className="w-5 h-5" />}
              />
            </CardContent>
          </Card>

          {/* Profile Views Chart */}
          <Card className="bg-card shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">Profile Views (Local)</CardTitle>
                <p className="text-sm text-muted-foreground">Views from Lucknow businesses</p>
              </div>
              <div className="flex bg-secondary/30 p-1 rounded-lg">
                <Button variant="ghost" size="sm" className="h-7 text-xs px-3">7D</Button>
                <Button variant="secondary" size="sm" className="h-7 text-xs px-3 bg-primary text-white hover:bg-primary/90 shadow-sm">30D</Button>
              </div>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold mb-6">1,248</div>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-popover border p-2 rounded-lg shadow-xl text-xs font-bold">
                                {payload[0].value} Views
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="views" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 5 ? '#FF8C2B' : '#FFE8D6'} 
                          />
                        ))}
                      </Bar>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: 'hsl(var(--muted-foreground))'}}
                        dy={10}
                      />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Nearby Matches and Map */}
        <div className="space-y-6">
          <Card className="bg-card shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Nearby Matches</CardTitle>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                <MapPin className="w-3 h-3" />
                5-10km
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <JobMatchItem 
                title="Wordpress Developer for Café"
                location="Gomti Nagar (2.4km)"
                budget="₹8,000"
                category="WEBSITE"
                time="2h ago"
                categoryColor="text-blue-500 bg-blue-500/10"
              />
              <JobMatchItem 
                title="Logo Design for Startup"
                location="Hazratganj (4.1km)"
                budget="₹3,500"
                category="DESIGN"
                time="5h ago"
                categoryColor="text-purple-500 bg-purple-500/10"
              />
              <JobMatchItem 
                title="Flutter Fixes Needed"
                location="Indira Nagar (6.8km)"
                budget="₹15,000"
                category="MOBILE"
                time="1d ago"
                categoryColor="text-orange-500 bg-orange-500/10"
              />
            </CardContent>
          </Card>

          {/* Map Preview Card */}
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-sm h-40">
             <img 
              src="https://picsum.photos/seed/lucknow_map_dashboard/600/400" 
              alt="Lucknow Map" 
              className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                <div className="text-white text-xs font-medium mb-0.5">View Map</div>
                <div className="text-white font-bold flex items-center justify-between">
                   Lucknow • 12 Jobs Nearby
                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <ChevronRight className="w-4 h-4" />
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
  const bgColors = {
    green: 'bg-green-500/10',
    blue: 'bg-blue-500/10',
    orange: 'bg-orange-500/10',
  };

  return (
    <Card className="bg-card border-none shadow-sm relative overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className={cn("p-2 rounded-xl", bgColors[variant])}>
            {icon}
          </div>
          <Badge variant="secondary" className={cn(
            "text-[10px] font-bold h-6 flex items-center gap-1",
            trend.startsWith('+') ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground'
          )}>
            {trend.startsWith('+') && <TrendingUp className="w-3 h-3" />}
            {trend}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>
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
    <div className="group border-b last:border-0 pb-6 last:pb-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground">
            {icon}
          </div>
          <div>
            <h4 className="font-bold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{dueDate}</div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2.5 bg-secondary/30" />
      </div>
    </div>
  );
}

function JobMatchItem({ title, location, budget, category, time, categoryColor }: { 
  title: string, 
  location: string, 
  budget: string, 
  category: string,
  time: string,
  categoryColor: string
}) {
  return (
    <div className="p-4 rounded-2xl border bg-card/50 hover:border-primary/30 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <Badge className={cn("text-[9px] font-black h-5 px-2", categoryColor)}>
          {category}
        </Badge>
        <span className="text-[10px] text-muted-foreground font-medium">{time}</span>
      </div>
      <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{title}</h4>
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-4">
        <MapPin className="w-3 h-3" />
        {location}
      </div>
      <div className="flex items-center justify-between">
        <div className="font-bold text-lg">{budget}</div>
        <Button variant="link" className="text-primary font-bold p-0 h-auto text-xs">Apply Now</Button>
      </div>
    </div>
  );
}
