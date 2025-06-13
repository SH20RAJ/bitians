'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendingItem {
  id: string;
  text: string;
  count: number;
  type: 'hashtag' | 'topic';
  category: string;
}

interface TrendingSectionProps {
  trends: TrendingItem[];
  className?: string;
}

export function TrendingSection({ trends, className }: TrendingSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-2 px-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Trending Now</h2>
      </div>
      
      <div className="space-y-2 px-4">
        {trends.map((trend, index) => (
          <Card key={trend.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">#{index + 1}</span>
                  <h3 className="font-semibold text-blue-600">
                    {trend.type === 'hashtag' ? '#' : ''}{trend.text}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {trend.count} posts • {trend.category}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Trending
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
