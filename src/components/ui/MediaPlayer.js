"use client";

import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2 } from "lucide-react";
import { Button } from "./Button";

export function MediaPlayer({ media, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = (mediaElement) => {
    if (isPlaying) {
      mediaElement.pause();
    } else {
      mediaElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (media.type === 'image') {
    return (
      <div className={`relative rounded-lg overflow-hidden ${className}`}>
        <img
          src={media.url}
          alt={media.alt || "Post image"}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        {media.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {media.caption}
          </div>
        )}
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <div className={`relative rounded-lg overflow-hidden bg-black ${className}`}>
        <video
          className="w-full h-auto"
          controls
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          poster={media.thumbnail}
        >
          <source src={media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {media.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-2 text-sm">
            {media.caption}
          </div>
        )}
      </div>
    );
  }

  if (media.type === 'audio') {
    return (
      <div className={`bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30"
            onClick={() => {
              const audio = document.getElementById(`audio-${media.id}`);
              handlePlayPause(audio);
            }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{media.title || 'Audio Message'}</span>
              <span className="text-xs text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => {
              const audio = document.getElementById(`audio-${media.id}`);
              audio.muted = !isMuted;
              setIsMuted(!isMuted);
            }}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>

        <audio
          id={`audio-${media.id}`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        >
          <source src={media.url} type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>

        {media.caption && (
          <div className="mt-2 text-sm text-muted-foreground">
            {media.caption}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export function MediaGrid({ mediaItems, className = "" }) {
  if (!mediaItems || mediaItems.length === 0) return null;

  const getGridClass = (count) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-2 md:grid-cols-3";
    return "grid-cols-2";
  };

  return (
    <div className={`grid gap-2 ${getGridClass(mediaItems.length)} ${className}`}>
      {mediaItems.map((media, index) => (
        <MediaPlayer
          key={media.id || index}
          media={media}
          className={mediaItems.length > 3 && index >= 3 ? "hidden md:block" : ""}
        />
      ))}
      {mediaItems.length > 4 && (
        <div className="relative bg-black/20 rounded-lg flex items-center justify-center text-white font-medium">
          +{mediaItems.length - 3} more
        </div>
      )}
    </div>
  );
}
