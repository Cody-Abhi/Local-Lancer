"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  User, 
  LogOut, 
  LayoutDashboard,
  Bell,
  Search as SearchIcon,
  Menu,
  X,
  PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/toaster';

const navItems = [
  { name: 'Dashboard', href: '/dashboard/overview', icon: LayoutDashboard },
  { name: 'Find Work', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Freelancers', href: '/dashboard/freelancers', icon: Users },
  { name: 'Messages', href: '/dashboard/chat', icon: MessageSquare },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl italic">L</span>
          </div>
          <span className="text-xl font-black tracking-tight text-white italic">LucknowLink</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-6">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all",
                pathname.startsWith(item.href) 
                  ? "bg-primary text-white shadow-lg shadow-primary/10" 
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", pathname.startsWith(item.href) ? "text-white" : "text-muted-foreground")} />
              {item.name}
            </Link>
          ))}
          <Link 
            href="/dashboard/profile"
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all",
              pathname === '/dashboard/profile' 
                ? "bg-primary text-white shadow-lg shadow-primary/10" 
                : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
            )}
          >
            <User className={cn("w-5 h-5", pathname === '/dashboard/profile' ? "text-white" : "text-muted-foreground")} />
            My Profile
          </Link>
        </nav>

        <div className="p-6 mt-auto space-y-4">
          <Link href="/dashboard/post-service">
            <Button className="w-full bg-primary hover:bg-primary/90 rounded-2xl py-7 font-black flex items-center gap-2 shadow-xl shadow-primary/10 transition-transform active:scale-95">
              <PlusCircle className="w-5 h-5" />
              Post a Service
            </Button>
          </Link>
          <div className="pt-4 border-t border-border/50">
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all">
              <LogOut className="w-5 h-5" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-24 border-b border-border/50 flex items-center justify-between px-10 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-6 flex-1">
             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
               <Menu className="w-6 h-6" />
             </Button>
             <div className="hidden md:flex items-center gap-4 bg-secondary/30 rounded-2xl px-6 py-3 min-w-[400px] border border-border/50 focus-within:border-primary/50 transition-all group">
                <SearchIcon className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  placeholder="Search jobs, skills, freelancers..." 
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground font-bold text-white"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map(item => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "text-xs font-black uppercase tracking-widest transition-colors",
                    pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl bg-secondary/30 hover:bg-secondary/50 border border-border/50">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-background" />
              </Button>
              <div className="flex items-center gap-4 pl-2 border-l border-border/50">
                <Avatar className="w-12 h-12 ring-2 ring-primary/20 rounded-2xl">
                  <AvatarImage src="https://picsum.photos/seed/rahul_avatar/100/100" />
                  <AvatarFallback className="rounded-2xl">RS</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-background/50">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-80 bg-card h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-500">
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl italic">L</span>
                </div>
                <span className="text-xl font-black italic">LucknowLink</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="rounded-xl bg-secondary/30">
                <X className="w-6 h-6" />
              </Button>
            </div>
            <nav className="flex-1 px-6 space-y-2 mt-6">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold transition-all",
                    pathname.startsWith(item.href) 
                      ? "bg-primary text-white" 
                      : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}