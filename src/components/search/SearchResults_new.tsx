'use client';

import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { Badge } from '@/components/ui/badge';
import { UserPlus, MessageCircle, Calendar, BookOpen, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    from: Date;
    to: Date;
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

function ResultCard({ result }: { result: SearchResult }) {
  const icons = {
    person: <UserPlus className="h-4 w-4" />,
    post: <MessageCircle className="h-4 w-4" />,
    event: <Calendar className="h-4 w-4" />,
    'study-group': <BookOpen className="h-4 w-4" />,
    note: <BookOpen className="h-4 w-4" />,
    hashtag: <Hash className="h-4 w-4" />,
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start space-x-3">
        {result.avatar ? (
          <Avatar className="h-12 w-12">
            <img src={result.avatar} alt={result.title} className="h-full w-full object-cover" />
          </Avatar>
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {icons[result.type]}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold truncate">{result.title}</h3>
            {result.badge && <KBatchBadge kBatch={result.badge} />}
            {result.metadata?.verified && (
              <Badge variant="secondary" className="text-xs">✓</Badge>
            )}
          </div>
          
          {result.subtitle && (
            <p className="text-sm text-muted-foreground mb-1">{result.subtitle}</p>
          )}
          
          {result.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {result.description}
            </p>
          )}
          
          {result.metadata && (
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              {result.metadata.followers && (
                <span>{result.metadata.followers} followers</span>
              )}
              {result.metadata.posts && (
                <span>{result.metadata.posts} posts</span>
              )}
              {result.metadata.date && (
                <span>{result.metadata.date}</span>
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
  filter, 
  filters,
  isLoading, 
  className 
}: SearchResultsProps) {
  // Apply additional filtering based on advanced filters
  const filteredResults = results.filter(result => {
    if (!filters) return true;

    // Verified filter
    if (filters.verified === 'verified' && !result.metadata?.verified) return false;
    if (filters.verified === 'unverified' && result.metadata?.verified) return false;

    // Media filter
    if (filters.hasMedia && !result.metadata?.hasMedia) return false;

    // Links filter
    if (filters.hasLinks && !result.metadata?.hasLinks) return false;

    // Minimum likes filter
    if (filters.minLikes > 0 && (result.metadata?.likes || 0) < filters.minLikes) return false;

    // Post type filter
    if (filters.postType !== 'all' && result.type !== filters.postType) return false;

    return true;
  });

  // Sort results based on sortBy filter
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (!filters) return 0;

    switch (filters.sortBy) {
      case 'recent':
        // Sort by date if available
        if (a.metadata?.date && b.metadata?.date) {
          return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
        }
        return 0;
      case 'popular':
        // Sort by likes or followers
        const aPopularity = a.metadata?.likes || a.metadata?.followers || 0;
        const bPopularity = b.metadata?.likes || b.metadata?.followers || 0;
        return bPopularity - aPopularity;
      case 'oldest':
        // Sort by date (oldest first)
        if (a.metadata?.date && b.metadata?.date) {
          return new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime();
        }
        return 0;
      default: // relevance
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="h-12 w-12 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (sortedResults.length === 0 && query) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">No results found</h3>
          <p className="text-muted-foreground">
            Try searching for something else or adjust your filters.
          </p>
          {filters && (
            <p className="text-sm text-muted-foreground">
              Current filters may be too restrictive. Try removing some filters.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (sortedResults.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Start searching</h3>
          <p className="text-muted-foreground">
            Find people, posts, events, and more across BITians.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-sm text-muted-foreground mb-4">
        Found {sortedResults.length} result{sortedResults.length !== 1 ? 's' : ''} for "{query}"
        {filters && filters.sortBy !== 'relevance' && (
          <span className="ml-2">• Sorted by {filters.sortBy}</span>
        )}
      </div>
      {sortedResults.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
