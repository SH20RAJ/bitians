"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Zap, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Trophy,
  TrendingUp
} from 'lucide-react';

export default function ActivityIndicator({ onClick }) {
  const [activityCount, setActivityCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState(null);

  // Mock recent activity data - in real app, this would come from API
  const mockRecentActivities = [
    { type: 'like', count: 12, icon: Heart, color: 'text-red-500' },
    { type: 'comment', count: 8, icon: MessageCircle, color: 'text-blue-500' },
    { type: 'follow', count: 5, icon: UserPlus, color: 'text-green-500' },
    { type: 'achievement', count: 3, icon: Trophy, color: 'text-yellow-500' },
    { type: 'trending', count: 7, icon: TrendingUp, color: 'text-orange-500' }
  ];

  useEffect(() => {
    // Simulate real-time activity updates
    const updateActivity = () => {
      const totalCount = mockRecentActivities.reduce((sum, activity) => sum + activity.count, 0);
      setActivityCount(totalCount);
      
      // Get the most recent activity type
      const mostRecentType = mockRecentActivities[Math.floor(Math.random() * mockRecentActivities.length)];
      setRecentActivity(mostRecentType);
    };

    updateActivity();
    
    // Update every 30 seconds to simulate real-time changes
    const interval = setInterval(updateActivity, 30000);
    
    return () => clearInterval(interval);
  }, [mockRecentActivities]);

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative hover:bg-muted/50 transition-colors"
      onClick={onClick}
    >
      <Zap className="w-5 h-5 text-primary" />
      
      {/* Activity Count Badge */}
      {activityCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 text-xs px-1 py-0 min-w-[18px] h-[18px] flex items-center justify-center pulse-slow"
        >
          {activityCount > 99 ? '99+' : activityCount}
        </Badge>
      )}
      
      {/* Recent Activity Indicator */}
      {recentActivity && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-background rounded-full border border-border flex items-center justify-center">
          <recentActivity.icon className={`w-2 h-2 ${recentActivity.color}`} />
        </div>
      )}
    </Button>
  );
}
