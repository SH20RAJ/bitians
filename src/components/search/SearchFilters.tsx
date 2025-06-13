'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SEARCH_FILTERS = [
  { id: 'all', label: 'All', count: 245 },
  { id: 'people', label: 'People', count: 89 },
  { id: 'posts', label: 'Posts', count: 156 },
  { id: 'events', label: 'Events', count: 23 },
  { id: 'study-groups', label: 'Study Groups', count: 45 },
  { id: 'notes', label: 'Notes', count: 67 },
  { id: 'hashtags', label: 'Hashtags', count: 34 },
] as const;

interface SearchFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function SearchFilters({ 
  activeFilter, 
  onFilterChange, 
  className 
}: SearchFiltersProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2", className)}>
      {SEARCH_FILTERS.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className="flex items-center space-x-2 whitespace-nowrap"
        >
          <span>{filter.label}</span>
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs",
              activeFilter === filter.id && "bg-primary-foreground/20"
            )}
          >
            {filter.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
}
