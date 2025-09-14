import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Make sure to set this environment variable in your deployment environment
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // List all your static pages
  const staticRoutes = [
    '/',
    '/features',
    '/pricing',
    '/contact',
    '/privacy',
    '/upload',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const, // Or 'weekly', 'daily'
    priority: route === '/' ? 1.0 : 0.8,
  }));

  // If you had dynamic pages (like blog posts), you would fetch them
  // from a database here and map them to a similar structure.

  return [
    ...staticUrls,
  ];
}