'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import BottomNavigation from '@/components/BottomNavigation';
import MobileHeader from '@/components/MobileHeader';
import { useToast } from '@/components/Toast';
import {
  ArrowLeft,
  Bell,
  Zap,
  Heart,
  MessageCircle,
  UserPlus,
  Trophy,
  Calendar,
  TrendingUp,
  BookOpen,
  MapPin,
  Settings,
  Check,
  X
} from 'lucide-react';

export default function ActivitySettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [notificationSettings, setNotificationSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    achievements: true,
    events: true,
    trending: false,
    study: true,
    location: false
  });

  const [feedSettings, setFeedSettings] = useState({
    autoRefresh: true,
    compactMode: false,
    showTimestamps: true,
    groupSimilar: true,
    hideOldActivities: false
  });

  const activityTypes = [
    { id: 'likes', label: 'Likes & Reactions', icon: Heart, color: 'text-red-500', description: 'When someone likes your posts or comments' },
    { id: 'comments', label: 'Comments & Replies', icon: MessageCircle, color: 'text-blue-500', description: 'When someone comments on your posts' },
    { id: 'follows', label: 'New Followers', icon: UserPlus, color: 'text-green-500', description: 'When someone follows you' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, color: 'text-yellow-500', description: 'When you unlock new achievements' },
    { id: 'events', label: 'Events & Calendar', icon: Calendar, color: 'text-purple-500', description: 'Event reminders and updates' },
    { id: 'trending', label: 'Trending Content', icon: TrendingUp, color: 'text-orange-500', description: 'When your content is trending' },
    { id: 'study', label: 'Study Groups', icon: BookOpen, color: 'text-indigo-500', description: 'Study group activities and updates' },
    { id: 'location', label: 'Location Updates', icon: MapPin, color: 'text-pink-500', description: 'Location-based activities' }
  ];

  const feedOptions = [
    { id: 'autoRefresh', label: 'Auto Refresh', description: 'Automatically update activity feed' },
    { id: 'compactMode', label: 'Compact Mode', description: 'Show more activities in less space' },
    { id: 'showTimestamps', label: 'Show Timestamps', description: 'Display exact time for each activity' },
    { id: 'groupSimilar', label: 'Group Similar', description: 'Group similar activities together' },
    { id: 'hideOldActivities', label: 'Hide Old Activities', description: 'Hide activities older than 7 days' }
  ];

  const toggleNotificationSetting = (settingId) => {
    setNotificationSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
    
    toast({
      title: 'Setting Updated',
      description: `${activityTypes.find(t => t.id === settingId)?.label} notifications ${notificationSettings[settingId] ? 'disabled' : 'enabled'}`,
      type: 'success',
      duration: 2000
    });
  };

  const toggleFeedSetting = (settingId) => {
    setFeedSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
    
    toast({
      title: 'Setting Updated',
      description: `${feedOptions.find(o => o.id === settingId)?.label} ${feedSettings[settingId] ? 'disabled' : 'enabled'}`,
      type: 'success',
      duration: 2000
    });
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: 'Settings Saved! ✅',
      description: 'Your activity preferences have been updated',
      type: 'success',
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader title="Activity Settings" showSearch={false} />

      {/* Content */}
      <div className="pt-14 pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Activity
            </Button>
            
            <Button onClick={saveSettings} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Check className="w-4 h-4 mr-1" />
              Save Settings
            </Button>
          </div>

          {/* Notification Settings */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-full bg-${type.color.split('-')[1]}-50 dark:bg-${type.color.split('-')[1]}-950/20 flex items-center justify-center`}>
                      <type.icon className={`w-4 h-4 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{type.label}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  <Button
                    variant={notificationSettings[type.id] ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleNotificationSetting(type.id)}
                    className={`w-16 ${notificationSettings[type.id] ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  >
                    {notificationSettings[type.id] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feed Settings */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Feed Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                  <Button
                    variant={feedSettings[option.id] ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFeedSetting(option.id)}
                    className={`w-16 ${feedSettings[option.id] ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  >
                    {feedSettings[option.id] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="glass bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Personalized Experience</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You have {Object.values(notificationSettings).filter(Boolean).length} notification types enabled 
                    and {Object.values(feedSettings).filter(Boolean).length} feed preferences active.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="settings" />
    </div>
  );
}
