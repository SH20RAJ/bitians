'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
  color: string;
  description: string;
}

interface QuickActionsProps {
  actions: readonly QuickAction[];
  className?: string;
}

export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold px-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 px-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.id} href={action.href}>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={cn(
                    "p-3 rounded-full text-white",
                    action.color
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
