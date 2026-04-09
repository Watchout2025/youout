import { fetchVideos } from "@/lib/data";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";
import Link from "next/link";
import DescriptionBox from "@/components/DescriptionBox";
import VideoActions from "@/components/VideoActions";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ v: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const vId = (await searchParams).v;
  const videos = await fetchVideos();
  const video = videos.find((v) => v.id === vId);

  if (!video) return { title: "Video Not Found" };

  return {
    title: video.title,
    description: video.description.substring(0, 160),
    openGraph: {
      title: video.title,
      description: video.description.substring(0, 160),
      images: [video.thumbnail],
      type: "video.other",
    },
  };
}

export default async function WatchPage({ searchParams }: Props) {
  const vId = (await searchParams).v;
  const videos = await fetchVideos();
  const video = videos.find((v) => v.id === vId) || videos[0];

  if (!video) return <div>Video not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12 max-w-[1700px] mx-auto lg:px-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="sm:pt-6">
          <VideoPlayer videoId={video.id} />
        </div>
        
        <div className="px-3 sm:px-0">
          <h1 className="text-xl font-bold mt-4 line-clamp-2">{video.title}</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#272727] flex-shrink-0">
                <img src={video.channel.avatar} alt={video.channel.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base truncate text-white">{video.channel.name}</span>
                <span className="text-xs text-[#aaaaaa] truncate">{video.channel.subscribers} subscribers</span>
              </div>
              <button className="ml-auto sm:ml-4 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors">
                Subscribe
              </button>
            </div>
            
            <VideoActions video={video} />
          </div>
          
          <DescriptionBox video={video} />
          
          <CommentSection />
        </div>
      </div>
      
      {/* Related Videos Sidebar */}
      <div className="lg:w-[400px] flex flex-col gap-3 px-3 sm:px-0 mt-4 lg:mt-0">
        <h2 className="text-sm font-bold sm:hidden mb-2">Up Next</h2>
        {videos.filter(v => v.id !== video.id).map((v) => (
          <Link href={`/watch?v=${v.id}`} key={v.id} className="flex gap-2 group">
            <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[#272727]">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 py-0.5 rounded">
                {v.duration}
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                {v.title}
              </h3>
              <span className="text-xs text-[#aaaaaa] mt-1 hover:text-white transition-colors">{v.channel.name}</span>
              <div className="text-xs text-[#aaaaaa] flex items-center gap-1">
                <span>{v.views} views</span>
                <span>•</span>
                <span>{v.postedAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
