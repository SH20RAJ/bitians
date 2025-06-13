// Post Types
export interface Author {
  id: string;
  name: string;
  username: string;
  batch: string;
  avatar: string;
  verified: boolean;
  isFollowing?: boolean;
}

export interface Engagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked?: boolean;
}

export interface BasePost {
  id: string;
  type: string;
  author: Author;
  content: string;
  timestamp: string;
  engagement: Engagement;
  location?: string;
  tags?: string[];
}

export interface TextPost extends BasePost {
  type: 'text';
}

export interface ImagePost extends BasePost {
  type: 'image';
  images: string[];
}

export interface VideoPost extends BasePost {
  type: 'video';
  videoUrl: string;
  thumbnail: string;
  duration?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  userVote?: string;
  endsAt?: string;
}

export interface PollPost extends BasePost {
  type: 'poll';
  poll: Poll;
}

export interface Event {
  title: string;
  description?: string;
  time: string;
  location: string;
  image?: string;
  month: string;
  day: string;
  going: number;
  interested: number;
  userRsvp?: 'going' | 'interested' | 'not_going';
}

export interface EventPost extends BasePost {
  type: 'event';
  event: Event;
}

export interface ConfessionPost extends BasePost {
  type: 'confession';
  confessionNumber: string;
  isNSFW?: boolean;
}

export interface NewsroomPost extends BasePost {
  type: 'newsroom';
  category?: string;
  featuredImage?: string;
  externalLink?: string;
  linkTitle?: string;
  linkDescription?: string;
  isUrgent?: boolean;
}

export interface Circle {
  id: string;
  name: string;
  color: string;
  icon: string;
  isPrivate?: boolean;
  memberCount: number;
  postCount?: number;
  description?: string;
  isMember?: boolean;
  activeMembers?: number;
  recentPosts?: number;
  tags?: string[];
}

export interface CirclePost extends BasePost {
  type: 'circles';
  circle: Circle;
}

export type Post = TextPost | ImagePost | VideoPost | PollPost | EventPost | ConfessionPost | NewsroomPost | CirclePost;

// User Types
export interface User {
  id: string;
  name: string;
  username: string;
  batch: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  joinedDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  achievements?: string[];
}

// Comment Types
export interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}
