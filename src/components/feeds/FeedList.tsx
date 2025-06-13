'use client';

import { useCallback, useRef, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TextPost } from '@/components/posts/TextPost';
import { ImagePost } from '@/components/posts/ImagePost';
import { VideoPost } from '@/components/posts/VideoPost';
import { PollPost } from '@/components/posts/PollPost';
import { EventPost } from '@/components/posts/EventPost';
import { ConfessionPost } from '@/components/posts/ConfessionPost';
import { NewsroomPost } from '@/components/posts/NewsroomPost';
import { CirclePost } from '@/components/posts/CirclePost';
import { Post } from '@/types';

interface FeedListProps {
  posts: Post[];
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  onRefresh: () => void;
}

export function FeedList({ posts, loading, onLoadMore, hasMore, onRefresh }: FeedListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  const renderPost = (post: any) => {
    switch (post.type) {
      case 'text':
        return <TextPost key={post.id} post={post} />;
      case 'image':
        return <ImagePost key={post.id} post={post} />;
      case 'video':
        return <VideoPost key={post.id} post={post} />;
      case 'poll':
        return <PollPost key={post.id} post={post} />;
      case 'event':
        return <EventPost key={post.id} post={post} />;
      case 'confession':
        return <ConfessionPost key={post.id} post={post} />;
      case 'newsroom':
        return <NewsroomPost key={post.id} post={post} />;
      case 'circles':
        return <CirclePost key={post.id} post={post} />;
      default:
        return <TextPost key={post.id} post={post} />;
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-6xl mb-4">📱</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Be the first to share something with the BITians community!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Pull to refresh indicator */}
      <div className="h-2"></div>
      
      {/* Posts */}
      {posts.map(renderPost)}

      {/* Load more trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-6">
          {loading && <LoadingSpinner size="md" />}
        </div>
      )}

      {/* End of feed message */}
      {!hasMore && posts.length > 0 && (
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-muted-foreground text-center text-sm">
            You've caught up with all the latest posts!
          </p>
        </div>
      )}
    </div>
  );
}
