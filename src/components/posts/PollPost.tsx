'use client';

import { useState } from 'react';
import { PostHeader } from './PostHeader';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';
import { PollPost as PollPostType } from '@/types';

interface PollPostProps {
  post: PollPostType;
}

export function PollPost({ post }: PollPostProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    post.poll?.userVote || null
  );
  const [hasVoted, setHasVoted] = useState(!!post.poll?.userVote);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    
    // Here you would typically call an API to submit the vote
    console.log('Voting for option:', optionId);
  };

  const totalVotes = post.poll?.options.reduce((sum: number, option: any) => sum + option.votes, 0) || 0;

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
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

      {/* Poll */}
      <div className="px-4 pb-4">
        <div className="bg-muted/50 rounded-lg p-4">
          {/* Poll Question */}
          <h3 className="font-semibold text-foreground mb-4">
            {post.poll?.question}
          </h3>

          {/* Poll Options */}
          <div className="space-y-3">
            {post.poll?.options.map((option: any) => {
              const percentage = getPercentage(option.votes);
              const isSelected = selectedOption === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleVote(option.id)}
                  disabled={hasVoted}
                  className={`
                    w-full text-left p-3 rounded-lg border-2 transition-all
                    ${hasVoted 
                      ? 'cursor-default' 
                      : 'cursor-pointer hover:border-primary/50'
                    }
                    ${isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-4 h-4 rounded-full border-2 flex items-center justify-center
                        ${isSelected 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                        }
                      `}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        )}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                    
                    {hasVoted && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {option.votes} votes
                        </span>
                        <span className="text-sm font-semibold">
                          {percentage}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {hasVoted && (
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Poll Stats */}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{totalVotes} total votes</span>
            <span>
              {post.poll?.endsAt 
                ? `Ends ${post.poll.endsAt}` 
                : 'No end date'
              }
            </span>
          </div>
        </div>
      </div>

      <PostEngagement post={post} />
    </article>
  );
}
