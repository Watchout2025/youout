"use client";

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={`https://watchout.rpmvid.com/#${videoId}`}
        title="YouOut video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
}
