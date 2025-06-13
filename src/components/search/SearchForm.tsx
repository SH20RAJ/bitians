'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, X, Clock, Hash, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const POPULAR_SEARCHES = [
  'machine learning',
  'placement preparation',
  'techfest 2024',
  'study groups',
  'coding competitions',
  'campus events',
  'bit mesra'
];

const TRENDING_TAGS = [
  '#MachineLearning',
  '#Placements',
  '#TechFest2024',
  '#StudyGroup',
  '#BITLife',
  '#Coding'
];

interface SearchFormProps {
  onSearch: (_query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchForm({ 
  onSearch, 
  placeholder = "Search BITians...", 
  className 
}: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load search history from localStorage
    const history = localStorage.getItem('bitians-search-history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    // Handle click outside to close suggestions
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // Update local state
    const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('bitians-search-history', JSON.stringify(newHistory));
    
    onSearch(searchQuery);
    setQuery(searchQuery);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  const filteredSuggestions = POPULAR_SEARCHES.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search suggestions dropdown */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto z-50 p-3 space-y-3">
          <div>
            {/* Recent searches */}
            {searchHistory.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Recent searches
                </h3>
                {searchHistory.slice(0, 5).map((historyItem, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => {
                      setQuery(historyItem);
                      handleSearch(historyItem);
                    }}
                  >
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="truncate">{historyItem}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* Trending hashtags */}
            {query.length === 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending hashtags
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {TRENDING_TAGS.map((tag, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-left"
                      onClick={() => {
                        setQuery(tag);
                        handleSearch(tag);
                      }}
                    >
                      <Hash className="h-3 w-3 mr-1 text-primary" />
                      <span className="text-primary">{tag}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular searches */}
            {query.length > 0 && filteredSuggestions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  <Search className="h-3 w-3 mr-1" />
                  Suggestions
                </h3>
                {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch(suggestion);
                    }}
                  >
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="truncate">{suggestion}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* Popular searches when no query */}
            {query.length === 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Popular searches
                </h3>
                {POPULAR_SEARCHES.slice(0, 5).map((popular, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => {
                      setQuery(popular);
                      handleSearch(popular);
                    }}
                  >
                    <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="truncate">{popular}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
