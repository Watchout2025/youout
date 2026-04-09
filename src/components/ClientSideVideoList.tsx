"use client";

import { useEffect, useState } from "react";
import { Video } from "@/lib/data";
import { VideoService } from "@/lib/videoService";
import VideoCard from "./VideoCard";

interface Props {
  title: string;
  type: "history" | "watch-later" | "liked";
}

export default function ClientSideVideoList({ title, type }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let data: Video[] = [];
    if (type === "history") data = VideoService.getHistory();
    if (type === "watch-later") data = VideoService.getWatchLater();
    if (type === "liked") data = VideoService.getLiked();
    
    setVideos(data);
    setLoading(false);
  }, [type]);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="pt-4 pb-10 px-4 sm:px-0">
      <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
          {videos.map((video, index) => (
            <VideoCard key={`${video.id}-${index}`} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#aaaaaa] text-lg">No videos found in your {title.toLowerCase()}.</p>
        </div>
      )}
    </div>
  );
}
