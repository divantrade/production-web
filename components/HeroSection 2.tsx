'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Typewriter from './Typewriter';
import Button from './Button';
import ScrollIndicator from './ScrollIndicator';
import VideoManager from '@/lib/videos-config';

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const typewriterTexts = [
    'Crafting Visual Stories',
    'Creating Cinematic Magic',
    'Bringing Dreams to Life',
  ];

  // Client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  const heroVideo = VideoManager.getHeroVideo();
  
  // Fallback images for hero section
  const fallbackImages = [
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80'
  ];

  const handleViewWork = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/work';
    }
  };

  const handleGetInTouch = () => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = (error?: Event) => {
    console.warn('Hero video failed to load:', error);
    setVideoError(true);
    setVideoLoaded(false);
    
    // Try fallback video if available
    if (heroVideo.fallback && videoRef.current && !videoRef.current.src.includes('BigBuckBunny')) {
      console.log('Attempting fallback video...');
      videoRef.current.src = heroVideo.fallback.url;
      videoRef.current.load();
    }
  };

  const tryPlayVideo = () => {
    if (videoRef.current && isClient) {
      videoRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
        // Autoplay was prevented, which is fine
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden" suppressHydrationWarning>
      {/* Background - Video or Fallback Image */}
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={heroVideo.autoplay}
          loop={heroVideo.loop}
          muted={heroVideo.muted}
          playsInline
          poster={heroVideo.poster}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={tryPlayVideo}
          suppressHydrationWarning
        >
          <source src={heroVideo.primary.url} type="video/mp4" />
          {heroVideo.primary.fallbackUrl && (
            <source src={heroVideo.primary.fallbackUrl} type="video/mp4" />
          )}
          {/* Fallback for browsers that don't support video */}
          <Image
            src={fallbackImages[0]}
            alt="Luxe Films - Professional Video Production"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </video>
      ) : (
        <Image
          src={fallbackImages[0]}
          alt="Luxe Films - Professional Video Production"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      )}

      {/* Enhanced Gradient Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/60" />
      
      {/* Additional overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-primary/5" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          style={{ 
            textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.6), 2px 2px 4px rgba(0,0,0,0.9)' 
          }}
        >
          <Typewriter
            texts={typewriterTexts}
            delay={150}
            deleteDelay={75}
            loop={true}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-100 mb-8 font-light drop-shadow-lg"
        >
          Premium Documentary & Commercial Production
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <Button size="lg" variant="primary" onClick={handleViewWork}>
            View Our Work
          </Button>
          <Button size="lg" variant="secondary" onClick={handleGetInTouch}>
            Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Video Attribution/Info (Optional) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-4 text-white/60 text-xs z-10"
      >
        <p>Featured: Latest Production Reel</p>
      </motion.div>
    </section>
  );
}