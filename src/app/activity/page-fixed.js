'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import ActivityFeed from '@/components/ActivityFeed';
import BottomNavigation from '@/components/BottomNavigation';
import MobileHeader from '@/components/MobileHeader';
import {
  ArrowLeft,
  Zap,
  TrendingUp,
  Clock,
  Users,
  Star,
  Settings
} from 'lucide-react';

export default function ActivityPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState('feed');

  const activityStats = [
    { label: 'Total Activities', count: 156, icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950/20' },
    { label: 'This Week', count: 43, icon: Clock, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-950/20' },
    { label: 'Trending', count: 12, icon: TrendingUp, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-950/20' },
    { label: 'Social', count: 89, icon: Users, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-950/20' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Activity Center" showSearch={false} />

      <div className="pt-14 pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'feed' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('feed')}
              >
                <Zap className="w-4 h-4 mr-1" />
                Feed
              </Button>
              <Button
                variant={viewMode === 'stats' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('stats')}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Stats
              </Button>
            </div>
          </div>

          {viewMode === 'feed' && (
            <div className="space-y-6">
              <ActivityFeed />
              
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-auto p-3 flex-col"
                    onClick={() => router.push('/feeds')}
                  >
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">View All Posts</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-auto p-3 flex-col"
                    onClick={() => router.push('/profile')}
                  >
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="text-sm">My Profile</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-auto p-3 flex-col"
                    onClick={() => router.push('/circles')}
                  >
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">Browse Circles</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-auto p-3 flex-col"
                    onClick={() => router.push('/activity/settings')}
                  >
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">Activity Settings</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {viewMode === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {activityStats.map((stat, index) => (
                  <Card key={index} className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stat.count}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Activity chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Most Active Today</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Likes received', 'Comments posted', 'Profile views', 'New followers'].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">{activity}</span>
                      <Badge variant="secondary">{15 - index * 3}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation currentPage="activity" />
    </div>
  );
}
