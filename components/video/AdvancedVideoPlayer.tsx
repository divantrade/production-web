'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiPlay, 
  HiPause, 
  HiVolumeUp, 
  HiVolumeOff, 
  HiOutlineArrowsExpand,
  HiCog,
  HiDownload,
  HiShareVia
} from 'react-icons/hi';

interface VideoChapter {
  time: number;
  title: string;
  description?: string;
}

interface AdvancedVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  chapters?: VideoChapter[];
  qualities?: { label: string; src: string }[];
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
}

export default function AdvancedVideoPlayer({
  src,
  poster,
  title,
  description,
  chapters = [],
  qualities = [],
  className = '',
  autoPlay = false,
  controls = true,
  onTimeUpdate,
  onEnded
}: AdvancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentQuality, setCurrentQuality] = useState(0);
  const [showChapters, setShowChapters] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);

  let hideControlsTimeout: NodeJS.Timeout;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
      
      // Update buffered progress
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [onTimeUpdate, onEnded]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;
    video.currentTime = clickRatio * duration;
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      await container.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const togglePictureInPicture = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!isPictureInPicture) {
        await video.requestPictureInPicture();
        setIsPictureInPicture(true);
      } else {
        await document.exitPictureInPicture();
        setIsPictureInPicture(false);
      }
    } catch (error) {
      console.error('Picture-in-Picture error:', error);
    }
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const changeQuality = (qualityIndex: number) => {
    if (qualities.length === 0) return;
    
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    video.src = qualities[qualityIndex].src;
    video.currentTime = currentTime;
    
    if (wasPlaying) {
      video.play();
    }

    setCurrentQuality(qualityIndex);
    setShowSettings(false);
  };

  const jumpToChapter = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setShowChapters(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout);
    
    if (isPlaying) {
      hideControlsTimeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const shareVideo = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Video',
          text: description || 'Check out this video',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share canceled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title || 'video';
    link.click();
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Loading overlay */}
      {duration === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Play button overlay */}
      <AnimatePresence>
        {!isPlaying && duration > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
            onClick={togglePlay}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white"
            >
              <HiPlay className="w-8 h-8 text-white ml-1" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <AnimatePresence>
        {controls && showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4"
          >
            {/* Progress bar */}
            <div
              ref={progressRef}
              className="relative w-full h-2 bg-white bg-opacity-30 rounded-full mb-4 cursor-pointer"
              onClick={handleProgressClick}
            >
              {/* Buffered progress */}
              <div
                className="absolute top-0 left-0 h-full bg-white bg-opacity-50 rounded-full"
                style={{ width: `${bufferedPercentage}%` }}
              />
              {/* Current progress */}
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
              {/* Progress thumb */}
              <div
                className="absolute top-1/2 w-4 h-4 bg-primary rounded-full transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${progressPercentage}%` }}
              />
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-primary transition-colors"
                >
                  {isPlaying ? (
                    <HiPause className="w-6 h-6" />
                  ) : (
                    <HiPlay className="w-6 h-6" />
                  )}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-primary transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <HiVolumeOff className="w-5 h-5" />
                    ) : (
                      <HiVolumeUp className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-white bg-opacity-30 rounded-full appearance-none slider"
                  />
                </div>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {chapters.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowChapters(!showChapters)}
                      className="text-white hover:text-primary transition-colors px-2 py-1 text-sm bg-white bg-opacity-20 rounded"
                    >
                      Chapters
                    </button>
                    
                    <AnimatePresence>
                      {showChapters && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg p-2 min-w-48"
                        >
                          {chapters.map((chapter, index) => (
                            <button
                              key={index}
                              onClick={() => jumpToChapter(chapter.time)}
                              className="block w-full text-left text-white hover:text-primary transition-colors p-2 rounded text-sm"
                            >
                              <div className="font-medium">{chapter.title}</div>
                              <div className="text-xs text-gray-300">
                                {formatTime(chapter.time)}
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <button
                  onClick={shareVideo}
                  className="text-white hover:text-primary transition-colors"
                  title="Share video"
                >
                  <HiShareVia className="w-5 h-5" />
                </button>

                <button
                  onClick={downloadVideo}
                  className="text-white hover:text-primary transition-colors"
                  title="Download video"
                >
                  <HiDownload className="w-5 h-5" />
                </button>

                {'pictureInPictureEnabled' in document && (
                  <button
                    onClick={togglePictureInPicture}
                    className="text-white hover:text-primary transition-colors"
                    title="Picture in Picture"
                  >
                    <div className="w-5 h-5 border border-current rounded-sm">
                      <div className="w-2 h-2 bg-current rounded-sm"></div>
                    </div>
                  </button>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-primary transition-colors"
                  >
                    <HiCog className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg p-2 min-w-36"
                      >
                        <div className="text-white text-sm mb-2">Playback Speed</div>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => changePlaybackRate(rate)}
                            className={`block w-full text-left transition-colors p-1 rounded text-sm ${
                              playbackRate === rate ? 'text-primary' : 'text-white hover:text-primary'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}

                        {qualities.length > 0 && (
                          <>
                            <div className="text-white text-sm mb-2 mt-4">Quality</div>
                            {qualities.map((quality, index) => (
                              <button
                                key={index}
                                onClick={() => changeQuality(index)}
                                className={`block w-full text-left transition-colors p-1 rounded text-sm ${
                                  currentQuality === index ? 'text-primary' : 'text-white hover:text-primary'
                                }`}
                              >
                                {quality.label}
                              </button>
                            ))}
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-primary transition-colors"
                >
                  <HiOutlineArrowsExpand className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video info overlay */}
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          {description && (
            <p className="text-white text-sm opacity-90">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}