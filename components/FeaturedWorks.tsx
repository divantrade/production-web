'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import VideoManager, { FeaturedVideoConfig } from '@/lib/videos-config';
import VideoModal from './VideoModal';
import { youtubeService } from '@/lib/youtube';

export default function FeaturedWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [projects, setProjects] = useState<FeaturedVideoConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<FeaturedVideoConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | 'All'>('All');

  const itemsPerView = 3;

  // Load featured videos on component mount
  useEffect(() => {
    const loadFeaturedVideos = async () => {
      try {
        setLoading(true);
        
        // Get videos from configuration
        const configVideos = VideoManager.getFeaturedVideos();
        
        // Try to fetch additional videos from YouTube playlist if API key is available
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_FEATURED_PLAYLIST;
        
        if (apiKey && playlistId) {
          try {
            const youtubeVideos = await youtubeService.getPlaylistVideos(playlistId, 6);
            
            // Convert YouTube videos to FeaturedVideoConfig format
            const convertedVideos: FeaturedVideoConfig[] = youtubeVideos.map((video, index) => ({
              id: video.id,
              title: video.title,
              category: index % 3 === 0 ? 'Documentary' : index % 3 === 1 ? 'Commercial' : 'Music Video',
              thumbnail: video.thumbnail.high,
              description: video.description.length > 150 
                ? video.description.substring(0, 150) + '...' 
                : video.description,
              videoSource: {
                type: 'youtube',
                url: `https://www.youtube.com/watch?v=${video.id}`,
                id: video.id,
                thumbnail: video.thumbnail.high,
              },
              tags: video.tags?.slice(0, 3) || [],
              featured: true,
            }));
            
            setProjects(convertedVideos);
          } catch (error) {
            console.warn('Failed to load YouTube playlist, using config videos:', error);
            setProjects(configVideos);
          }
        } else {
          setProjects(configVideos);
        }
      } catch (error) {
        console.error('Error loading featured videos:', error);
        setProjects(VideoManager.getFeaturedVideos());
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedVideos();
  }, []);

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || filteredProjects.length === 0) return;

    const maxFilteredIndex = Math.max(0, filteredProjects.length - itemsPerView);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxFilteredIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, filteredProjects.length, itemsPerView]);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const nextSlide = () => {
    const maxFilteredIndex = Math.max(0, filteredProjects.length - itemsPerView);
    setCurrentIndex((prev) => (prev >= maxFilteredIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxFilteredIndex = Math.max(0, filteredProjects.length - itemsPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxFilteredIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCategoryColor = (category: Project['category']) => {
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

  const handleVideoClick = (video: FeaturedVideoConfig) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const categories: (Project['category'] | 'All')[] = ['All', 'Documentary', 'Commercial', 'Music Video'];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Featured Productions
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-8"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  selectedCategory === category
                    ? 'bg-accent text-black'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                )}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Loading State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="bg-gray-200 rounded-lg aspect-video animate-pulse" />
                  <div className="space-y-2">
                    <div className="bg-gray-200 rounded h-4 w-3/4 animate-pulse" />
                    <div className="bg-gray-200 rounded h-3 w-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {!loading && filteredProjects.length > 0 && (
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: `${-currentIndex * (100 / itemsPerView)}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div 
                      className="group cursor-pointer"
                      onClick={() => handleVideoClick(project)}
                    >
                      <div className="relative overflow-hidden bg-gray-900 rounded-lg aspect-video mb-4">
                        {/* Video Thumbnail */}
                        <div className="absolute inset-0">
                          {project.videoSource.thumbnail ? (
                            <img
                              src={VideoManager.getVideoThumbnail(project.videoSource, 'high')}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/api/placeholder/400/300';
                              }}
                            />
                          ) : (
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center h-full">
                              <span className="text-gray-500 text-sm">Video Thumbnail</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Play Button Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-black shadow-lg"
                          >
                            <HiPlay size={24} className="ml-1" />
                          </motion.button>
                        </motion.div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={cn(
                            'px-3 py-1 text-xs font-medium text-white rounded-full',
                            getCategoryColor(project.category)
                          )}>
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* No Results State */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No videos found in this category.</p>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-black transition-colors duration-300 z-10"
          >
            <HiChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-black transition-colors duration-300 z-10"
          >
            <HiChevronRight size={20} />
          </button>
        </div>

        {/* Navigation Dots */}
        {!loading && filteredProjects.length > itemsPerView && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.max(0, filteredProjects.length - itemsPerView) + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  currentIndex === index
                    ? 'bg-accent scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        video={selectedVideo}
      />
    </section>
  );
}