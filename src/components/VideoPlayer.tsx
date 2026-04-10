"use client";

import { useEffect } from "react";
import { Video } from "@/lib/data";
import { VideoService } from "@/lib/videoService";

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  useEffect(() => {
    if (video) {
      VideoService.addToHistory(video);
    }
  }, [video]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={`https://watchout.rpmvid.com/#${video.id}`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
}
