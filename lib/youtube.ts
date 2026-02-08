export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    default: string;
    medium: string;
    high: string;
    standard?: string;
    maxres?: string;
  };
  publishedAt: string;
  duration?: string;
  viewCount?: string;
  tags?: string[];
  categoryId?: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  videos: YouTubeVideo[];
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

export interface YouTubeApiResponse<T> {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
}

class YouTubeService {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('YouTube API key not found. Video features will be limited.');
    }
  }

  private async fetchFromAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<YouTubeApiResponse<T>> {
    if (!this.apiKey) {
      throw new Error('YouTube API key is required');
    }

    const searchParams = new URLSearchParams({
      key: this.apiKey,
      ...params,
    });

    const url = `${this.baseUrl}/${endpoint}?${searchParams.toString()}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('YouTube API fetch error:', error);
      throw error;
    }
  }

  async getChannelDetails(channelId: string): Promise<YouTubeChannel | null> {
    try {
      const response = await this.fetchFromAPI<any>('channels', {
        part: 'snippet,statistics',
        id: channelId,
      });

      if (response.items.length === 0) {
        return null;
      }

      const channel = response.items[0];
      return {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default.url,
        subscriberCount: channel.statistics.subscriberCount,
        videoCount: channel.statistics.videoCount,
        viewCount: channel.statistics.viewCount,
      };
    } catch (error) {
      console.error('Error fetching channel details:', error);
      return null;
    }
  }

  async getChannelVideos(channelId: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
    try {
      const response = await this.fetchFromAPI<any>('search', {
        part: 'snippet',
        channelId,
        maxResults: maxResults.toString(),
        order: 'date',
        type: 'video',
      });

      const videoIds = response.items.map((item: any) => item.id.videoId).join(',');
      
      if (!videoIds) {
        return [];
      }

      const detailsResponse = await this.fetchFromAPI<any>('videos', {
        part: 'snippet,contentDetails,statistics',
        id: videoIds,
      });

      return detailsResponse.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: {
          default: video.snippet.thumbnails.default?.url || '',
          medium: video.snippet.thumbnails.medium?.url || '',
          high: video.snippet.thumbnails.high?.url || '',
          standard: video.snippet.thumbnails.standard?.url,
          maxres: video.snippet.thumbnails.maxres?.url,
        },
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails?.duration,
        viewCount: video.statistics?.viewCount,
        tags: video.snippet.tags || [],
        categoryId: video.snippet.categoryId,
      }));
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      return [];
    }
  }

  async getPlaylistVideos(playlistId: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
    try {
      const response = await this.fetchFromAPI<any>('playlistItems', {
        part: 'snippet',
        playlistId,
        maxResults: maxResults.toString(),
      });

      const videoIds = response.items
        .map((item: any) => item.snippet.resourceId.videoId)
        .filter(Boolean)
        .join(',');

      if (!videoIds) {
        return [];
      }

      const detailsResponse = await this.fetchFromAPI<any>('videos', {
        part: 'snippet,contentDetails,statistics',
        id: videoIds,
      });

      return detailsResponse.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: {
          default: video.snippet.thumbnails.default?.url || '',
          medium: video.snippet.thumbnails.medium?.url || '',
          high: video.snippet.thumbnails.high?.url || '',
          standard: video.snippet.thumbnails.standard?.url,
          maxres: video.snippet.thumbnails.maxres?.url,
        },
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails?.duration,
        viewCount: video.statistics?.viewCount,
        tags: video.snippet.tags || [],
        categoryId: video.snippet.categoryId,
      }));
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
      return [];
    }
  }

  async getVideoDetails(videoId: string): Promise<YouTubeVideo | null> {
    try {
      const response = await this.fetchFromAPI<any>('videos', {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
      });

      if (response.items.length === 0) {
        return null;
      }

      const video = response.items[0];
      return {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: {
          default: video.snippet.thumbnails.default?.url || '',
          medium: video.snippet.thumbnails.medium?.url || '',
          high: video.snippet.thumbnails.high?.url || '',
          standard: video.snippet.thumbnails.standard?.url,
          maxres: video.snippet.thumbnails.maxres?.url,
        },
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails?.duration,
        viewCount: video.statistics?.viewCount,
        tags: video.snippet.tags || [],
        categoryId: video.snippet.categoryId,
      };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  }

  async searchVideos(query: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
    try {
      const response = await this.fetchFromAPI<any>('search', {
        part: 'snippet',
        q: query,
        maxResults: maxResults.toString(),
        type: 'video',
      });

      const videoIds = response.items.map((item: any) => item.id.videoId).join(',');
      
      if (!videoIds) {
        return [];
      }

      const detailsResponse = await this.fetchFromAPI<any>('videos', {
        part: 'snippet,contentDetails,statistics',
        id: videoIds,
      });

      return detailsResponse.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: {
          default: video.snippet.thumbnails.default?.url || '',
          medium: video.snippet.thumbnails.medium?.url || '',
          high: video.snippet.thumbnails.high?.url || '',
          standard: video.snippet.thumbnails.standard?.url,
          maxres: video.snippet.thumbnails.maxres?.url,
        },
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails?.duration,
        viewCount: video.statistics?.viewCount,
        tags: video.snippet.tags || [],
        categoryId: video.snippet.categoryId,
      }));
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }

  getVideoEmbedUrl(videoId: string, autoplay: boolean = false, mute: boolean = true): string {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: mute ? '1' : '0',
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }

  getVideoThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'): string {
    return `https://img.youtube.com/vi/${videoId}/${quality === 'maxres' ? 'maxresdefault' : quality === 'high' ? 'hqdefault' : quality === 'medium' ? 'mqdefault' : 'default'}.jpg`;
  }

  extractVideoId(url: string): string | null {
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
}

export const youtubeService = new YouTubeService();