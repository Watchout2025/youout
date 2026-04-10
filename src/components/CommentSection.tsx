"use client";

import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { MOCK_COMMENTS } from "@/lib/data";

export default function CommentSection() {
  return (
    <div className="mt-6 bg-background transition-colors duration-300 pb-10">
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-xl font-bold text-foreground">
          {MOCK_COMMENTS.length} Comments
        </h3>
        <button className="flex items-center gap-2 text-sm font-medium text-foreground">
          <MessageSquare className="w-5 h-5" />
          Sort by
        </button>
      </div>

      {/* Add Comment */}
      <div className="flex gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-sidebar-hover flex-shrink-0" />
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="w-full bg-transparent border-b border-border-custom py-1 focus:border-foreground focus:outline-none transition-colors text-foreground"
          />
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {MOCK_COMMENTS.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img 
              src={comment.avatar} 
              alt={comment.user} 
              className="w-10 h-10 rounded-full border border-border-custom"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{comment.user}</span>
                <span className="text-xs text-[#aaaaaa]">{comment.postedAt}</span>
              </div>
              <p className="text-sm text-foreground">{comment.text}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-foreground cursor-pointer" />
                  <span className="text-xs text-[#aaaaaa]">{comment.likes}</span>
                </div>
                <ThumbsDown className="w-4 h-4 text-foreground cursor-pointer" />
                <button className="text-xs font-bold text-foreground hover:bg-foreground/10 px-2 py-1 rounded-full transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
