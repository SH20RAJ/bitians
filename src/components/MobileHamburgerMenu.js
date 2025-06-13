'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Menu, 
  X, 
  Home, 
  TrendingUp, 
  Plus, 
  Play, 
  User,
  Settings,
  Bell,
  Search,
  Users,
  Calendar,
  BookOpen,
  Coffee,
  Hash,
  ShoppingBag
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MobileHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'feeds', label: 'Feeds', icon: TrendingUp, href: '/feeds' },
    { id: 'create', label: 'Create Post', icon: Plus, href: '/create' },
    { id: 'watch', label: 'Watch', icon: Play, href: '/watch' },
    { id: 'hashtags', label: 'Hashtags', icon: Hash, href: '/hashtags' },
    { id: 'circles', label: 'Circles', icon: Users, href: '/circles' },
    { id: 'events', label: 'Events', icon: Calendar, href: '/events' },
    { id: 'notes', label: 'Notes', icon: BookOpen, href: '/notes' },
    { id: 'confessions', label: 'Confessions', icon: Coffee, href: '/confessions' },
    { id: 'bitmart', label: 'BitMart', icon: ShoppingBag, href: '/bitmart' },
    { id: 'profile', label: 'My Profile', icon: User, href: '/profile/shaswatraj' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ];

  const handleNavigation = (href) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="md:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-background/95 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-border">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-purple-500/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-sm">B</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">BITians.org</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-accent"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Profile Section */}
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-primary/20">
                    <span className="text-primary-foreground font-bold">SR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Shaswat Raj</div>
                    <div className="text-sm text-muted-foreground">@shaswatraj</div>
                    <div className="text-xs text-primary font-medium mt-1 px-2 py-1 bg-primary/10 rounded-full inline-block">CSE • 4th Year</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-4 overflow-y-auto">
                <nav className="space-y-1 px-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.href)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                          <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <div className="font-medium text-foreground">BITians.org v1.0.0</div>
                  <div className="flex items-center justify-center gap-1">
                    Made with <span className="text-red-500">❤️</span> for BIT Mesra
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
