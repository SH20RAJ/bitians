"use client";

import { renderHashtagText } from "@/lib/hashtags";
import { renderMentionText } from "@/lib/mentions";

export function RichText({ children, className = "" }) {
  if (typeof children !== 'string') return children;

  // Process both hashtags and mentions
  const processText = (text) => {
    // Split by hashtags and mentions while preserving them
    const parts = text.split(/(#[a-zA-Z0-9_]+|@[a-zA-Z0-9_]+)/g);

    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span
            key={index}
            className="text-blue-500 font-medium hover:text-blue-600 cursor-pointer transition-colors hover:underline"
            onClick={() => {
              // Handle hashtag click
              console.log('Clicked hashtag:', part);
            }}
          >
            {part}
          </span>
        );
      } else if (part.startsWith('@')) {
        return (
          <span
            key={index}
            className="text-indigo-500 font-medium hover:text-indigo-600 cursor-pointer transition-colors hover:underline"
            onClick={() => {
              // Handle mention click
              console.log('Clicked mention:', part);
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <span className={className}>
      {processText(children)}
    </span>
  );
}
