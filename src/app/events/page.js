"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/Toast";
import {
  Calendar,
  Search,
  Plus,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Filter,
  Music,
  Code,
  Trophy,
  Briefcase,
  Camera,
  Palette,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

export default function EventsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [interestedEvents, setInterestedEvents] = useState(new Set());

  const events = [
    {
      id: 1,
      title: "TechFest 2024 - Innovation Summit",
      category: "Technical",
      type: "Competition",
      description: "Annual technical festival with coding competitions, robotics, and innovation showcase.",
      date: "2024-12-15",
      time: "09:00 AM",
      endTime: "06:00 PM",
      venue: "Main Auditorium",
      organizer: "Technical Society",
      organizerAvatar: "TS",
      maxParticipants: 500,
      registeredParticipants: 342,
      entryFee: 0,
      prizes: "₹50,000",
      image: "techfest.jpg",
      status: "upcoming",
      featured: true,
      verified: true,
      tags: ["Technology", "Coding", "Innovation", "Competition"],
      interested: 89,
      attendees: [],
      requirements: "Laptop required for coding events",
      contact: "techsoc@bitmesra.ac.in",
      website: "https://techfest.bitmesra.ac.in",
    },
    {
      id: 2,
      title: "Cultural Night - Srijan 2024",
      category: "Cultural",
      type: "Entertainment",
      description: "Annual cultural night featuring dance, music, drama performances by students.",
      date: "2024-12-18",
      time: "06:00 PM",
      endTime: "10:00 PM",
      venue: "Main Ground",
      organizer: "Cultural Committee",
      organizerAvatar: "CC",
      maxParticipants: 1000,
      registeredParticipants: 756,
      entryFee: 50,
      prizes: "Recognition",
      image: "cultural.jpg",
      status: "upcoming",
      featured: true,
      verified: true,
      tags: ["Culture", "Dance", "Music", "Entertainment"],
      interested: 156,
      attendees: [],
      requirements: "Student ID required",
      contact: "cultural@bitmesra.ac.in",
      website: "https://srijan.bitmesra.ac.in",
    },
    {
      id: 3,
      title: "Career Fair 2024",
      category: "Professional",
      type: "Career",
      description: "Meet with top recruiters and explore career opportunities across various industries.",
      date: "2024-12-20",
      time: "10:00 AM",
      endTime: "05:00 PM",
      venue: "Convention Center",
      organizer: "Placement Cell",
      organizerAvatar: "PC",
      maxParticipants: 800,
      registeredParticipants: 234,
      entryFee: 0,
      prizes: "Job Opportunities",
      image: "career.jpg",
      status: "upcoming",
      featured: false,
      verified: true,
      tags: ["Career", "Jobs", "Placement", "Professional"],
      interested: 67,
      attendees: [],
      requirements: "Resume and formal attire required",
      contact: "placement@bitmesra.ac.in",
      website: "https://placement.bitmesra.ac.in",
    },
    {
      id: 4,
      title: "Photography Workshop",
      category: "Workshop",
      type: "Learning",
      description: "Learn professional photography techniques from industry experts.",
      date: "2024-12-14",
      time: "02:00 PM",
      endTime: "05:00 PM",
      venue: "Media Lab",
      organizer: "Photography Club",
      organizerAvatar: "PH",
      maxParticipants: 30,
      registeredParticipants: 28,
      entryFee: 100,
      prizes: "Certificate",
      image: "photography.jpg",
      status: "ongoing",
      featured: false,
      verified: false,
      tags: ["Photography", "Workshop", "Learning", "Creative"],
      interested: 45,
      attendees: [],
      requirements: "Camera preferred but not mandatory",
      contact: "photoclub@bitmesra.ac.in",
      website: "",
    },
    {
      id: 5,
      title: "Startup Pitch Competition",
      category: "Business",
      type: "Competition",
      description: "Present your startup ideas to industry experts and win funding opportunities.",
      date: "2024-12-22",
      time: "11:00 AM",
      endTime: "04:00 PM",
      venue: "Innovation Hub",
      organizer: "Entrepreneurship Cell",
      organizerAvatar: "EC",
      maxParticipants: 50,
      registeredParticipants: 23,
      entryFee: 0,
      prizes: "₹1,00,000",
      image: "startup.jpg",
      status: "upcoming",
      featured: false,
      verified: true,
      tags: ["Startup", "Business", "Entrepreneurship", "Pitch"],
      interested: 34,
      attendees: [],
      requirements: "Business plan required",
      contact: "ecell@bitmesra.ac.in",
      website: "https://ecell.bitmesra.ac.in",
    },
    {
      id: 6,
      title: "Alumni Meetup - CSE Batch 2020",
      category: "Networking",
      type: "Social",
      description: "Reunion event for CSE graduates to network and share experiences.",
      date: "2024-12-12",
      time: "06:00 PM",
      endTime: "09:00 PM",
      venue: "Alumni Hall",
      organizer: "Alumni Association",
      organizerAvatar: "AA",
      maxParticipants: 100,
      registeredParticipants: 67,
      entryFee: 200,
      prizes: "Networking",
      image: "alumni.jpg",
      status: "completed",
      featured: false,
      verified: true,
      tags: ["Alumni", "Networking", "CSE", "Reunion"],
      interested: 78,
      attendees: [],
      requirements: "Alumni verification required",
      contact: "alumni@bitmesra.ac.in",
      website: "https://alumni.bitmesra.ac.in",
    },
  ];

  const categories = [
    { id: "all", label: "All Events", icon: Calendar, count: events.length },
    { id: "Technical", label: "Technical", icon: Code, count: events.filter(e => e.category === "Technical").length },
    { id: "Cultural", label: "Cultural", icon: Music, count: events.filter(e => e.category === "Cultural").length },
    { id: "Professional", label: "Professional", icon: Briefcase, count: events.filter(e => e.category === "Professional").length },
    { id: "Workshop", label: "Workshop", icon: Palette, count: events.filter(e => e.category === "Workshop").length },
    { id: "Business", label: "Business", icon: TrendingUp, count: events.filter(e => e.category === "Business").length },
    { id: "Networking", label: "Networking", icon: Users, count: events.filter(e => e.category === "Networking").length },
  ];

  const filters = [
    { id: "all", label: "All Events", count: events.length },
    { id: "upcoming", label: "Upcoming", count: events.filter(e => e.status === "upcoming").length },
    { id: "ongoing", label: "Live Now", count: events.filter(e => e.status === "ongoing").length },
    { id: "completed", label: "Completed", count: events.filter(e => e.status === "completed").length },
    { id: "featured", label: "Featured", count: events.filter(e => e.featured).length },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "featured" && event.featured) ||
                         event.status === selectedFilter;

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const handleInterested = (eventId) => {
    const newInterested = new Set(interestedEvents);
    if (newInterested.has(eventId)) {
      newInterested.delete(eventId);
      toast({
        title: "Removed Interest",
        description: "Event removed from your interested list",
        type: "info",
        duration: 2000,
      });
    } else {
      newInterested.add(eventId);
      toast({
        title: "Marked as Interested! ⭐",
        description: "You'll receive updates about this event",
        type: "success",
        duration: 2000,
      });
    }
    setInterestedEvents(newInterested);
  };

  const handleRegister = (event) => {
    if (event.registeredParticipants >= event.maxParticipants) {
      toast({
        title: "Event Full",
        description: "This event has reached maximum capacity",
        type: "warning",
      });
      return;
    }

    toast({
      title: "Registration Successful! 🎉",
      description: `You're registered for "${event.title}". Check your email for details.`,
      type: "success",
    });
  };

  const handleCreateEvent = () => {
    toast({
      title: "Create Event",
      description: "Event creation feature coming soon! 📅",
      type: "info",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming": return "info";
      case "ongoing": return "success";
      case "completed": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming": return Clock;
      case "ongoing": return TrendingUp;
      case "completed": return CheckCircle;
      default: return Clock;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <PageLayout 
      title="Events" 
      subtitle="Discover and participate in campus events"
      icon={Calendar}
    >
      <div className="space-y-6">
        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events by title, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleCreateEvent} className="btn-scale glow">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="btn-scale whitespace-nowrap"
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {category.label} ({category.count})
              </Button>
            );
          })}
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
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Live Events</p>
                  <p className="text-2xl font-bold">{events.filter(e => e.status === "ongoing").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-2xl font-bold">1.4K+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const StatusIcon = getStatusIcon(event.status);
            return (
              <Card key={event.id} className="glass card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                        {event.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">✓</span>
                          </div>
                        )}
                        {event.featured && (
                          <Badge variant="gradient" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                        <Badge variant={getStatusColor(event.status)} className="text-xs flex items-center space-x-1">
                          <StatusIcon className="w-3 h-3" />
                          <span>{event.status === "ongoing" ? "Live" : event.status}</span>
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleInterested(event.id)}
                      className={`btn-scale ${interestedEvents.has(event.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
                    >
                      <Star className={`w-4 h-4 ${interestedEvents.has(event.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{event.time} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{event.registeredParticipants}/{event.maxParticipants}</span>
                    </div>
                  </div>

                  {/* Entry Fee and Prizes */}
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">
                        Entry Fee: {event.entryFee === 0 ? "Free" : `₹${event.entryFee}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Prizes: {event.prizes}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {event.interested + (interestedEvents.has(event.id) ? 1 : 0)} interested
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Organizer and Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {event.organizerAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{event.organizer}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="btn-scale"
                        onClick={() => toast({ title: "Share Event", description: "Sharing feature coming soon! 📤", type: "info" })}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleRegister(event)}
                        disabled={event.registeredParticipants >= event.maxParticipants || event.status === "completed"}
                        className="btn-scale"
                      >
                        {event.status === "completed" ? "Completed" :
                         event.registeredParticipants >= event.maxParticipants ? "Full" : "Register"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="glass">
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or create a new event.
              </p>
              <Button onClick={handleCreateEvent} className="btn-scale">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
