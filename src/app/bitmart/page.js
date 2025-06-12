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
  ShoppingBag,
  Search,
  Plus,
  Heart,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Filter,
  BookOpen,
  Laptop,
  Car,
  Home,
  Shirt,
  Gamepad2,
  TrendingUp,
  Eye,
  DollarSign,
} from "lucide-react";

export default function BitMartPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [likedItems, setLikedItems] = useState(new Set());

  const products = [
    {
      id: 1,
      title: "Data Structures and Algorithms in Java",
      category: "Books",
      price: 450,
      originalPrice: 650,
      condition: "Like New",
      description: "Comprehensive textbook with solved examples. Perfect for CSE students.",
      images: ["book1.jpg"],
      seller: "Rahul Sharma",
      sellerAvatar: "RS",
      sellerRating: 4.8,
      location: "Hostel-5, Room 201",
      postedDate: "2 hours ago",
      views: 24,
      likes: 8,
      verified: true,
      featured: true,
      tags: ["Programming", "Java", "CSE"],
      negotiable: true,
    },
    {
      id: 2,
      title: "Gaming Laptop - HP Pavilion",
      category: "Electronics",
      price: 35000,
      originalPrice: 55000,
      condition: "Good",
      description: "i5 processor, 8GB RAM, GTX 1650, perfect for coding and gaming.",
      images: ["laptop1.jpg"],
      seller: "Priya Mehta",
      sellerAvatar: "PM",
      sellerRating: 4.9,
      location: "Hostel-2, Room 305",
      postedDate: "1 day ago",
      views: 67,
      likes: 15,
      verified: true,
      featured: false,
      tags: ["Gaming", "Laptop", "HP"],
      negotiable: true,
    },
    {
      id: 3,
      title: "Bicycle - Hero Sprint",
      category: "Vehicles",
      price: 3500,
      originalPrice: 8000,
      condition: "Fair",
      description: "21-speed mountain bike. Great for campus commuting.",
      images: ["cycle1.jpg"],
      seller: "Arjun Singh",
      sellerAvatar: "AS",
      sellerRating: 4.6,
      location: "Near Main Gate",
      postedDate: "3 days ago",
      views: 45,
      likes: 12,
      verified: false,
      featured: false,
      tags: ["Bicycle", "Transport", "Sports"],
      negotiable: true,
    },
    {
      id: 4,
      title: "Study Table with Chair",
      category: "Furniture",
      price: 2500,
      originalPrice: 4500,
      condition: "Good",
      description: "Wooden study table with ergonomic chair. Perfect for hostel room.",
      images: ["furniture1.jpg"],
      seller: "Sneha Gupta",
      sellerAvatar: "SG",
      sellerRating: 4.7,
      location: "Hostel-3, Room 102",
      postedDate: "5 days ago",
      views: 33,
      likes: 7,
      verified: true,
      featured: false,
      tags: ["Furniture", "Study", "Hostel"],
      negotiable: false,
    },
    {
      id: 5,
      title: "Engineering Mechanics Textbook",
      category: "Books",
      price: 300,
      originalPrice: 500,
      condition: "Like New",
      description: "R.C. Hibbeler edition. Barely used, all pages intact.",
      images: ["book2.jpg"],
      seller: "Vikash Kumar",
      sellerAvatar: "VK",
      sellerRating: 4.5,
      location: "Academic Block",
      postedDate: "1 week ago",
      views: 18,
      likes: 4,
      verified: false,
      featured: false,
      tags: ["Engineering", "Mechanics", "Textbook"],
      negotiable: true,
    },
    {
      id: 6,
      title: "Wireless Headphones - Sony",
      category: "Electronics",
      price: 1800,
      originalPrice: 3500,
      condition: "Good",
      description: "Noise-canceling wireless headphones. Excellent sound quality.",
      images: ["headphones1.jpg"],
      seller: "Anita Rao",
      sellerAvatar: "AR",
      sellerRating: 4.8,
      location: "Hostel-4, Room 220",
      postedDate: "4 days ago",
      views: 52,
      likes: 19,
      verified: true,
      featured: true,
      tags: ["Audio", "Wireless", "Sony"],
      negotiable: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Categories", icon: ShoppingBag, count: products.length },
    { id: "Books", label: "Books", icon: BookOpen, count: products.filter(p => p.category === "Books").length },
    { id: "Electronics", label: "Electronics", icon: Laptop, count: products.filter(p => p.category === "Electronics").length },
    { id: "Vehicles", label: "Vehicles", icon: Car, count: products.filter(p => p.category === "Vehicles").length },
    { id: "Furniture", label: "Furniture", icon: Home, count: products.filter(p => p.category === "Furniture").length },
    { id: "Clothing", label: "Clothing", icon: Shirt, count: 0 },
    { id: "Games", label: "Games", icon: Gamepad2, count: 0 },
  ];

  const conditions = [
    { id: "all", label: "All Conditions" },
    { id: "Like New", label: "Like New" },
    { id: "Good", label: "Good" },
    { id: "Fair", label: "Fair" },
    { id: "Poor", label: "Poor" },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesCondition = selectedCondition === "all" || product.condition === selectedCondition;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  const handleLike = (productId) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
      toast({
        title: "Removed from wishlist",
        description: "Item removed from your wishlist",
        type: "info",
        duration: 2000,
      });
    } else {
      newLiked.add(productId);
      toast({
        title: "Added to wishlist! ❤️",
        description: "Item saved to your wishlist",
        type: "success",
        duration: 2000,
      });
    }
    setLikedItems(newLiked);
  };

  const handleContact = (seller) => {
    toast({
      title: "Contact Seller",
      description: `Direct messaging with ${seller} coming soon! 💬`,
      type: "info",
    });
  };

  const handleSell = () => {
    toast({
      title: "Sell Item",
      description: "Item listing feature coming soon! 🏷️",
      type: "info",
    });
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Like New": return "success";
      case "Good": return "info";
      case "Fair": return "warning";
      case "Poor": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <PageLayout 
      title="BitMart" 
      subtitle="Buy and sell with your fellow BITians"
      icon={ShoppingBag}
    >
      <div className="space-y-6">
        {/* Search and Sell */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for books, electronics, furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-0 focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleSell} className="btn-scale glow">
            <Plus className="w-4 h-4 mr-2" />
            Sell Item
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
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {conditions.map((condition) => (
              <option key={condition.id} value={condition.id}>{condition.label}</option>
            ))}
          </select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Savings</p>
                  <p className="text-2xl font-bold">40%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Eye className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">1.2K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="glass card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                      {product.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                      {product.featured && (
                        <Badge variant="gradient" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <Badge variant={getConditionColor(product.condition)} className="text-xs">
                        {product.condition}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(product.id)}
                    className={`btn-scale ${likedItems.has(product.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${likedItems.has(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      {product.negotiable && (
                        <Badge variant="secondary" className="text-xs">
                          Negotiable
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{product.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{product.likes + (likedItems.has(product.id) ? 1 : 0)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{product.postedDate}</span>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {product.sellerAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">{product.seller}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs">{product.sellerRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{product.location}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    onClick={() => handleContact(product.seller)}
                    className="btn-scale"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="glass">
            <CardContent className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or be the first to sell in this category.
              </p>
              <Button onClick={handleSell} className="btn-scale">
                <Plus className="w-4 h-4 mr-2" />
                Sell Your Item
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
