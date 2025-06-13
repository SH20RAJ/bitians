import { PageLayout } from '@/components/layout/PageLayout';
import { UserProfile } from '@/components/profile/UserProfile';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  
  return (
    <PageLayout title="Profile" showBack={true}>
      <UserProfile username={username} />
    </PageLayout>
  );
}
