'use client';

import { PostHeader } from './PostHeader';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';

interface CirclePostProps {
  post: any;
}

export function CirclePost({ post }: CirclePostProps) {
  const circle = post.circle;

  return (
    <article className="bg-card border-b border-border">
      {/* Circle Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: circle?.color || '#6366f1' }}
        >
          <span>{circle?.icon || '🔷'}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{post.author.name}</span>
            <span className="text-muted-foreground text-sm">in</span>
            <span 
              className="font-semibold text-sm px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: circle?.color || '#6366f1' }}
            >
              {circle?.name || 'Circle'}
            </span>
            {circle?.isPrivate && (
              <span className="text-xs text-orange-600">🔒</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.timestamp}</span>
            <span>•</span>
            <span>{circle?.memberCount || 0} members</span>
          </div>
        </div>

        <button className="p-2 hover:bg-muted rounded-full">
          <span className="text-muted-foreground">⋯</span>
        </button>
      </div>

      {/* Circle Description */}
      {circle?.description && !post.content && (
        <div className="px-4 pb-3">
          <p className="text-muted-foreground text-sm italic">
            "{circle.description}"
          </p>
        </div>
      )}

      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <RichText content={post.content} />
        </div>
      )}

      {/* Circle Highlight Card */}
      <div className="mx-4 mb-4">
        <div 
          className="rounded-lg p-4 border-l-4"
          style={{ 
            backgroundColor: `${circle?.color || '#6366f1'}10`,
            borderLeftColor: circle?.color || '#6366f1'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: circle?.color || '#6366f1' }}
            >
              <span className="text-xl">{circle?.icon || '🔷'}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{circle?.name || 'Circle Name'}</h3>
              <p className="text-sm text-muted-foreground">
                {circle?.memberCount || 0} members • {circle?.postCount || 0} posts
              </p>
            </div>
            {!circle?.isMember && (
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: circle?.color || '#6366f1' }}
              >
                Join Circle
              </button>
            )}
          </div>

          {circle?.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {circle.description}
            </p>
          )}

          {/* Circle Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>{circle?.activeMembers || 0} active today</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📝</span>
              <span>{circle?.recentPosts || 0} posts this week</span>
            </div>
          </div>

          {/* Circle Rules/Tags */}
          {circle?.tags && circle.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {circle.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: `${circle?.color || '#6366f1'}80` }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <PostEngagement post={post} />
    </article>
  );
}
