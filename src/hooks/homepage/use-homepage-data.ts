'use client';

import { useState, useEffect } from 'react';
import { QUICK_ACTIONS, CAMPUS_STATS, FEED_POSTS } from '@/constants/homepage';
import { transformTrendingData } from '@/utils/homepage';

export function useHomepageData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would fetch from APIs
  const [data] = useState({
    quickActions: QUICK_ACTIONS,
    campusStats: CAMPUS_STATS,
    feedPosts: FEED_POSTS.slice(0, 5), // Show first 5 posts
    trendingData: transformTrendingData().slice(0, 5), // Show top 5 trending
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    // In a real app, this would refetch from APIs
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
