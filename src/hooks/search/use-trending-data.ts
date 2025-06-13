'use client';

import { useState, useEffect, useCallback } from 'react';
import { calculateTrendingScore, type TrendingItem } from '@/utils/search/trending-algorithm';
import { MOCK_FEED_DATA } from '@/constants/feeds/mock-feed-data';
import { TRENDING_HASHTAGS } from '@/constants/homepage/trending-data';

export interface TrendingData {
  posts: TrendingItem[];
  hashtags: TrendingItem[];
  users: TrendingItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date;
}

export interface TrendingFilters {
  timeRange: '1h' | '6h' | '24h' | '7d';
  category: 'all' | 'tech' | 'academic' | 'social' | 'events';
  minEngagement: number;
}

/**
 * Hook for managing real-time trending data
 */
export function useTrendingData(filters: TrendingFilters = {
  timeRange: '24h',
  category: 'all',
  minEngagement: 5
}) {
  const [data, setData] = useState<TrendingData>({
    posts: [],
    hashtags: [],
    users: [],
    loading: true,
    error: null,
    lastUpdated: new Date()
  });

  const [autoRefresh, setAutoRefresh] = useState(true);

  /**
   * Transform feed data to trending items
   */
  const transformPostsToTrending = useCallback((posts: any[]): TrendingItem[] => {
    return posts.map(post => {
      const trendingItem: TrendingItem = {
        id: post.id,
        title: post.content?.substring(0, 100) + '...' || 'Untitled Post',
        type: 'post',
        engagementScore: 0,
        recencyScore: 0,
        velocityScore: 0,
        totalScore: 0,
        metadata: {
          likes: post.engagement?.likes || 0,
          shares: post.engagement?.shares || 0,
          comments: post.engagement?.comments || 0,
          views: post.engagement?.views || 0,
          createdAt: getRelativeTimestamp(post.timestamp),
          category: getCategoryFromTags(post.tags) || 'general'
        }
      };

      return calculateTrendingScore(trendingItem);
    }).filter(item => item.totalScore > 0.3) // Filter out low-scoring items
      .sort((a, b) => b.totalScore - a.totalScore);
  }, []);

  /**
   * Transform hashtags to trending items
   */
  const transformHashtagsToTrending = useCallback((): TrendingItem[] => {
    return TRENDING_HASHTAGS.map(hashtag => {
      const trendingItem: TrendingItem = {
        id: hashtag.tag.replace('#', ''),
        title: hashtag.tag,
        type: 'hashtag',
        engagementScore: 0,
        recencyScore: 0,
        velocityScore: 0,
        totalScore: 0,
        metadata: {
          mentions: hashtag.posts,
          createdAt: new Date().toISOString(),
          category: hashtag.category
        }
      };

      return calculateTrendingScore(trendingItem);
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, []);

  /**
   * Calculate trending users based on activity
   */
  const calculateTrendingUsers = useCallback((posts: any[]): TrendingItem[] => {
    const userEngagement = new Map<string, {
      user: any;
      totalLikes: number;
      totalComments: number;
      totalShares: number;
      postCount: number;
      recentActivity: number;
    }>();

    // Aggregate user engagement data
    posts.forEach(post => {
      const userId = post.author.id;
      const existing = userEngagement.get(userId) || {
        user: post.author,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        postCount: 0,
        recentActivity: 0
      };

      existing.totalLikes += post.engagement?.likes || 0;
      existing.totalComments += post.engagement?.comments || 0;
      existing.totalShares += post.engagement?.shares || 0;
      existing.postCount += 1;
      
      // Recent activity bonus (posts from last 24h)
      const postAge = Date.now() - new Date(getRelativeTimestamp(post.timestamp)).getTime();
      if (postAge < 24 * 60 * 60 * 1000) {
        existing.recentActivity += 1;
      }

      userEngagement.set(userId, existing);
    });

    // Convert to trending items
    return Array.from(userEngagement.entries()).map(([userId, data]) => {
      const trendingItem: TrendingItem = {
        id: userId,
        title: data.user.name,
        type: 'user',
        engagementScore: 0,
        recencyScore: 0,
        velocityScore: 0,
        totalScore: 0,
        metadata: {
          likes: data.totalLikes,
          comments: data.totalComments,
          shares: data.totalShares,
          createdAt: new Date().toISOString(),
          category: 'user'
        }
      };

      return calculateTrendingScore(trendingItem);
    }).filter(item => item.totalScore > 0.4)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10); // Top 10 trending users
  }, []);

  /**
   * Load trending data
   */
  const loadTrendingData = useCallback(async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter posts based on time range
      const now = Date.now();
      const timeRangeMs = {
        '1h': 60 * 60 * 1000,
        '6h': 6 * 60 * 60 * 1000,
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000
      };

      const cutoffTime = now - timeRangeMs[filters.timeRange];
      const recentPosts = MOCK_FEED_DATA.filter(post => {
        const postTime = new Date(getRelativeTimestamp(post.timestamp)).getTime();
        return postTime > cutoffTime;
      });

      // Calculate trending data
      const trendingPosts = transformPostsToTrending(recentPosts);
      const trendingHashtags = transformHashtagsToTrending();
      const trendingUsers = calculateTrendingUsers(recentPosts);

      setData({
        posts: trendingPosts.slice(0, 20),
        hashtags: trendingHashtags.slice(0, 15),
        users: trendingUsers.slice(0, 10),
        loading: false,
        error: null,
        lastUpdated: new Date()
      });

    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load trending data'
      }));
    }
  }, [filters, transformPostsToTrending, transformHashtagsToTrending, calculateTrendingUsers]);

  /**
   * Refresh trending data
   */
  const refreshTrendingData = useCallback(() => {
    loadTrendingData();
  }, [loadTrendingData]);

  // Load data on mount and filter changes
  useEffect(() => {
    loadTrendingData();
  }, [loadTrendingData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadTrendingData();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [autoRefresh, loadTrendingData]);

  return {
    ...data,
    refreshTrendingData,
    autoRefresh,
    setAutoRefresh,
    filters
  };
}

/**
 * Helper function to convert relative timestamps to ISO strings
 */
function getRelativeTimestamp(timestamp: string): string {
  const now = new Date();
  
  if (timestamp.includes('minute')) {
    const minutes = parseInt(timestamp) || 1;
    return new Date(now.getTime() - minutes * 60 * 1000).toISOString();
  } else if (timestamp.includes('hour')) {
    const hours = parseInt(timestamp) || 1;
    return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
  } else if (timestamp.includes('day')) {
    const days = parseInt(timestamp) || 1;
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
  }
  
  // Default to 1 hour ago
  return new Date(now.getTime() - 60 * 60 * 1000).toISOString();
}

/**
 * Helper function to extract category from tags
 */
function getCategoryFromTags(tags: string[] = []): string {
  const categoryMap: Record<string, string> = {
    'MachineLearning': 'tech',
    'AI': 'tech',
    'Coding': 'tech',
    'TechFest': 'events',
    'Placement': 'academic',
    'StudyGroup': 'academic',
    'BITLife': 'social',
    'Confession': 'social'
  };

  for (const tag of tags) {
    const cleanTag = tag.replace('#', '');
    if (categoryMap[cleanTag]) {
      return categoryMap[cleanTag];
    }
  }

  return 'general';
}
