import { MOCK_COMMENTS } from "@/lib/data";
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";

export default function CommentSection() {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-xl font-bold">{MOCK_COMMENTS.length} Comments</h3>
        <button className="flex items-center gap-2 font-medium">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white stroke-2">
            <path d="M21 7H3M18 12H6M15 17H9" strokeLinecap="round" />
          </svg>
          Sort by
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
          J
        </div>
        <div className="flex-1 border-b border-[#303030] pb-1">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full bg-transparent focus:outline-none text-sm py-1 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_COMMENTS.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#272727] flex-shrink-0">
              <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[#f1f1f1]">@{comment.user.toLowerCase().replace(" ", "")}</span>
                <span className="text-xs text-[#aaaaaa]">{comment.postedAt}</span>
              </div>
              <p className="text-sm mb-2 leading-relaxed text-white">{comment.text}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 hover:bg-[#272727] rounded-full transition-colors">
                    <ThumbsUp className="w-4 h-4 text-white" />
                  </button>
                  <span className="text-xs text-[#aaaaaa]">{comment.likes}</span>
                </div>
                <button className="p-1.5 hover:bg-[#272727] rounded-full transition-colors">
                  <ThumbsDown className="w-4 h-4 text-white" />
                </button>
                <button className="text-xs font-medium hover:bg-[#272727] px-3 py-1.5 rounded-full transition-colors text-white">
                  Reply
                </button>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-[#272727] rounded-full transition-opacity self-start">
              <MoreVertical className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
