import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-muted border-t-primary',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="p-4 space-y-3 rounded-lg border border-border/50 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-3 bg-muted rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
      <div className="h-32 bg-muted rounded" />
    </div>
  );
}

export function LoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
