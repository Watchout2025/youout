"use client";

import { useEffect, useState, useRef } from "react";
import { Video, fetchVideos } from "@/lib/data";
import VideoCard from "./VideoCard";

interface InfiniteScrollProps {
  initialVideos: Video[];
  searchQuery?: string;
}

export default function InfiniteScroll({ initialVideos, searchQuery }: InfiniteScrollProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreVideos();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  const loadMoreVideos = async () => {
    setLoading(true);
    const newVideos = await fetchVideos(searchQuery, page);
    
    if (newVideos.length === 0) {
      setHasMore(false);
    } else {
      setVideos((prev) => [...prev, ...newVideos]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 mt-4 pb-10 px-0 sm:px-4">
        {videos.map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} video={video} />
        ))}
      </div>
      
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {!hasMore && videos.length > 0 && (
        <div className="text-center py-10 text-[#aaaaaa]">
          You've reached the end of the list.
        </div>
      )}
    </>
  );
}
