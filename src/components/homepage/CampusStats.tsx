'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Stat {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface CampusStatsProps {
  stats: readonly Stat[];
  className?: string;
}

export function CampusStats({ stats, className }: CampusStatsProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold px-4">Campus Live Stats</h2>
      <div className="flex gap-3 px-4 overflow-x-auto pb-2">
        {stats.map((stat, index) => (
          <Card key={index} className="min-w-[120px] p-3 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {stat.change && (
                <p className={cn(
                  "text-xs font-medium",
                  stat.trend === 'up' && "text-green-600",
                  stat.trend === 'down' && "text-red-600",
                  stat.trend === 'neutral' && "text-gray-600"
                )}>
                  {stat.change}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
