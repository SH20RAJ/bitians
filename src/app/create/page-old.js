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
  Music
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
    { id: 'poll', label: 'Poll', icon: BarChart3, color: 'text-orange-500' },
    { id: 'event', label: 'Event', icon: Calendar, color: 'text-pink-500' }
  ];

  const feelings = [
    'happy', 'excited', 'blessed', 'grateful', 'loved', 'amazing', 
    'wonderful', 'fantastic', 'proud', 'motivated', 'inspired',
    'sad', 'worried', 'stressed', 'confused', 'tired', 'sick'
  ];

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!postContent.trim() && postType === 'text') {
      showToast('Please write something to share!', 'error');
      return;
    }

    // Here you would typically send the data to your backend
    const postData = {
      content: postContent,
      type: postType,
      privacy,
      tags,
      location,
      feeling,
      images,
      pollOptions: postType === 'poll' ? pollOptions.filter(opt => opt.trim()) : [],
      eventDetails: postType === 'event' ? eventDetails : null,
      timestamp: new Date().toISOString()
    };

    console.log('Creating post:', postData);
    showToast('Post created successfully! 🎉', 'success');
    
    // Reset form
    setPostContent('');
    setPostType('text');
    setTags([]);
    setLocation('');
    setFeeling('');
    setImages([]);
    setPollOptions(['', '']);
    setEventDetails({ title: '', date: '', time: '', location: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold gradient-text">Create Post</h1>
          </div>
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Post
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl pb-20">
        <Card className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar size="md" />
            <div>
              <h3 className="font-semibold">Your Name</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPrivacy(privacy === 'public' ? 'friends' : privacy === 'friends' ? 'private' : 'public')}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {privacy === 'public' && <><Globe className="h-3 w-3" /> Public</>}
                  {privacy === 'friends' && <><Users className="h-3 w-3" /> Friends</>}
                  {privacy === 'private' && <><Lock className="h-3 w-3" /> Only me</>}
                </button>
              </div>
            </div>
          </div>

          {/* Post Type Selector */}
          <div className="flex flex-wrap gap-2">
            {postTypes.map(type => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  variant={postType === type.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPostType(type.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className={`h-4 w-4 ${type.color}`} />
                  {type.label}
                </Button>
              );
            })}
          </div>

          {/* Content Input */}
          <div className="space-y-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`What's on your mind? Share with the BIT community...`}
              className="w-full p-4 border rounded-lg resize-none bg-background min-h-[120px] text-lg placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={2000}
            />
            <div className="text-right text-sm text-muted-foreground">
              {postContent.length}/2000
            </div>
          </div>

          {/* Image Upload */}
          {postType === 'image' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Click to upload images</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Poll Creation */}
          {postType === 'poll' && (
            <div className="space-y-4">
              <h4 className="font-medium">Poll Options</h4>
              {pollOptions.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              ))}
              <Button
                variant="outline"
                onClick={handleAddPollOption}
                className="w-full"
                disabled={pollOptions.length >= 6}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option ({pollOptions.length}/6)
              </Button>
            </div>
          )}

          {/* Event Creation */}
          {postType === 'event' && (
            <div className="space-y-4">
              <h4 className="font-medium">Event Details</h4>
              <Input
                value={eventDetails.title}
                onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
                placeholder="Event title"
              />
              <div className="grid grid-cols-2 gap-4">
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

          {/* Additional Options */}
          <div className="space-y-4">
            {/* Feeling/Activity */}
            <div className="flex items-center gap-2">
              <Smile className="h-4 w-4 text-muted-foreground" />
              <select
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                className="bg-background border rounded px-3 py-1 text-sm"
              >
                <option value="">How are you feeling?</option>
                {feelings.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                className="flex-1"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Add tags (press Enter)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="flex-1"
                />
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                    >
                      #{tag}
                      <button onClick={() => handleRemoveTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Share Post
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
