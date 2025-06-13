import { TRENDING_HASHTAGS } from '@/constants/homepage/trending-data';

export function transformTrendingData() {
  return TRENDING_HASHTAGS.map((hashtag, index) => ({
    id: hashtag.tag.toLowerCase().replace('#', ''),
    text: hashtag.tag.replace('#', ''),
    count: hashtag.posts,
    type: 'hashtag' as const,
    category: hashtag.category,
  }));
}

export function formatEngagementCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function getTimeAgo(timestamp: string): string {
  // Simple time ago implementation
  const now = new Date();
  const past = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}w ago`;
}
