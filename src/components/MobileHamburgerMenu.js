'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import {
  Menu,
  X,
  Home,
  Users,
  Play,
  User,
  PlusCircle,
  Hash,
  Settings,
  Circle,
  Calendar,
  ShoppingBag,
  Lock,
  BookOpen,
  HelpCircle,
  MapPin,
  GraduationCap,
  Sun,
  Moon,
  Search,
  Bell,
  MessageCircle,
  Bookmark,
  Heart,
  Share2,
  LogOut,
  Camera,
  Video,
  Edit3,
  Crown,
  Sparkles,
  TrendingUp,
  Newspaper
} from 'lucide-react';

export default function MobileHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // Mock user data - in real app this would come from context/auth
  const currentUser = {
    name: 'Shaswat Raj',
    username: 'shaswatraj',
    kBatch: 'K20',
    avatar: 'SR',
    verified: true,
    level: 12,
    points: 2840
  };

  const menuSections = [
    {
      title: 'Main',
      items: [
        { icon: Home, label: 'Home', path: '/', badge: null },
        { icon: TrendingUp, label: 'Feeds', path: '/feeds', badge: '12' },
        { icon: Play, label: 'Watch', path: '/watch', badge: null },
        { icon: Search, label: 'Search', path: '/search', badge: null },
        { icon: PlusCircle, label: 'Create Post', path: '/create', badge: null },
      ]
    },
    {
      title: 'Community',
      items: [
        { icon: Users, label: 'Circles', path: '/circles', badge: null },
        { icon: Hash, label: 'Hashtags', path: '/hashtags', badge: null },
        { icon: Calendar, label: 'Events', path: '/events', badge: '3' },
        { icon: Newspaper, label: 'Newsroom', path: '/newsroom', badge: 'NEW' },
      ]
    },
    {
      title: 'Campus Life',
      items: [
        { icon: ShoppingBag, label: 'BitMart', path: '/bitmart', badge: null },
        { icon: Lock, label: 'Confessions', path: '/confessions', badge: '5' },
        { icon: BookOpen, label: 'Notes', path: '/notes', badge: null },
        { icon: MapPin, label: 'Lost & Found', path: '/lost-found', badge: '2' },
        { icon: GraduationCap, label: 'Study Groups', path: '/study-groups', badge: null },
      ]
    },
    {
      title: 'Personal',
      items: [
        { icon: User, label: 'Profile', path: '/profile', badge: null },
        { icon: Bookmark, label: 'Saved Posts', path: '/saved', badge: null },
        { icon: Heart, label: 'Liked Posts', path: '/liked', badge: null },
        { icon: Bell, label: 'Notifications', path: '/notifications', badge: '7' },
        { icon: MessageCircle, label: 'Messages', path: '/messages', badge: '2' },
      ]
    }
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative z-50 md:hidden p-2"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sheet Overlay */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent onClose={() => setIsOpen(false)} className="w-full sm:w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Header with User Info */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-16 h-16 border-3 border-white/20 shadow-lg">
                    <AvatarFallback className="text-lg font-bold bg-white/20 backdrop-blur-sm text-white">
                      {currentUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {currentUser.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-xs text-white">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{currentUser.name}</h3>
                    <Crown className="w-4 h-4 text-yellow-300" />
                  </div>
                  <p className="text-white/80 text-sm">@{currentUser.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <KBatchBadge kBatch={currentUser.kBatch} size="sm" />
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/20">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Level {currentUser.level}
                    </Badge>
                  </div>
                  <div className="text-xs text-white/70 mt-1">
                    {currentUser.points.toLocaleString()} points
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleNavigation('/profile')}
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  <Edit3 className="w-3 h-3 mr-1" />
                  Edit Profile
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleTheme}
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                </Button>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto">
              {menuSections.map((section, sectionIndex) => (
                <div key={section.title} className="py-2">
                  <div className="px-6 py-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.title}
                    </h4>
                  </div>
                  <div className="space-y-1 px-3">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-accent/50 transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30 transition-colors">
                              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium text-sm">{item.label}</span>
                          </div>
                          {item.badge && (
                            <Badge 
                              variant={item.badge === 'NEW' ? 'default' : 'secondary'} 
                              className={`text-xs ${
                                item.badge === 'NEW' 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-2">
              <button
                onClick={() => handleNavigation('/settings')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-sm">Settings</span>
              </button>
              <button
                onClick={() => handleNavigation('/help')}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-sm">Help & Support</span>
              </button>
              <button
                onClick={() => {
                  // Handle logout
                  console.log('Logout clicked');
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-red-600 dark:text-red-400"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
