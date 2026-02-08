'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiX, 
  HiPlay, 
  HiEye, 
  HiClock, 
  HiCalendar, 
  HiOfficeBuilding,
  HiShare,
  HiExternalLink
} from 'react-icons/hi';
import { WorkProject } from '@/types';
import VideoPlayer from '@/components/VideoPlayer';
import { cn } from '@/lib/utils';

interface ProjectModalProps {
  project: WorkProject | null;
  isOpen: boolean;
  onClose: () => void;
  relatedProjects: WorkProject[];
  onRelatedProjectClick: (project: WorkProject) => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  relatedProjects,
  onRelatedProjectClick,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'credits' | 'technical'>('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsVideoPlaying(false);
      setActiveTab('overview');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleWatchProject = () => {
    if (project.videoUrl) {
      window.open(project.videoUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              <HiX size={20} />
            </button>

            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Video Section */}
              <div className="lg:w-2/3 bg-black relative">
                <div className="aspect-video">
                  {isVideoPlaying && project.videoId ? (
                    <VideoPlayer
                      videoSource={{
                        type: 'youtube',
                        url: project.videoUrl,
                        id: project.videoId,
                      }}
                      autoPlay={true}
                      controls={true}
                      showPlayButton={true}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsVideoPlaying(true)}
                          className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-black shadow-lg"
                        >
                          <HiPlay size={32} className="ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:w-1/3 flex flex-col max-h-[90vh] lg:max-h-none">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={cn(
                        'inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-2',
                        getCategoryColor(project.category)
                      )}>
                        {project.category}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {project.title}
                      </h2>
                      <p className="text-gray-600">{project.client}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-gray-500 mb-1">
                        <HiCalendar size={14} />
                        <span className="text-xs">Year</span>
                      </div>
                      <div className="font-semibold">{project.year}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-gray-500 mb-1">
                        <HiClock size={14} />
                        <span className="text-xs">Duration</span>
                      </div>
                      <div className="font-semibold">{project.duration}</div>
                    </div>
                    {project.viewCount && (
                      <div>
                        <div className="flex items-center justify-center space-x-1 text-gray-500 mb-1">
                          <HiEye size={14} />
                          <span className="text-xs">Views</span>
                        </div>
                        <div className="font-semibold">{formatViewCount(project.viewCount)}</div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleWatchProject}
                      className="flex-1 bg-accent text-black px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors font-medium text-sm flex items-center justify-center space-x-2"
                    >
                      <HiExternalLink size={16} />
                      <span>Watch Full</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <HiShare size={16} />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'credits', label: 'Credits' },
                      { id: 'technical', label: 'Technical' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          'flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors',
                          activeTab === tab.id
                            ? 'border-accent text-accent'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{project.fullDescription}</p>
                      </div>

                      {project.industry.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Industry</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.industry.map((industry, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                              >
                                {industry}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.tags.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-accent/10 text-accent px-2 py-1 rounded text-sm"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.awards && project.awards.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Awards</h3>
                          <ul className="space-y-2">
                            {project.awards.map((award, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-accent rounded-full"></div>
                                <span className="text-gray-700">{award}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'credits' && (
                    <div className="space-y-4">
                      {Object.entries(project.credits).map(([role, name]) => (
                        name && (
                          <div key={role} className="flex justify-between">
                            <span className="font-medium text-gray-900 capitalize">
                              {role.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-gray-700">{name}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div className="space-y-4">
                      {Object.entries(project.technicalSpecs).map(([spec, value]) => (
                        value && (
                          <div key={spec} className="flex justify-between">
                            <span className="font-medium text-gray-900 capitalize">
                              {spec.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-gray-700">{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <div className="border-t border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Related Projects</h3>
                    <div className="space-y-3">
                      {relatedProjects.map((relatedProject) => (
                        <button
                          key={relatedProject.id}
                          onClick={() => onRelatedProjectClick(relatedProject)}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <img
                            src={relatedProject.thumbnail}
                            alt={relatedProject.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {relatedProject.title}
                            </h4>
                            <p className="text-gray-500 text-xs">{relatedProject.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}