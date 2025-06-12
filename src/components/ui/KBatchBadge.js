"use client";

import { getKBatchColor, getKBatchGradient, getCurrentYear, getYearSuffix } from "@/lib/kbatch";
import { Badge } from "./Badge";

export function KBatchBadge({ kBatch, showYear = false, size = "sm", className = "" }) {
  if (!kBatch) return null;

  const currentYear = getCurrentYear(kBatch);
  const yearText = getYearSuffix(currentYear);
  const gradientClass = getKBatchGradient(kBatch);

  return (
    <Badge 
      className={`
        bg-gradient-to-r ${gradientClass} text-white font-semibold
        ${size === 'xs' ? 'text-xs px-1.5 py-0.5' : ''}
        ${size === 'sm' ? 'text-xs px-2 py-1' : ''}
        ${size === 'md' ? 'text-sm px-3 py-1' : ''}
        ${size === 'lg' ? 'text-base px-4 py-2' : ''}
        hover:scale-105 transition-transform duration-200
        ${className}
      `}
    >
      {kBatch}
      {showYear && (
        <span className="ml-1 opacity-90">
          ({yearText})
        </span>
      )}
    </Badge>
  );
}

export function KBatchIndicator({ kBatch, className = "" }) {
  if (!kBatch) return null;

  const gradientClass = getKBatchGradient(kBatch);

  return (
    <div className={`
      w-3 h-3 rounded-full bg-gradient-to-r ${gradientClass} 
      border-2 border-white dark:border-gray-800 shadow-sm
      ${className}
    `} />
  );
}
