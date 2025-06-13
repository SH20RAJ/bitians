'use client';

import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { RichText } from '@/components/ui/RichText';
import { KBatchBadge } from '@/components/ui/KBatchBadge';

interface Comment {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    batch: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    author: {
      name: 'Priya Verma',
      username: 'priya_k22',
      avatar: '👩‍💻',
      batch: 'K22',
      verified: false
    },
    content: 'This is really insightful! Thanks for sharing your experience.',
    timestamp: '2 hours ago',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 'reply-1',
        author: {
          name: 'Rahul Sharma',
          username: 'rahul_k23',
          avatar: '👨‍💻',
          batch: 'K23',
          verified: false
        },
        content: 'Glad you found it helpful! Let me know if you have any questions.',
        timestamp: '1 hour ago',
        likes: 5,
        isLiked: true
      }
    ]
  },
  {
    id: 'comment-2',
    author: {
      name: 'Ankit Kumar',
      username: 'ankit_dev',
      avatar: '🧑‍💻',
      batch: 'K21',
      verified: true
    },
    content: 'Great post! This aligns with what we discussed in our study group last week. 📚',
    timestamp: '3 hours ago',
    likes: 8,
    isLiked: false
  },
  {
    id: 'comment-3',
    author: {
      name: 'Sneha Patel',
      username: 'sneha_cse',
      avatar: '👩‍🎓',
      batch: 'K24',
      verified: false
    },
    content: 'Could you share more resources on this topic? Would love to learn more!',
    timestamp: '4 hours ago',
    likes: 15,
    isLiked: true
  }
];

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setComments(MOCK_COMMENTS);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        author: {
          name: 'You',
          username: 'your_username',
          avatar: '😊',
          batch: 'K23',
          verified: false
        },
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false
      };

      setComments(prev => [comment, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyText.trim() || submitting) return;

    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const reply: Comment = {
        id: `reply-${Date.now()}`,
        author: {
          name: 'You',
          username: 'your_username',
          avatar: '😊',
          batch: 'K23',
          verified: false
        },
        content: replyText,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false
      };

      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      }));

      setReplyText('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prev => prev.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                isLiked: !reply.isLiked,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      } else if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { comment: Comment; isReply?: boolean; parentId?: string }) => (
    <div className={`${isReply ? 'ml-12 border-l-2 border-muted pl-4' : ''}`}>
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-sm">
          {comment.author.avatar}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{comment.author.name}</span>
            <KBatchBadge kBatch={comment.author.batch} size="sm" />
            {comment.author.verified && (
              <span className="text-blue-500 text-xs">✓</span>
            )}
            <span className="text-muted-foreground text-xs">•</span>
            <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
          </div>
          
          <div className="text-sm text-foreground mb-2">
            <RichText content={comment.content} />
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => toggleLike(comment.id, isReply, parentId)}
              className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                comment.isLiked ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              <span>{comment.isLiked ? '❤️' : '🤍'}</span>
              <span>{comment.likes}</span>
            </button>
            
            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Reply
              </button>
            )}
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment.id && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitReply(comment.id); }} className="mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.author.name}...`}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim() || submitting}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  {submitting ? '...' : 'Reply'}
                </button>
              </div>
            </form>
          )}
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map(reply => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  isReply={true} 
                  parentId={comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground mb-4">
          Comments ({comments.length})
        </h3>
        
        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-sm">
              😊
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim() || submitting}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
