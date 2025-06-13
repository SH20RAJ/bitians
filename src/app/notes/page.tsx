import { PageLayout } from '@/components/layout/PageLayout';

export default function NotesPage() {
  return (
    <PageLayout title="Notes" showBack={true}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
        <p className="text-muted-foreground">Share and access academic notes...</p>
      </div>
    </PageLayout>
  );
}
