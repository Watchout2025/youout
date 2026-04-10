"use client";

import { Video } from "@/lib/data";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { VideoService, VideoProgress } from "@/lib/videoService";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState<VideoProgress | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load progress for this video
    const savedProgress = VideoService.getProgress(video.id);
    if (savedProgress) {
      setProgress(savedProgress);
    }
  }, [video.id]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  const progressPercent = progress ? (progress.currentTime / progress.duration) * 100 : 0;

  return (
    <Link 
      href={`/watch?v=${video.id}`} 
      className="flex flex-col gap-3 group p-2 rounded-xl transition-all duration-300 ease-out hover:bg-sidebar-hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video sm:rounded-xl overflow-hidden bg-sidebar-hover">
        {isHovered && video.preview ? (
          <video
            src={video.preview}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Progress Bar */}
        {progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
            <div 
              className="h-full bg-red-600 transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
        
        {!isHovered && (
          <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded z-10">
            {video.duration}
          </div>
        )}
      </div>
      
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-sidebar-hover border border-border-custom">
            <img src={video.channel.avatar} alt={video.channel.name} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold text-[16px] leading-tight line-clamp-2 transition-colors text-foreground group-hover:text-[#3ea6ff]">
            {video.title}
          </h3>
          <div className="mt-1 text-sm text-[#aaaaaa] flex flex-col">
            <span className="hover:text-foreground transition-colors truncate">{video.channel.name}</span>
            <div className="flex items-center gap-1">
              <span>{video.views} views</span>
              <span>•</span>
              <span>{video.postedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
