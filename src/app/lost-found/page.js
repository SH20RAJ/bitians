'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import BottomNavigation from '@/components/BottomNavigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/components/Toast';
import {
  Search,
  Plus,
  MapPin,
  Clock,
  Eye,
  MessageCircle,
  Filter,
  Package,
  Smartphone,
  BookOpen,
  Watch,
  Headphones,
  Car,
  Shirt,
  Zap
} from 'lucide-react';

export default function LostFoundPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      type: 'lost',
      title: 'iPhone 14 Pro Max',
      description: 'Black iPhone 14 Pro Max lost near Admin Block. It has a cracked screen protector and a blue case.',
      category: 'Electronics',
      location: 'Admin Block',
      datePosted: '2 hours ago',
      status: 'active',
      reward: '₹2000',
      poster: {
        name: 'Raj Kumar',
        avatar: '/api/placeholder/40/40',
        year: '3rd Year'
      },
      views: 45,
      comments: 8,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      type: 'found',
      title: 'Red Water Bottle',
      description: 'Found a red Milton water bottle with "Priya" written on it. Found it in the library.',
      category: 'Personal Items',
      location: 'Central Library',
      datePosted: '5 hours ago',
      status: 'claimed',
      poster: {
        name: 'Ankit Singh',
        avatar: '/api/placeholder/40/40',
        year: '2nd Year'
      },
      views: 23,
      comments: 3,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      type: 'lost',
      title: 'Blue Notebook - Data Structures',
      description: 'Lost my Data Structures notebook with all semester notes. Has my name "Sneha" on the cover.',
      category: 'Books/Notes',
      location: 'Computer Center',
      datePosted: '1 day ago',
      status: 'active',
      reward: '₹500',
      poster: {
        name: 'Sneha Gupta',
        avatar: '/api/placeholder/40/40',
        year: '2nd Year'
      },
      views: 67,
      comments: 12,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      type: 'found',
      title: 'Silver Watch',
      description: 'Found a silver Fastrack watch near the hostel mess. Looks expensive, hoping to return to owner.',
      category: 'Accessories',
      location: 'Hostel Mess',
      datePosted: '3 days ago',
      status: 'active',
      poster: {
        name: 'Arjun Sharma',
        avatar: '/api/placeholder/40/40',
        year: '4th Year'
      },
      views: 89,
      comments: 15,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      type: 'lost',
      title: 'Black Backpack',
      description: 'Lost my black Wildcraft backpack containing laptop, charger and important documents.',
      category: 'Bags',
      location: 'Academic Block 2',
      datePosted: '2 days ago',
      status: 'active',
      reward: '₹3000',
      poster: {
        name: 'Vikash Yadav',
        avatar: '/api/placeholder/40/40',
        year: '1st Year'
      },
      views: 156,
      comments: 24,
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      type: 'found',
      title: 'Wireless Earbuds',
      description: 'Found white Apple AirPods near the sports complex. In good condition.',
      category: 'Electronics',
      location: 'Sports Complex',
      datePosted: '4 hours ago',
      status: 'active',
      poster: {
        name: 'Rohit Verma',
        avatar: '/api/placeholder/40/40',
        year: '3rd Year'
      },
      views: 34,
      comments: 6,
      image: '/api/placeholder/300/200'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const { showToast } = useToast();

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: Smartphone },
    { id: 'books', name: 'Books/Notes', icon: BookOpen },
    { id: 'accessories', name: 'Accessories', icon: Watch },
    { id: 'personal', name: 'Personal Items', icon: Package },
    { id: 'bags', name: 'Bags', icon: Car },
    { id: 'clothing', name: 'Clothing', icon: Shirt },
    { id: 'others', name: 'Others', icon: Zap }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesType && matchesCategory;
  });

  const handleContact = (item) => {
    showToast(`Contact details sent for "${item.title}"`, 'success');
  };

  const handleReport = (item) => {
    setItems(items.map(i =>
      i.id === item.id ? { ...i, status: 'claimed' } : i
    ));
    showToast(`Marked "${item.title}" as claimed!`, 'success');
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => category.toLowerCase().includes(c.name.toLowerCase()));
    return cat ? cat.icon : Package;
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Lost & Found
          </h1>
          <p className="text-muted-foreground text-lg">
            Help your fellow BITians find their lost belongings
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for lost or found items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button
                onClick={() => setShowPostModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4" />
                Post Item
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-4 space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="all">All Items</option>
                    <option value="lost">Lost Items</option>
                    <option value="found">Found Items</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Category Quick Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full flex items-center gap-1"
                >
                  <Icon className="h-3 w-3" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CategoryIcon className="h-16 w-16 text-muted-foreground/30" />
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={item.type === 'lost' ? 'destructive' : 'success'}
                        className="font-medium"
                      >
                        {item.type === 'lost' ? 'LOST' : 'FOUND'}
                      </Badge>
                    </div>

                    {/* Status Badge */}
                    {item.status === 'claimed' && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary">
                          CLAIMED
                        </Badge>
                      </div>
                    )}

                    {/* Reward Badge */}
                    {item.reward && (
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-green-600 text-white">
                          Reward: {item.reward}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Title and Category */}
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>

                    {/* Location and Time */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.datePosted}
                      </div>
                    </div>

                    {/* Poster Info */}
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Avatar src={item.poster.avatar} alt={item.poster.name} size="sm" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.poster.name}</p>
                        <p className="text-xs text-muted-foreground">{item.poster.year}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {item.comments}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContact(item)}
                        className="flex-1"
                        disabled={item.status === 'claimed'}
                      >
                        Contact
                      </Button>
                      {item.type === 'found' && item.status !== 'claimed' && (
                        <Button
                          size="sm"
                          onClick={() => handleReport(item)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          This is Mine
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {filteredItems.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or post a new item
            </p>
          </div>
        )}
      </div>
      <BottomNavigation currentPage="lost-found" />
    </PageLayout>
  );
}
