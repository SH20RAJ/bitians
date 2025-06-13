export const FEED_POSTS = [
  {
    id: '1',
    author: {
      name: 'Rahul Sharma',
      username: '@rahul_k23',
      batch: 'K23',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      verified: false
    },
    content: 'Just finished my machine learning project on sentiment analysis! The results are amazing 🤖 #MachineLearning #BITMesra #TechLife',
    type: 'text',
    timestamp: '2 hours ago',
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8,
      views: 234
    },
    tags: ['#MachineLearning', '#BITMesra', '#TechLife']
  },
  {
    id: '2',
    author: {
      name: 'Priya Singh',
      username: '@priya_singh',
      batch: 'K22',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face',
      verified: true
    },
    content: 'Amazing sunset view from the hostel rooftop! BIT campus never fails to amaze me 🌅',
    type: 'image',
    media: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
    ],
    timestamp: '4 hours ago',
    engagement: {
      likes: 89,
      comments: 23,
      shares: 15,
      views: 456
    },
    tags: ['#BITLife', '#Sunset', '#Campus']
  },
  {
    id: '3',
    author: {
      name: 'Tech Society BIT',
      username: '@techsociety_bit',
      batch: 'Official',
      avatar: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop',
      verified: true,
      isClub: true
    },
    content: '🚀 Exciting news! Our annual TechFest 2024 registrations are now open! Join us for 3 days of innovation, coding competitions, and workshops. Register now!',
    type: 'announcement',
    timestamp: '6 hours ago',
    engagement: {
      likes: 156,
      comments: 34,
      shares: 67,
      views: 892
    },
    tags: ['#TechFest2024', '#Innovation', '#Coding'],
    isPinned: true
  },
  {
    id: '4',
    author: {
      name: 'Anjali Gupta',
      username: '@anjali_g',
      batch: 'K21',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      verified: false
    },
    content: 'Looking for a study group for Data Structures and Algorithms! Drop a comment if you\'re interested 📚 #StudyGroup #DSA',
    type: 'text',
    timestamp: '8 hours ago',
    engagement: {
      likes: 23,
      comments: 18,
      shares: 5,
      views: 167
    },
    tags: ['#StudyGroup', '#DSA', '#Academics']
  },
  {
    id: '5',
    author: {
      name: 'Arjun Patel',
      username: '@arjun_codes',
      batch: 'K22',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      verified: false
    },
    content: 'Successfully deployed my first full-stack web application! 🎉 Built with React, Node.js, and MongoDB. Thanks to all the seniors who guided me!',
    type: 'achievement',
    timestamp: '12 hours ago',
    engagement: {
      likes: 78,
      comments: 29,
      shares: 12,
      views: 345
    },
    tags: ['#WebDevelopment', '#FullStack', '#Achievement']
  },
  {
    id: '6',
    author: {
      name: 'Cultural Society',
      username: '@cultural_bit',
      batch: 'Official',
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      verified: true,
      isClub: true
    },
    content: '🎭 Auditions for the annual drama competition are starting next week! Show your acting skills and be part of our amazing theatrical community.',
    type: 'event',
    timestamp: '1 day ago',
    engagement: {
      likes: 92,
      comments: 41,
      shares: 28,
      views: 523
    },
    tags: ['#Drama', '#Auditions', '#Cultural']
  },
  {
    id: '7',
    author: {
      name: 'Kavya Reddy',
      username: '@kavya_r',
      batch: 'K23',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      verified: false
    },
    content: 'Just had the most amazing biryani at the campus mess! Sometimes the simple pleasures of college life hit different 🍛',
    type: 'text',
    timestamp: '1 day ago',
    engagement: {
      likes: 67,
      comments: 35,
      shares: 9,
      views: 234
    },
    tags: ['#MessFood', '#CollegeLife', '#Biryani']
  },
  {
    id: '8',
    author: {
      name: 'Placement Cell BIT',
      username: '@placement_bit',
      batch: 'Official',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      verified: true,
      isClub: true
    },
    content: '📢 Important: Pre-placement talks by top companies start next month! Make sure to attend these sessions to boost your placement preparation. #Placements',
    type: 'announcement',
    timestamp: '2 days ago',
    engagement: {
      likes: 234,
      comments: 56,
      shares: 89,
      views: 1245
    },
    tags: ['#Placements', '#Career', '#PrePlacement'],
    isPinned: true
  },
  {
    id: '9',
    author: {
      name: 'Rohit Kumar',
      username: '@rohit_dev',
      batch: 'K21',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      verified: false
    },
    content: 'Sharing my complete notes for Operating Systems! Hope this helps everyone in their exam prep 📝 #Notes #OS #ExamPrep',
    type: 'resource',
    timestamp: '2 days ago',
    engagement: {
      likes: 145,
      comments: 67,
      shares: 92,
      views: 678
    },
    tags: ['#Notes', '#OS', '#ExamPrep']
  },
  {
    id: '10',
    author: {
      name: 'Sports Committee',
      username: '@sports_bit',
      batch: 'Official',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      verified: true,
      isClub: true
    },
    content: '⚽ Inter-hostel football tournament kicks off this weekend! Come support your hostel team and enjoy the exciting matches.',
    type: 'event',
    timestamp: '3 days ago',
    engagement: {
      likes: 123,
      comments: 45,
      shares: 34,
      views: 567
    },
    tags: ['#Football', '#InterHostel', '#Sports']
  }
] as const;
