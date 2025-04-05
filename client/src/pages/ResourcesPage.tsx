import ResourceRecommendations from '@/components/resources/ResourceRecommendations';

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Academic Resources</h1>
      <p className="text-muted-foreground">
        Find recommended books, courses, and other learning materials for each phase of your ISI MSQE preparation.
      </p>
      
      <ResourceRecommendations />
    </div>
  );
}