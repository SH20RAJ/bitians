'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SearchForm } from '@/components/search/SearchForm';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearchData } from '@/hooks/search';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const { results, isLoading } = useSearchData(query, activeFilter);

    return (
        <PageLayout title="Search" showBack={false}>
            <div className="p-4 space-y-6">
                <SearchForm onSearch={setQuery} />
                <SearchFilters 
                    activeFilter={activeFilter} 
                    onFilterChange={setActiveFilter} 
                />
                <SearchResults 
                    results={results}
                    query={query}
                    filter={activeFilter}
                    isLoading={isLoading}
                />
            </div>
        </PageLayout>
    );
}
