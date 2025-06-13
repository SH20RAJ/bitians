import { PageLayout } from '@/components/layout/PageLayout';

export default function ProfilePage() {
  return (
    <PageLayout title="Profile" showBack={false}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-muted-foreground">Your BITians profile and achievements...</p>
      </div>
    </PageLayout>
  );
}
