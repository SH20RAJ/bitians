'use client';

import { useState } from 'react';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';

interface ConfessionPostProps {
  post: any;
}

export function ConfessionPost({ post }: ConfessionPostProps) {
  const [showContent, setShowContent] = useState(false);

  return (
    <article className="bg-card border-b border-border">
      {/* Anonymous Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">🤫</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Anonymous</span>
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
              Confession
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.timestamp}</span>
            <span>•</span>
            <span>#{post.confessionNumber || '001'}</span>
          </div>
        </div>

        <button className="p-2 hover:bg-muted rounded-full">
          <span className="text-muted-foreground">⋯</span>
        </button>
      </div>

      {/* Confession Content */}
      <div className="px-4 pb-4">
        {/* Content Warning */}
        {post.isNSFW && !showContent && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <h3 className="font-semibold text-orange-800 mb-2">
              Sensitive Content
            </h3>
            <p className="text-orange-700 text-sm mb-3">
              This confession contains sensitive content that may not be suitable for all viewers.
            </p>
            <button
              onClick={() => setShowContent(true)}
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Show Content
            </button>
          </div>
        )}

        {/* Actual Content */}
        {(!post.isNSFW || showContent) && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <RichText content={post.content} />
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Confession Guidelines */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-yellow-500 mt-0.5">💡</span>
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Community Guidelines:</p>
              <p>This is an anonymous confession. Please be respectful in comments and remember that real people share these experiences.</p>
            </div>
          </div>
        </div>
      </div>

      <PostEngagement 
        post={{
          ...post,
          author: {
            name: 'Anonymous',
            username: 'anonymous',
            avatar: '🤫',
            verified: false
          }
        }} 
        hideShare={true}
      />
    </article>
  );
}
