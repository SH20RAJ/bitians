import { PageLayout } from '@/components/layout/PageLayout';
import { HashtagsDiscovery } from '@/components/hashtags/HashtagsDiscovery';

export default function HashtagsPage() {
  return (
    <PageLayout title="Hashtags" showBack={false}>
      <HashtagsDiscovery />
    </PageLayout>
  );
}
