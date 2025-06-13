'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
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
import {
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
  Clap,
  ThumbsUp,
  Send,
  Gift,
  Crown,
  Edit
} from 'lucide-react';

export default function UserProfilePage() {
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
      content: '🏆 Won the Smart India Hackathon 2024! Our team\'s solution for sustainable agriculture using IoT sensors got the first prize. Proud moment for BIT Mesra! #SIH2024 #Hackathon #Winner #IoT #Agriculture',
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
    const username = params.username;
    const userData = mockUsers[username];
    
    if (userData) {
      setUser(userData);
      setPosts(mockUserPosts);
      setApplauds(userData.applaudsReceived);
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  }, [params.username]);

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
            <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
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
                  <Clap className="w-4 h-4 mr-1" />
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
                          <Clap className="w-3 h-3" />
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
                                <Clap className="w-3 h-3" />
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
