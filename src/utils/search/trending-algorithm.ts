'use client';

export interface TrendingItem {
    id: string;
    title: string;
    type: 'hashtag' | 'post' | 'user' | 'topic';
    engagementScore: number;
    recencyScore: number;
    velocityScore: number;
    totalScore: number;
    metadata: {
        likes?: number;
        shares?: number;
        comments?: number;
        views?: number;
        mentions?: number;
        createdAt: string;
        category: string;
    };
}

export interface TrendingWeights {
    engagement: number;
    recency: number;
    velocity: number;
}

const DEFAULT_WEIGHTS: TrendingWeights = {
    engagement: 0.4,
    recency: 0.3,
    velocity: 0.3,
};

/**
 * Calculate engagement score based on likes, shares, comments, and views
 */
function calculateEngagementScore(item: TrendingItem): number {
    const { likes = 0, shares = 0, comments = 0, views = 0 } = item.metadata;

    // Weighted engagement score
    const engagementWeight = {
        likes: 1,
        shares: 2.5, // Shares are more valuable
        comments: 1.5, // Comments show deeper engagement
        views: 0.1, // Views are least valuable but still count
    };

    const totalEngagement =
        likes * engagementWeight.likes +
        shares * engagementWeight.shares +
        comments * engagementWeight.comments +
        views * engagementWeight.views;

    // Normalize to 0-1 scale (log scale to handle large numbers)
    return Math.min(1, Math.log(totalEngagement + 1) / Math.log(1000));
}

/**
 * Calculate recency score based on how recent the content is
 */
function calculateRecencyScore(item: TrendingItem): number {
    const now = Date.now();
    const createdAt = new Date(item.metadata.createdAt).getTime();
    const ageInHours = (now - createdAt) / (1000 * 60 * 60);

    // Exponential decay - content becomes less relevant over time
    // Peak relevance within first 2 hours, then gradual decline
    if (ageInHours <= 2) return 1;
    if (ageInHours <= 24) return Math.exp(-ageInHours / 12);
    if (ageInHours <= 168) return Math.exp(-ageInHours / 48); // Week
    return Math.exp(-ageInHours / 168); // Beyond a week
}

/**
 * Calculate velocity score based on rate of engagement growth
 */
function calculateVelocityScore(item: TrendingItem): number {
    const { likes = 0, shares = 0, comments = 0 } = item.metadata;
    const createdAt = new Date(item.metadata.createdAt).getTime();
    const ageInHours = Math.max(1, (Date.now() - createdAt) / (1000 * 60 * 60));

    const totalEngagement = likes + shares * 2 + comments * 1.5;
    const engagementRate = totalEngagement / ageInHours;

    // Normalize velocity score (log scale)
    return Math.min(1, Math.log(engagementRate + 1) / Math.log(50));
}

/**
 * Calculate overall trending score for an item
 */
export function calculateTrendingScore(
    item: TrendingItem,
    weights: TrendingWeights = DEFAULT_WEIGHTS
): TrendingItem {
    const engagementScore = calculateEngagementScore(item);
    const recencyScore = calculateRecencyScore(item);
    const velocityScore = calculateVelocityScore(item);

    const totalScore =
        engagementScore * weights.engagement +
        recencyScore * weights.recency +
        velocityScore * weights.velocity;

    return {
        ...item,
        engagementScore,
        recencyScore,
        velocityScore,
        totalScore,
    };
}

/**
 * Get trending items sorted by score
 */
export function getTrendingItems(
    items: Omit<TrendingItem, 'engagementScore' | 'recencyScore' | 'velocityScore' | 'totalScore'>[],
    weights?: TrendingWeights,
    limit = 10
): TrendingItem[] {
    const scoredItems = items.map(item =>
        calculateTrendingScore(item as TrendingItem, weights)
    );

    return scoredItems
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, limit);
}

/**
 * Get trending hashtags specifically
 */
export function getTrendingHashtags(
    hashtags: Array<{
        tag: string;
        posts: number;
        trend: 'up' | 'down' | 'stable';
        category: string;
        recentPosts?: number;
        totalEngagement?: number;
    }>,
    limit = 10
): TrendingItem[] {
    const hashtagItems = hashtags.map(hashtag => ({
        id: hashtag.tag.toLowerCase().replace('#', ''),
        title: hashtag.tag,
        type: 'hashtag' as const,
        engagementScore: 0,
        recencyScore: 0,
        velocityScore: 0,
        totalScore: 0,
        metadata: {
            mentions: hashtag.posts,
            likes: hashtag.totalEngagement || hashtag.posts * 3,
            views: hashtag.posts * 10,
            createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
            category: hashtag.category,
        },
    }));

    return getTrendingItems(hashtagItems, undefined, limit);
}

/**
 * Get personalized trending based on user interests
 */
export function getPersonalizedTrending(
    items: TrendingItem[],
    userInterests: string[],
    userActivity: Array<{ category: string; weight: number }>,
    limit = 10
): TrendingItem[] {
    const personalizedItems = items.map(item => {
        let personalizedScore = item.totalScore;

        // Boost score based on user interests
        if (userInterests.includes(item.metadata.category)) {
            personalizedScore *= 1.3;
        }

        // Boost based on user activity patterns
        const activityMatch = userActivity.find(a => a.category === item.metadata.category);
        if (activityMatch) {
            personalizedScore *= (1 + activityMatch.weight * 0.5);
        }

        return { ...item, totalScore: personalizedScore };
    });

    return personalizedItems
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, limit);
}

/**
 * Get trending items by category
 */
export function getTrendingByCategory(
    items: TrendingItem[],
    category: string,
    limit = 5
): TrendingItem[] {
    return items
        .filter(item => item.metadata.category.toLowerCase() === category.toLowerCase())
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, limit);
}

/**
 * Get trending velocity leaders (fastest growing content)
 */
export function getTrendingVelocityLeaders(
    items: TrendingItem[],
    limit = 5
): TrendingItem[] {
    return items
        .sort((a, b) => b.velocityScore - a.velocityScore)
        .slice(0, limit);
}
