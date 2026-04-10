"use client";

import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from "lucide-react";
import { Video } from "@/lib/data";
import { useState } from "react";

interface VideoActionsProps {
  video: Video;
}

export default function VideoActions({ video }: VideoActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      {/* Like/Dislike Group */}
      <div className="flex items-center bg-sidebar-hover rounded-full transition-colors">
        <button 
          onClick={() => { setIsLiked(!isLiked); setIsDisliked(false); }}
          className="flex items-center gap-2 px-4 py-2 hover:bg-foreground/10 rounded-l-full border-r border-border-custom transition-colors"
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-foreground" : ""}`} />
          <span className="text-sm font-medium text-foreground">{video.views}</span>
        </button>
        <button 
          onClick={() => { setIsDisliked(!isDisliked); setIsLiked(false); }}
          className="px-4 py-2 hover:bg-foreground/10 rounded-r-full transition-colors"
        >
          <ThumbsDown className={`w-5 h-5 ${isDisliked ? "fill-foreground" : ""}`} />
        </button>
      </div>

      {/* Share Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-sidebar-hover hover:bg-foreground/10 rounded-full transition-colors flex-shrink-0">
        <Share2 className="w-5 h-5 text-foreground" />
        <span className="text-sm font-medium text-foreground">Share</span>
      </button>

      {/* Download Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-sidebar-hover hover:bg-foreground/10 rounded-full transition-colors flex-shrink-0">
        <Download className="w-5 h-5 text-foreground" />
        <span className="text-sm font-medium text-foreground">Download</span>
      </button>

      {/* More Button */}
      <button className="p-2 bg-sidebar-hover hover:bg-foreground/10 rounded-full transition-colors flex-shrink-0">
        <MoreHorizontal className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
}
