'use client';

import { MobileHeader } from './MobileHeader';
import { BottomNavigation } from './BottomNavigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  title,
  showBack = false,
  showSearch = true,
  showNotifications = true,
  showMenu = true,
  className = '',
}: PageLayoutProps) {
  const router = useRouter();
  const [notificationCount] = useState(3); // Mock notification count

  const handleBack = () => {
    router.back();
  };

  const handleSearch = () => {
    router.push('/search');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleMenu = () => {
    // Toggle mobile menu - would implement slide-out menu
    console.log('Menu clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader
        title={title}
        showBack={showBack}
        showSearch={showSearch}
        showNotifications={showNotifications}
        showMenu={showMenu}
        onBack={handleBack}
        onSearch={handleSearch}
        onNotifications={handleNotifications}
        onMenu={handleMenu}
        notificationCount={notificationCount}
      />

      {/* Main Content */}
      <main className={className}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
