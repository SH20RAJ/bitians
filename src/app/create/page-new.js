'use client';

import { useState, useRef } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/Toast';
import { 
  Image, 
  Video, 
  MapPin, 
  Smile, 
  Hash, 
  Users, 
  Globe, 
  Lock, 
  Eye,
  Camera,
  Mic,
  Calendar,
  BarChart3,
  Gift,
  Zap,
  Send,
  X,
  Plus,
  ArrowLeft,
  At,
  EyeOff,
  FileText,
  Music,
  Type,
  ImageIcon
} from 'lucide-react';

export default function CreatePostPage() {
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('text');
  const [privacy, setPrivacy] = useState('public');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState('');
  const [feeling, setFeeling] = useState('');
  const [images, setImages] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [newTag, setNewTag] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const postTypes = [
    { id: 'text', label: 'Text', icon: FileText, color: 'bg-blue-500', description: 'Share your thoughts' },
    { id: 'image', label: 'Photo', icon: Camera, color: 'bg-green-500', description: 'Upload images' },
    { id: 'video', label: 'Video', icon: Video, color: 'bg-purple-500', description: 'Share videos' },
    { id: 'poll', label: 'Poll', icon: BarChart3, color: 'bg-orange-500', description: 'Create a poll' },
    { id: 'event', label: 'Event', icon: Calendar, color: 'bg-pink-500', description: 'Organize events' },
    { id: 'confession', label: 'Confession', icon: EyeOff, color: 'bg-gray-500', description: 'Anonymous post' }
  ];

  const feelings = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😎', label: 'Cool' },
    { emoji: '😍', label: 'Love' },
    { emoji: '🤔', label: 'Thinking' },
    { emoji: '😴', label: 'Sleepy' },
    { emoji: '🎉', label: 'Celebrating' },
    { emoji: '😤', label: 'Frustrated' }
  ];

  const maxChars = 500;

  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length <= maxChars) {
      setPostContent(content);
      setCharCount(content.length);
    }
  };

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length <= 4) {
      setImages([...images, ...files]);
    } else {
      toast({
        title: 'Too many images',
        description: 'You can upload maximum 4 images',
        type: 'error'
      });
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!postContent.trim() && postType === 'text') {
      toast({
        title: 'Content required',
        description: 'Please write something to share',
        type: 'error'
      });
      return;
    }

    // Here you would normally send the post to your backend
    toast({
      title: 'Post created! 🎉',
      description: 'Your post has been shared with the community',
      type: 'success'
    });

    // Reset form
    setPostContent('');
    setTags([]);
    setLocation('');
    setFeeling('');
    setImages([]);
    setIsAnonymous(false);
    setCharCount(0);
    setIsExpanded(false);
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Create Post</h1>
          <p className="text-muted-foreground">Share something with the BIT community</p>
        </div>

        {/* Main Create Card */}
        <Card className="overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  SR
                </div>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">Shaswat Raj</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>CSE • K21</span>
                  {isAnonymous && (
                    <Badge variant="secondary" className="text-xs">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Anonymous
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={isAnonymous ? 'bg-gray-100 dark:bg-gray-800' : ''}
              >
                <EyeOff className="w-4 h-4 mr-1" />
                {isAnonymous ? 'Anonymous' : 'Public'}
              </Button>
            </div>
          </div>

          {/* Post Type Selection */}
          <div className="p-6 border-b bg-gray-50/50 dark:bg-gray-900/50">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {postTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      postType === type.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${type.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-center">{type.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Input */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Main Text Area */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={postContent}
                  onChange={handleContentChange}
                  placeholder={
                    postType === 'confession' 
                      ? "Share your thoughts anonymously..." 
                      : "What's on your mind?"
                  }
                  className="w-full min-h-[120px] p-4 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent placeholder:text-muted-foreground"
                  onFocus={() => setIsExpanded(true)}
                />
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {charCount}/{maxChars}
                </div>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Poll Options */}
              {postType === 'poll' && (
                <div className="space-y-3">
                  <h4 className="font-medium">Poll Options</h4>
                  {pollOptions.map((option, index) => (
                    <Input
                      key={index}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...pollOptions];
                        newOptions[index] = e.target.value;
                        setPollOptions(newOptions);
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    disabled={pollOptions.length >= 4}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Option
                  </Button>
                </div>
              )}

              {/* Event Details */}
              {postType === 'event' && (
                <div className="space-y-3">
                  <h4 className="font-medium">Event Details</h4>
                  <Input
                    value={eventDetails.title}
                    onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
                    placeholder="Event title"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="date"
                      value={eventDetails.date}
                      onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})}
                    />
                    <Input
                      type="time"
                      value={eventDetails.time}
                      onChange={(e) => setEventDetails({...eventDetails, time: e.target.value})}
                    />
                  </div>
                  <Input
                    value={eventDetails.location}
                    onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})}
                    placeholder="Event location"
                  />
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="pr-1">
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-red-500 hover:text-white rounded-full w-4 h-4 flex items-center justify-center"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add Tag Input */}
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add hashtag..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(newTag);
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddTag(newTag)}
                  disabled={!newTag || tags.length >= 5}
                >
                  <Hash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="px-6 py-4 border-t bg-gray-50/50 dark:bg-gray-900/50">
            <div className="flex items-center justify-between">
              {/* Left Actions */}
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={images.length >= 4}
                >
                  <Camera className="w-4 h-4 mr-1" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4 mr-1" />
                  Feeling
                </Button>
              </div>

              {/* Privacy & Submit */}
              <div className="flex items-center gap-3">
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                  className="text-sm border rounded-lg px-3 py-1 bg-background"
                >
                  <option value="public">🌍 Public</option>
                  <option value="friends">👥 Friends</option>
                  <option value="private">🔒 Private</option>
                </select>
                <Button
                  onClick={handleSubmit}
                  disabled={!postContent.trim() && postType === 'text'}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Quick Tips</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Use @username to mention someone</li>
            <li>• Add #hashtags to make your post discoverable</li>
            <li>• Choose anonymous mode for confessions</li>
            <li>• Upload up to 4 images per post</li>
          </ul>
        </Card>
      </div>
    </PageLayout>
  );
}
