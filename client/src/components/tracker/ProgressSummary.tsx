interface PhaseStats {
  id: string;
  total: number;
  completed: number;
  percentage: number;
}

interface ProgressStats {
  totalTasks: number;
  totalCompleted: number;
  overallPercentage: number;
  phases: PhaseStats[];
}

interface ProgressSummaryProps {
  stats: ProgressStats;
}

export default function ProgressSummary({ stats }: ProgressSummaryProps) {
  // Background colors for the different phase cards
  const phaseColors = {
    phase1: {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      accent: 'text-blue-600',
      circle: 'bg-blue-100'
    },
    phase2: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      accent: 'text-indigo-600',
      circle: 'bg-indigo-100'
    },
    phase3: {
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      accent: 'text-purple-600',
      circle: 'bg-purple-100'
    },
    phase4: {
      bg: 'bg-pink-50',
      text: 'text-pink-800',
      accent: 'text-pink-600',
      circle: 'bg-pink-100'
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Overall Progress</h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Track your journey toward ISI MSQE preparation</p>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">{stats.overallPercentage}%</span>
                <span className="ml-2 text-sm text-gray-500">
                  {stats.totalCompleted}/{stats.totalTasks} tasks completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${stats.overallPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 grid grid-cols-2 gap-4 sm:pl-6">
              {stats.phases.map((phase, index) => {
                const colors = phaseColors[phase.id as keyof typeof phaseColors];
                return (
                  <div key={phase.id} className={`${colors.bg} p-4 rounded-lg`}>
                    <h3 className={`text-sm font-medium ${colors.text}`}>Phase {index + 1}</h3>
                    <div className="mt-2 flex items-center">
                      <span className={`text-lg font-semibold ${colors.accent}`}>{phase.percentage}%</span>
                      <div className={`ml-auto w-10 h-10 rounded-full flex items-center justify-center ${colors.circle}`}>
                        <span className={`text-sm font-medium ${colors.text}`}>{phase.completed}/{phase.total}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
