'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { MediaPlayer, MediaGrid } from '@/components/ui/MediaPlayer';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { RichText } from '@/components/ui/RichText';
import BottomNavigation from '@/components/BottomNavigation';
import { 
  Edit3, 
  Settings, 
  Share2, 
  MapPin,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  Trophy,
  Star,
  Camera,
  Grid3X3,
  List,
  ArrowLeft
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    bio: '🎓 Final Year CSE | 💻 Full Stack Developer | 🚀 Tech Enthusiast | Love #coding and #innovation',
    location: 'BIT Mesra, Ranchi',
    email: 'alex.johnson@bitmesra.ac.in',
    phone: '+91 9876543210',
    joinDate: 'August 2021',
    branch: 'Computer Science & Engineering',
    year: '4th Year',
    kBatch: 'K21',
    followers: 234,
    following: 189,
    posts: 67
  });

  const [userPosts] = useState([
    {
      id: 1,
      content: 'Just finished my final year project presentation! 🎉 The professors were really impressed with our AI-based solution. Thanks to @professor_sharma for the guidance and @team_alpha for the amazing collaboration. #fyp #ai #bitmesra #graduation',
      timeAgo: '2 hours ago',
      likes: 45,
      comments: 12,
      type: 'multimedia',
      media: [
        {
          id: "p1",
          type: "image",
          url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
          alt: "Final year project presentation",
          caption: "Our AI-based solution presentation slides"
        },
        {
          id: "p2", 
          type: "video",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
          caption: "Project demo video"
        }
      ]
    },
    {
      id: 2,
      content: 'Amazing sunset from the hostel rooftop! BIT Mesra campus looks beautiful in golden hour ✨ Perfect spot for relaxation after a long day of coding. #sunset #hostellife #bitmesra #photography #peaceful',
      timeAgo: '1 day ago',
      likes: 67,
      comments: 8,
      type: 'multimedia',
      media: [
        {
          id: "p3",
          type: "image",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
          alt: "Beautiful sunset from hostel rooftop",
          caption: "Golden hour at BIT Mesra"
        }
      ]
    },
    {
      id: 3,
      content: 'Tech fest preparations are going great! Our team is ready to showcase our innovations 💻 Special shoutout to @sarah_tech and @rohit_dev for their incredible work. #techfest #innovation #teamwork #coding #hackathon',
      timeAgo: '3 days ago',
      likes: 23,
      comments: 15,
      type: 'text'
    }
  ]);

  const achievements = [
    { title: 'Academic Excellence', description: 'Maintained 9+ CGPA', icon: Trophy, color: 'text-yellow-500' },
    { title: 'Tech Leader', description: 'Led 5+ projects', icon: Star, color: 'text-blue-500' },
    { title: 'Community Star', description: '100+ helpful posts', icon: Heart, color: 'text-red-500' },
    { title: 'Event Organizer', description: 'Organized 3 events', icon: Users, color: 'text-green-500' }
  ];

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would save the profile data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Profile</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleEditProfile}
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-20">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
            
            {/* Profile Info */}
            <div className="px-6 pb-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4">
                <Avatar className="w-32 h-32 border-4 border-white bg-blue-500 text-white text-2xl font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Basic Info */}
              <div className="space-y-3">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="text-xl font-bold"
                    />
                    <textarea 
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full p-2 border rounded-lg resize-none"
                      rows="2"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-2xl font-bold">{profileData.name}</h2>
                      <KBatchBadge kBatch={profileData.kBatch} size="md" />
                    </div>
                    <RichText 
                      content={profileData.bio}
                      className="text-gray-600"
                      onHashtagClick={(hashtag) => {
                        console.log('Hashtag clicked:', hashtag);
                      }}
                      onMentionClick={(username) => {
                        console.log('Mention clicked:', username);
                      }}
                    />
                  </>
                )}

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {profileData.branch}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {profileData.year}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.location}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 pt-3">
                  <div className="text-center">
                    <div className="font-bold text-lg">{profileData.posts}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{profileData.followers}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{profileData.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} className="flex-1">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleEditProfile} className="flex-1">
                        Edit Profile
                      </Button>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="mb-6">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <IconComponent className={`w-5 h-5 mr-3 ${achievement.color}`} />
                    <div>
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex bg-white rounded-lg mb-4 p-1">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              activeTab === 'posts' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Posts
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              activeTab === 'saved' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
          </button>
        </div>

        {/* Content */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10 bg-blue-500 text-white font-semibold">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{profileData.name}</h3>
                        <KBatchBadge kBatch={profileData.kBatch} size="sm" />
                        <span className="text-sm text-gray-500">{post.timeAgo}</span>
                      </div>
                      
                      <div className="mt-2">
                        <RichText 
                          content={post.content}
                          className="text-gray-800"
                          onHashtagClick={(hashtag) => {
                            console.log('Hashtag clicked:', hashtag);
                          }}
                          onMentionClick={(username) => {
                            console.log('Mention clicked:', username);
                          }}
                        />
                      </div>
                      
                      {/* Media Content */}
                      {post.media && post.media.length > 0 && (
                        <div className="mt-3">
                          <MediaGrid 
                            mediaItems={post.media}
                            className="rounded-lg overflow-hidden"
                            onMediaClick={(media) => {
                              console.log('Media clicked:', media);
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <Card className="p-8 text-center">
            <Bookmark className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Saved Posts</h3>
            <p className="text-gray-500">Posts you save will appear here</p>
          </Card>
        )}
      </div>

      <BottomNavigation currentPage="profile" />
    </div>
  );
}
