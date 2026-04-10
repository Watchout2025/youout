import { MetadataRoute } from 'next';
import { fetchVideos } from '@/lib/data';

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

  // Dynamic video routes
  try {
    const videos = await fetchVideos();
    const videoRoutes = videos.map((video) => ({
      url: `${baseUrl}/watch?v=${video.id}`,
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
