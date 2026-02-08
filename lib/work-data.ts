import { WorkProject } from '@/types';

// Mock data for work projects - replace with actual data source
export const workProjects: WorkProject[] = [
  {
    id: '1',
    title: 'Ocean\'s Legacy',
    slug: 'oceans-legacy',
    category: 'Documentary',
    client: 'Ocean Conservation Fund',
    year: 2024,
    duration: '52:30',
    description: 'An inspiring documentary about marine conservation efforts in the Pacific Ocean.',
    fullDescription: 'Ocean\'s Legacy is a powerful documentary that follows marine biologists and conservationists as they work to protect endangered marine species in the Pacific Ocean. Shot over 18 months across multiple locations, this film showcases the beauty of marine life while highlighting the urgent need for conservation action. The documentary features underwater cinematography captured with state-of-the-art equipment and interviews with leading marine scientists.',
    thumbnail: '/api/placeholder/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    industry: ['Environment', 'Science', 'Education'],
    tags: ['conservation', 'ocean', 'marine-life', 'documentary'],
    viewCount: 125000,
    featured: true,
    credits: {
      director: 'Sarah Chen',
      producer: 'Michael Rodriguez',
      cinematographer: 'David Kim',
      editor: 'Lisa Wang',
      composer: 'James Thompson'
    },
    technicalSpecs: {
      camera: 'Sony FX9, RED Komodo',
      resolution: '4K UHD',
      frameRate: '24fps',
      aspect: '16:9',
      sound: '5.1 Surround'
    },
    behindTheScenes: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    awards: ['Best Documentary - Environmental Film Festival 2024'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Luxury Redefined',
    slug: 'luxury-redefined',
    category: 'Commercial',
    client: 'Meridian Luxury Watches',
    year: 2024,
    duration: '1:30',
    description: 'High-end commercial showcasing the craftsmanship of luxury timepieces.',
    fullDescription: 'Luxury Redefined is a sophisticated commercial that captures the meticulous craftsmanship behind Meridian\'s luxury watch collection. Using macro photography and precise lighting, we reveal the intricate details of Swiss-made movements and premium materials. The film emphasizes the brand\'s heritage while appealing to modern luxury consumers.',
    thumbnail: '/api/placeholder/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    industry: ['Luxury', 'Fashion', 'Retail'],
    tags: ['luxury', 'watches', 'craftsmanship', 'commercial'],
    viewCount: 890000,
    featured: true,
    credits: {
      director: 'Alexandre Dubois',
      producer: 'Emma Watson',
      cinematographer: 'Carlos Mendez',
      editor: 'Sophie Laurent'
    },
    technicalSpecs: {
      camera: 'ARRI Alexa Mini LF',
      resolution: '4K UHD',
      frameRate: '60fps',
      aspect: '2.35:1',
      lenses: 'Zeiss Master Prime'
    },
    behindTheScenes: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    awards: ['Gold - Cannes Lions 2024'],
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20'
  },
  {
    id: '3',
    title: 'Midnight Dreams',
    slug: 'midnight-dreams',
    category: 'Music Video',
    client: 'Luna Records',
    year: 2024,
    duration: '3:45',
    description: 'Cinematic music video with stunning visual effects and choreography.',
    fullDescription: 'Midnight Dreams is a visually captivating music video that blends contemporary dance with surreal visual effects. Shot in a variety of locations including an abandoned theater and urban rooftops, the video tells a story of dreams and aspirations. The production features complex choreography, practical effects, and post-production magic to create a truly immersive experience.',
    thumbnail: '/api/placeholder/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    industry: ['Music', 'Entertainment', 'Arts'],
    tags: ['music-video', 'dance', 'visual-effects', 'cinematic'],
    viewCount: 2100000,
    featured: true,
    credits: {
      director: 'Maya Patel',
      producer: 'Jake Williams',
      cinematographer: 'Nina Rodriguez',
      editor: 'Tom Lee',
      choreographer: 'Isabella Santos'
    },
    technicalSpecs: {
      camera: 'Sony FX6, DJI Ronin 4D',
      resolution: '4K UHD',
      frameRate: '24fps, 120fps',
      aspect: '16:9',
      vfx: 'Adobe After Effects, Cinema 4D'
    },
    behindTheScenes: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    awards: ['Best Music Video - MTV VMAs 2024'],
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10'
  },
  {
    id: '4',
    title: 'Silicon Valley Stories',
    slug: 'silicon-valley-stories',
    category: 'Documentary',
    client: 'Tech Innovation Institute',
    year: 2023,
    duration: '75:00',
    description: 'A deep dive into the startup culture and innovation in Silicon Valley.',
    fullDescription: 'Silicon Valley Stories explores the entrepreneurial spirit that drives innovation in the world\'s tech capital. Through interviews with founders, investors, and employees, this documentary reveals the challenges and triumphs of building technology companies. The film provides an insider\'s view of startup culture, from garage beginnings to IPO successes.',
    thumbnail: '/api/placeholder/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    industry: ['Technology', 'Business', 'Innovation'],
    tags: ['startup', 'technology', 'entrepreneurship', 'silicon-valley'],
    viewCount: 580000,
    featured: false,
    credits: {
      director: 'Robert Chen',
      producer: 'Amanda Foster',
      cinematographer: 'Kevin Park',
      editor: 'Rachel Green'
    },
    technicalSpecs: {
      camera: 'Canon C300 Mark III',
      resolution: '4K UHD',
      frameRate: '24fps',
      aspect: '16:9',
      sound: 'Stereo'
    },
    behindTheScenes: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    awards: [],
    createdAt: '2023-11-15',
    updatedAt: '2023-11-15'
  },
  {
    id: '5',
    title: 'Future Forward',
    slug: 'future-forward',
    category: 'Commercial',
    client: 'Tesla Motors',
    year: 2023,
    duration: '2:00',
    description: 'Innovative commercial showcasing sustainable transportation technology.',
    fullDescription: 'Future Forward presents Tesla\'s vision for sustainable transportation through dynamic visuals and cutting-edge cinematography. The commercial features the latest electric vehicles in stunning landscapes, emphasizing the harmony between technology and nature. Advanced drone work and time-lapse photography create a compelling narrative about the future of mobility.',
    thumbnail: '/api/placeholder/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    industry: ['Automotive', 'Technology', 'Environment'],
    tags: ['electric-vehicles', 'sustainability', 'innovation', 'tesla'],
    viewCount: 1500000,
    featured: false,
    credits: {
      director: 'Marcus Johnson',
      producer: 'Elena Vasquez',
      cinematographer: 'Tim Anderson',
      editor: 'Grace Kim'
    },
    technicalSpecs: {
      camera: 'ARRI Alexa 35',
      resolution: '4K UHD',
      frameRate: '24fps, 60fps',
      aspect: '2.39:1',
      drone: 'DJI Inspire 3'
    },
    behindTheScenes: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    awards: ['Silver - D&AD Awards 2024'],
    createdAt: '2023-09-22',
    updatedAt: '2023-09-22'
  },
  {
    id: '6',
    title: 'Echoes of Tomorrow',
    slug: 'echoes-of-tomorrow',
    category: 'Music Video',
    client: 'Synthesis Records',
    year: 2023,
    duration: '4:20',
    description: 'Futuristic music video with advanced visual effects and storytelling.',
    fullDescription: 'Echoes of Tomorrow is a science fiction-inspired music video that transports viewers to a dystopian future. Using practical sets combined with VFX, we created an immersive world where music becomes a form of resistance. The video features elaborate costume design, makeup effects, and cutting-edge visual technology.',
    thumbnail: '/api/placeholder/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    industry: ['Music', 'Entertainment', 'Sci-Fi'],
    tags: ['sci-fi', 'futuristic', 'vfx', 'storytelling'],
    viewCount: 950000,
    featured: false,
    credits: {
      director: 'Zoe Chen',
      producer: 'Alex Thompson',
      cinematographer: 'Ryan Martinez',
      editor: 'Jessica Wu',
      vfxSupervisor: 'Daniel Roberts'
    },
    technicalSpecs: {
      camera: 'RED V-Raptor',
      resolution: '8K',
      frameRate: '24fps',
      aspect: '2.35:1',
      vfx: 'Houdini, Nuke, Unreal Engine'
    },
    behindTheScenes: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    awards: [],
    createdAt: '2023-07-08',
    updatedAt: '2023-07-08'
  }
];

// Helper functions for data manipulation
export class WorkDataService {
  static getAllProjects(): WorkProject[] {
    return workProjects;
  }

  static getProjectById(id: string): WorkProject | undefined {
    return workProjects.find(project => project.id === id);
  }

  static getProjectBySlug(slug: string): WorkProject | undefined {
    return workProjects.find(project => project.slug === slug);
  }

  static getProjectsByCategory(category: WorkProject['category']): WorkProject[] {
    return workProjects.filter(project => project.category === category);
  }

  static getFeaturedProjects(): WorkProject[] {
    return workProjects.filter(project => project.featured);
  }

  static getProjectsByYear(year: number): WorkProject[] {
    return workProjects.filter(project => project.year === year);
  }

  static getProjectsByIndustry(industry: string): WorkProject[] {
    return workProjects.filter(project => 
      project.industry.some(ind => ind.toLowerCase().includes(industry.toLowerCase()))
    );
  }

  static searchProjects(query: string): WorkProject[] {
    const lowercaseQuery = query.toLowerCase();
    return workProjects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.client.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  static sortProjects(projects: WorkProject[], sortBy: 'latest' | 'mostViewed' | 'featured' | 'alphabetical'): WorkProject[] {
    const sorted = [...projects];
    
    switch (sortBy) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'mostViewed':
        return sorted.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
      case 'featured':
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }

  static getAvailableYears(): number[] {
    const years = [...new Set(workProjects.map(project => project.year))];
    return years.sort((a, b) => b - a);
  }

  static getAvailableIndustries(): string[] {
    const industries = new Set<string>();
    workProjects.forEach(project => {
      project.industry.forEach(ind => industries.add(ind));
    });
    return Array.from(industries).sort();
  }

  static getRelatedProjects(currentProject: WorkProject, limit: number = 3): WorkProject[] {
    return workProjects
      .filter(project => 
        project.id !== currentProject.id && 
        (project.category === currentProject.category || 
         project.industry.some(ind => currentProject.industry.includes(ind)))
      )
      .slice(0, limit);
  }

  static paginateProjects(projects: WorkProject[], page: number, itemsPerPage: number): {
    projects: WorkProject[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  } {
    const totalItems = projects.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProjects = projects.slice(startIndex, endIndex);

    return {
      projects: paginatedProjects,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}