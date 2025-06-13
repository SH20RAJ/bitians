'use client';

import { PostHeader } from './PostHeader';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';

interface NewsroomPostProps {
  post: any;
}

export function NewsroomPost({ post }: NewsroomPostProps) {
  return (
    <article className="bg-card border-b border-border">
      {/* Official Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">📢</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">BIT Mesra Official</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
              Official
            </span>
            <span className="text-blue-500">✓</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.timestamp}</span>
            <span>•</span>
            <span className="text-blue-600 font-medium">Newsroom</span>
          </div>
        </div>

        <button className="p-2 hover:bg-muted rounded-full">
          <span className="text-muted-foreground">⋯</span>
        </button>
      </div>

      {/* News Content */}
      <div className="px-4 pb-4">
        {/* News Category */}
        {post.category && (
          <div className="mb-3">
            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
              {post.category}
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <RichText content={post.content} />
          
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <img
                src={post.featuredImage}
                alt="News featured image"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* News Link */}
          {post.externalLink && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">🔗</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm mb-1">
                    {post.linkTitle || 'Read Full Article'}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {post.linkDescription || 'Click to read the complete news article'}
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Open →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Important Notice */}
        {post.isUrgent && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">🚨</span>
              <div className="text-sm">
                <p className="font-medium text-red-800 mb-1">Important Notice</p>
                <p className="text-red-700">This is urgent information that requires immediate attention from all students.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <PostEngagement 
        post={{
          ...post,
          author: {
            name: 'BIT Mesra Official',
            username: 'official',
            avatar: '📢',
            verified: true
          }
        }} 
      />
    </article>
  );
}
