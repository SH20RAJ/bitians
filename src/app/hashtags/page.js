'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { RichText } from '@/components/ui/RichText';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Search, 
  Hash, 
  TrendingUp, 
  Users,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  Clock,
  Filter,
  ArrowUp,
  Zap
} from 'lucide-react';

export default function HashtagPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [posts, setPosts] = useState([]);
  const [trendingHashtags, setTrendingHashtags] = useState([]);

  // Initialize search term from URL params
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSearchTerm(tagParam);
    }
  }, [searchParams]);

  // Mock data for trending hashtags
  const initialTrendingHashtags = [
    { tag: 'BITLife', count: 1250, category: 'campus', growth: '+12%' },
    { tag: 'PlacementSeason', count: 890, category: 'career', growth: '+28%' },
    { tag: 'TechFest2024', count: 750, category: 'events', growth: '+45%' },
    { tag: 'HostelLife', count: 650, category: 'lifestyle', growth: '+8%' },
    { tag: 'ExamStress', count: 580, category: 'academic', growth: '+15%' },
    { tag: 'CampusFood', count: 420, category: 'lifestyle', growth: '+5%' },
    { tag: 'CodeLife', count: 380, category: 'tech', growth: '+22%' },
    { tag: 'BITMesra', count: 1500, category: 'campus', growth: '+3%' },
    { tag: 'StudyGroup', count: 320, category: 'academic', growth: '+18%' },
    { tag: 'Confession', count: 280, category: 'social', growth: '+35%' }
  ];

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      author: 'Priya Sharma',
      avatar: 'PS',
      kBatch: 'K22',
      time: '2h',
      content: 'Finally got my dream placement at Google! 🎉 The journey from first year to here has been incredible. Special thanks to the coding community at BIT for all the support! #PlacementSeason #Google #BITLife #Grateful #TechLife',
      likes: 234,
      comments: 67,
      shares: 45,
      views: 1200,
      hashtags: ['PlacementSeason', 'Google', 'BITLife', 'Grateful', 'TechLife'],
      verified: true
    },
    {
      id: 2,
      author: 'Rahul Singh',
      avatar: 'RS',
      kBatch: 'K23',
      time: '4h',
      content: 'Late night coding session in the hostel common room. Nothing beats the energy when everyone is grinding together! 💻⚡ #CodeLife #HostelLife #LateNightCoding #BITLife #Grind',
      likes: 156,
      comments: 23,
      shares: 12,
      views: 890,
      hashtags: ['CodeLife', 'HostelLife', 'LateNightCoding', 'BITLife', 'Grind'],
      verified: false
    },
    {
      id: 3,
      author: 'Anonymous',
      avatar: '??',
      kBatch: 'K21',
      time: '6h',
      content: 'The pressure is real but so is the support system here. Every setback is a setup for a comeback! 💪 #ExamStress #Motivation #BITLife #NeverGiveUp',
      likes: 89,
      comments: 34,
      shares: 8,
      views: 650,
      hashtags: ['ExamStress', 'Motivation', 'BITLife', 'NeverGiveUp'],
      isAnonymous: true,
      verified: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All', color: 'text-gray-500' },
    { id: 'campus', name: 'Campus', color: 'text-blue-500' },
    { id: 'academic', name: 'Academic', color: 'text-green-500' },
    { id: 'career', name: 'Career', color: 'text-purple-500' },
    { id: 'tech', name: 'Tech', color: 'text-orange-500' },
    { id: 'lifestyle', name: 'Lifestyle', color: 'text-pink-500' },
    { id: 'events', name: 'Events', color: 'text-red-500' },
    { id: 'social', name: 'Social', color: 'text-indigo-500' }
  ];

  useEffect(() => {
    setTrendingHashtags(initialTrendingHashtags);
    setPosts(mockPosts);
  }, []);

  const filteredHashtags = trendingHashtags.filter(hashtag => {
    const matchesSearch = hashtag.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hashtag.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'trending': return b.count - a.count;
      case 'growth': return parseFloat(b.growth) - parseFloat(a.growth);
      case 'alphabetical': return a.tag.localeCompare(b.tag);
      default: return 0;
    }
  });

  const filteredPosts = posts.filter(post => {
    if (searchTerm) {
      return post.hashtags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'text-gray-500';
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            # Discover
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore trending hashtags and discover content from the BIT community
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search hashtags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-background min-w-[120px]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-background min-w-[120px]"
              >
                <option value="trending">Trending</option>
                <option value="growth">Growth</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Hashtags */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-bold">Trending Now</h2>
                </div>
                
                <div className="space-y-3">
                  {filteredHashtags.slice(0, 10).map((hashtag, index) => (
                    <div
                      key={hashtag.tag}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                      onClick={() => setSearchTerm(hashtag.tag)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium group-hover:text-blue-600 transition-colors">
                              {hashtag.tag}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{hashtag.count.toLocaleString()} posts</span>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getCategoryColor(hashtag.category)}`}
                            >
                              {hashtag.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUp className="w-3 h-3" />
                        <span className="text-xs font-medium">{hashtag.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">
                {searchTerm ? `Posts with #${searchTerm}` : 'Recent Posts'}
              </h2>
              <p className="text-muted-foreground">
                {filteredPosts.length} posts found
              </p>
            </div>

            <div className="space-y-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {post.avatar}
                        </div>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          {post.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white">✓</span>
                            </div>
                          )}
                          {!post.isAnonymous && <KBatchBadge kBatch={post.kBatch} size="sm" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{post.time}</span>
                          <Eye className="w-3 h-3 ml-2" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <RichText 
                      content={post.content}
                      className="leading-relaxed"
                      onHashtagClick={(hashtag) => setSearchTerm(hashtag)}
                    />
                  </div>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.hashtags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>

                    <button className="text-muted-foreground hover:text-yellow-500 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <Card className="p-12 text-center">
                <Hash className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  Try searching for a different hashtag or check out trending topics
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{trendingHashtags.length}+</div>
              <div className="text-sm text-muted-foreground">Active Tags</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">50K+</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">2.5K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">Daily</div>
              <div className="text-sm text-muted-foreground">New Content</div>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
    
    {/* Bottom Navigation */}
    <BottomNavigation currentPage="hashtags" />
  );
}
