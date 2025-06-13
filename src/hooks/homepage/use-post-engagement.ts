'use client';

import { useState, useCallback } from 'react';

interface PostEngagement {
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: number;
  shares: number;
}

export function usePostEngagement(initialEngagement: {
  likes: number;
  comments: number;
  shares: number;
}) {
  const [engagement, setEngagement] = useState<PostEngagement>({
    ...initialEngagement,
    isLiked: false,
    isBookmarked: false,
  });

  const toggleLike = useCallback(() => {
    setEngagement(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
    }));
  }, []);

  const toggleBookmark = useCallback(() => {
    setEngagement(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
    }));
  }, []);

  const incrementShare = useCallback(() => {
    setEngagement(prev => ({
      ...prev,
      shares: prev.shares + 1,
    }));
  }, []);

  return {
    engagement,
    toggleLike,
    toggleBookmark,
    incrementShare,
  };
}
