import { PageLayout } from '@/components/layout/PageLayout';
import { HashtagDetail } from '@/components/hashtags/HashtagDetail';

interface HashtagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function HashtagPage({ params }: HashtagPageProps) {
  const { tag } = await params;
  
  return (
    <PageLayout title={`#${tag}`} showBack={true}>
      <HashtagDetail tag={tag} />
    </PageLayout>
  );
}
