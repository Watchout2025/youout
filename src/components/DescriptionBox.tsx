"use client";

import { Video } from "@/lib/data";
import { useState } from "react";

interface DescriptionBoxProps {
  video: Video;
}

export default function DescriptionBox({ video }: DescriptionBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`mt-4 p-3 bg-sidebar-hover rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors duration-300 ${
        !isExpanded ? "line-clamp-2" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex gap-2 text-sm font-bold mb-1 text-foreground">
        <span>{video.views} views</span>
        <span>{video.postedAt}</span>
      </div>
      <p className={`text-sm text-foreground whitespace-pre-wrap ${!isExpanded ? "line-clamp-3" : ""}`}>
        {video.description}
      </p>
      <button className="text-sm font-bold mt-1 text-foreground">
        {isExpanded ? "Show less" : "...more"}
      </button>
    </div>
  );
}
