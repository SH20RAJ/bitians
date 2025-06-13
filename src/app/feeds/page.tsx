import { PageLayout } from '@/components/layout/PageLayout';
import { FeedsPage } from '@/components/feeds/FeedsPage';

export default function FeedsPageRoute() {
  return (
    <PageLayout title="Feeds" showBack={false}>
      <FeedsPage />
    </PageLayout>
  );
}
