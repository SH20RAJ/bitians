'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { MediaGrid } from '@/components/ui/MediaPlayer';
import { RichText } from '@/components/ui/RichText';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import MobileHamburgerMenu from '@/components/MobileHamburgerMenu';
import {
    ArrowLeft,
    Newspaper,
    Search,
    Bell,
    Share2,
    Bookmark,
    Heart,
    MessageCircle,
    Eye,
    Clock,
    MapPin,
    Users,
    TrendingUp,
    Calendar,
    Star,
    AlertCircle,
    CheckCircle,
    Info,
    Megaphone,
    Crown,
    Sparkles,
    Pin,
    Filter,
    MoreVertical
} from 'lucide-react';

export default function NewsroomPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [activeFilter, setActiveFilter] = useState('all');
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

    const newsCategories = [
        { id: 'all', label: 'All News', icon: Newspaper },
        { id: 'announcements', label: 'Announcements', icon: Megaphone },
        { id: 'academic', label: 'Academic', icon: Calendar },
        { id: 'events', label: 'Events', icon: Star },
        { id: 'achievements', label: 'Achievements', icon: Crown },
        { id: 'alerts', label: 'Alerts', icon: AlertCircle }
    ];

    const newsData = [
        {
            id: 1,
            type: 'announcement',
            title: 'Semester End Examination Schedule Released',
            category: 'Academic',
            priority: 'high',
            author: 'Academic Office',
            authorAvatar: 'AO',
            time: '2h',
            content: '📚 The semester end examination schedule for Spring 2024 has been released. Students are advised to check their respective department notice boards and the official website for detailed timetables. Examinations will commence from March 25, 2024. #ExamSchedule #Academic #Spring2024',
            likes: 156,
            comments: 23,
            shares: 45,
            views: 2340,
            isOfficial: true,
            isPinned: true,
            tags: ['exam', 'schedule', 'academic']
        },
        {
            id: 2,
            type: 'event',
            title: 'Annual Tech Fest "Innovision 2024" Registration Open',
            category: 'Events',
            priority: 'medium',
            author: 'Student Activities',
            authorAvatar: 'SA',
            time: '4h',
            content: '🚀 Get ready for the biggest tech fest of the year! Innovision 2024 brings together the brightest minds in technology. Register now for various competitions including coding contests, robotics, AI/ML challenges, and hackathons. Early bird registration ends on Feb 20th! #Innovision2024 #TechFest #Competition',
            likes: 234,
            comments: 67,
            shares: 89,
            views: 3200,
            isOfficial: true,
            isPinned: false,
            tags: ['techfest', 'competition', 'registration'],
            media: [
                {
                    id: 'm1',
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                    alt: 'Innovision 2024 Tech Fest Poster',
                    caption: 'Innovision 2024 - Where Innovation Meets Vision'
                }
            ]
        },
        {
            id: 3,
            type: 'achievement',
            title: 'BIT Mesra Students Win International Robotics Competition',
            category: 'Achievements',
            priority: 'high',
            author: 'PR Department',
            authorAvatar: 'PR',
            time: '1d',
            content: '🏆 Proud moment for BIT Mesra! Our robotics team "TechnoMechs" secured 1st position in the International Robotics Championship held in Singapore. The team comprising students from Mechanical and CSE departments developed an autonomous robot for industrial automation. #Robotics #Achievement #International #Pride',
            likes: 567,
            comments: 134,
            shares: 203,
            views: 8900,
            isOfficial: true,
            isPinned: false,
            tags: ['robotics', 'achievement', 'international'],
            achievement: {
                title: 'International Robotics Championship Winner',
                badge: '🏆'
            }
        },
        {
            id: 4,
            type: 'alert',
            title: 'Campus Internet Maintenance - Scheduled Downtime',
            category: 'Alerts',
            priority: 'medium',
            author: 'IT Services',
            authorAvatar: 'IT',
            time: '6h',
            content: '⚠️ Scheduled maintenance of campus network infrastructure. Internet services will be temporarily unavailable on February 18th from 11:00 PM to 3:00 AM. This is to upgrade our network capacity and improve connectivity. We apologize for any inconvenience. #Maintenance #Internet #Alert',
            likes: 89,
            comments: 45,
            shares: 23,
            views: 1890,
            isOfficial: true,
            isPinned: false,
            tags: ['maintenance', 'internet', 'downtime']
        },
        {
            id: 5,
            type: 'announcement',
            title: 'New Cafeteria Menu and Operating Hours',
            category: 'Campus Life',
            priority: 'low',
            author: 'Campus Services',
            authorAvatar: 'CS',
            time: '2d',
            content: '🍽️ Exciting news! Our main cafeteria has expanded its menu with new healthy options and regional cuisines. New operating hours: 7:00 AM - 11:00 PM. We\'ve also introduced contactless payment options and online pre-ordering through the BIT App. #Cafeteria #Food #CampusLife',
            likes: 123,
            comments: 56,
            shares: 34,
            views: 2100,
            isOfficial: true,
            isPinned: false,
            tags: ['cafeteria', 'food', 'campus']
        },
        {
            id: 6,
            type: 'academic',
            title: 'New Course Offerings for Next Semester',
            category: 'Academic',
            priority: 'medium',
            author: 'Academic Office',
            authorAvatar: 'AO',
            time: '3d',
            content: '📖 Exciting new elective courses introduced for the upcoming semester! New offerings include Blockchain Technology, Quantum Computing, Digital Marketing, and Environmental Engineering. Course registration opens on March 1st. Check the academic portal for prerequisites and detailed syllabi. #NewCourses #Academic #Registration',
            likes: 190,
            comments: 78,
            shares: 67,
            views: 3400,
            isOfficial: true,
            isPinned: false,
            tags: ['courses', 'academic', 'registration']
        }
    ];

    const filteredNews = newsData.filter(news => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'announcements') return news.type === 'announcement';
        if (activeFilter === 'academic') return news.category === 'Academic';
        if (activeFilter === 'events') return news.type === 'event';
        if (activeFilter === 'achievements') return news.type === 'achievement';
        if (activeFilter === 'alerts') return news.type === 'alert';
        return true;
    });

    const handleLike = (postId) => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(postId)) {
            newLiked.delete(postId);
        } else {
            newLiked.add(postId);
        }
        setLikedPosts(newLiked);
        
        toast({
            title: newLiked.has(postId) ? 'News liked!' : 'Like removed',
            type: 'success',
            duration: 2000,
        });
    };

    const handleBookmark = (postId) => {
        const newBookmarked = new Set(bookmarkedPosts);
        if (newBookmarked.has(postId)) {
            newBookmarked.delete(postId);
        } else {
            newBookmarked.add(postId);
        }
        setBookmarkedPosts(newBookmarked);
        
        toast({
            title: newBookmarked.has(postId) ? 'News saved!' : 'Bookmark removed',
            type: 'success',
            duration: 2000,
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const renderNewsItem = (news) => (
        <Card key={news.id} className={`overflow-hidden hover:shadow-md transition-all duration-200 ${news.isPinned ? 'ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/10' : ''}`}>
            {/* Priority Indicator & Pin */}
            {(news.isPinned || news.priority === 'high') && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2">
                    <div className="flex items-center justify-between text-white">
                        {news.isPinned && (
                            <div className="flex items-center gap-1 text-xs">
                                <Pin className="w-3 h-3" />
                                <span className="font-medium">Pinned News</span>
                            </div>
                        )}
                        {news.priority === 'high' && (
                            <Badge className="bg-white/20 text-white border-white/20 text-xs">
                                High Priority
                            </Badge>
                        )}
                    </div>
                </div>
            )}

            <div className="p-4">
                {/* News Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm">
                                {news.authorAvatar}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{news.author}</span>
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                                <Badge variant="secondary" className="text-xs">Official</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">{news.category}</Badge>
                                <span>•</span>
                                <span>{news.time}</span>
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(news.priority)}`}></div>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>

                {/* News Title */}
                <h3 className="font-bold text-lg mb-2 leading-tight">{news.title}</h3>

                {/* News Content */}
                <div className="mb-3">
                    <RichText
                        content={news.content}
                        className="leading-relaxed text-sm"
                        onHashtagClick={(hashtag) => {
                            router.push(`/hashtags?tag=${hashtag}`);
                        }}
                    />
                </div>

                {/* Achievement Display */}
                {news.achievement && (
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-lg p-3 mb-3 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-3">
                            <div className="text-xl">{news.achievement.badge}</div>
                            <div>
                                <h4 className="font-semibold text-amber-900 dark:text-amber-100 text-sm">{news.achievement.title}</h4>
                                <p className="text-xs text-amber-700 dark:text-amber-300">International Recognition</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Media Content */}
                {news.media && news.media.length > 0 && (
                    <div className="mb-3">
                        <MediaGrid
                            mediaItems={news.media}
                            className="rounded-lg overflow-hidden"
                        />
                    </div>
                )}

                {/* Tags */}
                {news.tags && (
                    <div className="flex gap-1 mb-3 flex-wrap">
                        {news.tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => router.push(`/hashtags?tag=${tag}`)}
                                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                )}

                {/* Post Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pt-2 border-t">
                    <div className="flex items-center gap-4">
                        <span>{news.likes} likes</span>
                        <span>{news.comments} comments</span>
                        <span>{news.views} views</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-t bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleLike(news.id)}
                            className={`flex items-center gap-2 transition-colors ${
                                likedPosts.has(news.id)
                                    ? 'text-red-500 hover:text-red-600'
                                    : 'text-muted-foreground hover:text-red-500'
                            }`}
                        >
                            <Heart className={`w-5 h-5 ${likedPosts.has(news.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{news.likes + (likedPosts.has(news.id) ? 1 : 0)}</span>
                        </button>

                        <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{news.comments}</span>
                        </button>

                        <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm font-medium">{news.shares}</span>
                        </button>
                    </div>

                    <button
                        onClick={() => handleBookmark(news.id)}
                        className={`transition-colors ${
                            bookmarkedPosts.has(news.id)
                                ? 'text-yellow-500'
                                : 'text-muted-foreground hover:text-yellow-500'
                        }`}
                    >
                        <Bookmark className={`w-5 h-5 ${bookmarkedPosts.has(news.id) ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>
        </Card>
    );

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
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Newspaper className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Newsroom
                                </h1>
                                <p className="text-xs text-muted-foreground">Official BIT Mesra News</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => router.push('/search')}
                            className="h-9 w-9"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-9 w-9 relative"
                        >
                            <Bell className="h-5 w-5" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white font-bold">2</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="px-4 pb-3">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {newsCategories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <Button
                                    key={category.id}
                                    variant={activeFilter === category.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setActiveFilter(category.id)}
                                    className="flex items-center gap-1 h-8 px-3 text-xs whitespace-nowrap"
                                >
                                    <Icon className="w-3 h-3" />
                                    {category.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* News Feed */}
            <div className="px-4 py-2 space-y-4 pb-20">
                {/* Stats Card */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-purple-900 dark:text-purple-100">Official Newsroom</h3>
                                <p className="text-sm text-purple-700 dark:text-purple-300">Stay updated with latest campus news</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-purple-600">{filteredNews.length}</div>
                                <div className="text-xs text-purple-600">News Items</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-purple-600">
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>2.1k followers</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>Daily updates</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Verified source</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* News Items */}
                {filteredNews.map(renderNewsItem)}

                {filteredNews.length === 0 && (
                    <Card className="p-8 text-center">
                        <Newspaper className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No news found</h3>
                        <p className="text-muted-foreground text-sm">
                            No news available for the selected category
                        </p>
                    </Card>
                )}
            </div>

            <BottomNavigation currentPage="newsroom" />
        </div>
    );
}
