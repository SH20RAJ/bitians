// Update the profile Card component's className

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { RichText } from '@/components/ui/RichText';
import { MediaGrid } from '@/components/ui/MediaPlayer';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import {
    Heart,
    MessageCircle,
    Share2,
    MoreVertical,
    MapPin,
    Calendar,
    Users,
    Star,
    Code,
    GraduationCap,
    Settings,
    UserPlus,
    UserCheck,
    Eye,
    Grid3X3,
    List,
    TrendingUp,
    Trophy,
    ThumbsUp,
    Sparkles,
    Crown
} from 'lucide-react';

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [applauds, setApplauds] = useState(new Set());
    const { toast } = useToast();

    // Enhanced mock user data
    const mockUsers = {
        'alex_johnson': {
            id: 'alex_johnson',
            name: 'Alex Johnson',
            username: 'alex_johnson',
            avatar: 'AJ',
            kBatch: 'K21',
            branch: 'Computer Science & Engineering',
            year: '4th Year',
            bio: 'Full Stack Developer | Open Source Enthusiast | Tech Community Builder | Always learning something new 🚀',
            location: 'BIT Mesra, Ranchi',
            joinedDate: 'August 2020',
            isVerified: true,

            // Enhanced stats
            stats: {
                posts: 189,
                followers: 1847,
                following: 623,
                totalLikes: 12456,
                totalComments: 3420,
                totalShares: 856,
                applaudsReceived: 234
            },

            relationshipStatus: 'Single',

            achievements: [
                { title: 'Microsoft Student Partner', year: '2024', icon: '💼', color: 'bg-blue-500' },
                { title: 'Google Summer of Code', year: '2023', icon: '🌟', color: 'bg-green-500' },
                { title: 'Hackathon Champion', year: '2023', icon: '🏆', color: 'bg-yellow-500' },
                { title: 'Dean\'s List Scholar', year: '2022', icon: '📚', color: 'bg-purple-500' }
            ],

            skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'TypeScript', 'GraphQL'],
            interests: ['Technology', 'Photography', 'Gaming', 'Music', 'Travel', 'Fitness'],

            activityInsights: {
                engagementRate: '8.5%'
            }
        }
    };

    // Mock posts
    const mockUserPosts = [
        {
            id: 1,
            type: 'image',
            content: 'Just deployed my latest project! 🚀 A full-stack social platform built with React, Node.js, and MongoDB. #coding #fullstack #react #nodejs',
            time: '2h',
            likes: 89,
            comments: 23,
            shares: 12,
            views: 456,
            applauds: 15,
            media: [
                {
                    id: 'm1',
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
                    alt: 'Project deployment screenshot'
                }
            ]
        },
        {
            id: 2,
            type: 'text',
            content: 'Excited to announce that I\'ll be interning at Microsoft this summer! 🎉 #microsoft #internship #azure #grateful',
            time: '1d',
            likes: 234,
            comments: 67,
            shares: 45,
            views: 1200,
            applauds: 78
        }
    ];

    useEffect(() => {
        const username = params.username;
        const userData = mockUsers[username] || mockUsers['alex_johnson'];

        setUser(userData);
        setPosts(mockUserPosts);
        setIsLoading(false);
    }, [params.username]);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        toast({
            title: isFollowing ? 'Unfollowed' : 'Following!',
            description: isFollowing ? `You unfollowed ${user.name}` : `You are now following ${user.name}`,
            duration: 3000,
        });
    };

    const handleApplaud = (postId) => {
        const newApplauds = new Set(applauds);
        if (newApplauds.has(postId)) {
            newApplauds.delete(postId);
        } else {
            newApplauds.add(postId);
            toast({
                title: '👏 Applauded!',
                description: 'You gave an applaud for their contribution!',
                duration: 2000,
            });
        }
        setApplauds(newApplauds);
    };

    if (isLoading) {
        return (
            <PageLayout>
                <div className="container mx-auto px-4 py-6 max-w-6xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-64 bg-muted rounded-lg"></div>
                        <div className="h-32 bg-muted rounded-lg"></div>
                    </div>
                </div>
            </PageLayout>
        );
    }

    if (!user) {
        return (
            <PageLayout>
                <div className="container mx-auto px-4 py-6 max-w-6xl text-center">
                    <h1 className="text-2xl font-bold mb-4">User not found</h1>
                    <p className="text-muted-foreground mb-6">The profile you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/')}>Go Home</Button>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
                <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">

                    {/* Enhanced Profile Header */}
                    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-card via-card to-muted/10">
                        <div className="relative h-48 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20">
                            {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div> */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-30"></div>
                            <div className="absolute bottom-6 left-6 flex items-end gap-6">
                                <div className="relative">
                                    <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
                                        <div className="w-full h-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-3xl font-bold text-primary-foreground">
                                            {user.avatar}
                                        </div>
                                    </Avatar>
                                    {user.isVerified && (
                                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                                            <Star className="w-5 h-5 text-primary-foreground fill-current" />
                                        </div>
                                    )}
                                </div>
                                <div className="text-white mb-4">
                                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                                    <p className="text-lg opacity-90">@{user.username}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <KBatchBadge kBatch={user.kBatch} size="lg" />
                                        <Badge variant="secondary" className="bg-background/80 text-foreground">
                                            {user.branch}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-6 right-6 flex gap-2">
                                <Button
                                    variant={isFollowing ? "secondary" : "default"}
                                    onClick={handleFollow}
                                    className="shadow-lg"
                                >
                                    {isFollowing ? (
                                        <>
                                            <UserCheck className="w-4 h-4 mr-2" />
                                            Following
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Follow
                                        </>
                                    )}
                                </Button>
                                <Button variant="outline" size="icon" className="shadow-lg bg-background/80">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Profile Info */}
                                <div className="lg:col-span-2 space-y-6">

                                    {/* Bio and Details */}
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">{user.bio}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4" />
                                                {user.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                Joined {user.joinedDate}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <GraduationCap className="w-4 h-4" />
                                                {user.year}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Heart className="w-4 h-4" />
                                                {user.relationshipStatus}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enhanced Stats */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <Card className="p-4 text-center hover:shadow-md transition-shadow">
                                            <div className="text-2xl font-bold text-primary">{user.stats.posts}</div>
                                            <div className="text-sm text-muted-foreground">Posts</div>
                                        </Card>
                                        <Card className="p-4 text-center hover:shadow-md transition-shadow">
                                            <div className="text-2xl font-bold text-primary">{user.stats.followers}</div>
                                            <div className="text-sm text-muted-foreground">Followers</div>
                                        </Card>
                                        <Card className="p-4 text-center hover:shadow-md transition-shadow">
                                            <div className="text-2xl font-bold text-primary">{user.stats.following}</div>
                                            <div className="text-sm text-muted-foreground">Following</div>
                                        </Card>
                                        <Card className="p-4 text-center hover:shadow-md transition-shadow">
                                            <div className="text-2xl font-bold text-primary">{user.stats.applaudsReceived}</div>
                                            <div className="text-sm text-muted-foreground">Applauds</div>
                                        </Card>
                                    </div>

                                    {/* Activity Stats */}
                                    <Card className="p-6">
                                        <CardHeader className="px-0 pt-0">
                                            <CardTitle className="flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-primary" />
                                                Activity Overview
                                            </CardTitle>
                                        </CardHeader>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-green-600">{user.stats.totalLikes.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">Total Likes Received</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-blue-600">{user.stats.totalComments.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">Comments Made</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-purple-600">{user.stats.totalShares}</div>
                                                <div className="text-xs text-muted-foreground">Posts Shared</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-orange-600">{user.activityInsights.engagementRate}</div>
                                                <div className="text-xs text-muted-foreground">Engagement Rate</div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Right Sidebar */}
                                <div className="space-y-6">

                                    {/* Achievements */}
                                    <Card className="p-6">
                                        <CardHeader className="px-0 pt-0">
                                            <CardTitle className="flex items-center gap-2">
                                                <Trophy className="w-5 h-5 text-yellow-500" />
                                                Achievements
                                            </CardTitle>
                                        </CardHeader>
                                        <div className="space-y-3">
                                            {user.achievements.map((achievement, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                                    <div className={`w-10 h-10 rounded-full ${achievement.color} flex items-center justify-center text-white text-lg`}>
                                                        {achievement.icon}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm">{achievement.title}</div>
                                                        <div className="text-xs text-muted-foreground">{achievement.year}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Skills */}
                                    <Card className="p-6">
                                        <CardHeader className="px-0 pt-0">
                                            <CardTitle className="flex items-center gap-2">
                                                <Code className="w-5 h-5 text-primary" />
                                                Skills
                                            </CardTitle>
                                        </CardHeader>
                                        <div className="flex flex-wrap gap-2">
                                            {user.skills.map((skill, index) => (
                                                <Badge key={index} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Interests */}
                                    <Card className="p-6">
                                        <CardHeader className="px-0 pt-0">
                                            <CardTitle className="flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-purple-500" />
                                                Interests
                                            </CardTitle>
                                        </CardHeader>
                                        <div className="flex flex-wrap gap-2">
                                            {user.interests.map((interest, index) => (
                                                <Badge key={index} variant="outline" className="hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posts Section */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Grid3X3 className="w-5 h-5" />
                                    Posts & Activity
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                                {posts.map((post) => (
                                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50">
                                        <CardContent className="p-6">
                                            {/* Post Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-10 h-10">
                                                        <div className="w-full h-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-primary-foreground font-bold">
                                                            {user.avatar}
                                                        </div>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm text-muted-foreground">{post.time}</div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            {/* Post Content */}
                                            <div className="mb-4">
                                                <RichText content={post.content} className="leading-relaxed" />
                                            </div>

                                            {/* Media */}
                                            {post.media && post.media.length > 0 && (
                                                <div className="mb-4">
                                                    <MediaGrid mediaItems={post.media} className="rounded-lg overflow-hidden" />
                                                </div>
                                            )}

                                            {/* Post Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                <div className="flex items-center gap-6">
                                                    <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                                                        <Heart className="w-4 h-4" />
                                                        <span className="text-sm font-medium">{post.likes}</span>
                                                    </button>
                                                    <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                                                        <MessageCircle className="w-4 h-4" />
                                                        <span className="text-sm font-medium">{post.comments}</span>
                                                    </button>
                                                    <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                                                        <Share2 className="w-4 h-4" />
                                                        <span className="text-sm font-medium">{post.shares}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleApplaud(post.id)}
                                                        className={`flex items-center gap-2 transition-colors ${applauds.has(post.id)
                                                            ? 'text-orange-500'
                                                            : 'text-muted-foreground hover:text-orange-500'
                                                            }`}
                                                    >
                                                        <ThumbsUp className={`w-4 h-4 ${applauds.has(post.id) ? 'fill-current' : ''}`} />
                                                        <span className="text-sm font-medium">{post.applauds + (applauds.has(post.id) ? 1 : 0)}</span>
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm">{post.views}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <BottomNavigation currentPage="profile" />
            </div >
        </PageLayout >
    );
}
