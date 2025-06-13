'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  UserPlus, 
  MessageCircle, 
  Star,
  Filter,
  TrendingUp,
  MapPin,
  BookOpen,
  Code,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  batch: string;
  branch: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  isFollowing: boolean;
  skills: string[];
  interests: string[];
  mutualConnections: number;
  profileViews: number;
  engagementRate: number;
  lastActive: string;
}

const SUGGESTED_USERS: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    username: '@priya_cse',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=150&h=150&fit=crop&crop=face',
    batch: 'K22',
    branch: 'Computer Science',
    bio: 'Full-stack developer | MERN Stack | Open source contributor',
    location: 'Ranchi, Jharkhand',
    followers: 1245,
    following: 543,
    posts: 89,
    verified: true,
    isFollowing: false,
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    interests: ['Web Development', 'Machine Learning', 'Open Source'],
    mutualConnections: 23,
    profileViews: 2341,
    engagementRate: 8.5,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Arjun Patel',
    username: '@arjun_ml',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    batch: 'K21',
    branch: 'Electronics & Communication',
    bio: 'AI/ML enthusiast | Research intern at IIT | Published 3 papers',
    location: 'Ranchi, Jharkhand',
    followers: 987,
    following: 234,
    posts: 156,
    verified: false,
    isFollowing: false,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'R'],
    interests: ['Machine Learning', 'Data Science', 'Research'],
    mutualConnections: 45,
    profileViews: 1876,
    engagementRate: 12.3,
    lastActive: '1 hour ago'
  },
  {
    id: '3',
    name: 'Sneha Gupta',
    username: '@sneha_design',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    batch: 'K23',
    branch: 'Information Technology',
    bio: 'UI/UX Designer | Design thinking enthusiast | Figma expert',
    location: 'Mumbai, Maharashtra',
    followers: 654,
    following: 432,
    posts: 78,
    verified: false,
    isFollowing: true,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    interests: ['UI/UX', 'Design Systems', 'User Research'],
    mutualConnections: 12,
    profileViews: 1234,
    engagementRate: 9.8,
    lastActive: '30 minutes ago'
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    username: '@rajesh_startup',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    batch: 'K20',
    branch: 'Mechanical Engineering',
    bio: 'Entrepreneur | Co-founder @TechStartup | Angel investor',
    location: 'Bangalore, Karnataka',
    followers: 2341,
    following: 678,
    posts: 234,
    verified: true,
    isFollowing: false,
    skills: ['Business Strategy', 'Product Management', 'Fundraising'],
    interests: ['Entrepreneurship', 'Innovation', 'Investing'],
    mutualConnections: 67,
    profileViews: 4567,
    engagementRate: 15.6,
    lastActive: '4 hours ago'
  },
  {
    id: '5',
    name: 'Kavya Reddy',
    username: '@kavya_data',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    batch: 'K22',
    branch: 'Computer Science',
    bio: 'Data Scientist | NLP researcher | Kaggle Master',
    location: 'Hyderabad, Telangana',
    followers: 876,
    following: 345,
    posts: 123,
    verified: false,
    isFollowing: false,
    skills: ['Python', 'SQL', 'Tableau', 'Spark'],
    interests: ['Data Science', 'NLP', 'Analytics'],
    mutualConnections: 34,
    profileViews: 1987,
    engagementRate: 11.2,
    lastActive: '6 hours ago'
  },
  {
    id: '6',
    name: 'Amit Singh',
    username: '@amit_devops',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    batch: 'K21',
    branch: 'Information Technology',
    bio: 'DevOps Engineer | Cloud architect | AWS certified',
    location: 'Pune, Maharashtra',
    followers: 1123,
    following: 456,
    posts: 167,
    verified: false,
    isFollowing: false,
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    interests: ['DevOps', 'Cloud Computing', 'Automation'],
    mutualConnections: 28,
    profileViews: 2456,
    engagementRate: 7.9,
    lastActive: '12 hours ago'
  }
];

const DISCOVERY_CATEGORIES = [
  { id: 'suggested', label: 'Suggested for You', icon: Star },
  { id: 'trending', label: 'Trending Users', icon: TrendingUp },
  { id: 'sameBatch', label: 'Same Batch', icon: Users },
  { id: 'sameBranch', label: 'Same Branch', icon: BookOpen },
  { id: 'nearbyLocation', label: 'Nearby', icon: MapPin },
  { id: 'techExperts', label: 'Tech Experts', icon: Code },
  { id: 'entrepreneurs', label: 'Entrepreneurs', icon: Briefcase }
];

export function UserDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState('suggested');
  const [searchQuery, setSearchQuery] = useState('');
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const filteredUsers = SUGGESTED_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category-based filtering
    let matchesCategory = true;
    switch (selectedCategory) {
      case 'sameBatch':
        matchesCategory = user.batch === 'K22'; // Current user's batch
        break;
      case 'sameBranch':
        matchesCategory = user.branch === 'Computer Science'; // Current user's branch
        break;
      case 'techExperts':
        matchesCategory = user.skills.some(skill => 
          ['JavaScript', 'Python', 'React', 'Node.js', 'TensorFlow'].includes(skill)
        );
        break;
      case 'entrepreneurs':
        matchesCategory = user.bio.toLowerCase().includes('entrepreneur') || 
                         user.bio.toLowerCase().includes('founder') ||
                         user.bio.toLowerCase().includes('startup');
        break;
      case 'trending':
        matchesCategory = user.engagementRate > 10;
        break;
      case 'nearbyLocation':
        matchesCategory = user.location.includes('Ranchi') || user.location.includes('Jharkhand');
        break;
      default:
        matchesCategory = true;
    }

    return matchesSearch && matchesCategory;
  });

  const handleFollow = (userId: string) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleMessage = (username: string) => {
    // Navigate to message or open chat
    console.log('Message user:', username);
  };

  const handleUserClick = (username: string) => {
    window.location.href = `/profile/${username.replace('@', '')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Discover People</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search people by name, skills, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {DISCOVERY_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                <IconComponent className="h-4 w-4 mr-1" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredUsers.length > 0 ? (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-6 hover:shadow-md transition-all duration-200">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleUserClick(user.username)}
                  >
                    <Avatar className="h-16 w-16">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 
                            className="font-semibold text-lg cursor-pointer hover:text-primary"
                            onClick={() => handleUserClick(user.username)}
                          >
                            {user.name}
                          </h3>
                          {user.verified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{user.username}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <KBatchBadge kBatch={user.batch} />
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{user.branch}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMessage(user.username)}
                          className="h-8"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={following[user.id] || user.isFollowing ? "secondary" : "default"}
                          size="sm"
                          onClick={() => handleFollow(user.id)}
                          className="h-8"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          {following[user.id] || user.isFollowing ? 'Following' : 'Follow'}
                        </Button>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {user.bio}
                    </p>

                    {/* Location */}
                    <div className="flex items-center space-x-1 mb-3">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{user.location}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                      <span>{user.followers.toLocaleString()} followers</span>
                      <span>{user.following.toLocaleString()} following</span>
                      <span>{user.posts} posts</span>
                      {user.mutualConnections > 0 && (
                        <span className="text-primary font-medium">
                          {user.mutualConnections} mutual connections
                        </span>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {user.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {user.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.skills.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Engagement metrics */}
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {user.engagementRate}% engagement
                      </span>
                      <span>{user.profileViews.toLocaleString()} profile views</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
