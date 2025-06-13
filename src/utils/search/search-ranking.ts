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

/**
 * Rank search results based on relevance
 */
export function rankSearchResults(
  results: SearchResult[],
  context: SearchContext
): SearchResult[] {
  return results.map(result => ({
    ...result,
    relevancyScore: calculateRelevancyScore(result, context),
  })).sort((a, b) => (b.relevancyScore || 0) - (a.relevancyScore || 0));
}

/**
 * Calculate basic relevancy score
 */
function calculateRelevancyScore(result: SearchResult, context: SearchContext): number {
  const queryLower = context.query.toLowerCase();
  const titleLower = result.title.toLowerCase();
  
  let score = 0;
  
  // Title match scoring
  if (titleLower.includes(queryLower)) {
    score += 80;
  }
  
  // Popularity scoring
  const likes = result.metadata.likes || 0;
  score += Math.min(20, Math.log(likes + 1) * 5);
  
  return Math.min(100, score) / 100;
}
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
  trending: number;
  verification: number;
}

const DEFAULT_RANKING_WEIGHTS: RankingWeights = {
  textRelevance: 0.35,
  popularity: 0.25,
  recency: 0.15,
  personalization: 0.10,
  trending: 0.10,
  verification: 0.05,
};

/**
 * Rank search results based on multiple factors
 */
export function rankSearchResults(
  results: SearchResult[],
  context: SearchContext,
  weights: RankingWeights = DEFAULT_RANKING_WEIGHTS
): SearchResult[] {
  const rankedResults = results.map(result => ({
    ...result,
    relevancyScore: calculateRelevancyScore(result, context, weights),
  }));

  return rankedResults.sort((a, b) => (b.relevancyScore || 0) - (a.relevancyScore || 0));
}

/**
 * Calculate overall relevancy score for a search result
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
  const trendingScore = calculateTrendingScore(result, context.trendingTopics);
  const verificationScore = result.metadata.verified ? 1 : 0;

  const totalScore = 
    textScore * weights.textRelevance +
    popularityScore * weights.popularity +
    recencyScore * weights.recency +
    personalizationScore * weights.personalization +
    trendingScore * weights.trending +
    verificationScore * weights.verification;

  return Math.min(1, totalScore);
}

/**
 * Calculate text relevance score based on query matching
 */
function calculateTextRelevance(result: SearchResult, query: string): number {
  const queryLower = query.toLowerCase().trim();
  const titleLower = result.title.toLowerCase();
  const subtitleLower = result.subtitle?.toLowerCase() || '';
  const descriptionLower = result.description?.toLowerCase() || '';

  let score = 0;

  // Exact title match
  if (titleLower === queryLower) {
    score += 100;
  } else if (titleLower.includes(queryLower)) {
    // Partial title match
    const position = titleLower.indexOf(queryLower);
    const lengthRatio = queryLower.length / titleLower.length;
    
    // Earlier position and higher length ratio = better score
    score += 80 * lengthRatio * (1 - position / titleLower.length);
  }

  // Subtitle match
  if (subtitleLower.includes(queryLower)) {
    score += 40;
  }

  // Description match
  if (descriptionLower.includes(queryLower)) {
    score += 20;
  }

  // Word-by-word matching for multi-word queries
  const queryWords = queryLower.split(/\s+/);
  if (queryWords.length > 1) {
    let wordMatches = 0;
    queryWords.forEach(word => {
      if (titleLower.includes(word)) wordMatches += 3;
      else if (subtitleLower.includes(word)) wordMatches += 2;
      else if (descriptionLower.includes(word)) wordMatches += 1;
    });
    score += (wordMatches / queryWords.length) * 30;
  }

  // Fuzzy matching for typos
  const titleSimilarity = calculateStringSimilarity(titleLower, queryLower);
  if (titleSimilarity > 0.7) {
    score += titleSimilarity * 50;
  }

  return Math.min(1, score / 100);
}

/**
 * Calculate popularity score based on engagement metrics
 */
function calculatePopularityScore(result: SearchResult): number {
  const {
    followers = 0,
    posts = 0,
    likes = 0,
    participants = 0,
    members = 0,
    downloads = 0,
  } = result.metadata;

  let score = 0;

  switch (result.type) {
    case 'person':
      score = Math.log(followers + 1) / Math.log(1000) * 0.7 + 
              Math.log(posts + 1) / Math.log(100) * 0.3;
      break;
    
    case 'post':
      score = Math.log(likes + 1) / Math.log(100);
      break;
    
    case 'event':
      score = Math.log(participants + 1) / Math.log(500);
      break;
    
    case 'study-group':
      score = Math.log(members + 1) / Math.log(200) * 0.6 + 
              Math.log(posts + 1) / Math.log(50) * 0.4;
      break;
    
    case 'note':
      score = Math.log(downloads + 1) / Math.log(100);
      break;
    
    case 'hashtag':
      score = Math.log(posts + 1) / Math.log(200);
      break;
  }

  return Math.min(1, score);
}

/**
 * Calculate recency score based on content age
 */
function calculateRecencyScore(result: SearchResult): number {
  if (!result.metadata.date) return 0.5; // Neutral score for items without dates

  const now = Date.now();
  const createdAt = new Date(result.metadata.date).getTime();
  const ageInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

  // Different decay rates for different content types
  let decayRate: number;
  switch (result.type) {
    case 'post':
      decayRate = 3; // Posts decay faster
      break;
    case 'event':
      decayRate = 7; // Events are relevant longer
      break;
    case 'note':
      decayRate = 30; // Notes stay relevant longer
      break;
    default:
      decayRate = 7;
  }

  // Exponential decay
  return Math.exp(-ageInDays / decayRate);
}

/**
 * Calculate personalization score based on user interests and activity
 */
function calculatePersonalizationScore(
  result: SearchResult,
  context: SearchContext
): number {
  let score = 0;

  // Interest-based scoring
  const resultCategory = result.metadata.category || '';
  if (context.userInterests.includes(resultCategory)) {
    score += 0.5;
  }

  // Activity-based scoring
  const userActivity = context.userActivity.find(a => a.category === resultCategory);
  if (userActivity) {
    score += userActivity.engagement * 0.3;
  }

  // Search history relevance
  const isInHistory = context.searchHistory.some(h => 
    h.toLowerCase().includes(result.title.toLowerCase()) ||
    result.title.toLowerCase().includes(h.toLowerCase())
  );
  if (isInHistory) {
    score += 0.2;
  }

  return Math.min(1, score);
}

/**
 * Calculate trending score
 */
function calculateTrendingScore(result: SearchResult, trendingTopics: string[]): number {
  if (result.metadata.trending) return 1;

  // Check if result relates to trending topics
  const resultText = `${result.title} ${result.subtitle} ${result.description}`.toLowerCase();
  const trendingMatches = trendingTopics.filter(topic => 
    resultText.includes(topic.toLowerCase())
  );

  return Math.min(1, trendingMatches.length * 0.3);
}

/**
 * Calculate string similarity using a simplified algorithm
 */
function calculateStringSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1;
  
  // Simple substring matching
  let matches = 0;
  const shorterWords = shorter.split(/\s+/);
  const longerWords = longer.split(/\s+/);
  
  shorterWords.forEach(shortWord => {
    if (longerWords.some(longWord => longWord.includes(shortWord))) {
      matches++;
    }
  });
  
  return matches / shorterWords.length;
}

/**
 * Apply advanced filters to search results
 */
export function applyAdvancedFilters(
  results: SearchResult[],
  filters: {
    verified?: boolean;
    hasMedia?: boolean;
    hasLinks?: boolean;
    minLikes?: number;
    dateRange?: {
      from?: Date;
      to?: Date;
    };
    category?: string;
  }
): SearchResult[] {
  return results.filter(result => {
    // Verified filter
    if (filters.verified !== undefined && result.metadata.verified !== filters.verified) {
      return false;
    }

    // Media filter
    if (filters.hasMedia && !result.metadata.hasMedia) {
      return false;
    }

    // Links filter
    if (filters.hasLinks && !result.metadata.hasLinks) {
      return false;
    }

    // Minimum likes filter
    if (filters.minLikes && (result.metadata.likes || 0) < filters.minLikes) {
      return false;
    }

    // Date range filter
    if (filters.dateRange && result.metadata.date) {
      const resultDate = new Date(result.metadata.date);
      if (filters.dateRange.from && resultDate < filters.dateRange.from) {
        return false;
      }
      if (filters.dateRange.to && resultDate > filters.dateRange.to) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== 'all' && 
        result.metadata.category !== filters.category) {
      return false;
    }

    return true;
  });
}

/**
 * Get search result insights for analytics
 */
export function getSearchInsights(results: SearchResult[]): {
  totalResults: number;
  typeDistribution: Record<string, number>;
  averageRelevancy: number;
  topCategories: Array<{ category: string; count: number }>;
} {
  const typeDistribution: Record<string, number> = {};
  const categoryCount: Record<string, number> = {};
  let totalRelevancy = 0;

  results.forEach(result => {
    // Type distribution
    typeDistribution[result.type] = (typeDistribution[result.type] || 0) + 1;

    // Category distribution
    const category = result.metadata.category || 'uncategorized';
    categoryCount[category] = (categoryCount[category] || 0) + 1;

    // Relevancy sum
    totalRelevancy += result.relevancyScore || 0;
  });

  const topCategories = Object.entries(categoryCount)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalResults: results.length,
    typeDistribution,
    averageRelevancy: results.length > 0 ? totalRelevancy / results.length : 0,
    topCategories,
  };
}
