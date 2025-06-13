'use client';

import { useState, useEffect, useCallback } from 'react';
import { MOCK_FEED_DATA } from '@/constants/feeds/mock-feed-data';

export function useFeedsData() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filter posts based on selected filter
  const getFilteredPosts = useCallback(() => {
    if (selectedFilter === 'all') {
      return MOCK_FEED_DATA;
    }
    return MOCK_FEED_DATA.filter(post => post.type === selectedFilter);
  }, [selectedFilter]);

  // Load initial posts
  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredPosts = getFilteredPosts();
      const postsPerPage = 10;
      const startIndex = 0;
      const endIndex = postsPerPage;
      
      const initialPosts = filteredPosts.slice(startIndex, endIndex);
      setPosts(initialPosts);
      setHasMore(filteredPosts.length > postsPerPage);
      setPage(1);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }, [getFilteredPosts]);

  // Load more posts for infinite scroll
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredPosts = getFilteredPosts();
      const postsPerPage = 10;
      const startIndex = page * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      
      const newPosts = filteredPosts.slice(startIndex, endIndex);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
        setHasMore(endIndex < filteredPosts.length);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, getFilteredPosts]);

  // Refresh posts
  const refreshPosts = useCallback(async () => {
    setPage(1);
    await loadPosts();
  }, [loadPosts]);

  // Handle filter change
  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter(filter);
    setPage(1);
  }, []);

  // Load posts when filter changes
  useEffect(() => {
    loadPosts();
  }, [selectedFilter, loadPosts]);

  // Post engagement actions
  const toggleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.engagement.isLiked;
        return {
          ...post,
          engagement: {
            ...post.engagement,
            isLiked: !isLiked,
            likes: isLiked ? post.engagement.likes - 1 : post.engagement.likes + 1
          }
        };
      }
      return post;
    }));
  }, []);

  const toggleBookmark = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          engagement: {
            ...post.engagement,
            isBookmarked: !post.engagement.isBookmarked
          }
        };
      }
      return post;
    }));
  }, []);

  const sharePost = useCallback((postId: string) => {
    // Implement share functionality
    console.log('Sharing post:', postId);
  }, []);

  return {
    posts,
    loading,
    selectedFilter,
    setSelectedFilter: handleFilterChange,
    refreshPosts,
    loadMore,
    hasMore,
    toggleLike,
    toggleBookmark,
    sharePost
  };
}
