'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff, HiExclamation } from 'react-icons/hi';
import { VideoSource } from '@/lib/videos-config';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoSource: VideoSource;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  showPlayButton?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  lazy?: boolean;
}

interface LoadingSkeletonProps {
  className?: string;
}

function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('relative overflow-hidden bg-gray-200', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

function ErrorState({ message, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn('relative bg-gray-900 flex items-center justify-center', className)}>
      <div className="text-center text-white p-8">
        <HiExclamation className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-lg mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-accent text-black rounded hover:bg-accent/80 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

export default function VideoPlayer({
  videoSource,
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  showPlayButton = true,
  className,
  onLoad,
  onError,
  lazy = false,
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = (error: string) => {
    setIsLoading(false);
    setHasError(true);
    setErrorMessage(error);
    onError?.(error);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
  };

  const togglePlay = () => {
    if (videoSource.type === 'direct' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          handleError('Failed to play video');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoSource.type === 'direct' && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const getEmbedUrl = () => {
    if (videoSource.type === 'youtube' && videoSource.id) {
      const params = new URLSearchParams({
        autoplay: autoPlay ? '1' : '0',
        mute: muted ? '1' : '0',
        controls: controls ? '1' : '0',
        showinfo: '0',
        rel: '0',
        modestbranding: '1',
        playsinline: '1',
        enablejsapi: '1',
      });

      return `https://www.youtube.com/embed/${videoSource.id}?${params.toString()}`;
    }

    if (videoSource.type === 'vimeo' && videoSource.id) {
      const params = new URLSearchParams({
        autoplay: autoPlay ? '1' : '0',
        muted: muted ? '1' : '0',
        controls: controls ? '1' : '0',
        background: '1',
      });

      return `https://player.vimeo.com/video/${videoSource.id}?${params.toString()}`;
    }

    return videoSource.url;
  };

  const renderVideo = () => {
    if (!isInView) {
      return (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-white">Loading video...</div>
        </div>
      );
    }

    if (videoSource.type === 'direct') {
      return (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controls={controls}
          onLoadedData={handleLoad}
          onError={() => handleError('Failed to load video')}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoSource.url} type="video/mp4" />
          {videoSource.fallbackUrl && (
            <source src={videoSource.fallbackUrl} type="video/mp4" />
          )}
          Your browser does not support the video tag.
        </video>
      );
    }

    // YouTube or Vimeo iframe
    return (
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full"
        src={getEmbedUrl()}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
        onError={() => handleError('Failed to load video')}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden bg-black', className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <LoadingSkeleton className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <ErrorState
              message={errorMessage || 'Failed to load video'}
              onRetry={handleRetry}
              className="w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Content */}
      {!hasError && renderVideo()}

      {/* Poster Image */}
      {poster && isLoading && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* Custom Controls for Direct Videos */}
      {videoSource.type === 'direct' && showPlayButton && (
        <AnimatePresence>
          {(showControls || !isPlaying) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center z-20"
            >
              {/* Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-black shadow-lg hover:bg-accent/80 transition-colors"
              >
                {isPlaying ? (
                  <HiPause size={32} />
                ) : (
                  <HiPlay size={32} className="ml-1" />
                )}
              </motion.button>

              {/* Volume Control */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="absolute bottom-4 right-4 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <HiVolumeOff size={20} />
                ) : (
                  <HiVolumeUp size={20} />
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Play Button Overlay for Embedded Videos */}
      {(videoSource.type === 'youtube' || videoSource.type === 'vimeo') && showPlayButton && !isPlaying && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-black shadow-lg"
          >
            <HiPlay size={32} className="ml-1" />
          </motion.div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}