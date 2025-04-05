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
  // Background colors for the different phase cards with black-white-purple-blue palette
  const phaseColors = {
    phase1: {
      bg: 'bg-card/80',
      text: 'text-foreground',
      accent: 'text-primary',
      circle: 'bg-muted'
    },
    phase2: {
      bg: 'bg-card/80',
      text: 'text-foreground',
      accent: 'text-primary',
      circle: 'bg-muted'
    },
    phase3: {
      bg: 'bg-card/80',
      text: 'text-foreground',
      accent: 'text-primary',
      circle: 'bg-muted'
    },
    phase4: {
      bg: 'bg-card/80',
      text: 'text-foreground',
      accent: 'text-primary',
      circle: 'bg-muted'
    }
  };

  return (
    <div className="bg-card shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-foreground">Overall Progress</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Track your journey toward ISI MSQE preparation</p>
      </div>
      <div className="border-t border-muted">
        <div className="px-4 py-5 sm:p-6">
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-foreground">{stats.overallPercentage}%</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {stats.totalCompleted}/{stats.totalTasks} tasks completed
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 mt-2">
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
