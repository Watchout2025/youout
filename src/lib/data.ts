export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  preview?: string;
  duration: string;
  views: string;
  postedAt: string;
  channel: Channel;
  description: string;
  videoUrl: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: string;
  postedAt: string;
}

export const CATEGORIES = [
  "All",
  "Gaming",
  "Music",
  "Live",
  "Computers",
  "Mixes",
  "News",
  "Programming",
  "React JS",
  "Next JS",
  "UI/UX Design",
  "Lo-fi",
  "Podcasts",
  "Space",
];

export const MOCK_CHANNELS: Record<string, Channel> = {
  "default": {
    id: "default",
    name: "YouOut Official",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=YouOut",
    subscribers: "1.2M",
  },
};

interface ApiVideo {
  id: string;
  name: string;
  poster: string;
  preview: string;
  play: number;
  createdAt: string;
  resolution: string;
  codec: string;
  assetUrl: string;
  duration: number;
}

function mapApiVideoToVideo(item: ApiVideo): Video {
  return {
    id: item.id,
    title: item.name.replaceAll(".", " "),
    thumbnail: `https://asset.rpmhash.com${item.poster}`,
    preview: `https://asset.rpmhash.com${item.preview}`,
    duration: formatDuration(item.duration),
    views: formatViews(item.play),
    postedAt: formatTimeAgo(item.createdAt),
    channel: MOCK_CHANNELS["default"],
    description: `This is a high-quality video uploaded to YouOut. Resolution: ${item.resolution}, Codec: ${item.codec}. Check out more details on our platform.`,
    videoUrl: item.assetUrl,
  };
}

export async function fetchVideos(search?: string, page: number = 1): Promise<Video[]> {
  try {
    let query = search;
    if (query) {
      // Replace non-alphanumeric with dots, collapse multiple dots, and trim dots from ends
      query = query
        .replace(/[^a-zA-Z0-9]/g, ".")
        .replace(/\.+/g, ".")
        .replace(/^\.|\.$/g, "");
    }

    const params = new URLSearchParams();
    if (query) params.append("search", query);
    params.append("page", page.toString());

    let json;
    
    // Server-side (during build or SSR)
    if (typeof window === "undefined") {
      const API_TOKEN = "adb3ca178449bc63c7ecbb66";
      const url = `https://rpmshare.com/api/v1/video/manage?${params.toString()}`;
      
      const res = await fetch(url, {
        headers: {
          "api-token": API_TOKEN,
          "accept": "application/json"
        }
      });
      json = await res.json();
    } 
    // Client-side
    else {
      const url = `/api/videos?${params.toString()}`;
      const res = await fetch(url);
      json = await res.json();
    }

    if (!json.data || !Array.isArray(json.data)) return [];
    return json.data.map((item: ApiVideo) => mapApiVideoToVideo(item));

  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function fetchVideoById(id: string): Promise<Video | null> {
  try {
    let json;
    
    // Server-side
    if (typeof window === "undefined") {
      const API_TOKEN = "adb3ca178449bc63c7ecbb66";
      const url = `https://rpmshare.com/api/v1/video/manage/${id}`;
      
      const res = await fetch(url, {
        headers: {
          "api-token": API_TOKEN,
          "accept": "application/json"
        }
      });
      json = await res.json();
    } 
    // Client-side
    else {
      const url = `/api/video/${id}`;
      const res = await fetch(url);
      json = await res.json();
    }

    // The API might return the object directly OR wrapped in 'data'
    // Let's check for 'id' directly on the response first
    let videoData = null;
    
    if (json.id) {
      videoData = json;
    } else if (json.data) {
      videoData = Array.isArray(json.data) ? json.data[0] : json.data;
    }

    if (!videoData || !videoData.id) {
      console.warn(`No valid video data found in response for ID ${id}`);
      return null;
    }
    
    return mapApiVideoToVideo(videoData);

  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    return null;
  }
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatViews(views: number): string {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return views.toString();
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + " minutes ago";
  if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + " hours ago";
  if (diffInSeconds < 2592000) return Math.floor(diffInSeconds / 86400) + " days ago";
  return Math.floor(diffInSeconds / 2592000) + " months ago";
}

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "cm1",
    user: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    text: "This is exactly what I was looking for! Thanks for the great tutorial.",
    likes: "1.2K",
    postedAt: "2 days ago",
  },
  {
    id: "cm2",
    user: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    text: "Could you explain more about how Turbopack works in Next.js 15?",
    likes: "450",
    postedAt: "1 day ago",
  },
];
