"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  User, 
  Settings, 
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
      <aside className="hidden md:flex flex-col w-64 border-r bg-card shrink-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">L</span>
          </div>
          <span className="text-lg font-bold">LucknowLink</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                pathname.startsWith(item.href) 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          ))}
          <Link 
            href="/dashboard/profile"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              pathname === '/dashboard/profile' 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
            )}
          >
            <User className={cn("w-5 h-5", pathname === '/dashboard/profile' ? "text-primary" : "text-muted-foreground")} />
            My Profile
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl py-6 font-bold flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Post a Service
          </Button>
          <div className="mt-4 pt-4 border-t">
            <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all">
              <LogOut className="w-5 h-5" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b flex items-center justify-between px-8 bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
               <Menu className="w-6 h-6" />
             </Button>
             <div className="hidden md:flex items-center gap-3 bg-secondary/20 rounded-2xl px-5 py-2.5 min-w-[360px] border border-transparent focus-within:border-primary/20 transition-all">
                <SearchIcon className="w-4 h-4 text-muted-foreground" />
                <input 
                  placeholder="Search jobs, skills, freelancers..." 
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground font-medium"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 mr-4">
              {navItems.map(item => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "text-sm font-bold transition-colors",
                    pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-secondary/30">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
              </Button>
              <div className="flex items-center gap-3 pl-2">
                <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                  <AvatarImage src="https://picsum.photos/seed/rahul_avatar/100/100" />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-card h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="text-lg font-bold">LucknowLink</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <nav className="flex-1 px-4 space-y-1 mt-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all",
                    pathname.startsWith(item.href) 
                      ? "bg-primary text-white" 
                      : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
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
