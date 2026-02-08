'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiClock, HiEye } from 'react-icons/hi';
import { WorkProject } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: WorkProject;
  onClick: (project: WorkProject) => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getCategoryColor = (category: WorkProject['category']) => {
    switch (category) {
      case 'Documentary':
        return 'bg-blue-600';
      case 'Commercial':
        return 'bg-green-600';
      case 'Music Video':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  const formatViewCount = (count?: number) => {
    if (!count) return '0';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDuration = (duration: string) => {
    // Convert duration like "2:30" or "45:00" to readable format
    const parts = duration.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]);
      const seconds = parseInt(parts[1]);
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
      }
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return duration;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={() => onClick(project)}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-200 overflow-hidden">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Loading...</div>
                </div>
              )}
              <img
                src={project.thumbnail}
                alt={project.title}
                className={cn(
                  'w-full h-full object-cover transition-all duration-300 group-hover:scale-110',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <div className="text-gray-600 text-center">
                <div className="text-lg font-semibold">No Image</div>
                <div className="text-sm">{project.category}</div>
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg"
            >
              <HiPlay size={24} className="text-black ml-1" />
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              'px-2 py-1 text-xs font-medium text-white rounded-full',
              getCategoryColor(project.category)
            )}>
              {project.category}
            </span>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
              <HiClock size={12} />
              <span>{formatDuration(project.duration)}</span>
            </div>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-accent text-black px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Client */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors duration-200 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{project.client}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{project.year}</span>
              {project.viewCount && (
                <div className="flex items-center space-x-1">
                  <HiEye size={14} />
                  <span>{formatViewCount(project.viewCount)}</span>
                </div>
              )}
            </div>
            
            {/* Industry Tags */}
            <div className="flex items-center space-x-1">
              {project.industry.slice(0, 2).map((industry, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                >
                  {industry}
                </span>
              ))}
              {project.industry.length > 2 && (
                <span className="text-gray-400">+{project.industry.length - 2}</span>
              )}
            </div>
          </div>

          {/* Awards */}
          {project.awards && project.awards.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-xs text-gray-600 font-medium">
                  {project.awards[0]}
                  {project.awards.length > 1 && ` +${project.awards.length - 1}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}