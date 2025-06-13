'use client';

import { useState, useEffect } from 'react';
import { FeedFilters } from './FeedFilters';
import { FeedList } from './FeedList';
import { useFeedsData } from '@/hooks/feeds/useFeedsData';

export function FeedsPage() {
  const {
    posts,
    loading,
    selectedFilter,
    setSelectedFilter,
    refreshPosts,
    loadMore,
    hasMore
  } = useFeedsData();

  return (
    <div className="min-h-screen bg-background">
      {/* Filters */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <FeedFilters
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </div>

      {/* Feed Content */}
      <div className="pb-20">
        <FeedList
          posts={posts}
          loading={loading}
          onLoadMore={loadMore}
          hasMore={hasMore}
          onRefresh={refreshPosts}
        />
      </div>
    </div>
  );
}
