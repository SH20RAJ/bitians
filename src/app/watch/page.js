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
    Filter,
    Grid3X3,
    List,
    Maximize,
    Minimize,
    SkipBack,
    SkipForward,
    Repeat,
    Shuffle,
    ThumbsUp,
    ThumbsDown,
    Plus,
    Check,
    Star,
    Flag,
    Download,
    Send,
    Smile,
    Camera,
    Mic,
    Image,
    Gift,
    Hash,
    AtSign,
    MapPin,
    Calendar,
    Settings,
    UserPlus,
    Crown,
    Verified,
    Zap,
    Target,
    Trophy,
    Sparkles,
    BookOpen,
  X,
  Code,
  Coffee
} from 'lucide-react';export default function WatchPage() {
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
  const videoRef = useRef(null);  // Enhanced video data following UI/UX principles  const videos = [    {      id: 1,      title: 'Campus Life at BIT Mesra: A Day in Paradise 🌅',      author: {        name: 'Priya Sharma',        username: 'priyasharma_k22',        avatar: 'PS',        kBatch: 'K22',        verified: true,        followers: '12.5K'      },      description: 'Starting my day at 6 AM with a beautiful sunrise from the hostel terrace, then off to classes, library sessions, and ending with friends at the lake. This is what makes BIT Mesra special! ✨',      duration: '2:45',      views: '45.2K',      likes: 3420,      comments: 234,      shares: 156,      timestamp: '2h ago',      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=600&fit=crop',      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',      tags: ['campus', 'lifestyle', 'bitmesra', 'student'],      category: 'Lifestyle',      engagement: 8.5,      trending: true    },    {      id: 2,      title: 'Coding Bootcamp: React.js in 60 Seconds! 🚀',      author: {        name: 'Arjun Patel',        username: 'arjuncode',        avatar: 'AP',        kBatch: 'K21',        verified: true,        followers: '28.3K'      },      description: 'Quick React tutorial covering components, hooks, and state management. Perfect for beginners! Drop your questions in comments 👇',      duration: '1:12',      views: '89.1K',      likes: 5670,      comments: 445,      shares: 234,      timestamp: '4h ago',      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop',      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',      tags: ['coding', 'react', 'tutorial', 'programming'],      category: 'Education',      engagement: 9.2,      trending: false    },    {      id: 3,      title: 'Hostel Food vs Home Food: The Eternal Debate 😂',      author: {        name: 'Sneha Reddy',        username: 'sneha_foodie',        avatar: 'SR',        kBatch: 'K20',        verified: false,        followers: '8.7K'      },      description: 'POV: You are missing home food but hostel maggi hits different at 2 AM 🍜 Tag someone who relates!',      duration: '0:45',      views: '156.8K',      likes: 12450,      comments: 1234,      shares: 567,      timestamp: '1d ago',      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop',      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',      tags: ['food', 'hostel', 'funny', 'relatable'],      category: 'Comedy',      engagement: 9.8,      trending: true    },    {      id: 4,      title: 'Late Night Study Session Vibes 📚✨',      author: {        name: 'Rahul Kumar',        username: 'rahul_studies',        avatar: 'RK',        kBatch: 'K23',        verified: false,        followers: '5.2K'      },      description: 'When you have an exam tomorrow but you are just starting to study 😅 The library at 2 AM hits different though!',      duration: '1:33',      views: '23.4K',      likes: 1890,      comments: 167,      shares: 89,      timestamp: '6h ago',      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',      tags: ['study', 'exam', 'library', 'student'],      category: 'Education',      engagement: 7.8,      trending: false    }  ];  const categories = [    { id: 'for-you', label: 'For You', icon: TrendingUp },    { id: 'following', label: 'Following', icon: Users },    { id: 'education', label: 'Education', icon: BookOpen },    { id: 'lifestyle', label: 'Lifestyle', icon: Heart },    { id: 'comedy', label: 'Comedy', icon: Smile },    { id: 'events', label: 'Events', icon: Calendar }  ];  const currentVideo = videos[currentVideoIndex];  const handleVideoInteraction = (action, videoId) => {    switch (action) {      case 'like':        setLikedVideos(prev => {          const newSet = new Set(prev);          if (newSet.has(videoId)) {            newSet.delete(videoId);            toast({ title: 'Removed from liked videos' });          } else {            newSet.add(videoId);            toast({ title: 'Added to liked videos' });          }          return newSet;        });        break;      case 'save':        setSavedVideos(prev => {          const newSet = new Set(prev);          if (newSet.has(videoId)) {            newSet.delete(videoId);            toast({ title: 'Removed from saved videos' });          } else {            newSet.add(videoId);            toast({ title: 'Video saved' });          }          return newSet;        });        break;      case 'follow':        const authorUsername = videos.find(v => v.id === videoId)?.author.username;        if (authorUsername) {          setFollowedUsers(prev => {            const newSet = new Set(prev);            if (newSet.has(authorUsername)) {              newSet.delete(authorUsername);              toast({ title: 'Unfollowed user' });            } else {              newSet.add(authorUsername);              toast({ title: 'Following user' });            }            return newSet;          });        }        break;    }  };  const handleShare = (video) => {    if (navigator.share) {      navigator.share({        title: video.title,        text: video.description,        url: window.location.href      });    } else {      navigator.clipboard.writeText(window.location.href);      toast({ title: 'Link copied to clipboard!' });    }  };  const togglePlayPause = () => {    setIsPlaying(!isPlaying);  };  const toggleMute = () => {    setIsMuted(!isMuted);  };  const nextVideo = () => {    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);  };  const prevVideo = () => {    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);  };  const submitComment = () => {    if (newComment.trim()) {      toast({ title: 'Comment posted!' });      setNewComment('');      setShowComments(false);    }  };  return (    <div className="min-h-screen bg-black text-white">      {/* Mobile Header */}      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">        <div className="flex items-center justify-between p-4">          <Button            variant="ghost"            size="icon"            onClick={() => router.back()}            className="text-white hover:bg-white/20"          >            <ArrowLeft className="w-5 h-5" />          </Button>          <h1 className="font-bold text-lg">BIT Watch</h1>          <Button            variant="ghost"            size="icon"            className="text-white hover:bg-white/20"          >            <Search className="w-5 h-5" />          </Button>        </div>        {/* Category Tabs */}        <div className="flex space-x-4 px-4 pb-2 overflow-x-auto">          {categories.map((category) => {            const Icon = category.icon;            return (              <Button                key={category.id}                variant={activeTab === category.id ? 'default' : 'ghost'}                size="sm"                onClick={() => setActiveTab(category.id)}                className={`flex items-center space-x-2 whitespace-nowrap ${                  activeTab === category.id                    ? 'bg-white text-black'                    : 'text-white hover:bg-white/20'                }`}              >                <Icon className="w-4 h-4" />                <span>{category.label}</span>              </Button>            );          })}        </div>      </div>      {/* Video Player Area */}      <div className="relative h-screen">        {/* Video Background */}        <div           className="absolute inset-0 bg-cover bg-center"          style={{             backgroundImage: `url(${currentVideo.thumbnail})`,            filter: 'blur(20px)',            transform: 'scale(1.1)'          }}        />                {/* Video Container */}        <div className="relative z-10 h-full flex items-center justify-center">          <div className="w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden">            <div className="aspect-video relative">              <img                src={currentVideo.thumbnail}                alt={currentVideo.title}                className="w-full h-full object-cover"              />                            {/* Video Controls Overlay */}              <div className="absolute inset-0 flex items-center justify-center">                <Button                  variant="ghost"                  size="icon"                  onClick={togglePlayPause}                  className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full"                >                  {isPlaying ? (                    <Pause className="w-8 h-8" />                  ) : (                    <Play className="w-8 h-8 ml-1" />                  )}                </Button>              </div>              {/* Video Info Overlay */}              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">                <div className="flex items-center space-x-3 mb-2">                  <Avatar className="w-10 h-10">                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">                      {currentVideo.author.avatar}                    </AvatarFallback>                  </Avatar>                  <div className="flex-1">                    <div className="flex items-center space-x-2">                      <span className="font-semibold text-white">                        {currentVideo.author.name}                      </span>                      {currentVideo.author.verified && (                        <Verified className="w-4 h-4 text-blue-400" />                      )}                    </div>                    <div className="flex items-center space-x-2 text-sm text-gray-300">                      <KBatchBadge kBatch={currentVideo.author.kBatch} size="xs" />                      <span>•</span>                      <span>{currentVideo.author.followers} followers</span>                    </div>                  </div>                  <Button                    variant={followedUsers.has(currentVideo.author.username) ? 'default' : 'outline'}                    size="sm"                    onClick={() => handleVideoInteraction('follow', currentVideo.id)}                    className="bg-white text-black hover:bg-gray-200"                  >                    {followedUsers.has(currentVideo.author.username) ? 'Following' : 'Follow'}                  </Button>                </div>                <div className="mb-3">                  <h3 className="font-semibold text-white mb-1">                    {currentVideo.title}                  </h3>                  <RichText                    content={currentVideo.description}                    className="text-sm text-gray-300 line-clamp-2"                  />                </div>                <div className="flex items-center justify-between text-sm text-gray-400">                  <div className="flex items-center space-x-4">                    <span className="flex items-center space-x-1">                      <Eye className="w-4 h-4" />                      <span>{currentVideo.views}</span>                    </span>                    <span className="flex items-center space-x-1">                      <Clock className="w-4 h-4" />                      <span>{currentVideo.timestamp}</span>                    </span>                  </div>                  <span>{currentVideo.duration}</span>                </div>              </div>            </div>          </div>        </div>        {/* Side Action Bar */}        <div className="absolute right-4 bottom-32 z-20 space-y-4">          {/* Like Button */}          <div className="flex flex-col items-center">            <Button              variant="ghost"              size="icon"              onClick={() => handleVideoInteraction('like', currentVideo.id)}              className={`w-12 h-12 rounded-full ${                likedVideos.has(currentVideo.id)                  ? 'bg-red-500 text-white'                  : 'bg-black/50 text-white hover:bg-black/70'              }`}            >              <Heart className={`w-6 h-6 ${likedVideos.has(currentVideo.id) ? 'fill-current' : ''}`} />            </Button>            <span className="text-xs text-white mt-1">              {currentVideo.likes + (likedVideos.has(currentVideo.id) ? 1 : 0)}            </span>          </div>          {/* Comment Button */}          <div className="flex flex-col items-center">            <Button              variant="ghost"              size="icon"              onClick={() => setShowComments(true)}              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"            >              <MessageCircle className="w-6 h-6" />            </Button>            <span className="text-xs text-white mt-1">{currentVideo.comments}</span>          </div>          {/* Share Button */}          <div className="flex flex-col items-center">            <Button              variant="ghost"              size="icon"              onClick={() => handleShare(currentVideo)}              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"            >              <Share2 className="w-6 h-6" />            </Button>            <span className="text-xs text-white mt-1">{currentVideo.shares}</span>          </div>          {/* Save Button */}          <Button            variant="ghost"            size="icon"            onClick={() => handleVideoInteraction('save', currentVideo.id)}            className={`w-12 h-12 rounded-full ${              savedVideos.has(currentVideo.id)                ? 'bg-yellow-500 text-white'                : 'bg-black/50 text-white hover:bg-black/70'            }`}          >            <Bookmark className={`w-6 h-6 ${savedVideos.has(currentVideo.id) ? 'fill-current' : ''}`} />          </Button>        </div>        {/* Navigation Arrows */}        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">          <Button            variant="ghost"            size="icon"            onClick={prevVideo}            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"          >            <SkipBack className="w-6 h-6" />          </Button>        </div>        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 z-20">          <Button            variant="ghost"            size="icon"            onClick={nextVideo}            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"          >            <SkipForward className="w-6 h-6" />          </Button>        </div>      </div>      {/* Comments Modal */}      {showComments && (        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[70vh] overflow-hidden">            <div className="p-4 border-b border-gray-200 flex items-center justify-between">              <h3 className="font-semibold text-black">Comments ({currentVideo.comments})</h3>              <Button                variant="ghost"                size="icon"                onClick={() => setShowComments(false)}                className="text-black hover:bg-gray-100"              >                <X className="w-5 h-5" />              </Button>            </div>                        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">              {/* Sample Comments */}              {[1, 2, 3].map((comment) => (                <div key={comment} className="flex space-x-3">                  <Avatar className="w-8 h-8">                    <AvatarFallback className="bg-gray-300 text-black text-sm">                      U{comment}                    </AvatarFallback>                  </Avatar>                  <div className="flex-1">                    <div className="flex items-center space-x-2">                      <span className="font-semibold text-sm text-black">User{comment}</span>                      <span className="text-xs text-gray-500">2m ago</span>                    </div>                    <p className="text-sm text-gray-700">                      Great video! Really helpful content 👍                    </p>                  </div>                </div>              ))}            </div>            <div className="p-4 border-t border-gray-200">              <div className="flex space-x-3">                <Avatar className="w-8 h-8">                  <AvatarFallback className="bg-blue-500 text-white text-sm">                    SR                  </AvatarFallback>                </Avatar>                <div className="flex-1 flex space-x-2">                  <Input                    placeholder="Add a comment..."                    value={newComment}                    onChange={(e) => setNewComment(e.target.value)}                    className="flex-1 text-black"                  />                  <Button                    onClick={submitComment}                    disabled={!newComment.trim()}                    className="bg-blue-500 text-white hover:bg-blue-600"                  >                    <Send className="w-4 h-4" />                  </Button>                </div>              </div>            </div>          </div>        </div>      )}      {/* Bottom Navigation */}      <BottomNavigation currentPage="watch" />    </div>  );}

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
  Filter,
  SkipBack,
  SkipForward,
  ThumbsUp,
  ThumbsDown,
  Send,
  Smile,
  Camera,
  X,
  Code,
  Coffee,
  BookOpen,
  Calendar,
  Verified
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
  const videoRef = useRef(null);

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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      tags: ['campus', 'lifestyle', 'bitmesra', 'student'],
      category: 'Lifestyle',
      engagement: 8.5,
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      tags: ['coding', 'react', 'tutorial', 'programming'],
      category: 'Education',
      engagement: 9.2,
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      tags: ['food', 'hostel', 'funny', 'relatable'],
      category: 'Comedy',
      engagement: 9.8,
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      tags: ['study', 'exam', 'library', 'student'],
      category: 'Education',
      engagement: 7.8,
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
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-lg">BIT Watch</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-4 px-4 pb-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeTab === category.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === category.id
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Video Player Area */}
      <div className="relative h-screen">
        {/* Video Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentVideo.thumbnail})`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />

        {/* Video Container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayPause}
                  className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </Button>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {currentVideo.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">
                        {currentVideo.author.name}
                      </span>
                      {currentVideo.author.verified && (
                        <Verified className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <KBatchBadge kBatch={currentVideo.author.kBatch} size="xs" />
                      <span>•</span>
                      <span>{currentVideo.author.followers} followers</span>
                    </div>
                  </div>
                  <Button
                    variant={followedUsers.has(currentVideo.author.username) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleVideoInteraction('follow', currentVideo.id)}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    {followedUsers.has(currentVideo.author.username) ? 'Following' : 'Follow'}
                  </Button>
                </div>

                <div className="mb-3">
                  <h3 className="font-semibold text-white mb-1">
                    {currentVideo.title}
                  </h3>
                  <RichText
                    content={currentVideo.description}
                    className="text-sm text-gray-300 line-clamp-2"
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{currentVideo.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{currentVideo.timestamp}</span>
                    </span>
                  </div>
                  <span>{currentVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Action Bar */}
        <div className="absolute right-4 bottom-32 z-20 space-y-4">
          {/* Like Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVideoInteraction('like', currentVideo.id)}
              className={`w-12 h-12 rounded-full ${
                likedVideos.has(currentVideo.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <Heart className={`w-6 h-6 ${likedVideos.has(currentVideo.id) ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-xs text-white mt-1">
              {currentVideo.likes + (likedVideos.has(currentVideo.id) ? 1 : 0)}
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowComments(true)}
              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <span className="text-xs text-white mt-1">{currentVideo.comments}</span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShare(currentVideo)}
              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <Share2 className="w-6 h-6" />
            </Button>
            <span className="text-xs text-white mt-1">{currentVideo.shares}</span>
          </div>

          {/* Save Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleVideoInteraction('save', currentVideo.id)}
            className={`w-12 h-12 rounded-full ${
              savedVideos.has(currentVideo.id)
                ? 'bg-yellow-500 text-white'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${savedVideos.has(currentVideo.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevVideo}
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <SkipBack className="w-6 h-6" />
          </Button>
        </div>

        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextVideo}
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-black">Comments ({currentVideo.comments})</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowComments(false)}
                className="text-black hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {/* Sample Comments */}
              {[1, 2, 3].map((comment) => (
                <div key={comment} className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-300 text-black text-sm">
                      U{comment}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm text-black">User{comment}</span>
                      <span className="text-xs text-gray-500">2m ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Great video! Really helpful content 👍
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-500 text-white text-sm">
                    SR
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 text-black"
                  />
                  <Button
                    onClick={submitComment}
                    disabled={!newComment.trim()}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="watch" />
    </div>
  );
}
