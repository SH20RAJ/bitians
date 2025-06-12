'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Send,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Clock,
  Eye,
  Globe,
  Users,
  Lock,
  ArrowLeft
} from 'lucide-react';

export default function PostPage() {
  const params = useParams();
  const postId = params.id;
  const { showToast } = useToast();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching post data
    const mockPost = {
      id: postId,
      author: 'Arjun Sharma',
      avatar: 'AS',
      timeAgo: '2 hours ago',
      privacy: 'public',
      content: 'Just aced my Data Structures exam! 🎉 Thanks to the amazing study group we formed last week. Collaboration really works! Special thanks to @priya and @rohit for the late-night debugging sessions.',
      images: ['/api/placeholder/600/400'],
      likes: 156,
      comments: 23,
      shares: 8,
      views: 1240,
      branch: 'CSE',
      year: '2nd Year',
      verified: true,
      tags: ['datastructures', 'exam', 'studygroup', 'collaboration'],
      location: 'BIT Mesra Library',
      feeling: 'excited'
    };

    const mockComments = [
      {
        id: 1,
        author: 'Priya Singh',
        avatar: 'PS',
        timeAgo: '1 hour ago',
        content: 'Congratulations! Our study group was amazing 🎊',
        likes: 12,
        replies: [
          {
            id: 11,
            author: 'Arjun Sharma',
            avatar: 'AS',
            timeAgo: '45 mins ago',
            content: 'Thanks Priya! Couldn\'t have done it without you all',
            likes: 5
          }
        ]
      },
      {
        id: 2,
        author: 'Rohit Kumar',
        avatar: 'RK',
        timeAgo: '45 mins ago',
        content: 'Those debugging sessions were intense but worth it! 💪',
        likes: 8,
        replies: []
      },
      {
        id: 3,
        author: 'Sneha Gupta',
        avatar: 'SG',
        timeAgo: '30 mins ago',
        content: 'Can you share some tips for the upcoming OS exam?',
        likes: 3,
        replies: []
      }
    ];

    const mockRelatedPosts = [
      {
        id: 2,
        author: 'Vikash Yadav',
        avatar: 'VY',
        timeAgo: '3 hours ago',
        content: 'Looking for study partners for Algorithm Design course. Anyone interested?',
        likes: 23,
        comments: 7
      },
      {
        id: 3,
        author: 'Anita Sharma',
        avatar: 'AS',
        timeAgo: '5 hours ago',
        content: 'Amazing notes sharing session today! Thanks everyone who contributed.',
        likes: 45,
        comments: 12
      }
    ];

    setPost(mockPost);
    setComments(mockComments);
    setRelatedPosts(mockRelatedPosts);
  }, [postId]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    showToast(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', 'success');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Post link copied to clipboard!', 'success');
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: 'You',
      avatar: 'Y',
      timeAgo: 'just now',
      content: newComment,
      likes: 0,
      replies: []
    };

    if (replyTo) {
      setComments(prev => prev.map(c => 
        c.id === replyTo 
          ? { ...c, replies: [...c.replies, { ...comment, id: Date.now() }] }
          : c
      ));
      setReplyTo(null);
    } else {
      setComments(prev => [comment, ...prev]);
    }

    setPost(prev => ({ ...prev, comments: prev.comments + 1 }));
    setNewComment('');
    showToast('Comment added!', 'success');
  };

  const handleCommentLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(prev => prev.map(c => 
        c.id === parentId 
          ? {
              ...c,
              replies: c.replies.map(r => 
                r.id === commentId 
                  ? { ...r, likes: r.likes + 1 }
                  : r
              )
            }
          : c
      ));
    } else {
      setComments(prev => prev.map(c => 
        c.id === commentId 
          ? { ...c, likes: c.likes + 1 }
          : c
      ));
    }
  };

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Post */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                      {post.avatar}
                    </div>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{post.author}</h3>
                      {post.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {post.branch}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{post.year}</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {post.privacy === 'public' && <Globe className="h-3 w-3" />}
                        {post.privacy === 'friends' && <Users className="h-3 w-3" />}
                        {post.privacy === 'private' && <Lock className="h-3 w-3" />}
                        {post.privacy}
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">{post.content}</p>
                
                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    {post.images.map((image, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                          <span className="text-muted-foreground">Image {index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Post Metadata */}
                {(post.location || post.feeling) && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {post.feeling && <span>Feeling {post.feeling}</span>}
                    {post.location && <span>📍 {post.location}</span>}
                  </div>
                )}
              </div>

              {/* Post Stats */}
              <div className="flex items-center justify-between py-3 mt-4 border-t border-b">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  {post.views} views
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`transition-colors ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-blue-500"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-muted-foreground hover:text-green-500"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className={`${isBookmarked ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </Card>

            {/* Comments Section */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Comments ({post.comments})</h3>
              
              {/* Add Comment */}
              <div className="flex gap-3 mb-6">
                <Avatar size="sm" />
                <div className="flex-1 space-y-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
                    className="flex-1"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleCommentSubmit}
                      disabled={!newComment.trim()}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      {replyTo ? 'Reply' : 'Comment'}
                    </Button>
                    {replyTo && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex gap-3">
                      <Avatar size="sm">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xs">
                          {comment.avatar}
                        </div>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className="flex items-center gap-1 hover:text-blue-500"
                          >
                            <ThumbsUp className="h-3 w-3" />
                            {comment.likes}
                          </button>
                          <button
                            onClick={() => setReplyTo(comment.id)}
                            className="flex items-center gap-1 hover:text-blue-500"
                          >
                            <Reply className="h-3 w-3" />
                            Reply
                          </button>
                          <button className="flex items-center gap-1 hover:text-red-500">
                            <Flag className="h-3 w-3" />
                            Report
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-12 space-y-3">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar size="sm">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs">
                                {reply.avatar}
                              </div>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="bg-muted rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <button
                                  onClick={() => handleCommentLike(reply.id, true, comment.id)}
                                  className="flex items-center gap-1 hover:text-blue-500"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                  {reply.likes}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Posts */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map(relatedPost => (
                  <div key={relatedPost.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar size="sm">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs">
                          {relatedPost.avatar}
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{relatedPost.author}</p>
                        <p className="text-xs text-muted-foreground">{relatedPost.timeAgo}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-2 line-clamp-2">{relatedPost.content}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{relatedPost.likes} likes</span>
                      <span>{relatedPost.comments} comments</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Post
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Follow Author
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
