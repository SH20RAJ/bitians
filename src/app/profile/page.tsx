import { PageLayout } from '@/components/layout/PageLayout';
import { UserProfile } from '@/components/profile/UserProfile';

export default function ProfilePage() {
  // In a real app, you'd get the current user from auth context
  const currentUsername = 'rahul_k23';
  
  return (
    <PageLayout title="Profile" showBack={false}>
      <UserProfile username={currentUsername} />
    </PageLayout>
  );
}
