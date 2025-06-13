"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
  SheetClose,
} from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Home,
  TrendingUp,
  Play,
  User,
  Settings,
  Users,
  Calendar,
  ShoppingBag,
  MessageSquare,
  BookOpen,
  Search as SearchIcon,
  UserPlus,
  LogOut,
  Bell,
  Heart,
  Bookmark,
  Hash,
  GraduationCap,
  Newspaper
} from 'lucide-react';

export default function MobileHeader({ title = "BITians.org", showSearch = true }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const currentUser = {
    name: 'Shaswat Raj',
    username: 'shaswatraj',
    kBatch: 'K20',
    avatar: 'SR',
    branch: 'CSE'
  };

  const navigationItems = [
    { icon: Home, label: 'Home', href: '/', shortcut: '⌘H' },
    { icon: TrendingUp, label: 'Feeds', href: '/feeds', shortcut: '⌘F' },
    { icon: SearchIcon, label: 'Search', href: '/search', shortcut: '⌘K' },
    { icon: Play, label: 'Watch', href: '/watch', shortcut: '⌘W' },
    { icon: User, label: 'Profile', href: '/profile', shortcut: '⌘P' },
    { icon: Users, label: 'Circles', href: '/circles', shortcut: '⌘C' },
    { icon: Newspaper, label: 'Newsroom', href: '/newsroom', shortcut: '⌘N' },
    { icon: Calendar, label: 'Events', href: '/events', shortcut: '⌘E' },
    { icon: ShoppingBag, label: 'BitMart', href: '/bitmart', shortcut: '⌘B' },
    { icon: MessageSquare, label: 'Confessions', href: '/confessions' },
    { icon: BookOpen, label: 'Notes', href: '/notes' },
    { icon: Hash, label: 'Hashtags', href: '/hashtags' },
    { icon: Settings, label: 'Settings', href: '/settings', shortcut: '⌘,' },
  ];

  const quickActions = [
    { icon: Bell, label: 'Notifications', count: 3 },
    { icon: Heart, label: 'Liked Posts', count: 12 },
    { icon: Bookmark, label: 'Saved Posts', count: 5 },
    { icon: UserPlus, label: 'Friend Requests', count: 2 },
  ];

  const handleNavigation = (href) => {
    router.push(href);
    setIsSheetOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {showSearch && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => router.push('/search')}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}

            {/* Menu Sheet Trigger */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>

              <SheetOverlay onClick={() => setIsSheetOpen(false)} />

              <SheetContent side="right" className="w-[320px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="p-6 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                          {currentUser.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <SheetTitle className="text-lg">{currentUser.name}</SheetTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <KBatchBadge kBatch={currentUser.kBatch} size="xs" />
                          <Badge variant="outline" className="text-xs">
                            {currentUser.branch}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </SheetHeader>

                  {/* Quick Actions */}
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action.label}
                          variant="ghost"
                          className="h-auto p-3 flex flex-col items-center gap-1 relative"
                        >
                          <action.icon className="h-4 w-4" />
                          <span className="text-xs">{action.label}</span>
                          {action.count > 0 && (
                            <Badge 
                              variant="default" 
                              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                            >
                              {action.count}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Navigation</h3>
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <Button
                          key={item.href}
                          variant="ghost"
                          className="w-full justify-start h-11 px-3"
                          onClick={() => handleNavigation(item.href)}
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.shortcut && (
                            <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                              {item.shortcut}
                            </kbd>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Theme</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleTheme}
                        className="h-8 px-3"
                      >
                        {theme === 'dark' ? (
                          <>
                            <Sun className="h-3 w-3 mr-1" />
                            Light
                          </>
                        ) : (
                          <>
                            <Moon className="h-3 w-3 mr-1" />
                            Dark
                          </>
                        )}
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>

                <SheetClose />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14"></div>
    </>
  );
}
