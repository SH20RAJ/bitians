'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Mock events data
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'TechFest 2024 - AI/ML Workshop',
    description: 'Join us for an intensive workshop on Machine Learning and Artificial Intelligence. Learn from industry experts and work on real projects.',
    organizer: { name: 'Tech Society BIT', verified: true },
    date: 'Dec 25, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Computer Center, BIT Mesra',
    attendees: 145,
    maxAttendees: 200,
    category: 'Technical',
    image: '/api/placeholder/400/200',
  },
  {
    id: '2',
    title: 'Annual Cultural Fest - Bitotsav',
    description: 'Experience the vibrant culture of BIT Mesra. Dance, music, drama, and much more. Food stalls and exciting competitions.',
    organizer: { name: 'Cultural Committee', verified: true },
    date: 'Jan 15, 2025',
    time: '6:00 PM - 11:00 PM',
    location: 'Main Auditorium',
    attendees: 450,
    category: 'Cultural',
    image: '/api/placeholder/400/200',
  },
  {
    id: '3',
    title: 'Cricket Tournament Finals',
    description: 'Cheer for your hostel team in the finals of inter-hostel cricket championship. Exciting prizes await!',
    organizer: { name: 'Sports Committee' },
    date: 'Dec 20, 2024',
    time: '3:00 PM - 6:00 PM',
    location: 'BIT Cricket Ground',
    attendees: 89,
    category: 'Sports',
    image: '/api/placeholder/400/200',
  }
];

export default function EventsPage() {
    const [filter, setFilter] = useState('all');
    
    const filteredEvents = filter === 'all' 
        ? MOCK_EVENTS 
        : MOCK_EVENTS.filter(event => event.category.toLowerCase() === filter);

    return (
        <PageLayout title="Events" showBack={false}>
            <div className="p-4 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Campus Events</h1>
                        <p className="text-muted-foreground">Discover what's happening at BIT</p>
                    </div>
                    <Button size="sm" className="space-x-1">
                        <Plus className="h-4 w-4" />
                        <span>Create Event</span>
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {['all', 'technical', 'cultural', 'sports', 'academic'].map((filterType) => (
                        <Button
                            key={filterType}
                            variant={filter === filterType ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter(filterType)}
                            className="whitespace-nowrap"
                        >
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                        </Button>
                    ))}
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold mb-2">No events found</h3>
                        <p className="text-muted-foreground">
                            Try changing your filter or check back later for new events.
                        </p>
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
