import StudyTimer from '@/components/timer/StudyTimer';

export default function StudyTimerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Study Timer</h1>
      <p className="text-muted-foreground">
        Track your study sessions to monitor your progress and analyze your study patterns over time.
      </p>
      
      <StudyTimer />
    </div>
  );
}