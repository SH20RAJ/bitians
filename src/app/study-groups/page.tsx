import { PageLayout } from '@/components/layout/PageLayout';

export default function StudyGroupsPage() {
  return (
    <PageLayout title="Study Groups" showBack={true}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Study Groups</h1>
        <p className="text-muted-foreground">Join academic circles and collaborative learning...</p>
      </div>
    </PageLayout>
  );
}
