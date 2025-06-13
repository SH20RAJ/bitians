'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hash, TrendingUp, Users, Calendar, Share2, Heart } from 'lucide-react';
import { PostCard } from '@/components/ui/PostCard';
import { cn } from '@/lib/utils';
import { TRENDING_HASHTAGS } from '@/constants/homepage/trending-data';
import { FEED_POSTS } from '@/constants/homepage/feed-data';

interface HashtagDetailProps {
  tag: string;
}

export function HashtagDetail({ tag }: HashtagDetailProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'recent' | 'popular' | 'media'>('recent');

  // Find hashtag data
  const hashtagData = TRENDING_HASHTAGS.find(h => 
    h.tag.toLowerCase().replace('#', '') === tag.toLowerCase()
  );

  // Filter posts that contain this hashtag
  const hashtagPosts = FEED_POSTS.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase().replace('#', '') === tag.toLowerCase()
    )
  );

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `#${tag} on BITians`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const sortedPosts = [...hashtagPosts].sort((a, b) => {
    if (selectedTab === 'popular') {
      return b.engagement.likes - a.engagement.likes;
    }
    return 0; // Keep original order for recent
  });

  const mediaPosts = sortedPosts.filter(post => {
    // Check if post has media property and it's an array with content
    const hasMedia = Array.isArray((post as any).media) && (post as any).media.length > 0;
    // Check if post is an image type with images property
    const hasImages = post.type === 'image' && Array.isArray((post as any).images) && (post as any).images.length > 0;
    return hasMedia || hasImages;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Hash className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">#{tag}</h1>
              {hashtagData && (
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="capitalize">
                    {hashtagData.category}
                  </Badge>
                  {hashtagData.trend === 'up' && (
                    <Badge variant="outline" className="text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={handleFollowToggle}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {hashtagData?.posts.toLocaleString() || hashtagPosts.length}
            </div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.floor(Math.random() * 1000 + 500)}
            </div>
            <div className="text-sm text-muted-foreground">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.floor(Math.random() * 50 + 10)}K
            </div>
            <div className="text-sm text-muted-foreground">Engagements</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex">
          <Button
            variant={selectedTab === 'recent' ? "default" : "ghost"}
            onClick={() => setSelectedTab('recent')}
            className="flex-1 rounded-none"
          >
            Recent
          </Button>
          <Button
            variant={selectedTab === 'popular' ? "default" : "ghost"}
            onClick={() => setSelectedTab('popular')}
            className="flex-1 rounded-none"
          >
            Popular
          </Button>
          <Button
            variant={selectedTab === 'media' ? "default" : "ghost"}
            onClick={() => setSelectedTab('media')}
            className="flex-1 rounded-none"
          >
            Media
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {selectedTab === 'media' ? (
          mediaPosts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {mediaPosts.map((post) => (
                <div key={post.id} className="aspect-square relative rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={(post as any).media?.[0]?.url || (post as any).images?.[0] || 'https://via.placeholder.com/400'}
                    alt="Media post"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    onClick={() => window.location.href = `/post/${post.id}`}
                  />
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
                    <Heart className="h-3 w-3" />
                    <span>{post.engagement.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-lg font-semibold mb-2">No media posts yet</h3>
              <p className="text-muted-foreground">
                Be the first to share photos or videos with #{tag}
              </p>
            </div>
          )
        ) : (
          sortedPosts.length > 0 ? (
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  content={post.content}
                  type={post.type}
                  media={(post as any).media || (post as any).images || []}
                  timestamp={post.timestamp}
                  engagement={post.engagement}
                  tags={post.tags}
                  onLike={() => console.warn('Like post:', post.id)}
                  onComment={() => window.location.href = `/post/${post.id}`}
                  onShare={() => console.warn('Share post:', post.id)}
                  onBookmark={() => console.warn('Bookmark post:', post.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Hash className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Be the first to share something with #{tag}
              </p>
              <Button className="mt-4" onClick={() => window.location.href = '/create'}>
                Create Post
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
