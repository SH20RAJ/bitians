'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Clock,
  Hash,
  Users,
  Flame,
  Sparkles,
  Target,
  RefreshCw,
  Filter,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTrendingData, type TrendingFilters } from '@/hooks/search/use-trending-data';

type TrendingTab = 'posts' | 'hashtags' | 'users';

export function EnhancedTrendingContent() {
  const [activeTab, setActiveTab] = useState<TrendingTab>('posts');
  const [filters, setFilters] = useState<TrendingFilters>({
    timeRange: '24h',
    category: 'all',
    minEngagement: 5
  });

  const {
    posts,
    hashtags,
    users,
    loading,
    error,
    lastUpdated,
    refreshTrendingData,
    autoRefresh,
    setAutoRefresh
  } = useTrendingData(filters);

  const handleFilterChange = (key: keyof TrendingFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderTrendingPost = (post: any, index: number) => (
    <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start space-x-3">
        {/* Trending Rank */}
        <div className="flex flex-col items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
            index === 0 ? "bg-yellow-100 text-yellow-800" :
            index === 1 ? "bg-gray-100 text-gray-800" :
            index === 2 ? "bg-orange-100 text-orange-800" :
            "bg-muted text-muted-foreground"
          )}>
            {index + 1}
          </div>
          <div className="mt-1 flex items-center">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600 ml-1">
              {Math.round(post.totalScore * 100)}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-sm truncate">{post.title}</h3>
            {index < 3 && (
              <Badge variant="outline" className="text-xs">
                <Flame className="h-3 w-3 mr-1" />
                Hot
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            {post.metadata.likes > 0 && (
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {post.metadata.likes}
              </span>
            )}
            {post.metadata.comments > 0 && (
              <span className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                {post.metadata.comments}
              </span>
            )}
            {post.metadata.shares > 0 && (
              <span className="flex items-center">
                <Share className="h-3 w-3 mr-1" />
                {post.metadata.shares}
              </span>
            )}
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(post.metadata.createdAt).toLocaleTimeString()}
            </span>
          </div>

          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {post.metadata.category}
            </Badge>
          </div>
        </div>

        <Button variant="outline" size="sm">
          View
        </Button>
      </div>
    </Card>
  );

  const renderTrendingHashtag = (hashtag: any, index: number) => (
    <Card key={hashtag.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
            index === 0 ? "bg-blue-100 text-blue-800" :
            index === 1 ? "bg-purple-100 text-purple-800" :
            index === 2 ? "bg-pink-100 text-pink-800" :
            "bg-muted text-muted-foreground"
          )}>
            <Hash className="h-4 w-4" />
          </div>
          
          <div>
            <h3 className="font-semibold text-blue-600">{hashtag.title}</h3>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {hashtag.metadata.mentions && (
                <span>{hashtag.metadata.mentions} mentions</span>
              )}
              <span>•</span>
              <span>{hashtag.metadata.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                {Math.round(hashtag.totalScore * 100)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">trend score</span>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderTrendingUser = (user: any, index: number) => (
    <Card key={user.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
            index === 0 ? "bg-green-100 text-green-800" :
            index === 1 ? "bg-blue-100 text-blue-800" :
            index === 2 ? "bg-purple-100 text-purple-800" :
            "bg-muted text-muted-foreground"
          )}>
            {index + 1}
          </div>
          
          <Avatar className="h-10 w-10">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              {user.title.charAt(0)}
            </div>
          </Avatar>
          
          <div>
            <h3 className="font-semibold">{user.title}</h3>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{user.metadata.likes} total likes</span>
              <span>•</span>
              <span>{user.metadata.comments} comments</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            Active
          </Badge>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </div>
      </div>
    </Card>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold mb-2">Failed to Load Trending Data</h3>
        <p className="text-muted-foreground text-center mb-4">{error}</p>
        <Button onClick={refreshTrendingData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-orange-500" />
              <h1 className="text-xl font-bold">Trending Now</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? 'bg-green-50 text-green-600' : ''}
              >
                <Target className="h-4 w-4 mr-2" />
                {autoRefresh ? 'Live' : 'Paused'}
              </Button>
              
              <Button variant="outline" size="sm" onClick={refreshTrendingData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>
            
            <select
              value={filters.timeRange}
              onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last Week</option>
            </select>
            
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="all">All Categories</option>
              <option value="tech">Tech</option>
              <option value="academic">Academic</option>
              <option value="social">Social</option>
              <option value="events">Events</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {[
              { id: 'posts', label: 'Posts', icon: MessageCircle, count: posts.length },
              { id: 'hashtags', label: 'Hashtags', icon: Hash, count: hashtags.length },
              { id: 'users', label: 'Users', icon: Users, count: users.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TrendingTab)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            {loading && (
              <div className="flex items-center">
                <LoadingSpinner size="sm" />
                <span className="ml-2">Updating...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {loading && posts.length === 0 ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-lg font-semibold mb-2">No Trending Posts</h3>
                <p className="text-muted-foreground">
                  Check back later for trending content in your selected time range.
                </p>
              </div>
            ) : (
              posts.map((post, index) => renderTrendingPost(post, index))
            )}
          </div>
        )}

        {activeTab === 'hashtags' && (
          <div className="space-y-4">
            {loading && hashtags.length === 0 ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : hashtags.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">#️⃣</div>
                <h3 className="text-lg font-semibold mb-2">No Trending Hashtags</h3>
                <p className="text-muted-foreground">
                  No hashtags are trending in your selected time range.
                </p>
              </div>
            ) : (
              hashtags.map((hashtag, index) => renderTrendingHashtag(hashtag, index))
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            {loading && users.length === 0 ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-semibold mb-2">No Trending Users</h3>
                <p className="text-muted-foreground">
                  No users are trending in your selected time range.
                </p>
              </div>
            ) : (
              users.map((user, index) => renderTrendingUser(user, index))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
