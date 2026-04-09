"use client";

import { Video } from "@/lib/data";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [avgColor, setAvgColor] = useState<string>("139, 94, 60"); // Default brown
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Extract average color from thumbnail
  useEffect(() => {
    const extractColor = () => {
      if (!imgRef.current) return;
      
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 10; // Small size for performance
        canvas.height = 10;
        
        ctx.drawImage(imgRef.current, 0, 0, 10, 10);
        const data = ctx.getImageData(0, 0, 10, 10).data;
        
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        
        const count = data.length / 4;
        setAvgColor(`${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)}`);
      } catch (e) {
        // Fallback to default if CORS or other issues
        console.warn("Could not extract color", e);
      }
    };

    if (imgRef.current?.complete) {
      extractColor();
    }
  }, [video.thumbnail]);

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
      className="flex flex-col gap-3 group p-2 rounded-xl transition-colors duration-500 ease-out"
      style={{ 
        backgroundColor: isHovered ? `rgba(${avgColor}, 0.1)` : "transparent"
      }}
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
            ref={imgRef}
            src={video.thumbnail}
            alt={video.title}
            crossOrigin="anonymous"
            onLoad={(e) => {
              // Trigger color extraction when image loads
              const target = e.target as HTMLImageElement;
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              if (!ctx) return;
              canvas.width = 1;
              canvas.height = 1;
              ctx.drawImage(target, 0, 0, 1, 1);
              const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
              setAvgColor(`${r}, ${g}, ${b}`);
            }}
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
