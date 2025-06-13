'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface RichTextProps {
  content: string;
  className?: string;
  onHashtagClick?: (hashtag: string) => void;
  onMentionClick?: (mention: string) => void;
}

export function RichText({
  content,
  className,
  onHashtagClick,
  onMentionClick,
}: RichTextProps) {
  const processText = (text: string) => {
    // Split text by spaces and process each word
    const words = text.split(/(\s+)/);
    
    return words.map((word, index) => {
      // Handle hashtags
      if (word.startsWith('#') && word.length > 1) {
        const hashtag = word.slice(1);
        return (
          <span
            key={index}
            onClick={() => onHashtagClick?.(hashtag)}
            className="text-blue-500 cursor-pointer hover:underline font-medium"
          >
            {word}
          </span>
        );
      }
      
      // Handle mentions
      if (word.startsWith('@') && word.length > 1) {
        const mention = word.slice(1);
        return (
          <span
            key={index}
            onClick={() => onMentionClick?.(mention)}
            className="text-blue-500 cursor-pointer hover:underline font-medium"
          >
            {word}
          </span>
        );
      }
      
      // Regular text and whitespace
      return <span key={index}>{word}</span>;
    });
  };

  return (
    <div className={cn("text-sm text-foreground", className)}>
      {processText(content)}
    </div>
  );
}
