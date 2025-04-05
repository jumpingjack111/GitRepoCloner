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
  // Define color schemes for each phase
  const colorSchemes = {
    phase1: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-800',
      progress: 'bg-blue-600'
    },
    phase2: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-800',
      progress: 'bg-indigo-600'
    },
    phase3: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-800',
      progress: 'bg-purple-600'
    },
    phase4: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      badge: 'bg-pink-100 text-pink-800',
      progress: 'bg-pink-600'
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
