import CustomTaskManager from '@/components/custom-tasks/CustomTaskManager';

export default function CustomTasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Custom Tasks</h1>
      <p className="text-muted-foreground">
        Create and manage your own custom study tasks to complement the structured ISI MSQE curriculum.
      </p>
      
      <CustomTaskManager />
    </div>
  );
}