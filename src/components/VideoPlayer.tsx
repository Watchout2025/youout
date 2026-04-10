"use client";

import { useEffect, useRef } from "react";
import { Video } from "@/lib/data";
import { VideoService } from "@/lib/videoService";

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);

  useEffect(() => {
    if (video) {
      VideoService.addToHistory(video);
    }
  }, [video]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const playerOrigin = "https://watchout.rpmvid.com";
      if (event.origin !== playerOrigin) return;

      const data = event.data;

      if (data.playerStatus === 'Ready') {
        console.log("Player is ready");
        // Check if there is existing progress to resume
        const saved = VideoService.getProgress(video.id);
        if (saved && saved.currentTime > 5) {
          console.log(`Resuming from ${saved.currentTime}s`);
          iframeRef.current?.contentWindow?.postMessage({ command: 'seek', value: saved.currentTime }, playerOrigin);
        }
      }

      if (data.currentTime !== undefined) {
        currentTimeRef.current = data.currentTime;
        // Save progress periodically (handled by the other useEffect)
      }

      if (data.duration !== undefined) {
        durationRef.current = data.duration;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [video.id]);

  // Save progress every 5 seconds or on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTimeRef.current > 0 && durationRef.current > 0) {
        VideoService.saveProgress(video.id, currentTimeRef.current, durationRef.current);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (currentTimeRef.current > 0 && durationRef.current > 0) {
        VideoService.saveProgress(video.id, currentTimeRef.current, durationRef.current);
      }
    };
  }, [video.id]);

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
