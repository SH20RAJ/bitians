'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { Button } from '@/components/ui/button';
import { UserPosts } from './UserPosts';
import { UserStats } from './UserStats';
import { UserActions } from './UserActions';

interface UserProfileProps {
  username: string;
}

interface User {
  id: string;
  name: string;
  username: string;
  batch: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  joinedDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  achievements?: string[];
}

const MOCK_USER: User = {
  id: 'user-1',
  name: 'Rahul Sharma',
  username: 'rahul_k23',
  batch: 'K23',
  avatar: '👨‍💻',
  verified: true,
  bio: 'CSE Student | Full-stack Developer | Open Source Enthusiast | Building cool stuff with React & Node.js 🚀',
  location: 'Ranchi, Jharkhand',
  website: 'https://rahulsharma.dev',
  github: 'rahul-sharma-dev',
  linkedin: 'rahul-sharma-k23',
  joinedDate: 'September 2023',
  stats: {
    posts: 156,
    followers: 892,
    following: 234,
    likes: 2341
  },
  isFollowing: false,
  isOwnProfile: false,
  achievements: ['Top Contributor', 'Early Adopter', 'Code Ninja', 'Community Helper']
};

export function UserProfile({ username }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock user data - in real app, fetch based on username
        setUser(MOCK_USER);
      } catch (err) {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleFollow = () => {
    if (!user) return;
    
    setUser(prev => prev ? {
      ...prev,
      isFollowing: !prev.isFollowing,
      stats: {
        ...prev.stats,
        followers: prev.isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1
      }
    } : null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-6xl mb-4">👤</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          User not found
        </h3>
        <p className="text-muted-foreground text-center max-w-sm mb-4">
          The user you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => router.back()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 px-6 py-8">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl font-bold text-white">
            {user.avatar}
          </div>
          
          <div className="flex-1">
            {/* Name and Verification */}
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              {user.verified && (
                <span className="text-blue-500 text-lg">✓</span>
              )}
            </div>
            
            {/* Username and Batch */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-muted-foreground">@{user.username}</span>
              <KBatchBadge kBatch={user.batch} />
            </div>
            
            {/* Bio */}
            {user.bio && (
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {user.bio}
              </p>
            )}
            
            {/* Location and Join Date */}
            <div className="space-y-1 text-xs text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{user.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <UserActions user={user} onFollow={handleFollow} />
      </div>

      {/* User Stats */}
      <UserStats stats={user.stats} />

      {/* Achievements */}
      {user.achievements && user.achievements.length > 0 && (
        <div className="px-4 py-4 border-b border-border">
          <h3 className="font-semibold text-sm text-foreground mb-3">Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {user.achievements.map((achievement, index) => (
              <span
                key={index}
                className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium"
              >
                🏆 {achievement}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {(user.website || user.github || user.linkedin) && (
        <div className="px-4 py-4 border-b border-border">
          <h3 className="font-semibold text-sm text-foreground mb-3">Links</h3>
          <div className="space-y-2">
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <span>🌐</span>
                <span>{user.website}</span>
              </a>
            )}
            {user.github && (
              <a
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <span>💻</span>
                <span>github.com/{user.github}</span>
              </a>
            )}
            {user.linkedin && (
              <a
                href={`https://linkedin.com/in/${user.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <span>💼</span>
                <span>linkedin.com/in/{user.linkedin}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex">
          {[
            { id: 'posts', label: 'Posts', count: user.stats.posts },
            { id: 'media', label: 'Media', count: 45 },
            { id: 'likes', label: 'Likes', count: user.stats.likes }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <UserPosts userId={user.id} activeTab={activeTab} />
    </div>
  );
}
