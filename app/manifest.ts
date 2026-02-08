import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Luxe Films - Premium Film Production',
    short_name: 'Luxe Films',
    description: 'Professional documentary, commercial, and music video production company specializing in luxury visual storytelling.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#D4AF37',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['entertainment', 'video', 'business'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/desktop-1.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Luxe Films Homepage Desktop View',
      },
      {
        src: '/screenshots/mobile-1.png',
        sizes: '375x667',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Luxe Films Homepage Mobile View',
      },
    ],
    shortcuts: [
      {
        name: 'Our Work',
        short_name: 'Portfolio',
        description: 'View our latest projects and portfolio',
        url: '/work',
        icons: [{ src: '/icons/shortcut-work.png', sizes: '96x96' }],
      },
      {
        name: 'Services',
        short_name: 'Services',
        description: 'Explore our production services',
        url: '/services',
        icons: [{ src: '/icons/shortcut-services.png', sizes: '96x96' }],
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Get in touch with us',
        url: '/contact',
        icons: [{ src: '/icons/shortcut-contact.png', sizes: '96x96' }],
      },
    ],
    related_applications: [
      {
        platform: 'webapp',
        url: 'https://luxefilms.com',
      },
    ],
    prefer_related_applications: false,
  };
}