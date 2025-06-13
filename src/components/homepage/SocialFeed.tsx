'use client';

import { PostCard } from '@/components/ui/PostCard';
import { cn } from '@/lib/utils';

interface PostAuthor {
  name: string;
  username: string;
  batch: string;
  avatar: string;
  verified: boolean;
}

interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

interface FeedPost {
  id: string;
  author: PostAuthor;
  content: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'event';
  media?: string[];
  timestamp: string;
  engagement: PostEngagement;
  tags: string[];
}

interface SocialFeedProps {
  posts: FeedPost[];
  className?: string;
}

export function SocialFeed({ posts, className }: SocialFeedProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold px-4">Latest Updates</h2>
      <div className="space-y-4 px-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            author={post.author}
            content={post.content}
            type={post.type}
            media={post.media}
            timestamp={post.timestamp}
            engagement={post.engagement}
            tags={post.tags}
            onLike={(id) => console.log('Like post:', id)}
            onComment={(id) => console.log('Comment on post:', id)}
            onShare={(id) => console.log('Share post:', id)}
            onBookmark={(id) => console.log('Bookmark post:', id)}
          />
        ))}
      </div>
    </section>
  );
}
