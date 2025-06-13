'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import BottomNavigation from '@/components/BottomNavigation';
import {
    Search,
    Users,
    Hash,
    FileText,
    Calendar,
    BookOpen,
    ShoppingBag,
    Clock,
    TrendingUp,
    MapPin,
    Eye,
    Heart,
    MessageCircle,
    Filter,
    X,
    ArrowRight,
    UserPlus,
    GraduationCap,
    Building,
    Newspaper
} from 'lucide-react';

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [activeCategory, setActiveCategory] = useState('all');
    const [recentSearches, setRecentSearches] = useState([]);
    const [searchResults, setSearchResults] = useState({});
    const [isSearching, setIsSearching] = useState(false);

    const searchCategories = [
        { id: 'all', label: 'All', icon: Search },
        { id: 'people', label: 'People', icon: Users },
        { id: 'posts', label: 'Posts', icon: FileText },
        { id: 'hashtags', label: 'Tags', icon: Hash },
        { id: 'circles', label: 'Circles', icon: Building },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'notes', label: 'Notes', icon: BookOpen },
        { id: 'marketplace', label: 'Market', icon: ShoppingBag }
    ];

    const trendingSearches = [
        '#PlacementSeason',
        '#CulturalFest',
        '#BITMesra',
        '#CodeChef',
        '#Hackathon',
        'Machine Learning',
        'Web Development',
        'Study Group',
        'Hostel Life',
        '#TechTalks'
    ];

    const mockSearchResults = {
        people: [
            {
                id: 1,
                type: 'user',
                name: 'Arjun Sharma',
                username: 'arjun_sharma',
                avatar: 'AS',
                kBatch: 'K23',
                branch: 'CSE',
                bio: 'Full Stack Developer | Open Source Enthusiast',
                followers: 234,
                verified: true,
                isFollowing: false
            },
            {
                id: 2,
                type: 'user',
                name: 'Priya Mehta',
                username: 'priya_mehta',
                avatar: 'PM',
                kBatch: 'K22',
                branch: 'ECE',
                bio: 'AI/ML Researcher | Google Summer of Code 2023',
                followers: 189,
                verified: true,
                isFollowing: true
            },
            {
                id: 3,
                type: 'club',
                name: 'ACM BIT Mesra',
                username: 'acm_bitmesra',
                avatar: 'ACM',
                category: 'Technical Club',
                description: 'Official ACM Student Chapter at BIT Mesra',
                members: 450,
                verified: true,
                isOfficial: true
            }
        ],
        posts: [
            {
                id: 1,
                type: 'post',
                author: 'Rahul Singh',
                content: 'Just cracked the Google interview! 🎉 Hard work pays off. Special thanks to the coding community at BIT for all the support! #GoogleInterview #Success #BITMesra',
                time: '2h',
                likes: 156,
                comments: 34,
                hashtags: ['GoogleInterview', 'Success', 'BITMesra']
            },
            {
                id: 2,
                type: 'post',
                author: 'Tech Club',
                content: 'Workshop on Machine Learning and AI happening this weekend! Register now for hands-on experience with industry experts. #MLWorkshop #AI #TechClub',
                time: '4h',
                likes: 89,
                comments: 23,
                hashtags: ['MLWorkshop', 'AI', 'TechClub']
            }
        ],
        hashtags: [
            {
                id: 1,
                tag: 'PlacementSeason',
                posts: 234,
                trending: true,
                description: 'Everything about campus placements'
            },
            {
                id: 2,
                tag: 'BITMesra',
                posts: 1567,
                trending: true,
                description: 'Official campus hashtag'
            },
            {
                id: 3,
                tag: 'TechTalks',
                posts: 89,
                trending: false,
                description: 'Technical discussions and insights'
            }
        ],
        circles: [
            {
                id: 1,
                name: 'Photography Club',
                description: 'Capturing moments and memories',
                members: 156,
                category: 'Hobby',
                verified: true,
                avatar: 'PC'
            },
            {
                id: 2,
                name: 'Coding Ninjas',
                description: 'Competitive Programming Community',
                members: 234,
                category: 'Technical',
                verified: false,
                avatar: 'CN'
            }
        ],
        events: [
            {
                id: 1,
                title: 'Annual Tech Fest 2024',
                date: '2024-03-15',
                time: '10:00 AM',
                location: 'Main Auditorium',
                attendees: 500,
                category: 'Technical'
            },
            {
                id: 2,
                title: 'Photography Workshop',
                date: '2024-03-20',
                time: '2:00 PM',
                location: 'Photography Studio',
                attendees: 45,
                category: 'Workshop'
            }
        ]
    };

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const handleSearch = (query) => {
        if (!query.trim()) return;

        setIsSearching(true);
        setSearchQuery(query);

        // Add to recent searches
        const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));

        // Simulate search delay
        setTimeout(() => {
            setSearchResults(mockSearchResults);
            setIsSearching(false);
        }, 500);

        // Update URL
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    const handleClearRecent = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const filteredResults = activeCategory === 'all' 
        ? searchResults 
        : { [activeCategory]: searchResults[activeCategory] || [] };

    const hasResults = Object.keys(searchResults).length > 0;
    const showEmptyState = !isSearching && searchQuery && !hasResults;

    return (
        <div className="min-h-screen bg-background">
            <MobileHeader title="Search" showSearch={false} />
            
            {/* Search Input */}
            <div className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-14 z-30">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                        placeholder="Search people, posts, hashtags..."
                        className="pl-10 pr-10 h-12"
                        autoFocus
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                
                {searchQuery && (
                    <Button 
                        className="w-full mt-3" 
                        onClick={() => handleSearch(searchQuery)}
                        disabled={isSearching}
                    >
                        {isSearching ? 'Searching...' : `Search "${searchQuery}"`}
                    </Button>
                )}
            </div>

            {/* Categories */}
            {hasResults && (
                <div className="px-4 py-3 border-b">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {searchCategories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                size="sm"
                                className="whitespace-nowrap flex-shrink-0 h-8"
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <category.icon className="w-3 h-3 mr-1" />
                                {category.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="pb-20">
                {!searchQuery && !isSearching && (
                    <>
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-sm">Recent Searches</h3>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={handleClearRecent}
                                        className="text-xs"
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSearch(search)}
                                            className="flex items-center gap-3 w-full p-3 hover:bg-muted rounded-lg transition-colors text-left"
                                        >
                                            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <span className="flex-1 truncate">{search}</span>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trending */}
                        <div className="p-4">
                            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Trending Now
                            </h3>
                            <div className="space-y-2">
                                {trendingSearches.map((trend, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearch(trend)}
                                        className="flex items-center gap-3 w-full p-3 hover:bg-muted rounded-lg transition-colors text-left"
                                    >
                                        {trend.startsWith('#') ? (
                                            <Hash className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        ) : (
                                            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        )}
                                        <span className="flex-1">{trend}</span>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Access */}
                        <div className="p-4">
                            <h3 className="font-semibold text-sm mb-3">Quick Access</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => router.push('/newsroom')}
                                    className="p-4 border border-border rounded-xl hover:bg-muted transition-colors text-left"
                                >
                                    <Newspaper className="w-6 h-6 text-blue-500 mb-2" />
                                    <h4 className="font-medium text-sm">Newsroom</h4>
                                    <p className="text-xs text-muted-foreground">Official updates</p>
                                </button>
                                <button
                                    onClick={() => router.push('/circles')}
                                    className="p-4 border border-border rounded-xl hover:bg-muted transition-colors text-left"
                                >
                                    <Building className="w-6 h-6 text-green-500 mb-2" />
                                    <h4 className="font-medium text-sm">All Circles</h4>
                                    <p className="text-xs text-muted-foreground">Browse communities</p>
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Search Results */}
                {hasResults && (
                    <div className="p-4 space-y-4">
                        {/* People Results */}
                        {(activeCategory === 'all' || activeCategory === 'people') && filteredResults.people && (
                            <div>
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    People
                                </h3>
                                <div className="space-y-3">
                                    {filteredResults.people.map((person) => (
                                        <Card key={person.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-12 h-12">
                                                        <AvatarFallback className={
                                                            person.isOfficial 
                                                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
                                                                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold"
                                                        }>
                                                            {person.avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="font-semibold text-sm truncate">{person.name}</h4>
                                                            {person.verified && (
                                                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                                    <span className="text-xs text-white">✓</span>
                                                                </div>
                                                            )}
                                                            {person.kBatch && <KBatchBadge kBatch={person.kBatch} size="xs" />}
                                                            {person.isOfficial && <Badge variant="secondary" className="text-xs">Official</Badge>}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mb-1">@{person.username}</p>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {person.bio || person.description}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {person.followers || person.members} {person.followers ? 'followers' : 'members'}
                                                        </p>
                                                    </div>
                                                    <Button 
                                                        variant={person.isFollowing ? "outline" : "default"} 
                                                        size="sm"
                                                        className="h-8"
                                                    >
                                                        {person.isFollowing ? (
                                                            <>
                                                                <UserPlus className="w-3 h-3 mr-1" />
                                                                Following
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserPlus className="w-3 h-3 mr-1" />
                                                                Follow
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Posts Results */}
                        {(activeCategory === 'all' || activeCategory === 'posts') && filteredResults.posts && (
                            <div>
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Posts
                                </h3>
                                <div className="space-y-3">
                                    {filteredResults.posts.map((post) => (
                                        <Card key={post.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                                            <CardContent className="p-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm">{post.author}</span>
                                                        <span className="text-xs text-muted-foreground">•</span>
                                                        <span className="text-xs text-muted-foreground">{post.time}</span>
                                                    </div>
                                                    <p className="text-sm leading-relaxed line-clamp-3">{post.content}</p>
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Heart className="w-3 h-3" />
                                                            {post.likes}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MessageCircle className="w-3 h-3" />
                                                            {post.comments}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hashtags Results */}
                        {(activeCategory === 'all' || activeCategory === 'hashtags') && filteredResults.hashtags && (
                            <div>
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    Hashtags
                                </h3>
                                <div className="space-y-2">
                                    {filteredResults.hashtags.map((hashtag) => (
                                        <button
                                            key={hashtag.id}
                                            onClick={() => router.push(`/hashtags?tag=${hashtag.tag}`)}
                                            className="w-full p-3 border border-border rounded-lg hover:bg-muted transition-colors text-left"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <Hash className="w-4 h-4 text-blue-500" />
                                                        <span className="font-semibold text-sm">#{hashtag.tag}</span>
                                                        {hashtag.trending && (
                                                            <TrendingUp className="w-3 h-3 text-orange-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">{hashtag.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">{hashtag.posts}</p>
                                                    <p className="text-xs text-muted-foreground">posts</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {showEmptyState && (
                    <div className="p-8 text-center">
                        <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No results found</h3>
                        <p className="text-muted-foreground text-sm">
                            Try searching for something else or check your spelling
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {isSearching && (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Searching...</p>
                    </div>
                )}
            </div>
            
            <BottomNavigation currentPage="search" />
        </div>
    );
}
