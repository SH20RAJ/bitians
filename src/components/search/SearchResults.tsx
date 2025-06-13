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
  metadata?: Record<string, any>;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  filter: string;
  isLoading?: boolean;
  className?: string;
}

function ResultCard({ result }: { result: SearchResult }) {
  const icons = {
    person: UserPlus,
    post: MessageCircle,
    event: Calendar,
    'study-group': BookOpen,
    note: BookOpen,
    hashtag: Hash,
  };

  const Icon = icons[result.type];

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start space-x-3">
        {result.avatar && (
          <Avatar className="h-12 w-12 border border-border/50">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              {result.title.charAt(0).toUpperCase()}
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
                <span>{result.metadata.date}</span>
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
  isLoading, 
  className 
}: SearchResultsProps) {
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

  if (results.length === 0 && query) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">No results found</h3>
          <p className="text-muted-foreground">
            Try searching for something else or adjust your filters.
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
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
        {results.length} results for "{query}" in {filter}
      </div>
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
