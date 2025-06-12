"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useTheme } from "@/components/ThemeProvider";
import {
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Users,
  Calendar,
  MapPin,
  Trophy,
  Sparkles,
  Sun,
  Moon,
  Search,
  Bell,
  Settings,
  Plus,
  Home,
  User,
  ShoppingBag,
  GraduationCap,
  Coffee,
  Zap,
  Star,
} from "lucide-react";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featuredPosts = [
    {
      id: 1,
      author: "Arjun Sharma",
      avatar: "AS",
      time: "2h",
      content: "Just aced my Data Structures exam! 🎉 Thanks to the amazing study group we formed last week. Collaboration really works!",
      likes: 42,
      comments: 8,
      branch: "CSE",
      year: "2nd Year"
    },
    {
      id: 2,
      author: "Priya Mehta",
      avatar: "PM",
      time: "4h",
      content: "Anyone interested in a weekend trek to Hundru Falls? Looking for adventure buddies! 🏔️",
      likes: 28,
      comments: 15,
      branch: "ECE",
      year: "3rd Year"
    },
    {
      id: 3,
      author: "Rahul Singh",
      avatar: "RS",
      time: "6h",
      content: "Selling my Java programming books - perfect condition! Great for semester prep. DM if interested 📚",
      likes: 19,
      comments: 5,
      branch: "IT",
      year: "4th Year"
    }
  ];

  const quickActions = [
    { icon: Users, label: "Study Groups", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: BookOpen, label: "Notes Share", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: ShoppingBag, label: "BitMart", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Calendar, label: "Events", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: MapPin, label: "Lost & Found", color: "text-red-500", bg: "bg-red-500/10" },
    { icon: Coffee, label: "Confessions", color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  const stats = [
    { label: "Active Students", value: "2.5K+", icon: Users },
    { label: "Study Groups", value: "150+", icon: BookOpen },
    { label: "Events This Month", value: "25+", icon: Calendar },
    { label: "Notes Shared", value: "500+", icon: GraduationCap },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">BITians.org</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search students, groups, events..."
                  className="pl-10 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">3</span>
                </div>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-lg">SR</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold">Shaswat Raj</h3>
                    <p className="text-sm text-muted-foreground">CSE • 4th Year</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Level 12</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="h-auto p-3 flex-col space-y-2 hover:scale-105 transition-transform"
                    >
                      <div className={`p-2 rounded-lg ${action.bg}`}>
                        <action.icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Community Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-primary">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="What's happening at BIT Mesra today?"
                    className="flex-1 bg-secondary/50 border-0"
                  />
                  <Button size="icon" className="shrink-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Posts */}
            <div className="space-y-4">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="glass hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {post.branch}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{post.year}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="mb-4 leading-relaxed">{post.content}</p>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center space-x-6">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Trending</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <h4 className="font-medium text-sm">#TechFest2024</h4>
                  <p className="text-xs text-muted-foreground">250 posts</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <h4 className="font-medium text-sm">#PlacementPrep</h4>
                  <p className="text-xs text-muted-foreground">189 posts</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <h4 className="font-medium text-sm">#HostelLife</h4>
                  <p className="text-xs text-muted-foreground">156 posts</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    15
                    <br />
                    DEC
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Tech Symposium</h4>
                    <p className="text-xs text-muted-foreground">Auditorium • 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    18
                    <br />
                    DEC
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Cultural Night</h4>
                    <p className="text-xs text-muted-foreground">Main Ground • 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Find Study Buddies
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Previous Year Papers
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Campus Map
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Coffee className="w-4 h-4 mr-2" />
                  Mess Menu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden glass border-t">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: Home, label: "Home", id: "home" },
            { icon: Search, label: "Search", id: "search" },
            { icon: Plus, label: "Post", id: "post" },
            { icon: Bell, label: "Notifications", id: "notifications" },
            { icon: User, label: "Profile", id: "profile" },
          ].map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex-col space-y-1 ${activeTab === item.id ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
