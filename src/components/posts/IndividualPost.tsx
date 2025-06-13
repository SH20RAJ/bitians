'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TextPost } from './TextPost';
import { ImagePost } from './ImagePost';
import { VideoPost } from './VideoPost';
import { PollPost } from './PollPost';
import { EventPost } from './EventPost';
import { ConfessionPost } from './ConfessionPost';
import { NewsroomPost } from './NewsroomPost';
import { CirclePost } from './CirclePost';
import { CommentSection } from './CommentSection';
import { MOCK_FEED_DATA } from '@/constants/feeds/mock-feed-data';

interface IndividualPostProps {
  postId: string;
}

export function IndividualPost({ postId }: IndividualPostProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Simulate API call - in real app, this would be an actual API request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundPost = MOCK_FEED_DATA.find(p => p.id === postId);
        
        if (!foundPost) {
          setError('Post not found');
          return;
        }
        
        setPost(foundPost);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const renderPost = (post: any) => {
    const props = { post, isIndividualView: true };
    
    switch (post.type) {
      case 'text':
        return <TextPost {...props} />;
      case 'image':
        return <ImagePost {...props} />;
      case 'video':
        return <VideoPost {...props} />;
      case 'poll':
        return <PollPost {...props} />;
      case 'event':
        return <EventPost {...props} />;
      case 'confession':
        return <ConfessionPost {...props} />;
      case 'newsroom':
        return <NewsroomPost {...props} />;
      case 'circles':
        return <CirclePost {...props} />;
      default:
        return <TextPost {...props} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-6xl mb-4">😕</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {error || 'Post not found'}
        </h3>
        <p className="text-muted-foreground text-center max-w-sm mb-4">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => router.back()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Individual Post */}
      <div className="border-b-8 border-muted">
        {renderPost(post)}
      </div>

      {/* Comments Section */}
      <CommentSection postId={postId} />
    </div>
  );
}
