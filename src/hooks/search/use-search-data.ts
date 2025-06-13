'use client';

import { useState, useEffect, useMemo } from 'react';

interface SearchResult {
  id: string;
  type: 'person' | 'post' | 'event' | 'study-group' | 'note' | 'hashtag';
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
  badge?: string;
  metadata?: {
    followers?: number;
    posts?: number;
    date?: string;
    likes?: number;
    participants?: number;
    members?: number;
    downloads?: number;
    rating?: string;
    trending?: boolean;
    verified?: boolean;
    hasMedia?: boolean;
    hasLinks?: boolean;
  };
}

// Mock data for search results
const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    type: 'person',
    title: 'Rahul Sharma',
    subtitle: '@rahul_k23 • Computer Science',
    description: 'Machine Learning enthusiast, placement coordinator',
    avatar: 'RS',
    badge: 'K23',
    metadata: { 
      followers: 234, 
      posts: 89, 
      verified: false,
      hasMedia: true,
      hasLinks: true
    }
  },
  {
    id: '2',
    type: 'post',
    title: 'Machine Learning Workshop Results',
    subtitle: 'Posted by Tech Society BIT',
    description: 'Amazing turnout for our ML workshop! 150+ students participated and learned about neural networks, deep learning fundamentals...',
    metadata: { 
      date: '2 hours ago', 
      likes: 45,
      verified: true,
      hasMedia: true,
      hasLinks: false
    }
  },
  {
    id: '3',
    type: 'event',
    title: 'TechFest 2024 - Coding Competition',
    subtitle: 'Computer Science Department',
    description: 'Annual coding competition with exciting prizes. Register now!',
    metadata: { 
      date: 'Dec 25, 2024', 
      participants: 120,
      verified: true,
      hasMedia: false,
      hasLinks: true
    }
  },
  {
    id: '4',
    type: 'study-group',
    title: 'Data Structures & Algorithms',
    subtitle: 'Computer Science • K23 Batch',
    description: 'Weekly study sessions for DSA preparation. Join us every Sunday at 7 PM in CR-1.',
    metadata: { 
      members: 45, 
      posts: 123,
      verified: false,
      hasMedia: false,
      hasLinks: false
    }
  },
  {
    id: '5',
    type: 'note',
    title: 'Operating Systems Unit 3 Notes',
    subtitle: 'Shared by Priya Singh',
    description: 'Comprehensive notes covering process scheduling, memory management, and deadlocks.',
    metadata: { 
      downloads: 89, 
      rating: '4.8/5',
      verified: false,
      hasMedia: true,
      hasLinks: false
    }
  },
  {
    id: '6',
    type: 'hashtag',
    title: '#MachineLearning',
    subtitle: '234 posts • Trending',
    description: 'Latest discussions about ML projects, research, and career opportunities.',
    metadata: { 
      posts: 234, 
      trending: true,
      verified: false,
      hasMedia: true,
      hasLinks: true
    }
  },
];

export function useSearchData(query: string, filter: string) {
  const [isLoading, setIsLoading] = useState(false);

  // Filter results based on query and filter type
  const results = useMemo(() => {
    if (!query.trim()) return [];

    let filtered = MOCK_RESULTS.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      result.description?.toLowerCase().includes(query.toLowerCase())
    );

    if (filter !== 'all') {
      filtered = filtered.filter(result => 
        result.type === filter || result.type.replace('-', '') === filter.replace('-', '')
      );
    }

    return filtered;
  }, [query, filter]);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [query, filter]);

  return {
    results,
    isLoading: isLoading && query.trim().length > 0,
  };
}
