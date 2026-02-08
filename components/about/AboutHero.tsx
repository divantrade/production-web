'use client';

import { motion } from 'framer-motion';
import { HiPlay } from 'react-icons/hi';
import { useState } from 'react';

interface AboutHeroProps {
  siteSettings?: any;
}

export default function AboutHero({ siteSettings }: AboutHeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const companyName = siteSettings?.companyInfo?.name || 'Luxe Films';
  const tagline = siteSettings?.companyInfo?.tagline || 'Crafting Visual Stories That Inspire';
  const description = siteSettings?.companyInfo?.description || 
    'We are a premium documentary and commercial production company dedicated to creating compelling visual narratives that captivate audiences and drive meaningful engagement.';

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary via-gray-900 to-black">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('/api/placeholder/1920/1080')"
            }}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            About{' '}
            <span className="text-gradient bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">
              {companyName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-200 font-light mb-8"
          >
            {tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {description}
          </motion.p>

          {/* Play Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="group flex items-center justify-center w-20 h-20 bg-accent hover:bg-yellow-400 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl"
            >
              <HiPlay className="text-black text-2xl ml-1 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-gray-400 text-sm"
          >
            Watch Our Story
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-accent rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}