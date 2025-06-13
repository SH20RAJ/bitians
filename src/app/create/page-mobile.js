'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import {
    Hash,
    Camera,
    Video,
    MapPin,
    Smile,
    Plus,
    X,
    BarChart3,
    Calendar,
    Users,
    Globe,
    Lock,
    UserCheck,
    Image as ImageIcon,
    FileText,
    Send,
    Paperclip,
    EyeOff,
    Gift,
    Mic
} from 'lucide-react';

export default function CreatePostPage() {
    const router = useRouter();
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
    const [newTag, setNewTag] = useState('');
    const [charCount, setCharCount] = useState(0);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const { toast } = useToast();

    const maxChars = 500;
    const currentUser = {
        name: 'Shaswat Raj',
        username: 'shaswatraj',
        avatar: 'SR',
        kBatch: 'K20'
    };

    const postTypes = [
        { id: 'text', label: 'Text', icon: Hash, color: 'text-blue-500', bg: 'bg-blue-50', description: 'Share your thoughts' },
        { id: 'image', label: 'Photo', icon: Camera, color: 'text-green-500', bg: 'bg-green-50', description: 'Upload photos' },
        { id: 'video', label: 'Video', icon: Video, color: 'text-purple-500', bg: 'bg-purple-50', description: 'Share videos' },
        { id: 'poll', label: 'Poll', icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-50', description: 'Ask a question' },
        { id: 'event', label: 'Event', icon: Calendar, color: 'text-pink-500', bg: 'bg-pink-50', description: 'Create an event' },
        { id: 'confession', label: 'Anonymous', icon: EyeOff, color: 'text-gray-500', bg: 'bg-gray-50', description: 'Post anonymously' },
        { id: 'marketplace', label: 'Sell', icon: Gift, color: 'text-yellow-500', bg: 'bg-yellow-50', description: 'Sell something' }
    ];

    const privacyOptions = [
        { id: 'public', label: 'Public', icon: Globe, description: 'Anyone can see this post' },
        { id: 'friends', label: 'Friends', icon: UserCheck, description: 'Only your friends can see' },
        { id: 'private', label: 'Only Me', icon: Lock, description: 'Only you can see this post' }
    ];

    const feelings = [
        '😊 Happy', '😔 Sad', '😍 Loved', '😤 Angry', '😎 Cool', 
        '🤔 Thoughtful', '😴 Tired', '🤩 Excited', '😌 Peaceful', '💪 Motivated'
    ];

    const handleContentChange = (e) => {
        const content = e.target.value;
        if (content.length <= maxChars) {
            setPostContent(content);
            setCharCount(content.length);
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length <= 4) {
            const newImages = files.map(file => ({
                id: Date.now() + Math.random(),
                file,
                url: URL.createObjectURL(file),
                name: file.name
            }));
            setImages([...images, ...newImages]);
        } else {
            toast({
                title: 'Too many images',
                description: 'You can upload maximum 4 images',
                type: 'error'
            });
        }
    };

    const handleRemoveImage = (imageId) => {
        const updatedImages = images.filter(img => img.id !== imageId);
        setImages(updatedImages);
    };

    const handlePollOptionChange = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => {
        if (pollOptions.length < 4) {
            setPollOptions([...pollOptions, '']);
        }
    };

    const removePollOption = (index) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = () => {
        if (!postContent.trim() && postType !== 'image') {
            toast({
                title: 'Content required',
                description: 'Please add some content to your post',
                type: 'error'
            });
            return;
        }

        if (postType === 'poll' && pollOptions.filter(opt => opt.trim()).length < 2) {
            toast({
                title: 'Poll options required',
                description: 'Please add at least 2 poll options',
                type: 'error'
            });
            return;
        }

        // Simulate post creation
        toast({
            title: 'Post created!',
            description: 'Your post has been shared with the community',
            type: 'success'
        });

        // Reset form
        setPostContent('');
        setImages([]);
        setPollOptions(['', '']);
        setEventDetails({ title: '', date: '', time: '', location: '' });
        setTags([]);
        setLocation('');
        setFeeling('');
        setCharCount(0);

        // Navigate back to feeds
        setTimeout(() => {
            router.push('/feeds');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background">
            <MobileHeader title="Create Post" showSearch={false} />
            
            {/* Main Content */}
            <div className="px-4 py-4 pb-24">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                            {currentUser.avatar}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{isAnonymous ? 'Anonymous' : currentUser.name}</h3>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                                {currentUser.kBatch}
                            </Badge>
                            <select
                                value={privacy}
                                onChange={(e) => setPrivacy(e.target.value)}
                                className="text-xs bg-transparent border-none text-muted-foreground"
                            >
                                {privacyOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Post Type Selection */}
                <div className="mb-4">
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">What do you want to share?</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {postTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setPostType(type.id)}
                                className={`p-3 rounded-xl border-2 transition-all text-left ${
                                    postType === type.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                        : 'border-border hover:border-muted-foreground/50'
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <type.icon className={`w-4 h-4 ${type.color}`} />
                                    <span className="font-medium text-sm">{type.label}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{type.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Input */}
                <div className="mb-4">
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            value={postContent}
                            onChange={handleContentChange}
                            placeholder={
                                postType === 'poll' ? "Ask a question..." :
                                postType === 'event' ? "What's happening at your event?" :
                                postType === 'confession' ? "Share anonymously..." :
                                "What's on your mind?"
                            }
                            className="w-full min-h-[120px] p-4 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                            autoFocus
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                            {charCount}/{maxChars}
                        </div>
                    </div>
                </div>

                {/* Anonymous Toggle */}
                {postType === 'confession' && (
                    <div className="mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                className="rounded"
                            />
                            <span className="text-sm">Post anonymously</span>
                        </label>
                    </div>
                )}

                {/* Poll Options */}
                {postType === 'poll' && (
                    <Card className="mb-4">
                        <CardContent className="p-4">
                            <h4 className="font-medium mb-3 text-sm">Poll Options</h4>
                            <div className="space-y-2">
                                {pollOptions.map((option, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                            className="flex-1 h-10"
                                        />
                                        {pollOptions.length > 2 && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10"
                                                onClick={() => removePollOption(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {pollOptions.length < 4 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addPollOption}
                                    className="mt-2 w-full"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Option
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Event Details */}
                {postType === 'event' && (
                    <Card className="mb-4">
                        <CardContent className="p-4">
                            <h4 className="font-medium mb-3 text-sm">Event Details</h4>
                            <div className="space-y-3">
                                <Input
                                    placeholder="Event title"
                                    value={eventDetails.title}
                                    onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
                                />
                                <div className="grid grid-cols-2 gap-2">
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
                                    placeholder="Event location"
                                    value={eventDetails.location}
                                    onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Image Upload */}
                {(postType === 'image' || postType === 'text' || postType === 'marketplace') && (
                    <div className="mb-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {images.map((image) => (
                                    <div key={image.id} className="relative group">
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(image.id)}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="w-4 h-4 mr-2" />
                            Add Photos ({images.length}/4)
                        </Button>
                    </div>
                )}

                {/* Tags */}
                <Card className="mb-4">
                    <CardContent className="p-4">
                        <h4 className="font-medium mb-3 text-sm">Tags</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-1 hover:text-red-500"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add tag..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                className="flex-1 h-9"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAddTag}
                                className="h-9"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {tags.length}/5 tags
                        </p>
                    </CardContent>
                </Card>

                {/* Additional Options */}
                <Card className="mb-4">
                    <CardContent className="p-4">
                        <h4 className="font-medium mb-3 text-sm">Additional Options</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Add location..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="flex-1 h-9"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Smile className="w-4 h-4 text-muted-foreground" />
                                <select
                                    value={feeling}
                                    onChange={(e) => setFeeling(e.target.value)}
                                    className="flex-1 h-9 px-3 border border-border rounded-md bg-background"
                                >
                                    <option value="">How are you feeling?</option>
                                    {feelings.map((feel) => (
                                        <option key={feel} value={feel}>{feel}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Fixed Bottom Actions */}
            <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t">
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={!postContent.trim() && postType !== 'image'}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Post
                    </Button>
                </div>
            </div>
            
            <BottomNavigation currentPage="create" />
        </div>
    );
}
