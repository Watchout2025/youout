"use client";

import { Video } from "@/lib/data";
import Link from "next/link";
import { useState, useRef } from "react";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

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
