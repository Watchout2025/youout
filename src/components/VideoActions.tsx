"use client";

import { useEffect, useState } from "react";
import { Video } from "@/lib/data";
import { VideoService } from "@/lib/videoService";
import { ThumbsUp, ThumbsDown, Share2, Download, Scissors, MoreHorizontal, Clock } from "lucide-react";

export default function VideoActions({ video }: { video: Video }) {
  const [liked, setLiked] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  useEffect(() => {
    // Add to history on mount
    VideoService.addToHistory(video);
    
    // Check initial status
    setLiked(VideoService.isLiked(video.id));
    setWatchLater(VideoService.isInWatchLater(video.id));
  }, [video.id]);

  const handleLike = () => {
    const isNowLiked = VideoService.toggleLiked(video);
    setLiked(isNowLiked);
  };

  const handleWatchLater = () => {
    const isNowInList = VideoService.toggleWatchLater(video);
    setWatchLater(isNowInList);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
      <div className="flex items-center bg-[#272727] rounded-full">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] border-r border-[#303030] transition-colors ${liked ? "text-blue-400" : "text-white"}`}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? "fill-blue-400" : ""}`} />
          <span className="text-sm font-medium">124K</span>
        </button>
        <button className="px-4 py-2 hover:bg-[#3f3f3f] transition-colors text-white">
          <ThumbsDown className="w-5 h-5" />
        </button>
      </div>
      
      <button 
        onClick={handleWatchLater}
        className={`flex items-center gap-2 px-4 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full transition-colors whitespace-nowrap ${watchLater ? "text-blue-400" : "text-white"}`}
      >
        <Clock className={`w-5 h-5 ${watchLater ? "fill-blue-400" : ""}`} />
        <span className="text-sm font-medium">Later</span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full transition-colors whitespace-nowrap text-white">
        <Share2 className="w-5 h-5" />
        <span className="text-sm font-medium">Share</span>
      </button>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full transition-colors whitespace-nowrap hidden sm:flex text-white">
        <Download className="w-5 h-5" />
        <span className="text-sm font-medium">Download</span>
      </button>

      <button className="p-2 bg-[#272727] hover:bg-[#3f3f3f] rounded-full transition-colors text-white">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
