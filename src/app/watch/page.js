'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { MediaPlayer } from '@/components/ui/MediaPlayer';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { RichText } from '@/components/ui/RichText';
import { useToast } from '@/components/Toast';
import {
    Search,
    Filter,
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    MoreVertical,
    Play,
    TrendingUp,
    Clock,
    Eye,
    Users,
    BookOpen,
    Code,
    Camera,
    Music,
    Gamepad2,
    Coffee,
    Star
} from 'lucide-react';

export default function WatchPage() {
    const [videos, setVideos] = useState([
        {
            id: 1,
            title: 'Campus Tour: BIT Mesra Highlights',
            author: 'Raj Kumar',
            avatar: 'RK',
            kBatch: 'K22',
            time: '2h',
            views: 1250,
            likes: 89,
            comments: 23,
            shares: 15,
            duration: '5:32',
            description: 'A complete tour of BIT Mesra campus showing all the important places every BITian should know! From the main gate to the hostels, library, and the beautiful lake. #campus #bitmesra #tour',
            category: 'Campus Life',
            branch: 'CSE',
            year: '3rd Year',
            verified: true,
            media: {
                type: 'video',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=450&fit=crop',
                caption: 'BIT Mesra Campus Tour - Complete Guide'
            },
            tags: ['campus', 'tour', 'bitmesra', 'guide']
        },
        {
            id: 2,
            title: 'Data Structures Tutorial: Trees Explained',
            author: 'Priya Sharma',
            avatar: 'PS',
            kBatch: 'K21',
            time: '4h',
            views: 3400,
            likes: 234,
            comments: 67,
            shares: 45,
            duration: '15:24',
            description: 'Complete explanation of Tree data structures with examples and code implementation. Perfect for placements and semester exams! #DSA #programming #trees #coding',
            category: 'Academic',
            branch: 'CSE',
            year: '4th Year',
            verified: true,
            media: {
                type: 'video',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
                caption: 'Data Structures: Trees Tutorial'
            },
            tags: ['dsa', 'programming', 'trees', 'tutorial', 'coding']
        },
        {
            id: 3,
            title: 'Hostel Life Vlog: A Day in BIT Mesra',
            author: 'Arjun Verma',
            avatar: 'AV',
            kBatch: 'K23',
            time: '1d',
            views: 892,
            likes: 156,
            comments: 34,
            shares: 28,
            duration: '8:45',
            description: 'Follow me through a typical day in BIT Mesra hostel! From morning routine to late night study sessions. Real hostel life experience! #hostellife #vlog #bitmesra #student',
            category: 'Lifestyle',
            branch: 'ECE',
            year: '2nd Year',
            verified: false,
            media: {
                type: 'video',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=450&fit=crop',
                caption: 'Hostel Life Vlog - A Day in BIT Mesra'
            },
            tags: ['hostel', 'vlog', 'lifestyle', 'student', 'daily']
        },
        {
            id: 4,
            title: 'Placement Interview Experience: Goldman Sachs',
            author: 'Neha Gupta',
            avatar: 'NG',
            kBatch: 'K20',
            time: '3d',
            views: 5600,
            likes: 445,
            comments: 123,
            shares: 89,
            duration: '12:18',
            description: 'My complete placement interview experience at Goldman Sachs. Technical rounds, HR questions, and tips for success! Must watch for final year students. #placement #interview #goldmansachs #career',
            category: 'Career',
            branch: 'CSE',
            year: 'Alumni',
            verified: true,
            media: {
                type: 'video',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
                caption: 'Goldman Sachs Interview Experience'
            },
            tags: ['placement', 'interview', 'career', 'tips', 'experience']
        },
        {
            id: 5,
            title: 'Tech Fest 2024: Behind the Scenes',
            author: 'Tech Team BIT',
            avatar: 'TB',
            kBatch: 'Official',
            time: '1w',
            views: 2300,
            likes: 198,
            comments: 56,
            shares: 67,
            duration: '9:33',
            description: 'Exclusive behind the scenes footage from Tech Fest 2024! See how the biggest technical event of BIT Mesra was organized. #techfest #events #bitmesra #technical',
            category: 'Events',
            branch: 'Official',
            year: 'Community',
            verified: true,
            media: {
                type: 'video',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
                caption: 'Tech Fest 2024 - Behind the Scenes'
            },
            tags: ['techfest', 'events', 'technical', 'fest', 'college']
        },
        {
            id: 6,
            title: 'Coding Competition Prep: Dynamic Programming',
            author: 'Rohit Singh',
            avatar: 'RS',
            kBatch: 'K22',
            time: '5d',
            views: 1890,
            likes: 167,
            comments: 45,
            shares: 32,
            duration: '18:42',
            description: 'Master Dynamic Programming for coding competitions! Step by step approach with examples and practice problems. Perfect for ACM ICPC and other contests. #dp #coding #competitive #programming',
            category: 'Programming',
            branch: 'CSE',
            year: '3rd Year',
            verified: true,
            media: {
                type: 'video',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
                caption: 'Dynamic Programming Tutorial'
            },
            tags: ['dp', 'coding', 'competitive', 'programming', 'tutorial']
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [showFilters, setShowFilters] = useState(false);
    const [likedVideos, setLikedVideos] = useState(new Set());
    const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set());
    const { toast } = useToast();

    const categories = [
        { id: 'academic', name: 'Academic', icon: BookOpen, color: 'text-blue-500' },
        { id: 'campus', name: 'Campus Life', icon: Users, color: 'text-green-500' },
        { id: 'career', name: 'Career', icon: TrendingUp, color: 'text-purple-500' },
        { id: 'programming', name: 'Programming', icon: Code, color: 'text-orange-500' },
        { id: 'lifestyle', name: 'Lifestyle', icon: Coffee, color: 'text-pink-500' },
        { id: 'events', name: 'Events', icon: Camera, color: 'text-red-500' }
    ];

    const filteredVideos = videos.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' ||
            video.category.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'popular': return b.views - a.views;
            case 'liked': return b.likes - a.likes;
            case 'discussed': return b.comments - a.comments;
            default: return 0; // recent (already in order)
        }
    });

    const handleLike = (videoId) => {
        const newLiked = new Set(likedVideos);
        if (newLiked.has(videoId)) {
            newLiked.delete(videoId);
            toast({
                title: 'Unliked',
                description: 'Video removed from your likes',
                type: 'info',
                duration: 2000,
            });
        } else {
            newLiked.add(videoId);
            toast({
                title: 'Liked! ❤️',
                description: 'Video added to your likes',
                type: 'success',
                duration: 2000,
            });
        }
        setLikedVideos(newLiked);
    };

    const handleBookmark = (videoId) => {
        const newBookmarked = new Set(bookmarkedVideos);
        if (newBookmarked.has(videoId)) {
            newBookmarked.delete(videoId);
            toast({
                title: 'Bookmark removed',
                description: 'Video removed from your watchlist',
                type: 'info',
                duration: 2000,
            });
        } else {
            newBookmarked.add(videoId);
            toast({
                title: 'Bookmarked! 🔖',
                description: 'Video added to your watchlist',
                type: 'success',
                duration: 2000,
            });
        }
        setBookmarkedVideos(newBookmarked);
    };

    const handleShare = (video) => {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: video.description,
                url: `${window.location.origin}/watch/${video.id}`,
            });
        } else {
            navigator.clipboard.writeText(`${window.location.origin}/watch/${video.id}`);
            toast({
                title: 'Link copied! 📋',
                description: 'Video link copied to clipboard',
                type: 'success',
                duration: 2000,
            });
        }
    };

    const getCategoryIcon = (category) => {
        const cat = categories.find(c => category.toLowerCase().includes(c.name.toLowerCase()));
        return cat ? { icon: cat.icon, color: cat.color } : { icon: Play, color: 'text-gray-500' };
    };

    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        BIT Watch
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Discover and watch videos from the BIT community
                    </p>
                </div>

                {/* Search and Controls */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                placeholder="Search videos, channels, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={showFilters ? "default" : "outline"}
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2"
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <Card className="p-4 space-y-4 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full p-2 border rounded-lg bg-background"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Sort By</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full p-2 border rounded-lg bg-background"
                                    >
                                        <option value="recent">Most Recent</option>
                                        <option value="popular">Most Viewed</option>
                                        <option value="liked">Most Liked</option>
                                        <option value="discussed">Most Discussed</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setSortBy('recent');
                                            setSearchTerm('');
                                        }}
                                        className="w-full"
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Category Quick Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedCategory === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory('all')}
                            className="rounded-full"
                        >
                            All
                        </Button>
                        {categories.map(category => {
                            const Icon = category.icon;
                            return (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="rounded-full flex items-center gap-1"
                                >
                                    <Icon className={`h-3 w-3 ${category.color}`} />
                                    {category.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map(video => {
                        const categoryInfo = getCategoryIcon(video.category);
                        const CategoryIcon = categoryInfo.icon;

                        return (
                            <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
                                {/* Video Thumbnail */}
                                <div className="relative aspect-video bg-muted">
                                    <MediaPlayer
                                        media={video.media}
                                        className="w-full h-full"
                                        showControls={false}
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                            <Play className="w-8 h-8 text-black ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                </div>

                                {/* Video Info */}
                                <div className="p-4">
                                    {/* Header */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <Avatar className="w-10 h-10">
                                            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                {video.avatar}
                                            </div>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                                {video.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{video.author}</span>
                                                {video.verified && (
                                                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-xs text-white">✓</span>
                                                    </div>
                                                )}
                                                <KBatchBadge kBatch={video.kBatch} size="xs" />
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="w-6 h-6">
                                            <MoreVertical className="w-3 h-3" />
                                        </Button>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {video.views.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {video.time}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CategoryIcon className={`w-3 h-3 ${categoryInfo.color}`} />
                                            {video.category}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-3">
                                        <RichText
                                            content={video.description}
                                            className="text-xs text-muted-foreground line-clamp-2"
                                            onHashtagClick={(hashtag) => {
                                                setSearchTerm(hashtag);
                                            }}
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {video.tags.slice(0, 3).map(tag => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                                onClick={() => setSearchTerm(tag)}
                                            >
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleLike(video.id)}
                                                className={`flex items-center gap-1 text-xs transition-colors ${likedVideos.has(video.id)
                                                        ? 'text-red-500 hover:text-red-600'
                                                        : 'text-muted-foreground hover:text-red-500'
                                                    }`}
                                            >
                                                <Heart className={`h-3 w-3 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                                                <span>{video.likes + (likedVideos.has(video.id) ? 1 : 0)}</span>
                                            </button>

                                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-500 transition-colors">
                                                <MessageCircle className="h-3 w-3" />
                                                <span>{video.comments}</span>
                                            </button>

                                            <button
                                                onClick={() => handleShare(video)}
                                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-green-500 transition-colors"
                                            >
                                                <Share2 className="h-3 w-3" />
                                                <span>{video.shares}</span>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleBookmark(video.id)}
                                            className={`transition-colors ${bookmarkedVideos.has(video.id)
                                                    ? 'text-yellow-500'
                                                    : 'text-muted-foreground hover:text-yellow-500'
                                                }`}
                                        >
                                            <Bookmark className={`h-4 w-4 ${bookmarkedVideos.has(video.id) ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {filteredVideos.length === 0 && (
                    <div className="text-center py-12">
                        <Play className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No videos found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}

                {/* Trending Topics */}
                <Card className="mt-8 p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        Trending Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['dsa', 'placement', 'campus', 'coding', 'hostel', 'techfest', 'tutorial', 'vlog'].map(tag => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                onClick={() => setSearchTerm(tag)}
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                </Card>
            </div>
        </PageLayout>
    );
}
