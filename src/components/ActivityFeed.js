"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  UserPlus, 
  Trophy, 
  Calendar, 
  Clock,
  TrendingUp,
  Eye,
  Star,
  Zap,
  Users,
  BookOpen,
  MapPin
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ActivityFeed({ compact = false }) {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Activity types and their configurations
  const activityTypes = {
    like: { icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-950/20' },
    comment: { icon: MessageCircle, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950/20' },
    follow: { icon: UserPlus, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-950/20' },
    achievement: { icon: Trophy, color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-950/20' },
    event: { icon: Calendar, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-950/20' },
    trending: { icon: TrendingUp, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-950/20' },
    study: { icon: BookOpen, color: 'text-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-950/20' },
    location: { icon: MapPin, color: 'text-pink-500', bgColor: 'bg-pink-50 dark:bg-pink-950/20' }
  };

  // Mock real-time activities
  const mockActivities = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Arjun Sharma',
        username: 'arjun_sharma',
        avatar: 'AS',
        kBatch: 'K23',
        verified: true
      },
      action: 'liked your post',
      target: 'Machine Learning Project Showcase',
      time: '2 minutes ago',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isNew: true
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Priya Mehta',
        username: 'priya_mehta',
        avatar: 'PM',
        kBatch: 'K22',
        verified: false
      },
      action: 'commented on',
      target: 'your placement preparation post',
      comment: 'Great tips! This really helped me.',
      time: '5 minutes ago',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isNew: true
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Rahul Singh',
        username: 'rahul_singh',
        avatar: 'RS',
        kBatch: 'K21',
        verified: true
      },
      action: 'started following you',
      time: '10 minutes ago',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isNew: true
    },
    {
      id: 4,
      type: 'achievement',
      user: {
        name: 'You',
        username: 'shaswatraj',
        avatar: 'SR',
        kBatch: 'K20',
        verified: true
      },
      action: 'unlocked achievement',
      target: 'Top Contributor - 100 helpful posts',
      time: '1 hour ago',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isNew: false
    },
    {
      id: 5,
      type: 'trending',
      user: {
        name: 'Tech Club BIT',
        username: 'tech_club_bit',
        avatar: 'TC',
        kBatch: 'Official',
        verified: true
      },
      action: 'posted trending content',
      target: 'Hackathon 2024 Registration Open',
      time: '2 hours ago',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      engagement: '234 likes, 67 comments',
      isNew: false
    },
    {
      id: 6,
      type: 'event',
      user: {
        name: 'Events Team',
        username: 'bit_events',
        avatar: 'ET',
        kBatch: 'Official',
        verified: true
      },
      action: 'created new event',
      target: 'Campus Coding Competition',
      time: '3 hours ago',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      eventDate: 'Tomorrow, 10:00 AM',
      isNew: false
    },
    {
      id: 7,
      type: 'study',
      user: {
        name: 'Neha Gupta',
        username: 'neha_studies',
        avatar: 'NG',
        kBatch: 'K24',
        verified: false
      },
      action: 'joined study group',
      target: 'Data Structures & Algorithms',
      time: '4 hours ago',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      groupMembers: 12,
      isNew: false
    },
    {
      id: 8,
      type: 'location',
      user: {
        name: 'Amit Kumar',
        username: 'amit_explorer',
        avatar: 'AK',
        kBatch: 'K23',
        verified: false
      },
      action: 'checked in at',
      target: 'BIT Mesra Library',
      time: '5 hours ago',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      location: 'Main Library, Ground Floor',
      isNew: false
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Activity', count: mockActivities.length },
    { id: 'new', label: 'New', count: mockActivities.filter(a => a.isNew).length },
    { id: 'social', label: 'Social', count: mockActivities.filter(a => ['like', 'comment', 'follow'].includes(a.type)).length },
    { id: 'academic', label: 'Academic', count: mockActivities.filter(a => ['study', 'achievement'].includes(a.type)).length },
    { id: 'events', label: 'Events', count: mockActivities.filter(a => a.type === 'event').length }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setActivities(mockActivities);
      setIsLoading(false);
    }, 500);
  }, [mockActivities]);

  const filteredActivities = activities.filter(activity => {
    switch (filter) {
      case 'new':
        return activity.isNew;
      case 'social':
        return ['like', 'comment', 'follow'].includes(activity.type);
      case 'academic':
        return ['study', 'achievement'].includes(activity.type);
      case 'events':
        return activity.type === 'event';
      default:
        return true;
    }
  });

  const handleActivityClick = (activity) => {
    // Handle navigation based on activity type
    toast({
      title: `Viewing ${activity.type} activity`,
      description: `Navigating to ${activity.target || activity.action}`,
      duration: 2000,
    });
  };

  const getTimeDisplay = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const renderActivityIcon = (type, isCompact = false) => {
    const config = activityTypes[type];
    const Icon = config.icon;
    
    return (
      <div className={`${isCompact ? "w-6 h-6" : "w-10 h-10"} rounded-full ${config.bgColor} flex items-center justify-center`}>
        <Icon className={`${isCompact ? "w-3 h-3" : "w-5 h-5"} ${config.color}`} />
      </div>
    );
  };

  const renderActivityContent = (activity, isCompact = false) => {
    const config = activityTypes[activity.type];
    
    return (
      <div className="flex-1 min-w-0">
        <div className={`flex items-center gap-2 ${isCompact ? "mb-0" : "mb-1"}`}>
          <span className={`font-medium ${isCompact ? "text-sm" : ""}`}>{activity.user.name}</span>
          {activity.user.verified && !isCompact && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">✓</span>
            </div>
          )}
          {!isCompact && <KBatchBadge kBatch={activity.user.kBatch} size="xs" />}
          {activity.isNew && !isCompact && (
            <Badge variant="destructive" className="text-xs px-1 py-0">
              NEW
            </Badge>
          )}
        </div>
        
        <p className={`${isCompact ? "text-xs" : "text-sm"} text-muted-foreground ${isCompact ? "mb-0" : "mb-1"}`}>
          {activity.action}
          {activity.target && (
            <span className="font-medium text-foreground"> {activity.target}</span>
          )}
        </p>

        {/* Type-specific content - hidden in compact mode */}
        {!isCompact && (
          <>
            {activity.comment && (
              <p className="text-sm bg-muted p-2 rounded-md mt-2 italic">
                "{activity.comment}"
              </p>
            )}
            
            {activity.engagement && (
              <p className="text-xs text-muted-foreground mt-1">
                {activity.engagement}
              </p>
            )}
            
            {activity.eventDate && (
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-purple-600 font-medium">
                  {activity.eventDate}
                </span>
              </div>
            )}
            
            {activity.groupMembers && (
              <div className="flex items-center gap-1 mt-1">
                <Users className="w-3 h-3 text-indigo-500" />
                <span className="text-xs text-indigo-600 font-medium">
                  {activity.groupMembers} members
                </span>
              </div>
            )}
            
            {activity.location && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-pink-500" />
                <span className="text-xs text-pink-600 font-medium">
                  {activity.location}
                </span>
              </div>
            )}
          </>
        )}
        
        <div className={`flex items-center justify-between ${isCompact ? "mt-1" : "mt-2"}`}>
          <span className="text-xs text-muted-foreground">
            {getTimeDisplay(activity.timestamp)}
          </span>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={compact ? "lg:max-h-96 lg:overflow-hidden" : ""}>
      <CardHeader className={compact ? "pb-3" : ""}>
        <CardTitle className={`flex items-center gap-2 ${compact ? "text-lg" : ""}`}>
          <Zap className="w-5 h-5 text-primary" />
          {compact ? "Recent Activity" : "Activity Feed"}
        </CardTitle>
        
        {/* Filter Tabs */}
        <div className={`flex gap-1 overflow-x-auto ${compact ? "hidden sm:flex" : ""}`}>
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={filter === option.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(option.id)}
              className="whitespace-nowrap"
            >
              {compact ? option.label.split(' ')[0] : option.label}
              <Badge variant="secondary" className="ml-1 text-xs">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className={`${compact ? "p-4 pt-0" : "p-6 pt-0"}`}>
        {filteredActivities.length === 0 ? (
          <div className={`text-center ${compact ? "py-4" : "py-8"} text-muted-foreground`}>
            <Zap className={`${compact ? "w-8 h-8" : "w-12 h-12"} mx-auto mb-4 opacity-50`} />
            <p>No activities found</p>
            {!compact && <p className="text-sm">Activities will appear here as they happen</p>}
          </div>
        ) : (
          <div className={`space-y-${compact ? "2" : "4"} ${compact ? "max-h-80 overflow-y-auto" : ""}`}>
            {(compact ? filteredActivities.slice(0, 5) : filteredActivities).map((activity) => (
              <div
                key={activity.id}
                className={`flex gap-${compact ? "2" : "3"} p-${compact ? "2" : "3"} rounded-lg hover:bg-muted/50 cursor-pointer transition-colors`}
                onClick={() => handleActivityClick(activity)}
              >
                {/* User Avatar */}
                <Avatar className={`${compact ? "w-6 h-6" : "w-8 h-8"} flex-shrink-0`}>
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold">
                    {activity.user.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Activity Icon */}
                <div className="flex-shrink-0">
                  {renderActivityIcon(activity.type, compact)}
                </div>

                {/* Activity Content */}
                {renderActivityContent(activity, compact)}
              </div>
            ))}
          </div>
        )}
        
        {filteredActivities.length > 0 && (
          <div className={`${compact ? "mt-4" : "mt-6"} text-center`}>
            <Button variant="ghost" className={`${compact ? "text-xs" : "text-sm"}`}>
              {compact ? "View All" : "Load More Activities"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
