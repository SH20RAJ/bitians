import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface KBatchBadgeProps {
  kBatch: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-1',
  lg: 'text-base px-3 py-1.5',
};

const kBatchColors = {
  'K20': 'bg-blue-100 text-blue-800 border-blue-200',
  'K21': 'bg-green-100 text-green-800 border-green-200',
  'K22': 'bg-purple-100 text-purple-800 border-purple-200',
  'K23': 'bg-orange-100 text-orange-800 border-orange-200',
  'K24': 'bg-red-100 text-red-800 border-red-200',
  'K25': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'K26': 'bg-pink-100 text-pink-800 border-pink-200',
  'K27': 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

export function KBatchBadge({ 
  kBatch, 
  size = 'md', 
  variant = 'default',
  className 
}: KBatchBadgeProps) {
  const colorClass = kBatchColors[kBatch as keyof typeof kBatchColors] || 
                     'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <Badge
      variant={variant}
      className={cn(
        sizeClasses[size],
        variant === 'default' && colorClass,
        'font-semibold border',
        className
      )}
    >
      {kBatch}
    </Badge>
  );
}
