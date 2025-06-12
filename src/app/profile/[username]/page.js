'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
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
  Hash
} from 'lucide-react';

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState('grid');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Mock user data
  const mockUsers = {
    'priya_mehta': {
      id: 'priya_mehta',
      name: 'Priya Mehta',
      username: 'priya_mehta',
      avatar: 'PM',
      kBatch: 'K22',
      branch: 'ECE',
      year: '3rd Year',
      bio: 'Aspiring Electronics Engineer | Tech Enthusiast | Photography Lover | Adventure Seeker 📸✨',
      location: 'Ranchi, Jharkhand',
      joinedDate: 'August 2021',
      isVerified: true,
      stats: {
        posts: 156,
        followers: 1234,
        following: 567,
        likes: 4567
      },
      links: {
        website: 'https://priyamehta.dev',
        linkedin: 'https://linkedin.com/in/priyamehta',
        github: 'https://github.com/priyamehta',
        instagram: 'https://instagram.com/priya.codes'
      },
      achievements: [
        { title: 'Dean\'s List', year: '2023', icon: '🏆' },
        { title: 'Hackathon Winner', year: '2023', icon: '💻' },
        { title: 'Photography Contest Winner', year: '2022', icon: '📸' }
      ],
      skills: ['React', 'Node.js', 'Python', 'Photography', 'Leadership'],
      interests: ['Technology', 'Photography', 'Travel', 'Music', 'Books']
    },
    'arjun_sharma': {
      id: 'arjun_sharma',
      name: 'Arjun Sharma',
      username: 'arjun_sharma',
      avatar: 'AS',
      kBatch: 'K23',
      branch: 'CSE',
      year: '2nd Year',
      bio: 'Full Stack Developer | Open Source Contributor | Cricket Fan 🏏',
      location: 'Delhi, India',
      joinedDate: 'July 2022',
      isVerified: true,
      stats: {
        posts: 89,
        followers: 890,
        following: 345,
        likes: 2345
      },
      links: {
        github: 'https://github.com/arjunsharma',
        linkedin: 'https://linkedin.com/in/arjunsharma'
      },
      achievements: [
        { title: 'Microsoft Intern', year: '2024', icon: '💼' },
        { title: 'GSoC Participant', year: '2023', icon: '🌟' }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
      interests: ['Coding', 'Cricket', 'Gaming', 'AI/ML']
    }
  };

  // Mock posts for the user
  const mockUserPosts = [
    {
      id: 1,
      type: 'image',
      content: 'Beautiful sunset from the hostel terrace! 🌅 Perfect end to a productive day of coding. #Photography #SunsetVibes #BITLife #HostelLife',
      time: '2h',
      likes: 156,
      comments: 23,
      shares: 12,
      views: 890,
      media: [
        {
          id: 'm1',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
          alt: 'Sunset from hostel terrace'
        }
      ]
    },
    {
      id: 2,
      type: 'text',
      content: 'Just finished my internship presentation! 🎉 The experience at Microsoft was incredible. Learned so much about cloud computing and scaled systems. Can\'t wait to share my learnings with the community! #Internship #Microsoft #CloudComputing #Learning',
      time: '1d',
      likes: 234,
      comments: 45,
      shares: 28,
      views: 1200
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
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  }, [params.username]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? 'Unfollowed' : 'Following!',
      description: isFollowing 
        ? `You unfollowed ${user.name}` 
        : `You are now following ${user.name}`,
      type: 'success'
    });
  };

  const handleMessage = () => {
    toast({
      title: 'Message feature',
      description: 'Direct messaging coming soon!',
      type: 'info'
    });
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {user.avatar}
                    </div>
                  </Avatar>
                  {user.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="space-y-2 md:mb-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <KBatchBadge kBatch={user.kBatch} size="lg" />
                  </div>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{user.branch} • {user.year}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {user.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 md:mt-0 md:mb-4">
                <Button
                  onClick={handleFollow}
                  variant={isFollowing ? 'outline' : 'default'}
                  className={isFollowing ? 'hover:bg-red-50 hover:text-red-600 hover:border-red-300' : ''}
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
                <Button variant="outline" onClick={handleMessage}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 space-y-4">
              <p className="text-lg leading-relaxed">{user.bio}</p>

              {/* Links */}
              {user.links && Object.keys(user.links).length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {Object.entries(user.links).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex gap-8 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.stats.posts}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.stats.followers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.stats.following}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.stats.likes.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Likes</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            {user.achievements && user.achievements.length > 0 && (
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {user.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <Card className="mb-6">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setActiveTab('posts')}
                      className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                        activeTab === 'posts'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Posts
                    </button>
                    <button
                      onClick={() => setActiveTab('media')}
                      className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                        activeTab === 'media'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Media
                    </button>
                    <button
                      onClick={() => setActiveTab('likes')}
                      className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                        activeTab === 'likes'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Likes
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800' : ''}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800' : ''}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts Content */}
            {activeTab === 'posts' && (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-6'}>
                {posts.map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div className="p-4">
                        {post.media && post.media.length > 0 && (
                          <div className="mb-3">
                            <MediaGrid mediaItems={post.media} className="rounded-lg overflow-hidden" />
                          </div>
                        )}
                        <p className="text-sm leading-relaxed line-clamp-3 mb-3">{post.content}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {post.comments}
                            </span>
                          </div>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="w-10 h-10">
                            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.avatar}
                            </div>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {post.time}
                              <Eye className="w-3 h-3 ml-2" />
                              {post.views}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <RichText content={post.content} className="leading-relaxed" />
                        </div>

                        {post.media && post.media.length > 0 && (
                          <div className="mb-4">
                            <MediaGrid mediaItems={post.media} className="rounded-lg overflow-hidden" />
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span>{post.shares}</span>
                            </button>
                          </div>
                          <button className="text-muted-foreground hover:text-yellow-500 transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* Empty States */}
            {posts.length === 0 && (
              <Card className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                <p className="text-muted-foreground">
                  {user.name} hasn't posted anything yet.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
    
    {/* Bottom Navigation */}
    <BottomNavigation currentPage="profile" />
  );
}
