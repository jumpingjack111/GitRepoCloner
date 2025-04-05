import TaskItem from './TaskItem';

interface PhaseCardProps {
  phaseId: string;
  title: string;
  tasks: string[];
  completed: number;
  total: number;
  percentage: number;
  progress: Record<string, boolean>;
  onToggleTask: (phase: string, task: string) => void;
}

export default function PhaseCard({
  phaseId,
  title,
  tasks,
  completed,
  total,
  percentage,
  progress,
  onToggleTask
}: PhaseCardProps) {
  // Define color schemes with black-white-purple-blue palette
  const colorSchemes = {
    phase1: {
      bg: 'bg-background/50',
      border: 'border-muted',
      badge: 'bg-background text-foreground',
      progress: 'bg-primary'
    },
    phase2: {
      bg: 'bg-background/50',
      border: 'border-muted',
      badge: 'bg-background text-foreground',
      progress: 'bg-primary'
    },
    phase3: {
      bg: 'bg-background/50',
      border: 'border-muted',
      badge: 'bg-background text-foreground',
      progress: 'bg-primary'
    },
    phase4: {
      bg: 'bg-background/50',
      border: 'border-muted',
      badge: 'bg-background text-foreground',
      progress: 'bg-primary'
    }
  };

  const colors = colorSchemes[phaseId as keyof typeof colorSchemes];

  return (
    <div className="bg-card shadow overflow-hidden sm:rounded-lg" data-phase={phaseId}>
      <div className={`px-4 py-5 sm:px-6 ${colors.bg}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-foreground">{title}</h2>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
            {completed}/{total} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className={`${colors.progress} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="border-t border-muted">
        <ul className="divide-y divide-muted">
          {tasks.map((task, index) => {
            const taskId = `task${index + 1}`;
            const taskKey = `${phaseId}-${taskId}`;
            return (
              <TaskItem
                key={taskKey}
                taskKey={taskKey}
                task={task}
                isChecked={Boolean(progress[taskKey])}
                onToggle={() => onToggleTask(phaseId, taskId)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
