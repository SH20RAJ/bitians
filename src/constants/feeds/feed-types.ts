export const FEED_TYPES = [
  {
    id: 'all',
    label: 'All',
    icon: '📰',
    count: 245
  },
  {
    id: 'text',
    label: 'Text',
    icon: '📝',
    count: 89
  },
  {
    id: 'image',
    label: 'Images',
    icon: '📸',
    count: 67
  },
  {
    id: 'video',
    label: 'Videos',
    icon: '🎥',
    count: 34
  },
  {
    id: 'poll',
    label: 'Polls',
    icon: '📊',
    count: 23
  },
  {
    id: 'event',
    label: 'Events',
    icon: '🎉',
    count: 12
  },
  {
    id: 'confession',
    label: 'Confessions',
    icon: '🤫',
    count: 45
  },
  {
    id: 'newsroom',
    label: 'Newsroom',
    icon: '📢',
    count: 8
  },
  {
    id: 'circles',
    label: 'Circles',
    icon: '👥',
    count: 56
  }
] as const;

export const SORT_OPTIONS = [
  { id: 'latest', label: 'Latest', icon: '🕒' },
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'trending', label: 'Trending', icon: '📈' },
  { id: 'following', label: 'Following', icon: '👥' }
] as const;
