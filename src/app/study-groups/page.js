"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/Toast";
import {
  Users,
  Search,
  Plus,
  BookOpen,
  Clock,
  MapPin,
  Star,
  MessageCircle,
  Filter,
  Calendar,
  Zap,
} from "lucide-react";

export default function StudyGroupsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const studyGroups = [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      subject: "CSE-201",
      members: 24,
      maxMembers: 30,
      description: "Preparing for mid-semester exams. We meet every Tuesday and Thursday.",
      tags: ["DSA", "Programming", "Competitive"],
      difficulty: "Intermediate",
      nextMeeting: "Today, 6:00 PM",
      location: "Library - Room 201",
      organizer: "Rahul Sharma",
      organizerAvatar: "RS",
      verified: true,
      rating: 4.8,
      activeNow: true,
    },
    {
      id: 2,
      name: "Machine Learning Fundamentals",
      subject: "CSE-412",
      members: 18,
      maxMembers: 25,
      description: "Covering basics of ML algorithms and Python implementation.",
      tags: ["ML", "Python", "AI"],
      difficulty: "Advanced",
      nextMeeting: "Tomorrow, 4:00 PM",
      location: "CS Department - Lab 3",
      organizer: "Priya Mehta",
      organizerAvatar: "PM",
      verified: true,
      rating: 4.9,
      activeNow: false,
    },
    {
      id: 3,
      name: "Mathematics for Engineers",
      subject: "MATH-101",
      members: 32,
      maxMembers: 40,
      description: "Calculus, Linear Algebra, and Differential Equations study group.",
      tags: ["Mathematics", "Engineering", "Calculus"],
      difficulty: "Beginner",
      nextMeeting: "Friday, 3:00 PM",
      location: "Math Department",
      organizer: "Arjun Singh",
      organizerAvatar: "AS",
      verified: false,
      rating: 4.6,
      activeNow: true,
    },
    {
      id: 4,
      name: "Database Management Systems",
      subject: "CSE-301",
      members: 15,
      maxMembers: 20,
      description: "SQL, NoSQL, and database design concepts.",
      tags: ["Database", "SQL", "Backend"],
      difficulty: "Intermediate",
      nextMeeting: "Monday, 7:00 PM",
      location: "Online - Google Meet",
      organizer: "Sneha Gupta",
      organizerAvatar: "SG",
      verified: true,
      rating: 4.7,
      activeNow: false,
    },
  ];

  const filters = [
    { id: "all", label: "All Groups", count: studyGroups.length },
    { id: "active", label: "Active Now", count: studyGroups.filter(g => g.activeNow).length },
    { id: "beginner", label: "Beginner", count: studyGroups.filter(g => g.difficulty === "Beginner").length },
    { id: "intermediate", label: "Intermediate", count: studyGroups.filter(g => g.difficulty === "Intermediate").length },
    { id: "advanced", label: "Advanced", count: studyGroups.filter(g => g.difficulty === "Advanced").length },
  ];

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = selectedFilter === "all" ||
      (selectedFilter === "active" && group.activeNow) ||
      group.difficulty.toLowerCase() === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleJoinGroup = (group) => {
    toast({
      title: "Joined Study Group! 🎉",
      description: `You've joined "${group.name}". Check your notifications for meeting details.`,
      type: "success",
    });
  };

  const handleCreateGroup = () => {
    toast({
      title: "Create Study Group",
      description: "Group creation feature coming soon! 🚀",
      type: "info",
    });
  };

  return (
    <PageLayout
      title="Study Groups"
      subtitle="Find and join study groups for your subjects"
      icon={Users}
    >
      <div className="space-y-6">
        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by subject, topic, or group name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleCreateGroup} className="btn-scale glow">
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="btn-scale whitespace-nowrap"
            >
              <Filter className="w-3 h-3 mr-1" />
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Groups</p>
                  <p className="text-2xl font-bold">{studyGroups.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subjects Covered</p>
                  <p className="text-2xl font-bold">15+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Live Sessions</p>
                  <p className="text-2xl font-bold">{studyGroups.filter(g => g.activeNow).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Groups List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="glass card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      {group.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                      {group.activeNow && (
                        <Badge variant="success" className="text-xs animate-pulse">
                          Live
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {group.subject}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{group.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {group.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Group Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{group.members}/{group.maxMembers} members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={group.difficulty === "Beginner" ? "success" :
                        group.difficulty === "Intermediate" ? "warning" : "destructive"}
                      className="text-xs"
                    >
                      {group.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{group.nextMeeting}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{group.location}</span>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {group.organizerAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {group.organizer}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="btn-scale"
                      onClick={() => toast({ title: "Chat", description: "Group chat coming soon! 💬", type: "info" })}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleJoinGroup(group)}
                      disabled={group.members >= group.maxMembers}
                      className="btn-scale"
                    >
                      {group.members >= group.maxMembers ? "Full" : "Join"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <Card className="glass">
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No study groups found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or create a new study group.
              </p>
              <Button onClick={handleCreateGroup} className="btn-scale">
                <Plus className="w-4 h-4 mr-2" />
                Create Study Group
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      <BottomNavigation currentPage="study-groups" />
    </PageLayout>
  );
}
