'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const SEARCH_FILTERS = [
  { id: 'all', label: 'All', count: 245, icon: '🔍' },
  { id: 'people', label: 'People', count: 89, icon: '👥' },
  { id: 'posts', label: 'Posts', count: 156, icon: '📝' },
  { id: 'events', label: 'Events', count: 23, icon: '📅' },
  { id: 'study-groups', label: 'Study Groups', count: 45, icon: '📚' },
  { id: 'notes', label: 'Notes', count: 67, icon: '📄' },
  { id: 'hashtags', label: 'Hashtags', count: 34, icon: '🏷️' },
] as const;

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Most Relevant' },
  { id: 'recent', label: 'Most Recent' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'oldest', label: 'Oldest First' },
];

const TIME_FILTERS = [
  { id: 'all', label: 'Any time' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
  { id: 'year', label: 'This year' },
  { id: 'custom', label: 'Custom range' },
];

const POST_TYPES = [
  { id: 'text', label: 'Text posts' },
  { id: 'image', label: 'Image posts' },
  { id: 'video', label: 'Video posts' },
  { id: 'poll', label: 'Polls' },
  { id: 'event', label: 'Events' },
];

const VERIFIED_FILTERS = [
  { id: 'all', label: 'All Users' },
  { id: 'verified', label: 'Verified Only' },
  { id: 'unverified', label: 'Unverified Only' },
];

interface SearchFiltersState {
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

interface SearchFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters?: SearchFiltersState;
  onFiltersChange?: (filters: SearchFiltersState) => void;
  className?: string;
}

export function SearchFilters({ 
  activeFilter, 
  onFilterChange, 
  filters,
  onFiltersChange,
  className 
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const currentFilters = filters || {
    sortBy: 'relevance',
    timeRange: 'all',
    postType: 'all',
    verified: 'all',
    hasMedia: false,
    hasLinks: false,
    minLikes: 0,
  };

  const updateFilter = <K extends keyof SearchFiltersState>(
    key: K,
    value: SearchFiltersState[K]
  ) => {
    const newFilters = { ...currentFilters, [key]: value };
    onFiltersChange?.(newFilters);
  };

  const clearAdvancedFilters = () => {
    const defaultFilters: SearchFiltersState = {
      sortBy: 'relevance',
      timeRange: 'all',
      postType: 'all',
      verified: 'all',
      hasMedia: false,
      hasLinks: false,
      minLikes: 0,
    };
    onFiltersChange?.(defaultFilters);
  };

  const hasActiveAdvancedFilters = 
    currentFilters.sortBy !== 'relevance' ||
    currentFilters.timeRange !== 'all' ||
    currentFilters.postType !== 'all' ||
    currentFilters.verified !== 'all' ||
    currentFilters.hasMedia ||
    currentFilters.hasLinks ||
    currentFilters.minLikes > 0;

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilters.sortBy !== 'relevance') count++;
    if (currentFilters.timeRange !== 'all') count++;
    if (currentFilters.postType !== 'all') count++;
    if (currentFilters.verified !== 'all') count++;
    if (currentFilters.hasMedia) count++;
    if (currentFilters.hasLinks) count++;
    if (currentFilters.minLikes > 0) count++;
    return count;
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Primary Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {SEARCH_FILTERS.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs",
                activeFilter === filter.id 
                  ? "bg-primary-foreground text-primary" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              {filter.count}
            </Badge>
          </Button>
        ))}
        
        {/* Advanced Filters Toggle */}
        <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center space-x-2 whitespace-nowrap",
                hasActiveAdvancedFilters && "border-primary bg-primary/10"
              )}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveAdvancedFilters && (
                <Badge variant="secondary" className="text-xs">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <Card className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Advanced Filters</h3>
                {hasActiveAdvancedFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAdvancedFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort by</label>
                <Select 
                  value={currentFilters.sortBy} 
                  onValueChange={(value) => updateFilter('sortBy', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date posted</label>
                <Select 
                  value={currentFilters.timeRange} 
                  onValueChange={(value) => updateFilter('timeRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_FILTERS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Date Range */}
              {currentFilters.timeRange === 'custom' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date range</label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {currentFilters.dateRange?.from ? format(currentFilters.dateRange.from, "PPP") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={currentFilters.dateRange?.from}
                          onSelect={(date) => updateFilter('dateRange', { 
                            ...currentFilters.dateRange, 
                            from: date || new Date() 
                          })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {currentFilters.dateRange?.to ? format(currentFilters.dateRange.to, "PPP") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={currentFilters.dateRange?.to}
                          onSelect={(date) => updateFilter('dateRange', { 
                            ...currentFilters.dateRange, 
                            to: date || new Date() 
                          })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              {/* Post Types */}
              {activeFilter === 'posts' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Post type</label>
                  <Select 
                    value={currentFilters.postType} 
                    onValueChange={(value) => updateFilter('postType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All post types</SelectItem>
                      {POST_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Verified Filter */}
              {activeFilter === 'people' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Verification status</label>
                  <Select 
                    value={currentFilters.verified} 
                    onValueChange={(value) => updateFilter('verified', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VERIFIED_FILTERS.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Content Filters */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content filters</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasMedia"
                      checked={currentFilters.hasMedia}
                      onCheckedChange={(checked) => updateFilter('hasMedia', !!checked)}
                    />
                    <label htmlFor="hasMedia" className="text-sm">Has images/videos</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasLinks"
                      checked={currentFilters.hasLinks}
                      onCheckedChange={(checked) => updateFilter('hasLinks', !!checked)}
                    />
                    <label htmlFor="hasLinks" className="text-sm">Has links</label>
                  </div>
                </div>
              </div>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active filters summary */}
      {hasActiveAdvancedFilters && (
        <div className="flex flex-wrap gap-1">
          {currentFilters.sortBy !== 'relevance' && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              Sort: {SORT_OPTIONS.find(o => o.id === currentFilters.sortBy)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('sortBy', 'relevance')}
              />
            </Badge>
          )}
          {currentFilters.timeRange !== 'all' && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              Time: {TIME_FILTERS.find(t => t.id === currentFilters.timeRange)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('timeRange', 'all')}
              />
            </Badge>
          )}
          {currentFilters.postType !== 'all' && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              Type: {POST_TYPES.find(p => p.id === currentFilters.postType)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('postType', 'all')}
              />
            </Badge>
          )}
          {currentFilters.verified !== 'all' && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              {VERIFIED_FILTERS.find(v => v.id === currentFilters.verified)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('verified', 'all')}
              />
            </Badge>
          )}
          {currentFilters.hasMedia && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              Has media
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('hasMedia', false)}
              />
            </Badge>
          )}
          {currentFilters.hasLinks && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              Has links
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('hasLinks', false)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
