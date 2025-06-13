import { PageLayout } from '@/components/layout/PageLayout';
import { IndividualPost } from '@/components/posts/IndividualPost';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  
  return (
    <PageLayout title="Post" showBack={true}>
      <IndividualPost postId={id} />
    </PageLayout>
  );
}
