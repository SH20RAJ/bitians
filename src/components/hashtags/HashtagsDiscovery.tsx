'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TrendingUp, Search, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TRENDING_HASHTAGS } from '@/constants/homepage/trending-data';

const HASHTAG_CATEGORIES = [
  { id: 'all', label: 'All', color: 'bg-primary' },
  { id: 'tech', label: 'Tech', color: 'bg-blue-500' },
  { id: 'academic', label: 'Academic', color: 'bg-green-500' },
  { id: 'career', label: 'Career', color: 'bg-purple-500' },
  { id: 'campus', label: 'Campus', color: 'bg-orange-500' },
  { id: 'events', label: 'Events', color: 'bg-red-500' },
] as const;

export function HashtagsDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHashtags = TRENDING_HASHTAGS.filter(hashtag => {
    const matchesCategory = selectedCategory === 'all' || hashtag.category === selectedCategory;
    const matchesSearch = hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleHashtagClick = (tag: string) => {
    window.location.href = `/hashtags/${tag.replace('#', '')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Hash className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Discover Hashtags</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search hashtags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {HASHTAG_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Trending Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Trending Now</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredHashtags.map((hashtag, index) => (
              <Card 
                key={hashtag.tag} 
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => handleHashtagClick(hashtag.tag)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                      <h3 className="font-semibold text-primary text-lg">
                        {hashtag.tag}
                      </h3>
                      {hashtag.trend === 'up' && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {hashtag.posts.toLocaleString()} posts
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "capitalize text-white",
                      HASHTAG_CATEGORIES.find(cat => cat.id === hashtag.category)?.color || 'bg-gray-500'
                    )}
                  >
                    {hashtag.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {HASHTAG_CATEGORIES.slice(1).map((category) => {
              const categoryHashtags = TRENDING_HASHTAGS.filter(h => h.category === category.id);
              const totalPosts = categoryHashtags.reduce((sum, h) => sum + h.posts, 0);
              
              return (
                <Card 
                  key={category.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="text-center space-y-2">
                    <div className={cn("w-12 h-12 rounded-full mx-auto flex items-center justify-center", category.color)}>
                      <Hash className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">{category.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {totalPosts.toLocaleString()} posts
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {filteredHashtags.length === 0 && (
          <div className="text-center py-20">
            <Hash className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hashtags found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
