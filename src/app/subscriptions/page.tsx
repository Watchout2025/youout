import VideoCard from "@/components/VideoCard";
import { fetchVideos } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Stay up to date with the latest videos from your favorite creators on YouOut.",
};

export default async function SubscriptionsPage() {
  const videos = await fetchVideos();

  return (
    <div className="pt-4 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Latest Subscriptions</h1>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-blue-400 hover:bg-blue-900/20 px-3 py-2 rounded-full transition-colors">
            Manage
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
