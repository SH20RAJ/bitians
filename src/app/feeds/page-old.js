'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { MediaPlayer, MediaGrid } from '@/components/ui/MediaPlayer';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { RichText } from '@/components/ui/RichText';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import {
    Heart,
    MessageCircle,
    Share2,
    Search,
    Bookmark,
    MoreVertical,
    Filter,
    TrendingUp,
    Clock,
    Eye,
    Users,
    Camera,
    Video,
    Calendar,
    Pin,
    Star,
    BarChart3,
    Play,
    Image as ImageIcon,
    Hash,
    MapPin,
    Gift,
    Zap,
    ThumbsUp,
    EyeOff
} from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';

export default function FeedsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const { toast } = useToast();

    // Enhanced mock data with different post types
    const mockPosts = [
        {
            id: 1,
            type: 'text',
            author: 'Arjun Sharma',
            avatar: 'AS',
            kBatch: 'K23',
            time: '2h',
            isVerified: true,
            content: 'Just completed my first internship at Microsoft! 🎉 The experience was incredible and I learned so much about software development at scale. Special thanks to @priya_mehta for the referral! #Internship #Microsoft #Grateful #TechLife #BITLife',
            likes: 234,
            comments: 67,
            shares: 45,
            views: 1200,
            location: 'Hyderabad, India',
            feeling: 'excited'
        },
        {
            id: 2,
            type: 'image',
            author: 'Photography Club',
            avatar: 'PC',
            kBatch: 'Official',
            time: '3h',
            isVerified: true,
            isClub: true,
            content: '🌅 Morning vibes from the BIT Mesra campus! Captured this beautiful sunrise from the main building. Nature therapy before classes begin! #BITMesra #Photography #Sunrise #CampusLife #NaturePhotography',
            likes: 456,
            comments: 89,
            shares: 123,
            views: 2500,
            media: [
                {
                    id: 'm1',
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                    alt: 'Beautiful sunrise from BIT Mesra campus',
                    caption: 'Sunrise from Main Building - Shot on iPhone 14 Pro'
                }
            ]
        },
        {
            id: 3,
            type: 'confession',
            author: 'Anonymous',
            avatar: '??',
            kBatch: 'K22',
            time: '5h',
            isAnonymous: true,
            content: "I've been struggling with imposter syndrome since my placement got confirmed. Everyone expects so much from me now, but I feel like I don't deserve it. Anyone else feel this way? #ImpostorSyndrome #MentalHealth #PlacementStress #Anxiety",
            likes: 89,
            comments: 45,
            shares: 12,
            views: 780,
            mood: 'anxious'
        },
        {
            id: 4,
            type: 'video',
            author: 'Rahul Singh',
            avatar: 'RS',
            kBatch: 'K21',
            time: '6h',
            isVerified: true,
            content: '🎸 Late night jam session in the hostel! Nothing beats music to destress from coding marathons. Who else is a music lover here? #Music #HostelLife #Jamming #StressRelief #BITLife',
            likes: 178,
            comments: 34,
            shares: 56,
            views: 1100,
            media: [
                {
                    id: 'm2',
                    type: 'video',
                    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
                    caption: 'Late night guitar session in hostel common room'
                }
            ]
        },
        {
            id: 5,
            type: 'poll',
            author: 'Priya Mehta',
            avatar: 'PM',
            kBatch: 'K22',
            time: '8h',
            isVerified: false,
            content: 'Planning a weekend trek to Hundru Falls! 🏔️ Which day works better for everyone? Let me know in the poll below! #Trek #Adventure #Weekend #HundruFalls #BITLife',
            likes: 67,
            comments: 23,
            shares: 18,
            views: 450,
            poll: {
                question: 'Which day is better for the trek?',
                options: [
                    { text: 'Saturday', votes: 45, percentage: 65 },
                    { text: 'Sunday', votes: 24, percentage: 35 }
                ],
                totalVotes: 69,
                hasVoted: false
            }
        },
        {
            id: 6,
            type: 'event',
            author: 'Cultural Committee',
            avatar: 'CC',
            kBatch: 'Official',
            time: '1d',
            isVerified: true,
            isClub: true,
            content: '🎭 Annual Cultural Fest "Pantheon 2024" is here! Join us for 3 days of amazing performances, competitions, and fun. Registration open now! #Pantheon2024 #CulturalFest #BITMesra #Events #Registration',
            likes: 589,
            comments: 156,
            shares: 234,
            views: 3400,
            event: {
                title: 'Pantheon 2024 - Annual Cultural Fest',
                date: '2024-03-15',
                time: '09:00 AM',
                location: 'BIT Mesra Campus',
                attendees: 234
            }
        },
        {
            id: 7,
            type: 'achievement',
            author: 'Neha Gupta',
            avatar: 'NG',
            kBatch: 'K20',
            time: '1d',
            isVerified: true,
            content: '🏆 Won the Grand Prize at HackIndia 2024! Our project on sustainable agriculture using IoT got selected among 500+ teams. Proud to represent BIT Mesra! Team: @arjun_sharma @rahul_singh @priya_mehta #HackIndia2024 #Winner #IoT #Agriculture #BITMesra #TeamWork',
            likes: 345,
            comments: 78,
            shares: 89,
            views: 1890,
            achievement: {
                title: 'HackIndia 2024 Grand Prize Winner',
                organization: 'HackIndia',
                badge: '🏆'
            }
        },
        {
            id: 8,
            type: 'marketplace',
            author: 'Amit Kumar',
            avatar: 'AK',
            kBatch: 'K21',
            time: '2d',
            isVerified: false,
            content: '📚 Selling my programming books collection! All in excellent condition. Perfect for placement prep and semester exams. DM for details and prices! #Books #Programming #PlacementPrep #BitMart #Textbooks',
            likes: 23,
            comments: 12,
            shares: 8,
            views: 234,
            marketplace: {
                price: '₹2,500',
                condition: 'Like New',
                category: 'Books',
                negotiable: true
            },
            media: [
                {
                    id: 'm3',
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
                    alt: 'Programming books collection',
                    caption: 'Complete programming books collection for sale'
                }
            ]
        }
    ];

    const postTypes = [
        { id: 'all', label: 'All Posts', icon: Hash },
        { id: 'text', label: 'Text', icon: MessageCircle },
        { id: 'image', label: 'Photos', icon: Camera },
        { id: 'video', label: 'Videos', icon: Video },
        { id: 'confession', label: 'Confessions', icon: EyeOff },
        { id: 'poll', label: 'Polls', icon: BarChart3 },
        { id: 'event', label: 'Events', icon: Calendar },
        { id: 'marketplace', label: 'Marketplace', icon: Gift }
    ];

    useEffect(() => {
        setPosts(mockPosts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesFilter = activeFilter === 'all' || post.type === activeFilter;
        const matchesSearch = searchTerm === '' ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'popular': return b.likes - a.likes;
            case 'discussed': return b.comments - a.comments;
            case 'views': return b.views - a.views;
            default: return 0; // recent (already in order)
        }
    });

    const handleLike = (postId) => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(postId)) {
            newLiked.delete(postId);
        } else {
            newLiked.add(postId);
        }
        setLikedPosts(newLiked);
    };

    const handleBookmark = (postId) => {
        const newBookmarked = new Set(bookmarkedPosts);
        if (newBookmarked.has(postId)) {
            newBookmarked.delete(postId);
        } else {
            newBookmarked.add(postId);
        }
        setBookmarkedPosts(newBookmarked);
    };

    const renderPostTypeIndicator = (post) => {
        const getTypeInfo = () => {
            switch (post.type) {
                case 'confession': return { icon: EyeOff, color: 'bg-gray-500', label: 'Confession' };
                case 'poll': return { icon: BarChart3, color: 'bg-orange-500', label: 'Poll' };
                case 'event': return { icon: Calendar, color: 'bg-pink-500', label: 'Event' };
                case 'video': return { icon: Video, color: 'bg-purple-500', label: 'Video' };
                case 'image': return { icon: Camera, color: 'bg-green-500', label: 'Photo' };
                case 'marketplace': return { icon: Gift, color: 'bg-yellow-500', label: 'Marketplace' };
                case 'achievement': return { icon: Star, color: 'bg-amber-500', label: 'Achievement' };
                default: return null;
            }
        };

        const typeInfo = getTypeInfo();
        if (!typeInfo) return null;

        const Icon = typeInfo.icon;
        return (
            <Badge variant="secondary" className="text-xs">
                <div className={`w-2 h-2 rounded-full ${typeInfo.color} mr-1`}></div>
                {typeInfo.label}
            </Badge>
        );
    };

    const renderSpecialContent = (post) => {
        // Poll content
        if (post.type === 'poll' && post.poll) {
            return (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-3">{post.poll.question}</h4>
                    <div className="space-y-2">
                        {post.poll.options.map((option, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <span className="font-medium">{option.text}</span>
                                    <span className="text-sm text-muted-foreground">{option.votes} votes</span>
                                </div>
                                <div
                                    className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-b-lg transition-all"
                                    style={{ width: `${option.percentage}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{post.poll.totalVotes} total votes</p>
                </div>
            );
        }

        // Event content
        if (post.type === 'event' && post.event) {
            return (
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-lg p-4 mb-4 border border-pink-200 dark:border-pink-800">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-1">{post.event.title}</h4>
                            <div className="space-y-1 text-sm text-pink-700 dark:text-pink-300">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    <span>{post.event.date} at {post.event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    <span>{post.event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-3 h-3" />
                                    <span>{post.event.attendees} attending</span>
                                </div>
                            </div>
                            <Button size="sm" className="mt-3 bg-pink-500 hover:bg-pink-600">
                                Interested
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        // Achievement content
        if (post.type === 'achievement' && post.achievement) {
            return (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-lg p-4 mb-4 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">{post.achievement.badge}</div>
                        <div>
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100">{post.achievement.title}</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300">from {post.achievement.organization}</p>
                        </div>
                    </div>
                </div>
            );
        }

        // Marketplace content
        if (post.type === 'marketplace' && post.marketplace) {
            return (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-green-600">{post.marketplace.price}</div>
                            <div className="text-sm text-green-700 dark:text-green-300">
                                {post.marketplace.condition} • {post.marketplace.category}
                                {post.marketplace.negotiable && ' • Negotiable'}
                            </div>
                        </div>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            Contact Seller
                        </Button>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Community Feeds
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Discover what&apos;s happening in the BIT community
                    </p>
                </div>

                {/* Filters and Search */}
                <Card className="mb-8 p-6">
                    <div className="space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                placeholder="Search posts, users, or content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {postTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <Button
                                        key={type.id}
                                        variant={activeFilter === type.id ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setActiveFilter(type.id)}
                                        className="flex items-center gap-2"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {type.label}
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Sort Options */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                {filteredPosts.length} posts found
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-sm border rounded-lg px-3 py-1 bg-background"
                            >
                                <option value="recent">Most Recent</option>
                                <option value="popular">Most Popular</option>
                                <option value="discussed">Most Discussed</option>
                                <option value="views">Most Viewed</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {filteredPosts.map(post => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                            {/* Post Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12">
                                            <div className={`w-full h-full rounded-full flex items-center justify-center text-white font-semibold ${post.isClub ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                }`}>
                                                {post.avatar}
                                            </div>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => router.push(`/profile/${post.author.toLowerCase().replace(' ', '')}`)}
                                                    className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                                                >
                                                    {post.author}
                                                </button>
                                                {post.isVerified && (
                                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-xs text-white">✓</span>
                                                    </div>
                                                )}
                                                {!post.isAnonymous && <KBatchBadge kBatch={post.kBatch} size="sm" />}
                                                {post.isClub && <Badge variant="secondary" className="text-xs">Official</Badge>}
                                                {renderPostTypeIndicator(post)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                <span>{post.time}</span>
                                                <Eye className="w-3 h-3 ml-2" />
                                                <span>{post.views}</span>
                                                {post.location && (
                                                    <>
                                                        <MapPin className="w-3 h-3 ml-2" />
                                                        <span>{post.location}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Post Content */}
                                <div className="mb-4">
                                    <RichText
                                        content={post.content}
                                        className="leading-relaxed"
                                        onHashtagClick={(hashtag) => {
                                            router.push(`/hashtags?tag=${hashtag}`);
                                        }}
                                        onMentionClick={(username) => {
                                            router.push(`/profile/${username}`);
                                        }}
                                    />
                                </div>

                                {/* Special Content */}
                                {renderSpecialContent(post)}

                                {/* Media Content */}
                                {post.media && post.media.length > 0 && (
                                    <div className="mb-4">
                                        <MediaGrid
                                            mediaItems={post.media}
                                            className="rounded-lg overflow-hidden"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Post Actions */}
                            <div className="px-6 py-4 border-t bg-gray-50/50 dark:bg-gray-900/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center gap-2 transition-colors ${likedPosts.has(post.id)
                                                ? 'text-red-500 hover:text-red-600'
                                                : 'text-muted-foreground hover:text-red-500'
                                                }`}
                                        >
                                            <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                            <span className="font-medium">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                                        </button>

                                        <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="font-medium">{post.comments}</span>
                                        </button>

                                        <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                                            <Share2 className="w-5 h-5" />
                                            <span className="font-medium">{post.shares}</span>
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleBookmark(post.id)}
                                        className={`transition-colors ${bookmarkedPosts.has(post.id)
                                            ? 'text-yellow-500'
                                            : 'text-muted-foreground hover:text-yellow-500'
                                            }`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <Card className="p-12 text-center">
                        <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No posts found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your filters or search terms
                        </p>
                    </Card>
                )}
            </div>
            <BottomNavigation currentPage="feeds" />
        </PageLayout>
    );
}
