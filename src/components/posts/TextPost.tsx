'use client';

import { useRouter } from 'next/navigation';
import { PostHeader } from './PostHeader';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';
import { TextPost as TextPostType } from '@/types';

interface TextPostProps {
  post: TextPostType;
  isIndividualView?: boolean;
}

export function TextPost({ post, isIndividualView = false }: TextPostProps) {
  const router = useRouter();

  const handlePostClick = () => {
    if (!isIndividualView) {
      router.push(`/post/${post.id}`);
    }
  };

  return (
    <article 
      className={`bg-card border-b border-border ${!isIndividualView ? 'cursor-pointer hover:bg-muted/30 transition-colors' : ''}`}
      onClick={handlePostClick}
    >
      <PostHeader post={post} />
      
      <div className="px-4 pb-4">
        <RichText content={post.content} />
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <PostEngagement post={post} />
    </article>
  );
}
