"use client";

import { useEffect, useRef } from "react";
import { Video } from "@/lib/data";
import { VideoService } from "@/lib/videoService";

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (video) {
      VideoService.addToHistory(video);
    }
  }, [video]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: Check origin if needed, though the player origin might be dynamic
      const playerOrigin = "https://watchout.rpmvid.com";
      if (event.origin !== playerOrigin) return;

      const data = event.data;

      // Handle Player Ready
      if (data.playerStatus === 'Ready') {
        console.log("Player is ready");
        // Example: Seek to 10 seconds if needed
        // iframeRef.current?.contentWindow?.postMessage({ command: 'seek', value: 10 }, playerOrigin);
      }

      // Handle Current Time updates
      if (data.currentTime !== undefined) {
        // You could use this to save progress
        // console.log("Current time:", data.currentTime);
      }

      // Handle Duration
      if (data.duration !== undefined) {
        // console.log("Duration:", data.duration);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Determine host for API parameter
  const host = typeof window !== "undefined" ? window.location.host : "youout.vercel.app";
  const playerUrl = `https://watchout.rpmvid.com/#${video.id}&api=${host}`;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={playerUrl}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
}
