'use client';

import { PostHeader } from './PostHeader';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';

interface EventPostProps {
  post: any;
}

export function EventPost({ post }: EventPostProps) {
  const event = post.event;
  
  const handleRSVP = (status: 'going' | 'interested' | 'not_going') => {
    console.log('RSVP status:', status);
    // Handle RSVP logic here
  };

  return (
    <article className="bg-card border-b border-border">
      <PostHeader post={post} />
      
      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <RichText content={post.content} />
        </div>
      )}

      {/* Event Card */}
      <div className="mx-4 mb-4">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border overflow-hidden">
          {/* Event Image */}
          {event?.image && (
            <div className="aspect-video bg-muted">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-4">
            {/* Event Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-primary text-primary-foreground rounded-lg p-2 text-center min-w-12">
                <div className="text-xs font-medium">
                  {event?.month || 'JUN'}
                </div>
                <div className="text-lg font-bold">
                  {event?.day || '15'}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground mb-1">
                  {event?.title || 'Untitled Event'}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>🕐</span>
                  <span>{event?.time || 'Time TBA'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>📍</span>
                  <span>{event?.location || 'Location TBA'}</span>
                </div>
              </div>
            </div>

            {/* Event Description */}
            {event?.description && (
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {event.description}
              </p>
            )}

            {/* Event Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <span>✅</span>
                <span className="text-muted-foreground">{event?.going || 0} going</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span className="text-muted-foreground">{event?.interested || 0} interested</span>
              </div>
            </div>

            {/* RSVP Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleRSVP('going')}
                className={`
                  flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all
                  ${event?.userRsvp === 'going'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }
                `}
              >
                ✅ Going
              </button>
              <button
                onClick={() => handleRSVP('interested')}
                className={`
                  flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all
                  ${event?.userRsvp === 'interested'
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }
                `}
              >
                ⭐ Interested
              </button>
            </div>
          </div>
        </div>
      </div>

      <PostEngagement post={post} />
    </article>
  );
}
