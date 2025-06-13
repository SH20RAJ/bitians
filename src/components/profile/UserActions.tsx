'use client';

import { Button } from '@/components/ui/button';

interface UserActionsProps {
  user: {
    isOwnProfile?: boolean;
    isFollowing?: boolean;
  };
  onFollow: () => void;
}

export function UserActions({ user, onFollow }: UserActionsProps) {
  if (user.isOwnProfile) {
    return (
      <div className="flex gap-2 mt-4">
        <Button variant="outline" className="flex-1">
          Edit Profile
        </Button>
        <Button variant="outline" size="icon">
          ⚙️
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mt-4">
      <Button
        onClick={onFollow}
        className={`flex-1 ${
          user.isFollowing
            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {user.isFollowing ? 'Following' : 'Follow'}
      </Button>
      <Button variant="outline" size="icon">
        💬
      </Button>
      <Button variant="outline" size="icon">
        ⋯
      </Button>
    </div>
  );
}
