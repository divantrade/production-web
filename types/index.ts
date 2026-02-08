export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  direction: 'ltr' | 'rtl';
}

export interface VideoProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface TypewriterProps {
  texts: string[];
  delay?: number;
  deleteDelay?: number;
  loop?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: 'Documentary' | 'Commercial' | 'Music Video';
  thumbnail: string;
  videoUrl?: string;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
}

export interface Stat {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  rating: number;
  avatar?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

// Extended interfaces for Our Work page
export interface WorkProject {
  id: string;
  title: string;
  slug: string;
  category: 'Documentary' | 'Commercial' | 'Music Video';
  client: string;
  year: number;
  duration: string; // e.g., "2:30", "45:00"
  description: string;
  fullDescription: string;
  thumbnail: string;
  videoUrl: string;
  videoId?: string;
  industry: string[];
  tags: string[];
  viewCount?: number;
  featured: boolean;
  credits: {
    director?: string;
    producer?: string;
    cinematographer?: string;
    editor?: string;
    [role: string]: string | undefined;
  };
  technicalSpecs: {
    camera?: string;
    resolution?: string;
    frameRate?: string;
    [spec: string]: string | undefined;
  };
  behindTheScenes?: string[];
  awards?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  category: 'All' | 'Documentary' | 'Commercial' | 'Music Video';
  year: number | 'All';
  industry: string[];
  sortBy: 'latest' | 'mostViewed' | 'featured' | 'alphabetical';
  searchQuery: string;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
}