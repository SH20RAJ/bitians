"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, User, Hash, MessageSquare, Calendar, TrendingUp, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

export default function EnhancedSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();
  const { toast } = useToast();

  // Mock data for search results
  const mockSearchData = {
    users: [
      { id: 1, type: 'user', name: 'Arjun Sharma', username: 'arjun_sharma', kBatch: 'K23', avatar: 'AS', verified: true },
      { id: 2, type: 'user', name: 'Priya Mehta', username: 'priya_mehta', kBatch: 'K22', avatar: 'PM', verified: false },
      { id: 3, type: 'user', name: 'Rahul Singh', username: 'rahul_singh', kBatch: 'K21', avatar: 'RS', verified: true },
    ],
    posts: [
      { id: 1, type: 'post', content: 'Just completed my machine learning project! #ML #AI #BITLife', author: 'Arjun Sharma', time: '2h', likes: 45 },
      { id: 2, type: 'post', content: 'Looking for study group for Data Structures. Anyone interested? #DSA #StudyGroup', author: 'Priya Mehta', time: '4h', likes: 23 },
    ],
    hashtags: [
      { id: 1, type: 'hashtag', tag: 'BITLife', count: 1234 },
      { id: 2, type: 'hashtag', tag: 'Placement', count: 567 },
      { id: 3, type: 'hashtag', tag: 'StudyGroup', count: 345 },
      { id: 4, type: 'hashtag', tag: 'Hackathon', count: 789 },
    ],
    events: [
      { id: 1, type: 'event', title: 'Tech Fest 2024', date: '2024-02-15', attendees: 450 },
      { id: 2, type: 'event', title: 'Placement Drive - Microsoft', date: '2024-02-20', attendees: 120 },
    ]
  };

  const searchFilters = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'users', label: 'People', icon: User },
    { id: 'posts', label: 'Posts', icon: MessageSquare },
    { id: 'hashtags', label: 'Hashtags', icon: Hash },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('bitians_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Auto-search when query changes
    if (searchQuery.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        performSearch(searchQuery);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedFilter]);

  const performSearch = (query) => {
    const results = [];
    const lowerQuery = query.toLowerCase();

    if (selectedFilter === 'all' || selectedFilter === 'users') {
      mockSearchData.users
        .filter(user => 
          user.name.toLowerCase().includes(lowerQuery) || 
          user.username.toLowerCase().includes(lowerQuery)
        )
        .forEach(user => results.push(user));
    }

    if (selectedFilter === 'all' || selectedFilter === 'posts') {
      mockSearchData.posts
        .filter(post => post.content.toLowerCase().includes(lowerQuery))
        .forEach(post => results.push(post));
    }

    if (selectedFilter === 'all' || selectedFilter === 'hashtags') {
      mockSearchData.hashtags
        .filter(hashtag => hashtag.tag.toLowerCase().includes(lowerQuery))
        .forEach(hashtag => results.push(hashtag));
    }

    if (selectedFilter === 'all' || selectedFilter === 'events') {
      mockSearchData.events
        .filter(event => event.title.toLowerCase().includes(lowerQuery))
        .forEach(event => results.push(event));
    }

    setSearchResults(results);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('bitians_recent_searches', JSON.stringify(newRecentSearches));
      
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&filter=${selectedFilter}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (result) => {
    let path = '/';
    
    switch (result.type) {
      case 'user':
        path = `/profile/${result.username}`;
        break;
      case 'post':
        path = `/post/${result.id}`;
        break;
      case 'hashtag':
        path = `/hashtags/${result.tag}`;
        break;
      case 'event':
        path = `/events/${result.id}`;
        break;
    }
    
    router.push(path);
    setIsOpen(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('bitians_recent_searches');
    toast({
      title: "Recent searches cleared",
      duration: 2000,
    });
  };

  const renderSearchResult = (result) => {
    const iconMap = {
      user: User,
      post: MessageSquare,
      hashtag: Hash,
      event: Calendar
    };
    
    const Icon = iconMap[result.type];

    return (
      <div
        key={`${result.type}-${result.id}`}
        className="p-3 hover:bg-muted/50 cursor-pointer transition-colors rounded-lg"
        onClick={() => handleResultClick(result)}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {result.type === 'user' ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                {result.avatar}
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {result.type === 'user' && (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{result.name}</span>
                  {result.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">@{result.username} • {result.kBatch}</div>
              </>
            )}
            
            {result.type === 'post' && (
              <>
                <div className="text-sm">{result.content}</div>
                <div className="text-xs text-muted-foreground">by {result.author} • {result.time} • {result.likes} likes</div>
              </>
            )}
            
            {result.type === 'hashtag' && (
              <>
                <div className="font-medium">#{result.tag}</div>
                <div className="text-sm text-muted-foreground">{result.count.toLocaleString()} posts</div>
              </>
            )}
            
            {result.type === 'event' && (
              <>
                <div className="font-medium">{result.title}</div>
                <div className="text-sm text-muted-foreground">{result.date} • {result.attendees} attending</div>
              </>
            )}
          </div>
          
          <Badge variant="secondary" className="text-xs">
            {result.type}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Search className="w-5 h-5" />
      </Button>

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Search Panel */}
          <div className="fixed inset-x-4 top-20 max-w-2xl mx-auto bg-background border rounded-lg shadow-lg z-50 max-h-[80vh] overflow-hidden">
            {/* Search Header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    ref={searchRef}
                    placeholder="Search people, posts, hashtags, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-10"
                    autoFocus
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1 overflow-x-auto">
                {searchFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <Button
                      key={filter.id}
                      variant={selectedFilter === filter.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.id)}
                      className="flex items-center gap-2 whitespace-nowrap"
                    >
                      <Icon className="w-3 h-3" />
                      {filter.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Search Content */}
            <div className="max-h-96 overflow-y-auto">
              {searchQuery === '' ? (
                /* Recent Searches */
                <div className="p-4">
                  {recentSearches.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Recent Searches
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearRecentSearches}
                          className="text-xs"
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-muted/50 cursor-pointer rounded flex items-center gap-2"
                            onClick={() => setSearchQuery(search)}
                          >
                            <Search className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{search}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start typing to search</p>
                      <p className="text-sm">Find people, posts, hashtags, and events</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Search Results */
                <div className="p-2">
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-muted-foreground mt-2">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="mb-2 px-2">
                        <span className="text-sm text-muted-foreground">
                          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </span>
                      </div>
                      <div className="space-y-1">
                        {searchResults.map(renderSearchResult)}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No results found for "{searchQuery}"</p>
                      <p className="text-sm">Try different keywords or filters</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Search Footer */}
            {searchQuery && (
              <div className="p-3 border-t bg-muted/50">
                <Button onClick={handleSearch} className="w-full">
                  Search for "{searchQuery}"
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
