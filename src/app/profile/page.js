'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { RichText } from '@/components/ui/RichText';
import { MediaGrid } from '@/components/ui/MediaPlayer';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import MobileHamburgerMenu from '@/components/MobileHamburgerMenu';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Mail,
  Phone,
  Users,
  Star,
  Award,
  Code,
  Briefcase,
  GraduationCap,
  Camera,
  Settings,
  UserPlus,
  UserCheck,
  Eye,
  Clock,
  Grid3X3,
  List,
  TrendingUp,
  Hash,
  PartyPopper,
  ThumbsUp,
  Send,
  Gift,
  Crown,
  Edit,
  Github,
  Linkedin,
  Instagram,
  Globe,
  Search,
  Bell,
  Sparkles,
  Trophy,
  Target,
  Zap,
  Filter
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Enhanced user data following UI/UX principles (consistency & user-centric design)
  const user = {
    id: 1,
    name: 'Shaswat Raj',
    username: 'shaswatraj',
    bio: 'Full-stack developer & UI/UX enthusiast 🚀 Building the future of campus social networking at BIT Mesra',
    avatar: 'SR',
    coverPhoto: null,
    location: 'Ranchi, Jharkhand',
    joinDate: 'September 2020',
    kBatch: 'K20',
    branch: 'Computer Science',
    semester: '8th Semester',
    verified: true,
    website: 'https://shaswatraj.dev',
    email: 'shaswat@bitmesra.ac.in',
    phone: '+91 98765 43210',
    
    // Enhanced statistics (visual hierarchy)
    stats: {
      posts: 142,
      followers: 1248,
      following: 389,
      likes: 3421,
      applauds: 89,
      views: 12500,
      comments: 567,
      shares: 234
    },

    // Social links (affordance principle)
    socialLinks: {
      github: 'https://github.com/shaswatraj',
      linkedin: 'https://linkedin.com/in/shaswatraj',
      instagram: 'https://instagram.com/shaswatraj'
    },

    // Skills and interests (contextual design)
    skills: [
      { name: 'React.js', level: 'Expert', color: 'blue' },
      { name: 'Node.js', level: 'Advanced', color: 'green' },
      { name: 'Python', level: 'Advanced', color: 'yellow' },
      { name: 'UI/UX Design', level: 'Intermediate', color: 'purple' },
      { name: 'Mobile Development', level: 'Intermediate', color: 'indigo' }
    ],

    interests: [
      'Web Development', 'Mobile Apps', 'AI/ML', 'Blockchain', 
      'Photography', 'Gaming', 'Music', 'Travel'
    ],

    // Achievements (aesthetic-usability effect)
    achievements: [
      { 
        id: 1, 
        title: 'Top Contributor', 
        description: 'Most helpful posts in CSE community',
        icon: '🏆',
        color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        date: '2024'
      },
      { 
        id: 2, 
        title: 'Innovation Award', 
        description: 'Best project in hackathon',
        icon: '💡',
        color: 'bg-gradient-to-r from-blue-400 to-purple-500',
        date: '2023'
      },
      { 
        id: 3, 
        title: 'Community Builder', 
        description: '1000+ connections made',
        icon: '🤝',
        color: 'bg-gradient-to-r from-green-400 to-blue-500',
        date: '2023'
      }
    ]
  };
  // Posts data (Miller's Law - not overloading with too much info)
  const userPosts = [
    {
      id: 1,
      type: 'achievement',
      content: 'Just completed my final year project on AI-powered campus navigation! 🎉 Thanks to everyone who helped during the journey.',
      timestamp: '2h',
      likes: 45,
      comments: 12,
      shares: 8,
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=300&fit=crop' }
      ]
    },
    {
      id: 2,
      type: 'text',
      content: 'Quick tip for my fellow developers: Always write clean, readable code. Your future self will thank you! 💻\n\n#coding #webdev #bitmesra',
      timestamp: '1d',
      likes: 67,
      comments: 23,
      shares: 15
    },
    {
      id: 3,
      type: 'image',
      content: 'Beautiful sunset from the hostel terrace 🌅 Sometimes you need to pause and appreciate the little moments.',
      timestamp: '3d',
      likes: 89,
      comments: 34,
      shares: 22,
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop' }
      ]
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? 'Unfollowed' : 'Following',
      description: isFollowing 
        ? `You unfollowed ${user.name}` 
        : `You are now following ${user.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Fixed positioning for consistency */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.stats.posts} posts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <MobileHamburgerMenu />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pb-20">
        {/* Cover Photo & Avatar Section - Visual hierarchy */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar & Basic Info */}
          <div className="px-4 pb-4">
            <div className="relative -mt-16 mb-4">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-full text-primary-foreground shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    {user.verified && (
                      <Badge variant="default" className="bg-blue-500">
                        <Crown className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <KBatchBadge kBatch={user.kBatch} />
                    <Badge variant="outline">{user.branch}</Badge>
                  </div>
                </div>

                {/* Action Buttons - Fitts's Law (large touch targets) */}
                <div className="flex space-x-2">
                  <Button
                    onClick={handleFollow}
                    variant={isFollowing ? "outline" : "default"}
                    size="sm"
                    className="min-w-[100px]"
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button onClick={handleMessage} variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-foreground leading-relaxed">{user.bio}</p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {user.joinDate}
                </div>
                <div className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-1" />
                  <a href={user.website} className="text-primary hover:underline">
                    Portfolio
                  </a>
                </div>
              </div>

              {/* Social Links - Affordance principle (clearly clickable) */}
              <div className="flex space-x-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Visual hierarchy with gradients */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-4 gap-3">
            <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {user.stats.posts}
              </div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Posts</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {user.stats.followers}
              </div>
              <div className="text-xs text-purple-600/70 dark:text-purple-400/70">Followers</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {user.stats.following}
              </div>
              <div className="text-xs text-green-600/70 dark:text-green-400/70">Following</div>
            </Card>
            <Card className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {user.stats.likes}
              </div>
              <div className="text-xs text-orange-600/70 dark:text-orange-400/70">Likes</div>
            </Card>
          </div>
        </div>

        {/* Achievements Section - Aesthetic-usability effect */}
        <div className="px-4 pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Achievements
          </h3>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {user.achievements.map((achievement) => (
              <Card key={achievement.id} className="min-w-[200px] overflow-hidden">
                <div className={`h-2 ${achievement.color}`}></div>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="px-4 pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-blue-500" />
            Skills & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-3 py-1"
              >
                {skill.name}
                <span className="ml-1 text-xs opacity-70">({skill.level})</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Tab Navigation - Jakob's Law (familiar pattern) */}
        <div className="px-4 pb-4">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'posts'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid3X3 className="w-4 h-4 mx-auto mb-1" />
              Posts
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'media'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Camera className="w-4 h-4 mx-auto mb-1" />
              Media
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'about'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserCheck className="w-4 h-4 mx-auto mb-1" />
              About
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {/* View Toggle */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Recent Posts</h3>
                <div className="flex space-x-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="w-8 h-8"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="w-8 h-8"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Posts */}
              {userPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{user.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {post.timestamp}
                          </span>
                        </div>
                        <RichText content={post.content} />
                        {post.media && (
                          <div className="mt-3">
                            <MediaGrid media={post.media} />
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-4 pt-2 border-t border-border">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-muted-foreground hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-muted-foreground hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-muted-foreground hover:text-green-500 transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span className="text-sm">{post.shares}</span>
                            </button>
                          </div>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-1">
              {/* Media grid placeholder */}
              {[...Array(12)].map((_, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg"></div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Birla Institute of Technology, Mesra</strong></p>
                  <p className="text-muted-foreground">B.Tech in Computer Science</p>
                  <p className="text-muted-foreground">{user.kBatch} Batch • {user.semester}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
    avatar: 'SR',
    kBatch: 'K20',
    branch: 'CSE',
    year: '4th Year',
    bio: '🚀 Full Stack Developer | 💻 Tech Enthusiast | 🎯 Problem Solver | Building the future one line of code at a time',
    location: 'Ranchi, Jharkhand',
    joinedDate: 'September 2020',
    website: 'https://shaswatraj.dev',
    email: 'shaswat@bitmesra.ac.in',
    verified: true,
    followers: 1248,
    following: 342,
    postsCount: 156,
    // New features
    relationshipStatus: 'Single',
    totalLikes: 5420,
    totalComments: 892,
    totalShares: 234,
    applaudsReceived: 156,
    profileViews: 12400,
    interests: ['Web Development', 'Machine Learning', 'Photography', 'Cricket'],
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'],
    achievements: [
      { title: 'Hackathon Winner', year: '2024', icon: '🏆' },
      { title: 'Top Contributor', year: '2023', icon: '⭐' },
      { title: 'Mentor of the Year', year: '2023', icon: '🎓' }
    ],
    socialLinks: {
      github: 'https://github.com/shaswatraj',
      linkedin: 'https://linkedin.com/in/shaswatraj',
      instagram: 'https://instagram.com/shaswatraj'
    }
  },
  alexjohnson: {
    id: 2,
    username: 'alexjohnson',
    name: 'Alex Johnson',
    avatar: 'AJ',
    kBatch: 'K21',
    branch: 'CSE',
    year: '3rd Year',
    bio: '🔥 Competitive Programmer | 📱 Mobile App Developer | 🎮 Gaming Enthusiast',
    location: 'Delhi, India',
    joinedDate: 'August 2021',
    website: 'https://alexjohnson.dev',
    email: 'alex@bitmesra.ac.in',
    verified: true,
    followers: 892,
    following: 234,
    postsCount: 78,
    relationshipStatus: 'In a relationship',
    totalLikes: 3240,
    totalComments: 567,
    totalShares: 123,
    applaudsReceived: 89,
    profileViews: 8900,
    interests: ['Competitive Programming', 'Mobile Development', 'Gaming'],
    skills: ['C++', 'Java', 'Flutter', 'Dart', 'Firebase'],
    achievements: [
      { title: 'ICPC Regionalist', year: '2023', icon: '🥇' },
      { title: 'Google Summer of Code', year: '2023', icon: '🌟' }
    ],
    socialLinks: {
      github: 'https://github.com/alexjohnson',
      linkedin: 'https://linkedin.com/in/alexjohnson'
    }
  }
};

// Enhanced mock posts
const mockUserPosts = [
  {
    id: 1,
    type: 'image',
    content: 'Beautiful sunset from the hostel terrace! 🌅 Perfect end to a productive day of coding. #Photography #SunsetViews #BITLife #HostelLife',
    time: '2h',
    likes: 156,
    comments: 23,
    shares: 12,
    views: 890,
    applauds: 34,
    media: [
      {
        id: 'm1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        alt: 'Beautiful sunset view',
        caption: 'Sunset from Hostel C terrace'
      }
    ]
  },
  {
    id: 2,
    type: 'text',
    content: 'Just deployed my first full-stack web application! 🚀 Built with React, Node.js, and MongoDB. Feeling grateful for all the learning opportunities at BIT Mesra. #WebDevelopment #FullStack #Achievement #coding',
    time: '1d',
    likes: 234,
    comments: 45,
    shares: 28,
    views: 1240,
    applauds: 67
  },
  {
    id: 3,
    type: 'achievement',
    content: '🏆 Won the Smart India Hackathon 2024! Our team&apos;s solution for sustainable agriculture using IoT sensors got the first prize. Proud moment for BIT Mesra! #SIH2024 #Hackathon #Winner #IoT #Agriculture',
    time: '3d',
    likes: 456,
    comments: 78,
    shares: 89,
    views: 2100,
    applauds: 123,
    achievement: {
      title: 'Smart India Hackathon Winner',
      badge: '🏆'
    }
  }
];

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [applauds, setApplauds] = useState(0);
  const [hasApplauded, setHasApplauded] = useState(false);
  const { toast } = useToast();

  // Enhanced mock user data with new features
  const mockUsers = {
    shaswatraj: {
      id: 1,
      username: 'shaswatraj',
      name: 'Shaswat Raj',
      avatar: 'SR',
      kBatch: 'K20',
      branch: 'CSE',
      year: '4th Year',
      bio: '🚀 Full Stack Developer | 💻 Tech Enthusiast | 🎯 Problem Solver | Building the future one line of code at a time',
      location: 'Ranchi, Jharkhand',
      joinedDate: 'September 2020',
      website: 'https://shaswatraj.dev',
      email: 'shaswat@bitmesra.ac.in',
      verified: true,
      followers: 1248,
      following: 342,
      postsCount: 156,
      // New features
      relationshipStatus: 'Single',
      totalLikes: 5420,
      totalComments: 892,
      totalShares: 234,
      applaudsReceived: 156,
      profileViews: 12400,
      interests: ['Web Development', 'Machine Learning', 'Photography', 'Cricket'],
      skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'],
      achievements: [
        { title: 'Hackathon Winner', year: '2024', icon: '🏆' },
        { title: 'Top Contributor', year: '2023', icon: '⭐' },
        { title: 'Mentor of the Year', year: '2023', icon: '🎓' }
      ],
      socialLinks: {
        github: 'https://github.com/shaswatraj',
        linkedin: 'https://linkedin.com/in/shaswatraj',
        instagram: 'https://instagram.com/shaswatraj'
      }
    },
    alexjohnson: {
      id: 2,
      username: 'alexjohnson',
      name: 'Alex Johnson',
      avatar: 'AJ',
      kBatch: 'K21',
      branch: 'CSE',
      year: '3rd Year',
      bio: '🔥 Competitive Programmer | 📱 Mobile App Developer | 🎮 Gaming Enthusiast',
      location: 'Delhi, India',
      joinedDate: 'August 2021',
      website: 'https://alexjohnson.dev',
      email: 'alex@bitmesra.ac.in',
      verified: true,
      followers: 892,
      following: 234,
      postsCount: 78,
      relationshipStatus: 'In a relationship',
      totalLikes: 3240,
      totalComments: 567,
      totalShares: 123,
      applaudsReceived: 89,
      profileViews: 8900,
      interests: ['Competitive Programming', 'Mobile Development', 'Gaming'],
      skills: ['C++', 'Java', 'Flutter', 'Dart', 'Firebase'],
      achievements: [
        { title: 'ICPC Regionalist', year: '2023', icon: '🥇' },
        { title: 'Google Summer of Code', year: '2023', icon: '🌟' }
      ],
      socialLinks: {
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson'
      }
    }
  };

  // Enhanced mock posts
  const mockUserPosts = [
    {
      id: 1,
      type: 'image',
      content: 'Beautiful sunset from the hostel terrace! 🌅 Perfect end to a productive day of coding. #Photography #SunsetViews #BITLife #HostelLife',
      time: '2h',
      likes: 156,
      comments: 23,
      shares: 12,
      views: 890,
      applauds: 34,
      media: [
        {
          id: 'm1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
          alt: 'Beautiful sunset view',
          caption: 'Sunset from Hostel C terrace'
        }
      ]
    },
    {
      id: 2,
      type: 'text',
      content: 'Just deployed my first full-stack web application! 🚀 Built with React, Node.js, and MongoDB. Feeling grateful for all the learning opportunities at BIT Mesra. #WebDevelopment #FullStack #Achievement #coding',
      time: '1d',
      likes: 234,
      comments: 45,
      shares: 28,
      views: 1240,
      applauds: 67
    },
    {
      id: 3,
      type: 'achievement',
      content: '🏆 Won the Smart India Hackathon 2024! Our team&apos;s solution for sustainable agriculture using IoT sensors got the first prize. Proud moment for BIT Mesra! #SIH2024 #Hackathon #Winner #IoT #Agriculture',
      time: '3d',
      likes: 456,
      comments: 78,
      shares: 89,
      views: 2100,
      applauds: 123,
      achievement: {
        title: 'Smart India Hackathon Winner',
        badge: '🏆'
      }
    }
  ];

  useEffect(() => {
    // For main profile page, show the current user (shaswatraj)
    // For username-based profiles, show the requested user
    const username = params.username || 'shaswatraj';
    const userData = mockUsers[username];

    if (userData) {
      setUser(userData);
      setPosts(mockUserPosts);
      setApplauds(userData.applaudsReceived);
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }, [params.username, mockUsers, mockUserPosts]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? 'Unfollowed' : 'Following!',
      description: isFollowing ? `You unfollowed ${user.name}` : `You are now following ${user.name}`,
      type: 'success',
      duration: 3000,
    });
  };

  const handleApplaud = () => {
    if (!hasApplauded) {
      setApplauds(prev => prev + 1);
      setHasApplauded(true);
      toast({
        title: '👏 Applaud Sent!',
        description: `You applauded ${user.name} for their amazing contributions!`,
        type: 'success',
        duration: 3000,
      });
    } else {
      setApplauds(prev => prev - 1);
      setHasApplauded(false);
      toast({
        title: 'Applaud Removed',
        description: 'You removed your applaud',
        type: 'info',
        duration: 2000,
      });
    }
  };

  const handleMessage = () => {
    toast({
      title: 'Message Feature',
      description: 'Direct messaging coming soon!',
      type: 'info',
      duration: 2000,
    });
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </div>
        <BottomNavigation currentPage="profile" />
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-6 max-w-6xl text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">User Not Found</h1>
            <p className="text-muted-foreground">The user you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push('/')}>Go Home</Button>
          </div>
        </div>
        <BottomNavigation currentPage="profile" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
          {/* Profile Header */}
          <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-6 flex items-end gap-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-2xl">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white mb-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    {user.verified && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-blue-100">@{user.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-4 right-6 flex gap-2">
                <Button
                  onClick={handleApplaud}
                  size="sm"
                  className={`${hasApplauded
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-white/20 hover:bg-white/30'
                    } backdrop-blur-sm border-white/20`}
                >
                  <PartyPopper className="w-4 h-4 mr-1" />
                  {applauds}
                </Button>
                <Button
                  onClick={handleMessage}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleFollow}
                  size="sm"
                  className={isFollowing
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                  }
                >
                  {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Profile Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2">
                    <KBatchBadge kBatch={user.kBatch} size="md" />
                    <Badge variant="outline" className="text-sm">
                      {user.branch} • {user.year}
                    </Badge>
                    <Badge variant="gradient" className="text-sm">
                      <Crown className="w-3 h-3 mr-1" />
                      Level 12
                    </Badge>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{user.bio}</p>

                  {/* Location and Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {user.joinedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {user.relationshipStatus}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {user.profileViews.toLocaleString()} profile views
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    {user.website && (
                      <Button variant="outline" size="sm" onClick={() => window.open(user.website, '_blank')}>
                        <LinkIcon className="w-4 h-4 mr-1" />
                        Website
                      </Button>
                    )}
                    {user.socialLinks?.github && (
                      <Button variant="outline" size="sm" onClick={() => window.open(user.socialLinks.github, '_blank')}>
                        <Code className="w-4 h-4 mr-1" />
                        GitHub
                      </Button>
                    )}
                    {user.socialLinks?.linkedin && (
                      <Button variant="outline" size="sm" onClick={() => window.open(user.socialLinks.linkedin, '_blank')}>
                        <Briefcase className="w-4 h-4 mr-1" />
                        LinkedIn
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-4">
                  {/* Follower Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                      <div className="text-lg font-bold text-blue-600">{user.postsCount}</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
                      <div className="text-lg font-bold text-green-600">{user.followers}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
                      <div className="text-lg font-bold text-purple-600">{user.following}</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                    <CardHeader className="p-0 pb-3">
                      <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-200">Engagement Stats</CardTitle>
                    </CardHeader>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Likes</span>
                        <span className="font-medium text-red-600">{user.totalLikes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Comments Made</span>
                        <span className="font-medium text-blue-600">{user.totalComments.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Posts Shared</span>
                        <span className="font-medium text-green-600">{user.totalShares.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-muted-foreground">Applauds Received</span>
                        <span className="font-bold text-yellow-600 flex items-center gap-1">
                          <PartyPopper className="w-3 h-3" />
                          {applauds}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Skills & Achievements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Skills */}
                <Card className="p-4">
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Achievements */}
                <Card className="p-4">
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-2">
                    {user.achievements?.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
                        <span className="text-lg">{achievement.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
            <CardContent className="p-0">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex gap-1">
                  <Button
                    variant={activeTab === 'posts' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('posts')}
                    className="rounded-full"
                  >
                    <Grid3X3 className="w-4 h-4 mr-1" />
                    Posts ({posts.length})
                  </Button>
                  <Button
                    variant={activeTab === 'about' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('about')}
                    className="rounded-full"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    About
                  </Button>
                  <Button
                    variant={activeTab === 'media' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('media')}
                    className="rounded-full"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Media
                  </Button>
                </div>

                <div className="flex gap-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === 'posts' && (
                  <div className={viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                  }>
                    {posts.map(post => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-4">
                          {post.achievement && (
                            <div className="flex items-center gap-2 mb-3 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg">
                              <span className="text-2xl">{post.achievement.badge}</span>
                              <span className="font-medium text-sm text-orange-800 dark:text-orange-200">
                                {post.achievement.title}
                              </span>
                            </div>
                          )}

                          <RichText content={post.content} className="text-sm mb-3" />

                          {post.media && (
                            <MediaGrid mediaItems={post.media} className="mb-3" />
                          )}

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{post.time}</span>
                            <div className="flex gap-3">
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {post.comments}
                              </span>
                              <span className="flex items-center gap-1">
                                <PartyPopper className="w-3 h-3" />
                                {post.applauds}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="space-y-6">
                    {/* Interests */}
                    <div>
                      <h3 className="font-medium mb-3">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests?.map(interest => (
                          <Badge key={interest} variant="outline" className="text-sm">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h3 className="font-medium mb-3">Contact Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{user.location}</span>
                        </div>
                        {user.website && (
                          <div className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4 text-muted-foreground" />
                            <a href={user.website} target="_blank" rel="noopener noreferrer"
                              className="text-blue-600 hover:underline">
                              {user.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts
                      .filter(post => post.media && post.media.length > 0)
                      .map(post => (
                        <div key={post.id} className="aspect-square relative rounded-lg overflow-hidden">
                          <MediaGrid mediaItems={post.media} className="h-full" />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <BottomNavigation currentPage="profile" />
    </PageLayout>
  );
}
