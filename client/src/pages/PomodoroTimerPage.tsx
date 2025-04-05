import PomodoroTimer from '@/components/timer/PomodoroTimer';

export default function PomodoroTimerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
      <p className="text-muted-foreground">
        Use the Pomodoro Technique to improve your focus and productivity with structured work sessions and breaks.
      </p>
      
      <PomodoroTimer />
    </div>
  );
}