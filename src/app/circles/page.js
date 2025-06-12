'use client';

import { useState } from 'react';
import {PageLayout} from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/components/Toast';
import { 
  Search, 
  Plus, 
  Users, 
  MessageCircle, 
  Settings,
  Crown,
  Lock,
  Globe,
  Eye,
  Heart,
  Share2,
  Image,
  Send,
  MoreVertical,
  UserPlus,
  Bookmark,
  Flag,
  TrendingUp,
  Clock,
  Hash,
  Bell,
  Pin,
  Star,
  Coffee,
  BookOpen,
  Code,
  Gamepad2,
  Music,
  Camera,
  Utensils
} from 'lucide-react';

export default function CirclesPage() {
  const [circles, setCircles] = useState([
    {
      id: 1,
      name: 'CSE 2022 Batch',
      description: 'Official circle for Computer Science Engineering 2022 batch students',
      memberCount: 156,
      postCount: 89,
      category: 'Academic',
      privacy: 'private',
      isJoined: true,
      isAdmin: false,
      avatar: '/api/placeholder/80/80',
      cover: '/api/placeholder/400/200',
      lastActivity: '2 minutes ago',
      newMessages: 5,
      trending: true,
      tags: ['cse', 'batch2022', 'academics']
    },
    {
      id: 2,
      name: 'BIT Photography Club',
      description: 'Share your best shots and learn photography techniques together',
      memberCount: 89,
      postCount: 234,
      category: 'Hobby',
      privacy: 'public',
      isJoined: true,
      isAdmin: true,
      avatar: '/api/placeholder/80/80',
      cover: '/api/placeholder/400/200',
      lastActivity: '15 minutes ago',
      newMessages: 0,
      trending: false,
      tags: ['photography', 'art', 'creative']
    },
    {
      id: 3,
      name: 'Placement Prep Warriors',
      description: 'Coding practice, interview tips, and placement discussions',
      memberCount: 234,
      postCount: 156,
      category: 'Career',
      privacy: 'private',
      isJoined: false,
      isAdmin: false,
      avatar: '/api/placeholder/80/80',
      cover: '/api/placeholder/400/200',
      lastActivity: '1 hour ago',
      newMessages: 0,
      trending: true,
      tags: ['placement', 'coding', 'interview']
    },
    {
      id: 4,
      name: 'Hostel 5 Gang',
      description: 'For all the legends living in Hostel 5',
      memberCount: 67,
      postCount: 445,
      category: 'Social',
      privacy: 'private',
      isJoined: true,
      isAdmin: false,
      avatar: '/api/placeholder/80/80',
      cover: '/api/placeholder/400/200',
      lastActivity: '5 minutes ago',
      newMessages: 12,
      trending: false,
      tags: ['hostel5', 'friends', 'fun']
    },
    {
      id: 5,
      name: 'BIT Gaming Arena',
      description: 'Gaming enthusiasts unite! Tournaments, reviews, and gaming sessions',
      memberCount: 112,
      postCount: 78,
      category: 'Gaming',
      privacy: 'public',
      isJoined: false,
      isAdmin: false,
      avatar: '/api/placeholder/80/80',
      cover: '/api/placeholder/400/200',
      lastActivity: '30 minutes ago',
      newMessages: 0,
      trending: true,
      tags: ['gaming', 'esports', 'tournaments']
    },
    {
      id: 6,
      name: 'Food Lovers BIT',
      description: 'Discover great food spots around campus and share recipes',
      memberCount: 78,
      postCount: 167,
      category: 'Food',
      privacy: 'public',
      isJoined: true,
      isAdmin: false,
      avatar: '/api/placeholder/80/80',
      cover: '/api/placeholder/400/200',
      lastActivity: '3 hours ago',
      newMessages: 2,
      trending: false,
      tags: ['food', 'recipes', 'restaurants']
    }
  ]);

  const [selectedCircle, setSelectedCircle] = useState(null);
  const [view, setView] = useState('discover'); // 'discover', 'my-circles', 'circle-detail'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'chat'
  const { showToast } = useToast();

  const categories = [
    { id: 'academic', name: 'Academic', icon: BookOpen, color: 'text-blue-500' },
    { id: 'hobby', name: 'Hobby', icon: Camera, color: 'text-purple-500' },
    { id: 'career', name: 'Career', icon: TrendingUp, color: 'text-green-500' },
    { id: 'social', name: 'Social', icon: Users, color: 'text-pink-500' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'text-orange-500' },
    { id: 'food', name: 'Food', icon: Utensils, color: 'text-red-500' },
    { id: 'music', name: 'Music', icon: Music, color: 'text-indigo-500' },
    { id: 'tech', name: 'Tech', icon: Code, color: 'text-cyan-500' }
  ];

  const [circlePosts, setCirclePosts] = useState([
    {
      id: 1,
      author: 'Rahul Sharma',
      avatar: '/api/placeholder/40/40',
      timeAgo: '2 hours ago',
      content: 'Just solved a really tricky dynamic programming problem! Anyone else working on competitive programming?',
      likes: 23,
      comments: 8,
      isLiked: false,
      isPinned: false,
      images: []
    },
    {
      id: 2,
      author: 'Priya Singh',
      avatar: '/api/placeholder/40/40',
      timeAgo: '4 hours ago',
      content: 'Amazing sunset shot from the hostel terrace! 📸',
      likes: 45,
      comments: 12,
      isLiked: true,
      isPinned: true,
      images: ['/api/placeholder/400/300']
    }
  ]);

  const [circleMessages, setCircleMessages] = useState([
    {
      id: 1,
      author: 'Vikash Kumar',
      avatar: '/api/placeholder/32/32',
      timestamp: '10:30 AM',
      content: 'Good morning everyone! Ready for today\'s lab session?',
      isOwn: false
    },
    {
      id: 2,
      author: 'You',
      avatar: '/api/placeholder/32/32',
      timestamp: '10:32 AM',
      content: 'Yes! Already prepared the code. See you all there.',
      isOwn: true
    },
    {
      id: 3,
      author: 'Anita Gupta',
      avatar: '/api/placeholder/32/32',
      timestamp: '10:35 AM',
      content: 'Can someone share the lab manual? I can\'t find mine 😅',
      isOwn: false
    }
  ]);

  const filteredCircles = circles.filter(circle => {
    const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circle.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           circle.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const myCircles = circles.filter(circle => circle.isJoined);

  const handleJoinCircle = (circleId) => {
    setCircles(circles.map(circle => 
      circle.id === circleId 
        ? { ...circle, isJoined: true, memberCount: circle.memberCount + 1 }
        : circle
    ));
    showToast('Successfully joined the circle!', 'success');
  };

  const handleLeaveCircle = (circleId) => {
    setCircles(circles.map(circle => 
      circle.id === circleId 
        ? { ...circle, isJoined: false, memberCount: circle.memberCount - 1 }
        : circle
    ));
    showToast('Left the circle', 'info');
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: circlePosts.length + 1,
      author: 'You',
      avatar: '/api/placeholder/40/40',
      timeAgo: 'just now',
      content: newPost,
      likes: 0,
      comments: 0,
      isLiked: false,
      isPinned: false,
      images: []
    };
    
    setCirclePosts([post, ...circlePosts]);
    setNewPost('');
    showToast('Post shared successfully!', 'success');
  };

  const handleMessageSubmit = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: circleMessages.length + 1,
      author: 'You',
      avatar: '/api/placeholder/32/32',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      content: newMessage,
      isOwn: true
    };
    
    setCircleMessages([...circleMessages, message]);
    setNewMessage('');
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => category.toLowerCase() === c.id);
    return cat ? { icon: cat.icon, color: cat.color } : { icon: Users, color: 'text-gray-500' };
  };

  const renderDiscoverView = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search circles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => showToast('Create circle feature coming soon!', 'info')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="h-4 w-4" />
            Create Circle
          </Button>
        </div>

        {/* Category Filters */}
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

      {/* Circles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCircles.map(circle => {
          const categoryInfo = getCategoryIcon(circle.category);
          const CategoryIcon = categoryInfo.icon;
          
          return (
            <Card key={circle.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
              {/* Cover Image */}
              <div className="relative h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryIcon className={`h-12 w-12 ${categoryInfo.color} opacity-30`} />
                </div>
                
                {/* Privacy Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant={circle.privacy === 'private' ? 'secondary' : 'outline'}>
                    {circle.privacy === 'private' ? <Lock className="h-3 w-3 mr-1" /> : <Globe className="h-3 w-3 mr-1" />}
                    {circle.privacy}
                  </Badge>
                </div>

                {/* Trending Badge */}
                {circle.trending && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-500 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                )}

                {/* New Messages Indicator */}
                {circle.newMessages > 0 && circle.isJoined && (
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-red-500 text-white">
                      {circle.newMessages} new
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                {/* Circle Info */}
                <div className="flex items-start gap-3">
                  <Avatar src={circle.avatar} alt={circle.name} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{circle.name}</h3>
                      {circle.isAdmin && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {circle.description}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {circle.memberCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {circle.postCount}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {circle.lastActivity}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {circle.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {circle.isJoined ? (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          setSelectedCircle(circle);
                          setView('circle-detail');
                        }}
                        className="flex-1"
                      >
                        Open Circle
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLeaveCircle(circle.id)}
                      >
                        Leave
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJoinCircle(circle.id)}
                      className="flex-1"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Join Circle
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderMyCirclesView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">My Circles</h2>
        <p className="text-muted-foreground">Circles you&apos;re part of</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCircles.map(circle => {
          const categoryInfo = getCategoryIcon(circle.category);
          const CategoryIcon = categoryInfo.icon;
          
          return (
            <Card key={circle.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover cursor-pointer"
                  onClick={() => {
                    setSelectedCircle(circle);
                    setView('circle-detail');
                  }}>
              <div className="relative h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryIcon className={`h-12 w-12 ${categoryInfo.color} opacity-30`} />
                </div>
                
                {circle.isAdmin && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  </div>
                )}

                {circle.newMessages > 0 && (
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      {circle.newMessages}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar src={circle.avatar} alt={circle.name} size="sm" />
                  <div>
                    <h3 className="font-semibold">{circle.name}</h3>
                    <p className="text-xs text-muted-foreground">{circle.memberCount} members</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderCircleDetailView = () => {
    return (
      <div className="space-y-6">
        {/* Circle Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setView('my-circles')}
            >
              ← Back
            </Button>
            <div className="flex-1 flex items-center gap-4">
              <Avatar src={selectedCircle.avatar} alt={selectedCircle.name} size="lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{selectedCircle.name}</h1>
                  {selectedCircle.isAdmin && (
                    <Crown className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-muted-foreground">{selectedCircle.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span>{selectedCircle.memberCount} members</span>
                  <span>{selectedCircle.postCount} posts</span>
                  <span>Active {selectedCircle.lastActivity}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'posts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('posts')}
              className="flex items-center gap-2"
            >
              <Hash className="h-4 w-4" />
              Posts
            </Button>
            <Button
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              onClick={() => setActiveTab('chat')}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
              {selectedCircle.newMessages > 0 && (
                <Badge className="bg-red-500 text-white ml-1">
                  {selectedCircle.newMessages}
                </Badge>
              )}
            </Button>
          </div>
        </Card>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Create Post */}
            <Card className="p-4">
              <div className="flex gap-3">
                <Avatar src="/api/placeholder/40/40" alt="You" />
                <div className="flex-1 space-y-3">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share something with the circle..."
                    className="w-full p-3 border rounded-lg resize-none bg-background"
                    rows="3"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pin className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handlePostSubmit}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {circlePosts.map(post => (
                <Card key={post.id} className="p-4">
                  <div className="flex gap-3">
                    <Avatar src={post.avatar} alt={post.author} />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {post.isPinned && (
                            <Pin className="h-4 w-4 text-blue-500" />
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-foreground">{post.content}</p>
                      
                      {post.images.length > 0 && (
                        <div className="grid grid-cols-1 gap-2">
                          {post.images.map((image, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden">
                              <div className="aspect-video bg-muted flex items-center justify-center">
                                <Camera className="h-8 w-8 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-6 pt-2 border-t">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current text-red-500' : ''}`} />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                        
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-yellow-500 transition-colors ml-auto">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <Card className="h-96 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Circle Chat</h3>
              <Badge variant="outline" className="ml-auto">
                {selectedCircle.memberCount} online
              </Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {circleMessages.map(message => (
                <div key={message.id} className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                  {!message.isOwn && (
                    <Avatar src={message.avatar} alt={message.author} size="sm" />
                  )}
                  <div className={`flex-1 max-w-xs ${message.isOwn ? 'text-right' : ''}`}>
                    {!message.isOwn && (
                      <p className="text-xs text-muted-foreground mb-1">{message.author}</p>
                    )}
                    <div className={`p-3 rounded-lg ${
                      message.isOwn 
                        ? 'bg-blue-500 text-white ml-auto' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleMessageSubmit()}
                />
                <Button
                  onClick={handleMessageSubmit}
                  disabled={!newMessage.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            BIT Circles
          </h1>
          <p className="text-muted-foreground text-lg">
            Join communities, share posts, and connect with like-minded BITians
          </p>
        </div>

        {/* Navigation */}
        {view !== 'circle-detail' && (
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={view === 'discover' ? 'default' : 'ghost'}
                onClick={() => setView('discover')}
                className="rounded-md"
              >
                Discover
              </Button>
              <Button
                variant={view === 'my-circles' ? 'default' : 'ghost'}
                onClick={() => setView('my-circles')}
                className="rounded-md flex items-center gap-2"
              >
                My Circles
                {myCircles.filter(c => c.newMessages > 0).length > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {myCircles.filter(c => c.newMessages > 0).length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <>
            {view === 'discover' && renderDiscoverView()}
            {view === 'my-circles' && renderMyCirclesView()}
            {view === 'circle-detail' && selectedCircle && renderCircleDetailView()}
          </>
        )}
      </div>
    </PageLayout>
  );
}
