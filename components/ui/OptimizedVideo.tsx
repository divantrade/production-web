'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  quality?: 'low' | 'medium' | 'high';
}

export default function OptimizedVideo({
  src,
  poster,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  className = '',
  width,
  height,
  lazy = true,
  onPlay,
  onPause,
  onEnded,
  quality = 'medium',
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    onPause?.();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Generate video sources for different qualities
  const getVideoSources = () => {
    const sources = [];
    
    if (src.includes('.mp4')) {
      const baseSrc = src.replace('.mp4', '');
      
      switch (quality) {
        case 'high':
          sources.push(`${baseSrc}_1080p.mp4`);
          sources.push(`${baseSrc}_720p.mp4`);
          sources.push(src);
          break;
        case 'medium':
          sources.push(`${baseSrc}_720p.mp4`);
          sources.push(src);
          break;
        case 'low':
          sources.push(`${baseSrc}_480p.mp4`);
          sources.push(src);
          break;
        default:
          sources.push(src);
      }
    } else {
      sources.push(src);
    }
    
    return sources;
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-gray-500">Video failed to load</p>
          {poster && (
            <img
              src={poster}
              alt="Video poster"
              className="mt-2 max-w-full h-auto"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10"
        >
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay={autoPlay && isInView}
        muted={muted}
        loop={loop}
        controls={controls}
        poster={poster}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={handleVideoEnded}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        preload={lazy ? 'metadata' : 'auto'}
      >
        {isInView && getVideoSources().map((source, index) => (
          <source key={index} src={source} type="video/mp4" />
        ))}
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}
      {!controls && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              {isPlaying ? (
                <HiPause className="text-2xl text-black" />
              ) : (
                <HiPlay className="text-2xl text-black ml-1" />
              )}
            </button>
            
            <button
              onClick={toggleMute}
              className="w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              {isMuted ? (
                <HiVolumeOff className="text-lg text-black" />
              ) : (
                <HiVolumeUp className="text-lg text-black" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Poster Image for Non-Auto-Play Videos */}
      {!autoPlay && !isPlaying && poster && (
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={togglePlay}
        >
          <img
            src={poster}
            alt="Video poster"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200">
              <HiPlay className="text-3xl text-black ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}