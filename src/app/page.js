'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import {
    Heart,
    MessageCircle,
    Share2,
    BookOpen,
    Users,
    Calendar,
    MapPin,
    Trophy,
    Sparkles,
    Sun,
    Moon,
    Search,
    Bell,
    Settings,
    Plus,
    Home,
    User,
    ShoppingBag,
    GraduationCap,
    Coffee,
    Zap,
    Star,
    Bookmark,
    MoreHorizontal,
    TrendingUp,
} from 'lucide-react';

export default function HomePage() {
    const { theme, toggleTheme } = useTheme();
    const { toast } = useToast();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

    useEffect(() => {
        setIsLoaded(true);
        // Welcome toast
        setTimeout(() => {
            toast({
                title: 'Welcome to BITians.org! 🎉',
                description: 'Connect with your fellow BIT Mesra students',
                type: 'success',
            });
        }, 1000);
    }, [toast]);

    const handleLike = (postId) => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(postId)) {
            newLiked.delete(postId);
            toast({
                title: 'Unliked',
                description: 'Post removed from your likes',
                type: 'info',
                duration: 2000,
            });
        } else {
            newLiked.add(postId);
            toast({
                title: 'Liked! ❤️',
                description: 'Post added to your likes',
                type: 'success',
                duration: 2000,
            });
        }
        setLikedPosts(newLiked);
    };

    const handleBookmark = (postId) => {
        const newBookmarked = new Set(bookmarkedPosts);
        if (newBookmarked.has(postId)) {
            newBookmarked.delete(postId);
            toast({
                title: 'Bookmark removed',
                description: 'Post removed from your bookmarks',
                type: 'info',
                duration: 2000,
            });
        } else {
            newBookmarked.add(postId);
            toast({
                title: 'Bookmarked! 🔖',
                description: 'Post saved to your bookmarks',
                type: 'success',
                duration: 2000,
            });
        }
        setBookmarkedPosts(newBookmarked);
    };

    const handleShare = (post) => {
        if (navigator.share) {
            navigator.share({
                title: `${post.author}'s post on BITians.org`,
                text: post.content,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
                title: 'Link copied! 📋',
                description: 'Post link copied to clipboard',
                type: 'success',
                duration: 2000,
            });
        }
    };

    const featuredPosts = [
        {
            id: 1,
            author: 'Arjun Sharma',
            avatar: 'AS',
            time: '2h',
            content: 'Just aced my Data Structures exam! 🎉 Thanks to the amazing study group we formed last week. Collaboration really works!',
            likes: 42,
            comments: 8,
            branch: 'CSE',
            year: '2nd Year',
            verified: true
        },
        {
            id: 2,
            author: 'Photography Club',
            avatar: 'PC',
            time: '3h',
            content: '🔥 New post in Photography Circle! Check out this stunning sunset shot from the hostel terrace. Join our circle for daily photo challenges and tips! #BitPhotography',
            likes: 67,
            comments: 23,
            branch: 'Circle',
            year: 'Community',
            verified: true,
            isCirclePost: true
        },
        {
            id: 3,
            author: 'Priya Mehta',
            avatar: 'PM',
            time: '4h',
            content: 'Anyone interested in a weekend trek to Hundru Falls? Looking for adventure buddies! 🏔️',
            likes: 28,
            comments: 15,
            branch: 'ECE',
            year: '3rd Year',
            verified: false
        },
        {
            id: 4,
            author: 'Rahul Singh',
            avatar: 'RS',
            time: '6h',
            content: 'Selling my Java programming books - perfect condition! Great for semester prep. DM if interested 📚',
            likes: 19,
            comments: 5,
            branch: 'IT',
            year: '4th Year',
            verified: true
        }
    ];

    const quickActions = [
        { icon: Users, label: 'Circles', color: 'text-indigo-500', bg: 'bg-indigo-500/10', action: () => window.location.href = '/circles' },
        { icon: GraduationCap, label: 'Study Groups', color: 'text-blue-500', bg: 'bg-blue-500/10', action: () => window.location.href = '/study-groups' },
        { icon: BookOpen, label: 'Notes Share', color: 'text-emerald-500', bg: 'bg-emerald-500/10', action: () => window.location.href = '/notes' },
        { icon: ShoppingBag, label: 'BitMart', color: 'text-purple-500', bg: 'bg-purple-500/10', action: () => window.location.href = '/bitmart' },
        { icon: Calendar, label: 'Events', color: 'text-orange-500', bg: 'bg-orange-500/10', action: () => window.location.href = '/events' },
        { icon: MapPin, label: 'Lost & Found', color: 'text-red-500', bg: 'bg-red-500/10', action: () => window.location.href = '/lost-found' },
        { icon: Coffee, label: 'Confessions', color: 'text-pink-500', bg: 'bg-pink-500/10', action: () => window.location.href = '/confessions' },
    ];

    const stats = [
        { label: 'Active Students', value: '2.5K+', icon: Users },
        { label: 'Study Groups', value: '150+', icon: BookOpen },
        { label: 'Events This Month', value: '25+', icon: Calendar },
        { label: 'Notes Shared', value: '500+', icon: GraduationCap },
    ];

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32 mx-auto animate-pulse"></div>
                        <p className="text-sm text-muted-foreground">Loading BITians.org...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 glass border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center float">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold gradient-text">BITians.org</span>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-lg mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search students, groups, events..."
                                    className="pl-10 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:flex bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 btn-scale"
                                onClick={() => window.location.href = '/feeds'}
                            >
                                <TrendingUp className="w-4 h-4 mr-1" />
                                Feeds
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:flex bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-0 btn-scale"
                                onClick={() => window.location.href = '/hot-or-not'}
                            >
                                <Zap className="w-4 h-4 mr-1" />
                                Hot or Not
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 btn-scale"
                                onClick={() => window.location.href = '/create'}
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Create
                            </Button>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center pulse-slow">
                                    <span className="text-xs text-white">3</span>
                                </div>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={toggleTheme} className="btn-scale">
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </Button>
                            <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">SR</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <Card className="glass card-hover">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative">
                                        <Avatar className="w-20 h-20">
                                            <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">SR</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <h3 className="font-semibold">Shaswat Raj</h3>
                                            <Badge variant="gradient" className="text-xs">
                                                <Star className="w-3 h-3 mr-1" />
                                                Pro
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">CSE • 4th Year</p>
                                        <div className="flex items-center justify-center space-x-2 mt-2">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            <span className="text-sm">Level 12</span>
                                            <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                                                <div className="w-3/4 h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="glass card-hover">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <Zap className="w-5 h-5 text-yellow-500" />
                                    <span>Quick Actions</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                    {quickActions.map((action, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className="h-auto p-3 flex-col space-y-2 hover:scale-105 transition-transform btn-scale"
                                            onClick={action.action}
                                        >
                                            <div className={`p-2 rounded-lg ${action.bg} shimmer`}>
                                                <action.icon className={`w-5 h-5 ${action.color}`} />
                                            </div>
                                            <span className="text-xs">{action.label}</span>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats */}
                        <Card className="glass card-hover">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <span>Community Stats</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <stat.icon className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm">{stat.label}</span>
                                        </div>
                                        <Badge variant="secondary" className="font-semibold">
                                            {stat.value}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Create Post - Facebook Style */}
                        <Card className="glass card-hover">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <Avatar>
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">SR</AvatarFallback>
                                    </Avatar>
                                    <Input
                                        placeholder="What's on your mind?"
                                        className="flex-1 bg-secondary/50 border-0 focus-ring cursor-pointer"
                                        onClick={() => window.location.href = '/create'}
                                        readOnly
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center space-x-2 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950/20"
                                            onClick={() => window.location.href = '/create'}
                                        >
                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                                <span className="text-green-600 text-sm">📷</span>
                                            </div>
                                            <span className="text-sm font-medium">Photo</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/20"
                                            onClick={() => window.location.href = '/create'}
                                        >
                                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                                <span className="text-blue-600 text-sm">🎥</span>
                                            </div>
                                            <span className="text-sm font-medium">Video</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center space-x-2 hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-yellow-950/20"
                                            onClick={() => window.location.href = '/create'}
                                        >
                                            <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                                                <span className="text-yellow-600 text-sm">😊</span>
                                            </div>
                                            <span className="text-sm font-medium">Feeling</span>
                                        </Button>
                                    </div>
                                    <Button
                                        onClick={() => window.location.href = '/create'}
                                        size="sm"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Post
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Posts */}
                        <div className="space-y-4">
                            {featuredPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    className={`glass hover:shadow-lg transition-all duration-300 card-hover cursor-pointer ${post.isCirclePost ? 'border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/10 dark:to-purple-950/10' : ''
                                        }`}
                                    onClick={() => window.location.href = `/post/${post.id}`}
                                >
                                    <CardContent className="p-6">
                                        {/* Circle Post Header */}
                                        {post.isCirclePost && (
                                            <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-indigo-200 dark:border-indigo-800">
                                                <Users className="w-4 h-4 text-indigo-500" />
                                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Circle Post</span>
                                                <Badge className="bg-indigo-500 text-white text-xs">
                                                    Featured
                                                </Badge>
                                            </div>
                                        )}

                                        {/* Post Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarFallback className={`text-white ${post.isCirclePost
                                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                        }`}>
                                                        {post.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-semibold">{post.author}</h4>
                                                        {post.verified && (
                                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                                <span className="text-xs text-white">✓</span>
                                                            </div>
                                                        )}
                                                        <Badge variant="outline" className={`text-xs ${post.isCirclePost ? 'border-indigo-300 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400' : ''
                                                            }`}>
                                                            {post.branch}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                        <span>{post.year}</span>
                                                        <span>•</span>
                                                        <span>{post.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Post Content */}
                                        <p className="mb-4 leading-relaxed">{post.content}</p>

                                        {/* Post Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                            <div className="flex items-center space-x-6">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`transition-colors btn-scale ${likedPosts.has(post.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleLike(post.id);
                                                    }}
                                                >
                                                    <Heart className={`w-4 h-4 mr-2 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 btn-scale" onClick={(e) => e.stopPropagation()}>
                                                    <MessageCircle className="w-4 h-4 mr-2" />
                                                    {post.comments}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-muted-foreground hover:text-green-500 btn-scale"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleShare(post);
                                                    }}
                                                >
                                                    <Share2 className="w-4 h-4 mr-2" />
                                                    Share
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`btn-scale ${bookmarkedPosts.has(post.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookmark(post.id);
                                                }}
                                            >
                                                <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                            </Button>
                                        </div>

                                        {/* Circle Post Action */}
                                        {post.isCirclePost && (
                                            <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm text-muted-foreground">
                                                        💡 This post is from a Circle community
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 btn-scale"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.location.href = '/circles';
                                                        }}
                                                    >
                                                        <Users className="w-3 h-3 mr-1" />
                                                        Join Circle
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Trending */}
                        <Card className="glass card-hover">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <Zap className="w-5 h-5 text-yellow-500" />
                                    <span>Trending</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                {['#TechFest2024', '#PlacementPrep', '#HostelLife'].map((trend, index) => (
                                    <div key={index} className="p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer shimmer">
                                        <h4 className="font-medium text-sm">{trend}</h4>
                                        <p className="text-xs text-muted-foreground">{250 - index * 30} posts</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Featured Circles */}
                        <Card className="glass card-hover bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <Users className="w-5 h-5 text-indigo-500" />
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Popular Circles</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                <div className="space-y-3">
                                    {[
                                        { name: 'CSE 2022 Batch', members: '156', category: 'Academic', color: 'from-blue-500 to-cyan-500' },
                                        { name: 'Photography Club', members: '89', category: 'Hobby', color: 'from-purple-500 to-pink-500' },
                                        { name: 'Placement Prep', members: '234', category: 'Career', color: 'from-green-500 to-emerald-500' }
                                    ].map((circle, index) => (
                                        <div key={index} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors cursor-pointer border border-white/20">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-8 h-8 bg-gradient-to-r ${circle.color} rounded-full flex items-center justify-center`}>
                                                        <Users className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm">{circle.name}</h4>
                                                        <p className="text-xs text-muted-foreground">{circle.members} members • {circle.category}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    Join
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 btn-scale"
                                    onClick={() => window.location.href = '/circles'}
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    Browse All Circles
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation currentPage="home" />
        </div>
    );
}