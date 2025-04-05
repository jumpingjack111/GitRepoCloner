import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import BrightnessController from '@/components/theme/BrightnessController';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card shadow z-10">
          <div className="px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold">ISI MSQE Study Tracker</h1>
            <div className="flex items-center">
              <BrightnessController />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="bg-card/50 border-t border-muted py-3 px-4 text-sm text-muted-foreground text-center">
          ISI MSQE Study Tracker - Data is saved locally in your browser
        </footer>
      </div>
    </div>
  );
}