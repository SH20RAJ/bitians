'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Image, 
  Video, 
  Calendar, 
  Hash, 
  MapPin, 
  Users, 
  Eye,
  EyeOff,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const POST_TYPES = [
  { id: 'text', label: 'Text Post', icon: Hash, description: 'Share your thoughts' },
  { id: 'image', label: 'Photo', icon: Image, description: 'Upload images' },
  { id: 'video', label: 'Video', icon: Video, description: 'Share videos' },
  { id: 'event', label: 'Event', icon: Calendar, description: 'Create event' },
  { id: 'poll', label: 'Poll', icon: Users, description: 'Ask community' },
] as const;

const PRIVACY_OPTIONS = [
  { id: 'public', label: 'Public', icon: Eye, description: 'Everyone can see' },
  { id: 'friends', label: 'Friends Only', icon: Users, description: 'Your connections only' },
  { id: 'anonymous', label: 'Anonymous', icon: EyeOff, description: 'Post anonymously' },
] as const;

interface CreatePostFormProps {
  onSubmit: (data: any) => void;
  className?: string;
}

export function CreatePostForm({ onSubmit, className }: CreatePostFormProps) {
  const [postType, setPostType] = useState<string>('text');
  const [privacy, setPrivacy] = useState<string>('public');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [location, setLocation] = useState('');

  const handleAddHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      setHashtags([...hashtags, newHashtag.trim()]);
      setNewHashtag('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: postType,
      content,
      hashtags,
      location,
      privacy,
    });
  };

  return (
    <Card className={cn("p-6 space-y-6", className)}>
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12 border border-border/50">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            You
          </div>
        </Avatar>
        <div>
          <h3 className="font-semibold">Create New Post</h3>
          <p className="text-sm text-muted-foreground">Share with your BITians community</p>
        </div>
      </div>

      {/* Post Type Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Post Type</Label>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {POST_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <Button
                key={type.id}
                variant={postType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType(type.id)}
                className="flex flex-col h-auto p-3 space-y-1"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{type.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="What's happening at BIT? Share your thoughts, experiences, or ask questions..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none"
        />
        <div className="text-xs text-muted-foreground text-right">
          {content.length}/500
        </div>
      </div>

      {/* Hashtags */}
      <div className="space-y-3">
        <Label>Hashtags</Label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
              placeholder="Add hashtag"
              className="pl-10"
            />
          </div>
          <Button type="button" onClick={handleAddHashtag} size="sm">
            Add
          </Button>
        </div>
        
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveHashtag(tag)}
                  className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label htmlFor="location">Location (Optional)</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="BIT Mesra, Ranchi"
            className="pl-10"
          />
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="space-y-3">
        <Label>Privacy</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {PRIVACY_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.id}
                variant={privacy === option.id ? "default" : "outline"}
                onClick={() => setPrivacy(option.id)}
                className="flex items-center space-x-2 h-auto p-3 justify-start"
              >
                <Icon className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className="text-xs opacity-70">{option.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" className="flex-1">
          Save Draft
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="flex-1"
        >
          {privacy === 'anonymous' ? 'Post Anonymously' : 'Share Post'}
        </Button>
      </div>
    </Card>
  );
}
