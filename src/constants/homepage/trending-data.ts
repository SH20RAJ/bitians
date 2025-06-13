export const TRENDING_HASHTAGS = [
  {
    tag: '#TechFest2024',
    posts: 234,
    trend: 'up',
    category: 'events'
  },
  {
    tag: '#Placements',
    posts: 189,
    trend: 'up',
    category: 'career'
  },
  {
    tag: '#StudyGroup',
    posts: 156,
    trend: 'stable',
    category: 'academic'
  },
  {
    tag: '#MachineLearning',
    posts: 134,
    trend: 'up',
    category: 'tech'
  },
  {
    tag: '#BITLife',
    posts: 298,
    trend: 'up',
    category: 'campus'
  },
  {
    tag: '#Coding',
    posts: 167,
    trend: 'up',
    category: 'tech'
  }
] as const;

export const FEATURED_CIRCLES = [
  {
    id: 'programming-hub',
    name: 'Programming Hub',
    description: 'Coding enthusiasts and competitive programmers',
    members: 1245,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop',
    isVerified: true
  },
  {
    id: 'placement-prep',
    name: 'Placement Preparation',
    description: 'Interview prep, resume building, and career guidance',
    members: 987,
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop',
    isVerified: true
  },
  {
    id: 'photography-club',
    name: 'Photography Club',
    description: 'Capture and share beautiful moments of campus life',
    members: 654,
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop',
    isVerified: false
  },
  {
    id: 'fitness-enthusiasts',
    name: 'Fitness Enthusiasts',
    description: 'Stay fit and healthy with workout tips and motivation',
    members: 432,
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    isVerified: false
  }
] as const;
