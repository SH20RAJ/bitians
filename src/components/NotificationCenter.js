"use client";

import { useState, useEffect } from 'react';
import { Bell, X, Check, Heart, MessageCircle, UserPlus, Trophy, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      title: 'Post Liked',
      message: 'Arjun Sharma liked your post about the placement drive',
      user: 'Arjun Sharma',
      avatar: 'AS',
      time: '2 minutes ago',
      read: false,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment',
      message: 'Priya Mehta commented on your Machine Learning project post',
      user: 'Priya Mehta',
      avatar: 'PM',
      time: '15 minutes ago',
      read: false,
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'follow',
      title: 'New Follower',
      message: 'Rahul Singh started following you',
      user: 'Rahul Singh',
      avatar: 'RS',
      time: '1 hour ago',
      read: false,
      icon: UserPlus,
      color: 'text-green-500'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You reached 100 likes on your posts! 🎉',
      user: 'System',
      avatar: '🏆',
      time: '2 hours ago',
      read: true,
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 5,
      type: 'mention',
      title: 'You were mentioned',
      message: 'Neha Gupta mentioned you in a post about the hackathon',
      user: 'Neha Gupta',
      avatar: 'NG',
      time: '3 hours ago',
      read: true,
      icon: AlertCircle,
      color: 'text-purple-500'
    },
    {
      id: 6,
      type: 'event',
      title: 'Event Reminder',
      message: 'Tech fest registration ends tomorrow!',
      user: 'BIT Events',
      avatar: 'BE',
      time: '5 hours ago',
      read: true,
      icon: AlertCircle,
      color: 'text-orange-500'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    const unread = mockNotifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getNotificationIcon = (notification) => {
    const IconComponent = notification.icon;
    return <IconComponent className={`w-4 h-4 ${notification.color}`} />;
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 max-h-96 bg-background border rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar or Icon */}
                    <div className="flex-shrink-0">
                      {notification.avatar.length === 1 ? (
                        <div className="text-lg">{notification.avatar}</div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                          {notification.avatar}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getNotificationIcon(notification)}
                        <span className="font-medium text-sm">{notification.title}</span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 px-2 text-xs"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Mark read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => clearNotification(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t bg-muted/50">
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={() => {
                  setIsOpen(false);
                  toast({
                    title: "View All Notifications",
                    description: "Full notifications page coming soon!",
                    duration: 2000,
                  });
                }}
              >
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
