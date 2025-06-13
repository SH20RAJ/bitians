export const MOCK_FEED_DATA = [
  {
    id: 'text-1',
    type: 'text',
    author: {
      id: 'user-1',
      name: 'Rahul Sharma',
      username: 'rahul_k23',
      batch: 'K23',
      avatar: '👨‍💻',
      verified: false,
      isFollowing: false
    },
    content: 'Just finished my machine learning project on sentiment analysis! The results are amazing 🤖 #MachineLearning #BITMesra #TechLife',
    timestamp: '2 hours ago',
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8,
      views: 234,
      isLiked: false,
      isBookmarked: false
    },
    tags: ['#MachineLearning', '#BITMesra', '#TechLife'],
    location: 'Computer Center, BIT Mesra'
  },
  {
    id: 'image-1',
    type: 'image',
    author: {
      id: 'user-2',
      name: 'Priya Singh',
      username: 'priya_singh',
      batch: 'K22',
      avatar: '👩‍🎓',
      verified: true,
      isFollowing: true
    },
    content: 'Amazing sunset view from the hostel rooftop! BIT campus never fails to amaze me 🌅',
    media: [
      { type: 'image', url: 'https://picsum.photos/600/400?random=1', alt: 'Sunset view' },
      { type: 'image', url: 'https://picsum.photos/600/400?random=2', alt: 'Campus view' }
    ],
    timestamp: '4 hours ago',
    engagement: {
      likes: 89,
      comments: 23,
      shares: 15,
      views: 456,
      isLiked: true,
      isBookmarked: false
    },
    tags: ['#BITLife', '#Sunset', '#Campus'],
    location: 'BIT Mesra Hostel'
  },
  {
    id: 'video-1',
    type: 'video',
    author: {
      id: 'user-3',
      name: 'Tech Society BIT',
      username: 'techsociety_bit',
      batch: 'Official',
      avatar: '🏛️',
      verified: true,
      isFollowing: false
    },
    content: '🔥 Highlights from our recent hackathon! 24 hours of non-stop coding and innovation. Congratulations to all participants! 🎉',
    media: [
      { 
        type: 'video', 
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://picsum.photos/600/400?random=3',
        duration: '2:45'
      }
    ],
    timestamp: '1 day ago',
    engagement: {
      likes: 156,
      comments: 34,
      shares: 67,
      views: 1200,
      isLiked: false,
      isBookmarked: true
    },
    tags: ['#Hackathon', '#TechSociety', '#Innovation'],
    location: 'BIT Mesra Main Auditorium'
  },
  {
    id: 'poll-1',
    type: 'poll',
    author: {
      id: 'user-4',
      name: 'Student Council',
      username: 'student_council',
      batch: 'Official',
      avatar: '🎓',
      verified: true,
      isFollowing: false
    },
    content: 'What should be the theme for this year\'s cultural fest? Help us decide! 🎭',
    poll: {
      question: 'Cultural Fest Theme 2025',
      options: [
        { id: 'opt-1', text: 'Bollywood Nights', votes: 45, percentage: 35 },
        { id: 'opt-2', text: 'Traditional India', votes: 38, percentage: 30 },
        { id: 'opt-3', text: 'Modern Fusion', votes: 25, percentage: 20 },
        { id: 'opt-4', text: 'Global Culture', votes: 19, percentage: 15 }
      ],
      totalVotes: 127,
      endsAt: '2025-06-20T23:59:59Z',
      hasVoted: false,
      userVote: null
    },
    timestamp: '6 hours ago',
    engagement: {
      likes: 67,
      comments: 28,
      shares: 12,
      views: 340,
      isLiked: false,
      isBookmarked: false
    },
    tags: ['#CulturalFest', '#Vote', '#StudentCouncil']
  },
  {
    id: 'confession-1',
    type: 'confession',
    author: {
      id: 'anonymous',
      name: 'Anonymous',
      username: 'anonymous',
      batch: 'K24',
      avatar: '🤫',
      verified: false,
      isFollowing: false
    },
    content: 'I have a huge crush on someone from my branch but I\'m too shy to confess. They\'re so smart and kind. I wish I had the courage to talk to them properly 😔 #Confession #CrushProblems',
    timestamp: '12 hours ago',
    engagement: {
      likes: 234,
      comments: 89,
      shares: 0, // Confessions can't be shared
      views: 567,
      isLiked: false,
      isBookmarked: false
    },
    tags: ['#Confession', '#CrushProblems'],
    isAnonymous: true
  },
  {
    id: 'newsroom-1',
    type: 'newsroom',
    author: {
      id: 'bit-official',
      name: 'BIT Mesra Official',
      username: 'bit_mesra_official',
      batch: 'Official',
      avatar: '🏛️',
      verified: true,
      isFollowing: false
    },
    content: '📢 IMPORTANT ANNOUNCEMENT: New AI & Data Science Lab inaugurated! State-of-the-art facilities with latest GPU servers. Open for all students. Registration starts Monday.',
    media: [
      { type: 'image', url: 'https://picsum.photos/600/400?random=4', alt: 'New AI Lab' }
    ],
    timestamp: '3 hours ago',
    engagement: {
      likes: 345,
      comments: 67,
      shares: 123,
      views: 890,
      isLiked: false,
      isBookmarked: true
    },
    tags: ['#Official', '#AILab', '#NewFacility'],
    isPinned: true,
    isOfficial: true
  },
  {
    id: 'circle-1',
    type: 'circles',
    author: {
      id: 'user-5',
      name: 'Coding Club BIT',
      username: 'coding_club_bit',
      batch: 'Circle',
      avatar: '💻',
      verified: true,
      isFollowing: true
    },
    content: 'Weekly coding challenge solved! 🎉 Congratulations to @rahul_k23 for the most elegant solution. This week\'s challenge: Dynamic Programming on Trees. Join us!',
    circle: {
      id: 'coding-club',
      name: 'Coding Club BIT',
      members: 234,
      type: 'Academic'
    },
    timestamp: '8 hours ago',
    engagement: {
      likes: 78,
      comments: 23,
      shares: 34,
      views: 234,
      isLiked: true,
      isBookmarked: false
    },
    tags: ['#CodingClub', '#Programming', '#Challenge']
  },
  {
    id: 'event-1',
    type: 'event',
    author: {
      id: 'user-6',
      name: 'Cultural Committee',
      username: 'cultural_committee',
      batch: 'Official',
      avatar: '🎭',
      verified: true,
      isFollowing: false
    },
    content: 'Get ready for the biggest event of the year! 🎉 Annual Cultural Fest registration is now open. Amazing prizes, celebrity performances, and unforgettable memories await!',
    event: {
      id: 'cultural-fest-2025',
      title: 'Annual Cultural Fest 2025',
      date: '2025-07-15',
      time: '18:00',
      location: 'Main Auditorium, BIT Mesra',
      attendees: 456,
      maxAttendees: 1000,
      isAttending: false
    },
    timestamp: '1 day ago',
    engagement: {
      likes: 567,
      comments: 123,
      shares: 234,
      views: 1234,
      isLiked: false,
      isBookmarked: true
    },
    tags: ['#CulturalFest', '#Event', '#Registration']
  }
] as const;
