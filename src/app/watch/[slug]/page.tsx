import { fetchVideos, fetchVideoById, extractIdFromSlug, createVideoSlug } from "@/lib/data";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";
import Link from "next/link";
import DescriptionBox from "@/components/DescriptionBox";
import VideoActions from "@/components/VideoActions";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const vId = extractIdFromSlug(slug);
  const video = await fetchVideoById(vId);

  if (!video) return { title: "Video Not Found" };

  const description = video.description.substring(0, 160);
  const seoUrl = `https://youout.vercel.app/watch/${createVideoSlug(video.title, video.id)}`;

  return {
    title: video.title,
    description: description,
    keywords: [video.title, video.channel.name, "YouOut", "video", "watch online"],
    alternates: {
      canonical: seoUrl,
    },
    openGraph: {
      title: video.title,
      description: description,
      url: seoUrl,
      siteName: "YouOut",
      images: [
        {
          url: video.thumbnail,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: description,
      images: [video.thumbnail],
    },
  };
}

export default async function WatchPage({ params }: Props) {
  const slug = (await params).slug;
  const vId = extractIdFromSlug(slug);
  
  const [video, allVideos] = await Promise.all([
    fetchVideoById(vId),
    fetchVideos()
  ]);

  const currentVideo = video || allVideos[0];

  if (!currentVideo) return <div className="p-10 text-center text-foreground">Video not found</div>;

  const currentSeoUrl = `https://youout.vercel.app/watch/${createVideoSlug(currentVideo.title, currentVideo.id)}`;

  // JSON-LD for VideoObject
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": currentVideo.title,
    "description": currentVideo.description,
    "thumbnailUrl": [currentVideo.thumbnail],
    "uploadDate": new Date().toISOString(), // Fallback since we don't have exact upload date in mock
    "duration": "PT0H0M0S", // Would need proper ISO 8601 duration
    "contentUrl": currentVideo.videoUrl,
    "embedUrl": currentSeoUrl,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": currentVideo.views.replace(/[^0-9]/g, '')
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12 max-w-[1700px] mx-auto lg:px-6 bg-background transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="sm:pt-6">
          <VideoPlayer video={currentVideo} />
        </div>
        
        <div className="px-3 sm:px-0">
          <h1 className="text-xl font-bold mt-4 line-clamp-2 text-foreground">{currentVideo.title}</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-sidebar-hover flex-shrink-0 border border-border-custom">
                <img src={currentVideo.channel.avatar} alt={currentVideo.channel.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base truncate text-foreground">{currentVideo.channel.name}</span>
                <span className="text-xs text-[#aaaaaa] truncate">{currentVideo.channel.subscribers} subscribers</span>
              </div>
              <button className="ml-auto sm:ml-4 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all">
                Subscribe
              </button>
            </div>
            
            <VideoActions video={currentVideo} />
          </div>
          
          <DescriptionBox video={currentVideo} />
          
          <CommentSection />
        </div>
      </div>
      
      {/* Related Videos Sidebar */}
      <div className="lg:w-[400px] flex flex-col gap-3 px-3 sm:px-0 sm:pt-6">
        <h2 className="text-sm font-bold lg:hidden mb-2 text-foreground px-1">Up Next</h2>
        {allVideos.filter(v => v.id !== currentVideo.id).map((v) => (
          <Link href={`/watch/${createVideoSlug(v.title, v.id)}`} key={v.id} className="flex gap-2 group p-1 hover:bg-sidebar-hover rounded-lg transition-colors">
            <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-sidebar-hover">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                {v.duration}
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-[#3ea6ff] transition-colors text-foreground">
                {v.title}
              </h3>
              <span className="text-xs text-[#aaaaaa] mt-1 hover:text-foreground transition-colors truncate">{v.channel.name}</span>
              <div className="text-xs text-[#aaaaaa] flex items-center gap-1 mt-0.5">
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
