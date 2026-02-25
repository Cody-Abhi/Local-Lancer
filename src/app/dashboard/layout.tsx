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
  Map as MapIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/toaster';

const navItems = [
  { name: 'Dashboard', href: '/dashboard/overview', icon: LayoutDashboard },
  { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Freelancers', href: '/dashboard/freelancers', icon: Users },
  { name: 'Messages', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-sidebar shrink-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">L</span>
          </div>
          <span className="text-lg font-bold text-foreground">LucknowConnect</span>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                pathname.startsWith(item.href) 
                  ? "bg-primary text-white" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-8 bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
               <Menu className="w-6 h-6" />
             </Button>
             <div className="hidden md:flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-1.5 border min-w-[300px]">
                <SearchIcon className="w-4 h-4 text-muted-foreground" />
                <input 
                  placeholder="Search jobs, skills, freelancers..." 
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">Amit Gupta</div>
                <div className="text-xs text-muted-foreground">Client Profile</div>
              </div>
              <Avatar className="w-9 h-9 border border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/amit/100/100" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-sidebar h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="text-lg font-bold text-foreground">LucknowConnect</span>
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
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    pathname.startsWith(item.href) 
                      ? "bg-primary text-white" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-sidebar-border">
              <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
                <LogOut className="w-5 h-5" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}