import { Link, useLocation } from 'wouter';
import { 
  BarChart, 
  Clock, 
  Timer, 
  CheckSquare, 
  BookOpen, 
  Settings, 
  Home,
  ChevronLeft,
  Calendar,
  Menu,
  Download,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  console.log("Current location:", location);
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileOpen(false);
  }, [location]);

  const links = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: 'Tracker',
      href: '/tracker',
      icon: CheckSquare,
    },
    {
      title: 'Custom Tasks',
      href: '/custom-tasks',
      icon: CheckSquare,
    },
    {
      title: 'Schedule',
      href: '/schedule',
      icon: Calendar,
    },
    {
      title: 'Study Timer',
      href: '/study-timer',
      icon: Clock,
    },
    {
      title: 'Pomodoro',
      href: '/pomodoro',
      icon: Timer,
    },
    {
      title: 'Statistics',
      href: '/stats',
      icon: BarChart,
    },
    {
      title: 'Resources',
      href: '/resources',
      icon: BookOpen,
    },
    {
      title: 'Android App',
      href: '/download-android',
      icon: Smartphone,
      external: true,
      externalUrl: '/download-apk.html',
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 py-4">
        {!isCollapsed && (
          <Link href="/dashboard">
            <div className="flex items-center space-x-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="text-lg font-semibold">ISI MSQE</span>
            </div>
          </Link>
        )}
        {isCollapsed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            <ChevronLeft className={cn("h-4 w-4", isCollapsed && "rotate-180")} />
          </Button>
        )}
      </div>
      
      <div className="px-3 py-2">
        <div className="space-y-1">
          {links.map((link) => (
            link.external ? (
              <a key={link.href} href={link.externalUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "px-2" : "px-3"
                  )}
                  size={isCollapsed ? "icon" : "default"}
                >
                  <link.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
                  {!isCollapsed && (
                    <span className="flex items-center">
                      {link.title}
                      <Download className="ml-1 h-3 w-3" />
                    </span>
                  )}
                </Button>
              </a>
            ) : (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "px-2" : "px-3"
                  )}
                  size={isCollapsed ? "icon" : "default"}
                >
                  <link.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
                  {!isCollapsed && <span>{link.title}</span>}
                </Button>
              </Link>
            )
          ))}
        </div>
      </div>
    </>
  );

  // Mobile sidebar with overlay
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all lg:hidden",
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-card shadow-lg transition-transform duration-300 ease-in-out",
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "h-screen bg-card border-r flex-shrink-0 flex flex-col transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[220px]",
        className
      )}
    >
      {sidebarContent}
    </div>
  );
}