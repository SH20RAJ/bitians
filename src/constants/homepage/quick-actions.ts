import { Users, BookOpen, Calendar, MessageSquare, Gamepad2, ShoppingBag, Heart, Settings } from 'lucide-react';

export const QUICK_ACTIONS = [
  {
    id: 'study-groups',
    title: 'Study Groups',
    subtitle: 'Join academic circles',
    icon: Users,
    href: '/study-groups',
    color: 'bg-blue-500',
    description: 'Collaborative learning groups for all subjects'
  },
  {
    id: 'notes',
    title: 'Notes',
    subtitle: 'Share & access notes',
    icon: BookOpen,
    href: '/notes',
    color: 'bg-green-500',
    description: 'Academic resources shared by students'
  },
  {
    id: 'events',
    title: 'Events',
    subtitle: 'Campus happenings',
    icon: Calendar,
    href: '/events',
    color: 'bg-purple-500',
    description: 'Cultural, technical and social events'
  },
  {
    id: 'confessions',
    title: 'Confessions',
    subtitle: 'Anonymous thoughts',
    icon: MessageSquare,
    href: '/confessions',
    color: 'bg-pink-500',
    description: 'Share anonymously with the community'
  },
  {
    id: 'hot-or-not',
    title: 'Hot or Not',
    subtitle: 'Rate & discover',
    icon: Heart,
    href: '/hot-or-not',
    color: 'bg-red-500',
    description: 'Rate and discover interesting content'
  },
  {
    id: 'bitmart',
    title: 'BitMart',
    subtitle: 'Buy & sell items',
    icon: ShoppingBag,
    href: '/bitmart',
    color: 'bg-orange-500',
    description: 'Campus marketplace for students'
  },
  {
    id: 'circles',
    title: 'Circles',
    subtitle: 'Interest communities',
    icon: Gamepad2,
    href: '/circles',
    color: 'bg-indigo-500',
    description: 'Join communities based on your interests'
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'Customize experience',
    icon: Settings,
    href: '/settings',
    color: 'bg-gray-500',
    description: 'Personalize your BITians experience'
  }
] as const;
