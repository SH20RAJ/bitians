'use client';

interface UserStatsProps {
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const statItems = [
    { label: 'Posts', value: formatNumber(stats.posts), key: 'posts' },
    { label: 'Followers', value: formatNumber(stats.followers), key: 'followers' },
    { label: 'Following', value: formatNumber(stats.following), key: 'following' },
    { label: 'Likes', value: formatNumber(stats.likes), key: 'likes' }
  ];

  return (
    <div className="grid grid-cols-4 py-4 border-b border-border">
      {statItems.map((item) => (
        <button
          key={item.key}
          className="flex flex-col items-center py-2 hover:bg-muted/50 transition-colors rounded-lg"
        >
          <span className="text-lg font-bold text-foreground">{item.value}</span>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
