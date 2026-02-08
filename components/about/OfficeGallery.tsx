'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export default function OfficeGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: '/api/placeholder/600/400',
      alt: 'Main production studio',
      title: 'Main Production Studio'
    },
    {
      id: '2',
      src: '/api/placeholder/600/400',
      alt: 'Editing suite',
      title: 'Professional Editing Suite'
    },
    {
      id: '3',
      src: '/api/placeholder/600/400',
      alt: 'Equipment room',
      title: 'Professional Equipment'
    },
    {
      id: '4',
      src: '/api/placeholder/600/400',
      alt: 'Meeting room',
      title: 'Client Meeting Space'
    },
    {
      id: '5',
      src: '/api/placeholder/600/400',
      alt: 'Creative workspace',
      title: 'Creative Workspace'
    },
    {
      id: '6',
      src: '/api/placeholder/600/400',
      alt: 'Sound booth',
      title: 'Sound Recording Booth'
    }
  ];

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Our Studio
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-accent to-yellow-300 mx-auto mb-8"
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a peek inside our state-of-the-art production facility where creativity meets technology
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(image)}
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${image.src})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="text-white text-center"
                  >
                    <div className="text-lg font-bold mb-2">View Larger</div>
                    <div className="w-12 h-0.5 bg-accent mx-auto"></div>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Studio Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            Studio Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🎬</div>
              <h4 className="font-semibold text-primary">Professional Studio</h4>
              <p className="text-sm text-gray-600">4K production capability</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🎙️</div>
              <h4 className="font-semibold text-primary">Sound Stage</h4>
              <p className="text-sm text-gray-600">Acoustically treated</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">💻</div>
              <h4 className="font-semibold text-primary">Edit Suites</h4>
              <p className="text-sm text-gray-600">Latest software & hardware</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">📹</div>
              <h4 className="font-semibold text-primary">Equipment</h4>
              <p className="text-sm text-gray-600">Professional grade gear</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              <HiX className="text-xl" />
            </button>

            {/* Image */}
            <div className="aspect-video bg-gray-200">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedImage.src})` }}
              />
            </div>

            {/* Caption */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">
                {selectedImage.title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}