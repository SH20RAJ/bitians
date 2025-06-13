'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SearchForm } from '@/components/search/SearchForm';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearchData } from '@/hooks/search';

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

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [advancedFilters, setAdvancedFilters] = useState<SearchFilters>({
        sortBy: 'relevance',
        timeRange: 'all',
        postType: 'all',
        verified: 'all',
        hasMedia: false,
        hasLinks: false,
        minLikes: 0
    });
    const { results, isLoading } = useSearchData(query, activeFilter);

    return (
        <PageLayout title="Search" showBack={false}>
            <div className="p-4 space-y-6">
                <SearchForm onSearch={setQuery} />
                <SearchFilters 
                    activeFilter={activeFilter} 
                    onFilterChange={setActiveFilter}
                    filters={advancedFilters}
                    onFiltersChange={setAdvancedFilters}
                />
                <SearchResults 
                    results={results}
                    query={query}
                    filter={activeFilter}
                    filters={advancedFilters}
                    isLoading={isLoading}
                />
            </div>
        </PageLayout>
    );
}
