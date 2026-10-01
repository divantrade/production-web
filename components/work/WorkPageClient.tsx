'use client';

import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/lib/utils';
import type { FilterOptions, LoadingState, PaginationState, WorkProject } from '@/types';

// Components
import WorkHero from './WorkHero';
import FilterBar from './FilterBar';
import ProjectsGrid from './ProjectsGrid';
import ProjectModal from './ProjectModal';

// Types
// Shape returned by the GROQ query in app/[locale]/work/page.tsx
interface SanityProject {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug?: { current: string };
  description?: string;
  fullDescription?: string;
  category?: { _id: string; title: string };
  client?: { _id: string; name: string; industry?: string };
  year?: number;
  duration?: string;
  videoUrl?: string;
  videoId?: string;
  thumbnail?: string;
  industry?: string[];
  tags?: string[];
  viewCount?: number;
  featured?: boolean;
  awards?: string[];
  credits?: WorkProject['credits'];
  technicalSpecs?: WorkProject['technicalSpecs'];
}

interface SanityCategory {
  _id: string;
  title: string;
}

interface SanityClient {
  _id: string;
  name: string;
  industry?: string;
}

interface WorkPageClientProps {
  initialProjects: SanityProject[];
  categories: SanityCategory[];
  clients: SanityClient[];
}

function getThumbnail(project: SanityProject): string {
  if (project.thumbnail) return `${project.thumbnail}?w=800&auto=format`;
  if (project.videoId) return `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`;
  return '';
}

function toWorkProject(project: SanityProject): WorkProject {
  return {
    id: project._id,
    title: project.title,
    slug: project.slug?.current ?? '',
    category: (project.category?.title ?? 'Documentary') as WorkProject['category'],
    client: project.client?.name ?? '',
    year: project.year ?? new Date(project._createdAt).getFullYear(),
    duration: project.duration ?? '',
    description: project.description ?? '',
    fullDescription: project.fullDescription ?? project.description ?? '',
    thumbnail: getThumbnail(project),
    videoUrl: project.videoUrl ?? '',
    videoId: project.videoId,
    industry: project.industry ?? (project.client?.industry ? [project.client.industry] : []),
    tags: project.tags ?? [],
    viewCount: project.viewCount,
    featured: project.featured ?? false,
    credits: project.credits ?? {},
    technicalSpecs: project.technicalSpecs ?? {},
    awards: project.awards,
    createdAt: project._createdAt,
    updatedAt: project._updatedAt,
  };
}

const itemsPerPage = 12;

export default function WorkPageClient({
  initialProjects,
  clients
}: WorkPageClientProps) {
  const projects = useMemo(() => initialProjects.map(toWorkProject), [initialProjects]);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);
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

  const availableYears = useMemo(
    () => Array.from(new Set(projects.map(project => project.year))).sort((a, b) => b - a),
    [projects]
  );

  const availableIndustries = useMemo(() => {
    const industries = [
      ...projects.flatMap(project => project.industry),
      ...clients.map(client => client.industry).filter((industry): industry is string => Boolean(industry)),
    ];
    return Array.from(new Set(industries)).sort();
  }, [projects, clients]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (filters.category !== 'All') {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    if (filters.year !== 'All') {
      filtered = filtered.filter(project => project.year === filters.year);
    }

    if (filters.industry.length > 0) {
      filtered = filtered.filter(project =>
        project.industry.some(industry => filters.industry.includes(industry))
      );
    }

    if (filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.client.toLowerCase().includes(searchTerm) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    switch (filters.sortBy) {
      case 'latest':
        filtered.sort((a, b) => b.year - a.year || b.createdAt.localeCompare(a.createdAt));
        break;
      case 'mostViewed':
        filtered.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0));
        break;
      case 'featured':
        filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [projects, filters]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProjects]);

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

  const handleProjectClick = (project: WorkProject) => {
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
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const pagination: PaginationState = {
    currentPage,
    totalPages,
    totalItems: filteredProjects.length,
    itemsPerPage,
    hasNextPage: displayedProjects.length < filteredProjects.length,
    hasPreviousPage: currentPage > 1,
  };

  // Get related projects for modal
  const getRelatedProjects = (project: WorkProject, limit: number = 3) => {
    return projects
      .filter(p => p.id !== project.id)
      .filter(p =>
        p.category === project.category ||
        (p.client !== '' && p.client === project.client)
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
        totalResults={filteredProjects.length}
      />

      {/* Projects Grid */}
      <ProjectsGrid
        projects={displayedProjects}
        loading={loading}
        pagination={pagination}
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