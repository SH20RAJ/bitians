'use client';

import { QuickActions } from './QuickActions';
import { CampusStats } from './CampusStats';
import { SocialFeed } from './SocialFeed';
import { TrendingSection } from './TrendingSection';
import { useHomepageData } from '@/hooks/homepage/use-homepage-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

function HomepageSkeletons() {
  return (
    <div className="space-y-6">
      {/* Hero Section Skeleton */}
      <div className="px-4 space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Quick Actions Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32 mx-4" />
        <div className="grid grid-cols-2 gap-3 px-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-2">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4 mx-auto" />
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40 mx-4" />
        <div className="flex gap-3 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="min-w-[120px] p-3 space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-full" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="px-4 py-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome to BITians! 🎓
        </h1>
        <p className="text-muted-foreground">
          Your campus community hub for connecting, learning, and growing together.
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>🏫 BIT Mesra</span>
          <span>👥 2.5K+ Students</span>
          <span>📚 Active Learning</span>
        </div>
      </div>
    </section>
  );
}

export function Homepage() {
  const { data, isLoading, error } = useHomepageData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HomepageSkeletons />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button className="text-primary hover:underline">
            Try again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="space-y-8 py-6">
        {/* Quick Actions */}
        <QuickActions actions={data.quickActions} />

        {/* Campus Stats */}
        <CampusStats stats={data.campusStats} />

        {/* Trending Section */}
        <TrendingSection trends={data.trendingData} />

        {/* Social Feed */}
        <SocialFeed posts={data.feedPosts} />
      </div>
    </div>
  );
}
