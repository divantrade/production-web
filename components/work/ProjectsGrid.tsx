'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WorkProject, LoadingState, PaginationState } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: WorkProject[];
  loading: LoadingState;
  pagination: PaginationState;
  onProjectClick: (project: WorkProject) => void;
  onLoadMore: () => void;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-video bg-gray-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 animate-pulse rounded w-16" />
              <div className="h-3 bg-gray-200 animate-pulse rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 0H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM9 12l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
        <p className="text-gray-600">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    </motion.div>
  );
}

export default function ProjectsGrid({
  projects,
  loading,
  pagination,
  onProjectClick,
  onLoadMore,
}: ProjectsGridProps) {
  if (loading.isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (loading.error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-gray-600 mb-4">{loading.error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-accent text-black rounded-lg hover:bg-accent/80 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  onClick={onProjectClick}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {pagination.hasNextPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={onLoadMore}
              disabled={loading.isLoadingMore}
              className="group relative px-8 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-2">
                {loading.isLoadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Projects</span>
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </motion.div>
                  </>
                )}
              </div>
            </button>
          </motion.div>
        )}

        {/* Pagination Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          Showing {projects.length} of {pagination.totalItems} projects
          {pagination.totalPages > 1 && (
            <span className="ml-2">
              (Page {pagination.currentPage} of {pagination.totalPages})
            </span>
          )}
        </motion.div>

        {/* End Message */}
        {!pagination.hasNextPage && pagination.totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600">
              You've reached the end of our portfolio. 
              <span className="block mt-1 text-sm">
                Want to see more? <a href="#contact" className="text-accent hover:underline">Get in touch</a> to discuss your next project.
              </span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}