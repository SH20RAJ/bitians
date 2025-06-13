'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import MobileHamburgerMenu from '@/components/MobileHamburgerMenu';
import {
    ArrowLeft,
    Image as ImageIcon,
    Video,
    Mic,
    MapPin,
    Smile,
    Hash,
    AtSign,
    Calendar,
    Users,
    Eye,
    EyeOff,
    Star,
    Gift,
    BarChart3,
    Camera,
    X,
    Upload,
    Plus,
    Sparkles,
    Globe,
    Lock,
    UserCheck,
    Crown
} from 'lucide-react';

export default function CreatePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [content, setContent] = useState('');
    const [selectedPostType, setSelectedPostType] = useState('text');
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [privacy, setPrivacy] = useState('public');
    const [location, setLocation] = useState('');
    const [feeling, setFeeling] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [eventDetails, setEventDetails] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
    });
    const fileInputRef = useRef(null);

    const currentUser = {
        name: 'Shaswat Raj',
        username: 'shaswatraj',
        kBatch: 'K20',
        avatar: 'SR',
        verified: true
    };

    const postTypes = [
        { id: 'text', label: 'Text Post', icon: Hash, description: 'Share your thoughts' },
        { id: 'image', label: 'Photo', icon: ImageIcon, description: 'Share photos' },
        { id: 'video', label: 'Video', icon: Video, description: 'Share videos' },
        { id: 'poll', label: 'Poll', icon: BarChart3, description: 'Ask for opinions' },
        { id: 'event', label: 'Event', icon: Calendar, description: 'Create an event' },
        { id: 'confession', label: 'Confession', icon: EyeOff, description: 'Anonymous post' },
        { id: 'achievement', label: 'Achievement', icon: Star, description: 'Share your wins' },
        { id: 'marketplace', label: 'Sell Item', icon: Gift, description: 'List items for sale' }
    ];

    const privacyOptions = [
        { id: 'public', label: 'Public', icon: Globe, description: 'Everyone can see' },
        { id: 'friends', label: 'Friends', icon: UserCheck, description: 'Only friends' },
        { id: 'private', label: 'Private', icon: Lock, description: 'Only you' }
    ];

    const feelings = [
        '😊 Happy', '😔 Sad', '😍 Excited', '😴 Tired', '🤔 Thoughtful',
        '😎 Cool', '🤗 Grateful', '😰 Stressed', '🔥 Motivated', '🎉 Celebrating'
    ];

    const handleMediaUpload = (event) => {
        const files = Array.from(event.target.files);
        const newMedia = files.map(file => ({
            id: Date.now() + Math.random(),
            file,
            url: URL.createObjectURL(file),
            type: file.type.startsWith('image/') ? 'image' : 'video'
        }));
        setSelectedMedia([...selectedMedia, ...newMedia]);
    };

    const removeMedia = (mediaId) => {
        setSelectedMedia(selectedMedia.filter(media => media.id !== mediaId));
    };

    const addPollOption = () => {
        if (pollOptions.length < 6) {
            setPollOptions([...pollOptions, '']);
        }
    };

    const updatePollOption = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const removePollOption = (index) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = () => {
        if (!content.trim() && selectedMedia.length === 0) {
            toast({
                title: 'Content Required',
                description: 'Please add some content to your post',
                type: 'error',
                duration: 3000,
            });
            return;
        }

        // Simulate post creation
        toast({
            title: 'Post Created!',
            description: 'Your post has been shared successfully',
            type: 'success',
            duration: 3000,
        });

        // Reset form
        setContent('');
        setSelectedMedia([]);
        setIsAnonymous(false);
        setPrivacy('public');
        setLocation('');
        setFeeling('');
        setPollOptions(['', '']);
        setEventDetails({ title: '', date: '', time: '', location: '', description: '' });

        // Navigate back to feeds
        router.push('/feeds');
    };

    const renderPostTypeSpecificContent = () => {
        switch (selectedPostType) {
            case 'poll':
                return (
                    <Card className="mt-4">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Poll Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {pollOptions.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        placeholder={`Option ${index + 1}`}
                                        value={option}
                                        onChange={(e) => updatePollOption(index, e.target.value)}
                                        className="flex-1"
                                    />
                                    {pollOptions.length > 2 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removePollOption(index)}
                                            className="h-8 w-8"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {pollOptions.length < 6 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addPollOption}
                                    className="w-full h-8"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Option
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                );

            case 'event':
                return (
                    <Card className="mt-4">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Event Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Input
                                placeholder="Event title"
                                value={eventDetails.title}
                                onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
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
                                placeholder="Event location"
                                value={eventDetails.location}
                                onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})}
                            />
                        </CardContent>
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Header */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="h-9 w-9"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-lg font-semibold">Create Post</h1>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={!content.trim() && selectedMedia.length === 0}
                        className="h-9 px-4 bg-blue-600 hover:bg-blue-700"
                    >
                        Share
                    </Button>
                </div>
            </div>

            <div className="px-4 py-4 space-y-4 pb-20">
                {/* Post Type Selection */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Post Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            {postTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            setSelectedPostType(type.id);
                                            if (type.id === 'confession') {
                                                setIsAnonymous(true);
                                            } else {
                                                setIsAnonymous(false);
                                            }
                                        }}
                                        className={`p-3 rounded-lg border transition-all ${
                                            selectedPostType === type.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon className={`w-4 h-4 ${
                                                selectedPostType === type.id ? 'text-blue-600' : 'text-gray-500'
                                            }`} />
                                            <span className={`text-sm font-medium ${
                                                selectedPostType === type.id ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                                            }`}>
                                                {type.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">{type.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* User Info */}
                {!isAnonymous && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback className="text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500">
                                        {currentUser.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{currentUser.name}</span>
                                        {currentUser.verified && (
                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-xs text-white">✓</span>
                                            </div>
                                        )}
                                        <Crown className="w-4 h-4 text-yellow-500" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <KBatchBadge kBatch={currentUser.kBatch} size="sm" />
                                        <Badge variant="secondary" className="text-xs">
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            Level 12
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Main Content */}
                <Card>
                    <CardContent className="p-4">
                        <textarea
                            placeholder={
                                selectedPostType === 'confession' 
                                    ? "Share anonymously... What's on your mind?" 
                                    : selectedPostType === 'achievement'
                                    ? "Share your achievement with the community!"
                                    : "What's happening at BIT today?"
                            }
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            rows={4}
                        />

                        {/* Character Count */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-8 w-8"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setLocation(location ? '' : 'BIT Mesra')}
                                    className={`h-8 w-8 ${location ? 'text-blue-600' : ''}`}
                                >
                                    <MapPin className="w-4 h-4" />
                                </Button>
                                <select
                                    value={feeling}
                                    onChange={(e) => setFeeling(e.target.value)}
                                    className="text-sm border rounded px-2 py-1 bg-background"
                                >
                                    <option value="">😊 Feeling</option>
                                    {feelings.map(feeling => (
                                        <option key={feeling} value={feeling}>{feeling}</option>
                                    ))}
                                </select>
                            </div>
                            <span className={`text-xs ${content.length > 280 ? 'text-red-500' : 'text-gray-500'}`}>
                                {content.length}/300
                            </span>
                        </div>

                        {/* Location Display */}
                        {location && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{location}</span>
                                <button
                                    onClick={() => setLocation('')}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        {/* Feeling Display */}
                        {feeling && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <span>Feeling {feeling}</span>
                                <button
                                    onClick={() => setFeeling('')}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Media Preview */}
                {selectedMedia.length > 0 && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-3">
                                {selectedMedia.map((media) => (
                                    <div key={media.id} className="relative rounded-lg overflow-hidden">
                                        {media.type === 'image' ? (
                                            <img
                                                src={media.url}
                                                alt="Preview"
                                                className="w-full h-32 object-cover"
                                            />
                                        ) : (
                                            <video
                                                src={media.url}
                                                className="w-full h-32 object-cover"
                                                controls
                                            />
                                        )}
                                        <button
                                            onClick={() => removeMedia(media.id)}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Post Type Specific Content */}
                {renderPostTypeSpecificContent()}

                {/* Privacy Settings */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Privacy & Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                            {privacyOptions.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => setPrivacy(option.id)}
                                        className={`p-2 rounded-lg border text-center transition-all ${
                                            privacy === option.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                                : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 mx-auto mb-1 ${
                                            privacy === option.id ? 'text-blue-600' : 'text-gray-500'
                                        }`} />
                                        <div className={`text-xs font-medium ${
                                            privacy === option.id ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                                        }`}>
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-gray-500">{option.description}</div>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedPostType !== 'confession' && (
                            <div className="flex items-center justify-between pt-2 border-t">
                                <div>
                                    <div className="text-sm font-medium">Post Anonymously</div>
                                    <div className="text-xs text-gray-500">Hide your identity</div>
                                </div>
                                <button
                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                    className={`w-12 h-6 rounded-full transition-colors ${
                                        isAnonymous ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                        isAnonymous ? 'translate-x-6' : 'translate-x-0.5'
                                    }`} />
                                </button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
            />

            <BottomNavigation currentPage="create" />
        </div>
    );
}