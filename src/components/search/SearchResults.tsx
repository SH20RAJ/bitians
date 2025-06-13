'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { Badge } from '@/components/ui/badge';
import { UserPlus, MessageCircle, Calendar, BookOpen, Hash, TrendingUp, Star, Clock, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rankSearchResults, type SearchResult as RankedSearchResult, type SearchContext } from '@/utils/search/search-ranking';

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

interface SearchFilters {
  sortBy: string;
  timeRange: string;
  postType: string;
  verified: string;
  hasMedia: boolean;
  hasLinks: boolean;
  minLikes: number;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  filter: string;
  filters?: SearchFilters;
  isLoading?: boolean;
  className?: string;
}

function ResultCard({ result, query }: { result: SearchResult; query: string }) {
  const icons = {
    person: UserPlus,
    post: MessageCircle,
    event: Calendar,
    'study-group': BookOpen,
    note: BookOpen,
    hashtag: Hash,
  };

  const Icon = icons[result.type];

  // Calculate basic relevance score
  const relevanceScore = useMemo(() => {
    if (!query) return 0;
    const text = `${result.title} ${result.subtitle || ''} ${result.description || ''}`.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (text.includes(queryLower)) {
      // Perfect match gets higher score
      if (result.title.toLowerCase().includes(queryLower)) return 0.9;
      return 0.7;
    }
    return 0.3;
  }, [result, query]);

  // Calculate basic trending score
  const trendingScore = useMemo(() => {
    if (!result.metadata) return 0;
    const likes = result.metadata.likes || 0;
    const followers = result.metadata.followers || 0;
    const isRecent = result.metadata.date && new Date(result.metadata.date) > new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    let score = Math.min(50, Math.log(likes + followers + 1) * 10);
    if (isRecent) score += 20;
    if (result.metadata.trending) score += 30;
    
    return score;
  }, [result.metadata]);

  const showAdvancedMetrics = query.length > 0 && (relevanceScore > 0.7 || trendingScore > 50);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start space-x-3">
        {result.avatar && (
          <Avatar className="h-12 w-12 border border-border/50">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              {result.avatar}
            </div>
          </Avatar>
        )}
        
        {!result.avatar && (
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{result.title}</h3>
            {result.badge && (
              <KBatchBadge kBatch={result.badge} size="sm" />
            )}
            <Badge variant="secondary" className="text-xs">
              {result.type.replace('-', ' ')}
            </Badge>
            
            {/* Advanced Score Indicators */}
            {showAdvancedMetrics && (
              <>
                {relevanceScore > 0.8 && (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                    <Star className="h-3 w-3 mr-1" />
                    Highly Relevant
                  </Badge>
                )}
                {trendingScore > 70 && (
                  <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                    <Flame className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </>
            )}
            
            {result.metadata?.trending && (
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                Hot
              </Badge>
            )}
          </div>
          
          {result.subtitle && (
            <p className="text-xs text-muted-foreground mb-1">{result.subtitle}</p>
          )}
          
          {result.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {result.description}
            </p>
          )}
          
          {result.metadata && (
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              {result.metadata.followers && (
                <span>{result.metadata.followers} followers</span>
              )}
              {result.metadata.posts && (
                <span>{result.metadata.posts} posts</span>
              )}
              {result.metadata.date && (
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {result.metadata.date}
                </span>
              )}
              {result.metadata.likes && (
                <span>{result.metadata.likes} likes</span>
              )}
              {result.metadata.participants && (
                <span>{result.metadata.participants} participants</span>
              )}
              {result.metadata.members && (
                <span>{result.metadata.members} members</span>
              )}
              {result.metadata.downloads && (
                <span>{result.metadata.downloads} downloads</span>
              )}
              {result.metadata.rating && (
                <span>{result.metadata.rating}</span>
              )}
              
              {/* Advanced Score Display */}
              {showAdvancedMetrics && (
                <>
                  {relevanceScore > 0.5 && (
                    <span className="text-green-600 font-medium">
                      {Math.round(relevanceScore * 100)}% match
                    </span>
                  )}
                  {trendingScore > 30 && (
                    <span className="text-orange-600 font-medium">
                      {Math.round(trendingScore)} trend score
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm">
          {result.type === 'person' ? 'Follow' : 'View'}
        </Button>
      </div>
    </Card>
  );
}

export function SearchResults({ 
  results, 
  query, 
  filter: _filter, 
  filters: _filters,
  isLoading,
  className
}: SearchResultsProps) {
  const [sortBy, setSortBy] = useState('relevance');

  // Transform results to RankedSearchResult format
  const transformedResults = useMemo(() => {
    return results.map(result => ({
      ...result,
      subtitle: result.subtitle || '',
      description: result.description || '',
      metadata: {
        ...result.metadata,
        category: result.type,
        engagement: result.metadata?.likes || 0,
        recency: result.metadata?.date ? new Date(result.metadata.date).getTime() : Date.now()
      }
    })) as RankedSearchResult[];
  }, [results]);

  // Create search context for advanced ranking
  const searchContext: SearchContext = useMemo(() => ({
    query,
    userInterests: ['tech', 'academic', 'social'], // This would come from user preferences
    userActivity: [
      { category: 'tech', engagement: 0.8 },
      { category: 'academic', engagement: 0.9 },
      { category: 'social', engagement: 0.6 }
    ],
    searchHistory: [], // This would come from stored search history
    trendingTopics: ['machine-learning', 'web-development', 'data-science']
  }), [query]);

  // Apply advanced ranking
  const rankedResults = useMemo(() => {
    if (!query.trim()) return transformedResults;
    
    return rankSearchResults(transformedResults, searchContext);
  }, [query, transformedResults, searchContext]);

  // Apply local sorting based on sortBy
  const sortedResults = useMemo(() => {
    const sorted = [...rankedResults];
    
    switch (sortBy) {
      case 'relevance':
        return sorted.sort((a, b) => (b.relevancyScore || 0) - (a.relevancyScore || 0));
      case 'trending':
        return sorted.sort((a, b) => {
          const aScore = (a.metadata.engagement || 0) + (a.metadata.trending ? 50 : 0);
          const bScore = (b.metadata.engagement || 0) + (b.metadata.trending ? 50 : 0);
          return bScore - aScore;
        });
      case 'recent':
        return sorted.sort((a, b) => {
          const aTime = a.metadata.recency || 0;
          const bTime = b.metadata.recency || 0;
          return bTime - aTime;
        });
      case 'popular':
        return sorted.sort((a, b) => (b.metadata.engagement || 0) - (a.metadata.engagement || 0));
      default:
        return sorted;
    }
  }, [rankedResults, sortBy]);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="h-12 w-12 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (sortedResults.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12", className)}>
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          {query ? `No results found for "${query}". Try different keywords or check spelling.` 
                 : "Start typing to search BITians"}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Results Summary with Sort Control */}
      {query && (
        <div className="flex items-center justify-between px-1 py-2">
          <p className="text-sm text-muted-foreground">
            Found {sortedResults.length} results for <span className="font-medium">"{query}"</span>
          </p>
          <div className="flex items-center space-x-2">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-border rounded px-2 py-1 bg-background"
            >
              <option value="relevance">Relevance</option>
              <option value="trending">Trending</option>
              <option value="recent">Recent</option>
              <option value="popular">Popular</option>
            </select>
            {sortedResults.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {sortedResults.length} {sortedResults.length === 1 ? 'result' : 'results'}
              </Badge>
            )}
          </div>
        </div>
      )}
      
      {/* Search Results */}
      {sortedResults.map((result) => (
        <ResultCard key={result.id} result={result} query={query} />
      ))}
    </div>
  );
}