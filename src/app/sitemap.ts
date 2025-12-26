import { MetadataRoute } from 'next'
import { services_hardcoded } from '@/lib/data'
 
const URL = 'https://studio-674148125-67c00.firebaseapp.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = services_hardcoded.map((service) => ({
    url: `${URL}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const routes = ['', '/about', '/services', '/portfolio', '/contact'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
  }));

  return [
    ...routes,
    ...serviceRoutes
  ];
}
