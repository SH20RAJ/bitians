'use client';

export interface SearchSuggestion {
    id: string;
    text: string;
    type: 'user' | 'hashtag' | 'topic' | 'query';
    relevanceScore: number;
    metadata: {
        category?: string;
        popularity?: number;








































































































    }  return JSON.parse(localStorage.getItem(historyKey) || '[]') as UserSearchHistory[]; const historyKey = 'bitians-search-history'; export function getUserSearchHistory(): UserSearchHistory[] { * / * Get user search history/ **} localStorage.setItem(historyKey, JSON.stringify(updatedHistory)); const updatedHistory = [newEntry, ...filteredHistory].slice(0, 50);  // Add new entry at the beginning and limit to 50 entries    const filteredHistory = history.filter(h => h.query !== query);  // Remove existing entry if it exists    };    category,    resultsCount,    timestamp: new Date().toISOString(),    query,  const newEntry: UserSearchHistory = {    const history = JSON.parse(localStorage.getItem(historyKey) || '[]') as UserSearchHistory[];  const historyKey = 'bitians-search-history';): void {  category?: string  resultsCount: number,  query: string,export function saveSearchToHistory( */ * Save search query to user history/**}  return suggestions.slice(0, limit);    }    suggestions.push(...matchingSuggestions);          }));        metadata: { category: 'suggestion' },        relevanceScore: 70,        type: 'topic' as const,        text: search,        id: `suggestion-${index}`,      .map((search, index) => ({      .slice(0, limit)      .filter(search => search.toLowerCase().includes(query))    const matchingSuggestions = popularSearches        const query = currentQuery.toLowerCase();    // With query - show matching suggestions  } else {    suggestions.push(...recentSuggestions, ...trendingSuggestions);        }));      metadata: { category: 'trending' },      relevanceScore: 85,      type: 'hashtag' as const,      text: term,      id: `trending-${index}`,    const trendingSuggestions = trendingTerms.slice(0, 3).map((term, index) => ({        }));      metadata: { category: 'recent' },      relevanceScore: 90,      type: 'query' as const,      text: h.query,      id: `recent-${index}`,    const recentSuggestions = userHistory.slice(0, 3).map((h, index) => ({    // No query - show recent searches and trending  if (!currentQuery.trim()) {    const { currentQuery, userHistory, trendingTerms, popularSearches } = context;  const suggestions: SearchSuggestion[] = [];): SearchSuggestion[] {  limit = 8  context: SearchContext,export function generateSearchSuggestions( */ * Generate basic search suggestions/**}  popularSearches: string[];  trendingTerms: string[];  userInterests: string[];  userHistory: UserSearchHistory[];  currentQuery: string;export interface SearchContext {}  category?: string;  resultsCount: number;  timestamp: string;  query: string;export interface UserSearchHistory {}  };    relatedTerms?: string[];    recentSearches?: number;    recentSearches?: number;
relatedTerms ?: string[];
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
 * Generate basic search suggestions
 */
export function generateSearchSuggestions(
    context: SearchContext,
    limit = 8
): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    const { currentQuery, userHistory, trendingTerms, popularSearches } = context;

    if (!currentQuery.trim()) {
        // No query - show recent searches and trending
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
    return JSON.parse(localStorage.getItem(historyKey) || '[]') as UserSearchHistory[];
}
popularity ?: number;
recentSearches ?: number;
relatedTerms ?: string[];
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
 * Generate search suggestions based on user input and context
 */
export function generateSearchSuggestions(
    context: SearchContext,
    limit = 8
): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    const { currentQuery, userHistory, userInterests, trendingTerms, popularSearches } = context;

    if (!currentQuery.trim()) {
        // No query - show trending, popular, and personalized suggestions
        return getEmptyQuerySuggestions(context, limit);
    }

    const query = currentQuery.toLowerCase().trim();

    // 1. Exact and partial matches from trending terms
    const trendingMatches = trendingTerms
        .filter(term => term.toLowerCase().includes(query))
        .map(term => ({
            id: `trending-${term}`,
            text: term,
            type: 'hashtag' as const,
            relevanceScore: calculateTrendingRelevance(term, query),
            metadata: {
                category: 'trending',
                popularity: 100,
            },
        }));

    // 2. User history matches
    const historyMatches = userHistory
        .filter(h => h.query.toLowerCase().includes(query))
        .map(h => ({
            id: `history-${h.query}`,
            text: h.query,
            type: 'query' as const,
            relevanceScore: calculateHistoryRelevance(h, query),
            metadata: {
                category: h.category,
                recentSearches: 1,
            },
        }));

    // 3. Popular searches matches
    const popularMatches = popularSearches
        .filter(term => term.toLowerCase().includes(query))
        .map(term => ({
            id: `popular-${term}`,
            text: term,
            type: 'topic' as const,
            relevanceScore: calculatePopularityRelevance(term, query),
            metadata: {
                category: 'popular',
                popularity: 80,
            },
        }));

    // 4. Personalized suggestions based on user interests
    const personalizedMatches = userInterests
        .filter(interest => interest.toLowerCase().includes(query))
        .map(interest => ({
            id: `interest-${interest}`,
            text: interest,
            type: 'topic' as const,
            relevanceScore: calculatePersonalizedRelevance(interest, query),
            metadata: {
                category: 'personalized',
                popularity: 60,
            },
        }));

    // 5. Auto-complete suggestions
    const autoCompleteMatches = generateAutoComplete(query);

    // Combine and rank all suggestions
    suggestions.push(
        ...trendingMatches,
        ...historyMatches,
        ...popularMatches,
        ...personalizedMatches,
        ...autoCompleteMatches
    );

    // Remove duplicates and sort by relevance
    const uniqueSuggestions = suggestions.reduce((acc, suggestion) => {
        const existing = acc.find(s => s.text.toLowerCase() === suggestion.text.toLowerCase());
        if (!existing || existing.relevanceScore < suggestion.relevanceScore) {
            return [...acc.filter(s => s.text.toLowerCase() !== suggestion.text.toLowerCase()), suggestion];
        }
        return acc;
    }, [] as SearchSuggestion[]);

    return uniqueSuggestions
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);
}

/**
 * Get suggestions when user hasn't typed anything
 */
function getEmptyQuerySuggestions(context: SearchContext, limit: number): SearchSuggestion[] {
    const { userHistory, userInterests, trendingTerms, popularSearches } = context;
    const suggestions: SearchSuggestion[] = [];

    // Recent searches (top 3)
    const recentSearches = userHistory
        .slice(0, 3)
        .map(h => ({
            id: `recent-${h.query}`,
            text: h.query,
            type: 'query' as const,
            relevanceScore: 90,
            metadata: {
                category: 'recent',
                recentSearches: 1,
            },
        }));

    // Trending terms (top 3)
    const trendingSuggestions = trendingTerms
        .slice(0, 3)
        .map(term => ({
            id: `trending-${term}`,
            text: term,
            type: 'hashtag' as const,
            relevanceScore: 85,
            metadata: {
                category: 'trending',
                popularity: 100,
            },
        }));

    // User interests (top 2)
    const interestSuggestions = userInterests
        .slice(0, 2)
        .map(interest => ({
            id: `interest-${interest}`,
            text: interest,
            type: 'topic' as const,
            relevanceScore: 80,
            metadata: {
                category: 'personalized',
                popularity: 70,
            },
        }));

    suggestions.push(...recentSearches, ...trendingSuggestions, ...interestSuggestions);

    return suggestions.slice(0, limit);
}

/**
 * Calculate relevance score for trending terms
 */
function calculateTrendingRelevance(term: string, query: string): number {
    const termLower = term.toLowerCase();
    const queryLower = query.toLowerCase();

    if (termLower === queryLower) return 100;
    if (termLower.startsWith(queryLower)) return 90;
    if (termLower.includes(queryLower)) return 80;

    // Fuzzy matching for typos
    const similarity = calculateStringSimilarity(termLower, queryLower);
    return Math.max(0, similarity * 70);
}

/**
 * Calculate relevance score for search history
 */
function calculateHistoryRelevance(historyItem: UserSearchHistory, query: string): number {
    const timeDiff = Date.now() - new Date(historyItem.timestamp).getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    // Recency bonus (more recent = higher score)
    const recencyScore = Math.exp(-daysDiff / 7) * 30; // Decay over a week

    // Exact/partial match score
    const matchScore = calculateTrendingRelevance(historyItem.query, query);

    // Results count bonus (successful searches = higher score)
    const successScore = Math.min(20, historyItem.resultsCount * 2);

    return matchScore + recencyScore + successScore;
}

/**
 * Calculate relevance score for popular searches
 */
function calculatePopularityRelevance(term: string, query: string): number {
    return calculateTrendingRelevance(term, query) * 0.8; // Slightly lower than trending
}

/**
 * Calculate relevance score for personalized suggestions
 */
function calculatePersonalizedRelevance(interest: string, query: string): number {
    return calculateTrendingRelevance(interest, query) * 0.9; // Higher than popular, lower than trending
}

/**
 * Generate auto-complete suggestions
 */
function generateAutoComplete(query: string): SearchSuggestion[] {
    const commonTerms = [
        'machine learning', 'data science', 'web development', 'coding', 'programming',
        'placement', 'internship', 'project', 'study group', 'notes', 'exam', 'semester',
        'festival', 'event', 'club', 'society', 'sports', 'competition', 'workshop',
        'hackathon', 'conference', 'seminar', 'lecture', 'assignment', 'lab', 'research'
    ];

    return commonTerms
        .filter(term => term.toLowerCase().startsWith(query.toLowerCase()))
        .map(term => ({
            id: `autocomplete-${term}`,
            text: term,
            type: 'topic' as const,
            relevanceScore: 60,
            metadata: {
                category: 'autocomplete',
                popularity: 50,
            },
        }));
}

/**
 * Calculate string similarity using Levenshtein distance
 */
function calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
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
    return JSON.parse(localStorage.getItem(historyKey) || '[]') as UserSearchHistory[];
}

/**
 * Clear user search history
 */
export function clearSearchHistory(): void {
    localStorage.removeItem('bitians-search-history');
}
