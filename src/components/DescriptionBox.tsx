"use client";

import { Video } from "@/lib/data";
import { useState } from "react";

export default function DescriptionBox({ video }: { video: Video }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 bg-[#272727] rounded-xl p-3 hover:bg-[#3f3f3f] cursor-pointer transition-colors group">
      <div className="text-sm font-medium mb-1">
        {video.views} views • {video.postedAt}
      </div>
      <p className={`text-sm leading-relaxed text-[#f1f1f1] ${!isExpanded && "line-clamp-2"}`}>
        {video.description}
      </p>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="text-sm font-bold mt-1"
      >
        {isExpanded ? "Show less" : "...more"}
      </button>
    </div>
  );
}
