"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, IndianRupee, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Mon', active: 120, revenue: 5000 },
  { name: 'Tue', active: 150, revenue: 7500 },
  { name: 'Wed', active: 180, revenue: 6000 },
  { name: 'Thu', active: 220, revenue: 12000 },
  { name: 'Fri', active: 250, revenue: 15000 },
  { name: 'Sat', active: 210, revenue: 8000 },
  { name: 'Sun', active: 140, revenue: 4500 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Command Center</h1>
          <p className="text-muted-foreground">Monitoring LucknowConnect platform health and activity</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export Data</Button>
          <Button className="bg-primary hover:bg-primary/90">System Status: Stable</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Users" value="1,284" icon={<Users className="w-5 h-5 text-blue-500" />} trend="+12% this week" />
        <MetricCard title="Active Jobs" value="342" icon={<Briefcase className="w-5 h-5 text-primary" />} trend="+5% this week" />
        <MetricCard title="Escrow Revenue" value="₹4.2L" icon={<IndianRupee className="w-5 h-5 text-green-500" />} trend="+18% this month" />
        <MetricCard title="Open Disputes" value="3" icon={<AlertTriangle className="w-5 h-5 text-red-500" />} trend="2 resolved today" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Platform Activity (Active Users)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1D2B', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#FF8C2B' }}
                />
                <Bar dataKey="active" fill="#FF8C2B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Recent Disputes & Escalations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border">
                  <TableCell className="font-medium">Logo Design - Indiranagar</TableCell>
                  <TableCell><Badge variant="destructive">Pending</Badge></TableCell>
                  <TableCell className="text-xs">Payment delay</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Review</Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-border">
                  <TableCell className="font-medium">Web App - Gomti Nagar</TableCell>
                  <TableCell><Badge className="bg-yellow-500">Mediating</Badge></TableCell>
                  <TableCell className="text-xs">Incomplete work</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Review</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Verified Talent in Lucknow</CardTitle>
          <TrendingUp className="w-5 h-5 text-primary" />
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Vikas Gupta', 'Neha Singh', 'Aryan Mishra'].map((name, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-secondary/20">
                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                     {name[0]}
                   </div>
                   <div className="flex-1">
                      <div className="font-bold flex items-center gap-1">
                        {name}
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="text-xs text-muted-foreground">Completed 20+ jobs</div>
                   </div>
                   <div className="text-primary font-bold">4.9 ★</div>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <Card className="bg-card border-border/50">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-secondary rounded-lg">{icon}</div>
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">{trend}</span>
        </div>
        <div>
          <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}