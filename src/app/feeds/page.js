"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { MediaPlayer, MediaGrid } from "@/components/ui/MediaPlayer";
import { KBatchBadge } from "@/components/ui/KBatchBadge";
import { RichText } from "@/components/ui/RichText";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/components/Toast";
import BottomNavigation from "@/components/BottomNavigation";
import {
    Heart,
    MessageCircle,
    Share2,
    BookOpen,
    Users,
    Calendar,
    MapPin,
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
    ArrowLeft,
    Flame,
    TrendingUp,
    Filter,
    Sun,
    Moon,
} from "lucide-react";

export default function FeedsPage() {
    const { theme, toggleTheme } = useTheme();
    const { toast } = useToast();
    const [isLoaded, setIsLoaded] = useState(false);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleLike = (postId) => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(postId)) {
            newLiked.delete(postId);
            toast({
                title: "Unliked",
                description: "Post removed from your likes",
                type: "info",
                duration: 2000,
            });
        } else {
            newLiked.add(postId);
            toast({
                title: "Liked! ❤️",
                description: "Post added to your likes",
                type: "success",
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
                title: "Bookmark removed",
                description: "Post removed from your bookmarks",
                type: "info",
                duration: 2000,
            });
        } else {
            newBookmarked.add(postId);
            toast({
                title: "Bookmarked! 🔖",
                description: "Post saved to your bookmarks",
                type: "success",
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
                title: "Link copied! 📋",
                description: "Post link copied to clipboard",
                type: "success",
                duration: 2000,
            });
        }
    };

    const allPosts = [
        {
            id: 1,
            author: "Arjun Sharma",
            avatar: "AS",
            kBatch: "K23",
            time: "2h",
            content: "Just aced my Data Structures exam! 🎉 Thanks to the amazing study group we formed last week. Collaboration really works! Special thanks to @priya_mehta and @rohit_verma for the help. #DSA #academics #bitlife #teamwork",
            likes: 42,
            comments: 8,
            branch: "CSE",
            year: "2nd Year",
            verified: true,
            category: "academic",
            media: [
                {
                    id: "m1",
                    type: "image",
                    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
                    alt: "Data Structures textbook and notes",
                    caption: "My DSA notes and reference books"
                }
            ]
        },
        {
            id: 2,
            author: "Photography Club",
            avatar: "PC",
            kBatch: "Official",
            time: "3h",
            content: "🔥 New post in Photography Circle! Check out this stunning sunset shot from the hostel terrace. Join our circle for daily photo challenges and tips! @everyone come check this out! #BitPhotography #sunset #hostellife #photography #golden_hour",
            likes: 67,
            comments: 23,
            branch: "Circle",
            year: "Community",
            verified: true,
            isCirclePost: true,
            category: "circles",
            media: [
                {
                    id: "m2",
                    type: "image",
                    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
                    alt: "Beautiful sunset from hostel terrace",
                    caption: "Sunset from Hostel C terrace - Shot on iPhone"
                },
                {
                    id: "m3",
                    type: "image",
                    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
                    alt: "Another angle of the sunset",
                    caption: "Different angle of the same sunset"
                }
            ]
        },
        {
            id: 3,
            author: "Priya Mehta",
            avatar: "PM",
            kBatch: "K22",
            time: "4h",
            content: "Anyone interested in a weekend trek to Hundru Falls? Looking for adventure buddies! 🏔️ Planning to leave Saturday morning. @arjun_sharma @neha_gupta you guys in? #trek #adventure #weekend #hundru_falls #bitlife",
            likes: 28,
            comments: 15,
            branch: "ECE",
            year: "3rd Year",
            verified: false,
            category: "social",
            media: [
                {
                    id: "m4",
                    type: "video",
                    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                    thumbnail: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
                    caption: "Last year's trek to Hundru Falls - it was amazing!"
                }
            ]
        },
        {
            id: 4,
            author: "Rahul Singh",
            avatar: "RS",
            kBatch: "K21",
            time: "6h",
            content: "Selling my Java programming books - perfect condition! Great for semester prep. DM if interested 📚 Especially good for @k24_students who are starting with programming. #books #java #programming #semester #bitmart #textbooks",
            likes: 19,
            comments: 5,
            branch: "IT",
            year: "4th Year",
            verified: true,
            category: "marketplace",
            media: [
                {
                    id: "m5",
                    type: "image",
                    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
                    alt: "Java programming books for sale",
                    caption: "Complete Java reference books - like new condition"
                }
            ]
        },
        {
            id: 5,
            author: "Neha Gupta",
            avatar: "NG",
            kBatch: "K24",
            time: "8h",
            content: "Lost my water bottle near the library. It's a blue Tupperware bottle with 'Neha' written on it. Please message if found! 💧 Really need it back, it was a gift from home. #lost #library #help #waterbottle",
            likes: 12,
            comments: 3,
            branch: "ME",
            year: "1st Year",
            verified: false,
            category: "lost-found"
        },
        {
            id: 6,
            author: "Tech Society BIT",
            avatar: "TS",
            kBatch: "Official",
            time: "10h",
            content: "🚀 Hackathon registration is now open! 48 hours of non-stop coding, amazing prizes, and networking opportunities. Register now at bit.ly/hackathon2024. Special tracks for @k24_students and @k23_students! #hackathon #coding #techfest #registration #prizes #innovation",
            likes: 89,
            comments: 32,
            branch: "Society",
            year: "Official",
            verified: true,
            category: "events",
            media: [
                {
                    id: "m6",
                    type: "video",
                    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
                    thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
                    caption: "Highlights from last year's hackathon"
                },
                {
                    id: "m7",
                    type: "audio",
                    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                    title: "Hackathon Announcement",
                    caption: "Audio announcement from the organizing committee"
                }
            ]
        },
        {
            id: 7,
            author: "Amit Kumar",
            avatar: "AK",
            kBatch: "K23",
            time: "12h",
            content: "Looking for study partners for Advanced Algorithms. Let's meet at the library every evening at 6 PM. Who's in? 📖 @priya_mehta @arjun_sharma are you guys interested? #study #algorithms #library #evening #group_study",
            likes: 24,
            comments: 11,
            branch: "CSE",
            year: "2nd Year",
            verified: false,
            category: "academic"
        },
        {
            id: 8,
            author: "Music Club BIT",
            avatar: "MC",
            kBatch: "Official",
            time: "14h",
            content: "🎵 New cover released! Our rendition of 'Vande Mataram' for Republic Day. Check out the full video and audio! Amazing vocals by @shreya_singer and guitar by @rahul_guitarist. #music #cover #vande_mataram #republic_day #singing #guitar",
            likes: 156,
            comments: 47,
            branch: "Club",
            year: "Official",
            verified: true,
            category: "events",
            media: [
                {
                    id: "m8",
                    type: "audio",
                    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
                    title: "Vande Mataram Cover - Music Club BIT",
                    caption: "Republic Day special cover by Music Club"
                },
                {
                    id: "m9",
                    type: "video",
                    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
                    caption: "Behind the scenes of our recording session"
                }
            ]
        }
    ];

    const filters = [
        { id: "all", label: "All", icon: Home, count: allPosts.length },
        { id: "academic", label: "Academic", icon: BookOpen, count: allPosts.filter(p => p.category === "academic").length },
        { id: "circles", label: "Circles", icon: Users, count: allPosts.filter(p => p.category === "circles").length },
        { id: "events", label: "Events", icon: Calendar, count: allPosts.filter(p => p.category === "events").length },
        { id: "social", label: "Social", icon: Coffee, count: allPosts.filter(p => p.category === "social").length },
    ];

    const filteredPosts = activeFilter === "all"
        ? allPosts
        : allPosts.filter(post => post.category === activeFilter);

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32 mx-auto animate-pulse"></div>
                        <p className="text-sm text-muted-foreground">Loading feeds...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile-First Header */}
            <header className="sticky top-0 z-50 glass border-b bg-background/80 backdrop-blur-xl">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Back Button & Title */}
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.location.href = '/'}
                                className="btn-scale"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h1 className="text-xl font-bold gradient-text">Feeds</h1>
                                <p className="text-xs text-muted-foreground">{filteredPosts.length} posts</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Search posts, students..."
                                className="pl-10 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary rounded-full"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {filters.map((filter) => (
                            <Button
                                key={filter.id}
                                variant={activeFilter === filter.id ? "default" : "outline"}
                                size="sm"
                                className={`flex-shrink-0 rounded-full transition-all ${activeFilter === filter.id
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                    : "bg-secondary/50 hover:bg-secondary"
                                    }`}
                                onClick={() => setActiveFilter(filter.id)}
                            >
                                <filter.icon className="w-3 h-3 mr-1" />
                                {filter.label}
                                <Badge
                                    variant="secondary"
                                    className={`ml-2 text-xs ${activeFilter === filter.id ? "bg-white/20 text-white" : "bg-primary/10"
                                        }`}
                                >
                                    {filter.count}
                                </Badge>
                            </Button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Posts Feed - Starting from top */}
            <div className="px-4 py-2 pb-20">
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <Card key={post.id} className={`glass hover:shadow-lg transition-all duration-300 card-hover cursor-pointer ${post.isCirclePost ? 'border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/10 dark:to-purple-950/10' : ''
                            }`}
                            onClick={() => window.location.href = `/post/${post.id}`}>
                            <CardContent className="p-4">
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
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="w-10 h-10">
                                            <AvatarFallback className={`text-white text-sm ${post.isCirclePost
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                }`}>
                                                {post.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-semibold text-sm truncate">{post.author}</h4>
                                                {post.verified && (
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs text-white">✓</span>
                                                    </div>
                                                )}
                                                {/* K-Batch Badge */}
                                                <KBatchBadge kBatch={post.kBatch} size="sm" />
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                                <Badge variant="outline" className="text-xs px-1 py-0">
                                                    {post.branch}
                                                </Badge>
                                                <span>•</span>
                                                <span>{post.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Post Content with Rich Text */}
                                <div className="mb-4">
                                    <RichText 
                                        content={post.content} 
                                        className="leading-relaxed text-sm"
                                        onHashtagClick={(hashtag) => {
                                            toast({
                                                title: `Hashtag clicked: ${hashtag}`,
                                                description: `Searching for posts with ${hashtag}`,
                                                type: "info",
                                                duration: 2000,
                                            });
                                        }}
                                        onMentionClick={(username) => {
                                            toast({
                                                title: `@${username}`,
                                                description: `Viewing ${username}'s profile`,
                                                type: "info",
                                                duration: 2000,
                                            });
                                            // Navigate to user profile
                                            window.location.href = `/profile/${username}`;
                                        }}
                                    />
                                </div>

                                {/* Media Content */}
                                {post.media && post.media.length > 0 && (
                                    <div className="mb-4">
                                        <MediaGrid 
                                            mediaItems={post.media}
                                            className="rounded-lg overflow-hidden"
                                            onMediaClick={(media) => {
                                                toast({
                                                    title: "Media opened",
                                                    description: media.caption || "Viewing media",
                                                    type: "info",
                                                    duration: 2000,
                                                });
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Post Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`transition-colors btn-scale text-xs h-8 px-2 ${likedPosts.has(post.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleLike(post.id);
                                            }}
                                        >
                                            <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-muted-foreground hover:text-blue-500 btn-scale text-xs h-8 px-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MessageCircle className="w-4 h-4 mr-1" />
                                            {post.comments}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-muted-foreground hover:text-green-500 btn-scale text-xs h-8 px-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShare(post);
                                            }}
                                        >
                                            <Share2 className="w-4 h-4 mr-1" />
                                            Share
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`btn-scale w-8 h-8 ${bookmarkedPosts.has(post.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
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
                                    <div className="mt-3 pt-3 border-t border-indigo-200 dark:border-indigo-800">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-muted-foreground">
                                                💡 From Circle community
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 btn-scale text-xs h-7"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.location.href = '/circles';
                                                }}
                                            >
                                                <Users className="w-3 h-3 mr-1" />
                                                Join
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation currentPage="feeds" />
        </div>
    );
}
