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
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">BITians.org</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Profile Section */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">SR</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Shaswat Raj</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">@shaswatraj</div>
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
                        className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  BITians.org v1.0.0
                  <br />
                  Made with ❤️ for BIT Mesra
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
