'use client';

import { useState, useRef } from 'react';
import { PostHeader } from './PostHeader';
import { PostEngagement } from './PostEngagement';
import { RichText } from '@/components/ui/RichText';
import { VideoPost as VideoPostType } from '@/types';

interface VideoPostProps {
  post: VideoPostType;
}

export function VideoPost({ post }: VideoPostProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <article className="bg-card border-b border-border">
      <PostHeader post={post} />
      
      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <RichText content={post.content} />
        </div>
      )}

      {/* Video Player */}
      <div 
        className="relative aspect-video bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={post.videoUrl}
          poster={post.thumbnail}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />

        {/* Play/Pause Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {!isPlaying && (
            <div className="bg-black/60 rounded-full p-4">
              <div className="w-8 h-8 text-white flex items-center justify-center">
                ▶️
              </div>
            </div>
          )}
        </div>

        {/* Video Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-white/20 rounded text-sm">
                  🔊
                </button>
                <button className="p-1 hover:bg-white/20 rounded text-sm">
                  ⛶
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Stats */}
        <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
          {post.duration || '0:00'}
        </div>
      </div>

      <PostEngagement post={post} />
    </article>
  );
}
