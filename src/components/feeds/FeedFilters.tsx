'use client';

import { FEED_TYPES } from '@/constants/feeds/feed-types';

interface FeedFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FeedFilters({ selectedFilter, onFilterChange }: FeedFiltersProps) {
  return (
    <div className="p-4 pb-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {FEED_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onFilterChange(type.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              whitespace-nowrap transition-all duration-200 min-w-fit
              ${selectedFilter === type.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }
            `}
          >
            <span className="text-base">{type.icon}</span>
            <span>{type.label}</span>
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${selectedFilter === type.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
              }
            `}>
              {type.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
