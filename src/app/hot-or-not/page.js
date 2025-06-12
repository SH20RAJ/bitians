'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import {
    Heart,
    X,
    Flame,
    Trophy,
    TrendingUp,
    Users,
    Star,
    Crown,
    Award,
    Target,
    Zap,
    RotateCcw,
    Share2,
    Eye,
    ArrowLeft
} from 'lucide-react';

export default function HotOrNotPage() {
    const [currentProfile, setCurrentProfile] = useState(null);
    const [profileQueue, setProfileQueue] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [userStats, setUserStats] = useState({
        rating: 0,
        votes: 0,
        rank: 0,
        hotStreak: 0
    });
    const [view, setView] = useState('swipe'); // 'swipe' or 'leaderboard'
    const { toast } = useToast();

    useEffect(() => {
        // Simulate fetching profiles for hot or not
        const mockProfiles = [
            {
                id: 1,
                name: 'Priya Sharma',
                avatar: 'PS',
                branch: 'CSE',
                year: '2nd Year',
                bio: 'Love coding and coffee ☕ | Photography enthusiast 📸',
                rating: 4.2,
                totalVotes: 156,
                interests: ['coding', 'photography', 'music'],
                verified: true
            },
            {
                id: 2,
                name: 'Arjun Kumar',
                avatar: 'AK',
                branch: 'ECE',
                year: '3rd Year',
                bio: 'Guitarist 🎸 | Tech geek | Fitness enthusiast 💪',
                rating: 4.5,
                totalVotes: 203,
                interests: ['music', 'fitness', 'technology'],
                verified: false
            },
            {
                id: 3,
                name: 'Sneha Gupta',
                avatar: 'SG',
                branch: 'IT',
                year: '1st Year',
                bio: 'Artist 🎨 | Dancer | Bookworm 📚',
                rating: 4.1,
                totalVotes: 98,
                interests: ['art', 'dance', 'reading'],
                verified: true
            }
        ];

        const mockLeaderboard = [
            {
                id: 1,
                name: 'Arjun Kumar',
                avatar: 'AK',
                branch: 'ECE',
                rating: 4.5,
                votes: 203,
                rank: 1,
                change: '+2'
            },
            {
                id: 2,
                name: 'Priya Sharma',
                avatar: 'PS',
                branch: 'CSE',
                rating: 4.2,
                votes: 156,
                rank: 2,
                change: '-1'
            },
            {
                id: 3,
                name: 'Sneha Gupta',
                avatar: 'SG',
                branch: 'IT',
                rating: 4.1,
                votes: 98,
                rank: 3,
                change: '+1'
            },
            {
                id: 4,
                name: 'Rohit Verma',
                avatar: 'RV',
                branch: 'CSE',
                rating: 3.9,
                votes: 145,
                rank: 4,
                change: '-2'
            },
            {
                id: 5,
                name: 'Anita Singh',
                avatar: 'AS',
                branch: 'ECE',
                rating: 3.8,
                votes: 89,
                rank: 5,
                change: '0'
            }
        ];

        setProfileQueue(mockProfiles);
        setCurrentProfile(mockProfiles[0]);
        setLeaderboard(mockLeaderboard);
        setUserStats({
            rating: 3.7,
            votes: 67,
            rank: 8,
            hotStreak: 3
        });
    }, []);

    const handleVote = (isHot) => {
        if (!currentProfile) return;

        // Show next profile
        const remainingProfiles = profileQueue.slice(1);
        if (remainingProfiles.length > 0) {
            setCurrentProfile(remainingProfiles[0]);
            setProfileQueue(remainingProfiles);
        } else {
            // Reload profiles or show completion message
            toast({
                title: 'No more profiles to rate!',
                description: 'Check back later for more profiles.',
                type: 'info'
            });
            setCurrentProfile(null);
        }

        // Update user stats
        setUserStats(prev => ({
            ...prev,
            votes: prev.votes + 1,
            hotStreak: isHot ? prev.hotStreak + 1 : 0
        }));

        toast({
            title: isHot ? '🔥 Hot vote cast!' : '❄️ Not vote cast!',
            type: 'success'
        });
    };

    const handleSkip = () => {
        const remainingProfiles = profileQueue.slice(1);
        if (remainingProfiles.length > 0) {
            setCurrentProfile(remainingProfiles[0]);
            setProfileQueue(remainingProfiles);
        }
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
            case 2: return <Award className="h-5 w-5 text-gray-400" />;
            case 3: return <Trophy className="h-5 w-5 text-orange-600" />;
            default: return <Target className="h-5 w-5 text-muted-foreground" />;
        }
    };

    const renderSwipeView = () => (
        <div className="max-w-md mx-auto space-y-6">
            {/* User Stats */}
            <Card className="p-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-primary">{userStats.rating}</div>
                        <div className="text-xs text-muted-foreground">Your Rating</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-500">{userStats.votes}</div>
                        <div className="text-xs text-muted-foreground">Votes Cast</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-orange-500">#{userStats.rank}</div>
                        <div className="text-xs text-muted-foreground">Your Rank</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-red-500">{userStats.hotStreak}</div>
                        <div className="text-xs text-muted-foreground">Hot Streak</div>
                    </div>
                </div>
            </Card>

            {/* Profile Card */}
            {currentProfile ? (
                <Card className="overflow-hidden">
                    {/* Profile Image */}
                    <div className="relative h-96 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Avatar className="w-32 h-32">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-4xl flex items-center justify-center w-full h-full">
                                    {currentProfile.avatar}
                                </div>
                            </Avatar>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4">
                            <Badge className="bg-black/50 text-white">
                                ⭐ {currentProfile.rating.toFixed(1)}
                            </Badge>
                        </div>

                        {/* Verified Badge */}
                        {currentProfile.verified && (
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-blue-500 text-white">
                                    ✓ Verified
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="p-6 space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-xl font-bold">{currentProfile.name}</h2>
                                <Badge variant="outline">{currentProfile.branch}</Badge>
                            </div>
                            <p className="text-muted-foreground">{currentProfile.year}</p>
                        </div>

                        <p className="text-sm leading-relaxed">{currentProfile.bio}</p>

                        {/* Interests */}
                        <div className="flex flex-wrap gap-2">
                            {currentProfile.interests.map(interest => (
                                <Badge key={interest} variant="secondary" className="text-xs">
                                    {interest}
                                </Badge>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{currentProfile.totalVotes} votes</span>
                            <span>Rating: {currentProfile.rating.toFixed(1)}/5.0</span>
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className="p-12 text-center">
                    <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No More Profiles</h3>
                    <p className="text-muted-foreground mb-4">Check back later for more profiles to rate!</p>
                    <Button variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </Card>
            )}

            {/* Action Buttons */}
            {currentProfile && (
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleVote(false)}
                        className="flex-1 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
                    >
                        <X className="h-6 w-6 mr-2 text-blue-500" />
                        Not
                    </Button>
                    <Button
                        size="lg"
                        onClick={handleSkip}
                        variant="ghost"
                        className="px-4"
                    >
                        <RotateCcw className="h-5 w-5" />
                    </Button>
                    <Button
                        size="lg"
                        onClick={() => handleVote(true)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                        <Flame className="h-6 w-6 mr-2" />
                        Hot
                    </Button>
                </div>
            )}
        </div>
    );

    const renderLeaderboardView = () => (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Leaderboard Header */}
            <Card className="p-6 text-center bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Hot or Not Leaderboard</h2>
                <p className="text-muted-foreground">Top rated students this week</p>
            </Card>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {leaderboard.slice(0, 3).map((user, index) => (
                    <Card key={user.id} className={`p-4 text-center ${index === 0 ? 'ring-2 ring-yellow-400 bg-gradient-to-t from-yellow-50 to-transparent dark:from-yellow-950/20' :
                        index === 1 ? 'ring-2 ring-gray-400 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-950/20' :
                            'ring-2 ring-orange-400 bg-gradient-to-t from-orange-50 to-transparent dark:from-orange-950/20'
                        }`}>
                        <div className="relative">
                            <Avatar className="mx-auto mb-3 w-16 h-16">
                                <div className={`font-bold text-white flex items-center justify-center w-full h-full ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                                        'bg-gradient-to-r from-orange-400 to-orange-600'
                                    }`}>
                                    {user.avatar}
                                </div>
                            </Avatar>
                            <div className="absolute -top-2 -right-2">
                                {getRankIcon(user.rank)}
                            </div>
                        </div>
                        <h3 className="font-semibold text-sm">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.branch}</p>
                        <div className="mt-2">
                            <div className="text-lg font-bold text-primary">⭐ {user.rating}</div>
                            <div className="text-xs text-muted-foreground">{user.votes} votes</div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Full Leaderboard */}
            <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Full Rankings</h3>
                <div className="space-y-3">
                    {leaderboard.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 w-8">
                                    <span className="font-bold text-lg">#{user.rank}</span>
                                </div>
                                <Avatar className="w-10 h-10">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm flex items-center justify-center w-full h-full">
                                        {user.avatar}
                                    </div>
                                </Avatar>
                                <div>
                                    <h4 className="font-medium">{user.name}</h4>
                                    <p className="text-sm text-muted-foreground">{user.branch}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">⭐ {user.rating}</div>
                                <div className="text-sm text-muted-foreground">{user.votes} votes</div>
                            </div>
                            <div className="flex items-center gap-2">
                                {user.change !== '0' && (
                                    <Badge
                                        variant={user.change.startsWith('+') ? 'default' : 'destructive'}
                                        className="text-xs"
                                    >
                                        {user.change.startsWith('+') ? '↗' : '↘'} {user.change.replace('+', '')}
                                    </Badge>
                                )}
                                <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );

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
                        <h1 className="text-xl font-bold gradient-text">Hot or Not 🔥</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant={view === 'swipe' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setView('swipe')}
                        >
                            <Flame className="w-4 h-4 mr-1" />
                            Rate
                        </Button>
                        <Button
                            variant={view === 'leaderboard' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setView('leaderboard')}
                        >
                            <Trophy className="w-4 h-4 mr-1" />
                            Board
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 pb-20">
                {/* Content */}
                {view === 'swipe' ? renderSwipeView() : renderLeaderboardView()}
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation currentPage="hot" />
        </div>
    );
}