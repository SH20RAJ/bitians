'use client';

import { ArrowLeft, Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onSearch?: () => void;
  onNotifications?: () => void;
  onMenu?: () => void;
  notificationCount?: number;
}

export function MobileHeader({
  title = 'BITians',
  showBack = false,
  showSearch = true,
  showNotifications = true,
  showMenu = true,
  onBack,
  onSearch,
  onNotifications,
  onMenu,
  notificationCount = 0,
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Side */}
        <div className="flex items-center space-x-2">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-1">
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearch}
              className="h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
          
          {showNotifications && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotifications}
              className="h-8 w-8 relative"
            >
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>
          )}
          
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenu}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
