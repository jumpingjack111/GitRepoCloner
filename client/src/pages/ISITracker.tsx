import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProgressSummary from '@/components/tracker/ProgressSummary';
import PhaseCard from '@/components/tracker/PhaseCard';
import BrightnessController from '@/components/theme/BrightnessController';
import { trackerData } from '@/lib/trackerData';

export default function ISITracker() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('isiMsqeProgress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to parse saved progress', e);
      }
    }
  }, []);

  // Toggle task completion status
  const toggleTask = (phase: string, task: string) => {
    const key = `${phase}-${task}`;
    setProgress(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      // Save to localStorage after each update
      localStorage.setItem('isiMsqeProgress', JSON.stringify(updated));
      return updated;
    });
  };

  // Calculate completion statistics
  const calculateStats = () => {
    const stats = {
      totalTasks: 0,
      totalCompleted: 0,
      phases: [] as {
        id: string;
        total: number;
        completed: number;
        percentage: number;
      }[]
    };

    trackerData.forEach(section => {
      const phaseId = section.phase.split(':')[0].toLowerCase().replace(/\s+/g, '');
      const total = section.tasks.length;
      let completed = 0;

      section.tasks.forEach((task, index) => {
        const key = `${phaseId}-task${index + 1}`;
        if (progress[key]) {
          completed++;
          stats.totalCompleted++;
        }
      });

      stats.totalTasks += total;
      stats.phases.push({
        id: phaseId,
        total,
        completed,
        percentage: Math.round((completed / total) * 100)
      });
    });

    return {
      ...stats,
      overallPercentage: Math.round((stats.totalCompleted / stats.totalTasks) * 100) || 0
    };
  };

  const stats = calculateStats();

  // Handle reset progress
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setProgress({});
      localStorage.setItem('isiMsqeProgress', JSON.stringify({}));
      toast({
        title: "Progress Reset",
        description: "All progress has been reset successfully.",
      });
    }
  };

  // Handle save progress
  const handleSave = () => {
    localStorage.setItem('isiMsqeProgress', JSON.stringify(progress));
    toast({
      title: "Progress Saved",
      description: "Your progress has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <Link href="/">
              <h1 className="text-xl font-bold text-foreground cursor-pointer">ISI MSQE Study Tracker</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <BrightnessController />
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium"
            >
              Reset Progress
            </Button>
            <Button 
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium"
            >
              Save Progress
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overall Progress Summary */}
        <ProgressSummary stats={stats} />

        {/* Study Phases Cards */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          {trackerData.map((section, index) => {
            const phaseId = section.phase.split(':')[0].toLowerCase().replace(/\s+/g, '');
            const phaseInfo = stats.phases[index];
            
            return (
              <PhaseCard
                key={phaseId}
                phaseId={phaseId}
                title={section.phase}
                tasks={section.tasks}
                completed={phaseInfo.completed}
                total={phaseInfo.total}
                percentage={phaseInfo.percentage}
                progress={progress}
                onToggleTask={toggleTask}
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-card/50 border-t border-muted mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center">
            ISI MSQE Study Tracker - Data is saved locally in your browser
          </p>
        </div>
      </footer>
    </div>
  );
}
