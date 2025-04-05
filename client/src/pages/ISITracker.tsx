import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProgressSummary from '@/components/tracker/ProgressSummary';
import PhaseCard from '@/components/tracker/PhaseCard';
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
    <div className="space-y-6">
      {/* Page header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Study Tracker</h1>
          <p className="text-muted-foreground">
            Track your progress through each phase of the ISI MSQE preparation journey
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleReset}
          >
            Reset Progress
          </Button>
          <Button onClick={handleSave}>
            Save Progress
          </Button>
        </div>
      </div>

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
    </div>
  );
}
