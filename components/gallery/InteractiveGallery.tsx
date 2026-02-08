'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight, HiDownload, HiShare, HiEye } from 'react-icons/hi';
import Image from 'next/image';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category: string;
  tags?: string[];
  photographer?: string;
  location?: string;
  date?: string;
  width?: number;
  height?: number;
}

interface InteractiveGalleryProps {
  images: GalleryImage[];
  categories?: string[];
  className?: string;
  masonry?: boolean;
  infiniteScroll?: boolean;
  itemsPerPage?: number;
}

export default function InteractiveGallery({
  images,
  categories = [],
  className = '',
  masonry = true,
  infiniteScroll = false,
  itemsPerPage = 12
}: InteractiveGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  // Filter images based on category and search
  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      image.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      image.photographer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const displayedImages = infiniteScroll 
    ? filteredImages.slice(0, visibleItems)
    : filteredImages;

  // Reset visible items when filters change
  useEffect(() => {
    setVisibleItems(itemsPerPage);
  }, [selectedCategory, searchQuery, itemsPerPage]);

  // Infinite scroll handler
  useEffect(() => {
    if (!infiniteScroll) return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        if (visibleItems < filteredImages.length && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleItems(prev => Math.min(prev + itemsPerPage, filteredImages.length));
            setIsLoading(false);
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [infiniteScroll, visibleItems, filteredImages.length, itemsPerPage, isLoading]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      switch (e.key) {
        case 'Escape':
          setLightboxIndex(null);
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, displayedImages.length]);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;

    if (direction === 'prev') {
      setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : displayedImages.length - 1);
    } else {
      setLightboxIndex(lightboxIndex < displayedImages.length - 1 ? lightboxIndex + 1 : 0);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'unset';
  };

  const shareImage = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || image.alt,
          text: image.description || 'Check out this image',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const downloadImage = (image: GalleryImage) => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.title || image.alt;
    link.click();
  };

  const allCategories = ['all', ...categories];

  return (
    <div className={`w-full ${className}`}>
      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <HiEye className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="text-sm text-gray-600">
          {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'} found
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={
          masonry
            ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        }
      >
        {displayedImages.map((image, index) => (
          <motion.div
            key={image.id}
            variants={staggerItem}
            className={`relative group cursor-pointer overflow-hidden rounded-lg ${
              masonry ? 'break-inside-avoid mb-4' : 'aspect-square'
            }`}
            onClick={() => openLightbox(index)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 400}
              height={image.height || 300}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
              <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {image.title && (
                  <h3 className="font-semibold mb-1">{image.title}</h3>
                )}
                {image.photographer && (
                  <p className="text-sm opacity-90">by {image.photographer}</p>
                )}
                {image.location && (
                  <p className="text-xs opacity-75">{image.location}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button for infinite scroll */}
      {infiniteScroll && visibleItems < filteredImages.length && (
        <div className="text-center mt-8">
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          ) : (
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setVisibleItems(prev => Math.min(prev + itemsPerPage, filteredImages.length));
                  setIsLoading(false);
                }, 500);
              }}
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Load More
            </button>
          )}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            >
              <HiX className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <HiChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <HiChevronRight className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayedImages[lightboxIndex].src}
                alt={displayedImages[lightboxIndex].alt}
                width={displayedImages[lightboxIndex].width || 800}
                height={displayedImages[lightboxIndex].height || 600}
                className="max-w-full max-h-full object-contain"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                <div className="flex justify-between items-start">
                  <div>
                    {displayedImages[lightboxIndex].title && (
                      <h2 className="text-xl font-bold mb-2">
                        {displayedImages[lightboxIndex].title}
                      </h2>
                    )}
                    {displayedImages[lightboxIndex].description && (
                      <p className="text-sm mb-2">
                        {displayedImages[lightboxIndex].description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                      {displayedImages[lightboxIndex].photographer && (
                        <span>Photo by {displayedImages[lightboxIndex].photographer}</span>
                      )}
                      {displayedImages[lightboxIndex].location && (
                        <span>{displayedImages[lightboxIndex].location}</span>
                      )}
                      {displayedImages[lightboxIndex].date && (
                        <span>{displayedImages[lightboxIndex].date}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => shareImage(displayedImages[lightboxIndex])}
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                      title="Share image"
                    >
                      <HiShare className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => downloadImage(displayedImages[lightboxIndex])}
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                      title="Download image"
                    >
                      <HiDownload className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {lightboxIndex + 1} of {displayedImages.length}
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto">
              {displayedImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }}
                  className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded border-2 transition-colors ${
                    index === lightboxIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}