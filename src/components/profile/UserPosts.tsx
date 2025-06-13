'use client';

import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TextPost } from '@/components/posts/TextPost';
import { ImagePost } from '@/components/posts/ImagePost';
import { VideoPost } from '@/components/posts/VideoPost';
import { PollPost } from '@/components/posts/PollPost';
import { MOCK_FEED_DATA } from '@/constants/feeds/mock-feed-data';

interface UserPostsProps {
  userId: string;
  activeTab: 'posts' | 'media' | 'likes';
}

export function UserPosts({ userId, activeTab }: UserPostsProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredPosts = [];
        
        switch (activeTab) {
          case 'posts':
            // All posts by this user
            filteredPosts = MOCK_FEED_DATA.filter(post => 
              post.author.id === userId
            );
            break;
          case 'media':
            // Only media posts (images/videos) by this user
            filteredPosts = MOCK_FEED_DATA.filter(post => 
              post.author.id === userId && ['image', 'video'].includes(post.type)
            );
            break;
          case 'likes':
            // Posts liked by this user (mock data)
            filteredPosts = MOCK_FEED_DATA.filter(post => 
              post.engagement.isLiked
            ).slice(0, 10);
            break;
        }
        
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId, activeTab]);

  const renderPost = (post: any) => {
    const key = post.id;
    
    switch (post.type) {
      case 'text':
        return <TextPost key={key} post={post} />;
      case 'image':
        return <ImagePost key={key} post={post} />;
      case 'video':
        return <VideoPost key={key} post={post} />;
      case 'poll':
        return <PollPost key={key} post={post} />;
      default:
        return <TextPost key={key} post={post} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (posts.length === 0) {
    const emptyMessages = {
      posts: {
        icon: '📝',
        title: 'No posts yet',
        description: 'This user hasn\'t posted anything yet. Check back later!'
      },
      media: {
        icon: '📸',
        title: 'No media posts',
        description: 'This user hasn\'t shared any photos or videos yet.'
      },
      likes: {
        icon: '❤️',
        title: 'No liked posts',
        description: 'This user hasn\'t liked any posts yet.'
      }
    };

    const message = emptyMessages[activeTab];

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-4xl mb-3">{message.icon}</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {message.title}
        </h3>
        <p className="text-muted-foreground text-center max-w-sm">
          {message.description}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {posts.map(renderPost)}
    </div>
  );
}
