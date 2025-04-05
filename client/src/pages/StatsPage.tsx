import ProgressVisualizer from '@/components/stats/ProgressVisualizer';

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Statistics & Analytics</h1>
      <p className="text-muted-foreground">
        Visualize your study progress, analyze your time management, and identify areas for improvement.
      </p>
      
      <ProgressVisualizer />
    </div>
  );
}