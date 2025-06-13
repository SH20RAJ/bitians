'use client';

import { Home, Search, Plus, User, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/search',
    icon: Search,
    label: 'Search',
  },
  {
    href: '/create',
    icon: Plus,
    label: 'Create',
  },
  {
    href: '/profile',
    icon: User,
    label: 'Profile',
  },
  {
    href: '/more',
    icon: MoreHorizontal,
    label: 'More',
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center space-y-1 h-auto py-2 px-3",
                  isActive && "text-primary"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
