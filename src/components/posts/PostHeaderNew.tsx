'use client';

import { useRouter } from 'next/navigation';
import { KBatchBadge } from '@/components/ui/KBatchBadge';

interface PostHeaderProps {
  post: any;
}

export function PostHeader({ post }: PostHeaderProps) {
  const router = useRouter();
  const { author, timestamp, location } = post;

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${author.username}`);
  };

  return (
    <div className="flex items-center gap-3 p-4 pb-3">
      <button
        onClick={handleAuthorClick}
        className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition-transform"
      >
        {author.avatar}
      </button>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleAuthorClick}
            className="font-semibold text-foreground hover:underline"
          >
            {author.name}
          </button>
          <KBatchBadge kBatch={author.batch} size="sm" />
          {author.verified && (
            <span className="text-blue-500 text-sm">✓</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{timestamp}</span>
          {location && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>{location}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <button className="p-2 hover:bg-muted rounded-full">
        <span className="text-muted-foreground">⋯</span>
      </button>
    </div>
  );
}
