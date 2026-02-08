'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiFilter, HiChevronDown, HiX } from 'react-icons/hi';
import { cn, debounce } from '@/lib/utils';

// Components
import WorkHero from './WorkHero';
import FilterBar from './FilterBar';
import ProjectsGrid from './ProjectsGrid';
import ProjectModal from './ProjectModal';

// Types
interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  longDescription?: string;
  category?: {
    _id: string;
    title: string;
    slug: { current: string };
    color?: string;
  };
  client?: {
    _id: string;
    name: string;
    industry: string;
    logo?: any;
  };
  featuredImage?: any;
  gallery?: any[];
  videoUrl?: string;
  videoSource?: any;
  tags?: string[];
  featured?: boolean;
  completionDate?: string;
  projectType?: string;
  duration?: string;
  location?: string;
  awards?: string[];
  budget?: string;
  technicalSpecs?: any;
  teamMembers?: any[];
  testimonial?: any;
}

interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  color?: string;
  icon?: string;
}

interface SanityClient {
  _id: string;
  name: string;
  industry: string;
  logo?: any;
}

interface FilterOptions {
  category: string;
  year: string;
  industry: string[];
  sortBy: string;
  searchQuery: string;
}

interface LoadingState {
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
}

interface WorkPageClientProps {
  initialProjects: SanityProject[];
  categories: SanityCategory[];
  clients: SanityClient[];
}

export default function WorkPageClient({
  initialProjects,
  categories,
  clients
}: WorkPageClientProps) {
  const [projects, setProjects] = useState<SanityProject[]>(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState<SanityProject[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<SanityProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    isLoadingMore: false,
    error: null,
  });

  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    year: 'All',
    industry: [],
    sortBy: 'latest',
    searchQuery: '',
  });

  const itemsPerPage = 12;

  // Extract available years from projects
  const availableYears = useMemo(() => {
    const years = projects
      .map(project => {
        if (project.completionDate) {
          return new Date(project.completionDate).getFullYear().toString();
        }
        return null;
      })
      .filter(Boolean)
      .filter((year, index, arr) => arr.indexOf(year) === index)
      .sort((a, b) => parseInt(b!) - parseInt(a!));
    
    return years.filter(Boolean) as string[];
  }, [projects]);

  // Extract available industries from clients
  const availableIndustries = useMemo(() => {
    const industries = clients
      .map(client => client.industry)
      .filter(Boolean)
      .filter((industry, index, arr) => arr.indexOf(industry) === index)
      .sort();
    
    return industries;
  }, [clients]);

  // Apply filters and search
  const applyFilters = useMemo(() => {
    let filtered = [...projects];

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(project => project.category?.title === filters.category);
    }

    // Year filter
    if (filters.year !== 'All') {
      filtered = filtered.filter(project => {
        if (!project.completionDate) return false;
        const projectYear = new Date(project.completionDate).getFullYear().toString();
        return projectYear === filters.year;
      });
    }

    // Industry filter
    if (filters.industry.length > 0) {
      filtered = filtered.filter(project =>
        project.client && filters.industry.includes(project.client.industry)
      );
    }

    // Search filter
    if (filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description?.toLowerCase().includes(searchTerm) ||
        project.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        project.client?.name.toLowerCase().includes(searchTerm)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'latest':
        filtered.sort((a, b) => {
          const dateA = a.completionDate ? new Date(a.completionDate).getTime() : 0;
          const dateB = b.completionDate ? new Date(b.completionDate).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => {
          const dateA = a.completionDate ? new Date(a.completionDate).getTime() : 0;
          const dateB = b.completionDate ? new Date(b.completionDate).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [projects, filters]);

  // Update filtered projects when filters change
  useEffect(() => {
    setFilteredProjects(applyFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, [applyFilters]);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setFilters(prev => ({ ...prev, searchQuery: query }));
    }, 300),
    []
  );

  const handleSearchChange = (query: string) => {
    debouncedSearch(query);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleProjectClick = (project: SanityProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleLoadMore = async () => {
    setLoading(prev => ({ ...prev, isLoadingMore: true }));
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setCurrentPage(prev => prev + 1);
    setLoading(prev => ({ ...prev, isLoadingMore: false }));
  };

  // Get displayed projects (all pages up to current)
  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, currentPage * itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  // Check if there are more projects to load
  const hasMore = displayedProjects.length < filteredProjects.length;

  // Get related projects for modal
  const getRelatedProjects = (project: SanityProject, limit: number = 3) => {
    return projects
      .filter(p => p._id !== project._id)
      .filter(p => 
        p.category?.title === project.category?.title ||
        p.client?._id === project.client?._id
      )
      .slice(0, limit);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <WorkHero />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        availableYears={availableYears}
        availableIndustries={availableIndustries}
        availableCategories={categories.map(cat => cat.title)}
        totalResults={filteredProjects.length}
      />

      {/* Projects Grid */}
      <ProjectsGrid
        projects={displayedProjects}
        loading={loading}
        hasMore={hasMore}
        onProjectClick={handleProjectClick}
        onLoadMore={handleLoadMore}
      />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        relatedProjects={selectedProject ? getRelatedProjects(selectedProject, 3) : []}
        onRelatedProjectClick={handleProjectClick}
      />
    </div>
  );
}