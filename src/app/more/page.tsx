import { PageLayout } from '@/components/layout/PageLayout';

export default function MorePage() {
  return (
    <PageLayout title="More" showBack={false}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">More</h1>
        <p className="text-muted-foreground">Additional features and settings...</p>
      </div>
    </PageLayout>
  );
}
