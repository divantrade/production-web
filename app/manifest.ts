import { MetadataRoute } from 'next';

// Only reference icons that exist in /public or /app. Add PNG icons
// (192x192 and 512x512) here once the brand logo is available.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Luxor Film - Documentary Production',
    short_name: 'Luxor Film',
    description: 'Documentary production company offering research, script development, interview production, drama, and full episode delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#D4AF37',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['entertainment', 'video', 'business'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    shortcuts: [
      {
        name: 'Our Work',
        short_name: 'Portfolio',
        description: 'View our portfolio',
        url: '/work',
      },
      {
        name: 'About',
        short_name: 'About',
        description: 'Learn about Luxor Film',
        url: '/about',
      },
    ],
  };
}
