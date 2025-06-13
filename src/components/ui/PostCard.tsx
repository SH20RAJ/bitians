'use client';

import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { RichText } from '@/components/ui/RichText';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PostAuthor {
  name: string;
  username: string;
  batch: string;
  avatar: string;
  verified: boolean;
}

interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface PostCardProps {
  id: string;
  author: PostAuthor;
  content: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'event';
  media?: string[];
  timestamp: string;
  engagement: PostEngagement;
  tags: string[];
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onBookmark?: (id: string) => void;
  className?: string;
}

export function PostCard({
  id,
  author,
  content,
  type,
  media,
  timestamp,
  engagement,
  tags,
  onLike,
  onComment,
  onShare,
  onBookmark,
  className,
}: PostCardProps) {
  return (
    <Card className={cn("p-4 space-y-3 hover:shadow-sm transition-shadow", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border border-border/50">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm truncate">{author.name}</h3>
              {author.verified && (
                <span className="text-blue-500 text-xs flex-shrink-0">✓</span>
              )}
              <KBatchBadge kBatch={author.batch} size="sm" />
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {author.username} • {timestamp}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <RichText content={content} className="text-sm leading-relaxed" />
        
        {/* Media */}
        {media && media.length > 0 && (
          <div className="rounded-lg overflow-hidden border border-border/50">
            <div className="relative aspect-video bg-muted">
              <Image
                src={media[0]}
                alt="Post media"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full cursor-pointer hover:bg-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Engagement Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike?.(id)}
            className={cn(
              "h-8 px-2 space-x-1 hover:bg-red-50 hover:text-red-600",
              engagement.isLiked && "text-red-500 bg-red-50"
            )}
          >
            <Heart className={cn(
              "h-4 w-4",
              engagement.isLiked && "fill-current"
            )} />
            <span className="text-xs">{engagement.likes}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onComment?.(id)}
            className="h-8 px-2 space-x-1 hover:bg-blue-50 hover:text-blue-600"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{engagement.comments}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onShare?.(id)}
            className="h-8 px-2 space-x-1 hover:bg-green-50 hover:text-green-600"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-xs">{engagement.shares}</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark?.(id)}
          className={cn(
            "h-8 w-8 hover:bg-blue-50 hover:text-blue-600",
            engagement.isBookmarked && "text-blue-500 bg-blue-50"
          )}
        >
          <Bookmark className={cn(
            "h-4 w-4",
            engagement.isBookmarked && "fill-current"
          )} />
        </Button>
      </div>
    </Card>
  );
}
