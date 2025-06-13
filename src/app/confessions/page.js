'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import BottomNavigation from '@/components/BottomNavigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/components/Toast';
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Eye,
  EyeOff,
  TrendingUp,
  Clock,
  Flame,
  Smile,
  Frown,
  Coffee,
  BookOpen,
  Users,
  Zap,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export default function ConfessionsPage() {
  const [confessions, setConfessions] = useState([
    {
      id: 1,
      content: "I've had a crush on someone from my class for 2 years but never had the courage to tell them. They're graduating this year and I'm regretting not saying anything earlier.",
      category: 'Love & Relationships',
      timeAgo: '2 hours ago',
      likes: 156,
      comments: 23,
      shares: 8,
      views: 1200,
      isLiked: false,
      isAnonymous: true,
      mood: 'sad',
      tags: ['crush', 'regret', 'graduation']
    },
    {
      id: 2,
      content: "BIT Mesra's night sky from the hostel terrace is absolutely beautiful. Sometimes I just sit there for hours thinking about life and feeling grateful to be here.",
      category: 'Campus Life',
      timeAgo: '5 hours ago',
      likes: 89,
      comments: 12,
      shares: 15,
      views: 890,
      isLiked: true,
      isAnonymous: true,
      mood: 'happy',
      tags: ['campus', 'grateful', 'peace']
    },
    {
      id: 3,
      content: "I cheated on my mid-semester exam and I feel terrible about it. The guilt is eating me alive and I can't focus on anything else. I want to confess to the professor but I'm scared.",
      category: 'Academic',
      timeAgo: '1 day ago',
      likes: 67,
      comments: 45,
      shares: 3,
      views: 2100,
      isLiked: false,
      isAnonymous: true,
      mood: 'sad',
      tags: ['guilt', 'academic', 'honesty']
    },
    {
      id: 4,
      content: "I pretend to be confident and outgoing but I'm actually really introverted and struggle with social anxiety. College events are overwhelming but I go anyway because I don't want to miss out.",
      category: 'Mental Health',
      timeAgo: '3 hours ago',
      likes: 234,
      comments: 67,
      shares: 12,
      views: 1800,
      isLiked: true,
      isAnonymous: true,
      mood: 'anxious',
      tags: ['anxiety', 'introvert', 'mask']
    },
    {
      id: 5,
      content: "The mess food is actually not that bad. I know everyone complains but I genuinely enjoy some of the dishes. The dal and rice hits different when you're homesick.",
      category: 'Campus Life',
      timeAgo: '6 hours ago',
      likes: 445,
      comments: 89,
      shares: 67,
      views: 3200,
      isLiked: false,
      isAnonymous: true,
      mood: 'happy',
      tags: ['mess', 'food', 'unpopular opinion']
    },
    {
      id: 6,
      content: "I'm in my final year and I still don't know what I want to do after graduation. Everyone seems so sure about their plans while I'm just pretending I have it all figured out.",
      category: 'Career & Future',
      timeAgo: '8 hours ago',
      likes: 178,
      comments: 34,
      shares: 9,
      views: 1500,
      isLiked: true,
      isAnonymous: true,
      mood: 'confused',
      tags: ['future', 'uncertainty', 'career']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const { showToast } = useToast();

  const categories = [
    { id: 'love', name: 'Love & Relationships', icon: Heart, color: 'text-pink-500' },
    { id: 'campus', name: 'Campus Life', icon: Users, color: 'text-blue-500' },
    { id: 'academic', name: 'Academic', icon: BookOpen, color: 'text-green-500' },
    { id: 'mental', name: 'Mental Health', icon: Coffee, color: 'text-purple-500' },
    { id: 'career', name: 'Career & Future', icon: TrendingUp, color: 'text-orange-500' },
    { id: 'random', name: 'Random Thoughts', icon: Zap, color: 'text-yellow-500' }
  ];

  const moods = {
    happy: { icon: Smile, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
    sad: { icon: Frown, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' },
    anxious: { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/20' },
    confused: { icon: Coffee, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20' }
  };

  const filteredConfessions = confessions.filter(confession => {
    const matchesSearch = confession.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      confession.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' ||
      confession.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.likes - a.likes;
      case 'discussed': return b.comments - a.comments;
      case 'views': return b.views - a.views;
      default: return 0; // recent (already in order)
    }
  });

  const handleLike = (confessionId) => {
    setConfessions(confessions.map(confession =>
      confession.id === confessionId
        ? {
          ...confession,
          isLiked: !confession.isLiked,
          likes: confession.isLiked ? confession.likes - 1 : confession.likes + 1
        }
        : confession
    ));
  };

  const handleShare = (confession) => {
    showToast('Confession link copied to clipboard!', 'success');
  };

  const handleComment = (confession) => {
    showToast('Comment feature coming soon!', 'info');
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => category.toLowerCase().includes(c.name.toLowerCase()));
    return cat ? { icon: cat.icon, color: cat.color } : { icon: Zap, color: 'text-gray-500' };
  };

  const getMoodInfo = (mood) => {
    return moods[mood] || moods.confused;
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            BIT Confessions
          </h1>
          <p className="text-muted-foreground text-lg">
            Share your thoughts anonymously with the BIT community
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search confessions or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button
                onClick={() => setShowPostModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4" />
                Share Confession
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-4 space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Liked</option>
                    <option value="discussed">Most Discussed</option>
                    <option value="views">Most Viewed</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSortBy('recent');
                      setSearchTerm('');
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Category Quick Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full flex items-center gap-1"
                >
                  <Icon className={`h-3 w-3 ${category.color}`} />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Confessions Feed */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <div className="space-y-6">
            {filteredConfessions.map(confession => {
              const categoryInfo = getCategoryIcon(confession.category);
              const CategoryIcon = categoryInfo.icon;
              const moodInfo = getMoodInfo(confession.mood);
              const MoodIcon = moodInfo.icon;

              return (
                <Card key={confession.id} className="p-6 hover:shadow-xl transition-all duration-300 card-hover">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${moodInfo.bg}`}>
                        <MoodIcon className={`h-4 w-4 ${moodInfo.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className={`h-4 w-4 ${categoryInfo.color}`} />
                          <span className="text-sm font-medium text-muted-foreground">
                            {confession.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {confession.timeAgo}
                          <EyeOff className="h-3 w-3 ml-2" />
                          Anonymous
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {confession.views}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <p className="text-foreground leading-relaxed">
                      {confession.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {confession.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(confession.id)}
                        className={`flex items-center gap-2 transition-colors ${confession.isLiked
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-muted-foreground hover:text-red-500'
                          }`}
                      >
                        <Heart className={`h-4 w-4 ${confession.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{confession.likes}</span>
                      </button>

                      <button
                        onClick={() => handleComment(confession)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{confession.comments}</span>
                      </button>

                      <button
                        onClick={() => handleShare(confession)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">{confession.shares}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {filteredConfessions.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No confessions found</h3>
            <p className="text-muted-foreground">
              Be the first to share your thoughts with the community
            </p>
          </div>
        )}

        {/* Trending Tags */}
        <Card className="mt-8 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {['crush', 'anxiety', 'mess', 'exams', 'future', 'friends', 'homesick', 'placement'].map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSearchTerm(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
      <BottomNavigation currentPage="confessions" />
    </PageLayout>
  );
}
