'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Clock,
  Hash,
  Users,
  Flame,
  Sparkles,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendingPost {
  id: string;
  title: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    batch: string;
    verified: boolean;
  };
  content: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'event';
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  trendingScore: number;
  trendingDirection: 'up' | 'down' | 'stable';
  tags: string[];
  category: string;
  isHot: boolean;
  timeToTrend: string;
  engagementGrowth: number;
}

interface TrendingHashtag {
  tag: string;
  posts: number;
  growth: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  hourlyEngagement: number[];
}

interface TrendingUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  batch: string;
  verified: boolean;
  followersGrowth: number;
  engagementRate: number;
  trendingReason: string;
}

const TRENDING_POSTS: TrendingPost[] = [
  {
    id: '1',
    title: 'TechFest 2024 Registration Opens',
    author: {
      name: 'Tech Society BIT',
      username: '@techsociety_bit',
      avatar: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop',
      batch: 'Club',
      verified: true
    },
    content: '🚀 TechFest 2024 registration is now live! Join us for the biggest tech event of the year. 3 days of innovation, competitions, and networking. Early bird discounts available! #TechFest2024',
    type: 'event',
    timestamp: '2 hours ago',
    engagement: {
      likes: 456,
      comments: 89,
      shares: 123,
      views: 2341
    },
    trendingScore: 95.6,
    trendingDirection: 'up',
    tags: ['#TechFest2024', '#Innovation', '#Competition'],
    category: 'Events',
    isHot: true,
    timeToTrend: '45 minutes',
    engagementGrowth: 340
  },
  {
    id: '2',
    title: 'Machine Learning Workshop Success',
    author: {
      name: 'Priya Sharma',
      username: '@priya_ml',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=100&h=100&fit=crop',
      batch: 'K22',
      verified: false
    },
    content: 'Just finished conducting a 3-day ML workshop! 150+ students learned about neural networks, deep learning, and practical applications. The enthusiasm was incredible! 🤖',
    type: 'text',
    timestamp: '4 hours ago',
    engagement: {
      likes: 234,
      comments: 56,
      shares: 78,
      views: 1567
    },
    trendingScore: 87.3,
    trendingDirection: 'up',
    tags: ['#MachineLearning', '#Workshop', '#AI'],
    category: 'Education',
    isHot: false,
    timeToTrend: '2 hours',
    engagementGrowth: 180
  },
  {
    id: '3',
    title: 'Campus Placement Success Story',
    author: {
      name: 'Rahul Kumar',
      username: '@rahul_placed',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      batch: 'K21',
      verified: false
    },
    content: 'Finally got placed at Google! 🎉 The journey was tough but worth it. Thanks to all the professors and friends who supported me. Dream big, work hard! 💪',
    type: 'text',
    timestamp: '6 hours ago',
    engagement: {
      likes: 567,
      comments: 123,
      shares: 89,
      views: 3421
    },
    trendingScore: 92.1,
    trendingDirection: 'up',
    tags: ['#Placement', '#Google', '#Success'],
    category: 'Career',
    isHot: true,
    timeToTrend: '1 hour',
    engagementGrowth: 450
  },
  {
    id: '4',
    title: 'New AI Lab Inauguration',
    author: {
      name: 'BIT Mesra Official',
      username: '@bit_official',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      batch: 'Official',
      verified: true
    },
    content: '🏛️ New AI & Data Science Lab inaugurated today! State-of-the-art facilities with latest GPU servers, research equipment, and collaboration spaces. Open for all students from Monday.',
    type: 'image',
    timestamp: '1 day ago',
    engagement: {
      likes: 789,
      comments: 234,
      shares: 456,
      views: 5678
    },
    trendingScore: 88.9,
    trendingDirection: 'stable',
    tags: ['#AILab', '#Infrastructure', '#Research'],
    category: 'Campus',
    isHot: false,
    timeToTrend: '3 hours',
    engagementGrowth: 120
  }
];

const TRENDING_HASHTAGS: TrendingHashtag[] = [
  {
    tag: '#TechFest2024',
    posts: 234,
    growth: 45.6,
    trend: 'up',
    category: 'Events',
    hourlyEngagement: [12, 18, 25, 34, 42, 38, 45, 52, 48, 55, 62, 58]
  },
  {
    tag: '#Placements',
    posts: 189,
    growth: 23.4,
    trend: 'up',
    category: 'Career',
    hourlyEngagement: [8, 12, 16, 20, 25, 22, 28, 35, 32, 38, 42, 45]
  },
  {
    tag: '#MachineLearning',
    posts: 156,
    growth: 18.9,
    trend: 'up',
    category: 'Tech',
    hourlyEngagement: [5, 8, 12, 15, 18, 20, 25, 28, 32, 35, 38, 42]
  },
  {
    tag: '#BITLife',
    posts: 298,
    growth: -5.2,
    trend: 'down',
    category: 'Campus',
    hourlyEngagement: [15, 18, 22, 25, 28, 24, 20, 18, 15, 12, 10, 8]
  }
];

const TRENDING_USERS: TrendingUser[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    username: '@priya_ml',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=100&h=100&fit=crop',
    batch: 'K22',
    verified: false,
    followersGrowth: 45.6,
    engagementRate: 12.3,
    trendingReason: 'Viral ML workshop post'
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    username: '@rahul_placed',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    batch: 'K21',
    verified: false,
    followersGrowth: 67.8,
    engagementRate: 15.7,
    trendingReason: 'Google placement announcement'
  }
];

const TRENDING_CATEGORIES = [
  { id: 'all', label: 'All Trending', icon: Flame },
  { id: 'posts', label: 'Hot Posts', icon: TrendingUp },
  { id: 'hashtags', label: 'Trending Tags', icon: Hash },
  { id: 'users', label: 'Rising Stars', icon: Users },
  { id: 'realtime', label: 'Real-time', icon: Sparkles }
];

export function TrendingContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        console.log('Refreshing trending content...');
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatEngagementGrowth = (growth: number) => {
    const sign = growth > 0 ? '+' : '';
    return `${sign}${growth}%`;
  };

  const handlePostClick = (postId: string) => {
    window.location.href = `/post/${postId}`;
  };

  const handleHashtagClick = (tag: string) => {
    window.location.href = `/hashtags/${tag.replace('#', '')}`;
  };

  const handleUserClick = (username: string) => {
    window.location.href = `/profile/${username.replace('@', '')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold">Trending Now</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <Target className="h-4 w-4 mr-1" />
              Live
            </Button>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {TRENDING_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                <IconComponent className="h-4 w-4 mr-1" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Time range selector */}
        <div className="flex space-x-2">
          {['1h', '6h', '24h', '7d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Trending Posts */}
        {(selectedCategory === 'all' || selectedCategory === 'posts') && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Hot Posts</h2>
            </div>
            
            <div className="space-y-3">
              {TRENDING_POSTS.map((post, index) => (
                <Card 
                  key={post.id} 
                  className={cn(
                    "p-4 cursor-pointer hover:shadow-md transition-all duration-200",
                    post.isHot && "ring-2 ring-orange-500/20 bg-orange-50/50 dark:bg-orange-950/20"
                  )}
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>

                    {/* Author Avatar */}
                    <Avatar className="h-10 w-10">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-full w-full object-cover"
                      />
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm">{post.author.name}</span>
                        <KBatchBadge kBatch={post.author.batch} />
                        {post.author.verified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            ✓
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                      
                      <p className="text-sm mb-2 line-clamp-2">{post.content}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Engagement */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.engagement.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.engagement.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.engagement.comments}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Share className="h-3 w-3" />
                            <span>{post.engagement.shares}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getTrendIcon(post.trendingDirection)}
                          <span className={cn(
                            "text-xs font-medium",
                            post.trendingDirection === 'up' && "text-green-500",
                            post.trendingDirection === 'down' && "text-red-500"
                          )}>
                            {formatEngagementGrowth(post.engagementGrowth)}
                          </span>
                          {post.isHot && (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                              🔥 HOT
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Trending Hashtags */}
        {(selectedCategory === 'all' || selectedCategory === 'hashtags') && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hash className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Trending Hashtags</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TRENDING_HASHTAGS.map((hashtag, index) => (
                <Card 
                  key={hashtag.tag} 
                  className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleHashtagClick(hashtag.tag)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs text-muted-foreground">#{index + 1}</span>
                        <h3 className="font-semibold text-primary text-lg">
                          {hashtag.tag}
                        </h3>
                        {getTrendIcon(hashtag.trend)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {hashtag.posts.toLocaleString()} posts
                      </p>
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {hashtag.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-sm font-medium",
                        hashtag.growth > 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {formatEngagementGrowth(hashtag.growth)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Trending Users */}
        {(selectedCategory === 'all' || selectedCategory === 'users') && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Rising Stars</h2>
            </div>
            
            <div className="space-y-3">
              {TRENDING_USERS.map((user, index) => (
                <Card 
                  key={user.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleUserClick(user.username)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    
                    <Avatar className="h-12 w-12">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">{user.name}</span>
                        <KBatchBadge kBatch={user.batch} />
                        {user.verified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {user.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.trendingReason}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          +{user.followersGrowth}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {user.engagementRate}% engagement
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
