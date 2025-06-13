'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostHeader } from './PostHeader';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';
import { ImagePost as ImagePostType } from '@/types';

interface ImagePostProps {
  post: ImagePostType;
  isIndividualView?: boolean;
}

export function ImagePost({ post, isIndividualView = false }: ImagePostProps) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const images = post.images || [];
  const hasMultipleImages = images.length > 1;

  const handlePostClick = () => {
    if (!isIndividualView) {
      router.push(`/post/${post.id}`);
    }
  };

  return (
    <article 
      className={`bg-card border-b border-border ${!isIndividualView ? 'cursor-pointer hover:bg-muted/30 transition-colors' : ''}`}
      onClick={handlePostClick}
    >
      <PostHeader post={post} />
      
      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <RichText content={post.content} />
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted">
            <img
              src={images[selectedImageIndex]}
              alt={`Post image ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullscreen(true);
              }}
            />
            
            {/* Image Counter */}
            {hasMultipleImages && (
              <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                {selectedImageIndex + 1}/{images.length}
              </div>
            )}
          </div>

          {/* Image Navigation Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedImageIndex
                      ? 'bg-white'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={() => setSelectedImageIndex(prev => 
                  prev === 0 ? images.length - 1 : prev - 1
                )}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={() => setSelectedImageIndex(prev => 
                  prev === images.length - 1 ? 0 : prev + 1
                )}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                →
              </button>
            </>
          )}
        </div>
      )}

      {/* Thumbnail Strip for Multiple Images */}
      {hasMultipleImages && (
        <div className="px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  index === selectedImageIndex
                    ? 'border-primary'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <PostEngagement post={post} />

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white text-2xl z-10"
          >
            ×
          </button>
          <img
            src={images[selectedImageIndex]}
            alt={`Fullscreen image ${selectedImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </article>
  );
}
