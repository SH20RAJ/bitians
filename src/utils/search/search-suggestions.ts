'use client';

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'user' | 'hashtag' | 'topic' | 'query';
  relevanceScore: number;
  metadata: {
    category?: string;
    popularity?: number;
    recentSearches?: number;
    relatedTerms?: string[];
  };
}

export interface UserSearchHistory {
  query: string;
  timestamp: string;
  resultsCount: number;
  category?: string;
}

export interface SearchContext {
  currentQuery: string;
  userHistory: UserSearchHistory[];
  userInterests: string[];
  trendingTerms: string[];
  popularSearches: string[];
}

/**
 * Generate search suggestions based on context
 */
export function generateSearchSuggestions(
  context: SearchContext,
  limit = 8
): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  const { currentQuery, userHistory, trendingTerms, popularSearches } = context;

  // No query - show recent searches and trending
  if (!currentQuery.trim()) {
    const recentSuggestions = userHistory.slice(0, 3).map((h, index) => ({
      id: `recent-${index}`,
      text: h.query,
      type: 'query' as const,
      relevanceScore: 90,
      metadata: { category: 'recent' },
    }));

    const trendingSuggestions = trendingTerms.slice(0, 3).map((term, index) => ({
      id: `trending-${index}`,
      text: term,
      type: 'hashtag' as const,
      relevanceScore: 85,
      metadata: { category: 'trending' },
    }));

    suggestions.push(...recentSuggestions, ...trendingSuggestions);
  } else {
    // With query - show matching suggestions
    const query = currentQuery.toLowerCase();

    const matchingSuggestions = popularSearches
      .filter(search => search.toLowerCase().includes(query))
      .slice(0, limit)
      .map((search, index) => ({
        id: `suggestion-${index}`,
        text: search,
        type: 'topic' as const,
        relevanceScore: 70,
        metadata: { category: 'suggestion' },
      }));

    suggestions.push(...matchingSuggestions);
  }

  return suggestions.slice(0, limit);
}

/**
 * Save search query to user history
 */
export function saveSearchToHistory(
  query: string,
  resultsCount: number,
  category?: string
): void {
  const historyKey = 'bitians-search-history';
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]') as UserSearchHistory[];

  const newEntry: UserSearchHistory = {
    query,
    timestamp: new Date().toISOString(),
    resultsCount,
    category,
  };

  // Remove existing entry if it exists
  const filteredHistory = history.filter(h => h.query !== query);
  
  // Add new entry at the beginning and limit to 50 entries
  const updatedHistory = [newEntry, ...filteredHistory].slice(0, 50);

  localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
}

/**
 * Get user search history
 */
export function getUserSearchHistory(): UserSearchHistory[] {
  const historyKey = 'bitians-search-history';
  try {
    return JSON.parse(localStorage.getItem(historyKey) || '[]') as UserSearchHistory[];
  } catch {
    return [];
  }
}

/**
 * Clear search history
 */
export function clearSearchHistory(): void {
  const historyKey = 'bitians-search-history';
  localStorage.removeItem(historyKey);
}

/**
 * Get trending search terms
 */
export function getTrendingSearchTerms(): string[] {
  // In a real app, this would come from an API
  return [
    '#TechFest2024',
    '#Placements',
    '#MachineLearning',
    '#StudyGroup',
    '#BITLife',
    '#Coding',
    '#AI',
    '#DataScience',
    '#Internship',
    '#Project'
  ];
}

/**
 * Get popular searches
 */
export function getPopularSearches(): string[] {
  // In a real app, this would come from analytics
  return [
    'Machine Learning projects',
    'Placement preparation',
    'Study groups near me',
    'Tech fest events',
    'Coding competitions',
    'AI courses',
    'Data science internships',
    'Campus events',
    'Programming tutorials',
    'Career guidance'
  ];
}

/**
 * Enhanced suggestion generation with ML-like features
 */
export function generateAdvancedSuggestions(
  context: SearchContext,
  userPreferences: {
    favoriteCategories: string[];
    searchPatterns: string[];
    timeOfDay: 'morning' | 'afternoon' | 'evening';
  },
  limit = 10
): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  const { currentQuery, userHistory, trendingTerms } = context;

  if (!currentQuery.trim()) {
    // Personalized suggestions based on time and preferences
    const personalizedSuggestions = generatePersonalizedSuggestions(
      userPreferences,
      trendingTerms,
      userHistory
    );
    suggestions.push(...personalizedSuggestions);
  } else {
    // Context-aware suggestions
    const contextAwareSuggestions = generateContextAwareSuggestions(
      currentQuery,
      userPreferences,
      trendingTerms
    );
    suggestions.push(...contextAwareSuggestions);
  }

  // Sort by relevance score and limit results
  return suggestions
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

/**
 * Generate personalized suggestions
 */
function generatePersonalizedSuggestions(
  preferences: { favoriteCategories: string[]; timeOfDay: string },
  trendingTerms: string[],
  userHistory: UserSearchHistory[]
): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];

  // Time-based suggestions
  const timeBasedTerms = getTimeBasedSuggestions(preferences.timeOfDay);
  timeBasedTerms.forEach((term, index) => {
    suggestions.push({
      id: `time-${index}`,
      text: term,
      type: 'topic',
      relevanceScore: 85,
      metadata: { category: 'time-based' }
    });
  });

  // Category-based suggestions
  preferences.favoriteCategories.forEach(category => {
    const categoryTerms = getCategoryTerms(category);
    categoryTerms.slice(0, 2).forEach((term, index) => {
      suggestions.push({
        id: `category-${category}-${index}`,
        text: term,
        type: 'topic',
        relevanceScore: 80,
        metadata: { category }
      });
    });
  });

  return suggestions;
}

/**
 * Generate context-aware suggestions
 */
function generateContextAwareSuggestions(
  query: string,
  preferences: { favoriteCategories: string[] },
  trendingTerms: string[]
): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  const queryLower = query.toLowerCase();

  // Find matching trending terms
  const matchingTrending = trendingTerms.filter(term =>
    term.toLowerCase().includes(queryLower)
  );

  matchingTrending.forEach((term, index) => {
    suggestions.push({
      id: `trending-match-${index}`,
      text: term,
      type: 'hashtag',
      relevanceScore: 90,
      metadata: { category: 'trending' }
    });
  });

  // Generate query completions
  const completions = generateQueryCompletions(query);
  completions.forEach((completion, index) => {
    suggestions.push({
      id: `completion-${index}`,
      text: completion,
      type: 'query',
      relevanceScore: 75,
      metadata: { category: 'completion' }
    });
  });

  return suggestions;
}

/**
 * Get time-based suggestions
 */
function getTimeBasedSuggestions(timeOfDay: string): string[] {
  const timeBasedMap: Record<string, string[]> = {
    morning: ['Study plans', 'Morning events', 'Breakfast spots'],
    afternoon: ['Lunch groups', 'Afternoon classes', 'Study sessions'],
    evening: ['Evening events', 'Dinner plans', 'Social activities']
  };

  return timeBasedMap[timeOfDay] || [];
}

/**
 * Get category-specific terms
 */
function getCategoryTerms(category: string): string[] {
  const categoryMap: Record<string, string[]> = {
    tech: ['Programming', 'AI projects', 'Tech meetups', 'Coding bootcamp'],
    academic: ['Study groups', 'Research papers', 'Academic events', 'Exam prep'],
    social: ['Campus events', 'Social clubs', 'Meetups', 'Parties'],
    career: ['Internships', 'Placements', 'Career fairs', 'Resume building']
  };

  return categoryMap[category] || [];
}

/**
 * Generate query completions
 */
function generateQueryCompletions(query: string): string[] {
  const commonCompletions: Record<string, string[]> = {
    'machine': ['machine learning', 'machine learning projects', 'machine learning course'],
    'study': ['study groups', 'study materials', 'study schedule'],
    'tech': ['tech events', 'tech fest', 'tech talks'],
    'placement': ['placement preparation', 'placement drive', 'placement tips'],
    'coding': ['coding competition', 'coding bootcamp', 'coding projects']
  };

  const queryKey = query.toLowerCase().split(' ')[0];
  return commonCompletions[queryKey] || [];
}

/**
 * Analytics functions for search improvement
 */
export function trackSearchInteraction(
  query: string,
  resultId: string,
  action: 'click' | 'view' | 'share'
): void {
  // In a real app, this would send analytics data
  console.log('Search interaction:', { query, resultId, action });
}

export function getSearchAnalytics(): {
  popularQueries: Array<{ query: string; count: number }>;
  trendingTopics: Array<{ topic: string; growth: number }>;
} {
  // Mock analytics data
  return {
    popularQueries: [
      { query: 'machine learning', count: 150 },
      { query: 'study groups', count: 120 },
      { query: 'placement prep', count: 100 }
    ],
    trendingTopics: [
      { topic: 'AI', growth: 25 },
      { topic: 'Internships', growth: 18 },
      { topic: 'Tech Events', growth: 15 }
    ]
  };
}
