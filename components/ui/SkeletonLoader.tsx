'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'text' | 'image' | 'video' | 'card' | 'avatar' | 'button';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
  animated?: boolean;
}

export default function SkeletonLoader({
  variant = 'text',
  width = '100%',
  height = 'auto',
  className = '',
  count = 1,
  animated = true,
}: SkeletonLoaderProps) {
  const baseClasses = `bg-gray-200 ${animated ? 'animate-pulse' : ''} ${className}`;

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return `h-4 rounded ${baseClasses}`;
      case 'image':
        return `aspect-video rounded-lg ${baseClasses}`;
      case 'video':
        return `aspect-video rounded-lg ${baseClasses}`;
      case 'card':
        return `p-6 rounded-lg border ${baseClasses}`;
      case 'avatar':
        return `w-12 h-12 rounded-full ${baseClasses}`;
      case 'button':
        return `h-10 rounded-full ${baseClasses}`;
      default:
        return baseClasses;
    }
  };

  const skeletonElement = (
    <div 
      className={getVariantClasses()}
      style={{ width, height }}
    />
  );

  if (count === 1) {
    return skeletonElement;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {skeletonElement}
        </motion.div>
      ))}
    </div>
  );
}

// Specific skeleton components
export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <SkeletonLoader variant="video" className="h-64" />
      <div className="p-6 space-y-3">
        <SkeletonLoader variant="text" width="60%" />
        <SkeletonLoader variant="text" width="100%" />
        <SkeletonLoader variant="text" width="80%" />
        <div className="flex space-x-2 mt-4">
          <SkeletonLoader variant="button" width="80px" height="24px" />
          <SkeletonLoader variant="button" width="100px" height="24px" />
        </div>
      </div>
    </div>
  );
}

export function TeamMemberSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <SkeletonLoader variant="image" className="h-64" />
      <div className="p-6 space-y-3">
        <SkeletonLoader variant="text" width="70%" />
        <SkeletonLoader variant="text" width="50%" />
        <SkeletonLoader variant="text" width="100%" />
        <SkeletonLoader variant="text" width="90%" />
        <div className="flex space-x-2 mt-4">
          <SkeletonLoader variant="avatar" width="32px" height="32px" />
          <SkeletonLoader variant="avatar" width="32px" height="32px" />
          <SkeletonLoader variant="avatar" width="32px" height="32px" />
        </div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <SkeletonLoader variant="avatar" width="64px" height="64px" className="mb-6" />
      <SkeletonLoader variant="text" width="60%" className="mb-4" />
      <SkeletonLoader variant="text" width="100%" className="mb-2" />
      <SkeletonLoader variant="text" width="80%" className="mb-4" />
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="90%" />
        <SkeletonLoader variant="text" width="95%" />
        <SkeletonLoader variant="text" width="85%" />
      </div>
      <SkeletonLoader variant="button" width="120px" className="mt-6" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <SkeletonLoader variant="text" height="80px" width="80%" />
        <SkeletonLoader variant="text" height="32px" width="60%" />
        <SkeletonLoader variant="text" width="90%" />
        <SkeletonLoader variant="text" width="70%" />
        <SkeletonLoader variant="button" width="200px" height="48px" className="mx-auto mt-8" />
      </div>
    </div>
  );
}