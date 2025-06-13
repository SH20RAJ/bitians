'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { RichText } from '@/components/ui/RichText';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import MobileHamburgerMenu from '@/components/MobileHamburgerMenu';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreVertical,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  Bell,
  TrendingUp,
  Clock,
  Eye,
  Users,
  SkipBack,
  SkipForward,
  Plus,
  Check,
  Send,
  Smile,
  Crown,
  BookOpen,
  Calendar,
  X
} from 'lucide-react';

export default function WatchPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('for-you');
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [savedVideos, setSavedVideos] = useState(new Set());

  // Enhanced video data following UI/UX principles
  const videos = [
    {
      id: 1,
      title: 'Campus Life at BIT Mesra: A Day in Paradise 🌅',
      author: {
        name: 'Priya Sharma',
        username: 'priyasharma_k22',
        avatar: 'PS',
        kBatch: 'K22',
        verified: true,
        followers: '12.5K'
      },
      description: 'Starting my day at 6 AM with a beautiful sunrise from the hostel terrace, then off to classes, library sessions, and ending with friends at the lake. This is what makes BIT Mesra special! ✨',
      duration: '2:45',
      views: '45.2K',
      likes: 3420,
      comments: 234,
      shares: 156,
      timestamp: '2h ago',
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=600&fit=crop',
      tags: ['campus', 'lifestyle', 'bitmesra', 'student'],
      category: 'Lifestyle',
      trending: true
    },
    {
      id: 2,
      title: 'Coding Bootcamp: React.js in 60 Seconds! 🚀',
      author: {
        name: 'Arjun Patel',
        username: 'arjuncode',
        avatar: 'AP',
        kBatch: 'K21',
        verified: true,
        followers: '28.3K'
      },
      description: 'Quick React tutorial covering components, hooks, and state management. Perfect for beginners! Drop your questions in comments 👇',
      duration: '1:12',
      views: '89.1K',
      likes: 5670,
      comments: 445,
      shares: 234,
      timestamp: '4h ago',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop',
      tags: ['coding', 'react', 'tutorial', 'programming'],
      category: 'Education',
      trending: false
    },
    {
      id: 3,
      title: 'Hostel Food vs Home Food: The Eternal Debate 😂',
      author: {
        name: 'Sneha Reddy',
        username: 'sneha_foodie',
        avatar: 'SR',
        kBatch: 'K20',
        verified: false,
        followers: '8.7K'
      },
      description: 'POV: You are missing home food but hostel maggi hits different at 2 AM 🍜 Tag someone who relates!',
      duration: '0:45',
      views: '156.8K',
      likes: 12450,
      comments: 1234,
      shares: 567,
      timestamp: '1d ago',
      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop',
      tags: ['food', 'hostel', 'funny', 'relatable'],
      category: 'Comedy',
      trending: true
    },
    {
      id: 4,
      title: 'Late Night Study Session Vibes 📚✨',
      author: {
        name: 'Rahul Kumar',
        username: 'rahul_studies',
        avatar: 'RK',
        kBatch: 'K23',
        verified: false,
        followers: '5.2K'
      },
      description: 'When you have an exam tomorrow but you are just starting to study 😅 The library at 2 AM hits different though!',
      duration: '1:33',
      views: '23.4K',
      likes: 1890,
      comments: 167,
      shares: 89,
      timestamp: '6h ago',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      tags: ['study', 'exam', 'library', 'student'],
      category: 'Education',
      trending: false
    }
  ];

  const categories = [
    { id: 'for-you', label: 'For You', icon: TrendingUp },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'lifestyle', label: 'Lifestyle', icon: Heart },
    { id: 'comedy', label: 'Comedy', icon: Smile },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  const currentVideo = videos[currentVideoIndex];

  const handleVideoInteraction = (action, videoId) => {
    switch (action) {
      case 'like':
        setLikedVideos(prev => {
          const newSet = new Set(prev);
          if (newSet.has(videoId)) {
            newSet.delete(videoId);
            toast({ title: 'Removed from liked videos' });
          } else {
            newSet.add(videoId);
            toast({ title: 'Added to liked videos' });
          }
          return newSet;
        });
        break;
      case 'save':
        setSavedVideos(prev => {
          const newSet = new Set(prev);
          if (newSet.has(videoId)) {
            newSet.delete(videoId);
            toast({ title: 'Removed from saved videos' });
          } else {
            newSet.add(videoId);
            toast({ title: 'Video saved' });
          }
          return newSet;
        });
        break;
      case 'follow':
        const authorUsername = videos.find(v => v.id === videoId)?.author.username;
        if (authorUsername) {
          setFollowedUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(authorUsername)) {
              newSet.delete(authorUsername);
              toast({ title: 'Unfollowed user' });
            } else {
              newSet.add(authorUsername);
              toast({ title: 'Following user' });
            }
            return newSet;
          });
        }
        break;
    }
  };

  const handleShare = (video) => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied to clipboard!' });
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const submitComment = () => {
    if (newComment.trim()) {
      toast({ title: 'Comment posted!' });
      setNewComment('');
      setShowComments(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-bold text-lg">Watch</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <MobileHamburgerMenu />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto px-4 pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap mr-2 transition-colors ${
                activeTab === category.id
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Content */}
      <div className="relative h-screen pt-28">
        {/* Video Container */}
        <div className="relative h-full w-full">
          {/* Video Placeholder */}
          <div 
            className="h-full w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={togglePlayPause}
                variant="ghost"
                size="icon"
                className="w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>
            </div>

            {/* Top Video Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>

            {/* Bottom Video Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-end justify-between">
                {/* Video Info */}
                <div className="flex-1 mr-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-10 h-10 border-2 border-white/20">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                        {currentVideo.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{currentVideo.author.name}</h3>
                        {currentVideo.author.verified && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white/70 text-sm">@{currentVideo.author.username}</span>
                        {currentVideo.author.kBatch !== 'Official' && (
                          <KBatchBadge kBatch={currentVideo.author.kBatch} size="sm" />
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleVideoInteraction('follow', currentVideo.id)}
                      variant="outline"
                      size="sm"
                      className={`ml-2 ${
                        followedUsers.has(currentVideo.author.username)
                          ? 'bg-white/20 text-white border-white/30'
                          : 'bg-white text-black border-white'
                      }`}
                    >
                      {followedUsers.has(currentVideo.author.username) ? (
                        <Check className="w-4 h-4 mr-1" />
                      ) : (
                        <Plus className="w-4 h-4 mr-1" />
                      )}
                      <span className="hidden sm:inline">
                        {followedUsers.has(currentVideo.author.username) ? 'Following' : 'Follow'}
                      </span>
                    </Button>
                  </div>
                  
                  <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {currentVideo.title}
                  </h2>
                  
                  <p className="text-white/80 text-sm mb-2 line-clamp-2">
                    {currentVideo.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-white/70 text-sm">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {currentVideo.views}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentVideo.timestamp}
                    </span>
                    {currentVideo.trending && (
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4">
                  <Button
                    onClick={() => handleVideoInteraction('like', currentVideo.id)}
                    variant="ghost"
                    size="icon"
                    className={`w-12 h-12 rounded-full ${
                      likedVideos.has(currentVideo.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${likedVideos.has(currentVideo.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <span className="text-xs text-white/70 text-center">
                    {currentVideo.likes.toLocaleString()}
                  </span>

                  <Button
                    onClick={() => setShowComments(true)}
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </Button>
                  <span className="text-xs text-white/70 text-center">
                    {currentVideo.comments}
                  </span>

                  <Button
                    onClick={() => handleShare(currentVideo)}
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <Share2 className="w-6 h-6" />
                  </Button>
                  <span className="text-xs text-white/70 text-center">
                    {currentVideo.shares}
                  </span>

                  <Button
                    onClick={() => handleVideoInteraction('save', currentVideo.id)}
                    variant="ghost"
                    size="icon"
                    className={`w-12 h-12 rounded-full ${
                      savedVideos.has(currentVideo.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Bookmark className={`w-6 h-6 ${savedVideos.has(currentVideo.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Button
              onClick={prevVideo}
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <SkipBack className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Button
              onClick={nextVideo}
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Comments ({currentVideo.comments})</h3>
                <Button
                  onClick={() => setShowComments(false)}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>U{index + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <h4 className="font-semibold text-sm">User {index + 1}</h4>
                      <p className="text-sm">This is an amazing video! Love the content 🔥</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>2h ago</span>
                      <button className="hover:text-primary">Like</button>
                      <button className="hover:text-primary">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-full"
                    onKeyPress={(e) => e.key === 'Enter' && submitComment()}
                  />
                  <Button
                    onClick={submitComment}
                    disabled={!newComment.trim()}
                    size="icon"
                    className="rounded-full"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
