import { MetadataRoute } from 'next';
import { fetchVideos, createVideoSlug } from '@/lib/data';

export const revalidate = 3600; // Revalidate every hour
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://youout.vercel.app';

  // Static routes
  const routes = [
    '',
    '/subscriptions',
    '/history',
    '/liked',
    '/watch-later',
    '/profile',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic video routes - Fetch limited pages for stability in Search Console
  try {
    const pagesToFetch = 5; // Fetch 5 pages * 20 = 100 videos for sitemap
    const videoRequests = [];
    
    for (let i = 1; i <= pagesToFetch; i++) {
      videoRequests.push(fetchVideos(undefined, i, 20));
    }
    
    const videoResults = await Promise.all(videoRequests);
    const allVideos = videoResults.flat();

    const videoRoutes = allVideos.map((video) => ({
      url: `${baseUrl}/watch/${createVideoSlug(video.title, video.id)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...routes, ...videoRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
}
