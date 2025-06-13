'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Heart,
  Share2,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  organizer: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  category: string;
  image?: string;
  isAttending?: boolean;
  isLiked?: boolean;
  className?: string;
}

export function EventCard({
  id,
  title,
  description,
  organizer,
  date,
  time,
  location,
  attendees,
  maxAttendees,
  category,
  image,
  isAttending = false,
  isLiked = false,
  className,
}: EventCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Technical': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cultural': 'bg-purple-100 text-purple-800 border-purple-200',
      'Sports': 'bg-green-100 text-green-800 border-green-200',
      'Academic': 'bg-orange-100 text-orange-800 border-orange-200',
      'Social': 'bg-pink-100 text-pink-800 border-pink-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
      {/* Image */}
      {image && (
        <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-500 relative">
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <h4 className="text-white font-semibold text-lg text-center px-4">
              {title}
            </h4>
          </div>
        </div>
      )}
      
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            {!image && (
              <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            )}
            <div className="flex items-center space-x-2">
              <Badge className={getCategoryColor(category)}>
                {category}
              </Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {attendees} attending
              {maxAttendees && ` / ${maxAttendees} max`}
            </span>
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
              {organizer.name.charAt(0).toUpperCase()}
            </div>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">
              Organized by {organizer.name}
              {organizer.verified && (
                <span className="text-blue-500 ml-1">✓</span>
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="space-x-1">
              <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
              <span className="text-xs">Like</span>
            </Button>
            <Button variant="ghost" size="sm" className="space-x-1">
              <Share2 className="h-4 w-4" />
              <span className="text-xs">Share</span>
            </Button>
          </div>
          
          <Button 
            variant={isAttending ? "outline" : "default"} 
            size="sm"
            className="min-w-[80px]"
          >
            {isAttending ? 'Going' : 'Attend'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
