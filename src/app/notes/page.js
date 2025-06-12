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
  BookOpen,
  Search,
  Upload,
  Download,
  Star,
  Eye,
  Filter,
  FileText,
  Image,
  Video,
  Archive,
  Calendar,
  User,
  BookMarked,
  TrendingUp,
} from "lucide-react";

export default function NotesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");

  const notes = [
    {
      id: 1,
      title: "Data Structures Complete Notes",
      subject: "CSE-201",
      semester: "4th",
      branch: "CSE",
      description: "Comprehensive notes covering all topics including Arrays, Linked Lists, Trees, Graphs, and more.",
      fileType: "PDF",
      fileSize: "2.4 MB",
      pages: 45,
      downloads: 128,
      rating: 4.8,
      views: 245,
      uploadedBy: "Rahul Sharma",
      uploaderAvatar: "RS",
      uploadDate: "2 days ago",
      verified: true,
      trending: true,
      tags: ["DSA", "Programming", "Mid-Sem", "Complete"],
      preview: "Includes solved examples and practice problems for better understanding.",
    },
    {
      id: 2,
      title: "Machine Learning Algorithms Cheat Sheet",
      subject: "CSE-412",
      semester: "7th",
      branch: "CSE",
      description: "Quick reference for ML algorithms with Python code snippets.",
      fileType: "PDF",
      fileSize: "1.8 MB",
      pages: 12,
      downloads: 89,
      rating: 4.9,
      views: 156,
      uploadedBy: "Priya Mehta",
      uploaderAvatar: "PM",
      uploadDate: "5 days ago",
      verified: true,
      trending: false,
      tags: ["ML", "Python", "Algorithms", "Cheat-Sheet"],
      preview: "Concise summary of all major ML algorithms with implementation tips.",
    },
    {
      id: 3,
      title: "Database Design Tutorial",
      subject: "CSE-301",
      semester: "5th",
      branch: "CSE",
      description: "Step-by-step guide to database design with ER diagrams and normalization.",
      fileType: "PPT",
      fileSize: "3.2 MB",
      pages: 28,
      downloads: 67,
      rating: 4.6,
      views: 134,
      uploadedBy: "Arjun Singh",
      uploaderAvatar: "AS",
      uploadDate: "1 week ago",
      verified: false,
      trending: false,
      tags: ["Database", "ER-Diagram", "SQL", "Design"],
      preview: "Visual presentation with real-world examples and case studies.",
    },
    {
      id: 4,
      title: "Mathematics Formula Sheet",
      subject: "MATH-101",
      semester: "1st",
      branch: "All",
      description: "Essential formulas for Calculus, Linear Algebra, and Differential Equations.",
      fileType: "PDF",
      fileSize: "0.8 MB",
      pages: 8,
      downloads: 234,
      rating: 4.7,
      views: 412,
      uploadedBy: "Sneha Gupta",
      uploaderAvatar: "SG",
      uploadDate: "3 days ago",
      verified: true,
      trending: true,
      tags: ["Mathematics", "Formulas", "Quick-Reference"],
      preview: "Beautifully organized formulas with key concepts highlighted.",
    },
    {
      id: 5,
      title: "Operating Systems Lab Manual",
      subject: "CSE-302",
      semester: "5th",
      branch: "CSE",
      description: "Complete lab manual with all experiments and solutions.",
      fileType: "DOC",
      fileSize: "1.5 MB",
      pages: 35,
      downloads: 45,
      rating: 4.5,
      views: 89,
      uploadedBy: "Vikash Kumar",
      uploaderAvatar: "VK",
      uploadDate: "1 day ago",
      verified: false,
      trending: false,
      tags: ["OS", "Lab", "Experiments", "Solutions"],
      preview: "All 12 lab experiments with detailed explanations and code.",
    },
  ];

  const filters = [
    { id: "all", label: "All Notes", count: notes.length },
    { id: "trending", label: "Trending", count: notes.filter(n => n.trending).length },
    { id: "verified", label: "Verified", count: notes.filter(n => n.verified).length },
    { id: "recent", label: "Recent", count: notes.filter(n => n.uploadDate.includes("day")).length },
  ];

  const semesters = [
    { id: "all", label: "All Semesters" },
    { id: "1st", label: "1st Semester" },
    { id: "2nd", label: "2nd Semester" },
    { id: "3rd", label: "3rd Semester" },
    { id: "4th", label: "4th Semester" },
    { id: "5th", label: "5th Semester" },
    { id: "6th", label: "6th Semester" },
    { id: "7th", label: "7th Semester" },
    { id: "8th", label: "8th Semester" },
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" ||
                         (selectedFilter === "trending" && note.trending) ||
                         (selectedFilter === "verified" && note.verified) ||
                         (selectedFilter === "recent" && note.uploadDate.includes("day"));

    const matchesSemester = selectedSemester === "all" || note.semester === selectedSemester;

    return matchesSearch && matchesFilter && matchesSemester;
  });

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case "pdf": return FileText;
      case "ppt": case "pptx": return Image;
      case "doc": case "docx": return FileText;
      case "mp4": case "avi": return Video;
      case "zip": case "rar": return Archive;
      default: return FileText;
    }
  };

  const handleDownload = (note) => {
    toast({
      title: "Download Started! 📥",
      description: `Downloading "${note.title}"`,
      type: "success",
    });
  };

  const handleUpload = () => {
    toast({
      title: "Upload Notes",
      description: "File upload feature coming soon! 📤",
      type: "info",
    });
  };

  return (
    <PageLayout 
      title="Notes & Resources" 
      subtitle="Share and access study materials"
      icon={BookOpen}
    >
      <div className="space-y-6">
        {/* Search and Upload */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search notes by subject, topic, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleUpload} className="btn-scale glow">
            <Upload className="w-4 h-4 mr-2" />
            Upload Notes
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
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
          
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>{sem.label}</option>
            ))}
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Notes</p>
                  <p className="text-2xl font-bold">{notes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Download className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                  <p className="text-2xl font-bold">563</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <BookMarked className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p className="text-2xl font-bold">25+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNotes.map((note) => {
            const FileIcon = getFileIcon(note.fileType);
            return (
              <Card key={note.id} className="glass card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        {note.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">✓</span>
                          </div>
                        )}
                        {note.trending && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {note.subject}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {note.semester} Sem
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {note.branch}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{note.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {note.description}
                  </p>

                  <p className="text-xs text-muted-foreground italic">
                    {note.preview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* File Info */}
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{note.fileType.toUpperCase()} File</p>
                        <p className="text-xs text-muted-foreground">
                          {note.fileSize} • {note.pages} pages
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>{note.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{note.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Uploader Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {note.uploaderAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-medium">{note.uploadedBy}</span>
                        <p className="text-xs text-muted-foreground">{note.uploadDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="btn-scale"
                        onClick={() => toast({ title: "Preview", description: "File preview coming soon! 👁️", type: "info" })}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(note)}
                        className="btn-scale"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredNotes.length === 0 && (
          <Card className="glass">
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or upload new notes to share.
              </p>
              <Button onClick={handleUpload} className="btn-scale">
                <Upload className="w-4 h-4 mr-2" />
                Upload Notes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      <BottomNavigation currentPage="notes" />
    </PageLayout>
  );
}
