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
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      badge: 'bg-slate-100 text-slate-800',
      progress: 'bg-primary'
    },
    phase2: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      badge: 'bg-slate-100 text-slate-800',
      progress: 'bg-primary'
    },
    phase3: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      badge: 'bg-slate-100 text-slate-800',
      progress: 'bg-primary'
    },
    phase4: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      badge: 'bg-slate-100 text-slate-800',
      progress: 'bg-primary'
    }
  };

  const colors = colorSchemes[phaseId as keyof typeof colorSchemes];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg" data-phase={phaseId}>
      <div className={`px-4 py-5 sm:px-6 ${colors.bg}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
            {completed}/{total} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className={`${colors.progress} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
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
