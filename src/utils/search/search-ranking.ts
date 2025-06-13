'use client';

export interface SearchResult {
  id: string;
  type: 'person' | 'post' | 'event' | 'study-group' | 'note' | 'hashtag';
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
  badge?: string;
  metadata: {
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
    category?: string;
    engagement?: number;
    recency?: number;
  };
  relevancyScore?: number;
}

export interface SearchContext {
  query: string;
  userInterests: string[];
  userActivity: Array<{ category: string; engagement: number }>;
  searchHistory: string[];
  trendingTopics: string[];
}

export interface RankingWeights {
  textRelevance: number;
  popularity: number;
  recency: number;
  personalization: number;
}

const DEFAULT_WEIGHTS: RankingWeights = {
  textRelevance: 0.4,
  popularity: 0.3,
  recency: 0.2,
  personalization: 0.1,
};

/**
 * Rank search results based on relevance
 */
export function rankSearchResults(
  results: SearchResult[],
  context: SearchContext,
  weights: RankingWeights = DEFAULT_WEIGHTS
): SearchResult[] {
  return results.map(result => ({
    ...result,
    relevancyScore: calculateRelevancyScore(result, context, weights),
  })).sort((a, b) => (b.relevancyScore || 0) - (a.relevancyScore || 0));
}

/**
 * Calculate comprehensive relevancy score
 */
function calculateRelevancyScore(
  result: SearchResult, 
  context: SearchContext, 
  weights: RankingWeights
): number {
  const textScore = calculateTextRelevance(result, context.query);
  const popularityScore = calculatePopularityScore(result);
  const recencyScore = calculateRecencyScore(result);
  const personalizationScore = calculatePersonalizationScore(result, context);

  return (
    textScore * weights.textRelevance +
    popularityScore * weights.popularity +
    recencyScore * weights.recency +
    personalizationScore * weights.personalization
  );
}

/**
 * Calculate text relevance score
 */
function calculateTextRelevance(result: SearchResult, query: string): number {
  const queryLower = query.toLowerCase();
  const titleLower = result.title.toLowerCase();
  const subtitleLower = (result.subtitle || '').toLowerCase();
  const descriptionLower = (result.description || '').toLowerCase();

  let score = 0;

  // Exact title match gets highest score
  if (titleLower === queryLower) {
    score += 100;
  } else if (titleLower.includes(queryLower)) {
    score += 80;
  } else if (titleLower.startsWith(queryLower)) {
    score += 70;
  }

  // Subtitle matching
  if (subtitleLower.includes(queryLower)) {
    score += 30;
  }

  // Description matching
  if (descriptionLower.includes(queryLower)) {
    score += 20;
  }

  // Bonus for verified content
  if (result.metadata.verified) {
    score += 10;
  }

  return Math.min(100, score) / 100;
}

/**
 * Calculate popularity score
 */
function calculatePopularityScore(result: SearchResult): number {
  const likes = result.metadata.likes || 0;
  const followers = result.metadata.followers || 0;
  const comments = result.metadata.participants || 0;

  const totalEngagement = likes + (followers * 0.1) + (comments * 2);
  
  // Logarithmic scale to prevent outliers from dominating
  return Math.min(1, Math.log(totalEngagement + 1) / Math.log(1000));
}

/**
 * Calculate recency score
 */
function calculateRecencyScore(result: SearchResult): number {
  if (!result.metadata.date) return 0.5; // Neutral score for undated content

  const now = new Date();
  const contentDate = new Date(result.metadata.date);
  const ageInHours = (now.getTime() - contentDate.getTime()) / (1000 * 60 * 60);

  // Content becomes less relevant over time
  if (ageInHours <= 1) return 1.0;
  if (ageInHours <= 24) return 0.8;
  if (ageInHours <= 168) return 0.6; // 1 week
  if (ageInHours <= 720) return 0.4; // 1 month
  return 0.2;
}

/**
 * Calculate personalization score
 */
function calculatePersonalizationScore(result: SearchResult, context: SearchContext): number {
  let score = 0.5; // Base neutral score

  // User interest matching
  const category = result.metadata.category;
  if (category && context.userInterests.includes(category)) {
    score += 0.3;
  }

  // Search history relevance
  const titleWords = result.title.toLowerCase().split(' ');
  const historyMatches = context.searchHistory.filter(query =>
    titleWords.some(word => query.toLowerCase().includes(word))
  );
  score += Math.min(0.2, historyMatches.length * 0.05);

  // Trending bonus
  if (result.metadata.trending) {
    score += 0.1;
  }

  return Math.min(1, score);
}

/**
 * Advanced ranking with machine learning-like features
 */
export function advancedRankSearchResults(
  results: SearchResult[],
  context: SearchContext,
  userFeedback?: Array<{ resultId: string; clicked: boolean; timeSpent: number }>
): SearchResult[] {
  const enhancedResults = results.map(result => {
    const baseScore = calculateRelevancyScore(result, context, DEFAULT_WEIGHTS);
    
    // Apply user feedback if available
    let feedbackBonus = 0;
    if (userFeedback) {
      const feedback = userFeedback.find(f => f.resultId === result.id);
      if (feedback) {
        feedbackBonus = feedback.clicked ? 0.1 : -0.05;
        feedbackBonus += Math.min(0.1, feedback.timeSpent / 10000); // Bonus for time spent
      }
    }

    return {
      ...result,
      relevancyScore: Math.max(0, Math.min(1, baseScore + feedbackBonus))
    };
  });

  return enhancedResults.sort((a, b) => (b.relevancyScore || 0) - (a.relevancyScore || 0));
}

/**
 * Get search result categories for filtering
 */
export function getSearchCategories(results: SearchResult[]): string[] {
  const categories = new Set<string>();
  results.forEach(result => {
    if (result.metadata.category) {
      categories.add(result.metadata.category);
    }
  });
  return Array.from(categories).sort();
}

/**
 * Filter search results by type and criteria
 */
export function filterSearchResults(
  results: SearchResult[],
  filters: {
    types?: string[];
    categories?: string[];
    verified?: boolean;
    trending?: boolean;
    minEngagement?: number;
  }
): SearchResult[] {
  return results.filter(result => {
    if (filters.types && !filters.types.includes(result.type)) {
      return false;
    }

    if (filters.categories && result.metadata.category && 
        !filters.categories.includes(result.metadata.category)) {
      return false;
    }

    if (filters.verified !== undefined && result.metadata.verified !== filters.verified) {
      return false;
    }

    if (filters.trending !== undefined && result.metadata.trending !== filters.trending) {
      return false;
    }

    if (filters.minEngagement !== undefined) {
      const engagement = (result.metadata.likes || 0) + (result.metadata.followers || 0);
      if (engagement < filters.minEngagement) {
        return false;
      }
    }

    return true;
  });
}
