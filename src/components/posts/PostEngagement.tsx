'use client';

import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Bookmark, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/types';

interface PostEngagementProps {
  post: Post;
  hideShare?: boolean;
  showViews?: boolean;
}

export function PostEngagement({ 
  post,
  hideShare = false,
  showViews = true 
}: PostEngagementProps) {
  const engagement = post.engagement;
  
  const handleAction = (action: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`${action} action for post:`, post.id);
    // Handle different actions here
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAction('like')}
            className={cn(
              "h-8 px-2 space-x-1 hover:bg-red-50 hover:text-red-600 transition-colors",
              engagement?.isLiked && "text-red-500 bg-red-50"
            )}
          >
            <Heart className={cn(
              "h-4 w-4",
              engagement?.isLiked && "fill-current"
            )} />
            <span className="text-xs">{formatCount(engagement?.likes || 0)}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleAction('comment')}
            className="h-8 px-2 space-x-1 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{formatCount(engagement?.comments || 0)}</span>
          </Button>
          
          {!hideShare && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAction('share')}
              className="h-8 px-2 space-x-1 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs">{formatCount(engagement?.shares || 0)}</span>
            </Button>
          )}
          
          {showViews && (
            <div className="flex items-center space-x-1 px-2 text-xs text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>{formatCount(engagement?.views || 0)} views</span>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleAction('bookmark')}
          className={cn(
            "h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors",
            engagement?.isBookmarked && "text-blue-500 bg-blue-50"
          )}
        >
          <Bookmark className={cn(
            "h-4 w-4",
            engagement?.isBookmarked && "fill-current"
          )} />
        </Button>
      </div>
    </div>
  );
}
