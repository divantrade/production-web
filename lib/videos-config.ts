import { Project } from '@/types';

export interface VideoSource {
  type: 'youtube' | 'direct' | 'vimeo';
  url: string;
  id?: string;
  thumbnail?: string;
  fallbackUrl?: string;
}

export interface HeroVideoConfig {
  primary: VideoSource;
  fallback?: VideoSource;
  poster: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}

export interface FeaturedVideoConfig extends Project {
  videoSource: VideoSource;
  playlistId?: string;
  tags?: string[];
  featured: boolean;
}

export interface VideoConfig {
  hero: HeroVideoConfig;
  featured: FeaturedVideoConfig[];
  playlists: {
    documentaries: string;
    commercials: string;
    musicVideos: string;
    featured: string;
  };
}

// Main video configuration
export const videoConfig: VideoConfig = {
  hero: {
    primary: {
      type: 'direct',
      url: 'https://cdn.pixabay.com/vimeo/497395127/video-production-60688.mp4', // Documentary production video
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Documentary filming
      fallbackUrl: 'https://videos.pexels.com/video-files/3015494/3015494-uhd_2560_1440_25fps.mp4', // Camera crew documentary
    },
    fallback: {
      type: 'direct',
      url: 'https://videos.pexels.com/video-files/2909091/2909091-uhd_2560_1440_30fps.mp4', // Documentary camera work
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    poster: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Documentary filming poster
    autoplay: true,
    loop: true,
    muted: true,
  },

  featured: [
    {
      id: '1',
      title: 'Ocean\'s Legacy',
      category: 'Documentary',
      thumbnail: '/api/placeholder/400/300',
      description: 'An inspiring documentary about marine conservation',
      videoSource: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=VIDEO_ID_1',
        id: 'VIDEO_ID_1',
      },
      tags: ['ocean', 'conservation', 'nature'],
      featured: true,
    },
    {
      id: '2',
      title: 'Luxury Redefined',
      category: 'Commercial',
      thumbnail: '/api/placeholder/400/300',
      description: 'High-end commercial for luxury brand',
      videoSource: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=VIDEO_ID_2',
        id: 'VIDEO_ID_2',
      },
      tags: ['luxury', 'commercial', 'brand'],
      featured: true,
    },
    {
      id: '3',
      title: 'Midnight Dreams',
      category: 'Music Video',
      thumbnail: '/api/placeholder/400/300',
      description: 'Cinematic music video with stunning visuals',
      videoSource: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=VIDEO_ID_3',
        id: 'VIDEO_ID_3',
      },
      tags: ['music', 'cinematic', 'dreams'],
      featured: true,
    },
    {
      id: '4',
      title: 'Urban Stories',
      category: 'Documentary',
      thumbnail: '/api/placeholder/400/300',
      description: 'Street photography meets documentary filmmaking',
      videoSource: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=VIDEO_ID_4',
        id: 'VIDEO_ID_4',
      },
      tags: ['urban', 'street', 'photography'],
      featured: false,
    },
    {
      id: '5',
      title: 'Innovation Forward',
      category: 'Commercial',
      thumbnail: '/api/placeholder/400/300',
      description: 'Tech company commercial showcasing innovation',
      videoSource: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=VIDEO_ID_5',
        id: 'VIDEO_ID_5',
      },
      tags: ['tech', 'innovation', 'commercial'],
      featured: false,
    },
    {
      id: '6',
      title: 'Rhythm & Light',
      category: 'Music Video',
      thumbnail: '/api/placeholder/400/300',
      description: 'Dynamic music video with synchronized lighting',
      videoSource: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=VIDEO_ID_6',
        id: 'VIDEO_ID_6',
      },
      tags: ['rhythm', 'light', 'dynamic'],
      featured: false,
    },
  ],

  playlists: {
    documentaries: process.env.NEXT_PUBLIC_YOUTUBE_DOCUMENTARIES_PLAYLIST || 'PLrAHZ3SjOWOCN0NCQ8j5YZm7R88AhEPkH',
    commercials: process.env.NEXT_PUBLIC_YOUTUBE_COMMERCIALS_PLAYLIST || 'PLrAHZ3SjOWOCN0NCQ8j5YZm7R88AhEPkH',
    musicVideos: process.env.NEXT_PUBLIC_YOUTUBE_MUSIC_VIDEOS_PLAYLIST || 'PLrAHZ3SjOWOCN0NCQ8j5YZm7R88AhEPkH',
    featured: process.env.NEXT_PUBLIC_YOUTUBE_FEATURED_PLAYLIST || 'PLrAHZ3SjOWOCN0NCQ8j5YZm7R88AhEPkH',
  },
};

// Utility functions for video management
export class VideoManager {
  static getHeroVideo(): HeroVideoConfig {
    return videoConfig.hero;
  }

  static getFeaturedVideos(limit?: number): FeaturedVideoConfig[] {
    const featured = videoConfig.featured.filter(video => video.featured);
    return limit ? featured.slice(0, limit) : featured;
  }

  static getVideosByCategory(category: Project['category'], limit?: number): FeaturedVideoConfig[] {
    const videos = videoConfig.featured.filter(video => video.category === category);
    return limit ? videos.slice(0, limit) : videos;
  }

  static getVideoById(id: string): FeaturedVideoConfig | undefined {
    return videoConfig.featured.find(video => video.id === id);
  }

  static getPlaylistId(category: Project['category']): string {
    switch (category) {
      case 'Documentary':
        return videoConfig.playlists.documentaries;
      case 'Commercial':
        return videoConfig.playlists.commercials;
      case 'Music Video':
        return videoConfig.playlists.musicVideos;
      default:
        return videoConfig.playlists.featured;
    }
  }

  static extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  static getVideoThumbnail(videoSource: VideoSource, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
    if (videoSource.thumbnail) {
      return videoSource.thumbnail;
    }

    if (videoSource.type === 'youtube' && videoSource.id) {
      const qualityMap = {
        default: 'default',
        medium: 'mqdefault',
        high: 'hqdefault',
        maxres: 'maxresdefault',
      };
      return `https://img.youtube.com/vi/${videoSource.id}/${qualityMap[quality]}.jpg`;
    }

    return '/api/placeholder/400/300';
  }

  static getEmbedUrl(videoSource: VideoSource, options: { autoplay?: boolean; mute?: boolean; controls?: boolean } = {}): string {
    const { autoplay = false, mute = true, controls = false } = options;

    if (videoSource.type === 'youtube' && videoSource.id) {
      const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        mute: mute ? '1' : '0',
        controls: controls ? '1' : '0',
        showinfo: '0',
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
      });

      return `https://www.youtube.com/embed/${videoSource.id}?${params.toString()}`;
    }

    if (videoSource.type === 'vimeo' && videoSource.id) {
      const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        muted: mute ? '1' : '0',
        controls: controls ? '1' : '0',
        background: '1',
      });

      return `https://player.vimeo.com/video/${videoSource.id}?${params.toString()}`;
    }

    return videoSource.url;
  }

  static updateHeroVideo(videoSource: VideoSource): void {
    videoConfig.hero.primary = videoSource;
  }

  static addFeaturedVideo(video: FeaturedVideoConfig): void {
    videoConfig.featured.push(video);
  }

  static updateFeaturedVideo(id: string, updates: Partial<FeaturedVideoConfig>): boolean {
    const index = videoConfig.featured.findIndex(video => video.id === id);
    if (index !== -1) {
      videoConfig.featured[index] = { ...videoConfig.featured[index], ...updates };
      return true;
    }
    return false;
  }

  static removeFeaturedVideo(id: string): boolean {
    const index = videoConfig.featured.findIndex(video => video.id === id);
    if (index !== -1) {
      videoConfig.featured.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default VideoManager;